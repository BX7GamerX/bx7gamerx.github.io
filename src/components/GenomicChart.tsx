import './GenomicChart.css'

// Seeded PRNG (mulberry32) for deterministic chart output
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

// Generate a simulated read depth coverage curve (deterministic)
function generateCoverage(): number[] {
  const rand = mulberry32(42)
  const points: number[] = []
  let value = 80
  for (let i = 0; i < 100; i++) {
    value += (rand() - 0.48) * 25
    value = Math.max(10, Math.min(190, value))
    points.push(value)
  }
  return points
}

const coverage = generateCoverage()
const width = 800
const height = 200
const padding = { top: 10, right: 20, bottom: 30, left: 50 }
const chartW = width - padding.left - padding.right
const chartH = height - padding.top - padding.bottom

function toPath(data: number[]): string {
  return data
    .map((v, i) => {
      const x = padding.left + (i / (data.length - 1)) * chartW
      const y = padding.top + chartH - (v / 200) * chartH
      return `${i === 0 ? 'M' : 'L'}${x},${y}`
    })
    .join(' ')
}

export function GenomicChart() {
  const path = toPath(coverage)

  // Area fill path
  const firstX = padding.left
  const lastX = padding.left + chartW
  const bottomY = padding.top + chartH
  const areaPath = `${path} L${lastX},${bottomY} L${firstX},${bottomY} Z`

  return (
    <div className="genomic-chart-container">
      <svg viewBox={`0 0 ${width} ${height}`} className="genomic-chart" aria-label="Simulated read depth coverage chart">
        <defs>
          <linearGradient id="teal-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(26, 188, 156, 0.4)" />
            <stop offset="100%" stopColor="rgba(26, 188, 156, 0.02)" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 50, 100, 150, 200].map((tick) => {
          const y = padding.top + chartH - (tick / 200) * chartH
          return (
            <g key={tick}>
              <line
                x1={padding.left}
                y1={y}
                x2={padding.left + chartW}
                y2={y}
                className="chart-grid"
              />
              <text x={padding.left - 8} y={y + 4} className="chart-axis-label" textAnchor="end">
                {tick}x
              </text>
            </g>
          )
        })}

        {/* X axis labels */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const x = padding.left + (tick / 100) * chartW
          return (
            <text key={tick} x={x} y={height - 5} className="chart-axis-label" textAnchor="middle">
              {tick}kb
            </text>
          )
        })}

        {/* Area fill */}
        <path d={areaPath} className="chart-area" />

        {/* Line */}
        <path d={path} className="chart-line" fill="none" />
      </svg>
    </div>
  )
}
