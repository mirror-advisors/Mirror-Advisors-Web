// Contact form options. Shared by the form markup (data/pages.js), the
// browser submit handler (lib/site-runtime.js) and the server route
// (pages/api/contact.js) so the three can't drift apart.

// "What are you looking for?" — mirrors the Solutions nav, plus two
// catch-alls. `zoho` is what each choice becomes in the Zoho form's
// MultipleChoice field, which only accepts its own fixed option list
// (htmlRecords rejects anything else). The visitor's real choices are
// always written at the top of the message, so nothing is lost.
// TODO: once the Zoho ContactUs form has these options, make `zoho` 1:1.
export const SOLUTION_OPTIONS = [
  { value: 'AI Custom Solutions',   zoho: ['Custom AI Application'] },
  { value: 'AI on Zoho',            zoho: ['Custom AI Application', 'Zoho implementation'] },
  { value: 'Zoho Implementation',   zoho: ['Zoho implementation'] },
  { value: 'Odoo (coming soon)',    zoho: [] },
  { value: 'Avalara (coming soon)', zoho: [] },
  { value: 'Consulting & Support',  zoho: [] },
  { value: 'Not sure yet',          zoho: [] },
];

// The Zoho form's current MultipleChoice values. Still accepted as-is so
// older callers (the chat widget's lead capture) keep working.
export const ZOHO_SERVICE_VALUES = ['Zoho implementation', 'Custom AI Application'];

// Sent when none of the visitor's choices has a Zoho equivalent, in case
// the Zoho field is mandatory.
export const ZOHO_FALLBACK_SERVICE = 'Zoho implementation';

// "What do you use today?" quick picks. Optional; an "Other" text box
// sits next to them.
export const SYSTEM_OPTIONS = [
  'QuickBooks',
  'Zoho',
  'NetSuite',
  'Salesforce',
  'HubSpot',
  'Shopify',
  'Spreadsheets',
];

// Link to a scheduling page (Zoho Bookings, Calendly, ...). When set, the
// success screen offers "Pick a time now". Empty = no booking button.
export const BOOKING_URL = '';
