export type CaseCategory =
  | 'AI Integration'
  | 'ERP Deployment'
  | 'Systems Integration'
  | 'AI + Analytics'
  | 'Consulting';

export interface CaseStudy {
  slug: string;
  cat: CaseCategory;
  tc: string;
  tt: string;
  glyph: string;
  gc: string;
  title: string;
  desc: string;
  m1: string;
  ml1: string;
  m2: string;
  ml2: string;
  problem: string;
  solution: string;
  results: string;
}

export const CATEGORY_COLORS: Record<CaseCategory, { tc: string; tt: string; gc: string }> = {
  'AI Integration': { tc: 'rgba(236,169,52,.12)', tt: '#ECA934', gc: 'rgba(236,169,52,.08)' },
  'ERP Deployment': { tc: 'rgba(107,159,212,.12)', tt: '#6B9FD4', gc: 'rgba(107,159,212,.07)' },
  'Systems Integration': { tc: 'rgba(139,159,212,.12)', tt: '#8B9FD4', gc: 'rgba(139,159,212,.07)' },
  'AI + Analytics': { tc: 'rgba(236,169,52,.12)', tt: '#ECA934', gc: 'rgba(236,169,52,.07)' },
  Consulting: { tc: 'rgba(107,159,212,.12)', tt: '#6B9FD4', gc: 'rgba(107,159,212,.06)' },
};

export const CASES: CaseStudy[] = [
  {
    slug: 'claude-sales-agent',
    cat: 'AI Integration',
    tc: 'rgba(236,169,52,.12)',
    tt: '#ECA934',
    glyph: 'AI',
    gc: 'rgba(236,169,52,.08)',
    title: 'Claude sales agent cuts response time 84%',
    desc: 'Built a conversational AI layer on Zoho CRM for a B2B SaaS company. Leads qualified, briefed, and followed up — no human required.',
    m1: '84%',
    ml1: 'Faster Response',
    m2: '3x',
    ml2: 'Pipeline Handled',
    problem:
      'A fast-growing B2B SaaS company had their sales team manually qualifying every inbound lead, taking up to 4 hours per rep per day. Response times were inconsistent and leads were slipping through.',
    solution:
      'We built a Claude AI agent embedded directly in Zoho CRM. Every inbound lead gets automatically scored, briefed, and followed up with a personalised message within minutes of submission.',
    results:
      'Average response time dropped 84% within 90 days. The team now handles 3x the pipeline with the same headcount, focusing entirely on qualified opportunities rather than inbox triage.',
  },
  {
    slug: 'zoho-one-pe-subsidiaries',
    cat: 'ERP Deployment',
    tc: 'rgba(107,159,212,.12)',
    tt: '#6B9FD4',
    glyph: 'ERP',
    gc: 'rgba(107,159,212,.07)',
    title: 'Zoho One across 7 PE subsidiaries — zero data loss',
    desc: 'Replaced three legacy ERPs for a private equity portfolio company. 6-month phased rollout with full data integrity.',
    m1: '7',
    ml1: 'Entities',
    m2: '$180k',
    ml2: 'Annual Saving',
    problem:
      'A private equity firm managing seven portfolio companies was running three different legacy ERPs. Cross-entity reporting was impossible and month-end close took three weeks.',
    solution:
      'We ran a full Scope engagement to map all seven entities, then designed a unified Zoho One architecture. A phased 6-month rollout migrated each subsidiary in sequence with zero data loss.',
    results:
      'All seven entities now operate on a single platform. Month-end close went from three weeks to four days. Cross-entity P&L reports that previously took a week now generate automatically every morning.',
  },
  {
    slug: 'shopify-zoho-3pl-sync',
    cat: 'Systems Integration',
    tc: 'rgba(139,159,212,.12)',
    tt: '#8B9FD4',
    glyph: 'INT',
    gc: 'rgba(139,159,212,.07)',
    title: 'Shopify ↔ Zoho ↔ 3PL real-time sync',
    desc: 'Bidirectional integration across e-commerce, ERP, and logistics. Inventory, orders, and finance in one live flow.',
    m1: '99.7%',
    ml1: 'Uptime SLA',
    m2: '<200ms',
    ml2: 'Avg Latency',
    problem:
      'An e-commerce brand had no real-time inventory visibility. Oversells were constant, 3PL fulfilment was delayed by manual CSV exports, and finance could not reconcile orders with actual stock.',
    solution:
      'We built a bidirectional sync engine connecting Shopify, Zoho Inventory, and the 3PL via webhooks and Zoho Flow. Every order, stock movement, and fulfilment update reflects across all three systems in real time.',
    results:
      'Oversells dropped to zero in the first month. The 3PL now receives automated pick lists within seconds of order placement. Stock accuracy reached 99.7%.',
  },
  {
    slug: 'ai-forecasting-dashboard',
    cat: 'AI + Analytics',
    tc: 'rgba(236,169,52,.12)',
    tt: '#ECA934',
    glyph: 'ML',
    gc: 'rgba(236,169,52,.07)',
    title: 'AI forecasting dashboard cuts overstock 31%',
    desc: 'Custom ML pipeline pulling from Zoho Books and Inventory into a live demand forecasting tool.',
    m1: '31%',
    ml1: 'Less Overstock',
    m2: '$220k',
    ml2: 'Recovered Value',
    problem:
      'A product distributor was overstocking by an average of 31% across their catalogue. Demand planning was done in spreadsheets and they were carrying over $220k in recoverable excess inventory.',
    solution:
      'We built a custom ML forecasting pipeline pulling historical sales and seasonality from Zoho Books and Inventory. The output is a live demand forecast dashboard with colour-coded reorder recommendations.',
    results:
      'Overstock reduced by 31% in the first quarter. The $220k in excess inventory has been progressively liquidated. Purchase orders are now generated automatically, saving the buying team 8 hours per week.',
  },
  {
    slug: 'tech-audit-savings',
    cat: 'Consulting',
    tc: 'rgba(107,159,212,.12)',
    tt: '#6B9FD4',
    glyph: 'SC',
    gc: 'rgba(107,159,212,.06)',
    title: '90-day tech audit reveals $400k in savings',
    desc: 'Scope engagement for a mid-market firm. 14 automation opportunities identified; all 14 shipped within 12 months.',
    m1: '$400k',
    ml1: 'Savings Found',
    m2: '14',
    ml2: 'Automations Built',
    problem:
      'A mid-market professional services firm knew they were leaving efficiency on the table but had no clear picture of where. They needed an independent audit before committing to any technology investment.',
    solution:
      'A 90-day Scope engagement covering all systems, processes, and vendor contracts. We interviewed every department head, mapped all data flows, and identified 14 concrete automation opportunities with individual ROI estimates.',
    results:
      '$400k in potential annual savings identified. All 14 automation opportunities were subsequently implemented within 12 months.',
  },
  {
    slug: 'ai-contract-assistant',
    cat: 'AI Integration',
    tc: 'rgba(236,169,52,.12)',
    tt: '#ECA934',
    glyph: 'AI',
    gc: 'rgba(236,169,52,.06)',
    title: 'AI contract assistant — 60% less legal review',
    desc: 'Claude agent trained on contract templates. Drafts, reviews, and flags compliance issues inside Zoho Sign.',
    m1: '60%',
    ml1: 'Review Time Cut',
    m2: '2 wks',
    ml2: 'Build Time',
    problem:
      'A legal team was spending an average of 4 hours per contract on manual review. Their Zoho CRM was closing deals but the contract workflow was entirely manual.',
    solution:
      'We built a Claude AI agent trained on the company contract library. Contracts drafted in CRM are automatically reviewed, annotated with risk flags, and routed for approval inside Zoho Sign.',
    results:
      'Legal review time dropped by 60%. The average contract-to-signature cycle went from 11 days to under 3 days.',
  },
  {
    slug: 'manufacturing-legacy-migration',
    cat: 'ERP Deployment',
    tc: 'rgba(107,159,212,.12)',
    tt: '#6B9FD4',
    glyph: 'ERP',
    gc: 'rgba(107,159,212,.06)',
    title: 'Manufacturing firm migrates from legacy ERP',
    desc: 'Full data extraction, cleansing, and migration from a 12-year-old on-premise ERP into Zoho One with zero downtime.',
    m1: '1.4M',
    ml1: 'Records Migrated',
    m2: '0',
    ml2: 'Downtime Hours',
    problem:
      'A manufacturer with 14 years of data in a legacy on-premise ERP needed to migrate to Zoho One without stopping production.',
    solution:
      'We extracted all 1.4 million records from the legacy system, ran a full data cleansing and transformation process, and loaded into Zoho One over a single weekend cutover. Production did not stop for a single hour.',
    results:
      '1.4 million records migrated with zero loss and zero downtime. Within 60 days, the operations team reported a 40% reduction in order processing time and full real-time inventory visibility.',
  },
  {
    slug: 'hubspot-zoho-desk-slack',
    cat: 'Systems Integration',
    tc: 'rgba(139,159,212,.12)',
    tt: '#8B9FD4',
    glyph: 'INT',
    gc: 'rgba(139,159,212,.06)',
    title: 'HubSpot ↔ Zoho Desk ↔ Slack support pipeline',
    desc: 'Unified support flow where HubSpot contacts auto-create tickets that escalate to Slack on SLA breach.',
    m1: '68%',
    ml1: 'Faster Resolution',
    m2: '100%',
    ml2: 'SLA Compliance',
    problem:
      'A SaaS company support operation was fragmented. HubSpot held customer data, Zoho Desk handled tickets, and escalations happened over email with no SLA tracking.',
    solution:
      'We built a three-way integration connecting HubSpot, Zoho Desk, and Slack via webhooks. HubSpot contacts auto-create Desk tickets with full context. SLA breaches trigger Slack escalations automatically.',
    results:
      'Resolution time improved 68% in the first month. SLA compliance reached 100% up from an estimated 61%. The support manager now has a live dashboard showing every open ticket and its SLA status.',
  },
  {
    slug: 'real-estate-reporting',
    cat: 'Consulting',
    tc: 'rgba(107,159,212,.12)',
    tt: '#6B9FD4',
    glyph: 'SC',
    gc: 'rgba(107,159,212,.06)',
    title: 'Real estate firm cuts reporting from 3 days to 4 hours',
    desc: 'Custom Zoho Analytics dashboards replacing 3 days of manual spreadsheet consolidation each month.',
    m1: '18x',
    ml1: 'Faster Reports',
    m2: '3 days',
    ml2: 'Time Reclaimed/mo',
    problem:
      'A real estate investment firm finance team was spending three full days each month consolidating spreadsheets to produce a single management report.',
    solution:
      'We built a suite of Zoho Analytics dashboards connected directly to Books, CRM, and Projects. Reports now refresh automatically and are emailed to leadership every Monday morning.',
    results:
      'Reporting time dropped from 3 days to 4 hours, an 18x improvement. The finance team reclaimed over 3 working days per month. The monthly board pack is now produced in under an hour.',
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}
