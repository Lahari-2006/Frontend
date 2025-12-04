export interface SubService {
  name: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  subServices: SubService[];
}

export const servicesData: ServiceCategory[] = [
  {
    id: "taxation",
    title: "Taxation & Compliance",
    icon: "FileText",
    description: "Comprehensive tax and compliance solutions for businesses and individuals",
    subServices: [
      {
        name: "TDS Return",
        description: "Expert TDS return filing services ensuring compliance with all regulatory requirements."
      },
      {
        name: "GST Registration",
        description: "Quick and hassle-free GST registration for your business with end-to-end support."
      },
      {
        name: "GST Filing",
        description: "Timely GST return filing services with accurate reporting and compliance management."
      },
      {
        name: "Income Tax Return",
        description: "Professional income tax return filing for individuals and businesses with maximum deductions."
      },
      {
        name: "ROC / Annual Filing",
        description: "Complete ROC compliance and annual filing services for companies."
      },
      {
        name: "Compliance by Company",
        description: "Comprehensive compliance management solutions tailored for your company's needs."
      }
    ]
  },
  {
    id: "registrations",
    title: "Registrations",
    icon: "ClipboardCheck",
    description: "Business registration and licensing services",
    subServices: [
      {
        name: "MSME Registration",
        description: "MSME/Udyam registration to avail benefits and government schemes."
      },
      {
        name: "Import Export Code (IEC)",
        description: "IEC registration for businesses engaged in import-export activities."
      },
      {
        name: "APEDA Registration",
        description: "APEDA registration for agricultural and processed food product exporters."
      },
      {
        name: "FSSAI Registration",
        description: "Food license and FSSAI registration for food businesses."
      },
      {
        name: "Trademark Registration",
        description: "Protect your brand with trademark registration and intellectual property services."
      },
      {
        name: "Company Registration",
        description: "End-to-end company incorporation services including Pvt Ltd, LLP, and OPC."
      },
      {
        name: "EPF Registration",
        description: "Employee Provident Fund registration and compliance management."
      }
    ]
  },
  {
    id: "certificates",
    title: "Certificates",
    icon: "Award",
    description: "Various business and legal certificates",
    subServices: [
      {
      name: "Visa Certificate",
      description: "Support with providing required visa-related certification and documentation."
    },
    {
      name: "Network Certificate",
      description: "Assistance in applying for network connectivity & digital certificate verification."
      },
      {
        name: "Digital Signature Certificates",
        description: "Class 2 and Class 3 digital signature certificates for secure online transactions."
      },
      {
        name: "15CA 15CB Certificate",
        description: "CA certification for foreign remittances and international payments."
      },
      {
        name: "Letters of Credit",
        description: "Letter of credit facilitation for international trade transactions."
      },
      {
        name: "Copyright Registration",
        description: "Copyright registration services for literary, artistic, and creative works."
      }
      
    ]
  },
  {
    id: "advisory",
    title: "Advisory & Accounting",
    icon: "Calculator",
    description: "Professional accounting and advisory services",
    subServices: [
      {
        name: "Book Keeping & Outsourcing",
        description: "Professional bookkeeping and accounting outsourcing services."
      },
      {
        name: "Audit and Assurance Services",
        description: "Comprehensive audit and assurance services ensuring financial accuracy."
      },
      {
        name: "CA Services",
        description: "Full-spectrum Chartered Accountant services for businesses and individuals."
      }
    ]
  },
  {
    id: "legal",
    title: "Legal & Structural",
    icon: "Scale",
    description: "Corporate structuring and legal compliance",
    subServices: [
      {
        name: "Cross Border Transaction – Structuring & Taxation",
        description: "Expert guidance on international transactions and cross-border taxation."
      },
      {
        name: "FDI in India",
        description: "Foreign Direct Investment advisory and compliance services."
      },
      {
        name: "Removal of Director",
        description: "Legal assistance for director removal and corporate restructuring."
      }
    ]
    
  }
];
