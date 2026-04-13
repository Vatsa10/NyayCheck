import type { Question } from "@/types";

export const chequeBounceQuestions: Question[] = [
  {
    id: "cb_role",
    category: "cheque-bounce",
    order: 1,
    type: "single_choice",
    question: {
      en: "What is your role in this cheque bounce matter?",
      hi: "इस चेक बाउंस मामले में आपकी भूमिका क्या है?",
    },
    required: true,
    options: [
      {
        value: "payee",
        label: { en: "I received a bounced cheque (Payee)", hi: "मुझे बाउंस चेक मिला (प्राप्तकर्ता)" },
        scoreWeight: 15,
        checklistFlags: ["cb_send_notice"],
      },
      {
        value: "drawer",
        label: { en: "My cheque bounced (Drawer)", hi: "मेरा चेक बाउंस हुआ (जारीकर्ता)" },
        scoreWeight: 20,
        checklistFlags: ["cb_pay_immediately"],
      },
    ],
  },
  {
    id: "cb_amount",
    category: "cheque-bounce",
    order: 2,
    type: "single_choice",
    question: {
      en: "What is the cheque amount?",
      hi: "चेक की राशि कितनी है?",
    },
    required: true,
    options: [
      { value: "under_1l", label: { en: "Under ₹1 Lakh", hi: "₹1 लाख से कम" } },
      { value: "1l_to_10l", label: { en: "₹1 Lakh - ₹10 Lakh", hi: "₹1 लाख - ₹10 लाख" } },
      { value: "above_10l", label: { en: "Above ₹10 Lakh", hi: "₹10 लाख से ऊपर" } },
    ],
  },
  {
    id: "cb_bounce_reason",
    category: "cheque-bounce",
    order: 3,
    type: "single_choice",
    question: {
      en: "Why did the cheque bounce?",
      hi: "चेक क्यों बाउंस हुआ?",
    },
    helpText: {
      en: "The reason on the bank's return memo is important for your legal case.",
      hi: "बैंक के रिटर्न मेमो पर लिखा कारण आपके कानूनी केस के लिए महत्वपूर्ण है।",
    },
    required: true,
    options: [
      {
        value: "insufficient_funds",
        label: { en: "Insufficient funds", hi: "अपर्याप्त शेष राशि" },
        scoreWeight: 0,
        checklistFlags: ["cb_send_notice"],
      },
      {
        value: "account_closed",
        label: { en: "Account closed", hi: "खाता बंद" },
        scoreWeight: 5,
        checklistFlags: ["cb_send_notice"],
      },
      {
        value: "stop_payment",
        label: { en: "Stop payment by drawer", hi: "जारीकर्ता द्वारा भुगतान रोका गया" },
        scoreWeight: 10,
        checklistFlags: ["cb_send_notice"],
      },
      {
        value: "signature_mismatch",
        label: { en: "Signature mismatch / other", hi: "हस्ताक्षर मेल नहीं / अन्य" },
        scoreWeight: 5,
      },
    ],
  },
  {
    id: "cb_notice_sent",
    category: "cheque-bounce",
    order: 4,
    type: "yes_no",
    question: {
      en: "Have you already sent a legal notice to the cheque drawer?",
      hi: "क्या आपने पहले से चेक जारीकर्ता को कानूनी नोटिस भेजा है?",
    },
    helpText: {
      en: "Under S.138 NI Act, you MUST send a notice within 30 days of cheque bounce. This is mandatory before filing a case.",
      hi: "NI अधिनियम की धारा 138 के तहत, चेक बाउंस के 30 दिनों के भीतर नोटिस भेजना अनिवार्य है।",
    },
    condition: { questionId: "cb_role", values: ["payee"] },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 20,
        checklistFlags: ["cb_send_notice_urgent"],
      },
    ],
  },
  {
    id: "cb_days_since_bounce",
    category: "cheque-bounce",
    order: 5,
    type: "single_choice",
    question: {
      en: "How many days since the cheque bounced?",
      hi: "चेक बाउंस हुए कितने दिन हो गए?",
    },
    helpText: {
      en: "You have only 30 days from bounce to send the notice. After that, you lose the right to file under S.138.",
      hi: "बाउंस से नोटिस भेजने के लिए सिर्फ 30 दिन हैं। उसके बाद S.138 के तहत दायर करने का अधिकार खो देंगे।",
    },
    condition: { questionId: "cb_role", values: ["payee"] },
    required: true,
    options: [
      {
        value: "under_15",
        label: { en: "Under 15 days", hi: "15 दिन से कम" },
        scoreWeight: 0,
      },
      {
        value: "15_to_30",
        label: { en: "15-30 days", hi: "15-30 दिन" },
        scoreWeight: 10,
        checklistFlags: ["cb_send_notice_urgent"],
      },
      {
        value: "over_30",
        label: { en: "Over 30 days", hi: "30 दिन से ज़्यादा" },
        scoreWeight: 25,
        checklistFlags: ["cb_deadline_missed"],
      },
    ],
  },
  {
    id: "cb_return_memo",
    category: "cheque-bounce",
    order: 6,
    type: "yes_no",
    question: {
      en: "Do you have the bank's return memo (cheque bounce slip)?",
      hi: "क्या आपके पास बैंक का रिटर्न मेमो (चेक बाउंस स्लिप) है?",
    },
    condition: { questionId: "cb_role", values: ["payee"] },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 10,
        checklistFlags: ["cb_get_return_memo"],
      },
    ],
  },
];
