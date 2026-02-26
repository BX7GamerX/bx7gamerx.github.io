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

Hidden commands exist. Real engineers find them.

Keyboard: Ctrl + \\ to toggle terminal`

const WHOAMI = `> Simon B. Wandera
  Role:     Systems Architect
  Base:     Nairobi, Kenya
  Stack:    Rust · C++ · ICP · Kafka
  Focus:    Web3 | Offline-First | Computational Biochemistry
  Status:   AVAILABLE_FOR_CONTRACTS
  Rate:     $100+/hr`

const HOBBIES = `> cat /usr/simon/hobbies.txt

  Compiling Rust takes time. I sketch pencil portraits and track
  global aviation telemetry while waiting for the borrow checker
  to forgive me.

  When I'm not debugging memory layouts, I'm running spectral
  analysis on East African bird songs — because pattern recognition
  isn't just for genomes.

  Also: strong opinions on pour-over coffee grind sizes.`

const UPTIME = `> system.uptime

  Architect Mode:    ACTIVE since 2021
  Hackathons Won:    2 (ICP Global, UNODC Anti-Corruption)
  Canisters Shipped: 14
  Lines of Rust:     ~47,000
  Bugs Squashed:     ERROR: integer overflow
  Coffee Consumed:   ████████████████████ CRITICAL`

const SUDO = `[sudo] password for simon: ********

  Nice try. Root access requires a signed ICP canister call
  with a valid Ed25519 key. No shortcuts.

  However, you clearly have good instincts.
  Type 'whoami' to see if we should talk.`

const PHILOSOPHY = `> /etc/simon/philosophy.conf

  [core]
  principle_1 = "If it compiles, ship it. If it doesn't, the type system is saving you from yourself."
  principle_2 = "Offline-first isn't a feature. It's a moral obligation in markets with 2G connectivity."
  principle_3 = "Every abstraction has a cost. Measure it before you commit to it."

  [controversial]
  hot_take = "Most 'AI-powered' products are just SELECT * FROM products ORDER BY embedding <-> $query LIMIT 5"
  proof    = "See: Hostara V4 — we replaced naive RAG with deterministic function calling and conversion doubled."`

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

  if (cmd === 'whoami' || cmd === 'execute whoami') {
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

  // Easter egg commands
  if (cmd === 'cat /usr/simon/hobbies.txt' || cmd === 'cat hobbies.txt' || cmd === 'hobbies') {
    return { output: HOBBIES }
  }

  if (cmd === 'uptime' || cmd === 'system.uptime') {
    return { output: UPTIME }
  }

  if (cmd.startsWith('sudo')) {
    return { output: SUDO }
  }

  if (cmd === 'cat /etc/simon/philosophy.conf' || cmd === 'cat philosophy.conf' || cmd === 'philosophy') {
    return { output: PHILOSOPHY }
  }

  if (cmd === 'ls' || cmd === 'ls -la') {
    return {
      output: `drwxr-xr-x  simon  staff  gain_chain.md
-rw-r--r--  simon  staff  hobbies.txt
-rw-r--r--  simon  staff  philosophy.conf
-rwxr-xr-x  simon  staff  stack.json
-rwxr-xr-x  simon  staff  diagnostics.sh

Hint: try 'cat hobbies.txt' or 'cat philosophy.conf'`,
    }
  }

  if (cmd === '') {
    return { output: '' }
  }

  return {
    output: `Command not found: "${input.trim()}"\nType 'help' for available commands.`,
    isError: true,
  }
}
