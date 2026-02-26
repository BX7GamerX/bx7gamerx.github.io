import { useState, useCallback, useRef, useEffect } from 'react'
import { TerminalWindow } from './TerminalWindow'
import './WasmDemo.css'

interface AlignmentResult {
  score: number
  aligned_query: string
  aligned_reference: string
  identity: number
  gaps: number
  alignment_length: number
  elapsed_us: number
}

type WasmModule = {
  smith_waterman: (query: string, reference: string) => AlignmentResult
  generate_sequence: (length: number, mutationRate: number) => string
}

export function WasmDemo() {
  const [wasmMod, setWasmMod] = useState<WasmModule | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AlignmentResult | null>(null)
  const [seqLength, setSeqLength] = useState(100)
  const [mutationRate, setMutationRate] = useState(0.15)
  const [query, setQuery] = useState('')
  const [reference, setReference] = useState('')
  const [running, setRunning] = useState(false)
  const initRef = useRef(false)

  // Lazy-load Wasm
  useEffect(() => {
    if (initRef.current) return
    initRef.current = true

    setLoading(true)
    import('../wasm-pkg/helix_edge_wasm.js')
      .then(async (mod) => {
        await mod.default()
        setWasmMod(mod as unknown as WasmModule)
        setLoading(false)
      })
      .catch((err) => {
        setError(`Wasm init failed: ${err.message}`)
        setLoading(false)
      })
  }, [])

  const generateSequences = useCallback(() => {
    if (!wasmMod) return
    const ref = wasmMod.generate_sequence(seqLength, 0)
    const q = wasmMod.generate_sequence(seqLength, mutationRate)
    setReference(ref)
    setQuery(q)
    setResult(null)
  }, [wasmMod, seqLength, mutationRate])

  const runAlignment = useCallback(() => {
    if (!wasmMod || !query || !reference) return
    setRunning(true)
    requestAnimationFrame(() => {
      const res = wasmMod.smith_waterman(query, reference)
      setResult(res)
      setRunning(false)
    })
  }, [wasmMod, query, reference])

  if (error) {
    return (
      <TerminalWindow title="wasm://smith-waterman [ERROR]">
        <div className="wasm-error">
          <span className="text-red">[WASM_INIT_ERROR]</span> {error}
        </div>
      </TerminalWindow>
    )
  }

  return (
    <TerminalWindow title="wasm://smith-waterman — HelixEdge Demo">
      <div className="wasm-demo">
        {loading ? (
          <div className="wasm-loading">
            <span className="blink">▋</span> Loading WebAssembly module...
          </div>
        ) : (
          <>
            {/* Controls */}
            <div className="wasm-controls">
              <div className="wasm-control-row">
                <label className="mono text-faint">
                  seq_length<span className="text-blue">::</span>
                  <input
                    type="number"
                    min={10}
                    max={500}
                    value={seqLength}
                    onChange={(e) => setSeqLength(Number(e.target.value))}
                    className="wasm-input"
                  />
                </label>
                <label className="mono text-faint">
                  mutation_rate<span className="text-blue">::</span>
                  <input
                    type="number"
                    min={0}
                    max={1}
                    step={0.05}
                    value={mutationRate}
                    onChange={(e) => setMutationRate(Number(e.target.value))}
                    className="wasm-input"
                  />
                </label>
              </div>

              <div className="wasm-btn-row">
                <button
                  className="wasm-btn"
                  onClick={generateSequences}
                  disabled={!wasmMod}
                >
                  [ generate_pair ]
                </button>
                <button
                  className="wasm-btn wasm-btn-run"
                  onClick={runAlignment}
                  disabled={!wasmMod || !query || !reference || running}
                >
                  {running ? '[ aligning... ]' : '[ align_sw ]'}
                </button>
              </div>
            </div>

            {/* Sequences */}
            {query && (
              <div className="wasm-sequences">
                <div className="wasm-seq-block">
                  <span className="wasm-seq-label text-green">query &gt;</span>
                  <code className="wasm-seq-data">{query}</code>
                </div>
                <div className="wasm-seq-block">
                  <span className="wasm-seq-label text-blue">ref   &gt;</span>
                  <code className="wasm-seq-data">{reference}</code>
                </div>
              </div>
            )}

            {/* Results */}
            {result && (
              <div className="wasm-result">
                <div className="wasm-result-header">
                  <span className="text-green">[ ALIGNMENT_COMPLETE ]</span>
                  <span className="wasm-elapsed text-teal">
                    {result.elapsed_us.toFixed(1)} µs
                  </span>
                </div>

                <div className="wasm-alignment-display">
                  <div className="wasm-aligned-row">
                    <span className="wasm-aln-label">Q:</span>
                    <code className="wasm-aln-seq">{result.aligned_query}</code>
                  </div>
                  <div className="wasm-aligned-row wasm-match-row">
                    <span className="wasm-aln-label">&nbsp;</span>
                    <code className="wasm-aln-seq wasm-match-line">
                      {result.aligned_query
                        .split('')
                        .map((c, i) =>
                          c === result.aligned_reference[i]
                            ? c === '-'
                              ? ' '
                              : '|'
                            : ' '
                        )
                        .join('')}
                    </code>
                  </div>
                  <div className="wasm-aligned-row">
                    <span className="wasm-aln-label">R:</span>
                    <code className="wasm-aln-seq">{result.aligned_reference}</code>
                  </div>
                </div>

                <div className="wasm-stats">
                  <div className="wasm-stat">
                    <span className="wasm-stat-label">Score</span>
                    <span className="wasm-stat-value text-green">{result.score}</span>
                  </div>
                  <div className="wasm-stat">
                    <span className="wasm-stat-label">Identity</span>
                    <span className="wasm-stat-value text-teal">{result.identity.toFixed(1)}%</span>
                  </div>
                  <div className="wasm-stat">
                    <span className="wasm-stat-label">Gaps</span>
                    <span className="wasm-stat-value">{result.gaps}</span>
                  </div>
                  <div className="wasm-stat">
                    <span className="wasm-stat-label">Length</span>
                    <span className="wasm-stat-value">{result.alignment_length}</span>
                  </div>
                </div>

                <p className="wasm-footnote text-faint">
                  Computed in-browser via Rust → WebAssembly. Production HelixEdge
                  uses SIMD-accelerated Parasail on bare metal.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </TerminalWindow>
  )
}
