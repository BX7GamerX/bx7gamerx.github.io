use wasm_bindgen::prelude::*;
use serde::Serialize;

/// Smith-Waterman local alignment result
#[derive(Serialize)]
pub struct AlignmentResult {
    pub score: i32,
    pub aligned_query: String,
    pub aligned_reference: String,
    pub identity: f64,
    pub gaps: usize,
    pub alignment_length: usize,
    pub elapsed_us: f64,
}

/// Scoring parameters for Smith-Waterman
const MATCH_SCORE: i32 = 2;
const MISMATCH_PENALTY: i32 = -1;
const GAP_PENALTY: i32 = -2;

/// Perform Smith-Waterman local alignment.
///
/// This is a simplified but correct implementation of the classic
/// dynamic-programming algorithm used in bioinformatics for
/// pairwise sequence alignment. In HelixEdge, SIMD-accelerated
/// versions of this algorithm (via Parasail/C++ intrinsics) run
/// on constrained hardware.
#[wasm_bindgen]
pub fn smith_waterman(query: &str, reference: &str) -> JsValue {
    let start = js_sys_now();

    let q = query.as_bytes();
    let r = reference.as_bytes();
    let m = q.len();
    let n = r.len();

    // DP matrix (m+1) x (n+1), initialized to 0
    let mut dp = vec![vec![0i32; n + 1]; m + 1];
    let mut max_score = 0i32;
    let mut max_i = 0usize;
    let mut max_j = 0usize;

    // Fill DP matrix
    for i in 1..=m {
        for j in 1..=n {
            let match_val = if q[i - 1] == r[j - 1] {
                MATCH_SCORE
            } else {
                MISMATCH_PENALTY
            };

            let diag = dp[i - 1][j - 1] + match_val;
            let up = dp[i - 1][j] + GAP_PENALTY;
            let left = dp[i][j - 1] + GAP_PENALTY;

            dp[i][j] = 0i32.max(diag).max(up).max(left);

            if dp[i][j] > max_score {
                max_score = dp[i][j];
                max_i = i;
                max_j = j;
            }
        }
    }

    // Traceback
    let mut aligned_q = Vec::new();
    let mut aligned_r = Vec::new();
    let mut i = max_i;
    let mut j = max_j;
    let mut gaps = 0usize;

    while i > 0 && j > 0 && dp[i][j] > 0 {
        let current = dp[i][j];
        let match_val = if q[i - 1] == r[j - 1] {
            MATCH_SCORE
        } else {
            MISMATCH_PENALTY
        };

        if current == dp[i - 1][j - 1] + match_val {
            aligned_q.push(q[i - 1]);
            aligned_r.push(r[j - 1]);
            i -= 1;
            j -= 1;
        } else if current == dp[i - 1][j] + GAP_PENALTY {
            aligned_q.push(q[i - 1]);
            aligned_r.push(b'-');
            gaps += 1;
            i -= 1;
        } else {
            aligned_q.push(b'-');
            aligned_r.push(r[j - 1]);
            gaps += 1;
            j -= 1;
        }
    }

    aligned_q.reverse();
    aligned_r.reverse();

    let alignment_length = aligned_q.len();
    let matches = aligned_q
        .iter()
        .zip(aligned_r.iter())
        .filter(|(a, b)| a == b && **a != b'-')
        .count();

    let identity = if alignment_length > 0 {
        (matches as f64 / alignment_length as f64) * 100.0
    } else {
        0.0
    };

    let elapsed = js_sys_now() - start;

    let result = AlignmentResult {
        score: max_score,
        aligned_query: String::from_utf8_lossy(&aligned_q).into_owned(),
        aligned_reference: String::from_utf8_lossy(&aligned_r).into_owned(),
        identity,
        gaps,
        alignment_length,
        elapsed_us: elapsed * 1000.0, // ms -> µs
    };

    serde_wasm_bindgen::to_value(&result).unwrap()
}

/// Generate a random DNA sequence of given length
#[wasm_bindgen]
pub fn generate_sequence(length: usize, mutation_rate: f64) -> String {
    let bases = [b'A', b'C', b'G', b'T'];
    let mut seq = Vec::with_capacity(length);
    let mut seed = (js_sys_now() * 1000.0) as u64;

    for _ in 0..length {
        seed = lcg(seed);
        let idx = (seed % 4) as usize;
        seq.push(bases[idx]);
    }

    // Apply mutations
    if mutation_rate > 0.0 {
        for i in 0..seq.len() {
            seed = lcg(seed);
            let r = (seed % 1000) as f64 / 1000.0;
            if r < mutation_rate {
                seed = lcg(seed);
                let new_base = bases[(seed % 4) as usize];
                seq[i] = new_base;
            }
        }
    }

    String::from_utf8(seq).unwrap()
}

/// Simple LCG pseudo-random number generator
fn lcg(seed: u64) -> u64 {
    seed.wrapping_mul(6364136223846793005).wrapping_add(1442695040888963407)
}

/// Wrapper for performance.now()
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = performance, js_name = now)]
    fn js_sys_now() -> f64;
}
