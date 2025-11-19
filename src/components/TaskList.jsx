import { useEffect, useMemo, useState } from 'react'
import { apiGet, apiPost, apiDelete } from '../lib/api'
import TaskItem from './TaskItem'

export default function TaskList() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [running, setRunning] = useState([])
  const [summary, setSummary] = useState([])

  const refresh = async () => {
    setLoading(true)
    try {
      const t = await apiGet('/tasks')
      setTasks(t)
      const rep = await apiGet('/reports/summary')
      setSummary(rep.items)
      // compute running entries (fetch per task)
      const runAll = (await Promise.all(t.map(async (task) => {
        const list = await apiGet(`/tasks/${task.id}/time`)
        return list.filter(e => e.is_running)
      }))).flat()
      setRunning(runAll)
    } catch (e) {
      setError(e.message)
    } finally { setLoading(false) }
  }

  useEffect(() => { refresh(); const i = setInterval(refresh, 4000); return () => clearInterval(i) }, [])

  const createTask = async (data) => {
    await apiPost('/tasks', data)
    await refresh()
  }

  const startTimer = async (task) => {
    await apiPost(`/tasks/${task.id}/timer/start`, {})
    await refresh()
  }

  const stopTimer = async (task) => {
    await apiPost(`/tasks/${task.id}/timer/stop`, {})
    await refresh()
  }

  const deleteTask = async (task) => {
    await apiDelete(`/tasks/${task.id}`)
    await refresh()
  }

  return (
    <div className="space-y-4">
      {error && <div className="text-red-400">{error}</div>}
      {loading ? (
        <div className="text-slate-300">Loading...</div>
      ) : tasks.length === 0 ? (
        <div className="text-slate-300">No tasks yet. Add your first task above.</div>
      ) : (
        <div className="grid gap-3">
          {tasks.map(t => (
            <TaskItem key={t.id} task={t} onStart={startTimer} onStop={stopTimer} onDelete={deleteTask} runningEntries={running} totals={summary} />
          ))}
        </div>
      )}
    </div>
  )
}
