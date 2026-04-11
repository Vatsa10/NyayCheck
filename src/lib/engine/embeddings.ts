/**
 * Embedding generation for vector search in Turso.
 *
 * We use a lightweight, deterministic approach:
 * - For reports: encode category + answers into a fixed 64-dim feature vector
 * - For knowledge base: encode keywords + category into a 64-dim vector
 * - Use cosine similarity via Turso's vector_distance_cos()
 *
 * This avoids expensive embedding API calls while giving useful similarity results.
 * The vector captures: category (7 dims) + answer patterns (57 dims) = 64 dims.
 */

const EMBEDDING_DIM = 64;

const CATEGORY_INDEX: Record<string, number> = {
  rent: 0,
  property: 1,
  consumer: 2,
  employment: 3,
  family: 4,
  ecommerce: 5,
  "cyber-fraud": 6,
};

// All possible answer values across categories, mapped to feature indices
const ANSWER_FEATURES: Record<string, number> = {
  // Rent
  rent_agreement_no: 7,
  rent_registered_no: 8,
  rent_receipts_no: 9,
  rent_security_deposit_yes_no_receipt: 10,
  rent_eviction_threat_yes: 11,
  rent_hike_yes: 12,
  rent_maintenance_yes: 13,
  // Property
  prop_type_flat: 14,
  prop_type_plot: 15,
  prop_sale_deed_no: 16,
  prop_mutation_no: 17,
  prop_encumbrance_no: 18,
  prop_boundary_dispute_yes: 19,
  prop_builder_delay_yes: 20,
  prop_inheritance_yes: 21,
  // Consumer
  consumer_issue_type_defective_product: 22,
  consumer_issue_type_poor_service: 23,
  consumer_issue_type_overcharging: 24,
  consumer_issue_type_false_advertising: 25,
  consumer_bill_no: 26,
  consumer_complained_yes_not_resolved: 27,
  consumer_evidence_no: 28,
  // Employment
  emp_appointment_letter_no: 29,
  emp_issue_type_salary_withheld: 30,
  emp_issue_type_wrongful_termination: 31,
  emp_issue_type_harassment: 32,
  emp_issue_type_pf_issue: 33,
  emp_salary_slip_no: 34,
  emp_notice_period_no: 35,
  // Family
  family_issue_type_divorce: 36,
  family_issue_type_domestic_violence: 37,
  family_issue_type_maintenance: 38,
  family_issue_type_custody: 39,
  family_marriage_registered_no: 40,
  family_children_yes: 41,
  family_violence_immediate_yes: 42,
  family_will_no: 43,
  family_financial_dependent_yes: 44,
  // E-commerce
  ecom_issue_type_refund: 45,
  ecom_issue_type_fake_product: 46,
  ecom_issue_type_data_privacy: 47,
  ecom_platform_complained_no: 48,
  ecom_response_received_no: 49,
  ecom_order_proof_no: 50,
  // Cyber fraud
  cyber_type_upi_fraud: 51,
  cyber_type_phishing: 52,
  cyber_type_identity_theft: 53,
  cyber_money_lost_yes: 54,
  cyber_when_today: 55,
  cyber_when_older: 56,
  cyber_reported_bank_no: 57,
  cyber_fir_filed_no: 58,
  // Risk levels (encoded)
  risk_low: 59,
  risk_medium: 60,
  risk_high: 61,
  risk_critical: 62,
  // Score range
  score_high: 63, // score > 70
};

/**
 * Generate a 64-dimensional feature vector from a report's data.
 */
export function generateReportEmbedding(
  category: string,
  answers: Record<string, string | string[]>,
  score: number,
  riskLevel: string
): number[] {
  const vec = new Array(EMBEDDING_DIM).fill(0);

  // Category one-hot
  const catIdx = CATEGORY_INDEX[category];
  if (catIdx !== undefined) vec[catIdx] = 1.0;

  // Encode answers
  for (const [questionId, answer] of Object.entries(answers)) {
    const values = Array.isArray(answer) ? answer : [answer];
    for (const val of values) {
      const featureKey = `${questionId}_${val}`;
      const idx = ANSWER_FEATURES[featureKey];
      if (idx !== undefined) vec[idx] = 1.0;
    }
  }

  // Encode risk level
  const riskKey = `risk_${riskLevel}`;
  const riskIdx = ANSWER_FEATURES[riskKey];
  if (riskIdx !== undefined) vec[riskIdx] = 1.0;

  // Encode score range
  if (score > 70) vec[ANSWER_FEATURES.score_high] = 1.0;

  // Normalize to unit vector for cosine similarity
  return normalize(vec);
}

/**
 * Generate a 64-dimensional vector for a knowledge base entry.
 */
export function generateKnowledgeEmbedding(
  category: string,
  keywords: string
): number[] {
  const vec = new Array(EMBEDDING_DIM).fill(0);

  // Category
  const catIdx = CATEGORY_INDEX[category];
  if (catIdx !== undefined) vec[catIdx] = 1.0;

  // Match keywords against answer features
  const kws = keywords.toLowerCase().split(",").map((k) => k.trim());
  for (const kw of kws) {
    // Find matching feature indices by keyword
    for (const [featureKey, idx] of Object.entries(ANSWER_FEATURES)) {
      if (featureKey.includes(kw)) {
        vec[idx] = 0.7; // Partial match weight
      }
    }
  }

  return normalize(vec);
}

function normalize(vec: number[]): number[] {
  const magnitude = Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0));
  if (magnitude === 0) return vec;
  return vec.map((v) => v / magnitude);
}

/**
 * Compute cosine similarity between two vectors.
 * Used as a fallback when Turso vector functions aren't available.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom === 0 ? 0 : dot / denom;
}
