export interface ChatChoice {
  label: string;
  nodeId: string;
}

export interface ChatTopic {
  id: string;
  label: string;
  answer: string;
  choices: ChatChoice[];
}

export interface ChatNode {
  answer: string;
  choices: ChatChoice[];
}

export interface ChatTree {
  opening: string;
  fallback: string;
  topics: ChatTopic[];
  nodes: Record<string, ChatNode>;
}

export const CHAT_TREE: ChatTree = {
  opening: "Hi! I'm the Mirror Advisors assistant. What would you like to know?",
  fallback:
    'Looks like you might need a more specific answer. The best next step is a quick call — no commitment, just a conversation.',
  topics: [
    {
      id: 'services',
      label: 'Our Services',
      answer:
        'Mirror Advisors offers four engagement models — all starting with Scope. Which one would you like to know about?',
      choices: [
        { label: 'What is Scope?', nodeId: 'scope' },
        { label: 'ERP Projects', nodeId: 'erp' },
        { label: 'Infinity Mirror', nodeId: 'infinity' },
        { label: 'Bank of Hours', nodeId: 'bankhours' },
        { label: 'Support Only', nodeId: 'support' },
        { label: 'Which is right for me?', nodeId: 'recommend' },
      ],
    },
    {
      id: 'casestudies',
      label: 'Case Studies',
      answer: "We've delivered across multiple categories. Which type of results are you interested in?",
      choices: [
        { label: 'AI Integration results', nodeId: 'cs_ai' },
        { label: 'ERP Deployment results', nodeId: 'cs_erp' },
        { label: 'Systems Integration results', nodeId: 'cs_sys' },
        { label: 'Consulting results', nodeId: 'cs_consulting' },
      ],
    },
    {
      id: 'howitworks',
      label: 'How It Works',
      answer: 'Every Mirror Advisors engagement follows a clear process. What would you like to know?',
      choices: [
        { label: 'How does an engagement start?', nodeId: 'hw_start' },
        { label: 'What is the Scope process?', nodeId: 'hw_scope' },
        { label: 'How long does a project take?', nodeId: 'hw_timeline' },
        { label: 'Do you work with small businesses?', nodeId: 'hw_size' },
        { label: 'What happens after the project?', nodeId: 'hw_after' },
      ],
    },
    {
      id: 'technology',
      label: 'The Technology',
      answer:
        'We build on two core platforms — Zoho One and Anthropic Claude AI. What would you like to know?',
      choices: [
        { label: 'What is Zoho One?', nodeId: 'tech_zoho' },
        { label: 'What is Claude AI?', nodeId: 'tech_claude' },
        { label: 'Which Zoho apps do you deploy?', nodeId: 'tech_apps' },
        { label: 'Can you integrate existing tools?', nodeId: 'tech_integrate' },
      ],
    },
    {
      id: 'pricing',
      label: 'Pricing & Engagement',
      answer: 'Our pricing depends on the engagement model. What would you like to know?',
      choices: [
        { label: 'How much does Scope cost?', nodeId: 'price_scope' },
        { label: 'How is Infinity Mirror priced?', nodeId: 'price_infinity' },
        { label: 'What is Bank of Hours?', nodeId: 'price_boh' },
        { label: 'Is there a minimum commitment?', nodeId: 'price_min' },
      ],
    },
  ],
  nodes: {
    scope: {
      answer:
        'Scope is a fixed-fee discovery engagement. We audit your systems, interview stakeholders, map your business logic, and deliver a comprehensive technical blueprint — before a single line of code is written. Every Mirror Advisors engagement starts here, no exceptions.',
      choices: [],
    },
    erp: {
      answer:
        'ERP Projects is our full-lifecycle Zoho One deployment service. We handle architecture design, configuration, data migration, UAT, and go-live. Projects typically run 3–18 months depending on complexity.',
      choices: [],
    },
    infinity: {
      answer:
        'Infinity Mirror is a continuous development retainer. Monthly billing, rolling priorities, no SOW friction. We become your embedded technology team — building, iterating, and scaling at the exact pace your business demands. Cancel anytime with 30 days notice.',
      choices: [],
    },
    bankhours: {
      answer:
        'Bank of Hours lets you pre-purchase a block of senior development hours at a locked rate. Hours never expire. No project plan needed — brief us on the task, we size it in hours, you approve, we build.',
      choices: [],
    },
    support: {
      answer:
        'Support Only is a dedicated SLA for systems already live. We provide proactive monitoring, bug fixes, minor enhancements, and guaranteed response times based on issue severity.',
      choices: [],
    },
    recommend: {
      answer: 'Let me help narrow it down. Are you starting fresh or do you already have systems in place?',
      choices: [
        { label: 'Starting fresh — no systems yet', nodeId: 'rec_fresh' },
        { label: 'Have systems, need improvement', nodeId: 'rec_existing' },
        { label: 'Already live, need ongoing support', nodeId: 'rec_live' },
      ],
    },
    rec_fresh: {
      answer:
        "If you're starting fresh, the best path is Scope first — then ERP Projects to build out your full Zoho One stack. Scope will give you a blueprint before any money is spent on development.",
      choices: [],
    },
    rec_existing: {
      answer:
        'If you have systems in place, start with Scope to audit what you have. Then either Infinity Mirror (if you want continuous improvement) or Bank of Hours (if you have specific tasks to execute).',
      choices: [],
    },
    rec_live: {
      answer:
        'If your systems are live and you need ongoing peace of mind, Support Only is designed exactly for that — SLA-backed monitoring, bug fixes, and minor enhancements as a monthly retainer.',
      choices: [],
    },
    cs_ai: {
      answer:
        'AI Integration highlights: A Claude sales agent cut response time 84% for a B2B SaaS company. An AI contract assistant reduced legal review time by 60%. An AI forecasting dashboard cut overstock by 31%.',
      choices: [],
    },
    cs_erp: {
      answer:
        'ERP Deployment highlights: Zoho One deployed across 7 PE subsidiaries with zero data loss. A manufacturer migrated 1.4 million records from a legacy ERP with zero downtime.',
      choices: [],
    },
    cs_sys: {
      answer:
        'Systems Integration highlights: A Shopify ↔ Zoho ↔ 3PL real-time sync achieved 99.7% uptime. A HubSpot ↔ Zoho Desk ↔ Slack pipeline improved resolution time by 68%.',
      choices: [],
    },
    cs_consulting: {
      answer:
        'Consulting highlights: A 90-day tech audit revealed $400k in savings with 14 automation opportunities, all implemented within 12 months. A real estate firm cut reporting time from 3 days to 4 hours.',
      choices: [],
    },
    hw_start: {
      answer:
        "Every engagement starts with a Strategy Session — a 30-minute call where we ask about your goals, your current stack, and what's not working. From there we scope the work and recommend an engagement model.",
      choices: [],
    },
    hw_scope: {
      answer:
        "The Scope engagement includes: a systems audit, stakeholder interviews, business logic mapping, and a comprehensive technical blueprint. It's fixed-fee and typically completed within 4–6 weeks.",
      choices: [],
    },
    hw_timeline: {
      answer:
        'Scope takes 4–6 weeks. ERP Projects run 3–18 months. Infinity Mirror is ongoing (month-to-month). Bank of Hours tasks are sized individually. Support Only is a continuous retainer.',
      choices: [],
    },
    hw_size: {
      answer:
        'Yes — we work with businesses from 10 to 500+ employees. Our sweet spot is growth-stage companies (20–200 people) that have outgrown spreadsheets but don\'t need enterprise-scale complexity.',
      choices: [],
    },
    hw_after: {
      answer:
        "After a project, you can move to Support Only for ongoing maintenance, Infinity Mirror for continuous development, or Bank of Hours for ad-hoc improvements. You're never locked in.",
      choices: [],
    },
    tech_zoho: {
      answer:
        'Zoho One is a unified business operating system — 40+ integrated apps covering CRM, accounting, analytics, HR, projects, inventory, and more. We deploy, configure, and extend it with custom AI and integrations.',
      choices: [],
    },
    tech_claude: {
      answer:
        "Claude is Anthropic's AI platform. We build custom Claude agents that connect directly to your Zoho apps — handling lead qualification, contract review, demand forecasting, document processing, and more.",
      choices: [],
    },
    tech_apps: {
      answer:
        'We deploy all 12 core Zoho apps: CRM, Books, Analytics, Flow, Desk, Sign, Projects, Inventory, People, Recruit, Expense, and Creator. Each is extended with custom AI agents and integrations.',
      choices: [],
    },
    tech_integrate: {
      answer:
        'Yes — we integrate Zoho with virtually any tool that has an API. Common integrations include Shopify, HubSpot, Amazon, Slack, and custom 3PL systems. We also build custom webhooks and middleware.',
      choices: [],
    },
    price_scope: {
      answer:
        "Scope is a fixed fee — the exact amount is scoped on a per-engagement basis depending on complexity. Book a Strategy Session and we'll give you a clear number within 24 hours.",
      choices: [],
    },
    price_infinity: {
      answer:
        "Infinity Mirror is a monthly retainer. The amount depends on the volume of development capacity you need. It's discussed during the Scope engagement and confirmed before any work begins.",
      choices: [],
    },
    price_boh: {
      answer:
        'Bank of Hours is purchased in blocks at a locked hourly rate. The rate is fixed at the time of purchase and never increases. Hours never expire. Blocks start from a minimum number of hours discussed during Scope.',
      choices: [],
    },
    price_min: {
      answer:
        'The only commitment is the Scope engagement to start. After that, ERP Projects have a defined SOW, Infinity Mirror is month-to-month (cancel with 30 days notice), and Bank of Hours has no time commitment at all.',
      choices: [],
    },
  },
};
