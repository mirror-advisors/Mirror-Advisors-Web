'use server';

export interface ContactSubmission {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  size?: string;
  services: string[];
  message: string;
  timeline?: string;
}

export async function submitContact(data: ContactSubmission): Promise<{ ok: boolean; error?: string }> {
  if (!data.firstName?.trim()) return { ok: false, error: 'First name is required.' };
  if (!data.lastName?.trim()) return { ok: false, error: 'Last name is required.' };
  if (!data.email?.trim()) return { ok: false, error: 'Email is required.' };
  if (!data.message?.trim()) return { ok: false, error: 'Message is required.' };

  // TODO: replace this with a real persistence target — Resend/Postmark email,
  // a database write, or a Zoho CRM API call. The legacy site pushed into a
  // window._SUBMISSIONS array surfaced by the admin panel.
  // For now we log server-side so the form has a working endpoint.
  console.log('[contact submission]', {
    ...data,
    submittedAt: new Date().toISOString(),
  });

  return { ok: true };
}
