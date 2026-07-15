import { lazy, Suspense, useState, useEffect, useCallback } from 'react'
import './styles/global.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ParticleBackground } from './components/ParticleBackground'
import { TerminalOverlay } from './components/TerminalOverlay'
import { QuickJumpPalette } from './components/QuickJumpPalette'
import { Hero } from './sections/Hero'
import { ProofOfWork } from './sections/ProofOfWork'
import { DeepTech } from './sections/DeepTech'

const ScientificConvergence = lazy(() =>
  import('./sections/ScientificConvergence').then((m) => ({ default: m.ScientificConvergence }))
)
const ThoughtLeadership = lazy(() =>
  import('./sections/ThoughtLeadership').then((m) => ({ default: m.ThoughtLeadership }))
)
const Contact = lazy(() =>
  import('./sections/Contact').then((m) => ({ default: m.Contact }))
)

function SectionFallback() {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
      <span className="mono">&gt; loading module...</span>
    </div>
  )
}

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [jumpPaletteOpen, setJumpPaletteOpen] = useState(false)
  const toggleTerminal = useCallback(() => setTerminalOpen((prev) => !prev), [])
  const closeTerminal = useCallback(() => setTerminalOpen(false), [])
  const toggleJumpPalette = useCallback(() => setJumpPaletteOpen((prev) => !prev), [])
  const closeJumpPalette = useCallback(() => setJumpPaletteOpen(false), [])

  const jumpTargets = [
    { label: 'ACSIS Grader', description: 'Open the edge compute pillar', href: '#architecture' },
    { label: 'Invariant LimitState', description: 'Open the proof logic pillar', href: '#web3-solutions' },
    { label: 'WP Infrastructure', description: 'Open the hardening pillar', href: '#scientific-convergence' },
    { label: 'Benchmarks', description: 'Jump to the performance appendix', href: '#thought-leadership' },
    { label: 'Contact', description: 'Open the intake form', href: '#initialize-contact' },
    { label: 'Compute Arch Doc', description: 'Open the architecture markdown', href: '/COMPUTE_ARCH.md' },
    { label: 'Proof Logic Doc', description: 'Open the proof logic markdown', href: '/PROOF_LOGIC.md' },
    { label: 'Infrastructure Proposal', description: 'Open the proposal markdown', href: '/INFRA_PROPOSAL.md' },
    { label: 'Benchmarks Doc', description: 'Open the benchmark appendix', href: '/BENCHMARKS.md' },
  ]

  // Global keyboard shortcuts: Ctrl+\ or Ctrl+` for terminal, Ctrl+J for jump palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === '\\' || e.key === '`')) {
        e.preventDefault()
        toggleTerminal()
      } else if (e.ctrlKey && e.key.toLowerCase() === 'j') {
        e.preventDefault()
        toggleJumpPalette()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [toggleJumpPalette, toggleTerminal])

  return (
    <>
      <a href="#home" className="skip-link">Skip to content</a>
      <ParticleBackground />
      <Header />

      <main>
        <Hero />
        <ProofOfWork />
        <DeepTech />
        <Suspense fallback={<SectionFallback />}>
          <ScientificConvergence />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ThoughtLeadership />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
      <TerminalOverlay isOpen={terminalOpen} onClose={closeTerminal} />
      <QuickJumpPalette isOpen={jumpPaletteOpen} onClose={closeJumpPalette} targets={jumpTargets} />

      {/* Floating terminal trigger button */}
      <button
        className="terminal-fab"
        onClick={toggleTerminal}
        aria-label="Open interactive terminal"
        title="Open Terminal (Ctrl + `)"
      >
        &gt;_
      </button>

      <button
        className="terminal-fab terminal-fab--secondary"
        onClick={toggleJumpPalette}
        aria-label="Open quick jump palette"
        title="Quick Jump (Ctrl + J)"
      >
        J
      </button>
    </>
  )
}
