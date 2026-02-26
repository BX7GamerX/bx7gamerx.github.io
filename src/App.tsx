import './styles/global.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ParticleBackground } from './components/ParticleBackground'
import { TerminalOverlay } from './components/TerminalOverlay'
import { Hero } from './sections/Hero'
import { ProofOfWork } from './sections/ProofOfWork'
import { DeepTech } from './sections/DeepTech'
import { ScientificConvergence } from './sections/ScientificConvergence'
import { ThoughtLeadership } from './sections/ThoughtLeadership'
import { Contact } from './sections/Contact'

export default function App() {
  return (
    <>
      <ParticleBackground />
      <Header />

      <main>
        <Hero />
        <ProofOfWork />
        <DeepTech />
        <ScientificConvergence />
        <ThoughtLeadership />
        <Contact />
      </main>

      <Footer />
      <TerminalOverlay />
    </>
  )
}
