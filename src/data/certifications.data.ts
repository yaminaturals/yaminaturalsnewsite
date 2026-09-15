export interface CertificationItem {
  id: string;
  code: string;
  name: string;
  authority: string;
  tag: string;
  badgeType: 'fssai' | 'gmp' | 'gst' | 'spiceboard' | 'apeda' | 'halal' | 'iso' | 'nongmo' | 'kosher' | 'msme' | 'iec' | 'organic';
}

export const certificationsData: CertificationItem[] = [
  {
    id: 'fssai',
    code: 'FSSAI',
    name: 'Food Safety & Standards',
    authority: 'Govt. of India',
    tag: 'Lic. Compliant',
    badgeType: 'fssai',
  },
  {
    id: 'gmp',
    code: 'GMP',
    name: 'Good Manufacturing Practice',
    authority: 'Quality Standard',
    tag: 'Batch Verified',
    badgeType: 'gmp',
  },
  {
    id: 'gst',
    code: 'GST',
    name: 'Goods & Services Tax',
    authority: 'Ministry of Finance, India',
    tag: 'Registered Entity',
    badgeType: 'gst',
  },
  {
    id: 'spiceboard',
    code: 'SPICES BOARD',
    name: 'Spices Board India',
    authority: 'Ministry of Commerce & Industry',
    tag: 'Export Certified',
    badgeType: 'spiceboard',
  },
  {
    id: 'apeda',
    code: 'APEDA',
    name: 'Agri & Processed Food Authority',
    authority: 'Ministry of Commerce, India',
    tag: 'Export Registered',
    badgeType: 'apeda',
  },
  {
    id: 'halal',
    code: 'HALAL',
    name: 'Halal Certified Processing',
    authority: 'Global Standard',
    tag: 'Compliant Facility',
    badgeType: 'halal',
  },
  {
    id: 'iso',
    code: 'ISO 22000',
    name: 'Food Safety Management',
    authority: 'International Standard',
    tag: 'HACCP Aligned',
    badgeType: 'iso',
  },
  {
    id: 'nongmo',
    code: 'NON-GMO',
    name: 'Non-GMO Origin Standard',
    authority: 'Botanical Traceability',
    tag: '100% Natural',
    badgeType: 'nongmo',
  },
  {
    id: 'kosher',
    code: 'KOSHER',
    name: 'Kosher Certified Standard',
    authority: 'Dietary Compliance',
    tag: 'Audit Verified',
    badgeType: 'kosher',
  },
  {
    id: 'msme',
    code: 'MSME UDYAM',
    name: 'Enterprise Registration',
    authority: 'Ministry of MSME, India',
    tag: 'Govt. Recognized',
    badgeType: 'msme',
  },
  {
    id: 'iec',
    code: 'IEC / DGFT',
    name: 'Import Export Code',
    authority: 'Directorate General of Foreign Trade',
    tag: 'Global Trade',
    badgeType: 'iec',
  },
  {
    id: 'organic',
    code: 'NPOP / USDA',
    name: 'Organic Botanical Standard',
    authority: 'Agricultural Standard',
    tag: 'Purity Assured',
    badgeType: 'organic',
  },
];
