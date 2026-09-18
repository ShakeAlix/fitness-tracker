export type MuscleGroup = 'back' | 'chest' | 'shoulders' | 'biceps' | 'triceps' | 'legs' | 'abs'

const MATCHERS: [MuscleGroup, RegExp][] = [
  [ 'chest', /chest|pec/i ],
  [ 'shoulders', /shoulder|delt/i ],
  [ 'biceps', /bicep/i ],
  [ 'triceps', /tricep/i ],
  [ 'back', /back|lat/i ],
  [ 'legs', /leg|quad|calf|calves|hamstring|glute/i ],
  [ 'abs', /\babs\b|core|abdomen/i ],
]

/** Best-effort match of a free-form body part name to a known muscle group for diagram purposes. */
export function matchMuscleGroup(name: string): MuscleGroup | null {
  for (const [group, pattern] of MATCHERS) {
    if (pattern.test(name)) return group
  }
  return null
}
