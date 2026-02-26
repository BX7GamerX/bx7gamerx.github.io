import { lazy, Suspense } from 'react'
import './styles/global.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ParticleBackground } from './components/ParticleBackground'
import { TerminalOverlay } from './components/TerminalOverlay'
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
      <TerminalOverlay />
    </>
  )
}
