import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-links">
          <a
            href="https://github.com/BX7GamerX"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
          <a
            href="https://internetcomputer.org"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            ICP Ecosystem
          </a>
          <a
            href="https://linkedin.com/in/simon-wandera"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            LinkedIn
          </a>
        </div>

        <div className="footer-badge">
          <span className="badge-text">Powered by Rust &amp; Wasm</span>
        </div>

        <div className="footer-copy">
          <span className="mono">&copy; {new Date().getFullYear()} Simon B. Wandera — Systems Architect</span>
        </div>
      </div>
    </footer>
  )
}
