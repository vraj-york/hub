export type DocumentItem = {
  id: string;
  title: string;
  synopsis: string;
  category: 'Strategy' | 'Operations' | 'Finance' | 'Engineering' | 'Legal' | 'Marketing';
  maturity: 'Draft' | 'Review' | 'Published';
  year: number;
  readTime: string;
  pages: number;
  rating: number;
  tags: string[];
  gradientFrom: string;
  gradientTo: string;
};

export type DocumentRail = {
  id: string;
  title: string;
  subtitle: string;
  documentIds: string[];
};

export const DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-market-outlook',
    title: '2026 Market Outlook',
    synopsis:
      'A forward-looking analysis of demand shifts, pricing sensitivity, and strategic expansion opportunities across regions.',
    category: 'Strategy',
    maturity: 'Published',
    year: 2026,
    readTime: '28 min',
    pages: 42,
    rating: 4.8,
    tags: ['Executive', 'Forecasting'],
    gradientFrom: '#0F172A',
    gradientTo: '#1D4ED8',
  },
  {
    id: 'doc-product-roadmap',
    title: 'Product Roadmap: H2',
    synopsis:
      'Quarterly roadmap priorities, release sequencing, and customer-facing commitments for cross-functional teams.',
    category: 'Operations',
    maturity: 'Review',
    year: 2026,
    readTime: '22 min',
    pages: 35,
    rating: 4.6,
    tags: ['Planning', 'Cross-team'],
    gradientFrom: '#111827',
    gradientTo: '#7C3AED',
  },
  {
    id: 'doc-ai-policy',
    title: 'AI Governance Policy',
    synopsis:
      'Guardrails for responsible AI usage, model approvals, risk controls, and audit requirements.',
    category: 'Legal',
    maturity: 'Published',
    year: 2026,
    readTime: '18 min',
    pages: 26,
    rating: 4.9,
    tags: ['Compliance', 'Risk'],
    gradientFrom: '#111827',
    gradientTo: '#0EA5E9',
  },
  {
    id: 'doc-customer-insights',
    title: 'Customer Insights Playbook',
    synopsis:
      'Repeatable framework for interviews, synthesis, and decision-making using customer evidence.',
    category: 'Marketing',
    maturity: 'Published',
    year: 2025,
    readTime: '20 min',
    pages: 31,
    rating: 4.7,
    tags: ['Research', 'Playbook'],
    gradientFrom: '#1F2937',
    gradientTo: '#EF4444',
  },
  {
    id: 'doc-security-audit',
    title: 'Security Audit Summary',
    synopsis:
      'Findings and remediation timeline from the latest security audit, including critical and medium severity issues.',
    category: 'Engineering',
    maturity: 'Review',
    year: 2026,
    readTime: '16 min',
    pages: 24,
    rating: 4.5,
    tags: ['Security', 'Infrastructure'],
    gradientFrom: '#030712',
    gradientTo: '#0F766E',
  },
  {
    id: 'doc-onboarding',
    title: 'Team Onboarding Handbook',
    synopsis:
      'Core workflows, operating principles, and role expectations for new hires in their first 30 days.',
    category: 'Operations',
    maturity: 'Published',
    year: 2025,
    readTime: '25 min',
    pages: 38,
    rating: 4.4,
    tags: ['People Ops', 'Handbook'],
    gradientFrom: '#172554',
    gradientTo: '#2563EB',
  },
  {
    id: 'doc-design-system',
    title: 'Design System Guidelines',
    synopsis:
      'Tokens, accessibility standards, and component guidance to keep product experiences coherent and scalable.',
    category: 'Engineering',
    maturity: 'Published',
    year: 2026,
    readTime: '30 min',
    pages: 44,
    rating: 4.8,
    tags: ['UI', 'Accessibility'],
    gradientFrom: '#312E81',
    gradientTo: '#F59E0B',
  },
  {
    id: 'doc-eng-okr',
    title: 'Engineering OKR Brief',
    synopsis:
      'Objective-level context, metrics, and quarterly milestones for platform and product engineering.',
    category: 'Engineering',
    maturity: 'Draft',
    year: 2026,
    readTime: '14 min',
    pages: 19,
    rating: 4.2,
    tags: ['OKR', 'Execution'],
    gradientFrom: '#0F172A',
    gradientTo: '#22C55E',
  },
  {
    id: 'doc-sales-kit',
    title: 'Sales Enablement Kit',
    synopsis:
      'Battlecards, objection handling, positioning narratives, and demo storylines for account teams.',
    category: 'Marketing',
    maturity: 'Review',
    year: 2026,
    readTime: '19 min',
    pages: 29,
    rating: 4.3,
    tags: ['Revenue', 'Enablement'],
    gradientFrom: '#1E293B',
    gradientTo: '#D946EF',
  },
  {
    id: 'doc-finance-risk',
    title: 'Quarterly Finance Risk Review',
    synopsis:
      'Cashflow stress scenarios, budget variance analysis, and mitigation recommendations for leadership.',
    category: 'Finance',
    maturity: 'Published',
    year: 2026,
    readTime: '21 min',
    pages: 33,
    rating: 4.7,
    tags: ['Budget', 'Board'],
    gradientFrom: '#052E16',
    gradientTo: '#16A34A',
  },
  {
    id: 'doc-incident-retro',
    title: 'Incident Response Retrospective',
    synopsis:
      'Timeline, root-cause analysis, and reliability actions from the latest production incident.',
    category: 'Engineering',
    maturity: 'Published',
    year: 2025,
    readTime: '12 min',
    pages: 17,
    rating: 4.1,
    tags: ['Postmortem', 'Reliability'],
    gradientFrom: '#1F2937',
    gradientTo: '#F97316',
  },
  {
    id: 'doc-msa-template',
    title: 'Master Services Agreement Template',
    synopsis:
      'Standard legal terms, risk clauses, and fallback language for enterprise contract negotiations.',
    category: 'Legal',
    maturity: 'Published',
    year: 2026,
    readTime: '24 min',
    pages: 40,
    rating: 4.6,
    tags: ['Contracts', 'Template'],
    gradientFrom: '#111827',
    gradientTo: '#DC2626',
  },
];

export const DOCUMENT_RAILS: DocumentRail[] = [
  {
    id: 'trending',
    title: 'Trending Now',
    subtitle: 'Most-opened docs this week',
    documentIds: [
      'doc-market-outlook',
      'doc-ai-policy',
      'doc-design-system',
      'doc-finance-risk',
      'doc-product-roadmap',
      'doc-sales-kit',
    ],
  },
  {
    id: 'continue',
    title: 'Continue Reading',
    subtitle: 'Pick up where you left off',
    documentIds: [
      'doc-product-roadmap',
      'doc-security-audit',
      'doc-eng-okr',
      'doc-customer-insights',
      'doc-onboarding',
    ],
  },
  {
    id: 'team-favorites',
    title: 'Team Favorites',
    subtitle: 'Highly rated by your workspace',
    documentIds: [
      'doc-ai-policy',
      'doc-market-outlook',
      'doc-finance-risk',
      'doc-customer-insights',
      'doc-msa-template',
    ],
  },
  {
    id: 'new-additions',
    title: 'New Additions',
    subtitle: 'Recently published and updated',
    documentIds: [
      'doc-eng-okr',
      'doc-sales-kit',
      'doc-security-audit',
      'doc-incident-retro',
      'doc-design-system',
    ],
  },
];

export const FEATURED_DOCUMENT_ID = 'doc-market-outlook';

export const CONTINUE_READING_PROGRESS: Record<string, number> = {
  'doc-product-roadmap': 62,
  'doc-security-audit': 35,
  'doc-eng-okr': 79,
  'doc-customer-insights': 44,
  'doc-onboarding': 21,
};
