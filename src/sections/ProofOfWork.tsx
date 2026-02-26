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
        <span className="text-plasma">&gt;</span> Proof_of_Work
      </h2>
      <p className="section-subtitle">
        Externally verified, competitively won. These aren't personal projects —
        they're battle-tested architectures validated by global hackathon judges.
      </p>

      <div className="proof-grid">
        {/* Gain Chain */}
        <TerminalWindow title="gain_chain.rs" className="proof-card">
          <div className="proof-badge badge-green">ICP HACKATHON WINNER</div>
          <h3 className="proof-title">Award-Winning Fully On-Chain Architecture</h3>
          <p className="proof-body">
            Engineered decentralized applications that operate at web speed
            without relying on centralized cloud providers. Compiled memory-safe
            WebAssembly modules using the <code>ic-cdk</code> Rust Canister
            Development Kit. Leveraged ICP's unique reverse gas model and
            direct HTTPS outcalls to bypass traditional, vulnerable blockchain
            oracles.
          </p>
          <div className="proof-result">
            <span className="result-icon">◆</span>
            <span>1st Place — ICP Hackathon</span>
          </div>
          <div className="proof-tags">
            <TechTag label="Rust" color="green" />
            <TechTag label="ic-cdk" color="plasma" />
            <TechTag label="Wasm" color="teal" />
            <TechTag label="ICP" color="plasma" />
          </div>
        </TerminalWindow>

        {/* UhasibuWatch */}
        <TerminalWindow title="uhasibu_watch.rs" className="proof-card">
          <div className="proof-badge badge-blue">UNODC HACKATHON</div>
          <h3 className="proof-title">Immutable Ledgers for Systemic Transparency</h3>
          <p className="proof-body">
            Engineered during the high-stakes UNODC African Youth
            Anti-Corruption Hackathon in Kenya. Implemented an immutable ledger
            system designed to monitor public programs and mathematically
            prevent procurement fraud. Built for high-stakes geopolitical
            constraints — not theoretical exercises.
          </p>
          <div className="proof-result">
            <span className="result-icon text-plasma">◆</span>
            <span>UNODC Anti-Corruption Hackathon — Kenya</span>
          </div>
          <div className="proof-tags">
            <TechTag label="Blockchain" color="plasma" />
            <TechTag label="Rust" color="green" />
            <TechTag label="ICP" color="teal" />
            <TechTag label="Immutable Ledger" color="plasma" />
          </div>
        </TerminalWindow>
      </div>
    </section>
  )
}
