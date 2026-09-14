export function todayIso(): string {
  const d = new Date()
  const offset = d.getTimezoneOffset()
  return new Date(d.getTime() - offset * 60000).toISOString().slice(0, 10)
}

/** Whole days between an ISO start date and today, floored at 0 for future-dated starts. */
export function daysElapsed(startDateIso: string): number {
  const [y, m, d] = startDateIso.split('-').map(Number)
  const start = new Date(y, (m ?? 1) - 1, d ?? 1)
  const now = new Date()
  const startMid = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  const nowMid = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diff = Math.round((nowMid.getTime() - startMid.getTime()) / 86400000)
  return Math.max(0, diff)
}
