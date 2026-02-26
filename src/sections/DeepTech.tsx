import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import './DeepTech.css'

function ArchDiagram() {
  return (
    <svg viewBox="0 0 900 200" className="arch-diagram" aria-label="Hostara V4 architectural data flow diagram">
      {/* Nodes */}
      <rect x="10" y="70" width="140" height="60" rx="6" className="arch-node" />
      <text x="80" y="95" className="arch-label" textAnchor="middle">WhatsApp</text>
      <text x="80" y="115" className="arch-label-sub" textAnchor="middle">Webhook</text>

      <rect x="190" y="70" width="140" height="60" rx="6" className="arch-node" />
      <text x="260" y="95" className="arch-label" textAnchor="middle">.NET 8 Ocelot</text>
      <text x="260" y="115" className="arch-label-sub" textAnchor="middle">API Gateway</text>

      <rect x="370" y="70" width="140" height="60" rx="6" className="arch-node" />
      <text x="440" y="95" className="arch-label" textAnchor="middle">Python</text>
      <text x="440" y="115" className="arch-label-sub" textAnchor="middle">Microservice</text>

      <rect x="550" y="70" width="140" height="60" rx="6" className="arch-node" />
      <text x="620" y="95" className="arch-label" textAnchor="middle">PostgreSQL</text>
      <text x="620" y="115" className="arch-label-sub" textAnchor="middle">Txn Lock</text>

      <rect x="730" y="70" width="140" height="60" rx="6" className="arch-node" />
      <text x="800" y="95" className="arch-label" textAnchor="middle">Apache Kafka</text>
      <text x="800" y="115" className="arch-label-sub" textAnchor="middle">Event Bus</text>

      {/* Arrows */}
      <line x1="150" y1="100" x2="190" y2="100" className="arch-arrow" />
      <line x1="330" y1="100" x2="370" y2="100" className="arch-arrow" />
      <line x1="510" y1="100" x2="550" y2="100" className="arch-arrow" />
      <line x1="690" y1="100" x2="730" y2="100" className="arch-arrow" />

      {/* Arrow heads */}
      <polygon points="188,95 188,105 195,100" className="arch-arrowhead" />
      <polygon points="368,95 368,105 375,100" className="arch-arrowhead" />
      <polygon points="548,95 548,105 555,100" className="arch-arrowhead" />
      <polygon points="728,95 728,105 735,100" className="arch-arrowhead" />

      {/* RAG AI annotation */}
      <rect x="370" y="150" width="140" height="35" rx="4" className="arch-node-accent" />
      <text x="440" y="172" className="arch-label-accent" textAnchor="middle">Agentic RAG AI</text>
      <line x1="440" y1="130" x2="440" y2="150" className="arch-arrow-accent" strokeDasharray="4" />
    </svg>
  )
}

export function DeepTech() {
  const [ref, isVisible] = useIntersectionObserver(0.1)

  return (
    <section id="web3-solutions" ref={ref as React.RefObject<HTMLElement>} className={`deeptech-section reveal ${isVisible ? 'visible' : ''}`}>
      <h2 className="section-title mono">
        <span className="text-teal">&gt;</span> Deep_Tech_Architecture
      </h2>
      <p className="section-subtitle">
        Destroying the "Web3 devs can't do traditional backend" objection with
        a production-grade omnichannel commerce platform.
      </p>

      <div className="deeptech-content">
        <div className="deeptech-header">
          <h3 className="deeptech-title">
            Architecting a Zero-Hallucination Omnichannel Operating System
          </h3>
          <span className="deeptech-project">Hostara V4</span>
        </div>

        <div className="deeptech-problem">
          <h4 className="sub-heading">The Problem</h4>
          <p>
            Nairobi's digital economy suffers from a critical
            discovery-conversion gap. Standalone social networks deliver high
            discovery but catastrophically low conversion due to severe
            psychological and technical friction. Basic Large Language Models
            hallucinate prices, instantly destroying trust in informal
            economies.
          </p>
        </div>

        <div className="deeptech-diagram">
          <h4 className="sub-heading">System Architecture</h4>
          <div className="diagram-container">
            <ArchDiagram />
          </div>
        </div>

        <div className="deeptech-solution">
          <h4 className="sub-heading">The Masterpiece: Agentic RAG AI</h4>
          <p>
            Implemented a strict Agentic Retrieval-Augmented Generation
            architecture using Function Calling to lock inventory
            transactionally in PostgreSQL, eliminating hallucination risks and
            race conditions. The custom Python microservice utilizes strict
            Function Calling to ensure zero-hallucination inventory checks
            before routing data back through the Apache Kafka event-driven bus.
          </p>
        </div>

        <div className="deeptech-tags">
          <span className="tech-tag tech-tag--plasma">.NET 8</span>
          <span className="tech-tag tech-tag--green">Python</span>
          <span className="tech-tag tech-tag--teal">PostgreSQL</span>
          <span className="tech-tag tech-tag--plasma">Kafka</span>
          <span className="tech-tag tech-tag--green">Meta Cloud API</span>
          <span className="tech-tag tech-tag--teal">pgvector</span>
        </div>
      </div>
    </section>
  )
}
