import { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { TerminalWindow } from '../components/TerminalWindow'
import { GlowButton } from '../components/GlowButton'
import './Hero.css'

const BOOT_SEQUENCE = [
  '> loading modules... [rust, c++, kafka, ic-cdk]',
  800,
  '> loading modules... [rust, c++, kafka, ic-cdk]\n> fetching credentials...',
  600,
  '> loading modules... [rust, c++, kafka, ic-cdk]\n> fetching credentials...\n  ICP_HACKATHON_WINNER=true',
  400,
  '> loading modules... [rust, c++, kafka, ic-cdk]\n> fetching credentials...\n  ICP_HACKATHON_WINNER=true\n> verifying...',
  600,
  '> loading modules... [rust, c++, kafka, ic-cdk]\n> fetching credentials...\n  ICP_HACKATHON_WINNER=true\n> verifying...\n  KENYATTA_UNIV_BIOCHEM=active',
  400,
  '> loading modules... [rust, c++, kafka, ic-cdk]\n> fetching credentials...\n  ICP_HACKATHON_WINNER=true\n> verifying...\n  KENYATTA_UNIV_BIOCHEM=active\n\n> SYSTEM READY_',
  1000,
] as const

export function Hero() {
  const [showContent, setShowContent] = useState(false)

  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div className="hero-terminal">
          <TerminalWindow title="system.boot">
            <TypeAnimation
              sequence={[
                ...BOOT_SEQUENCE,
                () => setShowContent(true),
              ]}
              wrapper="pre"
              speed={75}
              cursor={true}
              repeat={0}
              style={{
                whiteSpace: 'pre-wrap',
                display: 'block',
                minHeight: '180px',
              }}
            />
          </TerminalWindow>
        </div>

        <div className={`hero-content ${showContent ? 'visible' : ''}`}>
          <h1 className="hero-headline">
            Constraint-Driven Systems Engineering.{' '}
            <span className="text-plasma">
              From Award-Winning ICP Wasm Environments to High-Throughput Kafka Backends.
            </span>
          </h1>

          <p className="hero-sub">
            Specializing in bridging Kenyatta University biochemistry research
            with low-level Rust architecture. Creator of{' '}
            <span className="text-green">Gain Chain</span> and the{' '}
            <span className="text-teal">HelixEdge</span> offline genomic
            surveillance system.
          </p>

          <div className="hero-actions">
            <GlowButton href="#architecture" variant="green">
              [ Execute: View_Architecture ]
            </GlowButton>
            <GlowButton href="#initialize-contact" variant="blue">
              [ Initialize_Contact ]
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  )
}
