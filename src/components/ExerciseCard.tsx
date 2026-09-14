import { useEffect, useMemo, useState } from 'react'
import type { Exercise, ExerciseType } from '../types'
import { formatWeight, kgToLb } from '../lib/weight'
import { REP_RANGES, repRangeLabel } from '../lib/repRange'
import { daysElapsed, todayIso } from '../lib/date'
import { TypeBadge, TypeToggleButton } from './TypeBadge'
import { WeightField } from './WeightField'

interface Props {
  exercise: Exercise
  onUpdate: (patch: Partial<Exercise>) => void
  onDelete: () => void
}

type Tab = 'weight' | 'reps'

export function ExerciseCard({ exercise, onUpdate, onDelete }: Props) {
  const [tab, setTab] = useState<Tab>('reps')
  const [editingHeader, setEditingHeader] = useState(false)
  const [draftName, setDraftName] = useState(exercise.name)
  const [tick, setTick] = useState(0)

  // Keeps "days elapsed" live if the tab is left open across a day boundary.
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60 * 60 * 1000)
    return () => clearInterval(id)
  }, [])

  const days = useMemo(() => daysElapsed(exercise.startDate), [exercise.startDate, tick])
  const range = REP_RANGES[exercise.type]

  function bumpReps(delta: number) {
    onUpdate({ currentReps: Math.max(0, exercise.currentReps + delta) })
  }

  function bumpRepsAndResetDate() {
    onUpdate({ currentReps: Math.min(range.max, exercise.currentReps + 1), startDate: todayIso() })
  }

  function saveName() {
    const trimmed = draftName.trim()
    if (trimmed) onUpdate({ name: trimmed })
    else setDraftName(exercise.name)
  }

  function handleTypeChange(newType: ExerciseType) {
    if (newType === exercise.type) return
    const newRange = REP_RANGES[newType]
    const clampedReps = Math.min(newRange.max, Math.max(newRange.min, exercise.currentReps))
    onUpdate({ type: newType, currentReps: clampedReps })
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          {editingHeader ? (
            <input
              autoFocus
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              onBlur={saveName}
              onKeyDown={(e) => e.key === 'Enter' && (e.currentTarget as HTMLInputElement).blur()}
              className="h-8 w-full rounded-md border border-neutral-300 px-2 text-base font-semibold dark:border-neutral-700 dark:bg-neutral-950"
            />
          ) : (
            <h3 className="truncate text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {exercise.name}
            </h3>
          )}
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <TypeBadge type={exercise.type} />
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Range {repRangeLabel(exercise.type)}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setDraftName(exercise.name)
              setEditingHeader((v) => !v)
            }}
            className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800"
            aria-label={`Edit ${exercise.name}`}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793-2.828-2.828.793-.793ZM11.379 5.793 3 14.172V17h2.828l8.38-8.379-2.83-2.828Z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm(`Delete "${exercise.name}"?`)) onDelete()
            }}
            className="rounded-md p-1.5 text-neutral-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
            aria-label={`Delete ${exercise.name}`}
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
      </div>

      {editingHeader && (
        <div className="mt-2 flex gap-2">
          <TypeToggleButton
            type="compound"
            active={exercise.type === 'compound'}
            onClick={() => handleTypeChange('compound')}
          />
          <TypeToggleButton
            type="isolation"
            active={exercise.type === 'isolation'}
            onClick={() => handleTypeChange('isolation')}
          />
        </div>
      )}

      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-neutral-50 px-3 py-2 dark:bg-neutral-800/60">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">Weight</div>
          <div className="font-medium text-neutral-900 dark:text-neutral-100">
            {formatWeight(exercise.weightKg)} kg <span className="text-neutral-400">/</span>{' '}
            {formatWeight(kgToLb(exercise.weightKg))} lb
          </div>
        </div>
        <div className="rounded-lg bg-neutral-50 px-3 py-2 dark:bg-neutral-800/60">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">Reps</div>
          <div className="font-medium text-neutral-900 dark:text-neutral-100">
            {exercise.currentReps} / {repRangeLabel(exercise.type)}
          </div>
        </div>
        <div className="col-span-2 rounded-lg bg-neutral-50 px-3 py-2 dark:bg-neutral-800/60">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">Days on current rep count</div>
          <div className="font-medium text-neutral-900 dark:text-neutral-100">
            {days} {days === 1 ? 'day' : 'days'}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800">
          <button type="button" onClick={() => setTab('weight')} className={tabClass(tab === 'weight')}>
            Weight
          </button>
          <button type="button" onClick={() => setTab('reps')} className={tabClass(tab === 'reps')}>
            Reps &amp; Duration
          </button>
        </div>

        {tab === 'weight' ? (
          <div className="mt-3">
            <WeightField weightKg={exercise.weightKg} onChange={(kg) => onUpdate({ weightKg: kg })} />
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Current reps
              </label>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => bumpReps(-1)}
                  aria-label="Decrease reps"
                  className="h-11 w-11 shrink-0 rounded-lg border border-neutral-300 text-lg font-medium active:bg-neutral-100 dark:border-neutral-700 dark:active:bg-neutral-800"
                >
                  −
                </button>
                <input
                  type="number"
                  inputMode="numeric"
                  value={exercise.currentReps}
                  onChange={(e) => onUpdate({ currentReps: Math.max(0, Number(e.target.value) || 0) })}
                  className="h-11 w-16 shrink-0 rounded-lg border border-neutral-300 text-center text-base dark:border-neutral-700 dark:bg-neutral-950"
                />
                <button
                  type="button"
                  onClick={() => bumpReps(1)}
                  aria-label="Increase reps"
                  className="h-11 w-11 shrink-0 rounded-lg border border-neutral-300 text-lg font-medium active:bg-neutral-100 dark:border-neutral-700 dark:active:bg-neutral-800"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={bumpRepsAndResetDate}
                  className="h-11 min-w-[9.5rem] flex-1 whitespace-nowrap rounded-lg border border-neutral-300 px-3 text-xs font-medium text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  +1 &amp; reset date
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Start date
              </label>
              <input
                type="date"
                value={exercise.startDate}
                max={todayIso()}
                onChange={(e) => onUpdate({ startDate: e.target.value })}
                className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-base dark:border-neutral-700 dark:bg-neutral-950"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function tabClass(active: boolean) {
  return `flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
    active
      ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-neutral-50'
      : 'text-neutral-500 dark:text-neutral-400'
  }`
}
