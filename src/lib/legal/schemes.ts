import type { GovernmentScheme } from "@/types/schemes";

export const governmentSchemes: GovernmentScheme[] = [
  // ── LEGAL AID ──
  {
    id: "nalsa_free_legal_aid",
    name: {
      en: "NALSA Free Legal Aid",
      hi: "NALSA मुफ्त कानूनी सहायता",
    },
    description: {
      en: "Free legal representation, advice, and court fee waiver for eligible persons through the National Legal Services Authority.",
      hi: "राष्ट्रीय कानूनी सेवा प्राधिकरण के माध्यम से पात्र व्यक्तियों के लिए मुफ्त कानूनी प्रतिनिधित्व, सलाह, और अदालत शुल्क माफी।",
    },
    eligibility: {
      en: "Women, children, SC/ST members, persons with disabilities, industrial workmen, victims of trafficking, persons in custody, or anyone with annual income below ₹3 lakh.",
      hi: "महिलाएं, बच्चे, SC/ST सदस्य, विकलांग व्यक्ति, औद्योगिक कामगार, तस्करी पीड़ित, हिरासत में व्यक्ति, या ₹3 लाख से कम वार्षिक आय वाले।",
    },
    howToApply: {
      en: "Visit your nearest District Legal Services Authority (DLSA) at the district court, or apply online at nalsa.gov.in. Call NALSA helpline: 15100.",
      hi: "अपने नजदीकी जिला कानूनी सेवा प्राधिकरण (DLSA) पर जाएं या nalsa.gov.in पर ऑनलाइन आवेदन करें। NALSA हेल्पलाइन: 15100।",
    },
    officialLink: "https://nalsa.gov.in",
    category: "legal_aid",
    tags: {
      gender: ["male", "female", "other"],
      incomeBracket: ["bpl", "below_3l"],
      casteCategory: ["general", "obc", "sc", "st", "minority"],
      legalCategories: ["rent", "property", "consumer", "employment", "family", "ecommerce", "cyber-fraud"],
      riskLevels: ["high", "critical"],
    },
    isPopular: true,
  },
  {
    id: "lok_adalat",
    name: { en: "Lok Adalat (People's Court)", hi: "लोक अदालत (जन अदालत)" },
    description: {
      en: "Free dispute resolution forum. Decisions are binding and non-appealable. No court fees. Resolves disputes in a single sitting.",
      hi: "मुफ्त विवाद समाधान मंच। निर्णय बाध्यकारी और अपील-योग्य नहीं। कोई अदालत शुल्क नहीं। एक बैठक में विवाद सुलझाता है।",
    },
    eligibility: {
      en: "Any person with a pending case in court or a pre-litigation dispute. Covers motor accident claims, matrimonial disputes, labor disputes, bank recovery cases.",
      hi: "अदालत में लंबित मामला या मुकदमा-पूर्व विवाद वाला कोई भी व्यक्ति। मोटर दुर्घटना, वैवाहिक विवाद, श्रम विवाद, बैंक वसूली मामले शामिल।",
    },
    howToApply: {
      en: "Contact DLSA or your court's legal aid cell. Lok Adalats are organized periodically — check nalsa.gov.in for schedules.",
      hi: "DLSA या अपनी अदालत के कानूनी सहायता प्रकोष्ठ से संपर्क करें। लोक अदालतें समय-समय पर आयोजित होती हैं।",
    },
    officialLink: "https://nalsa.gov.in/lok-adalat",
    category: "legal_aid",
    tags: {
      legalCategories: ["rent", "property", "consumer", "employment", "family"],
    },
    isPopular: true,
  },

  // ── WOMEN'S WELFARE ──
  {
    id: "one_stop_centre",
    name: { en: "One Stop Centre (Sakhi)", hi: "वन स्टॉप सेंटर (सखी)" },
    description: {
      en: "Integrated support for women affected by violence — medical aid, police assistance, legal counsel, psycho-social counseling, and temporary shelter under one roof.",
      hi: "हिंसा से प्रभावित महिलाओं के लिए एकीकृत सहायता — चिकित्सा, पुलिस सहायता, कानूनी सलाह, मनो-सामाजिक परामर्श, और अस्थायी आश्रय।",
    },
    eligibility: {
      en: "Any woman affected by violence, irrespective of age, caste, religion, or income. Includes domestic violence, sexual assault, trafficking, acid attack survivors.",
      hi: "हिंसा से प्रभावित कोई भी महिला, उम्र, जाति, धर्म या आय की परवाह किए बिना।",
    },
    howToApply: {
      en: "Call Women Helpline 181 or visit the nearest One Stop Centre. Available in 700+ districts.",
      hi: "महिला हेल्पलाइन 181 पर कॉल करें या निकटतम वन स्टॉप सेंटर पर जाएं। 700+ जिलों में उपलब्ध।",
    },
    officialLink: "https://wcd.nic.in/schemes/one-stop-centre-scheme-1",
    category: "women_welfare",
    tags: {
      gender: ["female"],
      legalCategories: ["family"],
      checklistFlags: ["domestic_violence"],
      riskLevels: ["high", "critical"],
    },
    isPopular: true,
  },
  {
    id: "women_helpline_181",
    name: { en: "Women Helpline 181", hi: "महिला हेल्पलाइन 181" },
    description: {
      en: "24/7 toll-free helpline for women in distress. Provides immediate assistance, referral to police, ambulance, and legal aid.",
      hi: "संकट में महिलाओं के लिए 24/7 टोल-फ्री हेल्पलाइन। तत्काल सहायता, पुलिस, एम्बुलेंस और कानूनी सहायता के लिए रेफरल।",
    },
    eligibility: { en: "Any woman in distress.", hi: "संकट में कोई भी महिला।" },
    howToApply: { en: "Dial 181 from any phone.", hi: "किसी भी फोन से 181 डायल करें।" },
    officialLink: "https://wcd.nic.in/schemes/universalisation-women-helpline",
    category: "women_welfare",
    tags: {
      gender: ["female"],
      legalCategories: ["family"],
      checklistFlags: ["domestic_violence"],
    },
  },
  {
    id: "mahila_samman",
    name: { en: "Mahila Samman Savings Certificate", hi: "महिला सम्मान बचत प्रमाणपत्र" },
    description: {
      en: "Special savings scheme for women with 7.5% interest rate. Deposit up to ₹2 lakh for 2 years. Available at post offices and banks.",
      hi: "महिलाओं के लिए 7.5% ब्याज दर वाली विशेष बचत योजना। 2 वर्ष के लिए ₹2 लाख तक जमा। डाकघरों और बैंकों में उपलब्ध।",
    },
    eligibility: { en: "Any woman or girl of any age.", hi: "किसी भी उम्र की कोई भी महिला या लड़की।" },
    howToApply: {
      en: "Visit any post office or authorized bank with Aadhaar and PAN card.",
      hi: "आधार और पैन कार्ड के साथ किसी भी डाकघर या अधिकृत बैंक में जाएं।",
    },
    officialLink: "https://www.indiapost.gov.in",
    category: "women_welfare",
    tags: { gender: ["female"] },
  },

  // ── SC/ST WELFARE ──
  {
    id: "scst_atrocities_relief",
    name: { en: "SC/ST Atrocities Act Relief", hi: "SC/ST अत्याचार अधिनियम राहत" },
    description: {
      en: "Monetary relief and rehabilitation for victims of caste-based atrocities. Covers physical violence, social boycott, land grabbing, and more.",
      hi: "जाति-आधारित अत्याचारों के पीड़ितों के लिए मौद्रिक राहत और पुनर्वास।",
    },
    eligibility: { en: "Any SC/ST person who is a victim of an atrocity.", hi: "अत्याचार का शिकार कोई भी SC/ST व्यक्ति।" },
    howToApply: {
      en: "File an FIR at the nearest police station. The District Magistrate provides relief within 7 days of FIR.",
      hi: "निकटतम पुलिस स्टेशन में FIR दर्ज करें। जिला मजिस्ट्रेट FIR के 7 दिनों के भीतर राहत प्रदान करता है।",
    },
    officialLink: "https://socialjustice.gov.in",
    category: "sc_st",
    tags: { casteCategory: ["sc", "st"], riskLevels: ["high", "critical"] },
  },
  {
    id: "post_matric_scholarship",
    name: { en: "Post-Matric Scholarship for SC/ST", hi: "SC/ST के लिए पोस्ट-मैट्रिक छात्रवृत्ति" },
    description: {
      en: "Full tuition fee coverage and monthly maintenance allowance for SC/ST students studying after Class 10.",
      hi: "कक्षा 10 के बाद पढ़ाई कर रहे SC/ST छात्रों के लिए पूर्ण ट्यूशन फीस और मासिक रखरखाव भत्ता।",
    },
    eligibility: {
      en: "SC/ST students studying post-matriculation. Family income below ₹2.5 lakh/year.",
      hi: "पोस्ट-मैट्रिक पढ़ाई कर रहे SC/ST छात्र। पारिवारिक आय ₹2.5 लाख/वर्ष से कम।",
    },
    howToApply: {
      en: "Apply online at National Scholarship Portal (scholarships.gov.in).",
      hi: "राष्ट्रीय छात्रवृत्ति पोर्टल (scholarships.gov.in) पर ऑनलाइन आवेदन करें।",
    },
    officialLink: "https://scholarships.gov.in",
    category: "education",
    tags: { casteCategory: ["sc", "st"], incomeBracket: ["bpl", "below_3l"] },
  },

  // ── HOUSING ──
  {
    id: "pm_awas_yojana",
    name: { en: "PM Awas Yojana (Housing for All)", hi: "PM आवास योजना (सबके लिए आवास)" },
    description: {
      en: "Subsidized housing for economically weaker sections and low-income groups. Interest subsidy up to ₹2.67 lakh on home loans.",
      hi: "आर्थिक रूप से कमजोर वर्गों और कम आय समूहों के लिए सब्सिडी वाला आवास। होम लोन पर ₹2.67 लाख तक ब्याज सब्सिडी।",
    },
    eligibility: {
      en: "EWS (income up to ₹3 lakh), LIG (₹3-6 lakh), MIG-I (₹6-12 lakh). Must not own a pucca house.",
      hi: "EWS (आय ₹3 लाख तक), LIG (₹3-6 लाख), MIG-I (₹6-12 लाख)। पक्का मकान नहीं होना चाहिए।",
    },
    howToApply: {
      en: "Apply at pmaymis.gov.in or through a Common Service Centre (CSC).",
      hi: "pmaymis.gov.in पर या कॉमन सर्विस सेंटर (CSC) के माध्यम से आवेदन करें।",
    },
    officialLink: "https://pmaymis.gov.in",
    category: "housing",
    tags: {
      incomeBracket: ["bpl", "below_3l", "below_5l"],
      legalCategories: ["property", "rent"],
    },
    isPopular: true,
  },

  // ── HEALTH ──
  {
    id: "ayushman_bharat",
    name: { en: "Ayushman Bharat (PM-JAY)", hi: "आयुष्मान भारत (PM-JAY)" },
    description: {
      en: "Free health insurance of ₹5 lakh per family per year for hospitalization at empaneled hospitals. Covers 1,929 medical procedures.",
      hi: "प्रति परिवार प्रति वर्ष ₹5 लाख का मुफ्त स्वास्थ्य बीमा। 1,929 चिकित्सा प्रक्रियाएं शामिल।",
    },
    eligibility: {
      en: "Families identified by SECC 2011 data (BPL). Check eligibility at mera.pmjay.gov.in.",
      hi: "SECC 2011 डेटा द्वारा पहचाने गए परिवार (BPL)। mera.pmjay.gov.in पर पात्रता जांचें।",
    },
    howToApply: {
      en: "Visit mera.pmjay.gov.in, enter Aadhaar or ration card number. If eligible, visit any empaneled hospital.",
      hi: "mera.pmjay.gov.in पर जाएं, आधार या राशन कार्ड नंबर दर्ज करें।",
    },
    officialLink: "https://pmjay.gov.in",
    category: "health",
    tags: { incomeBracket: ["bpl", "below_3l"] },
    isPopular: true,
  },

  // ── LABOR & EMPLOYMENT ──
  {
    id: "epfo_pension",
    name: { en: "EPFO Pension Scheme (EPS-95)", hi: "EPFO पेंशन योजना (EPS-95)" },
    description: {
      en: "Monthly pension after retirement for employees who contributed to EPF for 10+ years. Minimum pension ₹1,000/month.",
      hi: "10+ वर्ष EPF में योगदान करने वाले कर्मचारियों के लिए सेवानिवृत्ति के बाद मासिक पेंशन। न्यूनतम पेंशन ₹1,000/माह।",
    },
    eligibility: {
      en: "Any EPF member with 10+ years of service, age 58+.",
      hi: "10+ वर्ष सेवा और 58+ आयु वाला कोई भी EPF सदस्य।",
    },
    howToApply: {
      en: "Apply through employer or online at epfindia.gov.in with UAN.",
      hi: "नियोक्ता के माध्यम से या UAN के साथ epfindia.gov.in पर ऑनलाइन आवेदन करें।",
    },
    officialLink: "https://epfindia.gov.in",
    category: "labor",
    tags: {
      legalCategories: ["employment"],
      checklistFlags: ["pf_not_deducted"],
    },
  },
  {
    id: "eshram_card",
    name: { en: "e-Shram Card (Unorganised Workers)", hi: "e-श्रम कार्ड (असंगठित कामगार)" },
    description: {
      en: "Registration for unorganised workers. Provides accidental insurance of ₹2 lakh and access to government welfare schemes.",
      hi: "असंगठित कामगारों के लिए पंजीकरण। ₹2 लाख का दुर्घटना बीमा और सरकारी कल्याण योजनाओं तक पहुंच।",
    },
    eligibility: {
      en: "Any unorganised worker aged 16-59 (gig workers, street vendors, domestic workers, construction workers, etc.).",
      hi: "16-59 आयु का कोई भी असंगठित कामगार (गिग वर्कर, स्ट्रीट वेंडर, घरेलू कामगार, निर्माण श्रमिक आदि)।",
    },
    howToApply: {
      en: "Register at eshram.gov.in with Aadhaar and bank account details.",
      hi: "आधार और बैंक खाता विवरण के साथ eshram.gov.in पर पंजीकरण करें।",
    },
    officialLink: "https://eshram.gov.in",
    category: "labor",
    tags: {
      incomeBracket: ["bpl", "below_3l", "below_5l"],
      legalCategories: ["employment"],
      checklistFlags: ["no_appointment_letter", "pf_not_deducted"],
    },
    isPopular: true,
  },
  {
    id: "pm_svanidhi",
    name: { en: "PM SVANidhi (Street Vendors)", hi: "PM स्वनिधि (स्ट्रीट वेंडर)" },
    description: {
      en: "Micro-credit up to ₹50,000 for street vendors at subsidized interest rates. Digital payment incentives.",
      hi: "स्ट्रीट वेंडरों के लिए सब्सिडी वाली ब्याज दरों पर ₹50,000 तक माइक्रो-क्रेडिट।",
    },
    eligibility: {
      en: "Street vendors with vending certificate or letter of recommendation from ULB.",
      hi: "वेंडिंग प्रमाणपत्र या ULB से अनुशंसा पत्र वाले स्ट्रीट वेंडर।",
    },
    howToApply: {
      en: "Apply at pmsvanidhi.mohua.gov.in or through banks/MFIs.",
      hi: "pmsvanidhi.mohua.gov.in पर या बैंकों/MFI के माध्यम से आवेदन करें।",
    },
    officialLink: "https://pmsvanidhi.mohua.gov.in",
    category: "labor",
    tags: { incomeBracket: ["bpl", "below_3l"], legalCategories: ["employment"] },
  },
  {
    id: "stand_up_india",
    name: { en: "Stand Up India", hi: "स्टैंड अप इंडिया" },
    description: {
      en: "Bank loans between ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs to set up a new enterprise.",
      hi: "SC/ST और महिला उद्यमियों को नया उद्यम स्थापित करने के लिए ₹10 लाख से ₹1 करोड़ तक बैंक ऋण।",
    },
    eligibility: {
      en: "SC/ST or women entrepreneurs aged 18+. For new enterprises in manufacturing, services, or trading.",
      hi: "18+ आयु के SC/ST या महिला उद्यमी। विनिर्माण, सेवा या व्यापार में नए उद्यम के लिए।",
    },
    howToApply: {
      en: "Apply at standupmitra.in or visit any scheduled commercial bank.",
      hi: "standupmitra.in पर आवेदन करें या किसी भी अनुसूचित वाणिज्यिक बैंक में जाएं।",
    },
    officialLink: "https://standupmitra.in",
    category: "labor",
    tags: { casteCategory: ["sc", "st"], gender: ["female"] },
  },

  // ── CONSUMER ──
  {
    id: "consumer_helpline",
    name: { en: "National Consumer Helpline", hi: "राष्ट्रीय उपभोक्ता हेल्पलाइन" },
    description: {
      en: "Free helpline for consumer complaints, guidance, and mediation. Resolves issues with companies through direct intervention.",
      hi: "उपभोक्ता शिकायतों, मार्गदर्शन और मध्यस्थता के लिए मुफ्त हेल्पलाइन।",
    },
    eligibility: { en: "Any consumer with a grievance.", hi: "शिकायत वाला कोई भी उपभोक्ता।" },
    howToApply: {
      en: "Call 1800-11-4000 (toll-free) or register at consumerhelpline.gov.in.",
      hi: "1800-11-4000 (टोल-फ्री) पर कॉल करें या consumerhelpline.gov.in पर पंजीकरण करें।",
    },
    officialLink: "https://consumerhelpline.gov.in",
    category: "consumer",
    tags: {
      legalCategories: ["consumer", "ecommerce"],
      checklistFlags: ["consumer_complaint_eligible", "defective_product", "unfair_trade_practice", "ecommerce_refund"],
    },
    isPopular: true,
  },

  // ── SENIOR CITIZENS ──
  {
    id: "senior_citizen_tribunal",
    name: { en: "Senior Citizens Maintenance Tribunal", hi: "वरिष्ठ नागरिक भरण-पोषण न्यायाधिकरण" },
    description: {
      en: "If children refuse to maintain elderly parents, parents can claim maintenance up to ₹10,000/month through a fast-track tribunal.",
      hi: "यदि बच्चे बुजुर्ग माता-पिता का भरण-पोषण करने से मना करते हैं, तो माता-पिता फास्ट-ट्रैक ट्रिब्यूनल के माध्यम से ₹10,000/माह तक भरण-पोषण का दावा कर सकते हैं।",
    },
    eligibility: {
      en: "Senior citizens (60+) or parents unable to maintain themselves from their own income.",
      hi: "वरिष्ठ नागरिक (60+) या अपनी आय से भरण-पोषण करने में असमर्थ माता-पिता।",
    },
    howToApply: {
      en: "Apply to the Maintenance Tribunal through the District Magistrate's office.",
      hi: "जिला मजिस्ट्रेट कार्यालय के माध्यम से भरण-पोषण ट्रिब्यूनल में आवेदन करें।",
    },
    officialLink: "https://socialjustice.gov.in",
    category: "senior_citizen",
    tags: {
      legalCategories: ["family"],
      checklistFlags: ["maintenance_eligible"],
    },
  },

  // ── CYBER FRAUD ──
  {
    id: "cyber_helpline_1930",
    name: { en: "Cyber Crime Helpline 1930", hi: "साइबर क्राइम हेल्पलाइन 1930" },
    description: {
      en: "National helpline for reporting cyber fraud. Can freeze fraudster's bank account in real-time during the golden hour.",
      hi: "साइबर धोखाधड़ी की रिपोर्ट के लिए राष्ट्रीय हेल्पलाइन। गोल्डन ऑवर में धोखेबाज़ का बैंक खाता रीयल-टाइम में फ्रीज़ कर सकती है।",
    },
    eligibility: { en: "Any person who is a victim of cyber crime.", hi: "साइबर अपराध का शिकार कोई भी व्यक्ति।" },
    howToApply: {
      en: "Call 1930 immediately. Also file at cybercrime.gov.in.",
      hi: "तुरंत 1930 पर कॉल करें। cybercrime.gov.in पर भी शिकायत दर्ज करें।",
    },
    officialLink: "https://cybercrime.gov.in",
    category: "legal_aid",
    tags: {
      legalCategories: ["cyber-fraud"],
      checklistFlags: ["cyber_fraud_immediate", "upi_fraud", "phishing_scam"],
    },
    isPopular: true,
  },

  // ── EDUCATION ──
  {
    id: "pm_vidyalakshmi",
    name: { en: "PM Vidya Lakshmi (Education Loans)", hi: "PM विद्या लक्ष्मी (शिक्षा ऋण)" },
    description: {
      en: "Single platform to apply for education loans from multiple banks. Interest subsidy for economically weaker students.",
      hi: "कई बैंकों से शिक्षा ऋण के लिए एकल मंच। आर्थिक रूप से कमजोर छात्रों के लिए ब्याज सब्सिडी।",
    },
    eligibility: {
      en: "Students admitted to recognized institutions. Income-based interest subsidy for families below ₹4.5 lakh/year.",
      hi: "मान्यता प्राप्त संस्थानों में प्रवेशित छात्र। ₹4.5 लाख/वर्ष से कम आय वाले परिवारों के लिए ब्याज सब्सिडी।",
    },
    howToApply: {
      en: "Register and apply at vidyalakshmi.co.in.",
      hi: "vidyalakshmi.co.in पर पंजीकरण करें और आवेदन करें।",
    },
    officialLink: "https://vidyalakshmi.co.in",
    category: "education",
    tags: { incomeBracket: ["bpl", "below_3l", "below_5l"] },
  },

  // ── DISABILITY ──
  {
    id: "disability_pension",
    name: { en: "Disability Pension (IGNDPS)", hi: "विकलांगता पेंशन (IGNDPS)" },
    description: {
      en: "Monthly pension of ₹300 (₹500 for 80%+ disability) for persons with disabilities living below poverty line.",
      hi: "गरीबी रेखा से नीचे रहने वाले विकलांग व्यक्तियों के लिए ₹300 (80%+ विकलांगता के लिए ₹500) मासिक पेंशन।",
    },
    eligibility: {
      en: "Persons with 40%+ disability, aged 18-79, BPL.",
      hi: "40%+ विकलांगता, 18-79 आयु, BPL व्यक्ति।",
    },
    howToApply: {
      en: "Apply at the Block/District Social Welfare Office with disability certificate.",
      hi: "विकलांगता प्रमाणपत्र के साथ ब्लॉक/जिला समाज कल्याण कार्यालय में आवेदन करें।",
    },
    officialLink: "https://nsap.nic.in",
    category: "disability",
    tags: { incomeBracket: ["bpl"] },
  },

  // ── HOUSING (RENT) ──
  {
    id: "model_tenancy_act",
    name: { en: "Model Tenancy Act Benefits", hi: "मॉडल किरायेदारी अधिनियम लाभ" },
    description: {
      en: "Know your rights under the Model Tenancy Act 2021 — security deposit cap (2 months for residential), written agreement mandate, and fast-track Rent Courts.",
      hi: "मॉडल किरायेदारी अधिनियम 2021 के तहत अपने अधिकार जानें — सुरक्षा जमा सीमा (आवासीय के लिए 2 महीने), लिखित अनुबंध अनिवार्य।",
    },
    eligibility: { en: "All tenants and landlords in states that adopted the MTA.", hi: "MTA अपनाने वाले राज्यों में सभी किरायेदार और मकान मालिक।" },
    howToApply: {
      en: "Check if your state has adopted the MTA. Register your tenancy agreement with the Rent Authority.",
      hi: "जांचें कि क्या आपके राज्य ने MTA अपनाया है। अपना किरायेदारी अनुबंध किराया प्राधिकरण के साथ पंजीकृत करें।",
    },
    officialLink: "https://mohua.gov.in",
    category: "housing",
    tags: {
      legalCategories: ["rent"],
      checklistFlags: ["need_rent_agreement", "register_agreement", "illegal_eviction_risk", "security_deposit_issue"],
    },
  },

  // ── RERA ──
  {
    id: "rera_complaint",
    name: { en: "RERA Homebuyer Complaint", hi: "RERA गृह खरीदार शिकायत" },
    description: {
      en: "File complaints against builders for delayed possession, false promises, or quality defects. RERA orders typically within 60 days.",
      hi: "देरी से कब्ज़ा, झूठे वादे, या गुणवत्ता दोषों के लिए बिल्डरों के खिलाफ शिकायत दर्ज करें। RERA आदेश आमतौर पर 60 दिनों में।",
    },
    eligibility: {
      en: "Any homebuyer who purchased from a RERA-registered project.",
      hi: "RERA-पंजीकृत प्रोजेक्ट से खरीदने वाला कोई भी गृह खरीदार।",
    },
    howToApply: {
      en: "File online at your state RERA website. Fee: ₹1,000-5,000.",
      hi: "अपने राज्य की RERA वेबसाइट पर ऑनलाइन शिकायत दर्ज करें। शुल्क: ₹1,000-5,000।",
    },
    officialLink: "https://rera.gov.in",
    category: "housing",
    tags: {
      legalCategories: ["property"],
      checklistFlags: ["rera_complaint_eligible"],
    },
  },

  // ── RTI ──
  {
    id: "rti_online",
    name: { en: "RTI Online Filing", hi: "RTI ऑनलाइन फाइलिंग" },
    description: {
      en: "File Right to Information requests online for ₹10. Get government records, property documents, FIR copies, scheme details. Response within 30 days.",
      hi: "₹10 में ऑनलाइन सूचना का अधिकार अनुरोध दर्ज करें। सरकारी रिकॉर्ड, संपत्ति दस्तावेज़, FIR कॉपी प्राप्त करें। 30 दिनों में जवाब।",
    },
    eligibility: { en: "Any Indian citizen.", hi: "कोई भी भारतीय नागरिक।" },
    howToApply: {
      en: "File at rtionline.gov.in (central govt) or your state RTI portal. Fee: ₹10.",
      hi: "rtionline.gov.in (केंद्र सरकार) या राज्य RTI पोर्टल पर दर्ज करें। शुल्क: ₹10।",
    },
    officialLink: "https://rtionline.gov.in",
    category: "legal_aid",
    tags: {
      legalCategories: ["property", "consumer", "employment"],
    },
    isPopular: true,
  },

  // ── FARMER ──
  {
    id: "pm_kisan",
    name: { en: "PM Kisan Samman Nidhi", hi: "PM किसान सम्मान निधि" },
    description: {
      en: "₹6,000/year in 3 installments for small and marginal farmers. Direct bank transfer.",
      hi: "छोटे और सीमांत किसानों के लिए 3 किश्तों में ₹6,000/वर्ष। सीधे बैंक ट्रांसफर।",
    },
    eligibility: {
      en: "Farmer families with cultivable land. Excludes institutional landholders and income tax payers.",
      hi: "खेती योग्य भूमि वाले किसान परिवार। संस्थागत भूमिधारक और आयकर दाता शामिल नहीं।",
    },
    howToApply: {
      en: "Register at pmkisan.gov.in or through Common Service Centre.",
      hi: "pmkisan.gov.in पर या कॉमन सर्विस सेंटर के माध्यम से पंजीकरण करें।",
    },
    officialLink: "https://pmkisan.gov.in",
    category: "labor",
    tags: {
      incomeBracket: ["bpl", "below_3l", "below_5l"],
      legalCategories: ["property"],
    },
  },

  // ── MINORITY WELFARE ──
  {
    id: "minority_scholarship",
    name: { en: "Pre & Post Matric Scholarship for Minorities", hi: "अल्पसंख्यक छात्रवृत्ति" },
    description: {
      en: "Scholarships for minority community students (Muslim, Christian, Sikh, Buddhist, Jain, Parsi) for school and college education.",
      hi: "स्कूल और कॉलेज शिक्षा के लिए अल्पसंख्यक समुदाय के छात्रों के लिए छात्रवृत्ति।",
    },
    eligibility: {
      en: "Students from notified minority communities. Family income below ₹2 lakh/year.",
      hi: "अधिसूचित अल्पसंख्यक समुदायों के छात्र। पारिवारिक आय ₹2 लाख/वर्ष से कम।",
    },
    howToApply: {
      en: "Apply at scholarships.gov.in during the scholarship period.",
      hi: "छात्रवृत्ति अवधि के दौरान scholarships.gov.in पर आवेदन करें।",
    },
    officialLink: "https://scholarships.gov.in",
    category: "education",
    tags: { casteCategory: ["minority"], incomeBracket: ["bpl", "below_3l"] },
  },

  // ── LABOR RIGHTS ──
  {
    id: "labour_commissioner",
    name: { en: "Labour Commissioner Complaint", hi: "श्रम आयुक्त शिकायत" },
    description: {
      en: "File complaints for unpaid wages, wrongful termination, PF issues, or workplace violations. Free of cost.",
      hi: "बकाया वेतन, गलत बर्खास्तगी, PF मुद्दों, या कार्यस्थल उल्लंघन के लिए शिकायत दर्ज करें। मुफ्त।",
    },
    eligibility: { en: "Any employee or worker with a labor dispute.", hi: "श्रम विवाद वाला कोई भी कर्मचारी या कामगार।" },
    howToApply: {
      en: "Visit the Labour Commissioner's office in your district or file online at your state's labor department portal.",
      hi: "अपने जिले के श्रम आयुक्त कार्यालय में जाएं या राज्य श्रम विभाग पोर्टल पर ऑनलाइन दर्ज करें।",
    },
    officialLink: "https://labour.gov.in",
    category: "labor",
    tags: {
      legalCategories: ["employment"],
      checklistFlags: ["salary_withheld", "wrongful_termination", "pf_not_deducted", "no_posh_policy"],
      riskLevels: ["high", "critical"],
    },
  },

  // ── DOMESTIC VIOLENCE ──
  {
    id: "dv_protection_order",
    name: { en: "DV Act Protection Order", hi: "DV अधिनियम सुरक्षा आदेश" },
    description: {
      en: "Court order restraining the abuser from committing violence, entering the workplace/school, or contacting the victim. Also grants right to reside in shared household.",
      hi: "अदालत का आदेश जो हमलावर को हिंसा करने, कार्यस्थल में प्रवेश करने, या पीड़िता से संपर्क करने से रोकता है। साझा घर में रहने का अधिकार भी।",
    },
    eligibility: {
      en: "Any woman in a domestic relationship facing physical, sexual, verbal, emotional, or economic abuse.",
      hi: "शारीरिक, यौन, मौखिक, भावनात्मक या आर्थिक शोषण का सामना कर रही घरेलू संबंध में कोई भी महिला।",
    },
    howToApply: {
      en: "File through Protection Officer (at district Women & Child office), police, or directly at Magistrate Court. No lawyer required.",
      hi: "सुरक्षा अधिकारी, पुलिस, या सीधे मजिस्ट्रेट कोर्ट में दर्ज करें। वकील की ज़रूरत नहीं।",
    },
    officialLink: "https://wcd.nic.in",
    category: "women_welfare",
    tags: {
      gender: ["female"],
      legalCategories: ["family"],
      checklistFlags: ["domestic_violence"],
      riskLevels: ["high", "critical"],
    },
  },
];
