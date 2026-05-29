import { ServiceDetail } from '@/components/ServiceDetail';

export const metadata = { title: 'Support Only — Mirror Advisors' };

export default function SupportPage() {
  return (
    <ServiceDetail
      tag="Support Only"
      color="#8B9FD4"
      bg="rgba(139,159,212,.09)"
      bd="rgba(139,159,212,.2)"
      h1Lead="Systems Already Live."
      h1Accent="Now They Just Work."
      lead="Dedicated SLA for systems already in production. Proactive monitoring, bug fixes, minor enhancements, and guaranteed response times based on issue severity — without the build engagement."
      meta={{ timeline: 'Ongoing', pricing: 'SLA-Based', startsWith: 'Scope' }}
      stats={[
        { value: '<1h', label: 'P1 Response SLA' },
        { value: '99.9%', label: 'Uptime Tracked' },
        { value: '24/7', label: 'Critical Coverage' },
      ]}
      featuresLead="Peace of Mind, Productized."
      features={[
        { title: 'Tiered SLAs', desc: 'P1/P2/P3 severity tiers with response and resolution targets in writing.' },
        { title: 'Proactive Monitoring', desc: 'We watch your Zoho stack and AI agents for errors before users hit them.' },
        { title: 'Minor Enhancements', desc: 'Small improvements and configuration changes covered by the retainer.' },
        { title: 'Account Memory', desc: 'The same team that knows your build handles every ticket. No starting over.' },
      ]}
      ctaTitle="Need Reliable Hands on Your Stack?"
      ctaDesc="Support Only is for live systems that need to stay alive. Book a call to scope the SLA."
    />
  );
}
