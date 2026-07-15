import { useState } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import './ThoughtLeadership.css'

interface Article {
  id: string
  title: string
  description: string
  date: string
  content: string
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
  const [ref, isVisible] = useIntersectionObserver(0.1)

  return (
    <section id="thought-leadership" ref={ref as React.RefObject<HTMLElement>} className={`thoughts-section reveal ${isVisible ? 'visible' : ''}`}>
      <h2 className="section-title mono">
        <span className="text-plasma">&gt;</span> BENCHMARKS
      </h2>
      <p className="section-subtitle">
        Performance appendix for the portfolio build.
      </p>

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
    </section>
  )
}
