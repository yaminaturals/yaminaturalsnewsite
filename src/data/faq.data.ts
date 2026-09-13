export interface FAQItemData {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export interface FAQSectionContent {
  eyebrow: string;
  heading: string;
  headingEmphasis?: string;
  supportingText: string;
  items: FAQItemData[];
  callout: {
    title: string;
    text: string;
    primaryCta: {
      text: string;
      link: string;
    };
    secondaryCta?: {
      text: string;
      link: string;
    };
  };
}

export const faqSectionContent: FAQSectionContent = {
  eyebrow: 'FAQ',
  heading: 'Questions Before',
  headingEmphasis: 'You Start?',
  supportingText:
    'Here are a few common questions about exploring products and sharing a sourcing requirement with Yami Naturals.',
  items: [
    {
      id: 'faq-01',
      number: '01',
      question: 'What can I enquire about?',
      answer:
        'You can enquire about products and ingredient requirements across the categories presented on the website, including herbal powders, herbal extracts, natural oils, cosmetic clays, nutraceutical ingredients and capsules.',
    },
    {
      id: 'faq-02',
      number: '02',
      question: 'I cannot find the exact product I need. What should I do?',
      answer:
        'Submit your requirement and describe the product, ingredient or formulation you are looking for. A specific requirement can be discussed even when the exact item is not visible in the product catalogue.',
    },
    {
      id: 'faq-03',
      number: '03',
      question: 'What information should I include in my requirement?',
      answer:
        'Include the product or ingredient name, relevant specifications, intended application, quantity or volume requirement where applicable, and any documentation requirements that matter to your enquiry.',
    },
    {
      id: 'faq-04',
      number: '04',
      question: 'Can I submit a detailed specification sheet?',
      answer:
        'Yes. If you have a detailed specification sheet or requirement document, you can include it with your requirement submission.',
    },
    {
      id: 'faq-05',
      number: '05',
      question: 'Do I need to create an account to submit a requirement?',
      answer:
        'No visitor account is required to explore the website or submit a requirement.',
    },
    {
      id: 'faq-06',
      number: '06',
      question: 'Is Yami Naturals an online store?',
      answer:
        'Yami Naturals is primarily an enquiry and sourcing-support website. Products and categories can be explored online, while specific requirements are handled through the enquiry process rather than online checkout.',
    },
    {
      id: 'faq-07',
      number: '07',
      question: 'Can businesses and individual customers use the website?',
      answer:
        'Yes. The website provides separate B2B and B2C pathways so visitors can explore the route most relevant to their requirement.',
    },
    {
      id: 'faq-08',
      number: '08',
      question: 'What happens after I submit my requirement?',
      answer:
        'Your submitted requirement provides the starting point for discussing the product, application, specifications and other details relevant to the sourcing enquiry.',
    },
  ],
  callout: {
    title: 'Still have a specific requirement?',
    text: 'Tell us about the botanical ingredient or formulation you need, and we can discuss the appropriate sourcing path.',
    primaryCta: {
      text: 'Submit Your Requirement',
      link: '/submit-requirement',
    },
    secondaryCta: {
      text: 'Explore Products',
      link: '/products',
    },
  },
};
