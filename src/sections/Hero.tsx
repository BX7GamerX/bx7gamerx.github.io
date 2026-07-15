import { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { TerminalWindow } from '../components/TerminalWindow'
import { GlowButton } from '../components/GlowButton'
import './Hero.css'

const BOOT_SEQUENCE = [
  '> loading modules... [rust, wasm, distributed-systems]',
  800,
  '> loading modules... [rust, wasm, distributed-systems]\n> verifying architecture...',
  600,
  '> loading modules... [rust, wasm, distributed-systems]\n> verifying architecture...\n  EDGE_COMPUTE_READY=true',
  400,
  '> loading modules... [rust, wasm, distributed-systems]\n> verifying architecture...\n  EDGE_COMPUTE_READY=true\n> loading appendix...',
  600,
  '> loading modules... [rust, wasm, distributed-systems]\n> verifying architecture...\n  EDGE_COMPUTE_READY=true\n> loading appendix...\n  BENCHMARKS_ENABLED=true',
  400,
  '> loading modules... [rust, wasm, distributed-systems]\n> verifying architecture...\n  EDGE_COMPUTE_READY=true\n> loading appendix...\n  BENCHMARKS_ENABLED=true\n\n> SYSTEM READY_',
  1000,
] as const

export function Hero() {
  const [showContent, setShowContent] = useState(false)

  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div className="hero-terminal">
          <TerminalWindow title="system.boot">
            <pre className="hero-boot-text">
              <TypeAnimation
                sequence={[
                  ...BOOT_SEQUENCE,
                  () => setShowContent(true),
                ]}
                wrapper="span"
                speed={75}
                cursor={true}
                repeat={0}
                style={{
                  whiteSpace: 'pre-wrap',
                  display: 'block',
                  minHeight: '180px',
                }}
              />
            </pre>
          </TerminalWindow>
        </div>

        <div className={`hero-content ${showContent ? 'visible' : ''}`}>
          <p className="hero-name mono text-teal">Simon B. Wandera</p>
          <h1 className="hero-headline">
            Systems Engineer. Founder. High-performance computing & local-first data architecture.
          </h1>

          <p className="hero-sub">
            Current focus: Rust, Wasm, and distributed systems. The portfolio is structured as a three-pillar engineering system with measurable performance evidence.
          </p>

          <div className="hero-actions">
            <GlowButton href="#architecture" variant="green">
              [ Open_ACSIS_Grader ]
            </GlowButton>
            <GlowButton href="#web3-solutions" variant="blue">
              [ Open_Invariant_LimitState ]
            </GlowButton>
            <GlowButton href="#thought-leadership" variant="teal">
              [ Open_Benchmarks ]
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  )
}
