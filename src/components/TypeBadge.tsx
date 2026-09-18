import type { ExerciseType } from '../types'

const STYLES: Record<ExerciseType, string> = {
  compound: 'bg-gradient-to-r from-orange-500 to-red-600 text-white',
  isolation: 'bg-neutral-800 text-neutral-300',
}

const LABELS: Record<ExerciseType, string> = {
  compound: 'Compound',
  isolation: 'Isolation',
}

export function TypeBadge({ type }: { type: ExerciseType }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STYLES[type]}`}
    >
      {LABELS[type]}
    </span>
  )
}

export function TypeToggleButton({
  active,
  type,
  onClick,
}: {
  active: boolean
  type: ExerciseType
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? 'border-orange-500/60 bg-gradient-to-r from-orange-500 to-red-600 text-white'
          : 'border-neutral-700 text-neutral-400 hover:bg-neutral-800'
      }`}
    >
      {LABELS[type]}
    </button>
  )
}
