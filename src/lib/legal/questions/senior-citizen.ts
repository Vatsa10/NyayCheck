import type { Question } from "@/types";

export const seniorCitizenQuestions: Question[] = [
  {
    id: "senior_issue_type",
    category: "senior-citizen",
    order: 1,
    type: "single_choice",
    question: {
      en: "What issue are you facing as a senior citizen?",
      hi: "वरिष्ठ नागरिक के रूप में आपको कौन सी समस्या है?",
    },
    required: true,
    options: [
      {
        value: "maintenance",
        label: { en: "Children not providing maintenance / support", hi: "बच्चे भरण-पोषण / सहायता नहीं दे रहे" },
        scoreWeight: 20,
        checklistFlags: ["senior_maintenance_tribunal", "senior_file_case"],
      },
      {
        value: "property_grab",
        label: { en: "Children/heirs trying to grab my property", hi: "बच्चे/उत्तराधिकारी मेरी संपत्ति हड़पने की कोशिश कर रहे" },
        scoreWeight: 20,
        checklistFlags: ["senior_revoke_transfer", "senior_file_case"],
      },
      {
        value: "abuse",
        label: { en: "Physical or emotional abuse by family", hi: "परिवार द्वारा शारीरिक या भावनात्मक शोषण" },
        scoreWeight: 25,
        checklistFlags: ["senior_police_complaint", "senior_helpline"],
      },
      {
        value: "health_scheme",
        label: { en: "Need help accessing health / pension schemes", hi: "स्वास्थ्य / पेंशन योजनाओं तक पहुंच में मदद चाहिए" },
        scoreWeight: 5,
        checklistFlags: ["senior_ayushman", "senior_pension"],
      },
    ],
  },
  {
    id: "senior_age",
    category: "senior-citizen",
    order: 2,
    type: "single_choice",
    question: {
      en: "What is your age?",
      hi: "आपकी उम्र क्या है?",
    },
    required: true,
    options: [
      { value: "60_70", label: { en: "60 - 70 years", hi: "60 - 70 वर्ष" } },
      { value: "70_80", label: { en: "70 - 80 years", hi: "70 - 80 वर्ष" }, checklistFlags: ["senior_ayushman_70"] },
      { value: "above_80", label: { en: "Above 80 years", hi: "80 वर्ष से ऊपर" }, checklistFlags: ["senior_ayushman_70"] },
    ],
  },
  {
    id: "senior_living_alone",
    category: "senior-citizen",
    order: 3,
    type: "yes_no",
    question: {
      en: "Are you living alone without family support?",
      hi: "क्या आप परिवार के सहारे के बिना अकेले रह रहे हैं?",
    },
    required: true,
    options: [
      {
        value: "yes",
        label: { en: "Yes", hi: "हाँ" },
        scoreWeight: 10,
        checklistFlags: ["senior_helpline"],
      },
      { value: "no", label: { en: "No", hi: "नहीं" }, scoreWeight: 0 },
    ],
  },
  {
    id: "senior_property_transferred",
    category: "senior-citizen",
    order: 4,
    type: "yes_no",
    question: {
      en: "Have you transferred your property to children/relatives?",
      hi: "क्या आपने अपनी संपत्ति बच्चों/रिश्तेदारों को हस्तांतरित की है?",
    },
    condition: { questionId: "senior_issue_type", values: ["property_grab", "maintenance"] },
    required: true,
    options: [
      {
        value: "yes",
        label: { en: "Yes", hi: "हाँ" },
        scoreWeight: 15,
        checklistFlags: ["senior_revoke_transfer"],
      },
      { value: "no", label: { en: "No", hi: "नहीं" }, scoreWeight: 0 },
    ],
  },
  {
    id: "senior_pension_receiving",
    category: "senior-citizen",
    order: 5,
    type: "yes_no",
    question: {
      en: "Are you currently receiving any government pension?",
      hi: "क्या आप वर्तमान में कोई सरकारी पेंशन प्राप्त कर रहे हैं?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 5,
        checklistFlags: ["senior_pension"],
      },
    ],
  },
  {
    id: "senior_will_made",
    category: "senior-citizen",
    order: 6,
    type: "yes_no",
    question: {
      en: "Have you made a will for your assets?",
      hi: "क्या आपने अपनी संपत्तियों के लिए वसीयत बनाई है?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 10,
        checklistFlags: ["senior_make_will"],
      },
    ],
  },
];
