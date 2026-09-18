import { useState } from 'react'
import type { WeightUnit } from '../types'
import { formatWeight, kgToLb, lbToKg, roundWeight } from '../lib/weight'

interface Props {
  weightKg: number
  onChange: (weightKg: number) => void
}

/**
 * Single numeric field + unit toggle. `weightKg` is the only source of truth passed in;
 * this component never re-derives its text from props after mount (only on unit toggle),
 * so it doesn't fight the user's keystrokes as they type.
 */
export function WeightField({ weightKg, onChange }: Props) {
  const [unit, setUnit] = useState<WeightUnit>('kg')
  const [text, setText] = useState(() => formatWeight(weightKg))

  function handleTextChange(v: string) {
    setText(v)
    const parsed = parseFloat(v)
    if (!Number.isNaN(parsed) && parsed >= 0) {
      const kg = unit === 'kg' ? parsed : lbToKg(parsed)
      onChange(roundWeight(kg))
    }
  }

  function handleUnitChange(newUnit: WeightUnit) {
    if (newUnit === unit) return
    const parsed = parseFloat(text)
    const currentKg = Number.isNaN(parsed) ? 0 : unit === 'kg' ? parsed : lbToKg(parsed)
    setUnit(newUnit)
    setText(formatWeight(newUnit === 'kg' ? currentKg : kgToLb(currentKg)))
  }

  return (
    <div className="flex gap-2">
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step="0.5"
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        className="h-11 min-w-0 flex-1 rounded-xl border border-neutral-700 bg-neutral-950 px-3 text-base text-neutral-100 outline-none focus:border-orange-500"
      />
      <select
        value={unit}
        onChange={(e) => handleUnitChange(e.target.value as WeightUnit)}
        className="h-11 rounded-xl border border-neutral-700 bg-neutral-950 px-2 text-base text-neutral-100 outline-none focus:border-orange-500"
        aria-label="Weight unit"
      >
        <option value="kg">kg</option>
        <option value="lb">lb</option>
      </select>
    </div>
  )
}
