/**
 * Indian Legal Knowledge Base for RAG.
 * Each entry is a chunk of legal knowledge that can be retrieved
 * via vector similarity search when users ask questions.
 */

export interface KnowledgeEntry {
  id: string;
  category: string;
  title: string;
  titleHi: string;
  content: string;
  contentHi: string;
  applicableActs: string;
  keywords: string;
}

export const knowledgeBase: KnowledgeEntry[] = [
  // ── RENT ──
  {
    id: "rent_agreement_basics",
    category: "rent",
    title: "Rent Agreement: What Every Tenant Must Know",
    titleHi: "किराया अनुबंध: हर किरायेदार को क्या जानना चाहिए",
    content:
      "A rent agreement is a legal contract between a landlord and tenant. In India, agreements for 11 months or less don't require registration (this is why most agreements are for 11 months). However, agreements for 12+ months MUST be registered with the Sub-Registrar under Section 17 of the Registration Act, 1908. An unregistered agreement beyond 11 months is not admissible as evidence in court. Always ensure your agreement includes: monthly rent, security deposit amount, maintenance responsibilities, lock-in period, notice period, and permitted use of the property.",
    contentHi:
      "किराया अनुबंध मकान मालिक और किरायेदार के बीच एक कानूनी अनुबंध है। भारत में, 11 महीने या उससे कम के अनुबंधों को पंजीकरण की आवश्यकता नहीं है (इसलिए अधिकांश अनुबंध 11 महीने के होते हैं)। हालांकि, 12+ महीने के अनुबंध को पंजीकरण अधिनियम, 1908 की धारा 17 के तहत उप-पंजीयक कार्यालय में पंजीकृत होना अनिवार्य है। 11 महीने से अधिक का अपंजीकृत अनुबंध अदालत में साक्ष्य के रूप में स्वीकार्य नहीं है।",
    applicableActs: "Registration Act 1908, Transfer of Property Act 1882",
    keywords: "rent,agreement,registration,11 months,tenant,landlord,lease",
  },
  {
    id: "rent_eviction_rights",
    category: "rent",
    title: "Tenant Eviction Rights: When Can a Landlord Evict You?",
    titleHi: "किरायेदार बेदखली अधिकार: मकान मालिक कब बेदखल कर सकता है?",
    content:
      "A landlord CANNOT evict a tenant without following due process. Valid grounds for eviction include: non-payment of rent, subletting without permission, property damage, or the landlord's genuine need for the property. The landlord must give written notice (usually 15-30 days depending on state law). If you refuse to vacate, the landlord must file a case in Rent Court — they cannot force you out, change locks, cut utilities, or harass you. Such actions constitute illegal eviction under the Rent Control Act and are punishable. Call police if threatened with illegal eviction.",
    contentHi:
      "मकान मालिक उचित प्रक्रिया के बिना किरायेदार को बेदखल नहीं कर सकता। बेदखली के वैध आधार हैं: किराया न देना, बिना अनुमति उपठेका, संपत्ति को नुकसान, या मकान मालिक की वास्तविक ज़रूरत। मकान मालिक को लिखित नोटिस देना होगा (राज्य कानून के अनुसार 15-30 दिन)। यदि आप खाली करने से मना करते हैं, तो मकान मालिक को किराया अदालत में केस दर्ज करना होगा — वे जबरन बाहर नहीं कर सकते, ताले नहीं बदल सकते, बिजली-पानी नहीं काट सकते।",
    applicableActs: "State Rent Control Acts, Transfer of Property Act 1882",
    keywords: "eviction,tenant rights,illegal eviction,notice,rent court,landlord",
  },
  {
    id: "rent_security_deposit",
    category: "rent",
    title: "Security Deposit Rules in India",
    titleHi: "भारत में सुरक्षा जमा राशि के नियम",
    content:
      "Security deposit rules vary by state. In most states, landlords charge 2-3 months' rent as deposit (in Maharashtra, it's up to 3 months; in Karnataka, up to 10 months is common). The deposit must be returned when you vacate, minus legitimate deductions for damages (not normal wear and tear). If your landlord refuses to return the deposit, send a legal notice demanding return within 15 days. If still not returned, you can file a case in Small Causes Court or Civil Court. Always get a receipt for the deposit paid — without it, proving payment is difficult.",
    contentHi:
      "सुरक्षा जमा राशि के नियम राज्य के अनुसार अलग होते हैं। अधिकांश राज्यों में, मकान मालिक 2-3 महीने का किराया जमा राशि के रूप में लेते हैं। जमा राशि आपके खाली करने पर वापस होनी चाहिए, नुकसान के लिए वैध कटौती को छोड़कर। यदि मकान मालिक जमा राशि वापस करने से मना करता है, तो 15 दिनों के भीतर वापसी की मांग करते हुए कानूनी नोटिस भेजें।",
    applicableActs: "State Rent Control Acts, Indian Contract Act 1872",
    keywords: "security deposit,refund,receipt,landlord,return deposit",
  },

  // ── PROPERTY ──
  {
    id: "prop_rera_rights",
    category: "property",
    title: "RERA: Your Rights as a Homebuyer",
    titleHi: "RERA: गृह खरीदार के रूप में आपके अधिकार",
    content:
      "The Real Estate (Regulation and Development) Act, 2016 (RERA) protects homebuyers. Key rights: builders must deliver on time or pay interest for delay; carpet area must match what was promised; builders can't change plans without 2/3rd buyers' consent; 5-year structural defect warranty; builders must deposit 70% of collections in a separate escrow account. If your builder violates any of these, file a complaint at your state RERA authority website. The complaint fee is typically ₹1,000-5,000. RERA orders are usually passed within 60 days.",
    contentHi:
      "रियल एस्टेट (विनियमन और विकास) अधिनियम, 2016 (RERA) गृह खरीदारों की रक्षा करता है। मुख्य अधिकार: बिल्डरों को समय पर डिलीवर करना होगा या देरी के लिए ब्याज देना होगा; कार्पेट एरिया वादे के अनुसार होना चाहिए; 5 वर्ष की संरचनात्मक दोष वारंटी। शिकायत शुल्क आमतौर पर ₹1,000-5,000 है।",
    applicableActs: "RERA Act 2016",
    keywords: "RERA,builder,delay,possession,carpet area,homebuyer,flat,apartment",
  },
  {
    id: "prop_sale_deed",
    category: "property",
    title: "Property Sale Deed: Why Registration is Non-Negotiable",
    titleHi: "बिक्री पत्र: पंजीकरण क्यों अनिवार्य है",
    content:
      "Under Section 54 of the Transfer of Property Act, 1882, ownership of immovable property worth more than ₹100 can only be transferred through a registered sale deed. A mere agreement to sell does NOT transfer ownership. The sale deed must be registered at the Sub-Registrar's office within 4 months of execution. Registration involves: stamp duty (varies by state, 5-7%), registration fee (typically 1%), and document preparation. After registration, apply for mutation (name transfer) at the municipal corporation to update property tax records in your name.",
    contentHi:
      "संपत्ति हस्तांतरण अधिनियम, 1882 की धारा 54 के तहत, ₹100 से अधिक मूल्य की अचल संपत्ति का स्वामित्व केवल पंजीकृत बिक्री पत्र के माध्यम से हस्तांतरित हो सकता है। बिक्री का केवल एक समझौता स्वामित्व हस्तांतरित नहीं करता। बिक्री पत्र 4 महीने के भीतर पंजीकृत होना चाहिए।",
    applicableActs: "Transfer of Property Act 1882, Registration Act 1908",
    keywords: "sale deed,registration,stamp duty,mutation,property transfer,ownership",
  },
  {
    id: "prop_encumbrance",
    category: "property",
    title: "Encumbrance Certificate: How to Check Property History",
    titleHi: "भारमुक्ति प्रमाणपत्र: संपत्ति का इतिहास कैसे जांचें",
    content:
      "An Encumbrance Certificate (EC) is a document that shows all registered transactions on a property for a given period — sales, mortgages, liens, court orders. It's essential before buying any property to verify it's free from legal liabilities. Apply online at your state's registration department website or visit the Sub-Registrar office. Fee is ₹200-500. Get an EC for at least the last 13-30 years. A 'nil encumbrance' certificate means no registered claims exist. However, EC only shows registered transactions — unregistered claims, verbal agreements, or pending litigation won't appear.",
    contentHi:
      "भारमुक्ति प्रमाणपत्र (EC) एक दस्तावेज़ है जो एक निश्चित अवधि के लिए संपत्ति पर सभी पंजीकृत लेनदेन दिखाता है। कोई भी संपत्ति खरीदने से पहले यह आवश्यक है। शुल्क ₹200-500 है। कम से कम पिछले 13-30 वर्षों का EC प्राप्त करें।",
    applicableActs: "Registration Act 1908",
    keywords: "encumbrance,certificate,property check,mortgage,lien,verification",
  },

  // ── CONSUMER ──
  {
    id: "consumer_filing_complaint",
    category: "consumer",
    title: "How to File a Consumer Complaint in India",
    titleHi: "भारत में उपभोक्ता शिकायत कैसे दर्ज करें",
    content:
      "Under the Consumer Protection Act, 2019, you can file a complaint at: District Commission (claims up to ₹1 Crore), State Commission (₹1 Cr - ₹10 Cr), or National Commission (above ₹10 Cr). You can file online at edaakhil.nic.in. Filing fee is ₹100-5,000 depending on claim value. You DON'T need a lawyer — you can argue your own case. Complaint must be filed within 2 years of the cause of action. Include: your details, opposite party details, nature of complaint, relief sought, and supporting documents (bills, photos, emails). Cases are typically resolved within 3-6 months.",
    contentHi:
      "उपभोक्ता संरक्षण अधिनियम, 2019 के तहत, आप शिकायत दर्ज कर सकते हैं: जिला आयोग (₹1 करोड़ तक), राज्य आयोग (₹1-₹10 करोड़), या राष्ट्रीय आयोग (₹10 करोड़ से ऊपर)। आप edaakhil.nic.in पर ऑनलाइन दर्ज कर सकते हैं। आपको वकील की ज़रूरत नहीं है। शिकायत कार्रवाई के कारण से 2 वर्ष के भीतर दर्ज करनी चाहिए।",
    applicableActs: "Consumer Protection Act 2019",
    keywords: "consumer complaint,filing,forum,edaakhil,district commission,refund",
  },
  {
    id: "consumer_defective_product",
    category: "consumer",
    title: "Your Rights When You Buy a Defective Product",
    titleHi: "दोषपूर्ण उत्पाद खरीदने पर आपके अधिकार",
    content:
      "If you buy a defective product, you have multiple remedies under the Consumer Protection Act, 2019. First, demand replacement or refund from the seller/manufacturer. If they refuse, send a legal notice (this strengthens your case). Then file a consumer complaint. You can claim: product replacement, refund, compensation for damages/suffering, and cost of filing. The manufacturer is liable even if they didn't sell directly to you (product liability under Section 84). Keep the defective product, bill, warranty card, and any communication as evidence. For products bought online, the e-commerce platform is also liable.",
    contentHi:
      "यदि आप दोषपूर्ण उत्पाद खरीदते हैं, तो उपभोक्ता संरक्षण अधिनियम, 2019 के तहत आपके कई उपाय हैं। पहले, विक्रेता/निर्माता से बदली या रिफंड की मांग करें। यदि वे मना करें, तो कानूनी नोटिस भेजें। फिर उपभोक्ता शिकायत दर्ज करें। ऑनलाइन खरीदे उत्पादों के लिए ई-कॉमर्स प्लेटफॉर्म भी उत्तरदायी है।",
    applicableActs: "Consumer Protection Act 2019 Section 2(6), Section 84",
    keywords: "defective product,replacement,refund,warranty,manufacturer liability",
  },

  // ── EMPLOYMENT ──
  {
    id: "emp_wrongful_termination",
    category: "employment",
    title: "Wrongful Termination: Know Your Rights",
    titleHi: "गलत बर्खास्तगी: अपने अधिकार जानें",
    content:
      "If you are terminated without proper notice, valid reason, or due process, it may be wrongful termination. Under the Industrial Disputes Act, 1947, an employer with 100+ employees cannot retrench a workman who has been in service for 1+ years without government permission. For all employees, termination must follow the terms of the appointment letter and applicable labor laws. If wrongfully terminated: 1) Get the termination in writing, 2) Send a legal notice to the employer, 3) File a complaint with the Labour Commissioner, 4) Approach the Labour Court. You can claim reinstatement with back wages or compensation.",
    contentHi:
      "यदि आपको उचित नोटिस, वैध कारण, या उचित प्रक्रिया के बिना बर्खास्त किया जाता है, तो यह गलत बर्खास्तगी हो सकती है। औद्योगिक विवाद अधिनियम, 1947 के तहत, 100+ कर्मचारियों वाला नियोक्ता 1+ वर्ष सेवा में रहे कर्मी को सरकार की अनुमति के बिना छटनी नहीं कर सकता।",
    applicableActs: "Industrial Disputes Act 1947, Payment of Wages Act 1936",
    keywords: "termination,firing,wrongful,notice period,reinstatement,labour court",
  },
  {
    id: "emp_pf_rights",
    category: "employment",
    title: "PF Rights: Is Your Employer Cheating You?",
    titleHi: "PF अधिकार: क्या आपका नियोक्ता धोखा दे रहा है?",
    content:
      "Under the EPF Act, 1952, every employer with 20+ employees must register for PF. Both employee and employer contribute 12% of basic salary. Your employer MUST: provide you a UAN (Universal Account Number), submit monthly PF contributions by the 15th of each month, and provide a salary slip showing PF deductions. Check your PF balance at epfindia.gov.in or via UMANG app. If your employer deducts PF but doesn't deposit it, this is a criminal offence under Section 14B of the EPF Act — file a complaint at the regional EPFO office. You can also complain at epfigms.gov.in.",
    contentHi:
      "EPF अधिनियम, 1952 के तहत, 20+ कर्मचारियों वाले हर नियोक्ता को PF के लिए पंजीकरण करना होगा। कर्मचारी और नियोक्ता दोनों मूल वेतन का 12% योगदान करते हैं। यदि नियोक्ता PF काटता है लेकिन जमा नहीं करता, तो यह EPF अधिनियम की धारा 14B के तहत आपराधिक अपराध है।",
    applicableActs: "EPF Act 1952, Payment of Wages Act 1936",
    keywords: "PF,EPF,provident fund,UAN,employer contribution,EPFO",
  },

  // ── FAMILY ──
  {
    id: "family_dv_protection",
    category: "family",
    title: "Domestic Violence: Immediate Help & Legal Protection",
    titleHi: "घरेलू हिंसा: तत्काल सहायता और कानूनी सुरक्षा",
    content:
      "The Protection of Women from Domestic Violence Act, 2005 provides comprehensive protection. Domestic violence includes: physical abuse, sexual abuse, verbal/emotional abuse, and economic abuse (controlling finances, denying food/shelter). You can: 1) Call Women Helpline 181 or Police 100, 2) File a complaint with the Protection Officer in your district, 3) Apply for a Protection Order from the Magistrate Court. The court can grant: protection order (restraining the abuser), residence order (right to live in the shared household), monetary relief (maintenance), and custody of children. A woman can file DV complaint against husband AND his relatives.",
    contentHi:
      "महिलाओं का घरेलू हिंसा से संरक्षण अधिनियम, 2005 व्यापक सुरक्षा प्रदान करता है। घरेलू हिंसा में शामिल हैं: शारीरिक, यौन, मौखिक/भावनात्मक और आर्थिक शोषण। महिला हेल्पलाइन 181 या पुलिस 100 पर कॉल करें। अदालत सुरक्षा आदेश, निवास आदेश, मौद्रिक राहत और बच्चों की कस्टडी दे सकती है।",
    applicableActs: "Protection of Women from Domestic Violence Act 2005",
    keywords: "domestic violence,protection order,women helpline,181,abuse,DV Act",
  },
  {
    id: "family_maintenance",
    category: "family",
    title: "Maintenance Rights: Who Can Claim & How Much?",
    titleHi: "भरण-पोषण अधिकार: कौन दावा कर सकता है और कितना?",
    content:
      "Under Section 125 CrPC (now Section 144 BNSS), a wife, minor children, and elderly parents unable to maintain themselves can claim maintenance. Maintenance amount depends on: income of the person liable, needs of the claimant, and standard of living. Courts typically award 20-25% of the husband's net income as maintenance. You can get INTERIM maintenance (quick, within weeks) while the main case is pending. For divorce maintenance, there are separate provisions under personal laws (Hindu Marriage Act Section 25, Muslim Women Protection Act). File application at the Family Court in your area.",
    contentHi:
      "CrPC की धारा 125 (अब BNSS धारा 144) के तहत, पत्नी, नाबालिग बच्चे और अपना भरण-पोषण करने में असमर्थ वृद्ध माता-पिता भरण-पोषण का दावा कर सकते हैं। अदालतें आमतौर पर पति की शुद्ध आय का 20-25% भरण-पोषण के रूप में देती हैं।",
    applicableActs: "CrPC Section 125, BNSS Section 144, Hindu Marriage Act Section 25",
    keywords: "maintenance,alimony,wife,children,parents,interim maintenance,family court",
  },

  // ── E-COMMERCE ──
  {
    id: "ecom_refund_rules",
    category: "ecommerce",
    title: "E-Commerce Refund Rules: Your Legal Rights",
    titleHi: "ई-कॉमर्स रिफंड नियम: आपके कानूनी अधिकार",
    content:
      "Under the Consumer Protection (E-Commerce) Rules, 2020, every e-commerce platform must: display a clear return/refund policy, process refunds within the stated timeline, provide a grievance officer's contact details, and not manipulate prices or impose hidden charges. If a platform refuses your legitimate refund: 1) File a complaint on the platform's grievance portal, 2) Escalate to the National Consumer Helpline (1800-11-4000 or consumerhelpline.gov.in), 3) File on edaakhil.nic.in for the Consumer Forum. For cash-on-delivery orders, platforms must refund to your original payment method or as store credit only if you agree.",
    contentHi:
      "उपभोक्ता संरक्षण (ई-कॉमर्स) नियम, 2020 के तहत, प्रत्येक ई-कॉमर्स प्लेटफॉर्म को स्पष्ट वापसी/रिफंड नीति प्रदर्शित करनी होगी। यदि प्लेटफॉर्म रिफंड से मना करता है: राष्ट्रीय उपभोक्ता हेल्पलाइन (1800-11-4000) पर शिकायत करें।",
    applicableActs: "Consumer Protection (E-Commerce) Rules 2020, Consumer Protection Act 2019",
    keywords: "refund,ecommerce,online shopping,return,grievance,consumer helpline",
  },
  {
    id: "ecom_dpdp_rights",
    category: "ecommerce",
    title: "DPDP Act 2023: Your Data Privacy Rights",
    titleHi: "DPDP अधिनियम 2023: आपके डेटा गोपनीयता अधिकार",
    content:
      "The Digital Personal Data Protection Act, 2023 gives you key rights: Right to access your data, Right to correction and erasure, Right to grievance redressal, and Right to nominate someone to exercise your rights after your death. Companies must: get your consent before collecting data, state the purpose clearly, allow you to withdraw consent, delete data when purpose is fulfilled, and report data breaches. If a company violates your data rights, complain to the Data Protection Board of India. Penalties can go up to ₹250 Crore. For everyday violations (spam calls, unauthorized data sharing), file complaints at the company's grievance portal first.",
    contentHi:
      "डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 आपको प्रमुख अधिकार देता है: डेटा तक पहुंच का अधिकार, सुधार और हटाने का अधिकार, शिकायत निवारण का अधिकार। कंपनियों को डेटा एकत्र करने से पहले आपकी सहमति लेनी होगी।",
    applicableActs: "Digital Personal Data Protection Act 2023",
    keywords: "DPDP,data privacy,consent,personal data,data protection board,erasure",
  },

  // ── CYBER FRAUD ──
  {
    id: "cyber_upi_fraud",
    category: "cyber-fraud",
    title: "UPI Fraud: The Golden Hour & Recovery Steps",
    titleHi: "UPI धोखाधड़ी: गोल्डन ऑवर और रिकवरी कदम",
    content:
      "If you're a victim of UPI fraud, the first 1-3 hours are critical (the 'golden hour'). Immediate steps: 1) Call 1930 (Cyber Crime Helpline) — they can freeze the fraudster's account in real-time, 2) Call your bank's fraud helpline to block further transactions, 3) File an FIR at cybercrime.gov.in. Under RBI's circular on unauthorized electronic transactions, if you report within 3 days, your liability is ZERO. After 3-7 days, maximum liability is ₹10,000-₹25,000. After 7 days, you bear the full loss. Keep screenshots of fraudulent transactions, messages, and your complaint numbers. UPI fraud is punishable under IT Act Section 66D (up to 3 years imprisonment).",
    contentHi:
      "UPI धोखाधड़ी में पहले 1-3 घंटे महत्वपूर्ण हैं ('गोल्डन ऑवर')। तुरंत 1930 पर कॉल करें — वे धोखेबाज़ का खाता रीयल-टाइम में फ्रीज़ कर सकते हैं। RBI सर्कुलर के अनुसार, 3 दिनों के भीतर रिपोर्ट करने पर आपकी देनदारी शून्य है।",
    applicableActs: "IT Act 2000 Section 66D, RBI Circular on Unauthorized Transactions",
    keywords: "UPI,fraud,1930,golden hour,bank,freeze,cybercrime,phishing",
  },
  {
    id: "cyber_online_scam",
    category: "cyber-fraud",
    title: "Online Scams: How to Identify, Report & Recover",
    titleHi: "ऑनलाइन स्कैम: कैसे पहचानें, रिपोर्ट करें और रिकवर करें",
    content:
      "Common online scams in India: fake job offers, loan scams, lottery/prize scams, romance scams, tech support scams, and investment fraud. Red flags: unsolicited contact, urgency pressure, requests for OTP/passwords, too-good-to-be-true returns, unknown payment links. If scammed: 1) Don't send more money, 2) Call 1930 immediately, 3) File at cybercrime.gov.in, 4) Report to the platform where you were scammed, 5) File a police FIR at your nearest station. Under BNS Section 318 (Cheating), punishment is up to 7 years. Under BNS Section 319 (Cheating by personation), up to 7 years. Keep all evidence — screenshots, call records, bank statements.",
    contentHi:
      "भारत में आम ऑनलाइन स्कैम: नकली नौकरी ऑफर, लोन स्कैम, लॉटरी/पुरस्कार स्कैम, रोमांस स्कैम। यदि स्कैम हो जाए: 1) और पैसे न भेजें, 2) तुरंत 1930 पर कॉल करें, 3) cybercrime.gov.in पर शिकायत दर्ज करें। BNS धारा 318 (धोखाधड़ी) के तहत 7 वर्ष तक की सजा है।",
    applicableActs: "IT Act 2000, BNS Section 318-319",
    keywords: "scam,online fraud,phishing,job scam,loan scam,cybercrime,1930",
  },

  // ── CROSS-CATEGORY ──
  {
    id: "general_legal_notice",
    category: "consumer",
    title: "How to Send a Legal Notice in India",
    titleHi: "भारत में कानूनी नोटिस कैसे भेजें",
    content:
      "A legal notice is a formal written communication sent before initiating legal proceedings. It's not mandatory in all cases, but it strengthens your case and often resolves disputes without court. Contents: sender/receiver details, facts of the matter, legal provisions violated, specific demand/relief, timeline to respond (typically 15-30 days), and consequence of non-compliance. Send via registered post with acknowledgment due (RPAD). Keep the postal receipt and delivery tracking as proof. You can draft it yourself or hire a lawyer (₹500-5,000 for simple notices). A legal notice is NOT a court case — it's a warning that shows you're serious.",
    contentHi:
      "कानूनी नोटिस कानूनी कार्यवाही शुरू करने से पहले भेजा जाने वाला एक औपचारिक लिखित संचार है। यह सभी मामलों में अनिवार्य नहीं है, लेकिन आपके केस को मजबूत करता है। पंजीकृत डाक से भेजें। आप इसे स्वयं लिख सकते हैं या वकील से लिखवा सकते हैं (₹500-5,000)।",
    applicableActs: "Code of Civil Procedure 1908 Section 80",
    keywords: "legal notice,RPAD,demand,notice period,registered post,warning",
  },
  {
    id: "general_free_legal_aid",
    category: "consumer",
    title: "Free Legal Aid: You Don't Need Money to Get Justice",
    titleHi: "मुफ्त कानूनी सहायता: न्याय के लिए पैसों की ज़रूरत नहीं",
    content:
      "Under the Legal Services Authorities Act, 1987, free legal aid is available to: women, children, SC/ST members, persons with disabilities, victims of trafficking, industrial workmen, persons in custody, and anyone with annual income below ₹3 lakh (varies by state). Contact: NALSA (National Legal Services Authority) at nalsa.gov.in, your District Legal Services Authority (DLSA) at the district court, or call the NALSA helpline. Free legal aid includes: free lawyer, no court fees, and free legal advice. Lok Adalats (people's courts) also provide free dispute resolution — decisions are binding and non-appealable.",
    contentHi:
      "कानूनी सेवा प्राधिकरण अधिनियम, 1987 के तहत, मुफ्त कानूनी सहायता उपलब्ध है: महिलाओं, बच्चों, SC/ST सदस्यों, विकलांग व्यक्तियों, और ₹3 लाख से कम वार्षिक आय वालों के लिए। NALSA से संपर्क करें: nalsa.gov.in। लोक अदालतें भी मुफ्त विवाद समाधान प्रदान करती हैं।",
    applicableActs: "Legal Services Authorities Act 1987",
    keywords: "free legal aid,NALSA,DLSA,lok adalat,free lawyer,legal services",
  },
  {
    id: "general_rti",
    category: "property",
    title: "RTI: How to Get Information from the Government",
    titleHi: "RTI: सरकार से जानकारी कैसे प्राप्त करें",
    content:
      "The Right to Information Act, 2005 allows any citizen to request information from any public authority. You can file RTI to get: property records, government scheme details, FIR copies, police investigation status, municipal records, and more. How to file: Write a simple letter/application to the PIO (Public Information Officer) of the relevant department, pay ₹10 as fee (BPL applicants exempt), and the authority must respond within 30 days. File online at rtionline.gov.in for central government departments. If no response, file First Appeal within 30 days, then Second Appeal to the Information Commission.",
    contentHi:
      "सूचना का अधिकार अधिनियम, 2005 किसी भी नागरिक को किसी भी सार्वजनिक प्राधिकरण से जानकारी मांगने की अनुमति देता है। ₹10 शुल्क के साथ PIO को आवेदन लिखें। प्राधिकरण को 30 दिनों के भीतर जवाब देना होगा। rtionline.gov.in पर ऑनलाइन दाखिल करें।",
    applicableActs: "Right to Information Act 2005",
    keywords: "RTI,right to information,PIO,government,public authority,30 days",
  },
];
