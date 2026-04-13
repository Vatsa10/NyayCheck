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
    description: { en: "Step-by-step guide to filing an FIR. Updated with BNSS 2023 (new criminal law) provisions including Zero FIR and audio-visual recording.", hi: "FIR दर्ज करने की चरणबद्ध मार्गदर्शिका। BNSS 2023 (नया आपराधिक कानून) प्रावधानों सहित — ज़ीरो FIR और ऑडियो-विज़ुअल रिकॉर्डिंग।" },
    category: "police-fir",
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
  // 7. Cheque Bounce Guide
  {
    id: "cheque-bounce-case",
    title: { en: "How to Handle a Cheque Bounce Case", hi: "चेक बाउंस केस कैसे संभालें" },
    description: { en: "Step-by-step guide to filing a cheque bounce case under Section 138 of the Negotiable Instruments Act.", hi: "परक्राम्य लिखत अधिनियम की धारा 138 के तहत चेक बाउंस केस दर्ज करने की चरणबद्ध मार्गदर्शिका।" },
    category: "cheque-bounce",
    estimatedTime: "1-2 weeks",
    estimatedCost: "₹500-2000",
    icon: "Banknote",
    relatedHelpline: "1800-11-4000",
    steps: [
      { order: 1, title: { en: "Get return memo from bank", hi: "बैंक से रिटर्न मेमो प्राप्त करें" }, description: { en: "When the cheque bounces, your bank will issue a 'Cheque Return Memo' stating the reason for bounce (e.g., insufficient funds). Collect this immediately.", hi: "जब चेक बाउंस होता है, तो आपका बैंक बाउंस का कारण बताते हुए 'चेक रिटर्न मेमो' जारी करेगा (जैसे अपर्याप्त राशि)। इसे तुरंत प्राप्त करें।" }, documents: [{ en: "Cheque Return Memo", hi: "चेक रिटर्न मेमो" }], where: { en: "Your bank branch", hi: "आपकी बैंक शाखा" } },
      { order: 2, title: { en: "Send S.138 notice within 30 days via RPAD", hi: "30 दिनों के भीतर RPAD से धारा 138 नोटिस भेजें" }, description: { en: "Send a legal demand notice to the cheque issuer (drawer) within 30 days of receiving the return memo. Send via Registered Post with Acknowledgement Due (RPAD).", hi: "रिटर्न मेमो प्राप्त होने के 30 दिनों के भीतर चेक जारीकर्ता (ड्रॉअर) को कानूनी मांग नोटिस भेजें। RPAD (पावती सहित पंजीकृत डाक) से भेजें।" }, documents: [{ en: "Legal notice copy", hi: "कानूनी नोटिस की प्रति" }, { en: "RPAD receipt", hi: "RPAD रसीद" }] },
      { order: 3, title: { en: "Wait 15 days for payment", hi: "भुगतान के लिए 15 दिन प्रतीक्षा करें" }, description: { en: "After the notice is received by the drawer, they get 15 days to make the payment. Keep track of the delivery date from the RPAD receipt.", hi: "नोटिस प्राप्त होने के बाद, ड्रॉअर को भुगतान करने के लिए 15 दिन मिलते हैं। RPAD रसीद से डिलीवरी की तारीख का ध्यान रखें।" } },
      { order: 4, title: { en: "If no payment, file complaint in Magistrate court within 30 days", hi: "भुगतान न हो तो 30 दिनों में मजिस्ट्रेट कोर्ट में शिकायत दर्ज करें" }, description: { en: "If the drawer does not pay within 15 days, file a criminal complaint under S.138 NI Act in the Magistrate's court within 30 days of expiry of the 15-day period.", hi: "यदि ड्रॉअर 15 दिनों में भुगतान नहीं करता, तो 15 दिन की अवधि समाप्त होने के 30 दिनों के भीतर मजिस्ट्रेट कोर्ट में धारा 138 NI Act के तहत आपराधिक शिकायत दर्ज करें।" }, where: { en: "Magistrate Court", hi: "मजिस्ट्रेट कोर्ट" }, documents: [{ en: "Original cheque", hi: "मूल चेक" }, { en: "Return memo", hi: "रिटर्न मेमो" }, { en: "Copy of legal notice + RPAD receipt", hi: "कानूनी नोटिस की प्रति + RPAD रसीद" }] },
      { order: 5, title: { en: "Attend hearings", hi: "सुनवाई में उपस्थित हों" }, description: { en: "Attend all court hearings. The court may award compensation up to twice the cheque amount. Punishment can include imprisonment up to 2 years.", hi: "सभी अदालती सुनवाई में उपस्थित हों। कोर्ट चेक राशि का दोगुना तक मुआवज़ा दे सकता है। सज़ा में 2 साल तक की कैद हो सकती है।" } },
    ],
    tips: [
      { en: "Must send notice within 30 days of bounce — missing this deadline can invalidate your case.", hi: "बाउंस के 30 दिनों के भीतर नोटिस भेजना ज़रूरी है — यह समय सीमा चूकने पर केस अमान्य हो सकता है।" },
      { en: "Drawer gets 15 days to pay after receiving notice.", hi: "नोटिस प्राप्त होने के बाद ड्रॉअर को भुगतान के लिए 15 दिन मिलते हैं।" },
      { en: "File case within 30 days after the 15-day payment period expires.", hi: "15 दिन की भुगतान अवधि समाप्त होने के 30 दिनों के भीतर केस दर्ज करें।" },
      { en: "Keep original cheque and return memo safe — they are crucial evidence.", hi: "मूल चेक और रिटर्न मेमो सुरक्षित रखें — ये महत्वपूर्ण साक्ष्य हैं।" },
    ],
  },

  // 8. Police FIR Refused
  {
    id: "police-fir-refused",
    title: { en: "What To Do When Police Refuse to File FIR", hi: "जब पुलिस FIR दर्ज करने से मना करे तो क्या करें" },
    description: { en: "Know your options when the police station refuses to register your FIR.", hi: "जब पुलिस स्टेशन आपकी FIR दर्ज करने से इनकार करे तो अपने विकल्प जानें।" },
    category: "police-fir",
    estimatedTime: "1-3 days",
    estimatedCost: "Free",
    icon: "ShieldAlert",
    relatedHelpline: "100",
    steps: [
      { order: 1, title: { en: "Submit written complaint to SHO with receiving copy", hi: "SHO को प्राप्ति प्रति सहित लिखित शिकायत दें" }, description: { en: "Write your complaint in detail and submit it to the Station House Officer (SHO). Insist on getting a receiving stamp on your copy.", hi: "अपनी शिकायत विस्तार से लिखें और थाना प्रभारी (SHO) को जमा करें। अपनी प्रति पर प्राप्ति मोहर लगवाने पर ज़ोर दें।" }, where: { en: "Police station", hi: "पुलिस स्टेशन" } },
      { order: 2, title: { en: "Send registered post to SP/DCP", hi: "SP/DCP को पंजीकृत डाक भेजें" }, description: { en: "If the SHO refuses, send your written complaint to the Superintendent of Police (SP) or Deputy Commissioner of Police (DCP) via registered post.", hi: "यदि SHO मना करे, तो अपनी लिखित शिकायत पंजीकृत डाक से पुलिस अधीक्षक (SP) या पुलिस उपायुक्त (DCP) को भेजें।" }, documents: [{ en: "Registered post receipt", hi: "पंजीकृत डाक रसीद" }] },
      { order: 3, title: { en: "File RTI asking status", hi: "RTI दर्ज करें स्थिति पूछते हुए" }, description: { en: "File an RTI application asking for the status of your complaint and why FIR has not been registered. This creates official pressure.", hi: "अपनी शिकायत की स्थिति और FIR दर्ज न होने का कारण पूछते हुए RTI आवेदन दर्ज करें। इससे आधिकारिक दबाव बनता है।" } },
      { order: 4, title: { en: "If still no FIR, approach Magistrate under S.156(3)", hi: "फिर भी FIR न हो तो धारा 156(3) के तहत मजिस्ट्रेट से संपर्क करें" }, description: { en: "File an application before the Judicial Magistrate under Section 156(3) CrPC requesting direction to police to register the FIR.", hi: "CrPC की धारा 156(3) के तहत न्यायिक मजिस्ट्रेट के समक्ष आवेदन दायर करें और पुलिस को FIR दर्ज करने का निर्देश मांगें।" }, where: { en: "Judicial Magistrate Court", hi: "न्यायिक मजिस्ट्रेट कोर्ट" } },
      { order: 5, title: { en: "Magistrate can direct police to file FIR", hi: "मजिस्ट्रेट पुलिस को FIR दर्ज करने का निर्देश दे सकते हैं" }, description: { en: "The Magistrate has the power to direct the police to register FIR and investigate. This is a legally binding order.", hi: "मजिस्ट्रेट के पास पुलिस को FIR दर्ज करने और जांच करने का निर्देश देने का अधिकार है। यह कानूनी रूप से बाध्यकारी आदेश है।" } },
    ],
    tips: [
      { en: "Police refusing FIR is punishable under Section 166A IPC — the officer can face imprisonment.", hi: "FIR दर्ज करने से इनकार करना IPC की धारा 166A के तहत दंडनीय है — अधिकारी को कैद हो सकती है।" },
      { en: "Zero FIR can be filed at ANY police station regardless of jurisdiction.", hi: "ज़ीरो FIR किसी भी पुलिस स्टेशन में दर्ज हो सकती है, क्षेत्राधिकार कोई भी हो।" },
      { en: "Always get a receiving stamp on your written complaint — it serves as proof of submission.", hi: "अपनी लिखित शिकायत पर हमेशा प्राप्ति मोहर लें — यह जमा करने का प्रमाण है।" },
    ],
  },

  // 9. How to Write a Will
  {
    id: "write-will",
    title: { en: "How to Write a Will", hi: "वसीयत कैसे लिखें" },
    description: { en: "A simple guide to writing a legally valid will to protect your family's inheritance.", hi: "अपने परिवार की विरासत की सुरक्षा के लिए कानूनी रूप से वैध वसीयत लिखने की सरल मार्गदर्शिका।" },
    category: "family",
    estimatedTime: "1-2 hours",
    estimatedCost: "Free (₹500 if registered)",
    icon: "FileText",
    steps: [
      { order: 1, title: { en: "List all your assets and beneficiaries", hi: "अपनी सभी संपत्ति और लाभार्थियों की सूची बनाएं" }, description: { en: "Make a comprehensive list of all your assets — property, bank accounts, investments, jewellery, vehicles — and who should receive each.", hi: "अपनी सभी संपत्तियों की व्यापक सूची बनाएं — प्रॉपर्टी, बैंक खाते, निवेश, गहने, वाहन — और प्रत्येक किसे मिलनी चाहिए।" } },
      { order: 2, title: { en: "Draft the will", hi: "वसीयत का ड्राफ्ट तैयार करें" }, description: { en: "Write the will clearly stating your wishes. Include your full name, date, declaration that you are of sound mind, and details of each bequest. You can use NyayCheck template.", hi: "अपनी इच्छाओं को स्पष्ट रूप से बताते हुए वसीयत लिखें। अपना पूरा नाम, तारीख, स्वस्थ मस्तिष्क की घोषणा, और प्रत्येक वसीयत का विवरण शामिल करें। आप NyayCheck टेम्पलेट का उपयोग कर सकते हैं।" } },
      { order: 3, title: { en: "Sign in presence of 2 witnesses", hi: "2 गवाहों की उपस्थिति में हस्ताक्षर करें" }, description: { en: "Sign the will in the presence of at least 2 witnesses. Witnesses should also sign and provide their full names and addresses. Witnesses should not be beneficiaries.", hi: "कम से कम 2 गवाहों की उपस्थिति में वसीयत पर हस्ताक्षर करें। गवाहों को भी हस्ताक्षर करने चाहिए और अपना पूरा नाम और पता देना चाहिए। गवाह लाभार्थी नहीं होने चाहिए।" } },
      { order: 4, title: { en: "Get it notarized (recommended)", hi: "नोटरी करवाएं (अनुशंसित)" }, description: { en: "Getting the will notarized adds an extra layer of authenticity. A notary public will verify your identity and attest the document.", hi: "वसीयत को नोटरी करवाने से प्रामाणिकता की एक अतिरिक्त परत जुड़ती है। नोटरी पब्लिक आपकी पहचान सत्यापित करेगा।" }, where: { en: "Notary Public", hi: "नोटरी पब्लिक" } },
      { order: 5, title: { en: "Optionally register at Sub-Registrar", hi: "वैकल्पिक रूप से उप-पंजीयक कार्यालय में पंजीकृत करें" }, description: { en: "Registration is optional but highly recommended as it adds strong legal validity and prevents tampering. Visit the Sub-Registrar office with witnesses.", hi: "पंजीकरण वैकल्पिक है लेकिन अत्यधिक अनुशंसित है क्योंकि यह मजबूत कानूनी वैधता जोड़ता है और छेड़छाड़ रोकता है। गवाहों के साथ उप-पंजीयक कार्यालय जाएं।" }, where: { en: "Sub-Registrar Office", hi: "उप-पंजीयक कार्यालय" } },
    ],
    tips: [
      { en: "Will can be handwritten or typed — both are legally valid.", hi: "वसीयत हस्तलिखित या टाइप दोनों हो सकती है — दोनों कानूनी रूप से वैध हैं।" },
      { en: "No stamp paper is needed to write a will.", hi: "वसीयत लिखने के लिए स्टांप पेपर की ज़रूरत नहीं है।" },
      { en: "Registration is optional but recommended to avoid disputes.", hi: "पंजीकरण वैकल्पिक है लेकिन विवादों से बचने के लिए अनुशंसित है।" },
      { en: "A will can be changed or revoked at any time during your lifetime.", hi: "वसीयत को आपके जीवनकाल में कभी भी बदला या रद्द किया जा सकता है।" },
    ],
  },

  // 10. Power of Attorney
  {
    id: "get-poa",
    title: { en: "How to Get a Power of Attorney", hi: "पावर ऑफ अटॉर्नी कैसे बनवाएं" },
    description: { en: "Guide to creating a Power of Attorney to authorize someone to act on your behalf.", hi: "किसी को अपनी ओर से कार्य करने का अधिकार देने के लिए पावर ऑफ अटॉर्नी बनाने की मार्गदर्शिका।" },
    category: "property",
    estimatedTime: "2-3 hours",
    estimatedCost: "₹500-2000 (stamp paper)",
    icon: "FileSignature",
    steps: [
      { order: 1, title: { en: "Decide what powers to grant (specific or general)", hi: "तय करें कौन सी शक्तियां देनी हैं (विशिष्ट या सामान्य)" }, description: { en: "A General POA grants broad powers for all acts. A Specific POA limits authority to specific tasks (e.g., selling one property). Choose based on your needs.", hi: "सामान्य POA सभी कार्यों के लिए व्यापक अधिकार देता है। विशिष्ट POA अधिकार को विशेष कार्यों तक सीमित करता है (जैसे एक संपत्ति बेचना)। अपनी ज़रूरत के अनुसार चुनें।" } },
      { order: 2, title: { en: "Draft the POA", hi: "POA का ड्राफ्ट तैयार करें" }, description: { en: "Draft the POA document clearly specifying the powers being granted, the principal (person granting), and the agent (person receiving authority).", hi: "POA दस्तावेज़ का ड्राफ्ट तैयार करें जिसमें दी जा रही शक्तियां, प्रिंसिपल (देने वाला) और एजेंट (अधिकार प्राप्त करने वाला) स्पष्ट रूप से निर्दिष्ट हों।" } },
      { order: 3, title: { en: "Buy stamp paper of required value (varies by state)", hi: "आवश्यक मूल्य का स्टांप पेपर खरीदें (राज्य के अनुसार भिन्न)" }, description: { en: "Purchase non-judicial stamp paper of the required denomination. The value varies by state (typically ₹100-₹500). Available at authorized stamp vendors.", hi: "आवश्यक मूल्यवर्ग का गैर-न्यायिक स्टांप पेपर खरीदें। मूल्य राज्य के अनुसार भिन्न होता है (आमतौर पर ₹100-₹500)। अधिकृत स्टांप विक्रेताओं पर उपलब्ध।" } },
      { order: 4, title: { en: "Both parties sign before notary", hi: "दोनों पक्ष नोटरी के समक्ष हस्ताक्षर करें" }, description: { en: "Both the principal and agent must sign the POA in the presence of a notary public and two witnesses.", hi: "प्रिंसिपल और एजेंट दोनों को नोटरी पब्लिक और दो गवाहों की उपस्थिति में POA पर हस्ताक्षर करने होंगे।" }, where: { en: "Notary Public", hi: "नोटरी पब्लिक" } },
      { order: 5, title: { en: "Register at Sub-Registrar (mandatory for property)", hi: "उप-पंजीयक कार्यालय में पंजीकृत करें (संपत्ति के लिए अनिवार्य)" }, description: { en: "Registration is mandatory if the POA involves property transactions. Visit the Sub-Registrar office with both parties and witnesses.", hi: "यदि POA में संपत्ति लेनदेन शामिल है तो पंजीकरण अनिवार्य है। दोनों पक्षों और गवाहों के साथ उप-पंजीयक कार्यालय जाएं।" }, where: { en: "Sub-Registrar Office", hi: "उप-पंजीयक कार्यालय" } },
    ],
    tips: [
      { en: "Stamp paper value varies by state (₹100-₹500) — check your state's stamp duty schedule.", hi: "स्टांप पेपर का मूल्य राज्य के अनुसार भिन्न (₹100-₹500) — अपने राज्य की स्टांप ड्यूटी अनुसूची देखें।" },
      { en: "Registration is mandatory for POA involving property transactions.", hi: "संपत्ति लेनदेन वाले POA के लिए पंजीकरण अनिवार्य है।" },
      { en: "POA for persons abroad needs embassy/consulate attestation.", hi: "विदेश में रहने वालों के लिए POA को दूतावास/वाणिज्य दूतावास प्रमाणन की ज़रूरत है।" },
    ],
  },

  // 11. Speed Up Court Case
  {
    id: "speed-up-case",
    title: { en: "How to Speed Up Your Court Case", hi: "अपने कोर्ट केस को कैसे तेज़ करें" },
    description: { en: "Practical steps to reduce delays and speed up the resolution of your court case.", hi: "अपने कोर्ट केस के निपटारे में देरी कम करने और तेज़ी लाने के व्यावहारिक कदम।" },
    category: "legal",
    estimatedTime: "varies",
    estimatedCost: "₹500-1000",
    icon: "Clock",
    relatedHelpline: "15100",
    steps: [
      { order: 1, title: { en: "File application for early hearing citing urgency", hi: "तात्कालिकता का हवाला देते हुए शीघ्र सुनवाई के लिए आवेदन दें" }, description: { en: "File an application before the court requesting early/priority hearing. Clearly state the grounds of urgency (e.g., health, financial hardship, age).", hi: "कोर्ट के समक्ष शीघ्र/प्राथमिकता सुनवाई के लिए आवेदन दायर करें। तात्कालिकता के आधार स्पष्ट रूप से बताएं (जैसे स्वास्थ्य, आर्थिक कठिनाई, उम्र)।" } },
      { order: 2, title: { en: "Object to unnecessary adjournments", hi: "अनावश्यक स्थगन पर आपत्ति करें" }, description: { en: "If the opposing party keeps seeking adjournments, object on record. Courts can impose costs for frivolous adjournments.", hi: "यदि विपक्षी पक्ष बार-बार स्थगन मांगता है, तो रिकॉर्ड पर आपत्ति करें। कोर्ट अनावश्यक स्थगन पर जुर्माना लगा सकता है।" } },
      { order: 3, title: { en: "Write to court registry about case delay", hi: "केस में देरी के बारे में कोर्ट रजिस्ट्री को लिखें" }, description: { en: "Submit a written representation to the court registry highlighting the inordinate delay and requesting expedited hearing.", hi: "कोर्ट रजिस्ट्री को अत्यधिक देरी को उजागर करते हुए और शीघ्र सुनवाई का अनुरोध करते हुए लिखित प्रतिवेदन दें।" }, where: { en: "Court Registry", hi: "कोर्ट रजिस्ट्री" } },
      { order: 4, title: { en: "File RTI asking for case status and reason for delay", hi: "केस की स्थिति और देरी का कारण पूछते हुए RTI दर्ज करें" }, description: { en: "File an RTI application to the court administration asking for the status of your case and the specific reasons for delay.", hi: "कोर्ट प्रशासन को RTI आवेदन दर्ज करें जिसमें अपने केस की स्थिति और देरी के विशिष्ट कारण पूछें।" } },
      { order: 5, title: { en: "Consider Lok Adalat for settlement", hi: "निपटारे के लिए लोक अदालत पर विचार करें" }, description: { en: "Lok Adalats can settle cases quickly, free of cost, and decisions are binding. Contact DLSA to get your case referred to Lok Adalat.", hi: "लोक अदालतें मामलों को जल्दी, मुफ्त में सुलझा सकती हैं और फैसले बाध्यकारी होते हैं। अपना मामला लोक अदालत में भेजने के लिए DLSA से संपर्क करें।" }, where: { en: "DLSA / Lok Adalat", hi: "DLSA / लोक अदालत" } },
    ],
    tips: [
      { en: "Under Article 21, speedy trial is a fundamental right — you can cite this in your application.", hi: "अनुच्छेद 21 के तहत, त्वरित सुनवाई मौलिक अधिकार है — आप अपने आवेदन में इसका हवाला दे सकते हैं।" },
      { en: "Lok Adalat decisions are binding and free — no court fees or appeal.", hi: "लोक अदालत के फैसले बाध्यकारी और मुफ्त हैं — कोई कोर्ट फीस या अपील नहीं।" },
      { en: "You can object to adjournments on record — courts take this seriously.", hi: "आप स्थगन पर रिकॉर्ड पर आपत्ति कर सकते हैं — कोर्ट इसे गंभीरता से लेता है।" },
    ],
  },

  // 12. Medical Negligence
  {
    id: "medical-negligence",
    title: { en: "How to File a Medical Negligence Complaint", hi: "चिकित्सा लापरवाही की शिकायत कैसे दर्ज करें" },
    description: { en: "Steps to hold hospitals and doctors accountable for medical negligence.", hi: "चिकित्सा लापरवाही के लिए अस्पतालों और डॉक्टरों को जवाबदेह ठहराने के कदम।" },
    category: "consumer",
    estimatedTime: "2-3 hours",
    estimatedCost: "₹100-5000",
    icon: "HeartPulse",
    relatedHelpline: "1800-11-4000",
    steps: [
      { order: 1, title: { en: "Collect all medical records and bills", hi: "सभी मेडिकल रिकॉर्ड और बिल इकट्ठा करें" }, description: { en: "Gather all medical records, prescriptions, discharge summaries, bills, and treatment details. Hospitals are legally bound to provide copies of your records.", hi: "सभी मेडिकल रिकॉर्ड, प्रिस्क्रिप्शन, डिस्चार्ज सारांश, बिल और उपचार विवरण इकट्ठा करें। अस्पताल कानूनी रूप से आपके रिकॉर्ड की प्रतियां देने के लिए बाध्य हैं।" }, documents: [{ en: "Medical records & prescriptions", hi: "मेडिकल रिकॉर्ड और प्रिस्क्रिप्शन" }, { en: "Hospital bills", hi: "अस्पताल बिल" }, { en: "Discharge summary", hi: "डिस्चार्ज सारांश" }] },
      { order: 2, title: { en: "Get a second medical opinion", hi: "दूसरी चिकित्सा राय लें" }, description: { en: "Consult another qualified doctor to get an independent opinion on whether the treatment was appropriate or negligent.", hi: "यह स्वतंत्र राय लेने के लिए किसी अन्य योग्य डॉक्टर से परामर्श करें कि उपचार उचित था या लापरवाहीपूर्ण।" } },
      { order: 3, title: { en: "Send legal notice to hospital/doctor", hi: "अस्पताल/डॉक्टर को कानूनी नोटिस भेजें" }, description: { en: "Send a detailed legal notice via registered post to the hospital and/or doctor stating the negligence and demanding compensation.", hi: "अस्पताल और/या डॉक्टर को पंजीकृत डाक से विस्तृत कानूनी नोटिस भेजें जिसमें लापरवाही बताएं और मुआवज़ा मांगें।" } },
      { order: 4, title: { en: "File complaint at Consumer Forum (edaakhil.nic.in)", hi: "उपभोक्ता फोरम में शिकायत दर्ज करें (edaakhil.nic.in)" }, description: { en: "File an online complaint at edaakhil.nic.in. Healthcare is a 'service' under the Consumer Protection Act, 2019, so you can file here.", hi: "edaakhil.nic.in पर ऑनलाइन शिकायत दर्ज करें। उपभोक्ता संरक्षण अधिनियम, 2019 के तहत स्वास्थ्य सेवा एक 'सेवा' है, इसलिए आप यहां शिकायत कर सकते हैं।" }, where: { en: "edaakhil.nic.in", hi: "edaakhil.nic.in" } },
      { order: 5, title: { en: "Healthcare is a 'service' under Consumer Protection Act 2019", hi: "उपभोक्ता संरक्षण अधिनियम 2019 के तहत स्वास्थ्य सेवा एक 'सेवा' है" }, description: { en: "Remember that medical services fall under consumer protection law. You can claim compensation for physical suffering, mental agony, and financial loss.", hi: "याद रखें कि चिकित्सा सेवाएं उपभोक्ता संरक्षण कानून के अंतर्गत आती हैं। आप शारीरिक पीड़ा, मानसिक व्यथा और आर्थिक नुकसान के लिए मुआवज़ा मांग सकते हैं।" } },
    ],
    tips: [
      { en: "Medical records are YOUR right — the hospital must provide copies on request.", hi: "मेडिकल रिकॉर्ड आपका अधिकार है — अस्पताल को मांगने पर प्रतियां देनी होंगी।" },
      { en: "You can claim compensation for physical suffering, mental agony, and financial loss.", hi: "आप शारीरिक पीड़ा, मानसिक व्यथा और आर्थिक नुकसान के लिए मुआवज़ा मांग सकते हैं।" },
      { en: "Time limit: complaint must be filed within 2 years from the date of negligence.", hi: "समय सीमा: लापरवाही की तारीख से 2 वर्ष के भीतर शिकायत दर्ज होनी चाहिए।" },
    ],
  },

  // 13. Neighbor Disputes
  {
    id: "neighbor-disputes",
    title: { en: "How to Handle Neighbor Disputes", hi: "पड़ोसी विवादों से कैसे निपटें" },
    description: { en: "Practical steps to resolve disputes with neighbors through legal and community channels.", hi: "कानूनी और सामुदायिक माध्यमों से पड़ोसियों के साथ विवादों को सुलझाने के व्यावहारिक कदम।" },
    category: "property",
    estimatedTime: "1-2 hours",
    estimatedCost: "Free-₹500",
    icon: "Home",
    steps: [
      { order: 1, title: { en: "Document the issue (photos, videos, dates)", hi: "समस्या का दस्तावेज़ीकरण करें (फोटो, वीडियो, तारीखें)" }, description: { en: "Take photos, record videos, and maintain a log of incidents with dates and times. This evidence will be crucial if the matter goes to court.", hi: "फोटो लें, वीडियो रिकॉर्ड करें, और तारीखों व समय के साथ घटनाओं का लॉग रखें। यदि मामला कोर्ट जाता है तो यह साक्ष्य महत्वपूर्ण होगा।" } },
      { order: 2, title: { en: "Write complaint to housing society/RWA", hi: "हाउसिंग सोसाइटी/RWA को शिकायत लिखें" }, description: { en: "Submit a written complaint to your housing society or Resident Welfare Association. Society rules are binding on all members.", hi: "अपनी हाउसिंग सोसाइटी या रेजिडेंट वेलफेयर एसोसिएशन को लिखित शिकायत दें। सोसाइटी के नियम सभी सदस्यों पर बाध्यकारी हैं।" } },
      { order: 3, title: { en: "If society doesn't act, file police complaint for nuisance", hi: "सोसाइटी कार्रवाई न करे तो उपद्रव के लिए पुलिस शिकायत दर्ज करें" }, description: { en: "If the society does not resolve the issue, file a police complaint for nuisance. Police can act under CrPC Section 133 for public nuisance.", hi: "यदि सोसाइटी समस्या नहीं सुलझाती, तो उपद्रव के लिए पुलिस शिकायत दर्ज करें। पुलिस CrPC धारा 133 के तहत सार्वजनिक उपद्रव पर कार्रवाई कर सकती है।" }, where: { en: "Local police station", hi: "स्थानीय पुलिस स्टेशन" } },
      { order: 4, title: { en: "For encroachment, file civil suit", hi: "अतिक्रमण के लिए सिविल मुकदमा दायर करें" }, description: { en: "If a neighbor has encroached on your property, file a civil suit for injunction and removal of encroachment in the civil court.", hi: "यदि पड़ोसी ने आपकी संपत्ति पर अतिक्रमण किया है, तो सिविल कोर्ट में निषेधाज्ञा और अतिक्रमण हटाने के लिए सिविल मुकदमा दायर करें।" }, where: { en: "Civil Court", hi: "सिविल कोर्ट" } },
      { order: 5, title: { en: "For noise, complaint to pollution control board", hi: "शोर के लिए प्रदूषण नियंत्रण बोर्ड में शिकायत करें" }, description: { en: "For persistent noise pollution, file a complaint with the State Pollution Control Board. Residential noise limits: 55dB (day), 45dB (night).", hi: "लगातार ध्वनि प्रदूषण के लिए राज्य प्रदूषण नियंत्रण बोर्ड में शिकायत दर्ज करें। आवासीय शोर सीमा: 55dB (दिन), 45dB (रात)।" } },
    ],
    tips: [
      { en: "Society rules are binding on all members — violations can lead to penalties.", hi: "सोसाइटी के नियम सभी सदस्यों पर बाध्यकारी हैं — उल्लंघन से जुर्माना हो सकता है।" },
      { en: "Noise pollution rules: 55dB during day, 45dB at night in residential areas.", hi: "ध्वनि प्रदूषण नियम: आवासीय क्षेत्रों में दिन में 55dB, रात में 45dB।" },
      { en: "Police can act on nuisance complaints under IPC Section 268 and CrPC Section 133.", hi: "पुलिस IPC धारा 268 और CrPC धारा 133 के तहत उपद्रव शिकायतों पर कार्रवाई कर सकती है।" },
    ],
  },

  // 14. Get Relieving Letter
  {
    id: "get-relieving-letter",
    title: { en: "How to Get Your Relieving Letter", hi: "अपना रिलीविंग लेटर कैसे प्राप्त करें" },
    description: { en: "Steps to get your relieving letter when your employer is not cooperating.", hi: "जब आपका नियोक्ता सहयोग नहीं कर रहा हो तो रिलीविंग लेटर प्राप्त करने के कदम।" },
    category: "employment",
    estimatedTime: "1-2 weeks",
    estimatedCost: "₹0-500",
    icon: "Briefcase",
    steps: [
      { order: 1, title: { en: "Send formal email to HR requesting letter", hi: "HR को पत्र का अनुरोध करते हुए औपचारिक ईमेल भेजें" }, description: { en: "Send a formal email to your HR department requesting the relieving letter. Mention your last working date, employee ID, and that you have served your notice period.", hi: "अपने HR विभाग को रिलीविंग लेटर का अनुरोध करते हुए औपचारिक ईमेल भेजें। अपनी अंतिम कार्य तिथि, कर्मचारी ID और नोटिस अवधि पूरी करने का उल्लेख करें।" } },
      { order: 2, title: { en: "If no response, send legal notice via registered post", hi: "जवाब न मिले तो पंजीकृत डाक से कानूनी नोटिस भेजें" }, description: { en: "If HR does not respond within a reasonable time (7-10 days), send a legal notice via registered post demanding the relieving letter.", hi: "यदि HR उचित समय (7-10 दिन) में जवाब नहीं देता, तो पंजीकृत डाक से रिलीविंग लेटर की मांग करते हुए कानूनी नोटिस भेजें।" }, documents: [{ en: "Legal notice copy", hi: "कानूनी नोटिस की प्रति" }, { en: "Registered post receipt", hi: "पंजीकृत डाक रसीद" }] },
      { order: 3, title: { en: "File complaint with Labour Commissioner", hi: "श्रम आयुक्त के पास शिकायत दर्ज करें" }, description: { en: "File a formal complaint with the Labour Commissioner of your district. They can summon your employer and mediate.", hi: "अपने जिले के श्रम आयुक्त के पास औपचारिक शिकायत दर्ज करें। वे आपके नियोक्ता को बुला सकते हैं और मध्यस्थता कर सकते हैं।" }, where: { en: "Labour Commissioner Office", hi: "श्रम आयुक्त कार्यालय" } },
      { order: 4, title: { en: "If still no response, file case in Labour Court", hi: "फिर भी जवाब न मिले तो श्रम न्यायालय में केस दर्ज करें" }, description: { en: "As a last resort, file a case in the Labour Court. The court can order the employer to issue the relieving letter and pay compensation.", hi: "अंतिम उपाय के रूप में श्रम न्यायालय में केस दर्ज करें। कोर्ट नियोक्ता को रिलीविंग लेटर जारी करने और मुआवज़ा देने का आदेश दे सकता है।" }, where: { en: "Labour Court", hi: "श्रम न्यायालय" } },
      { order: 5, title: { en: "Mention that withholding is illegal under Standing Orders Act", hi: "बताएं कि रोकना औद्योगिक स्थायी आदेश अधिनियम के तहत अवैध है" }, description: { en: "In all communications, mention that withholding the relieving letter is illegal under the Industrial Employment (Standing Orders) Act and amounts to unfair labour practice.", hi: "सभी संवादों में बताएं कि रिलीविंग लेटर रोकना औद्योगिक रोजगार (स्थायी आदेश) अधिनियम के तहत अवैध है और अनुचित श्रम प्रथा है।" } },
    ],
    tips: [
      { en: "Relieving letter is your right after serving the notice period — the company cannot withhold it.", hi: "नोटिस अवधि पूरी करने के बाद रिलीविंग लेटर आपका अधिकार है — कंपनी इसे रोक नहीं सकती।" },
      { en: "Company cannot hold the relieving letter to prevent you from joining another employer.", hi: "कंपनी आपको दूसरे नियोक्ता से जुड़ने से रोकने के लिए रिलीविंग लेटर नहीं रोक सकती।" },
    ],
  },
];

export function getGuideById(id: string): LegalGuide | undefined {
  return legalGuides.find((g) => g.id === id);
}
