import type { ChecklistItem, BilingualText } from "@/types";

interface ChecklistDefinition {
  title: BilingualText;
  description: BilingualText;
  urgency: "low" | "medium" | "high";
  applicableAct: string;
  documentType: string | null;
}

const checklistDefinitions: Record<string, ChecklistDefinition> = {
  // ── Rent ──
  need_rent_agreement: {
    title: {
      en: "Get a written rent agreement",
      hi: "लिखित किराया अनुबंध बनवाएं",
    },
    description: {
      en: "Without a written agreement, you have limited legal protection. A registered rent agreement is essential for both tenant and landlord rights.",
      hi: "लिखित अनुबंध के बिना आपके पास सीमित कानूनी सुरक्षा है। पंजीकृत किराया अनुबंध किरायेदार और मकान मालिक दोनों के अधिकारों के लिए आवश्यक है।",
    },
    urgency: "high",
    applicableAct: "Indian Registration Act, 1908",
    documentType: null,
  },
  register_agreement: {
    title: {
      en: "Register your rent agreement",
      hi: "अपना किराया अनुबंध पंजीकृत करें",
    },
    description: {
      en: "Agreements for 12+ months must be registered with the Sub-Registrar. Unregistered agreements are not admissible as evidence in court.",
      hi: "12+ महीने के अनुबंध उप-पंजीयक कार्यालय में पंजीकृत होने चाहिए। अपंजीकृत अनुबंध अदालत में साक्ष्य के रूप में स्वीकार्य नहीं हैं।",
    },
    urgency: "medium",
    applicableAct: "Registration Act, 1908 Section 17",
    documentType: null,
  },
  rent_receipt_missing: {
    title: {
      en: "Start collecting rent receipts",
      hi: "किराये की रसीदें लेना शुरू करें",
    },
    description: {
      en: "Rent receipts are proof of payment and required for HRA tax exemption under Section 10(13A) of the Income Tax Act.",
      hi: "किराये की रसीदें भुगतान का प्रमाण हैं और आयकर अधिनियम की धारा 10(13A) के तहत HRA कर छूट के लिए आवश्यक हैं।",
    },
    urgency: "medium",
    applicableAct: "Income Tax Act, 1961 Section 10(13A)",
    documentType: null,
  },
  illegal_eviction_risk: {
    title: {
      en: "Know your eviction rights",
      hi: "बेदखली के अपने अधिकार जानें",
    },
    description: {
      en: "A landlord cannot evict you without proper notice and court order. Illegal eviction is punishable under law.",
      hi: "मकान मालिक उचित नोटिस और अदालती आदेश के बिना आपको बेदखल नहीं कर सकता। अवैध बेदखली कानून के तहत दंडनीय है।",
    },
    urgency: "high",
    applicableAct: "State Rent Control Act",
    documentType: "legal_notice",
  },
  security_deposit_issue: {
    title: {
      en: "Document your security deposit",
      hi: "अपनी सुरक्षा जमा राशि का दस्तावेज़ बनाएं",
    },
    description: {
      en: "Keep receipts for security deposit paid. If the landlord refuses to return it, you can send a legal notice or file a case.",
      hi: "सुरक्षा जमा राशि की रसीदें रखें। यदि मकान मालिक वापस करने से मना करता है, तो आप कानूनी नोटिस भेज सकते हैं या केस दर्ज कर सकते हैं।",
    },
    urgency: "medium",
    applicableAct: "State Rent Control Act",
    documentType: "legal_notice",
  },

  // ── Property ──
  no_sale_deed: {
    title: {
      en: "Get your sale deed registered",
      hi: "अपना बिक्री पत्र पंजीकृत करवाएं",
    },
    description: {
      en: "Property ownership transfer is only valid through a registered sale deed. Without it, you have no legal ownership.",
      hi: "संपत्ति का स्वामित्व हस्तांतरण केवल पंजीकृत बिक्री पत्र से ही मान्य है। इसके बिना, आपके पास कोई कानूनी स्वामित्व नहीं है।",
    },
    urgency: "high",
    applicableAct: "Transfer of Property Act, 1882",
    documentType: null,
  },
  mutation_pending: {
    title: {
      en: "Complete property mutation/name transfer",
      hi: "संपत्ति का नामांतरण पूरा करें",
    },
    description: {
      en: "After buying property, mutation in municipal records is essential. Without it, tax bills and government services remain in the previous owner's name.",
      hi: "संपत्ति खरीदने के बाद, नगरपालिका रिकॉर्ड में नामांतरण आवश्यक है। इसके बिना, कर बिल और सरकारी सेवाएं पिछले मालिक के नाम पर रहती हैं।",
    },
    urgency: "medium",
    applicableAct: "State Municipal Act",
    documentType: null,
  },
  no_encumbrance_check: {
    title: {
      en: "Get an encumbrance certificate",
      hi: "भारमुक्ति प्रमाणपत्र प्राप्त करें",
    },
    description: {
      en: "An encumbrance certificate confirms the property is free from legal liabilities. Essential before any property transaction.",
      hi: "भारमुक्ति प्रमाणपत्र पुष्टि करता है कि संपत्ति कानूनी दायित्वों से मुक्त है। किसी भी संपत्ति लेनदेन से पहले आवश्यक है।",
    },
    urgency: "high",
    applicableAct: "Registration Act, 1908",
    documentType: null,
  },
  boundary_dispute: {
    title: {
      en: "Get a land survey done",
      hi: "भूमि सर्वेक्षण करवाएं",
    },
    description: {
      en: "For boundary disputes, get an official land survey from the revenue department. This is the first step before any legal action.",
      hi: "सीमा विवादों के लिए, राजस्व विभाग से आधिकारिक भूमि सर्वेक्षण करवाएं। यह किसी भी कानूनी कार्रवाई से पहले का पहला कदम है।",
    },
    urgency: "medium",
    applicableAct: "State Land Revenue Code",
    documentType: null,
  },
  rera_complaint_eligible: {
    title: {
      en: "File a RERA complaint",
      hi: "RERA शिकायत दर्ज करें",
    },
    description: {
      en: "If your builder has delayed possession or violated terms, you can file a complaint with RERA for compensation and refund.",
      hi: "यदि बिल्डर ने कब्ज़ा देने में देरी की है या शर्तों का उल्लंघन किया है, तो आप मुआवज़े और रिफंड के लिए RERA में शिकायत दर्ज कर सकते हैं।",
    },
    urgency: "high",
    applicableAct: "RERA Act, 2016",
    documentType: "complaint",
  },

  // ── Consumer ──
  consumer_complaint_eligible: {
    title: {
      en: "File a consumer complaint",
      hi: "उपभोक्ता शिकायत दर्ज करें",
    },
    description: {
      en: "You can file a complaint at the Consumer Forum. District (<₹1Cr), State (₹1Cr-₹10Cr), National (>₹10Cr).",
      hi: "आप उपभोक्ता फोरम में शिकायत दर्ज कर सकते हैं। जिला (<₹1 करोड़), राज्य (₹1-₹10 करोड़), राष्ट्रीय (>₹10 करोड़)।",
    },
    urgency: "high",
    applicableAct: "Consumer Protection Act, 2019",
    documentType: "complaint",
  },
  no_bill_invoice: {
    title: {
      en: "Always get a bill/invoice",
      hi: "हमेशा बिल/इनवॉइस लें",
    },
    description: {
      en: "A bill or invoice is your primary evidence for any consumer complaint. Without it, proving the transaction is difficult.",
      hi: "बिल या इनवॉइस किसी भी उपभोक्ता शिकायत के लिए आपका प्राथमिक साक्ष्य है। इसके बिना, लेनदेन को साबित करना कठिन है।",
    },
    urgency: "medium",
    applicableAct: "Consumer Protection Act, 2019",
    documentType: null,
  },
  defective_product: {
    title: {
      en: "Send a legal notice to the seller",
      hi: "विक्रेता को कानूनी नोटिस भेजें",
    },
    description: {
      en: "For defective products, send a legal notice first demanding replacement/refund. This strengthens your consumer court case.",
      hi: "दोषपूर्ण उत्पादों के लिए, पहले बदली/रिफंड की मांग करते हुए कानूनी नोटिस भेजें। इससे आपका उपभोक्ता अदालत का केस मजबूत होता है।",
    },
    urgency: "high",
    applicableAct: "Consumer Protection Act, 2019 Section 2(6)",
    documentType: "legal_notice",
  },
  unfair_trade_practice: {
    title: {
      en: "Report the unfair trade practice",
      hi: "अनुचित व्यापार प्रथा की रिपोर्ट करें",
    },
    description: {
      en: "False advertising, hidden charges, or misleading claims are unfair trade practices. File a complaint with the Consumer Forum.",
      hi: "झूठा विज्ञापन, छिपे शुल्क, या भ्रामक दावे अनुचित व्यापार प्रथाएं हैं। उपभोक्ता फोरम में शिकायत दर्ज करें।",
    },
    urgency: "medium",
    applicableAct: "Consumer Protection Act, 2019 Section 2(47)",
    documentType: "complaint",
  },
  service_deficiency: {
    title: {
      en: "Document the service deficiency",
      hi: "सेवा की कमी का दस्तावेज़ बनाएं",
    },
    description: {
      en: "Keep records of poor service — photos, emails, chat screenshots. This evidence is crucial for your consumer complaint.",
      hi: "खराब सेवा का रिकॉर्ड रखें — फोटो, ईमेल, चैट स्क्रीनशॉट। यह साक्ष्य आपकी उपभोक्ता शिकायत के लिए महत्वपूर्ण है।",
    },
    urgency: "medium",
    applicableAct: "Consumer Protection Act, 2019",
    documentType: null,
  },

  // ── Employment ──
  no_appointment_letter: {
    title: {
      en: "Get a written appointment letter",
      hi: "लिखित नियुक्ति पत्र प्राप्त करें",
    },
    description: {
      en: "An appointment letter is proof of employment terms. Without it, disputes about salary, role, or notice period are hard to resolve.",
      hi: "नियुक्ति पत्र रोज़गार शर्तों का प्रमाण है। इसके बिना, वेतन, भूमिका, या नोटिस अवधि के बारे में विवादों को सुलझाना कठिन है।",
    },
    urgency: "high",
    applicableAct: "Industrial Employment (Standing Orders) Act, 1946",
    documentType: null,
  },
  pf_not_deducted: {
    title: {
      en: "Check your PF contributions",
      hi: "अपने PF योगदान की जांच करें",
    },
    description: {
      en: "If you earn ≤₹15,000/month, your employer must contribute to EPF. Check your UAN portal for contributions.",
      hi: "यदि आप ≤₹15,000/माह कमाते हैं, तो नियोक्ता को EPF में योगदान करना अनिवार्य है। अपने UAN पोर्टल पर योगदान की जांच करें।",
    },
    urgency: "medium",
    applicableAct: "EPF Act, 1952",
    documentType: null,
  },
  wrongful_termination: {
    title: {
      en: "Challenge the wrongful termination",
      hi: "गलत बर्खास्तगी को चुनौती दें",
    },
    description: {
      en: "If terminated without proper notice or reason, you can approach the Labour Court or file a complaint with the Labour Commissioner.",
      hi: "यदि उचित नोटिस या कारण के बिना बर्खास्त किया गया है, तो आप श्रम न्यायालय में जा सकते हैं या श्रम आयुक्त के पास शिकायत दर्ज कर सकते हैं।",
    },
    urgency: "high",
    applicableAct: "Industrial Disputes Act, 1947",
    documentType: "legal_notice",
  },
  salary_withheld: {
    title: {
      en: "Demand your unpaid salary",
      hi: "अपना बकाया वेतन मांगें",
    },
    description: {
      en: "Send a legal notice to your employer demanding payment. If unresolved, file a complaint with the Labour Commissioner.",
      hi: "अपने नियोक्ता को भुगतान की मांग करते हुए कानूनी नोटिस भेजें। अनसुलझे होने पर, श्रम आयुक्त के पास शिकायत दर्ज करें।",
    },
    urgency: "high",
    applicableAct: "Payment of Wages Act, 1936",
    documentType: "legal_notice",
  },
  no_posh_policy: {
    title: {
      en: "Report missing POSH compliance",
      hi: "POSH अनुपालन की कमी की रिपोर्ट करें",
    },
    description: {
      en: "Companies with 10+ employees must have a POSH policy and Internal Complaints Committee. Report non-compliance to the District Officer.",
      hi: "10+ कर्मचारियों वाली कंपनियों में POSH नीति और आंतरिक शिकायत समिति होनी चाहिए। अनुपालन न होने की रिपोर्ट जिला अधिकारी को करें।",
    },
    urgency: "medium",
    applicableAct: "POSH Act, 2013",
    documentType: null,
  },

  // ── Family ──
  no_marriage_registration: {
    title: {
      en: "Register your marriage",
      hi: "अपनी शादी का पंजीकरण करें",
    },
    description: {
      en: "Marriage registration is mandatory and serves as proof of marriage for all legal purposes — passport, visa, property rights.",
      hi: "विवाह पंजीकरण अनिवार्य है और सभी कानूनी उद्देश्यों — पासपोर्ट, वीज़ा, संपत्ति अधिकारों के लिए विवाह का प्रमाण है।",
    },
    urgency: "high",
    applicableAct: "Registration of Marriages Act / Special Marriage Act, 1954",
    documentType: null,
  },
  domestic_violence: {
    title: {
      en: "Seek protection under DV Act",
      hi: "DV अधिनियम के तहत सुरक्षा लें",
    },
    description: {
      en: "You can get a protection order, residence order, and maintenance under the Domestic Violence Act. Contact Women Helpline 181.",
      hi: "आप घरेलू हिंसा अधिनियम के तहत सुरक्षा आदेश, निवास आदेश, और भरण-पोषण प्राप्त कर सकते हैं। महिला हेल्पलाइन 181 पर संपर्क करें।",
    },
    urgency: "high",
    applicableAct: "Protection of Women from Domestic Violence Act, 2005",
    documentType: "complaint",
  },
  maintenance_eligible: {
    title: {
      en: "Claim maintenance",
      hi: "भरण-पोषण का दावा करें",
    },
    description: {
      en: "Wives, children, and elderly parents can claim maintenance. Under Section 125 CrPC, you can get interim maintenance quickly.",
      hi: "पत्नियां, बच्चे, और वृद्ध माता-पिता भरण-पोषण का दावा कर सकते हैं। CrPC की धारा 125 के तहत आप शीघ्र अंतरिम भरण-पोषण प्राप्त कर सकते हैं।",
    },
    urgency: "medium",
    applicableAct: "CrPC Section 125 / Hindu Adoption & Maintenance Act",
    documentType: "application",
  },
  no_will: {
    title: {
      en: "Create a will",
      hi: "वसीयत बनाएं",
    },
    description: {
      en: "Without a will, your property will be distributed as per succession laws, which may not match your wishes.",
      hi: "वसीयत के बिना, आपकी संपत्ति उत्तराधिकार कानूनों के अनुसार वितरित होगी, जो आपकी इच्छाओं से मेल नहीं खा सकती।",
    },
    urgency: "medium",
    applicableAct: "Indian Succession Act, 1925",
    documentType: null,
  },
  custody_dispute: {
    title: {
      en: "Understand custody rights",
      hi: "कस्टडी अधिकार समझें",
    },
    description: {
      en: "Courts prioritize child welfare. Mother usually gets custody of children under 5. Both parents have visitation rights.",
      hi: "अदालतें बच्चों के कल्याण को प्राथमिकता देती हैं। 5 वर्ष से कम उम्र के बच्चों की कस्टडी आमतौर पर माँ को मिलती है। दोनों माता-पिता को मिलने का अधिकार है।",
    },
    urgency: "medium",
    applicableAct: "Hindu Minority & Guardianship Act, 1956 / Guardians and Wards Act, 1890",
    documentType: null,
  },

  // ── E-Commerce ──
  ecommerce_refund: {
    title: {
      en: "Demand refund from e-commerce platform",
      hi: "ई-कॉमर्स प्लेटफॉर्म से रिफंड की मांग करें",
    },
    description: {
      en: "E-commerce platforms must process refunds within the stated timeline. File a complaint on the platform first, then escalate to the Consumer Forum.",
      hi: "ई-कॉमर्स प्लेटफॉर्म को निर्धारित समय सीमा के भीतर रिफंड प्रोसेस करना होगा। पहले प्लेटफॉर्म पर शिकायत दर्ज करें, फिर उपभोक्ता फोरम में ले जाएं।",
    },
    urgency: "medium",
    applicableAct: "Consumer Protection (E-Commerce) Rules, 2020",
    documentType: "legal_notice",
  },
  fake_product: {
    title: {
      en: "Report counterfeit/fake product",
      hi: "नकली उत्पाद की रिपोर्ट करें",
    },
    description: {
      en: "Selling counterfeit products is a criminal offence. File a complaint with the platform and report to the police.",
      hi: "नकली उत्पाद बेचना एक आपराधिक अपराध है। प्लेटफॉर्म पर शिकायत दर्ज करें और पुलिस को रिपोर्ट करें।",
    },
    urgency: "high",
    applicableAct: "BNS Section 318 (Cheating) / Trade Marks Act, 1999",
    documentType: "complaint",
  },
  data_privacy_violation: {
    title: {
      en: "Report data privacy violation",
      hi: "डेटा गोपनीयता उल्लंघन की रिपोर्ट करें",
    },
    description: {
      en: "Under the DPDP Act, you have the right to know what data is collected and to request deletion. File a complaint with the Data Protection Board.",
      hi: "DPDP अधिनियम के तहत, आपको यह जानने का अधिकार है कि कौन सा डेटा एकत्र किया गया है और हटाने का अनुरोध करने का अधिकार है।",
    },
    urgency: "medium",
    applicableAct: "Digital Personal Data Protection Act, 2023",
    documentType: "complaint",
  },

  // ── Cyber Fraud ──
  cyber_fraud_immediate: {
    title: {
      en: "Call 1930 helpline immediately",
      hi: "तुरंत 1930 हेल्पलाइन पर कॉल करें",
    },
    description: {
      en: "Call the Cyber Crime Helpline 1930 within the golden hour. Also file an FIR at cybercrime.gov.in. Quick action can freeze the fraudster's account.",
      hi: "गोल्डन ऑवर के भीतर साइबर क्राइम हेल्पलाइन 1930 पर कॉल करें। cybercrime.gov.in पर FIR भी दर्ज करें। त्वरित कार्रवाई से धोखेबाज़ का खाता फ्रीज़ हो सकता है।",
    },
    urgency: "high",
    applicableAct: "IT Act, 2000 / BNS Section 318-320",
    documentType: null,
  },
  upi_fraud: {
    title: {
      en: "Report UPI fraud to your bank",
      hi: "अपने बैंक को UPI धोखाधड़ी की रिपोर्ट करें",
    },
    description: {
      en: "Report to your bank within 3 days for full liability protection. RBI circular mandates zero liability for unauthorized transactions reported within 3 days.",
      hi: "पूर्ण दायित्व सुरक्षा के लिए 3 दिनों के भीतर अपने बैंक को रिपोर्ट करें। RBI सर्कुलर 3 दिनों के भीतर रिपोर्ट किए गए अनधिकृत लेनदेन के लिए शून्य दायित्व अनिवार्य करता है।",
    },
    urgency: "high",
    applicableAct: "RBI Circular on Unauthorized Electronic Transactions / Payment and Settlement Systems Act, 2007",
    documentType: null,
  },
  phishing_scam: {
    title: {
      en: "Secure your accounts immediately",
      hi: "तुरंत अपने खातों को सुरक्षित करें",
    },
    description: {
      en: "Change passwords, enable 2FA, and check for unauthorized transactions. File a report at cybercrime.gov.in.",
      hi: "पासवर्ड बदलें, 2FA सक्षम करें, और अनधिकृत लेनदेन की जांच करें। cybercrime.gov.in पर रिपोर्ट दर्ज करें।",
    },
    urgency: "high",
    applicableAct: "IT Act, 2000 Section 66C/66D",
    documentType: null,
  },
};

export function mapFlagsToChecklist(flags: string[]): ChecklistItem[] {
  const seen = new Set<string>();
  const items: ChecklistItem[] = [];

  for (const flag of flags) {
    if (seen.has(flag)) continue;
    seen.add(flag);

    const def = checklistDefinitions[flag];
    if (!def) continue;

    items.push({
      id: flag,
      title: def.title,
      description: def.description,
      urgency: def.urgency,
      applicableAct: def.applicableAct,
      documentType: def.documentType,
    });
  }

  // Sort by urgency: high first, then medium, then low
  const urgencyOrder = { high: 0, medium: 1, low: 2 };
  items.sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);

  return items;
}
