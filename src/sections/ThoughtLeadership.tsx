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
    id: 'rag-pipelines',
    title: 'Why Top-K Similarity Fails in E-Commerce: Building State-Aware RAG Pipelines',
    description: 'Drawing from the Hostara PostgreSQL pgvector implementation to dissect the failures of naive AI integrations.',
    date: '2026-02-15',
    content: `The standard approach to Retrieval-Augmented Generation in e-commerce relies on Top-K similarity search against a vector store. This is fundamentally broken for transactional contexts.

**The Core Failure Mode:**
When a customer asks "Do you have the blue Nike Air Max in size 10?", a naive RAG pipeline performs cosine similarity against product embeddings and returns the top-K most semantically similar results. The problem: semantic similarity has zero awareness of inventory state. The system confidently returns products that are out of stock, wrong size, or discontinued — hallucinating availability.

**The State-Aware Solution:**
In the Hostara V4 architecture, we replaced naive Top-K with a strict Function Calling pipeline:

1. The LLM parses intent (product query, size, color)
2. A deterministic Function Call hits PostgreSQL directly with a transactional read
3. Only confirmed-available inventory is returned to the generation layer
4. The response is grounded in real-time database state, not stale embeddings

**The Trade-off:**
Latency increases by ~200ms per query due to the database round-trip. But in informal economies where a single hallucinated price destroys trust permanently, this trade-off is not optional — it's existential.

This architecture eliminates race conditions between concurrent inventory queries by leveraging PostgreSQL's MVCC isolation. The pgvector extension is still used — but only for discovery, never for transactional confirmation.`,
  },
  {
    id: 'rust-wasm-edge',
    title: 'Memory Safety at the Edge: Leveraging Rust and Wasm for Decentralized Computation',
    description: 'Synthesizing lessons from the ICP Hackathon and Gain Chain development.',
    date: '2026-01-28',
    content: `The Internet Computer Protocol represents a paradigm shift in how we think about backend infrastructure. By compiling Rust to WebAssembly and deploying to ICP canisters, we achieve something previously impossible: deterministic, memory-safe computation running on a decentralized network with web-speed latency.

**Why Rust on ICP Matters:**
The ic-cdk (Internet Computer Canister Development Kit) compiles Rust to Wasm modules that execute inside ICP's replicated state machine. Every canister operation is deterministic — the same input always produces the same output across all subnet replicas. This is a massive constraint that eliminates entire categories of bugs.

**The Reverse Gas Model:**
Unlike Ethereum where users pay gas fees, ICP's reverse gas model means the canister (smart contract) pays for computation via "cycles." This fundamentally changes the UX — end users interact with decentralized applications without needing wallets or tokens upfront.

**Gain Chain's Architecture:**
During the ICP Hackathon, we built Gain Chain using:
- \`ic-cdk\` for canister logic in Rust
- Direct HTTPS outcalls (no oracles needed)
- Stable memory for persistent state across upgrades
- Inter-canister calls for service mesh patterns

The key insight: Wasm's sandboxed execution model combined with Rust's ownership system creates a double safety net. Memory bugs are caught at compile time (Rust), and runtime isolation prevents canister interference (Wasm sandbox).

**The Constraint:**
ICP canisters have strict cycle limits per message. Complex computations must be broken into async inter-canister calls or chunked across heartbeat intervals. This constraint-driven design forces architectural discipline that produces cleaner, more maintainable systems.`,
  },
  {
    id: 'ux-of-distrust',
    title: 'The UX of Distrust: Designing Immutable Systems for Emerging Markets',
    description: 'Combining UhasibuWatch anti-corruption ledger insights with Hostara\'s trust architecture.',
    date: '2026-01-10',
    content: `In Nairobi's informal economy, every digital transaction carries an implicit question: "Can I trust this?" This fundamental distrust — born from years of M-Pesa fraud, fake product listings, and institutional corruption — is not a bug to be patched. It's a design constraint to be engineered around.

**The Trust Deficit:**
When we designed UhasibuWatch for the UNODC Anti-Corruption Hackathon, we confronted a brutal reality: users in emerging markets have been systematically trained to distrust digital systems. Government procurement portals are perceived as tools of corruption, not transparency. Simply making data "available" is insufficient — the data must be verifiably immutable.

**Immutability as UX:**
The immutable ledger in UhasibuWatch doesn't just store procurement data — it makes tampering mathematically provable. Every record is hash-chained. Any modification to historical entries breaks the chain, creating a visible, verifiable breach. This transforms "trust me" into "verify yourself."

**Hostara's Kinetic Trust Ritual:**
In Hostara's commerce platform, we applied a similar principle with what we call the "Kinetic Trust Ritual." Every product listing includes:
1. Real-time inventory confirmation (not cached)
2. Seller verification via WhatsApp business API
3. Transaction escrow with explicit confirmation steps

Each step is a micro-moment that builds trust through friction. Counterintuitively, adding friction to the purchase flow increased conversion by reducing post-purchase disputes to near-zero.

**The Paradox:**
In markets with high institutional distrust, reducing friction reduces trust. The most effective UX design adds intentional, meaningful friction that proves the system is working. Immutability, escrow, and multi-step verification aren't overhead — they're the product.`,
  },
]

export function ThoughtLeadership() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [ref, isVisible] = useIntersectionObserver(0.1)

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className={`thoughts-section reveal ${isVisible ? 'visible' : ''}`}>
      <h2 className="section-title mono">
        <span className="text-plasma">&gt;</span> ~/logs/
      </h2>
      <p className="section-subtitle">
        Deep technical writing, architectural philosophy, and empirical research.
        Thought leadership that justifies premium consulting rates.
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
                  return <p key={i} className="article-para">{para}</p>
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
