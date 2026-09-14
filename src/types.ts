export type ExerciseType = 'compound' | 'isolation'

export type WeightUnit = 'kg' | 'lb'

export interface BodyPart {
  id: string
  name: string
}

export interface Exercise {
  id: string
  bodyPartId: string
  name: string
  type: ExerciseType
  /** Canonical stored weight. lb is always derived from this so the two never drift out of sync. */
  weightKg: number
  currentReps: number
  /** ISO date (yyyy-mm-dd) the current weight/rep combo started. */
  startDate: string
}
