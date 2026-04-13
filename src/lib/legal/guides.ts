import type { BilingualText } from "@/types";

export interface GuideStep {
  order: number;
  title: BilingualText;
  description: BilingualText;
  documents?: BilingualText[];
  where?: BilingualText;
}

export interface LegalGuide {
  id: string;
  title: BilingualText;
  description: BilingualText;
  category: string;
  estimatedTime: string;
  estimatedCost: string;
  steps: GuideStep[];
  tips: BilingualText[];
  relatedHelpline?: string;
  icon: string;
}

export const legalGuides: LegalGuide[] = [
  {
    id: "file-fir",
    title: { en: "How to File an FIR", hi: "FIR कैसे दर्ज करें" },
    description: { en: "Step-by-step guide to filing a First Information Report at a police station.", hi: "पुलिस स्टेशन में प्रथम सूचना रिपोर्ट दर्ज करने की चरणबद्ध मार्गदर्शिका।" },
    category: "emergency",
    estimatedTime: "1-2 hours",
    estimatedCost: "Free",
    icon: "FileText",
    relatedHelpline: "100",
    steps: [
      { order: 1, title: { en: "Go to the nearest police station", hi: "निकटतम पुलिस स्टेशन जाएं" }, description: { en: "Visit the police station that has jurisdiction over the area where the incident occurred. FIR can be filed at any police station under Zero FIR provision.", hi: "जहां घटना हुई है उस क्षेत्र के पुलिस स्टेशन में जाएं। ज़ीरो FIR प्रावधान के तहत किसी भी पुलिस स्टेशन में FIR दर्ज हो सकती है।" }, where: { en: "Nearest police station", hi: "निकटतम पुलिस स्टेशन" } },
      { order: 2, title: { en: "Narrate the incident to the duty officer", hi: "ड्यूटी अधिकारी को घटना बताएं" }, description: { en: "Clearly describe what happened — who, when, where. The officer must write it down. You can give your statement in Hindi or your local language.", hi: "स्पष्ट रूप से बताएं क्या हुआ — कौन, कब, कहां। अधिकारी को लिखना अनिवार्य है।" } },
      { order: 3, title: { en: "Read and sign the FIR", hi: "FIR पढ़ें और हस्ताक्षर करें" }, description: { en: "Read the written FIR carefully before signing. If anything is incorrect, ask for correction. You have the RIGHT to read it.", hi: "हस्ताक्षर करने से पहले FIR ध्यान से पढ़ें। कुछ गलत हो तो सुधार मांगें।" } },
      { order: 4, title: { en: "Get a free copy of the FIR", hi: "FIR की मुफ्त प्रति प्राप्त करें" }, description: { en: "Under Section 154 CrPC, police MUST give you a free copy of the FIR. This is your right — do not leave without it.", hi: "CrPC की धारा 154 के तहत, पुलिस को FIR की मुफ्त प्रति देनी अनिवार्य है।" }, documents: [{ en: "FIR copy (free)", hi: "FIR प्रति (मुफ्त)" }] },
      { order: 5, title: { en: "If police refuses to file FIR", hi: "यदि पुलिस FIR दर्ज करने से मना करे" }, description: { en: "Send a written complaint to the SP/DCP by registered post. You can also file a complaint to the Judicial Magistrate under Section 156(3) CrPC who can direct police to file the FIR.", hi: "SP/DCP को पंजीकृत डाक से लिखित शिकायत भेजें। आप CrPC की धारा 156(3) के तहत न्यायिक मजिस्ट्रेट को भी शिकायत कर सकते हैं।" } },
    ],
    tips: [
      { en: "Police CANNOT refuse to file an FIR for a cognizable offence — this is illegal under Section 166A IPC.", hi: "पुलिस संज्ञेय अपराध के लिए FIR दर्ज करने से मना नहीं कर सकती — यह IPC की धारा 166A के तहत अवैध है।" },
      { en: "You can file an FIR online in many states via their police website.", hi: "कई राज्यों में आप पुलिस वेबसाइट से ऑनलाइन FIR दर्ज कर सकते हैं।" },
      { en: "Keep a copy of the FIR safely — you'll need it for insurance claims and court proceedings.", hi: "FIR की प्रति सुरक्षित रखें — बीमा दावे और अदालती कार्यवाही के लिए ज़रूरी है।" },
    ],
  },
  {
    id: "file-rti",
    title: { en: "How to File an RTI Application", hi: "RTI आवेदन कैसे दर्ज करें" },
    description: { en: "Get any information from any government department for just ₹10.", hi: "किसी भी सरकारी विभाग से सिर्फ ₹10 में कोई भी जानकारी प्राप्त करें।" },
    category: "legal",
    estimatedTime: "30 minutes",
    estimatedCost: "₹10",
    icon: "FileSearch",
    relatedHelpline: "1800-345-3940",
    steps: [
      { order: 1, title: { en: "Identify the department", hi: "विभाग की पहचान करें" }, description: { en: "Determine which government department holds the information you need.", hi: "पता करें कि आपको जो जानकारी चाहिए वह किस सरकारी विभाग के पास है।" } },
      { order: 2, title: { en: "Write the RTI application", hi: "RTI आवेदन लिखें" }, description: { en: "Write 'Application under RTI Act, 2005' at the top. Address it to the PIO (Public Information Officer) of the department. Clearly describe what information you want.", hi: "ऊपर 'RTI अधिनियम, 2005 के तहत आवेदन' लिखें। विभाग के PIO को संबोधित करें।" } },
      { order: 3, title: { en: "Pay ₹10 fee", hi: "₹10 शुल्क जमा करें" }, description: { en: "Attach ₹10 as fee (court fee stamp, IPO, DD, or online payment). BPL card holders are exempt from fees.", hi: "₹10 शुल्क संलग्न करें (कोर्ट फी स्टैम्प, IPO, DD, या ऑनलाइन)। BPL कार्ड धारक शुल्क से मुक्त।" } },
      { order: 4, title: { en: "Submit the application", hi: "आवेदन जमा करें" }, description: { en: "Submit by post (registered) or online at rtionline.gov.in for central government. For state departments, check your state RTI portal.", hi: "पंजीकृत डाक से या केंद्र सरकार के लिए rtionline.gov.in पर ऑनलाइन जमा करें।" }, where: { en: "rtionline.gov.in or by registered post", hi: "rtionline.gov.in या पंजीकृत डाक से" } },
      { order: 5, title: { en: "Wait for response (30 days)", hi: "जवाब की प्रतीक्षा करें (30 दिन)" }, description: { en: "The PIO must respond within 30 days. If no response, file First Appeal within 30 days of deadline.", hi: "PIO को 30 दिनों के भीतर जवाब देना होगा। कोई जवाब न मिले तो 30 दिनों में प्रथम अपील दर्ज करें।" } },
    ],
    tips: [
      { en: "You don't need to give a reason for seeking information.", hi: "जानकारी मांगने का कारण देने की ज़रूरत नहीं है।" },
      { en: "RTI can be filed in Hindi, English, or the official state language.", hi: "RTI हिंदी, अंग्रेजी या राज्य की आधिकारिक भाषा में दर्ज हो सकती है।" },
    ],
  },
  {
    id: "consumer-complaint",
    title: { en: "How to File a Consumer Complaint", hi: "उपभोक्ता शिकायत कैसे दर्ज करें" },
    description: { en: "File a complaint at the Consumer Forum online at edaakhil.nic.in.", hi: "edaakhil.nic.in पर उपभोक्ता फोरम में ऑनलाइन शिकायत दर्ज करें।" },
    category: "consumer",
    estimatedTime: "1-2 hours",
    estimatedCost: "₹100-₹5,000",
    icon: "ShoppingBag",
    relatedHelpline: "1800-11-4000",
    steps: [
      { order: 1, title: { en: "Gather evidence", hi: "साक्ष्य इकट्ठा करें" }, description: { en: "Collect bills, receipts, product photos, warranty cards, emails, chat screenshots — everything related to your complaint.", hi: "बिल, रसीदें, उत्पाद फोटो, वारंटी कार्ड, ईमेल, चैट स्क्रीनशॉट — शिकायत से संबंधित सब कुछ इकट्ठा करें।" }, documents: [{ en: "Bill/Invoice", hi: "बिल/इनवॉइस" }, { en: "Product photos", hi: "उत्पाद फोटो" }, { en: "Communication records", hi: "संचार रिकॉर्ड" }] },
      { order: 2, title: { en: "Send a legal notice (recommended)", hi: "कानूनी नोटिस भेजें (अनुशंसित)" }, description: { en: "Send a legal notice to the seller/company giving them 15-30 days to resolve. This strengthens your case. Not mandatory but highly recommended.", hi: "विक्रेता/कंपनी को 15-30 दिन का समय देते हुए कानूनी नोटिस भेजें।" } },
      { order: 3, title: { en: "Register on edaakhil.nic.in", hi: "edaakhil.nic.in पर पंजीकरण करें" }, description: { en: "Create an account on the e-Daakhil portal. This is the official online consumer complaint filing system.", hi: "e-दाखिल पोर्टल पर खाता बनाएं।" }, where: { en: "edaakhil.nic.in", hi: "edaakhil.nic.in" } },
      { order: 4, title: { en: "Fill the complaint form", hi: "शिकायत फॉर्म भरें" }, description: { en: "Select your district/state commission based on claim amount. Under ₹1Cr → District, ₹1-10Cr → State, Above ₹10Cr → National.", hi: "दावा राशि के आधार पर जिला/राज्य आयोग चुनें। ₹1 करोड़ तक → जिला, ₹1-10 करोड़ → राज्य।" } },
      { order: 5, title: { en: "Pay filing fee and submit", hi: "फाइलिंग शुल्क भरें और जमा करें" }, description: { en: "Pay the filing fee online (₹100-₹5,000 depending on claim). Upload all evidence documents. Submit.", hi: "फाइलिंग शुल्क ऑनलाइन भरें। सभी साक्ष्य दस्तावेज अपलोड करें। जमा करें।" } },
      { order: 6, title: { en: "Attend hearings", hi: "सुनवाई में उपस्थित हों" }, description: { en: "You can argue your own case — no lawyer required. Cases are typically resolved in 3-6 months.", hi: "आप खुद अपना केस लड़ सकते हैं — वकील की ज़रूरत नहीं। मामले आमतौर पर 3-6 महीने में सुलझते हैं।" } },
    ],
    tips: [
      { en: "Complaint must be filed within 2 years of the cause of action.", hi: "शिकायत कार्रवाई के कारण से 2 वर्ष के भीतर दर्ज होनी चाहिए।" },
      { en: "You do NOT need a lawyer to file a consumer complaint.", hi: "उपभोक्ता शिकायत दर्ज करने के लिए वकील की ज़रूरत नहीं।" },
    ],
  },
  {
    id: "report-cyber-fraud",
    title: { en: "How to Report Cyber Fraud", hi: "साइबर धोखाधड़ी की रिपोर्ट कैसे करें" },
    description: { en: "The golden hour matters — report within minutes to maximize recovery chances.", hi: "गोल्डन ऑवर मायने रखता है — रिकवरी की संभावना बढ़ाने के लिए मिनटों में रिपोर्ट करें।" },
    category: "cyber-fraud",
    estimatedTime: "30 minutes",
    estimatedCost: "Free",
    icon: "Shield",
    relatedHelpline: "1930",
    steps: [
      { order: 1, title: { en: "Call 1930 IMMEDIATELY", hi: "तुरंत 1930 पर कॉल करें" }, description: { en: "This is the single most important step. The helpline can freeze the fraudster's bank account in real-time. Every minute counts.", hi: "यह सबसे महत्वपूर्ण कदम है। हेल्पलाइन रीयल-टाइम में धोखेबाज़ का बैंक खाता फ्रीज़ कर सकती है।" } },
      { order: 2, title: { en: "Call your bank's fraud helpline", hi: "अपने बैंक की फ्रॉड हेल्पलाइन पर कॉल करें" }, description: { en: "Block your card/UPI, report unauthorized transactions. Under RBI rules, reporting within 3 days = zero liability.", hi: "कार्ड/UPI ब्लॉक करें, अनधिकृत लेनदेन रिपोर्ट करें। RBI नियम: 3 दिन में रिपोर्ट = शून्य देनदारी।" } },
      { order: 3, title: { en: "File complaint at cybercrime.gov.in", hi: "cybercrime.gov.in पर शिकायत दर्ज करें" }, description: { en: "Register and file a detailed complaint with all evidence — transaction IDs, screenshots, phone numbers.", hi: "सभी साक्ष्य के साथ विस्तृत शिकायत दर्ज करें — ट्रांजेक्शन ID, स्क्रीनशॉट, फोन नंबर।" }, where: { en: "cybercrime.gov.in", hi: "cybercrime.gov.in" } },
      { order: 4, title: { en: "File an FIR at local police station", hi: "स्थानीय पुलिस स्टेशन में FIR दर्ज करें" }, description: { en: "Take the cybercrime.gov.in complaint number and file an FIR. Police cannot refuse.", hi: "cybercrime.gov.in शिकायत नंबर लेकर FIR दर्ज करें। पुलिस मना नहीं कर सकती।" } },
      { order: 5, title: { en: "Secure your accounts", hi: "अपने खातों को सुरक्षित करें" }, description: { en: "Change passwords for all accounts, enable 2FA, check for unauthorized transactions.", hi: "सभी खातों के पासवर्ड बदलें, 2FA सक्षम करें, अनधिकृत लेनदेन की जांच करें।" } },
    ],
    tips: [
      { en: "Report within 3 days for zero liability (RBI mandate).", hi: "शून्य देनदारी के लिए 3 दिन के भीतर रिपोर्ट करें (RBI आदेश)।" },
      { en: "Keep all evidence — screenshots, call records, bank statements. Don't delete anything.", hi: "सभी साक्ष्य रखें — स्क्रीनशॉट, कॉल रिकॉर्ड, बैंक स्टेटमेंट। कुछ न हटाएं।" },
    ],
  },
  {
    id: "register-rent-agreement",
    title: { en: "How to Register a Rent Agreement", hi: "किराया अनुबंध कैसे पंजीकृत करें" },
    description: { en: "Protect your rights as tenant or landlord with a registered agreement.", hi: "पंजीकृत अनुबंध के साथ किरायेदार या मकान मालिक के रूप में अपने अधिकारों की रक्षा करें।" },
    category: "rent",
    estimatedTime: "2-3 hours",
    estimatedCost: "₹500-₹2,000",
    icon: "Home",
    steps: [
      { order: 1, title: { en: "Draft the rent agreement", hi: "किराया अनुबंध तैयार करें" }, description: { en: "Include: names, property address, monthly rent, deposit amount, duration, notice period, maintenance responsibilities.", hi: "शामिल करें: नाम, संपत्ति पता, मासिक किराया, जमा राशि, अवधि, नोटिस अवधि।" } },
      { order: 2, title: { en: "Buy stamp paper", hi: "स्टांप पेपर खरीदें" }, description: { en: "Get non-judicial stamp paper of the required value (varies by state, typically ₹100-₹500). Available at authorized stamp vendors.", hi: "आवश्यक मूल्य का गैर-न्यायिक स्टांप पेपर प्राप्त करें (राज्य के अनुसार ₹100-₹500)।" } },
      { order: 3, title: { en: "Both parties sign with 2 witnesses", hi: "2 गवाहों के साथ दोनों पक्ष हस्ताक्षर करें" }, description: { en: "Landlord and tenant sign. Two independent witnesses also sign. Attach photos of both parties.", hi: "मकान मालिक और किरायेदार हस्ताक्षर करें। दो स्वतंत्र गवाह भी हस्ताक्षर करें।" }, documents: [{ en: "Aadhaar of both parties", hi: "दोनों पक्षों का आधार" }, { en: "Property ownership proof", hi: "संपत्ति स्वामित्व प्रमाण" }, { en: "Passport photos", hi: "पासपोर्ट फोटो" }] },
      { order: 4, title: { en: "Register at Sub-Registrar office", hi: "उप-पंजीयक कार्यालय में पंजीकृत करें" }, description: { en: "Visit the Sub-Registrar office with both parties, witnesses, and all documents. Pay registration fee.", hi: "दोनों पक्ष, गवाह और सभी दस्तावेजों के साथ उप-पंजीयक कार्यालय जाएं।" }, where: { en: "Sub-Registrar Office", hi: "उप-पंजीयक कार्यालय" } },
    ],
    tips: [
      { en: "Agreements of 11 months or less don't legally require registration but it's still recommended.", hi: "11 महीने या उससे कम के अनुबंधों को कानूनी रूप से पंजीकरण की ज़रूरत नहीं लेकिन अनुशंसित है।" },
      { en: "Many states now offer online registration — check your state's registration department website.", hi: "कई राज्य अब ऑनलाइन पंजीकरण प्रदान करते हैं।" },
    ],
  },
  {
    id: "free-legal-aid",
    title: { en: "How to Apply for Free Legal Aid", hi: "मुफ्त कानूनी सहायता कैसे लें" },
    description: { en: "Get a free lawyer through NALSA — no cost at all.", hi: "NALSA के माध्यम से मुफ्त वकील प्राप्त करें — बिल्कुल मुफ्त।" },
    category: "legal",
    estimatedTime: "1 hour",
    estimatedCost: "Free",
    icon: "Scale",
    relatedHelpline: "15100",
    steps: [
      { order: 1, title: { en: "Check eligibility", hi: "पात्रता जांचें" }, description: { en: "Eligible: women, children, SC/ST, disabled, industrial workmen, BPL (income < ₹3 lakh/year), victims of trafficking, persons in custody.", hi: "पात्र: महिलाएं, बच्चे, SC/ST, विकलांग, औद्योगिक कामगार, BPL (आय < ₹3 लाख/वर्ष)।" } },
      { order: 2, title: { en: "Visit DLSA at district court", hi: "जिला अदालत में DLSA जाएं" }, description: { en: "Go to the District Legal Services Authority office located at or near the district court complex.", hi: "जिला अदालत परिसर में या उसके पास स्थित DLSA कार्यालय में जाएं।" }, where: { en: "DLSA at district court complex", hi: "जिला अदालत परिसर में DLSA" } },
      { order: 3, title: { en: "Fill the application form", hi: "आवेदन फॉर्म भरें" }, description: { en: "Fill the free legal aid application form. Attach: ID proof, income certificate (if income-based), and details of your case.", hi: "मुफ्त कानूनी सहायता आवेदन फॉर्म भरें।" }, documents: [{ en: "ID proof (Aadhaar/Voter ID)", hi: "पहचान प्रमाण" }, { en: "Income certificate (if applicable)", hi: "आय प्रमाणपत्र (यदि लागू)" }] },
      { order: 4, title: { en: "Get assigned a lawyer", hi: "वकील नियुक्त करवाएं" }, description: { en: "DLSA will assign a panel lawyer. All lawyer fees, court fees, and documentation costs are covered.", hi: "DLSA एक पैनल वकील नियुक्त करेगा। सभी वकील शुल्क, अदालत शुल्क और दस्तावेज़ लागत शामिल।" } },
    ],
    tips: [
      { en: "You can also apply online at nalsa.gov.in.", hi: "आप nalsa.gov.in पर ऑनलाइन भी आवेदन कर सकते हैं।" },
      { en: "Free legal aid is a Constitutional right under Article 39A.", hi: "मुफ्त कानूनी सहायता अनुच्छेद 39A के तहत संवैधानिक अधिकार है।" },
    ],
  },
];

export function getGuideById(id: string): LegalGuide | undefined {
  return legalGuides.find((g) => g.id === id);
}
