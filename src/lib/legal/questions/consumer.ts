import type { Question } from "@/types";

export const consumerQuestions: Question[] = [
  {
    id: "consumer_issue_type",
    category: "consumer",
    order: 1,
    type: "single_choice",
    question: {
      en: "What kind of consumer issue are you facing?",
      hi: "आपको किस प्रकार की उपभोक्ता समस्या है?",
    },
    required: true,
    options: [
      {
        value: "defective_product",
        label: { en: "Defective product", hi: "दोषपूर्ण उत्पाद" },
        checklistFlags: ["defective_product"],
      },
      {
        value: "poor_service",
        label: { en: "Poor/deficient service", hi: "खराब/अपर्याप्त सेवा" },
        checklistFlags: ["service_deficiency"],
      },
      {
        value: "overcharging",
        label: { en: "Overcharging / hidden fees", hi: "अधिक शुल्क / छिपे शुल्क" },
        checklistFlags: ["unfair_trade_practice"],
      },
      {
        value: "false_advertising",
        label: { en: "False advertising / misleading claims", hi: "झूठा विज्ञापन / भ्रामक दावे" },
        checklistFlags: ["unfair_trade_practice"],
      },
    ],
  },
  {
    id: "consumer_bill",
    category: "consumer",
    order: 2,
    type: "yes_no",
    question: {
      en: "Do you have the bill/invoice for the purchase or service?",
      hi: "क्या आपके पास खरीद या सेवा का बिल/इनवॉइस है?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 15,
        checklistFlags: ["no_bill_invoice"],
      },
    ],
  },
  {
    id: "consumer_complained",
    category: "consumer",
    order: 3,
    type: "single_choice",
    question: {
      en: "Have you already complained to the seller/service provider?",
      hi: "क्या आपने पहले से विक्रेता/सेवा प्रदाता से शिकायत की है?",
    },
    required: true,
    options: [
      {
        value: "yes_resolved",
        label: { en: "Yes, and it was resolved", hi: "हाँ, और यह हल हो गया" },
        scoreWeight: 0,
      },
      {
        value: "yes_not_resolved",
        label: { en: "Yes, but not resolved", hi: "हाँ, लेकिन हल नहीं हुआ" },
        scoreWeight: 15,
        checklistFlags: ["consumer_complaint_eligible"],
      },
      {
        value: "no",
        label: { en: "No, haven't complained yet", hi: "नहीं, अभी तक शिकायत नहीं की" },
        scoreWeight: 10,
      },
    ],
  },
  {
    id: "consumer_amount",
    category: "consumer",
    order: 4,
    type: "single_choice",
    question: {
      en: "What is the approximate value of the product/service?",
      hi: "उत्पाद/सेवा का अनुमानित मूल्य क्या है?",
    },
    helpText: {
      en: "This determines which Consumer Forum has jurisdiction over your complaint.",
      hi: "इससे निर्धारित होता है कि कौन सा उपभोक्ता फोरम आपकी शिकायत पर अधिकार क्षेत्र रखता है।",
    },
    required: true,
    options: [
      {
        value: "under_1cr",
        label: { en: "Under ₹1 Crore", hi: "₹1 करोड़ से कम" },
        scoreWeight: 0,
      },
      {
        value: "1cr_to_10cr",
        label: { en: "₹1 Crore - ₹10 Crore", hi: "₹1 करोड़ - ₹10 करोड़" },
        scoreWeight: 0,
      },
      {
        value: "above_10cr",
        label: { en: "Above ₹10 Crore", hi: "₹10 करोड़ से ऊपर" },
        scoreWeight: 0,
      },
    ],
  },
  {
    id: "consumer_warranty",
    category: "consumer",
    order: 5,
    type: "yes_no",
    question: {
      en: "Is the product still under warranty/guarantee?",
      hi: "क्या उत्पाद अभी भी वारंटी/गारंटी के अंतर्गत है?",
    },
    condition: { questionId: "consumer_issue_type", values: ["defective_product"] },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      { value: "no", label: { en: "No", hi: "नहीं" }, scoreWeight: 5 },
    ],
  },
  {
    id: "consumer_evidence",
    category: "consumer",
    order: 6,
    type: "yes_no",
    question: {
      en: "Do you have evidence (photos, emails, screenshots) of the issue?",
      hi: "क्या आपके पास समस्या का साक्ष्य (फोटो, ईमेल, स्क्रीनशॉट) है?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 10,
        checklistFlags: ["service_deficiency"],
      },
    ],
  },
  {
    id: "consumer_medical",
    category: "consumer",
    order: 7,
    type: "yes_no",
    question: {
      en: "Is this related to medical treatment / hospital negligence?",
      hi: "क्या यह चिकित्सा उपचार / अस्पताल की लापरवाही से संबंधित है?",
    },
    helpText: {
      en: "Healthcare is a 'service' under the Consumer Protection Act 2019. You can file a consumer complaint against hospitals and doctors.",
      hi: "उपभोक्ता संरक्षण अधिनियम 2019 के तहत स्वास्थ्य सेवा एक 'सेवा' है। आप अस्पतालों और डॉक्टरों के खिलाफ उपभोक्ता शिकायत दर्ज कर सकते हैं।",
    },
    condition: { questionId: "consumer_issue_type", values: ["poor_service"] },
    required: true,
    options: [
      {
        value: "yes",
        label: { en: "Yes", hi: "हाँ" },
        scoreWeight: 15,
        checklistFlags: ["consumer_complaint_eligible", "defective_product"],
      },
      { value: "no", label: { en: "No", hi: "नहीं" }, scoreWeight: 0 },
    ],
  },
];
