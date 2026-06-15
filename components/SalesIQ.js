import Script from 'next/script';

// SalesIQ widget URL. Public per Zoho's docs — no env var needed.
const SALESIQ_WIDGET_SRC =
  'https://salesiq.zohopublic.com/widget?wc=siqd869c5ba59474c621275f137f5bd3edb99a0bdfe6447d4437c6e4a9acd4c99a9';

// Zoho SalesIQ embed — visitor tracking + silent identification.
//
// Two scripts, in source order:
//
//   1. salesiq-init   — defines window.$zoho.salesiq with a ready-flag
//                       and a queue, then assigns $zoho.salesiq.ready so
//                       SalesIQ flushes any queued visitor.* calls the
//                       moment its widget finishes booting.
//   2. salesiq-widget — the SalesIQ widget bundle. Loads the live-chat
//                       UI (suppressed via dashboard settings; we use
//                       SalesIQ for visitor tracking + JS API only, no
//                       visible bubble).
//
// Strategy choice: the task spec asks for `beforeInteractive` on the init,
// but in Pages Router that strategy is only valid inside pages/_document.js.
// From a component mounted in Layout we use `afterInteractive` instead.
// next/script preserves source order within the same strategy, so the
// init still runs before the widget bundle. The queue mechanism makes
// timing irrelevant for correctness anyway — any helper call that
// arrives before the widget boots is captured and replayed on ready.
//
// Mount once site-wide, NEAR THE END of the layout body (not in <head>).
// The widget bundle expects a live DOM.
export default function SalesIQ() {
  return (
    <>
      <Script id="salesiq-init" strategy="afterInteractive">{`
        (function(){
          window.$zoho = window.$zoho || {};
          window.$zoho.salesiq = window.$zoho.salesiq || { ready: function(){} };

          // Queue of { fn, label } entries pushed by lib/salesiq.js helpers
          // before SalesIQ has finished booting. Flushed on ready.
          window.__maSalesIQQueue = window.__maSalesIQQueue || [];
          window.__maSalesIQReady = false;

          // RE-IDENTIFY a returning visitor. If the chat widget has
          // previously persisted a lead to localStorage._ma_lead_v1
          // (see _chatHandleLeadPayload in lib/site-runtime.js), queue
          // up a visitor.* push so SalesIQ links THIS session to the
          // same identified record once it boots. Without this block,
          // identification only lands on the page where the chat
          // happened — refreshes / new tabs / return visits would
          // appear as anonymous.
          try {
            var raw = window.localStorage && window.localStorage.getItem('_ma_lead_v1');
            if (raw) {
              var lead  = JSON.parse(raw) || {};
              var rName = String(lead.name  || '').trim();
              var rMail = String(lead.email || '').trim();
              var rPhon = String(lead.phone || '').trim();
              if (rName || rMail || rPhon) {
                var sp = rName.indexOf(' ');
                var rFirst = sp === -1 ? rName : rName.slice(0, sp);
                var rLast  = sp === -1 ? ''    : rName.slice(sp + 1).trim();
                window.__maSalesIQQueue.push({
                  label: 'restore-from-localStorage',
                  fn: function (v) {
                    var bulk = {};
                    if (rName) bulk.name = rName;
                    if (rMail) bulk.email = rMail;
                    if (rPhon) bulk.contactnumber = rPhon;
                    if (typeof v.info === 'function' && Object.keys(bulk).length) v.info(bulk);
                    if ((rFirst || rLast) && typeof v.name === 'function') v.name({ firstname: rFirst, lastname: rLast });
                    if (rMail && typeof v.email === 'function') v.email(rMail);
                    if (rPhon && typeof v.contactnumber === 'function') v.contactnumber(rPhon);
                  }
                });
                console.log('[salesiq] queued re-identification from localStorage._ma_lead_v1 for', { name: rName, email: rMail, phone: rPhon });
              } else {
                console.log('[salesiq] localStorage._ma_lead_v1 present but empty — skip re-identification.');
              }
            } else {
              console.log('[salesiq] no persisted lead in localStorage — first-time visitor or never chatted.');
            }
          } catch (e) { console.warn('[salesiq] localStorage restore failed:', e); }

          // SalesIQ INVOKES this function during widget init. The assignment
          // form (not callback registration) is the documented pattern —
          // calling $zoho.salesiq.ready(fn) would invoke the stub with fn
          // as an argument, which is silently ignored.
          window.$zoho.salesiq.ready = function() {
            window.__maSalesIQReady = true;
            var q = window.__maSalesIQQueue || [];
            console.log('[salesiq] $zoho.salesiq.ready fired. Flushing queue (' + q.length + ' pending).');
            try {
              var v = window.$zoho.salesiq.visitor;
              if (!v) {
                console.warn('[salesiq] ready fired but $zoho.salesiq.visitor is unavailable.');
                return;
              }
              window.__maSalesIQQueue = [];
              for (var i = 0; i < q.length; i++) {
                try {
                  console.log('[salesiq] flush → ' + (q[i].label || 'unnamed'));
                  q[i].fn(v);
                } catch (err) {
                  console.warn('[salesiq] queue entry "' + (q[i].label || '?') + '" threw:', err);
                }
              }
            } catch (e) { console.warn('[salesiq] ready flush failed:', e); }
          };
        })();
      `}</Script>
      <Script
        id="salesiq-widget"
        src={SALESIQ_WIDGET_SRC}
        defer
        strategy="afterInteractive"
      />
    </>
  );
}
