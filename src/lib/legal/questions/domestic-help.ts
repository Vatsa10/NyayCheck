import type { Question } from "@/types";

export const domesticHelpQuestions: Question[] = [
  {
    id: "dh_role",
    category: "domestic-help",
    order: 1,
    type: "single_choice",
    question: {
      en: "What is your role?",
      hi: "आपकी भूमिका क्या है?",
    },
    required: true,
    options: [
      {
        value: "worker",
        label: { en: "I am a domestic worker", hi: "मैं घरेलू कामगार हूं" },
      },
      {
        value: "employer",
        label: { en: "I employ domestic help", hi: "मैं घरेलू सहायक का नियोक्ता हूं" },
      },
    ],
  },
  {
    id: "dh_issue_type",
    category: "domestic-help",
    order: 2,
    type: "single_choice",
    question: {
      en: "What issue are you facing?",
      hi: "आपको कौन सी समस्या है?",
    },
    required: true,
    options: [
      {
        value: "wages_unpaid",
        label: { en: "Wages not paid / underpaid", hi: "मज़दूरी नहीं दी गई / कम दी गई" },
        scoreWeight: 20,
        checklistFlags: ["dh_minimum_wages", "dh_file_complaint"],
      },
      {
        value: "harassment",
        label: { en: "Harassment or abuse at workplace", hi: "कार्यस्थल पर उत्पीड़न या दुर्व्यवहार" },
        scoreWeight: 25,
        checklistFlags: ["dh_posh_complaint", "dh_police_complaint"],
      },
      {
        value: "wrongful_termination",
        label: { en: "Fired without notice or reason", hi: "बिना नोटिस या कारण के निकाला गया" },
        scoreWeight: 15,
        checklistFlags: ["dh_file_complaint"],
      },
      {
        value: "working_conditions",
        label: { en: "Poor working conditions / no leave", hi: "खराब कार्य परिस्थितियां / छुट्टी नहीं" },
        scoreWeight: 10,
        checklistFlags: ["dh_minimum_wages"],
      },
    ],
  },
  {
    id: "dh_written_agreement",
    category: "domestic-help",
    order: 3,
    type: "yes_no",
    question: {
      en: "Do you have a written employment agreement?",
      hi: "क्या आपके पास लिखित रोज़गार अनुबंध है?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 15,
        checklistFlags: ["dh_get_agreement"],
      },
    ],
  },
  {
    id: "dh_minimum_wage_aware",
    category: "domestic-help",
    order: 4,
    type: "yes_no",
    question: {
      en: "Do you know the minimum wage for domestic workers in your state?",
      hi: "क्या आप अपने राज्य में घरेलू कामगारों के लिए न्यूनतम मज़दूरी जानते हैं?",
    },
    helpText: {
      en: "Domestic workers are covered under the Minimum Wages Act in most states. The wage varies by state — ₹8,000-₹15,000/month in most places.",
      hi: "अधिकांश राज्यों में घरेलू कामगार न्यूनतम मज़दूरी अधिनियम के अंतर्गत आते हैं। मज़दूरी राज्य के अनुसार ₹8,000-₹15,000/माह है।",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 5,
        checklistFlags: ["dh_minimum_wages"],
      },
    ],
  },
  {
    id: "dh_eshram_registered",
    category: "domestic-help",
    order: 5,
    type: "yes_no",
    question: {
      en: "Are you registered on the e-Shram portal?",
      hi: "क्या आप ई-श्रम पोर्टल पर पंजीकृत हैं?",
    },
    helpText: {
      en: "e-Shram card gives ₹2 lakh accidental insurance and access to government welfare schemes for unorganised workers.",
      hi: "ई-श्रम कार्ड ₹2 लाख दुर्घटना बीमा और असंगठित कामगारों के लिए सरकारी कल्याण योजनाओं तक पहुंच देता है।",
    },
    condition: { questionId: "dh_role", values: ["worker"] },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 5,
        checklistFlags: ["dh_register_eshram"],
      },
    ],
  },
  {
    id: "dh_posh_aware",
    category: "domestic-help",
    order: 6,
    type: "yes_no",
    question: {
      en: "Do you know that sexual harassment at any workplace (including homes) is a crime?",
      hi: "क्या आप जानते हैं कि किसी भी कार्यस्थल (घर सहित) पर यौन उत्पीड़न अपराध है?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 5,
        checklistFlags: ["dh_posh_complaint"],
      },
    ],
  },
];
