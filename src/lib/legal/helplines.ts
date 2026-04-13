import type { BilingualText } from "@/types";

export type HelplineCategory = "emergency" | "women" | "cyber" | "child" | "legal" | "health" | "other";

export interface Helpline {
  id: string;
  number: string;
  name: BilingualText;
  description: BilingualText;
  category: HelplineCategory;
  available: string;
  tollFree: boolean;
}

export const helplines: Helpline[] = [
  // ── Emergency ──
  {
    id: "112",
    number: "112",
    name: { en: "National Emergency Number", hi: "राष्ट्रीय आपातकालीन नंबर" },
    description: { en: "Single emergency number for police, fire, and ambulance across India.", hi: "पूरे भारत में पुलिस, अग्निशमन और एम्बुलेंस के लिए एकल आपातकालीन नंबर।" },
    category: "emergency",
    available: "24/7",
    tollFree: true,
  },
  {
    id: "100",
    number: "100",
    name: { en: "Police", hi: "पुलिस" },
    description: { en: "Report a crime, request police assistance, or file a complaint.", hi: "अपराध की रिपोर्ट करें, पुलिस सहायता मांगें, या शिकायत दर्ज करें।" },
    category: "emergency",
    available: "24/7",
    tollFree: true,
  },
  {
    id: "108",
    number: "108",
    name: { en: "Ambulance", hi: "एम्बुलेंस" },
    description: { en: "Free ambulance service for medical emergencies.", hi: "चिकित्सा आपात स्थिति के लिए मुफ्त एम्बुलेंस सेवा।" },
    category: "health",
    available: "24/7",
    tollFree: true,
  },
  {
    id: "101",
    number: "101",
    name: { en: "Fire Brigade", hi: "अग्निशमन" },
    description: { en: "Report fire emergencies and request fire brigade assistance.", hi: "आग की आपात स्थिति की रिपोर्ट करें और अग्निशमन सहायता मांगें।" },
    category: "emergency",
    available: "24/7",
    tollFree: true,
  },

  // ── Women ──
  {
    id: "181",
    number: "181",
    name: { en: "Women Helpline", hi: "महिला हेल्पलाइन" },
    description: { en: "24/7 helpline for women in distress — domestic violence, harassment, trafficking. Connects to police, legal aid, and shelter.", hi: "संकट में महिलाओं के लिए 24/7 हेल्पलाइन — घरेलू हिंसा, उत्पीड़न, तस्करी। पुलिस, कानूनी सहायता और आश्रय से जोड़ती है।" },
    category: "women",
    available: "24/7",
    tollFree: true,
  },
  {
    id: "1091",
    number: "1091",
    name: { en: "Women in Distress (Police)", hi: "संकट में महिला (पुलिस)" },
    description: { en: "Direct police helpline for women facing immediate danger or violence.", hi: "तत्काल खतरे या हिंसा का सामना कर रही महिलाओं के लिए सीधी पुलिस हेल्पलाइन।" },
    category: "women",
    available: "24/7",
    tollFree: true,
  },

  // ── Cyber ──
  {
    id: "1930",
    number: "1930",
    name: { en: "Cyber Crime Helpline", hi: "साइबर क्राइम हेल्पलाइन" },
    description: { en: "Report cyber fraud, UPI scams, phishing. Can freeze fraudster's account in the golden hour.", hi: "साइबर धोखाधड़ी, UPI स्कैम, फिशिंग की रिपोर्ट करें। गोल्डन ऑवर में धोखेबाज़ का खाता फ्रीज़ कर सकती है।" },
    category: "cyber",
    available: "24/7",
    tollFree: true,
  },
  {
    id: "155260",
    number: "155260",
    name: { en: "Cyber Financial Fraud (RBI)", hi: "साइबर वित्तीय धोखाधड़ी (RBI)" },
    description: { en: "RBI helpline for unauthorized bank transactions and financial cyber fraud.", hi: "अनधिकृत बैंक लेनदेन और वित्तीय साइबर धोखाधड़ी के लिए RBI हेल्पलाइन।" },
    category: "cyber",
    available: "24/7",
    tollFree: true,
  },

  // ── Child ──
  {
    id: "1098",
    number: "1098",
    name: { en: "Childline", hi: "चाइल्डलाइन" },
    description: { en: "Emergency helpline for children in need of care and protection — abuse, trafficking, child labour.", hi: "देखभाल और सुरक्षा की ज़रूरत वाले बच्चों के लिए आपातकालीन हेल्पलाइन — शोषण, तस्करी, बाल श्रम।" },
    category: "child",
    available: "24/7",
    tollFree: true,
  },

  // ── Legal ──
  {
    id: "15100",
    number: "15100",
    name: { en: "NALSA Legal Aid", hi: "NALSA कानूनी सहायता" },
    description: { en: "National Legal Services Authority helpline for free legal aid, advice, and Lok Adalat information.", hi: "मुफ्त कानूनी सहायता, सलाह और लोक अदालत जानकारी के लिए NALSA हेल्पलाइन।" },
    category: "legal",
    available: "9am-5pm",
    tollFree: true,
  },
  {
    id: "nch",
    number: "1800-11-4000",
    name: { en: "National Consumer Helpline", hi: "राष्ट्रीय उपभोक्ता हेल्पलाइन" },
    description: { en: "Toll-free helpline for consumer complaints, guidance, and mediation with companies.", hi: "उपभोक्ता शिकायतों, मार्गदर्शन और कंपनियों के साथ मध्यस्थता के लिए टोल-फ्री हेल्पलाइन।" },
    category: "legal",
    available: "9:30am-5:30pm",
    tollFree: true,
  },
  {
    id: "rera",
    number: "1800-180-1551",
    name: { en: "RERA Helpline", hi: "RERA हेल्पलाइन" },
    description: { en: "Helpline for homebuyer complaints against builders — delayed possession, defects, fraud.", hi: "बिल्डरों के खिलाफ गृह खरीदार शिकायतों के लिए हेल्पलाइन — देरी, दोष, धोखाधड़ी।" },
    category: "legal",
    available: "9am-6pm",
    tollFree: true,
  },
  {
    id: "epfo",
    number: "1800-118-005",
    name: { en: "EPFO Helpline", hi: "EPFO हेल्पलाइन" },
    description: { en: "Employees' Provident Fund Organisation — PF balance, withdrawal, employer complaints.", hi: "कर्मचारी भविष्य निधि संगठन — PF शेष, निकासी, नियोक्ता शिकायतें।" },
    category: "legal",
    available: "9:15am-5:45pm",
    tollFree: true,
  },
  {
    id: "rti",
    number: "1800-345-3940",
    name: { en: "RTI Helpline", hi: "RTI हेल्पलाइन" },
    description: { en: "Central Information Commission helpline for Right to Information queries and complaints.", hi: "सूचना का अधिकार प्रश्नों और शिकायतों के लिए केंद्रीय सूचना आयोग हेल्पलाइन।" },
    category: "legal",
    available: "9:30am-5:30pm",
    tollFree: true,
  },

  // ── Health ──
  {
    id: "104",
    number: "104",
    name: { en: "Health Helpline", hi: "स्वास्थ्य हेल्पलाइन" },
    description: { en: "Health information, disease queries, hospital referrals, and medical advice.", hi: "स्वास्थ्य जानकारी, रोग प्रश्न, अस्पताल रेफरल और चिकित्सा सलाह।" },
    category: "health",
    available: "24/7",
    tollFree: true,
  },

  // ── Senior Citizen ──
  {
    id: "14567",
    number: "14567",
    name: { en: "Senior Citizen Helpline (Elder Line)", hi: "वरिष्ठ नागरिक हेल्पलाइन (एल्डर लाइन)" },
    description: { en: "Helpline for elderly — abuse, pension issues, health, emotional support, legal aid referrals.", hi: "बुजुर्गों के लिए हेल्पलाइन — शोषण, पेंशन, स्वास्थ्य, भावनात्मक सहायता, कानूनी सहायता रेफरल।" },
    category: "other",
    available: "8am-8pm",
    tollFree: true,
  },

  // ── Other ──
  {
    id: "railway",
    number: "139",
    name: { en: "Railway Helpline", hi: "रेलवे हेल्पलाइन" },
    description: { en: "Train enquiry, PNR status, complaints, emergency on trains.", hi: "ट्रेन पूछताछ, PNR स्थिति, शिकायतें, ट्रेनों में आपातकाल।" },
    category: "other",
    available: "24/7",
    tollFree: true,
  },
  {
    id: "anti_corruption",
    number: "1031",
    name: { en: "Anti-Corruption (CVC)", hi: "भ्रष्टाचार विरोधी (CVC)" },
    description: { en: "Central Vigilance Commission — report corruption and bribery in government offices.", hi: "केंद्रीय सतर्कता आयोग — सरकारी कार्यालयों में भ्रष्टाचार और रिश्वतखोरी की रिपोर्ट करें।" },
    category: "legal",
    available: "9am-5pm",
    tollFree: true,
  },
];

export const helplineCategories: { id: HelplineCategory | "all"; label: BilingualText }[] = [
  { id: "all", label: { en: "All", hi: "सभी" } },
  { id: "emergency", label: { en: "Emergency", hi: "आपातकालीन" } },
  { id: "women", label: { en: "Women", hi: "महिला" } },
  { id: "cyber", label: { en: "Cyber", hi: "साइबर" } },
  { id: "child", label: { en: "Child", hi: "बाल" } },
  { id: "legal", label: { en: "Legal", hi: "कानूनी" } },
  { id: "health", label: { en: "Health", hi: "स्वास्थ्य" } },
  { id: "other", label: { en: "Other", hi: "अन्य" } },
];
