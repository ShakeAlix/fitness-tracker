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
        className="w-full rounded-2xl border border-dashed border-neutral-700 py-3 text-sm font-medium text-neutral-400 hover:border-orange-500/60 hover:text-orange-400"
      >
        + Add exercise
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-neutral-500">Exercise name</label>
        <input
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Barbell Row"
          className="h-11 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 text-base text-neutral-100 outline-none focus:border-orange-500"
        />
      </div>
      <div>
        <span className="mb-1 block text-xs font-medium text-neutral-500">Type</span>
        <div className="flex gap-2">
          <TypeToggleButton type="compound" active={type === 'compound'} onClick={() => setType('compound')} />
          <TypeToggleButton type="isolation" active={type === 'isolation'} onClick={() => setType('isolation')} />
        </div>
      </div>
      <div>
        <span className="mb-1 block text-xs font-medium text-neutral-500">Starting weight</span>
        <WeightField weightKg={weightKg} onChange={setWeightKg} />
      </div>
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 py-2.5 text-sm font-medium text-white shadow-sm"
        >
          Add exercise
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-xl border border-neutral-700 px-4 py-2.5 text-sm font-medium text-neutral-300"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
