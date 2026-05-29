import { ServiceDetail } from '@/components/ServiceDetail';

export const metadata = { title: 'Bank of Hours — Mirror Advisors' };

export default function BankhoursPage() {
  return (
    <ServiceDetail
      tag="Bank of Hours"
      color="#ffffff"
      bg="rgba(255,255,255,.06)"
      bd="rgba(255,255,255,.18)"
      h1Lead="Senior Development Hours."
      h1Accent="On Demand."
      lead="Pre-purchase a block of senior development hours at a locked rate. Hours never expire. No project plan needed — brief us on the task, we size it in hours, you approve, we build."
      meta={{ timeline: 'Flexible', pricing: 'Prepaid', startsWith: 'Scope' }}
      stats={[
        { value: 'Locked', label: 'Hourly Rate' },
        { value: 'Never', label: 'Hours Expire' },
        { value: '48h', label: 'Avg Spin-Up' },
      ]}
      featuresLead="Brief Us. We Ship."
      features={[
        { title: 'Locked Rate', desc: 'Your rate is fixed at purchase and never goes up while a balance exists.' },
        { title: 'No SOW Required', desc: 'For approved task lists. We size each task, you green-light, we build.' },
        { title: 'Hours Never Expire', desc: 'Banked hours stay banked. Use them next week or next year.' },
        { title: 'Stack Across Disciplines', desc: 'Use your bank for AI, integration, ERP, or consulting work — your call.' },
      ]}
      ctaTitle="Want Development Capacity on Standby?"
      ctaDesc="Buy a block, brief us when something comes up. Book a call to discuss block sizes and rates."
    />
  );
}
