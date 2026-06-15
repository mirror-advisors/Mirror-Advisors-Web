// Zoho SalesIQ helpers — silent visitor identification API.
//
// Why a queue?
//   $zoho.salesiq.ready fires ONCE during widget initialization. The chat
//   widget collects lead data mid-conversation, often well after that one
//   ready fire (and helpers may be called from anywhere — admin actions,
//   future auto-identify flows, etc.). Helpers called before ready would
//   silently no-op without a queue. window.__maSalesIQQueue captures any
//   pre-ready call; the init script inside <SalesIQ /> flushes it the
//   moment SalesIQ confirms it has booted.
//
// SSR safety:
//   Every helper short-circuits when `typeof window === 'undefined'`, so
//   this file is safe to import from anywhere — including code that runs
//   during getServerSideProps / getStaticProps / route loaders.
//
// JSDoc typedefs for editors with the TS language server:
//
// @typedef {Object} NameParts
// @property {string} [firstname]
// @property {string} [lastname]
// @property {string} [salutation]
//
// @typedef {Object} Lead
// @property {string} [name]   Full name. Split into firstname/lastname.
// @property {string} [email]
// @property {string} [phone]
// @property {Object<string,any>} [extra]   Extra columns for visitor.info().

// Internal: queue or execute a visitor.* setter call.
// fn receives `$zoho.salesiq.visitor`; label is for diagnostic logs.
function withSalesIQ(fn, label) {
  if (typeof window === 'undefined') return;
  try {
    if (
      window.__maSalesIQReady &&
      window.$zoho &&
      window.$zoho.salesiq &&
      window.$zoho.salesiq.visitor
    ) {
      console.log('[salesiq] ' + label + ' → running immediately (SalesIQ ready)');
      fn(window.$zoho.salesiq.visitor);
    } else {
      console.log('[salesiq] ' + label + ' → queuing (SalesIQ not ready yet)');
      window.__maSalesIQQueue = window.__maSalesIQQueue || [];
      window.__maSalesIQQueue.push({ fn: fn, label: label });
    }
  } catch (e) {
    console.warn('[salesiq] ' + label + ' threw:', e);
  }
}

// Push the visitor's name. Accepts either a plain string (full name) or
// { firstname, lastname, salutation? } per the SalesIQ object form.
// @param {string | NameParts} name
export function setVisitorName(name) {
  if (!name) return;
  withSalesIQ(function (v) {
    if (typeof v.name !== 'function') return;
    if (typeof name === 'string') {
      v.name(name);
    } else {
      var payload = {};
      if (name.firstname)  payload.firstname  = name.firstname;
      if (name.lastname)   payload.lastname   = name.lastname;
      if (name.salutation) payload.salutation = name.salutation;
      v.name(payload);
    }
  }, 'setVisitorName');
}

// @param {string} email
export function setVisitorEmail(email) {
  if (!email) return;
  withSalesIQ(function (v) {
    if (typeof v.email === 'function') v.email(email);
  }, 'setVisitorEmail');
}

// @param {string} phone
export function setVisitorPhone(phone) {
  if (!phone) return;
  withSalesIQ(function (v) {
    if (typeof v.contactnumber === 'function') v.contactnumber(phone);
  }, 'setVisitorPhone');
}

// Push extra arbitrary fields. SalesIQ's visitor.info() accepts the bulk
// shape ({name, email, contactnumber, ...customFields}) and is the call
// that fires the "profile updated → link to tracking session" event.
// @param {Object<string,any>} obj
export function setVisitorInfo(obj) {
  if (!obj || typeof obj !== 'object') return;
  withSalesIQ(function (v) {
    if (typeof v.info === 'function') v.info(obj);
  }, 'setVisitorInfo');
}

// Convenience: register a complete lead in one call. Splits `name` into
// firstname/lastname and pushes name + email + phone + any extras.
// Idempotent — safe to call repeatedly with the same data.
// @param {Lead} lead
export function registerLead(lead) {
  if (!lead || typeof lead !== 'object') return;
  var name  = String(lead.name  || '').trim();
  var email = String(lead.email || '').trim();
  var phone = String(lead.phone || '').trim();
  if (!name && !email && !phone) return;

  // Bulk info() — fires the link-to-session event in SalesIQ.
  var bulk = {};
  if (name)  bulk.name = name;
  if (email) bulk.email = email;
  if (phone) bulk.contactnumber = phone;
  if (lead.extra && typeof lead.extra === 'object') {
    Object.keys(lead.extra).forEach(function (k) { bulk[k] = lead.extra[k]; });
  }
  if (Object.keys(bulk).length) setVisitorInfo(bulk);

  // Individual setters — same data, idempotent. Object-form visitor.name
  // populates the firstname/lastname columns in the SalesIQ dashboard.
  if (name) {
    var sp = name.indexOf(' ');
    var firstname = sp === -1 ? name : name.slice(0, sp);
    var lastname  = sp === -1 ? ''   : name.slice(sp + 1).trim();
    setVisitorName({ firstname: firstname, lastname: lastname });
  }
  if (email) setVisitorEmail(email);
  if (phone) setVisitorPhone(phone);
}
