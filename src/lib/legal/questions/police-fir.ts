import type { Question } from "@/types";

export const policeFirQuestions: Question[] = [
  {
    id: "pf_issue_type",
    category: "police-fir",
    order: 1,
    type: "single_choice",
    question: {
      en: "What issue are you facing with the police?",
      hi: "आपको पुलिस से क्या समस्या है?",
    },
    required: true,
    options: [
      {
        value: "fir_refused",
        label: { en: "Police refused to file my FIR", hi: "पुलिस ने FIR दर्ज करने से मना किया" },
        scoreWeight: 25,
        checklistFlags: ["pf_complain_sp", "pf_magistrate_156"],
      },
      {
        value: "no_action",
        label: { en: "FIR filed but no investigation/action", hi: "FIR दर्ज है लेकिन कोई जांच/कार्रवाई नहीं" },
        scoreWeight: 20,
        checklistFlags: ["pf_complain_sp", "pf_rti_status"],
      },
      {
        value: "false_fir",
        label: { en: "False FIR filed against me", hi: "मेरे खिलाफ झूठी FIR दर्ज की गई" },
        scoreWeight: 20,
        checklistFlags: ["pf_quash_fir", "pf_get_lawyer"],
      },
      {
        value: "harassment",
        label: { en: "Police harassment / demanding money", hi: "पुलिस उत्पीड़न / पैसे की मांग" },
        scoreWeight: 25,
        checklistFlags: ["pf_complain_sp", "pf_anti_corruption"],
      },
    ],
  },
  {
    id: "pf_went_to_station",
    category: "police-fir",
    order: 2,
    type: "yes_no",
    question: {
      en: "Did you physically go to the police station to file the complaint?",
      hi: "क्या आप शिकायत दर्ज करने के लिए पुलिस स्टेशन गए?",
    },
    condition: { questionId: "pf_issue_type", values: ["fir_refused"] },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 5,
        checklistFlags: ["pf_go_to_station"],
      },
    ],
  },
  {
    id: "pf_written_complaint",
    category: "police-fir",
    order: 3,
    type: "yes_no",
    question: {
      en: "Did you submit a written complaint and get a receipt?",
      hi: "क्या आपने लिखित शिकायत दी और रसीद ली?",
    },
    helpText: {
      en: "A written complaint with a receiving stamp is proof that you tried. Police MUST give you a receipt.",
      hi: "रसीद के साथ लिखित शिकायत इस बात का प्रमाण है कि आपने कोशिश की। पुलिस को रसीद देनी अनिवार्य है।",
    },
    condition: { questionId: "pf_went_to_station", values: ["yes"] },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 10,
        checklistFlags: ["pf_written_complaint"],
      },
    ],
  },
  {
    id: "pf_complained_higher",
    category: "police-fir",
    order: 4,
    type: "yes_no",
    question: {
      en: "Have you complained to the SP/DCP (senior police officer)?",
      hi: "क्या आपने SP/DCP (वरिष्ठ पुलिस अधिकारी) से शिकायत की?",
    },
    condition: { questionId: "pf_issue_type", values: ["fir_refused", "no_action", "harassment"] },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 10,
        checklistFlags: ["pf_complain_sp"],
      },
    ],
  },
  {
    id: "pf_offence_type",
    category: "police-fir",
    order: 5,
    type: "single_choice",
    question: {
      en: "What type of offence is this?",
      hi: "यह किस प्रकार का अपराध है?",
    },
    helpText: {
      en: "For cognizable offences (like theft, assault, fraud), police MUST file an FIR. For non-cognizable, they give an NCR.",
      hi: "संज्ञेय अपराधों (जैसे चोरी, मारपीट, धोखाधड़ी) के लिए पुलिस को FIR दर्ज करनी अनिवार्य है।",
    },
    required: true,
    options: [
      {
        value: "cognizable",
        label: { en: "Serious (theft, assault, fraud, etc.)", hi: "गंभीर (चोरी, मारपीट, धोखाधड़ी आदि)" },
        scoreWeight: 0,
        checklistFlags: ["pf_fir_mandatory"],
      },
      {
        value: "non_cognizable",
        label: { en: "Minor (verbal abuse, minor dispute)", hi: "मामूली (गाली-गलौज, छोटा विवाद)" },
        scoreWeight: 0,
      },
      {
        value: "not_sure",
        label: { en: "Not sure", hi: "पता नहीं" },
        scoreWeight: 5,
      },
    ],
  },
  {
    id: "pf_zero_fir_aware",
    category: "police-fir",
    order: 6,
    type: "yes_no",
    question: {
      en: "Did you know you can file a Zero FIR at ANY police station regardless of jurisdiction?",
      hi: "क्या आपको पता था कि आप क्षेत्राधिकार की परवाह किए बिना किसी भी पुलिस स्टेशन में ज़ीरो FIR दर्ज कर सकते हैं?",
    },
    required: true,
    options: [
      { value: "yes", label: { en: "Yes", hi: "हाँ" }, scoreWeight: 0 },
      {
        value: "no",
        label: { en: "No", hi: "नहीं" },
        scoreWeight: 5,
        checklistFlags: ["pf_zero_fir"],
      },
    ],
  },
];
