# ACSIS Grader — Compute Architecture

## Overview
The controller prepares work and the Wasm module executes the compute path locally.

## Architecture
- Controller: C#.
- Runtime: Rust compiled to WebAssembly.
- Execution mode: local-first and deterministic.

## Lifecycle
1. Validate input in the controller.
2. Pass a compact payload to the Wasm module.
3. Return the result directly to the UI.

## Benchmark table
| Metric | Native JS | Rust/Wasm |
| --- | --- | --- |
| Execution latency | Baseline | Lower |
| Memory footprint | Baseline | Lower |

Replace the baseline values with measured release data when they are available.