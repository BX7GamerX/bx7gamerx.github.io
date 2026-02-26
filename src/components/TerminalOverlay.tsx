import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react'
import { processCommand } from '../data/commands'
import './TerminalOverlay.css'

interface HistoryEntry {
  command: string
  output: string
  isError?: boolean
}

export function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [cmdIndex, setCmdIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  // Global keyboard shortcut: Ctrl + \
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.ctrlKey && e.key === '\\') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen])

  // Focus input when opened + lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Scroll to bottom on new output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = useCallback(() => {
    if (!input.trim() && input === '') return

    const result = processCommand(input)

    if (result.output === '__CLEAR__') {
      setHistory([])
      setInput('')
      return
    }

    if (input.trim()) {
      setCmdHistory((prev) => [input, ...prev])
    }
    setCmdIndex(-1)

    setHistory((prev) => [
      ...prev,
      { command: input, output: result.output, isError: result.isError },
    ])
    setInput('')
  }, [input])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length > 0) {
        const newIndex = Math.min(cmdIndex + 1, cmdHistory.length - 1)
        setCmdIndex(newIndex)
        setInput(cmdHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cmdIndex > 0) {
        const newIndex = cmdIndex - 1
        setCmdIndex(newIndex)
        setInput(cmdHistory[newIndex])
      } else {
        setCmdIndex(-1)
        setInput('')
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="terminal-overlay" onClick={() => setIsOpen(false)}>
      <div
        className="terminal-overlay-window"
        role="dialog"
        aria-modal="true"
        aria-label="Interactive terminal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="terminal-overlay-titlebar">
          <div className="terminal-dots">
            <span className="dot dot-red" onClick={() => setIsOpen(false)} />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <span className="terminal-overlay-title">SYSTEM.QUERY</span>
          <div className="terminal-dots-spacer" />
        </div>

        <div className="terminal-overlay-body" ref={outputRef}>
          <div className="terminal-welcome mono">
            {'> SYSTEM.QUERY v1.0 — Interactive Terminal'}
            {"\n  Type 'help' for available commands.\n"}
          </div>

          {history.map((entry, i) => (
            <div key={i} className="terminal-entry">
              <div className="terminal-command">
                <span className="prompt-symbol">&gt; </span>
                {entry.command}
              </div>
              {entry.output && (
                <pre className={`terminal-output ${entry.isError ? 'error' : ''}`}>
                  {entry.output}
                </pre>
              )}
            </div>
          ))}

          <div className="terminal-input-line">
            <span className="prompt-symbol">&gt; </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command input"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
