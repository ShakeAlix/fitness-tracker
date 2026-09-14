import type { ExerciseType } from '../types'

export const REP_RANGES: Record<ExerciseType, { min: number; max: number }> = {
  compound: { min: 8, max: 12 },
  isolation: { min: 6, max: 15 },
}

export function repRangeLabel(type: ExerciseType): string {
  const { min, max } = REP_RANGES[type]
  return `${min}–${max}`
}

export function defaultStartReps(type: ExerciseType): number {
  return REP_RANGES[type].min
}

export function isAtTopOfRange(type: ExerciseType, reps: number): boolean {
  return reps >= REP_RANGES[type].max
}
