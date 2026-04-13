import type { CategoryDefinition } from "@/types";
import { rentQuestions } from "./questions/rent";
import { propertyQuestions } from "./questions/property";
import { consumerQuestions } from "./questions/consumer";
import { employmentQuestions } from "./questions/employment";
import { familyQuestions } from "./questions/family";
import { ecommerceQuestions } from "./questions/ecommerce";
import { cyberFraudQuestions } from "./questions/cyber-fraud";
import { chequeBounceQuestions } from "./questions/cheque-bounce";
import { policeFirQuestions } from "./questions/police-fir";

export const categories: CategoryDefinition[] = [
  {
    id: "rent",
    name: { en: "Rent & Tenancy", hi: "किराया और किरायेदारी" },
    description: {
      en: "Rent agreements, deposits, eviction, landlord disputes",
      hi: "किराया अनुबंध, जमा राशि, बेदखली, मकान मालिक विवाद",
    },
    icon: "Home",
    color: "bg-blue-500",
    relevantActs: [
      "State Rent Control Acts",
      "Registration Act, 1908",
      "Transfer of Property Act, 1882",
    ],
    questions: rentQuestions,
  },
  {
    id: "property",
    name: { en: "Property & Land", hi: "संपत्ति और भूमि" },
    description: {
      en: "Buying, selling, disputes, RERA, mutation, inheritance",
      hi: "खरीदना, बेचना, विवाद, RERA, नामांतरण, विरासत",
    },
    icon: "Building2",
    color: "bg-emerald-500",
    relevantActs: [
      "Transfer of Property Act, 1882",
      "RERA Act, 2016",
      "Registration Act, 1908",
      "Indian Succession Act, 1925",
    ],
    questions: propertyQuestions,
  },
  {
    id: "consumer",
    name: { en: "Consumer Rights", hi: "उपभोक्ता अधिकार" },
    description: {
      en: "Defective products, poor service, refunds, unfair practices",
      hi: "दोषपूर्ण उत्पाद, खराब सेवा, रिफंड, अनुचित प्रथाएं",
    },
    icon: "ShoppingBag",
    color: "bg-amber-500",
    relevantActs: [
      "Consumer Protection Act, 2019",
      "Sale of Goods Act, 1930",
    ],
    questions: consumerQuestions,
  },
  {
    id: "employment",
    name: { en: "Employment & Labour", hi: "रोज़गार और श्रम" },
    description: {
      en: "Salary, termination, PF, harassment, workplace rights",
      hi: "वेतन, बर्खास्तगी, PF, उत्पीड़न, कार्यस्थल अधिकार",
    },
    icon: "Briefcase",
    color: "bg-purple-500",
    relevantActs: [
      "Industrial Disputes Act, 1947",
      "Payment of Wages Act, 1936",
      "EPF Act, 1952",
      "POSH Act, 2013",
    ],
    questions: employmentQuestions,
  },
  {
    id: "family",
    name: { en: "Family & Marriage", hi: "परिवार और विवाह" },
    description: {
      en: "Divorce, custody, maintenance, domestic violence, inheritance",
      hi: "तलाक, कस्टडी, भरण-पोषण, घरेलू हिंसा, विरासत",
    },
    icon: "Heart",
    color: "bg-pink-500",
    relevantActs: [
      "Hindu Marriage Act, 1955",
      "Special Marriage Act, 1954",
      "DV Act, 2005",
      "Hindu Succession Act, 1956",
    ],
    questions: familyQuestions,
  },
  {
    id: "ecommerce",
    name: { en: "E-Commerce & Online", hi: "ई-कॉमर्स और ऑनलाइन" },
    description: {
      en: "Online shopping, refunds, fake products, data privacy",
      hi: "ऑनलाइन शॉपिंग, रिफंड, नकली उत्पाद, डेटा गोपनीयता",
    },
    icon: "ShoppingCart",
    color: "bg-indigo-500",
    relevantActs: [
      "Consumer Protection (E-Commerce) Rules, 2020",
      "IT Act, 2000",
      "DPDP Act, 2023",
    ],
    questions: ecommerceQuestions,
  },
  {
    id: "cyber-fraud",
    name: { en: "Cyber Fraud & Scams", hi: "साइबर धोखाधड़ी और स्कैम" },
    description: {
      en: "UPI fraud, phishing, online scams, identity theft",
      hi: "UPI धोखाधड़ी, फिशिंग, ऑनलाइन स्कैम, पहचान चोरी",
    },
    icon: "Shield",
    color: "bg-red-500",
    relevantActs: [
      "IT Act, 2000",
      "BNS Section 318-320",
      "Payment and Settlement Systems Act, 2007",
    ],
    questions: cyberFraudQuestions,
  },
  {
    id: "cheque-bounce",
    name: { en: "Cheque Bounce", hi: "चेक बाउंस" },
    description: {
      en: "Bounced cheque, S.138 notice, payment recovery",
      hi: "बाउंस चेक, धारा 138 नोटिस, भुगतान वसूली",
    },
    icon: "Banknote",
    color: "bg-orange-500",
    relevantActs: [
      "Negotiable Instruments Act, 1881 Section 138",
    ],
    questions: chequeBounceQuestions,
  },
  {
    id: "police-fir",
    name: { en: "Police & FIR Issues", hi: "पुलिस और FIR समस्या" },
    description: {
      en: "FIR refused, police inaction, false FIR, harassment",
      hi: "FIR से इनकार, पुलिस निष्क्रियता, झूठी FIR, उत्पीड़न",
    },
    icon: "Siren",
    color: "bg-slate-600",
    relevantActs: [
      "CrPC Section 154",
      "BNSS Section 173",
      "IPC Section 166A",
    ],
    questions: policeFirQuestions,
  },
];

export function getCategoryById(id: string): CategoryDefinition | undefined {
  return categories.find((c) => c.id === id);
}
