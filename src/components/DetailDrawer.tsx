import './DetailDrawer.css'

export interface DetailDrawerProps {
  isOpen: boolean
  title: string
  subtitle: string
  summary: string
  highlights: string[]
  links?: Array<{ label: string; href: string }>
  onClose: () => void
}

export function DetailDrawer({
  isOpen,
  title,
  subtitle,
  summary,
  highlights,
  links = [],
  onClose,
}: DetailDrawerProps) {
  if (!isOpen) return null

  return (
    <div className="detail-drawer-overlay" onClick={onClose}>
      <aside
        className="detail-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="detail-drawer-header">
          <div>
            <p className="detail-drawer-kicker mono">Project detail</p>
            <h3 className="detail-drawer-title">{title}</h3>
            <p className="detail-drawer-subtitle">{subtitle}</p>
          </div>
          <button type="button" className="detail-drawer-close" onClick={onClose} aria-label="Close detail drawer">
            ×
          </button>
        </div>

        <p className="detail-drawer-summary">{summary}</p>

        <div className="detail-drawer-section">
          <h4>Highlights</h4>
          <ul>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {links.length > 0 && (
          <div className="detail-drawer-section">
            <h4>References</h4>
            <div className="detail-drawer-links">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="detail-drawer-link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}