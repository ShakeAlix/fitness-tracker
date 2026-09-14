import { useState } from 'react'
import type { BodyPart, Exercise, ExerciseType } from '../types'
import { ExerciseCard } from './ExerciseCard'
import { AddExerciseForm } from './AddExerciseForm'

interface Props {
  bodyPart: BodyPart
  exercises: Exercise[]
  onRename: (name: string) => void
  onDelete: () => void
  onAddExercise: (name: string, type: ExerciseType, weightKg: number) => void
  onUpdateExercise: (id: string, patch: Partial<Exercise>) => void
  onDeleteExercise: (id: string) => void
}

export function BodyPartSection({
  bodyPart,
  exercises,
  onRename,
  onDelete,
  onAddExercise,
  onUpdateExercise,
  onDeleteExercise,
}: Props) {
  const [collapsed, setCollapsed] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [draftName, setDraftName] = useState(bodyPart.name)

  function saveName() {
    const trimmed = draftName.trim()
    if (trimmed) onRename(trimmed)
    else setDraftName(bodyPart.name)
    setEditingName(false)
  }

  return (
    <section className="rounded-2xl border border-neutral-200 bg-neutral-50/60 p-4 dark:border-neutral-800 dark:bg-neutral-900/30">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
          aria-expanded={!collapsed}
        >
          <svg
            className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform ${collapsed ? '-rotate-90' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
              clipRule="evenodd"
            />
          </svg>
          {editingName ? (
            <input
              autoFocus
              value={draftName}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setDraftName(e.target.value)}
              onBlur={saveName}
              onKeyDown={(e) => e.key === 'Enter' && (e.currentTarget as HTMLInputElement).blur()}
              className="h-8 min-w-0 rounded-md border border-neutral-300 px-2 text-lg font-semibold dark:border-neutral-700 dark:bg-neutral-950"
            />
          ) : (
            <h2 className="truncate text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {bodyPart.name}
            </h2>
          )}
          <span className="text-sm text-neutral-400">{exercises.length}</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setDraftName(bodyPart.name)
            setEditingName(true)
          }}
          className="shrink-0 rounded-md p-1.5 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-800"
          aria-label={`Rename ${bodyPart.name}`}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793-2.828-2.828.793-.793ZM11.379 5.793 3 14.172V17h2.828l8.38-8.379-2.83-2.828Z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => {
            if (confirm(`Delete "${bodyPart.name}" and its ${exercises.length} exercise(s)?`)) onDelete()
          }}
          className="shrink-0 rounded-md p-1.5 text-neutral-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
          aria-label={`Delete ${bodyPart.name}`}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path
              fillRule="evenodd"
              d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {!collapsed && (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {exercises.map((ex) => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              onUpdate={(patch) => onUpdateExercise(ex.id, patch)}
              onDelete={() => onDeleteExercise(ex.id)}
            />
          ))}
          <div className="sm:col-span-2 xl:col-span-3">
            <AddExerciseForm onAdd={onAddExercise} />
          </div>
        </div>
      )}
    </section>
  )
}
