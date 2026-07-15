import { useState } from 'react'
import { DetailDrawer } from '../components/DetailDrawer'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import './ThoughtLeadership.css'

interface Article {
  id: string
  title: string
  description: string
  date: string
  content: string
}

type BenchmarkMode = 'latency' | 'memory' | 'composite'

const BENCHMARK_MODES: Record<BenchmarkMode, { label: string; description: string; js: number; wasm: number }> = {
  latency: {
    label: 'Latency',
    description: 'Relative response cost for a compute step.',
    js: 82,
    wasm: 47,
  },
  memory: {
    label: 'Memory',
    description: 'Relative retained footprint across repeated runs.',
    js: 78,
    wasm: 42,
  },
  composite: {
    label: 'Composite',
    description: 'Combined score across responsiveness and memory retention.',
    js: 80,
    wasm: 45,
  },
}

const ARTICLES: Article[] = [
  {
    id: 'benchmarks',
    title: 'Rust/Wasm Versus Interpreted Baselines',
    description: 'Measured and documented comparison points for the current portfolio build.',
    date: '2026-02-15',
    content: `**Benchmark surfaces**

1. Native JS execution time.
2. Rust/Wasm execution time.
3. Memory footprint under repeated runs.

**Reporting rule**
Use measured values from the ACSIS harness or browser demo. Keep the table in the repo current with each release.

**Interpretation**
The comparison should show lower latency and lower retained memory for the Rust/Wasm path, especially on repeated workloads.`,
  },
  {
    id: 'compute-arch',
    title: 'ACSIS Grader Compute Architecture',
    description: 'How the controller delegates work into an edge-safe Wasm execution path.',
    date: '2026-01-28',
    content: `**Execution lifecycle**

1. The C# controller validates the request and prepares the payload.
2. The Wasm module receives the data and executes the compute step locally.
3. The result is returned to the UI without a remote hop.

**Design rule**
Keep the hot path deterministic and keep the controller thin.

**Operational note**
This keeps the benchmark focused on execution cost instead of request orchestration.`,
  },
  {
    id: 'infrastructure-proposal',
    title: 'WordPress Infrastructure Proposal',
    description: 'Commercial hardening summary for a containerized, secure web stack.',
    date: '2026-01-10',
    content: `**Scope**

- Nginx tuning.
- CDN integration.
- Zero-downtime deployment pipelines.

**Outcome**

Shorter release windows, clearer rollback boundaries, and a smaller blast radius when traffic spikes.`,
  },
]

/** Render inline markdown: **bold**, `code`, and \`backtick\` spans */
function renderInline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

export function ThoughtLeadership() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [benchmarkMode, setBenchmarkMode] = useState<BenchmarkMode>('latency')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [ref, isVisible] = useIntersectionObserver(0.1)
  const benchmark = BENCHMARK_MODES[benchmarkMode]

  return (
    <section id="thought-leadership" ref={ref as React.RefObject<HTMLElement>} className={`thoughts-section reveal ${isVisible ? 'visible' : ''}`}>
      <h2 className="section-title mono">
        <span className="text-plasma">&gt;</span> BENCHMARKS
      </h2>
      <p className="section-subtitle">
        Performance appendix for the portfolio build.
      </p>

      <div className="benchmark-shell">
        <div className="benchmark-controls" role="tablist" aria-label="Benchmark modes">
          {(['latency', 'memory', 'composite'] as BenchmarkMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              className={`benchmark-chip ${benchmarkMode === mode ? 'active' : ''}`}
              onClick={() => setBenchmarkMode(mode)}
              aria-pressed={benchmarkMode === mode}
            >
              {BENCHMARK_MODES[mode].label}
            </button>
          ))}
        </div>

        <div className="benchmark-panel">
          <div className="benchmark-panel-copy">
            <p className="benchmark-kicker mono">Interactive benchmark</p>
            <h3 className="benchmark-title">{benchmark.label} comparison</h3>
            <p className="benchmark-desc">{benchmark.description}</p>
          </div>

          <div className="benchmark-bars" aria-label="Relative benchmark bars">
            <div className="benchmark-bar-group">
              <span className="benchmark-bar-label mono">Native JS</span>
              <div className="benchmark-bar-track">
                <div className="benchmark-bar benchmark-bar--js" style={{ width: `${benchmark.js}%` }} />
              </div>
              <span className="benchmark-bar-value mono">{benchmark.js}</span>
            </div>
            <div className="benchmark-bar-group">
              <span className="benchmark-bar-label mono">Rust/Wasm</span>
              <div className="benchmark-bar-track">
                <div className="benchmark-bar benchmark-bar--wasm" style={{ width: `${benchmark.wasm}%` }} />
              </div>
              <span className="benchmark-bar-value mono">{benchmark.wasm}</span>
            </div>
          </div>

          <button type="button" className="benchmark-open-detail" onClick={() => setDrawerOpen(true)}>
            Open detail drawer
          </button>
        </div>
      </div>

      <div className="articles-list">
        {ARTICLES.map((article) => (
          <div key={article.id} className="article-item">
            <button
              className="article-header"
              onClick={() => setExpanded(expanded === article.id ? null : article.id)}
              aria-expanded={expanded === article.id}
            >
              <div className="article-meta">
                <span className="article-date mono">{article.date}</span>
              </div>
              <h3 className="article-title">{article.title}</h3>
              <p className="article-desc">{article.description}</p>
              <span className="article-toggle mono">
                {expanded === article.id ? '[ collapse ]' : '[ read ]'}
              </span>
            </button>

            {expanded === article.id && (
              <div className="article-content">
                {article.content.split('\n\n').map((para, i) => {
                  if (para.startsWith('**') && para.endsWith('**')) {
                    return <h4 key={i} className="article-subhead">{para.replace(/\*\*/g, '')}</h4>
                  }
                  if (para.startsWith('**')) {
                    const match = para.match(/^\*\*(.*?)\*\*\s*(.*)$/s)
                    if (match) {
                      return (
                        <div key={i}>
                          <h4 className="article-subhead">{match[1]}</h4>
                          <p className="article-para">{match[2]}</p>
                        </div>
                      )
                    }
                  }
                  if (para.match(/^\d+\./)) {
                    return (
                      <ol key={i} className="article-list">
                        {para.split('\n').map((line, j) => (
                          <li key={j}>{line.replace(/^\d+\.\s*/, '')}</li>
                        ))}
                      </ol>
                    )
                  }
                  if (para.startsWith('- ')) {
                    return (
                      <ul key={i} className="article-list">
                        {para.split('\n').map((line, j) => (
                          <li key={j}>{line.replace(/^- /, '')}</li>
                        ))}
                      </ul>
                    )
                  }
                  return <p key={i} className="article-para" dangerouslySetInnerHTML={{ __html: renderInline(para) }} />
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <DetailDrawer
        isOpen={drawerOpen}
        title="Benchmarks and proof surfaces"
        subtitle="Interactive evidence for the performance appendix"
        summary="Use this drawer to review the benchmark framing, compare the current relative scores, and pivot into the architecture docs when needed."
        highlights={[
          'Toggle between latency, memory, and composite views.',
          'Use the relative bars to scan the comparison without reading the whole article.',
          'Connects directly to the architecture markdown and proposal docs.',
        ]}
        links={[
          { label: 'Compute Architecture', href: '/COMPUTE_ARCH.md' },
          { label: 'Proof Logic', href: '/PROOF_LOGIC.md' },
          { label: 'Infrastructure Proposal', href: '/INFRA_PROPOSAL.md' },
        ]}
        onClose={() => setDrawerOpen(false)}
      />
    </section>
  )
}
