import React from 'react'
import './GlowButton.css'

interface GlowButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'green' | 'blue' | 'teal'
  className?: string
  download?: string | boolean
}

export function GlowButton({ children, onClick, href, variant = 'green', className = '', download }: GlowButtonProps) {
  const cls = `glow-button glow-button--${variant} ${className}`

  if (href) {
    return (
      <a href={href} className={cls} {...(download !== undefined ? { download: download === true ? '' : download } : {})}>
        {children}
      </a>
    )
  }

  return (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  )
}
