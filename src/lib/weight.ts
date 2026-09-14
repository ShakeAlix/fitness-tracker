export const KG_TO_LB = 2.20462

export function kgToLb(kg: number): number {
  return kg * KG_TO_LB
}

export function lbToKg(lb: number): number {
  return lb / KG_TO_LB
}

/** Round to 2 decimals for storage/display without accumulating float noise. */
export function roundWeight(n: number): number {
  return Math.round(n * 100) / 100
}

export function formatWeight(n: number): string {
  return String(roundWeight(n))
}
