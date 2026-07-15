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
            href="/BENCHMARKS.md"
            className="footer-link"
          >
            Benchmarks
          </a>
          <a
            href="/COMPUTE_ARCH.md"
            className="footer-link"
          >
            Compute Arch
          </a>
          <a
            href="mailto:admin@hostara.app"
            className="footer-link"
          >
            admin@hostara.app
          </a>
        </div>

        <div className="footer-badge">
          <span className="badge-text">Powered by Rust &amp; Wasm</span>
        </div>

        <div className="footer-copy">
          <span className="mono">&copy; {new Date().getFullYear()} Simon B. Wandera — Systems Engineer</span>
        </div>
      </div>
    </footer>
  )
}
