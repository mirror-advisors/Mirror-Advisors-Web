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
