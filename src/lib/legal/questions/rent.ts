import type { Question } from "@/types";

export const rentQuestions: Question[] = [
  {
    id: "rent_agreement",
    category: "rent",
    order: 1,
    type: "yes_no",
    question: {
      en: "Do you have a written rent agreement?",
      hi: "क्या आपके पास लिखित किराया अनुबंध है?",
    },
    helpText: {
      en: "A written agreement is essential for both tenant and landlord rights.",
      hi: "लिखित अनुबंध किरायेदार और मकान मालिक दोनों के अधिकारों के लिए आवश्यक है।",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 25,
        checklistFlags: ["need_rent_agreement"],
      },
    ],
  },
  {
    id: "rent_registered",
    category: "rent",
    order: 2,
    type: "yes_no",
    question: {
      en: "Is your rent agreement registered with the Sub-Registrar?",
      hi: "क्या आपका किराया अनुबंध उप-पंजीयक कार्यालय में पंजीकृत है?",
    },
    helpText: {
      en: "Agreements for 12+ months must be registered. Unregistered agreements are not admissible as evidence.",
      hi: "12+ महीने के अनुबंध पंजीकृत होने चाहिए। अपंजीकृत अनुबंध साक्ष्य के रूप में स्वीकार्य नहीं हैं।",
    },
    required: true,
    condition: { questionId: "rent_agreement", values: ["yes"] },
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 15,
        checklistFlags: ["register_agreement"],
      },
    ],
  },
  {
    id: "rent_receipts",
    category: "rent",
    order: 3,
    type: "yes_no",
    question: {
      en: "Do you receive rent receipts from your landlord?",
      hi: "क्या आपको अपने मकान मालिक से किराये की रसीदें मिलती हैं?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 10,
        checklistFlags: ["rent_receipt_missing"],
      },
    ],
  },
  {
    id: "rent_security_deposit",
    category: "rent",
    order: 4,
    type: "single_choice",
    question: {
      en: "Did you pay a security deposit? Do you have a receipt?",
      hi: "क्या आपने सुरक्षा जमा राशि दी? क्या आपके पास रसीद है?",
    },
    required: true,
    options: [
      {
        value: "yes_receipt",
        label: { en: "Yes, with receipt", hi: "हाँ, रसीद के साथ" },
        scoreWeight: 0,
      },
      {
        value: "yes_no_receipt",
        label: { en: "Yes, but no receipt", hi: "हाँ, लेकिन रसीद नहीं" },
        scoreWeight: 15,
        checklistFlags: ["security_deposit_issue"],
      },
      {
        value: "no",
        label: { en: "No deposit paid", hi: "कोई जमा नहीं दी" },
        scoreWeight: 0,
      },
    ],
  },
  {
    id: "rent_eviction_threat",
    category: "rent",
    order: 5,
    type: "yes_no",
    question: {
      en: "Is your landlord threatening to evict you without proper notice?",
      hi: "क्या आपका मकान मालिक उचित नोटिस के बिना आपको बेदखल करने की धमकी दे रहा है?",
    },
    required: true,
    options: [
      {
        value: "yes",
        label: { en: "Yes", hi: "हाँ" },
        scoreWeight: 20,
        checklistFlags: ["illegal_eviction_risk"],
      },
      { value: "no", label: { en: "No", hi: "नहीं" }, scoreWeight: 0 },
    ],
  },
  {
    id: "rent_hike",
    category: "rent",
    order: 6,
    type: "yes_no",
    question: {
      en: "Has your landlord increased rent without prior agreement or beyond the legal limit?",
      hi: "क्या आपके मकान मालिक ने पूर्व अनुबंध के बिना या कानूनी सीमा से अधिक किराया बढ़ाया है?",
    },
    required: true,
    options: [
      {
        value: "yes",
        label: { en: "Yes", hi: "हाँ" },
        scoreWeight: 10,
        checklistFlags: ["illegal_eviction_risk"],
      },
      { value: "no", label: { en: "No", hi: "नहीं" }, scoreWeight: 0 },
    ],
  },
  {
    id: "rent_maintenance",
    category: "rent",
    order: 7,
    type: "yes_no",
    question: {
      en: "Is your landlord refusing to maintain or repair the property?",
      hi: "क्या आपका मकान मालिक संपत्ति की मरम्मत या रखरखाव करने से मना कर रहा है?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 5 },
      { value: "no", label: { en: "No", hi: "नहीं" }, scoreWeight: 0 },
    ],
  },
];
