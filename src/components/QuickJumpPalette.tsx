import { useEffect, useMemo, useRef, useState } from 'react'
import './QuickJumpPalette.css'

export interface JumpTarget {
  label: string
  description: string
  href: string
}

interface QuickJumpPaletteProps {
  isOpen: boolean
  onClose: () => void
  targets: JumpTarget[]
}

export function QuickJumpPalette({ isOpen, onClose, targets }: QuickJumpPaletteProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [isOpen])

  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  const filteredTargets = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return targets
    return targets.filter((target) =>
      `${target.label} ${target.description}`.toLowerCase().includes(normalized),
    )
  }, [query, targets])

  if (!isOpen) return null

  return (
    <div className="jump-palette-overlay" onClick={onClose}>
      <div className="jump-palette" role="dialog" aria-modal="true" aria-label="Quick jump palette" onClick={(e) => e.stopPropagation()}>
        <div className="jump-palette-header">
          <div>
            <p className="jump-palette-kicker mono">Quick jump</p>
            <h3 className="jump-palette-title">Jump to a section</h3>
          </div>
          <button type="button" className="jump-palette-close" onClick={onClose} aria-label="Close quick jump palette">×</button>
        </div>

        <input
          ref={inputRef}
          className="jump-palette-input"
          type="search"
          placeholder="Type to filter sections or docs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="jump-palette-list">
          {filteredTargets.map((target) => (
            <a key={target.href} href={target.href} className="jump-palette-item" onClick={onClose}>
              <span className="jump-palette-item-label">{target.label}</span>
              <span className="jump-palette-item-description">{target.description}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}