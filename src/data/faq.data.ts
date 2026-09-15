export interface FAQItemData {
  id: string;
  number: string;
  question: string;
  answer: string;
  category?: string;
  isHomepageFeatured?: boolean;
}

export interface FAQCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
  items: FAQItemData[];
}

export interface FAQSectionContent {
  eyebrow: string;
  heading: string;
  headingEmphasis?: string;
  supportingText: string;
  items: FAQItemData[];
  cta: {
    heading: string;
    text: string;
    buttonText: string;
    buttonLink: string;
    secondaryText?: string;
    secondaryLink?: string;
  };
}

/**
 * Categorized Master FAQ Repository (55 Questions across 10 Operational Categories)
 */
export const allFaqCategories: FAQCategory[] = [
  {
    id: 'products-requirements',
    name: 'Products & Requirements',
    description: 'Herbal powders, extracts, natural oils, cosmetic clays, and custom formulation procurement.',
    icon: '🌿',
    items: [
      {
        id: 'faq-01',
        number: '01',
        question: 'What products does Yami Naturals manufacture and supply?',
        answer:
          'Yami Naturals manufactures and supplies herbal and natural products and raw ingredients across key botanical categories, including herbal powders, standardized herbal extracts, natural carrier oils, cosmetic clay powders, nutraceutical ingredients and capsules, depending on the requirement.',
        category: 'products-requirements',
        isHomepageFeatured: true,
      },
      {
        id: 'faq-02',
        number: '02',
        question: 'Can I enquire about a product that is not listed on the website?',
        answer:
          'Yes. If a required botanical, specific mesh size, extraction ratio, or ingredient grade is not listed on our website, you can submit a custom enquiry with your requirement details for our team to review.',
        category: 'products-requirements',
      },
      {
        id: 'faq-03',
        number: '03',
        question: 'Can you handle bulk or customized product requirements?',
        answer:
          'Yes. Bulk and customized product requirements can be discussed based on the specific botanical, target specification, volume, intended application, and applicable processing parameters.',
        category: 'products-requirements',
        isHomepageFeatured: true,
      },
      {
        id: 'faq-04',
        number: '04',
        question: 'Can you develop or supply products according to a specific formulation?',
        answer:
          'Custom formulation and processing requirements can be reviewed and discussed based on your formulation parameters, batch requirements, ingredient compatibility, and application.',
        category: 'products-requirements',
      },
      {
        id: 'faq-05',
        number: '05',
        question: 'What information should I provide when submitting a product requirement?',
        answer:
          'To help us evaluate your requirement accurately, please provide the botanical or trade name, desired form or specification (e.g., mesh size, extract ratio, active assay), estimated volume, application (food, cosmetic, nutraceutical), and any packaging or documentation requirements.',
        category: 'products-requirements',
      },
      {
        id: 'faq-06',
        number: '06',
        question: 'Can I request a specific botanical, ingredient or product specification?',
        answer:
          'Yes. Sourcing and production can be aligned with customer-provided specifications, subject to raw material availability, feasibility, and agreed parameters.',
        category: 'products-requirements',
      },
      {
        id: 'faq-07',
        number: '07',
        question: 'Do you handle both B2B and individual requirements?',
        answer:
          'Yes. We cater to commercial B2B procurement, private label clients, and select retail/individual requirements with dedicated communication channels.',
        category: 'products-requirements',
      },
    ],
  },
  {
    id: 'samples-evaluation',
    name: 'Samples & Product Evaluation',
    description: 'Sample requests, specification alignment, and preliminary product evaluations.',
    icon: '🧪',
    items: [
      {
        id: 'faq-08',
        number: '08',
        question: 'Can I request a sample before placing a bulk order?',
        answer:
          'Sample availability can be discussed depending on the product, requirement, quantity, and application to facilitate preliminary evaluation.',
        category: 'samples-evaluation',
        isHomepageFeatured: true,
      },
      {
        id: 'faq-09',
        number: '09',
        question: 'Can I request a sample against a specific specification?',
        answer:
          'Sample requests against specific grades, extraction ratios, or particle sizes can be discussed depending on raw material and batch availability.',
        category: 'samples-evaluation',
      },
      {
        id: 'faq-10',
        number: '10',
        question: 'Can I submit my own reference sample or product specification?',
        answer:
          'Yes. You may share reference specifications or product parameters with our team during the enquiry stage for review against our manufacturing and sourcing capabilities.',
        category: 'samples-evaluation',
      },
      {
        id: 'faq-11',
        number: '11',
        question: 'What information should I provide when requesting a sample?',
        answer:
          'Please include the exact product name, desired specification or application, your business or project context, delivery destination, and any specific evaluation criteria you require.',
        category: 'samples-evaluation',
      },
    ],
  },
  {
    id: 'production-batches',
    name: 'Production & Batches',
    description: 'Batch-specific handling, production scheduling, and manufacturing parameters.',
    icon: '⚙️',
    items: [
      {
        id: 'faq-12',
        number: '12',
        question: 'How does production work after an order is confirmed?',
        answer:
          'Production and fulfilment scheduling depend on the approved product specification, ordered quantity, formulation parameters, and prevailing raw material processing schedules.',
        category: 'production-batches',
      },
      {
        id: 'faq-13',
        number: '13',
        question: 'Can I get batch-related information for my order?',
        answer:
          'Yes. Batch-related information and applicable production/product documentation can be discussed for the relevant order and product.',
        category: 'production-batches',
        isHomepageFeatured: true,
      },
      {
        id: 'faq-14',
        number: '14',
        question: 'Can production be carried out according to an approved specification?',
        answer:
          'Production parameters can be aligned with the mutually agreed and approved specification sheet prior to commercial batch execution.',
        category: 'production-batches',
      },
      {
        id: 'faq-15',
        number: '15',
        question: 'Can I request information related to the production batch?',
        answer:
          'Batch details, including manufacturing period and applicable batch identification, can be coordinated as part of order documentation where applicable.',
        category: 'production-batches',
      },
      {
        id: 'faq-16',
        number: '16',
        question: 'Are batch-related documents available with the product?',
        answer:
          'Where applicable and requested during order finalization, relevant batch documentation and product sheets can be supplied with the consignment.',
        category: 'production-batches',
      },
      {
        id: 'faq-17',
        number: '17',
        question: 'Can I request a specific batch size or quantity?',
        answer:
          'Required batch quantities can be discussed during order finalization based on product type, processing feasibility, and commercial packaging requirements.',
        category: 'production-batches',
      },
    ],
  },
  {
    id: 'quality-documentation',
    name: 'Quality & Documentation',
    description: 'COA, technical specification sheets, and batch documentation alignment.',
    icon: '📋',
    items: [
      {
        id: 'faq-18',
        number: '18',
        question: 'Can I receive a Certificate of Analysis (COA)?',
        answer:
          'Where applicable, product documentation such as a Certificate of Analysis (COA) can be discussed and provided based on the product and agreed order specifications.',
        category: 'quality-documentation',
      },
      {
        id: 'faq-19',
        number: '19',
        question: 'What product specifications and documents can I request?',
        answer:
          'Relevant product specifications and documentation can be discussed depending on the product and requirement, such as specification sheets, COA, or other applicable documents where agreed.',
        category: 'quality-documentation',
        isHomepageFeatured: true,
      },
      {
        id: 'faq-20',
        number: '20',
        question: 'Can I provide my own product specifications?',
        answer:
          'Yes. We welcome customer-provided specification dossiers, which our technical and sourcing team will evaluate against manufacturing feasibility.',
        category: 'quality-documentation',
      },
      {
        id: 'faq-21',
        number: '21',
        question: 'Can additional documentation be requested for procurement or export requirements?',
        answer:
          'Applicable trade and regulatory documents, such as commercial invoices, packing lists, and export declarations, can be coordinated based on destination and requirement.',
        category: 'quality-documentation',
      },
      {
        id: 'faq-22',
        number: '22',
        question: 'Can documentation be discussed before placing an order?',
        answer:
          'Yes. We encourage discussing all documentation, compliance, and specification expectations in advance to ensure full alignment prior to order confirmation.',
        category: 'quality-documentation',
      },
      {
        id: 'faq-23',
        number: '23',
        question: 'Can product documentation vary between products?',
        answer:
          'Yes. Documentation parameters vary depending on the product nature (raw herbs, whole powders, extracts, oils), application, and destination regulatory requirements.',
        category: 'quality-documentation',
      },
    ],
  },
  {
    id: 'packaging',
    name: 'Packaging',
    description: 'Bulk packaging, container options, and private labelling pack configurations.',
    icon: '📦',
    items: [
      {
        id: 'faq-24',
        number: '24',
        question: 'What packaging options are available?',
        answer:
          'Packaging options can be discussed based on the product type, quantity, storage requirements, and commercial or bulk shipping preferences.',
        category: 'packaging',
      },
      {
        id: 'faq-25',
        number: '25',
        question: 'Can packaging be customized?',
        answer:
          'Packaging customization, including specific bag types, drums, cartons, or private labelling specifications, can be discussed depending on order volume and feasibility.',
        category: 'packaging',
      },
      {
        id: 'faq-26',
        number: '26',
        question: 'Can I specify the required pack size?',
        answer:
          'Yes. Pack size preferences (such as bulk bags, intermediate containers, or retail unit packaging) can be evaluated during the requirement discussion.',
        category: 'packaging',
      },
      {
        id: 'faq-27',
        number: '27',
        question: 'Can bulk products be supplied in commercial packaging?',
        answer:
          'Yes. Bulk ingredients can be packed in commercial-grade, moisture-resistant industrial packaging appropriate for transport and handling.',
        category: 'packaging',
      },
    ],
  },
  {
    id: 'shipping-dispatch',
    name: 'Shipping & Dispatch',
    description: 'Domestic transport, freight handling, and dispatch logistics coordination.',
    icon: '🚚',
    items: [
      {
        id: 'faq-28',
        number: '28',
        question: 'How are orders shipped?',
        answer:
          'Shipping and dispatch arrangements depend on order volume, destination, product stability, transit mode (air/sea/surface), and agreed commercial terms.',
        category: 'shipping-dispatch',
      },
      {
        id: 'faq-29',
        number: '29',
        question: 'Do you arrange domestic shipping?',
        answer:
          'Yes. Domestic dispatches across India can be coordinated through appropriate surface or express logistics channels depending on the order requirement.',
        category: 'shipping-dispatch',
      },
      {
        id: 'faq-30',
        number: '30',
        question: 'Do you assist with shipping and export requirements?',
        answer:
          'Shipping and dispatch arrangements can be discussed according to the order, destination, quantity and applicable requirements. For international enquiries, export and shipping requirements can be coordinated as part of the fulfilment process.',
        category: 'shipping-dispatch',
        isHomepageFeatured: true,
      },
      {
        id: 'faq-31',
        number: '31',
        question: 'Can I specify my preferred shipping or freight partner?',
        answer:
          'Where practical, customer-preferred shipping or freight arrangements can be discussed and accommodated with our dispatch team.',
        category: 'shipping-dispatch',
      },
      {
        id: 'faq-32',
        number: '32',
        question: 'Which shipping partners do you use?',
        answer:
          'Shipping arrangements may vary depending on the destination, shipment type and requirement. Our team can discuss the appropriate shipping or freight arrangement for your order.',
        category: 'shipping-dispatch',
      },
      {
        id: 'faq-33',
        number: '33',
        question: 'Can you coordinate freight for export orders?',
        answer:
          'Freight coordination (air freight or sea cargo) can be arranged and discussed as part of the commercial export agreement.',
        category: 'shipping-dispatch',
      },
      {
        id: 'faq-34',
        number: '34',
        question: 'Can I arrange my own freight forwarder?',
        answer:
          'If required, customer-arranged freight forwarders or nominated logistics pick-up arrangements can be discussed depending on the order and destination.',
        category: 'shipping-dispatch',
      },
    ],
  },
  {
    id: 'export-requirements',
    name: 'Export Requirements',
    description: 'International enquiries, destination clearance considerations, and freight terms.',
    icon: '🌐',
    items: [
      {
        id: 'faq-35',
        number: '35',
        question: 'Do you accept international enquiries?',
        answer:
          'Yes. We welcome international enquiries for raw botanicals, standardized extracts, essential & carrier oils, and finished formulations from global buyers.',
        category: 'export-requirements',
      },
      {
        id: 'faq-36',
        number: '36',
        question: 'What information is required for an export enquiry?',
        answer:
          'Please provide the product name, target specification, required quantity, destination port/country, preferred Incoterm, packaging requirements, and any mandatory destination documentation.',
        category: 'export-requirements',
      },
      {
        id: 'faq-37',
        number: '37',
        question: 'Can export documentation requirements be discussed before ordering?',
        answer:
          'Yes. All export documentation requirements, shipping marks, and clearance documents can be reviewed and agreed upon during pre-order discussions.',
        category: 'export-requirements',
      },
      {
        id: 'faq-38',
        number: '38',
        question: 'Does shipping cost depend on destination and quantity?',
        answer:
          'Yes. Freight and handling costs depend directly on consignment weight, volumetric dimensions, destination port, transit speed, and mode of transport.',
        category: 'export-requirements',
      },
      {
        id: 'faq-39',
        number: '39',
        question: 'Are customs and import requirements the responsibility of the buyer?',
        answer:
          'Import, customs and destination-country requirements can vary. Buyers should confirm applicable requirements for their destination, while Yami Naturals can discuss the documentation and fulfilment information relevant to the order.',
        category: 'export-requirements',
      },
    ],
  },
  {
    id: 'orders-fulfilment',
    name: 'Orders & Fulfilment',
    description: 'Enquiry reviews, quotation milestones, and order dispatch workflow.',
    icon: '📑',
    items: [
      {
        id: 'faq-40',
        number: '40',
        question: 'What happens after I submit an enquiry?',
        answer:
          'Our sourcing desk reviews your submitted requirement, evaluates specification feasibility, confirms availability, and contacts you to discuss pricing, lead times, and terms.',
        category: 'orders-fulfilment',
      },
      {
        id: 'faq-41',
        number: '41',
        question: 'How is a product requirement reviewed?',
        answer:
          'Requirements are assessed based on botanical availability, processing feasibility, volume requirements, target parameters, and required delivery timeline.',
        category: 'orders-fulfilment',
      },
      {
        id: 'faq-42',
        number: '42',
        question: 'Can specifications be discussed before confirming an order?',
        answer:
          'Yes. Detailed technical discussions and specification alignment take place prior to issuing any formal quotation or order confirmation.',
        category: 'orders-fulfilment',
      },
      {
        id: 'faq-43',
        number: '43',
        question: 'How is quantity finalized?',
        answer:
          'Quantities are finalized based on your procurement volume, batch size considerations, and packaging configurations during commercial discussions.',
        category: 'orders-fulfilment',
      },
      {
        id: 'faq-44',
        number: '44',
        question: 'How are packaging and dispatch requirements confirmed?',
        answer:
          'Packaging specs, labelling instructions, shipping marks, and dispatch timelines are documented and mutually confirmed prior to order dispatch.',
        category: 'orders-fulfilment',
      },
      {
        id: 'faq-45',
        number: '45',
        question: 'When is an order considered ready for dispatch?',
        answer:
          'An order is prepared for dispatch once production and packaging are completed, internal quality checks are verified, and agreed commercial terms are fulfilled.',
        category: 'orders-fulfilment',
      },
    ],
  },
  {
    id: 'payments-commercial',
    name: 'Payments & Commercial Terms',
    description: 'Commercial discussions, tailored quotations, and volume pricing structures.',
    icon: '💳',
    items: [
      {
        id: 'faq-46',
        number: '46',
        question: 'How do I place an order?',
        answer:
          'You can initiate an order by submitting your requirement through our website or contacting our sourcing desk directly with your product specifications.',
        category: 'payments-commercial',
      },
      {
        id: 'faq-47',
        number: '47',
        question: 'How are commercial terms discussed?',
        answer:
          'Commercial terms, payment structure, and order milestones are discussed directly between our sales desk and your procurement team based on the order scope.',
        category: 'payments-commercial',
      },
      {
        id: 'faq-48',
        number: '48',
        question: 'Do you provide quotations for bulk requirements?',
        answer:
          'Yes. Formal commercial quotations are provided based on the evaluated product specifications, quantity, packaging, and delivery terms.',
        category: 'payments-commercial',
      },
      {
        id: 'faq-49',
        number: '49',
        question: 'Can I request a quotation based on my specification?',
        answer:
          'Yes. Submit your detailed specification dossier or custom requirement sheet to receive a tailored quotation.',
        category: 'payments-commercial',
      },
      {
        id: 'faq-50',
        number: '50',
        question: 'Do prices vary according to quantity and specification?',
        answer:
          'Yes. Commercial pricing varies based on raw material market rates, specification complexity, extraction ratios, customized processing, and order volume.',
        category: 'payments-commercial',
      },
    ],
  },
  {
    id: 'general',
    name: 'General',
    description: 'Account inquiries, sourcing platform scope, and direct consultation channels.',
    icon: 'ℹ️',
    items: [
      {
        id: 'faq-51',
        number: '51',
        question: 'Do I need an account to submit an enquiry?',
        answer:
          'No. You can submit requirements and explore our product catalog freely without creating an account or logging in.',
        category: 'general',
      },
      {
        id: 'faq-52',
        number: '52',
        question: 'Is Yami Naturals an online store?',
        answer:
          'Yami Naturals operates as a B2B and customized sourcing platform. We handle requirements through direct quotation and consultation rather than instant checkout.',
        category: 'general',
      },
      {
        id: 'faq-53',
        number: '53',
        question: 'How can I contact the Yami Naturals team?',
        answer:
          'You can reach us through our Submit Requirement form, Contact page, direct email, phone, or our WhatsApp communication desk.',
        category: 'general',
      },
      {
        id: 'faq-54',
        number: '54',
        question: 'Can I submit a detailed specification sheet?',
        answer:
          'Yes. You can paste detailed technical parameters, assay requirements, mesh sizes, or upload specification notes directly via our requirement form.',
        category: 'general',
      },
      {
        id: 'faq-55',
        number: '55',
        question: 'What happens if I cannot find the exact product I need?',
        answer:
          'If a specific botanical, herbal extract, or custom blend is not featured on our website, submit an enquiry—our sourcing network regularly handles custom procurement.',
        category: 'general',
      },
    ],
  },
];

/**
 * Flattened list of all 55 FAQ items across all categories (for indexing, search, and full schema)
 */
export const allFaqItems: FAQItemData[] = allFaqCategories.flatMap((cat) => cat.items);

/**
 * Exactly the BEST 6 Homepage FAQs covering real customer procurement concerns
 */
export const homepageFaqItems: FAQItemData[] = [
  {
    id: 'faq-01',
    number: '01',
    question: 'What products does Yami Naturals manufacture and supply?',
    answer:
      'Yami Naturals manufactures and supplies herbal and natural products and raw ingredients across key botanical categories, including herbal powders, standardized herbal extracts, natural carrier oils, cosmetic clay powders, nutraceutical ingredients and capsules, depending on the requirement.',
    category: 'products-requirements',
    isHomepageFeatured: true,
  },
  {
    id: 'faq-03',
    number: '02',
    question: 'Can you handle bulk or customized product requirements?',
    answer:
      'Yes. Bulk and customized product requirements can be discussed based on the specific botanical, target specification, volume, intended application, and applicable processing parameters.',
    category: 'products-requirements',
    isHomepageFeatured: true,
  },
  {
    id: 'faq-19',
    number: '03',
    question: 'What product specifications and documents can I request?',
    answer:
      'Relevant product specifications and documentation can be discussed depending on the product and requirement, such as specification sheets, COA, or other applicable documents where agreed.',
    category: 'quality-documentation',
    isHomepageFeatured: true,
  },
  {
    id: 'faq-13',
    number: '04',
    question: 'Can I get batch-related information for my order?',
    answer:
      'Yes. Batch-related information and applicable production/product documentation can be discussed for the relevant order and product.',
    category: 'production-batches',
    isHomepageFeatured: true,
  },
  {
    id: 'faq-08',
    number: '05',
    question: 'Can I request a sample before placing a bulk order?',
    answer:
      'Sample availability can be discussed depending on the product, requirement, quantity, and application to facilitate preliminary evaluation.',
    category: 'samples-evaluation',
    isHomepageFeatured: true,
  },
  {
    id: 'faq-30',
    number: '06',
    question: 'Do you assist with shipping and export requirements?',
    answer:
      'Shipping and dispatch arrangements can be discussed according to the order, destination, quantity and applicable requirements. For international enquiries, export and shipping requirements can be coordinated as part of the fulfilment process.',
    category: 'shipping-dispatch',
    isHomepageFeatured: true,
  },
];

/**
 * Homepage FAQ Section Configuration
 */
export const faqSectionContent: FAQSectionContent = {
  eyebrow: 'FAQ',
  heading: 'Questions Before',
  headingEmphasis: 'You Start?',
  supportingText:
    'Find practical answers about products, specifications, documentation, production, packaging, shipping and fulfilment.',
  items: homepageFaqItems,
  cta: {
    heading: 'Still Have Questions?',
    text: 'Explore our complete FAQ section for more information about products, specifications, documentation, production, packaging, shipping and fulfilment.',
    buttonText: 'View All FAQs →',
    buttonLink: '/faq',
    secondaryText: 'Submit Your Requirement →',
    secondaryLink: '/submit-requirement',
  },
};
