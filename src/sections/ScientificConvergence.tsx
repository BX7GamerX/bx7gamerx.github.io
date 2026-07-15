import { useState } from 'react'
import { DetailDrawer } from '../components/DetailDrawer'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import './ScientificConvergence.css'

function InfraDiagram() {
  return (
    <svg viewBox="0 0 900 220" className="arch-diagram" aria-label="WordPress infrastructure hardening diagram">
      <rect x="20" y="70" width="150" height="70" rx="6" className="arch-node" />
      <text x="95" y="100" className="arch-label" textAnchor="middle">Browser</text>
      <text x="95" y="120" className="arch-label-sub" textAnchor="middle">Traffic</text>

      <rect x="210" y="70" width="150" height="70" rx="6" className="arch-node" />
      <text x="285" y="100" className="arch-label" textAnchor="middle">CDN</text>
      <text x="285" y="120" className="arch-label-sub" textAnchor="middle">Edge cache</text>

      <rect x="400" y="70" width="150" height="70" rx="6" className="arch-node" />
      <text x="475" y="100" className="arch-label" textAnchor="middle">Nginx</text>
      <text x="475" y="120" className="arch-label-sub" textAnchor="middle">Tuned proxy</text>

      <rect x="590" y="70" width="150" height="70" rx="6" className="arch-node" />
      <text x="665" y="100" className="arch-label" textAnchor="middle">Container</text>
      <text x="665" y="120" className="arch-label-sub" textAnchor="middle">Zero downtime</text>

      <rect x="780" y="70" width="100" height="70" rx="6" className="arch-node" />
      <text x="830" y="100" className="arch-label" textAnchor="middle">App</text>
      <text x="830" y="120" className="arch-label-sub" textAnchor="middle">Secure stack</text>

      <line x1="170" y1="105" x2="210" y2="105" className="arch-arrow" />
      <line x1="360" y1="105" x2="400" y2="105" className="arch-arrow" />
      <line x1="550" y1="105" x2="590" y2="105" className="arch-arrow" />
      <line x1="740" y1="105" x2="780" y2="105" className="arch-arrow" />

      <polygon points="208,100 208,110 215,105" className="arch-arrowhead" />
      <polygon points="398,100 398,110 405,105" className="arch-arrowhead" />
      <polygon points="588,100 588,110 595,105" className="arch-arrowhead" />
      <polygon points="778,100 778,110 785,105" className="arch-arrowhead" />
    </svg>
  )
}

export function ScientificConvergence() {
  const [ref, isVisible] = useIntersectionObserver(0.1)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <section id="scientific-convergence" ref={ref as React.RefObject<HTMLElement>} className={`science-section reveal ${isVisible ? 'visible' : ''}`}>
      <h2 className="section-title mono">
        <span className="text-green">&gt;</span> WP_Infrastructure
      </h2>
      <p className="section-subtitle">
        Hardening legacy WordPress infrastructure for high-concurrency delivery.
      </p>

      <div className="science-content">
        <div className="science-header">
          <h3 className="science-hook">Containerized, performance-optimized, secure web stack.</h3>
          <span className="deeptech-project">INFRA_PROPOSAL.md</span>
        </div>

        <div className="science-narrative">
          <p>
            The transition starts with a standard CMS and ends with a tuned delivery path. The build prioritizes Nginx tuning, CDN integration, and zero-downtime deployment.
          </p>
        </div>

        <div className="science-diagram">
          <h4 className="sub-heading">Deployment Topology</h4>
          <div className="diagram-container">
            <InfraDiagram />
          </div>
        </div>

        <div className="science-table-section">
          <h4 className="sub-heading">Hardening Checklist</h4>
          <div className="table-wrapper">
            <table className="science-table">
              <thead>
                <tr>
                  <th>Layer</th>
                  <th>Change</th>
                  <th>Outcome</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mono">Nginx</td>
                  <td>Buffering, keepalive, compression</td>
                  <td className="text-green">Lower latency</td>
                </tr>
                <tr>
                  <td className="mono">CDN</td>
                  <td>Static asset offload</td>
                  <td className="text-teal">Faster global delivery</td>
                </tr>
                <tr className="table-highlight">
                  <td className="mono">Deploy</td>
                  <td>Rolling or blue-green release</td>
                  <td className="text-green">No downtime</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="science-impact">
          <div className="impact-metric">
            <span className="impact-from">Default CMS</span>
            <span className="impact-arrow">→</span>
            <span className="impact-to">Hardened stack</span>
          </div>
          <div className="impact-metric">
            <span className="impact-from">Single server</span>
            <span className="impact-arrow">→</span>
            <span className="impact-to">Containerized delivery</span>
          </div>
        </div>

        <div className="science-wasm-demo">
          <h4 className="sub-heading">Summary</h4>
          <p className="pillar-body">
            The proposal standardizes the runtime, isolates the application, and makes failure domains explicit. It is written to survive traffic spikes and deployment pressure.
          </p>
        </div>

        <button type="button" className="science-open-detail" onClick={() => setDrawerOpen(true)}>
          View proposal drawer
        </button>
      </div>

      <DetailDrawer
        isOpen={drawerOpen}
        title="WordPress Infrastructure Proposal"
        subtitle="Containerized, hardened commercial stack"
        summary="This proposal frames the CMS transition as a release-engineering and traffic-management problem rather than a simple hosting move."
        highlights={[
          'Nginx tuning, CDN integration, and zero-downtime deployment are the core controls.',
          'The stack is designed to shrink the blast radius of deploys and traffic spikes.',
          'The proposal lives in INFRA_PROPOSAL.md for quick reference.',
        ]}
        links={[
          { label: 'Infrastructure Proposal', href: '/INFRA_PROPOSAL.md' },
          { label: 'Benchmarks', href: '/BENCHMARKS.md' },
        ]}
        onClose={() => setDrawerOpen(false)}
      />
    </section>
  )
}
