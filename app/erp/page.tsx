import { ServiceDetail } from '@/components/ServiceDetail';

export const metadata = { title: 'ERP Projects — Mirror Advisors' };

export default function ErpPage() {
  return (
    <ServiceDetail
      tag="ERP Projects"
      color="#6B9FD4"
      bg="rgba(107,159,212,.09)"
      bd="rgba(107,159,212,.2)"
      h1Lead="Enterprise Builds"
      h1Accent="That Actually Go Live."
      lead="Full-lifecycle ERP project delivery with defined milestones, a dedicated team, and a go-live commitment. For complex, multi-phase Zoho One deployments that demand serious architectural thinking."
      meta={{ timeline: '3-18 months', pricing: 'Project-Based', startsWith: 'Scope' }}
      stats={[
        { value: '40+', label: 'ERP Deployments Delivered' },
        { value: '12M+', label: 'Records Migrated' },
        { value: '98%', label: 'On-Time Delivery Rate' },
      ]}
      featuresLead="Everything You Need."
      features={[
        {
          title: 'Architecture Design',
          desc: 'We map your entire data model before touching the platform. No guesswork, no rebuilds.',
        },
        {
          title: 'Multi-Entity Deployment',
          desc: 'Single or multi-entity — we handle consolidation, inter-company transactions, and shared workflows.',
        },
        {
          title: 'Data Migration',
          desc: 'We extract, clean, transform, and load your historical data with full verification and zero loss.',
        },
        {
          title: 'Training & Hypercare',
          desc: 'User training, documentation, and a dedicated hypercare window so your team hits the ground running.',
        },
      ]}
      phases={[
        { step: 1, title: 'Scope & Blueprint', desc: 'Systems audit, data model, architecture doc' },
        { step: 2, title: 'Configuration', desc: 'Platform build, workflows, automations' },
        { step: 3, title: 'Migration', desc: 'Data extract, transform, clean, load' },
        { step: 4, title: 'UAT', desc: 'User acceptance testing, bug fixes, sign-off' },
        { step: 5, title: 'Go-Live', desc: 'Cutover, hypercare, training, documentation' },
      ]}
      ctaTitle="Ready to Start Your ERP Project?"
      ctaDesc="Every project starts with Scope. Book a call and we will walk you through exactly what your deployment would look like."
    />
  );
}
