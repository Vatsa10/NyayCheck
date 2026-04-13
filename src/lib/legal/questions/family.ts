import type { Question } from "@/types";

export const familyQuestions: Question[] = [
  {
    id: "family_issue_type",
    category: "family",
    order: 1,
    type: "single_choice",
    question: {
      en: "What family/marriage issue are you dealing with?",
      hi: "आप किस परिवार/विवाह समस्या से जूझ रहे हैं?",
    },
    required: true,
    options: [
      {
        value: "divorce",
        label: { en: "Divorce / Separation", hi: "तलाक / अलगाव" },
        scoreWeight: 10,
      },
      {
        value: "domestic_violence",
        label: { en: "Domestic violence", hi: "घरेलू हिंसा" },
        scoreWeight: 25,
        checklistFlags: ["domestic_violence"],
      },
      {
        value: "maintenance",
        label: { en: "Maintenance / Alimony", hi: "भरण-पोषण / गुज़ारा भत्ता" },
        scoreWeight: 10,
        checklistFlags: ["maintenance_eligible"],
      },
      {
        value: "custody",
        label: { en: "Child custody", hi: "बच्चे की कस्टडी" },
        scoreWeight: 10,
        checklistFlags: ["custody_dispute"],
      },
    ],
  },
  {
    id: "family_marriage_registered",
    category: "family",
    order: 2,
    type: "yes_no",
    question: {
      en: "Is your marriage registered?",
      hi: "क्या आपकी शादी पंजीकृत है?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 15,
        checklistFlags: ["no_marriage_registration"],
      },
    ],
  },
  {
    id: "family_children",
    category: "family",
    order: 3,
    type: "yes_no",
    question: {
      en: "Do you have minor children (under 18)?",
      hi: "क्या आपके नाबालिग बच्चे (18 से कम) हैं?",
    },
    required: true,
    options: [
      {
        value: "yes",
        label: { en: "Yes", hi: "हाँ" },
        scoreWeight: 5,
        checklistFlags: ["custody_dispute"],
      },
      { value: "no", label: { en: "No", hi: "नहीं" }, scoreWeight: 0 },
    ],
  },
  {
    id: "family_violence_immediate",
    category: "family",
    order: 4,
    type: "yes_no",
    question: {
      en: "Are you in immediate physical danger?",
      hi: "क्या आप तत्काल शारीरिक खतरे में हैं?",
    },
    condition: { questionId: "family_issue_type", values: ["domestic_violence"] },
    required: true,
    options: [
      {
        value: "yes",
        label: { en: "Yes", hi: "हाँ" },
        scoreWeight: 25,
        checklistFlags: ["domestic_violence"],
      },
      { value: "no", label: { en: "No", hi: "नहीं" }, scoreWeight: 0 },
    ],
  },
  {
    id: "family_will",
    category: "family",
    order: 5,
    type: "yes_no",
    question: {
      en: "Do you have a valid will for your property/assets?",
      hi: "क्या आपके पास अपनी संपत्ति/परिसंपत्तियों के लिए वैध वसीयत है?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 10,
        checklistFlags: ["no_will"],
      },
    ],
  },
  {
    id: "family_financial_dependent",
    category: "family",
    order: 6,
    type: "yes_no",
    question: {
      en: "Are you financially dependent on your spouse?",
      hi: "क्या आप आर्थिक रूप से अपने जीवनसाथी पर निर्भर हैं?",
    },
    required: true,
    options: [
      {
        value: "yes",
        label: { en: "Yes", hi: "हाँ" },
        scoreWeight: 5,
        checklistFlags: ["maintenance_eligible"],
      },
      { value: "no", label: { en: "No", hi: "नहीं" }, scoreWeight: 0 },
    ],
  },
  {
    id: "family_dowry",
    category: "family",
    order: 7,
    type: "yes_no",
    question: {
      en: "Are you or someone you know facing dowry demands or dowry harassment?",
      hi: "क्या आप या आपका कोई परिचित दहेज मांग या दहेज उत्पीड़न का सामना कर रहा है?",
    },
    helpText: {
      en: "Demanding dowry is a criminal offence under the Dowry Prohibition Act, 1961. Harassment for dowry is punishable under S.498A IPC.",
      hi: "दहेज मांगना दहेज निषेध अधिनियम, 1961 के तहत आपराधिक अपराध है। दहेज के लिए उत्पीड़न IPC की धारा 498A के तहत दंडनीय है।",
    },
    required: true,
    options: [
      {
        value: "yes",
        label: { en: "Yes", hi: "हाँ" },
        scoreWeight: 20,
        checklistFlags: ["domestic_violence"],
      },
      { value: "no", label: { en: "No", hi: "नहीं" }, scoreWeight: 0 },
    ],
  },
];
