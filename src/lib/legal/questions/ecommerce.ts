import type { Question } from "@/types";

export const ecommerceQuestions: Question[] = [
  {
    id: "ecom_issue_type",
    category: "ecommerce",
    order: 1,
    type: "single_choice",
    question: {
      en: "What e-commerce issue are you facing?",
      hi: "आपको कौन सी ई-कॉमर्स समस्या है?",
    },
    required: true,
    options: [
      {
        value: "refund",
        label: { en: "Refund not received", hi: "रिफंड नहीं मिला" },
        scoreWeight: 15,
        checklistFlags: ["ecommerce_refund"],
      },
      {
        value: "fake_product",
        label: { en: "Received fake/counterfeit product", hi: "नकली उत्पाद प्राप्त हुआ" },
        scoreWeight: 20,
        checklistFlags: ["fake_product"],
      },
      {
        value: "wrong_product",
        label: { en: "Wrong product delivered", hi: "गलत उत्पाद डिलीवर हुआ" },
        scoreWeight: 10,
        checklistFlags: ["ecommerce_refund"],
      },
      {
        value: "data_privacy",
        label: { en: "Data privacy concern", hi: "डेटा गोपनीयता चिंता" },
        scoreWeight: 10,
        checklistFlags: ["data_privacy_violation"],
      },
    ],
  },
  {
    id: "ecom_platform_complained",
    category: "ecommerce",
    order: 2,
    type: "yes_no",
    question: {
      en: "Have you already complained to the e-commerce platform?",
      hi: "क्या आपने पहले से ई-कॉमर्स प्लेटफॉर्म पर शिकायत की है?",
    },
    required: true,
    options: [
      {
        value: "yes",
        label: { en: "Yes", hi: "हाँ" },
        scoreWeight: 0,
      },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 10,
      },
    ],
  },
  {
    id: "ecom_response_received",
    category: "ecommerce",
    order: 3,
    type: "single_choice",
    question: {
      en: "Did you get a satisfactory response from the platform?",
      hi: "क्या आपको प्लेटफॉर्म से संतोषजनक जवाब मिला?",
    },
    condition: { questionId: "ecom_platform_complained", values: ["yes"] },
    required: true,
    options: [
      {
        value: "yes",
        label: { en: "Yes, resolved", hi: "हाँ, हल हो गया" },
        scoreWeight: 0,
      },
      {
        value: "no",
        label: { en: "No, not resolved", hi: "नहीं, हल नहीं हुआ" },
        scoreWeight: 15,
        checklistFlags: ["consumer_complaint_eligible"],
      },
      {
        value: "no_response",
        label: { en: "No response at all", hi: "कोई जवाब ही नहीं मिला" },
        scoreWeight: 15,
        checklistFlags: ["consumer_complaint_eligible"],
      },
    ],
  },
  {
    id: "ecom_order_proof",
    category: "ecommerce",
    order: 4,
    type: "yes_no",
    question: {
      en: "Do you have order confirmation / payment proof?",
      hi: "क्या आपके पास ऑर्डर कन्फर्मेशन / भुगतान प्रमाण है?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 10,
        checklistFlags: ["no_bill_invoice"],
      },
    ],
  },
  {
    id: "ecom_amount",
    category: "ecommerce",
    order: 5,
    type: "single_choice",
    question: {
      en: "What was the order value?",
      hi: "ऑर्डर की कीमत क्या थी?",
    },
    required: true,
    options: [
      { value: "under_5k", label: { en: "Under ₹5,000", hi: "₹5,000 से कम" } },
      { value: "5k_to_50k", label: { en: "₹5,000 - ₹50,000", hi: "₹5,000 - ₹50,000" } },
      { value: "above_50k", label: { en: "Above ₹50,000", hi: "₹50,000 से ऊपर" } },
    ],
  },
  {
    id: "ecom_delivery_timeline",
    category: "ecommerce",
    order: 6,
    type: "yes_no",
    question: {
      en: "Was the product delivered beyond the promised timeline?",
      hi: "क्या उत्पाद वादा की गई समय-सीमा के बाद डिलीवर हुआ?",
    },
    required: true,
    options: [
      {
        value: "yes",
        label: { en: "Yes", hi: "हाँ" },
        scoreWeight: 5,
        checklistFlags: ["service_deficiency"],
      },
      { value: "no", label: { en: "No", hi: "नहीं" }, scoreWeight: 0 },
    ],
  },
];
