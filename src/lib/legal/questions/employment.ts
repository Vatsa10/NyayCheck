import type { Question } from "@/types";

export const employmentQuestions: Question[] = [
  {
    id: "emp_appointment_letter",
    category: "employment",
    order: 1,
    type: "yes_no",
    question: {
      en: "Do you have a written appointment letter / offer letter?",
      hi: "क्या आपके पास लिखित नियुक्ति पत्र / ऑफर लेटर है?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 20,
        checklistFlags: ["no_appointment_letter"],
      },
    ],
  },
  {
    id: "emp_issue_type",
    category: "employment",
    order: 2,
    type: "single_choice",
    question: {
      en: "What employment issue are you facing?",
      hi: "आपको कौन सी रोज़गार समस्या है?",
    },
    required: true,
    options: [
      {
        value: "salary_withheld",
        label: { en: "Salary not paid / withheld", hi: "वेतन नहीं दिया गया / रोका गया" },
        scoreWeight: 20,
        checklistFlags: ["salary_withheld"],
      },
      {
        value: "wrongful_termination",
        label: { en: "Wrongful termination / firing", hi: "गलत बर्खास्तगी" },
        scoreWeight: 20,
        checklistFlags: ["wrongful_termination"],
      },
      {
        value: "harassment",
        label: { en: "Workplace harassment", hi: "कार्यस्थल पर उत्पीड़न" },
        scoreWeight: 15,
        checklistFlags: ["no_posh_policy"],
      },
      {
        value: "pf_issue",
        label: { en: "PF/ESI not deducted", hi: "PF/ESI नहीं काटा गया" },
        scoreWeight: 15,
        checklistFlags: ["pf_not_deducted"],
      },
    ],
  },
  {
    id: "emp_salary_slip",
    category: "employment",
    order: 3,
    type: "yes_no",
    question: {
      en: "Do you receive monthly salary slips?",
      hi: "क्या आपको मासिक सैलरी स्लिप मिलती है?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      { value: "no", label: { en: "No", hi: "नहीं" }, scoreWeight: 10 },
    ],
  },
  {
    id: "emp_notice_period",
    category: "employment",
    order: 4,
    type: "yes_no",
    question: {
      en: "Were you given proper notice before termination?",
      hi: "क्या बर्खास्तगी से पहले आपको उचित नोटिस दिया गया था?",
    },
    condition: { questionId: "emp_issue_type", values: ["wrongful_termination"] },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 15,
      },
    ],
  },
  {
    id: "emp_company_size",
    category: "employment",
    order: 5,
    type: "single_choice",
    question: {
      en: "How many employees does your company have?",
      hi: "आपकी कंपनी में कितने कर्मचारी हैं?",
    },
    required: true,
    options: [
      { value: "under_10", label: { en: "Under 10", hi: "10 से कम" } },
      { value: "10_to_100", label: { en: "10 - 100", hi: "10 - 100" } },
      { value: "above_100", label: { en: "Above 100", hi: "100 से ऊपर" } },
    ],
  },
  {
    id: "emp_duration",
    category: "employment",
    order: 6,
    type: "single_choice",
    question: {
      en: "How long have you worked at this company?",
      hi: "आपने इस कंपनी में कितने समय काम किया है?",
    },
    required: true,
    options: [
      { value: "under_1yr", label: { en: "Less than 1 year", hi: "1 वर्ष से कम" } },
      { value: "1_to_5yr", label: { en: "1 - 5 years", hi: "1 - 5 वर्ष" } },
      { value: "above_5yr", label: { en: "More than 5 years", hi: "5 वर्ष से अधिक" } },
    ],
  },
];
