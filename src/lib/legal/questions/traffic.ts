import type { Question } from "@/types";

export const trafficQuestions: Question[] = [
  {
    id: "traffic_issue_type",
    category: "traffic",
    order: 1,
    type: "single_choice",
    question: {
      en: "What traffic-related issue are you facing?",
      hi: "आपको कौन सी यातायात संबंधी समस्या है?",
    },
    required: true,
    options: [
      {
        value: "echallan",
        label: { en: "Received e-challan / traffic fine", hi: "ई-चालान / ट्रैफिक जुर्माना मिला" },
        scoreWeight: 10,
        checklistFlags: ["traffic_check_challan"],
      },
      {
        value: "accident",
        label: { en: "Involved in a road accident", hi: "सड़क दुर्घटना में शामिल" },
        scoreWeight: 20,
        checklistFlags: ["traffic_accident_steps", "traffic_mact_claim"],
      },
      {
        value: "license_issue",
        label: { en: "Driving license seized / suspended", hi: "ड्राइविंग लाइसेंस ज़ब्त / निलंबित" },
        scoreWeight: 15,
        checklistFlags: ["traffic_license_recovery"],
      },
      {
        value: "police_harassment",
        label: { en: "Traffic police demanding bribe", hi: "ट्रैफिक पुलिस रिश्वत मांग रही है" },
        scoreWeight: 15,
        checklistFlags: ["traffic_anti_corruption"],
      },
    ],
  },
  {
    id: "traffic_documents",
    category: "traffic",
    order: 2,
    type: "yes_no",
    question: {
      en: "Do you carry your driving documents digitally (DigiLocker / mParivahan)?",
      hi: "क्या आप अपने ड्राइविंग दस्तावेज़ डिजिटल रूप से रखते हैं (DigiLocker / mParivahan)?",
    },
    helpText: {
      en: "Under the Motor Vehicles (Amendment) Act 2019, digital copies on DigiLocker and mParivahan are legally valid. Police cannot penalize you for not carrying physical documents.",
      hi: "मोटर वाहन (संशोधन) अधिनियम 2019 के तहत, DigiLocker और mParivahan पर डिजिटल प्रतियां कानूनी रूप से मान्य हैं।",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 10,
        checklistFlags: ["traffic_get_digilocker"],
      },
    ],
  },
  {
    id: "traffic_challan_valid",
    category: "traffic",
    order: 3,
    type: "single_choice",
    question: {
      en: "Do you believe the challan/fine is incorrect or unfair?",
      hi: "क्या आपको लगता है कि चालान/जुर्माना गलत या अनुचित है?",
    },
    condition: { questionId: "traffic_issue_type", values: ["echallan"] },
    required: true,
    options: [
      {
        value: "incorrect",
        label: { en: "Yes, it's wrong — I want to dispute it", hi: "हाँ, गलत है — मैं विवाद करना चाहता हूं" },
        scoreWeight: 5,
        checklistFlags: ["traffic_dispute_challan"],
      },
      {
        value: "valid",
        label: { en: "It's valid — I'll pay it", hi: "सही है — मैं भुगतान करूंगा" },
        scoreWeight: 0,
        checklistFlags: ["traffic_pay_challan"],
      },
      {
        value: "not_sure",
        label: { en: "Not sure", hi: "पता नहीं" },
        scoreWeight: 5,
        checklistFlags: ["traffic_check_challan"],
      },
    ],
  },
  {
    id: "traffic_accident_fir",
    category: "traffic",
    order: 4,
    type: "yes_no",
    question: {
      en: "Has an FIR been filed for the accident?",
      hi: "क्या दुर्घटना के लिए FIR दर्ज की गई है?",
    },
    condition: { questionId: "traffic_issue_type", values: ["accident"] },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 15,
        checklistFlags: ["traffic_file_fir"],
      },
    ],
  },
  {
    id: "traffic_insurance",
    category: "traffic",
    order: 5,
    type: "yes_no",
    question: {
      en: "Does the vehicle involved have valid insurance?",
      hi: "क्या शामिल वाहन का वैध बीमा है?",
    },
    condition: { questionId: "traffic_issue_type", values: ["accident"] },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0, checklistFlags: ["traffic_mact_claim"] },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 10,
        checklistFlags: ["traffic_no_insurance"],
      },
    ],
  },
  {
    id: "traffic_helmet_seatbelt",
    category: "traffic",
    order: 6,
    type: "yes_no",
    question: {
      en: "Were you wearing a helmet (2-wheeler) or seatbelt (car) at the time?",
      hi: "क्या उस समय आपने हेलमेट (दोपहिया) या सीटबेल्ट (कार) पहना था?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      { value: "no", label: { en: "No", hi: "नहीं" }, scoreWeight: 5 },
    ],
  },
  {
    id: "traffic_drink_driving",
    category: "traffic",
    order: 7,
    type: "yes_no",
    question: {
      en: "Was alcohol / drink-driving involved?",
      hi: "क्या शराब / नशे में ड्राइविंग शामिल थी?",
    },
    required: true,
    options: [
      {
        value: "yes",
        label: { en: "Yes", hi: "हाँ" },
        scoreWeight: 25,
        checklistFlags: ["traffic_drink_driving"],
      },
      { value: "no", label: { en: "No", hi: "नहीं" }, scoreWeight: 0 },
    ],
  },
];
