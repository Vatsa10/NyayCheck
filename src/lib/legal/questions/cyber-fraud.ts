import type { Question } from "@/types";

export const cyberFraudQuestions: Question[] = [
  {
    id: "cyber_type",
    category: "cyber-fraud",
    order: 1,
    type: "single_choice",
    question: {
      en: "What type of cyber fraud/scam did you face?",
      hi: "आपको किस प्रकार की साइबर धोखाधड़ी/स्कैम का सामना करना पड़ा?",
    },
    required: true,
    options: [
      {
        value: "upi_fraud",
        label: { en: "UPI / bank fraud", hi: "UPI / बैंक धोखाधड़ी" },
        scoreWeight: 25,
        checklistFlags: ["cyber_fraud_immediate", "upi_fraud"],
      },
      {
        value: "phishing",
        label: { en: "Phishing / OTP scam", hi: "फिशिंग / OTP स्कैम" },
        scoreWeight: 20,
        checklistFlags: ["cyber_fraud_immediate", "phishing_scam"],
      },
      {
        value: "online_shopping",
        label: { en: "Online shopping scam", hi: "ऑनलाइन शॉपिंग स्कैम" },
        scoreWeight: 15,
        checklistFlags: ["cyber_fraud_immediate"],
      },
      {
        value: "identity_theft",
        label: { en: "Identity theft", hi: "पहचान चोरी" },
        scoreWeight: 25,
        checklistFlags: ["cyber_fraud_immediate", "phishing_scam"],
      },
    ],
  },
  {
    id: "cyber_money_lost",
    category: "cyber-fraud",
    order: 2,
    type: "yes_no",
    question: {
      en: "Did you lose money in this fraud?",
      hi: "क्या इस धोखाधड़ी में आपके पैसे गए?",
    },
    required: true,
    options: [
      {
        value: "yes",
        label: { en: "Yes", hi: "हाँ" },
        scoreWeight: 15,
      },
      { value: "no", label: { en: "No", hi: "नहीं" }, scoreWeight: 0 },
    ],
  },
  {
    id: "cyber_amount_lost",
    category: "cyber-fraud",
    order: 3,
    type: "single_choice",
    question: {
      en: "Approximately how much money was lost?",
      hi: "लगभग कितना पैसा गया?",
    },
    condition: { questionId: "cyber_money_lost", values: ["yes"] },
    required: true,
    options: [
      { value: "under_10k", label: { en: "Under ₹10,000", hi: "₹10,000 से कम" } },
      { value: "10k_to_1l", label: { en: "₹10,000 - ₹1 Lakh", hi: "₹10,000 - ₹1 लाख" } },
      { value: "above_1l", label: { en: "Above ₹1 Lakh", hi: "₹1 लाख से ऊपर" } },
    ],
  },
  {
    id: "cyber_when",
    category: "cyber-fraud",
    order: 4,
    type: "single_choice",
    question: {
      en: "When did this happen?",
      hi: "यह कब हुआ?",
    },
    helpText: {
      en: "Reporting within 3 days gives you the best chance of recovery.",
      hi: "3 दिनों के भीतर रिपोर्ट करने से रिकवरी की सबसे अच्छी संभावना होती है।",
    },
    required: true,
    options: [
      {
        value: "today",
        label: { en: "Today / Yesterday", hi: "आज / कल" },
        scoreWeight: 0,
      },
      {
        value: "within_3_days",
        label: { en: "Within last 3 days", hi: "पिछले 3 दिनों में" },
        scoreWeight: 5,
      },
      {
        value: "within_week",
        label: { en: "Within last week", hi: "पिछले सप्ताह में" },
        scoreWeight: 10,
      },
      {
        value: "older",
        label: { en: "More than a week ago", hi: "एक सप्ताह से अधिक पहले" },
        scoreWeight: 15,
      },
    ],
  },
  {
    id: "cyber_reported_bank",
    category: "cyber-fraud",
    order: 5,
    type: "yes_no",
    question: {
      en: "Have you reported this to your bank?",
      hi: "क्या आपने अपने बैंक को इसकी रिपोर्ट की है?",
    },
    condition: { questionId: "cyber_type", values: ["upi_fraud"] },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 15,
        checklistFlags: ["upi_fraud"],
      },
    ],
  },
  {
    id: "cyber_fir_filed",
    category: "cyber-fraud",
    order: 6,
    type: "yes_no",
    question: {
      en: "Have you filed a complaint at cybercrime.gov.in or the local police?",
      hi: "क्या आपने cybercrime.gov.in या स्थानीय पुलिस में शिकायत दर्ज की है?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 10,
        checklistFlags: ["cyber_fraud_immediate"],
      },
    ],
  },
];
