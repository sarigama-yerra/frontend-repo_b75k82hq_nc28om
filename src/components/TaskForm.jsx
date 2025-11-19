import { useState } from 'react'

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [estimated, setEstimated] = useState('')
  const [labels, setLabels] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    try {
      await onCreate({
        title: title.trim(),
        description: description.trim() || undefined,
        estimated_minutes: estimated ? parseInt(estimated, 10) : undefined,
        labels: labels.split(',').map(l => l.trim()).filter(Boolean)
      })
      setTitle('')
      setDescription('')
      setEstimated('')
      setLabels('')
    } finally { setLoading(false) }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Task title" className="w-full px-3 py-2 rounded bg-slate-800/60 border border-slate-700 text-white" />
      <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description (optional)" className="w-full px-3 py-2 rounded bg-slate-800/60 border border-slate-700 text-white" />
      <div className="flex gap-3">
        <input value={estimated} onChange={e=>setEstimated(e.target.value)} placeholder="Est. minutes" type="number" className="flex-1 px-3 py-2 rounded bg-slate-800/60 border border-slate-700 text-white" />
        <input value={labels} onChange={e=>setLabels(e.target.value)} placeholder="labels (comma)" className="flex-1 px-3 py-2 rounded bg-slate-800/60 border border-slate-700 text-white" />
      </div>
      <button disabled={loading} className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold py-2 rounded">{loading? 'Adding...' : 'Add Task'}</button>
    </form>
  )
}
