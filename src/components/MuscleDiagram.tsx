import type { MuscleGroup } from '../lib/muscleGroups'

interface Props {
  group: MuscleGroup | null
}

const BASE = 'fill-neutral-800 stroke-neutral-700'
const HL = 'fill-[url(#muscleGlow)] stroke-orange-400/60'
const HL_STROKE = 1.5

/**
 * Stylized front/back body silhouette built from muscle-shaped blocks. The block(s) matching
 * `group` render with the orange highlight gradient; everything else stays neutral. This is an
 * original illustration (not sourced from any reference image) so it can share the app's exact
 * palette and scale cleanly at any size.
 */
export function MuscleDiagram({ group }: Props) {
  const showBack = group === 'back' || group === 'triceps'
  return showBack ? <BackView group={group} /> : <FrontView group={group} />
}

function Defs() {
  return (
    <defs>
      <linearGradient id="muscleGlow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--color-orange-400)" />
        <stop offset="100%" stopColor="var(--color-red-600)" />
      </linearGradient>
    </defs>
  )
}

function cls(active: boolean) {
  return active ? HL : BASE
}

function FrontView({ group }: Props) {
  return (
    <svg viewBox="0 0 240 400" className="h-full w-full" aria-hidden="true">
      <Defs />
      {/* head + neck */}
      <ellipse cx="120" cy="30" rx="17" ry="20" className={BASE} strokeWidth="1.5" />
      <rect x="110" y="46" width="20" height="14" rx="6" className={BASE} strokeWidth="1.5" />

      {/* shoulders (deltoids) */}
      <ellipse cx="70" cy="76" rx="19" ry="17" className={cls(group === 'shoulders')} strokeWidth={HL_STROKE} />
      <ellipse cx="170" cy="76" rx="19" ry="17" className={cls(group === 'shoulders')} strokeWidth={HL_STROKE} />

      {/* chest (pecs) */}
      <ellipse cx="103" cy="90" rx="22" ry="25" className={cls(group === 'chest')} strokeWidth={HL_STROKE} />
      <ellipse cx="137" cy="90" rx="22" ry="25" className={cls(group === 'chest')} strokeWidth={HL_STROKE} />

      {/* biceps + forearms */}
      <rect x="46" y="94" width="19" height="48" rx="9" className={cls(group === 'biceps')} strokeWidth={HL_STROKE} />
      <rect x="175" y="94" width="19" height="48" rx="9" className={cls(group === 'biceps')} strokeWidth={HL_STROKE} />
      <rect x="47" y="146" width="16" height="46" rx="8" className={BASE} strokeWidth="1.5" />
      <rect x="177" y="146" width="16" height="46" rx="8" className={BASE} strokeWidth="1.5" />

      {/* abs + obliques */}
      <rect x="99" y="116" width="42" height="62" rx="14" className={cls(group === 'abs')} strokeWidth={HL_STROKE} />
      <rect x="83" y="128" width="14" height="42" rx="7" className={cls(group === 'abs')} strokeWidth={HL_STROKE} />
      <rect x="143" y="128" width="14" height="42" rx="7" className={cls(group === 'abs')} strokeWidth={HL_STROKE} />
      {group !== 'abs' && (
        <g className="stroke-neutral-900" strokeWidth="1.5">
          <line x1="120" y1="122" x2="120" y2="172" />
          <line x1="102" y1="136" x2="138" y2="136" />
          <line x1="102" y1="152" x2="138" y2="152" />
        </g>
      )}

      {/* hip connector */}
      <rect x="92" y="178" width="56" height="22" rx="11" className={BASE} strokeWidth="1.5" />

      {/* quads + calves */}
      <rect x="88" y="200" width="27" height="92" rx="13" className={cls(group === 'legs')} strokeWidth={HL_STROKE} />
      <rect x="125" y="200" width="27" height="92" rx="13" className={cls(group === 'legs')} strokeWidth={HL_STROKE} />
      <rect x="90" y="296" width="22" height="66" rx="10" className={cls(group === 'legs')} strokeWidth={HL_STROKE} />
      <rect x="128" y="296" width="22" height="66" rx="10" className={cls(group === 'legs')} strokeWidth={HL_STROKE} />
      <ellipse cx="101" cy="370" rx="14" ry="7" className={BASE} strokeWidth="1.5" />
      <ellipse cx="139" cy="370" rx="14" ry="7" className={BASE} strokeWidth="1.5" />
    </svg>
  )
}

function BackView({ group }: Props) {
  return (
    <svg viewBox="0 0 240 400" className="h-full w-full" aria-hidden="true">
      <Defs />
      {/* head + neck */}
      <ellipse cx="120" cy="30" rx="17" ry="20" className={BASE} strokeWidth="1.5" />
      <rect x="110" y="46" width="20" height="14" rx="6" className={BASE} strokeWidth="1.5" />

      {/* trapezius */}
      <path d="M90 58 L150 58 L134 96 L106 96 Z" className={cls(group === 'back')} strokeWidth={HL_STROKE} />

      {/* rear delts */}
      <ellipse cx="70" cy="78" rx="18" ry="16" className={BASE} strokeWidth="1.5" />
      <ellipse cx="170" cy="78" rx="18" ry="16" className={BASE} strokeWidth="1.5" />

      {/* lats */}
      <path
        d="M84 74 C68 100 66 150 84 176 L108 168 L108 88 Z"
        className={cls(group === 'back')}
        strokeWidth={HL_STROKE}
      />
      <path
        d="M156 74 C172 100 174 150 156 176 L132 168 L132 88 Z"
        className={cls(group === 'back')}
        strokeWidth={HL_STROKE}
      />

      {/* triceps + forearms */}
      <rect x="47" y="94" width="19" height="48" rx="9" className={cls(group === 'triceps')} strokeWidth={HL_STROKE} />
      <rect x="174" y="94" width="19" height="48" rx="9" className={cls(group === 'triceps')} strokeWidth={HL_STROKE} />
      <rect x="48" y="146" width="16" height="46" rx="8" className={BASE} strokeWidth="1.5" />
      <rect x="176" y="146" width="16" height="46" rx="8" className={BASE} strokeWidth="1.5" />

      {/* lower back */}
      <rect x="108" y="164" width="24" height="34" rx="10" className={cls(group === 'back')} strokeWidth={HL_STROKE} />

      {/* glutes + hip connector */}
      <rect x="92" y="178" width="56" height="22" rx="11" className={BASE} strokeWidth="1.5" />
      <ellipse cx="103" cy="204" rx="20" ry="20" className={BASE} strokeWidth="1.5" />
      <ellipse cx="137" cy="204" rx="20" ry="20" className={BASE} strokeWidth="1.5" />

      {/* hamstrings + calves */}
      <rect x="88" y="222" width="27" height="72" rx="13" className={BASE} strokeWidth="1.5" />
      <rect x="125" y="222" width="27" height="72" rx="13" className={BASE} strokeWidth="1.5" />
      <rect x="90" y="296" width="22" height="66" rx="10" className={BASE} strokeWidth="1.5" />
      <rect x="128" y="296" width="22" height="66" rx="10" className={BASE} strokeWidth="1.5" />
      <ellipse cx="101" cy="370" rx="14" ry="7" className={BASE} strokeWidth="1.5" />
      <ellipse cx="139" cy="370" rx="14" ry="7" className={BASE} strokeWidth="1.5" />
    </svg>
  )
}
