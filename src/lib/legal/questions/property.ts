import type { Question } from "@/types";

export const propertyQuestions: Question[] = [
  {
    id: "prop_type",
    category: "property",
    order: 1,
    type: "single_choice",
    question: {
      en: "What type of property is this about?",
      hi: "यह किस प्रकार की संपत्ति के बारे में है?",
    },
    required: true,
    options: [
      { value: "flat", label: { en: "Flat / Apartment", hi: "फ्लैट / अपार्टमेंट" } },
      { value: "house", label: { en: "Independent House", hi: "स्वतंत्र मकान" } },
      { value: "plot", label: { en: "Plot / Land", hi: "प्लॉट / भूमि" } },
      { value: "commercial", label: { en: "Commercial Property", hi: "व्यावसायिक संपत्ति" } },
    ],
  },
  {
    id: "prop_sale_deed",
    category: "property",
    order: 2,
    type: "yes_no",
    question: {
      en: "Do you have a registered sale deed for this property?",
      hi: "क्या आपके पास इस संपत्ति का पंजीकृत बिक्री पत्र है?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 25,
        checklistFlags: ["no_sale_deed"],
      },
    ],
  },
  {
    id: "prop_mutation",
    category: "property",
    order: 3,
    type: "yes_no",
    question: {
      en: "Has the property been mutated (name transfer) in municipal records?",
      hi: "क्या नगरपालिका रिकॉर्ड में संपत्ति का नामांतरण हो गया है?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 15,
        checklistFlags: ["mutation_pending"],
      },
    ],
  },
  {
    id: "prop_encumbrance",
    category: "property",
    order: 4,
    type: "yes_no",
    question: {
      en: "Have you checked the encumbrance certificate for this property?",
      hi: "क्या आपने इस संपत्ति का भारमुक्ति प्रमाणपत्र जांचा है?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 15,
        checklistFlags: ["no_encumbrance_check"],
      },
    ],
  },
  {
    id: "prop_boundary_dispute",
    category: "property",
    order: 5,
    type: "yes_no",
    question: {
      en: "Are you facing a boundary or possession dispute?",
      hi: "क्या आपको सीमा या कब्ज़े का विवाद है?",
    },
    required: true,
    options: [
      {
        value: "yes",
        label: { en: "Yes", hi: "हाँ" },
        scoreWeight: 15,
        checklistFlags: ["boundary_dispute"],
      },
      { value: "no", label: { en: "No", hi: "नहीं" }, scoreWeight: 0 },
    ],
  },
  {
    id: "prop_builder_delay",
    category: "property",
    order: 6,
    type: "yes_no",
    question: {
      en: "Has a builder delayed possession of your flat/property?",
      hi: "क्या बिल्डर ने आपके फ्लैट/संपत्ति का कब्ज़ा देने में देरी की है?",
    },
    condition: { questionId: "prop_type", values: ["flat"] },
    required: true,
    options: [
      {
        value: "yes",
        label: { en: "Yes", hi: "हाँ" },
        scoreWeight: 20,
        checklistFlags: ["rera_complaint_eligible"],
      },
      { value: "no", label: { en: "No", hi: "नहीं" }, scoreWeight: 0 },
    ],
  },
  {
    id: "prop_inheritance",
    category: "property",
    order: 7,
    type: "yes_no",
    question: {
      en: "Is this property inherited? Are there succession disputes?",
      hi: "क्या यह विरासत में मिली संपत्ति है? क्या उत्तराधिकार विवाद है?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 10 },
      { value: "no", label: { en: "No", hi: "नहीं" }, scoreWeight: 0 },
    ],
  },
];
