import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import type { BodyPart, Exercise, ExerciseType } from '../types'
import { ExerciseCard } from '../components/ExerciseCard'
import { AddExerciseForm } from '../components/AddExerciseForm'
import { MuscleDiagram } from '../components/MuscleDiagram'
import { matchMuscleGroup } from '../lib/muscleGroups'

interface Props {
  bodyParts: BodyPart[]
  exercises: Exercise[]
  onRename: (id: string, name: string) => void
  onDelete: (id: string) => void
  onAddExercise: (bodyPartId: string, name: string, type: ExerciseType, weightKg: number) => void
  onUpdateExercise: (id: string, patch: Partial<Exercise>) => void
  onDeleteExercise: (id: string) => void
}

export function BodyPartPage({
  bodyParts,
  exercises,
  onRename,
  onDelete,
  onAddExercise,
  onUpdateExercise,
  onDeleteExercise,
}: Props) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const bodyPart = bodyParts.find((bp) => bp.id === id)

  const [editingName, setEditingName] = useState(false)
  const [draftName, setDraftName] = useState(bodyPart?.name ?? '')

  if (!bodyPart) return <Navigate to="/" replace />

  const bodyPartExercises = exercises.filter((ex) => ex.bodyPartId === bodyPart.id)
  const muscleGroup = matchMuscleGroup(bodyPart.name)

  const saveName = () => {
    const trimmed = draftName.trim()
    if (trimmed) onRename(bodyPart.id, trimmed)
    else setDraftName(bodyPart.name)
    setEditingName(false)
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <header className="flex items-center gap-2 px-5 pt-6 pb-2 sm:px-8">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="rounded-full p-2 text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100"
          aria-label="Back to workouts"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 0 1-.02 1.06L8.832 10l3.938 3.71a.75.75 0 1 1-1.04 1.08l-4.5-4.25a.75.75 0 0 1 0-1.08l4.5-4.25a.75.75 0 0 1 1.06.02Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {editingName ? (
          <input
            autoFocus
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onBlur={saveName}
            onKeyDown={(e) => e.key === 'Enter' && (e.currentTarget as HTMLInputElement).blur()}
            className="h-9 min-w-0 flex-1 rounded-lg border border-neutral-700 bg-neutral-900 px-2 text-xl font-bold text-neutral-50 outline-none focus:border-orange-500"
          />
        ) : (
          <h1 className="min-w-0 flex-1 truncate text-2xl font-bold text-neutral-50">{bodyPart.name}</h1>
        )}

        <button
          type="button"
          onClick={() => {
            setDraftName(bodyPart.name)
            setEditingName((v) => !v)
          }}
          className="shrink-0 rounded-md p-1.5 text-neutral-500 hover:bg-neutral-900 hover:text-orange-400"
          aria-label={`Rename ${bodyPart.name}`}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793-2.828-2.828.793-.793ZM11.379 5.793 3 14.172V17h2.828l8.38-8.379-2.83-2.828Z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => {
            if (confirm(`Delete "${bodyPart.name}" and its ${bodyPartExercises.length} exercise(s)?`)) {
              onDelete(bodyPart.id)
              navigate('/')
            }
          }}
          className="shrink-0 rounded-md p-1.5 text-neutral-500 hover:bg-red-950/40 hover:text-red-500"
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
      </header>

      <main className="space-y-5 px-5 pb-10 sm:px-8">
        <div className="relative flex justify-center overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 py-6">
          <div
            className="pointer-events-none absolute h-64 w-64 rounded-full bg-gradient-to-br from-orange-500/30 to-red-600/20 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative h-56 w-36">
            <MuscleDiagram group={muscleGroup} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {bodyPartExercises.map((ex) => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              onUpdate={(patch) => onUpdateExercise(ex.id, patch)}
              onDelete={() => onDeleteExercise(ex.id)}
            />
          ))}
          <div className="sm:col-span-2 xl:col-span-3">
            <AddExerciseForm onAdd={(name, type, weightKg) => onAddExercise(bodyPart.id, name, type, weightKg)} />
          </div>
        </div>
      </main>
    </div>
  )
}
