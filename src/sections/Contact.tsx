import { useState, type FormEvent } from 'react'
import { TerminalWindow } from '../components/TerminalWindow'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import './Contact.css'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [ref, isVisible] = useIntersectionObserver(0.1)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // In production, integrate with Formspree or similar
    setSubmitted(true)
  }

  return (
    <section id="initialize-contact" ref={ref as React.RefObject<HTMLElement>} className={`contact-section reveal ${isVisible ? 'visible' : ''}`}>
      <h2 className="section-title mono">
        <span className="text-green">&gt;</span> Initialize_Contact
      </h2>

      <p className="contact-intro">
        I partner exclusively with technical founders and enterprise engineering
        teams to architect robust, offline-first, and memory-safe systems. To
        initiate a technical discovery phase, define your system constraints in
        the payload below.
      </p>

      <div className="contact-form-wrapper">
        <TerminalWindow title="payload.submit">
          {submitted ? (
            <div className="contact-success">
              <p className="mono text-green">&gt; PAYLOAD_RECEIVED</p>
              <p className="mono text-faint">
                Your system constraints have been logged. Expect a technical
                discovery response within 48 hours.
              </p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label className="field-label mono">
                  <span className="text-plasma">[string]</span> Client_Entity_Name
                </label>
                <input
                  type="text"
                  name="client_name"
                  required
                  className="field-input"
                  placeholder="Your organization or name"
                />
              </div>

              <div className="form-field">
                <label className="field-label mono">
                  <span className="text-plasma">[enum]</span> Project_Scope
                </label>
                <select name="project_scope" required className="field-input">
                  <option value="">-- Select scope --</option>
                  <option value="web3-icp">Web3/ICP</option>
                  <option value="distributed-systems">Distributed Systems</option>
                  <option value="computational-biology">Computational Biology</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-field">
                <label className="field-label mono">
                  <span className="text-plasma">[enum]</span> Budget_Allocation
                </label>
                <select name="budget" required className="field-input">
                  <option value="">-- Select budget tier --</option>
                  <option value="under-10k">&lt; $10k</option>
                  <option value="10k-50k">$10k – $50k</option>
                  <option value="50k-plus">$50k+</option>
                </select>
              </div>

              <div className="form-field">
                <label className="field-label mono">
                  <span className="text-plasma">[text]</span> Technical_Constraints
                </label>
                <textarea
                  name="constraints"
                  required
                  className="field-input field-textarea"
                  rows={4}
                  placeholder="Briefly describe the architectural bottleneck, legacy debt, or scaling constraint you are currently facing."
                />
              </div>

              <button type="submit" className="submit-button">
                [ TRANSMIT_PAYLOAD ]
              </button>
            </form>
          )}
        </TerminalWindow>
      </div>
    </section>
  )
}
