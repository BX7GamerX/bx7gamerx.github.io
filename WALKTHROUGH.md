# Portfolio Rebuild Walkthrough

> **Project:** Elite Systems Engineering Portfolio — Terminal-Inspired KDE Breeze Dark Design
> **Tech Stack:** React 18 + TypeScript + Vite 6 | Rust + wasm-pack (Smith-Waterman Wasm)
> **Deployment:** GitHub Pages via GitHub Actions
> **Repo:** `bx7gamerx.github.io` (serves at root `/`)
> **Date Started:** February 26, 2026
> **Design Spec:** See `portfoliodock.md` for full directive

---

## Table of Contents

1. [Phase 0: Project Scaffolding](#phase-0-project-scaffolding)
2. [Phase 1: Design System Foundation](#phase-1-design-system-foundation)
3. [Phase 2: Global Navigation & Layout Shell](#phase-2-global-navigation--layout-shell)
4. [Phase 3: Section 1 — Terminal Hero](#phase-3-section-1--terminal-hero)
5. [Phase 4: Section 2 — Proof of Work](#phase-4-section-2--proof-of-work)
6. [Phase 5: Section 3 — Deep Tech Architecture](#phase-5-section-3--deep-tech-architecture)
7. [Phase 6: Section 4 — Scientific Convergence](#phase-6-section-4--scientific-convergence)
8. [Phase 7: Section 5 — Thought Leadership](#phase-7-section-5--thought-leadership)
9. [Phase 8: Section 6 — High-Friction Contact](#phase-8-section-6--high-friction-contact)
10. [Phase 9: Interactive Terminal Overlay](#phase-9-interactive-terminal-overlay)
11. [Phase 10: Wasm Integration](#phase-10-wasm-integration)
12. [Phase 11: Polish & Responsive Design](#phase-11-polish--responsive-design)
13. [Phase 12: Deployment](#phase-12-deployment)

---

## Phase 0: Project Scaffolding

### Context
The current repo contains a vanilla HTML/CSS/JS portfolio with a neon cyan/purple aesthetic that does **not** match the directive. All existing files (`index.html`, `style.css`, `script.js`, `css/`, `js/`) must be archived and replaced with a Vite + React + TypeScript project. The `portfoliodock.md` directive and reusable assets (project images) are preserved.

### Steps

#### Step 0.1 — Archive old files
```bash
mkdir -p _archive
mv index.html style.css script.js css/ js/ _archive/
# Keep: portfoliodock.md, assets/ (images), WALKTHROUGH.md, .git/
```
**Why:** Preserves rollback capability while clearing the repo root for Vite initialization.

#### Step 0.2 — Initialize Vite + React + TypeScript
```bash
npm create vite@latest . -- --template react-ts
```
**Creates:** `package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`, `src/`, `public/`, `index.html` (Vite's entry point)

**Why:** Vite provides instant HMR, native TypeScript support, and clean Wasm module integration via `vite-plugin-wasm`.

#### Step 0.3 — Install core dependencies
```bash
npm install react-type-animation react-winbox vite-plugin-wasm vite-plugin-top-level-await react-markdown
npm install -D @types/react @types/react-dom
```

| Package | Purpose |
|---------|---------|
| `react-type-animation` | MIT-licensed typing animation for hero boot sequence |
| `react-winbox` | Draggable floating window for terminal overlay (KDE Plasma aesthetic) |
| `vite-plugin-wasm` | Wasm ESM integration for Rust-compiled Smith-Waterman module |
| `vite-plugin-top-level-await` | Required companion for Wasm plugin |
| `react-markdown` | Renders thought leadership articles from `.md` files |

#### Step 0.4 — Configure Vite
**File:** `vite.config.ts`
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig({
  plugins: [react(), wasm(), topLevelAwait()],
  base: '/',
})
```
**Why:** `base: '/'` because `username.github.io` repos serve from root, not a subpath.

#### Step 0.5 — Add `.nojekyll` to `public/`
```bash
touch public/.nojekyll
```
**Why:** Prevents GitHub Pages from processing the build output with Jekyll (which ignores `_` prefixed files/folders).

#### Step 0.6 — Create GitHub Actions deployment workflow
**File:** `.github/workflows/deploy.yml`
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: false
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```
**Why:** Automated CI/CD — every push to `main` builds and deploys without committing `dist/` to the repo.

#### Step 0.7 — Configure `.gitignore`
```
node_modules/
dist/
.vite/
*.local
_archive/
wasm/target/
wasm/pkg/
```

---

## Phase 1: Design System Foundation

### Context
The directive specifies an exact color palette derived from KDE Plasma Breeze Dark + Fedora brand guidelines, a 4-tier typographic hierarchy (JetBrains Mono, Inter, Space Grotesk), and cyberpunk data visualization aesthetics with neon `filter: drop-shadow()` glow effects. This phase establishes all CSS custom properties, font imports, and reusable style utilities that every subsequent component depends on.

### Steps

#### Step 1.1 — Create CSS variables file
**File:** `src/styles/variables.css`

| Variable | Hex | Source | Usage |
|----------|-----|--------|-------|
| `--base-bg` | `#232627` | KDE Breeze Dark | Primary viewport background |
| `--alt-surface` | `#31363B` | KDE Breeze Dark | Cards, terminal windows, panels |
| `--plasma-blue` | `#3DAEE9` | KDE Breeze Dark | Links, active prompts, primary CTAs |
| `--fedora-green` | `#79C931` | Fedora Brand | Success states, primary CTA buttons |
| `--fedora-blue` | `#0B57A4` | Fedora Brand | Gradients, hover states, secondary nav |
| `--bio-teal` | `#1ABC9C` | KDE Breeze Dark | Bioinformatics data visualizations |
| `--text-primary` | `#FCFCFC` | KDE Breeze Dark | Body copy, terminal output |
| `--text-faint` | `#EFF0F1` | KDE Breeze Dark | Comments, metadata, labels |

#### Step 1.2 — Create typography file
**File:** `src/styles/typography.css`

| Role | Font | Weight | Used For |
|------|------|--------|----------|
| Display & Terminal | JetBrains Mono | 400, 700 | Headlines, terminal output, nav, code blocks |
| Body Copy | Inter | 300, 400 | Case studies, bio text |
| Metadata | JetBrains Mono | 300 italic | Date stamps, tags, stack labels |
| Section Subheadings | Space Grotesk | 500, 600 | Section transitions, component labels |

Fonts loaded via Google Fonts `@import` in `variables.css`.

#### Step 1.3 — Create global styles
**File:** `src/styles/global.css`
- Dark-mode-only base (no light theme toggle)
- Custom scrollbar styled with `--alt-surface` track and `--plasma-blue` thumb
- Smooth scrolling via `scroll-behavior: smooth`
- Selection color: `--plasma-blue` background
- Neon glow utility: `.neon-glow { filter: drop-shadow(0 0 6px var(--plasma-blue)); }`
- SVG line glow: `.svg-glow { filter: drop-shadow(0 0 4px var(--bio-teal)); }`

---

## Phase 2: Global Navigation & Layout Shell

### Context
The navigation replaces the current generic 6-link nav (`Home, About, Skills, Projects, Resume, Contact`) with a terminal-style bracketed nomenclature: `[Architecture]`, `[Web3 Solutions]`, `[Scientific Convergence]`, `[Initialize_Contact]`. The logo is a terminal prompt `>_` rendered in JetBrains Mono. The footer contains GitHub, ICP profile, PGP key, and a "Powered by Rust & Wasm" badge.

### Steps

#### Step 2.1 — Header component
**File:** `src/components/Header.tsx`
- Fixed position, `--base-bg` background with subtle `border-bottom: 1px solid var(--alt-surface)`
- Left: `>_` logo in `JetBrains Mono Bold` (clickable, scrolls to top)
- Right: 4 nav links in `JetBrains Mono 400`, styled with brackets: `[Architecture]`, `[Web3_Solutions]`, `[Scientific_Convergence]`, `[Initialize_Contact]`
- Hover: text color transitions to `--plasma-blue`
- Mobile: hamburger icon toggling a `--alt-surface` slide-in panel

#### Step 2.2 — Footer component
**File:** `src/components/Footer.tsx`
- `--alt-surface` background
- Links section: GitHub repo, ICP Developer Profile, PGP Public Key block (code block in `JetBrains Mono`)
- "Powered by Rust & Wasm" badge in `--fedora-green` outline
- `© 2026` copyright

#### Step 2.3 — App shell
**File:** `src/App.tsx`
- Renders: `<Header />` → `<Hero />` → `<ProofOfWork />` → `<DeepTech />` → `<ScientificConvergence />` → `<ThoughtLeadership />` → `<Contact />` → `<Footer />`
- `<TerminalOverlay />` rendered as a portal, toggled by `Ctrl + \`
- Scroll-to-section handled by native anchor IDs

---

## Phase 3: Section 1 — Terminal Hero

### Context
The hero is the first thing visitors see. Instead of a headshot + generic typed text, it features an interactive simulated terminal window with a boot sequence animation. The terminal window uses `--alt-surface` border with KDE-style traffic light buttons. After the boot sequence completes, the headline fades in alongside the terminal. The CTA is a `--fedora-green` button with terminal-style bracketed text.

### Steps

#### Step 3.1 — TerminalWindow reusable component
**File:** `src/components/TerminalWindow.tsx`
- Props: `title?: string`, `children`, `className?`
- Renders a container with:
  - Title bar: 3 traffic light circles (red, yellow, green — 12px dots), title text in `JetBrains Mono 300 italic`
  - Body: `--base-bg` background, `JetBrains Mono 400` text, padding 1.5rem
  - Border: `1px solid var(--alt-surface)`, `border-radius: 8px`

#### Step 3.2 — Hero section
**File:** `src/sections/Hero.tsx`
- Full viewport height (`100vh`), `--base-bg` background
- Flexbox center layout: terminal on left, headline on right (stacked on mobile)
- Boot sequence via `react-type-animation`:
  ```
  > loading modules... [rust, c++, kafka, ic-cdk]     ← 800ms pause
  > fetching credentials...                            ← 600ms pause
    ICP_HACKATHON_WINNER=true                          ← 400ms pause
  > verifying...                                       ← 600ms pause
    KENYATTA_UNIV_BIOCHEM=active                       ← 400ms pause
  > SYSTEM READY                                       ← triggers headline fade-in
  ```
- Headline (Space Grotesk 600): *"Constraint-Driven Systems Engineering. From Award-Winning ICP Wasm Environments to High-Throughput Kafka Backends."*
- Sub-headline (Inter 400): *"Specializing in bridging Kenyatta University biochemistry research with low-level Rust architecture. Creator of 'Gain Chain' and the HelixEdge offline genomic surveillance system."*
- CTA button: `[ Execute: View_Architecture ]` in `--fedora-green`

#### Step 3.3 — Particle network background
**File:** `src/components/ParticleBackground.tsx`
- Port existing `js/background.js` canvas animation to React (`useRef` + `useEffect`)
- Recolor: particles in `--plasma-blue`, connections fade with distance
- Mouse-tracking interactive particle
- Scroll-based opacity reduction
- Retina-aware (`devicePixelRatio`)

---

## Phase 4: Section 2 — Proof of Work

### Context
This section validates technical authority through externally verified hackathon wins. Two case studies displayed in a CSS Grid split-pane: Gain Chain (ICP Hackathon win) and UhasibuWatch (UNODC Anti-Corruption Hackathon). Each renders inside an elevated `TerminalWindow` card. The copywriting follows the "Rule of Specificity" — no generic claims, only architectural facts.

### Steps

#### Step 4.1 — ProofOfWork section
**File:** `src/sections/ProofOfWork.tsx`
- Section ID: `#architecture`
- 2-column CSS Grid (`1fr 1fr` on desktop, single column on mobile)
- **Left card — Gain Chain & Skillnet:**
  - Badge: `ICP HACKATHON WINNER` in `--fedora-green`
  - Headline (Space Grotesk 600): "Award-Winning Fully On-Chain Architecture"
  - Copy (Inter 400): Details `ic-cdk` Rust Wasm modules, ICP reverse gas model, direct HTTPS outcalls bypassing oracles
  - Tech stack tags: `Rust`, `ic-cdk`, `Wasm`, `ICP` — rendered as inline badges in `JetBrains Mono 300`
  - Result callout: "1st Place — ICP Hackathon"
- **Right card — UhasibuWatch:**
  - Badge: `UNODC HACKATHON` in `--plasma-blue`
  - Headline: "Immutable Ledgers for Systemic Transparency"
  - Copy: UNODC African Youth Anti-Corruption context, immutable procurement fraud prevention
  - Tech stack tags: `ICP`, `Blockchain`, `Rust`

---

## Phase 5: Section 3 — Deep Tech Architecture

### Context
This section destroys the "Web3 devs can't do traditional backend" objection by deep-diving into Hostara V4 — a zero-hallucination omnichannel commerce platform. Features an SVG architectural data-flow diagram tracing the system from WhatsApp Webhook through .NET 8 Ocelot API Gateway to Python microservice to PostgreSQL to Kafka. The key narrative is the Agentic RAG AI integration that eliminates LLM price hallucination.

### Steps

#### Step 5.1 — DeepTech section
**File:** `src/sections/DeepTech.tsx`
- Section ID: `#web3-solutions`
- Title (JetBrains Mono 700): "Architecting a Zero-Hallucination Omnichannel Operating System"
- Problem statement (Inter 400): Nairobi's discovery-conversion gap, standalone social network failure mode
- SVG data-flow diagram component (inline SVG):
  - `WhatsApp Webhook` → `.NET 8 Ocelot Gateway` → `Python Microservice` → `PostgreSQL Lock` → `Kafka Bus`
  - Colors: nodes in `--fedora-blue`, connections in `--bio-teal`, text in `--text-primary`
  - Glow effect: `filter: drop-shadow(0 0 4px var(--bio-teal))`
- Technical highlight block: "Agentic RAG AI" — strict Function Calling, zero-hallucination inventory checks
- Tech stack tags: `.NET 8`, `Python`, `PostgreSQL`, `Kafka`, `Meta Cloud API`, `pgvector`

---

## Phase 6: Section 4 — Scientific Convergence

### Context
The portfolio's ultimate differentiator — bridging Kenyatta University biochemistry with C++/Rust edge engineering. The HelixEdge project proves the subject can compress server-grade genomic computing into a $200 laptop. Three sub-sections detail Zero-Copy Ingestion, SIMD Vectorization, and Split-Index Strategy. Includes a cyberpunk-styled SVG chart showing read depth coverage and a BAM vs CRAM comparison table. The Wasm Smith-Waterman demo is embedded here.

### Steps

#### Step 6.1 — ScientificConvergence section
**File:** `src/sections/ScientificConvergence.tsx`
- Section ID: `#scientific-convergence`
- Hook (JetBrains Mono 700): "Constraint-Driven Engineering: Bypassing the Compute Gap in the Global South"
- Problem narrative (Inter 400): AMR crisis, "Pizza Problem" of centralized diagnostics, 14-day sample processing, 32GB RAM requirement vs solar-powered clinics
- Three technical sub-sections (Space Grotesk 500 headings + Inter 400 body):
  1. **Zero-Copy Ingestion** — `zerocopy` crate, `mmap`, Oxford Nanopore MinION USB streams
  2. **SIMD Vectorization** — C++ intrinsics, Parasail library, Smith-Waterman on AVX2 256-bit
  3. **Split-Index Strategy** — 3.2GB genome index chunked into 1GB blocks for 4GB RAM constraint
- Impact callout: `14 days → < 4 hours | Server-grade → $200 laptop`

#### Step 6.2 — BAM vs CRAM comparison table
- Rendered as a styled `<table>` with `--alt-surface` rows, `JetBrains Mono` values
- Columns: Format | File Size | Compression Ratio | Random Access

#### Step 6.3 — Cyberpunk data visualization
**File:** `src/components/GenomicChart.tsx`
- Inline SVG: simulated read depth coverage chart
- X-axis: genomic position (0–100kb)
- Y-axis: read depth (0–200x)
- Line rendered in `--bio-teal` with `filter: drop-shadow(0 0 6px #1ABC9C)` glow
- Background: `--base-bg`, grid lines in `--alt-surface`
- Axis labels in `JetBrains Mono 300`

#### Step 6.4 — Wasm Smith-Waterman demo (see Phase 10)
- Embedded `<WasmDemo />` component at the bottom of this section

---

## Phase 7: Section 5 — Thought Leadership

### Context
Titled `~/logs/` or `system.logs` instead of "Blog" to maintain the terminal aesthetic. A minimalist article list with 3 launch articles. Clicking expands into a focused reading view with optimal typography (`Inter`, 1.7 line-height, max-width 700px). Articles stored as markdown in `src/content/` and rendered via `react-markdown`.

### Steps

#### Step 7.1 — ThoughtLeadership section
**File:** `src/sections/ThoughtLeadership.tsx`
- Section title in `JetBrains Mono`: `~/logs/`
- List of 3 articles, each showing: title, one-line description, date stamp in `JetBrains Mono 300 italic`
- Click handler toggles expanded view (CSS transition: `max-height` or conditional render)
- Expanded view: `Inter 400`, `line-height: 1.7`, `max-width: 700px`, centered

#### Step 7.2 — Article content files
**Directory:** `src/content/`
- `rag-pipelines.md` — "Why Top-K Similarity Fails in E-Commerce"
- `rust-wasm-edge.md` — "Memory Safety at the Edge"
- `ux-of-distrust.md` — "The UX of Distrust: Designing Immutable Systems for Emerging Markets"

Each file contains placeholder/draft content (500-800 words) following the "Rule of Specificity" copywriting standard.

---

## Phase 8: Section 6 — High-Friction Contact

### Context
No generic "Contact Me" form. This is a command-line-styled qualification interface that deliberately filters low-budget inquiries. Form fields are typed like programming variables. Budget tiers anchor expectations to $100+/hr. The submit button reads `[ TRANSMIT_PAYLOAD ]`. Form submission via Formspree (serverless, no backend).

### Steps

#### Step 8.1 — Contact section
**File:** `src/sections/Contact.tsx`
- Section ID: `#initialize-contact`
- Intro copy (Inter 400): "I partner exclusively with technical founders and enterprise engineering teams to architect robust, offline-first, and memory-safe systems. To initiate a technical discovery phase, define your system constraints in the payload below."
- Form styled inside a `TerminalWindow` component
- Fields (all in `JetBrains Mono`):
  - `[string] Client_Entity_Name` → `<input type="text" />`
  - `[enum] Project_Scope` → `<select>`: Web3/ICP, Distributed Systems, Computational Biology, Other
  - `[enum] Budget_Allocation` → `<select>`: <$10k, $10k-$50k, $50k+
  - `[text] Technical_Constraints` → `<textarea>` with placeholder: "Briefly describe the architectural bottleneck, legacy debt, or scaling constraint you are currently facing."
- Submit button: `[ TRANSMIT_PAYLOAD ]` in `--fedora-green`
- Form action: Formspree endpoint (requires signup for endpoint URL)

---

## Phase 9: Interactive Terminal Overlay

### Context
A global interactive terminal accessible at any point via `Ctrl + \`. Opens in a `react-winbox` floating window (draggable, resizable, KDE Plasma aesthetic). Commands are handled locally via JavaScript — no server round-trips for basic commands. This is a custom ~200-line terminal component, not xterm.js (which is overkill for a simulated terminal).

### Steps

#### Step 9.1 — Terminal overlay component
**File:** `src/components/TerminalOverlay.tsx`
- Global keyboard listener (`Ctrl + \`) toggles visibility
- Wraps content in `react-winbox` `<WinBox>` component:
  - Title: `SYSTEM.QUERY`
  - Width: 600px, Height: 400px
  - Background: `--base-bg`, border: `--alt-surface`
- Internal state: `commandHistory: string[]`, `currentInput: string`
- Input: single-line `<input>` styled as terminal prompt `> ` in `JetBrains Mono`
- Output: scrollable `<div>` rendering command history and results

#### Step 9.2 — Command data and handlers
**File:** `src/data/commands.ts`
- `help` → returns formatted list of available commands
- `cat gain_chain.md` → returns Gain Chain case study summary (pre-formatted markdown string)
- `show stack` → returns JSON-highlighted tech stack:
  ```json
  {
    "systems": ["Rust", "C++"],
    "backend": ["Kafka", ".NET 8", "PostgreSQL"],
    "web3": ["ICP", "ic-cdk", "Wasm"],
    "frontend": ["React", "TypeScript", "Flutter"],
    "science": ["Parasail", "htslib", "Nanopore"]
  }
  ```
- `execute diagnostics` → simulated Lighthouse benchmark output (animated line-by-line)
- `clear` → clears terminal output
- Unknown commands → `"Command not found. Type 'help' for available commands."`

---

## Phase 10: Wasm Integration

### Context
The most impactful feature — a live Rust-compiled Wasm module running a simplified Smith-Waterman sequence alignment algorithm directly in the browser. This transforms the portfolio from a reading document into a live proof of concept. The Wasm binary is pre-compiled locally and committed to the repo so CI doesn't need a Rust toolchain.

### Prerequisites
- Rust toolchain installed (`rustup`)
- `wasm-pack` installed (`cargo install wasm-pack`)

### Steps

#### Step 10.1 — Create Rust Wasm project
```bash
mkdir -p wasm && cd wasm
cargo init --lib
```
**File:** `wasm/Cargo.toml`
```toml
[package]
name = "smith-waterman-wasm"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
serde = { version = "1", features = ["derive"] }
serde-wasm-bindgen = "0.6"
```

#### Step 10.2 — Implement Smith-Waterman algorithm
**File:** `wasm/src/lib.rs`
- `#[wasm_bindgen] pub fn align(seq1: &str, seq2: &str) -> JsValue`
- Simplified Smith-Waterman: linear gap penalty, O(m×n) DP matrix fill, traceback
- Returns: `AlignmentResult { score, aligned_seq1, aligned_seq2, matrix_size }`
- ~150-250 lines of Rust

#### Step 10.3 — Build Wasm module
```bash
cd wasm
wasm-pack build --target web --out-dir ../src/wasm/pkg
```
- Outputs `.wasm` binary + JS glue code to `src/wasm/pkg/`
- These files are committed to the repo

#### Step 10.4 — Wasm demo React component
**File:** `src/components/WasmDemo.tsx`
- Two text inputs pre-filled with example DNA sequences (e.g., `ACGTACGT` and `ACGTTGCA`)
- `[ Execute: Align_Sequences ]` button in `--plasma-blue`
- On click: `import('./wasm/pkg')` → calls `align(seq1, seq2)`
- Renders:
  - Alignment score
  - Aligned sequence pair (monospace, color-coded matches)
  - Execution time (measured via `performance.now()`)
  - Matrix dimensions
- Loading state while Wasm initializes

---

## Phase 11: Polish & Responsive Design

### Context
The portfolio must be technically flawless — a $100+/hr engineer's site cannot have broken layouts or poor accessibility. Three responsive tiers, scroll animations, WCAG AA compliance, and performance optimization (lazy loading, code splitting, image optimization).

### Steps

#### Step 11.1 — Responsive breakpoints
- Desktop: >1024px (default)
- Tablet: 768–1024px (nav collapses, 2-col grids become single column)
- Mobile: <768px (full stack layout, hamburger nav, terminal windows 100% width)

#### Step 11.2 — Scroll animations
- Custom `useIntersectionObserver` hook
- Sections fade up on viewport entry (`opacity: 0 → 1`, `translateY(30px) → 0`)
- No external library (AOS removed)

#### Step 11.3 — Accessibility
- WCAG AA contrast: all text colors validated against `--base-bg` (#232627)
  - `--text-primary` (#FCFCFC): contrast ratio 15.3:1 ✓
  - `--text-faint` (#EFF0F1): contrast ratio 14.1:1 ✓
  - `--plasma-blue` (#3DAEE9) on dark: 7.2:1 ✓
  - `--fedora-green` (#79C931) on dark: 8.5:1 ✓
- Semantic HTML5: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`
- `aria-label` on icon-only buttons (hamburger, terminal toggle)
- Keyboard navigation: `Tab` through all interactive elements, `Escape` closes terminal overlay
- `prefers-reduced-motion` media query disables animations

#### Step 11.4 — Performance
- `React.lazy()` + `Suspense` for heavy sections (ScientificConvergence, WasmDemo)
- Wasm module loaded on-demand (not at page load)
- Images converted to `.webp` format
- Font loading: `font-display: swap` to prevent FOIT
- Target: Lighthouse 90+ across Performance, Accessibility, Best Practices, SEO

---

## Phase 12: Deployment

### Context
Final verification and production deployment. The GitHub Actions workflow auto-builds on push to `main`. GitHub Pages must be configured to use "GitHub Actions" as the source (not branch-based).

### Steps

#### Step 12.1 — Clean repo
```bash
rm -rf _archive/  # Remove archived old files (optional, or keep for reference)
```
- Verify `.gitignore` covers `node_modules/`, `dist/`, `.vite/`, `wasm/target/`, `wasm/pkg/`

#### Step 12.2 — Local verification
```bash
npm run dev        # Dev server at localhost:5173
npm run build      # Production build to dist/
npm run preview    # Preview production build
```
**Checklist:**
- [ ] All 6 sections render with correct Breeze Dark colors
- [ ] JetBrains Mono, Inter, Space Grotesk fonts load
- [ ] Hero boot sequence animation plays correctly
- [ ] `Ctrl + \` opens terminal overlay
- [ ] Terminal commands work: `help`, `cat gain_chain.md`, `show stack`, `clear`
- [ ] Wasm demo: enter sequences, click execute, alignment renders
- [ ] Responsive: 375px (mobile), 768px (tablet), 1440px (desktop)
- [ ] Contact form submits successfully
- [ ] All nav links scroll to correct sections
- [ ] No console errors

#### Step 12.3 — Configure GitHub Pages
1. Go to repo Settings > Pages
2. Set Source to "GitHub Actions"
3. Push to `main` — workflow triggers automatically

#### Step 12.4 — Production verification
```bash
npx lighthouse https://bx7gamerx.github.io --view
```
- Target: 90+ Performance, 90+ Accessibility, 90+ Best Practices, 90+ SEO

---

## Architecture Reference

### File Structure (Final)
```
bx7gamerx.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   └── .nojekyll
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── TerminalWindow.tsx
│   │   ├── TerminalOverlay.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── GlowButton.tsx
│   │   ├── GenomicChart.tsx
│   │   ├── WasmDemo.tsx
│   │   └── SectionContainer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ProofOfWork.tsx
│   │   ├── DeepTech.tsx
│   │   ├── ScientificConvergence.tsx
│   │   ├── ThoughtLeadership.tsx
│   │   └── Contact.tsx
│   ├── content/
│   │   ├── rag-pipelines.md
│   │   ├── rust-wasm-edge.md
│   │   └── ux-of-distrust.md
│   ├── data/
│   │   └── commands.ts
│   ├── hooks/
│   │   └── useIntersectionObserver.ts
│   ├── styles/
│   │   ├── variables.css
│   │   ├── typography.css
│   │   └── global.css
│   ├── wasm/
│   │   └── pkg/          (pre-compiled Wasm output)
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── wasm/                  (Rust source)
│   ├── Cargo.toml
│   └── src/
│       └── lib.rs
├── assets/
│   └── images/
├── portfoliodock.md
├── WALKTHROUGH.md
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .gitignore
```

### Color Palette Quick Reference
| Variable | Hex | Preview |
|----------|-----|---------|
| `--base-bg` | `#232627` | ████ |
| `--alt-surface` | `#31363B` | ████ |
| `--plasma-blue` | `#3DAEE9` | ████ |
| `--fedora-green` | `#79C931` | ████ |
| `--fedora-blue` | `#0B57A4` | ████ |
| `--bio-teal` | `#1ABC9C` | ████ |
| `--text-primary` | `#FCFCFC` | ████ |
| `--text-faint` | `#EFF0F1` | ████ |

### Typography Quick Reference
| Role | Font | Weight |
|------|------|--------|
| Terminal/Display | JetBrains Mono | 400, 700 |
| Body | Inter | 300, 400 |
| Metadata | JetBrains Mono | 300 italic |
| Subheadings | Space Grotesk | 500, 600 |

---

## Key Decisions Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | React + TypeScript + Vite | Component architecture, type safety, clean Wasm integration |
| Terminal component | Custom (~200 LOC) | xterm.js overkill for simulated terminal; full control, zero bloat |
| Typing animation | `react-type-animation` | MIT license (typed.js is GPL-3.0), native React component |
| Window manager | `react-winbox` | KDE Plasma aesthetic, draggable/resizable floating window |
| Wasm delivery | Pre-compiled, committed | Avoids requiring Rust toolchain in CI |
| Light theme | Removed | Directive is exclusively dark-mode |
| Contact form backend | Formspree | Serverless, no infrastructure for static GitHub Pages site |
| Headline | "Constraint-Driven Systems Engineering..." | Deep Tech & Edge Innovator positioning |
| CSS approach | CSS custom properties + modules | No CSS-in-JS overhead; native CSS variables for theme consistency |
