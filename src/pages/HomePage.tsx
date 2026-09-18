import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { BodyPart, Exercise } from '../types'

interface Props {
  bodyParts: BodyPart[]
  exercises: Exercise[]
  onAddBodyPart: (name: string) => void
  onDeleteBodyPart: (id: string) => void
}

export function HomePage({ bodyParts, exercises, onAddBodyPart, onDeleteBodyPart }: Props) {
  const [newBodyPart, setNewBodyPart] = useState('')
  const [adding, setAdding] = useState(false)

  function handleAdd(e: FormEvent) {
    e.preventDefault()
    if (!newBodyPart.trim()) return
    onAddBodyPart(newBodyPart)
    setNewBodyPart('')
    setAdding(false)
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <header className="px-5 pt-8 pb-4 sm:px-8">
        <h1 className="text-3xl font-bold text-neutral-50">Workouts</h1>
        <p className="mt-1 text-sm text-neutral-500">Pick a muscle group to track your lifts</p>
      </header>

      <main className="space-y-3 px-5 pb-10 sm:px-8">
        {bodyParts.map((bp) => {
          const count = exercises.filter((ex) => ex.bodyPartId === bp.id).length
          return (
            <div
              key={bp.id}
              className="group flex items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-4 transition-colors hover:border-neutral-700"
            >
              <Link to={`/body-part/${bp.id}`} className="flex min-w-0 flex-1 items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg shadow-orange-950/40">
                  <DumbbellIcon />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-base font-semibold text-neutral-50">{bp.name}</span>
                  <span className="block text-sm text-neutral-500">
                    {count} {count === 1 ? 'exercise' : 'exercises'}
                  </span>
                </span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete "${bp.name}" and its ${count} exercise(s)?`)) onDeleteBodyPart(bp.id)
                }}
                className="shrink-0 rounded-md p-1.5 text-neutral-600 opacity-0 hover:bg-red-950/40 hover:text-red-500 group-hover:opacity-100"
                aria-label={`Delete ${bp.name}`}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path
                    fillRule="evenodd"
                    d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <Link
                to={`/body-part/${bp.id}`}
                className="shrink-0 text-neutral-600"
                aria-label={`Open ${bp.name}`}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          )
        })}

        {bodyParts.length === 0 && (
          <p className="py-8 text-center text-sm text-neutral-500">No body parts yet — add one below to get started.</p>
        )}

        {adding ? (
          <form onSubmit={handleAdd} className="flex gap-2 pt-2">
            <input
              autoFocus
              type="text"
              value={newBodyPart}
              onChange={(e) => setNewBodyPart(e.target.value)}
              placeholder="e.g. Calves"
              className="h-11 min-w-0 flex-1 rounded-xl border border-neutral-700 bg-neutral-900 px-3 text-base text-neutral-100 outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-4 text-sm font-medium text-white"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                setAdding(false)
                setNewBodyPart('')
              }}
              className="h-11 shrink-0 rounded-xl border border-neutral-700 px-4 text-sm font-medium text-neutral-300"
            >
              Cancel
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="w-full rounded-2xl border border-dashed border-neutral-700 py-3 text-sm font-medium text-neutral-400 hover:border-orange-500/60 hover:text-orange-400"
          >
            + Add body part
          </button>
        )}
      </main>
    </div>
  )
}

function DumbbellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path
        d="M4 9v6M2 10.5v3M6.5 7v10a1 1 0 0 0 1 1h.5a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7.5a1 1 0 0 0-1 1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 9v6M22 10.5v3M17.5 7v10a1 1 0 0 1-1 1H16a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 12h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
