import { useMemo } from 'react'

function secondsToHms(total) {
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = Math.floor(total % 60)
  const parts = []
  if (h) parts.push(`${h}h`)
  if (m || h) parts.push(`${m}m`)
  parts.push(`${s}s`)
  return parts.join(' ')
}

export default function TaskItem({ task, onStart, onStop, onDelete, runningEntries, totals }) {
  const running = useMemo(() => runningEntries.find(e => e.task_id === task.id), [runningEntries, task.id])
  const totalSec = (totals.find(t => t.task_id === task.id)?.total_sec) || 0

  return (
    <div className="p-4 border border-slate-700/60 rounded-xl bg-slate-800/40">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-white font-semibold">{task.title}</h3>
          {task.description && <p className="text-sm text-slate-300/80">{task.description}</p>}
          <div className="text-xs text-slate-400 mt-1">Total: {secondsToHms(totalSec)}</div>
        </div>
        <div className="flex items-center gap-2">
          {running ? (
            <button onClick={() => onStop(task)} className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm">Stop</button>
          ) : (
            <button onClick={() => onStart(task)} className="px-3 py-1 rounded bg-emerald-500 hover:bg-emerald-600 text-white text-sm">Start</button>
          )}
          <button onClick={() => onDelete(task)} className="px-3 py-1 rounded bg-slate-600 hover:bg-slate-500 text-white text-sm">Delete</button>
        </div>
      </div>
    </div>
  )
}
