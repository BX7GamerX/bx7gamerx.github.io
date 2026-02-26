interface CommandResult {
  output: string
  isError?: boolean
}

const STACK = {
  systems: ['Rust', 'C++'],
  backend: ['Apache Kafka', '.NET 8', 'PostgreSQL', 'Python'],
  web3: ['ICP', 'ic-cdk', 'WebAssembly'],
  frontend: ['React', 'TypeScript', 'Flutter'],
  science: ['Parasail', 'htslib', 'Oxford Nanopore', 'zerocopy'],
}

const GAIN_CHAIN_MD = `# Gain Chain — ICP Hackathon Winner

## Overview
Fully on-chain decentralized application built on the Internet Computer Protocol.
No centralized cloud dependencies (AWS/GCP). Pure Web3 infrastructure.

## Architecture
- **Language:** Rust (compiled to WebAssembly)
- **Framework:** ic-cdk (Canister Development Kit)
- **Gas Model:** ICP Reverse Gas — users pay nothing
- **Oracles:** Eliminated via Direct HTTPS Outcalls
- **State:** Stable Memory persistence across upgrades

## Key Innovation
Memory-safe Wasm modules executing at web speed on a decentralized subnet.
Inter-canister call orchestration for service mesh patterns.

## Result
🏆 1st Place — ICP Hackathon`

const HELP_TEXT = `Available commands:

  help                  Show this help message
  cat gain_chain.md     Display Gain Chain case study
  show stack            Output technical stack as JSON
  execute diagnostics   Run simulated performance benchmark
  whoami                Display engineer profile
  clear                 Clear terminal output

Keyboard: Ctrl + \\ to toggle terminal`

const WHOAMI = `> Sir Simon
  Role:     Systems Architect
  Base:     Nairobi, Kenya
  Stack:    Rust · C++ · ICP · Kafka
  Focus:    Web3 | Offline-First | Computational Biochemistry
  Status:   AVAILABLE_FOR_CONTRACTS
  Rate:     $100+/hr`

export function processCommand(input: string): CommandResult {
  const cmd = input.trim().toLowerCase()

  if (cmd === 'help') {
    return { output: HELP_TEXT }
  }

  if (cmd === 'cat gain_chain.md') {
    return { output: GAIN_CHAIN_MD }
  }

  if (cmd === 'show stack') {
    return { output: JSON.stringify(STACK, null, 2) }
  }

  if (cmd === 'whoami') {
    return { output: WHOAMI }
  }

  if (cmd === 'execute diagnostics') {
    return {
      output: `> Running diagnostics...

  Performance Audit
  ─────────────────────────────
  First Contentful Paint:   0.8s  ██████████░░  FAST
  Largest Contentful Paint: 1.2s  █████████░░░  FAST
  Time to Interactive:      1.5s  ████████░░░░  GOOD
  Cumulative Layout Shift:  0.02  ███████████░  EXCELLENT
  Total Blocking Time:      50ms  ██████████░░  FAST

  Lighthouse Score: 95/100
  Framework: React + TypeScript + Vite
  Runtime:   Wasm (Rust-compiled)
  Status:    ALL_SYSTEMS_NOMINAL`,
    }
  }

  if (cmd === 'clear') {
    return { output: '__CLEAR__' }
  }

  if (cmd === '') {
    return { output: '' }
  }

  return {
    output: `Command not found: "${input.trim()}"\nType 'help' for available commands.`,
    isError: true,
  }
}
