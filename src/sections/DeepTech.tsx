import { useState } from 'react'
import { DetailDrawer } from '../components/DetailDrawer'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import './DeepTech.css'

function LogicDiagram() {
  return (
    <svg viewBox="0 0 900 220" className="arch-diagram" aria-label="Invariant LimitState logic engine diagram">
      <rect x="20" y="70" width="170" height="70" rx="6" className="arch-node" />
      <text x="105" y="100" className="arch-label" textAnchor="middle">Predicate Input</text>
      <text x="105" y="120" className="arch-label-sub" textAnchor="middle">Local data only</text>

      <rect x="240" y="70" width="170" height="70" rx="6" className="arch-node" />
      <text x="325" y="100" className="arch-label" textAnchor="middle">Logic Engine</text>
      <text x="325" y="120" className="arch-label-sub" textAnchor="middle">FOPL rules</text>

      <rect x="460" y="70" width="170" height="70" rx="6" className="arch-node" />
      <text x="545" y="100" className="arch-label" textAnchor="middle">Browser Proof</text>
      <text x="545" y="120" className="arch-label-sub" textAnchor="middle">No API calls</text>

      <rect x="680" y="70" width="170" height="70" rx="6" className="arch-node" />
      <text x="765" y="100" className="arch-label" textAnchor="middle">Deterministic</text>
      <text x="765" y="120" className="arch-label-sub" textAnchor="middle">Verdict</text>

      <line x1="190" y1="105" x2="240" y2="105" className="arch-arrow" />
      <line x1="410" y1="105" x2="460" y2="105" className="arch-arrow" />
      <line x1="630" y1="105" x2="680" y2="105" className="arch-arrow" />

      <polygon points="238,100 238,110 245,105" className="arch-arrowhead" />
      <polygon points="458,100 458,110 465,105" className="arch-arrowhead" />
      <polygon points="678,100 678,110 685,105" className="arch-arrowhead" />
    </svg>
  )
}

export function DeepTech() {
  const [ref, isVisible] = useIntersectionObserver(0.1)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <section id="web3-solutions" ref={ref as React.RefObject<HTMLElement>} className={`deeptech-section reveal ${isVisible ? 'visible' : ''}`}>
      <h2 className="section-title mono">
        <span className="text-teal">&gt;</span> Invariant_LimitState
      </h2>
      <p className="section-subtitle">
        Local-first structural verification using First-Order Predicate Logic.
      </p>

      <div className="deeptech-content">
        <div className="deeptech-header">
          <h3 className="deeptech-title">Browser-native predicate evaluation with deterministic output.</h3>
          <span className="deeptech-project">PROOF_LOGIC.md</span>
        </div>

        <div className="deeptech-problem">
          <h4 className="sub-heading">The Problem</h4>
          <p>
            Remote verification adds latency, failure modes, and privacy risk. The engine keeps the rule set and the evidence together in the browser.
          </p>
        </div>

        <div className="deeptech-diagram">
          <h4 className="sub-heading">Logic Flow</h4>
          <div className="diagram-container">
            <LogicDiagram />
          </div>
        </div>

        <div className="deeptech-solution">
          <h4 className="sub-heading">Implementation</h4>
          <p>
            The engine parses predicates, normalizes constants, and resolves truth values against local state. The result is a browser-only proof path with no external API dependency.
          </p>
        </div>

        <div className="deeptech-tags">
          <span className="tech-tag tech-tag--plasma">FOPL</span>
          <span className="tech-tag tech-tag--green">Browser-only</span>
          <span className="tech-tag tech-tag--teal">Local-first</span>
          <span className="tech-tag tech-tag--plasma">No API calls</span>
        </div>

        <button type="button" className="deeptech-open-detail" onClick={() => setDrawerOpen(true)}>
          View proof drawer
        </button>
      </div>

      <DetailDrawer
        isOpen={drawerOpen}
        title="Invariant LimitState"
        subtitle="Browser-native predicate evaluation"
        summary="This pillar keeps the proof state local and deterministic so the browser can evaluate logic without external calls."
        highlights={[
          'Predicate input, logic engine, browser proof, deterministic verdict.',
          'The flow is optimized for local-first privacy and predictable latency.',
          'The repo-level PROOF_LOGIC doc contains the implementation notes.',
        ]}
        links={[
          { label: 'Proof Logic', href: '/PROOF_LOGIC.md' },
          { label: 'Benchmarks', href: '/BENCHMARKS.md' },
        ]}
        onClose={() => setDrawerOpen(false)}
      />
    </section>
  )
}
