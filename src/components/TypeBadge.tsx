import type { ExerciseType } from '../types'

const STYLES: Record<ExerciseType, string> = {
  compound:
    'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  isolation:
    'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
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
      className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? type === 'compound'
            ? 'border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
            : 'border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
          : 'border-neutral-300 text-neutral-500 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800'
      }`}
    >
      {LABELS[type]}
    </button>
  )
}
