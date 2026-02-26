import { useState, useEffect } from 'react'
import './Header.css'

const NAV_ITEMS = [
  { label: '[Architecture]', href: '#architecture' },
  { label: '[Web3_Solutions]', href: '#web3-solutions' },
  { label: '[Scientific_Convergence]', href: '#scientific-convergence' },
  { label: '[~/logs/]', href: '#thought-leadership' },
  { label: '[Initialize_Contact]', href: '#initialize-contact' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header className="header">
      <div className="header-inner">
        <a href="#" className="header-logo" aria-label="Scroll to top">
          <span className="logo-prompt">&gt;_</span>
        </a>

        <nav className="header-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className={`hamburger ${mobileOpen ? 'active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="mobile-nav-link"
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <div className="mobile-nav-hint">
          <kbd>Ctrl</kbd> + <kbd>\</kbd> — Open Terminal
        </div>
      </div>
    </header>
  )
}
