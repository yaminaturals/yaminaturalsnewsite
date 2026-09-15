export interface CertificationItem {
  id: string;
  name: string;
  subtext?: string;
  badgeType:
    | 'fssai'
    | 'gst'
    | 'gmp'
    | 'halal'
    | 'spiceboard'
    | 'apeda'
    | 'iso'
    | 'nongmo'
    | 'kosher'
    | 'msme'
    | 'iec'
    | 'organic'
    | 'usfda';
}

export const certificationsData: CertificationItem[] = [
  {
    id: 'fssai',
    name: 'FSSAI',
    subtext: 'Food Safety Authority',
    badgeType: 'fssai',
  },
  {
    id: 'gst',
    name: 'GST Registered',
    subtext: 'Govt. of India',
    badgeType: 'gst',
  },
  {
    id: 'gmp',
    name: 'GMP Certified',
    subtext: 'Quality Standard',
    badgeType: 'gmp',
  },
  {
    id: 'halal',
    name: 'HALAL Certified',
    subtext: 'Global Standard',
    badgeType: 'halal',
  },
  {
    id: 'spiceboard',
    name: 'Spices Board India',
    subtext: 'Ministry of Commerce',
    badgeType: 'spiceboard',
  },
  {
    id: 'apeda',
    name: 'APEDA',
    subtext: 'Agri Export Authority',
    badgeType: 'apeda',
  },
  {
    id: 'iso',
    name: 'ISO 22000:2018',
    subtext: 'Food Safety System',
    badgeType: 'iso',
  },
  {
    id: 'nongmo',
    name: 'Non-GMO Verified',
    subtext: 'Botanical Purity',
    badgeType: 'nongmo',
  },
  {
    id: 'kosher',
    name: 'Kosher Certified',
    subtext: 'Dietary Compliance',
    badgeType: 'kosher',
  },
  {
    id: 'msme',
    name: 'MSME Udyam',
    subtext: 'Ministry of MSME',
    badgeType: 'msme',
  },
  {
    id: 'iec',
    name: 'IEC (DGFT)',
    subtext: 'Import Export Code',
    badgeType: 'iec',
  },
  {
    id: 'organic',
    name: 'India Organic',
    subtext: 'NPOP Standard',
    badgeType: 'organic',
  },
  {
    id: 'usfda',
    name: 'US FDA Registered',
    subtext: 'Facility Compliant',
    badgeType: 'usfda',
  },
];
