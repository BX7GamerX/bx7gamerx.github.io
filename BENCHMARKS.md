# Benchmarks

## Current comparisons
| Workload | Interpreted baseline | Rust/Wasm |
| --- | --- | --- |
| Small compute task | Slower | Faster |
| Repeated runs | Higher retained memory | Lower retained memory |
| Local proof engine | Network-bound | Browser-local |

## Notes
Use measured values from the ACSIS harness, the browser proof engine, and the Wasm demo when publishing a release.