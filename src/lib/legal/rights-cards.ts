import type { BilingualText } from "@/types";

export interface RightsCard {
  id: string;
  title: BilingualText;
  category: string;
  points: BilingualText[];
  applicableAct: string;
  shareText: BilingualText;
  icon: string;
}

export type RightsCategory = "all" | "rent" | "consumer" | "employment" | "family" | "cyber-fraud" | "ecommerce" | "legal" | "property" | "emergency" | "cheque-bounce" | "police-fir" | "traffic" | "senior-citizen";

export const rightsCategories: { id: RightsCategory; label: BilingualText }[] = [
  { id: "all", label: { en: "All", hi: "सभी" } },
  { id: "rent", label: { en: "Rent", hi: "किराया" } },
  { id: "consumer", label: { en: "Consumer", hi: "उपभोक्ता" } },
  { id: "employment", label: { en: "Employment", hi: "रोजगार" } },
  { id: "family", label: { en: "Family", hi: "परिवार" } },
  { id: "cyber-fraud", label: { en: "Cyber", hi: "साइबर" } },
  { id: "legal", label: { en: "Legal", hi: "कानूनी" } },
  { id: "property", label: { en: "Property", hi: "संपत्ति" } },
  { id: "emergency", label: { en: "Emergency", hi: "आपातकालीन" } },
  { id: "cheque-bounce", label: { en: "Cheque Bounce", hi: "चेक बाउंस" } },
  { id: "police-fir", label: { en: "Police/FIR", hi: "पुलिस/FIR" } },
  { id: "traffic", label: { en: "Traffic", hi: "यातायात" } },
  { id: "senior-citizen", label: { en: "Senior Citizen", hi: "वरिष्ठ नागरिक" } },
];

export const rightsCards: RightsCard[] = [
  // 1. Tenant Rights
  {
    id: "tenant-rights",
    title: { en: "5 Rights Every Tenant Must Know", hi: "हर किरायेदार को ये 5 अधिकार पता होने चाहिए" },
    category: "rent",
    points: [
      { en: "Landlord cannot cut water/electricity to force eviction — this is a criminal offence.", hi: "मकान मालिक बेदखली के लिए पानी/बिजली नहीं काट सकता — यह अपराध है।" },
      { en: "Rent can only be increased as per the Rent Control Act of your state, not arbitrarily.", hi: "किराया केवल आपके राज्य के किराया नियंत्रण अधिनियम के अनुसार बढ़ाया जा सकता है, मनमाने ढंग से नहीं।" },
      { en: "You have the right to a written rent agreement — insist on registering it.", hi: "आपको लिखित किराया समझौते का अधिकार है — इसे पंजीकृत कराने पर जोर दें।" },
      { en: "Security deposit refund is your right — landlord must return it minus legitimate deductions.", hi: "सुरक्षा जमा वापसी आपका अधिकार है — मकान मालिक को वैध कटौती के बाद वापस करना होगा।" },
      { en: "Landlord must give reasonable notice (usually 1-3 months) before asking you to vacate.", hi: "मकान मालिक को खाली करने से पहले उचित नोटिस (आमतौर पर 1-3 महीने) देना होगा।" },
    ],
    applicableAct: "State Rent Control Acts / Model Tenancy Act, 2021",
    shareText: {
      en: "5 Rights Every Tenant Must Know:\n\n1. Landlord CANNOT cut water/electricity\n2. Rent increase only per Rent Control Act\n3. You deserve a written agreement\n4. Security deposit must be returned\n5. Landlord must give notice before eviction\n\nKnow your rights. Share this.\n— NyayCheck",
      hi: "हर किरायेदार के 5 अधिकार:\n\n1. मकान मालिक पानी/बिजली नहीं काट सकता\n2. किराया केवल कानून के अनुसार बढ़ेगा\n3. लिखित समझौता आपका हक है\n4. सुरक्षा जमा वापस मिलनी चाहिए\n5. बेदखली से पहले नोटिस ज़रूरी\n\nअपने अधिकार जानें।\n— NyayCheck",
    },
    icon: "Home",
  },

  // 2. Police Stop
  {
    id: "police-stop",
    title: { en: "What To Do If Police Stops You", hi: "अगर पुलिस रोके तो क्या करें" },
    category: "emergency",
    points: [
      { en: "Ask the officer to identify themselves — name, badge number, and police station.", hi: "अधिकारी से पहचान पूछें — नाम, बैज नंबर और थाना।" },
      { en: "You cannot be detained without being told the reason. Ask: 'Am I being detained or am I free to go?'", hi: "बिना कारण बताए आपको रोका नहीं जा सकता। पूछें: 'क्या मुझे हिरासत में लिया जा रहा है?'" },
      { en: "Police cannot search you without a valid reason. Pat-down requires a same-gender officer.", hi: "पुलिस बिना वैध कारण तलाशी नहीं ले सकती। शारीरिक तलाशी समान लिंग के अधिकारी द्वारा होनी चाहिए।" },
      { en: "You have the right to remain silent. You are not required to sign any blank paper.", hi: "आपको चुप रहने का अधिकार है। आपको कोई खाली कागज पर हस्ताक्षर करने की जरूरत नहीं है।" },
      { en: "Call 112 if you feel threatened. You can also record the interaction on your phone.", hi: "अगर खतरा महसूस हो तो 112 पर कॉल करें। आप फोन पर रिकॉर्ड भी कर सकते हैं।" },
    ],
    applicableAct: "Code of Criminal Procedure (CrPC), 1973 / Bharatiya Nagarik Suraksha Sanhita, 2023",
    shareText: {
      en: "If Police Stops You:\n\n1. Ask for name & badge number\n2. They must tell you why you're stopped\n3. No search without valid reason\n4. You can remain silent\n5. Call 112 if threatened\n\nKnow your rights.\n— NyayCheck",
      hi: "अगर पुलिस रोके:\n\n1. नाम और बैज नंबर पूछें\n2. रोकने का कारण बताना ज़रूरी\n3. बिना कारण तलाशी नहीं\n4. चुप रहने का अधिकार है\n5. खतरा हो तो 112 पर कॉल करें\n\n— NyayCheck",
    },
    icon: "ShieldAlert",
  },

  // 3. Arrest Rights
  {
    id: "arrest-rights",
    title: { en: "Your Rights If Arrested", hi: "गिरफ्तारी पर आपके अधिकार" },
    category: "emergency",
    points: [
      { en: "Police must show the arrest warrant or state the reason for arrest immediately.", hi: "पुलिस को गिरफ्तारी वारंट दिखाना होगा या तुरंत गिरफ्तारी का कारण बताना होगा।" },
      { en: "You must be produced before a magistrate within 24 hours of arrest.", hi: "गिरफ्तारी के 24 घंटे के भीतर आपको मजिस्ट्रेट के सामने पेश किया जाना चाहिए।" },
      { en: "You have the right to inform a family member or friend about your arrest.", hi: "आपको अपनी गिरफ्तारी के बारे में परिवार के सदस्य या मित्र को सूचित करने का अधिकार है।" },
      { en: "You have the right to a lawyer. If you can't afford one, free legal aid is available (Art. 22, NALSA).", hi: "आपको वकील का अधिकार है। अगर वकील नहीं रख सकते तो मुफ्त कानूनी सहायता उपलब्ध है (अनुच्छेद 22, NALSA)।" },
      { en: "You cannot be tortured or threatened for a confession. Any forced confession is inadmissible.", hi: "आपको इकबालिया बयान के लिए प्रताड़ित या धमकाया नहीं जा सकता। जबरन इकबालिया बयान अमान्य है।" },
      { en: "Women cannot be arrested after sunset and before sunrise, except by a female officer with a magistrate's order.", hi: "महिलाओं को सूर्यास्त के बाद और सूर्योदय से पहले गिरफ्तार नहीं किया जा सकता, सिवाय महिला अधिकारी द्वारा मजिस्ट्रेट के आदेश से।" },
    ],
    applicableAct: "Article 22 of Constitution / CrPC Sec 41, 50, 55A / BNSS 2023",
    shareText: {
      en: "Your Rights If Arrested:\n\n1. Police must state reason for arrest\n2. Must be taken to magistrate within 24 hrs\n3. Right to inform family\n4. Right to a lawyer (free legal aid available)\n5. No torture for confession\n6. Women: No arrest after sunset\n\n— NyayCheck",
      hi: "गिरफ्तारी पर अधिकार:\n\n1. कारण बताना ज़रूरी\n2. 24 घंटे में मजिस्ट्रेट के सामने\n3. परिवार को सूचना का हक\n4. वकील का अधिकार (मुफ्त सहायता)\n5. प्रताड़ना अवैध\n6. महिला: सूर्यास्त बाद गिरफ्तारी नहीं\n\n— NyayCheck",
    },
    icon: "Gavel",
  },

  // 4. Landlord Harassment
  {
    id: "landlord-harassment",
    title: { en: "How to Handle Landlord Harassment", hi: "मकान मालिक की प्रताड़ना से कैसे निपटें" },
    category: "rent",
    points: [
      { en: "Document every incident — save messages, photos, and video recordings with timestamps.", hi: "हर घटना का दस्तावेजीकरण करें — संदेश, फोटो और वीडियो टाइमस्टैम्प के साथ सेव करें।" },
      { en: "File a police complaint (FIR) if landlord threatens, assaults, or cuts essential services.", hi: "अगर मकान मालिक धमकाता है, मारपीट करता है या ज़रूरी सेवाएं काटता है तो FIR दर्ज करें।" },
      { en: "Send a written legal notice through a lawyer — this creates official record.", hi: "वकील के माध्यम से लिखित कानूनी नोटिस भेजें — यह आधिकारिक रिकॉर्ड बनाता है।" },
      { en: "Approach the Rent Controller or civil court for protection against illegal eviction.", hi: "अवैध बेदखली से सुरक्षा के लिए किराया नियंत्रक या सिविल कोर्ट जाएं।" },
      { en: "If you are a woman, harassment by landlord can also be reported under relevant IPC/BNS sections.", hi: "अगर आप महिला हैं तो मकान मालिक द्वारा उत्पीड़न की शिकायत IPC/BNS की संबंधित धाराओं में हो सकती है।" },
    ],
    applicableAct: "State Rent Control Acts / IPC Sec 504, 506 / BNS 2023",
    shareText: {
      en: "Landlord Harassment? Here's what to do:\n\n1. Document everything with timestamps\n2. File FIR if threatened or assaulted\n3. Send legal notice through lawyer\n4. Approach Rent Controller or court\n5. Women: Report under IPC/BNS\n\n— NyayCheck",
      hi: "मकान मालिक परेशान कर रहा?\n\n1. सबूत इकट्ठा करें\n2. धमकी/मारपीट पर FIR करें\n3. वकील से कानूनी नोटिस भेजें\n4. किराया नियंत्रक/कोर्ट जाएं\n5. महिला: IPC/BNS में शिकायत\n\n— NyayCheck",
    },
    icon: "ShieldX",
  },

  // 5. Consumer Return & Refund
  {
    id: "consumer-refund",
    title: { en: "Consumer Rights: Return & Refund", hi: "उपभोक्ता अधिकार: वापसी और रिफंड" },
    category: "consumer",
    points: [
      { en: "You have the right to return defective products and get a full refund or replacement.", hi: "आपको दोषपूर्ण उत्पाद वापस करने और पूर्ण रिफंड या बदलाव पाने का अधिकार है।" },
      { en: "'No exchange, no refund' signs have no legal validity — they cannot override your consumer rights.", hi: "'No exchange, no refund' बोर्ड का कोई कानूनी मान्यता नहीं — ये आपके उपभोक्ता अधिकारों को ओवरराइड नहीं कर सकते।" },
      { en: "File complaint on consumerhelpline.gov.in or call 1800-11-4000 (toll-free).", hi: "consumerhelpline.gov.in पर शिकायत करें या 1800-11-4000 (टोल-फ्री) पर कॉल करें।" },
      { en: "E-commerce platforms must process refunds within the time stated in their policy.", hi: "ई-कॉमर्स प्लेटफॉर्म को अपनी पॉलिसी में बताए गए समय में रिफंड प्रोसेस करना होगा।" },
      { en: "You can file a consumer complaint for claims up to Rs 1 crore in District Consumer Forum — no lawyer needed.", hi: "आप 1 करोड़ रुपये तक के दावों के लिए जिला उपभोक्ता फोरम में शिकायत कर सकते हैं — वकील की जरूरत नहीं।" },
    ],
    applicableAct: "Consumer Protection Act, 2019",
    shareText: {
      en: "Consumer Return & Refund Rights:\n\n1. Defective product = full refund/replacement\n2. 'No refund' signs are NOT legal\n3. Complain at 1800-11-4000 (toll-free)\n4. E-commerce must refund on time\n5. File in Consumer Forum — no lawyer needed\n\n— NyayCheck",
      hi: "उपभोक्ता रिफंड अधिकार:\n\n1. खराब सामान = पूरा रिफंड/बदलाव\n2. 'No refund' बोर्ड गैर-कानूनी\n3. 1800-11-4000 पर शिकायत करें\n4. ई-कॉमर्स को समय पर रिफंड देना होगा\n5. उपभोक्ता फोरम — वकील की ज़रूरत नहीं\n\n— NyayCheck",
    },
    icon: "RotateCcw",
  },

  // 6. Employee Rights
  {
    id: "employee-rights",
    title: { en: "Your Rights as an Employee", hi: "कर्मचारी के रूप में आपके अधिकार" },
    category: "employment",
    points: [
      { en: "You must receive an appointment letter within 30 days of joining.", hi: "आपको शामिल होने के 30 दिनों के भीतर नियुक्ति पत्र मिलना चाहिए।" },
      { en: "PF (12% employer + 12% employee) is mandatory if the company has 20+ employees.", hi: "PF (12% नियोक्ता + 12% कर्मचारी) अनिवार्य है अगर कंपनी में 20+ कर्मचारी हैं।" },
      { en: "Minimum 1 day earned leave for every 20 days worked. Gratuity after 5 years of continuous service.", hi: "हर 20 दिन काम पर न्यूनतम 1 दिन अर्जित अवकाश। 5 साल की निरंतर सेवा के बाद ग्रेच्युटी।" },
      { en: "Sexual harassment at workplace: Internal Complaints Committee (ICC) is mandatory in every company with 10+ employees.", hi: "कार्यस्थल पर यौन उत्पीड़न: 10+ कर्मचारियों वाली हर कंपनी में आंतरिक शिकायत समिति (ICC) अनिवार्य है।" },
      { en: "Wrongful termination without notice or reason can be challenged in Labour Court.", hi: "बिना नोटिस या कारण के गलत बर्खास्तगी को श्रम न्यायालय में चुनौती दी जा सकती है।" },
    ],
    applicableAct: "Industrial Disputes Act / EPF Act / PoSH Act, 2013",
    shareText: {
      en: "Employee Rights:\n\n1. Appointment letter in 30 days\n2. PF is mandatory (20+ employees)\n3. Earned leave + Gratuity after 5 years\n4. PoSH committee mandatory (10+ employees)\n5. Challenge wrongful termination in Labour Court\n\n— NyayCheck",
      hi: "कर्मचारी अधिकार:\n\n1. 30 दिन में नियुक्ति पत्र\n2. PF अनिवार्य (20+ कर्मचारी)\n3. अर्जित अवकाश + 5 साल बाद ग्रेच्युटी\n4. PoSH समिति अनिवार्य\n5. गलत बर्खास्तगी को चुनौती दें\n\n— NyayCheck",
    },
    icon: "Briefcase",
  },

  // 7. DV Act Women's Rights
  {
    id: "dv-act-rights",
    title: { en: "Women's Rights Under DV Act", hi: "घरेलू हिंसा कानून में महिलाओं के अधिकार" },
    category: "family",
    points: [
      { en: "Domestic violence includes physical, emotional, verbal, economic, and sexual abuse.", hi: "घरेलू हिंसा में शारीरिक, भावनात्मक, मौखिक, आर्थिक और यौन शोषण शामिल है।" },
      { en: "You have the right to live in the shared household — husband/in-laws cannot throw you out.", hi: "आपको साझा घर में रहने का अधिकार है — पति/ससुराल वाले आपको बाहर नहीं निकाल सकते।" },
      { en: "You can get a Protection Order from court to stop the abuser from contacting or coming near you.", hi: "आप कोर्ट से संरक्षण आदेश प्राप्त कर सकती हैं जो दुर्व्यवहारकर्ता को आपसे संपर्क करने या पास आने से रोकता है।" },
      { en: "Right to monetary relief — maintenance, medical expenses, and compensation for damages.", hi: "मौद्रिक राहत का अधिकार — भरणपोषण, चिकित्सा खर्च और नुकसान का मुआवज़ा।" },
      { en: "Call Women Helpline 181 or approach the nearest Protection Officer or Magistrate.", hi: "महिला हेल्पलाइन 181 पर कॉल करें या निकटतम संरक्षण अधिकारी या मजिस्ट्रेट से संपर्क करें।" },
    ],
    applicableAct: "Protection of Women from Domestic Violence Act, 2005",
    shareText: {
      en: "Women's Rights Under DV Act:\n\n1. DV = physical, emotional, economic abuse\n2. Right to live in shared household\n3. Get Protection Order from court\n4. Right to maintenance & compensation\n5. Call 181 for help\n\n— NyayCheck",
      hi: "घरेलू हिंसा कानून:\n\n1. शारीरिक, भावनात्मक, आर्थिक शोषण = DV\n2. साझा घर में रहने का हक\n3. कोर्ट से संरक्षण आदेश\n4. भरणपोषण और मुआवज़ा\n5. 181 पर कॉल करें\n\n— NyayCheck",
    },
    icon: "HeartHandshake",
  },

  // 8. UPI Fraud
  {
    id: "upi-fraud",
    title: { en: "UPI Fraud: First 30 Minutes Matter", hi: "UPI फ्रॉड: पहले 30 मिनट सबसे ज़रूरी" },
    category: "cyber-fraud",
    points: [
      { en: "Call 1930 (Cyber Crime Helpline) IMMEDIATELY — within 30 minutes the fraudster's bank account can be frozen.", hi: "तुरंत 1930 (साइबर क्राइम हेल्पलाइन) पर कॉल करें — 30 मिनट में धोखेबाज़ का बैंक खाता फ्रीज़ हो सकता है।" },
      { en: "File online complaint at cybercrime.gov.in with transaction ID, UPI reference, and screenshots.", hi: "cybercrime.gov.in पर ट्रांजैक्शन ID, UPI रेफरेंस और स्क्रीनशॉट के साथ ऑनलाइन शिकायत दर्ज करें।" },
      { en: "Inform your bank immediately and request blocking the transaction or account.", hi: "अपने बैंक को तुरंत सूचित करें और लेनदेन या खाता ब्लॉक करने का अनुरोध करें।" },
      { en: "Never share OTP, UPI PIN, or click unknown payment links — no bank ever asks for these.", hi: "कभी OTP, UPI PIN शेयर न करें या अज्ञात पेमेंट लिंक पर क्लिक न करें — कोई भी बैंक ये नहीं मांगता।" },
      { en: "RBI rule: If you report unauthorized transaction within 3 days, your liability is limited (zero for bank error).", hi: "RBI नियम: अगर 3 दिन में अनधिकृत लेनदेन की रिपोर्ट करें तो आपकी देनदारी सीमित है (बैंक गलती पर शून्य)।" },
    ],
    applicableAct: "IT Act, 2000 / RBI Circular on Unauthorised Electronic Transactions",
    shareText: {
      en: "UPI Fraud? Act in 30 minutes!\n\n1. Call 1930 IMMEDIATELY\n2. File at cybercrime.gov.in\n3. Inform your bank NOW\n4. Never share OTP/PIN\n5. Report in 3 days = limited liability\n\nShare this. Save someone.\n— NyayCheck",
      hi: "UPI फ्रॉड? 30 मिनट में करें ये:\n\n1. तुरंत 1930 पर कॉल करें\n2. cybercrime.gov.in पर शिकायत\n3. बैंक को तुरंत बताएं\n4. OTP/PIN कभी शेयर न करें\n5. 3 दिन में रिपोर्ट = सीमित नुकसान\n\n— NyayCheck",
    },
    icon: "Smartphone",
  },

  // 9. DPDP Data Privacy
  {
    id: "data-privacy",
    title: { en: "Your Data Privacy Rights (DPDP)", hi: "आपके डेटा प्राइवेसी अधिकार (DPDP)" },
    category: "ecommerce",
    points: [
      { en: "Companies must get your clear consent before collecting personal data — pre-ticked boxes are not valid consent.", hi: "कंपनियों को व्यक्तिगत डेटा एकत्र करने से पहले आपकी स्पष्ट सहमति लेनी होगी — पहले से टिक बॉक्स वैध सहमति नहीं है।" },
      { en: "You have the right to know what data is collected about you and how it is being used.", hi: "आपको यह जानने का अधिकार है कि आपके बारे में कौन सा डेटा एकत्र किया गया है और इसका उपयोग कैसे हो रहा है।" },
      { en: "You can withdraw consent at any time and request deletion of your personal data.", hi: "आप किसी भी समय सहमति वापस ले सकते हैं और अपने व्यक्तिगत डेटा को हटाने का अनुरोध कर सकते हैं।" },
      { en: "Companies must notify you of any data breach that may affect you.", hi: "कंपनियों को किसी भी डेटा उल्लंघन के बारे में आपको सूचित करना होगा जो आपको प्रभावित कर सकता है।" },
      { en: "Penalty for companies: up to Rs 250 crore for data breach violations.", hi: "कंपनियों के लिए जुर्माना: डेटा उल्लंघन के लिए 250 करोड़ रुपये तक।" },
    ],
    applicableAct: "Digital Personal Data Protection Act (DPDP), 2023",
    shareText: {
      en: "Your Data Privacy Rights:\n\n1. Companies need CLEAR consent\n2. Right to know what data is collected\n3. Withdraw consent + delete data anytime\n4. Must be notified of data breaches\n5. Companies face Rs 250 cr penalty\n\n— NyayCheck",
      hi: "डेटा प्राइवेसी अधिकार:\n\n1. कंपनी को स्पष्ट सहमति चाहिए\n2. डेटा जानने का अधिकार\n3. सहमति वापस ले सकते हैं\n4. डेटा ब्रीच की सूचना ज़रूरी\n5. कंपनी पर 250 करोड़ जुर्माना\n\n— NyayCheck",
    },
    icon: "Lock",
  },

  // 10. Illegal Eviction
  {
    id: "illegal-eviction",
    title: { en: "How to Refuse Illegal Eviction", hi: "अवैध बेदखली कैसे रोकें" },
    category: "rent",
    points: [
      { en: "Landlord cannot evict you without a court order — self-help eviction is illegal.", hi: "मकान मालिक बिना कोर्ट आदेश के बेदखल नहीं कर सकता — खुद बेदखली करना अवैध है।" },
      { en: "If landlord changes locks or removes your belongings, file an FIR for criminal trespass.", hi: "अगर मकान मालिक ताला बदले या सामान हटाए तो आपराधिक अतिक्रमण की FIR दर्ज करें।" },
      { en: "You can apply for a stay order from the Rent Controller to prevent eviction.", hi: "बेदखली रोकने के लिए किराया नियंत्रक से स्थगन आदेश के लिए आवेदन कर सकते हैं।" },
      { en: "Keep paying rent (even by money order if landlord refuses) to show you're a bona fide tenant.", hi: "किराया देते रहें (मनी ऑर्डर से भी अगर मालिक मना करे) — यह आपकी सद्भावना दिखाता है।" },
      { en: "Legal aid is free for those earning below Rs 9 lakh/year — contact DLSA.", hi: "9 लाख/वर्ष से कम आय वालों के लिए कानूनी सहायता मुफ्त है — DLSA से संपर्क करें।" },
    ],
    applicableAct: "State Rent Control Acts / CPC Order 39",
    shareText: {
      en: "Stop Illegal Eviction:\n\n1. No eviction without court order\n2. Lock change = file FIR\n3. Get stay order from Rent Controller\n4. Keep paying rent (money order)\n5. Free legal aid at DLSA\n\n— NyayCheck",
      hi: "अवैध बेदखली रोकें:\n\n1. कोर्ट आदेश बिना बेदखली नहीं\n2. ताला बदला = FIR करें\n3. किराया नियंत्रक से स्थगन आदेश\n4. किराया देते रहें (मनी ऑर्डर)\n5. DLSA से मुफ्त कानूनी सहायता\n\n— NyayCheck",
    },
    icon: "DoorOpen",
  },

  // 11. Free Legal Aid
  {
    id: "free-legal-aid",
    title: { en: "Right to Free Legal Aid", hi: "मुफ्त कानूनी सहायता का अधिकार" },
    category: "legal",
    points: [
      { en: "Free legal aid is a fundamental right under Article 39A of the Constitution.", hi: "मुफ्त कानूनी सहायता संविधान के अनुच्छेद 39A के तहत मौलिक अधिकार है।" },
      { en: "Eligible: SC/ST, women, children, disabled, industrial workers, persons earning below Rs 9 lakh/year, victims of trafficking.", hi: "पात्र: SC/ST, महिलाएं, बच्चे, विकलांग, औद्योगिक श्रमिक, 9 लाख/वर्ष से कम आय, तस्करी पीड़ित।" },
      { en: "Contact your nearest District Legal Services Authority (DLSA) or call NALSA at 15100.", hi: "अपने निकटतम जिला कानूनी सेवा प्राधिकरण (DLSA) से संपर्क करें या NALSA को 15100 पर कॉल करें।" },
      { en: "Free services include: lawyer, court fees waiver, drafting of documents, and mediation.", hi: "मुफ्त सेवाओं में शामिल: वकील, कोर्ट फीस माफी, दस्तावेज़ ड्राफ्टिंग और मध्यस्थता।" },
      { en: "Lok Adalats resolve cases free of cost with no court fee — decisions are final and binding.", hi: "लोक अदालतें बिना कोर्ट फीस के मुफ्त में मामले सुलझाती हैं — फैसले अंतिम और बाध्यकारी हैं।" },
    ],
    applicableAct: "Legal Services Authorities Act, 1987 / Article 39A",
    shareText: {
      en: "Right to Free Legal Aid:\n\n1. Constitutional right (Art. 39A)\n2. For SC/ST, women, poor, disabled\n3. Call NALSA: 15100\n4. Free lawyer + court fee waiver\n5. Lok Adalat = free + final decision\n\n— NyayCheck",
      hi: "मुफ्त कानूनी सहायता:\n\n1. संवैधानिक अधिकार (अनु. 39A)\n2. SC/ST, महिला, गरीब, विकलांग के लिए\n3. NALSA: 15100 पर कॉल करें\n4. मुफ्त वकील + कोर्ट फीस माफी\n5. लोक अदालत = मुफ्त + अंतिम फैसला\n\n— NyayCheck",
    },
    icon: "Scale",
  },

  // 12. RERA Homebuyer
  {
    id: "rera-homebuyer",
    title: { en: "RERA: Homebuyer Rights", hi: "RERA: गृह खरीदार के अधिकार" },
    category: "property",
    points: [
      { en: "Builder must register the project with RERA before advertising or selling — check on your state RERA website.", hi: "बिल्डर को विज्ञापन या बिक्री से पहले RERA में प्रोजेक्ट रजिस्टर करना होगा — अपने राज्य की RERA वेबसाइट पर जांचें।" },
      { en: "If possession is delayed, you are entitled to interest on your investment or full refund with interest.", hi: "अगर कब्ज़ा देने में देरी हो तो आप निवेश पर ब्याज या ब्याज सहित पूर्ण रिफंड के हकदार हैं।" },
      { en: "Builder cannot change the plan/layout without 2/3rd consent of allottees.", hi: "बिल्डर आवंटितों की 2/3 सहमति के बिना प्लान/लेआउट नहीं बदल सकता।" },
      { en: "Structural defect within 5 years of possession — builder must fix it free of cost within 30 days.", hi: "कब्ज़े के 5 साल के भीतर संरचनात्मक दोष — बिल्डर को 30 दिन में मुफ्त ठीक करना होगा।" },
      { en: "File RERA complaint online on your state RERA portal — no lawyer needed.", hi: "अपने राज्य के RERA पोर्टल पर ऑनलाइन शिकायत दर्ज करें — वकील की जरूरत नहीं।" },
    ],
    applicableAct: "Real Estate (Regulation and Development) Act, 2016 (RERA)",
    shareText: {
      en: "RERA Homebuyer Rights:\n\n1. Builder must register with RERA first\n2. Delayed possession = refund + interest\n3. No plan change without 2/3 consent\n4. Structural defect = free repair in 30 days\n5. File complaint online — no lawyer needed\n\n— NyayCheck",
      hi: "RERA गृह खरीदार अधिकार:\n\n1. बिल्डर को पहले RERA में रजिस्टर करना होगा\n2. देरी = रिफंड + ब्याज\n3. 2/3 सहमति बिना प्लान नहीं बदलेगा\n4. दोष = 30 दिन में मुफ्त मरम्मत\n5. ऑनलाइन शिकायत — वकील नहीं चाहिए\n\n— NyayCheck",
    },
    icon: "Building",
  },

  // 13. RTI
  {
    id: "rti-rights",
    title: { en: "Right to Information (RTI)", hi: "सूचना का अधिकार (RTI)" },
    category: "legal",
    points: [
      { en: "Any citizen can file an RTI to any government body. Fee is just Rs 10.", hi: "कोई भी नागरिक किसी भी सरकारी विभाग में RTI दाखिल कर सकता है। शुल्क मात्र 10 रुपये है।" },
      { en: "Government must reply within 30 days. Life/liberty matters: 48 hours.", hi: "सरकार को 30 दिन में जवाब देना होगा। जीवन/स्वतंत्रता मामले: 48 घंटे।" },
      { en: "File online at rtionline.gov.in for central government departments.", hi: "केंद्र सरकार विभागों के लिए rtionline.gov.in पर ऑनलाइन दाखिल करें।" },
      { en: "If no reply or unsatisfactory reply, appeal to the First Appellate Authority within 30 days.", hi: "जवाब न मिले या असंतोषजनक हो तो 30 दिन में प्रथम अपीलीय प्राधिकारी को अपील करें।" },
      { en: "BPL applicants are exempt from RTI fee. Penalty of Rs 250/day on officer for delay.", hi: "BPL आवेदक RTI शुल्क से मुक्त हैं। देरी पर अधिकारी पर 250 रुपये/दिन जुर्माना।" },
    ],
    applicableAct: "Right to Information Act, 2005",
    shareText: {
      en: "RTI — Your Right to Know:\n\n1. Any citizen can file — fee Rs 10\n2. Reply in 30 days (48 hrs for life matters)\n3. File online at rtionline.gov.in\n4. Appeal if no reply\n5. BPL = free, officer penalty Rs 250/day\n\n— NyayCheck",
      hi: "RTI — जानने का अधिकार:\n\n1. कोई भी नागरिक दाखिल कर सकता है — 10 रुपये\n2. 30 दिन में जवाब (जीवन: 48 घंटे)\n3. rtionline.gov.in पर ऑनलाइन\n4. जवाब न मिले तो अपील\n5. BPL = मुफ्त, अधिकारी पर 250/दिन जुर्माना\n\n— NyayCheck",
    },
    icon: "FileSearch",
  },

  // 14. Maintenance Rights
  {
    id: "maintenance-rights",
    title: { en: "Maintenance Rights for Women & Parents", hi: "महिलाओं और माता-पिता के भरणपोषण अधिकार" },
    category: "family",
    points: [
      { en: "Wife is entitled to maintenance from husband even during separation — under CrPC 125 / BNSS Sec 144.", hi: "पत्नी अलगाव के दौरान भी पति से भरणपोषण की हकदार है — CrPC 125 / BNSS धारा 144 के तहत।" },
      { en: "Children (legitimate or illegitimate) have the right to maintenance from their father until age 18.", hi: "बच्चों (वैध या अवैध) को 18 वर्ष तक पिता से भरणपोषण का अधिकार है।" },
      { en: "Senior citizens can claim maintenance from children under Maintenance of Parents Act — Tribunal must decide in 90 days.", hi: "वरिष्ठ नागरिक माता-पिता भरणपोषण अधिनियम के तहत बच्चों से भरणपोषण का दावा कर सकते हैं — ट्रिब्यूनल को 90 दिन में फैसला करना होगा।" },
      { en: "Maintenance amount is based on the respondent's income and the applicant's needs.", hi: "भरणपोषण राशि प्रतिवादी की आय और आवेदक की ज़रूरतों पर आधारित है।" },
      { en: "Application can be filed in the Magistrate's court — no lawyer is mandatory.", hi: "आवेदन मजिस्ट्रेट कोर्ट में दाखिल किया जा सकता है — वकील अनिवार्य नहीं।" },
    ],
    applicableAct: "CrPC Sec 125 / BNSS Sec 144 / Maintenance and Welfare of Parents and Senior Citizens Act, 2007",
    shareText: {
      en: "Maintenance Rights:\n\n1. Wife entitled to maintenance even during separation\n2. Children: maintenance from father till 18\n3. Senior parents: claim from children (90-day decision)\n4. Based on income & needs\n5. File in Magistrate court — no lawyer needed\n\n— NyayCheck",
      hi: "भरणपोषण अधिकार:\n\n1. पत्नी: अलगाव में भी भरणपोषण\n2. बच्चे: 18 तक पिता से\n3. बुजुर्ग: बच्चों से (90 दिन में फैसला)\n4. आय और ज़रूरत के अनुसार\n5. मजिस्ट्रेट कोर्ट में — वकील ज़रूरी नहीं\n\n— NyayCheck",
    },
    icon: "Users",
  },

  // 15. Cyber Crime Police Duty
  {
    id: "cyber-crime-police",
    title: { en: "Cyber Crime: What Police Must Do", hi: "साइबर अपराध: पुलिस का कर्तव्य" },
    category: "cyber-fraud",
    points: [
      { en: "Police MUST register your cyber crime FIR — they cannot refuse. If refused, approach the SP/DCP.", hi: "पुलिस को साइबर अपराध FIR दर्ज करनी होगी — वे मना नहीं कर सकते। मना करें तो SP/DCP से मिलें।" },
      { en: "You can also file an FIR online at cybercrime.gov.in — it has legal validity.", hi: "आप cybercrime.gov.in पर भी ऑनलाइन FIR दर्ज कर सकते हैं — इसकी कानूनी मान्यता है।" },
      { en: "Zero FIR: You can file at ANY police station, regardless of jurisdiction. They must transfer it later.", hi: "ज़ीरो FIR: आप किसी भी थाने में दर्ज कर सकते हैं, चाहे क्षेत्राधिकार कोई भी हो।" },
      { en: "Police must investigate digital evidence — call records, IP logs, bank trails. Ask for investigation updates.", hi: "पुलिस को डिजिटल साक्ष्य — कॉल रिकॉर्ड, IP लॉग, बैंक ट्रेल — की जांच करनी होगी। जांच अपडेट मांगें।" },
      { en: "If police don't act, file a complaint with the Judicial Magistrate under CrPC 156(3) / BNSS 175(3).", hi: "पुलिस कार्रवाई न करे तो CrPC 156(3) / BNSS 175(3) के तहत न्यायिक मजिस्ट्रेट को शिकायत करें।" },
    ],
    applicableAct: "IT Act, 2000 / CrPC / Bharatiya Nagarik Suraksha Sanhita, 2023",
    shareText: {
      en: "Cyber Crime — Police Must:\n\n1. MUST register your FIR\n2. File online at cybercrime.gov.in\n3. Zero FIR at ANY police station\n4. Investigate digital evidence\n5. If no action: complain to Magistrate\n\n— NyayCheck",
      hi: "साइबर अपराध — पुलिस का कर्तव्य:\n\n1. FIR दर्ज करना ज़रूरी\n2. cybercrime.gov.in पर ऑनलाइन FIR\n3. ज़ीरो FIR किसी भी थाने में\n4. डिजिटल सबूतों की जांच ज़रूरी\n5. कार्रवाई न हो तो मजिस्ट्रेट को शिकायत\n\n— NyayCheck",
    },
    icon: "Monitor",
  },

  // 16. Cheque Bounce Rights
  {
    id: "cheque-bounce-rights",
    title: { en: "Your Rights When Cheque Bounces", hi: "चेक बाउंस होने पर आपके अधिकार" },
    category: "cheque-bounce",
    points: [
      { en: "Drawer must pay within 15 days of receiving your legal notice.", hi: "ड्रॉअर को आपका कानूनी नोटिस प्राप्त होने के 15 दिनों के भीतर भुगतान करना होगा।" },
      { en: "You can file a criminal case under Section 138 of the Negotiable Instruments Act.", hi: "आप परक्राम्य लिखत अधिनियम की धारा 138 के तहत आपराधिक मामला दर्ज कर सकते हैं।" },
      { en: "Punishment: up to 2 years imprisonment or fine up to twice the cheque amount, or both.", hi: "सज़ा: 2 साल तक की कैद या चेक राशि का दोगुना तक जुर्माना, या दोनों।" },
      { en: "Legal notice must be sent within 30 days of cheque bounce — don't miss this deadline.", hi: "चेक बाउंस के 30 दिनों के भीतर कानूनी नोटिस भेजना ज़रूरी है — यह समय सीमा न चूकें।" },
      { en: "You don't need a lawyer to file the complaint — you can do it yourself.", hi: "शिकायत दर्ज करने के लिए वकील की ज़रूरत नहीं — आप खुद कर सकते हैं।" },
    ],
    applicableAct: "Negotiable Instruments Act, 1881 S.138",
    shareText: {
      en: "Cheque Bounced? Know Your Rights:\n\n1. Drawer must pay in 15 days of notice\n2. File criminal case under S.138\n3. Punishment: 2 years or 2x cheque amount\n4. Send notice within 30 days of bounce\n5. No lawyer needed to file\n\nKnow your rights.\n— NyayCheck",
      hi: "चेक बाउंस? अपने अधिकार जानें:\n\n1. नोटिस के 15 दिन में भुगतान ज़रूरी\n2. धारा 138 में आपराधिक केस\n3. सज़ा: 2 साल या चेक राशि का दोगुना\n4. 30 दिन में नोटिस भेजें\n5. वकील की ज़रूरत नहीं\n\n— NyayCheck",
    },
    icon: "Banknote",
  },

  // 17. Police FIR Rights
  {
    id: "police-fir-rights",
    title: { en: "What Police MUST Do When You File Complaint", hi: "शिकायत दर्ज करने पर पुलिस को क्या करना चाहिए" },
    category: "police-fir",
    points: [
      { en: "Police MUST register FIR for cognizable offences — refusal is a criminal offence.", hi: "पुलिस को संज्ञेय अपराधों के लिए FIR दर्ज करनी ही होगी — इनकार करना अपराध है।" },
      { en: "Refusal to file FIR is punishable under Section 166A IPC — the officer can face imprisonment.", hi: "FIR दर्ज करने से इनकार IPC की धारा 166A के तहत दंडनीय है — अधिकारी को कैद हो सकती है।" },
      { en: "You must get a free copy of the FIR — this is your legal right under CrPC Section 154.", hi: "आपको FIR की मुफ्त प्रति मिलनी चाहिए — यह CrPC धारा 154 के तहत आपका कानूनी अधिकार है।" },
      { en: "Zero FIR — you can file at ANY police station regardless of jurisdiction.", hi: "ज़ीरो FIR — आप किसी भी पुलिस स्टेशन में दर्ज कर सकते हैं, क्षेत्राधिकार की परवाह नहीं।" },
      { en: "If station refuses, send written complaint to SP/DCP — they are duty-bound to act.", hi: "थाना मना करे तो SP/DCP को लिखित शिकायत भेजें — वे कार्रवाई करने के लिए बाध्य हैं।" },
    ],
    applicableAct: "CrPC Section 154 / BNSS Section 173",
    shareText: {
      en: "Police MUST Do This:\n\n1. MUST register FIR for cognizable offences\n2. Refusal = punishable under S.166A IPC\n3. Free FIR copy is your right\n4. Zero FIR at ANY station\n5. Refused? Write to SP/DCP\n\nKnow your rights.\n— NyayCheck",
      hi: "पुलिस का कर्तव्य:\n\n1. संज्ञेय अपराध में FIR ज़रूरी\n2. इनकार = धारा 166A में सज़ा\n3. FIR की मुफ्त प्रति आपका हक\n4. ज़ीरो FIR किसी भी थाने में\n5. मना करें? SP/DCP को लिखें\n\n— NyayCheck",
    },
    icon: "Siren",
  },

  // 18. Dowry Rights
  {
    id: "dowry-rights",
    title: { en: "Your Rights Against Dowry", hi: "दहेज के खिलाफ आपके अधिकार" },
    category: "family",
    points: [
      { en: "Demanding dowry is illegal — it is a criminal offence punishable with imprisonment.", hi: "दहेज मांगना अवैध है — यह कैद की सज़ा वाला आपराधिक अपराध है।" },
      { en: "Both giving and taking dowry is punishable with up to 5 years imprisonment.", hi: "दहेज देना और लेना दोनों 5 साल तक की कैद से दंडनीय है।" },
      { en: "Harassment for dowry is a criminal offence under Section 498A IPC.", hi: "दहेज के लिए उत्पीड़न IPC की धारा 498A के तहत आपराधिक अपराध है।" },
      { en: "File complaint at the nearest Women's Cell or police station.", hi: "निकटतम महिला सेल या पुलिस स्टेशन में शिकायत दर्ज करें।" },
      { en: "Call 181 Women Helpline for immediate assistance and guidance.", hi: "तत्काल सहायता और मार्गदर्शन के लिए 181 महिला हेल्पलाइन पर कॉल करें।" },
    ],
    applicableAct: "Dowry Prohibition Act, 1961 + S.498A IPC",
    shareText: {
      en: "Rights Against Dowry:\n\n1. Demanding dowry = illegal\n2. Giving & taking = 5 years jail\n3. Harassment = S.498A IPC\n4. File complaint at Women's Cell\n5. Call 181 Women Helpline\n\nShare this. Save a life.\n— NyayCheck",
      hi: "दहेज विरोधी अधिकार:\n\n1. दहेज मांगना = अवैध\n2. देना-लेना = 5 साल कैद\n3. उत्पीड़न = धारा 498A\n4. महिला सेल में शिकायत करें\n5. 181 हेल्पलाइन पर कॉल करें\n\nशेयर करें। किसी की जान बचाएं।\n— NyayCheck",
    },
    icon: "Heart",
  },

  // 19. Hospital Patient Rights
  {
    id: "hospital-patient-rights",
    title: { en: "Your Rights as a Hospital Patient", hi: "अस्पताल में मरीज़ के रूप में आपके अधिकार" },
    category: "consumer",
    points: [
      { en: "Healthcare is a 'service' under Consumer Protection Act — you can sue for negligence.", hi: "उपभोक्ता संरक्षण अधिनियम के तहत स्वास्थ्य सेवा एक 'सेवा' है — आप लापरवाही के लिए मुकदमा कर सकते हैं।" },
      { en: "You have the right to access your medical records — the hospital must provide copies.", hi: "आपको अपने मेडिकल रिकॉर्ड देखने का अधिकार है — अस्पताल को प्रतियां देनी होंगी।" },
      { en: "You have the right to a second opinion from another doctor before any major procedure.", hi: "किसी भी बड़ी प्रक्रिया से पहले दूसरे डॉक्टर से राय लेने का अधिकार है।" },
      { en: "File complaint at Consumer Forum (edaakhil.nic.in) for medical negligence.", hi: "चिकित्सा लापरवाही के लिए उपभोक्ता फोरम (edaakhil.nic.in) में शिकायत दर्ज करें।" },
      { en: "Emergency treatment cannot be denied — no hospital can refuse a patient in emergency.", hi: "आपातकालीन उपचार से इनकार नहीं किया जा सकता — कोई अस्पताल इमरजेंसी में मरीज़ को मना नहीं कर सकता।" },
    ],
    applicableAct: "Consumer Protection Act, 2019",
    shareText: {
      en: "Hospital Patient Rights:\n\n1. Healthcare = 'service' — you can sue\n2. Right to your medical records\n3. Right to second opinion\n4. File at Consumer Forum for negligence\n5. Emergency treatment cannot be denied\n\nKnow your rights.\n— NyayCheck",
      hi: "अस्पताल में मरीज़ के अधिकार:\n\n1. स्वास्थ्य सेवा = 'सेवा' — मुकदमा कर सकते हैं\n2. मेडिकल रिकॉर्ड का अधिकार\n3. दूसरी राय का अधिकार\n4. उपभोक्ता फोरम में शिकायत\n5. इमरजेंसी इलाज से मना नहीं कर सकते\n\n— NyayCheck",
    },
    icon: "HeartPulse",
  },

  // 20. Neighbor Nuisance Rights
  {
    id: "neighbor-nuisance-rights",
    title: { en: "Your Rights Against Neighbor Nuisance", hi: "पड़ोसी उपद्रव के खिलाफ आपके अधिकार" },
    category: "property",
    points: [
      { en: "Noise limit in residential areas: 55dB during day, 45dB at night — violation is punishable.", hi: "आवासीय क्षेत्रों में शोर सीमा: दिन में 55dB, रात में 45dB — उल्लंघन दंडनीय है।" },
      { en: "You can file a police complaint for nuisance under IPC Section 268 / CrPC Section 133.", hi: "IPC धारा 268 / CrPC धारा 133 के तहत उपद्रव के लिए पुलिस शिकायत दर्ज कर सकते हैं।" },
      { en: "Housing society rules are binding on all members — violations can lead to penalties.", hi: "हाउसिंग सोसाइटी के नियम सभी सदस्यों पर बाध्यकारी हैं — उल्लंघन से जुर्माना हो सकता है।" },
      { en: "For encroachment on your property, file a civil suit for injunction and removal.", hi: "आपकी संपत्ति पर अतिक्रमण के लिए निषेधाज्ञा और हटाने के लिए सिविल मुकदमा दायर करें।" },
      { en: "Pollution Control Board handles noise, air, and water pollution complaints.", hi: "प्रदूषण नियंत्रण बोर्ड शोर, वायु और जल प्रदूषण की शिकायतों को संभालता है।" },
    ],
    applicableAct: "CrPC Section 133 / IPC Section 268 / Noise Pollution Rules",
    shareText: {
      en: "Neighbor Nuisance? Your Rights:\n\n1. Noise limit: 55dB day, 45dB night\n2. Police complaint for nuisance\n3. Society rules are binding\n4. Encroachment = civil suit\n5. Pollution board for noise/air/water\n\nKnow your rights.\n— NyayCheck",
      hi: "पड़ोसी उपद्रव? आपके अधिकार:\n\n1. शोर सीमा: दिन 55dB, रात 45dB\n2. उपद्रव पर पुलिस शिकायत\n3. सोसाइटी नियम बाध्यकारी\n4. अतिक्रमण = सिविल मुकदमा\n5. प्रदूषण बोर्ड में शिकायत\n\n— NyayCheck",
    },
    icon: "Home",
  },

  // 21. Speed Up Court Case
  {
    id: "speed-up-court-case",
    title: { en: "5 Ways to Speed Up a Court Case", hi: "कोर्ट केस तेज़ करने के 5 तरीके" },
    category: "legal",
    points: [
      { en: "File an application for early hearing citing urgency — courts give priority to genuine urgency.", hi: "तात्कालिकता का हवाला देते हुए शीघ्र सुनवाई के लिए आवेदन दें — कोर्ट वास्तविक तात्कालिकता को प्राथमिकता देता है।" },
      { en: "Object to unnecessary adjournments on record — courts can impose costs.", hi: "अनावश्यक स्थगन पर रिकॉर्ड पर आपत्ति करें — कोर्ट जुर्माना लगा सकता है।" },
      { en: "File RTI asking for case status and specific reasons for delay.", hi: "केस की स्थिति और देरी के विशिष्ट कारण पूछते हुए RTI दर्ज करें।" },
      { en: "Try Lok Adalat — it's free, fast, and decisions are final and binding.", hi: "लोक अदालत आज़माएं — यह मुफ्त, तेज़ है और फैसले अंतिम व बाध्यकारी हैं।" },
      { en: "Write to the court registry highlighting inordinate delay in your case.", hi: "अपने केस में अत्यधिक देरी को उजागर करते हुए कोर्ट रजिस्ट्री को लिखें।" },
    ],
    applicableAct: "Article 21 — Right to Speedy Trial",
    shareText: {
      en: "Speed Up Your Court Case:\n\n1. File early hearing application\n2. Object to adjournments on record\n3. File RTI on case status\n4. Try Lok Adalat (free, binding)\n5. Write to court registry about delay\n\nSpeedy trial is your right (Art. 21).\n— NyayCheck",
      hi: "कोर्ट केस तेज़ करें:\n\n1. शीघ्र सुनवाई आवेदन दें\n2. स्थगन पर आपत्ति करें\n3. RTI से स्थिति पूछें\n4. लोक अदालत (मुफ्त, बाध्यकारी)\n5. कोर्ट रजिस्ट्री को लिखें\n\nत्वरित सुनवाई आपका हक (अनु. 21)।\n— NyayCheck",
    },
    icon: "Scale",
  },

  // 22. BNS 2023 Rights
  {
    id: "bns-new-laws-rights",
    title: { en: "Your Rights Under New Criminal Laws (BNS 2023)", hi: "नई आपराधिक विधि (BNS 2023) के तहत आपके अधिकार" },
    category: "police-fir",
    points: [
      { en: "FIR must be registered within 24 hours (BNSS S.173).", hi: "FIR 24 घंटे के भीतर दर्ज होनी चाहिए (BNSS धारा 173)।" },
      { en: "Audio-visual recording of search and seizure is now mandatory.", hi: "तलाशी और ज़ब्ती की ऑडियो-वीडियो रिकॉर्डिंग अब अनिवार्य है।" },
      { en: "Zero FIR at any police station — jurisdiction doesn't matter.", hi: "किसी भी थाने में ज़ीरो FIR — क्षेत्राधिकार मायने नहीं रखता।" },
      { en: "Arrested person must be produced before Magistrate within 24 hours.", hi: "गिरफ्तार व्यक्ति को 24 घंटे के भीतर मजिस्ट्रेट के सामने पेश करना अनिवार्य है।" },
      { en: "Electronic evidence (screenshots, videos) is now explicitly admissible.", hi: "इलेक्ट्रॉनिक साक्ष्य (स्क्रीनशॉट, वीडियो) अब स्पष्ट रूप से मान्य हैं।" },
      { en: "Free copy of FIR is your right — police cannot charge for it.", hi: "FIR की मुफ्त प्रति आपका अधिकार है — पुलिस इसके लिए पैसे नहीं ले सकती।" },
    ],
    applicableAct: "Bharatiya Nyaya Sanhita (BNS) 2023 / BNSS 2023",
    shareText: {
      en: "Your Rights Under BNS 2023: FIR within 24hrs, Zero FIR anywhere, Audio-video of search mandatory, E-evidence admissible. Know your rights! — NyayCheck",
      hi: "BNS 2023 के तहत आपके अधिकार: 24 घंटे में FIR, कहीं भी ज़ीरो FIR, तलाशी की वीडियो रिकॉर्डिंग अनिवार्य, इलेक्ट्रॉनिक सबूत मान्य। अपने अधिकार जानें! — NyayCheck",
    },
    icon: "Scale",
  },

  // 23. Traffic Stop Rights (2025 Rules)
  {
    id: "traffic-stop-rights",
    title: { en: "What to Do During a Traffic Stop (2025 Rules)", hi: "ट्रैफिक में रोके जाने पर क्या करें (2025 नियम)" },
    category: "traffic",
    points: [
      { en: "DigiLocker documents are legally valid — no need for physical copies.", hi: "DigiLocker के दस्तावेज़ कानूनी रूप से मान्य हैं — भौतिक प्रतियों की ज़रूरत नहीं।" },
      { en: "Police must give you a receipt if they seize your vehicle or license.", hi: "पुलिस आपका वाहन या लाइसेंस ज़ब्त करे तो रसीद देना अनिवार्य है।" },
      { en: "You have the right to know which section you are being fined under.", hi: "आपको यह जानने का अधिकार है कि किस धारा के तहत जुर्माना लगाया जा रहा है।" },
      { en: "Traffic police cannot demand cash — insist on official e-challan.", hi: "ट्रैफिक पुलिस नकद नहीं मांग सकती — आधिकारिक ई-चालान पर ज़ोर दें।" },
      { en: "You can record the interaction on video — it's your right.", hi: "आप बातचीत का वीडियो रिकॉर्ड कर सकते हैं — यह आपका अधिकार है।" },
      { en: "If harassed, note badge number and report to Traffic DCP or CVC 1031.", hi: "परेशान किए जाएं तो बैज नंबर नोट करें और ट्रैफिक DCP या CVC 1031 पर शिकायत करें।" },
    ],
    applicableAct: "Motor Vehicles (Amendment) Act, 2019",
    shareText: {
      en: "Traffic Stop Rights: DigiLocker valid, demand e-challan (not cash), record on video, note badge number. No bribe! — NyayCheck",
      hi: "ट्रैफिक स्टॉप अधिकार: DigiLocker मान्य, ई-चालान मांगें (नकद नहीं), वीडियो रिकॉर्ड करें, बैज नंबर नोट करें। रिश्वत नहीं! — NyayCheck",
    },
    icon: "Car",
  },

  // 24. Senior Citizens Maintenance & Respect
  {
    id: "senior-maintenance-rights",
    title: { en: "Senior Citizens: Your Right to Maintenance & Respect", hi: "वरिष्ठ नागरिक: भरण-पोषण और सम्मान का आपका अधिकार" },
    category: "senior-citizen",
    points: [
      { en: "Children MUST maintain parents unable to support themselves.", hi: "बच्चों को उन माता-पिता का भरण-पोषण करना अनिवार्य है जो खुद का ख्याल नहीं रख सकते।" },
      { en: "Tribunal can order up to ₹10,000/month maintenance.", hi: "न्यायाधिकरण ₹10,000/माह तक भरण-पोषण का आदेश दे सकता है।" },
      { en: "If you transferred property and are neglected, transfer can be revoked.", hi: "अगर आपने संपत्ति हस्तांतरित की और आपकी उपेक्षा हो रही है, तो हस्तांतरण रद्द हो सकता है।" },
      { en: "Elder abuse is a criminal offence — file FIR.", hi: "बुज़ुर्गों के साथ दुर्व्यवहार अपराध है — FIR दर्ज करें।" },
      { en: "Call Elder Line 14567 for help (8am-8pm).", hi: "मदद के लिए एल्डर लाइन 14567 पर कॉल करें (सुबह 8 से रात 8 बजे तक)।" },
    ],
    applicableAct: "Maintenance and Welfare of Parents and Senior Citizens Act, 2007",
    shareText: {
      en: "Senior Citizens Rights: Children must maintain parents, up to ₹10K/month via Tribunal, property transfer revocable if neglected. Elder Line: 14567 — NyayCheck",
      hi: "वरिष्ठ नागरिक अधिकार: बच्चों को माता-पिता का भरण-पोषण करना अनिवार्य, न्यायाधिकरण से ₹10K/माह, उपेक्षा पर संपत्ति हस्तांतरण रद्द। एल्डर लाइन: 14567 — NyayCheck",
    },
    icon: "UserRound",
  },

  // 25. Ayushman Bharat 70+
  {
    id: "ayushman-70-plus",
    title: { en: "Ayushman Bharat 70+: Free Health Coverage for Seniors", hi: "आयुष्मान भारत 70+: वरिष्ठ नागरिकों के लिए मुफ्त स्वास्थ्य कवरेज" },
    category: "senior-citizen",
    points: [
      { en: "ALL citizens aged 70+ get ₹5 lakh/year free health coverage.", hi: "70+ वर्ष के सभी नागरिकों को ₹5 लाख/वर्ष का मुफ्त स्वास्थ्य कवरेज मिलता है।" },
      { en: "No income criteria — available to everyone above 70.", hi: "कोई आय शर्त नहीं — 70 से ऊपर सभी के लिए उपलब्ध।" },
      { en: "Covers hospitalization at 29,000+ empaneled hospitals.", hi: "29,000+ सूचीबद्ध अस्पतालों में भर्ती का खर्च कवर होता है।" },
      { en: "Includes pre-existing conditions from day one.", hi: "पहले दिन से पहले से मौजूद बीमारियां भी कवर हैं।" },
      { en: "Register at mera.pmjay.gov.in with Aadhaar card.", hi: "mera.pmjay.gov.in पर आधार कार्ड से पंजीकरण करें।" },
    ],
    applicableAct: "Ayushman Bharat PM-JAY 70+ Extension (2025)",
    shareText: {
      en: "Ayushman 70+: Free ₹5 lakh health cover for ALL seniors above 70. No income limit. Register at mera.pmjay.gov.in — NyayCheck",
      hi: "आयुष्मान 70+: 70 से ऊपर सभी बुज़ुर्गों को ₹5 लाख का मुफ्त स्वास्थ्य कवर। कोई आय सीमा नहीं। mera.pmjay.gov.in पर पंजीकरण करें — NyayCheck",
    },
    icon: "HeartPulse",
  },
];
