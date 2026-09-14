import { useState, type FormEvent } from 'react'
import type { ExerciseType } from '../types'
import { TypeToggleButton } from './TypeBadge'
import { WeightField } from './WeightField'

interface Props {
  onAdd: (name: string, type: ExerciseType, weightKg: number) => void
}

export function AddExerciseForm({ onAdd }: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [type, setType] = useState<ExerciseType>('compound')
  const [weightKg, setWeightKg] = useState(20)

  function reset() {
    setName('')
    setType('compound')
    setWeightKg(20)
    setOpen(false)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    onAdd(name, type, weightKg)
    reset()
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-xl border border-dashed border-neutral-300 py-3 text-sm font-medium text-neutral-500 hover:border-neutral-400 hover:text-neutral-700 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-200"
      >
        + Add exercise
      </button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div>
        <label className="mb-1 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
          Exercise name
        </label>
        <input
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Barbell Row"
          className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-base dark:border-neutral-700 dark:bg-neutral-950"
        />
      </div>
      <div>
        <span className="mb-1 block text-xs font-medium text-neutral-500 dark:text-neutral-400">Type</span>
        <div className="flex gap-2">
          <TypeToggleButton type="compound" active={type === 'compound'} onClick={() => setType('compound')} />
          <TypeToggleButton type="isolation" active={type === 'isolation'} onClick={() => setType('isolation')} />
        </div>
      </div>
      <div>
        <span className="mb-1 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
          Starting weight
        </span>
        <WeightField weightKg={weightKg} onChange={setWeightKg} />
      </div>
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-neutral-900 py-2.5 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
        >
          Add exercise
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-600 dark:border-neutral-700 dark:text-neutral-300"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
