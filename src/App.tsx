import { useState, type FormEvent } from 'react'
import { useFitnessData } from './hooks/useFitnessData'
import { BodyPartSection } from './components/BodyPartSection'

export default function App() {
  const {
    bodyParts,
    exercises,
    addBodyPart,
    renameBodyPart,
    deleteBodyPart,
    addExercise,
    updateExercise,
    deleteExercise,
  } = useFitnessData()

  const [newBodyPart, setNewBodyPart] = useState('')

  function handleAddBodyPart(e: FormEvent) {
    e.preventDefault()
    if (!newBodyPart.trim()) return
    addBodyPart(newBodyPart)
    setNewBodyPart('')
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950">
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/90">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Lift Tracker</h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-4 px-4 py-6 sm:px-6">
        {bodyParts.map((bp) => (
          <BodyPartSection
            key={bp.id}
            bodyPart={bp}
            exercises={exercises.filter((ex) => ex.bodyPartId === bp.id)}
            onRename={(name) => renameBodyPart(bp.id, name)}
            onDelete={() => deleteBodyPart(bp.id)}
            onAddExercise={(name, type, weightKg) => addExercise(bp.id, name, type, weightKg)}
            onUpdateExercise={updateExercise}
            onDeleteExercise={deleteExercise}
          />
        ))}

        {bodyParts.length === 0 && (
          <p className="py-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
            No body parts yet — add one below to get started.
          </p>
        )}

        <form onSubmit={handleAddBodyPart} className="flex gap-2 pt-2">
          <input
            type="text"
            value={newBodyPart}
            onChange={(e) => setNewBodyPart(e.target.value)}
            placeholder="New body part (e.g. Calves)"
            className="h-11 min-w-0 flex-1 rounded-lg border border-neutral-300 bg-white px-3 text-base dark:border-neutral-700 dark:bg-neutral-900"
          />
          <button
            type="submit"
            className="h-11 shrink-0 rounded-lg bg-neutral-900 px-4 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
          >
            Add body part
          </button>
        </form>
      </main>
    </div>
  )
}
