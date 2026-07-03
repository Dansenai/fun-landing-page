import { motion, useReducedMotion } from 'framer-motion'

/**
 * FactoryNetwork — the 15 production units as a living mesh over a stylized NCR chart.
 * Clusters sit in true geographic relation (Delhi NW, Gurgaon SW, Noida E across the
 * Yamuna); a faint graticule, river curve, dashed region boundary and hub labels give
 * it a cartographic read without pretending to be a precise map. Lines draw in on
 * scroll, pins pop + pulse, hover enlarges. All colors are theme tokens → dark-mode-safe.
 */

const EASE = [0.16, 1, 0.3, 1] as const

// 15 nodes in three geographic clusters across a 105×62 field.
const N = [
  { x: 34, y: 12 }, { x: 44, y: 17 }, { x: 37, y: 22 }, { x: 28, y: 19 }, { x: 42, y: 28 }, // Delhi (NW, west of the river)
  { x: 23, y: 36 }, { x: 15, y: 42 }, { x: 24, y: 47 }, { x: 17, y: 52 }, { x: 29, y: 52 }, // Gurgaon (SW)
  { x: 68, y: 22 }, { x: 79, y: 18 }, { x: 87, y: 27 }, { x: 73, y: 32 }, { x: 81, y: 41 }, // Noida (E, across the Yamuna)
]
// Curated mesh: dense within hubs, a few bridges between them (two cross the river).
const E: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 0], [2, 4], [1, 4],
  [5, 6], [5, 7], [6, 8], [7, 8], [7, 9], [8, 9],
  [10, 11], [11, 12], [12, 14], [10, 13], [13, 14], [11, 13],
  [4, 5], [2, 5], [1, 10], [4, 13], [9, 14],
]

const LABELS = [
  { x: 36, y: 7, t: 'DELHI' },
  { x: 21, y: 58.5, t: 'GURGAON' },
  { x: 79, y: 47.5, t: 'NOIDA' },
]

export default function FactoryNetwork() {
  const reduce = useReducedMotion()
  return (
    <svg viewBox="0 0 105 62" className="w-full h-auto overflow-visible" role="img"
      aria-label="15 Radnik production units clustered across Delhi, Gurgaon and Noida, connected as one network">

      {/* ── cartographic backdrop (theme tokens: line/stone flip with dark mode) ── */}
      <g aria-hidden="true">
        {/* graticule */}
        <g className="text-line" stroke="currentColor" strokeWidth={0.22} strokeDasharray="0.5 2.2" opacity={0.7}>
          {[13, 26, 39, 52, 65, 78, 91].map((x) => <line key={'v' + x} x1={x} y1={0} x2={x} y2={62} />)}
          {[13, 26, 39, 52].map((y) => <line key={'h' + y} x1={0} y1={y} x2={105} y2={y} />)}
        </g>
        {/* dashed NCR boundary suggestion */}
        <path
          d="M6,34 C8,18 20,6 38,5 C56,4 72,6 88,10 C99,13 102,26 97,38 C92,50 78,56 60,58 C42,60 22,58 13,52 C6.5,47.5 5,42 6,34 Z"
          className="text-stone" stroke="currentColor" strokeWidth={0.3} strokeDasharray="1.6 1.6" fill="none" opacity={0.35}
        />
        {/* the Yamuna — Delhi west of it, Noida east */}
        <path
          d="M58,0 C55,8 61,16 57,24 C53,32 60,38 56,46 C53,52 56,58 54,62"
          className="text-stone" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" fill="none" opacity={0.18}
        />
        {/* compass */}
        <g className="text-stone" opacity={0.55}>
          <line x1={99.5} y1={6.2} x2={99.5} y2={2.6} stroke="currentColor" strokeWidth={0.3} />
          <path d="M99.5,1.6 L98.7,3.4 L100.3,3.4 Z" fill="currentColor" />
          <text x={99.5} y={9.4} textAnchor="middle" fontSize={2.4} className="font-mono fill-current">N</text>
        </g>
        {/* hub labels */}
        {LABELS.map((l) => (
          <text key={l.t} x={l.x} y={l.y} textAnchor="middle" fontSize={2.5} letterSpacing={0.7}
            className="font-mono fill-stone" opacity={0.75}>{l.t}</text>
        ))}
      </g>

      {/* ── connecting lines — draw in on scroll ── */}
      {E.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={N[a].x} y1={N[a].y} x2={N[b].x} y2={N[b].y}
          className="stroke-red" strokeWidth={0.3} strokeOpacity={0.26} strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.15 + i * 0.035, duration: 0.7, ease: EASE }}
        />
      ))}

      {/* ── nodes — pop in, live pulse, hover-enlarge ── */}
      {N.map((n, i) => (
        <motion.g
          key={i}
          className="group cursor-pointer"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          whileHover={reduce ? undefined : { scale: 1.3 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        >
          {/* hit area (also gives the group a bounding box for hover) */}
          <circle cx={n.x} cy={n.y} r={3.6} fill="transparent" />

          {/* live pulse ring */}
          {!reduce && (
            <motion.circle
              cx={n.x} cy={n.y} r={1.7} className="fill-red"
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 3.6], opacity: [0.45, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut', delay: 1.1 + (i % 5) * 0.45 + Math.floor(i / 5) * 0.15 }}
            />
          )}

          {/* pin dot */}
          <motion.circle
            cx={n.x} cy={n.y} r={1.7} className="fill-red"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            initial={reduce ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.55 + i * 0.045, type: 'spring', stiffness: 340, damping: 16 }}
          />
          {/* white core for a "beacon" read */}
          <circle cx={n.x} cy={n.y} r={0.6} fill="#fff" className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.g>
      ))}
    </svg>
  )
}
