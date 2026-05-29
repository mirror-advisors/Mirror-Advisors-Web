import { ServiceDetail } from '@/components/ServiceDetail';

export const metadata = { title: 'Infinity Mirror — Mirror Advisors' };

export default function InfinityPage() {
  return (
    <ServiceDetail
      tag="Infinity Mirror"
      color="#ECA934"
      bg="rgba(236,169,52,.09)"
      bd="rgba(236,169,52,.2)"
      h1Lead="Your Embedded"
      h1Accent="Technology Team."
      lead="A continuous development partnership. Monthly retainer, rolling priorities, no SOW friction. We become the team your business runs on — building, iterating, and scaling at the exact pace your business demands."
      meta={{ timeline: 'Monthly rolling', pricing: 'Retainer', startsWith: 'Scope' }}
      stats={[
        { value: '30+', label: 'Active Retainers' },
        { value: '$2K', label: 'Starting Monthly' },
        { value: '24h', label: 'Avg Response' },
      ]}
      featuresLead="Everything An In-House Team Does."
      features={[
        { title: 'Rolling Priorities', desc: 'No SOW. Brief us each cycle on what matters, we ship.' },
        { title: 'Dedicated Senior Team', desc: 'The same people every month. They learn your business inside-out.' },
        { title: 'Embedded Slack/Teams', desc: 'We sit in your channels, attend your stand-ups when needed.' },
        { title: 'Cancel Anytime', desc: 'Month-to-month with 30 days notice. No multi-year lock-in.' },
      ]}
      ctaTitle="Want a Team On Tap?"
      ctaDesc="Infinity Mirror gives you senior development capacity without the recruiting cycle. Book a call to discuss fit."
    />
  );
}
