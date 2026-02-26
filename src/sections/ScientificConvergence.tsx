import { GenomicChart } from '../components/GenomicChart'
import { WasmDemo } from '../components/WasmDemo'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import './ScientificConvergence.css'

export function ScientificConvergence() {
  const [ref, isVisible] = useIntersectionObserver(0.1)

  return (
    <section id="scientific-convergence" ref={ref as React.RefObject<HTMLElement>} className={`science-section reveal ${isVisible ? 'visible' : ''}`}>
      <h2 className="section-title mono">
        <span className="text-green">&gt;</span> Scientific_Convergence
      </h2>
      <p className="section-subtitle">
        Bridging molecular biology at Kenyatta University with extreme hardware
        optimization. Low-level C++/Rust systems engineering for the real world.
      </p>

      <div className="science-content">
        <div className="science-header">
          <h3 className="science-hook">
            Constraint-Driven Engineering: Bypassing the Compute Gap in the Global South
          </h3>
          <span className="deeptech-project">HelixEdge</span>
        </div>

        <div className="science-narrative">
          <p>
            Antimicrobial Resistance is a macroeconomic crisis. The "Pizza
            Problem" of centralized diagnostics means biological samples require
            14 days to process in centralized hubs, rendering them medically
            useless for rural Kenyan dispensaries. Standard genomic sequencing
            demands 32GB of RAM and powerful GPUs — a physical impossibility for
            off-grid, solar-powered clinics.
          </p>
        </div>

        <div className="science-pillars">
          <div className="pillar">
            <h4 className="pillar-title">Zero-Copy Ingestion</h4>
            <p className="pillar-body">
              Leveraging Rust's inherent memory safety via the{' '}
              <code>zerocopy</code> crate and memory-mapped I/O (<code>mmap</code>)
              to ingest massive streams of raw Oxford Nanopore MinION USB data
              without triggering redundant RAM allocations.
            </p>
          </div>

          <div className="pillar">
            <h4 className="pillar-title">SIMD Vectorization</h4>
            <p className="pillar-body">
              C++ intrinsics and the Parasail library deployed to run the
              computationally expensive Smith-Waterman alignment algorithm on
              older Intel CPUs utilizing AVX2 256-bit registers. Standard FP32
              weights sacrificed for INT8 quantization — 10x speedup.
            </p>
          </div>

          <div className="pillar">
            <h4 className="pillar-title">Split-Index Strategy</h4>
            <p className="pillar-body">
              The strict 4GB RAM limitation of refurbished "grey market" laptops
              overcome by chunking the massive 3.2GB human genome index into 1GB
              blocks, guaranteeing the system never triggers a fatal{' '}
              <code>MemoryError</code>.
            </p>
          </div>
        </div>

        {/* BAM vs CRAM Table */}
        <div className="science-table-section">
          <h4 className="sub-heading">Storage Efficiency: BAM vs CRAM</h4>
          <div className="table-wrapper">
            <table className="science-table">
              <thead>
                <tr>
                  <th>Format</th>
                  <th>File Size (30x WGS)</th>
                  <th>Compression Ratio</th>
                  <th>Random Access</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mono">BAM</td>
                  <td>~80 GB</td>
                  <td>1x (baseline)</td>
                  <td className="text-green">✓</td>
                </tr>
                <tr className="table-highlight">
                  <td className="mono text-teal">CRAM 3.1</td>
                  <td className="text-teal">~35 GB</td>
                  <td className="text-teal">2.3x</td>
                  <td className="text-green">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Genomic Chart */}
        <div className="science-chart">
          <h4 className="sub-heading">Read Depth Coverage — Reference Genome</h4>
          <GenomicChart />
        </div>

        {/* Impact */}
        <div className="science-impact">
          <div className="impact-metric">
            <span className="impact-from">14 days</span>
            <span className="impact-arrow">→</span>
            <span className="impact-to">&lt; 4 hours</span>
          </div>
          <div className="impact-metric">
            <span className="impact-from">Server-grade (32GB+)</span>
            <span className="impact-arrow">→</span>
            <span className="impact-to">$200 laptop</span>
          </div>
        </div>

        {/* Live Wasm Demo */}
        <div className="science-wasm-demo">
          <h4 className="sub-heading">Live Demo — Smith-Waterman Alignment (Rust → Wasm)</h4>
          <WasmDemo />
        </div>
      </div>
    </section>
  )
}
