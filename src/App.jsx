import { useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.06),transparent_40%)]" />

      <div className="relative max-w-4xl mx-auto px-6 py-10">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight">Task Time Manager</h1>
          <p className="text-slate-300 mt-2">Create tasks, start/stop timers, and see total time per task.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 backdrop-blur">
            <h2 className="text-white font-semibold mb-3">Add Task</h2>
            <TaskForm onCreate={async (data)=>{
              const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
              const res = await fetch(`${base}/tasks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
              if (!res.ok) throw new Error('Failed to create task')
            }} />
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 backdrop-blur">
            <h2 className="text-white font-semibold mb-3">Your Tasks</h2>
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
