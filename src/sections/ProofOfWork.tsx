import { TerminalWindow } from '../components/TerminalWindow'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import './ProofOfWork.css'

function TechTag({ label, color = 'plasma' }: { label: string; color?: 'plasma' | 'green' | 'teal' }) {
  return <span className={`tech-tag tech-tag--${color}`}>{label}</span>
}

export function ProofOfWork() {
  const [ref, isVisible] = useIntersectionObserver(0.1)

  return (
    <section id="architecture" ref={ref as React.RefObject<HTMLElement>} className={`proof-section reveal ${isVisible ? 'visible' : ''}`}>
      <h2 className="section-title mono">
        <span className="text-plasma">&gt;</span> ACSIS_Grader
      </h2>
      <p className="section-subtitle">
        Moving compute from a central controller to Rust/Wasm edge execution.
      </p>

      <div className="proof-grid">
        {/* Gain Chain */}
        <TerminalWindow title="gain_chain.rs" className="proof-card">
          <div className="proof-badge badge-green">PILLAR I</div>
          <h3 className="proof-title">C# Controller to Wasm Execution Lifecycle</h3>
          <p className="proof-body">
            The controller stages work, the Rust module executes deterministically in Wasm, and the result returns without a network round trip. The design removes interpreter overhead from the hot path.
          </p>
          <div className="proof-result">
            <span className="result-icon">◆</span>
            <span>Local execution replaces remote orchestration</span>
          </div>
          <div className="proof-tags">
            <TechTag label="Rust" color="green" />
            <TechTag label="Wasm" color="teal" />
            <TechTag label="Edge compute" color="plasma" />
          </div>
        </TerminalWindow>

        {/* UhasibuWatch */}
        <TerminalWindow title="uhasibu_watch.rs" className="proof-card">
          <div className="proof-badge badge-blue">SPEC</div>
          <h3 className="proof-title">Benchmark Table</h3>
          <p className="proof-body">
            Use measured values from the ACSIS harness. The table below is the page-facing comparison surface.
          </p>
          <div className="table-wrapper">
            <table className="science-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Native JS</th>
                  <th>Rust/Wasm</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mono">Execution latency</td>
                  <td>Baseline</td>
                  <td className="text-green">Lower</td>
                </tr>
                <tr className="table-highlight">
                  <td className="mono">Memory footprint</td>
                  <td>Baseline</td>
                  <td className="text-teal">Reduced</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="proof-tags">
            <TechTag label="Controller" color="plasma" />
            <TechTag label="Wasm" color="green" />
            <TechTag label="Benchmarks" color="teal" />
          </div>
        </TerminalWindow>
      </div>
    </section>
  )
}
