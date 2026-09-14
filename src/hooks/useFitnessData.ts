import { useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import { useLocalStorage } from './useLocalStorage'
import { todayIso } from '../lib/date'
import { defaultStartReps } from '../lib/repRange'
import type { BodyPart, Exercise, ExerciseType } from '../types'

const DEFAULT_BODY_PARTS = ['Back', 'Chest', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Abs']

function seedBodyParts(): BodyPart[] {
  return DEFAULT_BODY_PARTS.map((name) => ({ id: uuid(), name }))
}

export function useFitnessData() {
  const [bodyParts, setBodyParts] = useLocalStorage<BodyPart[]>('ft.bodyParts', seedBodyParts)
  const [exercises, setExercises] = useLocalStorage<Exercise[]>('ft.exercises', [])

  const addBodyPart = useCallback(
    (name: string) => {
      const trimmed = name.trim()
      if (!trimmed) return
      setBodyParts((prev) => [...prev, { id: uuid(), name: trimmed }])
    },
    [setBodyParts],
  )

  const renameBodyPart = useCallback(
    (id: string, name: string) => {
      const trimmed = name.trim()
      if (!trimmed) return
      setBodyParts((prev) => prev.map((bp) => (bp.id === id ? { ...bp, name: trimmed } : bp)))
    },
    [setBodyParts],
  )

  const deleteBodyPart = useCallback(
    (id: string) => {
      setBodyParts((prev) => prev.filter((bp) => bp.id !== id))
      setExercises((prev) => prev.filter((ex) => ex.bodyPartId !== id))
    },
    [setBodyParts, setExercises],
  )

  const addExercise = useCallback(
    (bodyPartId: string, name: string, type: ExerciseType, weightKg: number) => {
      const trimmed = name.trim()
      if (!trimmed) return
      const exercise: Exercise = {
        id: uuid(),
        bodyPartId,
        name: trimmed,
        type,
        weightKg,
        currentReps: defaultStartReps(type),
        startDate: todayIso(),
      }
      setExercises((prev) => [...prev, exercise])
    },
    [setExercises],
  )

  const updateExercise = useCallback(
    (id: string, patch: Partial<Omit<Exercise, 'id' | 'bodyPartId'>>) => {
      setExercises((prev) => prev.map((ex) => (ex.id === id ? { ...ex, ...patch } : ex)))
    },
    [setExercises],
  )

  const deleteExercise = useCallback(
    (id: string) => {
      setExercises((prev) => prev.filter((ex) => ex.id !== id))
    },
    [setExercises],
  )

  return {
    bodyParts,
    exercises,
    addBodyPart,
    renameBodyPart,
    deleteBodyPart,
    addExercise,
    updateExercise,
    deleteExercise,
  }
}
