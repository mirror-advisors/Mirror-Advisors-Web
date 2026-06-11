// Auto-generated. Client-side runtime extracted from the original Mirror Advisors
// website JS. Includes cookie consent, chat widget, admin panel, scroll handlers,
// and all per-page _INIT functions.
//
// Call this once after mount (in Layout's useEffect). It's safe to call multiple
// times — internal guards prevent double-initialization.
//
// Note: the original `go(page)` hash-router has been removed; navigation is
// handled by Next.js. A compatibility shim `window.go(page)` is provided so
// that inline onclick="go('xxx')" inside dangerouslySetInnerHTML works.

import { ZOHO_LOGOS } from './zoho-logos';
import { saveConfig, fetchConfig, getCurrentUser, insertSubmission, fetchSubmissions, updateSubmission, deleteSubmission } from './site-config';
import { getSupabase } from './supabase';

// Fire-and-forget Supabase persistence helper used by admin Save handlers.
// Always attempts the save — letting Supabase RLS be the source of truth on
// whether the user is authorized — rather than preemptively gating on a
// possibly-stale auth check. Logs clearly and surfaces failures via toast.
function _persist(key, value) {
  (async function () {
    try {
      const ok = await saveConfig(key, value);
      if (ok) {
        getCurrentUser().then(function (u) {
          console.log('[site-runtime] ✓ Persisted to Supabase: ' + key + (u ? ' (as ' + u.email + ')' : ''));
        });
      } else {
        // saveConfig already logged the supabase error. Check whether the user
        // even has a session so we can give a more actionable toast.
        const u = await getCurrentUser();
        if (!u) {
          console.warn('[site-runtime] Save failed: not signed in. Go to /admin/login.');
          if (window._adminToast) window._adminToast('⚠ Not signed in — visit /admin/login to enable saves');
        } else {
          console.warn('[site-runtime] Save failed for "' + key + '" while signed in as ' + u.email + '. Check Supabase RLS policies.');
          if (window._adminToast) window._adminToast('⚠ Save failed for ' + key + ' — see console');
        }
      }
    } catch (e) {
      console.warn('[site-runtime] Save threw for ' + key + ':', e);
      if (window._adminToast) window._adminToast('⚠ Save error: ' + (e && e.message ? e.message : 'unknown'));
    }
  })();
}

// DevTools helper: run `window._supaCheck()` in the console to see auth state
// and verify writes work. Useful for diagnosing "it worked once then stopped".
if (typeof window !== 'undefined') {
  window._supaCheck = async function () {
    const supa = getSupabase();
    if (!supa) return console.log('Supabase client not initialized (SSR?)');
    const { data: u } = await supa.auth.getUser();
    const { data: s } = await supa.auth.getSession();
    console.log('Signed-in user:', u && u.user ? u.user.email : '(none)');
    console.log('Session expires at:', s && s.session ? new Date(s.session.expires_at * 1000).toString() : '(no session)');
    try {
      const { data, error } = await supa.from('site_config').select('key,updated_at').limit(20);
      if (error) console.warn('READ failed:', error);
      else console.log('Rows in site_config:', data);
    } catch (e) {
      console.warn('READ threw:', e);
    }
  };
}

let __runtimeInitialized = false;

export function initSiteRuntime(router) {
  if (typeof window === 'undefined') return;
  if (__runtimeInitialized) return;
  __runtimeInitialized = true;

  // Expose Zoho product logos to legacy inline HTML (technology page hover lookup
  // reads `window._ZOHO_LOGOS[a.key]` — see line ~2738).
  window._ZOHO_LOGOS = ZOHO_LOGOS;

  // Expose the case-detail HTML builder so /cases/[idx] can render the page.
  // _buildCasePage is a nested function declaration below — hoisted within this scope.
  window._buildCasePage = _buildCasePage;

  // Expose internal renderers on window so Layout.js (and any future external
  // caller) can trigger a re-render after data is hydrated from Supabase. These
  // are all `function name()` declarations later in this file, so they're
  // hoisted and available even though we reference them up here.
  window._renderNav            = _renderNav;
  window._navUpdateHomeLinks   = _navUpdateHomeLinks;
  window._renderSocialIcons    = _renderSocialIcons;
  window._applyPageBackground  = _applyPageBackground;
  window._refreshHomeScroll    = _refreshHomeScroll;

  // ── Mobile menu controls ───────────────────────────────────────────────────
  // Layout.js wires the hamburger button + backdrop + nav links to call these
  // globals. CSS toggles visibility via the `.is-open` class on the three nodes.
  function _setMobileMenu(open) {
    if (typeof document === 'undefined') return;
    var menu = document.getElementById('mobileMenu');
    var backdrop = document.getElementById('mobileMenuBackdrop');
    var burger = document.getElementById('navHamburger');
    if (menu) menu.classList.toggle('is-open', open);
    if (backdrop) backdrop.classList.toggle('is-open', open);
    if (burger) {
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    // Lock body scroll while the drawer is open.
    if (document.body) document.body.style.overflow = open ? 'hidden' : '';
  }
  window.openMobileMenu  = function() { _setMobileMenu(true); };
  window.closeMobileMenu = function() { _setMobileMenu(false); };
  window.toggleMobileMenu = function() {
    var menu = document.getElementById('mobileMenu');
    var isOpen = !!(menu && menu.classList.contains('is-open'));
    _setMobileMenu(!isOpen);
  };

  // Compatibility shim — old inline onclicks call this.
  window.go = function(page) {
    if (!page) page = 'home';
    // Aliases (defined in original source)
    const aliases = { capabilities: 'home', stack: 'technology' };
    page = aliases[page] || page;
    let path;
    if (page === 'home') {
      path = '/';
    } else if (/^case_\d+$/.test(page)) {
      // Case study detail — pages/cases/[idx].js
      path = '/cases/' + page.slice('case_'.length);
    } else {
      path = '/' + page.replace(/_/g, '-').replace(/^zoho-/, 'zoho/');
    }
    // Use Next router so we keep SPA-feel
    if (router && router.push) router.push(path);
    else window.location.href = path;
  };



var _LOGO_SRC="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAA86ADAAQAAAABAAABMAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgBMADzAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAQEBAQEBAgEBAgMCAgIDBAMDAwMEBgQEBAQEBgcGBgYGBgYHBwcHBwcHBwgICAgICAkJCQkJCwsLCwsLCwsLC//bAEMBAgICAwMDBQMDBQsIBggLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLC//dAAQAEP/aAAwDAQACEQMRAD8A/wA/+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//0P8AP/ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//9H/AD/6KKKACiiigAooooAKKKKACinxxySuI4lLM3AAGSa7fS/Aep3YEl8wt0PY8t+Xb8TW1HD1KrtTjcmUlHdnC1btbC9vW22cTyH/AGQTXtun+D9CsACYvOcfxSfN+nT9K6ZESNQiAADsOK9mjkUnrVlb0MJYhdEeHW/gnxDPgtEIge7sP5DJrZh+HV63/Hxcov8Augt/hXrVFd8Mmw0d7v5/5GbxEzzRPhzDj57ok+yf/Xpx+HNr2um/75H+Nek0Vt/ZeF/k/F/5k+2n3PLpPhw3/LG7/NP/AK9ZU/w/1mPmF45PoSD+or2aiollGFe0bfNjVeZ8+XXhrXbMZmtnwO6/MP0zWGQVO1hgivp+qF5penagu29hST3I5/PrXFVyJf8ALuf3mkcT3R83UV63qXw9tJcyaXKYj/df5l/PqP1rzvU9C1TSG/02IhezjlT+NePiMBXo6zjp3WxvGpGWzMiiiiuMsKKKKACiiigAooooAKKKKAP/0v8AP/ooooAKKKKACiipYIJrmZYLdS7scADkmmlfRARV2OheDr/VcXFzmCA85I+ZvoP612Ph3wXBYAXeqgSzdQnVV/xP6V31fQYHJr2niPu/zOWpX6RMnS9E03R49llGAcYLnlj9T/kVrUUV9DCEYLlirI5m29WFFFFUIKKKKACiiigAooooAKKKKACmuiyKUcAg8EHkGnUUAcDrXgWzuw0+l4gk/u/wH/D+VeU31heabOba9jMbj17/AE9a+lKz9S0uy1W3NtfIHHY9wfUGvHxmUU6nvUvdl+BvTrtaM+b6K6fxB4XvNDfzR+8tyeHHb2PpXMV8vVpTpycJqzOxSTV0FFFFZjCiiigAooooA//T/wA/+iiigAoop8UUk0iwxKWZiAAOpJoSAltLS4vrhbW1UvI5wAK9y8OeGrbQod7Ye4YfM/p7D2/nTPDHhyLQ7bzJQGuZB87eg9B/nmupr6zLctVJKpUXvfl/wTirVb6LYKKKK9gwCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAjlijnjaGZQysMEHkEV4x4p8KPpDm9sgWtmPPcoT2Pt6H869rpkkccsbRSqGVhgg8gg1x4zBwxEOWW/RmlOo4s+YqK63xV4bbRLjz7cE20h+U/3T6H+lclXxlajKlNwmtUd8ZJq6CiiishhRRRQB//1P8AP/ooooAK9Z8D+HhBGNavF+d/9UD2U9/x/lXE+GNFOtamsUg/cx/NIfb0/GvfFUKAqjAHAAr3smwXM/bzWi29e5zV6lvdQtFFFfTHIFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAFS+srfUbV7O6XcjjB/x/Cvn3V9Ln0e/eyn5xyp/vKehr6NrkfGOiDVdOM8IzPACy46kdx/hXlZrgvbU+eK95fiuxtRqcrs9jw2iiivkDuCiiigD//V/wA/+iiui8K6aNT1qKJxmNPnf6L/AInArSlTdSahHdibsrnrHhPSBpOkoJBiWb53/HoPwFdNRRX3lKlGnBQjsjzZNt3YUUUVoIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDwnxfpA0rVmMQxFN86e3qPwNcrXuXjTTRf6K8qDMlv8AOPp3/Tn8K8Nr4zM8N7Gu7bPVHfRnzRCiiivONT//1v8AP/r134e2HlWEuoMOZW2j/dX/AOv/ACryKvovQ7QWOkW9rjBVBn6nk/rXs5JR5qzm/sr8/wCmYYiVo2NWiiivqziCrNlZXupXsOm6ZBJdXNzIsUMMKGSSSRyFVERQWZmJACgEknAqtX0l+xiSv7ZHwjYHBHjTQiPwvIq5MwxX1bC1sSlfkjKVu/Km7fga0KftKsKbe7S+9nzSJYzM9sTiWIlXQ8OhHBDKeQQeCDUlf27/APBSv43fsEfCHxV4O8PftofDaDxXB4rg1A2+qpp0F3PYramASZYlLgB/NXBiYnK8juPzDtv+Cfv/AASH/a2aIfsifGSTwhrl8jLa6NfXQmYyx5J/0LUfJvW4BJCTYKjcOOa/HMg8a8Pi8vpZnmWWYihQmm1VUHWpWTcXecFzKzi9HBbPpq/u8x4AqUsRPC4TF06lSO8G+SeqTVlJ2e62kfziUV+0Hxp/4IS/ts/DcyX/AMNf7J+INgoDKbC4FjeMvr5F0VU/8BmYn0r8qviT8F/jJ8GtROk/F7wlrPhe48wxAapYzWqu654R5ECSZAJBRmDAZBI5r9KyLjHI85inleNp1X2jJcy9YO0l80j5XMchzHAO2Lw8oebWn37P7zzSiiivpDyQooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAGsqupRxkEYI9q+cNUs20/UZrJv+WbkD6dv0r6Rrxr4gWgh1dLpRxMgz9V4/livFzujzUVU7P8AP+kdGHlaVjhKKKK+VOw//9f+AvTrf7XqEFsefMkVfzNfSleBeEohL4htlPZi35Amvfa+nyKH7ucu7/L/AIc5MS9Uincajp9o4ju544mIyA7BTj8TVmOSOVBJEwZW5BByDX+hD/wQc8d/syfsg/8ABBK4/bL+Mvg7TNSs9P8AFuoy+IL97KOa6+yHU47Jp2PlSSSfZbchljALMsexeTX4df8AB0L/AME//D37I/7c1h8ffg9o9vpnw9+M1h/aUK2Eax2UGuWvy30aLGojQTxtDcrg/O7ysBwa6cPmSqV3ScbLWz9CZUbR5j+aGaeC2jMty6xoOrMcD8zXt/7KXjDwt4a/ah+GnjDXNRt7XS9I8WaLd311JIBFb28V3E0kkjdFVEBZiegBr+n7/g2W/ZO+DngPwL8ZP+CwH7YGlW9x4D+FWk3ljof9oWy3MRnt4vtOp3kUUkTFpYohFbQNGSWaWePBbFfoh/wcL+Dvg94suf2D/jb4c8F6VoN94w8faN9pW3toQ5s71rK4NrI6Inmxqx6MMEjOBmuTMsZCqquDkvdlGUW1vrF3sa4eLhKFXqmn9zP55/8Agun+0p8Afj9rvwwv/gp4x0nxTb6Pba0t9Jptys625ney8sSEHCl9jbc9dp9K/AabVfD867J7m3dfRnUj+df6M3/BRj4Y/DWy/wCDmD9i7wzZ+HtMh0290fWHuLRLSJYJmS3vmUugXaxUgEEg4I4rzX/gp3/wcRfDL/gnh+3X49/Y0sf2YvC3iuHwU+mourT6nBYPc/2hp9rfE+R/Zs2zZ9o8v/WNu254zgfP8F5YsiyjC5JgbzjTUrOTV3ecpPay3Z6ee4+WZY2rj6yUXO2i20SX6H8S3wY/b+/av+Av+h/B74o6pYQuFVbOe5TUbUY6Bbe8E8a9edignvnAr9M/2q/2xvi3+2t/wSsh+Inxoi06PVdG+KVvpEbaZA9vFJDHpbThmR5JPnLTMDtKrgDgd/6Zf+CV/wDwWs/Zy/4LF/tNXf7DXxY/Zb8KaDpOteHtRv3uBdW2swyLa+WHhmgfT7cBZEkOHDkhgBtO7K/jx4w/Ye+C/hz4oXn7AenpKvw/m/a8stC+zSSFmXSZtOhla1D5DY8om3Vs7gMEknr4/EmVZZDMMFjp4KEMVCvTftIxiptO905LV6d2/kejlOPxksPiMK68nSdOXuttq620e3yP5QpNY0iFzFLdQqynBBcAg/nTP7d0T/n7h/77X/Gv9Gz/AIK0f8Fuvhx/wRh/aO0L9iL4K/s7+FNU0Ox8K6fqsEsl0mkQRR3EtxAkEFvFZSrsiW3Hz7uS2No25PlH/BM3/g5T/wCG/f26fh9+x9rfwB8K+HLXxtcXsEmp2mqfbZbf7JY3F2CIWsog24wBDlxjdnmvuv7TruHtVS90+Z9jG9r6n+f1BcQXMQmtnWRD0ZTkfmKonWtGU4a7hB/66L/jX93Xw/8A+CffwE/bW/4Oqv2hfDvx38PWWt+B/AGlaXrp0KZB9ju7+TTdLht1ngC7JIF3yyOh+V3Cbgy7gaXx7/4Ogv2ZvgF8cvGPwI+GH7Jui6roPgrWr3QbW9e8tLD7T/ZsrW7yLbpYSiJGeNti7ydmCcEkDolj6jlGFKF5cqk9e6X+ZPsUtZM/hVi1bSpnEcN1E7E4AVwST+dWbi6tbRPMu5FiUnGXIUZ/Gv8AQR/YG/4Lpfsbf8FVf2odD/YH+Of7K3h/RNO+INvfW9tcTvaavbvPa28l0YpYTYwlVeOJ8SBsq4XjnI8D/wCCQf7GPwU/Zg/4Obf2iP2T/C2lxal4P8J+CdSn0i01NEuxbRahc6DepGDIpyIFumhjY5fywNzMSSYnmc6akqtO0krrs9bB7FO3K9D+F3+29F/5/IP+/i/41NBqem3UnlW1xFIx7K4J/Q1/bx+0F/wdS/D34I/H/wAd/BS3/ZQ8JalF4N8R6roKXkmsw273A026kthKY/7LfZ5nl7tu5tucZPWv0U/4Jsfthfsbf8HHPwo+L37Pfx1/Z18P+Dx4StLKRJ7aaDUSv9qLcxxXFtcJa2s1tcwNC5Vk5wRhuoolj8RCmq1Sl7j637j9lFuyep/nA0VQ0qaS50u2uJjl5IkZj6kgE1fr14tNJo52raBRRRTEFFFFABRRRQAUUUUAFed/EW332Fvdd0kK/wDfQ/8ArV6JXJeN4hJ4elb+4ysPzx/WuPMIc2GqLy/LU0pO00eGUUUV8Oegf//Q/gt8DgHxFET2V/5V7lXhvgc48Qxe6v8Ayr3KvrMk/wB3fq/yRxYj4j+2T9mYA/8ABm78UAf+f7Xf/Twldz+zpp3ib/gvd/wbr6r+zLYCPWfjx+z9d21torXUkfn3sunIHsW8yaVdv27T2ksWllkRfPR3b5Rz/Hvof7ZP7V3hn9nHUP2QPD/xA1i0+F2qySy3fhmORBYTNNIJpNw2F8PIA5AbGe1ZP7Ov7Vv7TH7Ini+78e/sveOtY8CavqFt9ju7jSZ/K+0QA7gkqMGjkCtyu5SVJJUjJqXlk+VuLXNzXTK9srrsf1c/8F9PHGh/8Ewf+CUHwV/4Il/CHU4v7f1TR01rxvcWbbWngt3Mszsu4yKuo6o0kq5yPLt3jzjivs3/AILuZPwc/wCCcI/6nfwx/wCirGv4RfjT8Z/i7+0f8QNR+K/x+8Taj4x8TasqJd6nqs5nuJEjXYibjgKiLwqKAq9hya+yPBf7Wv7WH7Y3x3+Bvwa/aO+JniHxHoPh7xXotto0ck6I+l7p4YRJbMsY2yIiqEZg2MA1z4vBLD4Z1pvSCnKT6/D077GlKfPNQXVpL7z+3P8A4KQ/8rPX7Eg/6gut/wDpNf18ff8ABW7/AILT/sn/ALJv/BRn4nfs/wDjv9jHwL8Udc0CbSft3irV7q1hvdSe60qzuEaVX0i6fMMUqQKWmc7IlxgYUfkx/wAFuPGPxw/Zw/aR+Cv7Qvgj4o+L9R8e6bZayNP17Vr6O5u7FIWgRVt9sEaIGW5mDgodwbnoK/nu+Mvxo+LP7RHxO1b41fHXxBeeKvFuutC+oarfsGuLg28MdvFvKhR8kMUca4A+VRXjcJ4vC59luGzfCt+xqRla+kvdnKOq16p9djuzjB1suxVTB1rc8bXtqtUn+p/o+f8ABKb9vP4E/t0/smfFL4m/8E1/gn4C+EX7R/hSxmgPhua1g+zzrJuezf7ZaQWU0ttcFChJRBFOpDgqFZv45dV8c/tT+Kf2ONb8ea9NqsvxvuP2m4rk/uR/aaeKVs49saQkFFljvAI44QNilQgG0Yr8r/gb+0n8c/2TfHy/Gf8AZ38X6l4I8R2trNa/2lpcojmNtPjzImBDK6MVU7WUjcqkcgGv60LP/gnv/wAFXvEnww07QPEHj9rP9p7xD4ji+KMGovMY9QglXw7JapYPcRoqJe/Z4PJZ1UxqW2knlq4+K8PHCywl2rSr0rX33frp3OjJp86r/wDXuf6H7V/8FHv+CkGi/wDBO79hX4VeOv8AgpH8OPBXxX/aT8U2ccUfhyC0iitIipR72Rpp0vHhht1ZUdo1KzXBCooQlk/Pj/glf/wXw+GH7X3/AAUF+Gf7N+k/sp+B/h/eeKbu/ig8Q6VcRS3li1tp91clogumwHLrCYjiVflc9Rwf4jvjv8cf2gf2g/iNP48/ad8Ta34q8XW8S6ZPc+IZnlvrdLRnAtmEmDH5Ts+Y8Da5bIyTX9KX/BPv/g21/wCCgfxL+Evww/b7/Zz+Nfh/4fan4h0qDxBolxCt4mo6el/Cy482Ndu8wyMj7eMMRX0lTL6FGjarO0ns9bfgtvkeRGpKUtFoftB+xb8VfB/gv/g7R/an+HPiO5S1v/GPhjTI9L8xlUTz2GnaVNJCuSC0hiLSBQD8sbntX4H/ALXP/BtV/wAFctW/ao+JHiX4Z+A9N8S+Hdb8Tavqum6jBrdnAs1rf3ctxFujneORHCOA6lcBsgEjmvt74h/8Gon/AAU6+KHxTufj/wCO/wBojw5rvj6e6t9ROu3DaiupNe2aotvKtygEiSRCKMRuuGTaMcivAfG1l/wcX/sxfto/Dv8AYR/aT/aT1bwInxJu203wz4xutQTUdAvZ0i3JGJzCLhZXmKWwjmRJPNkQgNGQ5ITjGp7TD1It8qTTv0S20129fIbV1aS6nvH/AARK/wCCAP8AwUw/Zm/4KU/Dn9p39pLwrpvhLwp4GfULy5kOq297PcPdWFzaRxRR27Oc75gzFioCg9TxX2x/wTm8eeE/iT/wdyftU+KvBF9DqWn/APCEXlgLi3cSRmfTX8N2dwoZSQTHPDJG3PDKQeRX4B/8FXfjX/wXF/YL+NV3+yL+1N+0P4p1yz1XS4dQtNR0m8eys9TsbjKPseOOGUGORGjkTdkYB6OK/Gf9lv8AaC/ad/Zh+KEHin9jbxFq3hbxnrVuPD1u+hBTeXcd9NCVtEUo+7zZ44cKFyWVce+k8JVxMZVpzWqsrbb31J54waikf1J/tIf8HAH7GXw4/aO+Inw61H9gr4d+Irvw94p1rTLjVrm9s0n1CezvJYpLmRTokhDzupkYGRzljlieT+z2r/tfah8b/wDgiH4r/ay/4IT+AfC3g3xdcwyp4w8O6ZpsS6rpUsEJW+W3itEjS4v7eMrLamaMrNAVdULFYz/Lt+1J/wAG/n7Uvwi/aR+EPwl+Nfxb8K6p8Tv2jdfvAtsEupLiCdo2u769un2BXRZnCEoBvkkyowGxj/CH9ir/AIK0/sMf8FQvEP8AwS8/YP8AiadP+Iet6dp9/rOp6HO1jpMlilv9pSe7M8MrItsJym5Y2cs4VQd2KxeHw0oL2VRcy1d72dtyuad9VofzzWa26WkSWhzEEUIc5+XHH6VZr+w/Wv8Agz1/bt8S6xeeJ/E/xn8FXGqapcS3t7K9tebpLi4cySucKBlnYk4AHPAA4r5//aW/4NTf2t/2Y/2dfHn7SHib4p+D9T03wD4f1LxFdWdrBdrPcQ6ZbvcPHGWG0O6oVUnjJ5r14ZjhnaKnr6P/ACMHRmfy4UV+vH/BMj/giX+2l/wVU0TVfH/wKGkeH/BmiXv9nXWv69O8cL3gRZHgt4YUkkmeNXQyE7EXeBvLZUfsMf8Agzb/AG0R/wA1i8Ef+At7/hVVMfh6cnCc9V6/oiY0pNXSP5AaK/fj/goV/wAG4X7ff/BPj4Laj+0drF1ofxC8FaGEk1i68OvMLzToGO03EtrNGGe3QlfMeJ3aMEuyCNXdem/4J2f8G4X7Tn/BR79lPR/2tvh38Q/C/hrRdavNQtIbLU4bqS4Q6dcyWrs7RDZhnjJUDsRnmh4/D8vPzq3z/K1w9lO9rH88NFf18j/gzh/bM7/GTwP/AOA17/hX5G/8FOv+CIH7Zv8AwSx03Q/GXxdOmeLfCfiO8/s2y1nw6ZZFW/ZC6W00EqLJHJKFbySu9X2kZDYUkMww05KMZ6/NfmhujNK9j8eKK/q7+FH/AAaC/wDBQjxz8PtM8YfEPxx4O8FapqMCTyaNc/abye03gHy5ZYUEZkXOHCFlDZAZhyfQ/wDiDb/bS6/8Lh8Ef+At7/hUvM8Lt7T8H/kHsJ9j+QGud8WAN4dugf7o/mK+qv2t/wBm7xR+x7+0543/AGW/Guo2mr6t4G1NtMub2xDrbTuqJJujD4YDDgYPORXyr4sIXw7dE/3R/MVrXkpYeco7OL/ImKakkeA0UUV8Ieif/9H+CLwlKIvENsx7sV/MEV77XzXp1x9k1CC5PHlyK35GvpSvp8in+7nHs/z/AOGOTErVMKKKK905gr6S/YyOP2x/hIf+pz0P/wBLIq+ba+kP2Mxn9sb4SY/6HPQ//SyKvJz7/kWYv/r3P/0lnTg/94pf4o/mj9tv+Di5mbxj8IM/8+Ovf+jLGv5ua/pD/wCDis/8Vl8IR/0467/6Msq/m3nl8mF5sZ2gnBOM49z0r898C/8Akhcr/wANT/09UPqPED/kf4r1j/6RE/oz/wCDaT/gmzD+3R+3Vb/GH4i2TXHw++C8tnr16G3LFea1v36bakgYdVeNriZCcFY0VwVkwf6M/HX/AAUG+PY/4KGRftA6b8KPE8uiaH8V4/Bkekf2HeLrF14SXRJoJtYjtipkeIXkktzHKiBWtkVMb9xP5ifsuf8ABULwF+x3/wAEdPDn7KP/AAR30jxN4u+PviC6tbvxFr0PhaeayttVvismo3HnTQLBMsARbK2MqkLEqPJwrZ8X+On7fX/BYn9nL9l62/bH/aH13+wPjPN45g0rTr2ew0uXboUmlSptNtbq8Cky+bzIvm554XbT4txdHEYzB4eVWHtXXpqMJSSnZN3ajq9OrtoY5Pha0aOIrezlyKnK8rO3Trsee/8AB0p/wTltf2Sv2zbP9q34X6d9m8B/G5ri9nEETCCz8SQ4kvEYhAkf21HFzGpbdJItwQMKa/S//go14p8UeEP+DT39mrWfCGp3ek3nkeCY/tFjO9tKEe0mDAPGysARwRnmvkLSP+C5/wCzp/wUB/4JQ+P/ANiz/grx4h1EfE2e6uLjw54n03QzcRNNGftOnXLxWMcccTWs+YJEAXzbcDLEu5r6v+DH/BU3/ggx8bP+CSXwa/YC/wCCg+ta3enwZoWix6pplppetRCLU9LhMfy3VhGN6qWbBSQqwNfXVPawdKFSDfI/k1oeEuXVp7n8WQ+Pfx9sj9rsvH/iiCaL545E1m8VkZeQwIm4IPINf2V/8F6/iJ43+LX/AAb+fsX/AB58c6lPc+MdU1DwxqM+rhyl39ruPD15M8yyDDLIZUWTcDncoPUV5Wl//wAGW9i63i6Z4pujEQ/lMni1lfbztIZgpB6EE4Pevg//AILwf8FnfhD/AMFE9E8Bfstfsi+GLjw98IPhpKt5Zz30Itbi8u47drSFYrYM3kW1vbu6oH/eOz5IQKN/ZOSxNWn7Om0ou7bSWhmvci7yP11/aUtrP/g4c/4IQaZ+1H4VtVvf2hf2eY5/7Wt4Iz9ovJbSGNtSgjREd3XULVEu7aNBzcKkYI+avz7/AODV39hHw38Y/wBoPxD/AMFGvjWsEHw4+B8Uj2N1dkLbya88HmtKxJxssLRzM+4YEk0TDlDj88/+CGf/AAVLP/BLH9sQ+PPHCXV38NPGtqmkeLrSzjEsyRRszWt7HH953tHd8opy0UsgUM+wV+s//BWz/gtP+wdefsAyf8E9f+CRUd5p+geONY1C/wDFl1Jp13p8UNjqNzLe3dtD9s8uVnvLmXB2q0UVqrQrtBjC5VKVam5YSmvdk9H2XUalF2m90fN3wL/b98Qf8FLv+Dmf4T/tPXhki8Pt4rGkeFLSXhrXQbO3u/swIwCrzl3uJVOdrylckKK/TT49fts/BD9gX/g7S8YfGj9o68k0rwlq/g3TPDtxqaRtLHYSX9hZvFPMqAv5IeDY7KCU3hiNoYj+U3/glv8AH74Z/sr/APBRL4QftFfGa7msPCnhHXhfapcwQSXUkUBgmj3LFErSP8zrwqk45xX68ftI/tdf8EfP25P+C6HjX9pb9ri91fWf2fdX8K2VtaXNtaarZXMms2dtaxJmG1WO8CLicZKiMkAnPymrr4aMari4vkULaeq/4cIzvG99bn6SftSfsof8EfP2nv2i/Gn7Q5/4KRT+Gj4z1a41b+yrLxBa/ZrM3LbvJizMpEadFBAIXA7V5Rr/APwQL+EX7Tn7Onjzxz/wTt/bZ1L4y6n4SspJL3SLnUBe6fc7oncWs721wTCZ1RgjPHIhwQVIzjJ87/gy2P8Ay5eKx+Hi/wD+Kr6X+HH/AAV6/wCDfL/gl/8As3/E3Sf+CYujeItX8VeNrTaNKmttXVbu8jikitzNd6t8sMEfmsz7CW252ozYB4YyqxsqMpN9E4pfqzS6fxW+8474beO/GXwd/wCDMG48b/CXVrvw7q9/eeW9/p8rW9z5epeLUt7gCRCGXzIJGjJBB2HFfxi/8Lx+On/Q9eJf/Bxef/Hq/pO/4I//APBYH9g74a/8E7te/wCCTf8AwVQ8L3+r/DW8nuZbDULC0lu4WtrudbtoLhLZxdRzw3m64gnhU7fl5V4wX+hxL/wZa/8APl4r/Lxf/wDFV20Kn1edRVqbu3fRJr8zOS5kuWR9N/8ABvZ8QvHvxY/4Imftc+Hfiprd/wCJ7PTBr8NpHq9zJfCGKbQI3eNDMzlUL5faDt3EnGSSfU/+CWH7NHxw/bC/4NULb9nT9nK/tNM8Z+Jb3WotOu767lsYImj16SV2aeCOWRcIjY2ocnA4BzXxh8ev+CzP/BIT9i7/AIJ4fEL9iX/gjZ4b1r+0/iVDewXF/fW17Fb2r6lCtrcXc0+psbmaRbcbIIlUoGC5wu7Pxh8Lv+Cof7IXgj/g2y1v/gm7J4h1G1+L9zPqBtdPi067MOLjWTeRH7asf2dcwEMf3gIPynniuN0Kk5OcYtKU1a69enzNFNJWb6Hqf/ELf/wXDP8AzUfwx/4WOs//ACBX6I/8FxPiVa/sLf8ABGz9nv8AYh+M3i7T/G/xt8L6x4Xvbyytr5rmSceH1aa4meSYCdbfdshjmljVn3DC9QP4k/gH+0b8a/2YvjZ4X/aI+DmvXVn4q8G366jpk1xNLPCJVVkdJEZ/mimid4ZV4LRuy5Gc1/Qf/wAFhP25P+CUX/BUX4bfDP8Aa40u/wBT8E/HvT10qz8a+GbbSLuSDUdOkljW8h/tAQLE8tkvmPaXAkBeItGV3sgTrxOFq+1pqs+aHkkvloZxmmny6M/b7/goL8ZP+CPv/BY7Tfh38ZJP213+Cb6FptzC2j2+pR6bdFrxo5GW7tp3jdJYim3OCD2JHNfEHwq/4I5/8E4P2hvHdj8HvgB/wUi1vxL4v1nzV07TbLWLe7uJ3ijaVtkKXKvJtRGcqpB2qTxiuJEv/BltjBs/FZ/Dxf8A417h+zb+07/waK/scfGzQv2mPgCniez8Y+FHnn0ueS18T3YjlmhkgYiK63QsTHK6jeMAnPBANcOsE1ScvJcq/O/6Gt+9vvP5Hv28P2W/iZ+xP+2L8QP2WPjFrMfiLxH4Q1GOK51aJpHF9Fd28V3b3B84tIGkt5o2dWZtj5UMwAY/D/jeUR+HpV/vsqj88/0r9Jf+CpP7Xnhj9vf/AIKDfE/9r7wTptzpGjeMr6zOn2t7tFytrp1jb2MbShSwV5Ft/MKhjt3YzxX5h/EW42WFva93kLf98j/69e7iJyjgm6m/Lr89Dlil7TQ8jooor407j//S/wA/+vovQ7sX2kW91nJZBn6jg/rXzpXrvw9v/NsJdPY8xNuH+63/ANf+dezklXlrOD+0vy/pmGIjeNz0OiiivqziCvo79jdiv7YfwkIBJ/4TPQgAPe9iFfONW7C/1DSr6DVNJuJbS6tpFlhngdopYpEOVZHUhlZSMgggg9K5Mww31nC1sOnbnjKN+3Mmr/ia4eoqdWFRq9mn9zuf24/8FG/2av2JPjl4i8I+Lv2xviRH4MsvC8N7Db2X9oW1g14bsxOwLShpDgQjCxKGPPPavzLk/aV/4IRfssutr8IvhtJ8S9Til3fa5rFtTVZEHDifVnWMDIGPIQqDyBnJr+bWRBPeS6jcky3M7M8k0hLyOzHLMznLMSeSSck06vxrIPBZ4PAUstx2c4mpQpppU6cvYU9W5NOMbyerb1nc+8zDjz22InicNgaUakt5SXPLRJaN2S0XY/f34k/8HBfx7vbP+w/gJ4D0HwdZRsVia8d9QcRAELiKMW0SN0PR1HTnrX5TftCftsftUftU2kOl/Hnxjda3p1tcC7h09YorWzjmClQ4igRASqswUvuIycV8t0V97kPh5w1k01Vy3AU4VFtNrnmvSc+aa+TPnMx4nzXHRcMViJOL+ynaP/gKsvwCiiivszwQooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvGviBdibV0tVPEKDP1bn+WK9jZlRS7nAAyTXzhql4dQ1Ga9P/AC0ckfTt+leLnlXloqn3f5f0jow8feuUKKKK+VOw/9P/AD/66LwrqX9ma1FK5xHJ8j/Rv8Dg1ztFaUqjpzU47oTV1Y+oKK5nwnq41bSUMhzLD8j/AIdD+I/Wumr7ylVjUgpx2Z5sk07MKKKK0EFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQByPjTUvsGivEhxJcfIPp3/Tj8a8NrqvF+rjVdWYRHMUPyJ7+p/E1ytfGZnifbV3bZaI76MOWIUUUV5xqf//U/wA/+iiigDo/DGtHRdTWWQ/uZPlkHt6/hXvisGAZTkHkEV8wV6x4H8QiaMaNeN86D90T3A7fh29q97Jsbyv2E3o9vXsc1enf3kekUUUV9McgUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFcj4x1saVpxghOJ5wVXHUDuf8K6O+vbfTrV7y6baiDJ/wAPxr591fVLjWL972478KP7q9hXlZrjfY0+SL95/gu5tRp8zu9jMooor5A7gooooA//1f8AP/ooooAKfFLJDIs0TFWUggjqCKZRQmB7v4Y8Rxa5beXKQtzGPnX1HqP88V1NfM9pd3FjcLdWrFJEOQRXuXhzxLba7DsbCXCj5k9fce38q+sy3MlVSp1H735/8E4qtLl1Wx01FFFewYBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFMkkjijaWVgqqMkngACklljgjaaZgqqMkngAV4x4p8Vvq7GysiVtlPJ6FyO59vQVx4zGQw8OaW/RGlOm5Mr+KvEja3ceRbki2jPyj+8fU/0rkqKK+MrVpVZuc3qzvjFJWQUUUVkMKKKKAP/1v8AP/ooooAKKKKACpYJ5raVZ7dijqcgjgioqKadtUB7H4d8aQX4FpqpEU3QN0Vv8DXe18v12Oh+MdQ0rEFzmeAdifmX6H+h/SvoMFnNrQr/AH/5nLUodYnt9FZOl63pusR77KQE4yUPDD6j/IrWr6GE4zXNF3RzNNaMKKKKoQUUUUAFFFFABRRRQAUUUUAFFFNd1jUu5AA5JPAFADqz9R1Sy0q3NxfOEXsO5PoB3rkNb8dWdoGt9KAnk/v/AMA/x/lXlV7f3mozm5vZDI57nt9B2rx8Zm9OneNL3pfgb06DerNvxB4ovNcfyh+6tweEB6+59a5iiivl6tWdSTnN3Z2RikrIKKKKzGFFFFABRRRQB//X/wA/+iiigAooooAKKKKACiiigB8ckkLiWJirLyCDgiu30zx5qdoBHfKLhB3PDfn3/EVwtFbUcRUpO9OViZRUt0e8af4w0K/ABl8lz/DJ8v69P1rpkdJFDoQQe45r5hq3a397Ytus5njP+ySK9mjnslpVjf0MJYddGfStFeGW/jbxDBw0qygdnUfzGDWzD8Rb1R+/tkb/AHSV/wAa74Zzhnu2vl/kZvDzPWqK80T4jQ4+e1IPs/8A9anH4jWva1b/AL6H+Fbf2phf5/wf+RPsZ9j0mivLpPiO3/LK0/N//rVlz/EDWZOIUjj/AAJP6molm+FW0r/JjVCZ7LVC81TTtPXdezJH7E8/l1rwu68Ta9eDE1y+PRfl/lisMksdzHJNcVXPV/y6h95pHDd2etal8QrSLMelxGU/3n+Vfy6n9K871PXdU1dv9NlJXqEHCj8KyKK8fEY+vW0nLTstjeNOMdkFFFFcZYUUUUAFFFFABRRRQAUUUUAf/9D/AD/6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//R/wA/+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//2Q==";
var _NAV={services:0,capabilities:1,cases:2,stack:3,contact:4,erp:5,infinity:6,bankhours:7,support:8};

// ── SOCIAL ICONS ──────────────────────────────────────────────────────────────
var _SOCIAL_SVGS = {
  linkedin:'<svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(247,247,249,.6)"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
  facebook:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(247,247,249,.6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  instagram:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(247,247,249,.6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
  x:'<svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(247,247,249,.6)"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  youtube:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(247,247,249,.6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="rgba(247,247,249,.6)" stroke="none"/></svg>',
  google:'<svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(247,247,249,.6)"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>',
  tiktok:'<svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(247,247,249,.6)"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>',
  skool:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(247,247,249,.6)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="4"/><circle cx="9" cy="9" r="1.7"/><circle cx="15" cy="9" r="1.7"/><path d="M6 18 V15 a3 3 0 0 1 3-3 a3 3 0 0 1 3 3"/><path d="M18 18 V15 a3 3 0 0 0-3-3 a3 3 0 0 0-3 3"/><path d="M9 18 V13"/><path d="M15 18 V13"/></svg>'
};

function _renderSocialIcons() {
  var keys = ['linkedin','facebook','instagram','x','youtube','google','tiktok','skool'];
  var sl   = window._SOCIAL_LINKS || {};
  var html = '';
  keys.forEach(function(k) {
    if (!sl[k] || sl[k].enabled === false) return;
    var url = (sl[k].url || '').trim() || '#';
    html += '<a class="pft-social-btn" href="' + url + '" target="_blank" rel="noopener noreferrer" aria-label="' + k + '">'
      + (_SOCIAL_SVGS[k] || '') + '</a>';
  });
  document.querySelectorAll('.pft-social').forEach(function(el) { el.innerHTML = html; });
}

window.slUpdateUrl = function(key, val) {
  if (window._SOCIAL_LINKS && window._SOCIAL_LINKS[key]) window._SOCIAL_LINKS[key].url = val;
};
window.slToggle = function(key) {
  if (!window._SOCIAL_LINKS || !window._SOCIAL_LINKS[key]) return;
  window._SOCIAL_LINKS[key].enabled = !window._SOCIAL_LINKS[key].enabled;
  var btn = document.getElementById('sl-toggle-' + key);
  if (btn) btn.classList.toggle('on', window._SOCIAL_LINKS[key].enabled);
};
window.slSaveAll = function() {
  ['linkedin','facebook','instagram','x','youtube','google','tiktok','skool'].forEach(function(k) {
    var inp = document.getElementById('sl-url-' + k);
    var tog = document.getElementById('sl-toggle-' + k);
    if (inp && window._SOCIAL_LINKS[k]) window._SOCIAL_LINKS[k].url     = inp.value.trim();
    if (tog && window._SOCIAL_LINKS[k]) window._SOCIAL_LINKS[k].enabled = tog.classList.contains('on');
  });
  _renderSocialIcons();
  if (window._adminToast) window._adminToast('Social links saved \u2713');
};


// ── PAGE BACKGROUNDS ─────────────────────────────────────────────────────────
window._PAGE_BACKGROUNDS = {
  home:         { type:'none', src:null, opacity:0.15, overlay:true },
  services:     { type:'none', src:null, opacity:0.15, overlay:true },
  capabilities: { type:'none', src:null, opacity:0.15, overlay:true },
  cases:        { type:'none', src:null, opacity:0.15, overlay:true },
  stack:        { type:'none', src:null, opacity:0.15, overlay:true },
  contact:      { type:'none', src:null, opacity:0.15, overlay:true },
  erp:          { type:'none', src:null, opacity:0.15, overlay:true },
  infinity:     { type:'none', src:null, opacity:0.15, overlay:true },
  bankhours:    { type:'none', src:null, opacity:0.15, overlay:true },
  support:      { type:'none', src:null, opacity:0.15, overlay:true },
  zoho_crm:     { type:'none', src:null, opacity:0.15, overlay:true },
  zoho_books:   { type:'none', src:null, opacity:0.15, overlay:true },
  zoho_analytics:{ type:'none', src:null, opacity:0.15, overlay:true },
  zoho_flow:    { type:'none', src:null, opacity:0.15, overlay:true },
  zoho_desk:    { type:'none', src:null, opacity:0.15, overlay:true },
  zoho_sign:    { type:'none', src:null, opacity:0.15, overlay:true },
  zoho_projects:{ type:'none', src:null, opacity:0.15, overlay:true },
  zoho_inventory:{ type:'none', src:null, opacity:0.15, overlay:true },
  zoho_people:  { type:'none', src:null, opacity:0.15, overlay:true },
  zoho_recruit: { type:'none', src:null, opacity:0.15, overlay:true },
  zoho_expense: { type:'none', src:null, opacity:0.15, overlay:true },
  zoho_creator: { type:'none', src:null, opacity:0.15, overlay:true },
};


// ── PAGE BACKGROUND RENDERER ─────────────────────────────────────────────────
function _applyPageBackground(page){
  var bgEl = document.getElementById('pageBgLayer');
  if(!bgEl) return;
  var bgs = window._PAGE_BACKGROUNDS || {};
  // Match zoho sub-pages to their key
  var key = page;
  if(!bgs[key]) key = 'home';
  var bg = bgs[key];
  if(!bg || bg.type === 'none' || !bg.src){
    bgEl.style.display = 'none';
    bgEl.innerHTML = '';
    return;
  }
  bgEl.style.display = 'block';
  bgEl.style.opacity = bg.opacity || 0.15;
  if(bg.type === 'image' || bg.type === 'gif'){
    bgEl.innerHTML = '<img src="'+bg.src+'" style="width:100%;height:100%;object-fit:cover;display:block">';
  } else if(bg.type === 'video'){
    bgEl.innerHTML = '<video autoplay loop muted playsinline style="width:100%;height:100%;object-fit:cover;display:block" src="'+bg.src+'"></video>';
  }
}


// ── SOCIAL ICONS ──────────────────────────────────────────────────────────────
var _SOCIAL_SVGS = {
  linkedin:'<svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(247,247,249,.6)"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
  facebook:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(247,247,249,.6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  instagram:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(247,247,249,.6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
  x:'<svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(247,247,249,.6)"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  youtube:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(247,247,249,.6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="rgba(247,247,249,.6)" stroke="none"/></svg>',
  google:'<svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(247,247,249,.6)"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>',
  tiktok:'<svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(247,247,249,.6)"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>',
  skool:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(247,247,249,.6)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="4"/><circle cx="9" cy="9" r="1.7"/><circle cx="15" cy="9" r="1.7"/><path d="M6 18 V15 a3 3 0 0 1 3-3 a3 3 0 0 1 3 3"/><path d="M18 18 V15 a3 3 0 0 0-3-3 a3 3 0 0 0-3 3"/><path d="M9 18 V13"/><path d="M15 18 V13"/></svg>'
};

function _renderSocialIcons() {
  var keys = ['linkedin','facebook','instagram','x','youtube','google','tiktok','skool'];
  var sl   = window._SOCIAL_LINKS || {};
  var html = '';
  keys.forEach(function(k) {
    if (!sl[k] || sl[k].enabled === false) return;
    var url = (sl[k].url || '').trim() || '#';
    html += '<a class="pft-social-btn" href="' + url + '" target="_blank" rel="noopener noreferrer" aria-label="' + k + '">'
      + (_SOCIAL_SVGS[k] || '') + '</a>';
  });
  document.querySelectorAll('.pft-social').forEach(function(el) { el.innerHTML = html; });
}

window.slUpdateUrl = function(key, val) {
  if (window._SOCIAL_LINKS && window._SOCIAL_LINKS[key]) window._SOCIAL_LINKS[key].url = val;
};
window.slToggle = function(key) {
  if (!window._SOCIAL_LINKS || !window._SOCIAL_LINKS[key]) return;
  window._SOCIAL_LINKS[key].enabled = !window._SOCIAL_LINKS[key].enabled;
  var btn = document.getElementById('sl-toggle-' + key);
  if (btn) btn.classList.toggle('on', window._SOCIAL_LINKS[key].enabled);
};
window.slSaveAll = function() {
  ['linkedin','facebook','instagram','x','youtube','google','tiktok','skool'].forEach(function(k) {
    var inp = document.getElementById('sl-url-' + k);
    var tog = document.getElementById('sl-toggle-' + k);
    if (inp && window._SOCIAL_LINKS[k]) window._SOCIAL_LINKS[k].url     = inp.value.trim();
    if (tog && window._SOCIAL_LINKS[k]) window._SOCIAL_LINKS[k].enabled = tog.classList.contains('on');
  });
  _renderSocialIcons();
  if (window._adminToast) window._adminToast('Social links saved \u2713');
};


// ── PAGE BACKGROUNDS ─────────────────────────────────────────────────────────
window._PAGE_BACKGROUNDS = {
  home:         { type:'none', src:null, opacity:0.15, overlay:true },
  services:     { type:'none', src:null, opacity:0.15, overlay:true },
  capabilities: { type:'none', src:null, opacity:0.15, overlay:true },
  cases:        { type:'none', src:null, opacity:0.15, overlay:true },
  stack:        { type:'none', src:null, opacity:0.15, overlay:true },
  contact:      { type:'none', src:null, opacity:0.15, overlay:true },
  erp:          { type:'none', src:null, opacity:0.15, overlay:true },
  infinity:     { type:'none', src:null, opacity:0.15, overlay:true },
  bankhours:    { type:'none', src:null, opacity:0.15, overlay:true },
  support:      { type:'none', src:null, opacity:0.15, overlay:true },
  zoho_crm:     { type:'none', src:null, opacity:0.15, overlay:true },
  zoho_books:   { type:'none', src:null, opacity:0.15, overlay:true },
  zoho_analytics:{ type:'none', src:null, opacity:0.15, overlay:true },
  zoho_flow:    { type:'none', src:null, opacity:0.15, overlay:true },
  zoho_desk:    { type:'none', src:null, opacity:0.15, overlay:true },
  zoho_sign:    { type:'none', src:null, opacity:0.15, overlay:true },
  zoho_projects:{ type:'none', src:null, opacity:0.15, overlay:true },
  zoho_inventory:{ type:'none', src:null, opacity:0.15, overlay:true },
  zoho_people:  { type:'none', src:null, opacity:0.15, overlay:true },
  zoho_recruit: { type:'none', src:null, opacity:0.15, overlay:true },
  zoho_expense: { type:'none', src:null, opacity:0.15, overlay:true },
  zoho_creator: { type:'none', src:null, opacity:0.15, overlay:true },
};


// ── PAGE BACKGROUND RENDERER ─────────────────────────────────────────────────
function _applyPageBackground(page){
  var bgEl = document.getElementById('pageBgLayer');
  if(!bgEl) return;
  var bgs = window._PAGE_BACKGROUNDS || {};
  // Match zoho sub-pages to their key
  var key = page;
  if(!bgs[key]) key = 'home';
  var bg = bgs[key];
  if(!bg || bg.type === 'none' || !bg.src){
    bgEl.style.display = 'none';
    bgEl.innerHTML = '';
    return;
  }
  bgEl.style.display = 'block';
  bgEl.style.opacity = bg.opacity || 0.15;
  if(bg.type === 'image' || bg.type === 'gif'){
    bgEl.innerHTML = '<img src="'+bg.src+'" style="width:100%;height:100%;object-fit:cover;display:block">';
  } else if(bg.type === 'video'){
    bgEl.innerHTML = '<video autoplay loop muted playsinline style="width:100%;height:100%;object-fit:cover;display:block" src="'+bg.src+'"></video>';
  }
}



// ── NAV RENDERER ─────────────────────────────────────────────────────────────
function _renderNav(){
  var nl = document.getElementById('navLinks');
  if(nl){
    var pages = window._NAV_PAGES || [];
    nl.innerHTML = pages.filter(function(p){ return p.enabled; }).map(function(p){
      return '<a href="#" onclick="go(\'' + p.key + '\')">' + p.label + '</a>';
    }).join('');
    // Re-apply active state
    var app = document.getElementById('app');
    if(app && window._currentPage){
      _highlightNav(window._currentPage);
    }
  }
  // Also propagate the hide flag to other places that link to these pages
  // (mobile hamburger menu + footer Company column) — those use static markup
  // tagged with data-page-key so we can toggle them here.
  _applyNavVisibility();
}

// Hide/show any element with [data-page-key="<k>"] based on whether that
// page is enabled in window._NAV_PAGES. Used by:
//   - components/Layout.js mobile hamburger menu items
//   - lib/footer.js Company-column links
// Safe to call multiple times. No-op if _NAV_PAGES isn't populated yet.
function _applyNavVisibility(){
  var pages = window._NAV_PAGES;
  if(!Array.isArray(pages)) return;
  // Build {key: enabled} lookup
  var byKey = {};
  pages.forEach(function(p){ if(p && p.key) byKey[p.key] = !!p.enabled; });
  // Walk every tagged element. Use empty string (not 'block' / 'flex') so we
  // restore the element's default display value, whatever it is.
  var nodes = document.querySelectorAll('[data-page-key]');
  for(var i = 0; i < nodes.length; i++){
    var el  = nodes[i];
    var key = el.getAttribute('data-page-key');
    if(!key) continue;
    // If the page isn't in _NAV_PAGES at all, default to visible.
    var enabled = (byKey[key] === undefined) ? true : byKey[key];
    el.style.display = enabled ? '' : 'none';
  }
}
window._applyNavVisibility = _applyNavVisibility;

function _highlightNav(page){
  document.querySelectorAll('#navLinks a').forEach(function(a){
    var onclick = a.getAttribute('onclick') || '';
    var m = onclick.match(/go\(['"]([^'"]+)['"]\)/);
    var linkPage = m ? m[1] : '';
    a.classList.toggle('on', linkPage === page);
  });
}


// ── SUBMISSIONS ───────────────────────────────────────────────────────────────
window._SUBMISSIONS = [];

window.submitForm = function(e){
  e.preventDefault();

  // ── Read every field ────────────────────────────────────────────────────
  function val(id){ var el = document.getElementById(id); return el ? String(el.value || '').trim() : ''; }
  var fname    = val('fname');
  var lname    = val('lname');
  var email    = val('email');
  var phone    = val('phone');
  var company  = val('company');
  var size     = val('size');
  var message  = val('message');
  var timeline = val('timeline');
  // Selected services from the multi-select dropdown (checkboxes inside
  // #svcChips). Falls back to the legacy active-chip selector for any cached
  // HTML still using the old button row.
  var checked  = document.querySelectorAll('#svcChips input[data-svc]:checked');
  var services = Array.from(checked).map(function(c){ return c.value; });
  if (!services.length) {
    var legacyChips = document.querySelectorAll('#svcChips .svc-chip.active, #svcChips .svc-chip.sel');
    services = Array.from(legacyChips).map(function(c){ return c.textContent.trim(); });
  }

  // ── Validation ──────────────────────────────────────────────────────────
  function setErr(id, msg){
    var input = document.getElementById(id) || document.querySelector('[id="'+id+'"]');
    if (input) input.classList.add('invalid');
    var slot = document.querySelector('.fg-err[data-for="' + id + '"]');
    if (slot) { slot.textContent = msg; slot.classList.add('is-shown'); }
  }
  function clearErr(id){
    var input = document.getElementById(id);
    if (input) input.classList.remove('invalid');
    var slot = document.querySelector('.fg-err[data-for="' + id + '"]');
    if (slot) { slot.textContent = ''; slot.classList.remove('is-shown'); }
  }
  function clearAllErrors(){
    ['fname','lname','email','phone','company','size','svcChips','message','timeline'].forEach(clearErr);
    var fe = document.getElementById('formErr');
    if (fe) { fe.style.display = 'none'; fe.textContent = ''; }
  }
  clearAllErrors();

  var problems = [];
  if (!fname)                                              { setErr('fname',    'First name is required.');                  problems.push('fname'); }
  if (!lname)                                              { setErr('lname',    'Last name is required.');                   problems.push('lname'); }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('email',    'Please enter a valid email.');              problems.push('email'); }
  if (!phone || phone.replace(/\D/g, '').length < 7)       { setErr('phone',    'Please enter a valid phone number.');       problems.push('phone'); }
  if (!company)                                            { setErr('company',  'Company is required.');                     problems.push('company'); }
  if (!size || !/^\d+$/.test(size) || Number(size) < 1)    { setErr('size',     'Company size must be a positive number.');  problems.push('size'); }
  if (!services.length)                                    { setErr('svcChips', 'Pick at least one service.');                problems.push('svcChips'); }
  if (!message)                                            { setErr('message',  'Please tell us how we can help.');           problems.push('message'); }
  if (!timeline)                                           { setErr('timeline', 'Please pick a timeline.');                   problems.push('timeline'); }

  if (problems.length) {
    var firstBad = document.getElementById(problems[0]) || document.querySelector('[id="' + problems[0] + '"]');
    if (firstBad && firstBad.focus) try { firstBad.focus(); } catch(_) {}
    return;
  }

  // ── Send ────────────────────────────────────────────────────────────────
  var btn = document.getElementById('submitBtn');
  var originalBtnHTML = btn ? btn.innerHTML : '';
  if(btn){ btn.innerHTML = 'Sending&hellip;'; btn.style.opacity = '.7'; btn.disabled = true; }

  // Build the JSON payload for our server route. The server maps these into
  // Zoho's exact field names (Name_First, etc.) and POSTs as multipart.
  var payload = {
    fname:    fname,
    lname:    lname,
    email:    email,
    phone:    phone,
    company:  company,
    size:     size,
    message:  message,
    timeline: timeline,
    services: services,
  };

  // Parallel write to Supabase so the admin Submissions dashboard still
  // records every lead and the Postgres → Resend trigger fires its
  // notification email. Non-blocking and best-effort — if Supabase is down,
  // the Zoho path is still the primary record-of-truth via Zoho CRM.
  var submission = {
    id:        Date.now(),
    datetime:  new Date().toLocaleString(),
    name:      (fname + ' ' + lname).trim(),
    email:     email,
    phone:     phone,
    company:   company,
    size:      size,
    timeline:  timeline,
    services:  services,
    message:   message,
    status:    'New',
    contacted: false,
  };
  window._SUBMISSIONS = window._SUBMISSIONS || [];
  window._SUBMISSIONS.unshift(submission);
  try {
    insertSubmission(submission).catch(function () { /* swallow — Zoho is primary */ });
  } catch (_) {}

  // POST to our Next.js route which forwards to Zoho server-side.
  fetch('/api/contact', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  })
    .then(function (r) {
      return r.json().then(function (data) { return { ok: r.ok, status: r.status, data: data }; },
                            function ()     { return { ok: r.ok, status: r.status, data: {} }; });
    })
    .then(function (res) {
      if (res.ok && res.data && res.data.ok) {
        // Success — flip to the existing success state.
        var fw = document.getElementById('formWrap');
        var ss = document.getElementById('successState');
        if (fw) fw.style.display = 'none';
        if (ss) ss.style.display = 'block';
        // Reset the form fields for the (unlikely) case the user comes back to it.
        var form = document.getElementById('contactForm');
        if (form && form.reset) form.reset();
        var checks = document.querySelectorAll('#svcChips input[data-svc]:checked');
        checks.forEach(function (c) { c.checked = false; });
        if (typeof window._chatBusy === 'undefined') {
          // touch updateLabel via the multi-select binder if present
          var tt = document.getElementById('svcTriggerText');
          if (tt) tt.textContent = 'Select services…';
        }
        return;
      }
      // Failure path — surface server-side per-field errors if any, otherwise
      // a friendly top-level message. Leave form values intact so the user
      // can fix and retry.
      if (res.data && res.data.fields) {
        Object.keys(res.data.fields).forEach(function (id) {
          var slotId = id === 'services' ? 'svcChips' : id;
          setErr(slotId, res.data.fields[id]);
        });
      }
      var fe = document.getElementById('formErr');
      if (fe) {
        fe.textContent = (res.data && res.data.friendly)
          ? res.data.friendly
          : 'Sorry — the submission failed. Please try again, or email info@mirroradvisors.com.';
        fe.style.display = 'block';
      }
    })
    .catch(function () {
      var fe = document.getElementById('formErr');
      if (fe) {
        fe.textContent = 'Sorry — the submission failed. Please check your connection and try again, or email info@mirroradvisors.com.';
        fe.style.display = 'block';
      }
    })
    .then(function () {
      if (btn) { btn.innerHTML = originalBtnHTML; btn.style.opacity = ''; btn.disabled = false; }
    });

  // Clear individual field errors as the user starts editing again. Idempotent
  // — bound once per page via a dataset flag on the form.
  var form = document.getElementById('contactForm');
  if (form && form.dataset.errBindings !== '1') {
    form.dataset.errBindings = '1';
    ['fname','lname','email','phone','company','size','message','timeline'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', function () { clearErr(id); });
    });
    var svcChecks = document.querySelectorAll('#svcChips input[data-svc]');
    svcChecks.forEach(function (c) { c.addEventListener('change', function () { clearErr('svcChips'); }); });
  }
};

window.updateChar = function(el){
  var l = el.value.length;
  var cc = document.getElementById('charCount');
  if(cc) cc.textContent = l + ' / 1000';
  if(l > 1000) el.value = el.value.slice(0, 1000);
};

/* go() handled by Next.js router in Layout */
window.addEventListener('scroll',function(){
  document.getElementById('nav').style.background=window.scrollY>40?'rgba(8,11,26,.97)':'rgba(8,11,26,.92)';
});
window.tf=function(i){var el=document.getElementById('f'+i);if(el)el.classList.toggle('open');};
window.toggleChip=function(el){el.classList.toggle('active');};

// ============================================================
//   COOKIE CONSENT BANNER LOGIC
// ============================================================
(function(){
  var COOKIE_KEY = 'ma_cookie_consent';
  function getConsent(){
    try { return localStorage.getItem(COOKIE_KEY); } catch(e){ return null; }
  }
  function setConsent(value){
    try { localStorage.setItem(COOKIE_KEY, value); } catch(e){}
  }
  function showBanner(){
    var el = document.getElementById('cookieBanner');
    if(el) { setTimeout(function(){ el.classList.add('is-visible'); }, 600); }
  }
  function hideBanner(){
    var el = document.getElementById('cookieBanner');
    if(el) el.classList.remove('is-visible');
  }
  window.acceptCookies = function(){
    setConsent('accepted');
    hideBanner();
  };
  window.declineCookies = function(){
    setConsent('declined');
    hideBanner();
  };
  window.resetCookieConsent = function(){
    try { localStorage.removeItem(COOKIE_KEY); } catch(e){}
    var el = document.getElementById('cookieBanner');
    if(el){ el.classList.remove('is-visible'); setTimeout(showBanner, 100); }
  };
  // Show banner on first visit
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){
      if(!getConsent()) showBanner();
    });
  } else {
    if(!getConsent()) showBanner();
  }
})();
;
/* filter: see _INIT.cases */


/* Lightweight Zoho One detail pages — generated */




































/* case_0: dynamic */

/* case_1: dynamic */

/* case_2: dynamic */

/* case_3: dynamic */

/* case_4: dynamic */

/* case_5: dynamic */

/* case_6: dynamic */

/* case_7: dynamic */

/* case_8: dynamic */









// ── Dynamic case detail renderer ────────────────────────────────────────────
// Public entry point used by /cases/[idx] route.
function _buildCasePage(idx){
  var c = window._CASES[idx];
  if(!c) return '<div style="padding:120px 40px;text-align:center;color:var(--dim)">Case study not found.</div>';
  return _buildCaseDetailHTML(c, { preview: false });
}

// Core renderer — same HTML the public visitor sees, parametrised so the
// admin preview can reuse it. opts.preview=true:
//   - disables `go(...)` navigation in the back button + CTA links
//   - skips the global site footer (the admin preview pane has its own chrome)
function _buildCaseDetailHTML(c, opts){
  opts = opts || {};
  var preview = !!opts.preview;
  var tc  = c.tt  || '#ECA934';
  var tbg = c.tc  || 'rgba(236,169,52,.12)';
  var html = '';

  // ── Hero ──────────────────────────────────────────────────────────────────
  html += '<div class="cd-page">'
    + '<div class="cd-hero" style="background:radial-gradient(ellipse at 65% 40%,'+tbg.replace(')',',0.35)').replace('rgba(','rgba(')+' 0%,transparent 65%),#080B1A;">'
    + '<div class="ph-grid"></div>'
    + '<div class="cd-hero-inner">'
    + '<button class="cd-back"' + (preview ? ' onclick="return false" style="pointer-events:none;opacity:.6"' : ' onclick="go(\'cases\')"') + '>'
    + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>'
    + 'All Case Studies'
    + '</button>'
    + '<div class="cd-meta-row">'
    + '<span class="cd-tag" style="background:'+tbg+';color:'+tc+'">'+c.cat+'</span>'
    + '</div>'
    + '<h1 class="cd-h1">'+c.title+'</h1>'
    + '<p class="cd-lead">'+c.desc+'</p>'
    + '</div>'
    + '</div>';

  // ── Metrics strip ─────────────────────────────────────────────────────────
  // Source of truth, in priority order:
  //   1. The first `metrics` block the admin added in the Detail Page tab
  //      (items: [{val,lbl}, ...]). Use up to 4. If they added only one or
  //      two, that's all we show — no padding with hardcoded defaults.
  //   2. Card-tab fields c.m1/ml1 + c.m2/ml2 plus the "100% On-Time" and
  //      "0 Scope Creep" defaults — only when the case has no metrics
  //      block at all (the legacy / default behaviour).
  var blocks = (c.blocks && c.blocks.length) ? c.blocks : _defaultBlocks(c);
  var metricsBlock = null;
  for (var bi = 0; bi < blocks.length; bi++) {
    if (blocks[bi] && blocks[bi].type === 'metrics' && Array.isArray(blocks[bi].items) && blocks[bi].items.length) {
      metricsBlock = blocks[bi];
      break;
    }
  }
  var stripItems;
  if (metricsBlock) {
    stripItems = metricsBlock.items.slice(0, 4).map(function (m, i) {
      // Alternate accent / blue / green colours so the strip still feels designed.
      var colours = [tc, tc, '#4CAF50', '#6B9FD4'];
      return { val: m.val || '', lbl: m.lbl || '', color: colours[i] || tc };
    });
  } else {
    stripItems = [
      { val: c.m1 || '', lbl: c.ml1 || '', color: tc },
      { val: c.m2 || '', lbl: c.ml2 || '', color: tc },
      { val: '100%',     lbl: 'On-Time Delivery', color: '#4CAF50' },
      { val: '0',        lbl: 'Scope Creep',       color: '#6B9FD4' },
    ];
  }
  html += '<div class="cd-metrics-strip">'
    + stripItems.map(function (m) {
        return '<div class="cd-metric-card"><div class="cd-metric-val" style="color:'+m.color+'">'+m.val+'</div><div class="cd-metric-lbl">'+m.lbl+'</div></div>';
      }).join('')
    + '</div>';

  // ── Two-column layout ─────────────────────────────────────────────────────
  html += '<div class="cd-layout">';

  // Left — main content
  html += '<div class="cd-main">';

  blocks.forEach(function(b){
    if(b.type === 'metrics') return; // already rendered in strip above

    if(b.type === 'section'){
      html += '<div class="cd-section">';
      if(b.label)   html += '<div class="cd-section-label">'+b.label+'</div>';
      if(b.heading) html += '<div class="cd-section-h">'+b.heading+'</div>';
      if(b.body)    html += '<p class="cd-body-text">'+b.body+'</p>';
      html += '</div>';
    }
    else if(b.type === 'media'){
      html += '<div class="cd-media-wrap">';
      if(b.mediaType === 'video')
        html += '<video controls src="'+b.src+'" style="width:100%;max-height:480px;display:block"></video>';
      else
        html += '<img src="'+b.src+'" alt="" style="width:100%;max-height:480px;object-fit:cover;display:block">';
      if(b.caption) html += '<div class="cd-media-caption">'+b.caption+'</div>';
      html += '</div>';
    }
    else if(b.type === 'callout'){
      var bdr = b.color || tc;
      html += '<div class="cd-section" style="padding:20px 24px;border-radius:14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-left:3px solid '+bdr+'">';
      if(b.heading) html += '<div class="cd-section-h" style="font-size:15px;margin-bottom:8px">'+b.heading+'</div>';
      if(b.body)    html += '<p class="cd-body-text" style="font-size:14px">'+b.body+'</p>';
      html += '</div>';
    }
    else if(b.type === 'quote'){
      html += '<blockquote style="border-left:3px solid '+tc+';padding:16px 24px;margin:0 0 40px;font-size:16px;color:var(--mid);line-height:1.85;font-style:italic;background:rgba(255,255,255,.03);border-radius:0 12px 12px 0">'
        + b.body
        + (b.attribution ? '<footer style="margin-top:10px;font-size:11px;color:var(--dim);font-style:normal;font-family:Montserrat,sans-serif;font-weight:700">— '+b.attribution+'</footer>' : '')
        + '</blockquote>';
    }
    else if(b.type === 'cta'){
      html += '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:40px">';
      if(b.primary)   html += preview
        ? '<button class="bp" style="padding:13px 28px;pointer-events:none">'+b.primary+'</button>'
        : '<a href="#" onclick="go(\'contact\')"><button class="bp" style="padding:13px 28px">'+b.primary+'</button></a>';
      if(b.secondary) html += preview
        ? '<button class="bs" style="padding:12px 22px;pointer-events:none">'+b.secondary+'</button>'
        : '<a href="#" onclick="go(\'cases\')"><button class="bs" style="padding:12px 22px">'+b.secondary+'</button></a>';
      html += '</div>';
    }
    else if(b.type === 'divider'){
      html += '<hr class="cd-divider">';
    }
  });

  html += '</div>'; // .cd-main

  // Right — sidebar
  html += '<div class="cd-aside">'

    // Project details card — uses the same metrics source as the strip
    // above. If the admin added a Metrics block, list its items here. Otherwise
    // fall back to c.m1/c.m2 plus the legacy "On Time / None" pair.
    + '<div class="cd-sidebar-card">'
    + '<div class="cd-sidebar-label">Project Details</div>'
    + '<div class="cd-sidebar-item"><span class="cd-sidebar-k">Category</span><span class="cd-sidebar-v">'+c.cat+'</span></div>'
    + (metricsBlock
        ? metricsBlock.items.slice(0, 6).map(function (m, i) {
            var lbl = m.lbl || ('Result ' + (i + 1));
            return '<div class="cd-sidebar-item"><span class="cd-sidebar-k">'+lbl+'</span><span class="cd-sidebar-v">'+(m.val || '')+'</span></div>';
          }).join('')
        : (
            '<div class="cd-sidebar-item"><span class="cd-sidebar-k">Result 1</span><span class="cd-sidebar-v">'+(c.m1||'')+' '+(c.ml1||'')+'</span></div>'
          + '<div class="cd-sidebar-item"><span class="cd-sidebar-k">Result 2</span><span class="cd-sidebar-v">'+(c.m2||'')+' '+(c.ml2||'')+'</span></div>'
          + '<div class="cd-sidebar-item"><span class="cd-sidebar-k">Delivery</span><span class="cd-sidebar-v" style="color:#4CAF50">On Time</span></div>'
          + '<div class="cd-sidebar-item"><span class="cd-sidebar-k">Scope Creep</span><span class="cd-sidebar-v" style="color:#4CAF50">None</span></div>'
          )
      )
    + '</div>'

    // CTA card
    + '<div class="cd-cta-card">'
    + '<div class="cd-cta-card-title">Want results like this?</div>'
    + '<p>Every Mirror Advisors engagement starts with Scope — a fixed-fee discovery that maps your systems and builds your blueprint.</p>'
    + (preview
        ? '<button class="bp" style="width:100%;justify-content:center;padding:12px 20px;font-size:12px;pointer-events:none">Book a Strategy Session</button>'
        : '<a href="#" onclick="go(\'contact\')"><button class="bp" style="width:100%;justify-content:center;padding:12px 20px;font-size:12px">Book a Strategy Session</button></a>')
    + '</div>'

    + '</div>'; // .cd-aside

  html += '</div>'; // .cd-layout

  // No footer here — components/Layout.js already renders the site-wide
  // footer (FOOTER_HTML) inside #app for every page. Emitting one here
  // would produce a duplicate on /cases/[idx]. The admin preview path
  // already returns above.
  html += '</div>'; // close .cd-page
  return html;
}

function _defaultBlocks(c){
  var blocks=[];
  if(c.m1||c.m2) blocks.push({type:'metrics',items:[{val:c.m1||'',lbl:c.ml1||''},{val:c.m2||'',lbl:c.ml2||''},{val:'100%',lbl:'On-Time Delivery'},{val:'0',lbl:'Scope Creep'}]});
  if(c.detailMedia) blocks.push({type:'media',src:c.detailMedia.src,mediaType:c.detailMedia.type,caption:c.detailMedia.caption||''});
  if(c.problem)  blocks.push({type:'section',label:'The Challenge',heading:'What Was Broken',body:c.problem});
  if(c.solution) blocks.push({type:'section',label:'The Solution',heading:'What We Built',body:c.solution});
  if(c.results)  blocks.push({type:'section',label:'The Results',heading:'What Changed',body:c.results});
  blocks.push({type:'cta',primary:'Discuss a Similar Project',secondary:'All Case Studies'});
  return blocks;
}

function _renderBlocks(blocks, tc, tbg){
  var html='';
  blocks.forEach(function(b){
    if(b.type==='metrics'){
      html+='<div class="cd-results">';
      b.items.forEach(function(m){
        html+='<div class="cd-result"><div class="cd-result-val" style="color:'+tc+'">'+m.val+'</div><div class="cd-result-lbl">'+m.lbl+'</div></div>';
      });
      html+='</div>';
    } else if(b.type==='media'){
      html+='<div class="cd-media-section"><div class="cd-media-wrap">';
      if(b.mediaType==='video') html+='<video controls src="'+b.src+'" style="width:100%;max-height:520px;display:block"></video>';
      else html+='<img src="'+b.src+'" alt="" style="width:100%;max-height:520px;object-fit:cover;display:block">';
      if(b.caption) html+='<div class="cd-media-caption">'+b.caption+'</div>';
      html+='</div></div>';
    } else if(b.type==='section'){
      html+='<div style="max-width:900px;margin:0 auto;padding:0 40px 32px">';
      if(b.label)   html+='<div class="cd-section-label">'+b.label+'</div>';
      if(b.heading) html+='<div class="cd-section-h">'+b.heading+'</div>';
      if(b.body)    html+='<p class="cd-body-text">'+b.body+'</p>';
      html+='</div>';
    } else if(b.type==='callout'){
      var bdr=b.color||tc;
      html+='<div style="max-width:900px;margin:0 auto;padding:0 40px 28px"><div style="padding:20px 24px;border-radius:14px;background:rgba(255,255,255,.04);border:1px solid '+bdr.replace(')',', .3)').replace('rgba','rgba')+';border-left:3px solid '+bdr+'">';
      if(b.heading) html+='<div style="font-family:Montserrat,sans-serif;font-size:14px;font-weight:800;color:var(--tx);margin-bottom:8px">'+b.heading+'</div>';
      if(b.body)    html+='<p style="font-size:14px;color:var(--mid);line-height:1.75;margin:0">'+b.body+'</p>';
      html+='</div></div>';
    } else if(b.type==='quote'){
      html+='<div style="max-width:900px;margin:0 auto;padding:0 40px 32px"><blockquote style="border-left:3px solid '+tc+';padding:16px 24px;margin:0;font-size:16px;color:var(--mid);line-height:1.8;font-style:italic;background:rgba(255,255,255,.03);border-radius:0 10px 10px 0">'+b.body+'<footer style="margin-top:8px;font-size:12px;color:var(--dim);font-style:normal;font-family:Montserrat,sans-serif;font-weight:700">'+( b.attribution||'')+'</footer></blockquote></div>';
    } else if(b.type==='cta'){
      html+='<div style="max-width:900px;margin:0 auto;padding:0 40px 40px;display:flex;gap:12px;flex-wrap:wrap">';
      if(b.primary)   html+='<a href="#" onclick="go(\'contact\')"><button class="bp" style="padding:13px 28px">'+b.primary+'</button></a>';
      if(b.secondary) html+='<a href="#" onclick="go(\'cases\')"><button class="bs" style="padding:12px 22px">'+b.secondary+'</button></a>';
      html+='</div>';
    } else if(b.type==='divider'){
      html+='<div style="max-width:900px;margin:0 auto;padding:0 40px 32px"><hr style="border:none;border-top:1px solid rgba(255,255,255,.1)"></div>';
    }
  });
  return html;
}



// ── ADMIN PANEL ─────────────────────────────────────────────────────────────

// ── CHATBOT TREE ─────────────────────────────────────────────────────────────



// ── CHATBOT ENGINE — AI mode (Gemini via Supabase Edge Function) ─────────────
// The widget POSTs each question to a Supabase Edge Function (chat) which
// holds the Gemini API key as a Supabase secret and returns the grounded
// answer. Previously this was a Vercel Next.js API route at /api/chat; the
// backend was swapped to Supabase Edge Functions for consolidation — see
// supabase/functions/chat/index.ts.
//
// Widget behaviour (unchanged from the previous AI version):
//   1. Opens with a friendly greeting + a row of "quick starter" buttons
//      seeded from window._CHAT_TREE.topics. Clicks send the label as a
//      question to the AI rather than looking up a canned answer.
//   2. Free-text input row. Each question is POSTed with the last few turns
//      of history so the model can handle follow-ups.
//   3. Typing indicator while waiting; friendly fallback on any error path.
//
// Endpoint URL is built from the Supabase project URL the rest of the site
// already uses (lib/supabase.js), so there's nothing new to configure
// client-side beyond `supabase functions deploy chat` on the server side.
var _chatOpen     = false;
var _chatHistory  = [];   // [{ role: 'user'|'model', text: string }, ...]
var _chatBusy     = false;
var _chatInputBound = false;

// Build the function URL from the same Supabase project the rest of the site
// uses. Anon key + URL come from process.env (Vercel) with the production
// fallback baked into lib/supabase.js — both are designed to be public.
var _SUPABASE_URL =
  (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SUPABASE_URL) ||
  'https://vytrclwxvbhlxrvssiod.supabase.co';
var _SUPABASE_ANON_KEY =
  (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5dHJjbHd4dmJobHhydnNzaW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODY2NjIsImV4cCI6MjA5NjA2MjY2Mn0.z2_gPtcKb8k62SrRB2GjM7Fb1inpSLsQj27L3Hbnwcs';
var _CHAT_API_ENDPOINT = _SUPABASE_URL + '/functions/v1/chat';
var _CHAT_HISTORY_TURNS_TO_SEND = 12; // keep matched with the Edge Function's MAX_HISTORY_TURNS

// Greeting shown when the panel opens. Kept short — Gemini handles real
// answers; this is just an "I'm here" signal.
var _CHAT_GREETING = "Hi — I'm the Mirror Advisors assistant. Ask me anything about our services, the Zoho stack we deploy, our Claude AI work, or how we engage with new clients.";

window.chatToggle = function() {
  _chatOpen = !_chatOpen;
  var panel = document.getElementById('chatPanel');
  var btn   = document.getElementById('chatBtn');
  if (!panel || !btn) return;
  panel.classList.toggle('open', _chatOpen);
  btn.classList.toggle('open', _chatOpen);
  var pulse = btn.querySelector('.chat-pulse');
  if (pulse) pulse.style.display = _chatOpen ? 'none' : 'block';
  if (_chatOpen) {
    _initChatHeaderButtons();   // inject + / history icons (idempotent)
    _initChatInput();
    if (_chatHistory.length === 0) {
      // Try to restore the visitor's last conversation from localStorage so
      // they pick up where they left off after a refresh. Falls back to the
      // fresh greeting + starters path when there's nothing stored.
      if (!_chatRestoreCurrent()) _chatStart();
    }
    // Focus the input on every open so the visitor can just start typing.
    setTimeout(function () {
      var i = document.getElementById('chatInput');
      if (i) i.focus();
    }, 200);
  }
};

// Bind the input row exactly once. Idempotent — _initChatInput runs on every
// open, but the bound flag short-circuits subsequent calls.
function _initChatInput() {
  if (_chatInputBound) return;
  var form  = document.getElementById('chatInputForm');
  var input = document.getElementById('chatInput');
  if (!form || !input) return;
  _chatInputBound = true;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = (input.value || '').trim();
    if (!text || _chatBusy) return;
    input.value = '';
    _chatSendUserMessage(text);
  });
}

function _chatStart() {
  // Render greeting + a row of "quick starter" buttons from _CHAT_TREE topics.
  _chatRenderBot(_CHAT_GREETING);
  var tree = window._CHAT_TREE;
  var topics = (tree && Array.isArray(tree.topics)) ? tree.topics : [];
  if (topics.length) {
    var starters = topics.slice(0, 5).map(function (t) {
      return { label: t.label, sendAs: (t.label || '').trim() };
    });
    _chatRenderStarters(starters);
  }
}

// Add user's message to UI + history, then call the API and render the reply.
function _chatSendUserMessage(text) {
  if (_chatBusy) return;
  _chatBusy = true;
  _chatRenderUser(text);
  _chatHistory.push({ role: 'user', text: text });
  _chatPersistCurrent();   // persist conversation in localStorage on every turn
  // Hide any open starter row — the conversation has begun.
  var starters = document.querySelectorAll('#chatMessages .chat-starters');
  starters.forEach(function (s) { s.remove(); });

  var typing = _chatShowTyping();
  _chatSetSendEnabled(false);

  _chatFetchAnswer(text).then(function (result) {
    if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
    if (result && result.answer) {
      // MA_LEADCAPTURE_START
      // Original three lines (kept here, commented, for clean reversal):
      // _chatRenderBot(result.answer);
      // _chatHistory.push({ role: 'model', text: result.answer });
      // _chatPersistCurrent();
      var __maLead = _chatExtractLeadBlock(result.answer);
      _chatRenderBot(__maLead.cleanedText);
      _chatHistory.push({ role: 'model', text: __maLead.cleanedText });
      _chatPersistCurrent();
      if (__maLead.payload) _chatHandleLeadPayload(__maLead.payload);
      _chatShowActionButtons();
      // MA_LEADCAPTURE_END
    } else {
      _chatRenderBot(result && result.friendly
        ? result.friendly
        : "I'm having trouble reaching the assistant right now. Please try again in a moment, or email info@mirroradvisors.com.");
    }
  }).catch(function () {
    if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
    _chatRenderBot("I'm having trouble reaching the assistant right now. Please try again in a moment, or email info@mirroradvisors.com.");
  }).then(function () {
    _chatBusy = false;
    _chatSetSendEnabled(true);
    var input = document.getElementById('chatInput');
    if (input) input.focus();
  });
}
// Expose so starter-button clicks can reuse the same path.
window._chatSendUserMessage = _chatSendUserMessage;

// POST to the Supabase chat Edge Function. Includes the project's anon key
// in both Authorization (Bearer) and apikey headers — Supabase Edge Functions
// default to verify_jwt=true, and the anon key is a valid anonymous JWT.
// Sends recent history so Gemini handles follow-ups.
function _chatFetchAnswer(question) {
  return fetch(_CHAT_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + _SUPABASE_ANON_KEY,
      'apikey':        _SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({
      question: question,
      history:  _chatHistory.slice(-_CHAT_HISTORY_TURNS_TO_SEND),
    }),
  }).then(function (r) {
    return r.json().then(function (data) {
      if (!r.ok) return { friendly: data && data.friendly };
      return data;
    }, function () { return { friendly: null }; });
  }, function () {
    return { friendly: null };
  });
}

function _chatSetSendEnabled(on) {
  var btn = document.getElementById('chatSendBtn');
  var inp = document.getElementById('chatInput');
  if (btn) btn.disabled = !on;
  if (inp) inp.disabled = !on;
}

// ── DOM render helpers ───────────────────────────────────────────────────────

function _chatRenderUser(text) {
  var msgs = document.getElementById('chatMessages');
  if (!msgs) return;
  var m = document.createElement('div');
  m.className = 'chat-msg chat-msg-user';
  m.innerHTML = '<div class="chat-bubble">' + _chatEscape(text) + '</div>';
  msgs.appendChild(m);
  msgs.scrollTop = msgs.scrollHeight;
}

function _chatRenderBot(text) {
  var msgs = document.getElementById('chatMessages');
  if (!msgs) return;
  var m = document.createElement('div');
  m.className = 'chat-msg chat-msg-bot';
  m.innerHTML = '<div class="chat-bubble">' + _chatFormatBot(text) + '</div>';
  msgs.appendChild(m);
  msgs.scrollTop = msgs.scrollHeight;
}

function _chatShowTyping() {
  var msgs = document.getElementById('chatMessages');
  if (!msgs) return null;
  var t = document.createElement('div');
  t.className = 'chat-msg chat-msg-bot';
  t.innerHTML = '<div class="chat-typing"><span></span><span></span><span></span></div>';
  msgs.appendChild(t);
  msgs.scrollTop = msgs.scrollHeight;
  return t;
}

function _chatRenderStarters(starters) {
  var msgs = document.getElementById('chatMessages');
  if (!msgs || !starters || !starters.length) return;
  var row = document.createElement('div');
  row.className = 'chat-choices chat-starters';
  starters.forEach(function (s, i) {
    var b = document.createElement('button');
    b.className = 'chat-choice';
    b.textContent = s.label;
    b.style.animationDelay = (i * 0.06) + 's';
    b.addEventListener('click', function () {
      if (_chatBusy) return;
      _chatSendUserMessage(s.sendAs || s.label);
    });
    row.appendChild(b);
  });
  msgs.appendChild(row);
  msgs.scrollTop = msgs.scrollHeight;
}

// Escape HTML so a user message can never inject markup.
function _chatEscape(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Light Markdown-ish formatting for bot answers.
// 1. Escape HTML so the model can't inject arbitrary markup.
// 2. Convert bullet lines (- or •) into a real <ul>.
// 3. Inline-format each line: markdown links, **bold**, *italic*, bare URLs.
// 4. Convert paragraph breaks to <br><br>.
// NO arbitrary HTML pass-through — every produced tag is one we minted from a
// known-safe pattern, so a malicious knowledge string can't smuggle script.
function _chatFormatBot(text) {
  var safe = _chatEscape(text);

  // Convert inline markdown on a single string. Order matters:
  //   markdown-link before bare-URL  (so [text](url) wins over url)
  //   bold before italic             (so **x** doesn't get italicised twice)
  function inlineFormat(s) {
    // Markdown link: [text](https://url) → <a href="url">text</a>
    s = s.replace(/\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/g, function (_m, txt, url) {
      return '<a href="' + url + '" target="_blank" rel="noopener noreferrer" style="color:var(--t)">' + txt + '</a>';
    });
    // Bold: **text**
    s = s.replace(/\*\*([^\*\n]+)\*\*/g, '<strong>$1</strong>');
    // Italic: *text*  (after bold, so leftover single * are real italics).
    // Restrict to non-whitespace start so "* " bullet remnants aren't matched.
    s = s.replace(/(^|[^*])\*([^\*\s][^\*\n]*?)\*(?!\*)/g, '$1<em>$2</em>');
    // Bare URL → link. Skip URLs that are already inside our markdown-link
    // <a href="..."> by requiring the URL not to be immediately preceded by
    // `href="` or `>` (the `>` guard avoids matching inside the anchor body).
    s = s.replace(/(^|[^"=>])((?:https?:\/\/)[^\s<)]+)/g, function (_m, prefix, url) {
      // Trim trailing punctuation that almost certainly isn't part of the URL.
      var trail = '';
      while (url && /[.,;:!?]$/.test(url)) { trail = url.slice(-1) + trail; url = url.slice(0, -1); }
      return prefix + '<a href="' + url + '" target="_blank" rel="noopener noreferrer" style="color:var(--t)">' + url + '</a>' + trail;
    });
    return s;
  }

  // Split into lines, fold bullet runs into a single <ul>, inline-format the
  // content. Note: `*` is NOT a recognised bullet marker — it conflicts with
  // markdown bold/italic. Use `-` or `•` for bullets.
  var lines = safe.split('\n');
  var out   = [];
  var inUl  = false;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var bullet = line.match(/^\s*(?:-|•)\s+(.*)/);
    if (bullet) {
      if (!inUl) { out.push('<ul class="chat-list">'); inUl = true; }
      out.push('<li>' + inlineFormat(bullet[1]) + '</li>');
    } else {
      if (inUl) { out.push('</ul>'); inUl = false; }
      out.push(inlineFormat(line));
    }
  }
  if (inUl) out.push('</ul>');

  var html = out.join('\n');
  // Paragraph breaks (two newlines → <br><br>; single newline → <br>),
  // but never insert <br> immediately after a block tag we just emitted.
  html = html.replace(/\n{2,}/g, '<br><br>').replace(/(?<!>)\n(?!<)/g, '<br>');
  return html;
}

// ── CONVERSATION PERSISTENCE ──────────────────────────────────────────────────
// Every conversation lives in the visitor's own localStorage (no login, no
// server storage). Schema:
//   {
//     currentId: 'c_xxx' | null,
//     conversations: [
//       { id, title, ts, messages: [{ role: 'user'|'model', text }, ...] },
//       ...
//     ]
//   }
// Conversations are capped at _CHAT_MAX_CONVERSATIONS (oldest evicted) so a
// chatty visitor doesn't blow past localStorage's per-origin quota.

var _CHAT_STORE_KEY = '_ma_chat_v1';
var _CHAT_MAX_CONVERSATIONS = 20;
var _chatListVisible = false;
var _chatHeaderBound = false;

function _chatLoadStore() {
  try {
    var raw = localStorage.getItem(_CHAT_STORE_KEY);
    if (!raw) return { currentId: null, conversations: [] };
    var parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return { currentId: null, conversations: [] };
    if (!Array.isArray(parsed.conversations)) parsed.conversations = [];
    if (typeof parsed.currentId !== 'string' && parsed.currentId !== null) parsed.currentId = null;
    return parsed;
  } catch (_) {
    return { currentId: null, conversations: [] };
  }
}

function _chatSaveStore(store) {
  try {
    localStorage.setItem(_CHAT_STORE_KEY, JSON.stringify(store));
  } catch (_) {
    // Quota or private-mode — silently drop. Chat keeps working in-memory.
  }
}

function _chatDeriveTitle(text) {
  var t = String(text || '').trim().replace(/\s+/g, ' ');
  if (!t) return 'New conversation';
  return t.length > 48 ? (t.slice(0, 48) + '…') : t;
}

function _chatGenConversationId() {
  return 'c_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

// Persist _chatHistory into the store under the current conversation id.
// Creates a new conversation record the first time the visitor sends a
// message in a fresh session.
function _chatPersistCurrent() {
  if (!_chatHistory.length) return;
  var store = _chatLoadStore();
  var idx = store.currentId
    ? store.conversations.findIndex(function (c) { return c.id === store.currentId; })
    : -1;
  if (idx === -1) {
    // First persistent save for this conversation — mint an id, title from
    // the first user message, prepend to list.
    var firstUser = _chatHistory.find(function (m) { return m.role === 'user'; });
    var convo = {
      id:       _chatGenConversationId(),
      title:    _chatDeriveTitle(firstUser ? firstUser.text : ''),
      ts:       Date.now(),
      messages: _chatHistory.slice(),
    };
    store.currentId = convo.id;
    store.conversations.unshift(convo);
    if (store.conversations.length > _CHAT_MAX_CONVERSATIONS) {
      store.conversations.length = _CHAT_MAX_CONVERSATIONS;
    }
  } else {
    var existing = store.conversations[idx];
    existing.messages = _chatHistory.slice();
    existing.ts = Date.now();
    // Keep title stable once set; we don't rewrite it on follow-up turns.
  }
  _chatSaveStore(store);
}

// On widget open, try to restore the visitor's last conversation. Returns
// true if a conversation was restored (so chatToggle skips the fresh-start
// path), false otherwise.
function _chatRestoreCurrent() {
  var store = _chatLoadStore();
  if (!store.currentId) return false;
  var convo = store.conversations.find(function (c) { return c.id === store.currentId; });
  if (!convo || !convo.messages || !convo.messages.length) return false;
  _chatHistory = convo.messages.slice();
  _chatRerenderMessages();
  return true;
}

// Clear the on-screen messages and re-render the entire _chatHistory. Used
// when restoring a conversation and when reopening one from the list.
function _chatRerenderMessages() {
  var msgs = document.getElementById('chatMessages');
  if (!msgs) return;
  msgs.innerHTML = '';
  _chatHistory.forEach(function (m) {
    // MA_LEADCAPTURE_START
    // Original two lines (kept here, commented, for clean reversal):
    // if (m.role === 'user')      _chatRenderUser(m.text);
    // else if (m.role === 'model') _chatRenderBot(m.text);
    if (m.role === 'user')       _chatRenderUser(_chatActionLabelOrText(m.text));
    else if (m.role === 'model') _chatRenderBot(_chatExtractLeadBlock(m.text).cleanedText);
    // MA_LEADCAPTURE_END
  });
  msgs.scrollTop = msgs.scrollHeight;
  // MA_LEADCAPTURE_START
  // Show action buttons whenever a conversation has been started.
  if (_chatHistory.some(function (m) { return m.role === 'user'; })) _chatShowActionButtons();
  // MA_LEADCAPTURE_END
}

// Start a fresh conversation. The current conversation (if any) is already
// persisted via _chatPersistCurrent on every turn, so we don't need to save
// here — just untether currentId and re-show the greeting + starters.
function _chatNewConversation() {
  var store = _chatLoadStore();
  store.currentId = null;
  _chatSaveStore(store);
  _chatHistory = [];
  var msgs = document.getElementById('chatMessages');
  if (msgs) msgs.innerHTML = '';
  _chatHideList();
  // MA_LEADCAPTURE_START
  _chatHideActionButtons();
  // MA_LEADCAPTURE_END
  _chatStart();
  var input = document.getElementById('chatInput');
  if (input) input.focus();
}
window._chatNewConversation = _chatNewConversation;

// Reopen one of the saved conversations. Loads its history back into
// _chatHistory so subsequent sends include it as context, exactly the way
// follow-ups already work in an active conversation.
function _chatReopenConversation(id) {
  var store = _chatLoadStore();
  var convo = store.conversations.find(function (c) { return c.id === id; });
  if (!convo) return;
  store.currentId = id;
  _chatSaveStore(store);
  _chatHistory = (convo.messages || []).slice();
  _chatHideList();
  _chatRerenderMessages();
  var input = document.getElementById('chatInput');
  if (input) input.focus();
}

function _chatDeleteConversation(id) {
  var store = _chatLoadStore();
  store.conversations = store.conversations.filter(function (c) { return c.id !== id; });
  var wasCurrent = (store.currentId === id);
  if (wasCurrent) store.currentId = null;
  _chatSaveStore(store);
  if (wasCurrent) {
    _chatHistory = [];
    var msgs = document.getElementById('chatMessages');
    if (msgs) msgs.innerHTML = '';
    // Stay on the list view so the visitor sees the deletion took effect.
  }
  _chatRenderList();
}

// Toggle the conversations list over the messages area. The two share the
// same flex slot; we just swap their display.
function _chatToggleList() {
  if (_chatListVisible) _chatHideList();
  else _chatShowList();
}

function _chatShowList() {
  _chatEnsureListEl();
  _chatRenderList();
  var list = document.getElementById('chatConversationsList');
  var msgs = document.getElementById('chatMessages');
  if (list) list.style.display = 'flex';
  if (msgs) msgs.style.display = 'none';
  _chatListVisible = true;
  // Mark the history button active so the icon state mirrors the UI state.
  var hbtn = document.getElementById('chatHeaderHistory');
  if (hbtn) hbtn.classList.add('active');
}

function _chatHideList() {
  var list = document.getElementById('chatConversationsList');
  var msgs = document.getElementById('chatMessages');
  if (list) list.style.display = 'none';
  if (msgs) msgs.style.display = 'flex';
  _chatListVisible = false;
  var hbtn = document.getElementById('chatHeaderHistory');
  if (hbtn) hbtn.classList.remove('active');
}

// Inject the conversations list element once. It lives inside #chatPanel
// right above the input row, sharing the messages slot.
function _chatEnsureListEl() {
  if (document.getElementById('chatConversationsList')) return;
  var msgs = document.getElementById('chatMessages');
  if (!msgs || !msgs.parentNode) return;
  var list = document.createElement('div');
  list.id = 'chatConversationsList';
  list.className = 'chat-conversations-list';
  list.style.display = 'none';
  msgs.parentNode.insertBefore(list, msgs);
}

function _chatRenderList() {
  var list = document.getElementById('chatConversationsList');
  if (!list) return;
  var store = _chatLoadStore();
  if (!store.conversations.length) {
    list.innerHTML =
      '<div class="chat-conv-header">Past conversations</div>' +
      '<div class="chat-conv-empty">No saved conversations yet. Send a message to start your first.</div>';
    return;
  }
  var sorted = store.conversations.slice().sort(function (a, b) { return b.ts - a.ts; });
  list.innerHTML =
    '<div class="chat-conv-header">Past conversations</div>' +
    sorted.map(function (c) {
      var active = (c.id === store.currentId) ? ' chat-conv-item-active' : '';
      var label  = _chatFormatRelativeDate(new Date(c.ts));
      return (
        '<div class="chat-conv-item' + active + '" data-conv-id="' + c.id + '">' +
          '<button type="button" class="chat-conv-open" aria-label="Reopen conversation">' +
            '<div class="chat-conv-title">' + _chatEscape(c.title) + '</div>' +
            '<div class="chat-conv-meta">' + label + '</div>' +
          '</button>' +
          '<button type="button" class="chat-conv-del" aria-label="Delete conversation" title="Delete">&times;</button>' +
        '</div>'
      );
    }).join('');
  // Wire delegated clicks.
  list.querySelectorAll('.chat-conv-item').forEach(function (row) {
    var id = row.getAttribute('data-conv-id');
    var openBtn = row.querySelector('.chat-conv-open');
    var delBtn  = row.querySelector('.chat-conv-del');
    if (openBtn) openBtn.addEventListener('click', function () { _chatReopenConversation(id); });
    if (delBtn)  delBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (confirm('Delete this conversation? This cannot be undone.')) _chatDeleteConversation(id);
    });
  });
}

function _chatFormatRelativeDate(d) {
  var now = Date.now();
  var diff = now - d.getTime();
  if (diff < 0) diff = 0;
  if (diff < 60_000)       return 'just now';
  if (diff < 3_600_000)    return Math.floor(diff / 60_000) + 'm ago';
  if (diff < 86_400_000)   return Math.floor(diff / 3_600_000) + 'h ago';
  if (diff < 7 * 86_400_000) return Math.floor(diff / 86_400_000) + 'd ago';
  return d.toLocaleDateString();
}

// Inject the two header icons (New chat + History) once. The chat panel
// markup in lib/admin-chat-html.js was intentionally left untouched — these
// controls are added at runtime so the static HTML stays minimal.
function _initChatHeaderButtons() {
  if (_chatHeaderBound) return;
  var header = document.querySelector('#chatPanel .chat-header');
  if (!header) return;
  _chatHeaderBound = true;
  // The title block already exists as the second child of .chat-header.
  // Letting it flex:1 pushes the icon trio to the right naturally and makes
  // the existing margin-left:auto on .chat-header-close redundant (but
  // harmless).
  var titleWrap = header.querySelector('.chat-header-title');
  if (titleWrap && titleWrap.parentNode && titleWrap.parentNode !== header) {
    titleWrap.parentNode.style.flex = '1';
    titleWrap.parentNode.style.minWidth = '0';
  }

  var closeBtn = header.querySelector('.chat-header-close');

  // New conversation icon (+)
  var newBtn = document.createElement('button');
  newBtn.id = 'chatHeaderNew';
  newBtn.type = 'button';
  newBtn.className = 'chat-header-icon';
  newBtn.title = 'New conversation';
  newBtn.setAttribute('aria-label', 'New conversation');
  newBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
  newBtn.addEventListener('click', _chatNewConversation);

  // History icon (clock + arrow)
  var histBtn = document.createElement('button');
  histBtn.id = 'chatHeaderHistory';
  histBtn.type = 'button';
  histBtn.className = 'chat-header-icon';
  histBtn.title = 'Past conversations';
  histBtn.setAttribute('aria-label', 'Past conversations');
  histBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3.5-7.1"/><polyline points="3 3 3 9 9 9"/><polyline points="12 7 12 12 16 14"/></svg>';
  histBtn.addEventListener('click', _chatToggleList);

  if (closeBtn) {
    header.insertBefore(newBtn,  closeBtn);
    header.insertBefore(histBtn, closeBtn);
  } else {
    header.appendChild(newBtn);
    header.appendChild(histBtn);
  }
  // Pre-create the list element so showing it is just a display swap.
  _chatEnsureListEl();
}

// MA_LEADCAPTURE_START
// ── LEAD CAPTURE (END / NEW conversation, LEAVE A MESSAGE) ──────────────────
// Two buttons under the chat that hand the AI a control marker. The AI runs
// a conversational data-collection sequence and, when complete, emits a
// hidden <<<MA_LEAD>>>{json}<<<MA_END>>> block at the end of its reply. The
// widget strips that block before display, calls the SalesIQ identify API,
// and (for "lead") also POSTs to /api/contact to reuse the existing Zoho
// CRM submission path. See supabase/functions/chat/index.ts for the prompt.

// Re-map control-marker history entries to a friendly visible label when
// re-rendering a stored conversation. Keeps localStorage faithful to what
// the AI saw while keeping the user-visible bubble human-readable.
function _chatActionLabelOrText(text) {
  if (text === '[ACTION:end_conversation]') return 'End conversation';
  if (text === '[ACTION:leave_message]')    return 'Leave a message';
  return text;
}

// Extract and strip the hidden lead-data block from a bot reply.
//   { cleanedText, payload }   on found-and-parsed
//   { cleanedText, payload: null }   on no-block-or-malformed
function _chatExtractLeadBlock(text) {
  if (!text || typeof text !== 'string') return { cleanedText: text || '', payload: null };
  var re = /<<<MA_LEAD>>>([\s\S]*?)<<<MA_END>>>/;
  var m = text.match(re);
  if (!m) return { cleanedText: text, payload: null };
  var cleanedText = text.replace(/<<<MA_LEAD>>>[\s\S]*?<<<MA_END>>>/g, '').trim();
  var payload = null;
  try { payload = JSON.parse(m[1].trim()); } catch (_) { payload = null; }
  return { cleanedText: cleanedText, payload: payload };
}

// Send a button-driven action to the AI. visibleLabel goes in the user
// bubble; apiMessage (the [ACTION:...] marker) goes into history so the AI
// sees the trigger. Reuses the rest of the _chatSendUserMessage path.
function _chatSendActionMessage(visibleLabel, apiMessage) {
  if (_chatBusy) return;
  _chatBusy = true;
  _chatRenderUser(visibleLabel);
  _chatHistory.push({ role: 'user', text: apiMessage });
  _chatPersistCurrent();

  // Drop any open starter row — same as _chatSendUserMessage.
  var starters = document.querySelectorAll('#chatMessages .chat-starters');
  starters.forEach(function (s) { s.remove(); });

  var typing = _chatShowTyping();
  _chatSetSendEnabled(false);

  _chatFetchAnswer(apiMessage).then(function (result) {
    if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
    if (result && result.answer) {
      var lead = _chatExtractLeadBlock(result.answer);
      _chatRenderBot(lead.cleanedText);
      _chatHistory.push({ role: 'model', text: lead.cleanedText });
      _chatPersistCurrent();
      if (lead.payload) _chatHandleLeadPayload(lead.payload);
      _chatShowActionButtons();
    } else {
      _chatRenderBot((result && result.friendly) ||
        "I'm having trouble reaching the assistant right now. Please try again in a moment, or email info@mirroradvisors.com.");
    }
  }).catch(function () {
    if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
    _chatRenderBot("I'm having trouble reaching the assistant right now. Please try again in a moment, or email info@mirroradvisors.com.");
  }).then(function () {
    _chatBusy = false;
    _chatSetSendEnabled(true);
    var input = document.getElementById('chatInput');
    if (input) input.focus();
  });
}

// Orchestrator — fires SalesIQ identify always; for "lead", also POSTs to
// /api/contact. Each branch is independent and try/catch wrapped so one
// failure can't block the other.
function _chatHandleLeadPayload(payload) {
  if (!payload || typeof payload !== 'object' || !payload.action) return;
  try { _chatIdentifyVisitor(payload); } catch (e) { console.warn('[chat] identify error:', e); }
  if (payload.action === 'lead') {
    try {
      _chatSubmitLead(payload).then(function (res) {
        if (!res || !res.ok) console.warn('[chat] /api/contact returned non-ok for chatbot lead:', res);
      });
    } catch (e) {
      console.warn('[chat] submit lead error:', e);
    }
  }
}

// Call the SalesIQ JS API to identify the visitor and LINK the identified
// data to the tracked visitor session in the SalesIQ dashboard.
//
// Why both info() AND the individual setters:
// On the current SalesIQ build (verified via DevTools, Nov 2025), the
// visitor.* surface exposes both a bulk visitor.info({...}) and the
// individual visitor.name/email/contactnumber setters. The bulk info() call
// is what fires the proper "visitor profile updated — link to tracking
// session" event, so the dashboard shows ONE record with name+email+phone
// instead of an anonymous tracked visitor + a separately-identified one.
// The individual setters are kept as a defensive fallback for any future
// SalesIQ build where info() becomes a no-op. Setting the same value twice
// is idempotent, so calling both is cheap.
//
// Also splits the full name into firstname/lastname when possible — some
// SalesIQ analytics reports key off those fields specifically, not the
// combined name.
function _chatIdentifyVisitor(payload) {
  if (typeof window === 'undefined' || !window.$zoho || !window.$zoho.salesiq) return;
  if (typeof window.$zoho.salesiq.ready !== 'function') return;
  window.$zoho.salesiq.ready(function () {
    try {
      var v = window.$zoho.salesiq.visitor;
      if (!v) return;

      // Split "First Last" into parts so the firstname/lastname setters can
      // populate the dedicated dashboard fields.
      var name  = String(payload.name  || '').trim();
      var email = String(payload.email || '').trim();
      var phone = String(payload.phone || '').trim();
      var sp = name.indexOf(' ');
      var fn = sp === -1 ? name : name.slice(0, sp);
      var ln = sp === -1 ? ''   : name.slice(sp + 1).trim();

      // PRIMARY: bulk info() — this is the call that links the identified
      // payload to the tracked visitor session in the dashboard.
      if (typeof v.info === 'function') {
        var bulk = {};
        if (name)  bulk.name = name;
        if (email) bulk.email = email;
        if (phone) bulk.contactnumber = phone;
        try { v.info(bulk); } catch (e) { console.warn('[chat] SalesIQ visitor.info() error:', e); }
      }

      // FALLBACK / SUPPLEMENT: individual setters. Same values, idempotent.
      if (name  && typeof v.name      === 'function') { try { v.name(name); }            catch (_) {} }
      if (fn    && typeof v.firstname === 'function') { try { v.firstname(fn); }         catch (_) {} }
      if (ln    && typeof v.lastname  === 'function') { try { v.lastname(ln); }          catch (_) {} }
      if (email && typeof v.email     === 'function') { try { v.email(email); }          catch (_) {} }
      if (phone && typeof v.contactnumber === 'function') { try { v.contactnumber(phone); } catch (_) {} }

      // Console breadcrumb so future debug sessions can confirm the call
      // fired. Safe to leave in — it's a single line, no PII beyond what
      // the visitor just typed into the widget.
      try { console.log('[chat] SalesIQ identify fired:', { name: name, email: email, phone: phone }); } catch (_) {}
    } catch (e) { console.warn('[chat] SalesIQ identify outer error:', e); }
  });
}

// Submit the lead to Zoho CRM through the existing /api/contact endpoint.
// The endpoint validates ALL contact-form fields as required, so we fill the
// four the chatbot doesn't gather (company, size, services, timeline) with
// safe placeholders. The lead source goes into MultiLine since the form has
// no dedicated Lead Source field.
function _chatSubmitLead(payload) {
  var nameStr = String(payload.name || '').trim();
  var sp = nameStr.indexOf(' ');
  var fname = sp === -1 ? nameStr : nameStr.slice(0, sp);
  var lname = sp === -1 ? '(via chatbot)' : nameStr.slice(sp + 1).trim();
  if (!lname) lname = '(via chatbot)';

  var msg = String(payload.message || '').trim();
  msg = msg + (msg ? '\n\n' : '') + 'Lead Source: Website Chatbot';

  var body = {
    fname:    fname,
    lname:    lname,
    email:    String(payload.email || ''),
    phone:    String(payload.phone || ''),
    message:  msg,
    // Placeholders for the contact form's other required fields. These
    // values are inside the existing allowed sets so /api/contact accepts
    // them without modification.
    company:  '(via chatbot)',
    size:     '1',
    services: ['Not Sure Yet'],
    timeline: 'Just exploring',
  };

  return fetch('/api/contact', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  })
    .then(function (r) {
      return r.json().then(function (d) { return { ok: r.ok, data: d }; },
                            function ()  { return { ok: r.ok, data: {} }; });
    })
    .catch(function (e) {
      console.warn('[chat] /api/contact failed:', e);
      return { ok: false, data: { error: 'network' } };
    });
}

// Action buttons (End / Leave a message). Injected once into the panel
// between the messages area and the input row.
function _chatShowActionButtons() {
  var existing = document.getElementById('chatActions');
  if (existing) { existing.style.display = 'flex'; return; }
  var panel = document.getElementById('chatPanel');
  if (!panel) return;
  var input = document.getElementById('chatInputForm');
  if (!input) return;

  var row = document.createElement('div');
  row.id = 'chatActions';
  row.className = 'chat-actions';
  row.innerHTML =
    '<button type="button" id="chatActEnd" class="chat-action-btn">End conversation</button>' +
    '<button type="button" id="chatActLead" class="chat-action-btn chat-action-btn-primary">Leave a message</button>';
  panel.insertBefore(row, input);

  document.getElementById('chatActEnd').addEventListener('click', function () {
    _chatSendActionMessage('End conversation', '[ACTION:end_conversation]');
  });
  document.getElementById('chatActLead').addEventListener('click', function () {
    _chatSendActionMessage('Leave a message', '[ACTION:leave_message]');
  });
}

function _chatHideActionButtons() {
  var row = document.getElementById('chatActions');
  if (row) row.style.display = 'none';
}

// Expose for debugging / future reuse.
window._chatHandleLeadPayload = _chatHandleLeadPayload;
window._chatExtractLeadBlock  = _chatExtractLeadBlock;
// MA_LEADCAPTURE_END


// ── NAV ADMIN DASHBOARD ───────────────────────────────────────────────────────
var _navDragIdx = -1;

window.adminRenderNavDash = function(container){
  container.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'flex:1;overflow-y:auto;padding:24px;max-width:640px;width:100%';

  var pages = window._NAV_PAGES;

  var html = '<div style="margin-bottom:20px">'
    + '<div style="font-family:Montserrat,sans-serif;font-size:13px;color:var(--dim);line-height:1.7">Toggle pages on/off to show or hide them in the navigation and home page. Rename labels or drag rows to reorder. Hit <strong style="color:var(--tx)">Save &amp; Apply</strong> when done.</div>'
    + '</div>'
    + '<div id="navPageList">'
    + _navRenderRows(pages)
    + '</div>'
    + '<div style="display:flex;gap:10px;margin-top:16px">'
    + '<button class="admin-save" onclick="navSaveApply()">✓ Save &amp; Apply</button>'
    + '<button class="admin-cancel" onclick="navResetDefaults()">Reset to Defaults</button>'
    + '</div>';

  wrap.innerHTML = html;
  container.appendChild(wrap);
};

function _navRenderRows(pages){
  return pages.map(function(p, i){
    var isFirst = i === 0;
    var isLast  = i === pages.length - 1;
    return '<div class="nav-page-row' + (p.enabled?'':' disabled') + '" id="navRow_'+i+'"'
      + ' draggable="true"'
      + ' ondragstart="navDragStart('+i+')"'
      + ' ondragover="navDragOver(event,'+i+')"'
      + ' ondragleave="navDragLeave('+i+')"'
      + ' ondrop="navDrop(event,'+i+')">'
      + '<span class="nav-drag-handle">⠿</span>'
      + '<span class="nav-page-num">' + (i+1) + '</span>'
      + '<input class="nav-page-label-input" id="navLabel_'+i+'" value="' + _esc(p.label) + '" placeholder="Nav label">'
      + '<div class="nav-order-btns">'
      + '<button class="nav-order-btn" onclick="navMoveRow('+i+',-1)" '+(isFirst?'disabled':'')+'>▲</button>'
      + '<button class="nav-order-btn" onclick="navMoveRow('+i+',1)" '+(isLast?'disabled':'')+'>▼</button>'
      + '</div>'
      + '<div class="nav-toggle-wrap">'
      + '<button class="social-toggle ' + (p.enabled?'on':'') + '" id="navToggle_'+i+'" onclick="navTogglePage('+i+')" title="'+(p.enabled?'Visible':'Hidden')+'"></button>'
      + '</div>'
      + '</div>';
  }).join('');
}

window.navTogglePage = function(i){
  window._NAV_PAGES[i].enabled = !window._NAV_PAGES[i].enabled;
  var row = document.getElementById('navRow_'+i);
  var btn = document.getElementById('navToggle_'+i);
  if(row) row.classList.toggle('disabled', !window._NAV_PAGES[i].enabled);
  if(btn) btn.classList.toggle('on', window._NAV_PAGES[i].enabled);
};

window.navMoveRow = function(i, dir){
  var pages = window._NAV_PAGES;
  var j = i + dir;
  if(j < 0 || j >= pages.length) return;
  var tmp = pages[i]; pages[i] = pages[j]; pages[j] = tmp;
  // Re-render list
  var list = document.getElementById('navPageList');
  if(list) list.innerHTML = _navRenderRows(pages);
};

window.navDragStart = function(i){
  _navDragIdx = i;
  setTimeout(function(){
    var row = document.getElementById('navRow_'+i);
    if(row) row.classList.add('dragging');
  }, 0);
};
window.navDragOver = function(e, i){
  e.preventDefault();
  var row = document.getElementById('navRow_'+i);
  if(row && i !== _navDragIdx) row.classList.add('drag-over');
};
window.navDragLeave = function(i){
  var row = document.getElementById('navRow_'+i);
  if(row) row.classList.remove('drag-over');
};
window.navDrop = function(e, i){
  e.preventDefault();
  var row = document.getElementById('navRow_'+i);
  if(row) row.classList.remove('drag-over');
  if(_navDragIdx < 0 || _navDragIdx === i) return;
  var pages = window._NAV_PAGES;
  var moved = pages.splice(_navDragIdx, 1)[0];
  pages.splice(i, 0, moved);
  _navDragIdx = -1;
  var list = document.getElementById('navPageList');
  if(list) list.innerHTML = _navRenderRows(pages);
};

window.navSaveApply = function(){
  // Save current label inputs before applying
  var pages = window._NAV_PAGES;
  pages.forEach(function(p, i){
    var inp = document.getElementById('navLabel_'+i);
    if(inp) p.label = inp.value.trim() || p.label;
  });
  // Rebuild nav
  _renderNav();
  // Rebuild home page nav quick links if on home
  _navUpdateHomeLinks();
  // Persist to Supabase so every visitor sees the update.
  _persist('nav_pages', pages);
  if(window._adminToast) window._adminToast('Navigation updated \u2713');
};

window.navResetDefaults = function(){
  window._NAV_PAGES = [
    { key:'services',   label:'Services',     enabled:true },
    { key:'cases',      label:'Case Studies', enabled:true },
    { key:'technology', label:'Technology',   enabled:true },
    { key:'about',      label:'About',        enabled:true },
    { key:'contact',    label:'Contact',      enabled:true },
  ];
  var dc = document.getElementById('adminNavContent');
  if(dc){ dc.innerHTML=''; adminRenderNavDash(dc); }
  _renderNav();
  _navUpdateHomeLinks();
  // Persist the reset so every visitor sees the defaults.
  _persist('nav_pages', window._NAV_PAGES);
  if(window._adminToast) window._adminToast('Navigation reset to defaults \u2713');
};

function _navUpdateHomeLinks(){
  // Map nav page keys to home section IDs (only keys that have a matching
  // section on the home page need to be listed — others are no-ops).
  var sectionMap = {
    services:   'services',
    cases:      'cases',
    technology: 'zoho'
  };
  var pages = window._NAV_PAGES || [];
  var enabledKeys = {};
  pages.forEach(function(p){ enabledKeys[p.key] = p.enabled; });

  // Show/hide home page sections
  Object.keys(sectionMap).forEach(function(key){
    var el = document.getElementById(sectionMap[key]);
    if(!el) return;
    el.style.display = enabledKeys[key] !== false ? '' : 'none';
  });

  // Show/hide hero contact button
  var heroBtns = document.querySelector('.hero-btns');
  if(heroBtns){
    var btns = heroBtns.querySelectorAll('button, a');
    btns.forEach(function(btn){
      if(btn.getAttribute('onclick') && btn.getAttribute('onclick').indexOf('contact') >= 0){
        btn.style.display = enabledKeys['contact'] !== false ? '' : 'none';
      }
    });
  }
}


// ── SUBMISSIONS ADMIN ────────────────────────────────────────────────────────
var _subFilter   = { status:'all', service:'all', contacted:'all' };
var _subExpanded = {};

var _SUB_SERVICES = ['AI-Powered Apps','ERP Implementation','Systems Integration',
                     'Business Consulting','Infinity Mirror','Bank of Hours','Not Sure Yet'];

window.adminRenderSubDash = function(container){
  // Kick off ONE Supabase fetch per dashboard mount. When it returns we
  // update the row data in place (subRenderList only swaps #subList's
  // innerHTML; the #subList element keeps its scrollTop). Re-invoking
  // adminRenderSubDash here used to blow the whole dashboard away and
  // reset scroll on every fetch — and because the old code also reset
  // _supaFetched=false in the .then callback, the re-invoke hit the
  // fetch guard again and looped every ~500ms.
  //
  // The flag is reset in the tab/mode router when the user re-opens the
  // Submissions dashboard, so each fresh open does pull fresh data.
  if(container && !container._supaFetched){
    container._supaFetched = true;
    try {
      fetchSubmissions().then(function(rows){
        if(!rows) return;
        window._SUBMISSIONS = rows;
        if(container.style.display === 'none') return;
        if(typeof _adminMode !== 'undefined' && _adminMode && _adminMode !== 'submissions') return;
        // In-place refresh — scroll position preserved.
        if(typeof subRenderList === 'function') subRenderList();
        if(typeof _subUpdateStats === 'function') _subUpdateStats();
      }).catch(function(){});
    } catch(e){ /* swallow — UI keeps showing whatever was cached */ }
  }

  container.innerHTML = '';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.overflow = 'hidden';

  var subs = window._SUBMISSIONS || [];

  // ── Toolbar ───────────────────────────────────────────────────────────────
  var toolbar = document.createElement('div');
  toolbar.style.cssText = 'flex-shrink:0;padding:14px 20px 12px;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02);display:flex;flex-direction:column;gap:12px;';
  toolbar.innerHTML =
    // Row 1: Stats + count + export
    '<div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap;">'
    + '<div style="display:flex;gap:18px;flex-shrink:0;">'
    + _subStat(subs.length, 'Total')
    + _subStat(subs.filter(function(s){return s.status==='New';}).length, 'New', '#ECA934')
    + _subStat(subs.filter(function(s){return !s.contacted;}).length, 'Not Contacted', 'rgba(255,80,80,.8)')
    + '</div>'
    + '<div style="flex:1;min-width:0;"></div>'
    + '<span class="sub-count" id="subCount" style="font-size:11px;color:var(--dim);font-family:Montserrat,sans-serif;font-weight:700;">'+subs.length+' submission'+(subs.length===1?'':'s')+'</span>'
    + '<button class="admin-save" style="padding:7px 14px;font-size:11px;flex-shrink:0;" onclick="subDownloadPDF()">⬇ Export PDF</button>'
    + '</div>'
    // Row 2: Filters (grouped with labels)
    + '<div style="display:flex;gap:18px;flex-wrap:wrap;align-items:center;">'
    + '<div style="display:flex;align-items:center;gap:6px;">'
    + '<span style="font-size:9px;color:var(--dim);font-family:Montserrat,sans-serif;font-weight:800;text-transform:uppercase;letter-spacing:.08em;">Status:</span>'
    + '<div id="subStatusFilters" style="display:flex;gap:4px;flex-wrap:wrap;">'
    + ['All','New','Read','Replied'].map(function(s){
        return '<button class="sub-filter-pill'+(s==='All'?' active':'')+'" onclick="subFilterStatus(\''+s+'\')">'+(s==='All'?'All':s)+'</button>';
      }).join('')
    + '</div></div>'
    + '<div style="display:flex;align-items:center;gap:6px;">'
    + '<span style="font-size:9px;color:var(--dim);font-family:Montserrat,sans-serif;font-weight:800;text-transform:uppercase;letter-spacing:.08em;">Contact:</span>'
    + '<div id="subContactedFilters" style="display:flex;gap:4px;">'
    + '<button class="sub-filter-pill active" onclick="subFilterContacted(\'all\')">All</button>'
    + '<button class="sub-filter-pill" onclick="subFilterContacted(\'yes\')">✓ Done</button>'
    + '<button class="sub-filter-pill" onclick="subFilterContacted(\'no\')">Pending</button>'
    + '</div></div>'
    + '<div style="display:flex;align-items:center;gap:6px;">'
    + '<span style="font-size:9px;color:var(--dim);font-family:Montserrat,sans-serif;font-weight:800;text-transform:uppercase;letter-spacing:.08em;">Service:</span>'
    + '<div id="subServiceFilters" style="display:flex;gap:4px;flex-wrap:wrap;">'
    + '<button class="sub-filter-pill active" onclick="subFilterService(\'all\')">All</button>'
    + _SUB_SERVICES.map(function(sv){
        return '<button class="sub-filter-pill" onclick="subFilterService(\''+sv+'\')">'+sv+'</button>';
      }).join('')
    + '</div></div>'
    + '</div>';

  // ── List ──────────────────────────────────────────────────────────────────
  var list = document.createElement('div');
  list.id = 'subList';
  list.style.cssText = 'flex:1;overflow-y:auto;min-height:0;padding:16px 20px;display:flex;flex-direction:column;gap:10px;';

  container.appendChild(toolbar);
  container.appendChild(list);
  subRenderList();
};

function _subStat(val, label, color){
  // data-stat="<label>" lets _subUpdateStats find this cell and update
  // it after an async Supabase fetch without re-rendering the whole toolbar.
  return '<div style="text-align:center;min-width:48px;" data-stat="'+label+'">'
    + '<div class="sub-stat-val" style="font-family:Montserrat,sans-serif;font-size:18px;font-weight:900;color:'+(color||'var(--tx)')+';">'+val+'</div>'
    + '<div style="font-size:9px;color:var(--dim);font-family:Montserrat,sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.07em;">'+label+'</div>'
    + '</div>';
};

// After an async Supabase fetch the row data has changed but we don't
// want to re-render the whole toolbar (would blow away scroll on parent /
// reset filter pill active states). Just patch the three stat numbers.
function _subUpdateStats(){
  var subs = window._SUBMISSIONS || [];
  function setStat(label, val){
    var cell = document.querySelector('[data-stat="' + label + '"] .sub-stat-val');
    if(cell) cell.textContent = val;
  }
  setStat('Total',          subs.length);
  setStat('New',            subs.filter(function(s){ return s.status === 'New'; }).length);
  setStat('Not Contacted',  subs.filter(function(s){ return !s.contacted; }).length);
}

function subGetFiltered(){
  return (window._SUBMISSIONS || []).filter(function(s){
    if(_subFilter.status !== 'all' && s.status !== _subFilter.status) return false;
    if(_subFilter.service !== 'all' && (!s.services || s.services.indexOf(_subFilter.service) < 0)) return false;
    if(_subFilter.contacted === 'yes' && !s.contacted) return false;
    if(_subFilter.contacted === 'no'  &&  s.contacted) return false;
    return true;
  });
}

function subRenderList(){
  var list = document.getElementById('subList');
  if(!list) return;
  var filtered = subGetFiltered();
  var countEl = document.getElementById('subCount');
  if(countEl) countEl.textContent = filtered.length + ' submission' + (filtered.length===1?'':'s');

  if(!filtered.length){
    list.innerHTML = '<div class="sub-empty"><div class="sub-empty-icon">📭</div>'
      + (window._SUBMISSIONS && window._SUBMISSIONS.length
          ? 'No submissions match the current filters.'
          : 'No submissions yet.<br>They will appear here when clients fill out the contact form.')
      + '</div>';
    return;
  }

  list.innerHTML = filtered.map(function(s){
    var statusClass  = 'status-' + (s.status||'new').toLowerCase();
    var statusBadge  = 'sub-status-' + (s.status||'new').toLowerCase();
    var isExp        = _subExpanded[s.id];
    var svcs         = (s.services||[]).map(function(sv){
      return '<span class="sub-svc-tag">'+_esc(sv)+'</span>';
    }).join('');

    // Build detail rows for every form field
    var details = '';
    if(s.email)   details += _subField('Work Email',    s.email);
    if(s.company) details += _subField('Company',       s.company);
    if(s.size)    details += _subField('Company Size',  s.size);
    if(s.timeline)details += _subField('Timeline',      s.timeline);

    return '<div class="sub-card '+statusClass+'" id="subCard_'+s.id+'">'

      // Header row — name + status + date
      + '<div class="sub-card-header">'
      + '<div><div class="sub-card-name">'+_esc(s.name)+'</div>'
      + '<div class="sub-card-email">Submitted '+_esc(s.datetime)+'</div></div>'
      + '<div class="sub-card-meta">'
      + '<span class="sub-status-badge '+statusBadge+'">'+_esc(s.status)+'</span>'
      + '</div></div>'

      // Field details grid
      + (details ? '<div class="sub-details-grid">'+details+'</div>' : '')

      // Services
      + (svcs ? '<div class="sub-services" style="margin-bottom:10px">'+svcs+'</div>' : '')

      // Message
      + '<div class="sub-field-label">How Can We Help?</div>'
      + '<div class="sub-message'+(isExp?' expanded':'')+'">'+_esc(s.message||'—')+'</div>'
      + (s.message && s.message.length > 120
          ? '<button class="sub-action-btn" style="margin-bottom:10px;margin-top:4px" onclick="subToggleMsg('+s.id+')">'+(isExp?'Show less ▲':'Show more ▼')+'</button>'
          : '')

      // Footer
      + '<div class="sub-card-footer">'
      + '<div class="sub-contacted-row'+(s.contacted?' contacted':'')+'" id="subCon_'+s.id+'">'
      + '<button class="social-toggle '+(s.contacted?'on':'')+'" id="subConBtn_'+s.id+'" onclick="subToggleContacted('+s.id+')" title="Contacted back"></button>'
      + '<span style="font-size:11px">'+(s.contacted?'✓ Contacted Back':'Not Contacted Yet')+'</span>'
      + '</div>'
      + '<div style="margin-left:auto;display:flex;gap:6px;align-items:center">'
      + '<select class="sub-action-btn" onchange="subChangeStatus('+s.id+',this.value)" style="cursor:pointer">'
      + ['New','Read','Replied'].map(function(st){
          return '<option'+(s.status===st?' selected':'')+'>'+st+'</option>';
        }).join('')
      + '</select>'
      + '<button class="sub-action-btn" onclick="subEditModal('+s.id+')">✏ Edit</button>'
      + '<button class="sub-action-btn sub-del-btn" onclick="subDeleteModal('+s.id+')">✕ Delete</button>'
      + '</div></div>'

      + '</div>';
  }).join('');
}

function _subField(label, value){
  return '<div class="sub-detail-item">'
    + '<div class="sub-field-label">'+_esc(label)+'</div>'
    + '<div class="sub-field-value">'+_esc(value)+'</div>'
    + '</div>';
}

window.subFilterService = function(val){
  _subFilter.service = val;
  document.querySelectorAll('#subServiceFilters .sub-filter-pill').forEach(function(b){
    b.classList.toggle('active', b.textContent.trim() === (val==='all'?'All':val));
  });
  subRenderList();
};
window.subFilterStatus = function(val){
  _subFilter.status = val;
  document.querySelectorAll('#subStatusFilters .sub-filter-pill').forEach(function(b){
    b.classList.toggle('active', b.textContent.trim().toLowerCase() === val.toLowerCase());
  });
  subRenderList();
};
window.subFilterContacted = function(val){
  _subFilter.contacted = val;
  document.querySelectorAll('#subContactedFilters .sub-filter-pill').forEach(function(b){
    var t = b.textContent.trim();
    b.classList.toggle('active',
      (val==='all' && t==='All') ||
      (val==='yes' && t.indexOf('Done')>=0) ||
      (val==='no'  && t==='Pending')
    );
  });
  subRenderList();
};
window.subToggleMsg = function(id){
  _subExpanded[id] = !_subExpanded[id];
  subRenderList();
};
window.subToggleContacted = function(id){
  var sub = (window._SUBMISSIONS||[]).find(function(s){ return s.id===id; });
  if(!sub) return;
  sub.contacted = !sub.contacted;
  var btn = document.getElementById('subConBtn_'+id);
  var row = document.getElementById('subCon_'+id);
  if(btn){ btn.classList.toggle('on', sub.contacted); }
  if(row){ row.classList.toggle('contacted', sub.contacted); row.querySelector('span').textContent = sub.contacted?'✓ Contacted':'Not Contacted'; }
};
window.subChangeStatus = function(id, val){
  var sub = (window._SUBMISSIONS||[]).find(function(s){ return s.id===id; });
  if(!sub) return;
  sub.status = val;
  var card = document.getElementById('subCard_'+id);
  if(card){
    card.className = 'sub-card status-'+val.toLowerCase();
    var badge = card.querySelector('.sub-status-badge');
    if(badge){ badge.className = 'sub-status-badge sub-status-'+val.toLowerCase(); badge.textContent = val; }
  }
};

// ── Edit Modal ────────────────────────────────────────────────────────────────
window.subEditModal = function(id){
  var sub = (window._SUBMISSIONS||[]).find(function(s){ return s.id===id; });
  if(!sub) return;
  var modal = document.createElement('div');
  modal.className = 'sub-edit-modal';
  modal.id = 'subEditModal';
  modal.innerHTML = '<div class="sub-edit-modal-box">'
    + '<div style="font-family:Montserrat,sans-serif;font-size:16px;font-weight:900;color:var(--tx);margin-bottom:20px">Edit Submission</div>'
    + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 14px">'
    + '<div class="admin-field"><label>First Name / Full Name</label><input id="subEditName" value="'+_esc(sub.name)+'"></div>'
    + '<div class="admin-field"><label>Work Email</label><input id="subEditEmail" value="'+_esc(sub.email)+'"></div>'
    + '<div class="admin-field"><label>Company</label><input id="subEditCompany" value="'+_esc(sub.company||'')+'"></div>'
    + '<div class="admin-field"><label>Company Size</label><input id="subEditSize" value="'+_esc(sub.size||'')+'"></div>'
    + '</div>'
    + '<div class="admin-field"><label>Timeline</label>'
    + '<select id="subEditTimeline">'
    + ['','As soon as possible','Within 1 month','1–3 months','3–6 months','Just exploring'].map(function(t){
        return '<option'+(sub.timeline===t?' selected':'')+' value="'+t+'">'+(t||'— Select —')+'</option>';
      }).join('')
    + '</select></div>'
    + '<div class="admin-field"><label>How Can We Help?</label><textarea rows="4" id="subEditMsg">'+_esc(sub.message)+'</textarea></div>'
    + '<div class="admin-field"><label>Services Interested In</label>'
    + '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">'
    + ['AI-Powered Apps','ERP Implementation','Systems Integration','Business Consulting','Infinity Mirror','Bank of Hours','Not Sure Yet'].map(function(sv){
        var sel = (sub.services||[]).indexOf(sv)>=0;
        return '<button type="button" class="svc-chip'+(sel?' active':'')+'" onclick="this.classList.toggle(\'active\')" style="font-size:11px;padding:5px 12px">'+_esc(sv)+'</button>';
      }).join('')
    + '</div></div>'
    + '<div class="admin-field"><label>Status</label><select id="subEditStatus">'
    + ['New','Read','Replied'].map(function(st){ return '<option'+(sub.status===st?' selected':'')+'>'+st+'</option>'; }).join('')
    + '</select></div>'
    + '<div style="display:flex;gap:8px;margin-top:8px">'
    + '<button class="admin-save" onclick="subSaveEdit('+id+')">Save Changes</button>'
    + '<button class="admin-cancel" onclick="document.getElementById(\'subEditModal\').remove()">Cancel</button>'
    + '</div></div>';
  document.body.appendChild(modal);
};
window.subSaveEdit = function(id){
  var sub = (window._SUBMISSIONS||[]).find(function(s){ return s.id===id; });
  if(!sub) return;
  sub.name     = document.getElementById('subEditName').value.trim();
  sub.email    = document.getElementById('subEditEmail').value.trim();
  sub.company  = document.getElementById('subEditCompany').value.trim();
  sub.size     = document.getElementById('subEditSize').value.trim();
  sub.timeline = document.getElementById('subEditTimeline').value;
  sub.message  = document.getElementById('subEditMsg').value.trim();
  sub.status   = document.getElementById('subEditStatus').value;
  var chips    = document.querySelectorAll('#subEditModal .svc-chip.active');
  sub.services = Array.from(chips).map(function(c){ return c.textContent.trim(); });
  document.getElementById('subEditModal').remove();
  subRenderList();
  // Persist updates to Supabase.
  try {
    updateSubmission(sub.id, { status: sub.status, contacted: sub.contacted, data: sub }).then(function(ok){
      if (!ok) console.warn('[submissions] update failed for', sub.id);
    });
  } catch(e){ console.warn('[submissions] update threw:', e); }
  if(window._adminToast) window._adminToast('Submission updated \u2713');
};

// ── Delete Modal ──────────────────────────────────────────────────────────────
window.subDeleteModal = function(id){
  var sub = (window._SUBMISSIONS||[]).find(function(s){ return s.id===id; });
  if(!sub) return;
  var modal = document.createElement('div');
  modal.className = 'sub-del-modal';
  modal.id = 'subDelModal';
  modal.innerHTML = '<div class="sub-del-modal-box">'
    + '<div class="sub-del-modal-title">Delete Submission</div>'
    + '<div class="sub-del-modal-desc">You are about to permanently delete the submission from <strong style="color:var(--tx)">'+_esc(sub.name)+'</strong>.<br><br>Enter your admin password to confirm.</div>'
    + '<div class="admin-field"><label>Admin Password</label><input type="password" id="subDelPass" placeholder="Enter password..." onkeydown="if(event.key===\'Enter\')subConfirmDelete('+id+')"></div>'
    + '<div class="sub-del-modal-err" id="subDelErr">Incorrect password.</div>'
    + '<div style="display:flex;gap:8px;margin-top:4px">'
    + '<button class="admin-del-btn" onclick="subConfirmDelete('+id+')">Delete Permanently</button>'
    + '<button class="admin-cancel" onclick="document.getElementById(\'subDelModal\').remove()">Cancel</button>'
    + '</div></div>';
  document.body.appendChild(modal);
  setTimeout(function(){ var i = document.getElementById('subDelPass'); if(i) i.focus(); }, 50);
};
window.subConfirmDelete = function(id){
  var passEl = document.getElementById('subDelPass');
  var errEl  = document.getElementById('subDelErr');
  if(!passEl) return;
  if(passEl.value !== _adminCreds.pass){
    if(errEl){ errEl.style.display='block'; }
    passEl.value = '';
    passEl.focus();
    return;
  }
  window._SUBMISSIONS = (window._SUBMISSIONS||[]).filter(function(s){ return s.id!==id; });
  document.getElementById('subDelModal').remove();
  subRenderList();
  // Delete from Supabase too \u2014 only authenticated users can hit this code
  // path (legacy password gate + RLS).
  try {
    deleteSubmission(id).then(function(ok){
      if (!ok) console.warn('[submissions] Supabase delete failed for', id);
    });
  } catch (e) { console.warn('[submissions] delete threw:', e); }
  if(window._adminToast) window._adminToast('Submission deleted \u2713');
};

// ── PDF Download ──────────────────────────────────────────────────────────────
window.subDownloadPDF = function(){
  var subs = subGetFiltered();
  if(!subs.length){ alert('No submissions to export.'); return; }

  var rows = subs.map(function(s, i){
    var svcs = (s.services||[]).join(', ') || '—';
    return '<tr style="background:'+(i%2===0?'#f9f9f9':'#fff')+'">'
      + '<td style="padding:10px 12px;border-bottom:1px solid #e5e5e5;font-weight:600">'+(i+1)+'</td>'
      + '<td style="padding:10px 12px;border-bottom:1px solid #e5e5e5">'+_escHTML(s.name)+'<br><span style="font-size:11px;color:#666">'+_escHTML(s.email)+'</span></td>'
      + '<td style="padding:10px 12px;border-bottom:1px solid #e5e5e5;font-size:12px">'+_escHTML(s.company||'—')+'</td>'
      + '<td style="padding:10px 12px;border-bottom:1px solid #e5e5e5;font-size:11px;max-width:200px">'+_escHTML(svcs)+'</td>'
      + '<td style="padding:10px 12px;border-bottom:1px solid #e5e5e5;font-size:12px;max-width:220px">'+_escHTML((s.message||'').substring(0,120)+(s.message&&s.message.length>120?'…':''))+'</td>'
      + '<td style="padding:10px 12px;border-bottom:1px solid #e5e5e5;text-align:center"><span style="padding:3px 9px;border-radius:20px;font-size:10px;font-weight:700;background:'+(s.status==='New'?'#fff3cd':s.status==='Read'?'#cce5ff':'#d4edda')+';color:'+(s.status==='New'?'#856404':s.status==='Read'?'#004085':'#155724')+'">'+_escHTML(s.status)+'</span></td>'
      + '<td style="padding:10px 12px;border-bottom:1px solid #e5e5e5;text-align:center">'+(s.contacted?'<span style="color:#28a745;font-weight:700">✓ Yes</span>':'<span style="color:#999">No</span>')+'</td>'
      + '<td style="padding:10px 12px;border-bottom:1px solid #e5e5e5;font-size:11px;color:#666">'+_escHTML(s.datetime)+'</td>'
      + '</tr>';
  }).join('');

  var html = '<!DOCTYPE html><html><head><meta charset="utf-8">'
    + '<title>Mirror Advisors — Submissions</title>'
    + '<style>body{font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#1a1a1a;margin:0;padding:0}'
    + '.header{background:#080B1A;color:#ECA934;padding:28px 36px;display:flex;align-items:center;justify-content:space-between}'
    + '.header h1{margin:0;font-size:20px;font-weight:900;letter-spacing:-.02em}'
    + '.header p{margin:4px 0 0;font-size:12px;opacity:.6;color:#fff}'
    + '.body{padding:28px 36px}'
    + 'table{width:100%;border-collapse:collapse;font-size:12px}'
    + 'th{background:#1a1a2e;color:#ECA934;padding:11px 12px;text-align:left;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.07em}'
    + 'tr:hover td{background:#f5f5f5}'
    + '.meta{font-size:11px;color:#888;margin-bottom:16px}'
    + '@media print{body{-webkit-print-color-adjust:exact}}'
    + '</style></head><body>'
    + '<div class="header"><div><h1>Mirror Advisors</h1><p>Contact Submissions Export</p></div>'
    + '<div style="text-align:right;color:#fff;font-size:12px;opacity:.6">'+new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})+'</div></div>'
    + '<div class="body">'
    + '<div class="meta">'+subs.length+' submission'+(subs.length===1?'':'s')+' exported</div>'
    + '<table><thead><tr><th>#</th><th>Name / Email</th><th>Company</th><th>Services</th><th>Message</th><th>Status</th><th>Contacted</th><th>Date</th></tr></thead><tbody>'
    + rows
    + '</tbody></table></div></body></html>';

  var blob = new Blob([html], { type: 'application/octet-stream' });
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement('a');
  a.href   = url;
  a.download = 'mirror-advisors-submissions-' + new Date().toISOString().split('T')[0] + '.html';
  a.click();
  URL.revokeObjectURL(url);
  if(window._adminToast) window._adminToast('Export downloaded — open in browser and print to PDF \u2713');
};

function _escHTML(s){
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function _refreshHomeScroll(){
  var track=document.getElementById('casesTrack');
  if(!track)return;
  var visible = window._CASES.filter(function(c){ return !c.hidden; });
  track._visibleCases = visible;  // stash for click-handler index mapping
  var doubled = visible.concat(visible);
  track.innerHTML=doubled.map(function(c){
    return '<div class="csc">'
      +'<span class="csc-tag" style="background:'+c.tc+';color:'+c.tt+'">'+c.cat+'</span>'
      +'<div class="csc-title">'+c.title+'</div>'
      +'<div class="csc-desc">'+c.desc+'</div>'
      +'<div class="csc-metric">'+c.m1+'</div>'
      +'<div class="csc-mlbl">'+c.ml1+'</div>'
    +'</div>';
  }).join('');
}

var _INIT={};
window._SOCIAL_LINKS = {
  linkedin:  { label:'LinkedIn',  url:'https://linkedin.com',  enabled:true },
  facebook:  { label:'Facebook',  url:'https://facebook.com',  enabled:true },
  instagram: { label:'Instagram', url:'https://instagram.com', enabled:true },
  x:         { label:'X',         url:'https://x.com',         enabled:true },
  youtube:   { label:'YouTube',   url:'https://youtube.com',   enabled:true },
  google:    { label:'Google',    url:'https://google.com',    enabled:true },
  tiktok:    { label:'TikTok',    url:'https://tiktok.com',    enabled:true },
  skool:     { label:'Skool',     url:'https://skool.com',     enabled:true }
};


// Master case data
window._CASES=[
  {cat:'AI Integration',    tc:'rgba(236,169,52,.12)', tt:'#ECA934', glyph:'AI',  gc:'rgba(236,169,52,.08)',  title:'Claude sales agent cuts response time 84%',                    desc:'Built a conversational AI layer on Zoho CRM for a B2B SaaS company. Leads qualified, briefed, and followed up — no human required.',           m1:'84%',   ml1:'Faster Response',    m2:'3x',    ml2:'Pipeline Handled',
    problem:'A fast-growing B2B SaaS company had their sales team manually qualifying every inbound lead, taking up to 4 hours per rep per day. Response times were inconsistent and leads were slipping through.',
    solution:'We built a Claude AI agent embedded directly in Zoho CRM. Every inbound lead gets automatically scored, briefed, and followed up with a personalised message within minutes of submission.',
    results:'Average response time dropped 84% within 90 days. The team now handles 3x the pipeline with the same headcount, focusing entirely on qualified opportunities rather than inbox triage.'
  },
  {cat:'ERP Deployment',    tc:'rgba(107,159,212,.12)',tt:'#6B9FD4', glyph:'ERP', gc:'rgba(107,159,212,.07)', title:'Zoho One across 7 PE subsidiaries — zero data loss',             desc:'Replaced three legacy ERPs for a private equity portfolio company. 6-month phased rollout with full data integrity.',                              m1:'7',     ml1:'Entities',           m2:'$180k', ml2:'Annual Saving',
    problem:'A private equity firm managing seven portfolio companies was running three different legacy ERPs. Cross-entity reporting was impossible and month-end close took three weeks.',
    solution:'We ran a full Scope engagement to map all seven entities, then designed a unified Zoho One architecture. A phased 6-month rollout migrated each subsidiary in sequence with zero data loss.',
    results:'All seven entities now operate on a single platform. Month-end close went from three weeks to four days. Cross-entity P&L reports that previously took a week now generate automatically every morning.'
  },
  {cat:'Systems Integration',tc:'rgba(139,159,212,.12)',tt:'#8B9FD4',glyph:'INT', gc:'rgba(139,159,212,.07)', title:'Shopify \u2194 Zoho \u2194 3PL real-time sync',                    desc:'Bidirectional integration across e-commerce, ERP, and logistics. Inventory, orders, and finance in one live flow.',                              m1:'99.7%', ml1:'Uptime SLA',          m2:'<200ms',ml2:'Avg Latency',
    problem:'An e-commerce brand had no real-time inventory visibility. Oversells were constant, 3PL fulfilment was delayed by manual CSV exports, and finance could not reconcile orders with actual stock.',
    solution:'We built a bidirectional sync engine connecting Shopify, Zoho Inventory, and the 3PL via webhooks and Zoho Flow. Every order, stock movement, and fulfilment update reflects across all three systems in real time.',
    results:'Oversells dropped to zero in the first month. The 3PL now receives automated pick lists within seconds of order placement. Stock accuracy reached 99.7%.'
  },
  {cat:'AI + Analytics',    tc:'rgba(236,169,52,.12)', tt:'#ECA934', glyph:'ML',  gc:'rgba(236,169,52,.07)',  title:'AI forecasting dashboard cuts overstock 31%',                   desc:'Custom ML pipeline pulling from Zoho Books and Inventory into a live demand forecasting tool.',                                                    m1:'31%',   ml1:'Less Overstock',     m2:'$220k', ml2:'Recovered Value',
    problem:'A product distributor was overstocking by an average of 31% across their catalogue. Demand planning was done in spreadsheets and they were carrying over $220k in recoverable excess inventory.',
    solution:'We built a custom ML forecasting pipeline pulling historical sales and seasonality from Zoho Books and Inventory. The output is a live demand forecast dashboard with colour-coded reorder recommendations.',
    results:'Overstock reduced by 31% in the first quarter. The $220k in excess inventory has been progressively liquidated. Purchase orders are now generated automatically, saving the buying team 8 hours per week.'
  },
  {cat:'Consulting',        tc:'rgba(107,159,212,.12)',tt:'#6B9FD4', glyph:'SC',  gc:'rgba(107,159,212,.06)', title:'90-day tech audit reveals $400k in savings',                     desc:'Scope engagement for a mid-market firm. 14 automation opportunities identified; all 14 shipped within 12 months.',                               m1:'$400k', ml1:'Savings Found',      m2:'14',    ml2:'Automations Built',
    problem:'A mid-market professional services firm knew they were leaving efficiency on the table but had no clear picture of where. They needed an independent audit before committing to any technology investment.',
    solution:'A 90-day Scope engagement covering all systems, processes, and vendor contracts. We interviewed every department head, mapped all data flows, and identified 14 concrete automation opportunities with individual ROI estimates.',
    results:'$400k in potential annual savings identified. All 14 automation opportunities were subsequently implemented within 12 months.'
  },
  {cat:'AI Integration',    tc:'rgba(236,169,52,.12)', tt:'#ECA934', glyph:'AI',  gc:'rgba(236,169,52,.06)',  title:'AI contract assistant — 60% less legal review',                 desc:'Claude agent trained on contract templates. Drafts, reviews, and flags compliance issues inside Zoho Sign.',                                       m1:'60%',   ml1:'Review Time Cut',    m2:'2 wks', ml2:'Build Time',
    problem:'A legal team was spending an average of 4 hours per contract on manual review. Their Zoho CRM was closing deals but the contract workflow was entirely manual.',
    solution:'We built a Claude AI agent trained on the company contract library. Contracts drafted in CRM are automatically reviewed, annotated with risk flags, and routed for approval inside Zoho Sign.',
    results:'Legal review time dropped by 60%. The average contract-to-signature cycle went from 11 days to under 3 days.'
  },
  {cat:'ERP Deployment',    tc:'rgba(107,159,212,.12)',tt:'#6B9FD4', glyph:'ERP', gc:'rgba(107,159,212,.06)', title:'Manufacturing firm migrates from legacy ERP',                    desc:'Full data extraction, cleansing, and migration from a 12-year-old on-premise ERP into Zoho One with zero downtime.',                             m1:'1.4M',  ml1:'Records Migrated',   m2:'0',     ml2:'Downtime Hours',
    problem:'A manufacturer with 14 years of data in a legacy on-premise ERP needed to migrate to Zoho One without stopping production.',
    solution:'We extracted all 1.4 million records from the legacy system, ran a full data cleansing and transformation process, and loaded into Zoho One over a single weekend cutover. Production did not stop for a single hour.',
    results:'1.4 million records migrated with zero loss and zero downtime. Within 60 days, the operations team reported a 40% reduction in order processing time and full real-time inventory visibility.'
  },
  {cat:'Systems Integration',tc:'rgba(139,159,212,.12)',tt:'#8B9FD4',glyph:'INT', gc:'rgba(139,159,212,.06)', title:'HubSpot \u2194 Zoho Desk \u2194 Slack support pipeline',           desc:'Unified support flow where HubSpot contacts auto-create tickets that escalate to Slack on SLA breach.',                                           m1:'68%',   ml1:'Faster Resolution',  m2:'100%',  ml2:'SLA Compliance',
    problem:'A SaaS company support operation was fragmented. HubSpot held customer data, Zoho Desk handled tickets, and escalations happened over email with no SLA tracking.',
    solution:'We built a three-way integration connecting HubSpot, Zoho Desk, and Slack via webhooks. HubSpot contacts auto-create Desk tickets with full context. SLA breaches trigger Slack escalations automatically.',
    results:'Resolution time improved 68% in the first month. SLA compliance reached 100% up from an estimated 61%. The support manager now has a live dashboard showing every open ticket and its SLA status.'
  },
  {cat:'Consulting',        tc:'rgba(107,159,212,.12)',tt:'#6B9FD4', glyph:'SC',  gc:'rgba(107,159,212,.06)', title:'Real estate firm cuts reporting from 3 days to 4 hours',         desc:'Custom Zoho Analytics dashboards replacing 3 days of manual spreadsheet consolidation each month.',                                               m1:'18x',   ml1:'Faster Reports',     m2:'3 days',ml2:'Time Reclaimed/mo',
    problem:'A real estate investment firm finance team was spending three full days each month consolidating spreadsheets to produce a single management report.',
    solution:'We built a suite of Zoho Analytics dashboards connected directly to Books, CRM, and Projects. Reports now refresh automatically and are emailed to leadership every Monday morning.',
    results:'Reporting time dropped from 3 days to 4 hours, an 18x improvement. The finance team reclaimed over 3 working days per month. The monthly board pack is now produced in under an hour.'
  }
];


_INIT.home=function(){

// ---- Clean up timers/animations from previous home visit ----
if(window._homeFeedTimer){ clearInterval(window._homeFeedTimer); window._homeFeedTimer = null; }
window._homeTetrisRunId = (window._homeTetrisRunId || 0) + 1;  // bump ID; any prior RAF chain will see a stale ID and halt

// ---- Tetris block animation ----
(function(){
  var myRunId = window._homeTetrisRunId;
  var board=document.querySelector('.tetris-board');
  if(!board)return;

  var COLS=5, ROWS=9;
  var CW=56, CH=40, GAP=3;   // cell width, height, gap
  // board inner = 300px wide, COLS*CW + (COLS-1)*GAP = 5*56+4*3 = 292 → fits with 4px side pad
  var PAD_X=4, PAD_Y=4;

  // Named blocks: label + colour class
  var NAMED=[
    // Services (gold)
    {t:'Scope',   c:'tb-gold'},
    {t:'ERP',     c:'tb-gold'},
    {t:'Infinity',c:'tb-gold'},
    {t:'Bk Hours',c:'tb-gold'},
    {t:'Support', c:'tb-gold'},
    // Capabilities (blue)
    {t:'AI Apps', c:'tb-blue'},
    {t:'Consult', c:'tb-blue'},
    {t:'Integrate',c:'tb-blue'},
    {t:'Deploy',  c:'tb-blue'},
    // Zoho (purple)
    {t:'CRM',     c:'tb-pur'},
    {t:'Books',   c:'tb-pur'},
    {t:'Analytics',c:'tb-pur'},
    {t:'Flow',    c:'tb-pur'},
    {t:'Sign',    c:'tb-pur'},
    {t:'Desk',    c:'tb-pur'},
    {t:'Projects',c:'tb-pur'},
    {t:'Inventory',c:'tb-pur'},
  ];
  var namedIdx=0;

  // Plain piece colours
  var PLAIN_COLORS=['tb-gold','tb-blue','tb-pur','tb-dark','tb-faint'];

  // Board state: 0=empty, else DOM element reference
  var state=[];
  for(var r=0;r<ROWS;r++) state.push(new Array(COLS).fill(0));

  // Helper: pixel position of cell
  function cellX(c){return PAD_X+c*(CW+GAP);}
  function cellY(r){return PAD_Y+(ROWS-1-r)*(CH+GAP);}  // row 0 = bottom

  // Create a block div
  function makeBlock(colorCls, label){
    var d=document.createElement('div');
    d.className='t-block '+colorCls;
    d.style.width=CW+'px';
    d.style.height=CH+'px';
    if(label) d.textContent=label;
    board.appendChild(d);
    return d;
  }

  // Place block at board position (no animation)
  function placeAt(el, row, col){
    el.style.left=cellX(col)+'px';
    el.style.top=cellY(row)+'px';
  }

  // Pre-fill foundation rows
  var FILL=[
    [1,1,1,1,1],  // row 0 – full
    [1,1,1,1,1],  // row 1 – full
    [1,0,0,1,1],  // row 2 – 2-wide gap at col 1-2
    [1,1,0,0,1],  // row 3 – 2-wide gap at col 2-3
  ];
  var FILL_COLORS=['tb-blue','tb-dark','tb-pur','tb-gold','tb-blue',
                   'tb-dark','tb-pur','tb-gold','tb-faint','tb-blue',
                   'tb-pur','tb-dark','tb-gold','tb-blue','tb-pur'];
  var ci=0;
  var fillDelay=0;
  for(var fr=0;fr<FILL.length;fr++){
    for(var fc=0;fc<COLS;fc++){
      if(FILL[fr][fc]){
        (function(r,c,cls,d){
          setTimeout(function(){
            var el=makeBlock(cls,'');
            el.classList.add('landing');
            placeAt(el,r,c);
            state[r][c]=el;
          },d);
        })(fr,fc,FILL_COLORS[ci%FILL_COLORS.length],fillDelay);
        ci++;
        fillDelay+=45;
      }
    }
  }

  // ── Falling piece state ───────────────────────────────────────────────────
  var curEl=null, curRow=0, curCol=0, isNamed=false;
  var lastTime=0, fallSpeed=160; // ms per row

  function isValidPos(row,col){
    if(col<0||col>=COLS||row<0) return false;
    if(row>=ROWS) return true; // above board is fine
    return !state[row][col];
  }

  function spawnPiece(){
    if(myRunId !== window._homeTetrisRunId) return;  // stale chain — halt
    // Every 3rd piece is a named block
    isNamed=(namedIdx%3===0);
    var nb=null, colorCls='', label='';

    if(isNamed){
      nb=NAMED[namedIdx%NAMED.length];
      colorCls=nb.c;
      label=nb.t;
    } else {
      colorCls=PLAIN_COLORS[Math.floor(Math.random()*PLAIN_COLORS.length)];
    }
    namedIdx++;

    // For named: find column with a gap in bottom 4 rows
    var spawnCol;
    if(isNamed){
      var gaps=[];
      for(var c=0;c<COLS;c++){
        for(var r=0;r<4;r++){
          if(!state[r][c]) gaps.push(c);
        }
      }
      spawnCol=gaps.length?gaps[Math.floor(Math.random()*gaps.length)]:Math.floor(Math.random()*COLS);
    } else {
      spawnCol=Math.floor(Math.random()*COLS);
    }

    // Find landing row (highest empty row in this column)
    var landRow=0;
    for(var r=0;r<ROWS;r++){
      if(!state[r][spawnCol]) landRow=r;
      else break;
    }

    curEl=makeBlock(colorCls, label);
    curCol=spawnCol;
    curRow=ROWS; // start above board
    placeAt(curEl, curRow, curCol);
    lastTime=0;
    fallSpeed=isNamed?130:155;
    requestAnimationFrame(tick);
  }

  function tick(ts){
    if(myRunId !== window._homeTetrisRunId) return;  // stale chain — halt
    if(!curEl) return;
    if(!lastTime) lastTime=ts;
    var dt=ts-lastTime;
    if(dt<fallSpeed){requestAnimationFrame(tick);return;}
    lastTime=ts;

    // Step down one row
    var nextRow=curRow-1;
    if(nextRow<ROWS&&isValidPos(nextRow,curCol)){
      curRow=nextRow;
      // Only update DOM if in visible range
      if(curRow<ROWS){
        placeAt(curEl,curRow,curCol);
      }
      requestAnimationFrame(tick);
    } else {
      // Land
      if(curRow>=ROWS){
        // Piece never entered board — remove and try again
        board.removeChild(curEl);
        curEl=null;
        setTimeout(spawnPiece,300);
        return;
      }
      curEl.classList.add('landing');
      state[curRow][curCol]=curEl;
      placeAt(curEl,curRow,curCol);
      curEl=null;
      // Check and clear full rows
      setTimeout(function(){
        checkClear();
        setTimeout(spawnPiece,350);
      },200);
    }
  }

  function checkClear(){
    for(var r=ROWS-1;r>=0;r--){
      var full=true;
      for(var c=0;c<COLS;c++){if(!state[r][c]){full=false;break;}}
      if(full){
        // Animate clear
        for(var c2=0;c2<COLS;c2++){
          state[r][c2].classList.add('clearing');
          var el=state[r][c2];
          (function(e){setTimeout(function(){if(e.parentNode)board.removeChild(e);},350);})(el);
          state[r][c2]=0;
        }
        // Shift everything above down
        setTimeout((function(row){return function(){
          for(var rr=row;rr<ROWS-1;rr++){
            for(var cc=0;cc<COLS;cc++){
              state[rr][cc]=state[rr+1][cc];
              if(state[rr][cc]){
                placeAt(state[rr][cc],rr,cc);
              }
            }
          }
          for(var cc2=0;cc2<COLS;cc2++) state[ROWS-1][cc2]=0;
        };})(r),360);
        break; // one row at a time
      }
    }
  }

  setTimeout(spawnPiece, fillDelay+700);
})();

// ---- Chart Bars ----
const barData = [42,55,38,67,52,78,60,88,70,84,76,95];
const chartEl = document.getElementById('chartBars');
if (chartEl) {
  chartEl.innerHTML = barData.map((v, i) => {
    const isLast = i === barData.length - 1;
    const isSecond = i === barData.length - 2;
    const bg = isLast ? '#00C4CC' : isSecond ? '#4A9EFF' : 'rgba(255,255,255,0.11)';
    return `<div class="chart-bar" style="height:${Math.round(v * 0.52)}px;background:${bg};"></div>`;
  }).join('');
}

// ---- Case Studies ----
const cases = [
  { tag: 'AI Integration', tc: 'rgba(0,196,204,0.12)', tt: '#00C4CC', title: 'Claude-powered sales agent cuts response time by 84%', desc: 'Conversational AI built on Zoho CRM for a B2B SaaS company. Leads qualified, briefed, and followed up without a human in the loop.', metric: '84%', metricLabel: 'Faster Lead Response' },
  { tag: 'ERP Deployment', tc: 'rgba(74,158,255,0.12)', tt: '#4A9EFF', title: 'Multi-entity Zoho One across 7 subsidiaries', desc: 'Replaced three legacy ERPs with a unified Zoho One deployment for a PE portfolio company. 6-month timeline, zero data loss.', metric: '7', metricLabel: 'Entities Unified' },
  { tag: 'Systems Integration', tc: 'rgba(167,139,250,0.12)', tt: '#A78BFA', title: 'Real-time sync between Shopify, Zoho, and 3PL warehouse', desc: 'Bidirectional integration handling inventory, fulfillment, and financial reconciliation in real time with 99.7% uptime.', metric: '99.7%', metricLabel: 'Uptime SLA Achieved' },
  { tag: 'AI + Analytics', tc: 'rgba(245,158,11,0.12)', tt: '#F59E0B', title: 'AI forecasting dashboard cuts overstock cost by 31%', desc: 'Custom ML pipeline pulling from Zoho Books and Inventory into a live forecasting tool. Dead stock reduced by nearly a third.', metric: '31%', metricLabel: 'Overstock Cost Reduction' },
  { tag: 'Consulting', tc: 'rgba(0,196,204,0.12)', tt: '#00C4CC', title: '90-day tech audit reveals $400k in automation savings', desc: 'Scope engagement identified 14 high-ROI automation opportunities for a mid-market services firm. All 14 shipped within the year.', metric: '$400k', metricLabel: 'Identified Savings' },
  { tag: 'ERP + AI', tc: 'rgba(74,158,255,0.12)', tt: '#4A9EFF', title: 'AI contract assistant reduces legal review time by 60%', desc: 'Claude agent trained on contract templates to draft, review, and flag compliance issues — integrated into Zoho Sign.', metric: '60%', metricLabel: 'Legal Review Time Saved' },
];


// Hero vis — animated chart bars + counters + cycling feed
(function(){
  // Chart bars
  var chart = document.getElementById('hvChart');
  if(chart){
    var bars = [
      {h:30,c:'rgba(236,169,52,.6)',d:.1},
      {h:55,c:'rgba(236,169,52,.8)',d:.2},
      {h:40,c:'rgba(107,159,212,.6)',d:.3},
      {h:70,c:'rgba(236,169,52,.9)',d:.4},
      {h:45,c:'rgba(107,159,212,.7)',d:.5},
      {h:65,c:'rgba(139,159,212,.7)',d:.6},
      {h:50,c:'rgba(236,169,52,.7)',d:.7},
      {h:80,c:'#ECA934',d:.8},
    ];
    chart.innerHTML = bars.map(function(b){
      return '<div class="hv-chart-bar" style="height:'+b.h+'px;background:'+b.c+';animation-delay:'+b.d+'s"></div>';
    }).join('');
  }
  // Counters
  function countUp(id, target, duration, suffix){
    var el = document.getElementById(id);
    if(!el) return;
    var step = target / (duration / 16);
    var val  = 0;
    var timer = setInterval(function(){
      val += step;
      if(val >= target){ val = target; clearInterval(timer); }
      el.textContent = Math.floor(val) + (suffix||'');
    }, 16);
  }
  setTimeout(function(){
    countUp('hvK1', 847, 1200);
    countUp('hvK2', 12,  900);
    // Uptime counts up to 99.7
    var upEl = document.getElementById('hvK3');
    if(upEl){
      var v = 95;
      var t = setInterval(function(){
        v += 0.15;
        if(v >= 99.7){ v = 99.7; clearInterval(t); }
        upEl.textContent = v.toFixed(1) + '%';
      }, 20);
    }
  }, 300);

  // Cycle feed items to simulate live activity
  var feedItems = [
    {color:'#ECA934', text:'AI agent qualified 14 leads',          time:'now'},
    {color:'#6B9FD4', text:'Zoho Books reconciled 340 txns',       time:'2m'},
    {color:'#8B9FD4', text:'Shopify \u2192 Inventory synced',          time:'5m'},
    {color:'#4CAF50', text:'Contract signed via Zoho Sign',         time:'8m'},
    {color:'#ECA934', text:'CRM pipeline updated \u2014 7 deals',      time:'11m'},
    {color:'#6B9FD4', text:'Analytics report sent to leadership',   time:'14m'},
    {color:'#8B9FD4', text:'3PL shipment status synced',            time:'16m'},
    {color:'#4CAF50', text:'Infinity retainer sprint completed',    time:'19m'},
  ];
  var feedIdx = 0;
  window._homeFeedTimer = setInterval(function(){
    var feed = document.getElementById('hvFeed');
    if(!feed) return;
    feedIdx = (feedIdx + 1) % feedItems.length;
    var item = feedItems[feedIdx];
    var el = document.createElement('div');
    el.className = 'hv-feed-item';
    el.style.animationDelay = '0s';
    el.innerHTML = '<div class="hv-feed-dot" style="background:'+item.color+'"></div>'
      + '<span class="hv-feed-text">'+item.text+'</span>'
      + '<span class="hv-feed-time">'+item.time+'</span>';
    // Shift items up
    var items = feed.querySelectorAll('.hv-feed-item');
    if(items.length >= 4) feed.removeChild(items[0]);
    feed.appendChild(el);
    // Update times
    var all = feed.querySelectorAll('.hv-feed-time');
    all.forEach(function(t,i){ if(i < all.length-1) t.textContent = feedItems[(feedIdx - (all.length-1-i) + feedItems.length) % feedItems.length].time; });
  }, 3500);
})();


// ---- Service Models ----
const svcs = [
  {
    num: '01', name: 'Scope', sub: 'Blueprinting',
    desc: 'A fixed-fee discovery engagement. We audit your systems, map your business logic, and deliver a comprehensive technical blueprint before any build begins. No surprises, no scope creep.',
    time: '2–4 weeks', pricing: 'Fixed Fee', fit: 'New clients & tech audits',
    bars: [{ label: 'Process Mapping', pct: '90%' }, { label: 'Tech Audit', pct: '75%' }, { label: 'Roadmap Delivery', pct: '100%' }]
  },
  {
    num: '02', name: 'ERP Projects', sub: 'Implementation',
    desc: 'Full-lifecycle project delivery with defined milestones, a dedicated team, and a go-live commitment. For complex, multi-phase ERP builds that require serious architectural thinking.',
    time: '3–18 months', pricing: 'Project-Based', fit: 'Mid to large businesses',
    bars: [{ label: 'Architecture', pct: '100%' }, { label: 'Configuration', pct: '95%' }, { label: 'Training + Handoff', pct: '80%' }]
  },
  {
    num: '03', name: 'Infinity Mirror', sub: 'Subscription Dev',
    desc: 'A continuous development partnership. Monthly retainer, rolling priorities, no SOW friction. Your technology evolves at the same pace as your business strategy.',
    time: 'Monthly rolling', pricing: 'Retainer', fit: 'Growth-stage companies',
    bars: [{ label: 'Feature Velocity', pct: '85%' }, { label: 'AI Iteration', pct: '90%' }, { label: 'Strategic Alignment', pct: '95%' }]
  },
  {
    num: '04', name: 'Bank of Hours', sub: 'Prepaid Blocks',
    desc: 'Pre-purchase development hours at a locked rate. Use for feature sprints, integrations, or AI experiments — consumed on your schedule with full flexibility.',
    time: 'Flexible', pricing: 'Prepaid', fit: 'Tactical on-demand work',
    bars: [{ label: 'Flexibility', pct: '100%' }, { label: 'Speed to Start', pct: '95%' }, { label: 'Cost Control', pct: '90%' }]
  },
  {
    num: '05', name: 'Support Only', sub: 'Maintenance',
    desc: 'Dedicated support SLA for systems already live. Monitoring, bug fixes, minor improvements, and proactive uptime management — keeping everything running clean.',
    time: 'Ongoing', pricing: 'SLA-Based', fit: 'Post-implementation clients',
    bars: [{ label: 'Response SLA', pct: '100%' }, { label: 'Uptime Monitoring', pct: '100%' }, { label: 'Minor Enhancements', pct: '60%' }]
  },
];

let curSvc = 0;
function renderSvcTabs() {
  const el = document.getElementById('svcTabList');
  if (!el) return;
  el.innerHTML = svcs.map((s, i) => `
    <div class="svc-tab-item ${i === curSvc ? 'active' : ''}" onclick="setSvc(${i})">
      <div class="svc-tab-num">${s.num}</div>
      <div class="svc-tab-name">${s.name}</div>
      <div class="svc-tab-sub">${s.sub}</div>
    </div>`).join('');
}
function renderSvcPanel() {
  const el = document.getElementById('svcPanel');
  if (!el) return;
  const s = svcs[curSvc];
  el.innerHTML = `
    <div class="svc-panel-glow"></div>
    <div style="position:relative;z-index:1;">
      <div class="svc-badge"><div class="svc-badge-dot"></div>${s.sub}</div>
      <div class="svc-title">${s.name}</div>
      <div class="svc-desc">${s.desc}</div>
      <div class="svc-meta">
        <div>
          <div class="svc-meta-label">Timeframe</div>
          <div class="svc-meta-value">${s.time}</div>
        </div>
        <div>
          <div class="svc-meta-label">Pricing</div>
          <div class="svc-meta-value">${s.pricing}</div>
        </div>
        <div>
          <div class="svc-meta-label">Best Fit</div>
          <div class="svc-meta-value" style="font-size:13px;color:rgba(255,255,255,0.45);">${s.fit}</div>
        </div>
      </div>
      <div class="svc-bars">
        ${s.bars.map(b => `
        <div class="svc-bar-row">
          <div class="svc-bar-head">
            <span class="svc-bar-label">${b.label}</span>
            <span class="svc-bar-pct">${b.pct}</span>
          </div>
          <div class="svc-bar-track">
            <div class="svc-bar-fill run" style="--bar-w:${b.pct};width:${b.pct};"></div>
          </div>
        </div>`).join('')}
      </div>
    </div>
    <button class="btn-primary" onclick="go('services')" style="font-size:13px;padding:11px 22px;margin-top:16px;cursor:pointer">
      Learn More
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </button>`;
}
window.setSvc = function(i) { curSvc = i; renderSvcTabs(); renderSvcPanel(); };
renderSvcTabs();
renderSvcPanel();

// ---- Scroll-triggered nav shadow ----
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (window.scrollY > 40) {
    nav.style.background = 'rgba(12,12,12,0.97)';
  } else {
    nav.style.background = 'rgba(12,12,12,0.85)';
  }
});
  _refreshHomeScroll();

  // ---- Cases carousel drag-to-scroll ----
  (function(){
    var wrap  = document.querySelector('.cases-track-wrap');
    var track = document.getElementById('casesTrack');
    if(!wrap || !track) return;

    var isDown = false, startX = 0, scrollLeft = 0, velX = 0, lastX = 0, lastT = 0;

    wrap.addEventListener('mousedown', function(e){
      isDown = true;
      startX = e.pageX - wrap.offsetLeft;
      scrollLeft = wrap.scrollLeft;
      velX = 0; lastX = e.pageX; lastT = Date.now();
      track.classList.add('dragging');
      e.preventDefault();
    });
    wrap.addEventListener('mouseleave', function(){ isDown = false; track.classList.remove('dragging'); });
    wrap.addEventListener('mouseup',    function(){ isDown = false; track.classList.remove('dragging'); });
    wrap.addEventListener('mousemove',  function(e){
      if(!isDown) return;
      var x  = e.pageX - wrap.offsetLeft;
      var dx = x - startX;
      wrap.scrollLeft = scrollLeft - dx;
      var now = Date.now();
      velX = (e.pageX - lastX) / (now - lastT + 1);
      lastX = e.pageX; lastT = now;
    });

    // Touch support
    wrap.addEventListener('touchstart', function(e){
      startX = e.touches[0].pageX - wrap.offsetLeft;
      scrollLeft = wrap.scrollLeft;
      track.classList.add('dragging');
    }, { passive:true });
    wrap.addEventListener('touchend',   function(){ track.classList.remove('dragging'); });
    wrap.addEventListener('touchmove',  function(e){
      var x  = e.touches[0].pageX - wrap.offsetLeft;
      wrap.scrollLeft = scrollLeft - (x - startX);
    }, { passive:true });

    // Click cards to open case
    track.addEventListener('click', function(e){
      var card = e.target.closest('.csc');
      if(!card) return;
      var cards = Array.from(track.querySelectorAll('.csc'));
      var visible = track._visibleCases || window._CASES.filter(function(c){ return !c.hidden; });
      if(!visible.length) return;
      var pos = cards.indexOf(card) % visible.length;  // position in visibleCases
      var realIdx = window._CASES.indexOf(visible[pos]);  // map back to _CASES
      if(realIdx >= 0) go('case_' + realIdx);
    });
  })();

  _navUpdateHomeLinks();

  // ---- Hero integration jigsaw puzzle ----
  // Model: 5 separate puzzles, one per integration group.
  // - Initial state: all 13 distinct pieces scattered around the stage perimeter.
  // - Click a piece: show that piece's FIRST group as a complete sub-puzzle (group's
  //   pieces fly into a compact grid layout; non-group pieces dim out at scatter positions).
  // - Click the SAME piece again: cycle to its next group. After last group → return to neutral.
  // - Click empty stage / press Esc / click active piece a final time → return to scattered neutral.
  (function(){
    var root  = document.getElementById('heroPuzzle');
    var stage = document.getElementById('heroPuzzleStage');
    var labelEl = document.getElementById('heroPuzzleLabel');
    var headerText = document.getElementById('heroPuzzleHeaderText');
    var cycleEl = document.getElementById('heroPuzzleCycle');
    var cycleCurrent = document.getElementById('hpCycleCurrent');
    var cycleTotal = document.getElementById('hpCycleTotal');
    var HINT_DEFAULT = 'Tap a piece to explore';
    var HINT_AFTER_FIRST = 'Tap again to cycle groups';
    var hasInteracted = false;
    if(!root || !stage) return;

    // Pull the real Mirror Advisors logo from the footer img if rendered
    var mirrorImgSrc = '';
    try {
      var existing = document.querySelector('.pft-brand .logo-img-wide, .pft-brand img');
      if(existing && existing.getAttribute('src')) mirrorImgSrc = existing.getAttribute('src');
    } catch(e){}

    // --- INLINE BRAND LOGOS ---
    var LOGOS = {
      mirror: null, // use mirrorImgSrc img if available

      claude: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTAwMCIgem9vbUFuZFBhbj0ibWFnbmlmeSIgdmlld0JveD0iMCAwIDM3NTAgMzc0OS45OTk5NjciIGhlaWdodD0iNTAwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmVyc2lvbj0iMS4wIj48ZGVmcz48ZmlsdGVyIHg9IjAlIiB5PSIwJSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgaWQ9IjcyNTgxNTRhODMiPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAxIDAgMCAwIDAgMSAwIDAgMCAwIDEgMCAwIDAgMSAwIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiLz48L2ZpbHRlcj48ZmlsdGVyIHg9IjAlIiB5PSIwJSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgaWQ9IjY2ZWQyZjU2ZmYiPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAxIDAgMCAwIDAgMSAwIDAgMCAwIDEgMC4yMTI2IDAuNzE1MiAwLjA3MjIgMCAwIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiLz48L2ZpbHRlcj48Y2xpcFBhdGggaWQ9IjhjY2U5NjFmOGQiPjxwYXRoIGQ9Ik0gODQuMDQyOTY5IDg0LjA0Mjk2OSBMIDM2NjYgODQuMDQyOTY5IEwgMzY2NiAzNjY2IEwgODQuMDQyOTY5IDM2NjYgWiBNIDg0LjA0Mjk2OSA4NC4wNDI5NjkgIiBjbGlwLXJ1bGU9Im5vbnplcm8iLz48L2NsaXBQYXRoPjxtYXNrIGlkPSIyMDg3MWE1MjNlIj48ZyBmaWx0ZXI9InVybCgjNzI1ODE1NGE4MykiPjxnIGZpbHRlcj0idXJsKCM2NmVkMmY1NmZmKSIgdHJhbnNmb3JtPSJtYXRyaXgoNi45OTYwOTMsIDAsIDAsIDYuOTk2MDkzLCA4NC4wNDQxMzQsIDg0LjA0NDE2KSI+PGltYWdlIHg9IjAiIHk9IjAiIHdpZHRoPSI1MTIiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBZ0FBQUFJQUNBQUFBQURSRTRzbUFBQUFBbUpMUjBRQS80ZVB6TDhBQUF2TFNVUkJWSGljN2QyOWJ0dFlIb2J4Vjh3TkxMQlhRQnQyMm5TQzY1VUJBOU50SFdEU090Tk12d3NFY3dPRE5EdlRTZ05YVTAxcElPa0ZBYm1Cb1dHcm41dVlMU2pKK3FBb2tpSjF4UE0rdnlvZlRremdQUG56SEVwMkpGZ2JuT2p6cEplNmtqU1VkSE9pVDlsSFUwa3pTVTk2bnAvbU0zWWVRSHA1TmRUTmRkZWZKa0xaVkxPbnpqdm9Nb0RSMVpDVlAxbzJuVDE5N2U2djd5cUE5Rzc0ZlVkL3RhUEo3TEdqVWRCRkFDeCtKN3FKb1BVQVJ1OVovTzVNSHRxK0c3UWJRUHFKMWUvYTVLZFc1MENMQWFSM1A3TGxPNFhzYzR2M2d0WUNHUDJQMVQrZHllelhsdjZtZGdKZzlKOWVTN2VDTmdKZytjTm9KWUhqQTJENXcya2hnV01ENE5RWDF0SG53dU1DWU9jWFh2YkRVUWtjRTBENnlQS2ZnK3p1aUJ0QjB2eVBqbDlZLzdOdy9USnUvb2NiVDREUmwrYWZGSzI3YlhvZmFEZ0IwakhyZjFhK2pOTm1mN0RaQkxqL3BkbG5RNGMrTm5vNDJDUUE5djducWRGNW9FRUFZMDcrNTJyeW9mWWZxUjBBWjc5elZ2OUVXRGNBTnY5bnJ1NXhvT1lwZ00zL3Vmc3lydmZ4dFNZQTQ3OFA2dDBHNmdUQStPK0pPcmVCR3JjQXhuOWYxTGtOdktuOGtaeisrdU5kK2tmVkQ2MThDL2lUMjMrZlZONElWTHdGcEt4L3Yxdy9Wbnh0b05vRVNGK091QmFFY1ZGcEJsU2FBQ1BXdjRkZVJsVStxc29FNFBqWFUxV09neFVtd0QzcjMxTmY3Zzkvek9GaklLLzk5OWQzZjMwNzlDRUhid0hNLzE0N2VCYzRGQURyMzNPSENqZ1FBT2UvM2p0d0dpd1BnUFdQUUhrQnBhZUE5TEhkUzBFSTVjOEVTeWNBejMramtMMHQrYzJ5WXlEckg0ZC9scjAyV0JMQStGL3RYd3RDS0h0MWVIOEE5Ly9wNGxvUXdydjlENFQyN2dFNEFFUmw3MUZnN3ltQUEwQlU5aTdudmdER2JBQ2pjajNlOHh0NzlnQnNBR0t6Ynh0UXZBZGdBeENoNG0xQThTMkFEVUNFaWhlMU1BQTJBREVxM2dZVTNRSjRDVGhTUlM4TkZ3WHdkK2RYZ2pBS1ZydmdGakR1L0RvUXlIajNsM2FiNEFRUXNkMlR3TzRFNEFRUXNkM0YzUW5nbmhOQXhLNTMzaWkrZlF2Z0JoQzU3UVhmbmdDZlRuVWhDR084OWZPdElIZ0VFTDJ0aHdGYkFmQXVzT2h0dlVOdzh4WXdZdjJqZDczNVJjT2JFNEFCWUdCekJHeE1BQWFBZzgwUnNERUJHQUFXTmtiQStnUmdBSGpZR0FIckU0QUJZR0o5Qkt4TkFBYUFpL1VSc0JiQSs5TmZDY0pZVytyWFd3QVBBWTI4UGc1OG5RQU1BQ092aTcyYUFMd01hR1gxenBEVkJMZ0xkQ1VJWXJYY3F3bkFHZERLNmlTNG5BQ2NBYjJzVG9MTEFOZ0NtbGt1K1BJV3dOY0N1Rm1zL0dJQ1ZQckcwb2pKWXNrWEFYQUhzTE5ZOG53UThCREFVUDRvSUo4QVBBUXdsQzk2UGdGNENHQW9meFNRQjhBWndORkFXdHdDT0FOWUdrbUxBRGdEV0hvdkxRSzRDWHNoQ09OR3l1OERIQUpOWGN6ekNYQVora0lReHFYeUFOZ0NtSHF2UEFDMkFLWnVKQTNZQWhpN21DdmhPYkN4T3ltUmhxRXZBNkVNcFlRdGdMRWJhY0FMQWM0R1NsVDZ2OG9oYnFrU0hnTTV1MVNpcTlBWGdYQ3VsSEFJY0RZcy83K0RFYitFVTZDekd3MDRCVm9iSkp3Q3JhVUpwMEJybHdtblFHdFhuQUxNSlR3R3NEWmtBcGdqQUhNRVlDN2hRYUMxR3lhQU9RSXdOK0NsQUc5TUFITUVZSTRBekJHQU9RSXdSd0RtQ01BY0FaZ2pBSE1FWUk0QXpCR0FPUUl3UndEbUNNQWNBWmdqQUhNRVlJNEF6QkdBT1FJd1J3RG1DTUFjQVpnakFITUVZSTRBekJHQU9RSXdSd0RtQ01BY0FaZ2pBSE1FWUk0QXpCR0FPUUl3UndEbUNNQWNBWmdqQUhNRVlJNEF6QkdBT1FJd1J3RG1DTUFjQVpnakFITUVZSTRBekJHQU9RSXdSd0RtQ01BY0FaZ2pBSE1FWUk0QXpCR0FPUUl3UndEbUNNQWNBWmdqQUhNRVlJNEF6QkdBT1FJd1J3RG1DTUFjQVpnakFITUVZSTRBekJHQU9RSXdSd0RtQ01BY0FaZ2pBSE1FWUk0QXpCR0FPUUl3UndEbUNNQWNBWmdqQUhNRVlJNEF6QkdBT1FJd1J3RG1DTUFjQVpnakFITUVZSTRBekJHQU9RSXdSd0RtQ01BY0FaZ2pBSE1FWUk0QXpCR0FPUUl3UndEbUNNQWNBWmdqQUhNRVlJNEF6QkdBT1FJd1J3RG1DTUFjQVpnakFITUVZSTRBekJHQU9RSXdSd0RtQ01BY0FaZ2pBSE1FWUk0QXpCR0FPUUl3UndEbUNNQWNBWmdqQUhNRVlJNEF6QkdBT1FJd1J3RG1DTUFjQVpnakFITUVZSTRBekJHQU9RSXdSd0RtQ01BY0FaZ2pBSE1FWUk0QXpCR0FPUUl3UndEbUNNQWNBWmdqQUhNRVlJNEF6QkdBT1FJd1J3RG1DTUFjQVpnakFITUVZSTRBekJHQU9RSXdSd0RtQ01BY0FaZ2pBSE1FWUk0QXpCR0FPUUl3UndEbUNNQWNBWmdqQUhNRVlJNEF6QkdBT1FJd1J3RG1DTUFjQVpnakFITUVZSTRBekJHQU9RSXdSd0RtQ01BY0FaZ2pBSE1FWUk0QXpCR0FPUUl3UndEbUNNQWNBWmdqQUhNRVlJNEF6QkdBT1FJd1J3RG1DTUFjQVpnakFITUVZSTRBekJHQU9RSXdSd0RtQ01BY0FaZ2pBSE1FWUk0QXpCR0FPUUl3UndEbUNNQWNBWmdqQUhNRVlJNEF6QkdBT1FJd1J3RG1DTUFjQVpnakFITUVZSTRBekJHQU9RSXdSd0RtQ01BY0FaZ2pBSE1FWUk0QXpCR0FPUUl3UndEbUNNQWNBWmdqQUhNRVlJNEF6QkdBT1FJd1J3RG1DTUFjQVpnakFITUVZSTRBekJHQU9RSXdSd0RtQ01BY0FaZ2pBSE1FWUk0QXpCR0FPUUl3UndEbUNNQWNBWmdqQUhNRVlJNEF6Q1ZaNkN0QVNCa1R3QndCZUpzbTA5Q1hnS0NZQU9ZSXdGd3lDMzBGQ0duR0JEQkhBT2FTcDlCWGdKQ2VrdWZRbDRDUW5nZjZPL1ExSUtCQklsNE1NSllwRVk4Q2pVMDVCYmhMeEpNZ1l6TWw0aHhvN0VtSk9BY2FlOVpBbkFPTkRaU0ljNkN2VEVyRU9kRFhWRXJFTWNEWFRCcEk2VXZvNjBBZ0YzTWwwcHhOZ0tsc25yOGZnRTJBcWFueUFCNUNYd2pDZUZBZUFJK0NURDByRDRCTmdLZHNyc1Y3QXRrRVdKcEtpd0RZQkZoNmtLU0JKRjRPOERTUWxtOExaeE5nS0YvMFBJRFBJUzhFWWVTTG50OENlQnBzNkdJdUxTZkFmQkwwVWhEQVpDNXA5YVZobkFQc0xKWjhzUGdwNXdBM2k1VmZ2aTJjZTRDWjVZSXZKd0RiUURQNUZ2QjFBdkI2Z0pkc3NmNnZYeG5Fb3dBcnErVmUzZ0s0QjNpNTJKa0FQQXB3TWxtdS85b1hoL0lvd01qcllyOVovZWdsZlJmaVVoREE1T2ZWRDllK1BKd1JZR050cVFkcnYvem45Y212QkNGa2IxOS92UDROSW40NCtaVWdpUFdGWHA4QWpBQVA2d05nODF2RU1BSXNiQ3p6eGdSZ0JEallHQUJiM3lTS0VXQmdjNUUzSndBaklINmJBMkQ3MjhReEFxSzN0Y1J2Tm4vSzQ4RFlyVDBFbExSekMrQzlZYkhiWHZDZDd4VDY4VVFYZ2lCMmxuZG5BckFQak5uV0RsQkZBZkRPa0lpdDNnZXlzdnZOb25sblNMd21PK3RmTUFIWUI4YXJZTFdMdmwzOGJlY1hnaUNLRnZaTndhL3hNQ0JPMjQ4QUpCWGZBamdKUkduM0JDRHRDNENUUUlSMlR3RFN2djg0Y3M3am9PaDhMRnovd2oyQXBHOXNBeUl6K1cveHJ4ZmZBc1EySURMRkd3Q1ZCTUEySUNyRkd3Q1YvT2ZSYkFOaXNtY0RvTDE3QUxFTmlNbStEWURLQXRBZkZCQ0p5WWY5djdkM0R5QXBmV1FqR0lPOUcwQ3BaQThnYVg3SHR3MkpRSFpYOXJ0bEU0Q2pRQlQySGdBa0hRcUFBdnF2ZlAwUC9lL2hjMTRhN3JuYjh2VS9OQUdrMFplMkxnVUIzSDQ5OEFFbHg4RGN5MS9mdFhRdE9MMlB2eC82aUlNQjZCc0Y5TmJIWHc5K3lNRmJnTGdMOU5iQithOXFBVkJBUDFWWi8yb0JjQnJzb3dQbnY0VUR4OENGK1FYUEJIc21xN2IrRlNjQXJ3djBUWFpYYmYwclRnQnAvcFl2R09xUnlkdUs2MS9oR0xqRXE4UDlVZmI2NzVhcXR3Q0p3MEJ2Vk5yK0wxUzlCVWpTVjdhQ2ZaQmQxRmovV2dHd0VlaUQ2cmQvU2ZWdUFSSzNnYk5YWi94TE5TZUF1QTJjdVhyalg2b2ZBTGVCYzFaei9Fc05BcEErM0RJRXpsSjIrNkgrSDZxN0I4amQvOUxvajZGTEZWNzdMVkQ5UWRDNmI3LzlnNmRDNTJYeTcyYmI4MllUUUJ3SHpremR6ZjlLZ3oxQTd1dUFMeDQ4RzVOQjAvVnZQZ0hFSzRUbm92SXJmMFVhVHdCSjg3ZWNCOExMYnV1Zi9kWWNNd0VrYWZUKyt5UC9CaHhqOHRCNCtPZU9EVUJLUDVGQUtKT2Zqdm5ITDZtTkFFZ2dsQmFXdjUwQVNDQ0VWcGEvclFBazNmL0lrZUIwc3MrTkh2c1ZhQzBBS2IyamdaUElQaisyOG85ZlVxc0JpRnZCS2JRMCtwZmFEVUNjQzd0MTlLbHZSK3NCU0VydmhrVFF2c21zeGNtLzBrVUFFaEcwckp2Rmw3b0xRSkpHVjhNYnRvWEh5cWF6cDdibi9wb3VBNUFrcFpkWFE5RkJFeFBObnA0NytvZS8wbmtBQyttbHJpUU5KZDJjNkZQMjBWVFNUTktUT2w5NVFKTCtEL3lBc1hFSGFJcXZBQUFBQUVsRlRrU3VRbUNDIiBoZWlnaHQ9IjUxMiIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIvPjwvZz48L2c+PC9tYXNrPjwvZGVmcz48ZyBjbGlwLXBhdGg9InVybCgjOGNjZTk2MWY4ZCkiPjxnIG1hc2s9InVybCgjMjA4NzFhNTIzZSkiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDYuOTk2MDkzLCAwLCAwLCA2Ljk5NjA5MywgODQuMDQ0MTM0LCA4NC4wNDQxNikiPjxpbWFnZSB4PSIwIiB5PSIwIiB3aWR0aD0iNTEyIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQWdBQUFBSUFDQUlBQUFCN0drT3RBQUFBQm1KTFIwUUEvd0QvQVArZ3ZhZVRBQUFnQUVsRVFWUjRuTzNkVzJ4Y3g1a244SzhPKzBocTBtenpab3NjbWJUc1phVElYb1hLWWhQQklUVGFRV1lOQkJyS1dLOHZnRzFJV0FNR0FtTXdOaGJVSUM4R0RQZ2xnTFdBblFmRGdBRUQwc1pleU1rR3NCaHRzTUlZTzR3Z1orak1neGx1UkZqaGptVFJHa29XYjI2R2JFbW5lV29maW1vMSszNnBPblU1LzkrTFpVbzZYYnJWZCtxcnI3NWlCSFdhSEIzeHlHUEVQR29oWXNRWUVSSG5STVJ5UDRqUnh0Y0JvSG1jRTcvelRmR2Z1Ly91ZUVqcm5IaEk0ZER4TVUzanN4VW1xVXJ1elBXZVI5N0czemhHSWZFc3YrMlRUMFRFV25JL21IRis5MmQ2K0kwRmtDcTgrKytMNTc5ZDhYVWlDaWhJc0MwZU1kcUlGRHlra0ZPSXFGQVo1cWxOTG93K3VmRjd3aGlqdkxtZXRXek03NWpaQVV3V2NoSVJncS9ub2dLbmpUVTZFWC9rK0srMGpzOHNtTTdFYTM2Q0VmT1lSMFRFdzQzcEhuTTlnQnRDTGtJQ01ZK0lRaDV5NGlGbHNUaUk2UnlYUCtsekNyTTg4TmsyVFBvQTdnczVaeXpnTnhQTVorVEZQQmpFYTc3TFpYZzQ0NWowQWVJdVB4aHdNUS9FSzBjVWk3bHZjblNraFZvWWVZeDV4RU5HSGlaOUFOZ2s1SnhDWWg3bklhZHduZGJqc0Nad2VSN2N5UE13eG9obCtlMHR0Qlh6UGdCVUVmTGJkQ3ZCdG5EaW5EdWVIWEp6UXJ3dytpUXh4dWxPbnNmTlh5VUFLTVE1QmZ4bWdueEdIakgyeUp1LzBEMGkrWnlhR2d0VFBWNUw5WjhEQUZDQnFDQWk3bVJxeUpFQUlLWitJbHFuZGFSNkFFQytrTittVzdsNXhvMHdZUDFFaWFrZkFLTGpWaGl3ZUxvVU5aMmNlSllDVFAwQUVCMnhVVXcrSTJaMTVhaVZrNmJZNHlVaTRodzFuUUNneDBibDZNWmNaR01Zc0d6cW5Cd2RhV0VKUm94eHdoNHZBSmlBaCt1Y0VTZSt6aTJyR2JVcEFFeVBQaFZTbUtWZ2k3ZE45MWdBQURhNUhkNU1rTytSdCtmNEwzV1BwVloyQklBN09SL0dPUHB4QW9DcFFzNFpFWEZiTWtLbVQ2WjNTL3NKT1I4QXNBQVAxem1SRlljR1BOMERxT1RDc2FkYm1MOU82eDU1bVAwQndBck1hL0hJVzZmMUZ1WmZPUGEwN3VGVVl1Z0tJSmZ6MmJpWkJRREFOcHdURVRjNUkyVGlDbUI2OUNraVJwd3podGtmQUd6RkdESEdpSE1pTmozNmxPN2hsR0RXL0pxcjh2UTRxdnNCd0JVaEQxbG9ZSjJvUVN1QUM2TlB0bEJpbldjOTFvTFpId0RjNFRHUHRhenpiQXNsTG93K3FYczBkNWt5ejA2UFBzV0pFM0ZzOWdLQXEzaTRMakpEaHB3VjBCOEFrUFlCZ0JneEtSMmtPUVdFdEE4QXhJdEo2U0NkY3k3U1BnQVFXeWFrZzdRRmdMdEZVWGp4QjRCNENybjRyNjRZb0dmeW5mNzdwNGx6UW1NZkFJZzVyVnNDVWMrL2Q3WjhQWThaVklFS0FLRFI3ZkNtUjE1SVljUXhJTkpaZUhKMHhDTnZuV2N4K3dNQTVHenh0b1VVZXVSTmpvNUUrYm5SclFBdWpENFpFbCtuTExyNUF3QVV1eDNlYktHRVJ5eXl4a0VSQlFCeGZ5OEtmZ0FBS2hDbFFaSGRNeHhGQUxodzdHa2lUanpFN0E4QVVCa1AxNGw1Uk95Uk4zK2grck9VQjRCY08yejA5UVFBcUFYZnFBNGwxVEZBN1dic2hkRW5pVGhoOWdjQXFObWRDWk9yUGlxc01BQnM1UDE1aU5rZkFLQXVqQkh4a0lncGpRR3FBc0RrNkVpSU5nOEFBSTFpWGdzUkQ0bXJxdzFWRWdBMjZ2MHBpOWtmQUtCaHpHdFpwNnk2OHdIeXN6Tmk5ZzhwUkwwL0FFRHoxSjBUbHI4Q2FHRUp6UDRBQUxLSWM4SXRMQ0g5eVpKWEFOTi8vM1RJUTNSNkFBQ1FLK1RySHZmazlnMlZHUUNtUjU4aWhwSlBBQUFGRlBTT2x2YXFmdUhZMDV5Sm9uOEFBSkROWTBURTJkM1R0UkllS2VVcGs2TWpJYTBUTWZUM0J3QlF4V05FTEtSMVdVVkJjZ0pBQzB1czh3QzVId0FBcFJpamRSN0kyaENXTUdkUGp6NFZzdEJqS1BrSEFJaUNyQTNoWmdPQTZQVEpjTGtqQUVCa1FzNFpOZDh4dEtrVUVGTC9BQUFhU05vTWFDb0FJUFVQQUtDRmxNMkF4aWR2cFA0QkFQUnFjak9nd1FBZ1dqMHpKSDhBQURRS09TZmU4QldTamFhQUdDUGltUDBCQUhUeUdCRnZ1UDlDSXo5dGV2UXB6b2doOXc4QVlBRE9PZU9OdElpb2V3VXdPVG9TVXNqUThnRUF3QXlNVTBoaEF4VkJkUWVBRnBiSVVvRGtEd0NBS1R5V3BVWXFndXFieHk4Y2U1b1R1ajBEQUJnbjVDRWpyNjZqWVhWTTVlTFlGMU41anp3QUFEU21nY201anAvUVFpMDQ5Z1VBWUNiR2lJaFBqejVWeDArcDhjZGRHSDJTRTNua0lmc1BBR0NvT284RjFMd0NFRldmbVAwQkFJeFY1N0dBbW43Y2hkRW5pVEdHdlY4QUFPTnhIaEt2YVJGUTI1ek9HSEZVL2dNQTJJRFh1Z2lvL29QdytnOEFZSmNhRndFMVRPdDQvUWNBc0V0dGk0QXFQd0t2L3dBQU5xcGxFVkJ0WnNmclB3Q0FqV3BZQkZUNmJyeitBd0RZcStvaW9QTGtqdGYvdUdqdEgvUlRuYnBIQVFCU2NWNzVMYi9zOStIT0wrZjVxYzdrZzd0UzMzbHNhKytBbDJ3VFh3em01N0lyeTluMFlyQzhFQ3pQWjc2OEdLU1g5STRUQUJwVTdXQndoZmFoNHM0djVIOGNsTnE3UC9XZHg1SVA3U24rTHIrbnorL3BLL2hpbUZtOWRlMUtMaXBrbHhmV1ptY2lHU2tBTk1GakZJWVZYdlJMZjhmazZFaUNmSFQrY1ZMdnlKSDJvZUVtSDdJeWVmN2EyRWtwNHdFQWhVSWVVcGlsWU9qNFdQRjNsbjdCOXdpM3ZyZ3B0WGQvODdNL0ViVVBEVC93L0t2WU5nQXduY2V5RkhobGtqMmxBd0JqekdmYlZBNEtOR2p0SDd6djhXZGxQUzM1MEo0ZHo3MkNHQUJnT0o5dEszZUZlNGtBY0dIMFNZODg5UDEzei8ySFhzaHQ5a3JoOS9RTnZQUmFhLytneEdjNncwOTE5bzRjNlQ1d1NQZEFJTzRZSTQrOEM2TlBGbjlYeVhVQkl4NFNhMUU5TEloUzc4aVI0dDNkNW5uSnRyNW5YcjV4OWxSNmFrTDZ3KzJWMnJ2L3ZzZWZGZUcyNC9zL1hQN3NrL1RrcDZpbkFtMTQ2YTNnMG9raDNQdm9HRm1wLzVLOFpOdjJKMTRrSXNRQUl2SlRuZDBIUi9KL3Q3MWtXOWZCd3dnRG9CRWpqMU9KUTEyRk1lSEM2SlBFdkhJSkk3Q1JuK29jZU9rMXVjbWZZc0g4M09WM1gxZjZFZWJMZi9FdloyWHkvTUw0R01JQVJJeHpUandzT0JCUXZBSkEvc2MxTzU1N1JmWHNUMFIrVDE5ci8yQnN6d2Y0cWM3dEkwZExIcTBvMEQ0MDNENDBqRHBhaUZxcExOQ21WTS9rNkFnbmp2eVBTN29QSEZLUitpK3A2eS8vSnBvUE1rMXE3LzZCbDE2clpmYlBhUjhheHY0d1JFbGtnU1pIUi9LL3VHa0ZJTXIvdDNnb0FIVkVhLzlnMThIRGtYMWM4cUU5ZnFvelZzbU4ybC84aTNVZFBKeTUvRVZzMTB3UU5ZOWx3OElEQVp0ZTlsSCs3eEkvMWRuM3pNc1JmMmozd1pIcVA4Z1ZEYno0RjRqK0R3amlyUGhBZ0xmNWYxcXcrK3VNN1NOSEkwajlGMmpidFM4bVI4UDhWT2YySjE1czhuZllTN2Ixamh5Uk5TU0F5aGdqanpidDc5NE5BQmRHbjZSU2RVSmdvKzREaDVwNU0yMllsMnhMRGYwZytzK05ucXkxVHZ2UWNHcnZmaW1QQXFnQnp6OFJscjhDWU1URDZJY0Qwa1djK2kvUThmMGY2dnJvS0xYdDJpZnJVZmM5L214TWxrMmczK1phb00xN0FLai9zWitXMUg4K0w5bm0vQ3R0YXU5K2llazFMOW0yZmVTb3JLY0JWTUFLMC81RUpBcEFHVWY3VHdkMEh4eUpQdlZmSVBXZHgvUU9RTFd1NFIvSmZXRHlvVDNPUjAwd2dzYzR1MXNNNnQzNWo1ZmxnYjVCZ1RTSlZKZnVJVkR5b1QwT2Q0aHI3UjlVY2JSaSt4TXZJaEVFRWNqeXdMczc4eE1SRVNQUEoxL2ZrRUNhYkhwUjl4Q0lpRkw3bk4wS1Z2ZEwyL0hjSzRxZURKRGprODhLQW9CSEhqWUFRS0wyb1dFbjMyZjlWS2U2dG5xaW5ZYWlod01Jakx4Tkt3QnNBTGdrV0Y3UVBZUU5UdGFEcXY1RkJkK1k4c2NIenNyYkJ2QklkSURBQm9Bcmd1VjUzVVBZNEdROWFQdWozMVA2L0ZnMTBnQmRzbnlqSjRSSFJJelFBUUxrYzY4ZVZOSDJiMDR3UDZmdTRRQTVQdHZHaU5IR0NvQjVqT01Nc0NNeVgxN1VQWVM3cEpkTDZxVzYzV2wyWlZucDh3RUV4cm5IUlBwSEhBdkRCb0FyZ3ZSU21GblZQWW9OTHUxcStxbE8xZDAxTWxmK3BQVDVBQnZ1WFBydVRZNk9oR2dCNUpaYjE2N29Ic0pkemx3U0VNR2V0am43TitDOGtQams2SWpua1pmbHQzVVBCbVF5NmtWU1hCS2dleFFTcU43K0phS3NNUlZjNEx3c3YrMlI1K0VJbUhzeWw3L1FQWVJOM0xna29LVXRwZm9qVUFNS2tSSEh3VHlQUE53QTdCalRMcGx5NDVJQTFSMld3c3dxYWtBaE9xekZJODhqWWlnQmNrL20wclR1SWR6bHdDVUJFUVN3OWRXMDZvOEF5R0djRXpGVS83akpxRzBBc3Y5UW1IOXZ0K3FQdUhuMVgxUi9CRUErUnVRUlF3Mm9nMHpiQnJEOVVGaWlRM2tBTUtlSEI4U0N4NGlSaHhwUUo2M056cGh6R2tCdzdGQ1lkS2dCaFlpRnhGRUQ2cXpWaTUvckhzSW1WaDhLOHp0NlZIK0VVVWU0SVE2eS9EWnFRSjIxWmxnV2lHdytGT1pIa0FKQ0NSQkV5eWNmTmFET012Q04wdDVEWWFydldVTWJPTkNBdGVBU0dHY0Y2U1VEcHhWTEQ0VWwyanVVUGg5dDRFQUw5QUYxMmNvZmY2OTdDSVVzdlNsTTlURmdReTd5aEZoaG5HTUY0TEwwNUtlbTFRS1JuVGVGcVQ0R2JPQ0dEY1FCQW9ETGd2VFNqYk9uZEkraWtIV0h3aUpZc3FBTkhHaVIwRDBBVUNzOU5aSDZ6bU9xRzluWHhVdTJkUjg0dEhEdWpPNkIxQ3FDWThDMnQ0SHpVNTNKQjNjUlVYWjVRUnlhcS9xTjlOU0UxaUVERVZFQ3g0Q2RkMzNzeE02Lys2bnVVV3pTL3VqM0xBb0FxbzhCMjk0R3JyVi9zTytabCt2Tmt2a2RQUmI5SFhDVHVCVU0zQmFrbHhiSFQrc2V4U1orVDUvVm5TSGtzcm9OWFBlQlF6dU9IbXRnajZUcjRHRWJ5d0VjZ3dBUUN3dm56cGhXRXByNnptTzZoMUFyMWNlQUxXMEQ1NmM2ZTBlT2RCMDgzUEFUZGp6M2lzVHhRQU1RQU9MaTZ6TS8xejJFVFpJUDdiR2xNNFRxWThBMnRvSHpVNTA3bm51bGZXaTRxWWYwOUhVZk9DUnJTTkFBQklDNFdKdWRXWms4cjNzVW02VDIyVmNQcW9KMWJlQlNlL2NQdlBTYTM5UFgvS082RGg2MjVUM0FTUWdBTWJJd1BtYlVzUUJiRG9XcDdnTmhZTk9PQ3JvUEhOcit4SXNTRDBiY2YrZ0ZXWStDZWlFQXhJaUJ4d0tzNkF5aHVnK0VSU1ZBRHp6L2FqTkovNUtRQ05JSUFTQmUwbE1UUnQwV2FjVjF3VXI3UUppMk9WL0JBOCsvcXVoQUNSSkJ1aUFBeE03MXNSTzZoM0NYRmRjRksrMERZVXNidU42UkkwcVBFeUlScEFVQ1FPeVlkaXpBOE00UXFoY29WclNCNngwNTBtVEJUMVZJQkdtQkFCQkhSaDBMc1AyNjRDYVozd2F1KzhBaDFiTy9nRVJROUJBQVlzcW9Zd0VtWHhlc3VoR1E0VzNndWc4Y2tyN3JXd0VTUVJGREFJZ3BvNDRGbUh4ZHNPcEdRQ2EzZ1V2dDNSL2w3RTlFZms5Zjc4aVJLRDh4NWhBQTRzdW9Zd0gyWGhmY0RKUGJ3S1gyN3QvK3hJdlJmMjc3MExDeGJ3UHVRUUNJcnlDOXRQelpKN3BIc2NIWTY0S1ZOZ0s2ZGUyS3VvYzNvN1YvVU12c0x5QVJGQmtFZ0ZnemFqZll6RU5oU2hzQm1Wa0MxTm8vdU9Qb01ZMERRQ0lvTWdnQWNiZDQvamU2aDdEQmxzNFFFaGxZQWlTYSsrc2VCUkpCRVVFQWlEdWp6Z1liZUNoTWFTTWcwMHFBL0ZSbkExZTdLQkxQYmFHSUlRQ0FRV2VERFR3VXByUVIwTnJzakxxSDE4dFBkUTY4OUpvaHN6OFJaYTc4U2ZjUTNJY0FBQlNrbHd3cENSWFhCZXNleFNicUdnR1pzL3RDZC9yN216UDdFMUY2OGxQZFEzQWZBZ0FRbVZRUzJ2N285M1FQWVJOMWM2STVGNEdKMlY5S2YzOVpndms1WXd0a1hZSUFBRVFtZFlvMjZycGdwWnZTNXV3QWJ4ODVhdFRzVHlaRlI3Y2hBTUNHOU5TRUlVa0pjNjRMVnRvSHdwQWRZSFZObnB1Ui9oejVueWdnQU1CZGhqUUlzdWk2NEdhWXNBT3N1c2x6WThMTXFnbS9PWEdBQUFCM21kTWd5SkN6b09vYUFabXcySXFzeldlOWpEMGc3UjRFQU5oa1lYeE05eENJak5rSlVOY0hRbnVPTy9wR2I3VkwvK0YzdW9jUUZ3Z0FzSWs1MThXWTNDTzZlWUhXRFFDOXJYNnF5bng1VWZjUTRnSUJRQUxIR2hnc25EdGpRa21vQ1lzQWRZMkFNdnBLZ0F4cDlsQU9Da0NqbE5BOUFPdnQvUEhyb29RdXpLeXVyNmFKS0x1eUxKcDhpYmU4WUhtZWlMTExDOEUzQzdiOHpiNXg5cFFKYjRoZHd6OUtUMDFvSElDNlBoQzZyZ0V3cXRsRFNTdC8vTDN1SWNRSUFrQlRIbmorMVZ3QnRaZHNFLyt1S3BSVWg1blYxWXVmcjEzK1F1KzhWbFY2YWlMMW5jZTAxNGVJUllEaHYxY04wSFVOZ0lISGZZdHBYQnZGRUZKQWpXdWdoTTVMdHJVUERXOS80c1dkUDM3ZDhNVFI0bTkvclhzSVJMcDNBaFExQXRKVjVXTGdnYThDS0FDTkdBSkFnM3BIampSVFF1ZjM5QTI4OUpyMkhIY0ZocFNFNnQwSlVOUUlTRXViTXpNUGZCVll2Zmk1N2lIRUN3SkFJNlFVVUh2SnR1MVB2R2hhNzdOOGhqUUl1dS94WjNWOXRLSnNpZGdXaXBLWkI3NkttZE1lSXlZUUFPb210NEM2NitEaEI1NS8xY3gwa0NGM1JuckpOaTJMQUhWL0tCR1hPUnA3NEtzWUNrQWpoZ0JRSHhVM1pTY2YyalB3MG10bU5qOHc1TTVJTFlzQVJZMkFJdDRCYnUwZk5QYkFWNEhNcFdsYnl1U2NnUUJRQjNYSFo3eGsyNDZqeDh4TUI1blFJTWpBZXdJYUZ1VU9zQ2o2ak96am1vUWJZS0tIQUZDckNJN1BtSmtPV3B1ZE1lSE95T2d2QzFQVUNDakthYzc4b3MrY3pLWHBoWE5uZEk4aWRoQUFhaExaOFpua1EzdDJQUGVLYWVrZ0UrNk1qSDRSb0tnUlVHUTd3TDBqUnd3ditzd0o1dWUrK3VBdDNhT0lJd1NBNmlJK1B1UDM5TzA0ZXN5b0NsRkRHZ1FaZUdOd0E2TFo1N1JvNDVlSXJuNzR0dTRoeEJRQ1FIV3BvUjlFL3lhMS9Za1hlMGVPUlB5aEZhUW5QOVZlRWhyeElrQkZJNkJvZG9BdDJ2Z2xvdXNmdjQrOVgxMFFBS3JUZFRhOWZXalluQVBEaHR3WjJmSDlIMGIyRzZLaUVWQUVPOEIyYmZ3dWpwOTJyOVdIUlJBQXF0UFZ0NHNNT3pCc3dwMlJYckl0TmZTRGFENUxSUjhJMFNWUUtXejhRdTBRQUtyVHV6NDE2c0N3Q1NXaGtTMENWT1Q5Vko5MHRXdmoxNFRpZ3BoREFLaUo5amRmUXlwRVRXZ1FGTTBpUU5GdnRkS0w0TzNhK1AzNnpNK1IrdGNPQWFBbTJaVmwzVU13NWNDd0NRMkN1ZzRlVmgwTEZSMERWdGZxMHJxTlgzVDlOQUVDUUUwTU9hTm93b0ZoUXhvRWRSOGNVZnA4RmFmQTFLMGo3ZHI0WFprOGo0MWZReUFBMUNUNjlvMFZpSFNReGdHWTBDQ29mV2hZZTBLc1h1b3VncmRvNHplWW43czJkbEwzS0dBREFrQk5sS1p1RzVCOGFJL2VDdEhGODcvUjlkRTVTaGNCclR0M1MzK21vaDFnaXpaK3c4d3F6bndaQlFHZ0pob3JRY3ZSV3lHYW5wclEzaURJdWtXQWl0Y0l1elorNXo1NkJ4dS9Sa0VBcUVtUVh0Sys4MWxNVklqcU9qQnN3cDJSNmhZQktrNkJTZC8ydEd2amQzSDhORForVFlNQVVDdGQ5N2hXMVQ0MHJLVkMxSVNTVUhXTGdLMjlBM0lmS0gzWHhMcU5YNXo1TWhBQ1FLMGlPTVBaTUYwVm9pYVVoQ3BhQkVqZlU1VytBNHlOWDJnZUFrQ3RBc1AyZ1F0b3FSQTFvU1MwZldoWWV1UlRzYXFRKy9jSEc3OGdCUUpBclhTMWhLdEw5QWVHVFNnSlRlMlRmREJZeFNrd2lYOS83TnI0dlhIMkZEWitqWVVBVUNzREM0RktpdjVLR2UwbG9kSVhBVXBPZ1VuNisyUGR4aS9PZkprTUFhQldRWHBKKzU1bmpmeWV2cjVuWG82c1F0U0VrdEN1di93YmlVK1RmaGVZckdzQTdOcjRSYk5QOHlFQTFPSGEyRW50TTEyTklxNFExVjRTbW54b2ovWXVTUlhJS2lHemErTVh6VDdOaHdCUW4rdGpKN1RYdmRRdXNpdGxUQ2dKbGJnSVNBNThTOWFqQkNtOXBDemErQ1UwKzdRRUFrQjlndlRTM0VmdjZCNUZIY1NCNFFqZWpoZkd4MVIvUkdVbUx3S2E3eVZsMThZdm1uM2FBZ0dnYm11ek05Yy9mbC8zS09vUVRZV29DWHNrc2hZQjBrK0JOWGtSdkYwYnYyajJhUkVFZ0Vha3B5YTBUM2IxaXFCQ1ZQdTVNRm1MQUxsNTlpWjNnTzNhK01XWkw3c2dBRFRvMnRoSjdmWHY5VkpkSVdyQ3ViRDdENzNRNUJPa3g4Z21kNEF0MnZqRm1TL3JJQUEwN3VxSGIxdTNEdkI3K25ZY1BhYXVRbFQ3dVRDL3A2L0pYNTMwVTJETjdBRGJ0ZkdMTTEvV1FRQm9YSkJldWpaMjh2ckg3MXRVRnlRb3JSRFZmaTZzYS9oSHpmeDA2YWZBR3Q0QnRtdmpGMmUrYklRQTBLejAxTVNWOTk2dzVYeEFqcWdRVlpFT1NrOU5XTDBJa0g0S3JMRWRZTHMyZm5IbXkxSUlBQklFNmFXdlBuakx1cVdBdW5UUTEyZCtMdjJaZFdsbUVlQkxYd0hVbnhXeGErTTN6S3ppekplbEVBQ2tzWFFwc1AySkY2VlhCNjNOenVqOWZXaCtKMENXeGhaREZtMzhFdTc1c2hrQ2dFeGlLYkE0ZmxyM1FPcWpvanBJK3l0aHc0dUFiVHNlbGppTUJxNEJzR3ZqRi9kOFdRMEJRTDZGYzJjdS8rd25kaFdKaW5TUXhNTmkycytGTmJ3SWFHbExTUnhHdlJmQnAvYnV0MmpqRi9kODJRNEJRSWtndlhUNTNkZXRXd3JJUFN5bS9WeFlZNHNBdWJtWHVpNkM5MU9kOXozK3JNUlBWd3Budmh5QUFLRFF3cmt6VjArOGFkZFNRT0x0a3RyUGhUV3dDSkIrQ3F5dTlJaGRxWCtjK1hJQUFvQmFhN016bDk5OTNhN3pZaEo3QnkyY082TjNFVkR2QzdYY1UyQjF4WDY3VXYvWFAzNGZHNzhPUUFDSWdvM254Ym9PSHBiU1N2ckcyVk5TeHRNWUw5bFcxeUpBN2ltdzJuZUFyVXY5NDh5WEd4QUFJaUtLUk8xS0I0bFcwazNXVTJvL0Y2WXhxMTdqUmZCSS9ZTXVDQURSRVR2RDFxV0RtdThib2ZkY1dGMkxBTG5IZ0d0c0FtRlI2aC90M2h5REFCQzFhMk1ucjU1NDA2NTBVSk0zaTJrL0YxYjcrN1hjWThDMU5JR3dLL1dQZG0rT1FRRFFZRzEyeHJvenczNVAzODYvKzJuRDZTQzlsd1o3eVRiVjkrRVVxK1VhQUtUK1FTOEVBRDBzUFRQY2NEcEkrNlhCSGQvL1lTMC9MSkhxa3ZXSlZhOEJRT29mdEVNQTBNbkdnd0lOdHhIVmV5NnN4a1ZBb3IxRDFpZFd2UVlBcVgvUURnRkFNeHNQQ2pUV1JsVDd1YkFhRndHeVZONEJSdW9mVElBQVlBUWJEd28wMEVaVTc3bXdXaFlCRWhzQlZkZ0JSdW9mRElFQVlBb2JEd28wMEVaVTc3bXdxb3NBaVRtWmNxL01TUDJET1JBQURHTGpRWUY2MjRqcVBSZFdlUkVnc1JGUWhWOGpVdjlnRGdRQTQ5aDRVS0N1TnFKNno0VkZzeE5RcmdrRVV2OWdGQVFBRTlsNFVLRDJOcUo2ejRWVk9CZ3NzUk5jeVdzQWtQb0gweUFBR01yR2U0WnJieU9xOTF4WTY4N2RKYjh1c1JOYzhUVUFTUDJEZ1JBQWpHYmpQY08xdEJIVmV5NnNiZGMrMVI5UmNBMkFuK29jZU9rMVcxTC9oRjcvc1lFQVlEb2Jsd0sxdEJGZEdCK0xiRHdGdkdSYnlWU1ZyRTV3QlR2QTFzMys2UFVmSHdnQWRyQnVLVkMxaldpUVh0TFlDU05aSmdza1JmNE9zSFd6UDFML3NZSUFZQTBibHdLVjI0aHFQQmVXSFBoVzhSY2x0Z0p0N1I5czdSOU03ZDF2MSt5UDFIL2N0UHp0OEtPNnh3QjF1UFgxMVQvLzhiT3Q5Ky93TysvVFBaYWF0TFMyZCt6LzYrelNqVnRmWHkzKzN2VS9MOS96N2U5R1B5cS84NzZWejgrSHQyN21mN0hqZTM4bDVYZDFhKzlBYXQ5d2F0L3dQZC8rTHZPM05QL0F5Rno3eGJ0QmVsSDNLQ0E2V0FIWXg4YWxRTGwwa01aellja0hkMm41WEdOZC8vajl1cTZ3QndjZ0FOakt1bDJCY3VrZ1hlZkNpb3RCSmJZQ3RRNVMvL0dFQUdBeDY1WUNvanFvb0FKSFYwbG9jVEdveEU1d2Rnbm01elFXWllGR0NBRFdzMnNwSUE2TEZWU0lsanczRzhGSUNrS1JSYnUxY24xOTV1ZW8rNHduQkFBWFdMY1V5TjhTOEZPZFhjTS8waktNL0dKUWlaM2c3TEk0ZmhxcC85aENGWkE3UklGUXk3YmsxdDRCM1dPcGJtdnZRR3YvSUJIL2kyZGVUdHdyN1NMR3VpVHVTUzMvOHorS2I3ZHNUWGJzLzJzdHc5QW9jMm42K3EvL3UrNVJnRFlKM1FNQW1ZTDAwcld4azJ1WHY3anY4V2ZOVDJna0g5cVRmR2lQeGdINFBYMStxbE5rUHlSMmdyTkZtRm05UG5aQzl5aEFKNlNBSENSMkJleTZWMENYMU5BUGRBOUJtN21QM2tIcVArWVFBTndrbGdJVzdRcm8wdjdvOTNRUFFRK2svb0d3QitBMnUzWUZ0R2hwYldlYysvZDJiZTBkVU5vZ3lDaEkvWVBBcHYvK2FkMWpBT1ZhK3dmN25ublovRjBCaU1ibG4vMEV5UjhncElCaVFsd3hobDBCSUtMRjhkT1kvVUZBQUlnTHNTdGczVzNESUZlWVdWMDRkMGIzS01BVUNBRHhzalk3OC8vKzIzL0ZVaUMyYnB3OXBYc0lab250QVVBQjV3RGk2TnJZeWZUbm45NS82QVcvcDAvM1dDQTZtVXZUTWUvNDF0by9tT2pvOWp0NmtnUGZTclIzaUwvL21VdlRpNy85ZFR4cm9yQUpIR3U5STBmYWg0WjFqd0lpY3ZYRW03R2E1dnhVWi9MQlhYNUhqOS9SdlczSHc1VmZkNEw1dWNYenY0bGJnRVFBaUx2Vy9rRXNCZUpnWmZLODI3ZDkrYWxPLzk3dTVNN2R0VXozNWNRdERDQUFBQkdXQXE0TE02dFgzbnZEcGVLZi9PaytrZXJhMmpzZ3NjbzV6S3d1Zi9aSmV2SlRsMzdIU2tJQWdBMVlDamhzY2Z5MDdjVS9JbjNmdW5PMzlPbStuRGlFQVFRQTJLVDd3S0d1ZzRkMWp3SmtDdWJuTHIvN3V1NVIxQ2VYdnMvZnJkVmxaZkw4d3ZpWWsyRUFWVUN3eWNLNU01bkxYMkFwNEJKZGwyN1dUdVJ6SW43QnI1M0lqanE1ZzRJQUFJWFdabWN1di9zNmRnWGNrTGswYldEbFQvNEx2bW5UZlVuYmRqeXNld2hLSUFCQWFUZ3I0QVlUT3Y1THFjL1JLLy9xQ0pjZ0FFQlpXQXJZVG1QYm45YitRVEhqdCszYVovNExmaTJTRCs0S25Dc1BSUUNBS3NSU0FNMUVyUk54MjU5Y2xZNmw3L2hWdGU3YzdkNzVBQVFBcUU0MEUrMCtPSUtsZ0VWVXQvMnhMby9mSkNlM0FSQUFvQ1oyM1RZTXdmeWM5TmZWWENvL0pqTitnZXpLc3U0aHlJY0FBSFZJVDAxa3ZyeUlwWUQ1WkpWK09wL1lxVjM2RDcvVFBRVDVFQUNnUGxnS21HOWw4bnpEcFo4aXNTUHE4Wk1QN1pFN01IdUZtVlgzTmdBSUFRQWFJNVlDMjBlT1lvNHdUWmhaWFJnZnEvM0h4enl4VTZQbHp6N1JQUVFsRUFDZ1FVRjY2YXNQM2tydDNZK2xnRkdXUC91a2F1bG5ya1lUaVowYXBTYy8xVDBFSlJBQW9DbFlDcGdtV0o0di9tSXVzWU1adndHWlM5UHVIUUVURUFDZ1dWZ0tHT1creDUvTkxpOGtPcnFKS0Q0MW1rb3QvdmJYdW9lZ0NnSUF5SUdsZ0NHOFpOdU9vOGQwajhJZFlXYlZ3R1pLc3VCU2VKQkdMQVVXeDAvckhnaUFOSzV1L3dvSUFDRFp3cmt6bDMvMms4eWxhZDBEQVpEQTFlMWZBUUVBNU1OU0FOeXdNbm5lMWUxZkFRRUFWQkZMZ1dCK1R2ZEFBQnFVL3R6bDEzOUNBQUNsZ3ZUUzVYZGZ4MUlBckJObVZwczVVRzBMVkFHQmNyaG1FcXdRWmxadlhidVN1Zktuek9Vdm5KLzZoVmhjQ3AvYXU3OXIrRWZabGVWc2VqRllYaUNpWUhrK0s3N3h6WUxiT1Q2ajRNWjVNRTBNSi8xOGpxOEEvRlJucmpLOXd1dG5tRmxkWDAyTGRxL1o5Q0lSNWVJRUVXV1hGNEp2Rm9nSW9hSkpXQXFBQ2NMTTZ1ckZ6OWN1ZjVINThtTE0vMUc3dkFKUWNUWTF6S3dTVVg2MEtBZ1ZSSVJvVVJXdW1ZU0lZZEl2eWMwQWtQL2lyNUZZV0JDUnlENFJGaFo1V3ZzSHNSUUFwVERwVitWZ0FMQzBLVTNKTkpUYkN3cy8xWW03WlVBdVRQcDFjUzBBcFBidTMvN0VpN3BIb1ZiK3dvTEtiRnFRUFFFakRuOWtvRlF3UDNmejZyOWcwbStBYTV2QWZrZVA3aUVvNXlYYnhQcW05dnhKY1RLS1N1V2p0UHpqU1U5TlpKY1grcDU1MmJwRkcraVNLOTBKbHVjeDZUZkR2UURRclhzSUpxbzladVF5VVdKL081cndzRFk3YytXOU4zWTg5d3EyQktBa3pQaUt1QllBdHUxNFdQY1E3Q1pDUmJtSnVEZzh5TnJLRHRKTFZ6OThlK2ZmL2JTWmg0QXpNT05IdzdVQTBOS1cwajBFbDFVSUR3V3hnZTZjdHF0OTZaQWErdms1M2JFQUFDQUFTVVJCVklIazRZSTlNT05yNFZRQThGT2R5Q1ByVXUvU29makh0RC82UGNWakJJTmd4amVCVXdFZ1NDOHRqcDlHc3dFRFZRNFBFQWVZOFEza1ZBQWdvb1Z6WjVJRDM5SitCQXdBTU9PYno3VUFRRVRYeDA0TXZQUWFja0VBMGN0Y21zNm1GMUdTYndzSEEwQ1FYcHI3NkIzY2l3MFFnWmgzMDdTZGd3R0FpTlptWjdBWkFLQUlKbjFudUJrQUNKc0JBRktoM1lLVG5BMEFoTTBBZ09aZzBuZWV5d0VBbXdFQTljcGNtaGE1SFZ5V0Z3Y3VCd0RDWmdCQU5Vam94NW5qQVlDd0dRQlFKTmMwUDd1OGdFay96dHdQQUVSMGZlekU5cEdqVzNzSHNCOEFzWVdFUGhSejdVS1l5bHI3QnhNZDNhMDdkMi9iOFREYUVvRHpNT2xEWmZFS0FBVmErd2VUTzNlTEt3UVNxUzRpU3JSM0VGRkxXd3ByQmJBUkV2cFFsMWlrZ01wWm01MnAvSS9FVDNVU2tYOXZOeEVsN2x3MUl5NGR5OTA4azRzY29oTTFJZ2RFREpNK05DeldBYUFxc1dyZVdEdlg4MCtyOXNoQmVjc09RdnlBMmlDM0ExSWdBQ2pSY09USXlROGhWQlJGcUZvZ0ljUVNSNFdaMVN2dnZZRkpINlJBQUREVXBoQkNEVVlSUWNTU2pXL2ZlL2ZPNU1UbSs1TnpvZVhPLzI3NjNseVlvVHVSaGhCc2RQQ1NiZDBIUjlZdWYwSHE3Mm9HNThWNkV4aWtLdzQySXN6a3A3OEtkazBFaEpCbVZMaVBrNXErcmhrY2hoVUF5SlEvMTlTVkFYdmcrVmR4V0s5aFZTOWNLM2tsSnlJRVlBVUFSdkJUblR2LzdxZTZSeEZyWVdhVmlFU2NJS0pzZWxINlIrVEhIaUpDL2tvN3JBQUFnT2hPRms3TDFjM0IvQndSaVFVS0VlVm5zWWdJeXhSMUVBREFDTWtIZCtrZUFtZ2pRazdWd0pOTFpCRlIvbTRISVozVktBUUFNRUxxTzQvcEhnS1lydXBXaHlEaUJHMWVVaUQxVkJJQ0FPaVgycnNmTzhBZ2k0Z1RWSDVKRVdaV2x6LzdaT0hjbVdqSFpTSUVBTkNwdFgrdzZ5Ly9Cck0vUk1sTHRuVWRQSndjK05iMXNSTXhYd3FnQ2dqMDhGT2QzUWRIMm9lR2RROEVZbTF4L0hTY2x3SllBWUFHM1FjT2RYei9oemo4QmRwMUhUemMvdWozcm43NGRqeVhBbGdCUUtSU2UvZmY5L2l6bVByQk5QRmNDbUFGQUJGcDdSKzgvOUFMdUljSHpDU1dBbCtmK1htc1dtcTMvTzN3bzdySEFJN3pVNTEvOGRTUHUvN0RFeTJ0N2JySEFsQldTMnY3UGJ2M2VZbEU1c3FmZEk4bElsZ0JnRnE5STBldzB3dTJFQVZDOFZrS1lBOEFWTUZPTDlncnpLek9mZlNPOHpFQUt3Q1FMN1YzZjlmd2o1RHVseTUzeGhYWFZxdm1KZHZ1UC9UQzVYZGYxejBRdFJBQVFDWWM3RkxxeHRsVDZha0o4VzAvMVpsOGNGZnJ6dDF0dS9ZaEdLamc5L1Qxamh5NU5uWlM5MEFVUWdBQU9YQ3dLd0w1dDdZRjZhVmdhaUk5TlVGMEVzRkFrZmFoNGJYTFgrU0NybnV3QndBU0lOMGZtZXNmdjE5NVBrSXdrTXZ0UzVnUkFLQXBPTmdWdmFveElBZkJRSXBnZnM3VnpRQUVBR2dRRG5acDFNQ3hWUVNEWnF4TW5uZHlNd0FCQU9ybXB6cTNqeHpGVHE5ZXpiUXV5QVdEYlRzZVJnaXZVZTBMTDR0Z0V4anFnSjFlYzNRZFBFeEVqY1dBdkExa0JJTmEzZmY0czVrdkx6cTJHWUFWQU5RS083MEdrdHZDekU5MSt2ZDJKM2Z1VGc1OEN5dThZdTV0Qm1BRkFOV1pkckJyWmZMOHd2all3RXV2SVJvMXN3NG9GcVNYZ3ZSUzd2aHJhLytnQ0FaYmV3ZndXMDFFZmsrZm4rcDBhUkdBQUFDVm1IYXdLNWlmeXpWcFdWOU5ZMVlpMlRFZzM5cnNUSDR3U0hSMHgzd1BPY3lzdWpUN0V3SUFsR05ndXI4ZzNkSFNsdEk0R0tOMEhUenNkM1FyTFZOWm01MmgyWm1DYzJkeDJ6YTRkZTJLN2lGSWhnQUFoZnhVWjJyb0IrSzkwaENaUzlPTHYvMTFmbWV1M3BFanNYMFBMVW1FNm1oS0ZXTzdoNXhOTCtvZWdtUUlBTENKZ1FlN2l2YzV1dzhjTW1wcFlvZ29ZMEJPZmpBZzE3Y04xaTUvb1hzSWtpRUF3QVlERDNabExrMWZIenRSa0hWTjdkMXYxT3JFS0ZwaVFMNkNiUVBIZ2tGMmVVSDNFQ1JEQUFEamRucUpLTXlzNW5lK3pHbnRIOXoreEl0YWhtUUw3VEVnSno4WXVIRU9PZmdHQVFBY1l1Qk9MNVY1OFNjaVA5WFo5OHpMV29aa0YzTmlRRTdKM3FWMmJSdGtMazA3VmdKRU9BZ1dad1llN0NyMzRrOUVmcXB6eDNPdldEUmZhSmU1TlAzVkIyL3BIa1VWVmdTRDRob0VaeUFBeEpHQk83MTA1M2hYdVplc0I1NS8xYWdrbFJXc2lBSDVUTnMyeUQ5MzRpUUVnSGd4Y0tlWEtyNzRDN2hadm1IV3hZQWN2Y0VnbUo5YlBQOGI5N3EvRlVBQWlBc3owLzFVN2NXZmlMb1BIRUxaVHpPQytibXJINzV0ZGY0NnluUElNWm42QlFRQTl4azc5ZGV5dms3dDNZK3luK1k1RUFOeTFHMGJ4R3JxRnhBQUhHZmdUcTlReXcwYnJmMkRPNDRlay83Um1VdlQ2VC84am9oaUZWckN6T3JjUis4NGxzNFd3Y0R2NkdteWZXa01wMzRCWmFET01xMkZaMDZORzJ1S2lqNkQrVG1SRTIvdEg1VCtjSk41eWJhK1oxNTJMQWFJNnRMYy96YXdiUkRicVY5QUFIQ1FnUWU3Y21yc1h5K0tQbFVzWEw0KzgzUHhqZVRPM2RJZmJqZ3YyYmJqNkRFbmI3WVNpczhoK3gzZDViWU5xcFlleEFFQ2dGT01UZmRUbldubzdTTkhWYXhkRnNkUDV5YUk1TUMzcEQvZkNpTHg1ZnpFbHhjTUNvK2VZZXJQUVFCd2g3SHAvakN6dXZ6Wko3VTNyTzhkT2FKaStaSzVOSjAvQmpOWFNOSFkvc1NMZmtlUGlpc0V6RlRRdnRTTnpYQXBFQUJjWU9iQkxxRmNYNGR5RkhYNkRET3IxOGRPNVA0M2Joc0F4U0s0UXNCTW1QM3pJUURZemN5RFhVSURDMjExblQ3blBub24vMTkrYXQ4UFZIeUtYZHFIaGhPcExrdVBpWUVVQ0FDMjhsT2QyMGVPR3B2SHFQZkZuNGo4Vk9kOWp6K3JZakQ1cVg5aDI0NkhWWHlRZFpJUDdYbmcrVmZyL1pNQ1p5QUEyTWZrblY1cW9yaENVZGxQTUQ5WGtPejJVNTFtcnBtMFNENjBaOGR6cnpoelRBenFnZ0JnR1dOM2VvV3FmUjNLNlIwNW9tSlNEak9yVno5OHUrQ0x5UWQzU2Y4Z3EvazlmUU12dlhibHZUY1FBK0lHQWNBYXhoN3NFcG81YUpyYXUxL1JndWJHMlZQRmsxcHIvRTRBVk9VbDJ3WmVlczJ4WTJKUUZRS0FCY3h2aFY5TFg0ZHkxRjN5dFRKNXZtUW1Tc29HUURBL1ovS2ZTQVBFVVdFVXlNY0tBb0RwRE8rRjJYekQ5UHNQdlNCeFBEbkIvRnk1bU5UU2xtcm15V0ovMjcrM1cwV2ZJcjI4WkZ0TWpvbUJnQUJnTHNQcmZLam12ZzRWUFBEOHE0cmVvM010SHdyNHFjNG1kMUJFelV5UVhscVpQRy9zVm53ejRuWk1MTTRRQUF4bDh0a3VrblJUVXZlQlE0ckMyL1dQM3k4M052L2U3aVlmbnR0VVdCZ2ZpL0tLYzlHMmpJZ2kyQXFLN1RHeHVFRUFNRTRjWHZ4SmRLeFRrOXJLWEpxdWtNRklkRFFWQU1MTWF1N2JRWHJweHRsVFVmYVVGcit1ekpjWEkvZ2JZdUROOGlDZHAzc0FzRWxxNy82QmwxNHpkdmJQWEpxKy9MT2ZORC83SzJyMVRFVXRING8xV1FLMHZwck8vOS8wMUVRd1A5Zk1BeHNRcEplKyt1Q3RsY256cWorb2ZXajRnZWRmOVZPZHFqOElkRUVBTUlXZjZ1d2RPYkw5aVJmTlRQdUVtZFhGOGROZmZmQ1dsRkx4N1NOSEZmMHlDMW8rRkV1a3VwcDVmblpsdWVBcjVUWWJwR3RwUytXM01MbzJkbkp4L0xUcUR4WEh4QkFEWElVQVlJVFcvc0VkejcxaTdJNWk1dEwwbGZmZWtMVXJxQzcxWDl6eW9WaWl2YU9aajhpbUZ3dStzalk3RThITE9CRjV5YmFDaXFtRmMyZXVmL3grZmxaS0JiK25EekhBVlFnQSt2V09ITmx4OUppWlJlVmhadlg2eCsvTGV2RW54YW4vbXE2YWFlNzNPVmhlS1A3aXd2aVk2bGxZOEh2NnVnOGN5djlLZW1waTdxTjNJb2dCQXkrOWhoYXE3a0VBMEttMWYzRG5qMTgzL01WZllrbTR4dFIvYmdBcVBqMUlMeTEvOW9tS0p4ZnJPbmk0WUNKZW01MjU4dDRicXJjaXhERXh4QURISUFCbzAzM2dVSHhlL0FWMXFmK1NMUitLTmQ4RktGaWVML24xaFhObkl0c05MajQ2RjZTWExyLzd1dXBNbExoUk1yVjN2OUpQZ1NpMS9PM3dvN3JIRUR0K3FuUGd2L3prbmtmK3ZlNkJsTFl5ZWY3YXI5N0x5TzRKMHp0eXBPM2IvMDd1TTRXVnlmTUw1LzVYTFQveW50MzdtcndLK0p1SmZ3aUt0Z0dFOEZibW5tOS90NW1IMTZpbHRYM0x2VjEvdmpoWjhQVS9YNXhrbkt1KzYvaWViMytYY1o2NThpZWxud0xSd0RtQXFKbDh3a3ZLOGE2UzFMVjdxOUR5b1pqZjNDRUFJZ3ErS2JFSElLU25KbExmZVN5YUV0NzJvZUgwNTU4Vy8wa3RuRHNUTE0rclBwb2dkbkZ3Vk5nQlNBRkZ4MDkxUHZEOHE4WVdlcTVNbnIvODd1c3FabjkxTjcyRW1kVzZxakNickFHdHFwWjlDRm5LN2Fha3B5YXVubmhUOWJadzE4SER2U05IbEg0RVJBQUJJQ0ltbi9BSzV1ZXVubmhUM1psUFJUZTlFTkdOczZmcWlsaGJld2VhL01US093MUJlaW1DMm56QlM3YVZtNEtqMlJZV3g4U1VmZ1NvaGdDZ25PRW52QmJIVHl0NjhSY1UzZlJDMVZvK0ZHdStEVnd0VStyQ3VUUFJsSVFTVWZ2UWNMbXluQ0M5ZFBYRHR6T1hwcFVPUU53b2lTTUM5a0lBVUV1OCtKdFo2Q2xlL0pWbWN0V2wvbXVzKzh6WGZCdTRHdDA0ZXlxYUR5S2l2bWRlTGpmL1J0TXhBa2VGcllZQW9GQ2NYL3hKNVUwdlZFUExoMkpOdG9HalVuMGdTa3BQVGFoKzljN3hrbTNkQjBjcS9JQnJZeWV2Zi95KzBqSGdxTEM5RUFDVU1QbUVsNnlHYmxVcHV1bUZhbXY1VU16djZHbnljNHY3UUpTeitOdGZOL2xadFdzZkdxNWNteC9CdHJBNEtvd1lZQjBFQVBsTVB1R2w0bmhYU2VwdWVxbXg1VU14Q1RXZ3BmcEFsQlJaZ3lDaGEvaEhsU2ZmQ0xhRnhhM0NPQ3BzRndRQXlYYisrSFV6YjNBVUwvN1JYUFducnQxYkE2bi9uT2F2QWk1M0RMaWt5Qm9Fa2VnUlZERVJSSkZzQzZOZGhIVVFBR1JTOTlyYkRFVjlIY3BSMSs2TmFtNzVVRktUVndIWFMxd1hFOW5IVmFnSXlvbGdXeGp0SXV5Q0FDRE5BOCsvYW1DWi84cmtlYmtOM1NwVDErNk5pRlltenpmOEMybStCcFNJc2pXbmdJU0lyNHVwVUJHVUw0S0xCTFkvOFNKaWdCVVFBT1RvSFRsaTJ1d3ZYdnl2aloyTTVzVmZVTmZ1cmE2V0Q4V2sxSUJXNkFOUlRtVFh4VkFORlVFNUVWd2tzUDJKRndzNlY0T0JFQURrTUszZ0orSVhmMEZwNnYvcWgyODM4NFRtYTBDcDJqSGdraUxlRGE0bEVTUkVjSkZBMThIRGlBR0dRd0NRd0tqcXQxeGZoeWhmL01uZzFML1E1RlhBdFBrNitMcEV1UnRNTlNlQ0tKTFNJTFFNTWh3Q2dBU1JIVEd0U2wxRHQ4cU1UZjNuTk44R3J1QTYrTnBGZVYwTTFaTUlva2d1RW1nZkdrWU1NQllDZ0NOVU4zU3JURjI3dHlaVC96bE5YZ1ZNTlI4RExpbks2MktvbmtTUW9IcGJHRzNqaklVQUlJR1UvSEl6SXVqclVJRzZkbS8xZG51dVFIdDU3dUw1MzBUNWNiVW5nZ1N4TGF4dVBHZ2JaeVlFQUFtYTd6SFFzTXlsYWRVTjNTcFQxKzZONnUvMlhJNlVlYWYyUGhBbFJka2dpT3BNQkFtcU8wYWdiWnlCRUFBc3RqaCsrcXNQM3RMMTRrK0syNzFKU2YwTHpWOEZUUFgwZ1Nnbnl1dGlxUDVFRUtuZkZrYmJPTk1nQUVqUWZKT1pla1hXMEswQ3BSdS9zbEwvUXZNbFFGUm5INGpTVDRqd3VoaWgza1FRM2VrWW9UUUdvRzJjT1JBQUpGQjkwV0MraVBzNlZLRHV6QmZKUGo4VjVSOVFaUkh2QmplUUNLSTdwVUhxRWxab0cyY09CQUNiWkM1TlIzKzhxeVNsSjUrdmYveSszTHlXbEtIVzJ3ZWluQ2pQQmxORGlTQkJhZGNndEkwekJBS0FCTTJYR0ZabHpvcy9LZDc0cmZlaXg2cGt6VElOOUlFb0tlS3p3VlQrK3ZpcWxKYUhvbTJjQ1JBQUxLQ2xyME01cmYyRDl6MytyS0tIQi9OejBuZEtaUlhwU2d5OTE4Wk9ScHdJYXZnb2x1cnlVTFNOMHdzQlFBSjFtMlphR3JwVjRLYzY3ei8wZ3RMVXYvUmZxWlFkWU9uRmtiWWtna2g5ZVNqYXhtbUVBQ0NCb2swem8xNzhoZTBqUjlXZHFHcnNvc2VxbXI4SGhwcm9BMUdPUllrZ0lscWJuVkhhT1E1dDQzUkJBSkRtcXcvZWtoVURkRFYwcTB4ZHMwOXE0cUxIcXFSRXJHYjZRSlJ6YmV4a2xFM2lta2tFa2ZvakFtZ2Jwd1VDZ0V4U0NpZDBOWFNyVEdtenoyWXVlcXhNMWc1d2s4ZUF5NW43NkIwVmp5Mm5tVVFRcWI5VUVtM2pvdGZ5dDhPUDZoNkRVLzU4Y1hMTHZWMWJld2RxL1BGaFpqWDd6Y0x0NjEvZHZISng5WXZQRjhkUEwvMysveWdkWVFQOFZPY0RSMGFadjBYUjgvLzF3N2R2M2ZoWEZVOU9EVDJXbExFSGNQdjY3Sjh2VGpiL25BSkJlckd1dnkzTnUyZjN2cVhmL2UrR2YzcDQ2Mlo2NnAvVWpYbHI3MEJyLzJCNjZwOVVQQnlLSlhRUHdFSFh4azRHeXd2Rjc4dkIvRngyWlRtYlhneVdGNExsK2V6eVF2RE5nbEZKbm5MVU5mc2taYWwvUWRZaDdlYjdRSlN6TUQ3V3RtdWZ1dC9lQWlJUjFPUXA2MnRqSjljdWYzSGY0OCtxR0xab0czZDk3SVFWL3pSc2h3Q2d4TUs1TThIeXZOL1JZOWRFWDVLNlpwK2tNdlV2U05rQkpobDlJTW8rT2IxMDQrd3BkUzJWaXJVUERhYy8vN1RKb0p1ZW1zaDhlWEhIYzYrbytMc2gyc1pkL2ZCdGUvL1YyQUlwSUZWdWZYMDFjK1ZQdDc2K0dxUVh3MXMzZFErblFkMEhEblhzLzQrS0hoNW1Wdi8xZi94TTNXK09uK3JzL3F2L0pPVlIzMHo4UTZCbUc0Q0libjE5MWE1RWtCRGV1cm44ei8rb2FPUXRyZTF0LytiUjFZdVQ5djdic1FJMmdhRXNwUnUvUkRUMzBUdEtYL0hNdWFtdHFvaXZqV3l5SWlqZnRiR1RpdTZYUjl1NENDQUFRR2xLbTMwUzBjcmtlZFdWVGxLMmZ3VlpmU0RLUGorOWRPUHNLYVVmVWFESmlxQjg2YWtKUlJXaWFCdW5HZ0lBbEthMDJXZm0wblFFdDFkS2JOTWRRVEk2NGh0amlPaitReS9JZXBTNnU0WFJOazRwQkFBb1FXbXpUM1ZWL3dYYWR1MlQ4cHpJa2pQWHgwNUVtUWp5ZS9yazF0MHJTZ2VKR0lDV1FTb2dBRUFocGMwK2llakcyVk1SdkZEN3FVNVpLeGpwZlNES3NUb1JKQ2hLQjNuSk5yU05Vd0VCQURaUjJ1eVRwRjcwV0puRUhXQVZmU0RLaVQ0UkpIMm5SMTA2Q0RGQU9nUUF1RXQxczArNUZ6MVdKbkVIV0ZFZmlISWl2anBZWWtWUVBrWHBJTFFPbFFzQkFPNVMydXd6ekt4ZS9mQnRSUTh2bGh6NGxxeEhxVHNHWFByaklyODZXSG9pU0ZDVURsSmFtaHczQ0FDd1FXbXpUNG9xOVo4VDVia3E2U0srT3Bpa1ZnVGxVNVFPUWxHUUxBZ0FRRVNVMnJ0ZjZZdFZaS2wvUWVJT01LbnNBMUZCbEtzbFVsQVJsRTk2T2toaWZpL21FQUNBL0ZTbjBvM2ZLRlAvUXZMQlhSS2ZKdXM2K0xvNGt3Z1MwbE1UY3grOUkydFpJL0dFUjh3aEFJRGFacDloWmpYaTZ3K0p5Ty9va2ZnMDFjZUF5M0VtRVNTc3pjN0lTZ2ZKT3VFQkNBQnhwN1RaSnhIZE9Ic3Erc3R0Sk80QTZ4Vng3RlNhQ0JLa3BJTzhaQnQ2QkVtQkFCQnIzUWNPS1QzekZYSHFQMGZ1RHJER3BzUnJzek11SllJRUtla2d1Vm0rMkVJQWlDL1Z6VDZEK2JtRjhURjF6eTlIN2c1d2xMMFpTbklzRVNRMG53NlNtK1dMTFFTQW1GTGQ3Sk9Jdmo3emN5M3Z6bkxmRFNQckExR0JlNGtnUWFTREd2dTV6bVQ1OUVJQWlDbWx6VDVKOFVXUGxjbDlONHl5RDBRNWE3TXpLam9yVkJCQklraElUMDFjUGZGbUEwdWM5QjkrcDJJOGNZTUFFRWRLbTMyUytvc2VLNVA3YmhoeEg0aHlybzJkZEM4UkpLek56bHo5OE8yNklweXV2U1gzSUFERWp1cG1uNUYxZXk1SDhnNndqa01BSlMyZS8wMlVIeGRaSW9pSWd2UlM3ZW1nTUxPcVpXL0pTUWdBOGRMYVA2ajYvbkhWRnoxV0puY0gyQ2pwcVFsWEUwRkNqZWtndlgvQkhJTUFFQ09pMmFmU2o5Q1kraGVrVndkcTZRTlJUc1JYQjFPRWlTQkJWQWRWYUlpdC9TK1lZeEFBWWtScHMwL1NuZm9YcEZjSGF1a0RVVTZRWHByNzZKMG9QekhLUkZET1Z4KzhWVElkRk16UGFmOEw1cGlFN2dGQVJGUTMrd3ptNS9TbS9nWHAxWUc2K2tDVUl5cUNsTzdpRkdnZkdrNS8vbW5FNzkzcHFZbk1seGVURCs3eU8zcjhqdTVFcWl2UjNoRnhnN3c0UUFDSUJkWE5Qa1d2ZnhNeXMxWjNnYTdSdGJHVDIzWThySFF4VitEK1F5OWNmdmYxeUQ1T0NOSkxBVXA5RkVNS3lIMnFtMzJHbWRVcjc3MWh3dXl2WWdmWWhGOVhNWmVhUllOR0NBRHVVOTNzMDV5cURQazd3TkdXM3RjdVNDODFmSWEyTVJGWEJFRTBFQUFjcDdyWjU5eEg3NWhUbFNGL0I5aUFZOERsUkg5OWZNUVZRUkFCQkFDWHFXNzJlZlhFbStiTS9oUy8vakRYeDA1RVdSWHE5L1NsOXU2UDdPTWdBZ2dBemxMZDdQUDZ4KzhiTmZ1VGdoMWdRL3BBbEtPaEtoUTlPTjJDQU9Bc3BRdjI2eCsvYjFvekZpVTd3Q1lkQWlncCtqNXg0QklFQURjcFRmMHZqcDgyYmZZbk5UZUVHSFVNdUp3bys4VEZMY25tUEFRQUI3WDJENnBML1MrT256YnpOR2JyenQyNmg2Qk45TGN1Z3hzUUFCeWs3cWFYbGNuelpzNytSSlJJZFVsL3BsRjlJQ3BZbTUySnBpbzBEdWZzWWdVQndEVzlJMGNVVmYydlRKNi9OblpTeFpPbFVERTNtZFlIb29Kb3FrSmQ3YlFhV3dnQVRsR1gvTWxjbWpaNTlsZlVCZHFRQTI0MWlxWXExRTkxcXY0SWlBd0NnRHZVWGZPYnVUVDkxUWR2cVhpeUxDcDJnTFZmQjErdklMMTA0K3dwMVovaTM5dXQraU1nTWdnQTd1ZytPS0xrTGRpTU5wK1ZxZGdCTnVFNitIcEZjR2xNb2dNQndCMElBSTVRbFB3SjV1Y01hZk5abVpJZFlJUDdRRlNndWlvVVo4RmNnZ0RnQ0JYdlplWTBlYTVLeFZVSGhoOERya0JwVmFpUEZZQXpRdTVSeUhXUEFpU1EvbDVtVHBQbnFyQXRXV0J0ZG1aeC9MVHVVWUFGc0FKd2hOejNNcU9hUEZlbFlnZVliT2dEVWNIQ3VUT0txa0szN1hoWXhXTkJDd1FBUjBoTWdvdlozN1JHYnhVb09nTnNSUitJQ2hSVmhiYTBwYVEvRTNUeE9HTzZ4d0FTSk5vN1pEM0tydG1mbEwyVDJuSU11QnhGVmFFNEMrWU16aGhXQUk2UTlWNW1ZSlBucXFLOEhkY3VpcXBDc2VuaURBUUFSMGg1THpPd3lYTlY2dTRwdEtnUFJBWFNxMExEektvdG0wTlFsVWQ4WGZjWW9GbFMzc2pNYlBKY1ZWSlpFMUJucGptNVZhSExuMzBpOFdtZ0UxLzNBZ3AwandLYTFmenBmR09iUEZlbHFFTzlkWDBnS3BCWUZScG1WaTM5ZXdMRkFncThCTnVpZXhpZ21jbE5ucXRTMUtEWXhqNFFGY2lxQ3NYcnYwc1NiSXZuRWFxQXJMYzJPM1AxeEp1Ti9RczN2TWx6WllxYWdKSzFmU0FxYUw0cU5NeXNwaWMvbFRVZTBNNGo1aEVuSEFaMndOcnN6RmNmdkZWdkdEQzh5WE5WaW82QWtjMTlJTXBwc2lvMG1KKzdjZmFVTS9zaVFDRW5UZ2xPV0FLNFkyMTJadTJEdDFKNzkzY04vNmhxY2FUNVRaNnJpdk0xa0ExSVQwMjA3dHhkVjlQQVlINXU1WSsvVDA5K2lxbmZQWndvUWNRNTh4QURYSktlbWtoUFRWUUlBNWxMMCtrLy9NN0dtcDhDNnRvU1dOMEhvb0pyWXlldmpaMXM3UjlNZEhTMzd0eWRTSFZ0N1Iwb1RxT0ZtZFhseno3SlhQN0N1a01oVUNQT0dQRXdFVkxvY1U2c1JmZDRRTExpTUNEK1ZidjBOcWZ1Q0pqdGZTQXFXNXVkb2RtWjNCdUFuK3IwNysxTzd0d3RPa3FsUC84VTg3NzcrSHBJUE1FcERDamNRZ2dBYnNxRkFmRnQzY09SU2QwUk1MSy9EMFJkZ3ZSU2tGN0NwQjhyQVFVZWVZbVFRbFNDT3MreHFWOVFkd1FNd0hrSnRpWExiM3REeDhkUUNRbzJVbm96aVJ0OUlBREs4WWdOSFIvemlJZ1RLa0hCUG0yNzlxbDd1RFBiSkFBbGhGek0rQjRSaFR4RVUyaXdpN29qWU9SV0h3aUFZcHl4a0lja0FnQW5IdkNidW9jRVVBZDFSOERJdVQ0UUFBVUNmcE1UcDQwVkFHVVR6TmM5SklBNlNMOERPWjk3ZlNBQThpV1lIMUtXUkFBWU9qN0dPTU0yQUZoRVVSTlF3YjArRUFCM2haeHhOblI4akhJWHdvUVVjZ3ExRGdxZ0RzbUg5cWg3dUt2SGdBR0lpRk1ZM3BudHZkeVhjREVBMkFKWEVnSTBMS0NBRndTQWtFSnNBNEF0Z3ZTU2xPNzJaWi92ZEI4SWlMa0U4d3RYQU5nR0FMc3MvdmJYNmg0ZXF6NFFFQzk1R3dCVWNDazh0Z0hBRm11ek0zTHZPcytIWThEZ3FvSkozdHYwWGN3akFFc3NuditON2lFQTJJWjVvdm1EY0hmR2YrVDRyM0EzREZna1BUV2g2TWd1K2tDQXU5Z2p4MytWKzU5TnIvd2hyWFBzQW9BOVZpOStMdjJaNmpKTEFIcHhUaUd0NTM5bDh4NEFSMDhJc01uQytKanVJUUJZSStBMytlWjMvSUlWUURaQlBtcUJ3QllxNmtIUkJ3TGNGUElFYlhTQXlOa1VBSWFPanpGaXFBVUNpMGl2QjAzLzRYZHlId2hnQWs0aG83c0ZvRUp4MlE5cWdjQW1jdXRCRjhkUE8zbDdHa0JCL1k5UU9OYy9jdnhYbklmSUFvRkZaTldEcmt5ZVh6aDNSc3FqQU13U2NzN0QvUG9mb2NUTFBxZndOdDJLWkZBQUVxU25KbFltenpmNWtNeWw2V3RqSjZXTUI4QTB0K2xXeWR4K2lRQ3dUdXU0Smg3c2NtM3M1UFdQMzIvNFdFQXdQM2Q5N0lUY0lRR1lJOEcyckc4dUFCVktuL3o2djhlZTlLZ0YxMFNDWGZ4VTU0N25YdkY3K3VyNldXRm05Y3A3YitEd0Y3aEtsUC8vMnpjTDh6OUVsQ2p6RTNoQU43ZXdiWW9IQmlCVGtGNjYvTzdydlNOSDJvZUdhL254bVV2VDZULzhEcnUrNExhQTMvVEtUUFdsdjNyM1FJQ0hWUUJZNXRyWXliWExYOXozK0xQbGJvMFBNNnZMbjMyU252d1ViLzNndnBBbnlNK1d1ZTZsN1B4K1lmUS9FM0htdFNnYkY0QkNKZE5CbVV2VGk3Lzk5ZHJzaks1UkFVU01oK3RFN0pIai83UGs5NVplQVlpZlNNU3dDQUJMNWFlRGd2bTVsVC8rSHEvOEVEc2hKMkxGNWY4NWxTWjNMQUxBQVg2cUUvTSt4RlBsMTM4cVdRYWEvOU1KbFVCZ09jeitFRitzMHVzL1ZRNEE0dGdZRDB0VWp3SUFnTW5FMUYxOCtqZGZ0YlkvSElzQUFBQUxNVWJWTG5pcEVnQ3dDQUFBc0U0dHIvOVVmUVZBV0FRQUFOaW1odGQvcWlVQVlCRUFBR0NSR2wvL3FhWVZBR0VSQUFCZ2o5cGUvNm5HQUlCRkFBQ0FGV3AvL2FkYVZ3QkV4TzhjREFZQUFET0pvNysxdmY1VDdRSGdrZU8vWXNRNDhrQUFBS2JpakJpeEdsLy9xWTRWQU5HZTQ3OGtZaldIRmdBQWlBN25STVQySFA5bDdUK2w3dnZmUzk0ckJnQUFlalV3T2RjWEFCNTU4eGVjd3R2aHpYby9CZ0FBMUxrZDN1UVVQdkxtTCtyNldYV3ZBTmI1bmJ0aUFBREFCQ0ZQa0wvT3MvWCt2RVoyZGFkSG4rS01HRTRHQUFBWWdIUE9PTldWL1JmcVhnSFF4bTR3eDdFQUFBRHRlTGhPeEJ1WS9hbXhBRUNFWXdFQUFBYW9zL0MvUUlNQlFCd0xDQmtxZ2dBQXRBbFpXRmZoZjRGR1Z3QkVlNDcva2hOSFJSQUFnQmEzdzV1ODBlU1AwSGdBSUtKMW5tMWhQbzZHQVFCRWpITnFZWTFVL3VScktnQU1IUi96cUlXSVl6TUFBQ0E2SVNmaUhyVU1IUjlyNWpGTkJRQWlldVROWHpCTzJBd0FBSWhNeUVMR3FkNWpYOFdhRFFDRXpRQUFnQWcxbi9yUGtSQUFDSnNCQUFDUmtKTDZ6NUVUQUxBWkFBQ2duS1RVZjQ3TWRnN1RvMCtGRkhya2tZY3VFUUFBVXQxNXZaYVMvQkhrckFDRVBjZC95U204VGJja1BoTUFBSWcyYW0wa3p2NGtOd0FRMFRxdGUrUmhReGdBUUNLSkc3LzVKQWVBb2VOaklndUVHQUFBSU1YdDhLWkhucXlOMzN4S2t2V1RveU1lZVNHRlc3eHRLcDRQQUJBVFl2WVBLWlMxOFp0UDFXN3Q1T2hJQ3lVOFlzeHJVZlFSQUFCdTQrRjZTSHlkc2lwbWYxSVhBSWpvd3VpVFJJeUlJd1lBQU5TTGgrdGlDbTI0MldkVmF1czFMNHcrU2N3ajNCNEdBRkFQem9tSUV3L1Z6ZjRrZlJPNHdDUEhmeVZpREE0SkF3RFU2TTZFMlhpai94cXBEUUJFdVhaRnVFSVNBS0E2Y2NVamtZUmViMVZGbEpyQmZnQUFRRlVSNVAzektWOEJDSThjL3hVUkQ5RTBGQUNnak52aHpaQjRaTE0vUmJZQ0VIQStBQUNnSktYMS91VkVYWjJER0FBQWFxek9MQUFBQXU5SlJFRlVVRURMN0UvUkJ3QVNaOFJZZ2hIek9QcUdBa0M4aFR4a0lTZSt6bFdkOXFwQTIvdzdQZnJVeHJjUUF3QWduaFIwZUs1TFJKdkF4Y1F2bUtNOEZBQmlpWWZybkRqcG0vMUpZd0NnalY4MlNvTUFJSFp5QlQ4YVozL1NtQUxLd1pZQUFNU0kxcVIvQVZNbTNPblJwemh4bkJRREFJZUpjMTZNbU40WC94eWRLYUI4U0FjQmdOc01TZnZrTTJVRklDQWRCQUFPTWludGs4L0VTUmJwSUFCd2htbHBuM3dtQmdEYXVFaUFFVEhjSlFBQWx0cm82VStjZUhUdGZlcGk5T1I2NGRqVElhMnY4MkFMYlVWR0NBQ3NFZkxiZEt1RitSNjFSTkRWdVdHbXo2cVRveU10MU1MSVkwVElDQUdBK1hpNHpvazRoZXUwYmxUR3Y1anBBVUJBUmdnQUxCQnl6c2prbkU4Qm0yYlR1eGtoZEJJRkFNUGNEbThteVBmSU0zQ3p0eHliQWdEbDFZa3lqb3dRQUJpQmgrdWNrWUZWbmxWWkZnQ0VPeGtoSXM0WjRjUUFBT2dRY2s1aGJpNnlJdWRUd09LcFU5d3p6SWxuQ1dWQ0FCQ2hrTittV3dueVdZVDM5NnBnL2FRcHlvU0lhSjNXRVFZQVFDMVIzM2xuenJFcjRWUE1rZWtTWVFBQTFISnI2aGVjbWlqdkhocGdIZ3BHQVVBS2NhQ1g4OUNLMHY2NnVEbEhYamoyTkJGeENyUDh0cysySVJJQVFMMDRwNERmVExBdGpEd2lNdmxBYjhOY25ob25SMGM4U2pER0dMRXN2NDNVRUFCVUp6WjQyUlpPbkhNZWttV1ZuWFdKeFlTNEtUWEVRMVNPQWtDaGpacE96OGxVVHpueG1nZEY1U2dSY2NhelBQRFpOc1k1Z2dGQVRJV2NNeGJ3bXdubU15N21BWXRyT2hzUTA3bHZJenRFekdNZXB4REJBQ0F1OGlkOThrSWVjbkk4ejFNQjVydE53WUNJaUlmRVdoQU1BTndSY3M0WThYVmlIaEhGZk5MUGh6bHVrMXlPU0JTUmhzU3ovTFpQL2taSUlFSlVBREJheUlsSVRQY0JCUW0yeFNNbXlqaUpLRzRabnFvd25WVXlPVHJpa2NmSTg4Z2owZktENVVVRkltSjNHOUp0UkFnQmNRSkFydkR1dnkrZVg5bk4xNGtvTjljVEowNUV4RU1LT1lVaGhYak5yd0R6Vk4zdVJBWG1VUXNSeTdXQ292emZUYllSTHdCQUFyNHhyeFBkK2UvZGYzYzhwSFZPSEhOOUEvNC9UYXhxdjM1anR1RUFBQUFBU1VWT1JLNUNZSUk9IiBoZWlnaHQ9IjUxMiIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIvPjwvZz48L2c+PC9nPjwvc3ZnPg==',

      chatgpt: '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="28" fill="#10A37F"/><g transform="translate(32,32)" fill="none" stroke="#FFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M -14 -8 L 0 -16 L 14 -8 L 14 8 L 0 16 L -14 8 Z"/><path d="M 0 -16 L 0 0 M 14 8 L 0 0 M -14 8 L 0 0"/></g></svg>',

      gemini: '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="gemgrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4796E3"/><stop offset="40%" stop-color="#9168C0"/><stop offset="100%" stop-color="#E94235"/></linearGradient></defs><path d="M32 6 C32 18 38 26 58 32 C38 38 32 46 32 58 C32 46 26 38 6 32 C26 26 32 18 32 6 Z" fill="url(#gemgrad)"/></svg>',

      google: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTAwMCIgem9vbUFuZFBhbj0ibWFnbmlmeSIgdmlld0JveD0iMCAwIDM3NTAgMzc0OS45OTk5NjciIGhlaWdodD0iNTAwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmVyc2lvbj0iMS4wIj48ZGVmcz48ZmlsdGVyIHg9IjAlIiB5PSIwJSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgaWQ9ImNjMWRmYmU4YmMiPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAxIDAgMCAwIDAgMSAwIDAgMCAwIDEgMCAwIDAgMSAwIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiLz48L2ZpbHRlcj48ZmlsdGVyIHg9IjAlIiB5PSIwJSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgaWQ9IjYxYWUxMDA4Y2UiPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAxIDAgMCAwIDAgMSAwIDAgMCAwIDEgMC4yMTI2IDAuNzE1MiAwLjA3MjIgMCAwIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiLz48L2ZpbHRlcj48Y2xpcFBhdGggaWQ9IjY1ZTc3MWUzNGMiPjxwYXRoIGQ9Ik0gMjAxLjIxMDkzOCAyMDEuMjEwOTM4IEwgMzU0OCAyMDEuMjEwOTM4IEwgMzU0OCAzNTQ4IEwgMjAxLjIxMDkzOCAzNTQ4IFogTSAyMDEuMjEwOTM4IDIwMS4yMTA5MzggIiBjbGlwLXJ1bGU9Im5vbnplcm8iLz48L2NsaXBQYXRoPjxtYXNrIGlkPSI0YTExZjAxMjZiIj48ZyBmaWx0ZXI9InVybCgjY2MxZGZiZThiYykiPjxnIGZpbHRlcj0idXJsKCM2MWFlMTAwOGNlKSIgdHJhbnNmb3JtPSJtYXRyaXgoNi41Mzc1OTcsIDAsIDAsIDYuNTM3NTk3LCAyMDEuMjEyNTQxLCAyMDEuMjEyNDQyKSI+PGltYWdlIHg9IjAiIHk9IjAiIHdpZHRoPSI1MTIiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBZ0FBQUFJQUNBQUFBQURSRTRzbUFBQUFBbUpMUjBRQS80ZVB6TDhBQUJ3SFNVUkJWSGljN1oxL2pGeFhkY2UvZ1pYZVZJb29rV2d6bTFoVkhka3hsRWxLdEtaVXhUWnAxeEJhUXhRcFhRZXBwRXVGRFcyYTJLSkNLa2dCdTkxVW9sSi9pS3h4R2p1b2JxRlNzeVpTR21KQml4MWl4eUNvYlRrNFRzamFxVGQvT0pwSGhSVElQNTJWaUxaL3ZQazk3NzE1ODk2OTMzUHZlK2VqU0o1MTFuUHZ2UE9kYzg4OTk5eDdyMEcxQ0s1N3h3eUFEUUEyQWV1QmRhaTMvMWNJWEFXd0FpempGVno5eVU5Zlg1WHJKNDFycER2QUlkaDQvYm9OMkxSKzg0VC9MbndPeTY5Y2ZiSEVVaWk1QUlLTk14czJZV3Q5L0crbUUxNWRXWDdsNm91aGlUNjVSWGtGVUw5anc2YmlsaC9pN01xeGtzbWdqQUlJdHF6Yk1iR3puNFN6SzhldW5pN0pxRkF5QVZqNTJzZHpkdVhZdVl1VWxxeFNJZ0hVNzloQnNuMlBzOTkrMXZNUm9TUUNrREIraC9DNVkvL3Byd2hLSUFCSjQzYzQrKzFuUFEwS1BCZEEvWTROdTZTTjMrSG84dU1leGdRK0M2Qnh6NGR0eHZwNU9QcW9iNDdBV3dFMDduSG1xei9JMFdQLzdwTUcvQlNBczlhUE9PcFJWT2loQUJ5M2ZzVFpBNTVvd0RjQmVHSDlDRC9HQXE4RTRKSDFJeDd5Y1Y3Z0tzSDhtVFgvYUM0NExsbGZQRURqbmdlbHU1QVhQNFlDcC9Ienk5K0g2MjdBYmVvTFRXa0RGbWVwSWYwWWZXVjJTZHAyaGpnekgwZy9TLzhJeXZEbDc2RWp3V1EweXZMbDc2RWpRWFpLYVA2MU5aVkFWa3BxL3JVMWxVQVdTbXordFRXVndEaEtidjYxdGJXMU03UFNEN21EZTVuQXhqKzdWdVZoaGJOLzRzWXl3VnVrT3pERTdKa1hLbUYvYkg3QmpZSEFMUTh3KzZWcVdML05RMStScnhsd1NRQVZjZjc5UFBTUTlEcVJPd0tvUHp3bjNRVUJ3czhKTHhXNklvRGdZMGVrdXlCRStQRVRrczA3RWdUT3ZucEV1Z3RTMUk4dlNTNFJPQ0dBeHRMeEtpK1R6RFVYNUJZS0hSZ0NnZ2U5TGZZeGh0dzRJTzhCNWw5Vit3dU9BOUllb0lKVHZ5USs4UzhTcmNwNmdQcENSZkorV1RoeVJpSTErRmFCTnJ2TW45NG0yYnhyM0hEZjFQZmZaRGNxT0FSVU0vT1RUdmhCOWhLUm5BZVlQLzF1c2JhZDVWcTZFNUR5QVByMVQ0SzhUaXprQVdiLzYzMHlEYnZQRGZkTmZaZlluSWdIQ0w2bVgvODBtRTVBUWdDelg2OXk0amNUdkp3QVB3OFFMRlE2OForTkkwdXMxUUcyQndnMmZrZk5ud1hXaEpEc0FZSUhYMUQ3WjZMK3dqeWxIYTRIME16L0pCeTlsMUFzUkJYQTdIRm1hLzdER0FhWVE4Q0Mybjh5R01NQXp3UG81RDhQMW9jQm1nQWFHdjNuNHV4SDdlNGRZQTBCOHhyOTUyTnowKzQyUW80QWdvVWpsSFpLeVhHcmdRQmxNYWgrL0dPTVpzcktYVGFYaUFreFFMRHhCZnVObEJ1TGdRQmhDUGlZMnI4b204OWJLeGUwN2dGMDltZUc3WlkyRHRqMkFQWFRhbjhqMkFvRkxRZUI5Zk0zMjIyZ090eGxwMURJcmdBYS8zT3QxZmV2Rk51c1RBYXNDbUQyQnpiZnZYSnMyL1NVZVFYWWpBSG1kZkhITEhPbnphZFQ3YzBDcW52a2cwWEMyMHduQk94NWdBZVBXSHZyNmxKdm1rNElUQmwrdnk1TE92Mnp3ZEhMaHQvUTBoQVFuTmJhTHh1WUx3K3dNd1RVejZ2OWJXQ2hQTVNLQjZpZjE4Vi9HOWdvRDdJaGdJYXUvbGpCU25tWUJRR28vZTFncHp6UXZBRHFUZU52cWNCYWVhaHhBYWo5N1dDclBOaTBBTlQrZHJCV0htNTRHbGgveHV6N0tSSDJ0Z2VZOVFEMVo5NWw5UDJVQ0l2YlE0d0tRTzF2QjV2Ymcwd0tJRGl2OXJlQjFlMWhCZ1dnOXJlRDNlMkI1Z1NnOXJlRDVlMmh4Z1NnOXJlRDdlM0J4Z1R3a3RyZkJ0YTNoNXZLQXp5dDlyZUIvVk5pREFsZzN3NHo3Nk1NUURnbHlNd1FNSC9FeU5zb2d6Qk9pVElpQUQzOHlRcmVuQkttQzBCV29OamZoQUNDVnZIM1VFYmcyTjlFRUhpKytGc29JNURzYjBBQWgzUUNhQUdXL1lzTFlOOXVFOTFRQnFIWnYyZ01FR3pSQ1lBRmVQWXZLZ0N0QUxZQjBmNEZCYUFUUUJzdzdWOHNCZ2kwQXRBQ1ZQc1hFOEFUT2dFd0Q5ZitoUVN3UzFlQXpFTzJmNUVZUUFOQUM3RHRYMEFBd2F1NkJkZzRkUHNYR0FJVzFmN0c0ZHMvdndmWWRkaGtOOGlFVjFlV1h3R3U0aWY0S1Y1ZkJSQmNoM2ZnZXF3RE5nQWZYaWNqYmdINzV4VkFjSjJYR1lEdzZzcnlLMWRmZkgzOGMyNWN2MjdEcHExY0hVallQN2NIYVBvMkFJVFBMVDk3ZXVJSFhIL0h6SVlQazQ2N0ViRi9YZ0VjOG1vSjZPanlzeS9tUDE4dndKYmJDU0tRc1g5T0FmaFRBeFkrOXNvNUk1ZnZOV1oyV0IwUmhPeWZUd0MrTEFHYy9mYmp4bTVlREZhQitoMDdiSjErS0dYL2ZKeGY4NENsZVJ0ZjJHQit5VXBuV1plRkcrR1FqVWRnbE9iQ3JMMG5ha0VEZnRsLzF2VEhOODNTTEFLN1Q5U3dCdnl5ZjJEeW81dW51Y0Nab0FieloweDEyUy83NDJsVG45c0dTOVp1MTRxaFljWU5lR1ovaHdlQU0vUHNSMWxmS041cnoreVBadkdQYkFmcWw3OUxNRi93Z2ZobWYxZG5BRExtQndETUZna0dmTE4vdzVqRmpFSUsvQktmU3U1Z3dEZjd1emtBTE5RaC9SeHpTc0E3Kys4emF6a2pDSC83TytRWkNMeXpmOTI4K1lyaWlQa0JCUE9UOXQwNys3dTNCaUFZK3NVUVREWXA5TS8rdXl5Wk1TL05XZWtuTWt4OWdsREFQL3U3bGdOZWNQRUpaZzRGL0xPL1l6bmdKV2NHL3lIbXMzWGZQL3M3bFFNKzQ5VGdQMGc5Z3hQdzBQNndiOVhzekl0UC9GT1pIOWQvSCsyL3o3NVpzK0x5MXg4QUVEVFNFMlkrMnQraENOREo0RytJMUJtaGovWjNaeEhJdmJsZlBMT0pUc0JMK3p1VEEvVG42U1hsQlB6NUJQMjRNZ1gwNU9zZk1SLzNDZnkwdnlPcndNN08vUk9vanc0RGZ0cmZrVVdBQmVuSE1ERWpLUUUvN1IrNGtRUHl5djEzR0F3RS9MUy9HMlVnTDdrKytVOWd2dTh6K0dwL0YxWUJYL0wwMmZVcndGZjd1NUFFOW0vNDc5R0pvTDIxdndNNW9IbnBaMUNJYURMZ3JmMGRTQUo3T3Z4M0NjNjRhLyszanYyTi83aVowSTAwZm56ckZlRWVGT1hOZjhWUFhOMy9QL2FBQ1BIRElINThtNk9QYmhJQ3VQb2hwc2I5d21PTVhxUlFDdnM3YS83eEhrRGFBUnk3MjkxblZ3ckdlUUJoQjNEc0k3THRWeDdoWmVCRDBwKy84c2ptQU5UKzBzam1BUFpKZjN4RjFBR28vUm1rendMV1NMMkk0L0NuQkJ1dkRxbjNCVWgrQjQrcC9TbWtlZ0JCQi9EOGJYSnRWNG8wRDdDTDFvc1J3dCtXYTd0YXBIa0F3VHNCcHZPZjdxNU1SSW9IMktYMnJ3QXBIa0RPQWR4aTdKQjNaUnpKSHFBaFp2L3RhbjhleVFMNEVyRVhBK3crSWRWeUZVa2VBcVRtZ0pvQW9wTG9BYVNTUUtIYW4wcWlCNUFLQVhVQ3dDWEpBMGlGZ052Vi9seVNCQ0FVQXU3WEFKQk13aEFRdExqZGFLTXJBSFFTUE1EbnVMM29vQ3NBZEJJOGdFd0lxQmxBUHZFZVFDWUUzSzMyNXhQdkFjNi9oOXdOUUFNQUdXSUZJQk1DYWdaQWd0Z2hRQ1FFM0szMmx5RFdBMGlFZ0RvQXlCQW5BSkVSUUFjQUdlS0dBSWtSUUFjQUllSThnTUFJb0FPQUZERUNrQmdCZEFDUUltWUlFQmdCZEFBUUk4WUQ4RWNBSFFEa0dCV0F3SmtndWdZZ3grZ1E4R2w2SDQ2cC9lVVk5UUQ4RVVBalFFRkdQRUNkYnYvOWFuOUJSanpBb2QzaVhWQ0lqSGlBajdKN1FCZWMwcy93MTQrZUJRcW55UTBxQXd4N2dIdlpIZmc0dTBGbGdHRVB3SzRGMGh5UU1NTUNZTzhJMUNtZ01FTkRBUHRrL21OcWYyR0dCTENIM0x6US9nT2x5OUFRUUU0RGFnUWd6cEFBeUNHQXJnS0pNemdFa085bUROWCs0Z3dLNERQY3hqVUhJTS9nRU1BZEFUUUo2QUFESG9DOEVQZ0Zibk5LSEFNQ0lOZUNTTjlIcFdCSUFIZFJtOTVQYlUySlp5QUc0SVlBV2dmZ0F2MGVnSHU1NlRGcWEwb0MvUUxnTGdWckZ0Z0orZ1hBRFFFMENlUUUvUUtZWVRaOG1ObVlra2gvSkVhTkFXdDZKYXdUOUhrQWFpM0E4MnAvTitnVHdOM01kci9DYkV4SnBtOElvSllEYWhMQUVmbzhBTlArbWdSd2hiNXZJak1HMUVvUVYraDVBR294aU5yZkZYb0N1SWZZcW80QXpqRFZmZlZlWXF2L1NHd3JDeTlLZDRETkg1L3J2T3JGQU13UXdMVTVnT1F0NlNJOGNsL25WZXJ0NGJaNFhxSlJwWThQZEY5MUJjRE1BMm9XU0pyZjZMN3FDb0I1V2NmWGlHMHA2WFFGOEZ1OE5rTmRCeENuVy96VEZRQnhFdkJOWGxOS0FuZDJYblFGUUV3RVA4eHJTa25nZHpzdnVoTXk0a3pJdFVsZ0JhZUJlT25kN1JjZEQwQXNDTlUwb0FPczY3em9DR0FMciswbmVVMHBTYnl0ODBKQUFEb0pkSW1PQUlpVEFKMEV1a0NuQXZndFF6L2JSMDhGY29KUHR2L3NDSUMzTVZpekFFN0JYd3g2bk42aUVrTm5PYWd0QU9MSkFDZDRUU25qYVF2ZzNlbS9wWlNPem5wZ1d3RHJhUTFyTFlCYnRBWEFXd3ZVTkpCYnRBVndBNjNCSjJndEthbTB3NzYyQUc2a3Rhc0Y0WTZ3TmZxRFB3dFEzS0M5SU13V2dPWUJIWU9kQ0RvMy9sY1VDdTFNRUZzQVo4anRLV05nQytBMWNudEtFdTFNVUZTZXhic3YyTTByWXFwWEVvYU82U01Qd01zRU8ybi9LaE1KZ0pjSlZod2pFZ0F2RDZRNFJpUUFXa0dZTGdXNVE1VDdJYzhDZEJMZ0RwSGJKd3RBMHdEdWNCTUFlZ3h3bXRXUU1wYm93aDZSQXlJVUYzZ25nSTRBYUd0QmxUdU14M25JSHVCMWJuTktDdEZxRUZrQXVpdklOVFFHcURqa0dFQnhEZlVBbFNVNklrQUZVSEZVQUJVbnFncWdGVVM0ZHp3UWdJb1doRVRHVUE5UWNiZ0MwSG9nNTFBUFVIRTBCZ0EwQmxDcWl3cWc0cWdBS280S29PS29BQ3BPSkFDZG4xY1c5UUFWaHl3QTRxbjBTaWJJQXJpTzI1d3lGbklNb0FkU3VvYkdBQlVuRWdCdHl4N3hYZ29sRTJRUHdMeWhXc2tDV1FCNkVJRTd2QUdnSXdEYXBsM2k3WVJLSnNneGdPSU9Wd0YwQkxBaTJSRkZra2dBdkUyN3VnZkpNZGlMUVIraHRhUmtncDBJMG1tQVk3QUZvSWtBWnpnSmdDOEEzZ1dWU2liYUFxQUZBUm9FT3NQTEFQZ0NVSndoT2lDOExRQmVKcWhCYTBsSjV3cUFyZ0I0QnpqZVRXdEpTU2Y2MHRNOXdGMjBscFIwb21HL0xRQmVMbGlYZzl5aUxRQTl3TEdxOEdjQnM3eW1sUEh3YXdMdm9iZW9wTkFSQU04RmZKVFdrcEpHVkJEVUZRRHZRa2ZOQmJwQlZBL1NGUUR4SmdkVmdFdDBCRUM4eVVGTEFwd2dXZ3lVRU1DZjg1cFNrb25XZ25xbk5oSFBTWEx2cEtncUhoSzFPUXI3SkxhRzZYcVFDMXlNL3VnS2dIaWozeDVlVTBvaTdiczd1Z0lnVGdNMEUrQVFYUUg4TjYvTnVoNFRJVTg3RDlRVHdBK0lqZDlMYkV1SnA1MEg2Z25nSXJGeG5RaTZnOGdCRVZvVElFODdEOVFuQUdaZHFDNEppL1BkOXA4OUFYeVQyUHBuaUcwcHNWeHAvOW5MeXMwZTU3VWVUdlBheWtJRk00SFhEUDBKN2xPWWRtc2p3cy94TnVrdXNPa1lYdWlVc0wrV2FUYVJ0NzB4L25kS1JmZno5Z21BbUF6R2JtSmI0NmxnWXFxVEJzQlU3KytlWk03T1prOFFHeHZIYXJQWjNpZzF3blJ6dWpuZHBJVXN0SkhvWk16Zk5kYUluR2Q5VXI4NHlIciszVjNhL1d2ejFGall2YUlBRi9nNXl3VjBIMzkvRUVpTnpQY3hHL01HL21Ta1h3Qzh5bUFBZjhwc3pCZG94MmYwSmozOUFuaVMxVHdBMUxVNGVKUlBzaHJxVGdJR0JQQTBxM2tBN3FVQ1hPQ1BXQTMxSmdFRHNSZzNJNnBoNEFnMEErdzgybmsxa0Fsa3BvS0FYZFRXZklBM0tqN1ZmVFVnQUdvUWdBVnFhejd3UlZwTHE5MVhBd0o0bE5ZQkFLaHJWY0FRdjhkcXFHL2xZM0FnNWdZQnJpMEtpME43L012djdMNGNYQTA4eHVvQkFLQ3VPMFFHNElVQVgraTlIQlFBTndqQTE3ak5PVTdBQ3dGNk1lRHdYSXhjR3VOWVhZZ3d2SWZmWi9XaGdoQ3lRUjdqTnVjMnZHT1UrNnRmaGdUQXJBd0ZzS09DcFJpSi9KdElTME1DZUpqV2lZaEZjbnN1czRuVzBsZjdYZy9uWTluMXNiWFY4YjlURFdiTzBwcnFOL3B3VVNnM0c2d3VvQWR2QkJoZ1dBRGtpU0IyNjZwd0c5NElzTnovdzdBQXZrVHJScHR2c1J0MGxEbGVVOC8wL3pDeUprdmZKTFBkcGZwZ09XalZnRVBabDVHTklZZHAvV2p6ZFhhRGJrS3NCaHhJOW93SWdKZVBiRlBYdWdBQUIzbE5EVzZDR2kzTDRXK1UxTklnNmxOLzVMNytuOTQ2OHY5dnBOL3NkaU01LytnZ0I0bjNLVzU5cy8rbjBXOWZQV0dUbEVWMFRZanBkZ2ROUHJvN09PUmJvL0pyUXN5VEU1Y0hmeHdkQW5EdDdaU085SEh6NllyZlg4ODhvbTNoaHdNL3hnUmdBbU5BeGVQQXVTVmlZME9QT3VhQUNJRXhBSWY0VFRxRTVCQVlkMExJUDlGN2dkMVZyaENlWVc0SkhRb0JZbjF2MEdMMFpJZ0tEd0xFTEhEM2xQZ3VjUjVnVldKV1Z0MUJnT29BUnJhQXh4NFNKVEFHVkhnUTRCV0NZRGdQakFRQjBOZUVBWUI0VEtGVEVGY0JFRk4yRWovMG5wYzR6ZmZ3cHdRYUZZY2NjSTJVNE1XZkUvaForejBacFpxRHdJKzR6WTJVWUNZRTN6Sm5wMWF3UXBSWUNnb01yd1FDaVFMWXQ5OXlUMkpwL1pKRXE2S0liOFZLT0NwV0pBeEVyWEp6UVc0RUdMZnpLMEVBcSt6eThJamRGYXNPQ3Y2TTI5NGpvMytWbElCcnZHQzFKNG5jd3J5NlJweVhlYlhnQUViVGdFakp3QW9kb1YrcE1JQzZDZ2pFV2p2eHVQajlGdnVSUXUwNW1YWWxDTmoySDE0SUF0TFdZS1J1MGRqL1YwSU4wNkV1QWdHeEkwREtoUkhjNDJKNjdLOUtQdWdnL1dEZ3VMT0FrejJBVkJoWWxScFJjZ29JQTBkRDlVaFpobTlLN2R0c3JhK0FBZ1NLTHVKR2dMUTdnNzZRL0wvc1VsdXB3TUVoLzh0dk12WTArQlFCeUZXcTFYNG0xalFMZmdBUWx3VkNlaVhXTHZwRzBTNm50NG8xVFlFZkFDU1pPclVVVC9BK3hYSXJRS0xxOG8xZmp2M3JtSTBoZmR4dW9TUForTFZTYnhqOGhVQ2I5NzRVKzlmcHhiaVNWNnFXT0NGRXp3QUJpWlpPdnpsVUxnZ0E5cGQyWmZCbENmdkhwWUdCY1I1QVpJZEFsOTNsM0RUS1hnS01TTXF1cFh1QVZVa1hnTU9sdkZydW9Jajk4eDRDWEdmZFpCbFBDUlZBdXh0MGtOeWxSMC9MOUxkRDZSYUg5d2c5eU1RT2pkdVNKN0ZYdkorUzVRUG9KU0J0WXRlQkFJeUxBWUJRcGppd3k1WlMrUUFwKzZja2RNWUpRR2FQU0I5bFVvQ1kvZDlJRGdISEN1Q0VzQXNva1FJT1N0ay83VHF5OGR2eTVRcER1cFNqUXVRZ3VRYThqeFFyai9VQXVDaFZHOWFqV1lZcXNaZmw3TDgzNWY5bE9KaERlaUlBbENFcEtKUC9pMGd6OG5nUGdGQTBIUmh4MlBOQUlQaTVvUDNqSzBIYVpEbWFSM1pGb00zS3V6emVPaXpyUkZOdG5NRURZSFcvbVk0VVluMkxmb2F4TVdaRTdaKzBEaGlSN1hBdXlicUFIbnZaZDVvWlFqRDhCOGJOb2JJSlFMQTZzQjh2ODhMQmp3U0hmeVNXZ25YSWVEeWYyQjZCSVdKTDI1MUdMUHZYWWN3anl4SURBUGk0Z1o2WTRLeHYxOHpKWmYvYXZESG1LNVAxZ0U2UmM4UGlXUGtkajlLQzlXV0o2cThCeHZuTWpCNEF2MSs0SjRaWTMyUWVybCtNdWFhNC9aZkhqWm1aaitoOWVrZkJycGpEbDVUQXlXM1NQY2dRTkdVV2dCUFpvQTQ3ajByM1lEemkwUitRVmdqU0llc1FBT3d1MUJPekxGMXhaRmFTU1AxbEYreWZZV2RQWmdHc1B1WlM4TFcrNmZaMFlMRXBPL2x2c3p6ZVpoTWMwKy9DcW1BLzdpWUdKYloreHBLaGtDTDdFSUJ3Zi82ZTJPRExWOXhjSFFoT3VtTC9EQTVnc29zNlhNa0hkam4xSWZmbUE0djNTL2VnUzVaS3FnazhBUERCdkQyeHhiYVdhMG1CeFRWMzdKL0ZBVXpJSWFGdERXbTRKQUdwYlIveFdQaUFnZlJuaXNXVkNZRmI1cysvR3l5TldlbFBGYytpQTZkS09XYityQTVnb2hnQU9DRmZJaHpIL1MxaENRU0xhMThXN2NBb203UDkycVRYOVRtVkVSN2d3R2ZGWmdRei8rQkExbitJOFVuZ2lBazlBRlpkeWdnUGNIL3I1SnhJdzN1YVo5MnpQMzdUMmp1Zmx4N2IwbGhrWnlxQ1JlbVBIRS9tQ0hEeUcxdGR5d2dQc2ZLWHhKWENQWjkzTFRYV0liTmRKeDBDZ05EWlFRQUFzSDZKNVFiMk5OZSs3S3I5MHphRERaTG56bWFIYWtNU0NML3hONWJYTHQzOTdnTmpLNEg3eVNNQWQyY0NmWVNYL3NKV0JYSHdhYWV0ajRtS3AzUGQycDZ3WTd4VnkvTm1Gam4xeEtPbXA0YkJwKzkyTU9RZll2UjZ5R1J5Q1VEb1hzazhoTjg0WXN3UkJIZmU3Nzd4Z2NtTW1rOEF5Vlhpem5rQkFPR2xKNWFLaGdRejcvZmdtOTltb3Qwek9RVXdIQWE0YVBkQndtK2NlaXJYZUZEZnV1MFBIUi95QjVsa0FNZ3RBTXdlSC9xTFZnMnRtdXM2Q0M5ZHVQeTlpeGwxRURUZXYvSFdtNzJ5UFlCSlRacFhBSU5oZ091R0h5YThkT0Z5OHdwZWUzMVlDOEYxTitLbWJmRFI3aDBtM0Q2Wld3RGRNQ0F5dm04U0tDMVpGNEU2NUJaQWdHNFkwSlZBcTliOVF4RmlVb05PbmdwdXM3cTZIUUJhQUdwb29ZVmE5S0lHcVAzbDJEbnBQMGkvTWlhVmxSdG5nQ2tBcmFrcFRBR3RxZGJVVlA2M1V3eXdQTkVNQUNnU0F3QTQvNTUyNU4vbjlIVUlrR1J5Y3hZU1FIdGx1RlVESWlWMFRhOGFFQ0hIa2FxNVl3QUFDRzhCRUEzOXFBMk0vbXAvQ1I3SmtlOHNKQUJjYmdlQ05hQ0ZGbnIvS1FKTUhnQ2dVQkFJNE0wVjNJNVdEYTJwVmcxVDZQMm5DUEFyZWY1Uk1RRUFQN2grWmlxYUJiU20wSnBxVGFHbDlwZGhjNjVhdlVKQklJQW9Jemc4RjlBWWtNOWthMEJkaWdzZytGbGs3VjRhVU0wdndBUlZZQU1VQ3dJQllIVTlXbWloMVVzRHF2MEYrTldjLzY2NEFCQnVyNkdHV204dW9QRFpuTGYyellBQWNHSjNsQWhvWndOVUFud2V5VjMzVm5RV0FBQjQ4UmZibzRXQTFsUnJTbWVCZkpiem4rTlpQQWdFQUR5M0JiM1lYNE5BTW5rRFFNQ1lBUEIvdGZhS2dKcWZUNjFBOGJ1SkdBQUEzdDVxeHdBNkI2Q1RPd0FFekFsZ2RYMEx0WmJPQWdUWVdXampnNmtoQUtpdjZIZGZncHdad0E3bUJCQXBRQ01BTXBNV2dRNWpVQURxQXlRb2FrQlRNUUNBSUh4dkM5QnlBQ3FGdjNJbVBRRFFPS00rZ0VxUkNXQ0VRUThBNFBKN2piNmRNb1pDRThBSXN4N0FpY3ZtcTRPSlMvVE1lZ0RnNG5iRGI2Z2tVaXdCME1hMEFIQkNGVUJpcjVIajBFd1BBWWpaT2E3WW9HQUNxSU1GQWFnQ0dCaXl2L2toQU1CcEhRV3NZOHIrVmp5QXpnV3M4OGg5Z2FIenord0lRTFBDZGpIMi9iY3pCQUFJMzM3YXpoc3JNR3AvV3dJQXRxc0NiR0hTL3JhR0FLQmRKNmdZeDZqOTdYa0FZT3NCZSs5ZFljemEzMHhaZUFMZmV1MU9pKzllVWZaKzBlejdXUndDZ09CT0o2N1FMaFBHTDB5MktnQUVXelFwYUJUekYyYmJGWUNtaE14aVl2MTNDSXRCSUFEZzR2U0s1UllxaEFYN1cvY0EwT21nTVlyWGY4Vmcyd01BMkpyOUJpTWxtV1U3MzFXQ0IwQ3dVUU9Cd3B6NmdKMzNKWGdBckY2c2FTQlFrQU9XN0U4UkFMQjZrMllGQzdIM0FWdnZ6QmdDQUFCem1oUEtqNDN3dncxTkFKZzV1cDdXVnJrSWY5M2l2ZWljSVFBQXpyMUxGNGh6Y1dEYW92MkpBc0NxTGcvbVlhZTE0UjhBY3dnQXRGNDRCeGFIZndCc0FTRDRzUVlDazJCMStBZEFIUUlBWVBVbVRRdE9nTjNoSHdEZEF3Q29mMStkUUVac3UzK0E3Z0VBaE9vRXNuSHFHb0w5QlFRQVBLcEx4Qm5ZYXl2NU80aUVBRmJEWG1hNDZLM2VaU1djTmw3N0U0K0VBQUE4c0hrRlFBajRlMGV2VlE3a3VQOHJIL3dnc01QaS9RQVFxZ0ppWUVSL2JlUUVnTVozMVBpeEhMQ2IreHRFYUFnQWdJdlRtaHFPSWR6TXRMK2tBRHFSZ05MUGdXbWUrd2RFaHdBQVdpWXdSSGdiZTFvazZnRUFITDFHeDRFZWUybkJmeGRwRHdDZy92ZzI2UzY0d2FrUFdjLzhqK0tBQUJBMG50YjVBTUtQY0FmL050SkRBQUNzWHB6VzVZRzk1T0N2Z3dzZUFFQ0F2N3RmdWcrU2lIaC9BTTRJQUFnYTFTMGE1Y2YrUFZ3WUFnQUFxK2R1MmxuUmxhR2QvTmkvaHpNQ0FQRFU5TjRLU21Edk5VYk8vTTJMelNOaUp1Vk5QUCszcjk5MnJYUTNxT3o5Z3gvS2RzQWxBUUJ2NG9kL1h5VUpISGlmc1BrZENnTDcyUFA1YXFRRnFLdCtTYmdvQUdEdTRmSkw0TUJucFdaK0E3Z1VCUFo0YXJyc000SUR0UWVjc0wvRHpEWFhTc3NlNllmckJ5V1ZRSE5PK3NIMjQyWU0wS0dFQzRWQ2F6Nkp1QmtEZEFnL1VDdFhidWpVdE5DYWo4L01uSlIyMm9abzZ0Q2ZrMkJSMm5ZR09Ea2ovUmk5WnM1dk42QmYvdUxVL1hVRCt1VTNoSmR1NEtSVHN6N3Y4VXdENnZvdDRJMEcxUHJXOEVBRHpjVkEraW1WRzZjMW9PTStCVWMxc0tneFA0K1pSYmNXakpwNzFQSFRjVVVFVGYzcXl5RXRndVppK1V1WW5FZEtCQ2YzK0d4OHQrc0JKaU5ZeGN3bmJtVldFSnk2Y01UMzFkMHlDYUJEZmVmZE4xdi9VcGJBOWdES0tZQ0l1VzEybkVGNDZjS3BwOHBUMEZsZUFRQUE2anMzM21yS0c0U1hMbHorWGltKzlmMlVYQUFkNmx1bjh5b2h2SVFMcDY2Y0E0Q2dQRi84TGhVUlFKZWc4ZjZOd0szQXpVZzhwalRFSlZ6QTVlYVYxMHBWanhqUC93UDB5bE9vWlFqR0dBQUFBQUJKUlU1RXJrSmdnZz09IiBoZWlnaHQ9IjUxMiIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIvPjwvZz48L2c+PC9tYXNrPjwvZGVmcz48ZyBjbGlwLXBhdGg9InVybCgjNjVlNzcxZTM0YykiPjxnIG1hc2s9InVybCgjNGExMWYwMTI2YikiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDYuNTM3NTk3LCAwLCAwLCA2LjUzNzU5NywgMjAxLjIxMjU0MSwgMjAxLjIxMjQ0MikiPjxpbWFnZSB4PSIwIiB5PSIwIiB3aWR0aD0iNTEyIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQWdBQUFBSUFDQUlBQUFCN0drT3RBQUFBQm1KTFIwUUEvd0QvQVArZ3ZhZVRBQUFnQUVsRVFWUjRuT3k5ZVpBajEzM24rWHN2TTRIRVVmZlo5MDJ5bTAyS0Zpbkpra0pTdERScUd5WE5iRWdiWWUrdXcydFB0TSsyVEs5WG5sZ3B4STNSek5vZXoxZ09hU1NiNFhDRWR1bVlzV2ZrV2R0clM2cVdxTEU1c2p5eVNGRTBSUmJQWnQ5WFZWZlhpU016a1pudjdSOFBsWlhJQzRrRVVBQUt2MDhnUUNBemtYalZyUHA5Mys5NHYwY0FRZnFIK1VMaHlCRExxbXdHSkdMSXRLSUFFQUFnSE5ZNCt6NHpEaDRoSnd4TFdzdzVIK0VTY1Y0VDVyeXEveS9mdnFZT3dtdm4zUWUzM25BS0FFQnNEZ0Q2c1hXbHJGeE15OWV2OEhmUTlEaWhmUHRhem5KbU1Xc3ZjbnZEa0RiV1llN0NoVVEvUFlLMG1aRGZld1RwS3NMUTV5MXBoa3BFbHdHSStFMFZWdjVEZTIwelo2cVhSb1Z4Snd5QUFBa3o0dDJDY0M3TVB3VmljLzNZK2xVckkrUmhqRkJPQUhoTkdQU2N0YzZVMDAvT2QzdkV5TURSWTM4enlLQ3ljSDV1Y2wxS1dYU29RZ2toYTZ4bTZLWEZISmVJbUxrVEVqNVY3eU1JNXdEQTY0VGg0RklxYTFBQWJxTWtJRHRJLy84NUlYM0lmS0Z3YU53YU11VVpJa2xsQllCVTB1ejZUUFdCYTJsaDduZUpyVzhHVGpod0FCNGdDVXZjTGlyV3RWVVpZMGRJZXhtc3Z6R2tXd1JPOE45L1FsY3ZqUUlodlJqQTZRSGNrdkIzRjlYSGFIcWNFSjYydU14NDNreC8rZWx1RHhEcGUvQ3ZEdWtVTmFOdjBtR05WdEo4d0NmNHJlUG9nVDFicG1zWllrcDJycnFadFkwc3hvdVFoT0FmSWRKT0FvMCtFSUlXdisxd3dqa0I0L0RhVnJ5SWJHWllWV0gzUm0wVUF5UW0rRGVKdEFvYS9lNGpLbzQ0Zi8yUWNmQnVLaTFiaTl3dXlaZzJRQnFBZjU5SUVweVkvbkNGVmxSK2ZScU5mcS9nZUFZaWJUQ2FZU0F6bnF0aXpnRHhnMytyU0JNWTU4NlNjZ29zcWdNVlJwOUxoSEkwK2owS0I4NHBzS2tTWGMyd2xJM1ZSSWdIL0x0RkdpUHNQckVvTU1MR05McWNKeHpyZHZvTURsdy9LdHlDVkpYek12QkwzRUlsR0hEd2J4Z0p4Vy8zY2JLL0MrREFnZk9ubWY0WVRjbFp3THp4SUlOL3pJZ1h0UHNEZ2xDQzF3OFpCNWRTbHNTck1pckJ3SUYvMVVnTnRQc0RDeWNjV0UwSk5qV0cwYUhCQWYrOEJ4MjArNGlERXgxNlZKWEgwaHhyaDNZOStIYytvTXdYQ3NlSW5DTmtKa1hZT05wOXBBNUdPWnNxMGJWTVVRRkQ0U3ZERm9hR2RpWDRCejl3aUNuL21rRitvRnRucVFxVVlEMFBFZ3poak1BYiszVU1EZTFXOEM5L1VBaVk4alA4djQvRXdna05uY29xNlF5Z1E3QnJRQk93KzFrNFB6ZXhLUnNhZjdXQ1UzNmtKUmpsYit6WEQ2eEpHY1o1SGpNRWZROGFndDFNNmZFejhwcXFjK25tTUx2L3BvcFJmcVF0Y09EMlRJbXVacGFxdk13eEx0VEhvRG5ZaGN3WENrZXBuQ2QwT3NPcmU0cnE1VEdDLzZPUmRpT0tSekV1MU5lZ1hkaFZHT2ZPa2xKcXZVcWUxNjBQS3htYzhpTTdBTWFGK2hlMERyc0VZZm9CZ09lcjBsSWVwL3pJRGlQaVFzNHZJY3BBWDRCbW91OUIwNC8wRGlnRC9RVWFpejRHVFQvU202QU05QXRvTXZvU05QMUk3eU5rQURTRlM4d2EwL05mZktiYkkwSzhvT0hvTTJwYnNuQTAvVWgvd0FuWGo2d3A5N0tFRVd3dTFHdWcrZWdiUkZFL3NTbGtUT2x1SGhkeklYMEVKOXlleHFCUXo0RkdwQThRcGg4QXJERmR2VEtHcGgvcFUwUlFTSytrS3hMQmRRTzlBSnFTbmtZRWZEamw1bVFGVFQreU94RHJCdkpMc3E3enl3eFhFWGNUTkNnOXlzTDV1Y2tOT2NPNG1qVXc0SVBzUGhqbDN6SzFZMFFHQUd3bTBTM1FyUFFjb20xbldvWFNyUDNBZFJYVHZNaXVoWERPK05OTVB6MEU0N05ZSnRRRjBMajBGcVhIejZ3dXFndEZPRXRWUW1pM2g0TWduWWR3N2NpYXRaclRPYjAzZ29tQkhRVUZvRmNRcGYxYzR1WmtKWE5sREh2NElBTUZCLzc2UVV3TTdEUm9aYnFQYU40NWxvTFJjUU5MKzVGQlJpUUdNQ0swWTZDdDZUTFdSejYyQlBZUG1mbGhKWU5iZENFSVJvUjJFclE0WFVPVWVCSkRJbFZLS01HWUQ0STRpSWpRdm1WbHFFTGxyLzlsdDRlemEwR2owd1hFSG8xWkcwczhFU1FLemhsUE1aNjJzWWRFaDBEVHM5TllIL2xZTWN0dVRabjMzMVF4NW9NZzBZZ2VFdXVyNmJVcVlISzQ3YUFCMmpuRTJxNnNUck02d1JKUEJJbVBTQTQvbktWVG95YTZBbTBFQldDSGNDYit1TFlMUVpKQXVJV3VRTHRCUzlSeGNPS1BJTzFDdUFJUFplazB1Z0x0QUFXZ3M1UWVQNk1YMWNVTXdZay9nclFGa1JXZ0d5cFVaZVd2LzZMYncrbHYwQ1IxQ3RIU1p5VEQ4dnR3WlMrQ3RCbEdPY2cyVDJHQlVFdGdSS0lqbEI0L2Mzb0lMbkZyMGtobkxvK2o5VWVROWtJWklhYkVjMVc2cmxvZitWaTNoOU92b0dGcU02S3Z3MmlHNWZmaXhCOUJPZzduYkJYWUdtZllVem9CYUo3YXhueWhjR1NJa2FwMDJlRFkxd0ZCZGd3Ty9Ha2JpMFNUZ0VhcVBjd1hDak5FV3VMMmgvYmE4dDA4VHZ3UlpFY2gzSm91MFhXVjZCSzJqb2dQMnFrMllKdzdlM2RkZWJuQ2NPS1BJRjBFdzBITmd0YXFWVXFQbjVFMzBrUm0yTlVIUWJvT2hvT2FBZzFXUzVqLzdPTXNXeldueTVuTDQ5MGVDNElnQUlEaG9DWkFBVWlJS1BNZkk5S1lSREhzZ3lDOUJvYUQ0b0RyQUpKZ25EdjdjSlplNHRZNFFldVBJTDBJSVhTY1NKZTRkU1F2TFp5ZjYvWndlaFEwWGsxamZlUmpYTFhacUk3VlBnalM0M0RDWHorZ3oycWdEbW00eDZRZnRGOU5JQlo1alFNZEI0cHQzUkNrWDlDT3JpcExPYW1rWUVyQUF3cEFYQmJPejBuTDlFckp4bHBQQk9rN1JFcGdGUmkya25hRGhxd3hZb2x2UnFhbFVmTEFEWlZ3QXBrcWFLbHVqd3RCa0NZUXJhU1A1Q1Y3aXVGZTh3S01ZelRtR0pHdkZPbWVqSDF5V1NLcXVXMzlNOVh0WndSQmVodkt5Rms1WTAreHZTVmluRHZiN2VIMEJPZ0JSQ0ZxUGRNVTluT1paQzBBQUMyMWJmSEZhMGNNMENkQWtONkhjR3U2eEMxcWpSaVlGa1lQSUpTRjgzTkg4dElsYnUwSHBXYjlvWDYrTDR5KzV3aUNJTDBNSi9MU2tEVmlLRXM1N0NPTkhrQXdDK2ZuaGlxMG1HVVAzRkNKYWtMR0JFMkorb0RqRGFBcmdDRDlBT2NNQ09FVUJubGJNUlNBQUl4elo4dEFiNmZweVJzcWpGVnFwcitoQm9CUEJsQU1FS1NIWVpTdk1iYks3WUV0RGNJUWtKZlM0MmM0NVRsZ0owc014aW9BQUprdER5QmoxdDZHNFFrQmVRSkVDSUwwRXBTUk1Vb3ZNMnVHU1BPRlFyZUgwd1ZRQU9xd1B2SXhaUzF0WlN6WmRQM0x1RDBBeHc5b0tBT1pxcmRlQ0VHUUhvTXljbGJLTEhGN01EdEdZQWlvUnEyNW04TEhMWVZNYUtIWE9YNkFJd1pob2FHd2VpRUVRWG9NMFRGQ3BQMEdhb2tBZWdBMWpsTDVFcmUyclgvYUNyN09tZmk3clgrZ04rQzMvcmh1QUVGNkVzTEp5UnRxTWN2MkZnZHJpUUFLQUFDQTlkR1BqNmY1aDVVTTJWdUV0QVZwQ3d3NVZBTWNQSFkvTENqazJIMlBFaUFJMGp0d2N2SjZKcGN5THhjSEtDNGlkM3NBWFdhK1VEaEc1VldsT2w1TmtUMmIyeWZjR2lCZUdDSC9WazVtMkI4ZDhsNFpwQVFZRjBLUTNvQUQvNXZiMHBFaDF1MkI3QndEN1FFc25KODd1dGU4eEt4eEswWDJiSHFuL001YnR4aEV1QVZ4NmtRaEtEZUFJRWkzRVh0SnpoRHBTbkdBck9JQU9Uc2VuS1ZlcDRiWGVTa0ZBS0Z6ZkRlT054RGhFMEJRcmpqMFN1d2tnU0JkeHJIK1M5d2VxQVVCQTZSMWJveHpaL2N5czVobEoyK292SlNxbVhJUi9ZK2U2VHRubzVNRU1WZU5BZWFFRWFUTERLejFoOEgwQUl4elo0bkV1RTNsVE5VN2tmZkUvYUZSQXNCOVdSZ05DMFlCTzBrZ1NIY1laT3NQQStnQkxKeWZLeXU4WnYzQlo3ZzljZi9BVS82RDBSbUNPTVZDV0NPRUlEdk9nRnQvR0RRQldEZy9OeVNadDZsU20vc0xHa1o3b0ZFZTJITThRZ1lpRmhLN2E0UUFRME1JMGxuUStzTkFDWUN3L2tWYk9ablozRGJvTVN0OElKNFN1RlBFZmhyMmtBQ3NDMEtRblFDdHYyQlFjZ0FMNStlRzVlcW1sVHFaMlF5OXFHSGMzMzlCV0hxZ1lXNGdaaWNKekFvZ1NMdEI2Kzh3RUI2QVkvMVBEYTlIWGVjMzdsQS96ZmNFZWR4dVJNU3RJTWhYaVBZREFORDZJMGduUU92dlp2ZDdBSFhXbjNCeGtGY2xrcko1VldyOCtUaUYvKzZZVDRSRDREbmxiaUlVNWdvNEVTRVVBd1JwR2JUK0huYTVCekJmS01oR3NQVUhBSkt5blJlaHQ0aVpCQmJHUGV5YXdNU0FzMUlzQXJUK0NOSW0wUHI3MmMwQ01GOG96STZZbDI4cmJ1c1BMbk12UEFEaENrU0pnYk5NRE1KTGZScW1rVDAxUlE3dVRXYkNOcHpCWnFJSTBocG8vUVBadFFJZ3JQL2lodkxqYjl1QWxNdmdLcmJ6N05qNmlCY0E5Zlk2NXVLQXNOd0FoSGdERU04VlFCQ2tlZEQ2aDdFN2N3Q2gxaDhBVEFrVUcwd0pBR292bkxmaGhHWUxJcXA5WXRZVStZKzcrd2pWSGNkOEFJSTBEVnIvQ0hhbkIzQjhSZysyL3VEeUFEeldYd2xPQXpoaG91QnZjaXg0V01sUXhNcUFzT1B1YkxBN0hPUjNBdEF0UUpCSTBQcEhFNk1NcHQ5Z2YvUUFWS1dIWnF1UXJRTGx3TUs5SEluWG5zVUxSa0d4dDU4QkFJQkkzSG5oUE1CMkNhZTgxVDNjcGlBenNDbWtyZTBMeEZueDdEa1ZjVnhoZFFzRnJQci9UWXFOVGdDQ05BU3RmME4ybXdlZ2ZlbTBYVmJHajIxQWRtdDJMRFB2SXd5UEV4RGtFMFE1QkExM0VHdktGWWp1SUlScFlRU0pCSzEvSEhhVkIyQjk1R05VdGF4UlE3NlhqYnFPOHUySDN6OXczQUx4M01naHFKdTVnMnZLTHg2Qlo1dHlCV0RMSWZEZ3hMTFFEMENRZXRENngyVDNlQUNseDgrd1ErdGtZU1pkVWdDMm92ek9JNHlHbm9HVEtvRFFQRUZvNVdoWVU2Q21YSUhBZkVEdGxLdHRIUG9CQ0FJQWFQMmJZWmRVQVMyY241dk5sVlJEeXU3eE5YdHd6TGZuWURSV2lEU0dWdzAxV0YwY2Y0VndzdW9nekFvZ0NGci9KdGtOSHNCOG9TRGIrbUk1SDJEOUlXVGEzdEE1Y0h3Q2oyZmdkZ2pxY1JhVWVVKzR5NFE4QkU3NUk2cURvTDZCUk8wNHp2MFJCQUN0Zi9Qc0JnRTRQcU5mdnA0K05YdlhHL2FKRHY0NFJGd3NNN0NvTjBEa0xpU3QvNGludzBRTmR6Mm9mM1ZZNE5MaTZLVmtnakFaUUQxQUJoSzAvZ25vK3hDUTlnY1BGVzlrSjBHQ3lSS0FLMFFUTmxWdkdQeUp1RXlJZ1RzNjVQbTZMUnhYd0JzUmNyeUJtT3ZDSXJySWhYV093MWdRTW5pZzlVOUdmd3VBOXFYVGxCRW1RMXFMOFlNazB3UFBCVUlEd0pja0NNb05oTW9BUkpwN3FFOFlSRFFpYmFnRUNESUFvUFZQVEw4S3dIeWhjR2pjR3Q5YkdqMVlUQnNVQUVDMVFBL2ZtZDJQUncrYVZRSUljZ2dnUUFsQ2s4UFJ6YVVidWdMb0J5QUlXdi9XNk5jY3dKRWhkbTFWSGpKVXIvVlhMVkN0Mmd2UHN3ZkgranV0SUtMVEJ2NVRUbUxBa3lHb2w1Ymd4QURBZGtvZ1RoSTRMQ2VjTVd1UDdlT3V2WVV4SDREc2F0RDZ0MGhmZWdBTDUrZnlUTnRqS3NySnhRRGpyc3ZiQngyZlFDaUUremtNdC9rT2N3dmllQU14WFlGbVc4VmhQZ0JCQUFDdGZ6dm9Qd0dZTHhTTzdqV3RkT3JVMFp2QlUzdUJXd1k4QngxZklVSU00c2lBNTFSZ1JDams0OEhMQlNLQ1FqR3Z4SHdBTWhpZzlXOEwvUmNDT3Y3QVdtMlBsd2pyRDBGaEgwY1NuRENSNTZBYmQ3UW5JalRrUGg2NGJnRHFkaUFRaEM0WDhNZDVERG5nZU5ocVlmSHNEZ2U1clQrR2c1RGRBbHIvZHRGbkhrRDU4dytYU3RMVWpBWlZDbERmalRsc1V0d1FUMmdvMENkSUVCZHFyeXNRYzdVd2hHOHNnMDRBc2l0QTY5OUcrc2tETU02ZGxZdXBmTjRHd2dCY0xmZzl5NllhN3M3b3daTXVkZ0pFYnZ3T2dSOS9pdGkvaWhnU3VRTCtSV0dCUDExWTF5REg5S01UZ1BRNWFQM2JTOThJd0h5aHNEeFVnbXZqR2FYZXZuczhBTThlN2dsVXdSMGdpaTRpOHN0QVlLV1FmeFh4RmxFcmg4UDJsbkhqdVRKaVMyRUU2WC9RK3JlZHZoR0F3L2R0dnZUR2lQS2hOMk8xVWdDWDBRU2ZLdmd2OXVQT0RRVDZCSUw0TXVDNUFCcTVBaEdWb1A2bUVXN0MvQUFzREVYNkdiVCtuYUEvY2dEbHp6OWNMTW9qRTJZNlpiVDUxaEhCZEQvUkphU0J1UUZQbVZENDJhaG1vakdyZ0FJYmlQckJ1aUNrMzBEcjN5RjZYUURtQzRXUlVkaDdjSDE2dHB6SjZ5Umw4YW9jL1F3QXpvdm1pSkFCeHlGb3VKakFMd1BSeWVHZzdoRjFNdUNYcURoSDNEdEt1bVZnMEt3LzRSd0FPSEFLeEs1dDVxTWZXd2NBcGF3QXdNVzBEQURYci9CMzBQUTRrUUJnbGR2Zlo4YkJJd1FBVGhnV0FKZzVFd0RVUzZQaTQxd2lXL2NHQWdDODEvK0kraDIwL3AyakQwSkFHK3RRTG82NXJUOEFPTTl1NnkrdUQ3eXN3WGM0a1NKUHpzREJuUlZ3YTRBZmYvekhjOFFmRG5KZEVOQlQycjh3MkozOWRoK0JvSHlBeHduWXJVMURDZWVFYytDTWNzNlpkblQxdFlQYU4rM0tLbVBBZ1JNQXhvV2h0bk5WV2xLSVJaakVpcFRrYlZZcDg1RlIrRDR6cEsvOXVmUzFQLzgrTTBaR29WTG1lWnNWS1dFU0l4YWhKY1hPVlVGWWU4NEJBTVFUQjU2eXJKbWlkblNWYzhZbzU4Q0I4QzcrUyt3eTBQcDNsRjZmdkx6NmErOGRuZFJuajYwUXM3Rld1V1hBL2RidEZqUjJEdHpXTmpvMDFLdzNFT0VLK1B5R3h2M2pBdXRmWTNZUDNRVitBT0djQTZkZ0hGNzd1NHZxTzJoNmpGQmhuVm5PTEdidFJXNXZHTkxHT25UYWFoam56dHFLVFNzS01XUmFWZ2dod0tHU1p0ZG5xaWNNUzFyTWNZa1FEZ1FkaGVaQjY5OXBldnFYc3ZUNEdmbmdHcy9ZYXI3Y3h0djZRMGJCdUh0elJ1Y0pJdFlOUkVlRUdxMFZpTlZDTHM2UlhaRU00TUNGeGI5cVpRNHVwYkpWYXVlcWk5d3V5ZGExVmJtbkRNVEMrYmx4aTZVMWFVaWo2eHA5bmxVQjRQMG45UFRWTVJTRG1LRDEzd0Y2OXhkeDRmemM3TmlHV2t6bEhyMEc0SXFFdU0yeDJ5N0h5T1VHdWdpeDNBSkJUSWZBVDRRcjBLaDlrSGNBaWZNQkVMNlhaTTlDT0NOQWJHN1BsdWxxaHBpU25hOXVabTBqYTYwejVmU1Q4OTBlWHl6bUN3VUFtTXpiTTFTYUpaSlVUbTFJVm41Q2x4WnpRQWdobUVVSUFLMy96dEM3djNtTHYvV3VlN2NtVHYzSVcyUkk5NXArZDFqY0U3SHh2RzVtZVhBREpRZ0xEWG1TQVJGcmlTT09SR2FHd2FNRWNmckVoVzBwM0EvTmdqamhuQUNiS3RHMURLbFNwbG9nTVo0MzAxOSt1dHREYXcrdi9jU1BYU25TUjlQU2hLVlUwdno2VFBXQmEya2doUFR3MytOT2d0Wi94K2pSWHpqdER4NnFXaVEvb2xFMVJ0MW5tQ1RFMWdOM3RxQ0JUeEFkRjJvbEt4Q3VBYkh5QVlGYkNIam83V1FBQnc2Y3YzN0lPSGczcFFJRG1mRmNkZGNZZlRmQ0p3Q0F1UXNYRnM3UFRhNUxLWk5hRlhpZVZjOVNkY0NWQUszL1R0S0x2MmVseDgvSWgxZDRtcXNURzIyNFhhQWVRS040RGdCRStBUnhFc1V4WFlIRWZvRC9xeHZLUUE4NkFZUXpVa3ZrUGtaVGNoYXFDcnMzYXZkTGVLZU56QmNLeDRpY0E1SWlaR0NWQUszL0R0Tnp2MTd6aGNMcCt6ZkdXVHIzbmtzZCtRS1B1d0RCRnR6dkU0VGVLdVFPQUxDOWhEaXhERVNzRklzejYrL2hvaUFPWEQrNnB0L01QNmRaQURDWnQrK1ZKUHliaHdGV0FyVCtPMC9QL1ZhOStlcy8rdGJyWXovKzhVdGtTTy9zTi9tVkFLTGNndVRlUVB0Y2dTWjJsMnlZRC9Dek16SkFPQ1B3eG41OS95WlZpWDJKV2RkV2E4UER2M2tQQVVwQXlXNnRJRUxyM3hWNjY1ZXA5UGlaOG1oeGFuK0pERmRBWVdEU3VNOEEyMjhURUpoRjhObk5xQXlCdjBMSlRaZ3JrS2c2eUpzUUJ2RG1Bd0ovUURlQnNhQU9tMzRPM0o0cDBiVk1VUUZENFN2RDFnREdlWkpSVXdKQ1psS0VqV3ZTVW42WE9RUm8vYnRGYi8wYUdmL3VFZlBtV0Yzd3g3SHBZUzg4Umo5TUpPS09JRmJ0ZitPbFpJSEVjUVZpeElLMnhoQ1pEMmg0WktmeUFaeHdZUHhwcGorbXlxTXB6dk83TTYrN014am56cEpTU3FQa3hwaDkvMDJWc3Q3NiswMEdXdjh1MGtPL1FOb2ZQQ1NCTFk5VkNHVUFVRGV2ajNqaHZCVkVpRVN6ZXRBb3hOKzRiTlJQekVaeXp0dVlzYUNHK1lCdUpBTnFVLzdWekZLVmx6bS94QzM4ODI0TEMrZm5KalpsUTROWEsrWlpxaEpLK25jbEFWci83dElydnpmR3ViUGsvcnQyemxabjEycUhJdUk4NExQK0RTK0RTRldJR2xtc2RIRndSQ2prSThHdVFJc2FFRGJDNkZKUjZNZzJ3c0wwazFJS0FIREszeUZFWENoUHlGU0dWL2VXMUN0amZaY2VRT3ZmZFhybE44Yjh6VWZabFluVWgxOFBudFEzalBzM2xBb0lFUU1JQ1NWNWlBenhOOGdQeDNjRm10UUFpRjRnRnI4cTFPMEh0R2I5R2VWdjdOZkg3dEVwZ3FaL2h5Zzlma1plVTRsTklXUDJVWG9Bclg4djBCTy9LOXFYVHN1Y1M1TmxrcmFDcmJtZmhxY2l0Q0hzR29ER0RnRUVHMVpQNDduZ1QzbG9oeCt3OWUydCtRSHRjQUtFNmMrdVNLOXZXaU9qOE43L2hIL1NPNHBJRHdBQXoxZDdYd2JRK3ZjSTNXOEh2WEIrVGpNVWk1QnQ2dzlROXd5d2JaVGQwL2JvVTU0N2dNdTQrOFhEN3k1RUVMUXpsM3ZSZ1BkNnAxREhnMmZqeWRvZ2JlLyt3NExBUGNVQXdMK2JXSFJocTM4WVRxY2cvMTZTOFdDVXYzWlFXeG15SmpibE85UUNnSTMxWkhkQ2twUCs4dE9wcjN5TjU2dWtsTEtIRGUzb0t1L1ZydFJvL1h1SDdrOFRSTStmQjkrLzBOanl4aWZDb0VmN0JGQ2ZSZzUwQ09KMW1HZ2lLK0IzQXVwYndyVWFDd283NHFGNVAwRE0raWMzWkU0QXl6cDdoOUxqWjFZWDFZVWluS1VxSWQyZjVMbEI2OTlUZEZrQXlwOS8yS0tRSDlIb2tOYlpid3FiMnNlTUVVVVFIaEVLemdwQVVPUFNodUdnUUEySUNBUTF0UGdOUzBJanJiOUk4K3FWZEVVaWFQcDdFSkVpQm9CTDNQcXdrdW1SZ2xHMC9yMUdOMzh0NWd1Rmh4NjdPejV1WmcrdWR1SHI0emdIRGIwQkQzRmNnYkFyRzZhRm0vVURBcjhsVHNPNHVyYytHU0JjTzdLbTNNc1NtMkNhdDhlWkx4U09VbGxWU1duR2V1QzYydDNFQUZyL0hxU2I3dUh4QjlaZWZuNDZPMTVLZmd2WmJueE5HTzZBVDJCNXFITlp3NHkwTUtPZTREc0FoR1VGSUR3bDRObG1NazQrd0VVVHlRRC9CWUg5SWVwaGxIL1QwbFlYVlhPeWt2cksxOUQ2OXpoekZ5NDg4UFd2bG1hc3lRMjVORnJ0WW1JQXJYOXYwclVaUWVueE0rV3h6YWw5WlRJUklnQ3lEWmJVNE5seldYdUpVelVVUmtOWElDd2wwUFpZa1A4cm90K0doSU00OE5jUDZ2a2xXZGY1WllaTHV2b1BVUzFLTlpscThnNG5CdEQ2OXl4ZEV3RGpOeDgxN3c3blBuQ3g5cjZoY1kvUWdMQTdKTk9HaG5ZL3VtWTB4TEtIcmhjRFgwcWdaUTFvWW5HQVAxWGdFd0N1Sy9aMDZWNHhKU24wM2dpRysvc2I2eU1mSzJiWnJTbnpnUnZxeml3Y1ErdmZ5M1JIQUxRdm5aWTRsek1tR2ErRVhwUWd2Qk5tNkJNb1FaeFMwUWhYSUVnR0dtU0dQY1JzR1JUSEQ0alRLTUtOU3dONFJkNUltYy9xOXBFaGR2TFB2aGt3VHFUZldEZy9ON2toc3dwTVY2Vk91d0pvL1h1Y0x1UUE1Z3VGbFZYRkpvU01WMnBXWHJZREhna0l1NCt3KzBJREFPcWV3L0N2TS9EWStyQWxCWUtnTFdoRU1pQWdKWkMyWXFVRUd1WUR3aFlIQkhhOWRyLzFmSHZHQkUzaHVtSU5HenhuM2pNSUFGd3A5bFkxSVpLWTAwL096LzdKWHhjTi9qVFRyWmtpZEN3cmdOYS85Mm04SzFiYk9YemY1a3ZmbXkzOHpDdXhESEhyK08vdjZBRkFZN2ZBdjFBZ2ZzR29NS3crVnlCNHpiQi9rdTRQQkxuWEJ6aXZaYmJ0QjJ3ZHJNc0dnOC9FKy9XbS90dVpvWHpMMGg1YVY2WkhxL2YvR1daNmR5R1h1SFZraUYxWmtTOWJXaWZxUk5INjl3VTdIUUphT0QrWG4xaVptYTJvKysvdDhGZDdTWllxYU5pR0tDd3JVQitIYVNJYzVFOEpKTXNIeEV3R3JHVzFJMnVsdStwNlVjWms3NjVIMUltT1psaCtieVZ6WmF4ZFhVWFIrdmNMT3kwQVMvLzYzY3VMWXc5KzZLV09UL3pqNDg4a3g2ZGhwemszVFMwV2M5TnNQaUJtTXNDWEcrQjNocCsydGRORE1ENnI1Ny80VE1DUGdPeEdTbytmMFl2cVlvYTBaYTBBV3Y4K1lrY0R1OGE1c3huSk92WEk1UjZ5L2dEZWJFSE13RlNnclk5dUtGUWY2M2VTQWQ2c1FFVFhvTzB2aWs1Z3hFc0cxTC9WTXZhOTRjb3hJaThVQWEzL1FKSC80ak9MR1RLNUlWZlNqUE9XT3JLZzllOHZkdFFETVAvVk85ajFzZFRjcTQzTnE0aHJOL3ZjTGh3bklGbGNDRUxrQVVLcmd4cGVVeU9zTmpReUVCU3djNERIRjdrNi92cEJmWmFicW1LaDZSOWtuQ0xSa3pmVUJPRWd0UDU5eHc0SndIeWhjR2pjbWptOE1YWmlqWTZGcmZ4cXpaUzNYUnVhWFdqbTM1QUFJdGNLK0NKQzNtdmN0SEZ4UVAyM3MrdmoyckJSNFJMVytDTUFzSEIrYnFoQ2kxblc3RUlCdFA3OXlNNEpBQUM4LzRTZSs5RHIyMGZEekxSenBGa2lESDJMTWhCTmRGRlF4TExob0wxbEdsN1Rob1R3MW0wMVNwU1NRdS9sbGIvK2krQVJJb09IV0NpUTFXbldvREZUQW1qOSs1UWRFb0JYUHZIZW1UM2w4U1BySkdjRVQ4d1RtUHVZdE1VdGFLcFl5S01IMEZ3c2FEc3pITGlBSzJsQzJCTUlJZ296bC9NOFpWa0t4N0FQNHNmNjZNZUJBd0J2dUZnTXJYLy9za05KNEJOdlc4NWsyYmIxRjhocys5RTV4TTJkcnhEZkxwN2pmNitUdEhDeXhCRjRkcDV4dXdJT0lTdkY2dXFDbkdVRTdyUnd6QVZpdmlQdWxRRkVZZC80NGNneXMwbFZSdXVQQkNKLzdTOUFLRUJrV2hpdGYxK3pFd0tnL2NGRG9MRHNucTF0b2pwdDhTUHdTSTRUYVBLSVJPakg3VzAvQUNJcmhmeDdHa05RZFZENDVtTGJwVUgrRUZEZ0FqSHZVSU5YQ0FNQXV6aTlzcGc5UHFPL3RKakNkcDVJQlBMWC94SUF1R3BiTThYQUM5RDY5enNkRHdITkZ3b1B2K2ZPeExpdEhyN2I2ZTlLU0NkeUE0SDcyZ09FTGhhRGdGVUNkYWNDOXgyTFh4UzBkWVM5TkF2REJpK3JHUFJIWW1LY08xdXVLcmVIdUtjMENLMy9McURqSHNEeEI5WmUrdTRlZFhZdHlZY2wxdHdqR1k1RDBLdzM0SGwyRTVFRENGd2w0TnRMb0c1eGdMdWxoSU9vQ3dyRTN5bElzUUhBdkR2RVowcXdtVWJyajhRbi9lV25idzl4YVpsKzA5S2M3UVRRK3U4T091c0JMSnlmRzVwYVByQ3ZTUFkxRW9BSTgyMVRrRmlzNThEUE5rdXpEa0g4TXFIbS9RQnd1d0orUHlCT2x3ang0MVRsVnpkSDkxSWpwMGtZOWtFU01GOG9DSFAvWVNWREdLRDEzeDEwMWdPWW1sMHJMaytSbVkzZzA1N0p1ekRXN21mbnNwalAvbzhuY0JFQ0hZS282Mk4wR1BXSGcveHBZUWp3QStvQ1FmNkVRWndWd2pLRHF2eU5INDdJUnZVMlM2UDFSNUl4ZCtIQ0VyZG5pUFF0VTBQcnYydm9vQWV3Y0g1dTZzRHkxRVQ5OU45dmhjTW03KzBpMEVXSTZSazBXeXJha01ERlluNWFYQ1BtVGdaVVV0LzQ0Y2pzaUxtNG9lQ2ZLOUlpWWtHUEFIK2RkZ0VkRklCYTM3Y2YrMGVRbWRmNFJnUnRPazBDSllpL2VpRG1jb0hvSHFMK0htMyt0bkhSaXdNY0FaalF2dkdYUjlENkl3Z1NTTHYzMGQxaTRmeGNiclI4K09naW1TZ0Q1UUFBTnEyOWNEL3ZQTTczaXZFNGo0aFY3K0lqakVERG51bTFLeW13SUowd0tVZ2NBRURpVVIya25kRFRsamdSaVhtZEFOZloybHUzT0VrY0RBV21LNnQzc3BtOGVmMVdEcTAvZ2lCK09yVWh6TmpVeHZMTnllbjdid05zVGJxN010K1B3SjAyOE9RaEFuRXZIWWoyQnNLMkdmQVgvOFQyQTRRSDRGMG01a2tJdXpBbURMbWlqTytwVFA3TEYwSi9JZ1JCQnB1T0pJSG5Dd1dUV2NjZXZBRTVBeUN5d2llYXNPck1CRldiRWJoTmY4TjBzV1AzbzJOQmp0MFBDd1FGN2lyanhsZjZHUkFGOHF3UTNzb0pHeGxPYmJBVW9ML2c2cnlFSUFoU1QwY0U0UEI5bTY4K1A1Nms5aitpYlVQRDV4WlZ3Vk5IRkNFRE1jdUVuRDBHWXJhT0NOeENJR2hYNFJyK2JRUEVKOUtNV3NBa3lQekt5MDdNazdnQUFDQUFTVVJCVkEyK0YwR1F3YVlqSWFEaGljcVpqMjdXcHYraDN4emVvTTE5cEZuODJnQVFGYTd4NHpnRVFnUENna0llbFFvak9pZnNieEhoY1FWOGUwbDYvUUIzSUVpWGpUU2pOakNKWjM1bElXcFVDSUlnbmFnQzByNTBXaDdSNUpRSm8xcHpuK3hFZzZCMjdSQVFrUnVJYzl1STZxQTRhOFNDNm9LOEZ3QVlSS0lXTU1venY0cldIMEdReHJRL0JDUm5EV3NqRTJEOUEwTTBuVzRJMm5vcjBEZ1JvWVpaZ1lpVVFPQWFzYkNlY1JHa21FeHNKZ05hZndSQll0Sm1BU2gvL21FdU1YVnFNK0JjWUxCK0ozRXJqVHZFRkQwU3Q5MFBrNEU0V1lHR3ZZUDhpd1BjUkNRREFIamVYRmxXSlpsaDNCOUJrUGkwV1FEa25HR3U1YmFuLzRIei9hN2oxZ0JvWnJtdjR3MkUzVGI2aHRHbFFjTGloMmxBVUZGUTdWV3UrczJ2SEY5ZFMyUE5ENElnVGRGT0FTaC8vbUZRN015TWEvcnZUc1AySUI2ZkFDS244T0F5L1JHdVFQUk5HallPY3VjQUd2a0I0c2lyZjMvcTZLbk5TNitNQjQ4WlFSQWtoSFpXQWNrNXcxclBwazdlMlhyZnN0RnZkZ0ZCZ3Q2ZmdzQWtRZlFYaGRVSU5hd09hdWdIK0hlVWRQQWxBMTU5OWZEd2NIbHpjMlR1QXU3bmppQkljN1ROQXpET25TVlZxVGI5VHhicWFiMi9mNHQzaU44SHRDbFhJT0Jzakh3QWhPd2NJRWhidkNxYjN6dThkM2h6Y3pOMytrbTAvZ2lDTkUzYkJJRHUyK0QvdUorTWw1dGVmdFhpZGk1dHY3OG5ReEJOUkZZZ2VpbERuSHhBMk51MEJZWmNlWGtmVEJkenkxbTAvZ2lDSktOdEFrREdLc3E3cnNlMS9oMDErdTM2MG1hekFvRjNpTllBQ1BjRElxYi9BSlhWdkx4L3pTeXIyTjhmUVpERXRHY2htUGFsMDhwRVNjb1prS3RHWGRkci9lRGF2aXRBNEEwYnJoR0xJR2lCbUw0eVFtWFRxcVJ5di81UzNJRWhDSUw0YUk4SElHV3E1a28rMVBwM1piNGZoNWlqYWlvMzRMOWhmRC9BZzJkVnNFa0JnRE5xTW1DV2d0WWZRWkFXYVlNQWlQUnZlcUlVY0s1RnV5L3hKaDdKdnlXZVBzVlpOeENXRW9pWkQvRGdXUm1nTUZIMHFaVlZYUENGSUVqcnRFRUE2TDROOW9NRFpMcFlkelNCNlcvUnByY3VDUTNIM05BVmlFZ0pKUFlESEV4YS9zR2hQUk5yeTllbm9pNURFQVNKUjZzN2dzMFhDaE43Uy9sVHkyU3NzblZMMXNSdVh4SUhDclZIMjZHdVI4U0dYOTVQeGRnZ1REZ0IwUnVFK1c4aVBpaXo0QTlTSHBvUGtEaVlWRjhlbG9aMHVqUzgvL2UvMWVCSFFCQUVpVUdyZHZmd2lZM3ZQejlGWmpZQW1wbjF0eDYzYVpabXY3RXBWeUQrVFpMNkFVeFBGeXVVcDFqK2k4OUVmU09DSUVoc1doV0FvWEh0ek53TnlGVmptZjZkdC91dGpDRk9SS2pocGdYTmFnQUUxQVh4MWV3M3YzSjhiVG1EblQ0UkJHa2pMUW1BY2U3czdMU1duaWcxdHY1ZHQvdCtZaXBCbkIwaVk2NFZDUHlVOTVUUENUQ3ArYjNERHg4dllyY2ZCRUhhUzBzQ1FBK3VzUjhjSkhzMm9pNUtiUHJqYndYY1l0T2htRElRTWM2RzFVRmhHaEI4dzdxaW9NcWRVVGh4ZDZxU25idHdvY0VnRVFSQm1pRzVBTXdYQ212Y2x0OTNKZlNLWktiZjM2czViRXN2enpPMHBnb05SeHQvbCtDd2ovcy9GZmFSTFErQUZUTVdCU3ZOY01VdmdpQnRKN2tBSEQ2eDhmeXpNelJ3NzVlbVRML0hhdnR0ZW53TmlGQ0ZtTVNSZ1lnZkpIck5jTE4rZ0VsZmUrNkVWc3JnbWk4RVFUcEJjZ0dvcFgrejlhdC9FNWorQlBQNndPZW03aE5OS3hvUS9SWE4rQUdWTzZON2ppemV1elVSTlJnRVFaQ2tKQlNBK1VJaFBXeDRWLzgyTlAxK2t3MGhzMzVvY3VidXY3bi96azN0L3hXdFpIRzJDSTc0ckIvUFJ5eUpyZVV0aWF1eWhjMCtFUVRwRUFrRjRQQ0pqZWUvZFlpTWwydnZZMDc4L1dGOVFWdHl1WUU0OTB5V0oyZ29BeEZmR3Q4UDhGOHZnai9GTEFaL0VBVHBIQWtGb0JiL1NWdU5UWC9FeEJ3NlkvUUR4eEFSS1dwSU1nMEk4d01DK3dYVlg0L0JId1JCZG9Ba0FqQmZLS1JIalBSRUtmbXNmMmZzZmlBZW55RG1rQ0owcmxrL0lQcDZBQXorSUFpeU15UVJnTU1uTnA1LytwQzMrNXVId0VoTEFydnYzK1V4N05FVXdpZG8xaHRJb0FITkxnN1FGQXorSUFpeU15VFpGSDVvWERzenR3bXA4TmFWaVdzeFcrb2RYZi9aT0p1OVJGY1FCWDhMQnp1b2xWdmdCdkdlbThmNGxBaiszTGt5MjNqd0NJSWdyZEcwQjdCd2ZtNWt4bGYvSS9DVTk4U05zSGRtVytDbWJ1c2ZlZFNkTytVSHNPVmhoVElNL2lBSXNqTTBMUUJqa3h2WFh6NGNIUDl4MjMwbjd4ckdUbTRUMXRSM3hTa1RDa3NKSktzTGttcnJJYXp2SENIcnVPd0xRWkFkb3VrUWtEcWtIWnZhcUl2L3hBeWVPSFJ4YjBqbnE4TUNSUDZnVU5UZGdzSkIwYkVnUHpZVm8rSkxJOGF4MWZRbDdQaUdJTWdPMFp3SHNIQitUaG5TdlBFZlQ4QW51djY5UjNZR2JxclZjOVJQMUl3ZkVIZ3JjYkd1dlByaVVjMVNzT2NQZ2lBN1JuTUNNRGExY2YybEkzWHRQK091cUVwcStqdFVCUlJuVkRFTGhPSnJRTGhMb2Q4ZTNYdjg5dkxpV0lNQkl3aUN0SS9tUWtEcWtIWnNlblBiNU1XWkpqZTlNM0JTRnlGQkZaRDdnOUZ4bStnWVYveFlVT0JOMWpQU2tKWXBaakQzaXlESVR0S0VCekJmS05peWxoN2JTdi9HYVhvVGQ0ZklEaFFDTlh2UHNDdWRoSFowZ1ZBTGZrRGx6aWlZRXU3MmhTRElEdE9FQUJ3NnR2bjhOdy9YNGovT1REWnc0aC9UN081WUlWQlRNaEJCdzlLZ21EZDAzWWV2NXVTMGFaYlVXTU5ERUFScEgwMEl3TkNZOFlHenQwRGlEY0xpOFUzL0RoTlRieUpjZ1lhbFFVM2xoQzBLTnExODd3aVUwbGo2aVNESXp0TkVEbURQc1hVS0JDQjhoVmNjMjlvTFJBVDkzZGNFUnZDZEZ5M21BMlFHRm1YTHcvYUJkYmlCdVY4RVFicEFYQS9BT0hlVzJvU09sUUJDWWlEUnhqMTVvUTZQOVVoeTUwWkRTdXdLeEJ5UFRWOTc3b1JXVGVXLytFeXM2eEVFUWRwS1hBSGdlNHJXZDQvQW1KYlErc2NubVdWUExBbHhaTUJQdy9Jbi93Qjg5K0czeGc0ZVdNS2V6d2lDZEl1NElTQTZyTnQ3U2swME40NXp0dTdLUkxQNE9EY003TjNtdlRneUtCUy9vTFBodHpqM3NhajU3TUhNdmcwcy9VUVFwRnZFRm9BRGE3TGZSRWZZOTdoVk4rMjIreEZmMFZBSndybzRoSjJLN29FUm1ReGdpNlAwK0RKN2F5ck9UNEFnQ05JSllzMWVTNCtmQVFiZUJuQ3RXUDlXWXZlSmlmT05FUkdoNktMKzRHN1BvVjluZmVjSVZHVnMvSUFnU0JlSkpRREtkRkYvOWdoa3plMURpYTMvenR2OUJBT0kwSURBWFZ3Z2ZJbEFVREtBM3gwaUp4ZlpkU3orUVJDa204UVNBRHFrWjAvZjJYN2ZsSDNjUHR0dDArK200V0NhVXJnbS9ZREs5NDV3Um5INmp5QklkMmtzQUF2bjU0eWNTWndPb0UxRlNMYlA5b3pwZHhNdEEwMkZnK0xzSWdBQUFQek9pSExxam5rVHAvOElnblNaeGdJd05ybHg5WVZqTUZVQ1NHVDllMnJpSDBoREdZaDVQTUlQY04xZld4b0d5ckgySDBHUXJ0TllBTlNjZnV6a2RaQ2J6STVDUDVoK04yM1JBR2lVREZqTktaTkZxNXhPTWtJRVFaQzIwbGdBaG1mWFUwTkdFdXZmZDBRb1Z2enRKS08yZ09mNjdWRmlTOWo1QjBHUVhxQ0JBTXdYQ2hzYXJYV0E4QkFWSXU5RDYrL1FsQWFFQllJQy9ZQzFqREpWdElyWStCTkJrSjZnZ1FBY09yYjUzRjhkaDZteTk4VHVDUHVFMFJZTkFHOHlnQytOd0oxaDdQdVBJRWlQMEVBQWhrZXFIemg3eTJ2amR1WEUzME9MR2dBQnlRRHoyWU44TGR1R3NTRUlnclNEQmdJd2UyZ3prNnZHdXROdXN2NkNWalRBdjUvdzdXSDZqdXZzMWtpN1I0a2dDSktRQmdJZ0RldVExK3NQeFd0K3VUc0lpMmpGMXdDb0JZTDBsWkdsdXhsYy9JVWdTTzhRSlFER3ViTzhTc200S3dFd1VOYmZvYWw5dnR3NFVhQ3E5TXpYOW0rdVlQd0hRWkFlSWtvQStHelIrdllKR05OcTd3ZlQrZ3RpYWtEZ1A1RkYyYzN4Ui8vSjlhdHZEcmQvWUFpQ0lFbUpFZ0NTTjlnanQydHZCdG42QzVKcGdNd0FRRi9MakdiWjNJVUxIUm9hZ2lCSUFxSUVnTzdaVEEwWkFHajl0NGo1STN2K3VZcnA5SjROUzFjNk1TSUVRWkRFUkcwSUk0MW9oQkcwL2cySTJFWUdBQUQ0clRHb3lMajZGMEdRWGlQVWNwVWVQOE5NV3VzQjUyR1FyWC96Z1NEejJZTjhOZGZKTVNFSWdpUWhWQURJUkVYLysrT1E5UzBDR0dUckwyaEtBKzRNeSsrK2l1WC9DSUwwSUtFaElDbGI1Wk9WblJ4S1B4RzQzMjhRZkNYUE5OejZzVC80UHovNWQ5MGVBb0swRTRYY29xU29TbS84eHUvOFh1QUZvUjZBTkx1Wnl1bStvd00vL1hjSTJ1dlJmNlN5c0lkaDk3YytZVG1OZGJySXJzTGsrMVRwalFxZERyc2czQU1ZcVJCdkN5QzAvdlg0L1FCUFF2aGVMdjJPYThiM0QrM3d1SkJrR0ZSNWRmakFtanpWN1lFZ1NOdDRsM1k1YlZwaFo0TTlBT1BjV2E3SklHcEFCV2o5bTRjdER3TWp1UGxYdjdDcDRGSnRaTGNoYTBjM3BYMWhaNE1GZ0UyWHJLZFBCbVNBRVErUmdTQjlMWFBuTGR6N0YwR1FybkV6THhWSnFGTWJrZ1BJbU5icHhlMjNPUDJQSUV3RERQbmJUKzhycnVIdWp3aUNkSTFOdWplbDM1c3ZGQUxQQmdzQW1TelQxSlpkUSt1ZkNINXo5TEVmdjNydEV1WVZFUVRwR212eTFFZGUvZmNyZTRKREVjRkpZQ2xicFJDcnpCRUJDTTRHRzJ0RG80YU0vWDhRQk9rdWI3NzltTElXM0lvbVJBQ0c5Sm85dytsL1REd2FZRlA2d2g2MnA5aTlBU0VJZ2dBQUxKSEhNc1BCQ2QyQUVOQjhvYkM2S2NPSWh0WS9PZmR5OG5zdmt6dEQzUjRIZ2lDRGpxd2QzYURCaFVBQkFuQm8zSHJ1ejA3Q3FPWS9oVVRoMGt0K2E0d1J3QVhBQ0lKMG5jVWhzMEppNXdCeUU5cjdKeFNjL3JlQ1ZrNnQzc1BwUDRJZzNhY0UwMVlxdU40bjRPanN2ckowWXJuRFE5cWxDTlcwNmJlZjNyZTVrZXIyYUJBRVFlQ3VzbC9oNWM5OTZwUCtVd0VDSUkyWDArblFwY05JWTlZeTcvd2YzOEFDVUFSQmVnRU95dHYxcndSMkJBb0lBVWw1QXpqV2dDWkY0bncxaHh0QUlnalNPNnpJRDZYWWh2OTRVQm5va0U3US9yZUFzVFpFOUtnOXdoQUVRWFlZaysvMUgvVGFxWVh6Y3hVOVhkY0dEbWtTKzQxSnU0UXRvQkVFNlJWazdTaXhBL1lsOUFyQUtEV3YvdTFwRklEa1ZDWDFBMi95RmV3cmlTQklENkdUZ0xwRWJ3aEl5ZW1ITmN3QXQ4RGlFRTNaMkFJYVFaRGU0V1pla3EyQXhwUmVBY2lQYURDTFhhQ1R3OWJ5alBpMkJrTVFCT2tlbTNRdlRRVVlkbThJU0JyV3R2dUFJczFUTGFiWmJkd0NIa0dRSGtLbm1WbHpjZUg4bk9lNFR3QlNkbG94ZDJwVXV4RDY0bDVld2owQUVBVHBJVFNhLzhYVmYzdFo5VGFFOEFvQVRWazhaZS9VcUhZZHhiUjg5bld5aUUwZ0VBVHBMZjdyMk5FVmFjWnowSnNESUNuTUFMZkFXb1prcTlnRERrR1FYbU9KUExhZVd2VWM5QzBFVTAyQ3k0Q1R3c3Rwd0FRS2dpQTlTWlVkOEJ6eGVRQ3FDUlJ0V0ZKS3FvMGxRQWlDOUI2eWRwUkpKZTlCNzFYWktqWUNTb3hoeUlTZ2ZDSUkwb3Y0MTRMVkpZRVh6cytWMS9PUXhTcWdoRENMYnE0SHJMZEdFQVRwTGpmelVrbjI3Z3hjSndDajFMejY5TU9BVlVCSnVYSnhmMVhIYlFBUUJPazVkREs4cVhoYjFOUUpnSkxURDh1NEUyUlNOT1h3aDE1ZVg4VnRBQkFFNlRtcUpHK1F2T2RnWFE0Z1AxeUJXWXovSkdVem5jdnJwNStjNy9ZNEVBUkJ2T2cwQTc0aXhUb1BRQnJScVl4RkxFa3BwM2tSMXdBakNOS0w2RFI5c0hyWjB3Mml6Z09RSkNiaFh2QkpZY1VNb1NpZkNJTDBJaHlVWDFuNXJiZlNrKzZEOVI0QVd2OFdJRlhKMXJ4SmRnUkJrQjdoRzhNbnkxS2RqYXJ6QURqbGhPRWlnSVFZaGt3cUtBQUlndlFvc21Rc1NwbTZJM1huS2VjeUtrQkM3SXRUSkk4N3FTRUkwcU9ZU3RXMHA5eEg2cnVCeXJnQ29DVkttN2dUSklJZ1BjcXE5UjRENmpwQ2V6d0FSbEFEa25MVnlrQUZlNmtpQ05LN21OWWg5OXM2RDRCZ0c3Z1d1SDZGYnhoU3QwZUJJQWdTakt3ZEpYWmRyeHJ2aGpCSVFtenl6bi8rdzQzMWJnOERRUkFrSEdyWExRYXVGd0FzWTA5TVZaN1lYNXk3Y0tIYjQwQVFCSWxMZlE1QVpnVGIyU2ZEb3JnVkRJSWdQWTVlMyt1aFRnQ0lnaG5ncEZRbGY1OE5CRUdRM21GeHlGVE51anIvZWc5QVlvQ3JBSkpoWVRZRlFaQmVSMWZxNXFrb0FHM0N4aEFRZ2lDOUR1TjFVMVh2U21EY0R6SWg2QUVnQ05MYldGd2xVQmZuOXdrQWJtbWJERXZpK0MrSElFaHZZMEZkeTNvTUFiVUhic2hZUklzZ1NDK2prMkhLNjdiOHdzQUZnaURJb01CSWVEdG9zQ2w2QU1rZ2FRdERRQWlDOUJmMUFzQUlKb0VUSXR2NEQ0Y2dTSS9ENm0yK1R3RFFqQ1ZEWmxnR2lpQklMMU1sZWNyck9oWmpDS2hOU0pnQlJoQ2sxMkVrd2dPd01TZWNGSmxoS3dnRVFmcUwrajJCVFltZ0I1Q01sSTMySDBHUS9xTGVBN0FvWnhRbElBbm9BU0FJMHZONGNnRDFNUitHSWFDa3BLeVZtMFB6aFVLM3g0RWdDQkpNaXBjb1JBZ0FraGlKUC9mL3ZHMWt0TnZEUUJBRUNjY2pBUFU1QUVad1crREVIRHhDY0ZONEJFSDZDTTg2QU1vdHpBRWs1TENzbGZPNEtUeUNJTDFMWkM4Z0MrMVhTK1NISzkwZUFvSWdTREFxMzVTZ1RnQzhLNEVKOXJWUGluUmltVlNVeHRjaENJSjBDU2tpQjBBWWhuK1NrMDViZGdwekFIMFBBUk1BT0tDV0k3c1F6NFl3ZGZOOUd4dWF0UUJQMlZMR2JId2QwZzhRd1ArVnlHNURKbnEwQUZERHFBOEtJYkdoUXhwa2pXNlBBbWtES2pNNEtLZ0J5TzRqYTlYVmVkWUx3SWJLTUFlUW1KeEJobEFBK2hpeFNGSmxoazdUR1ZZQ0FBSW15Z0N5YTVndEttcTloYTk3VTlyTThpc1RPenVrWGNTd1VTNnBDK2ZudWowT0pDRVVyQlF2d1pZR2RIczRDTkorb2dUQUxLdFhyY3pPam1jWGtUR3YvczFEbytPYjNSNEhraEJua2FSTzB5b3p4QVBRRDBCMkwzVUNzTTZVdzJkZmdpcXVCa2pJa1JNM1UycTEyNk5BV2tYWWZlRUVjRkF3SllEc1Z1b0U0UFNUODduUkVtQXhlMUtveklaSHk5MGVCZEllaEF4a1dBbFRBc2l1Z1VrbDkxdGZ5cmVTQWl3RVNrbzZiVWxwTkJDN0RaRVNFSDRBWUlVbzByZFltY3RjcXB1aGVnV0E2d3FVTWYyVmxMd3VaVEVFMU4rb1RQTWNFZGJmOFFNd0hJVDBMNHA4emYzVzV3SG9Da2NQSUNra1o4Q3czdTFSSUswaU5NQlJBaEVMY3Z3QVlmMVJBNUMrWTF6K2JoclczRWQ4SGtCVjVsWE1BU1JsVE9PVmxISHViTGZIZ2JTRVRqTitQd0MybE1CNWdTa0JwTDlRekZTYWJiaVBlQVdBR1RMQktxREVEQm5XMHcvdzJXSzN4NEcwaExEK2dUTGdoSU9jSTZnQlNMOWcyZWxabys1WDJpc0F0aWxoTjRoV1lJL2NKbmxjRDd3YmNJV0FOTmZCV2pqSVdTVUFxQUZJbi9Eam02L2w3SWo5QUxBYlJNdWtoZ3k2ZDZQeGRVanY0ZGtyUTZBeUxkQVYwR2grNjRMYUtnR1VBYVRIK2YySko0NGI5OXhIdkxZZXUwRzBDQjByU2VPNEZLQXZrY0JVZWNCQzdrQU5FT3NEc0RvSTZSY3lySFE5ZGV6MGsvUHVnMTRCd0c0UXJUSmJaRldwOVBpWmJvOERhUnBucnd6UkVjaE5vQVk0SVNCM2RSQ0M5Q1lxMDFUbW5adDZCV0NkS1ljL3VBQkZYQXFRbEpTdGYvcytNb0Y3US9ZcktWNnFrbnlnQm5oZWJMMnRTL2xnTEFqcFRWSzhsUGI5Vm5zRjRQU1Q4MW5WUUFGb0JlbitlMUllVndQME1XRWFFSWFuUEJSUUJwRGVRK1diS2Q3SUF3QUFLS3A4QTZOQXlVbVBGZVU5bUFmdWJ5TDhBQkVMOHFlRlBUS0FLUUdrcDVDSm5yZThmUW9DQk1BdXBhR2s3c2lRZGlka3ZLeHppaHNEOUR2UnNhQ0dxd1J3d1REU1U4d1dGYzkyWUJBc0FLczVYQXJRRXBQbHEvLzlBZHdZWUJmZ1dQOW0wOEs0U2dEcFFWTGNtNXNNRUlERld6bjc0dFNPakdlWEl2RWpKMjZxbUFib2Y2b2tIM0UyYkltQWNBS0VOeUNPWUVvQTZUcFc1cklpWC9jY0RCQ0E4a3JtN3k2cVlKTWRHZFh1UkIzVFJ2YXVkbnNVU0t1SWliOFRDNHFmRWhBZWdGc0RNQ1dBZEpkeCtic0t2ZVU1R0NBQTExYmxkLzdFYTdDT2VlRGswTmwxQ29CZDRmb1UvM0l3b1FITzY3cUxtYWJUVElRcjRIU09Bd3dISWQyRDZFT1RhemM4QndNRVlPN0NoZkZoQzdBUXFCVm1TdGEzai9NOTJCV3VMOUhKc1A5Z1JGV284QURDTk1EekFqVUE2UXFuZnZpcVdtYWVnOEZ0Zit5aXlvb29BQzNCM242SDR0NEFmWWpLTjRVSDRQY0RSQ0FvYklsQW1BWTRwVUdZRWtDNnhaaTEvTlZULy92VTByTG5lSWdBVkZMVk1sYUN0a1I2ckxpZTBlWUxoVzRQQkdrYW5ReXJmRk04dTQ5SHB3VFcwalM2Z1NpbUJKQnVrZUtsemFISnVRc1hQTWVEQllEZnk3RXFKb0ZiZ2h5NzkvejhrVVBIc0JpMC8zQ3NmMkFzQ0xZMHdPTUtqQmtNdG1SQXAxRU9ORzRyaHV3d2ViZzdiQWJzY1JUUytWbFQ1SVhaem81bzE1T3lQM0QyMXRBWTdnM1FsN2c5Z01BV29ZNEhzSll4L1RJZ3NnTFJYWU1FR0E1Q2RvRFpvdUpmQmd4aEFrRHY1dVhDcTZEaDNwQXRvWTVwZSs3RFl0Qit4ZTBIQkdxQXFBc2EweFRoQ3F4bGFuWjhMVTNGYzhQU0lBR0dnNUFkd0w4S0RNSUVJUDNscDBtMkNwdllFcTRsNlA1VmtCaTJodTVmb2pYQVNRbUl0Mk5iRXliaEJJd1pUR1dhT3pHd2Zkc3REY0FLVVdSbnNES1gwL1NtLzNqbzVsOXNQY3RYYzUwYzBnQXdVVEcrZDBTWnhtTFFmc1Z0L1VVK3dDOERpN202cmtFZVYyRE1ZTUlQMEpTNitJOS90VENnQmlBZFk0WS83MThGQmhFQ1lOMFpNZGFHT2pta2dTQjcrZzdKWVJxZ1gvSGtBQUxUd3JObEFJQVVMeTFsMDBJSlBLNkFNUDBaTXkxY0FXMnJ6NWE3WHhCV2lDSWR4YkxUYWI3dVB4NHFBSFpKdGQrWTdPU1FCb084Ymd4VnNUTm9YMERBRGpzVm5Rd1F6RlFNSnhuZzVJZWhYZ1lBSUdOdGYwUUxhcnFJS1FHa3ZSQXdYMUIva3ZHQTM3WlFBZUFyV2ZVREZ6RVAzQ0xrMkwxckx4d2JtOEx0QWZvQUFyWk1kSmtFTE45elhJSEEwcURGclZqcGFyWUU3bVRBMWdzUkN3SUFUVEhjNFNBaEJoNC9BRk1DU0h1Wk5tK2FKUGNidi9ONy9sT2hBcEQvNGpOVXNXRVowd0N0a2JLUFBYZ2pNeDUzYnlta1c4d1hDdFBGYXdCZ2NUVlFBNXdjd05VaFZTakJZcjRxWkdCMmE1OGw4VUpNL0lVZjRIWUNuSlRBbU1FY0RRaDBBZ1NvQVVoYnlNUGR5V3J3SERSVUFBREFYc3V5dGFoMnVFZ2MxTU4zODZNbHJBWHFmZDczMmxjaXpqcFQvc05GM1hrUnVGSk14SUtjWjNERmdweGxZbzRHT0JFaGZ6NEFNQ1dBdElQWm9wTGxhNEdub2paK1liZEhySHdWTzBLMHlreXgrczFUOGg1Y0V0enIvT0Q0aDdPd0JHSUpmS09GOE1NQVFDQjRvVEFBY0FDQUNwL0p3bEtGeit5dkxGVmdKZ3RMNC9vTUFJaGN3M2hncHlqYjlZeTRzTGg2TGZXMmJvK2lMN0V5bDRkTUsvQlVsQWZBUzJuNjR0N09ER21Ra0hqbTdUY3BSb0Y2bTdrTEYrNU50SFAxdXdYcEZLd2JNT0orbGdEN0F5WkI0dWFzZmJIYm8raFhKcXlYcWJRU2VDcHFubU9jT3l0LzhFMjZkd05HOGJlMkJXd0N4YlM5bmpWdmptVitkYUhibzBHUS91UG4vK1hmQXVHWGxIZDFleUQ5QndGenhyejRkdjByelNXQlFhd0hWbXgrWjZSall4c1loZ3p6NXBpVUNlakZnU0JJTkovNzFDY3RvS3ZrYUxjSDBwZEVsQUJCdEFBQWdMMmVoUkptQVZwZ2EyZk45RVJKNXhRWEJDQklzMVRvOUlQR1Y5ZGszS2c4Q1JFbFFOQlFBRGJ2RFd2bFZMdUhOSWlRWS9ldS8rTlJYQkNBSU0xU29XTXI4a1BkSGtXL0VsRUNCQTBGUUt1a3IxemNqeHZFdHdHSjRZSUFCRW5BR2oxOFR6N1E3VkgwSzFibThnZ0w2QUlrYUNBQTY2dkRoOTc5QnR6RDVXQ0pxQmRPOWZEZC9NeDYrZk1QZDJzNENOSjNMSnlmRzdiMUVreDNleUQ5eWd4L2ZtTHp0YkN6RFFUZzlKUHpLbkMyT05ydVVRMGtrMlh6em9pTXZlRVFKRFl2WlI3OG1iVS92S3ZzNy9aQStoSUM1bjB2WEJyV2w4SXVhQ0FBQUxCNWU2eGF4STBCbXNjZk41TllabVlUQ01kVndRZ1NrMVY1OUUvR2Y0SUROaVZMd3FpMVBuL3FFeE4za3VZQUFFQXZxNWRlTzRocGdGYXhLZGlVSEx0bnZyeFAyUi82L3dOQkVEZXZwUit1eUZpSGtwQnhmcmt5bFBQdkJlL1FXQURXN28wY2Z1ZEZ1SVdyQVpvaFhDK3pQM3FGS0xaeDd1eE9EZ2RCK3BHRjgzTjUyN2dMV0FLVWtDd3NUYkkzSXk1b0xBQ25uNXhQTStCTEtBQXRZRy8vTzVQRHEzeGhEejJJVGdDQ1JERmZLTHhtN3YvcHRmOGJFd0NKT1dKK2Q5L3FHeEVYTkJZQUFHQ1ZGSzRHYUJzU2s5OTNSY3RhdUNnTVFhTEozYnlCQ1lERWlBendlT1ZPeERXeEJNQXlwZlRSWmNCVWNFdzg4Ui9YOUw4Q0ZHeEtEOTI3Zm1YUDFDdzZBUWdTeXZMTTFMZFAvY1JWK2RGdUQ2UmZtVFp2WGpqMXl4RVpZSWdwQUxsZmZ3bjBGTCtKeGFBeDhGdC9pWW1YRmFCWkd5b1NWTEwycVVjdWw4R2NMeFM2TUVJRTZRZmUydi93bExLQThaL0U1T0Z1TmFkR1pJQWhwZ0FBQUxzMmpudkVKOFNtRmFDTzlRZUFyRUUzajYyKy9nOVRoKy9EVFFJUUpKZ1NtYjJoUG9yeG44Uk1XamZHMk5Yb2EySUx3S1pLWDlqVDZvaDJQZTdwdjAxQnhId0FBTUN4L2dCUVNUTWxyNS81NkUyV3JhSVRnQ0IrUHZlcFQ1Ym9KTmIvdE1LRTlYS1dOWWd6eHhVQWNtZEkvc0Jic0lRN1JNWkdZaFY3ZThNMVlmM05rdW84R3c4c1hYOXhFcDBBQlBHekllKzUzL2pXa25LazJ3UHBWektzOUZMNjQxbDJOL3F5dUFLUS92TFRqQUQyaElpaVB2cGZzZVVzTUhBNUFRQ2c1SFd6cElwbkFEanowWnVwOFNxV0F5R0loMDJ5LzRhSzZkL2tURnVYZ0pDd2JRQWM0Z29BQUN4ZXhKNFFzYWpZc2hQL3lXNXQ3dXJNL1pXOHJsa0tBRmlxYlR5d3BDOU5UZTRMM3EwTlFRYVRMM3ptRXhWcDdDWjVkN2NIMHNjTWsyc2piTEhoWlUwSVFIRTkvY3o4QWFoS2pTOGRRRnpULzZ4a1ZZRFdwdjliLzFyQzdvdG5XWmNzMVFZQVM3VlB2dk9pb2xheE94Q0NPTnlsRHp4bzRnNHdMWkcxcXZjYm9VMUFIWm9RZ0tzWFJ4Nzc2R1hBWWxBL1c5YS9Zc3ZpQWE3SWp6UDN6OGltZUcycHRxeExBS0NiU3ZIQVJ2cmFLSFlIUWhDSEZYbnZLOHJIdWoySy91YW5WdjlzM0ZwdmVGa1RBakIzNFlKc1pQWEZzUlpHdFJ1eENVamNlWmVWTE05NUphOERnS1hhbXFXSWlUOEFsQ1FxTktBazBleVBYakdHRGR3bkFFRUE0Tk5QUExWQkRsNVNqM2Q3SUgzTWpIbmxqOGQrK1dIdGxZWlhOaUVBQUtCdFpDKzlnbEVnTDVXcUlpYitXY2x5Vi82SVdMOW1LZWJXdnNyQzZEdW1YMVZNQUxpOVY1YzBwVEtwZDJIb0NOSmpyTk05UjZvTFlFOTBleUI5VEI3dWJrcnAwMC9PTjd5eU9RRllXeDQ1K09nbGpBTFZzQW1JYWgvSkVoTi90L1VIZ0l4c092bGVjYVFrVVhDWmZ0MnNMWEs1OThBNkVLNzlBVlk5SXdQTnA1OTRxa3BVYlAvUUlwUFdqVU9yTDhXNXNqa0JPUDNrdkxXQlVTQUFxRVYrS2xWRnpQbzlwbCt6RlBFQWdJeHN3dGFzWDFWTVlmUWQwdzhBdHBZQ2dQeUd1bUxMV0JLS0RETHJkTSswZlFYTC8xdUJnUG0rSDN4bHJOSzRCQWlhRlFEQUtOQVdqc1gzbUg0SHgrNExHUkJ6ZjkxVThqYnpYQ2xscWdCdzkrakcrdXZZSVE0WlhINzNzNy9BYUJXbi95MHliZDU4K3RTNVEzY2FKd0FnZ1FDc0xZOGMvSkhML05Kazh3UGJQZFFtL2xYRm4vSVZFMzkvOE1kQktJRkF6UDNMdHF5bm1KNWlweDY1ekRKWUVvb01LTXY4YmNmaHF6ajliNUZwZUprTUZhTjd3RGswTFFDbm41dzMxN1BHeXVEMmhLaFVsV3pLck5WNitpSS9ZdUl2ckwrRGJpcE84TWVoYk10U3BpbzBRSzFTQUxoNHJEUjBZN2h5ZkxYVFB3S0M5QnBmK013blRPanJqQUFBSUFCSlJFRlVEQmg2bGY5TXR3ZlM5K3lILzVhSHFEMEEzRFF0QUFDZ0Z6T1hYanM0Z0ZHZ1NqV3FNYUY3NHUrZ20wcWc5YmUxVkU2eXhOd2ZBUFFVRXhxd1VyakVjeVptZzVGQjR5NTk0SWoxM0xYVTI3bzlrUDRtdzBvdms1OGFocXN4cjA4aUFHdjNCalFLbEUyWlFnUDhTaEJtL1ZYRkRKdjdsMjA1SjFtd05mM1hVMHd6RlQzRmhuVnBrMUVNQkNHRHcrYys5VW1ORE9QaXI5YVp0aTRCVi83RlovOG81dlZKQk9EMGsvTWJ0eklERlFXcVZCV3dpUWorZUU1NWd2NE96c1RmYi8zRjNGKzhCZ0RoQkFCQVJqRTFVM25qV0NsM2NSd0RRY2pnY0U4K3NhLzZ3OHZLMjdzOWtMNW5tRnlidHFNMkFmYVFSQUFBb0xpYWVXYitBR2dEc1ZkRFhkQy9mdTdmVk5BZjZxMC9iTTM5YTdkeVhieFN1R1JuTFF3RUlZUEE1ejcxU1ozazMxRG5jTytYMWptZy95RERtMmd1bVZBQXJsNGNlYXh3aFY4ZFQvYnhQcUptL1VQbS9vRVRmODhMZ1dQMG5jZ1BiTTM5SGRQdnZGZ2owcWhCTVJDRURBSjNwWlA3elgvRTZYL3JqRm5McjZULzZZZ1ZOd01NaVFWZzdzSUZZelZqck9TOVcrRHVYZ0xuL2g3ckg0WXo4UmVtM3hFRFlmRkY1Q2VqMUFtTUNBU3RubWpjemdsQitwZFBQL0ZVU1pwNUpmMXhuUDYzemppL0xBTnJ1QWVBbTRRQ0FFNFVxSkxhbFJwUXFTcmk0U1IrSFJ5akgzL3U3d242T3dqVEwyVEFIUUxTYkVXemxiZm1ycklNQm9LUVhjdDhvVUNMbFJHMmdzVS9iV0hTdW5GazVZV21QcEpjQUs1ZUhIbjBmYmZaNVNrQTcyWll1d0FSOFBGYi93aWlnLzQ1MzVJeEFQQlAvQVVaeWN4SXBtWXJNd2FzMlRJR2dwQmR5VnY3SG43dm0xOTlkdmc5M1I3SWJxQ3BEaEFPeVFWZzdzS0ZFU0pyTCt5dnZkOHRHdUFVZWpZMTl3K3M5bkcvOE16OUF5ZitzRFgzRnc4QWVQR3dNZnpXNkZzNUEvZU9SM1labi92VUorOE83L3ZtdTM0YXpMM2RIc3R1NEdEMTFiODkrYi9HN0FEaGtGd0FBTUM2TTV4NjVBWmMyMG9GOTc4R3VPMStVMEYvTldnaUwvRE0vUjJMNzUvN2E3WWk1djd1Z3kvLzJLM2JMNDZrSGl6SC9pRVFwQSs0SzUwY1RWMTdPZjNCYmc5a2x6QnJYOXluTE1ic0FPSFFrZ0Rrdi9qTTNWdDUvYmFyTzdSTitsY0dtaTM0Z2EyNVA5VEgvYVBuL3JBVitmSFAvVVhZUjh6OTNRejk1TjJSMlFvbUE1QmRnNVA3QlRaQXk0azZCd0h6cDFiL2JNYTYzZXdIV3hJQUFOaGN6ajR6ZndBOG04WDNvUVkwTy9kM0xMNW43aDh6NkI5bS9lc1B5dUxaSE5kT1o0eDdhWTY3aGlHN0FNejl0cDJEMVZmLzgraFB4OWtDekVPckFuRDE0c2hqNzE1azEzeHRJZnBLQThJeXZXRkJmemVPRXNRSitnZE8vRDB2QXZtSEEvWjRrYTdaS2VQYzJZakxFS1Qzd2R4djI1bTFMNXFrRW1jTE1BK3RDc0RjaFF0alhMYStjd1JzMzYzNklSemttUDZtQ243Q0Z2b0tBdWYrc0ZYMDZUNFNPUEhmT2lWbkpFdHpxY2l6eDZ5cDE4WnZIYXpFSENTQzlDQmYrTXdubG9mM1lPNjN2VXhZTCtmNHZRUWZiRlVBQUlCZEg2TS9lalYwbjhpZWw0R21DbjVnYThvZlArZ2ZNZmNQdFA2YUxmdXRQd0JVbVBUYysxWld4Nnh2L1A3N212d1JFYVFubUM4VU5rdlRFNW0zTVBmYlJtYk1LMitrUDV4bGR4Tjh0ZzBDa1A3eTA2Q3d1bFN3bjk3VGdJaTVmMFRCajVqN08yK0ZyWGZXZWZubi9rMEYvV0ZyNGc5YkNRQTNXV3FiNDlvOXFzeGtTdHFYVHNmOU9SR2taM2h0MzNzZWUvTWYvbXIwRnpIMzIwYW00ZVU4dTlmVUFtQ0hOZ2dBQUZoRlZkbTdEdXVacUl0Nnh4V3dDZGlrdHFWWGJPc2ZXUEFqVEwrL3gwUHRWazBHL1FNbi9nQlFZWko0QUVEcTRNb0RGWFBSVHVQcU1LUy8rUFFUVHkwT0gvdkxkLzBHcWVLZVgyMkRnSGxBLzBHZU43Zit5NkU5QXBENTFRVzRQY0l2VDRGTkE1SUJicm9vQStKN3hXYnVXOXU0eDUvN2k0bS9NLzEzb2oyQnBoOUNyRDhBaUltL3A5aC8rMU8rc0k5NGthVzJlTHRpcHYvbUFKbTZQSHgxMHNJZDVKRis0WE9mK21TSlp1UnM5Wkx5cm02UFpWY3hiZDU4SS8yaHBockF1V21QQUFBQVg4NmJ6eDZzV2Y5b0RZQXRHZGg1SmJDSnM0bWpwOWcvT3Vqdm4vNkh0ZmVCb082ZXRiZXVKYjd1NmI4SStqdkJINGNLazdMVUZocmdLSUc0NXI5OThCNHNEbFhIZGRRQXBQZVpMeFRLbGZGRDFlZWV6ZjE0dDhleTI1aUdsL05zTlZuOEI5b29BT3pXQ0hucytuYUQ2SWF1UU8yeXpzdkExbGRVYkJra0hsYnNMeWIrb3JtL0cwL1FYK0FPKzRUVi9QZ1JzMzdQM0YvWWZVL2NYNWg3WWYzRjNOL3pFUUJZZStkU2FsVmRUK3ZZSlFMcGNWN2I5NTUzWFB6N3IwLzhMSWIrMjB1TDhSOW9vd0Nrdi93MGw3aTJORngzdENrWmFLOFllRzY0RmZRWGR0ODkvUmRiZWptdjNmZndsM3M2OC8xQUR5Qnc3dTlNK2Yxei82MExaRS9rUjVoK3o5d2ZYQXFoMmZMaUVGdDc1OUxtNjJuc0VvSDBNcDkrNHFuRjRhTVkrdThFQjZ1dlhrNjlQM0g4Qjlvb0FBQmdsZFBLZERHZ0hqU09CbXhmVEJMcVFlQUhKUzcrNjRuOE9OTi9NZXVQdjYrTFE0dEJmMmVWYnliSWdYQThBTit0NmxMRWwvTjA2Q2Z2bXROWUdJcjBLSi83MUNkTE5DVm5UZHp2cFJQTTJoY2xUaExIZjZDOUFwRDc5WmZBa0N2WGc3WUppK2tLQkh5UXhIMkVmUnlnWXN0WnlRck0ra0s5QitBbXVydW45eWJoQlQ5aEUvK3RhN2J2NWxUN09DbGY5MlVCamdLeEZvY1l5VXFtaWhxQTlCenpoVUpaR3oxVS9jR3orVE1BUUNDMFlTS1NCR25sU3VwMG5yZTBlWGc3QlFBQXpJMk1NcnNCaTBQQnA0VU1KRk9DcExpdHY0ZXdvTDk0RWRiZ002ellQMnp1SC9DOUlldThzdFQybTM1d09RcmVMREdYQWFDNHA2VG84cENxWTdjNHBLZDRaZC83My9IbWQ3OCsrYjhRdXhZWlJnMW9Gd1RNWS9wYkkvejZ2L25ObjIzbFBtMjJ4YmxmZjRtWWtuNTlvc0YxT3lNRE5xM04rdjNoR2tzSmEvSG1CUDNGczd2Y00yeWhiL1RjM3gzOGNRZngzZGM3QlQ4ZTB3K3VZSkhuVXhVdVo0bFY0WEtGeTB1eit0c04vV3BLd2dWaVNJL3c4NS85bTVzakovN0xPNStneGxGT0RlYzRBUk5sb0hVNEtBK2Fmem5SZlB0UEQrMjN3dFpHVnA0dXdyMWM0MHM3NlJCVWJCa2tscFVzQU1nQzg1d1ZFLytHS1Y5d3pmZWJpdnk0NS82dUY3V0pmMkRjUCtEbVc5L292OTZ4L3M2UlA1N0tIZGF0YTdLQ0hVT1Jydk5ybi8xVGphWXFRMlBYMUdPY0dvU2wzUnJBUVVFTmFKRVo4OHFyeXR3MGU3M0YrN1RmK0daK2RXSHAwcWgrZGJvSjQ5NEJKY2dDMjE3dDVmb3h4ZHcvc05nL3NPREhYZkhwSVN6eUU0Zzc3T09QK3p2MS92NVBlYS9mTXZwQ0E5d1gvOG5vOEFIZHZwYVJVQU9RTHZKcm4vM1REVG94d1c1Y1NqOG9qampXWDd3UTFoODFvQldtNGVWait0WC83YmQrdjhYN2RHVDJ2Ym1VZitacisyRXpEZEJrdE1kUmdnU1NVUDlCWWZUOWMzL1ltdjY3Q1p2N043dlFONnpOUTBTUGg3Q2dmMjJvUHVFUkUzOWgrb1VZbUpvQ0FCbHFXMm4ySC9abEQybjJEUlZqUVVoMytQUVRUNVhJMkFoYmVWbDlMd0FBY1UzOHFVRlkzY1loR0E1S0JnSHo1Ky8reDFuN2V1dTM2b2dBWEgxeitOUzc3dW1YWnJjUEphOEM4a2xDMkVNZ3NRclFDbEJoK3Yxei8raTR2OEFmOS9jUXRwMXZSSCszc0I0UGdVRi92NjhnYkwySStJUExEd0FBSldOcXJwdjhwOG44SWN1OGxGWlFBNUFkNXROUFBMVWlUMHliUzl2V245ZFpmT0VCdU1OQmdLNUE4NGp0WHg0dHY5VDZyVG9pQUhNWExpZzhkZW1WQTFDcHQ0YWR5LzFLV3pOOW13SkExcTR6L2VBcStHa3g3aCsybzIrejF0K0orWGlLL2NOOEJRZFAyQWNBVEUzSlVOdlJBQ3ZOL25CNjVKaGhmaStkeGRwUVpNZjQzYy8rUWpGbFQxZ3JkVHU5RU1QdEJNQ1dINEFwZ1ZhWXRTOXVTTGtFMjcvNDZWUXB6dHJ5eU5UaEpYNTVLdUJjSjJUQXBnQlFtL3ZiVUhITnFzMlNLbDdFV2VybGp2dERTSnNIei9UZkhmWUpXKzNsUHVpSitIdUsvUVBVZ251ZGdPM3JtUVFBVnBwcFBqZmlENmRIakdwNk04MVJBNUFkNEF1ZitjUVNQWDZJUGZ1OWtVY0RUdnMwd1AwQ1V3TE5vZHkrbmpyUll2bS9RNmNFNFBTVDg2Q25YbjN4S0JnQnVVMkFOaWQrYXhGL0d3QzJyYjh3L1VwZUQ2ejNEOFRUMlQrd3pZTm43dTllNk9zdStOazZHOXpmTGJERFQxTnpmOC9FdjI1SXhBYUExNmJZc0VFMlpVQU5RRHJLRno3emlWdXBnL3VONi9QNVh5Uk96S2MremhQSEZjQ1VRQndlcWp4L1gvWGxGc3YvSFRwWWpMKzhPSGJnMk8yQTdZSTlKRXY1MXBNRlZnRmFrV29hSUZEeXVsbFNOVXVSZGNrOS9ZK2UremZzN08rWiswZDArUEVZOU1EdW5tRVhRNk81dnlmMFh6dk9KZkVnbWd3QXIrZnBzQVZyS2RRQXBGTUk2Nyt2ZXYzL20vZ3B3clpXZ0ZJRFdMcE9BeHhoQ0VvTGIvc0VHQTZLaHBaKy91NS9QR3hjYmR2OTJuVWpQNmVmbkU5WEplMkYvV0JSc0pxc0IyMm1oTFFDdFl1ekJ2Vk0veTNWenNpbXBkb0FJT3Nodm9qTDdrUHpUWDc4ZHd2YzFTdXMxak4wYWRoV3BiOC82Szh4eVQvMzEvaFd2MmhpQXdEUFdPTDVoWEU2VmtVTlFEckNwNTk0Nm5McVIyclczNjd2OU9uUkFHSDM2NTBBQU9EVWNGY0hZVGdvQWdMbU1lT1ZQeC85WjIxSi93bzZ1eHpYdWpPY09yaktSQ1lndmd3NHhDditFVUgvckVFcmFRYjFRWDkzelkrbDJxS3RmMWpGWjJEY3YvV0Z2b0VGL3RHNDEzbjVnLzd1Rnc0Wllnc05jS2IvNGhrQWhBWVVUZmtidi8xQjNEOEFhUmVmZnVLcEZXVWtaMHAvTmZiUGhmWG54SENlQVFDb01hWXAzbGdRQk1zQTFGY0hvUVlFY3I4K3IxRm9TL3BYMEZrQnlIL3hHVkpPV2Q4NVVtdldKck9hRERTckJCNUV6WS9FUUVUOExRb0FqdlVYa1I4bHJ6dVJIMW1YaE1VWDdYMGlJai9naS9zM25QdkhYK2diVnV3ZmMrN3ZUUHd6L3Z3Qmx4d1BBRnpUZjgyV3MxVUFnQjlrVXh1VHh2NmJhbW5Dd0wwa2tkYjV0Yy8rNmQzVTJJUzU4YjNSaDRDbm5PT2NHTVJWK3JtV01RRUFxSUVwZ2RZNVdIMzFldnFSU2V0aUcrL1o4WVk4N1BxWWNkODlmbkVHQU1DaUlET0FscFZnYTk4eDk4US9XNUUwUzFIeU9nQllxcTFaaW9qOGlMZGkxdS92N1J5OXNWZjh1Zi9XMmZyaS9mQmlmL2YxRGhGQi85cjFUSUw2NmI4dy9TTHM0MEMwN2RhaGxSUUFBRkd0SlRQelg5OVpQcjNCTHU2cjRsSmhwQlYrN2JOL3VpNFA1Vm41ZTZNUEFRQ1FxdnNzSndiM3pmRzlLUUVBNEdtc0VHMktVK1NQVmRoc3BmbXpuNDRMUVByTFQydEcrdFVYajliV0JBZ05DRlNDSnNYQXNmNVpHOHlTV3NuYUlzcHZsbFR4d25sMlRMK253YWQ3ZHhmUHpadWQrMitkRFo3N2grM3E1Vnd2YkgxWTBCKzJwdjkxUjF4QmYvZjBId0FxcWRxZHMxWGd1Z3dBWEplSmFwV1ovTzhmb2ZlbGl0OU41VEVsZ0NSZ3ZsRDR2Wi83djZSeVpkUXF2cFMvZi9zRXFUb3lNRnNHOE11QVB5M3NaQVhxMDhMdUY1Z1NjSmd4cjd3Ri8zU0svTEM5dDkySnpzekxpMlA1NmVYdGhjSEMwUHVWQUtCT0RLTDF3SFYyUTlzTyt6aTVYL0VzNjFKSm9zNSs3cDdnVDdzYWZBWXMzSzJmKy9zNyszdXl4RTVmVC9CTi9EVW0rU2YrVUIvMGR3Nkt1Yjh6bmtvS2lHb0o2ODkxdWFKQVJZRXZqRXpaWExxOXB2Nkg4M080blNRU240WHpjOWVPSHo1NTY3dkYzSkVmRGgvaHRCcDQyZUpXSDBqQzAxNE5BRjk1YUhoMUVJYUQzQnkyZmtCWjZsOTg5by9hZTl1ZEVJRFRUODVYMWxMUGZHMC9yR1hxVGpoSzRPQVdBNDl6NEhwVXBOcE9MeHRtS2x1UjNOYmZVbTFoOXdIQXNmNmUvZHloVVp1SG1ITi9aeFlmdHRUTHY4b1h0bWI5Z2YzZEF1ZitBQkE0OS9mTStzVTlSZlJmM0x4dTd1OG9qUWtWQmI0emt0ck1wQ2F1OEZ1bnM1LzcxQ2NEdnhSQjNIenVVNS84K3Znajc3T3YvZlpIZi9iaWNCWUFDRXQ1TmNEbEI0QXJHMXduQThJUDhGY0grWnBHWURob0cybmxldXErVVpaODY4Y3dkbWh2bHF0dkRqLzgzdHZCK3dRNGMzK29kd3M4em9Ick9XdlFTdGJPR2xUSjZ4dk1hNmxsWFJJZWdHUDk4L1oyUzdoQW8rL1ExTnhmbUg1dk1DZTgyTjk5ZmUxaVYrUUhRdWIrZ2F1OS9OWi9hNmpiZHlDcUJRQVZwYVlFRmFWbS9abXVBTUR5alA3bVQxWTJwTVAyeVBMdmZ2WVhJdjVORU9UVFR6eDFKWE9mWkJtL2ZQS1haT09nT0Npc2Y0QWY0Sk9CT2xkQTJIUi9TcUJSV25od3JUL0FRL3Avdjg5NHBWMkx2OXpza0FETVhiZ3dNV0pMWTJWWXpudlBlVUk5SGlVQXJ5cFUwcXkyMFdPYXVXdCtuT3BQNFFFSXV5OW0vU1ZwK3l1Y0hwL0o2djNENHY0clpob2E0UzhRY2lJL1ljWCs0SXY4Q05Qdnlmb0NlSk1LenZRL0oxbkM5QVBVc2pCVU5abXVNRjFaTWpQR2ZTOVNRODJNTEdKS0FBbGt2bEQ0NHMvOUg4d29EcHZwdjk1emx0ckRvbkxmZlEybjFXQVpjQzd3YUFDRWhJT2dRVW9BQmpNV0pCWi9WUzkxNU42ZHVHa2dtVjlkZ0dySWpzR0JDT3RmN3g5VTBpeGJrVGFZa2pXbzIrNkw0SS80bkJQNWNkdDlBTEMxVk5tV2JTMEZMZGY4K09QK1RsZm5zTlZlRVozOVBWdTdRUGhTTDZmZ3grMEJCQ1lWUk5qSENmNEkweS9tL2t4WHFHb0NnS1pBeVZaVzkxMC9ycXk5WW8vL3p1LytGSWFERURkZitNd25uanYxNFBGYkwrbTVpZTlPSG5hT2k0bjVrUTIyYlpmOTRhQjZnc05CRUo0U2NCOGI3SlJBMnhkL3VkblI3WG5Oall5Y05mak4wU1krNC9JUGhQV3ZaTzBSYWxiU3pMSCtTbDRYczM0bjZ5dm0vcDdJajVTcDVpUkxUN0hXYTM3aXQzY09iUXJVNUZLdlFOUHZHbWZkZUlUUno1cmJMd1RDN3RkdXFFREdCRTBCVFlHdnFzUDZVRWxlbWRWSEZ2L3R2LzZmL1BkSEJwQlBQL0hVVytvRG82cisyeC85Mlg4Y20zQVgrQXRiZkhuTWRGYndCb2VEUkN3b0tDdFFSMkJLQUN0RUJiVFU5c1ZmYmtnbmJocUI4ZThlTVcrTzVUNzJJa2k4NlEvYlpJTXBJMHAxdzZ3dFBQRkhmb1QxOTgvOXBVelYxbEo2S21CL21PaHRIVDM5SHFLM2RvblkxYXZ1WXQrR2p0c1hoOHo5L2JXZWdYZUdrS3d2YkUzOG1hNDRwbDg4QTBER2hFMGlEWE43OU03b3NGemVWN2FQcm5YcUZ3N3BmUmJPejMwdjkrNHJtUW5Hc244L003N2RwNEduUGV1OFlNc2JPTHFtWEJtaFcwZFMzanR5N3hIUFRXb3BnZnJ0WW1vTEJWeFhpdTl5N3lyRElkWitmUDNMTWZQWnJIM3JnUG5EOXBiL08reW9Cd0FBNXMweCs5QWF1ellKTnFrdEQ0NkRUU3BwdHNFVU1mY0hBTEhnSzc3MUZ4NkFPS0pXWGJ2RU5KcjdCM2I3OFJCby9aMllUOWpjMzcvUTEvT2k5amJJK29jNUZrN1l4L0Z5UERzeXVPMit0blZxazBpS2JHc0szRG00YnFUWTBUVjRka2JGelBCZzhvWFBmR0orOHNFZkxmL0RYWHEvMi9xRHY5T0RDOGY2UTJCS29ONFBnTUJWQXA0WEVOb3hBZ1luSlVCTDkrdnpHVjdwa1BXSG5SZUEvQmVmMGZUMGE4K2RBRU1HZ0pvTU5CS0REYVprSzlJSU5UZVlZcGJVRVdxNlRUOXN4ZjBkNnkrQ1B5TGNMK2IrYXBXV2JWbVlmc2NQQ0xQK21xMkVOZmVIK25sM3hJNitZYnQ2T1M4Q0YvcjZLejRENS82QjJ3dUhyV3dRb1g4dFJNaE1TeHJtdG1sSjR2WFZTZnRQZm9TdDhrbkZ2b3NMQlFhTnoveWIvL2xTZmpobGE3LzA0TSs4UGxHR3JXWnR6Z1hIVnJkNy9najhSaG5DVWdMMUd1Qk5DMFBRWWpFSTZDSTNPQ21CaDR5L3ZhMmNhbS92Qnc5Tjl5bHJuWjk5NEcxRE0zZUhtVXdteW5Vbk9QRStLSUJOZ0lJS0RDUytZYWRHbEtyQkpJTkxTbDVuVlJrQXFFVXQxYVlXclZKU3BTUnZzeW9sbXBHbWlrMFYyOVpTR2lXeVRZVFJ0MXh4cHdqcm41Rk1pMHRXZmFJMU1QS2pFSzRRSHBqMVZTaXpPSzIvbUFHQUNUUkxMTk96WVJtVE10UzJPSFYvSk16Nk8rTnhYK3pNK2sxT3N5YVlyZzhSbVFHQVhKVXFSSEttL3dDUU1jR1NRS0pjNDVJaTF6U0FNV29RV2g1ZkgyWDh3QXY4eXVuYzJUTWYvTVozbnZPUEFkbE5mT0V6bnpqdzBmOWhYWnFjWWhjdlRQNFlZZHRMZG1xQkZ5NER3TnFXR3czRUJtSVRrSjIzN3N1QTJBQkF1TVJwbGJoL2dZbTliWFBFTlNCellyanZVOU1BOS9TSTJON2tzT2ZydGxNQ1hUQm9uWUtXSGl2L3Y0ektUL3oydityY2wreDBEa0R3d3MrOWYvRldydkJMTDhLd0huMmxPK2p2anY0NytJTS9JdVlEOWFGL3RVb2JUdnpCRmZyM0hROW83di8vdC9mbFFYSmM1MzNmNjJ1T25abTlnY1V1YnZBbVFFcWlLWWlrS1l1bENxVUZiY21TSEp0eEttV1haY2t5d3pCTzZJT09ZcGVLa1ZKbXlDb3Jza3BKS1hhVWxPTllyaWlXelZpQUxFdWlSZG1pZFZDV1JJQUhTTnk3aTcxMzU1N3VudTdPSDIvbXpldDM5THladldaMysxZW9aazlQVC9jTWlQNTkzL2Y3amlmN3pvS1RJMFYvQUdCMC8yanFsOTJYTDIzQ3VuL1pNd0dnVDIvc0VHREdKOVRQSXhkNGV5L2ZrRWhlbjZoVjQ2ekFUc1haUjA2OTJIZkgxVlFxNnkzOG4vMTNJVCtOL0ZTZ1ZRVTJJS3pSSDF2T1hCZ3FRVmpRNTg5VVRBbXcyUVZaVm9ENTRNN05DcHh3bngxMUZwUCtsWTNUZjJEekpTQ00yZWsrQUtnSUY0eWtvUWY5V2lPeTY5ZGN6UDVZL1NlZyszdHB6UWNBYXBiUHNEK1dnREQ3TXd0N2dZVDlaVE03MDVxSFN6OVZGdlVsY3IrdzE1ZlAra2FuZkhuZEh5UU5icGo5KzNRMzVRTFAvcWJoWWZZM0RROEFjZ0hiVzFCQSt1dEhMdG1wMnRFVitMc3hNeTRRMm5sNDZzbUgvMnJ2a2J2S1AxclVidnpDK1AzSVR3dFBJK09hYWVFRnN6OS9KbHV1bzVZU1lOUENmSXNBN0tZWm9scnBRL1AvNjRBN3M2SHNEMXNWQVp5ZW5EeDByREF3VWQ1M2FCWHR5d3ZQd1NuZnZHLzJCMTRlaVYxVTN2Rm50cnp2TC90S25hN3FMcmxJWjc1L3hMb3V3SmtCNFRlaGRYK211dzBYL1BDT1B3RjIvSE9CVnhEOTlicStibW9lMlRrNGt5MW42a2FncDRyOTZ6NlFKTWJtNDVrbkhuOWxjQ0JBOVp0cnJ6MDcraTdrcHdPdFFoc0F4VGlnOFZiWWhSZkdBWUhtc05GQWRIV1FXbWtRZnpzc0IyM3JVT0NFKyt6TmxhdHZMejIvMFdIMzFoZ0FqTG5mdTN2aDZ1anRENzBJNmJDRDRHbDQxbi9MQmxCYjVpSjVKOWx2MVlnbElOUVBBSXp2djRMMHdjQ3JXVDR2QVhXay9KQTVQeXJMT2pZK0pURUR3aFY5UVRMblIzanhpS0ZHMlBmbjJSKzcvR1FyL0FJMCt3TUEzczhGM3REMHdWcWkwdWZxZm1Wa28zMlRHQnVFMDVPVFZ3OGxaL3IzNTVEMTUwY1A0N1ZjWkw0L2J3YWF4ME8xb2NCVmRxcmFBRkFvRWdWZ3pRQ3djdENPc2dGYTZWUFhmdW5Gdmp0KzRlbmYyL0JiYmZRTklyQndkWFQ4cHVuYXhWRjJBVWpkQjA4TFJRQytDUUEwKzJPdnY2UnIvVll0N3lRQklPOGthZmVmc0QrV2ZWYVFuakxkRmFRejYvcEM1OHFQNHFLK3BOUkgyTzFGNXZ5MERqYVg4NVZWZlBLK1A3UFRmR2xDbVAzN3d1Vk1pdXp2K2pwaGY3eS9GRml2ajg5bXpSVy9NdUtqNmYvNmtmZkZOVUxiRGs4OStmQUxkeHc0ZUtYbURTeCs4ZEJ4d3Y2QlZnbTBDbk15WWY5QXE0YVBKNGdjeExUNHRsNXkxVUhScmNLdGkvUFZRU0FaR2tGaEo4MlJQbUYvL2ZuTTJ6ZW85WmZCVmtZQUFGRDlnK09HN3VrRFZiU25TQi9QSXgwclB4SDZEd0RrbmFTZWNuamZINXExbnNUeHh3WkEzZmVIRHQxLzRBaWFydmRuMkY4NDVLZnhMc2YrWkpVeFljV24wUDJYK2Y0WU5Qc3pab0NSZmFBWkFUQXdOVzlnSVhmZjg2c1hUcVJxNlpGWUVkb1dlT3JKaDEvTkhJQkF2NlY4K1MvSDdtT1c4Q1VTRUNNRU5kOFZ4QUV5UmFodEtOQThIaVVIc1dsaFVoN2FZU2pRT0dVYmhRS2I2UDdEbGhzQUFIQS9mcGQvYWRoNi93OGgwY2h0dG1WL0xQdVFMYzM3UUNrL1JQK3B1aWEyQWN4MUlwUWYvcWFLdk44Nlg2VDdnNGozWmFNOUl5NitSdXFQY1ArQmlnQzQ0NXFwK1hnTEFNUElHWm8rbU04VUxlVEhpWUZleHRNZisvQXJ1Y0VBZ2x0S1YzbnFweUV6QUtDZ0JZVU9jbFU5REMrcnBBVEVwVUVNZGx4SzRJVDc3SkJiL2NESy85MmNvcnV0TndEMkJ4OWNIVi9PamRuSm0yY3c2UU8yQVc2UU45bXZoMGtmS0J2QUozNGhiQU9JNzgvZk9tTFNROFNVZis0aTBzU3YwUGRuY3IreUlUOFIzeVJDOTRlbUJNU1lBVkxxMDlZR3lOaWZPcUZoQnZETE1iMDJOSDF3TmJ0aUlUZFpTdjdXNzM1ZTlzRVltdzlNL1JCb3R4YVgvbnovVWVRMzFtcEJYaWJRUzNpSCtRaTJBU0RKQ3FpYmdhMU5DVEIzM0M0MklMQXU3YXV0am5yWC92UEhmbjV6N3JqMUJnQUFYdjdYOTEwK241djhoWE13VW9ZdysvTm1RRWo5NUYxYStjRzgzNUh2RDhMUlBiNE9sUG9mY1NZb2xQeXpCeFVtK3hORXAzenhqcUw0STNoWFR2MjA3MCtvbjhhWVhodTRQbERvYy9iT3U5bGxmZStVZmVyTUdlRmRZbXdPWk5TUGdRMEFabit5RXpxaEV5Mm8rWlk0RkdETzRmV1pqdU1BakE1dFFPT1UzcllCSjZ0Zm1FcnMrK1BmZWRlbTNiRW5ETURweWNrVHgxY0c3VlRmcWJOZytGajJrVkUvY0JJUWYwSGkreFAyWjh4QXRQaERPOTFrWVMvWm9MZlcrb3ZOOFQ0ZCtmNTh6MWUwN3c5Y3VTYzBsUjhBdHRpZklFTDNENTJtNFA0RFFMUVpPUEZDL3ZKUk0rVm9zUm5ZZkp5ZW5KemJuN2c0TkR5MWQrQzJRcEduZm9LSUlLQnhnaVFVSURuaDdzeUFrZzJBM1pnU09PVDhNQlVzOS90TEc3SHdpd3c5WVFBQW9QVFlBK1dSMWRHeEtqcTRsRGVSVVArQmR0UlA2djBaOXFlaFR2MFlFWVBlZUVUby9tdWM4Um1SOVkzVy9Ra2kyRCthOTl1Ni93RGdCSnFGZkNmUUFLQlByeCtiVGNkbVlKUHh6Qk9QVnhORnh3bnUrY0hVUy9mMC84WDRtOGhieU84THRESnZDVWdjSUF3Q21wOU5Bd0FmRFNpbWhRbHhSNmNFbWdjNzZSS0FMcnVGZTFNT1F1Qk9GajgrcjkvNm56N3h5NXQ3MzU3QitYL3p0amRlSFp6ODVaZnlBNEp5TVNIMU0yVS9aTXlua1AzSmZEZVo5QTk4SlkrODNsOXdNaFVCaE03dmtQMmozWDhleEFCMFhmVVB5alpBOW5GaUFDems0NWZFRFB6b3pweVg2dXR6MHIvMmlVL0xQaDVqTFhqNll4OHVXSFpCeXg1WVRhejB6M3h0NzAzaDdxMEcrd3R0UU9PY1NFc1FMUWVCS0JUWXVKU0FXQkVTaFIxdFE0R2VzZ0VuM0dkeitlWCt4S1ZOYnEvcElRTndlbkx5eE50bWgzS2VlOGRzZjBuUFp4bzE4cnp5QXdCOEJFQmtINkFFSDNYbFIxYnhLZnlxc29wUHdaa2MrN2VsZnVZNDRmMHVmUCsyeXMvYWZYOEl1Lzgwc0RFWVgwbU5sb1lYQmhhT1ZLdERKZjJta2gzUEZGb1hOTlNlNFlHcHZmMjM1YXRUbWNLM2gyNFd5aklnRHdKYUo3U0xBOWFyT29nNXB6czVTUEFWaFhGQTVISUNQUlFLNkV1Ly9vMlB2REZ4eDJOLytOUW0zN21IREFBQWxILy9qcHJsRC9UWnhRT3QrUkQ5cTliVnRCWkIvUVRZOGNjNy9MdWREbnZnUy80NzdmV05XTkpkMFFhUUdaL1Jvcis2R1JDOFMzVjdpZDVWVW43NExYUG1RYU15Y0gzZ29kbkNjMk5wRHlXZ05oZ0hCRjBEdS96MUt0ei92Zm1YN3VuLzR2NmJJZXlQU3hpNVRTaWdxQWdweWtITnR3U2hRUFRRaU9ieDllZ1MyQ1p5ME1ucUY3Umk3Yjd6ZjduNVltbHZHUUFBbVAzRXljWHA0ZHZmK2FQOGdNUElQbTJwWDViMVhmZmx2WmpFYjNlamZwaHJDdEcyN0tmdHFCL295dmNIanZwbFpnQnp2WkQwaGJpN2JNUEtrWm1CcGNQVjZsZ0p4UUdCT2pEdno2WVNaY040ODFKOUtsUDRoOUdEeUJQU2JnUWpSNW1CN3JTZzZKdTJ0UUdnMkNVQTdVSUJZVW9BZWwwTENoS3ZIYTVPamRrcm01bjdKZWdGKy9haUFBQWdBRWxFUVZRNUEzRDJrVlA3amw1UDZwNTd4eXcrRXEzODBGNC9Zd05vZE9mK3R6MnpjYjY4N0llOVhic1IvN0lGWGhpb2l6OWQxUHVUVnE4STk1LzI5UGtkSHJhR0VuNUFkbkNHNEtIWndwZjJwUVljR0xYOTJCTEkwT1I5czJRWWIxbnlNZThEQUtiK1FLK1NmUm9xTmlEaXB0RnhRUE02N1l0RXlhaE9WdWNSeVRqdDR3RG9LaVdnMEN3R1cyY0dKdDEvKzdwMTEyZi8zYTlzeWQxN3pnQUFRUG4zNzhqWGc3Rit0M0JzV2NYOUIwbldGK1MrUDNSQy9jS1RJM3gva0VqL0lKcnozRVc5ZjBUS0Y0UG5mZnBsVzk4ZjJwVjdBaWYrUkZ5S3dOWVFBQ1Q4QU5zQXZCMHBXK01WZUdpMjhCY1RxWnFmUzlUTmxKMk54OHlkbnB5Y244aXRadUhDZnFOZ0dzZVhFMU9ad2d0NzlxQkE4QWdnTHhYbzFZNUNBV3dEOEE1M3RWQVF3SnVCTFI0YW9iS1dBSFRaSlFDYmJnYU91ZDlPQjlQNzBkOXRWU045THhvQUlCVkJENzkyZFU4ZEFBN200V3EvOUdURzl4ZlcvekFmaVhMbk9SdXdkdCsvdTVxZkxvWTlBT2Y3UitzL3ZDV0lUdnpLNVA1b00wQXpQallEQk9USVJOSE11R2d3UDM1dFpEYnBCd2RtL0V3cDJETmQyRDBscEpqMFN4bDBaVngzYSs2REx4VFBuVHd3bFNsY0duQm5yUW42VEJRa0ExU2pqUUcyQWRCSktMRDJsTUI2VlFjSkY1cW45anVmSTAzUTR3M0QrdEtwMVU4dEdqZiszc2Mvc2tsMzVOQ2pCdUQwNU9RZE54VkdTMzJ6UC9QcUdyTyt4ZG1oN05peVRQcG5lcjZFZCtsaWhTLzJvTWo5NzNUTWczcTlmMXZaUjZYYlM0Wk92WDZHK21XV2dDQWJlT01ycVFFN2UvdTNyMzN2TGFrZzBaOXlEYzNON2NpdzRQVGs1Tksrd1VJR3BzYTF1bE4rNElYYXVaTUhWaFBGeXdQMitld29TR3Rwb3VJQVBocFllMG9BT213WWhpYjdDNk1CN3VjbytlWmROb3UxazRPRVd0RG1tSUdUMVMrVU5PdVE4K0lXL3R2dVVRTUFBUFlISDZ3ZW4wOFk5ZmtiQ2hHbnlkeC9lbFgzdHVLUGJNeG5kNzYvU3QxbnhKWGJqdnBSSC9jbUhQYXBXUFRKUndEcU5UL0FpZjdScE0vRDBTSHJOZ1FpdlRKeFlYUk9SODVBTFhHMDdBNDZjR081c0gwVEJzODg4WGhnMks3dTVQdEtRYlg2am4rb25YL0xzWVhNMHN4ZzlWcEt6eHRab1pjcXV4cHZESVJhRUt4SFZrQnkyVGF6Z3lTZlVpb1M1VDdWZVlVb2J3WjZJeVd3SlgyL1BIclhBQUJBOVErT0w5amF4RWgxYXE5Z2ZUaWg1aFBSN1FVQTlZV3NNVm9FK2NBZjlndDBMdjJ6UnpwaC8rNUlIME54emsvWHZ2OGFSWDl5VUdnR0hCMHNqOTBDdEhhd01jaTRhTURPVHM1UGZmNXdvcW9aL2RYVTJKeWJxcURoNnlzOXF4U2RmZVRVeGVSZ3dRd3Vab3g4cWpxZjlvTWc4YVpyKzRKa2NUVlJuQm1zemliMHhVUVNBaE9neVUwZ2RsU1pLeE1oaUphRElyUWc2RW9Pb29VZ2tKaUJUclVnc1lNdm1mblRhVW9BRkt1RHRqWWxvSlZPNVovZS9MNWZIajF0QUFEZ3RWOC9lZUhjME8yUG5hTVA4cFUvMEt6N0hBeThxM09qMmJGbEVFbi9HQ29sLzlDNSt3L2gxWDA3MWYzWE11SWY1TDQvbWV3UDFIRC9OVXIvMEpYb0gwSDlaRjhSdzNVdlYwcU9WeUJoajl6MC9RdlAzWk8wTTBiVzF0TjEwM1NUL1V0dXN1eVB6aTFzc2xVNFBUbTVzSGUwMXFmbGgwM1hyRlVNZHlYaHA0UDZMMTZvZlhYd3FKMVluRWxESVZPYlRlZ0ZDK29hR0Q0NGtBWGtBZ0FFWnA5ZkxHdFpBSUFnMGU4dDV2VVJ2QVVBNUNlR3Zla2xmVUtTU2hVTHBMTGtjTmVoZ09MNG9LNW5CNm5ZZ0M1bmlIWlZJYnB4V3RESjZoZEtXdXFRODUwdEZ6WjczUUNjbnB3ODl1YVZpVkpxYWZJQzh4WVRBZENhRHdBVVo0Y083bDJZOFpQMWhXeDJiTGs0TzJTTUZ0VUgvWXRyaE9Rck84cUtQdm5iZFNUN2RLcjd5MUsrZUNkNnluLzBMUlRaWDUzNlF4ZW4vSDNpOWN2ZzZtQjZvWDFzRHpJdXlybUI1dWRRTFh2YkQxLys4bzliNVp6UjUycllNQ1RxRnFxbndEZjJPdVhjYW1HNFVzaXZncnFGT0QwNTJUOEFTK2xjWVNBM1ovWGhwZHRzdzZrYVVFeDRaZE12SmZ6Y1N2Qyt2N1ZmdnZPMklGbjB0VUxCUkNVem1NNjYxelBnb0tRVjFNalZNUHMzYkFCS1drSE5RVWtJVEVCdXd4S2drZGE5a1ExQmduQ1RmRlZlY1dKQStITzZ5d3h2d3V3Z1VFZ0xONDkwUGtPME4rUWdQL1hTa2VMaW1MdkY0ZzlHcnhzQUFDZzk5b0J6dzFJSytYUXlRS2ovRVBkZmZkcHpGeVgvd2k4cFkzODZDSWlvK1FHSkRlaW82Sk5uZjJhRnJ5NUdQaWdxL2lBUy9hRWQ5UXZWbmdoZ3VpZGJETm9ZMEJpcUJSYnlhY05ndWxiZFN3REF1d3V2WEwwVS9QazdFdlBEdXVVRmhnOG1CRG9LRE9RRGdCOGdMMEErSUJkUVhRTkhSNjRHZTVlOG4vMjZmZkFJK25MdVZnQXdkTnRPTEFJQVp2bENwdVlFMm5JU0ZjS2toQ20rOFdOUmc2QTExTEFFaGcrMlppVjhoOWlBUHEvV0NBSm9LT1F0RzhjcE9ZaG9RWTIzMXE4NkNOUkNBY2x4MVlYbXUyd1U2UGt1QVR6MDdYemZiWi85blErdXl3WFhpRzFnQUFEZzVjZnUxUWZ0RzQ0VXB2YmFOUFhQK01seHJYWjFiaFE3K3lRQ0VGYis4SmZ0enZlbmd3RDFtaC9aMTVEcC90Q2g5RzhhWHNXeDBwYkQyd0JROC8zYnNuL0UxOEJnU0QrQy9ZbnlvK0x5dDc1dzJBRFFaZ0FBWEExTVA3UkR2OFhEOU1IMHdQSUEyeTBMK2FUOURab2R6cmFHSEIxY0hWd042bHJyNHN3RitTTUFqZk1CR3M0K0FQaEJFZ0Nzb0laNW44UUJQdSs4MDRvUWRHWURBSURQQ3F4amRaQmlhUkJ3Wm9DK25XSjFVUFRRaU82WEZkdTZsTUFKOTFrM1NCeTF2N1hsNGcvRzlqQUFaUEZ4bkF3UURuNGd2ajhBWUV1QVpSOW81bjR4czljWHN1NVFGUURNNVpRN1ZGWHArY0pZaS82ekViNS8yMFcrMmlaKzFSMS9mTEJUNVVlSUxrUi9udXNGNTNEc0wyUnFnbnI0dU9GSHZVdHVRUkJ4WmZKeEl2S1FseUNLQThnWHNEVUwwWCs5QWZjL1BXd0dPcEtEdW00VzY3cGhlRjJxZzhUVi9SMkdBcW8yQURZOEpSQWtYanRVdmQ3dkZUWnR3YSsyVUNybjZCR00zMUFjUG5NTXFEay9WK2RHQndPdjZwa3JTTWVKMy9wQ2RseXJGV2VIcXA2SjJSOEFNUHVieTZtcVoyRDJCNEQ4Z0VNV2V5R1F1Zi9NRGpSOWYzcmJPSTdsNGJEdlQ2N0paSDJaTGZWV2kvZGxFUUNtZStMNzR5MTVWNTM5K2JkNDJRZms3TS9RUGZIOXlaWUJjZnlKSmJBOC9penUyeloxZjVNN0dSTXhZV1M4NDJxdHR4alV0Wll5UTNnZkh5Ui9tT3VUQzVMQUl1TEs1T040aHpZR2piY0NFd0Q4SU9sQjYvK1hyZXVBdkFENStBOEFBSEliK1dIVXpHeGg5a2VOaWpnOFlvSGVhWndWSklPd2RZSG14QWg2cC9XV1ZpVjUydkR4TXJObFFJUWdBQ0E3MU1mYlRBM2k3OGovbkFEWkFRci9PcFhhVU9hQzVHK01YQXJmUXVOcUM4UDNZdjZHRVRUK1I1Q2Rqb0RBZmUvSzU1SXcyenZzRDl2RkFKdzZjK2JVbVRNM0lOTzVjV25QeFg3cyt3OEdIaVo5QUJnTXZPTHNFQUJreDVabi9DU2gvdnBDRm05VGVwMVFQMGpXK1lxUS9ubVFrbi82SUZuZ2x3RnBPcU1Qa3BxZmlMdjA2VzMrcVdFemdKVWZ1dHBIM2ZjSFNmVW5Fd0h3N0M5czdDSnBBT0JzQXpSZGZsci9BWGtjZ0YxK3ZDVVJBS1A1QUVmOTBTRFVUN096K082VUNWSGtmY2FvTU9kZ2FLaG1RWkY0OXg1WUh0STlCQUFlQUFEeUFIa0FFRElEZENnUXRnRUFRRExEclNPb3hteGJielcxSU9icnlXd0FoTFVnOWxQTk5BQmRKeHErYklYRUFYaEwzNDdzaHo4aUtQaW16UUErSWRCc2lwMGR2TVU3emUvdEFIS1lpK0JRSUhScHpXYk5BTExibWdFY0N2RGZNeHJIM1RPdm16OXhTKzBIblg1d1E3RTlEQUJHNWxQUHBiUmdCYlFUczhZSzBsZVFqa20vdnBERkVVRFZNNHV6UTNRdEVMWUU3bENWMExxNW5HSjJNTlI5ZndCd3E0MW5VcVhoaTkrUDl2M3BIWm40QStIQy8yamx4d3hiS2RyM0p6Ti9hSmJIcEUrTzRBaUFCNjMycUlqK1FHVjZPeEovZ0V2d1l2QmVmN1RtMDViMGdlSjkrbEp0cjZsb1ZEQnNIUUs5QW9IWkVId0NIUUQvUEs5bEJnQUFnQTBGTUFnOVVaekkySURteDJ1OEZpUUxCYUxqQU5sTGFLWUJJbXdBVU5FQU1RUDRSdktic3I5RndOMFNheEgrV0RzYklGdEpoZ3M3UXNOS08yZi9RODRQMDY1aGdOdHJVOUMza3dFQWdOUy9mRWxiVGI3eW5SdHhIOERCdlF0RS9NSFVUOUlBeFBmSHRFdm9IdXYrYWMwajY0NzFyMHBEU0x6Q0Y3MERBRlZmTjFNdUwvb0xzNzVFK3FjUHJ0SDNaeFIvbkFsby9EcXE2cDgrR1BvNDVmdVRDSUJtZVZyMkFaSHZENXgzVHp2K0RBajFNL3N5Q0IxLzloeUtwcGtkSHJ5cUk3NHZaVXZhQmhOQzZvK0doeHAvOEt0QXgvcDRBb0MyQWNDSEFvM0RLUHp2SVp3VGxzbEJ3amdBSktFQUllVzJab0M3V2luaUpUVHpBVUpSS01JR01Gb1FzeU0rVFhPaVF3SDhjWUVXUlArOTRYZkRZUlovT3dTdXFpWFFseDVmK01RUiswSlBpVDhZMjh3QUFNRGk5TENaS281OTRSWUFtUEdUMEd6NEloRUFQZzM3L2tRTEl2b1BYL2t6bTIwOFkwTDNuOTVpeDE4MjVWOVk4OE5JLzJ2MC9RR0EwZjBCZ0piK0crZjRPbkM4RHdDdXIrRS9UQVJRUkxxcCtVV2s5K24xSXRMYnpuZ0FUdmtoTmFEQVNmKzg2Qi90L3BNS0g1QTQvdERVWkJRZGY2RW1JN3htZFBJQXdpcS9JdldIZVQvMFRxRFZBTG5JVDZCQWcwQ244cFpOQzhuTFFUUkVZZ1VmQ3BCdVllYjJNamtJK1NraEkwZG9RYzBMU2tNQmtnM0dab0Q5b0Z5QUFpNGx3TGp3NGh5NGI0VnNBSCtDS0o0QTRMSUNZVXRBNWxyVFg2bXREVURnbml3OTk1Y0Q3NzIzOHMzb003Y0UyODhBSFAvTWFmOWErbXN6K2cybkR6T2RYMEF4UG9rQThFc1NBZlN2V3BqOWllTXZkTkloWE83WnVFaktoV2JaRDMwOFF2bmhmWDltaDNyTFpYWVlNQXU4a0lwUFUvTk1nOVg2K1RnQW12NCtuL3ZOQnA3cmEyUXJaSDloVnhldiswTTREaENLL3VKZjEzVDhlYTAvZEpvVzJxbzQvb3FhRDdtSUtSSHhHWlUvK3JKeTNnOEIyd0JLRHJJb09RZ0FSSElRZzdBWldMc053QkVBejhna0c0eHRnTkFNdEpXRFNBVEFtQUZ5TDJGS0lNSUc4Q2tCb0xJQ3JRdUo0Z0I2QjBDVUV3WTIwZ0xSMzNCMEtIRGNQVE52N0M5cGlkNmNYclg5REFBQVhDcHFoNGJxbHhPMW0xL3Z3KzQvN3ZzRml2ZHg1UTl4L1BGT3hkZUo4b04zZUNjZG12NSt2cElpeWcvMi9XWFNQNS83N2FMc0IvK0JkbVUvUXQyLzRsaU03czlQZWdDQTVjQWs3STlkZnJ5RnBzNVRiTGJVOGI0L3ovTEUwNDlXZmhRci9XbkhueS8xYVoybVVPQlBrN1U2WkpsZTJ1VlhzU2dxdkUralpRTllPVWd0SlNDNElFdWFRS2xBZkZxWTJXbGVSTXpJMExRQlpKOTlWeUVsSVAvbXJTNEJjcEQzOFNQa0lPNkM0VGlBU3drSXZvUXdMUXlzSXNRbTNpVnA0U0R4MnFvMmtJSDVYbWo2RldKNzlBRUk4ZkpqOTE1K3ZmK0JuNXo2d1dFYmozMG03ajhHVS9KUEN2LzdWeTNDL3RoRDc2anFuLzhtc2xsdndtblAvTWZwQlg3WFB1bXpvNFVlYVdESHY0aDBIQVF3N3pLVi90R1RIbmlYUDhJR3FKZjVNMXNoNk5MN2FLaVVER0dvWExBajB1ZUIvT1k4T09RR3lBZmt0WUlBa2g1by9qTnJoZ3ZoZnllU2psYkJ2U1FMQ1d6RTRLQXVsaE1BNVM0QmFOY3dUTFNnYmxZWTdtcEptVkNYZ0ZZNmxYLzZmUHJFWjMvM0Y0VS9weGV3TFNNQWpNdXY5eCsrcVhCaFB2bldoWUJVL2RQS0Q5UHdoUXYvb2VuN1kvU3ZXZ3hINXlzcDRGeCt2SVBaMzdBYmYybDh2VDhHNy83VFhqOGovaERTank3NzRYMS9JdjF6emo3N2xaWURFNmhhVDVyOWlmdFBaQithL1JsL254SDlRWjc3NVZPK0VSR0FpdTlQaS82d05zMEhLTUZIcVBaQWh6bmVUbDErSVJweEFFQkREcEtuQkVBbUI0bjhXVVliYVIwbkFRRVZBWFJVSWJxV2xFRHp5cTBpVWY2bUlBNCsrRW9ucmw2SThzMmpNd0gwUlVKWkFiVXVBWkFJYmlRVU9Gbis4aFhyclRkVlhsTDVEbHVGYlJ3QllPQnhvZG1mbXlmdVAzRzlNZlhqZzR6N1gvV01zYUpHMHI4TVpMUCszYXBaVDdBZmFidkdDMGJYSzczUUhiOUFMZTdZYUFUcjNQRTNOWDg1TUllUWk3ZjRpeTBIcHREeEo0aUlBQWhrVTUzRlgwbkI4UWZPOXdkNXZiK2k3OS8ySWhpYjRQWHpZT01BQUNvVVVJc0RnSFZVVlFZSGhZNTNHQXFvenc1U255RWFQVUFVUkEzRDBVTWptc2M3SHh3RTdaY1ZFOTd1cVB2OWdjS2NrWFo2VnZ6QjJNWVJBTWFGYzBPNVcrekI3K3lGcHVPUE8zN041UlEyQ2VaeWluZi9VM3A5TnVzekdWcnMrNFBJL2NlVlB6VDdSM2Y4MGlpSDR3RHF1QW50YW40SUNPa1R4Ny9pV0czWmZ6a3dUYzFqWkI4NjMrdjZtcTBoa3ZzbEg3UTFaQ0dmNmVlaVg5SVJBQUhwN0ZVcDltL3IrQXVic0dSVGR4VHp2ZEdsL1lwZXYyS0N0d3VFNG9DdVV3S2kyaFhGTGdGNmNCRDMzYVNOQXRIclNvWk9sbFNJQ3JzRXlPMmlVd0lnend4elh6V2NIT1l5dzRMcUlDd0hDWDVZVkVyQVQxeDgzN2VmR1N0YzZISDJoeDFnQUU2ZE9UTmdKNjN4L0ltL25zQ0pYOUw4VlYvSVZuemRIYXJpcGw5YzlrTnJQZ3haOTZlcjJBYVlLYmNTR0xqbXg2MmF1T3FmS0QvUTdQa2lpVjlVYlFnK2VJZEc5UEplR0JFbC83VGkzM2paTE84eE5VOVk2a05qQ0xtVnVzbE1mS056djFqeHh6dVk4ZkUyRzNoRnBEUDhUZzk0WU1RZm12SGJGdnZUZFQ0Uk5UK000Q01zK0ZIUDk2clU5U3RTLzRZaTBHcXRTbk5TSVNydkVwREtRWnduSzdRQlpOczRvbGVoY3ptSUxnMWlHOGYwRW9oNG4vcHNvMU9NendmUXpXTE1yK0NsTFNGOUMwN2poOGRGZEFrQUpRVHhqUUxoR3hFYkVPaUZoeGIvOTNkdnV2Zlc2Vy9KZm5YdllOc2JBQUE0L3BuVDQvUFc5RURsanZOSm9Fby9NZlhqQ0FDYXZqL2U4czFmbVBxeERVaWpPZ2tDTVB1bk5JOTIvMVBJcTFVUzJQMUhWU05JTlNLSkNoTmkxbHJzTDVQK0liTGRsK3kwWkorbXArLzZPdjRqbS9RSm9wUXZrWDB3NzJQSEgwdi8yQmhnM25jQ2pTbjNaTlIvUnYraGZmKzFpLzVNT3k1UC9jVGZWOUhvb3hWL2ZucVBFSnRBL1MwZ3AwVmJvWlJBSnhXaVhKY0FpSGxUV2gzVWhRMEFBSldjc1BnRTBkQUljbE95Wlg1TytMY0liSUNnS0picEZKT0FOUU44S0NDSnRFNlducnRpM2RXWFd1M1pWZXBvN0FRREFBQ1pUejFYWHphKzhaV0plNjVvdU9BSG1yWC9OT05qOXgvclA4d1YrdE5WTFByVDdqL2VHclpHMHIvVlFNZGJRdnBCcWlYN3BLbC9WMlhQUU1sV3g2OHNDRkNaOWtPMkpBSWdIYjh5OFVjMjVoUExQcmpGbHhSOTBzVS90R3RQNUg0STl3SFFGK1I5ZjVWaWY1RDcvaXJEbkpsQm05TGJhYUhQUnRSM1JtQlRxWitBdHdHd0JqbUlQckFlUXlPWW5lYkxVSXVBTEJUQU5xRHQwQWp1M1M0YmhxVVJRNmVEZzlTNkJFN1lYNTgzeHpPKzB5UFRudHRpaHhnQUFMaHlJWGY0eHZ3UHkzM08xV0djKzZXcEgrOWozUi96OVZpeDhkdXg3NDhkZjc0RWlKYis2d2svaGJ5aWhWTEl3Mm9QM3FhZGhwcUVJNENnWmdCQTJvV3laK0F0L1QwVnAvMHdOVDhkVlh6aXNoK2M3TVhOWDBDMSt4TDloK2oreFBmSFp4Si9uNS95QmdxK2Z3U2lmWDlHNm9uSTB5cXlQMGk4ZmxDVCs3ZUcrZ21RZzhkRkFBaFRBdERCMEFnUU9Lck0zWGc1Q09lQlpVT2tJNXJGMU9kSUM5OFNkZ3ZMN2doQ0gxODVGQWhmU0sxWlRENDg3cGg5emlnRm1XQ3g5NlYvZ20xZkJjVGd5NSsrWDYrNnlWRVh4d0drNGhPWC9VVFgvK1FyS1JJSE5EN2w2NGF0MVJNKzN0WXFpV1RhcmdZNmxuMkkrRlAxakxRREZRdUNtb0dTamNpZzdTcVB3c29mWWJFL1hmS3ZXUFlEVGYwSHFJbHZaS2tURWdId2ZiLzh3bDZ5QlY0VXEzMGFYNmJEbWg4Wk9pcjFrVjBCRklwOHRwTDZhUVJXS08zWnFnNGlWTlZsZFJDSXkrckZ5d3MzM3Uyd05JanNpeTRWMVNVUXNaWkFSRjhDaEg4Ulg5WFRYWFVROE4wR29rWUJMM25wdC83NnFWY203bjM4RDM5SCtOMTZFenNuQXNCNDk2UGZSSE5XOGMvMkVQYkhFUUNXZmJDZlRyTS9jZjhCd0V5NUpBTEFmNGowajdmSnRGMnJKQUNBc0QrcUdyVHZqNUoxN1A3akxjMytmczNFMjJqcFg5anVpOHM5R3lkRVR2b2tKZitZL2ZGTDdQWFBhaWIyL2JIZ0ExUWlGNy9FR1dCOEhWNzBoN1g1L2dEdGZYOUc5T2ZSVWFtUFRQR0hkdXkveFk0L0F6b09BRmpyMElnd2hDa0I0Znc0UXYwZHpSQkZmcCtzVVdEZGgwWUlHNGFaT0NCaWVtaEVWa0E4UkRxY0VnaU14WithL1gvZnVmbnViWkg0cGJIVERBQUFPT2Y2Y0dFb0VYL3dEdFo4aVBLRDBaK3VBbFgvMDUrdTRzU3ZtWExyQ1o5VWd1SVNJQndCQUpYNHhieFBwSDhjQWRDOG4yNCtobHJTTFhzbTNncDFmMzdJTXozbWswai9qTy9QQkFGRHlJWG16QjhBSUpsZTE5ZUc2eDZkK3dXSzBQSExoQi9nRERDdi9IU3QrN2VkNlErVTZCOHhkbDlScjIrcitQZTA1aU5GWTNSb3c0VmZlNFVvZlVBdEpjQm5nMXR2UmM0UWpXZ1c2MmlPTkg5VHh2Q0lod0tKWkJ4OERqODdxQVhKQUZGcFdsaXozN3Z5dWRuRVJDWlozaGFKWHhvNzBBRGd3bEJucUVac0FQYjlzZU5QM0gvYTk4ZmlqMXMxaWY3alZrMHMrd0NBWVd0RkM5VXFpU0JWeHhFQUFLQ3FRUklBV1B5QlpnU1FkcUZpQWdDUUhleitkK1Q3UTFqM0J5cnhLNXZ5RDlTOFQzSmt1U2tGa0dHZlFLVi9DWVR6ZlBnZ0FFUGQ5MWNjN2NsUFpLT2hvdGV2aStQZncvQUN2Y2lzQjlsOWhTaEFGeWtCa0tlRnNTQVRNZEd6ZVMveGtqS3lsOURVZ2pwS0NRak83Q1FsSU9zU0FENFVhTEwveWNLM0xwcHYzVisvdUYwU3Z6UjYrbC85V25EMmtWUE9VTTFhVHE2OGRZNU0vaEdxLzdUMGo5MS83UGhqNlIrYStnOHQvVU96K0llUi9yRVpxSmd0NmdjQXYyWnF5Y2FvSHdCSXVWQU44eit2OVROemZrQk4raGV1OFl1RklPemowNnM4MGtXZm9OYm9TNkNpK3pPaWY4UmsvNGlKbnFBbStxOVI4ZTl0Nmc4QmVkblFjaVhybEJJZ2JNaDEyRzVTdDNEWEtZR0ltekkvUnpFbElGaGdNckpoK0VUbGV5V3RmNCt6c0kwU3Z6UjJZQVNBY2Z3enA2c1hFaVhUd1hFQW8vN1Q3ajhHRnYwWjlxOG4vSkpuQWtDdGtwQWxmZ21DbWxFeEFWc0NodjNMbmttQ2dDcjNKUExzejR6NGoyWi9mdEtuNjJ0TXRRODBXNzNJT2wrazhGOUk5TUpHWCtCbWZFYUFLZmdSbG50Q2VLWS9ENVdGRzlmaStQZXE1aU5GS3c0Z2N0QjZwQVNpMTVNQlVTalFhWmRBeEV0UWs0T0VnNFBrSnFmOURGSGhyeFowQ2NnclJOM1VxNDVkeS9qNWJjcitzSU1OQUFEa1YySDV2T25wOWx1L09jeEkvemQ3Tm5iODhVdlNBWUJ0QURSRi8ycWdaM1FYeXo3SnRFMUtQeXNXcEIwbys0MThMNm44U2J1dEdsRE0rRnJTeFlsZkxlbW0zUFpGbncxaklHbnhsWlg4UTFQOXAxKzZ2b1lIL2dEVjhVdmFmWmtJSUdKcFg0SXUxdktOYnZTRnlBaEFaYUluZlIzWnh5UFlmenVpWVFOZy9WSUM0ZlZWMUxzRXNBM29kSTYwTEFob0t3ZFJneUpDeXd0RE13UFJOaVVBeXBsaGxXWEY2b2xMdjMzNnZ3eVVML1hnT2wvcTJNa0dBTU9hTTY0azY3UU55RmRTczFrZkozNkorZy9oOG44cys2Q3FnWGVJK2svNnY2Q3ArT010ZHYraDZmdFh6QWIxQTBEVmJJejc1NVVmRUxGLzZCeU84WG5wbi80RHpWQUE4ejd1K3dVQVV1WlA4ejZ0L3pDeWoyelFHeWhNZWxBcDl1ZTNETlFuZWtaa2pHWFlkbzQvQTlZR3JOL1FpQzVTQWwwUGpaRDh0RFl6UkdXUXJUTFAveHpaMEFqdWdsSExpbm5XekJOZi91U3JZemZlLy9yMzFMOWtEMkk3UHdmS2VPVm4zM1dwcUwxejNIdjIxQUkrZ25tZmJLSHAvak1mTEhsbVJuZXhDa1RVZitMK2s2SlBzb1BWLzVKbll2WW5OZ0FBcXFhUytzOGpRdmVuSy8zcGxYNlo3bCt5MUR0aGYyYndBMS9zTDhzQnJOZU1UNGdVL2J2K0xLakpQanNEalh3QWdDZ2xzTllab28yVDFSb0ZOamtsMEx4SVo4c0pSQThRbFowR29pNEJ6NXA1ei9XdmxHcXB0NzcyNHJZcisyR3c4eU1BQUxoVTFJNWsvZGN6N250T2o0S0kvUUdBWWYrU1p4WXRoTmtmZS8xazBCdk4vaVQzUzBSLzR2dVRiZFZzOEQ2NUErLzc4K3hQRnZacTIvQkZxLzlFOE1GdnlZWTlDTm1mbG4yRXl6cXE1SDRWM1grWmNLOWU2OW0xNkw5akVPaEYwRW9BSUVvSktNaEJESlFyUkVFU0N0QTdqWmNia3hLQU1QdlRpbEIwSEtDNHluejRSbXdjNEp0TDc3bitsWm5rM2t5eXV0M1pIM1pKQklCaGYvREJxZjNWdlN2R21aOVlyUVNHSUJ0TGdmYjlhV0Qzbjg0QnRONFN1Zi9FOFdmYy8ramx2UnJudFBQOWljc1A4blpmQ0hmODBqTStGWmYzd2xoZjMxODIxWG50QlQ4eTdDVHFwNEg4SlBoTkg1bEpiOHFYRlVOazlQZDZOQXkzWFZhc2VSMXBLQ0ErWHlFT2dFNUtnK1JMSTZoRlA3NFZhTTVQTC8zSk5ldmd2dXJjZGl6NjVMRXJJZ0NNeEI5OVplK0tjWDNVbWZ6R0FGN3NseVNCR1VTemY5azNncHFCMlovVS9NalluNVQ5NEszTTkyOHIvVE9neXoySitnOVUxVDlwOXlYc2IydUltZlZHRUozNEJiVzZ6NDU4ZjFuT3RydUNIeFhSZjZjaTBHcUJYbWkrNEZJQ2ttWEZwQ2tCRURjTXMwZkNjVURiWmNXUW40b09CV1NkWWhFdm0xY1d6eENWakNvU1p6Z2dIQWNJbHh3QWdFQnpIaXA4N2xweS93SG42czVnZjloVkVRQkc2YkVIcm84Nit4YXN6OTh0N2dzbjdDKzBBV1hmNk5QcWpPOVBQb2pyL2VuNkh4Q3AveXFPUDhqTkFMTzhGNjM0NDVlMHl3K2lIRUQwa0I4Q2xkbk8wSW52RHhMM1g2VmFQeUp1aVA3c0RtWi9BbUVjc0RrcEFiNUdLQ0lPYURzN2FDMHBBY254THJzRW1ITUN6YjUzOFhJeFlSL3lYdnlOajMxV2VLL3RpRjBVQVdCa1B2WGN2Z1hydkFFUGYxZHM1d2tZOWlla3ovaitlRXQ4ZjZidGk3ai9yYWsra2RJL05LZjlFRE1RRGNMK3VQQWZSd0QwcEFleTBndFIvL2xsWG9SVi8rdGU5aU56LzlzeWVOdTRRZmJaN1Y3dG80NUFxd1hHU3ZORllndUhSb0E4SlFEdHFvUElQbmRCcFpSQVJNTXdoTE1DS2wwQ3pZODNYdDY3ZUhuUlNtZnR4RTVpZjlpRkVRREd1WC8rVDY0c0cyKy9zY2JFQVRMSEgwUG0vdE9maXFqOGNldDZMdkNJTVpCVi9uVFU3c3RQL0FmSzVSYzIvWUpFL1E5ZGdXTC9DUEZuWFh4L0ZkMC93dmVYWVpkUWZ4ZzZxZysyWGpHaGdEd2xBSjJFQW0zamdMWXBnVWl2ZkUxWmdVNUxneVEvaHoxeTcrSmxWQzBkV0xuOHEvLzlHZUZGdGk5MlhRU0FjV1haT0RSVWZ4MmhmL0czclg5R0VleGY5aHVpUDhQK0pjK3NtSUEvUmVzL3VQSUhzNzliMTFOdVEvWXBJRjAyNmdjb3pVZEYvS0czMEN6NHdjdDdFZVdIS2Ywa0ZUN01rQisrNHhlVGZsdnBmNDBsLytxNmY0VHZMOFN1Wkg4QThGcHhBRkRjSFZwV3JIRm00Ny9yTkVNVTI0REd5M1lwQWZsay83Nkk0WEdnRUFwZzlwZUZBZ0R0dXdTQUN3THVYYndNdGNLUHYveWxROWZQQ2IvVnRzWXVOUUNuenB5NS9VLys1cmFTY1hhdjk3WVhCbTcyYkFBZzdKL2hwblgyYVhXeXBaSFJYYjlta29sdjJBWmc2aWUrUCtaOWVtbGZlc3luRUVMeGg2bjhJVnQ2M29PRmZFejZ4QWFROVIzNUNBQkVpVjg2Njl1MjdJZmU0ZU1BTXVNem9uU243WEsrRWVXZUlERWV1NVg5TVRnYnNLNURJeG9IQkd1d1NJZEdNRHVObC9MMVpHZ2IwSVVjSkd3WWhtYll3WjhQa29aaC9BY3JQd2VYcndvL3VBT3dxNThWQURqN3lLbEZ6NjVjdGJTSFNxOW1ORDRDaU03Nnl0TEZtUHBUTHREVUwydjF3dWhpMEJzTjJ0T0hwZ3FFUVMveXJ2ZTFqcTRBQUJZSVNVUkJWRGp1RGRvbGZodmZTbThGQWJRQm9DZjdkOWZ3RlpkN3JoR29QaEorM2E1Q2xOR0NnSk9EOEJDNnNEelNVWVdvK0h0R3lrRVFUZzlRbDIwL1BJNTBDZENLRUxrZGZWTlplZWg5QzljWEU4a1J1N1o5Ui8yMHhTNk5BQWlPZitaMDVhb0ZBUDZYTXJlVWZKbjZEMkgzbndRS2pQb1BWTGNYWnY5YzBPRDlsQXNBa0F1a1EzN0l1RGZoQ1cwVmYyYVJkMmlPL1FFQWVwRjM0Y3lmME5Xb09UK3l4Ry9iYVQ5dGZYK1ZkdDlvMzErSW1QMEpBbU14L0hxZGgwWTBydHBKaFNnL09BamtjaEJJYWtPYlY0dXFFQ1dGb1h3K2dBaEJ0TW5oQndjRm1yMGIyQjlpQTlEQ3ZucDVWYitsSkpVazZDQ0Fkdm5KRGxiL1U4Mm5CdnYrZUl0ZmtpME5NdHlmdFA3eXR5WXJmSkhTVC9JV3ZhQWozZmZMVi8yckxQSkZyL0lJOGlCZ1hkcDlaV2lyK3d1eGV3cCsxQ0d6QWVHVVFDZHlFTFgrYmV1cW9wUUFzd1BOQ0tDamxFRDRuSTZYbEFGNWx3QkVwZ1FDemY3eHVlWEZoTFhqMlI5aUNZakdsejk5L3pVL3RidzZsRGg0SFIrSjBIOUFralRHQ1FEcys1TXRBSkFkSVJRSC9zZytUZy82cDhVZkdtMG4vcXRVL2E5THUrKzZmekNtL2dnZ0w0dThYSWlqRzBOQStTNEJFTXRCN1VxRDVCMjI0aFdHMTdjNmFCMjdCSkNmOEkzVis2OVhGeFBXaU8zc2VQYUhPQUtnOGU1SHY3bThPblJMZmVGREs2MDBtckRvazlrS2diV2dhUGJIOWY3UnZqOXA5d1hPOTRlbTEwOFN2NHowRDNMM1A0TDlvMHYrNlIzRy9XYzg5MDVMZDdyMi9XTkVJTkNMZ1Y0SXNiTzBTd0I0T1FoQTNpWFExYkppc043VlFldTRySmh2ckw1MzRXdjUxTW91WVgrSUl3QWU1eDY5NzhxRjNQbTNISU1iWDhMc3p3UUJzdHl2MFBlUGNQeHB4VjhZQWZERFBtWGZtV242WmREUnNNOElySEhTWjl1Uy85ajMzemhJNHdDQVRWNVdiQzFkQXJDR1VFQmxXYkgzTG54dE9yRm53cDdmWWQxZUVWRHI0ZGxOK01uaDQ4V0J2dkZMYys5enZMUGpuaHRvTHNXcU5PODdRZWh2RDR2ZE50SVNFTmhJczVHR1h3SkFMdkR3RGdGaGZEL1EvRUFEQUovamJoMEZJR0YvSjlCMEZEaUI1Z0h5QUFFQTJhRmhhOGdJd0FqQURvOTg4QkRyL3V0QncvZjN0TWFXaHg0MGJJQ3ZOYmFoWDZTQkhvQ3JnWThhZnh0KytPdjRpRDNDZkJ5Znd5Qm0vL1dCNWdDdXEwRWthak9hK3pxQ0FGQUFvQU1DZ0FBZ2FHZ0RxTFdEQUFIeVdjWkFIb0JCN1RmbG9JQ0ttMUVkQUJBWUFhb2hNSUFVVTJqMWhnMWc3QXFxTjJ3QVoyOUNjNlFEYnUxR3pRblpBT1lFNUFJcEVBcGZHZmtwMzFqNjZmbm5keHY3UXl3QjhUaDE1a3gydFh4b3FQNHFhTC82elFSVCswOWFCUGhlQVlDRys0L0ZIMXp3ZzdkTC9EOVdBR2pXKy9PVlAweVRGKy83azBtZnVQQ2ZIQ0dWUDBBViswY1AvR2xkMHd1VkFMRmZTYTNxbit3SWU3NWs2S0pZS0diL1RoSG94Y0JZUW42aTVhR3YxOUFJYm9FdDJkQUk5UzRCWnFmNWttMFU0SDVqTjUxaXZySDB2aXRucDgyOXU0MzlJWmFBSW1CLzhNRWY3QW42OHVaWGo2THlVQTBveFYvWU1CeVI4czBGM2xKZ2tSRnZiWmQzeDVCcFB2U2tCM3lFbWZQYytnbWl1ayttN1lzWitLT1NBZTYwNmwrRi9UdWFFQmV6Zi9jSUxNMGRCWWFqMXo0MG9xc3VnZGJ4RHJzRTFyNmtET2tWOE0zNTkxKzhQSjNPVFZRS08yYkdwenJpQ0VDS3hCOTlwUzl2WGh5RU1kKzVxK0pBMCt1UEdCYUVnZG5mOVhWUzlVK3ovekJ5b3F2K2lmdFBwM3hwWUs4ZjYvNUUrcytHT3d5RUE1LzU0MHppTjhMMzc3cnFYM0ZwWDFuRUVMUC9PZ001dnJrQUREdXZmV2lFcEZ1WXJ4REZmMXFuZVNub3ZFc2dva1dnY1lKYXc3QnZ6di83TDU2R2ZIRjNzai9FRVlBS3Z2enArNi9QNXhhMUNlZmdCUm4xOC9sZTJ1c25JQzUvMTBXZlF2ZWZLZjRoeWs5MDdwZXUrdTk2dlJmRzhXZk1RUFMwem1qbEoyTEdaNHkxb2hrSGdEQVUyT0E1MHRGRHBQbk1zRXA1YUJjTnd6ODJsMGdVejczajVlOER3QTVZMjZzN3hCRkFlN3o3MFcraW1jenQzNzcyNjMrdjd6V2oybFV3c09OUHRDQUF3TkVBY2ZseEVDRDhMSjN2RlVZQVF2ZWZQa0hHL2lCeC8xV2tmNW51RCsya2Y0eUlJRURZN2h2eHFaajkxd2ZJOGEzWnhxNVNoV2lIYzZURDY2dW9kSXBoOTU4UEFrQ2VFZ0FxSHlBVWdtUnhBUExUNzFqOVNpRTl0VC9QVHZmYWJZaWZKeVdjbnB3OGt2Vm4rbjE3eWpqL1RtMnVQK1RYUnhSOVlxSWZSczZzbHpRMW4rend0Mmc3N1FkRTdqOFBZUVFBRXZWL3k2WC9qajRWcy85NlEwZjFRY3oxNjU4UzRLQ3lua3hFSEFEZGRvb0JGd3E4WitHdnJ5UW5CcjJaVC96Mm53clAzejJJSDZrT2NIcHljdWtJV2huU3ExYmY2cjVWNXQybHdCcEdEcjh0SUwxU044ZjBtcXdXaUNDNjhKK1o4NnpZOXd1UytwOTE3UHZ0VHZxUFdCcE1pSmo5TndTQmhieGNleHNBbXlvSFFZZGRBdlNDWXRGcFlRQjQzOHhMVThuY3VEUDFXNy83ZWY2MDNZYjRxZW9ZVHozNXNHZWhkSEc0Zk95VmttY1NseCtML3BqMzhSSGU4YWZmWmRDMjJ3c2tmVjQwRklkOXFoZi90SFgvTVRwYTZhVUw2VDltL3cyRjVreVEvUTFOQ1VRTWpWQTNBMTJYQmdWYStRTnZMRXpsckFsbmFiZVZlOG9RTjRKMWpLOCtkL2FuVHI3RFRaZU02MGR6K25JOTRkbElvOWwvR0RsVjBESHBqK20xS3VoVjBIRlhWeFYwMTlmMmFIYVYrcHQzZlUxSGdSOGd2RFUxM3c4NGh6M1FkQlI0Z0N6a00xdjZOQ05vYkludjd5R0V0NjFMaGFjK2VKcWc3Y3ZWRzIxZkFJMkdMOFl3NlVGanF3ZUNEcSs2cEtzTHcwZUNOakZDK3Z5bll2YmZhQVI2RVlJRTd0NUNnY0UxaStuTmd4clZLUllBYUlKT01hWlpyREZWSXRRc0JzZ0xkWW9CQUtyek9XSFE2dUptTVZSdmJGRTlmTndGQUJSWWdGd1VXSFN6R1BJeWQ1ZWUrNlV2dlhaaEpEZnFvdC80K0tmWDlQZTFneEEvVzEzaW1TY2U3NjlPVFp3dmFBK1Z2cEhvd3drQTN2ZkgrL2c0T2NpWGVDb21BRlRVZjhXMnI3WmxQNkRzL2pQb3V2SW5MdnZaV3FENkNMMEdPdlhHT2crTmFKelpTUndBelFsQ3pjOEt4dnFITHg2S0E5NDcrL2Q1T3plMk1uL0RKWHZYRnZ3SUVUOWIzZVAwNUNTNjBaa2VzSmFNL3RWOXE4UUcwSXhQQ3o2dXIvR1pBQlhxQjA3M2wxa0NwdnNYUkphZzY0cFA4Y2tkenZ1TXBmOWVCcXFQYUY1L1k0amJWcVFFb0owWkVGMGhTaEVDZ0orN05IVWxZNDI1TTdIb3p5Tit2TmFLcDU1OCtDQXEvdFJDNVJNbkVqZ2ZnTHU5YUJzZzlQMzVsSy9NQmlqNi9tUWY3N1ROL2E1TDRUK0RMaXAvWXVtL3A0QzhyRmJmMDZyVUZKbUJOUzByUnQ5cnpYT2syNFlDSDNoallUcHJIS3FVZiswVHNld2pRUHlFclFOS2p6M3d2R2JDYS9yNWQycXZEMEF1OExENnZ5N3VQODMrS3U1LzlMRFBkYXo4NmNpUmg4N3JQbVAyM3lxbzJJRHVLMFNoR3ptbzB4bWl5Tys3dS9EMzcvcGEvaDl1UDVZekVydXp5MWNGOFVPMlBzQVZvb3REaWJveHVqeHhGWStDQUs0UUNKcnRYWjJPZXU1b3NSZDhNSHJtOHdhNS94RURuMlB4Wnh1aEF4c0E2NU1TZ0hXdEVQM3BtUi9rbmI2eDVhVlk5STlHL0pDdEo1NysySWVIME9MSnVkcFhqNkxYQi9CNkx3M0hYempiaDFub1ViamVMOFArc3NFUDVDVkVVbi8wMUlkTmR2OWo5dTlsSUQrcHVSTkFOKzcyZklVb3hzK2NMMTNyOThmZDY3SG8zeFp4R2VoNjRtLys5c1gvZU51Umk0UGdsczFrWlIvS0xkdEl3eFdmT2dxR2tWUHdUVnp1U1VvL1NkMG5YL29KQUI0Z1hQMUppajZGZFo5NDdqL0Qvc0xxejJqcEh4ZDNSby83RjlaOUFvQ1B3T0NLTytsM2hTc0VDRDhTczM5UEFOVkJxeUkvaDhCb3pQUmY5d3BSTUFEWmpTSlI1UXBSWUJxR0tkUHl6cm56UnQxYVRpWnVXUEYvOHovOHQzWDk2OWlaaUIrMURjSC8rT1dmMnpOZE9IZ0VmZlVvZWptbkUvMEhBTWIwR3AwUWpwYitvWlB4RDV1bS92T0kzZitkQzEyM0QwTjBIQUJiTURTaWNaeUtBejV3OWZxbGpESG9yc1FESHRRUkQ0UGJFT3laTHZRUHdDVUFvNllmbTAwRGdLbjVXQUlpbGdBQVVvVjB4TXhuMmJ4UEdzSmhuL3pDQVB4NnYvekN2OHg2dnpTWXBYcUZFOXdpVnZybFB4S3hPSERNL2owR3o3T3VoZkt4N2VkSWsvbHgrQVB0NWtoem82U0ZjNlNabmNaTHZZcTgxTW5sMS83d2U5K3RhOEdSVWoxbS80NFFQMjBiaTZlZWZOZzE5V1IrekJoNTllVmN3eFZLRmRLRlRDMGlDT0RIL2tBN002QXkreUVpL2RzajduL00vcjBLWFhQR3NBM1k4cFFBYytUOVY2N1dkT3R3cFhqWGluMzhNNmM3L21XN0cvRUR0K0Y0NW9uSHRmUml5WElTVG5CMXZGaXBtNlQrSjFkS1ZuTVZXZTAvZEs3OFJNejloMjVyLzVtcG4xMk0vVkZmSkNBMkFEME1OUnV3eGk0QnRXWEZjRVJ5UStXTk4xODVjbld3Tm1FdnhmbmU3aEEvY0p1RXA1NThlTUl2LzlOcjltL2VPbFRJTko2ZnRVOS93MUFaLzlENzZuL00vajBQVlJ1d0NVTWozbi9sNnVWMEp1MzYrL0tEY1psLzE0aWZ1YzJEL2NFSC8yWWtkYmxQSzBQaXdwalk4UWV1NzNlTjVmL3F5MzYxcmYwWGRnREU3djl1ZytaTU1EWUFhRE93OFVNajdwbWZQN0E0RVR2KzY0TDRtZHRzUFBYa3cyWER6QlgyR0NPdi9qQWpYbUJTVWZTSFRnYkFkY3I3N0dteCt4K2pDV0lEWUVQbElBb2tKZkNCeS9QVHlVeC9EZlZYY3JIanYzYkVqOTBXQUdjRnlucVFyZVRtRHI5QjF3V0JKQUlRR2dNVjlsZGMrYXU3WmIrNmMvOTV4T3kvN1lESHh1SDlMbTBBS0ZTSVVpbUJlMmZ6SDdwWWVIWjhRUGY5MlBGZkw4UlAzcGJoa3g5OXREU3dYRU5ldG9LSUlxUXkrSUdHNHZnSGtDLzVHN3YvTWJxRHVnMVlZMHBnWDIzeC9xbmhzbFUrVXE3RXBUN3JpL2pKMjJJODllVERXYWk5ZmRiNTB3UDlNNE5WVUpqOUNmTDZIL29jbFluL0dMSDdINk03MERZQU5xWkM5TUdyOW4zUHIvN2pIVmtyTlJBdjQ3WHVpQisrcmNmWlIwNjk2aHZwSys3TGQ5NTJiV1I2c2M4QktnSFE5ZXhQZ2pVTy80bmQveGdSd0dQanlNdDFUQW5jZTcxMllIRmlWWi9mdjFRNmVLVVd6M1RiQ01RUFgwL2c5T1Jrb1QrWHl4ZGV2clUveU9WZUg1OHRlMGJiVHlsR0FJcTEvNXZnL3ZNZmlkbC9CNkFqRzZBeU5PSnd3VGw1ZmZoYTJvK1R2UnVOK1BuckZaeWVuQVNBL0ZDcWY3a0tBQy9kMC8vcW50b2FmWCtJSFA3Y2RRSWdkdjlqTU9qR0JvQkFEaHF3dlpNejFuM1ByLzd3Uk5aSXg1clBoaU4rL25vTDJBeVVjbnFtNEwxODUyM0d5S3ZmN1JQVVJDdDIvNjdkL2NmZzNmblkvWS9CZ0l5UEp1Z29KYUFIOExacDgwTVhDMS9QbUZaQml6V2Z6VUg4Q1BZaVRrOU9MdXdkZGZydGZGbzN0S0ZMZzRzNE1RRGM2bzhxQ1FBaDFCZis3U2dDaU4zL1hZM0EwcDBEb1FOcUtZRVRxODZkMS9ZWCtoWVBsZTI0em1jekVUK0NQWTAvL3FXZkg3Nis4c3F0T1QvWFA1VXAwR2FBUGkyNkJLalQ3bCtWVlg4aklvQzQ5WGRYSTdCMDV3Qlp3UkhhMllDYkNvVTN6WTFjeWRVeUxvd1ZjdkhLdlp1TStCSHNhZENKZ2UvZk5aQXdzb3daNkM0QzJLQ1Z2MkwzUHdZQTRDVUVoRFlBS0ROd3FMeDQ4dnJ3eFg0N1hmZkd5dWxZN3Q4U3hFL2hOZ0EyQS9NVHVRdEhrNjdtRDlkU1U1bkNkTFkxVjEyV0FJQTFkUCtDbk5EVjNmK0k4Mk1Ec0tQQjJnQ2d6TURCNnZUZGMrYkZySlgwL1AybG1QcTNFdkZUdU0zdzlNYytYTEJzVy9kSHE2d1o0TEdXQk1DNmxQL0g3djl1aHVaTWFQVkIyZ2JzZFMvY04yTmV6Qm9KMzU0bzYvRkVoeTFIL0NCdVMyQXprQ2k3R1JpNk5MaEltNEgxSGY2ejl2cWYyUDNmemNBMkFBQUN2ZnIrSzFkUHZKRC8vaDFKc3k4UlUzK1BJSDRRdHpGd2l2Z2YzenpjaHdZWU13RHQzSCs4RTRGT0k0QTRBUkJEZ01BNlhIRHVuak5QdkpBL2QwUC9TSzIyZDhxTzZ6dDdCd3BsZ0RGNkZSOGEydzhBRmtyT2pBWW8wRzliSFBZMHU1andvUmtIZUNMKzFRT0FwaG53dGNhV3dOVkFEeHErdngrbWFWTFA0NHZvMjBmc1IyVG54K3kvUzNCaTFYdmd5bEROOEhOTE5XVHBSeTZYZi9iUC91cFAzbmhqcTc5WGpCYmlaM0dINEpNZmZYUWxXYkYxZjZ5Y3dkR0FyQXRzSXhJQXNmc2Znd0MzZEIxWkdYbGpPSi8yL2RGU1g1em03Vm5FeitLT0FqWUQ2YUR5MEd3Qmp4ZGRNZ1JNdnhIemYrTDZueGdaRis2Y013OHNUa3dOcnZRN01GaEx4M1g5UFk3NFdkeUJPUHZJcVpkeWlVTGRQM0RPT1hmeXdGU21jR2tnbEI3WWhQay9zZnUvcXpCZWdoTUwxais3bHYvaStJRGo5OFVUM0xZTDRzZHh4K0wwNU9UOFJHNDFDOU43MDN0WGgxYjZaeTRQMkVVVGdkb0lvTGorSjBaYllMVm5meW4zeWxEeDVvSjlzQlNjS01TREhMWVQ0c2R4NStPWkp4NnZKb3A2cmZpbUg2MitkRS8vaGJIS05WTzhGakZHM0FFUW95Mnd5eitZSDc4MnRKeXIremtuRVF2OTJ4SHg0N2hiY0hweWNtNS9ZbWtvbU5tVFByZzh2SkJaZW0zSUtWdXRFK2dHWUhWQkh6cHNHSTROd0xZRzdmTDNWNjJoU2lKbFoyTzFaL3NpZmh4M0hUNzUwVWZMVmlVQmxYZlBGYjQwbG50MVQyMDJFY29KeEFtQUdEeGlsMzlISW40aWR5bk9QbkxxZkNZeDB4ZThrVWtkWGg1ZXlDeGRIckNYa3dna0V6M2pCTUR1eEdnVjNqSnJqWmFHWDlxem5LdVpzY3Uvd3hBL2tic2RPQ0FvSk55UzVkMjROSVF0d1Z3NjlBOGpqZ0IyRzBhcmNOT1N1YitVT3pkY0hLd1pJeFd6ejRsck9uY2c0aWN5UmdQRUVoUXQ3NmF3SllnVEFMc0V1SkIvZnluM281Rml6dEdHYWtZczlleHN4RTlrREJaQ1N6Q2RFZjlUVVM4Wml0bS9aekZndyswTDVuZ0ZUcnlRLzliZFdaUk14YnkvU3hBL2xER2tJSmFna1BCdVhoekNoVU9MNmRBNTZrdUF4UWFnMTNBNER6Y3ZXNk9sNFJmM0xXZmMrazNYdklHaUZ3OXIyMVdJSDhvWTdZRXR3V3JTTFZqZXJZdWhtQ0JPQUd3dlpGdzRVdlp1bVUvcWxZbFh4dWFHYkRSUWkvWDkzWXY0b1l6UkFVaE1rTGVDRytiM2V1bnBtVFJNWjkzcm1kWTVjUUtnQjNFNER4TkZjMzhwZC91M3J6My90cVJoWm5QVmhPYkdBeHQyTytLSE1rWTNlT2FKeDMyelVEWHJTMzNsa203ZE50c3lCdGR5NG8vRUJtQXpvUWR3b0FBVFJYTzhBbnBsNHV5K3VYNDNPREpkSHlqQ251bENMUExFd0lnZnloaHJCVzBNaW9aMSsvV0dNYmcwNE03MXRVNkxEY0JHUXcvZ2h0VmdwR3lOVitDaDJjTG5qaVZkTUliTGZTblhpSjM5R0VMRUQyV005UVF4Qmd1WmNrbTNqamVOd2ZsaGR5RzExVjl1SjJMQWhnTlZiM3dsTldCbkorZW4vdWV4UkQwd2I4bDdvN1ovVXltZXl4YWpEV0lERUdPajhNd1RqMmVMY3djdUxyM3dZK2tybzZrN1p2WjY2ZW1DaVdZR3E3TUpQYllIM1dHMENtTzJONzZTeXJtQlhwbDQ4ZUQxUk9Ec0xWczM1LzFCQjI0c0YyTFNqNkdPMkFERTJFQ2NucHpFT3kvZmVadHZGbHk5WHVncnphZUNQci8ra1ZlZE0zdjJyeWFLSlROWTdITXU1NUFkcjA4cUFzUDQzejl3UFJFNGU2b29WODZZWHF6dHhGZ1RZZ01RWXd0dzlwRlRyL2ZsVml5NDJHZXVKdTJGdEI4RTVyMVR3M1ppRVljSVM0WStrMmwvblIyR2pBc1RwV0NrYkdWY2xIT0RoRDF5MC9jdmZQRUJxNTQyWThhUHNSR0lEVUNNbnNBblAvcG9YYTg0dXBkUFZ4YVRRZHF2LzhwcnpwazkrMzJ0VURCUnlRd0ttVm9SNll0cEtFV3RaYkE5b0Fjd1ZJT2hXb3ZyTlQrSGF0bnZITHl1SVdla3F2WGJXcCtUR0Zsd1VoVTBmSDBsTHRxSnNVR0lEVUNNWGdRT0VZb0dYRXViRmNNdEpyeWk1YThtZ3oxVi8xKzk0bngxOEtock9veHRLRnV3bk95aFdxT01Demtic202RDVRRUFPL1YxTC9GM1IyWnRxenBVMVFacjJzRTUvL2lQeXBkdUhxMWtjcWllaUwzN0dKdUpubmxjWXNSUXdObEhUbDFNRGhaTi9YclN0QTJIMklhaUZlUlcvWjk1em43NXp0dUNaTkhYQ3ZqOGd0bjRGMTR5QTNLUlFxYm1CQm9BMkJvQ0FFZUhpZ2wxRGFvR2VBajBBQXdmVEwreE5UMEFBTXRyZkRiaEJ3QmdJVDlYU2dJQVlYWUEwUHljNlZwMUwvSHV3aXRQbjdDdTlPbFpKeGl3c1R1dkpUMUkxQk9XbTlTOHBCOFloT2hKbWlSMjgyTnNQdjQvTjNtUTFjMGtmRG9BQUFBQVNVVk9SSzVDWUlJPSIgaGVpZ2h0PSI1MTIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiLz48L2c+PC9nPjwvZz48L3N2Zz4=',

      shopify: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTAwMCIgem9vbUFuZFBhbj0ibWFnbmlmeSIgdmlld0JveD0iMCAwIDM3NTAgMzc0OS45OTk5NjciIGhlaWdodD0iNTAwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmVyc2lvbj0iMS4wIj48ZGVmcz48ZmlsdGVyIHg9IjAlIiB5PSIwJSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgaWQ9ImMxM2JhZmQ1NWMiPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAxIDAgMCAwIDAgMSAwIDAgMCAwIDEgMCAwIDAgMSAwIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiLz48L2ZpbHRlcj48ZmlsdGVyIHg9IjAlIiB5PSIwJSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgaWQ9Ijc5ZDUwMWE4MjAiPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAxIDAgMCAwIDAgMSAwIDAgMCAwIDEgMC4yMTI2IDAuNzE1MiAwLjA3MjIgMCAwIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiLz48L2ZpbHRlcj48Y2xpcFBhdGggaWQ9ImI3MzBkODQyZDMiPjxwYXRoIGQ9Ik0gMTkyIDE0NC40NjA5MzggTCAzNjUzIDE0NC40NjA5MzggTCAzNjUzIDM2MDUuNzEwOTM4IEwgMTkyIDM2MDUuNzEwOTM4IFogTSAxOTIgMTQ0LjQ2MDkzOCAiIGNsaXAtcnVsZT0ibm9uemVybyIvPjwvY2xpcFBhdGg+PG1hc2sgaWQ9IjQ4YTk3ZGM3NDIiPjxnIGZpbHRlcj0idXJsKCNjMTNiYWZkNTVjKSI+PGcgZmlsdGVyPSJ1cmwoIzc5ZDUwMWE4MjApIiB0cmFuc2Zvcm09Im1hdHJpeCg2Ljc2MDI1NCwgMCwgMCwgNi43NjAyNTQsIDE5MS45MjQzNDcsIDE0NC40NTkyMzcpIj48aW1hZ2UgeD0iMCIgeT0iMCIgd2lkdGg9IjUxMiIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFnQUFBQUlBQ0FBQUFBRFJFNHNtQUFBQUFtSkxSMFFBLzRlUHpMOEFBQ0FBU1VSQlZIaWM3WjEzWUJWVnZzZlB6VTJ2RUVxQUpCQkNxR24zSm9RaUtPQUswcXNCWE5lQ2RYSFg5K3hpVzl2aXJqN3JZMjBJS2xqUkZSZlFGUnVJZ0lMd0ZxU0RnUFJPQXVuMXp2c2pDU1F6YysrYzhqc3paK2FlejE5d2M4NXZ6dHp6dlRPbi9NN3Y1MEtPcDNYbkRwMlQ0bU5DVVdWRjhlRWpodzVaM1I2eGNGbmRBSzZrWHpiUTJ6dTI1V2MxTzM1Y3VmS3NOZTJSbUVpYlB5NHZWZnl4NzYvcFZyZFB3cE1PZDIycDg5djdEZXlZNXV5blh4RGpudkpEclVIdks0cWlLS2Z2RGJlNnFSSjQ0cDg2aTlQN2lxSW9TdEdOVnJkV0FrenFmUDh2ZmoxKzdtTjFpeVdBZEhvSDY5bmZuTHFIclc2MEJJcjRseXRKdTE5UkZPWGJEbFkzWEFMQzdjVTAzYThveXRIQlZqZGR3azYvWHlpN1gxR1VtcXV0YnIyRWtZam5mZlQ5cnlqS0g2MitBUWtUZ3c4eWRiK2lLRE90dmdVSkE0K3kvZndWUlZHVUc2eStDUWt0S2QremQ3K2lWSTIyK2o2c3dmN3I0V1BlYXdWaTUvU3VoUGJSdnJyenhXY1A3TisrNlJpSVRRbC9IbFFVeGZnTlVGdFRkT0pzUlEzK0E2RnN4Y085ckw0MWlUSHhpNHg2MHJmLzdWdjd0ZzlwS042Ni81MWZsbUNMNE55OGZ0YmVuY1NJYnBzQ2QrSEp1V01qTlpVR2ZscXI0RHcxRkVWUmpqNFViOEZ0U1RBcE9CV29JOHNXK3ZzQko3eUF2MmhZUFRmWjFIdVM0RE95TkVEL0g3Z3BKRURWdGw5akswQ3BmVDNSdEZ1U0VEQXRnTS9QanZFQnEwWStVWVV2QUVXcCtHK1Ria2xDd0F6L0hmYmJwTUJWYndyMDZOQmxjNjQ1TnlYQlpxYmZ6aXA3SUhETnJJMUVmZDlBN1N4emJrdUNpZi8rWHhaNGU5LzFHRVgzSzRxaWZOWGVwRnVUWU9DMy80OU5DVnl4NXdiSy9sZVU0OUp0UUJodTh0ZEpueHNzQzE5RDVUUFVTTTAxNXR5ZHhJanBmbnFvOHI4QzEzTzl5TkQ5aXFJb0J2WWw1akNtWHI5NzloWUVycGYwSldQL0s0ckIrRkppQm9QOVBNYS9pQTFjTDNjM2MvOUxCUWhBbnpQNlhmTVBnM3JEY2MrTEJGNGh1TWVVbTVUNEpXV0xmc2NZdWZjWEdwMFZ2RWhkUUFuSXcwU1dFcmRFdDFkS2YyOVE3L2ZZM2E4b2IxejJRaUFmdzRtbTNLaEVuK2UxSGVKVGxOTkcvbHczRVBTL3NpRVpvZlIvK04wd0xKRmVBdFp4dS9ZVjdWT1VZOE1NcXYzQmYyLy9OdWtweldmWElZUVFtbm5NVDVYMThpaVJWWXpRSGFJZHlET29OczF2OSs4dlJDaGpzMXBScnpmV2U2UmN2OVpiZ1hhYUpmem9wVHNCT09BeHFIYWx2K1cva29ZaC9kL1ZuMi92M1Zpemd4KzNnVDl6dlUySkgySy8wdXVNSTVjWVZNcy9vbFBMcHlqSzBzYnRuZUVuMUgrOS9rTGxlMnYxWGpyVlJ0ZVU4T0JKdmY0L01kU2dWcnFmZVdQUmhaVjk5OGZxRHA1enNmcGxCL1VVc0VLNkNwclBGTDF1TExuS29GYnM1L3I5djdMVHhUSjNxUCs0THUzaUh6dHYwQnQ0UE1MakRpV0J5TlFia2RYZFpsVHRKZjMrZjc1NUdjOE90ZG14emY2YStMMmVBZ2FCMzZBa0lISGFBWUJQVVI0MXF2Wm4zWGxqemEwdFM3MmpOdDFpeWIvMVNvMFJuN0pNQnBneWwxbDYvZis2VWExUnRYcjlmMmFrcXRoL3FXMi8zK0xQSFgvV1hGeFJib2E4TzRrUmwrbjEveGRHdFRwdjArdi92WDNWNVM3WnF5cTF0ZVc1c0g3N3RRSTQwQVB3OWlRR3ROK3U4eHZjYUhncWRLR2ViTFpwRC8yRmZxWXVwMXJ3bjNoZWEraEpzTHVUR1BLTVR2OGY5QnJWdWtldi83Zm8vWEkxeThIcVhkOEh0V09KS3NQclM2QzRVcWYvcTI4eXFuVjVqYzdvZmJ2dWsvdHE5V0xoZkhXSkQ3UmFlZ1BpMWlRWWRORDQ4dmdVNVRtald2RXJkUHIvWUgvZHNuMVUrd0hLNm82cUVxbnFFb3FpREFXNE53a0dlaStBWllhMUh0ZXBkWDZVZmxtWCtwajVTYzA4L3diMTg4U256R08rTXdrT1EzUjZjcHZoTVkxUm1qbyt4WGVkdjlKL1V4Zld1b0MvclcyRjNCSXdnMWIvMFg3ejVZVkd0VnF2MGk3ZUJGZzN1bFY5aGZzMVJicHUxVHdDalB3UUpSRGNxZjBsR3c4QTBJTTZ0VFFqdTRzTU82QXEvb3EyekgwYUhWYm1NOXlYQkk4c25malAzeG5XR2xpbUhRR3VETEJ1a0tRT05iWmNHeFRBL2ExR1U0K3gzSmtFQjdkbS9xVW9SNHhjZ0ZENHg5citQMzVab0JycXkyek4wcGE1cGtMVGt1NzBkeWJCWXF6Nk8vY3B5b09HdFRST29ENUZDYnh4K0t5cXd2a1JPb1dXYWJRNGcvSzJKSmkwMHpuTzg3bGhyWlJOMmdlQXprdTlPWnI5SUwyVG9GUE9xVXQ5QXhPa1VPS1AvOWIyLy81dWhyVWUwZFphbHhTNHlsWHF2cjFEcjVUMlZNSVZWTGNsd1NSREo3YmpmWWExK3FvNzA2ZFVHTVFOUUlQMnFPcjhWYS9VN3pVSmFXYlQzSllFbHpuYS9sOXVYT3RWN1F2Z0JhTTZuZGVvYXN6VkxhWnhFOTZYb1Z2T05pRjRRNjF1UUVBR2F2MnZqeHFQQUlmUDFIei82LzVtVk9uNGFkVUhTYTJMZFlwOS9qdlZtWUIwNzE1VmtWWjkrM1Z0RlhtcTNiSlB6aGxkVkJLWU1KMkRnTWE3OENIdmExYnNxakZTZ3N4WFhXaWQ3Z3d2VWVNY3RDQ2kyWjlEVTI5YldkMzBsOUk1VWJoM0t0RmxoTGIvMXh2WG1xQ3RGV0FKOEFMcUhhZDlBM1NMYVlLTW5MMFFRUzRzNnhHVjM4b0c5WjZpaElSWTlXdFpVVW9OSWdBaWhLTCtwWGtBN003QnVOb0Rxa3NWNlkvdisvK21idE0waEJCQzBZTmVQS2xWM3BaT3VrWWtXQlJxdjlDUGpHdE4wdFl5SGpZZ2hHNVdEUnpySitpWDA3eVczb29LYVQzKzNXcjF4dzM4a2tKeXg1TG10TjZtK1RyM0crZjhqdnhNTXdWWUdZZHpPYzFDZ0orUUEzOVd6MHdQekZhZExHckJybFNpbTVaY1JDZW13MVBHdGNackt0WDZkUUpvd1JXSFZQVnUxUytYcHNwUFp4UnpkbDhhL2kxTG10RjJsK2E3M0JSbVdDdDhrYVpIRnVGZHIwRHRlSHl2bjRJZkd2UzRtdVA2S3dXQ0lPNUo5ekU5MVovVXZGcHJXT3Z5cWVvMWdETnY0MTN2WEpucWd3US9CYjh0eHpQWVJJZTFRaXRBVkpKKzAveVV2c1dvOXBybUFmQVc1Z1hicmxCVjlMZDRtRUFjYmZhc1JzdmlJT3dUNEhkcDZrK0tYelN1TmZDR2xnOEFCUjFkaUhuQkV2VVBPMEszR0hMSEdEK0hWQ1N1azBucVNXbW5QUXIwR1VhMXB6UVBBSHpuL1grcWFpNXdhOHRFNWY1bGgwL3hFNmswQUNYWitMY3VRVWh2RGVBWVJuQ3VYdXFSdkhMd1V1eEx2cXVxK21tTXFrRE1zRGwrZ2xRYVUyb1V4MGJTZ3ZqLzAzeUY3MkJVdTAxVGk4QjFmNTZxNnVkdG0vM1JGVC8rZmFJME14b0ZTUDlSRWtacnZzQ0RHSy9STml2VnRZN2dQd0RRNjZxNnl5KzRrSVFrMy9vZGMzcmlVaGxlRUovSWJ6VGZIODUrempoTnJYY0pMcXIyUFZqWnNJb2JtWG0venNFRUNzcUZURGdocGorQVI3TVJjK0FaakdxamtkSnlFYUQ0bndRWHJWSDkzMVdGVUVMV3BPbFFlUU9qdng2ekVzaVU0MW1nK2ZrWXhnSkJDSGsxOGNEL1JYSlJkYmpBZFpjTWZvc2x3WWlXaXQ5UmZoL0JScGJtcXp0Z3ZBdUUwSi9VdFdvTlQ1QTNaN2E2dTBBN1gxRVVSU25YOHpXM0ZpRVhncVpxUGxteDM3aFd2R2IvOXNlUFNhNnFxUDdMd1owbmV1a1llS05zaUNpQVRuOVNmM0xrWll4cUE0YXJQMWxSeXRBS0xtNmRFWXZIOFRETGdJZ0NHS0k1bHJmMkY0eHFROVcvNGUxRUR3RE5JSkFIU3ZoaXczUE41aUtnQUtMdlZIOXlhbzVlT1JYSm85US8yZzA3aWE3clorMGZGQmNLL2Nnb3QwWFFNMGd6ZHNJNENxRGpDWEtPNUxjVzNlVWFQekdGd2ZGZGI5eWNvT1lOVFU4R1RnWGVpUHAwcC9JZGRpelB1TXo3TnlzS3hSNFBWZjhyQ3RIa0pPaEkwZlREV3B4cVhUWGJoN3BudTdRa0RIbytVSVlnTHR6TzhnVTVIVTFhK0txWk9OVW1xcXZ0SDRoUkszSHNXNXJUZnR6eEtjcmRqRitTZzRuVkpIZmZIb2xUVHhOSmJMRlJqY2pVUDN5aEUzM0VCTEJDSEppRWNIc0JtWnB0MDYrck1LcDEwdVNOQ3Z6aWlPNDZjcXBsMjNNdXhmVjB4T05XWFYxd25sUC9YQTRhaHdOQU9xZklkdlQyWHpodXdOTy9tdk5iOTRkUFVReVBxd1luU1pyelZjWVJJUkZDNkNGMU5iLzdnSzJ1bUt1SjgyRStQb3dUNjZZZzJpdWdRQjBBOGp5T0l3QnFwUWtBOVpOZU1YZTdJZE5HbTdIZ1k0aExjZDJGN3ZWWjNRemhDRkdIYkZVMllkWExVNC9sZDJnZGlLSzYzNkdPQldjbFBrVjVWWUIxV01HZUFNbWExYnN2c2VyMVZxZU8zN09qNWYvanVvMmZIbUJVWUFFdXhUVXo0clk2cTVzaG1BQXVWZS9CSGNMejZ0VEVBUDlQOC84a2VLY1VHc1NJc2dBWFFqZUdQbHluSUJmeXVWQTljaUhrUXo2RWZBcENxQjRwU3IyckR0WHpib1ZZQW5CcklubnN3bkFFUUNoWnZlaHpjSFhUdjBMYkRKZzZNWnF4WGJ4UXJydE9VVnpOUlY5ZmpXcHJVQTJxUnRYVjFmVVYxVFdWNWE3U2tsL1hIcSsyckpGbWtxWitVWmJkZ0ZWdnFMcmV0dzJMUnhGcHQyamRTKzFJM1JKL0p4VlpFZXNKTUZUOXdXRzhvNzFkMVI5c3JVSW9vZlBJd2dMMk5nbUJlL3pxWE1XNEdBVkNDU0JNNHd1MnNSS3Jvam9OV05tdU5qMG1GM2FCYUpNb1pFOGg4WEMyS1NucUo5OVpkWUkvZlRyK3BLcDM0dDk2Q2FQdHpUWStjMGFobmdDYS9idWpXSzRncUt2cVNhOGsrY2tNWTJjeTNGeVdqUVJZaXJoQWlDWUVHRVpRT0lRUTZxZzZ4MnViTUowa0tIeTZTaVFCdEJ1dCt1RE1lM2dWQlk2L0FJZmJPRDRPRFNJSm9JOTZxbk44RlZhOXNLQTRmQitXYTF5R0FwRUVvQm54L1l4WEx6YzRVbmhxamoyQUlOQWdNRjc5QmlneWRPcEJDTVYwdXZ5Nm9IZ0ZvQUVoUEVhQkFnbWdrenBMejBuRHFGQUpYY2RNelVGSWZTalltZlFJNVhGMFJTQUJhRmJ0ZGdhKzRYYTlKMDlwRE1RYURQMlBPbkI1WFFza0FQWFo2ZkovK3kvcmJ0dS9jSHc4MStZSUI1L0huRGdDYUswV3dCbC9wL3NqTzF4ZU9Gd25oSmZEY1VmaHJZdVRJWTRBVXRWeHRZK2MxU3NXMjNYa3RPQ010eFF4OEFzT1ZzVVJnTVpKVzhldnUxV3ZDWVZZVHNLT1pMaWpCUkNpenNSZHRFSlZvRTMreEluaStmV1lTSmFMdzQ2d01BS0lVMmRvT2J1NjJYOUNPdzBzSE05bkxkUStaTGc1ZUJBS0k0QjJhcGZOUXhWTi80cEpIVEZwcUxtdEVaSkVIdk5BWVFTZ2R1TnVTZy9WSm1QVUpKeVVQMEVBRjVjZ1lRU2dqcVY3OW11RXd0cGxqNXNrMHk0MUVaNTRBdDZvS0FJSVZXL29sQnhJN24vVlJKbDRyeG1SUXpGeVpwRWlpZ0JhNTZrK2lIbDZ1a2c3bFVKd0dRY0JpTEtLM2syVmdEVW90bmRJV1Q4SS9weUlLTDh5ZFVCZTJmODZkT1V3RVJaRkFMMnNib0FkaU9Md3N4QkZBRDJzYm9BZENPSFFXNElJb0p0VGp2QndKUm9xY24welJKZ0ZKS1dObkN6WGVqQndqZG9EYnhQY0lobnVwT3d4RTFPUkhQWmpzWGdLdUVsTG53QVJ5UVVUeHpSbWRwYjlqMEV2ZUw5UTY3NzMyT1NoRS9HTy9rbWFxRW9BOXd1MTZBblFKdTNLOFpxb0hoSkQ0UGVEckJCQXh4NWpKOHA4eWpTNHc0blQxaHBodGdEQ08rUk9HdC9HNUlzNmhyQStHNkJObWlxQTJKUUJFMGNIdTE4UEU2TnNMSUMycVVNbkVlVHhsT2dCUDI0eVNRQWRNMGFOVTUvOGtwRFRNd3g2RUdEQ05EQ3lZODl4RXpnc1lnWWpOUWs0b2ROSjRQMEVpRS9PbXpoS25ZZGRRZ3Y4NzVXckFOcDN1blNDekpZS2lUdktQaytBNU01WFRGVDdlVWtZQ2VtUEZ6WUxIejRDQ09tY01XcVNKbnFqaEoyUk5oQkFlRXJtaEhIcXNQOFNHTHpRMjBIUUFuQ2xld3JIcUdPM1M4RG9DUjB0RUZZQWlabFhYZGNLMUtLa0phMmhEVUlLSUg3NC9aWWw0Z29hb1BjREFRV1ErZElWY01ZaytvUzFPdzVyRU00cGROZ20yZi84Y1VHdnE0QUpJRzI1M09Zemd5SEE5c0FFOERwMnJtNEpDNW5BanZ4UWk4dmQ0UjJXSlhxY1RvWE5IZ1NscDF1QjdFZ01pQUhlRHdJU2dPc3FHRHNTSTZEakl3SUpJRFlOeG83RWlJaFVXSHRBQWdpS2lQMWlvSTZwemdpUUFLU3puMm1vNHlreUFpUUFQdGtzSkRwa3djNERnYXpKK0E2bWtRbzdESVFSZ0Z1c3hOeU9CbmpCRlVZQWNaRWdaaVFZaElqNEJKQVBBUE1JaDMzZHdnZ2dlRU80V3dEc21Yb1lBYVNEV0pGZ01SalVHb3hEU0hjUUt6endGWjhycTZxdUxLK3NLSy8yVmRjaEpTSWlQQ1kySVRZeU9xRlZuRDJqa25SM1E0YUxCQkdBU3p3UDhQcWlreVZGUnc4ZFBITGtaSmwraVlST25kTXowanUwVHJhYkMydHFLS1FBUUg0RUlTZmJRcGdCb3Vyd2lmMWJ0dTg5aEhlTU1qS3IvNERlYVhhS1dGQWREeGtuQmtRQWtlV0NoQnVzTzNGbzc4WjF2eEIvUVYyR1hwNlpvYzVjTENyMTdZb0JyWUVJSU9Vd2hCVldEdTdiOU4yR005VFZCMDhhbEdXUFU2eFhmZzFvREdRTVlQMUNjT1hPYlY4dEwySXlzV1lOR3Y3WUlLRDJjT1Z5NFFSZ2NjU24wczAvTGZrUnd0QTNLYllRd0VCSVl5QUNzSElab0hyYjJ2Y3gwOHdiWTQrejdPbVE4MENiUHdIMnJ2N0FNTVU0UHVuMmlHTFROa1F3QWJnc0VrRE4rbVZ2bEVBYXpNMkV0TVlQeU9OaEVBSUlzV1Fyb0hqRlhNakJFRUlJNVlrUU85MllzTVJUY01ZZ0p2QXgwUUJHQ0RrK2YvQlYwUDJQN1BFR1FPNmhnTVlnQk5BRndBWVp4MTR0dUhrSHVOVnN1MFMwZ1R3ZUJ2SFFNL3NOY09iVDJWeFduZ282ODdES0FjZ3dJUkFDTURmZlQvV2l2LzdLeDdKdGZOdTdBb1lKZ1JCQUdvQU5iSmIvendyalFsUkUyQ1p0VFR6ZzFndUVBRXpjRE43eXlseHV0ajIyOFcwUEFad0hBZ2dneExTdGdKcDNaa0Z1aEtuSXM4MmVjR1RIZzJDMkFCNG1iclBHVGorT3Y0MWovOXZwY010WU9GTUFBb2huTjRGRC9Vc2p2dUpwdjVXTkJBQTREd1FRUUxvcDNpRGJwOTFWenZVQ0Jlb0U5Z0xUQTg2YkVXQU1ZTW9zY05IZHh6aGZvU0NDOHdVQTZlNnVneklGOFFSZ04yRkU3V1BUZWZjLzZzUDdBb0NFQy9VRTRMOFFlUGpPeGR5djBkbEdid0RrY29NbERnRjRBbkRmREY0N2huLy9vNzQ5K1Y4RERNRER1QUFDNFAwRStPZjRyWnl2Z0JCQytkREJkN2dDRnlhRVhRQmhuQ1BEdjE3STV1eUppWjNlQUFnTkFMUEVMb0QyZkdlQno4emthcjRKajcwUzJmWUJlMTZ4OXg3ZldlRGpzN2lhdjhDQVJIT3VBMFFLMks5T2NBRTgvZ1JQNjgyd3pVNWdBM0JQWFhaTFBNZUFqNXJWLzVFMmNRZHRJaFRNQzQ5ZEFCdzNneC8vS3ovYkxjbTFqVE5JSXdWUWh0Z0Z3Qzgyd0hObS9mNFI2Z3VlaW9VellHRkNtQVhBenlkODNuMjhMR3V4aXp2b0JmS2hEREVMSUNvS29oazZmSFlMSjhNNnRBZDdvcHBGZDZoNUlMTUFPbkphUVZ0L0V4Kzd1dVRaTHN4WmU2anRJR1lCY0JvQ0hMMlZwL09QbW54N0hBbHFoZ0xsRnNnc0FENE9nYlYvM3NMRnJoOXNOZ2xFQ0lWQ0xWd3hDNENQTjhBVC8rSmkxZzlkYkRjR1JDRlE4ZG1aQmNCbEVyQjROZytyZnZHYWU3UUZCS2djZmF3Q2NQRjRBdXk2allQUkFQUzFZY0RBTEtBMk13dUF4eUJ3Rm4yb0p4cGN0cHNFSW9TNkFzMitXQVVBZVVxcGlWZVh3TnNNUks0ZE14NkxNZ2prOEFiWWZCZTh6WURrMnpIaHVVdVFWd0FIVDdySElBTmg0bUNqRXlFWGlRSTZqOFVxQVBpOXdMZVdncHNNVEt6OUpvRUlnVVUwRTA0QSsrNkJ0bWhFcnMyY1FSb0J5aDdHS2dCd24vQTU1NkF0R3VHSk0vdUtJQUI1c1RJS3dBVzloTEwyWldDRHh0ak5GNlNSZEpoNUlLTUFRanVCdE9JaVR3SGJNNlpkWDlNdkNVSUV6RFNBVVFEUWpqVC81bm9DWEpkOFcwNENFSExCck1Bd1dnRmVCNncxenduc0FoN2JiUVUzRUFwem1wVlJBTUNid1YrQ2hYM0d4MzVid1kyTUFySENLQURZV1dEMVk2RG1zTWl3NXlvQVFnaG03TUlvQU5oWjRLck5vT2F3eUxGVFhJQVc5SUxKOThSV0hmUUo0SHNhMGhvbU5oMENJb1RTUU9hQklnMEMxNjZDdElhSHk1N0xnQWdoQkJNdmxtMElIQUU2RFh3TjBKWXJQRFRNWGUvejFkWUU5cDdNc2FNdlFBTmhjZWNCckxBSklBV2dCUmZZK1NHQWtkRGs5dTBTMjdkdm5SQVRGUmxhWDFkWFVWWldldWJVK1hORkowN3BSbFh4SmdOYzFCcmMvYjRCc01JbUFOQlpJSFA0LzhoZVhYdDdzcnZxUnZ1cSttMzNubCtQSGYxTm5XSEVwdXZBQ0NHRXJyUmVBSkNaQXNwZllxb2UwYjlneUNEL2JqS1J2WHNqaElvM2J0Nis1OWRtRG1leGRoWUF5UEV3TmdGQWpnRi9Pc0JRT1huNHVBa1lnK0xXdzRlanVuV3IxKy9jMC9pQngxNlJZVnFTQVpFOWpFMEFrRDdoNzlKWDdUamxldnhWa2REQmc5R3VWUnMyYlZJUVFsa2lKVDBtcFMzRVFnQ2JBQUNYQVk1OVFsMzE2bnRJSDRhOWV0MTJldG1xalR0c0ZSMVNDOFE4a0VsRXJxcHdnQ1kwOEFWdEJPeTBCMitsckxudnZYMTMyblloR0NGVTErazB1eEVtQWNSRFRFUWIrY1A3ZFBXR1BXL24xemdia3dBTzBER3RCQUpPQWc1L1RGZHYrcWZCMi85b0dJQU5wakVBNENSZ0oxM3cyK252MkNqR056Z1E3eSttSndEZ0pJQnVUV1A0bThIYy82Z0x3SFlRa3dEZ25nRGxWRyt6ak5kaXdWcGdSOW9BZUlVeG1ZRHpCamk4bDZiVzQ1WWtMUllIaVAxQUpnSEFMUU5ReFFPWmZnM1k5ZTFKSk1CT0Zvc0EzSEN6QUpwa2tJa1BnVjNlcm94Z044RWlnTlpnY1JXcWZxQ29OTkxPR3prd0FHUVBZeEVBM0JEZzZFN3lPdEhYZ2wzZXRnRDhCRmdFQURjSm9Ca0M5Z0tMbG1wZnVyQlBBMWdzd0kzQk4xSFVzV05ZRDJoaTJFMkk4UVRZU0Y0bC9ES3dxOXNYZ0RBaExBSklZNzU2STVVVTV3SGFCZkVld0FWQzJYM3lXQVFBZGpTOGVCOTVuZFkyak8wSEQvczRpRUVBWVdBKzRUUXhJV0pOeVZnc091eGhRaGkreHZaZ2NjSVBVOVRoRmFYZVhyQ2ZiR1VRQU53WWNEZEZIVGhmSkR2RGZqeE1DQUg4UmxISGh0RmRPZUJpM2c1aUVBRGNRdUFoaWpyVllGZTNNMkhNYjBJUkJLQWNwYWhVQVhWMVcrTmlQaHdpZ2dES1QxSlVPbTk2T0RraEdjTnFnRUVBWUdHQ1M0OVRWRHEyR3VyeXRvYlpMWkJlQUZGZzdsaFZOTy96a21WUWw3YzF6TXRoOUFLQWl4QklONUpkV3dYV0FCdlRpWFVlU0M4QXVEamhkVlMxZHBnZlUxUkVXT2VCOUFLQWl3MUFPYU5iQUhndXliYTRXWE1kMEFzQUxsVkVKVjIxblErRHRjQytNR2NQb3hjQW5Ec0k3U24zdWZRSGlwMERhL1l3RVFSQXU2cGJlOGRXc0RiWUZ0WXdkL1FDZ004VlFzekpHVVZXTjhGeXVqRnVpMU5YVDREYmphRlBnL3QvaFVHL0htalpJTEFiWE5ad2hnT2VLNjR5TThlMGlMZ1o1NEgwQW1DN2JuTllkclMrRzd2SHVKQ1RpV1NjalZFTEFOQWxqeWxHd1k4VDEwQzF3NTR3WmcrakZnQmd4a2kybDhuTzhRdUEybUZQR0JjQ3FBVUFHQ2craksxNjhVMFBVeTRsT1FKR3QwQVJCQkFWelZhLy91bHBWTWZMblVFNjIzU01WZ0J1d0hSaE1lMVlMU3liUkJsanpBRXcvbnBvQmRDZTdiSXRpTzdJYkdML3RYY2NBMmlKTFdGYkNhS3REWm8xSENEcXZQS1BDWit5VzdFajRiMlpxdE1LQURSck9NaWF3c2FyN3dyT2h3QmJtQkJhQVlCbWkyTFRjQk8xTDAxWkRHTElaZ3hrcWswckFORDRYRkRHMWszLzB3RWdVemFDYlVtT1ZnQ2dlNEZnYVZ0cVg1MzREcFF0MjlDWmFSUklPNGs4SDg5eVZSWG51cWd6dVRCdy9kMzJUUVJHUlNYVFJKQlNQUkZ4TEJkVjB3b3lkZGVDeWErQjVGT3pEVzZtNDJHVUFraUNQWnM1R05MWXZ0c0xMVWhCYkIzaFREbGtLUVVBSEtPVlBjNUJDeGFQZTRZdStMZzlZVG9lUmlrQW1JbmJCVUJYRlJCQ3AyWk4rZ25ZcE1Bd2pYa29CUURjWTZrRFlPMGg5TVdZNEhrSU1IVUdwUUJBVjRJUkNvRVArbGc4YThLUDRFYkZwQ1BMUEZBTUFhRGh3UFlRUXVqTE1iTnJPSmdWRDRWbDFrTTVtcThHRHRGVGxGWUthN0NCY1g5aEdpSGJoSnFPRE43eGRFK0FXT2dRVFluWEF4dHNZTm40MTduWUZZdncvZ3lWNlFRQWZ5aGtHcmhGaEJCQ3gyZmVlSVNQWlpHNG5LRXVuUURnbzNUbThUcG85UGJZTHpoWkZnZVdRRUYwQW9CTUd0MUE5Si9BVFRieXk3Um5lWmtXQlpZaE9aMEFJTlBHTnpJYTNtUWo1UTljU3hPR3pFYXdwRzZoRXdDb08wZ0R2VGttQUhsdnNyUFhCVVBwVDFkU0NnQjY2UlloaEc3allMT0pueWNzNG1qZGNpSVluQ3JwQkFEZ3hhbGhJRzM2Y0J4T1gvY0NSK3RXNDJaSUlrd2xnTFk4QXZXRzNNM0I2QVZxN3JtYk5oQ0pEVEJiQU5BTHdRME1tOHpGYkJNdlhsUE8xYjZWTUdRUG94SUEvQ3dRSVlUUUEzek1OckZvOGltK0Y3QU9CdmNNS2dGd21BUWdoRkMvV1h6c052SDFCSXJVTkxhQXdTdFFKQUdnT3pwd010ekl1b2tPalNwbDlqb0FMd0YwNGgzOGM5czBaOFlUQ2FlUDJpbVVBTkRVR2J3c043S3pjRC9uSzFnRC9Ub3FqUURjYmFrdlo4UlR2SVBQYmJtS0pqMko4QXlpcmtrakFNRFFBR3FTWCtGbnU0Rk4xenN4eEREOXZJeEdBSEJob3JXTStodEg0d2doaEw2L2hTNDZ1ZENrVWRla0VRQ2ZkYUJHWmszbmFSMGhoRDY1bi9jVnpJYyswQnFOQUlCUGhhaDRGZHhGWE0yTEwvRytndW1FVXdmYkZFOEFyZWZ6MkdwcXdVT2Y4NzZDMmJpcGN3ZUpKd0RVWnlGci9Gc2pLdS9keGZrS3BuTWxiVVhSQm9FSUlUUnNJVmcrS2ovc2ZzaHB4NGFvSFlNcEJCRE9GTm9WaDNIeklqbGY0YlBuT0YvQWJLaGRkQ2dFa0FvWEo5d2YwOTdoL1F5WS9RM25DNWdNOWRvTWhRRGdmY0sxVEZzQUdZRkVoL0svbC9HOWdGMmdFQUMzbllEbVRGN0VjYjBSSVlSV3ZNalh2c21FSmxCV3BCQUFKM2NRRlNNWGN3NzE4L0k2dnZiTnhVMjdHeUNzQUZEL3oxaE9QQmx6OWg5Y3pac043ZmxxQ2dGd1hRbHVmcDNQYnVKcS84TVB1Sm8zR2Ryc1lSUUM0THdPZEpINGVVL3lOTzliNktRMEE3VDc2T1FDU09BL0M3ekFvd3NnbzVLcitXb2hSK05tUXh0eW4xd0FacjBCRUVJSVhiZGtDRWZyaXh5VWRJNzJaeW00QU5DQWY5M0J6L2hLQitXZWphQThzRXN1QUI3bkFnUFE2bi9mNUxjM3RJUXljYm1BdUNoUEI1RUx3S1JaNEVWdS9wd3hNNXAvbGkvbFpkbDhLS090a2dzZ2plNUNEQXhhK2lnbnkvVU9paDVDT1ErMHdSTUFvZWduUHdZT1RkckU4clY4N0ZwQUdsMDFjZ0Z3UHIyalQrRXlQdkVqVHE3aVl0WUtLSGZQaUFYUXdjUmxnR1owVy9pL1hQWUhWenRtR0VoNVBJeFlBR2wwMTJIbmpxV1hjYkM2MGpGK0FXRjlxS29SQzhEa1dXQXpoaXkrRDk1b3RYUDJCT25pTFJNTHdBeDNFRCswZWZZamVQbXRkNHhqQ0owN3ZYMWVBUWdoTkczeFZHaVRQenNtcGpqZFQ1TllBQmJNQXB2UjU5Mm5nT01UbFd5RHRXY2RxVlMxN1BRS1FBaWg4RWMrb3J0UnZ6aEdBSFNlMUtRQ0NLUDFQUU5qNmxKWVQ2RmZuSEplUERTTXBoYXBBTmdUZlRQaldYUWpwTGxkV3lDdFdVaDRQNXBhcEFLdytBMkFFRUtvN2J5L0FGcXJjRXpVR0tyallYWVVBSEk5QVJuMzB6RkJZNmpTYjVJS3dOcEp3QVh1bWd0M2VHeC9GWmdwYTZINmNaSUt3RngvSVAvYzhpcllDY1hEVG5rRVVQbFBrZ3FBZHhBbmJHYUF1ZlVmY1VwU0dhb1ZFbElCV0xjVm9PWTJxRVFnNTV3aUFLcmpZWVFDaUlaT0Y4YkFmZmNBR1NvR3NtTTFFVFRId3dnRndDRlhERDFQVDRDeDR4UUJVRVdOSnhTQUtTZURjUW4vTzR3ZUdkSXVpZ1ZOb0NCQ0FRZ3lDMnlrRjh3d3dERUNTS09vWTJzQm9La2d4MGZQT3lXWENNMDhrRkFBb2l3RE5ER1RJVkwrQmNxZDRoTkNFL0hMem1NQWhGRCt2UUJHS3AxeVNqZ2ltYndPb1FBNmsxK0JMOU5pMkcxVU9pV1prSnZDYlpaTUFQSGNJOFNSMG1jbXU0MXF4N2lHRHlXdlFpWUFjZFlCTHpDSzNVUkZCYnNOTWFBSXEyUjdBZVJrTVp1b2RNd1RJSTI4Q3BrQWhOa0t1a2piTWN3bUZCOUFPNFNBNGlBOW1RQkVRS2tlQndBQURXNUpSRUZVbXdVaWhOQWxWamRBSUNqbWdXUlZCRnNIUWdnaGxFS1gvdGlSaEpPL28rMHZnTTZaekNaNHBFSzJoaEhFTllnRTRLSU5SY1dUdHN3REU3ZHdrMXRxeU4rSFJBSklFdktud3J3NEZjTTdOTGw1a0Q4TmlRUWdoRXV3aGlSV0E1RlJFTTBRQXZKc08wUUNNQzFHS0JITVRrcFJFRHRLWWtEdUswMGtBT2gxb1BPM1E1ek9yMkUxRUdmNWNUY3dRb25qdDFqNkJEai8ybGlBREc2bHJBYmluUE1FQ0NNK0hFSWtBT2lGd0YvUjJidEc3V0Mxd3V6VTY1d0hBRUxFNjZKRUFvQk9GN1lhSWJSOEpHUCtwbk03V1pzUngycEFJTHlrRlVnRUVBV3c5OTRjM3dxRUVEcDgzekNta2NDK1RhenRhTTFxUUNDSWgya2tBbUNlYjZrNDB4aWw4ZnVSZHpMNDVEQS9BRkFiWmd2aVFKeHBpVVFBMEpPQTM1cDI0YzYvM0k4K2U4ZVh6TzFJWkxZZ0RzUWJJMVlLb0ZtWTFtM1hqcUI4RDJ6K2lMVVpJVTU2QW9TUnZzOUlCQUM5RmRROFRLdnZtNUUzSGFZeHNwUjVNejlSZ0tnbllMaEpnOFdSQ0FCNEZsaThvc1Yvejc4MVlCYTVmL1kyOXJNaFhVVDBjcURtVXNMeUpBSUFYZ2M2b2U3dVk4L2tQMHVhMUhrT3UwZHZDcys4UktaRG1rV2FSQURBaHdKMFh2cDdIc2g5aHNoQmIvRmM5bllJZGVDVkdkSzdJUkFBZExxd0gvUSszRGtyOTRrU2JCTmJad0MwdzFrQ0lIMmNFUWdnRmRZYm9ISzEvdWU3SDgrK0JYTjVlTzlrZkszNEpWUkVOeWQ2U0grbEJBSUE5Z1k0dHMvZlh3N051K1NLenpBc2JCMjlGNkFkdlloWFQ0VW1ndEFsZ0VBQXdHUEFRUEVaejM5WG1QM0FkZ01EaXk3OUZhSWRQY21kS0VUR1BaU3N2SFVDV0Jud3IvWGJucjIwNENtL0R3bUVqbHg5OVhtUWRqanJEVURzRmtqZ0R3bjdDcWovM3FoRThjYU5MNmRmT25hSW5rWVBQLy9oS2FDR1pBUFpFUVVQV1hHQ2dkMWgwR2ZsS2N5dHBlajJhWVA2WmJkWWd6cXdaT2t2WjZIYTBmMXpNVDBkcVRsQnRyQko4QVNBWFRIRjNjU3JPSERnKy9DRWhOamtsSGFKb2NoWGRIVGZzZUxUZ08zd09xei9TZDFiOEFYUUZuWVpRSGNWd0E4MXAwK2p6YUJYdndoTllDV2hJWnlzNHc4Q2dYOHAzOEdhb3lXR0pyYWUwRVNRNWRpMFNnQm4vQ3dEbWMwZ3h3bkFSWlpwR1Y4QXNIdUIrd1U1a24ySmtJZWRtQ0RMSW8wdkFOajU4aHBRYTlSRVVlYmNGaG15M1cxOEFjQ3VBd1ZlQmpLTnk3bGxwcmNPc3MwdGZBR0FiZ2FYQ0pLMGVZalZEZUFBMlZGWGJBR0VnQjZmT01GOG5BZUU1TkZXdDRBRFpOTjFiQUdrZ0M0RC9BeHBqSjR4N01FbHhDT2N5QzBRV3dDd1E0QVZ4a1ZNSUdLODFTM2dnWXNvYWp5MkFFQ1hBYXJFR0FJTUJ3Z3lLQ0I5U1FwakN3QjBGbmhNakR4Tms1d1pYNHBvZjlPYVZ3Q3ZoWDB5Umx4cmRRdjRRSFNFRDFzQW9MTkFNVllCcnFKS3RpcytSTTgxUzU0QXRVSUlZTWdmckc0Qko5d2tRWE53QlFBYVNLbkl5TjNQRkc1MFRteW9sa1FNSlNpTUt3QlE1M25tb0NBUVRMN082aGJ3SW9Sa0hvZ3JBTkNUd1NKc0JVZmZiSFVMK0VFeURjQVZBT1F5UVAyM2dNWm91ZG1aYXdBSUliSmZLNjRBSUUvUUZnbXdGNXo5b05VdDRBako4VEJjQVVET0FuOVRBSTFSY2tjSHExdkFFWkp0RzF3QlFNNENCUmdDekxqRjZoYndKSnpBZ2R1Q1Y0QmkvVTVRNW15clc4Q1ZNQUkzRjB3QlFNWlJPbXY1RUNEc1FTZEZoZEdCd05FTlV3Q1ErUUlQQUp6cFp1T2VhNnh1QVdjSXNvZGhDZ0J5RnRqZTZ2RDhFNTM5QWtCRUl6Wk1BVUN1QTNYK3h0cTRiTG12T25NWHVCa0U3bnVZM3dYb1h1Q0FGWVFuV0VGcC80YkRCd0NJYUQ4UXN5aHNISjJjTHlhQjJpTWhhZzVwSEMwYkVvYnZ2bVBCS3dBaDFPbkQrMkFOWWhQeXdsU0xybXdxK043T21BS0FYamVMZVBZdFlJdVlQUGRIYTY1ck12MndTK0lKZ01PNjZZenZVK0dOR3ZMMFhSWmMxQUx3bjloNEF1QVJSR0hJVCtiL0dKOXo4aFpRYzlLd1MrSUpnRXZTNk9UWDNnTU9QV2xBNkd2M21IbzlDOEZQN1lFbkFFNXA0Ni9aeko3Nkc1K0VENExqL1k4UVNlQVhDNThBQ0tHc0plK1lsckdyeDNlRlpsM0tla0t4ZHdQd0JNQXRvTHI3K2kwbXVXYU5XSmx2em9YRUFIcy9FRThBME9uQ210SHR6UlZFUjVrb2VmQUw0bXc2dGdiN084VVNRRmc4ZlV1TUdmYkQyN3l6a25mNDlHbm5aQWpIQW5zN0NFc0FuQmZQbzI3WS9peHpBdUJBVE44d21hZDVFY0hldjhjU0FIQ21DQzN0N3R2OUtMZG9UVzArK05CWjhhQnh3SDdnWVFtQTB5eXdPV2xQN3A4Tm5KZXlrVHUzWHMzRnJ0aTRjZk9JaS9FRVFBaWh0SWQydndHZm4vN0tOUzg2Zi9kWEIreDVJSllBVElxb25uenJscVdYZ1ZycysrVnl4d1dDeEdRNFpqa3NBWmlXVnkxNjNJcXRENEtsOHIxMDJkcVJVTFpzQjY1YklOYlFxOWJVT1ZUUnh2a2ZBNWlaZkNkcENqMUhzUWR6NElZamdCanlmSTZNSE5uMDNpZE14NGM2M0R2ZWFabEFDQ25COUF2RUVVQ1AzVXhOb2VQVWxvK1hucVNyR2p1ajBHdTE1N0hsVkdET3FYQUVNQkVuaFJjSEtvNnQvbkxsR2NKS1BTZVB6Z1FiUmRpWXVyU2pXT1Z3M3U2bXpBSjFpTTdJbUZGNWZQTzZ0Zitwd3F2UWRkZ1YrVjBpK0RiS0xvUU93aHRJNFFqQXlyZHBWSHI2WkZSeWR0ZU92YnQzQkhnanhIYno1SHZUV3pzMTZBc05RK0VFWUhsMjdmajRycU1RS2l1dE9IVzQrTnl4TTZYVmxXVjF5QjJHb21NajQyT1RPaVIxYUIrVEVHU2JQY1pnUnNIRkdRTWNjRloyM1NBQk0zc1lqZ0I4enN1cUVRUlU0YjBQTVZZQzI4ait0eU9ZSno0d2lsaytCSkRRRUk0M2RzY1FBUHdXbmNRTThLSUZTZ0U0RnJ5dEVBd0JPQzIzYXJDQXR4dUVJWUFnMzFXeExYaVRkL2tLY0N4NHUwRVlVenk1REdCUEtyRU9YUmsvQVpKay85dVRDS3pESWNZQzRIZ3FTTUtUa0N1eFNobVdNTUVuWE1JRm9DZUFWZDRBRWxiU2NBb1pDMEJPQXV3SzFqelFXQUM4WWdOSWVJTVZmMFVPQXAxTENFNWFQRU1CUk9JZU1wT0lSaVRPTVN0REFjaGxBTnNTQ2lJQXVSVmtYN3dZWmFRQUhBek9CTTVRQU5JZnlMN2d1SVhLSjRDRHdYR1ZOeFNBWEFleUwyRnRqY3RJQVRnWW5DelNSZ0tJNHhxK1M4SVZGMGFjR0NNQlFLWUxrNWhOcm5FUkl3SEluUUE3ZzVHU3dVZ0FmVUFhSXJFR2pFUWZSZ0tRNTBMdERJYkxyMUVSNlE5a1o4S051MDhPQXAyTWU2aGhFU01CSklFMFJHSVJCWVlsREFTUVdBelVFb2tsWkJ1V01OcnRqOHpJOTJSbnQ0ZHBqc1JzamhyR1NjZHk5d2lMeXVxYms1dUw0MkVrRVlxeU9LTVMrUDQrN3BCNGp5YzNKMU5HWTdJUnhzZkRpQjIrM0NrZXI4Y2psd2ZzUWYwbFB4dVVvUFA0Q3dsTnovTm05Y1hZYlpSWXl5T3pEUXF3dUh5R1JQUXB5TTdKYXNWZ1FzS1pUNHlTcFRQNy9McEM0M0x5Yzd5Wm1FR3BKT2J5aThlZ0FKVFRkMGhIcnpmVEsvM0hST08wMFF3ZTFPdmY1VTdQOVdRVkJHV1NIa0VwTjRxYnorSFloeXV5ZS8vczdKeEVlTXNTWXFyamFnTVg0SGJ1eHgyZDZmWG1lR1R3ZG92NTNZckFmK2Q4OE11Vm1OYzNLN2VQUEY1bUdZOC9FZmp2cG5TTks5VlRrT1dWaTBkV3NHeDg0TCtiK05zTXovRG01T1hMZEM3bXNzMWdROURzaDdNN29rKytOeWZMY0k5Q0FvVFJQTkNhdDdNcklhdGZqaWRiTGg3eHA4WmdHRzdsOE16VnJxQWcweXVQSG5HbHZrUGd2R3ZXajg5RE12cG1aK2ZKeFNOZVRGa2M4TS9XNys3Nzl1eEJDSVZuOU0zTHk4SE1kaWtoWUdCZ0FWai9CR2hPckNjdk44ZGp2U2lkeEpyQWVRUEUrckxMMXF4QkNMWExLY2pPNnltV05PMUtUZm0zZ1F1SSt6V245TXZQemt1MnVoVjJwdHIzNDRLUERMWUNCQllBUWdpaDhPNjUrWjRjNlhsRWlsTHVXLy9CZS9VWUdkZ0ZGMEFEVVgzNlplWG15Ynl3ZU5TWCtYNTY5Mk1mWm1sYkNLQ0JWdDYrT1o3ZVdQRlBneGJmdWZxZjN2dFV3ZmpsTjJFakFUU1FWT0ROOHNvMFJqb29aYjQxQ3o4aDZIdUVrQTBGZ0JCQ0tDUXRyMTlXdmp5dmRBR2xwT3JIaFV0SU94OGh1d3FnZ1lqZWZiTTgrVVkrVDQ2bnZyUnkvWUtsdU85OE5YWVdRQU94MmZtNW5tQTl0bFozdm5MOXdxVXNGdXd2Z0FhUzhydzVlY0UxTlBDVlZmM3c1dGVzVnB3aUFJUVFRcTVVYjM1MmZvcWo3a21mK3RMcU5mTytvbm5ucTNIZ2x4WGF2U0F2TjllNW5rZjFKV1UvdkxjY3lwb0RCZEJBVEdaQmRyWUhLM2VpamFnOVg3NXFnWUdmTHhtT0ZVQURyZkp6YzNOem5IR1RkUlZscStaL0IyM1ZHZCtOQVozeTg3THl1OWpaQWEyMm9temxHMnQ0V0E0S0FTQ0VFQXJKeVBQazJISHhxTGE4Yk9XYnEzbFpEeDRCTkJEUjI1dm55YmZOdmxKTlNlbXErVngrK1UwRW13QWFpTS9OejhuSkZqd1FlbTM1bVpWdmJ1QjlsZUFVUUFOdFBma2ViN3FRYTRnMVpVV3I1aHBGZHdFaG1BWFFRTG8zTHp1L28wRGZRMVZaMGZmelRlbDhoS1FBR2dudm1ldk42V3Q5c0p1SzB1SnYzOXhpNWhXbEFKb1JtVG5BazIzWmlmYnF5bVBmdjduWjdLdEtBV2hvbTlVMzE5dmQzQkZpVGZtSkgrWnNOL1dTalVnQitLRmpmbDV1ZmtjelpGQmRmdUtIVjdhWmNDRmRwQUFDNGVxUjc4M0pTK1MzaGxoV2NmS2IrVHU0bWNkQUNzQ1ltTjdaK2JtNTRDZmFLeXFQckhoeko3UlZVcVFBY0luTDloVGs5Z1RhWGl5dk9McnlsWDB3dHRpUUFpQWpLUzh2MTlPWmFhSlFVbmxrMVN2N29SckVpaFFBRGVtNU9UbmVUdVF5VUlxcWpuODE3d0I4ZytpUkFxQW1zbGUyTjhjYjY4WThxcUtVVkJ6NmV0NGh2bTBpUndxQWtaZ3NUM1plWm1ob3dBbGpmV25Wb2EvZk9HSldtMGlRQWdBaElUOHp6NU1lNGdyWGJpM1ZWRllkK3ViMXd4WTBDZ3NwQUVCU1BUbmVyQlMzdTBFRjllNjZtcnFhUTB2bUhiTzRXUUdSQWdBbkl5ZXpSOCsyS0xTKzZ0RHF1YWVzYm8zRUdrSjYvaDRqYzdNQS9EOFlTR05kQ2wrU2hnQUFBQUJKUlU1RXJrSmdnZz09IiBoZWlnaHQ9IjUxMiIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIvPjwvZz48L2c+PC9tYXNrPjwvZGVmcz48ZyBjbGlwLXBhdGg9InVybCgjYjczMGQ4NDJkMykiPjxnIG1hc2s9InVybCgjNDhhOTdkYzc0MikiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDYuNzYwMjU0LCAwLCAwLCA2Ljc2MDI1NCwgMTkxLjkyNDM0NywgMTQ0LjQ1OTIzNykiPjxpbWFnZSB4PSIwIiB5PSIwIiB3aWR0aD0iNTEyIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQWdBQUFBSUFDQUlBQUFCN0drT3RBQUFBQm1KTFIwUUEvd0QvQVArZ3ZhZVRBQUFnQUVsRVFWUjRuT3pkYTVSa1YzVWc2TDMzT2VmZUc0L01yS3lYVkR5RTdmYllNNHpkN1ZsNHRZMHhVSklLU2FXWEplaGkybmFQYld3a0lTU0VqRmQ3OWI4cC81cWVubDZHRnNoUWVsb1kwMnRLNHphMnNVQklvb1JlQ0ZzMnRodndhdGJ5QTRTZVZaV3ZlTng3enpsNzcva1JwVUxvVlJHWkdSbVpHZWRUclZLcGxCRzVveXJpN0h2UDJXY2ZoQ1RaWk82NC8zeEZBakpBUmdDWlZmcEFObE5EQm9Dc3kxMWhyRU1pQU5YSU1VWUdaaDlZQlFEVTFXU0lWRm1DY0dUbDZ3ODhNT25YbENTYkVVNDZnQ1FCQVBqRS9lY3JJQ0FDZ0RPWVJWYmp3RHBROU1KQUxLekRQQThSS3BpTUNpUVZYOWJzclhNcUJoUlU0SU1IL256TXJ5Tkp0cEtVQUpKSitrOS92dDhRSUdIbUNBUVVDWkVVWXJOZGNKRFRYNllLcWdDZ29IQXFEN3c0SFNBQURISUg0cWtrQWkvOEIzQkFWT0FBWU9XSGR6MjlzOW45MXoveUQ1amUrRW1TRWtBeUVVZVBIdXJrM1dpNEtrSmRhMmFSTERYYlRwbDBNTklycUtncXFBNStZelNJZ0loSWdEaElDVWdXeTU0bzgvWG5mK24vL2RyUGZ1ZjRXV1daSFg3djNldi8ycEprNjBnSklObFFOOTN6TTBqR1NiR3p1K3ZwMldmUm1tYTdBS1ZUdzcyb0tLaU1QdVMvT2tSQVFpSkVCSmVibGVVK1FYN3laSHVtM2N1ZHYvNWQ5Ni9qOTBxU3JTVWxnR1NEM0h6dk93UkFRWUFEdVR3U3pzM05oSnBWUVVRSENXQ3NFSUVNRW1GV21PNVNEYUxHVWd5aVVXKzRPSzBTSjlNb0pZQms3RDcrcGJjcEVCbURVU0lBWmRoc3RtTVVGUlVlKzdqL2NtVFFHTXFiMUYycXVSU1RHeUp6N2JsZjJPZzRrbVRTVWdKSXh1aW1ldzZpRWFBQVdndTR4a3hPYURpcWlBNVoxVE0reG1CV21Mb0t3TVlRc1FmeGV0MGw5MHcycWlUWlNDa0JKT1B5cVM5ZkVLSnF0SlJGeWpuUEdqR0lzTXE2VHZHdkJTSVlSODIyN1M5RDdMQmFpUkp2UEpoV0JaSnBrUkpBc3Y1dSt1SjVRT0J5aXd5MStOa2RiVi94cGhyNlg0d010bVpkdWF4bHZ5SUNFTHpoNEgyVERpcEpOa0pLQU1sNnV1bWVnMmlWakhJSTRIQitkNnZmRFJJMzZkQi9HaUlXTGR0ZnFjUWpXVlRHRDExMDc2U0RTcEt4U3drZ1dUYzMzM2RBZ0RRWUtxVFJOaW9RdkV4OHJuOUlpSkEzYkFnY3Vrb09OT3IxRjM1cDBrRWx5WGlsQkpDc2p5TVBYcWdJN0ZrZHp1NG8rcDBvTEJ0ZjRiTkdlY09JcU8rd0dvMkJmL1BnbHljZFVaS01VVW9BeVZyZGRNOStzSlFWRmdWTnc0QkNxR1dUei9tOGhyeGhZdFN5VXhPYUdPSnZYWFpzMGhFbHliaWtCSkNzeWUvZGQ0Q1ZOU29XZHVmZVZtZlJiOFVMLzVkb3RHemR4MzZuMTJpMXlKS3FxZ3FjYmt1aGdLZitRMVVGVkJId1F4ZWtkZU5rNjBrSklGbTlXeDY2SERER3lnZml1YmxXMlkvam1QRi9jV01mUUVBQXdCYzFneHU4aFJYV3Q1TkUzckRpTTBGRlZWRUJFRlVBbFVHRE9sSlFRQkZXWlZRMERwa1pCdjlUOVVNWFByajJBSkprQTZRRWtLekdUZmNjTkJtNmdrQW9hMG53TW1qcXNHNFE2SVVHUG5DcUcraXBQY09pekpFVlNWVVJBRlhKa0RFVzRIVHJOMUNGdFZlZEdrdEVwMzc5a25RREwzUWVCUURycUxOY0RXNFRRTVRrbGprQ3FJTGNjUDdEYXdrZ1NjWXRKWUJrWkVjZU9NaUswV3MyUXpNN2JYZkJ4eWhuZnRod2lKQU1EZ1p4VlJBVmpxQnFWSkZGV1dQdnF6ODMrNi8renN3dUt3Q3FJcUtxOWl0dlhkTmFOSVFHTk11TmlDSUM4eHEySEorNjN6alZuZlJVMCtsVC8ydlFmUHJVM2NuZzY1RFE1YlN5VkJvUTFtaHR6aldDa2pMZGNISHFNNUZzUmlrQkpLTzUrZjZMRU5VQWdYV3RuZEJaOU9zeTdZTUlaSWdJVkFFSm8xZGxGMkpjeXZxemtGa3hJaWlxL3NRODl4dmhlMjg4ZlBqdzZjZitYNS8vZVNKSFJNWmFTNEFFVll5T3JBWEpHMDVGWTlUMTdURDZTdkcvMEgyYWdBaXozS3dzOWxDTmVFdFpOS2dBY3UzNXFhWW8yVnhTQWtoRzhLbjdMNHdxaUVaSlpuYmt2VTVZKzhDS0NNYlNvR2x6WGJFTTdpMHlvNEkxY0FTdVREaDg3b1BEUCtIL2MvLzVoQVNxUWFFQUlOTE1PZDdBN1FoRXA5S0F5MDIzVzFraDBNaWd6TUxpUDNMUlZ6Y3NraVI1YlNrQkpNTzY5U3VYQ3JBR3FkWFA3R2hXdmJqR1NmL3ZELzBHNjFLVjdjbEgzakx6azk4MHN5dkM4SkcxN2NYOWovY2RBQlFyQUxVMFpock50dWwzd3ByQ0hkVUx5eGd1SXg4aWwxTEhycUhNVW5iZGdWUXlsR3dLS1FFa1E3bmo0VjlRWW9tZ0xoSlJYZklhbjlCWU5JYVFvQ3laMVZyUytybWRzZGNzdi91NkYwL3ZyTnJINzczQVcrbFEzQm1NeXdzeUVzTzZMVlNNWkxDcWtUZk0wbUxYZ1VPcjNnY1cvcTJMSHBsSVBFbHlXa29BeVpuZDhlaDcwRVFOQUVYa3FMNWEwK2hQaE1haWNWUjJJMGMwRGxsQmdXNDhiMzFPYlAva3ZSZUFJYkxvYThZTVp1Ynkza3FZd0xFRFAyaVFCbHF6YnZINW5vOTFrZWNXM0RYbmZuR3lVU1ZUTGlXQTVBeCsvOUZEWUtJdzJaYXZlakg0TlZ4SEkxaExOcU4rdDBaMVNNcXNLdmpoQzlabkhGU0Z2L3JPLy9UMDR2eFR6KytBM0xYbkJ6bG1FN1dpSTROWllaaWpWa2dXbzFlSWNtMXFPcFJNU0VvQXlXdjUvYSsrQjQxcU1OU3Examo2RTZITlNGVjlEZjErbVRscmpidisvSFdyai96WUY4NzlzZGVmUFBpVGYzZkxReGVERlplWnV1Uk4ySXB1c1BMUm5zODZKNEpXVVEyb3luWHBhT0prRWxJQ1NGN1Y3WTljUVE1UWpHMkZYaWZFTll6K3hsTGVNSjJsQ3RVb0tiT0VFSC83a2dmWEs5U2I3NytBVlNTeWF6VG1kdG5lY3VDNHFUdFNFR0Y3THVzc1JRMGVEQkdtTXltVENVZ0pJSGxsdHoxME9Wb0ZNYTdOYTduMlJ3U2JHU0lvK3h5WGF5b01XZnVoZDYxYnQzMVZlT0k3UC9ic3lzN3ZQajhyUm1kbTg3SWJOOCtjejJ0QWhLSnB5OUtUV0pNWkJIUFYyLzVrMGtFbDA0WE8vQ1hKOURueTVVdEVvMGFrSWxSOVh2WG9UNFJGMDBhdi9hNmdLT1ZHS2w3SDBmL1creTkvNEpzLy9kTnYrdlpUaTN2YU8vT2ljUDFPMkJLalB3Q29RdG1QV2VieXRrRXd4c0tkajE0NTZhQ1M2Wkx1QUpLWE9uTGZSVXhpMEVFV2pUSDFhbXQrak1HaWJjdGxyYXVLckFHa0d3NnNaOUhMcDc1OElhSWpKc2loTVEvZHhjRHIxNUZpSTdtTWlyYmxya1VyS3ZTK3QvN3hwQ05LcGtXNkEwaCt3S2Z1UDhpb1JxaUN2blYyMWFPL2RaUTFUSGVGQlhyV29VUmUzOUgvRS9kZXdBcXFRWE5zN3NDVmszNkxqdjRBRUx5VW5XamFVWVhRNk8yUHZudlNFU1hUSXQwQkpOOTM2N0YzSzBUaEVBeTNaN0pWYnAxRnlESURDR1ZQckZNUlJvalhqZExMNFl4Kzcwc1hDUW9JUUc1bTVteHYyVy84ZWk4WkpFSVJWVm1mUFFiV1VXdlcxUjBMR0pYaC9XLy8wM1Y0MGlSNVRTa0JKS2ZjL3NqbEtrWVp3WEhlbHM2aVg4V1RJRUpXbUxyaXlHb01TWVQxdmZBSGdOKzc3MkpBQVFHeDNKekp5MTZBU2N6NUk1Q0NHSXRrRUhSdGJVZGY0SEp5bWVHU0JFUVZyM25IbjYxTHFFbnlhdElVVUhJYUliSEpxRFVQcXg3OWk2YjFGY2JBQ01vczZ6NzZmL0xZWldnQmxEQ0hSaXNydTJzZC9SSEJPakoydEN1aDJaMDVVUjdFY0hEZUU0c2lvc3ZKV0ZyTE5WV29oWU9JQ2FvSUNyYzlkTVhxbnl0SmhwQVNRQUlBY09mRDd6WVdBRjF6VjF3NlhxM2lHUkNoMFhhK3BPQVowYWpvaDg5ZjV3MnVuN3IvRWdBQk1LYXBMcWVxSDlmeWJJT2gzMmJFVVlRVmFZU1JPd1lwYkRNSFVoQm1YbG9PWmEyK0JtUFFqWjVPWHF5dTJEbkR5Z1lOZ2IzejJLRlZQMVdTbkpHWmRBREo1QjE1NEZJZ1FiR05YYkowdk5MUkYxTUhvMy9kZzdvTVJLUUtINzVndlVmL1k1Y3FLVEppeHRhdXRSdWRzV1FzR29PK2doakEyWWJMUjVqTloxYmI4TXhveWE3MEttdHBjQ0JNV1RJQTVia2hPblZLNVNvRUwzTTdNdzBOak5vL09mdXYzL3dMRHo3NDRHcWVLRW5PSk4wQlRMc2p4eTRURkE3S3J1b3MxcXVZeUVhRTVvenpYWXd4R0l2Q3NsNjlmVTY3NWN1WHFBb0NhY1l1bzdwYy9iWC9vRCt6eThoNzZYYUNnaHByV0lSQ3E5RzJRejZKc0JZTm03c1dJTTNteGIrLzZMNlBYUENsRU1RWUJOVnVoMlBBckRER3J2THp0WHl5YnU2cU1jUGozM2hqKzRlZldkMlRKTWtacFFRdzFXNCtkZ2pJRVJwUHdSZ0s5Y2dYLzRQUnYrNlp2cThBRUZBL3ZMWSsvaTkzNjhPWEFJRUJaSWg1dzZ4bDVzYzZ5Z29UUFhTV0l3QVFZWXlNYUJ3NUlITDVDRGZFWlQ4S1FLZzltVk1UUHI5MTRaZHVQSEF2TTRCS3Q5ZnY5bVdRYVhCVkUwSUx6NVhaZkwzdnZMKzJzOHMzUDNESmFwNGlTYzRrSllDcGxobUlZcks4MkxrNzczZEhMdm84TmUvZnBTcVUxcGpBZlAzNTZ6ejYzL0h3SlFpRUJwU3dQZWZLN2lwSC84RXhqY1ppMWVlZVowQ0lBVzQ0OEtVYkw3anZ1blAvTkt2Umg3cGF5dlBHc0RtZzdqTmxYWnVad1huMHA5MzRyaS82NEkyenFOTHRTdkNhTit4SUN3d0RJdHBmQ1VHOG0rMVFSamM5Zm5EVVowaVNNMG9KWUhyOS9xUHZNVTdhT1RaM3hlV1Q5Y2lQUnloYTF2ZE03YjBCSXlDL2VjRTZIM1IxODdGRHJCbUJBQmF0bmRSZFhrMXRFZ0FZaTNuVGhGcjZ5MUZVbmNFZ2V1TUYzODlWR0hUbjh4YVJpdWJRczBDaVJkUGxXUlBKZlBMWUQ1VHIvUFlsRC83V0JmZXJFcW9FTDhHYlpzdlM2RG1nTG5uSHpxeFJOSU9MbHROSE5WbC82VjAxcFg3L2tjdWllQkl3N1dyeCtYSVZ5NVZGdy9vK3hlQ0phQncxUHdCZ2lUMWJwRVo3SjY4bVJRMmV4RkhldEZWUE9EQVNhTkFiRDl6NzczK3dCWCtqUjUzZEdpSFdGWitlMGptanFoOVZJVVlHZW9XcHN3K2Yvd1ZoSld1clN1clNOR2ZkOE05ODJzckp1clUzRnNHaDZHMFBwWnVBWkoybEJEQ05ibi9rY2dWakVYcWhXNWZNY2VUaFB5dE0zUmNmQWlDQzZvZmV0ZjRuV3gwNWRpa1pidGpRMkJVV24xOWxaZXBnMnFmWEVVUkFRNkI2d3l1ZHZ2TGU5OTd0Y3drUURjOE9Qd3ZrS3k3clpiQk05TXFmb3hzdi9KSUlFV3F2VjlWZDA1d1pPUWNvd01yeE9vcDNxaTdMam40alZZVW02eWtsZ0dtRWFBUUVxSmpibWE5aVRkVmx4RkVVZ1FoWTVib0Q2OS9JL3BZSERvcEdDV3piY2VtNFgwV3pCVVRNRzliWFV2V0ZTRm54K3ZQdi9kQ3JUMUlKU0lHNUF1WEZzTE5BTWNpdTF4VkZsbHY3cWcrNThWMmZqekZtdVkwUTZxNXR6cmhSNTRKOHpYTTdjOFNpMGM3cWFtUFB0VSsydTVRQXBzNXRYN2xjUVlqeTV1NjRzakR5dklxeFpCMXhQRlg1dnU1N2ZRSGd5TU9YZ3JWRzBXdmxhMTFGbHpja0xGcW1MaUZ5VUJXSmV2MytlMTc3SWRlOTdYTkVoTUJWUHc1L25SNXFKc3dObVR1ZmVNK3JmYzFITHJxWExKQmFWWXo5b2pYclJxMExXajVaTjNiSnlsSVpndHp5OE1XalBUaEpYbDFLQU5QbGs0OWV5VVFhVlV4LzhYZzE2b1UxRVRiYXBxNEFEYW5pZGZ2SGNvZ1ZvVkZTekJwek94dXJLUGtud21iYmNtblpld0lqeXRlZk4xU1c2bkVwQml6UFowUFhnL3FLZ1VGTkZINnRMUFhCdC84NWdnRUV6OEgzOGtiYkRmbjhBNnBhOVZqRnhCZ3hiZDVNMWs5S0FOUEZBQWloR0dNc2pYckU0Nm1TLzQ2dDJMSGdkZWVlNFpwNmRXNTkrQW95WUNtYjNhdXJhRWxFaE0wWjUzdXU0cEtzQWRFUEgzaGd5TWNHamQvdFBVdk9aTVd3ZzJ6dzB2TW4yZk1aZXdCZDg0Ny9KaXFvNEVOZDk4M3c1VVlEWlRmczJFY0dNeGI1NUZmU2FuQ3lQbElDbUNKM1BQWWVRNW9EenUyQjNzcklZMnVqNWVxK1k2MHo1S2hqdVE2OTQ5SExWS05FTEdianduUGxxQTlId3VhTXE3dlcrNXJBQ2NwclRQcS8zSExvbmwzc1ZvdzQ5QlJRRExMenJDS3pGdlRNSDZWcjMvRTVFVVpDQUdSV200MzI2VnM2WGxlaFZoQ0Q2U1lnV1I4cEFVeUxPLy9pa0lLaUd0c01pOCtQUExabWhTbjdHamdBV3NMNG0rZCtidDBqL016akJ3blJHZ3l4TG50eDFLWVVpTkNjc1hYZmVsOFRrYkorNk56UktsTVBuL3RnVGlaeTZKNWtOL1RvekVGVUxDSCt3Uk5uUHNqbGcrZitHU0lCQ25CZU5NMUlHOFI4emJ2T3pqUEtGZlNUeHk0ZC9vRko4bXBTQXBnYUFtUk5aR2JXVWVzK3JTTUFVQUZRRVlWcjN6bVdxZjhRamFVQVVNenR6a2J1OVRiWWs5eXozdGRrU0VTdVA3Q2FHYW8zelg4WFZGdlp6dUV2ejBNdHFraUdoenlLK0FQditKd3FCUkh1Tlp0RGR4OGFXRDVaUjZxRThkVUtUNU5rSk9sdE5CWHVlT3hLd0lpTWMzdHgxSE8raURCdkdnNUVLS0J3M1R2SGNrckpMUTlleHFKbG5iZjJoS1VUSTFmOUYwMWI5N0QyZlVRUVhlWG9Ed0E3R3N2dis1bTcwZUR3NjhBaENITWM2WFpGVkMxU0ZGOTJaUGoxQmdDSVFXWjI1TlpaUUw3bEs2bEJVTEpXS1FGc2YzY2V1d0lZbEFHeTNpcDJWRFhhMW5lTmxoNFlyanYzejhjUjRlODlmSWtTaWxERWF2bkV5SXNUZVdHcWZtU09oRVlrWG4vZTZsZW4vN2MzZk90TGYvOHVBUjIrV2o4R0FkY0hKUjE2WGVTNmQvNEpncXFDc1kyc0lCeWxMTFN6NkFVclZNQzBFcENzV1VvQVU4QWdSbFVoUUJ5MXBqNXZtTHBIVVdwd0J1S2FXdkMvVm9CQWpHeGNOck1qQy9WbzM4VTZJb3VXTEJJQXdJZlcxcEVDRVo1ZDJRc1NsMC9XUXpaekZ0YVpIUm1oRzJsRXZ2b2RuME8weU1UOVpuTm1oSW1nR0dSMnZqQ1VxY3F0RDZlYmdHUk5VZ0xZNW01NzlNb0lERG5ON0pIZThtaVRQOWFSS3NRUVFFbEpyMzJsSmdwcmQvdWpWNEpDaHE2MWkwZmRtRWFFalJrWEtpZElodWk2ODlaaGNZSkFGS0RwZGcxV1BvWVJnaUFhRmJydHNSRmFOYUNpamNyS2RjbkRmeThBNkN4NXp6V1N2cVFSYVpLTUtpV0E3ZXpvMFVOWmFkQ1lydStNT3JHT0NIblQxSjdRb0lwK2NQLzY3L2dGZ0tQZk9PU2NzY2I2VUhlWC9HZ2IweEJhY3k1MlhEOENpN25tSGVzMlBlVkFNOXV3YnVoWklDL0tGRG1ZVWFwNnJucm4zY2JEM05ORTJoeitMQm9BQ0RYdmVsMmVaUTFWdlBQeFY5MkJuQ1JubEJMQWRoWm1zVmhBQzI3bnJtWVljZHRYMGJTKzR5Q0NLRjEzL2xqS2ZnQWcxbEEwa2RETm41V1BXdm5UYU5tNmsvazZGQWhoOUdNc1g0MEJVTXhZWmZpcmNvNkNncGtqR1BHSStxS0R2WGxSbFA2eWpyUWF2TExnZmNWa0RHSDZDQ2VybDk0OTI5WWREeDBLVHNvM1VEWmZqenExNGpLcUs0NGFpQkRXYjJ4OWlWc2ZmM2VJV25YQXRhdFJUNkozdWZFbGkzZzBpQ3pydUMvaGwzNzJ2eW9Da1F6ZkVTaEdMZU95TUkrMG5Bc0E3MzN2M2FFaG9PQnNZL2d1cEFCUWwzSHU5V0RKS3V1ZFAzZ2FRWklNTHlXQWJRc05pY09hZmQxakdiSkdmZkJBeEt3d0NFWkJBUFg2OHo4L3JnZ1Z2VXBrNUtnalJVaUVSZE5ZVXlBb29IemcvRDlkMzhCVU9TcjNsdjJRT1lDajJEd0FHVHhUUTRpWHUvcm4veGpKTUVpOVl2TlJiZ0xLbGNnTVdrZTFxenB6TWtsU0F0aXVibnZzRUdzd21acy9HMFk5NjdGbzJkRFBmQkJRK09EK2NZMyt0ejl5dVhJMFNxMDlmdFNqdnBvekxuWnpMUVhWWERPR2ZRa0NvaElnRnNNWEFyVm1NNnQyZFozYUZCUUVFRncrU29PZ2ZqZW82MmxCYVZOWXNtcnByYk05RVJDUTZWWW5GNCtQUFBsVDlVTmdiNDBkZG0vcktoR0Ircm9jdGVOYjNqQmxSNlBVWUJGR1A4cG1HSXFneG1SdXhndzlDeVNpQUVTcmFwRjA5ZHYrQ0pEWWFuOTVoQTFvd3Rwb1dVZVpBTngyN1BKVmZOOEIxVk0va2ltVXlzaTJvYnUrOW91aTBhbHI3UzBXbmh0aGJoMFJYV0drWjBRRWtHNFkyOXJ2clk5Y0tjb0czZnpaNXNRei9lRWZTSVF1TTF3QmdDakIxUWZHc2kxWjBCa1VnM2I0MlJXT1FtcEU1UThmL3FWZmZ2dG5SLzJPU29Bc1JGbldGRC8wVG9qZVNzRG94QWNZcGZyb3ptUDdGWXlDVWJDQzlQbS9XYmowcHg2Nyt5OS85di84bzdtVHZkcXplc0RmZjkrRG83NkVaQ3RLczRmYnpaRW5yblpjR1FocU8xVS9qdFQycDJoWktmUG9TekI0N1JyMjA3NjJ3M3A0MS8vNGJuRmlNWEJwTFk1VW50VGVrWVZlUnRKbnBhdmVPWlp0eVFCdyt4UHZpK0RhNnRtZEhQSUdaV1pIaHZWdUNqVVQvTXJiUms0QUFIRHJJLzhHVkQzM3JNVTRYRlVUSXV3OHU5RTlqaEtsS3YwTkY3OXF3ajU4Ykg4VGpRTXF3QmdVSjE0aFo3UUFwSUFDaXBqOTB6Tkx2VEoyQUp0UmJBQlRoWTkrNUt1cmVDSEpGcEx1QUxhYkhIeHRDaFBaR0J4cDlMZU9nbWRWajhZcWozd015L0IyUFBuOHlSOC81MDJMdmZhOExJelNtaUlyVEc5RlNMMGhhM0NNRVVad2hYb0ZNV2JvU2xCV0IrQWQwQnJtemRCUUEyZXAyWS9MUXlVQVZZaGV5RFQ2blJYelNqY3JSNTU0QzlZTlZGZUg3SVRXZThnUWtDaUdJbTgwYy9Dc0lxcEtBSTJpcnY0WlZucG1kaTZvNXFiVDgwWGo2aU1YM25MTnZhdCtPY25tbHhMQXRuTDBHNGVxS3M1QjRObnV5dkhSMW43emhxbDZxQ0JBY08xNmJLbDk1UWdmTzdTMDBwOS83QnZzeXVXRkVRci9FYUZvV3ZTR01iTEFWZU01akd6Z21wKys1VE4vK1NzQU9IeVJ2YkNLUkNEbTFkNVVJNkVLTUlBR0pjSWh5NkxLYmxUMldXRkF2LytOai96Wlplb0VER3BaUTJPQk9zMkMzTmxxOHhhU1FWOHhSK3d1ZTFCUUFGQUFCRkpsTDdIaWxVak5PWUs1bVJEUnFsNy84WGQ5NGtNam5LbVFiQzFwRVhoYjRXaUxvcTZDaG5LMDBzKzhZZXFlaVVGQjhkcXhWZjRBUUFEWXNkSVROSG5EakhTRDBtZzczMjBvTWdGOVlQOVlwdjVmVEZVUnRTNTV5SzV3d3VxNXA2cTYybjBUNy8rNXUxVlZsREcyaDk4VDRHdWUyeXRabG1FOWQvTWYvZHAvK2FOZnZmV1JLN0JOR0VnTm96UzBkMWEySTdkdE1KbldaZXl2aEZBelI1WEIxYitvNmdzL2c2cW9pdmFXcXFCU09LU2dZdlQ5TisxZjNTdEtOcitVQUxhUFAzejRsN2pXVUJXTm5mMlJlajRUSVJsa1prS1FzVzM3QW9BN2ovMGFpeWtCSU91TlZQeGpMSElVMVlCb0FEZWlZRVZCSTB1L0c0YmNDaUNpRmZjWlpTMGZLUVVsSklIUkRndnpsUnBUek8rb2ovLzNIM0o3VHhCUWxya3d3KzFkempXRnJQWTZvZCtOd2ZOZ3Y4V1pDMzRVeWhWZmNUUnQ0Mk1rYTk5Mzh3V3JmMVhKSnBZU3dQYWhCdEJUWFZXOWxUaFNWVi9lTkZ6bHdBbzZ4bTFmQUFEV2N5aVV5T1hFbzNUUWI4NDREUTJFQ0toWHZXT2R0MzI5SWdVQTBveWFReDdhSmFLTkJsbUxJeDN5OVJMWHZQMlBCSVZWZThzanRJY3J1NUdaT3hMUE9mOWJCaVdiaVd4TFo3Vzc3S3QrREVHRUI5ZjRvd1ZUZFh3Wlk3T1ZCeVdqL0dzZjNUL3F5MGsydjVRQXRvblBQdkdMQ3FJWnRzNksxU2c3djZ3alg3RktOSGtjc1pQTmFJNSs0NUJ4Z2tXUHFkdGRHdUh5UDh0TmR5bXlSSlp4TnFiNFFVb0lZRExUSEhLWGxZbzJaNXhCWjlmV3BsOUJ4WVNHMlRIS3dmVHNkUmt6TDFsUEZicEx2aTQ1dmpEdXIrWHZ0T3I0a21QVGNneHNEZnpHNys1Zi9YTWxtMUpLQU5zR21neHJYM1VYL1VnZitieGhTQXB0UFFXbS91Q0JjUlZXQW9Ddm9XZ3pnQ21hZHRUaTFDSnJFWUtvL3NiUGI4VGxQd0Fna2xnaW13MjVCcUFLUkdTVWFGV2JnYi8vUENRbTJxanhGYXQ2WGcyelZpWDdram1LaUk1OHRmL3E2bTZvRkpwdDBBaHErTi85N2x2WDY1bVR6U0FsZ08zZ3M0Ly9Jak1EME14WlV2VkdxSS9NY3RQdktxdG90Uk95enZnaUJBQVY3SzFBZ09XUlp2K0xwdldkWEpnTm1RKzg4MC9HRjk1TEVKb013SklkZmtwSFJBRU1ydTB6ZGUxYlA2ZFJvL2h5R1ljL21CNFVkRjNIL1JjTC9WQkhrN1hFY3pTSS8rNy9mdHM0dmtzeUVTa0JiQTlvbFByVmFHMFZFTUhtWk5BQ3FNYkdOVC85VitPTDc2NUhyd3gxTkdqYWMvbElwNUpsaFVGRkFET20wZTNWV0l6SW1ZS01sZ0FRZEcyZnFhTkhEMUd0NkIyQmRVTzNoUmkzVUlhYWJhdGgyS054OHN2LytXY21IVkd5UGxJQzJQS08vdlVoUlVHazJiMWE5VWU1L0M4TTl6T09Db0RYN2gvdjFBcWlNYWg5MysyTU12dmZhTm5ReVJrRUFOLy85ajhlWDNndmg2aTJXRlNWRWRaMEZSUU1WWEwwNkFqbmdnMzg3bU9IUHY3UTVaOTQ4TEtWdVdwdXhYaXRjZWc5YUJzalZqRkkxcHpSS0dJTS9IS2FDOW9XMGthd0xVL1ZPUmM2bGNKb2wvOUlCcU1ISXBLeDFuNEMzUG5ZZTFqVm1Yem5IamorMUxDZGZ3WTNLREVTeW1oRlRldUNiQldyQWtDRzc1WWlva2JCUGwzR1hjTityRDU5N3dYQmdKTHhzYXBzMGF4V29zc1d6NnBhVGVIUTczYzNhTVY3U0xHT21oZU5vbGQ2SW9SZitrOC85OW5mZm16U1FTVnJzcm11TXBKUmZlYnhYNDRNSXEzMkhsK1Bjdm1mTjR6V1RRNENpaDg4Yjd5WC80WU1JSlRCanpyN0g3c05sZ29Rcm5yNy96ZSs4RjdSZTMvaWJoRlNoQ0VYZ1FGQVZTVnE5ZU1GdU5mK01uajgyei82aGIvOXFadnZQOWkzNEJpWXhBSTJmTCsxS3kvbWxCejdrbjNObTdCRko5ZVJvZGxvS0FkMEdmN3FmLzc1U1VlVXJFbTZBOWpxVkFYTDZIVnBoT0lmSWxUVkVDSVM2bmg3UHNOZFg3c1NWSE9YdFhhWHg1OGFOa1VoZ01uSWV3WWcxVEcyL1hrTmd6K1g0Yy80VWdWQXRTR0c1aXM4NXZEaHd6dk8rWTVyVi9mODdUOWMvSy8rNHVOZk9HZ0xWYkxMV00vdmFvVkt3RXQzbVZVQnhyV2F1ejdZczdwR2U0ZXZWNUF5L1pYZmZldW5VOCs0TFNzbGdDM3N6bU8vcGh6SlNITjMvK1RUbzEzK1EyZ2gxNHA0N2ZucmRwamlLMU5VakRHYTBCMmg4MC9lc3JHVEF3WUF1dXJuTjY3NDV3Y29vT0lJcHp3cUFFZ3Znbm5SWHVVN2orMW5NZ0NtWFByN2sxLy9YMzc0N1E4OTE5bHo1T0ZMczluWW5zM3Fpc2xublFXdkFPUE94T3RJQW52TkdqdENmMFd5M1A3NngvYmZjZU9Ea3c0cVdZMlVBTFl3c2lGNjV4cWg3SXd3UzA0R21WVmpJRVBDNDU5bFZrSlZ0dDJxTzFwOUtqTXBHNFhSVG9wZlI0aWdLc05Qa3VxZ29RNVFqSExrdmtQR1JDUlE5RVo2d2RuR2ZHL2Z1VTlJcStrY1NSbGp3TTZpMTgxOXNmOGFKSExadDdPN3FMOUlKdE5mL3kvdnZPUERYNWwwVU1uSTBockFWa2JxR3FVMk91VW9ZMnRlR09JMkJBQ0ZEeHdZNzhYMVhZKzlSMFFGWE5FeU1uVHZoN3hocWhVYkpDRGh4QzcvQjUxNURJMTBaSVlvU0NuQWpEWXlXME1NbEVjN1Y3UXpONE9VU2QyUG5TWHZxOU03dHNZVy9maHBsTTRTTlhjcUI3QTUvc1luenAxMFJNbklVZ0xZcWo3OTZQOE81QWU5eDRadi9Fa0dPVW9NUVduVmJTdEhRVVFJUHRiZDVSRzZVK1FOaTBTZ0lEckpNaGpFMFFJUVVWQkFDc3JCV3FkWjMrMEViSGdsMzFzSnZVRWJ6bFcxNWRtMGxLV3pnRE83aVNOYXAxZmZmTjZrSTBwR2t4TEFWcVVBS01iRFNtOWxoTkthdkRESWJXWXZLbGNmR0c5bC9XY2UvMlZRUXVkMm5BMitHbllteDJXMHNoaFVJNEplOWJZTnJmMS9HU1VZb1JLbjZzVXlMSUx0TlhjeTVEMDBzbkxTbDczVnQyUGJFbFJrOGJpMmRvaEdNaGxjL1h2cFBtQXJTUWxnUzdyOWtYL0xLb3JZbkJtaHJ3NFJNcXRxTk1hcGpuMXVYU1FhdE95aDdJd3lROVcwUmRZbUVCaHJhN29oS0lnQzY5RG5wcXFDUUJUVzdwS3YrakVHR1RUY24vVHJHRCtScFJQUTJvVWMxR1o0emFmU2ZjQ1drUkxBbG1RTUtaZ3k5bnFqVEsxa0RVT3h6UkVBY2F4OTMwNUJqRndIWEM2SGJrOUVCb05uUWdZeU9QR0JVMFZHekVNcXlqeGN6LzF0UnZUa003RTFiemlDeStqYUkrK2FkRURKVUZJQzJIcU9QSEdaWU14eXUydWY4L1d3Ri9KSUNBS2lIZ2syWUdyOXJzY09xYW8xYm01bk1YenpuNkpwS2JRaUtDQnNXT1BQVjZla0FxSWpyUU5QTDlXVHo0YVpuWllEbWd5dVBYSmcwZ0VsWjViS1FMY2V3MUpNS0d3QUFDQUFTVVJCVkJSc2lZRTZpL1h3ajhvTGc3RVZZMFdFSHpodjdLVTFDS2dnRE5aM1JsaWlzQlpyRkdDUXliVkJPL0xFWlJpSmdJVEZFbTJ1Ymd5Ym5PcnpUOVY3M3REb0wwU2IwWFZITHJqNW1pOU5PcWJrdGFRRXNQV2dZaDZjbXkyWFR3eDkrWStBQkN5ZURBNWZqcmttU0FRZzJYTGRHVGJJTERmVmloVU1XV2JmOXpQL2JhelJ2ZHp0ajF5T29JaWtIa0ltVUJzbFliRyt6MU0zbjdNV3FzZS9WKzU5UTZOY0VKUGg5YmRlOEltclVnN1l2RklDMkdKdVBmWnU4WXdHSmVqd2UwZXozSENaQmZXRWRPMTVZejlSL2ROZk82UUNpQ1lyN1BBRm9IbkRoTDZabTdObHVYRzlINDdjZDhBWUIwU3FBSWlrWXNoQmFiRlIyNXg2eTcwNHl0azFDUUNBNm5QZks4OStRN05jWXVQdyt0c3Urc1Q3dnpqcG1KSlhsaExBRm1NdHhRaDk2Ym51Q0RQVHhwSDNnUlJsWTQ1VUZFRGl3QmlHUHB5U0NJTVhGZTUzc2RrZSs5dnl0c2N1SkRDZ3lGSForOXcySTFCVWRiTUtHcmhrN2t2WkE5VXBxT0VaQTFSOTlzbisyVzlzbHN0cUhOeHcrMFUzL1ViS0FadFJTZ0JieWRGamgwclZvdUhtNWh2SG54NjJyN0xMcU9vQ3NCcUtIOWgvNzFnakhFQWtZSFhOWG5kNTZQbWZocUhZRWdveDZudC80dTV4UkhYbnNmMktCdEFJV21FRnd3NHpKUW9PczkwSVpaUmFlc3V5K2R1eGJRa0krdXlUL2JQUGFkYkxTZzV2dk9QU2ovMzY1eWNkVlBKU0tRRnNKWkcwd2RpTjRwZEhXRmwxdVZFMm1TNUhmYzAreGV2a3Z6N3liMWtRREpuTUQ3OUZPY3ROOEFwQWlPdDhqM0xraWN0TUJCQ1VHSW43aW9hTUZSWWZZM01YY1o5TkxjdkhhMVVZL0pPc0Z3Ujk5cnU5dlc5c2NjZWcwUnR2di9SanY1Rnl3T2FTRXNCV0lnaVZsWHcrcmd5OS9Hc00xdjJJaWdFYURzdXhoamNRU2ExQVFQSkRsLzhiUzUxRjc0eEZoUGV2MCs3ZndhS3VLa29Obkd0ZUtXTVdyTEdGNUEzVW5vcTNTeWZxZExFL1ZnancvSk85dlc5b2NjZWcwOSs4NjlLUC9tcktBWnRJU2dCYnhxMlBYKzRqRXpyaUlFTVBXbGxoSkRTNTZpclIrODU5Y0p3QnZnQ3B0aEpoSVpaRHovOFVocXFaWUt1MWIxQzQ4OWdWYUZVQldBVVFDVlhaUUY5b1JnMUpYYkl2cGVwekd2YzNEQUk4LzczZW50ZTN0REtBOHB0M1hQelJYNzluMGtFbHA2UUVzR1ZZc05GR0RocTZjY2laQ2tSUWdNZzFHSWM4d3A3aFZidnoyQldpWXF4cnpHWW5SbG1saUZGUWpOSnFHbFFjUFhySTcvQnFOUlFjZzdjeG8wSWxVdUE0czh0R3oxcHhyek5vN0piRy9RbEFnT05QOVhhL3JnVjlOSDdtUDN6MHFtTDU5WWNQSDU1MFhFbmFDYnhGSE5iRDFVeTdnWTI1c3pENG9SdXI1VWFxVEZnVjlKcnp2ekRXQ0FmVW90UzFCaTE3dytZYlk2bXpXUHRZaThwVmJ4MWgvdWZvWTRjKzg5VXIvdUNydjFEdThkbFNGdHZSSUFKUVIxYXlPYVFHazVXVmszVnZ4WHZQd3JwMW0rOXZBd2h3NHVtZU5wU3pUckg4ZXQ4OG1STEFacEFTd05Zdzk1MW5ubnZ6ajNqV2ZpY01QNGhaUjZKQ2lCczI4QkdSRmxURzd2RHRQN09DQ3JkRFZVV0dlc2p0ajF4K3h5T1gzdkhJWlgycE0zVVJHUXBaM2xmN3FObXNvWWJtZWI1NHZDcTdJZmdYZXU2bmNYOFRRSUNUei9TMElVdm5mRFhyNy9MTmJ4MCt2SC9TUVUyN05BVzBOV1JsZmM1RFgrOXI1WVNHSE02TXhYNDNHQUJGK09EK0RWcDVRMk1jWVd1WG5IaHEyT2w4NTZpdTJhRGwxeno3OThoOUI0eTFnS1NxZ0VRWVJkMVNyUEkyR0l2WVp3MjZlTHhPa3p5YkdRS2NmS2EvOCt6bXdqbVA3UHh1UExGRGZ2Mm10NEl5RFBvdUVhSWlDbXJrcUtwSWhvd2hxOENLd2dpS3BFZ1dDVVJCaFNVQ0FMQkRjWmFFTVRLWGhuTm9ObUIycmlvc0FOejkzckdVRkc4YktRRnNBVWVQSGlxZlhzR0cyYnVyZWZ5WllTZldzOXlJYjNndDE3dXU4bFhkOWRnaFVGSTJzYTZHZkFnWkxIdVJwQUNRRDd6anBSMktEaC9iUHlQb3lEVFFNaWlIbUJXRm9nbktyUjFPZ25ERi9hNE1ka1NuY1g5TFFJQ0ZaL3M3OWpaT3ZFNnJDc1JFR3dnQUlpbUNzckY1WkNDcVl3VGx6T1lBZ0dBRUl3RkV0QUFRVmRxMjZOV2RVODlvQXNZbUN6Um11NHU5UFBTWHp5NTJQRnRZQUpqdnJYencxdk1VVkZSVlZVUWtpbEdEUWprMVBuN0RSa3lLYm5JcEFXd0J2c21OazZiemV1R2hHNnNoQWlDdzFBUkdWcld5dWdvS2lzb0NGS3RoQzBDejNGQ2M5ZEl6VUp6K3padnVPVWhXcmFWSWVnTEsxN05DUmdhcEJwblpSYjZNV0hIbjVBdFQrbW5jMzJvUVlQbjUwalZzYzg0aHpBMytBZ2xQbmNHbURWQ0Fwc3JnSzBWVUFaVUgzUUV4czA0VUVMQ2R6UU9vS2lvSXpoS29pTzV1ellQdW1DSGtmZDBWUUpFb0NpQ0lDS29LQkNnRXdmc1pNODhRci82UEIyNzVEL2RQOE05aE0wZ0pZQXZRbkhxdHdGQ0hjdGlkU2pZem9XOUVsQTFlLy9ieHQvNEhBQUJDdzhCVlhDQWV0azJGeTRoWk05M0pVQjY1N3hBWUJsUlY5bFZRSnkyYjVaS3g5VHQyWi8xdWNMVmRPdTVUQmVmMkVLcTQ4dktGb2pPK2NkQURLSjcrdWhkL1BjS3AzeC84YS9CTEhId0ZJUUlnMml4cjdTTGZyZU1KK3NlZmZBWVZkTHA3ZmFjRXNOa2RlZUxxNEZlc3RZMVpPUG5zc0R1NW5LUElwdWVzalJ2WFdBM0o1T2phdS9qNXA0YWFwMEpFVVRYV3NaWVdFQTNFMmtEbURacWlSYllac3daS0w3S0hoZWRLU0pNODI4d3JicncrdzEreGZ2K2hyKzFsdy9ycDM2aTZXTFFkemRjUFhQek5mL240Ry84V25od2kxbTByVlFGdGRsZ3ZoMncyK2pqOHdZcEVHSUlJY3hGRHRCdVU0Ly9naVhjaktoRFZROWYvV0lkMTEvaFlrdlVJYkRObkNtbnUwR0tPS2ZlK2pNc25xcnFNSEVVMWpmN0pLUFNsUC9TRkg2QmE5d0ptamYvall6LzNJOStGS1M5R1RYY0FteDJCYXVmSmlzVFV3OWIvMkl5QUc2S0JXRDd5amcycWdtQkdZK29RVkliZXpxc0tqb3JjTm52bDBzeGU3OHRLaGJ0THB3NVVUQ04rTWlZcVduWjhxNEUvOHZkUGR0cjdBSjZaZEVRVGsrNEFOclhEZWpqTVpIbmUyblYyYy9pREZhMGpCVWF6b1grNXBCZzg5ZXJsNFUrcGpFRXFYaTdsT1hEMTR2TXY3TmdTVGRmN3liZ04zbU5QNzN2TENrMzFSWEJLQUp2YXpQZWVlZTRuZjFRVXl1RWI2eHYwRmF1Z3FuN2czSTA3VmhlVkNxTDVzL0xoRXhVQXFLaXZPTlNzYWNkV3NwRlUwZEdUOWZJeTdKbDBLSk9VRXNDbVZwVCs5Vi83NjVxOXI0WTltTkJsWktITk1XN2tSZlNSSjY0V3loUXRqSDd4bmk3Mms0bGdNTzJGTnpCUDlSZzQxUzkrODJ1ZFhHbENNWGVXaVdIWXkycGpTU0JhYTFRMjdqeHppdjNLTkVWZytENUZTVEpaeWlhYnF4b3Yyb0F5aGFaNi9tdVQrOHpqQjBXVkZXWG9NM0lIOHorb0pBQWYzSUN6ZisrOVFLeFJJdUdhWWhrZzAzcmpzazZTcko2Q3NEYXN6WFRwOE9IcHJRVktDV0R6WWlXRHBXY2pROC8vV0VmQWpWcnFVSnZ4Qlhia3ZnUEdHVVJpSUZNRkxneXFSeXFDTHNVeUpZQmtDMUJRWVMwYzdUMzVqZWRoRDhEeFNVYzBHU2tCYkdZVWhFeXpxanNqMVA5NDcwODgxMmkyMXIvNy94MFBIVlFGUlJBQkRpRnJHZ1NxbXczWDVDeUhzdHNKYWZSUHRnb2RkQTNrYjhLYmQwS2RFa0N5NmFoYVEraHk2UTEzQWpBU2NoUUduSit2RnhmemRZbmg2TkZEMVZ4VXE3R2hLb0lTVlpFTU1EV3pIU2hSWXhuS252UTdHM0hhVEpLc0kxV05JaTNZdTJ6N0FQOHc2WEFtSXlXQVRlb1BINzRrcUxJWUtZZHRBR2N0Y20wVjJGbzl2TFl1dUhjZTJ3KzJBRFI5SDVzbjdQSTV0Vk1RdEI1d2JpLzZVclNLS3lja3RXTkx0akFGZExZM1c1dmdKaDNLeEtRRXNFa0pXU2VoQjRqMXNBY0FXMGZNVnIyQjFiYi9QSHJzRUJzV2dvQmVmUmVLSFZyQThqN3Z5MnIyZGExK0oxRE5pODlwNnJtZmJBTUl3RUlBb0c1NlM5ZFNBdGlzRUtNckdxM1FYUmgyWWgwUlZhTzFHT05vSzhCM0hyc0NyQUJpcWFFUkhWdVBKaGQwYUVQZU5OcUxGczNKWi9xUWF2YVRiVVFCVUcyT0plRDBWc09uQkxBWkhkYkQvVy85VTdQYk00aERYbXdQenY4aTQxVDErZ05uN3Y5OFdBL1BmZWQ3cnF5Yko1ZEVsU0pCZzBYc2l2ckdEQmdOb1I5REtZT2pmZE80bjJ4RENzTFN5T3hUKzVhbnRpOTBTZ0NiVWZzZnYvdk1tMy80aHg3N0ZnL2RWOGRZTXRxb1lzL3dhMTMrSHo2MnYwMVpSb2ErOGUwVFAvRmo1eno4TmJRT2hJS1YyWG5qK3pGV3ZMS1FKdmVUN1U5QlZaUXNmZUhLYjc3cHdSLzZaL2puU1VjMEFTa0JiRWF1WCs2Ny81Rll6RUFZZGdIQVdJeUJzNTdqVjVyUS9QUzlGMGhtZ0toUCtuenM3Nk8yNi9iZThPalgrekh1Mlp1WHZRQzFMRHdqcDY3MTA3aWZUQU1GRlJEZ2QvN08vdVUzUC9uUGt3NW5JbElDMkl4YXh4ZkJHc3pxTU56RzJzR3BSNG9NTFRTOTc5OEIzSFgvbFdKVUVTS3dyV3Vlc1UybDE5c1pzTnljdDJVbk9yQ0RRMmJTSkU4eWhRWkhCZStCNTJlL05mdjFTUWN6RVNrQmJFYkdPQVJzek5HUVI0Q1JvYklicldrcU11NTcrdGFIOTZObUpDMUdOQUU0RndWVE54dFpRNndEN2t1b1pTR04rMGtDb05ZQVFHNDI3dUM4VFNVbGdFM244TEg5TlVEVHVMb2FkZ2VBc1doeHh2ZHJNRUQ5M2RJOFlSZGVEd1Vob1NkdTc4SVlwQzVqdnlNcTZheVZKRGtGQVpRdE5Gc29VMW9KbWhMQXBqT0h6V2VsODBPMFY4T3c0elFSQXFNWU5rQVFjK3FmNDdONjUxbW02a1dvZVBHNFFGclVUWktYVVFBQzZ5d2hqckYzMW1ZMnZRV3dtNVlqT3Nmc2lTaHg2QlhnR0FTQldvMGRiT0w4NjQxdEJuSjY4cGwrYjhYN2ROWktrcndhVlJGdEZNNDBpME5IRDAwNm1nbElkd0NiVHN2a0NBR3k0SWZ1clJhRGlGa3VjdXNFMDQ2dEpCbVNLZ2hyWm5WbGZvODczcHQwT0JPUTdnQTJIU1FFbDdWbU01RVJSbkZoTFh0aGNOT1FSdjhrR1paQ1ZHNTk2N2p3c0V0dTIwbEtBSnNPb2lIQk1QUVdzTlBTdUo4a28xSlZhN0EzVzV0K1o5S3hURUJLQUp2TGtRZXVrS2lneEp5Rzh5VFpDRUsyNEo3YWFmekVwVFdBVGVHemoxOHVDZ29ZSXZyYTU0MEcrMUVtZ0pJa1dUVnhTTE9PcG5FclFFb0FFM1AwNktGNnBoS25zYUUxWTI0MEtoaUxpcmFHSmU2bjA3V1NaUHdVVk1BVmhKcE5PcFFKbU1vT2VCTjEwejBIc3d5dHBWeGNmc0oyWHJlRWxLbm1xdERheVJ5MTZrYy85Q0hBU2JJdWloeS8vczFxWVpHdG5iSXhBY0U2MDh5QnlvV2RDMzg3YmFmRHB6dUFEWEx6c1VPV0loR0FjTmtMV2E2WVkvK05ISDB4djlkV3ZWQ1hMK3pZU2tOL2ttd1lCUkZWMVowTGZ6dUZwOE9uQkRCZWQzM3RTbElDd01CUWVsdVkyanBMczdhV1hudG5GcnNCaFU4ODdTSFY4Q1RKcENndzh6Zmh6YnVMcWRzS2tCTEFXUHpCUSs5V1FnQVVWakZpMVRxTFFBcVdzeFp4TDFKRng1L3BZeHIzazJUU1ZCVXN6ZTlyZER0dGdPOU1PcHdObFJMQXVqbjZqVU9oREFESUFWakJzS29sQkFvQnpBNVBxdHJuVUhMVmk2ZmI4cVRCUDBrMkF3VlRydXl5MlZETmQ3ZVRsQURXNnVpeFE5NG9HS2o3bWpkZHVWaTZQUGRzK3JHYW5lZm9GZnF4Y3pLZHNaVWtteGN6R1ZjRHVFa0hzdEZTQWxpbHp6NXhHYWdCb0JBMHE3Rm5KUVBxcldnL3hyMW51ZEQxcUx6NG5BQ2tSZDBrMmR3VVZEUXZTR1hxYXErbnJPUnJ6WTQ4OUc2SGlJaUcxR1llTlJNdzNxdllmbXZPbGQzb0srWW9rQ2Iza3kxbGVzdEFBUURCV05Oc0lITVE2Tjl5elY5Tk9xQ05rKzRBenV6T1kvc1JNeklPVFI0VlBXc1RVY0g0dXJBek5abW9Ha1BGQzgvR05NbVRKRnVQZ3FxQ2lFQ2ZPOU8xSFN3bGdGZjFtY2NQQnJVSXBLd2FWa0J5a3h0Z2pERzQzU0Y2OVgwdUZ6bE43aWZKVnFlcWtkay9OME5GbUhRc0d5b2xnSmY2OUtOWEloRVNLWWlEZnFsRllRelQzcTd2N3BxTHNZd0F2UEJzbXR4UGttMUVnWndCZ0tqVGRUUllTZ0NuM1BYWUlVQkFSRkJRQ1dTSUtQUGVNUzlsZXh0bHQ3S3E2YXlWSk5tV0VFREErcjIxTGFlclFmSlVKNEREZW5qdWU4L21sVzh2ZEZRUlJKWFVrZ3RnMVhXeW5FUVpHRTg4MHdkSWt6eEpzbTBwQUVmSWdzWEdkSDNPcDIvRkgrRG9Odzc1TXFoaXI5Ris5aWYreFpzZS81dk1aaUttNXREY0VaU2g2a2RmczRpbVFUK1pFbE5kQlFTQWlDYWpJaWZUWDlpMThQWHBhUWszUlhjQXF2QTNULzdQeStYc2swdVN0MXgzc2Qvay9nOTk5ZThEYTJOWGtMS0NmbHc2THFwcDNFK1M2YUtnS2txZ3V4YSszbW52QTNobTBoRnRrS2xJQUxjOWRnaFZ2L0RONHdmLzE2L2M5ZGdWeGtCdkdielF6RzRwdTMwb2VlRnBUcFU4U1RLOUZGUWdjbng2MzF1S2NuSFMwV3ljYlo0QVB2UDRRWVdNbFNPWTU1YjIzUFg0djZsaXRXc3Y5anMxbGZ6OFV4NGdqZnRKa29DQ0RzYUM0N0FINEI4bkhjNEcyYzRKNEpZdlh4aUNjYzRibkZHRllsZmdJS1R5L1BmNmt3NHRTWkpOUmtFTmZmdDdNM3RuL0tSRDJUamJOZ0hjL01VTEl3dEFRSnh0N1BWeEpTNCtGMVBwZnBJa3J3Z0JoTTBiNWtJWnQrMm8rSExiODZWKzh0aEZ6QUtSYW9xTjJmcmswejROL1VtU3ZBWUZVQUd5TUROTkxVRzM1NjRIZzlZWVloZGJzOFhLeVRxTi9rbVNuSUdxc0RZTDA1YWw2U2tEM1lZSjRNNnZ2TWM0eWt3eE45K3NlbkhTNFNSSnNnV29ncW9TeU82RnYvdGU0MGNuSGM0RzJZWUpBQkFvdW54ZXlsNUlsLzVKa2d4SkJTVEVyKzA4cU55WWRDd2JaTHNsQUZYWU8vYzhHdkFWVDkvcERrbVNySjZxZ3NXekZzb2U3SjEwTEJ0a3V5V0FyMy8zeHkvK2x3L1hIS0tYMUxZdFNaTGhJWUNpQllCTXAyWHFlTHNsZ0lWdTg0NUhMOC9iSXBLV2ZwTWtHWTJJOWZPQythVGoyQ2piTFFIODA0bDlYRmVJbUViL0pFbEdvZ0RDMnJMa0d0UFNFVys3SlFCVm9NekZLS25CUTVJa0kxRlZGUzB5MitKcHFRVGRiZ2tBa0lSSkpkMEFKRWt5SWdVUkZRM3pDMy9UYWUrYmREUWJZVnNsZ0tOSEQxR05naXFTRHU1S2ttUjBDaXp5OUw2M0JEc1ZsYURiS2dINEpzOHVGU3hCMHdwd2tpU2pVMUExQ0FCOTJEUHBXRGJDdGtvQVlxVzNKN1IyWkduNFQ1SmtGUkJBRmYwek01RzMxZGo0YXJiVmk0d05FWXlRam5KTWttUlZWRUhFK2ptdk9oVTk0YlpWTjFCRlJHdEZRaHIvdDYvQjNaMmVQcjREVGkzM25QNDdSOFFYZmdFSWlEaVZCMThucTZTZ0lzMGlrK2xvSkxDOUVnQ2dNcUtrUTc2Mk1BVlZGVlZSRUIzVTVZRUNuUG9GSVJGYVJDSTBpSWFBQUFHQjRJVlJmdkFvQUJGbDFzZ2NSQmtCRVJHQUVCR0JDQW1SRU16cFhKRWtBd29xREVVT2RaWWRPbnJvN3ZmZVBlbUl4bXY3SkFCVitQTy9PL0hzNG01Tkt3QmJoNnFJOHFtZlFVU1owRGhUT050d1ZCaHlrWU5BelN5cURBU2twR2hKRVF5Z0VnS0tLaUtjU2dDS1NreEtpcUtxQ3FvZ0FBSUNpR1NNTTVnaFF1UTZjT201TDhLRFhFSm9Cbmxsd244Y3ljUXBxQ29nZDJiMitPNzJQeHBzK3lTQUJ4L2NmOG4rQjI5NzVCY2cxWUJ1WXFvaUdrVlpOS3FxTlhsdTI0NEtWb2xjcXpBQ0lScFNDRkw3NEkzR1NDVkNEb2lENlI5VVZRUVVCRlRWd2FvZElDb29LZ29xS3B6ZUJxaW5maHA4YmRXdHNsd1FyQmcwUlk2WnFoQWFaM0pXWDRXVkdHdENRK1JNU2diVFRDRUc2VDdiTGFpZWRDaGp0MzBTUUEvZ2QzN244Rm43LzRJb0RmK2JpeWlMUk5hb3l0YmtoWnQxcGdqUmkzZ0FBNHllUTFETTU1N2wzanpFREZRRkFRUVFoRkZJcldCOTNia1ByaVdHSS9jZEVHTkFtTWdLS2dvb2dBSEp0ZCtOYUVCeU01c2J0WlFyY3Q4dnhsZ2Jjb1l5UXJOT2Z3ekoxcUNnSmpQdDU3L0RNenNtSGN2WWJaOEU4RS9IejM3VE94LzBlYUVSMHhyQXhLa0thMkFKcXBMYlZpdmZKY0tzUWNHb2FQVGwvRUt4c2tPRFpRVVVCZXY2c1pxMXJjVnJmdnF2eGhIUE5lKzYvK1cvZWVleC9SNXlCNTdCRGU0cnF0QW5hNTFwT3lvTTVaNjdWVmd4bEZuSzBqM0JsRUFBRWVQMjduUlZtZ0xhT2hxN1QwWm9OQXJiNzRaSnh6SzlSSm5Gc3dSRHJwWHZGdVhnU3hUamZkLzBMVFlKaklDZ0RWUTE0dXhTOXQ2SkxySzk3d2Z2S2o3eHdNVklwQ0tJQ2tyUjEyaGNibWVKckVpdEtpa0hUQU5WRUVhbmhJMWkwckdNM2ZaSkFLd0dSVGltSmVBSkVPVW90VWpNYkt0VjdJbXhMeEZDVlZYTW1UVUFDcEhFQ2ZYcEE1ZDlmdExCdnFycno3L245Szl2dnU4aWZXRjVRV0t3cmhHNEI0cXBjR2o3VXhEUnByT3NQT2xReG03N3ZKdVBQSEJRQWJNWnJDc1dUa2xnSTZoS0ZNL2lNOXNzM0p5UGZXQUZ0RVNvd3N5cUNsSDFJeGZkTytsSVYrOFQ5MTlBWkVFaFFIOVFMRFRwaU1haXlQSHIzNndXRnRuYTdUTW1yQktDc2RSb3FDZTMzSjdmM3BXZzIramRqTVlBaUtadHdCdUJKVVNwQ0cwcjJ4WFpnMkwwUFVJaktLQWlRdGVkLzRWSng3ZytDQmpVSUZMbFY5cjVWUFNIbVhhRDhtR1c1ZG41b2x5Y2REVGp0VTBTZ0NyODJkK2NmSHA1ajVHWXh2L3hVZFVvRld0c3VMbmN0a0tNcGU5YnNnZ0NRS0I4M2ZsYitHTC9GYWtTZ2tmVGNMVDlaNFNUQVZWVmxQbkZmenpKYzVPT1pieTJTUUw0NWpmZmZObFBmZlhJVnk1VlRac0F4a0pWUEplSTBNeDJpd1FWcmF0SUdTQmdsSGpEZ2UwMjdyOElpUmhEYU16VW5CTTQ5UkJBZ2I3OXpNemVkam5wV01acm15U0E1L3ZOYjkxOVNQYjJNRFdDWG0raUhMZzBhTnZGN2hqckdHb2tVZ0d5SUI1dXVQaUxrdzV3dkJBSkNidlY4ZHpPVGpxV1pPT0kyRGUyNmxLMitTNlFiWklBL3ZINHZuNjdPOU9tdWt6RC83b1I1Y0I5UTFrNzJ4VTVTbDBqb2FLcXlIVUh0c2tVLzJzN2N0L0ZRS1FxTENIVi8wd1BWVkJGYXVETWRoOU90a2xkY3lnNGJ5RWlwZm1mZGFFcWRleUt4bmErMjJyQnNZc2dpb0NpMTUzM2hXMnp3SHRtQm9BbHkxdldUTVg1VU1rcENzcmF5R3hUbDdmMzRjRGI1QTdBV29NSUlwS0cvelZUenlVQXRQUGRJWVpRVm1oUjFTRDRhOC8vOHFSam13RE1zSXBkUzlta0EwazJ6cUFMcmFMc1dmanZuZlkrZ0djbUhkRzRiSk1FQUVnQXFDS3BCblF0SXRjc3ZsWHNqcjZXcWs5a2hVaWpYSGZoZlpNT2JRSnV1dWVnS0pCQTF4OXZaYnNtSFU2eW9WU0JRM3g2MzF1MDEwOEpZTE03ZlRKSUd2OVhCVVZqNERLM2JVT1pMeXRqU0JCSjRuVVhUT1BRUDRCV1FrMVprM0M3ekpRbXcxTlFNdkJrdlhjR0ZpWWR5eGh0aHdSdytQRGhhdkhiK1h5WHZuOUlWRElDenowQXlFeExmUVFpSUdTV0QxMzRwVW5ITlhsVXNMVU5HMU1CNk5SQkFFWFhYdmhPYk8rY2RDeGp0QjBTUVB2SC9zZkMxMy84clAxL2laSXl3RWhRSkFTcEdtNUhqRFgxKytJY0NIem93Z2NtSGRpbWdFYUJvZStYTEtVRU1IMFVRSjNiZlhibXEwbUhNa2JiNGQ3VzVQVytTLzlNd0ErT2dFcUdGTGpQR2pKcXhsQ2pxRmhMSVZ5ZlJuOEFBUGpvc1NzUUhScnErOFYwSk1BVVVnQmhiUkwrLyt6ZGE3QmxSM1VuK1A5YW1ibjNPZWZlV3c4OVFCZ3dHRCttemZUWWJzdGpHbU9oQWduMFFCS0dIbW5HdUdkaVppSm1GRDF1eE1QSUF0d3hVZjdTQmdPbEIyQ1BtSm53dDRsbzRXaUh3VWdxQ1NnWkpDRmsxTWEwd2RPRGViZ3hRbEtwM3ZlZXg5Nlo2ejhmVGhXU29DVFY0OTZ6SHlkL29RK0ZDTlZaNTk1emN1M01YTGx5TU9wekFWZ2ZaZ0NEOC9mWGgzZXM3QXl6OFZMYzQzeldoRXhWR2cvRDlsUlhreVJCNFFSdnYveStwZ05yRVk5VVNWanp4U1N2L3l3bGttWmNHYm52blg5QUNQYjBFRWdmWmdDU3lzSUQxTHo4Y3dvazJxeEs0OEtONG5SaUVDK3NUZDUrc3Z0U2xwbUNRNmtBemVzL1M0cWdVV0w2MUZYLzRXWDN2YnpwYUxaS0gyWUFvZ0lvTFMvL1BMODZqVVhVWThBSXFFcUs3N3A4WDlOQnRaR0RDZVRvOUxIQ2pacU9KV3NJRVMxZC9QdTdKci84NkhlYmptV0w5R0VHUUNwRm1EZUFueE5wVmR3bzNNaWxBSUFnb0cvUG8vL0ozSDd2VlFJbFVhZEp2Z1ZzaVZHOC9OeUxqcjM4RzcxdEE5NkhHUUFoVE1KOENPQlppYkd1MDNUZ1YyT01xcUttLzNxSkMveWZGeDBsaWc2S1VPY1cwRXN0VWFzZnJJMjI5ZmFXMlQ0ODNaQ0FncFliUVorVUpLdnFOUFU2U2pHSmlKRjU5SDgrd29LMG1GdEFMelVpSmRnNUpnaE5oN0pWT3A4QWJ2L0toUktxbEhJYjZKT1NhTlBFeXNrZzFtb1VrRGZrL2Q3bkkwNUpQVHA5M0dsdnYvblo4eUxCeEZIcDNhaW5OVUE5U0FDY3J1cmdTQ2lSRHdIOHVKZ21oQ2tIWmhTMVpKcXJmWjdYSng3NERWVWZmRUdhOU9qUzdPeDBFVFNEODhJaVhIdkh0VTJIc3lXNnZ3ZEFiMGRlTkRwSEp1dTlYYWM3TXpGTlJaMllVSkxDdmVNTmVkbm5sQWhCdFNERDRQSUd3SElqU0NMR0l6dlA2ZXZsd0oyZkFTQU8xVEhGM0FmMEdlbzBWWFV1cVFBQ2ZVZCs4RDhOZEpUMTJaTXVud0RJaUdocDU2RnZ1MVExSGNxVzZId0NFQUZFeVR6K1A2Vk9VMVZGVWhNcTVZWkxjM2VIVS9VbiszYUpKVVBhbUQzcHRQdno0K3hzVVlNSFVHemtCTkJLaElCQ3l4bmd1SmltVGoxU29CQ1UzODdQL3Fjak1iaTBMZ2dxK1FhWURBQU1Eb2QybXZXekhLRHpDUUR6dG4xNS9BY0FpV2tHRVNTQkdPanlsdS9wTXRHS0kwQzh5d2tnbTE4THd6aUtpbjUrSHJxZEFIYnYzajA3dEFJWWN3MFFKTnFVU0JvOVlVTGM4SWJjMFArMG1ZVGtkR1AyWkc0QmxBRUFZY2JoTUdqUnorR2wyd2xnNTB1K2QraHYva2xrVFZ2eThWK1NWY1lvQ0taSmNybm5HZm5qQjk0aXpqdm9wRHFza2pjQU1oQ2tFWXlwOUwyc0JPMTJBcERWOFN0ZS9lQndWWmQ3OUlleFRsWUppbWdKSW0rL0xJLytaeVJGVXdsaEVOd3dONWJLZ0hrR0FHQ0hWN2R2N045b09wck4xKzBFTUR6dndMRkNuTHBsL3JxU0Z0UE1hekdaVm1aNHg2V2ZienFpcmhKQ3FwbFo4dHJQQmQvc1RKREowdjV2N1BkbER5ZUYzVTRBU1NVWWJhbmJRTEJPVSsrR3FhcExyekdtcHVQcE1DRkYzZEhKRDF4T0FOblRtSFBudi9KOFRIdDROMlMzRTRDSTBDbVgrQjZ3T3MwS1A0cDFEZWVVZk45Vjl6Y2RVVmQ5N0hOWFFsUUVkWnJtRnREWjAxbHllT3l4WWRIRGdhYmJIM1NLUWh5WHRBaFVvbFVpRW1PdDZraTg4NG92TmgxU2g2bXdqdEZyR1RSM2dNaWVRb0tHQWF5b1prM0hzdms2bkFCSXZHajdRVE5aemhKUVl6UkdtcG9SNExzdXU2L3BpTHBOSUVGWnAxbHVBWjA5QTBIanNDd092UFNJOUc2YzZYQUN1TysrWGRmODBrT0EwWmJ4TXJDWVpsN0tPRFVhM3ZHR3ZQRjdWa2k4OUp6RGdCNmRQcFpiUUdkUFI1Q2tTcnJybXEvMTczTGdEaWVBd3dpLy8vdTdFK1B5elFDa1R0TkJXTFU2K1NBV2wrdk5iNFZIdnZlemIvckZCNHRpU0RLM2dNNmVnYUFoSmJ2NDkzZU45dmZ0Z3VnT0o0QnZQL0dpN1JkL2RXMUh1V1NqUDh4cUVWUjFuVmdLOEo2cjcyczZvczQ3UEY3N1B4KzhVbDJSVzBCbkowTWdBWGpGdDNjMkhja202M0FDR0o1L2FHVFJsbTc5aDlFcVpUaDBhR2RWKzNma1c5MDN3N2YzLzRUUUhScy9zZFFkSUpicWEzU2FxUDduWG5SczRQcFdDTlRoQk9BRjZvUkxkZ2lnVHJOaHNTMVpXbGs1TnAwT213Nm5EejYrYnhkSkdqYXFBN3FzTGFCNXZMTjYwM0cwbGFBNGNxUWM5ZTd4b01NSlFGU2h5bVdhQUJpVGlNUjZwblFoekhaZjk4bW1JK29Eb1k5cHcybHd5OXdDbWhETjQvL0prYkRFd2NpTDlLMUFvTU1KQUNLQWNwa21BREhOSElyNldHUzBkNzR4TC81c0ZsRU9DZkZMWGdDNlBGK2swM1c4RWpTVW9jc0Q1c2wwOWYyUXVHRDdmZ2hwV0pJYWZacGxhZ0FBSUFCSlJFRlVvR2hWY0FNbXVvR3pxbTlya1kxeUZGdWZQcEU3UUdRblJkS01EdEY2ZHp0OFZ4UEFJNCsrNktwZmVDQXlMY2tFZ0tBeGtxU1lPSDNYVys1ck9xS2V1TzBMVjBDZHdFM3JZeXF1NlhDeXRpS1k3TWpxanA3MUJPMXFBamk0c2YwVGoxeW91aXlIQUdLYURjUDJWQ1dTYjMvanZVMkgweC9PR05XQ243ZUF6ckpuUXpyWi80MzlmcFlUUUF0ODU4a1gydXpjd2Nndnd3eUFOTXczQUx4bjZ2LzdYU1FCaW1Ra2w3b0FORHNGa2U1OFBDR1RTZE9CYkthdUpnQ0paVWhNeVpaaDV5cmFiRmlzV1pVQWUrY1ZlZTkzTXlraGtLUFQzQUk2ZTA2RUpRbmJkNnoyNnptaHExWFBRaVhBSlJqL1NSUFIybW9Kbm5Wc09weGUrZmkreXdBbEVLMGFTSzZCeko0VlR4UUNrVjBkTTArcXF6TUFVb0dsYUFSZDI3VDBhM1ZsQnR4d2VXNzZ0cG5Fa0pEVWhid0JrRDAzZ2pRVVFmZjNxeWRvWnhNQTFFeDdQLzZURkdoaTdaMVlYdjNmQWk1S1lwMDNBTExuTVc4S2F2RXZydjZiUHZVRTdXNENJSlZrenc4QlJKc093N1pVelFCN1Z5NysyVlFrWHJ6emtEa2Vtenp1bHJVRFJIWWFpSlRTeGIrLzYrVTlxZ1R0NU9mK3RqdXZJQWl3MzhlQTU5T2J5aWJxdktYZXJ2NlQrUEkzZitiSmpaWC9iLytMUloyb2syUWlJc2wrNW9JZjdCd2VmdFhQL3YxV3JNOS81VHMvZmMwL2UvZ1RmM2tWa0p2Z1pLZUM0dHd1M1BmMy8rOC9CZlkzSGN6bTZHUUNjQTcxbUN2bmFUM3I4eHBRc21vUXRsV3pNVlZ1Nkg3amg5MzdkbzNxNENBbGRUNmdpNmlvZnZxdkQxNzl6eDc4NkYxWEpCZTlLM3lTMnF1YnpIUzQrczN2bi8vMks3N3lxYSsrK284K2Z3N25HejZFQ0FEVk1CV05NbGkvL2xjZU9iTjREbzFYYjk5M1dTZ0d1UVYwZG9vSTkvWEJwZWZJRDVvT1pOTjBNZ0dJUStuaG5OUTlIdjRCczVpc2RpNmtWRGNkeXhuNmszMjc2cVJHaWRTWTVIQ296aHVQcERRYUZJQkFJSThlUGU4VDkvM0dZTlVOQlNJcWdVTUMyNEloSlZkKzRpK3ZNVkJnSmdSRnhZeXFDdFJEMmY0RFRzNzU0MzFYR01rRUl4RGxoaXZ2T3NYWXZyWC9Bb2lNcThQTDNnSW9PelVrTE9uS2FqMU5Md1MrM25RNG02T1RDY0FGaGNCU254Ly9qU240SVV6TmVNTWJPMWI4Yzl1ZFY0aVlPbFJrNGFweEhRQjRreGY3Ylc1SFNXSlNIMTZ2RHFXcVV2RWlLaUlDaFJ5ZkdPREU4aGRJZ3FUTk8yRUFLUDNLc05oWitoVUFjZndTV0cyQUF5dEhURFdVK0Q4K2R4a2tnUkNOMTcvdXZtZUw4T1A3ZHMxbkUrUFpnZFh5QlF2NG1XU2RSOUE0Q0Q3NTFIUW9tNmFUQ1VCVW9TQ3R2K00vb3MyR1ljZGtXcnRPOWFmWjgrblhxd00wMGp5WklGTHBXamtLeDZaUFRPdWprOW5BMVVIRnE3aFJPRWVLMDE1NU4xb2R4N1A2bUZsTWpNa3FRRllINTY0V08xT29VejBWSVpNWE4wMFdicm43VWhxTitKMDNmZTdIL2lLbFZnNmpwVzRCbloyT2VSMlFhRElOMTk1eDdTZDcwWXk5a3drQUlrSWxVMTluQU1lclAxUGxnOFNPTFAvY2ZQZEZUcFJncWtSOUtnYUJFZzZOdis4MEJEZjBPdGcyV0RuN1YxRlJTT0VBUEpVWG1Td2RHVCtXcks1dDRsMjVZL2hpTWxpYUNaaUlFUFRXdlpmODlBc2ZQM2RsNDUvL3pIZm1zd3hTSkhvcGZWNy95VTRWNThmQjB0SHQ1L2VtSlZ3M0U0QUIwdWREWU1aNkVMWk5xMHJxNmwxWGRtRDk1N2E3TG9aSVlpcWNjeXQrRWc5UHBrY0dZZHZhNElWYi8rTGkxTS9yT0lmWVR0cDRkaWphckVyalFkZzJHcXlscW83QU54OTd3WnN1Ky95Ly82dGZ2dld1blVLQXppamo2cURYdkFPY25UTENZdHIvamYwdjJYYWs2VkEyUi9jU0FJbFAvYzBUangwNVgvcmJDRFJaVFVZN2RGUUdiWDgrdmZuUGRzSFRDRFdXNVhDalBpam1oMkc3aUd2a2hoRVI5YTcwcmh5RWJjWTByWS9PMG9aVHZ6cDR3Y2MvZTJsTVVGS0NoNGdvcHRYNnBzeExzcVZCT3QyRisvNSsvZWViam1SemRPOGcySmUvK1RQWC9PSkROU3RhUDhkLzBsUTlLV0g3Q3FlenBzTjVMaC81aTllZ01FU2gwQUxXcTRQRDRweGhzVU5FMjNDL2xJb3IvTXJhNEFYRHNITVdqMjJrQTFIWC9iQUVCRUx2UXVsWG00NHg2NWhFLy9YaW9tSFIvTWQ3VTNRdkFSeWVybnowcml0V3RvVmVqdjRBRXVNZ2JJOHA2akM5Kzdvdk5SM09zN3Ixcm91Y1YyUFNOY3prcUlwYkxjOFRTQnVHL2g4aElzRU5WOHNYRHZ6YUxCNGRwLzJHR1lUemFxSXNPMFVraEZxdVlUbzh2K2xZTmtmM2xvQysvY1FGNVVxTjFNd0t3d0tZMVRGTnl4MEg0clM5SGNwdXZlc2lxSWd4REl0SmZXU3R2R0RlTUxIcHVKNGJSYlR3SzRWZk1hYVlaazJ0VTJWZFJkQTRHbWlLUGJtVHRYc3pBT2ZCNUsyblhTQklpcWlaeGZVMVAyanAxUk8zN0wwWXFqQ2k4RldjckpVdjdOd3dxdUphc2s2VmRRaEJHcDBsOXVWeTRPNGxBRkNkMTE2Ty9nQ01zZlJyTUZvVnpyakp3WmJhYy9jdUFnU2s4REZOUnNVT29pZFBRMW4yUEFnQ05lM1kycm1EeWFHbW85a0UzVXNBSXNvb3ROYXZONXdSWTNUaU5Mblc5aHdYQVNsd01xMlBEY09PZnY0YXN1elprQ0IySHZwMmNxSHBVRFpCOXhLQUVYU0NucGFBa2xaYkpZVUsyL2lyK2Robkw0R1ljeGpYQjFiTDgvTG9ueTBqY1lkMnZzSk5wazNIc1FuYU9NbzhoenZ1dU5iWFltYnpxd0NhRG1lVGtlYTBnTURBMzc1OGI5UGgvS2c5ZDE5bTFLQ2g1bVJiZVVFZS9iTmxGUWFQUG1xOXVCdXlZd2xnTW9yYkRnK3BxWmVId0l5cDlDc3B3dGpHVlhWRmlrbEZIQ2dpbldwUmxHV2JoQVFUdlE5bFZUVWR5eWJvV0FLSVBoMDZmN3F5VnZSdjlBZGdqQ0thR0sxOTQvL3RuNzdhd3dWVTYvWCtRYkd0ZjlPdkxEc2xwQkhEb043MTRSS2hqaVdBZXBBU1lvcld5d0dJdEpobWhmTXRyS3VwdFFwMTRZcFNKVWkrUHl0YlZpUm9wS1JCUExSN2Q5UFJuTFdPTFdOUjRKMG5yWDh6QUpJNlgxY1J2T3NObjIwNm5COUY0VGhzT0dEZzE1cU9KY3NhUlJqdG5BTi8wM1FjbTZCak13Q0JKR012RzRFU0tmZ2hvV1RybnE5MzMvSEttbE1QdHo3YnIvbis5R3paMFNrQUhObjJrcVlqT1ZzZFN3QUVRT25qK0EramVSMjA4M2hENlZlUGJqenBuUlk2YWpxV0xHdGViZTdycjd4Mnc1L1hkQ0JucTJzSmdJVE9TMEJiT0U2ZUZkSWdZQ3RiWERoMTI0WVhhQkdjNXZ1enNneG1PdnJIUjZlRHpyZUU2MUlDdVAwckYwcVltYVgramY0QXlKUlM3VjBiZnlQZUZVNk1nTXZyUDluU20rOERsOE5RMXAydkJHM2pjUE5zT0MyMVBCUks5dklRQUk5MzArUU5sOXpWZEN3L2hpbGF2VkU5cVpJVFFMYnNTTkpRQlBXK2RkdDFwNnRUQ2NDY0hkbGVGTDZOcXlSblozNEdXRVRRMGdwTEF6R0xHeUx0REMvTEZvZ2dhU25WM25lOUoyaVhFb0RFQXFvcHRYS2Y5T3dRNXJWbzc2OUQ0SnlCYUd0K3lyTEZJcUxGSTJzN3YvN0tyemNkeWxscDY0aHpVcUpPam5kazdSbVNUa015YStrQkI0SGwzZzlaOWhTSzgzOTY3U2ZQZTdMYjM0dHVKUUFoWEU4UEFWREZHMU03dXdBQlFsSkVldmlqejdJelFyci81Uk1YK25iZjJ2Mjh1cFFBREpMUXowTUFvS2w0ZzFscTQ1c2oxSWtNd2hwYm1wK3liS0ZJcElScXR2clQzM2xCMDdHY2xTNGxnUGtKNEY3V0FCRTBSczYwZlUyQUFFQmgwZnpRYnplTFRjZVNaUzFBMERnY2VKVnVYd3ZUbVFTdzU4Rlh3eHZOYVAwYi8wRXlwc3BSa0ZxNnkxcTRpZEZxNjhNbEdGbDJsdVpQb2tIaE96T0NubHhud3RkNk1ITWJvNTQyZ2daSUppMm9yU3l6Y1JxcFpaeE5xcmpSZEN4WjFnSUVpV2l4Y3E3VGxhRGRTUUJVUDlraGtINDJnZ1lFRkxVYnJtemZLVERnaGl1L2JFUmx0bTN3d21pZFAvMllaWnVBc0pRT2Q3d1N0RE1Kd0Z0UkNLMmR6ZEkyUWR0M1Z4UHAxVm0wY1hXdzZWaXlyQTBJcDM5NjdTZDNQTnJoQmxtZFNRQWlBdFZXdGtyYkJBSnArUzByNzdueWl5QlNGVmZMODZzNHppZkNzaXpTL2VZSGZsMm5rNllET1hPZFNRQ0VHTFdQVjhHRG9JZ0swUEpSbGNsY3RGaFZ0VTNJMUhRNFdkWWtFb3lpUS83MHR6dGNDZHFaQkFBUVF2U3dCUFFFRmJTNzA4NjdydnFDVHVQb0h6WThWamFxQXkxUFYxbTJ0UWlTSzZQQ2QzZ0ZxRHNKZ0REQTJNc3BBQUNnaFJlQi9iaHdwTjQ0SjB5bTAySFl1VDU3b3VYTFZsbTJkVTZjU1lyRGVLUzdsd04zSXdIY2Z1K2xUczFZOS9FUVdKZGNmLzBqazRKRkNOVmtOaHFjdDE0OUtSMzVDR1haSnVQOFBIQTY3K0RYbWc3bHpIWGoyNXVFVXRsb3RhK0hBQUJBcFF0VEFPRDMzdnhsTWFqMzAvRjBwVHgzdmRxZjV3SFprdXIrZ2tRM0VnQ0FXZzNzNXlFQU9UNmQ3TXg3ZTg5Vjl5Y3o3M1E2R2E4VTU2elBjZzdJbGhUVi8yREhMeDBvZjdMcFFNNVFSeEtBcXNMMWQvMUhTTE5PRGFFM1h2a0ZzeVRpam0xTXk3RGo2T3l4cGlQS3NnWUl3ekZiUFR4NldkT0JuS0Z1SkFDQmM3NkhGNEU5blZqSHBqZS9jOFVYcTJoT09EMnk0Ykd5TVR0Z2pMazBLRnNlSk14WWxNNTN0aVZRUitJV3RkVFBRd0FudExzQzlGbTg5Nm92Mkt4RzBEb0tZNWpGalNwdTVPV2diRmtRSklabENEa0JiQ2tDMEY3MmdUNU9BS2lvNmUyZnZycnBXRTdQVFc5OXlFUlhZL2xUNDVmRUNsNkw5ZXJKUEEvSWxnRkpHSVhwOFo4NEpOMGNtanFRQU82NDQ5b2k2b2t6WU4zOE1UOC9FVGlkdUJSYTNoUG9KTjUzMWYwdnJNNDVGSTZzY0xReDNnZ1lyYzhlTjR0NUtwRDFIZ21tK2xOWGZiWHBRTTVRQnhMQVpIVzI3ZERRZWZSNUJpRGlOZFNqUk8za083enV1azllLzVaN05qQld4YlFlZTQ0aVo1UDZhSjRLWkgxSGlnQjQ4ZmRlMG5Ra1o2SURDU0NwSGJyZ2FEbHdmUjM5QVFoRTFac3krYVpET1F2dnZmcWh4UGpLbnpqeTdzc2ZpQldERHRablR4aFRUZ05aajlXbS84MG5yMzNaMzUvYmRDQm5vZ1Bqeld5WUVEVlpqOWQvQU5Ga05lQ2tvMHVKSjd6dnFxK1FlUENiTC8zSmM0OTk5MG1vREdkeFhjVU4vRnAzempsazJlbWdHL3pnK3o5MTVQd0htZzdrREhSZ0JnQXFndlo0L1FlQVFCSnJyNkxTaGQvSWN4TEJhMzd1ZTk5OWNxMllwRzNmbTZaS25CUkhwNC9scVVEV1AvTnJ5a01JUlRWck9wWXowWVhoUmxXU1E0ZE95cDQrRVUxV2lUanRaRG5vU2R6MHBnZEdCK3JwbWlzcVRNZmpRbGJyTkpuV1IvUE9jTlluSkdrc1BMenI1QWU3QXdsQUNQUjgvSWRBWTZvRTNTc0JlZzdYWC8vSU85NzJjT1d0bkdIbEh5WTJvOVA1VkNBWENHVjljYnc0TVpYVm9TNzJCTzFBQWdDb1pKOVBBUUFpUWliUW1PeTJPNjlvT3B6TmROTTFYeDRlakxNMTUyWTJQVHJXTklwV2phdERUY2VWWlp1RWlOSE9QZmdmbTQ3alRMUTlBZHgyNXhXa1JZdTlIdjhCekMrOWRIR2E2UHYyZEh6OTlZL2M4TGFIWjJMaUZHQTFyUjBHNjdQOTBhbzhGY2k2aitMMDBSMi8rRVRadlVyUXRpY0FwNmtlc3h4Sm54ZUFBQUFxenFuandFbGZ0Z0YreEh2Zit2Qk5iMzZJb01MVjQ5cmJpa0RYcXdOTng1VmxaOHZvRHRubzhMQjdQVUhibmdERXNReTFpdmI4OFI4UXVDcE52VUE3VUpwNzVtNjY2aUhXRkNlQVZGVWRaTFJSUFZtbmFaNEtaRjFGZ0c3RnEzZHRIMDUvWE5zamRnNEl0SDRmQWdBQXFHaWR4aUttZlgrbnYvdVdCMis4NWdFS1lJenJ0ZFNsRTc4KzI5OTBYRmwySmtqUVdBN0tNcmltWXpsdGJVOEFVQldFK1I1d3Y0bW9XUlFBa052dTdkVSs4RW05NTRvdmNKYmdvTkRwWkJKa1pYMjJQNlpabmdwazNUSy9ITmlwZFhBQzBQNEVBS1gwdXhIMFUwU2NkNE1ZRGJvVWcrQ05iMzN3eGpjL2FEQ0lUbXZ6TnRJOEZjZzZaMzQ1Y0l4aGVyQnpsYUJ0VHdBR29RRzlQZ1R3UXlxK1RoUHhycWZid0NkMzQxVVBSc0lKRExLeE1YRVk1YWxBMWpGRVNxbUxsYUJ0VHdEenV4TDdmUWpnaDFSZEZUZFVqQ1lmL1BOcm1nNW5jZDUzMWYyLys2YjdVelJLT2pZNWhqZ1FjZXZWazAzSGxXV25pRlQ5ZmdjclFWdWRBRDYrYjVjNE15ekJJUUFBZ0VCSVUyQ3k0WHdSbXc1bjBkNTd6UU96T1BVYUNJN0hHMEZHRzdNbms5VjVLcEMxbjlFZHR0SEJuQUEya1Vxd1ZBMUh2YTZMZkNhbmhZZ09WMmZhellzQnp0THV0M3oxMzd6NXIwQUtNRDYyb1dsZ2pKUDZTTTRCV1p1UkVMcEM2THEyRWR6eWNNWHJTQ0Q5cndFNlFkVlA2Nk1xQ0o0ZjNmdkdwc05weG51dmZpaFd0Zk9ldEhvV25RN1daL3RKNW1haVdVc1JJQWJEVUhUdFliWFZDVURFbS9UNklzZ2ZJeENDd1JlTXhsYi9jcmJXNy8yTFI5Nzc1aTlEQkNMVHlZYXlIRmNIWXo0dmxyWFN2QkxVZDdBU3RPWHhxczRid1RVZHh5SjVMZW8wbys5clM0alRjT09iSGt5cFZtZlVkU1F2cXVQcXNMVDlRNXN0bjNrbGFCVi84S0xEM2JyU3FkWGZKWUdJdUtXYUFXQmVEQnJIcWdiQnpmZTh2dWx3R3ZiZXF4OFdWOUdDT3N6R1UrOEd4MmFQTngxVWx2MFl3aFIzdnZrYlRjZHhlbHFkQUhCOGJyVVVKVUJQcHhxY0ZESEZQQXNBY09ObFgvdmRLeDVoVkZHWlRXYnpNOE5HeTFzQ1dhc1E3azMvN2hmKzZRTXZianFRMDlEcUJHQk10TGhjbXdBQUFLOWhGbzg1cHlMeWtiMjdtZzZuRlc2ODZzR1VETTZtYWQxaE1LMlBSTXVIeGJMMm9MRFkvZy9EWDNxNFN6MUIyNXNBYnQrM1N6VVowaExPQUFBQkpMZ3lwcWpMMFJiaVZOeDA5WmNTS2tTc0h6ME04OFk0aSt2Uy9WdVVzeDRnQVVoWUNjRjNxU1ZjZTc4OHBDRE5CaXQrK1VaL0FQQ3VuTVZqM2p1QmZ2aXUxelVkVGx1OC84cS9ycWF6VUF3c3BUUXo3NGJqMmNHY0E3TG1FVFNzbENFVVhmbzB0amRXQW1aS3c3S3QvOHdKUkNDRksyTzBQQWw0dXQzWGZlUDNmdU0vT1BIaTNHUTZIaGJiMTJkUDV0S2dyRm56dlVyQ3V2VmxiZkhYUmh4VWxxRVI5TFB4cnB6RjlSQlVWVzY1OTlLbXcybVg5N3pwZ1dUSnFkdFlYeCtXTzQ3Tm5zajdBVm16Q0ZoTTNXcGMyZDRFSU9KVVE2ZCttSnRPVkp5cUFFTHlEeit6cStsNDJ1VjNyM3dnMVZHOUh4OGREOEtPOWRtVHVTNG9heElCaFZtWHhxejJKZ0JBUVYzS0hlQ25PQzJpelh4d2RaMjBkNWZGbjczZnZmckJWQ2ZudFpwTUNyZHRZN1kvendPeTVyQktXaWY1elErL3V1bElUbFY3RTRBUmFYNFJ3REpuQU1CckdlTWtERlJGOXR5OTdPZkNmdHhOMXp4QVM2STZtNDFMdnoydkJXVU5FdmpwTkJaRlp3cUJXcG9BN3JqajJpSzYrUWJBVWcvL2dJb1hhRkFIZ3dBZit0UnJtNDZvZFc2ODZzRmswVW1vTnVwUmNjNngyZjY4SjV3dDN2eHk0TlhWd25Wbkk3aWwzNU9ObGVtMlE4T2lGQ3pkSWJBZlIrL0ttS1pGNldNVjFiZjBWOWFzbTY1NmlCRlM2UHEwR2hYbnJGYzVCMlNMUnBKa0VJVHVyTmEyOUV0aW52dGZlTVFIWGU3bG42ZDRIZFJwRWdaZUZMZnN6UXRCSjNIam03OVlrMEZrdWpFWkZlZU9xNE01QjJRTE5XOEpod1JhMDZHY3FwWitRNnBCY3ZSbStmbi9PQkhueEVPamlrS3c1NjVkVFVmVVJ1Kzc4Z3VNeVFVM20yNE1pKzNUZURUdkIyUUxSVmhNMXAxUnE2VUpRT0RFdTJVK0JQQmo2TFFFeEJmT2tvbnFSKzdjMVhSSWJYVGoxZmVUeVRrM3F5Wk9RNTJtdVRZMFd5RENlVEgvOXR1dWFEcVNVOUxTQkFBUlJGbStMbkRQamNFTllwb1ZaV0hKb1BMQm5BTk81bmV1dU45b2ttaDFxbTFDcHFZanlwWUlxV1VhVGExdU9wQlQwdElFUUNLNWVSRm85Z3pITndOS0Y0MmV1UG5QZGpVZFVSdTkrN0l2c2lhUFJ1VmdvenFZSndIWndwanBrVFJHUis3MGJtMENTSnJTTWw0RjhIeEV4THN5V1ZVV3FoVnF4ZTQ3ZGpVZFZDdk56SVphV3l6ZDJyZzZrRGNEc2dXWUwxb01CZzZ1Ry9QT05pYUFPKzY0dG9nU1dlZngvNlJVdkhlRmNhWnJHTThRVnJGNzM2Nm1nMnFkZDEvM3BlVGhST3NZaDJGN2xjWjVIcEJ0dGVPVm9ONjg3OGJJMWNZRU1CbU90eDBjRFVadGpLMGRxQks4bG9uMTlwMm9od2lUUEE4NGladXVlSUNrcXMxbXMyZ1Z1MU9jbDNVVlFZTHNUQ1ZvR3dmWjZOT2hjdy9vL0RiZzdPVG90UEJhQXZYMktQVTZWb2J4dGp0ZjFYUlVyWFBqRmZlVHRla1JoOEZHOVdSZUNNcTJIQkdyWkIwWnZOcVlBS3BCbFJ6TThnTFFjNlBUd21sSnpMYnZZT25xU1AvQlAzOU4wMUcxRG1VbVhJblJWb3J6Wm5Fakx3UmxXeTY0cXJaclAzQmgwM0U4dnpZbUFFSVZta3VBVHNGOEhqQ2dSTHBSSFJGQ3VPV3VTNXFPcWwxdXZPeHJ0S0JBWGMwU1oza2hLTnRpVE1tdGoyZmUrNllqZVg3dFRBQVNUWWw4Q09CVTBHa1IzQ0RwYkRRYXFqaFIzbnhuYmhqM0REZGUrWVdVNG1RODhUSWExNGZ5UWxDMmRVaVFNaGdPZkJjdUIyNWxBcUNJSVBjQlBXVlVDY0dOYWt4ODZTeEZkZTZXM0N2aW1XSWRkVGFPZFQwSWE5R3Fwc1BKK29zQU1TeERKNXBDdHpFQkFBVG5HU0NuZ0ZORUZWZTRVWjNHeFdoSW82amVmSGUrU3Y0cDczL3J3N1orWlAzaEI2eE8wL3BJM2duSXRnaEJrcUxtMmptNFBsUHJZcno5M2t1ZFNwS1V4Ly9USmFLRkgxWDEySmZCU0VyNnlONWYvOURlWDJzNnJyYW92dis5NGMvK2ZEUWJsZWZHTkcwNm5LeW41cFdnRmp2Umc2UjFDWUFPV3R2S2F0bDBJQjBsaFI5RnE5UW5nUmhNNFAvd3pvdWFqcW9WZHUrR08rYzg1MXlzNjFrODFuUTRXWDhSMXBGQzBQWWxBRkVyQUVOdUJIckdnaHRDSExVdTNOQVNndzgzMzV1dkVBQ0E5MXp4UlJMSmJGU2NVK2RKUUxaRkJCUWZrN3p0dzIyZmY3Y3ZBYWhDaW53VjVObWgxeks0VWVKMFpUaUNBSWw3L21KWDdod0hnS1J6YWt5emVEVHZCR1JiZ2lSRE5hTnpiZitBdFM0QkNCMU44dmgvMXFqaVNyOVN4YkYzTUtYVVlJR1AzTFhzTzhPL2MvbGZEdXN5R2RmS0YwYWJOUjFPMWtQemxuQkY0WHpyTDNCdFlYd3lQd1dXTThCbWtNS1B6RXlrbGxXaGluTzVPZ2d1dWhjZk9pOWFuTmFIOHlRZzIzd0V5ZUhRaDlEQ0FmWVpXaGdmb1dUZUF0ZzgzZzJDR3liTUJzT1NaZ2I3MEoydi9lQmZMTzloc1czVDBZRzFvMlFjaGgzRzJIUTRXZC9NVjdBRjFOWS9YYlF2QWFqUkV2STU0TTFFRlRmd2ExVzlJVDVCWUFidjljTjNYOXgwWU0yNDdycFB6a0pGT0lHYnhmV213OGw2aUVDS3FmMlBzZTFLQUIvZnQwc2tpYmQ4Q0dBckZINUZ4VVBxNGJBZzZJVTMzL1dhWmUwaHFnNFFvWFhrNnI2c1l3Z0M3UzhGYlZjQ2dDSEZxaWg5NjM5dUhVV25SZWxYb2syR1paa2dqakZKK1BCbmxtNDU2SjJYZmc2bVl0ZzJ2Q0J2QldkYndhQXB5Vzk5dU5XbmNGcVdBQ2dTWVNsdkFXOGRpbWpwVitzMEU0MHBESk9wOTNyTDN1VmJEcUtrcXJCb1ZkeG9PcFNzZjBqcWJFb1hXajJVdFNzQmlEaUlBL0w2ejVZTGJoamNnS2dHd3dLZ0NUKzg5NklQM3JWRTF3a3dPUWtwWWI0RWxEOXcyV1lpUVVNNW9tLzNVWUIySlFDSUUxL2swWDhocU9KTHYxcmJUTDJLYURKenpuM28zbVZaRHJyaHlydm1ON2l1bHVmbC9xRFo1cG9YTXBiQnRmeFNnSFlsQUZFRkJIa0hlSEdrY0NzRUROV2dLQ2g0K2M1akQzN3I1Y3Z5ODZlZ0tzeFNiZ3VSYlRJU2hLVWs3WjVjdGlzQmtKZ2ZvODRaWUlIb3RTemRTckpxNkFiZk83VDkxYS80N3FmLzV1Yy9zbmNKcGdMSlNZZ0pqSllUUUxiSkNOQ1N0ZnNHdWhhdFQ5MytsUXM1M1pIcTRBdUpWYXQvYW4xVnB3bUFhQ0lrSUpaNDQ1VmZhRHFvcmZYUnoxMHlmMW9UY1NvZHVNRmppNVNGZk8zdnBnY09wZmEzcitrS2RlcUxHalIxMVNldWY2VHBjRTZ1VFRPQXlVQUdoNHVCdG52TzFHZkJqVlNjU3ZRdVdLSnorcEc5UGU4Ym9WRUZLUHhLTGdiTk5odFRVblZWVEcwYVpwK3BSWkdSSG9kMk9pZDUrYWM1ZEZvR04weWNsbVVnUkVYMjlMcDNrRkREZUNYR0t1VVRZZGxtRS9HektvaTBkeU80VFFrZ0RwSjNadmtRUUxPbzRncS9rcXdxZzZjUlludnU2dTBwQVZjWFZURk5xYzUzaEdXYmE5NFR0QndNY3dJNE5lcFVmTjRBYmdNNWZyUFlURU9DSVRyKzI4OWV2SHZmcnFiajJuelhYLzFwMHdpdzhDTzJlNzh1NjVaNWtiR0R1UmIzaEd0VEFvQkNGTWdUZ0xZSWJpUVVDZVlvbFJOdjZHVU9BS2xPaDhYT3hMd0tsRzBlZ29SWnBMWDNjdUEySllENUFZQjhGVXlMMEx1aGloT3RWMnVKaXFLOW4rU3pvTEJvWkRMTHJhR3pUWlpxTTJ2dnpMSkZDWUEwd2ZFamRFM0hrdjBRdlE2Y2xrN3F0UXFlM0hQdkpVMkh0TWtJV0lHVW9yR1grUzFyVWhKVU5hLzl3SVZOQjNKeWJVa0F0My82YWlVaWErWkdRSzFEcjZXS1Z4Yzl2QUszM1BPR3BrUGFUSFJ3cG1US2w4TmttNHcwK3Nta1ZtM0xTUHNqMmhLV2xiV3N1K0hRNVFXZ1ZxSjNBNEh6anFCQ3NPZnVTNXNPYWRPODYzWDNDYUNpS1M4QlpadUtoSU1Qd2J1MlhnN2NtckRVNHJZSmtBOEJ0QmFERzZSVSswSXRVUVFmL3N6cm13NXA4NGhReGFuUE8xRFpacHEzaEJzV1JXanBJZlBXSkFDZkhJM01od0JhcmZDanFsNHZDazNSbkc5dmNkdHBFeEZCR1ZaekpXaTJpZWJQRTRXbTF2WUViVXNDRUNqZzhnWncreFZ1VktXTll1aFU5WmJQWHQ1ME9KdERJS1FXZnBWNUh6amJSQVNKTkw4Y29KWGFrZ0FBQi9ISUU0RFdFM0VxM290U25EZTUvZE5YTngzUlpxQW94R3VaWndEWnBrdkpFbHM2WFc1TEFpQUVsRHdCNkFJR041alV4NEpIbVBuVTdodnZUcGxLbXMvWSsvRjJzaGFoZUpyOEQzdGUzWFFnSjlHZUJHQUdReTRDN1lqZ0JtWjF2V0xtN0VONzM5aDBPR2VOU001eGZoZEZsbTBpVXVDdEpsclpaN3NWQ2VDMk82OEE1UGhhV2Y0Q2RvSFRVTVd4OXpxeDZGMHJQa1ZuUlNCTUFJbThCSlJ0SmhKQ2xkSzVWbjVOV2hHVEJNYXhERVpGMDRGa3B5RzRvYVY2VUFTVlZueUt6Z3BOQkhrRElOdDhCTWxCNGRwWk5kZUtyNjZxdUJHUFY0Rm1IZUUwak92RFh0V3J1M1h2bTVvTzUreUlXRzN6OW8xTmg1TDF5bnhmU1JKYnVRTFVrZ1FReEtsajNnRG9HaWZlYTRpVmFVdVB1WndxZzNQRFFvQmNoWlp0TXM1ckd4T3RqUit0VnB4UEVLZ29rYjk4WGVPMHJOTWtGTnIxdFJPcW4wVlY2ZmpieU5yS3JLVUZacTJZQVlEQ21BOEJkSTlUTjZrT081RjBiTnZ1M2J1YkR1Zk1HZHZ4UmNoNktrR1Q2Yis4NVRWTkIvS2pXdkc1SjBHeHZBRGJRVUlRSWdlLytsOE1YL3I5cG9NNWU2MWNwczI2amhUNk9sb0xDNEdhRDRqRVQremNmK0xoUDJlQWpuRVN2QnVjKzVxSC9XcUg3OVFWQXNCOEhUTExOdGU4dXIwb3ZHL2ZSbkR6Q2VDdnZ2dnlhMzdoSVhVeEh3TG9JaEZWY2E3d3d4Y2NianFXTStlTklZbXc0M3ZaV1RzUkpJZUZ1UFo5dnBwUEFJZldWLzdvdmwyK3JlMVNzK2Vtb25XYU9GSFh3ay8zS1hPMHdGcFZKYThDWlp0dGZzOXRURW5idDhMUmZBTDQ5djRYT3RObEs4SHV6WmtqZ1VhYk9mSFNncy9TR1ZNeEVZTW9KQ2VBYlBNUmdLVVdYZzdjL0pkV29IQzZUQmNCQ01FcWJjemlSaDkySFFXa0dTQ2RIam9GcHVwRThnd2cyeUtKVXZueTJqdXViVHFRWjJnK0FVQWM2RnBhSmJzRm9zMjhCRytybm9NamszL3MvRVhraEVBVjNUN0diU0lpZ0tqMG9LMUYxa3FKYm1QN3VXSDlXTk9CUEVNYlB1NEs4Y3R6Q2poWkZXRWkwSFdPY01FMEhwbkY5ZTVPQlFpcStrUkR4OXVvSlJNUTNmMUZaSzFHQ3QzS1k0LzZscTM5TnA4QUtEaCtjYzRTWkFDU1RvT1JFSmhIaWxVOFhDSzVvNU5IT3pvVklDMjRJVWpyOHErUHBLaFZhZHlIeG5aWis4eS9IT1dvTE90WjA3RThROE1mOXowUHZwb3VHbXhKWmdCa0NtNG9NQlBlY00zbnFxbUpzL0doaWF2V3B2SEl0RzVhZEdsSUFBQWdBRWxFUVZUWDlQQlVHSk9JV3NlUGNZc1l6T28wYWZ3YmtmWFN2TWpGR1oyMmE0clo4TWZkeDNMcTFvdEJDK3VqdG9ReGVSM1VzMVR0UHhmQSs2NjdQMWExODg0UTQ0WWo1ZkRrSDVQVlRZZDVHcEpWVmIyaGxHNy9BZ2tJWm5FOXp3Q3lMY0g1TWtlRXRXdWkzL0RIWGVtR3MrMGlzZ3lQL3dDTXNZcmpvdzlkRkRlRzgzL3piMzd6cjk1MzdVT2txREFlbVlaNlc3VHB4dXhBSi9aVTV5dGFTTFJVLzZ1TFA5VjBPR2R1WG9JUTB5eHZBbWRiaEVDTUtiV3NFclRoajd0akFHSFc3UVdFVTBZUkpkSzJYL2piMlQrKzdPbi94L3ZlOGhDcktNNFJhWEtzUXUwM3F2Mnp1TjVVb0tjb1diVTZPTjhzVHZmdmJEcVdNN2Q3OSs3cThCck5jZzFvdHFWTXRLN2xiWC93NjAwSDhwU0dFNENJYWxBc3h3YUFIZDhBY0dISGtSL3ZuZm5lNng2NTZWODhISlBoNk9IeEl3L0ZzVFBENGNuMzY5VGFIanRTcFhHSzR5Y2VlSFhjR0RRZHpKa3JYdmJkdy8veHY2UlFwQlhkMGJOK0lzeTBHZ08rUllOZDR3bEFRTzM0RHVLcE1scHdBK0o0dmVGSi9kNWJ2MUovOSsvMWhUOGg0L1Y0WkJwc0RjU1J5YU10M0Jnd3E0ZGhlNlN0L1ZkL3UvRzlsellkenBsenc0M1ZpKzl6dnNnYkFOa1dJZ1ZPQnZSdHVodXk0VS84L0FEd1VsU0FBc2FZckZLcG43dGtmdmR1L08vLzZsRXRWaVE0R0diajZHd3RwZnJZOVBGa2NXSFJQaCtaeG1NRUo3WG90cE5NYURxa09IZC9xTVJwVU0wemdHeXJrQ0E1R25yZnBydlBHMDRBUmpQTWF3aVhJQVdRaVJFSWNnbzNUNzMzdWtkdWVzdkRwTTViN2svV1o1NnJ4bmhzK2tRYjBrQ2RKaXZsdVdiSmE0cldvaWVhTTZBVUtKSkZsNWVBc2kwenZ4eFlFVjJidW80M21RQnV2L2RTZ1NXcmwySDhOeWJ2QnZPVzg3Lzl1dnRPOGIrNjZjMFAzSFROZzZtT3pqdWp6YWF6d0xYRTZ1ajA4V1RWVnNiN1hFaExWa1diQ2FoaU4xNTJUMU9SYkE0UkVhelBIbGNKVFllUzlSZEJJRnF5TmxXQ05wa0FxS1oxS2dkK0dUWUFqaDhCNDVuMHpIbi9XeCsrNlpvdmthYmlqS25hc0FMYkJIcGs4djA2VFJhL2Z6S3BEeGR1aU9rR0xMN2owbjBMZnZYTnRYdmZycVFLODhucWJ2ZXp5N3JBb3JYcWN2aEdsNENFNXVPU0hBS1lkM3BJbHM1NHZMN3Bxb2R1Zk5NREZxRk9hTnpZbUJiY0NjclI2USttOWRIRmRKSWdPYWtPbFg2dHJvMnVRR3pkMXZUcEdpUjNWS01Qd1VtYmxtYXp2bkxla3Z6V0IxL1ZkQnpITlpvQUZLTHowYi8vR1lBMHM1bFRmNVludkc1Njh3TTNYblYvVEtZaTFEVEZ1c1pWaHpMWjdOajA4VHBOdHU2bUFXT2ExSWU4anBpaUtoTGREVmQrZVl0ZWEyRThzTE1xZ2krZDVnU1FiVEVTQ0hGcTBwcjdyNXJjOVNKVVJaYWhCb2cwcDRVQm9OeHd5ZWZQL2k5ODd6VVBBUGpBdlJjaXVxR1VGeHcrL3g5RzN5K0w3U3JGdUQ0RXN2Q3JYa3NSYkZaN3l5cHUxR25xTUp6aVdNREFBKysrL0F1YjhqYzNxNFFpV0xUS2FkNEF5TFlXQ2FXNlVhR3RHZklhM1FPQXhpVExNQUdZSHdHak9YSXpWNW5mKzRaSDNudkZ3eGVNeno4Y2pxN1lLQ1Z1VENZK2xrRzNPUzAzcXYzcnN5ZG5jU05aZmJ3WHllbi9vQW5XYWJvK2ZRTGliT2JlZmRrWGYvNzhvN1ZNMy9IR1BveitBRVNnMUdQVHgzTU5hTGJsNXBXZ0ErK0x0cHc0YVhRR1lQT0RZSjFvZTNOV2pNbHBFZXZaVnZRYXVPNjZUODcvOEFkLzhlc09ORkZCT21ZYkJZZk9sY0VYRURzeWZqUzRvZE9nRXB4NmdadEhjdEp3ZUx6T3A2N1RKRmsxQ0R2RUJ2Rm8vZklMTnU3L1R5Kys1aGUvK2VhKzdKWGVlczhiQkU1a2ZnOUFYOTVWMWxZRVFRR1NhODFucmRHbkhzR0pzYi9uR1lCTXlXYk9hNHBiMkFycWZWZmRQLy9Edi8zc3I3cWtWSEVXdy9yUnNWOExhWWQzUHJpQnFxL1RzWEcxWDZBcVhrU2VmcGN2UVdNeTFzRVBCMjU3ckZJOWhVM0dQbmc2ZnUreGJmL2RyLzN0MXNXL2VBTEdsSWFEa1U5bDA3RmtTNEFnWURHMTUyR2pzUVJ3Kzc1ZFZCaWs5emZCa0ticUlRcnc3Vys0Y3dHditQNUxINTcvNGZaUFgxaHJvYWxTNTJPc2p4eDU0cHpWYzhmcW5LMktjMEVkeEl0NlBmRjVUSXlXNmxrZEswTWxFdy94cXNrczF2SDliMzE0QVpFdm1JZ29XS2VKMXc3M01zcTZ4VWkyNXV4a1l3a2cwbm1yaStIS2xqNFV0d0Zod1EyTjVNSUxnSysvK3BFZi9ubjNIYThjRnNOeHJMd3ZUSjBTUnFqTWI4T0NRRWdEYVlTcUpCSmdGSG4vYnp5MDRKZ1g1a043M3doVmdPdXovYXZsK1UySGt5MkxhRXJ5djczNW4vKzdkelgvNVdwdUNVaGthc1ZvT1RZQUJtNHdtVXpyZytjMkdNYnU2NzdSNEt1M1VGQ1pSdHM1V3BuR1hQK1RMUW9wOEpNNERlM1lCMmhzTTVyaWZGQ2cvMTBnekZKVmp3OCsrS3BPOTB6dUh4VVplVWRJY01PbVk4bVdCUWtCUm9WelM1NEFWRlFneDY5aTZpK0NJa0xZOWwvNCt1UjdMMms2bk95NFBRKytXb09weXFIeGYvWXVId0hMRm1TKzVWa1V1dXd6QUVERWxIM1BBUE1XUUlBTEhlK1ozRE5haFNvY1UrY0V1bGxuNWJMcytaRWdhTmFTYTlDYld3S2FWOFFTL2Q0RU1KcDNBOVFXWTR0YUFHWkM1emRXaktuMHEwM0hraTBYQWt5cEpUM2hta2tBdTNmdmprZFc1LzNMV3ZGajJESmtNb3NiMHcxTE9RRzB4UjkvN3ZYZWdvb2VuVHlXTzBCa2kyZVVsbHdPMzB3Q1dIM3BmejcwMTY4c3d2RWJ3WHFNSUJHSEs2TzYrNDB6ZTROUVJTeUtvZGQ4L2l0clFEUk4xTis2N1RWTkI5SlFBbkNqalJlOTVuNTFiV21Jc1VXTXlXdEppcXJlOU9ZSG1nNG5BNERiN3J5Q1ZJcGZuejJaMTMreUJwQ0tFQW5mZ24zZ1pvYmd3ZmtIb3BCOTN3QWdMYmlCR2EzWGI3TmJ4S1ZVT1lnbXF5VGZBcDh0M0h3d0dCU3RlQUJ1NWlBWVZlYU5vUHU5L21OTUFxa1p0ZW03bDdPbkNMU29qRkw2dGFaRHlaWVJTVUFLSnlrMVAvdzFNekNKT01EM2Zmd0hhWkd6b003UWpoMmZwWGZiUGE4WE5hZ2JWNGZ6OW0vV0RBSkVpbkhyN200NmRVMDltWXBBME9zVklOS2NCak1LOE81TFA5ZDBPQmtBUU5UTVZDU3YvbWNOSWhDajJkTE9BREIvOW1lZiswRE1MNEZSS25MOVp6dmNkcy9yUkNqT3I4K2U5QzdYLzJTTkVZQ1Fxb3JYN241bHM1RTBrQUQrWk44dVZhT3cxK00vakVuVnNRWTI5UmF3N015SjBFd1ZSWDc4enhwRklGS21SemVrYkxnTlNRTUpvS1l2YkJaSzZmY09BSm1pMVZxNHZQN2ZCcmZkZXlrQXFCdFhoNExMWGZteVJobWRCTjIyNWtQREY1RTJrQUFJbVhBZ3ZYNHNKazAxaUFpVi8vcnl2VTJIcyt4dS8vVFZ6aHlnVU11ci8xbmpTQWhrYmVpTFFjT1ZDQTBrZ0NRZXg3dmk5WFlLUUZqUTByZ0UxeDEwUWZTMXJ3cW5NcXZYbmViZW4xbkQ1aTB3UmN4cHcrTkRBd2xBUk5VRjlQb21TR055V2xxMG56N3ZzYVpqV1haNzduMnR1VFFianFlMlBnamJtZzRueTA1VWdxYlVlQ1ZvRTFWQTRpaHl2QXFvcDh4U25jWnZ2MlR2enRHeHBtTlpkZ3FwWmVaOUVLaEt3MHV1V1RaSGdNbWFIditiT2doRzdmRUNFRUVSSmV6UC92ckNWNzNpVzAySHM5UStldS9yQVhpNGpkbUIwcS8yK2FFajZ4UUJxTUhvL3VYTkZ6VVlSaE1QUkxUajM4T2VwZ0F5QlRlQTJmY1A3dWozWG5mTDdibjdOUVFkWEpRNk4zN0lXb1VFNkZOQ3MvMm9GdjNpLzlmZGx5bFNrcXJIaHdDTTVsd1JVMlRLTFlBYWMvdnRGL294WTZyVUI3T1U5MzZ6VmlFcGNPclI3T1hBaXg2aG9xT2JXbG02SHMvRnlSVGpWT0tncnhtdUU2b2RSYmwvNWlTTXEwT0RzSllYZjdKMm1mY0VMWjF2ZEZ0cTRTK3VuSGtXZEgwZEhFL2NjU3hTUm1sQnI0L2xkUE9kdTFpbmpaZVgxTmxBOCtKUDFqb0VRVkZKemE0U0wzb0dRQWRWb3I4MVFBSUJCQ3FxTlZ6ODJHY3ZhVHFpcGZPUnUxOEhweW00RU1SSjBOejFNMnVoK1Rab3RHWXJRUmVkQUVSVXhmVjRBd0NBZDZXbHFrNFV1c1IwOHoyN21vNW9pWHhvNzYrSm1wRitFT3BVQlRmcTY2TkcxZ05HTkhzNThNSVRBRlRvbmxvcDZTT0JxSGhqVEJLTlVKRmI3M2w5MDBFdGhUMTN2TnJWa2xnWFFhcTRYdnFWUFBwbmJSYXAwZlJ0dDc2MnFRQVd2Z1FFb1dpL2p3RURFTkhDalpKRjd4MG9vbnJMdkJsWnRtVjI3MGFjSE1UWUNnMnpOQzc5S3BDTGNMUDJJaW4wVlpMZ0dvdGg0WFdLZ25SOHp0UHJESEE4QjZ6RVZJVlFHQUZ3enoydmF6cW9QaHU4NUdYajcvd250eU5FVktWYkVXbnVXNVZscDJEZUQyMmxSSU9YQXkrMEN1amorNjZFMElkKzN3VHpGQkVwL0xCS0UrZENIUTFpZSs2OW1NYmZ1ZXdMVFlmV043ZnV2Ymc2ZW5ESFN5OU9VZ1VkcW9iZVAyRmtuVWNBOEU1RUd0c0hXR2pxRVVHS29xN25Od0U4a3dRM0lKTm9GQlVhVmQyZXZDV3dxVzY1NTdVbVZtdzdKMG5sZE9DMHlLTi8xbjRrNXkzaEdud2NYdWdNUUVSVVNGdUt4LytuYzFvSU5hWlpFUVoxdEdFSy8vZW4zclEySFYxMzNTZWJEcTNiZHUvYk5VaXNhWUdTdFBaYWVpM3o2SjkxaUZscWNMTnFzVE1BaURoUExNY0MwRE9wK09DRzBXWkY4Sld2MXFhamc2dkhiczQ3dzJmaEEzZGNXazR3ZFJJb0p0Rko0WFdRUi8rc1k2aG1TNUlBUkJtQlpmMk9uaWdOcWlueDBYT2ZuSVJvMUQrNDY3TGRuNzY2NmRDNjV5T2YrWFUvckdYZGI2dk1KSGt0dmN1amY5WTl0VG5DL2M4ZjM5WElxeTk2QnVDZGdIMCtCUEM4dkJaT1N6S1dJYWpXczFpTWl0bk5uM3REMDNGMXlaNDdYNnRPUmRQZ25FclV2Sll1ci94a0hVUlM0VVMwcVpad0MwMEFCQTBDOVBndWdGT2k0Z28zck9ORVlEdEhHOEZUekc2KyszVjdQck9yNmRBNjRPYlBYQ1FxTklSQklNMjd2T3ViZFJVSmdFV2hUWFVFV3R3bThPMWZ1UkN6YVl5RjF5WGNBdmh4NGwxcFRORm1oUXVSeVJLZDExdjM3cEtVYnJqeWkwMkgxMFovZU1kL0xZVWFreWI0WVRDTHdRMUZOSS8rV1VlUkJFUUFKODE4aGhjNEE1Z01VQjRJaGVYUi80ZFVYT0ZHeVNxaUhveUdkQ0lwMVRMNndLZXYybjNIdFUxSDF5NTc3cnJJalFwV1JrY3B4U3lkR1AyenJMTUlFR0tSRGJVRVd0d01nS1p5YUNkV0YvYUNuZUcwVUlZcWpVWEVqVVlXNDdGajIvN0pULzdEUTkvNnFWZTk0anY1VHJHUC9mdGZqVUZCTTZmbHVTT1NLaTR2K21lOWtWSmlROS96QlQ1QXhkTFV3R1hmQURncEVRbHVvT0xyT0ZIbE9lY2VmSHg5N1ZXditNNmZQdkxMSDdubmtnL3RmV1BUQVRibTVyc3ZTb1BnYTB2S1VBYVNlY3MzNjVrSWlWUDVIM2Z2V3Z4TEwvQWdtSXFLNys5RkFKdEF4YWtiR21OaTdiWDg2TDVMek16b3ZOZ3RleS9SeEJ1dS9IelRNUzdPTFhkZFpFS0ltQ3EyalR4Z1pzRU5BZVRQVU5ZYkJHSlNPYUtwakl0LzlVV2VCSFlFSkc4QVB4OFZyODRucStkcHdLbEZnMWFVNEc2NzkxSXpmZWRsOXpRZDQ5YmE4NWxkb2daVnRaUTBGV0dRclBaYWlyZzg5R2Q5UTZyb2JOczBzSUdiaXhhNEJ3QVJDcGhYZ0U2SjArQVF6T2F6Z1JCR3c1aW1LVHJuNVdQN1hpOUNjZlgvZHRIOVRZZTV5VzY3KzJJS0FFbFJSVk1ZamhDbkpQT0RmOVpYTkloaVpiV01kYTluQVBQdDd2NWZCYkNwVkwzQ0c5TTByb3Zvb0J6VVZvRmUvRGpWNGRiUHZnN0VPOTZ3citrd044RnRkNzJPU29pS0pYTXNoaUVaWXB3R1YrYTIvbG1QelM4SEZpYmZSUC95QlNXQUQrMTlvNEdDbXVqdGRmQmJSOFdwYzZUTjRnWmh3WTJRVnNnYXBEci8wYysvNFdkZThQZzVvNDFmL2FsdmRhNWs2T09mMldVcVZJb3FvakZZS0VaMW1rYXJ2SmJTdWZlVFphZUxBR0FwTmpJd0xpZ0JlTkZKWlR1MmVVdDUrRDlESXVwZENUQlpaWXdpV2hRck1WVWkrTllUTDdyOGRYdi83S3UvY3V2bmR3QkNzM2RlK3JtbTQzMHVIOSszeTB3Sm1JbFdLVGsxU2NWd1ZNVnhGY2RlQzlGYzRKOHRrVlFidElISG5RVzk1SzJmdmR4Qnl4SE1HT3RHYjBIdUM1TEdPakU2OFlWZlNhek1qT29zUnE5ZUlJb0VVQ1ZlLzdyN21nNzJ1RC82L09YQWZCSFFST29ZdmFnNURhVFZObFh4VG9Qa0JaOG1sSVY4N2UrbUJ3NmxwcHJTTERQbjFXUm1obW5DSjkvOXBVVys5SUptQUVFVlFrTHlGdkJtRVJFbmhVTXhYeG95UmhWWG9JVDNDVkZNU09kMGFpeis2SE9YRVhDU0ZBeVMvcWZGNW9PUDduM2p2UDhUaEtTSnFFQW9TaFFodURxTjZ4U2RGb1ViTFRLcUxHc1BFa0NZcHRvdGZNMXpRUWxBVkVRRXlIMGdOcCtJZWltQWdtU2RKc1lJME92QSt3RVJtR2FBaUNCUlM2MW1LUDVvM3hVQ0pXRk1SaHJpSnE0WGZYemZMcUVERkhBR1FBaUNOVVZsL3VDdkdnaExhVXFhaW5kYTVrZitiTW1SVk5YU05kQVNibUZWUUFJb2FMbVFiK3VJaUpQZ0VBQVlVeFhYalFtZzA4SnBFWFEwTlc5TUlnS0tDbWpPTUhXcUgvMzhwUkFSS0dTZXA1OHExeFVJSVJUaC9EK2J0L0lXaUhCZTF6WC9oWkptSkVFalZKS2p0L2xmQTBMTkQwcUFNVTJqMVRIV0t0NUpJVTJzZUdaWkd4RUFSb1ZQQys4SXRNQXlVQnB5SWZlaXFEaUltOWVWa1JiVHJFNFQwZ2c2Q1U2RGlnK0ZWdzVpcWdBQ0NvRlFLWFFLemorSFFsQlVKRUpBaUJmVXhIeENBY3I4VU4vOHBtTUlRQ0VvQkVyeHBkTE1xbVNWTVVWVUtrN0ZuU2puejdMc0tjY3JRY1VXWC9xd29BUkFwT016L2J3R3RIQWk2cDdXTlpNMFkweFdWOGxJRW9aNXBhazRpSWtwNkZSVVJFNU1DTVRQZjNjSjFIa3ZqL216UGlHY0ovYjU4bzRoMGN3UVk1cUpxSWc2S1h4KzBzK3k1MFlBV1B6alB4YVRBRDcyMlV0RWpBQ2dlZnh2bklnSzlFY1czam52MGtjU01WazkvM2M4OGYrYytDK2Y5bmM4N1YvTms0U0tVL1Y1UVQvTHpneEpjdEZmbndWTk9WSWRRNUdQZ0xXWFFFUlV4YzFyTVowR3A0WFh3bXZwM1lsLzlJZi9GTzc0UDhkWGsxVGN2THluNmZlUlpWMlZURlBDMi83d1ZZdDgwVVVrQUJFSXdOd0RJc3V5N0dSSUNudzlpNjVZNkQ3QUlwYUFSQ0NLcDBwR3NpekxzcWNoSVVDNUdwZ1d1aE93a0UzZytZcHhuZ0ZrV1phZEZBR2djSklXZXhaZ01WVkF5aE01SU11eUxQc1JKRUV4U3d1K0hINFJDWUFRVUpCTFFMTXN5NTRkVStKaUt5a1dzZ21zZ0p5b0g4K3lMTXRPeGlnTFBneXc1UW5nbHM5ZUFzQjV5YmNCWjFtV1BZZmFORUgrKzQvKzZzSmVjY3NUZ0JOWDFkRTV6YU4vbG1YWnN5R3A0aW5KdWNYZERiYmxDVUJFQ2kyWXJ3TE9zaXg3ZGlSVXRDd1dlaEJnRVRNQVZRWHpGbkNXWmRtek90NS9sN2JJN2xsYlh3V2t4eGQvOHZDZlpWbjJyT1luWlMwdDhsRjVFV1dnNWs0Y0JNNnlMTXVlWFIyNXlLTmdXNzRFUk5pOEUyamVCTWl5TEh0dUJqSGlmNzM5d3NXODNOWW1nRC9adDhzaEdpdmtMWUFzeTdMbkU2T1VaWnBWQzVvRmJHMENxQ2lGVlNHNFBQaG5XWlk5TjVMZWhhUHJpa1dkQjk3YUJHRGtocW1JNUEyQUxNdXk1MGJDcVN0TFhkak5NRnU3Q1p3Z1lHSStCWkJsV2ZaODVpM2h2T1BDK2tGc2VSV1FPZy9rRXFBc3k3TG5Rd0F3VzF6ci9LMU5BQUsxQk9UeFA4dXk3TlJZdFBrVldndXd0UzlEaWtwdUJKMWxXWGFxVEh3eS9PYUhGMUVKdXNWNVJwRG0yOWs1QTJSWmxqMGZBcVJMeWNRdFloS3doVXRBSC96ejF4ZzVuOHJrOFQvTHN1eDUwZWcxc0VpeWtFRnpDNU5NY0c2eU1TMEhSUjc5c3l6TFRna2hJa1Z3M25kOEJxQk9WL3ppR2x0bldaWjFIVUZRSE13V2NoSmdDeE5BOEo2aXlJY0FzaXpMVHRHOGQzS3l4UndHM3NJRUlPNzRMa1llLzdNc3kwNmRjVEZiQUZ0YUJTUWk2b0I4Q2lETHN1dzBSTk5JdWZhV1g5bnFGOXJTZlFZbU1lUVpRSlpsMlNranFSSm1qSVZ1K1I3cUZpYUF4SWlZQU9RcFFKWmwyU21hWHc2OEdrcTM5WmREYmxVQzJIUDNxNU5OYTA3VmlhaUlpc2pDV3B4bVdaWjFGZ0hBT3dUZDhrclFMZHdFdG1neW1BMVh6M0hUWklsbXBOR001THpXQ2NqMVFWbVdaYzgwN3dscWxoYnd3THlGQ2FBSVdPSHEwZThmNGFCd1VxcnpUR200U2dBcEdRMC96QXBFVGdsWmxtVlBFZEsyZmpEY3Fpbkd1eS8vMG9xV01VRzlTZ0pCd3hpajd4K3A0dnJVNmtxc0xxMzJxZVpvV3hpdStITG9pbEo5NFh4UTUwU2RxSXFJTFBKKzVDekxzcGFvRTJ6cnJ3VlkzUGg2KzFjdWpMWUM4N0NCb3d0VHQzWWdISHJGdCt2RE82RHFuS29FR3BOVWE5c0hLWjVZTWtvME8zR2pQRUhPVDhvdExPb3NXd3BsSVYvN3UrbUJROG01L016VlBPYzEyZ3hBTXZ3LzcvN1MxcjNRbGw4STgwUFgvOG9qVC8rZmQ5eHg3V1Rub2YrL3ZidjdrYXU4N3dEKy9mMmU1NXlaMloxOXdRMWd1MVdVWUtCQUJGemtxclNxSEVFZ3RBbmx4dmtYZXRHTHFxOEVWVzBtRjVXU1Jrb2pLdEpDTDZncUNNSW9DYTBxR2hKTEprbUxrWGxMZUlsU0NZd0ROVW5NZXRkdnV6UG5uT2Y1Zlh0eFp1M2RXVGV4OGM3dTdPenprVzNKSTFrKzlwRiszem5QOXp6bitJWFowS2dRR3FRUTVpdmRzVEI3M0M5NlFNeVROSXZOU1RqdkxkQ3MvNE1EUlFMU2ZVWkprb3dQa3FwWkZhck1EemVQTnk0QUJuejJzMCt1L1hELy9uMkxVMld6NjZxbUFWWXNUQzI4OHBzMzNmVEd3cFdub3BxS056Z1lXOU5lSWYwaTRZS1JrUElnU1pJdGk0U3FUclJjak1PZFpac1dBQmMwa0FxZFR1ZktLNC9QRmExR3NXak5ZR0Ixc3Izd3lvM1RkejdUakZNcTNqTTNnb3l0S1pEMWVoSE5RRnQrRDNHS2hDUkp0cHA2ZHFsQTNIWUtnQUdkVG1mdEo0MDliOXJQZnNPdW5sZjZxMmVPZi9ybTV4NSs2ZU5WNzBOVkZJV0k1QlpEWURVOXU2cElvQzJuUVA5MW15a1NraVFaVlNRZ3RERHNtbmFrQTJDdGdVZ2c4ZEo3dS9iTUxMNDFONlhTSkFVV2l0bjJ3aTAzdWtNdk9wakFJNmpCNEt1SlZoYkQrUmJoWExkYy8weEZRcElrSTRVYytoZlZNV3o4Tyt4TXZ2dGUxbDFxblRncEpydW01ejk5ODM5LzRkbTl1NzBqTXRBSnZDSG1MWFBPeFdCbUlGY1VDZWNpSWVWQnNtMmt1NEJHamZOS0ZDS1c1ZUhoUDN6cFYvK0JEMlNMWFFGY2pJNTBWdjZXeExOSFAvTHhxOTQvTXJlektRU3djK2I0WjI0NTlQZUg5alc3WndUZXF3ZUZESzMyK1NLaHJwZFRrWkFreVdZSlVTWW1RcmM3eExremhnRXdRQVRBVVFEQUcvVW5KQTY5ZTlNTlY3ejkxdHl1akRReUt6QXozenl6dXlpcTRCeUlER0toS3FkM05HS2dSWktwVzA2U1pPT1F6RnkrTU45clRnenhtYURqSHdCcmlRRDQ4Y3BQOXUvZlYwd0ZYWVJyaWhFaWNlZlVpVCs0OWZrSEQ5L3VxNGJDazhJWXFXRmlLb3VoZi92cHlpSWhiVkpMa21RZGtSQkZhN3JKS2c3dmI5bU9BYkRXMmswSkpBNGYrK2gxczNOSDVuYlRDSExYRlhQMzNQTDh3d2Z1aUxuM3FxUXpzNnpGTFBPcmk0VFYzWExLZ3lSSkxsMzlTTGltU01qU0ZjQ0dFd0h3TmdEZ1IvVW5KRjQ2Y3MxSGR4NC9NcmZMQktEbERaMmFiTTdQbjZYQ01RT1VqSTAyeFJEclNubTVTS2d2REZJa0pFbHlzUWdBQnROaDNxcVRBdUJpaVFBNEFnQjR0ZjVrLyt2N3V0MHl5MzFWUllLK3dPeDhjK0dhSG50UkFLRXphb3pGNUl5dkgzMUtvekVWQ1VtU1hDd3pHZXFBU0xkOHJadjkrL2QxcndqUnhiSVpKUUtRblZNbjdybjEwTDg4ZTIvWkNwNXFsYVBGRXNYVVRONWZOVnErOS9SOEpLUk5hc2xtU0xlQmppRG5OY2FTMGNMWjZ2SE9VTzRFVFZjQTYrYUNSY0lQajk3dzRaMy8rL2FKM1NhQTJNN1o5ejl6NjZGL2V1NU9qUm5FS1J3WjRhdFcwL2YzTFJQOWJobm5JaUZ0VWt1UzdZaUFtY2F6QmZKaHBYSUtnQ0VTQWZDVGxaK1FlUEhkUFh0MkhEOHl0MXNJZzVXejdSTTNYNy83OEdHTkdVMEpSTFBHUktWd01aSWtEY2JVTFNmSnRrT2ppbHBiZFdndkJrZ0JzS0ZFQUx3RkFQaGgvVW1IbmFsangzcFgvRnByN2xROTR4c1I3U09UOHp2UFFnQTRRQzFVa3pPK2Z2cnB5aUloZGN0Sk1zNElBSTJHRHUvZFlDa0FOdG5Bdm1YVVhVSzd6SHUrYkVZSWFkSDU3T3lwaHZkZEtCQXlZelFXN2RsR3JQcTNudzRXQ1VpUmtDUmJtVUJFUkVVb21aT0t3N29FU0FFd2N0WjJDUThlM0tkYUdaMmFVU0pvbXZsVFowSWVnb2lZNWtZRFluczZEOEhxMjAvck1GalpMYWROYWtreTB1cWhMd0JFRktMaXNzaXlYQ3A2bVJ2V29FNEJzQVg4MFNjR0krR0I3OS90ekV4RUlXQUVvRTVQblFxNXFuTU5vOUNDYndibm5LMG9FbURneW00NTVVR1NiSzQxUTE5OVZBdGU5Y3hTNlgySTRyejZLb2FoL2YzSldIamc0TjFPUkVWVkhDQys0dFNKL09TSFR0TTVVVzhDaHRpWXBFRDdEOFR1RndtcFcwNkFkQnZvUmxvNTlBVlFtQ3RkakpuUGlxNGRQWlYvNy9QUC90NVRIOXYxWGp2U3NzeUc5eWhRcEFBWVYvdjM3K3RORk5GYjJUU29FbUpPZXRLWWlrdFFWOGRBRllySmFkOS8rdWx5SHFSSTJKNVNBQXpYNnFGUFlkUWlpNVc2ckFpNlorRzU0N01mSzl6MDJkSWR1V2J1L2RuZVQvY2U1WWFjaDNTeXQ0dXZQTGN2dDByQkRBYW9tYW5RQjE5S1Y5V1pPWXFGV0xabkdqSDA5eXFuYm5uN1NBR3cvZ2FHdmpMYWtsZ2xxbFZQcmw5NjZRdWZ4MTNmdkhIUDI5R0Y3bzdldTJ2ZWY3Z3h4NWhzVjQ4Y3ZEZWlvc0JBaUppWk90SFNzeEZFY2tBc1JyaXEwWEwxSnJWenpjR3FiamtGd2xoSUFiQSt6ZzM5L3ErQUZoSXJBR1hQSHZ2emx6LzVqZXV1ZnFjOVdaMDhldTNKM282RjcrM0Z4bnpULy8rUE4wbVcvZk9CZStnTUtsQUJwRmlZUFBIeTlWZjl6Z3VhbThDSmFEUnJUQmlnRnExZUw2cnZVRjRSQ1NrUnRxUVVBQi9jd05CWEdIb2FnNmd2ZS9iWW54MysxTGR1dVBxZHliZXZYVmk0b3Z2YWJUL2IzSWsvWUpTT0pSa3huVTVuOHNQSGZMdmJ2R3BlVlFnQldTNWFjMFpJSlQwdEdrT3I3WEN1V0daOUUyb3FFcmFZRkFDWHBqLzBCWUo2VFovb2lWWE9hVkhxdGFjTy8zejZ4cTVPSGIxdWZtRzIrOXB0eDBacTZLODBxc2VWaktRSG5yN2JOeUFxbWlsTmpCUU5Gbm91TmltRXl3eWtWZTJaUElaVjI5UE9KVUVxRWtaVENvQmZiZlhRTjVoeFNTeUlhT3hSRzVrNkl6RlpMdmlxdDZNNHRpbHIrcGNxbmV6a3NqeDRjSytZQjBUZ3FVSlFsR1ZWNVQ0SDFJa25JaVcwSm53SXRuS1pxTjhmcEUxcW95RUZ3SVd0SHZvUVVrcGxBRmdzVlpwbG9zWklFQXg0OUw1WE52dHdMMWs2MmNrNisrcUIyNTA2Z1RqMWdPeWVuYnZuMXVjZlBuQUhuYVAzQ20rczFEUFBYVHhYSlBCOHc1eUtoRTJSQXVBOGdVcGRnMEVFcEZFTFpSUklXZUd4UDNuaFUwL2RjTlZQSjBqR3loNzd5eDl0OXVGZWxtMS9zcE1ocTkra05yL1lQakszQytvcFVpSE1XKy9YZFJLWk1Ib0JnMVY1QzRDc2VUdENpb1FOc3QwRFlHRG9nNGF1TURoMVpRbm5WTlJvUEZvWHViLzEzc2l1NlYrcTlDaUlaTGpXdmttdGMzRHZsR1JkQ2MyWVE4eU1HWkF0aExLVlU0VElRQXRXVExUN205UXdVQ1NrYmpsWkZ3TFZlbVVISWpER2lDNWljT0xLTG4zVGk5Y1k2WnpFYUkvKzhRdWJmYmhETVM1QmxteGwvL3JNbmRFN1V6SG5DREhTS1gzd2hRc1FLRExHRUZoTVRPVXgyS3BLT1hYTDYyUzdYQUVNRG4xVExZQW9aTEZVU1o2SmtJR2d4SURINzM5NXN3OTM2TWI2WkNkYjFpTUg3dzFpRkpwQUlEU0R4S29JbW52dm5NQUZDK3BpM3FpZmRyY3FFczUzeXlrUUx0bzRCOENhYi9yUVFoakZ0TmUxck9tZGl4WWpqYkd5eCs1N2RiTVBkME9OM2NsT3h0US9mT2VUNGxSVW5QTUF5cG4yL0MwMzdQNnZ3MUJ2UVFpU0lXOUNSTTZ2R2lFVkNSZHJ6QUpBUkVTeGN1aFRDbUYwa0RLWU9xOWlGa2lURVBqNDU1OGFqdThBQUFWYlNVUkJWSWI0dExVUk53NG5POW1HT3V4TXZYUE1ML1dhY3lmSnVqMk9vVXZuZ3ppbHFnQW1zVFdaTWE0SUFLUkl1TEF4Q0lDQm9SOHRHSllRbzRqMENqWWF1WE9FRVVBMFB2cW40Nys4Y3pHMjZzbE9rZ0VQUEgyM3FJbEFIS0Q5RzdmRGttREN2SHFGaDhXQU1ESGh6QVpYalZLM3ZFVUQ0TnpRRndDQ2FGRzBVQVlDM2NYQzV3MVJxeGNKUThTVG45dmF0MndPdzFZNjJVbHlTUjU0K201a0ZCWDFxaENTcWtGaUVkR0FRdWhKSTZwV3V4SEQ4bTYwZm5sd3Zsc2UzdXRZUjhvV0NvQ0JvUjhzUUhvQ0UyclZxM3llcTdNWWdobERGWis0LzQzTlB0NlJOdW9uTzBuVzBVTUg5eG9jSUJRUENFanhJSnlRZ0JNaUlqalB6THMxUmNMcTNXcGpaOFFEWUdEb1Y3RUNlaUlSME5oVHpVWFZHSTJFQmZ2NmZlbWIvc1VheFpPZEpCdm1hei80ZlpDQUNJVmdsc25NZEd2aHhBTEZHeUNteHRpWWNLQXNOd2ZqV1NTTVlBRFVRNytlK1JDVW9UQjJGWkgweFptcTBjN1ZFeWFrTU1qWDczdHhzNDkzU3hxVms1MGtvMkQvNi91NlM5MFlXWlFWb0NTY1dHNWxsN25MUE9naWFURzAyczdpaWxVallIQzMybGFMaEJFSmdJR2hYOFZLWFNreEV0WmRMSDBqRjZFRldrUXM3UnVkMXpmeFVNZERDb0FrK1dVZU9iaTNvb09xaVllb0dlb2lvWVJYelJ3MTBvekZSTHUxS2hJSUFMUit0N3k4VjIxMGJXSUFEQXo5WUZHMDU4eWlTWFdtY3BPWmVvdFZmMDMveWIvNjhRWWYzbmhMQVpBa2wrYWhnM3NqbEZDSUZ3aHA2cUNBaVdNa1JHbUJhcTFtYnJGZUwrci9NcmhiYlpSc2NBQU1EdjBZSUQyRmdkS3JKTXZVaVZscEZtbWxQZjQzYVUxL1dGSUFKTW5sZXVqN2R4RkNnbENTdTJmbjdyMzFoWC84OWlmUWNCUTFVVnBzTnAycTBnWldqVWFsVzk2QUFCZ1krcjJxQitrcGpkRlZpOGpiem5tYWdVUXdlZUl2MHByK1JrZ0JrQ1Ryak1RTGIzNWtZYW45NXZ0WDB6a0NCSW9TVFNGeWxmcnBGbUo1MDJQNXNnREE1bmJMUXdxQWdhRmZWSVhUc3Q2MmQzWXg1RTN2bEZZSm8xaUZKenRiNzNuNlcxMTZHbWlTckRNUkFFY0JBUDJXOHN2UDNPbkJLT0lpcVJEQXpPWi9jYXJaYm5qeEZLR0JxQ1ltbXpSWlhqV1NMZG90ci8ybUx5aFVnQ2l4VzBvclY0Y1FtR2RhOXNLMy9qb1Z1WnNwWFFFa3lTYjQwci85dHMrZHF2TlpYU1JRRkNGYTNzeGpqR293bzZnMVd3MHpZUG1OYVN1ZmFVR3U1eWExeTd3Q0dCejY1UkpZcU5DQ0ZHWjU1cDJBMFJoaElUNlJodjdJU0FHUUpDUGhxd2R1ZDk0QkVCR2FDYWtxQ0dhZVFoaVZpTjY3UE0vclRXcTExZDN5Qjc5RStBQUJJQ0tpL1psUGNyRThJK3lwU0ZWS1BCTWFNN2w2bU1HSVNIN3ovdGMrNEpFbHc1UUNJRWxHMU5jTzNFNGxBQXBJVklMVHNCa2drNnkrd1JScWVlWVVybjZMVmUwQ2I5bThDQmNaQUt1R1B0aXJGc0hDRVZWcFM2ZTdqZW1tT3JHU0ZzRFNudnJpVHk3cjM1OE1Yd3FBSk5rYU9nZjNOZ0FQYVVEcmZjc1VLVXZOc0tTNVZ6b1RSQXVOaGhjNEorN2NIK1JGRkFtL0pBQldEbjJqOWFvbG9ITENYcGZkMDkzMmJOTTVoQ0xFWUZVUi91TkxSNGI0WDVDc3R4UUFTYkpWZmZtWk94V1ZLcDBRNmdnYXBJZzZtYXVKc1NJWklhSFp5TXlnNHAxNjRNTDdsZ2NDUUVURTFUTWZJWWJLQ3JMeWdxclNrMmZLcVNubmhGVVJRbVdoQ1AvNWQyOXU1djlDY2hsU0FDVEorUGppZCsvSW5JalFDV2hHaTA3b0FxSVhVYkVvRUtwRGxtVXdxSjYvQ1REUDVKVTN1blB6SWM5Y3RCaXNNcG9nZUVWWnNOdERzd1ZWbGlWRFFLK00zL25iVk9TT2d4UUFTVExPSG56bWQwM3JoOTFKdmZZajRrTHBoZEVZSzVZUlhUSTBjdmZxRzBzL255dXl6Qm9Objhua3laN01USGl2akJWQ1JBajQ5M1NmL3RoSkFaQWsyOHRYdm4wWGFBQ05JYkFNcDl2aGYyNWJtUDN1TDA2ZWhtOHV4WlBxU1dTazd3WDVUbWQ3dlNOM3Uvay82a2VGNWtTcCtWMEFBQUFBU1VWT1JLNUNZSUk9IiBoZWlnaHQ9IjUxMiIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIvPjwvZz48L2c+PC9nPjwvc3ZnPg==',

      zoho_crm: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTAwMCIgem9vbUFuZFBhbj0ibWFnbmlmeSIgdmlld0JveD0iMCAwIDM3NTAgMzc0OS45OTk5NjciIGhlaWdodD0iNTAwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmVyc2lvbj0iMS4wIj48cGF0aCBmaWxsPSIjMDA2ZWI5IiBkPSJNIDI0ODIuNzAzMTI1IDI5NDEuNTYyNSBDIDIxOTkuODkwNjI1IDI5NDEuNTYyNSAxOTMzLjQ0OTIxOSAyODMyLjAxOTUzMSAxNzMyLjQ4MDQ2OSAyNjMzLjE1NjI1IEwgMTE0NS4xMTMyODEgMjA0NS44MDg1OTQgQyAxMDc2LjcyMjY1NiAxOTc3LjQxNzk2OSAxMDM5LjE5MTQwNiAxODg2LjQ2MDkzOCAxMDM5LjU0Mjk2OSAxNzg5Ljc3NzM0NCBDIDEwMzkuODk0NTMxIDE2OTMuMDkzNzUgMTA3Ny44OTA2MjUgMTYwMi4zNzUgMTE0Ni42MzI4MTIgMTUzNC40NDkyMTkgQyAxMjg3LjE2NDA2MiAxMzk1LjU2MjUgMTUxNS4yNTc4MTIgMTM5Ni4yNjE3MTkgMTY1NC45NjQ4NDQgMTUzNS45Njg3NSBMIDIxOTIuODc4OTA2IDIwNzMuODY3MTg4IEMgMjI1NS44OTQ1MzEgMjEzNi44Nzg5MDYgMjM1OC42NTYyNSAyMTM3LjExMzI4MSAyNDIxLjkwNjI1IDIwNzQuNDQ5MjE5IEMgMjQ1Mi44OTA2MjUgMjA0My44MjAzMTIgMjQ2OS45NTcwMzEgMjAwMy4wMTk1MzEgMjQ3MC4wNzQyMTkgMTk1OS40MTQwNjIgQyAyNDcwLjE5MTQwNiAxOTE1LjkyMTg3NSAyNDUzLjM1NTQ2OSAxODc0Ljg4NjcxOSAyNDIyLjQ5MjE4OCAxODQ0LjE0MDYyNSBMIDE4MzUuOTQ1MzEyIDEyNTcuNjA5Mzc1IEMgMTY3Mi4wMzUxNTYgMTA5NS40NTcwMzEgMTQ1NC4zNDc2NTYgMTAwNi4xMzY3MTkgMTIyMy41NjI1IDEwMDYuODM5ODQ0IEMgOTg4LjEwMTU2MiAxMDA3LjQyNTc4MSA3NjguMzA4NTk0IDEwOTkuODk4NDM4IDYwNC42MzI4MTIgMTI2Ny4xOTUzMTIgQyA0NDAuNzIyNjU2IDE0MzQuNzI2NTYyIDM1My4wMzkwNjIgMTY1Ni43MzQzNzUgMzU3LjcxNDg0NCAxODkyLjMwODU5NCBDIDM2Ni45NDkyMTkgMjM2MS4yMjY1NjIgNzU2LjI2NTYyNSAyNzQyLjgyMDMxMiAxMjI1LjU1MDc4MSAyNzQyLjgyMDMxMiBDIDEzMDkuNDkyMTg4IDI3NDIuODIwMzEyIDEzOTIuMzgyODEyIDI3MzAuODk0NTMxIDE0NzIgMjcwNy4zOTQ1MzEgQyAxNTI0LjYwOTM3NSAyNjkxLjg0NzY1NiAxNTc5LjkxMDE1NiAyNzIxLjg5MDYyNSAxNTk1LjMzOTg0NCAyNzc0LjUgQyAxNjEwLjg5MDYyNSAyODI3LjEwOTM3NSAxNTgwLjg0Mzc1IDI4ODIuNDA2MjUgMTUyOC4yMzQzNzUgMjg5Ny45NTcwMzEgQyAxNDMwLjM3ODkwNiAyOTI2LjgzMjAzMSAxMzI4LjU1MDc4MSAyOTQxLjU2MjUgMTIyNS41NTA3ODEgMjk0MS41NjI1IEMgNjQ4LjgyNDIxOSAyOTQxLjU2MjUgMTcwLjQyMTg3NSAyNDcyLjY0MDYyNSAxNTkuMDgyMDMxIDE4OTYuMjgxMjUgQyAxNTMuMzUxNTYyIDE2MDYuOTMzNTk0IDI2MS4xNDQ1MzEgMTMzNC4xODM1OTQgNDYyLjU4NTkzOCAxMTI4LjMwODU5NCBDIDY2My45MDYyNSA5MjIuNTUwNzgxIDkzMy45NzI2NTYgODA4Ljc5Njg3NSAxMjIzLjA5Mzc1IDgwOC4yMTA5MzggQyAxNTA1LjQzNzUgODA3LjUxMTcxOSAxNzc0LjIxNDg0NCA5MTcuMDU0Njg4IDE5NzUuODkwNjI1IDExMTYuNjE3MTg4IEwgMjU2My4wMTk1MzEgMTcwMy43MzQzNzUgQyAyNjMxLjQxNDA2MiAxNzcyLjI0MjE4OCAyNjY5LjA1ODU5NCAxODYzLjE5NTMxMiAyNjY4LjgyNDIxOSAxOTU5Ljk5NjA5NCBDIDI2NjguNTg5ODQ0IDIwNTYuNzk2ODc1IDI2MzAuNDc2NTYyIDIxNDcuNjM2NzE5IDI1NjEuNzM0Mzc1IDIyMTUuNjc1NzgxIEMgMjQyMC45NzI2NTYgMjM1NC45MTQwNjIgMjE5Mi41MjczNDQgMjM1NC4zMzIwMzEgMjA1Mi40NjQ4NDQgMjIxNC4yNzM0MzggTCAxNTE0LjU1NDY4OCAxNjc2LjM3NSBDIDE0NTEuNzczNDM4IDE2MTMuNTk3NjU2IDEzNDkuNDc2NTYyIDE2MTMuMzYzMjgxIDEyODYuMzQzNzUgMTY3NS42NzU3ODEgQyAxMjU1LjQ4MDQ2OSAxNzA2LjE4NzUgMTIzOC40MTAxNTYgMTc0Ni44NzEwOTQgMTIzOC4yOTI5NjkgMTc5MC4zNjMyODEgQyAxMjM4LjE3NTc4MSAxODMzLjczNDM3NSAxMjU1LjAxMTcxOSAxODc0LjY1MjM0NCAxMjg1LjY0MDYyNSAxOTA1LjI4NTE1NiBMIDE4NzIuNDIxODc1IDI0OTIuMTY3OTY5IEMgMjAzNS43NDYwOTQgMjY1My43MzQzNzUgMjI1Mi42MTcxODggMjc0Mi45MzM1OTQgMjQ4Mi43MDMxMjUgMjc0Mi45MzM1OTQgQyAyOTYwLjg3MTA5NCAyNzQyLjkzMzU5NCAzMzUwLjMwNDY4OCAyMzUzLjk4MDQ2OSAzMzUwLjc2OTUzMSAxODc1LjgyNDIxOSBDIDMzNTEuMDAzOTA2IDE2NDQuMTA5Mzc1IDMyNjAuNzUgMTQyNS45NTcwMzEgMzA5Ni42MDU0NjkgMTI2MS41ODU5MzggQyAyOTMyLjQ2MDkzOCAxMDk3LjIxMDkzOCAyNzE0LjQyMTg3NSAxMDA2LjcyMjY1NiAyNDgyLjcwMzEyNSAxMDA2LjcyMjY1NiBDIDI0MDguODEyNSAxMDA2LjcyMjY1NiAyMzM1LjUwNzgxMiAxMDE1Ljk2MDkzOCAyMjY0LjY2MDE1NiAxMDM0LjMxMjUgQyAyMjU0LjM3MTA5NCAxMDM3LjAwMzkwNiAyMjQ0LjA4NTkzOCAxMDM5LjgwODU5NCAyMjMzLjkxNDA2MiAxMDQyLjg0NzY1NiBDIDIxODEuMzA0Njg4IDEwNTguNTE1NjI1IDIxMjYuMDAzOTA2IDEwMjguNTg1OTM4IDIxMTAuMzM1OTM4IDk3Ni4wOTM3NSBDIDIwOTQuNjcxODc1IDkyMy40ODQzNzUgMjEyNC42MDE1NjIgODY4LjE4NzUgMjE3Ny4wOTM3NSA4NTIuNTE5NTMxIEMgMjE4OS42MDU0NjkgODQ4Ljc4MTI1IDIyMDIuMjMwNDY5IDg0NS4yNzM0MzggMjIxNC44NTU0NjkgODQyIEMgMjMwMS44Mzk4NDQgODE5LjU1MDc4MSAyMzkxLjk3NjU2MiA4MDguMDkzNzUgMjQ4Mi41ODU5MzggODA4LjA5Mzc1IEMgMjc2Ny4zODI4MTIgODA4LjA5Mzc1IDMwMzUuMzQzNzUgOTE5LjI3NzM0NCAzMjM3LjAxNTYyNSAxMTIxLjE3NTc4MSBDIDM0MzguNjg3NSAxMzIzLjA3ODEyNSAzNTQ5LjYzNjcxOSAxNTkxLjE0ODQzOCAzNTQ5LjI4NTE1NiAxODc1Ljk0MTQwNiBDIDM1NDguNzAzMTI1IDI0NjMuNTIzNDM4IDMwNzAuMDY2NDA2IDI5NDEuNDQ1MzEyIDI0ODIuNTg1OTM4IDI5NDEuNDQ1MzEyIFogTSAyNDgyLjcwMzEyNSAyOTQxLjU2MjUgIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==',

      zoho_books: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTAwMCIgem9vbUFuZFBhbj0ibWFnbmlmeSIgdmlld0JveD0iMCAwIDM3NTAgMzc0OS45OTk5NjciIGhlaWdodD0iNTAwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmVyc2lvbj0iMS4wIj48cGF0aCBmaWxsPSIjMjI2ZGI0IiBkPSJNIDI1NTcuNjM2NzE5IDM1MjEuNjY3OTY5IEwgMzA3LjgyODEyNSAzNTIxLjY2Nzk2OSBDIDI1NC41NjY0MDYgMzUyMS42Njc5NjkgMjExLjI5Njg3NSAzNDc4LjUxNTYyNSAyMTEuMjk2ODc1IDM0MjUuMTQwNjI1IEwgMjExLjI5Njg3NSAyNjA3LjcwMzEyNSBDIDIxMS4yOTY4NzUgMjQyOS4xODM1OTQgMzI0Ljc1IDIyNzAuMTkxNDA2IDQ5My42MTcxODggMjIxMi4yNzM0MzggTCAyOTg3LjAxOTUzMSAxMzU2LjQ1MzEyNSBDIDMxODEuMTAxNTYyIDEyODkuNzkyOTY5IDMzMTEuNTg1OTM4IDExMDcuMDY2NDA2IDMzMTEuNTg1OTM4IDkwMS44NTU0NjkgQyAzMzExLjU4NTkzOCA2MzYuNzk2ODc1IDMwOTUuOTI5Njg4IDQyMS4yNTM5MDYgMjgzMC45ODQzNzUgNDIxLjI1MzkwNiBMIDQwNC4yNDIxODggNDIxLjI1MzkwNiBMIDQwNC4yNDIxODggMjAxMy4wODIwMzEgQyA0MDQuMjQyMTg4IDIwNjYuMzQzNzUgMzYxLjA4OTg0NCAyMTA5LjYxMzI4MSAzMDcuNzE0ODQ0IDIxMDkuNjEzMjgxIEMgMjU0LjMzOTg0NCAyMTA5LjYxMzI4MSAyMTEuMTgzNTk0IDIwNjYuNDU3MDMxIDIxMS4xODM1OTQgMjAxMy4wODIwMzEgTCAyMTEuMTgzNTk0IDMyNC44MzU5MzggQyAyMTEuMTgzNTk0IDI3MS41NzQyMTkgMjU0LjMzOTg0NCAyMjguMzA4NTk0IDMwNy43MTQ4NDQgMjI4LjMwODU5NCBMIDI4MzEuMDk3NjU2IDIyOC4zMDg1OTQgQyAzMjAyLjU2MjUgMjI4LjMwODU5NCAzNTA0LjY0NDUzMSA1MzAuNTAzOTA2IDM1MDQuNjQ0NTMxIDkwMS44NTU0NjkgQyAzNTA0LjY0NDUzMSAxMTg5LjUxNTYyNSAzMzIxLjgwNDY4OCAxNDQ1LjYwMTU2MiAzMDQ5LjcwNzAzMSAxNTM4Ljk1MzEyNSBMIDU1Ni4zMDQ2ODggMjM5NC43NzM0MzggQyA0NjUuMzM5ODQ0IDI0MjYuMDAzOTA2IDQwNC4yNDIxODggMjUxMS41MTU2MjUgNDA0LjI0MjE4OCAyNjA3LjcwMzEyNSBMIDQwNC4yNDIxODggMzMyOC42MDkzNzUgTCAyNTU3LjUyMzQzOCAzMzI4LjYwOTM3NSBDIDI3NTguOTg0Mzc1IDMzMjguNjA5Mzc1IDI5NDguMjk2ODc1IDMyNTAuMTM2NzE5IDMwOTAuNzAzMTI1IDMxMDcuNzI2NTYyIEMgMzIzMy4xMTMyODEgMjk2NS4zMjAzMTIgMzMxMS41ODU5MzggMjc3Ni4wMDc4MTIgMzMxMS41ODU5MzggMjU3NC41NDI5NjkgQyAzMzExLjU4NTkzOCAyNDMyLjAxOTUzMSAzMjcxLjM4MjgxMiAyMjkyLjkwNjI1IDMxOTUuNDEwMTU2IDIxNzIuNDE0MDYyIEMgMzEyMC4yMzA0NjkgMjA1My4wNTg1OTQgMzAxMy41OTM3NSAxOTU3LjY2NDA2MiAyODg2Ljk3MjY1NiAxODk2LjIyNjU2MiBDIDI4MzkuMDQ2ODc1IDE4NzIuOTQ1MzEyIDI4MTkuMDU4NTk0IDE4MTUuMjUzOTA2IDI4NDIuMzM5ODQ0IDE3NjcuMzI4MTI1IEMgMjg2NS42MjEwOTQgMTcxOS40MDYyNSAyOTIzLjMxMjUgMTY5OS40MTc5NjkgMjk3MS4yMzQzNzUgMTcyMi42OTkyMTkgQyAzMTMwLjIyMjY1NiAxNzk5LjgwODU5NCAzMjY0LjExNzE4OCAxOTE5LjczNDM3NSAzMzU4LjYwMTU2MiAyMDY5LjYzNjcxOSBDIDM0NTQuMTA5Mzc1IDIyMjEuMDE5NTMxIDM1MDQuNTMxMjUgMjM5NS42Nzk2ODggMzUwNC41MzEyNSAyNTc0LjY1NjI1IEMgMzUwNC41MzEyNSAyODI3LjU2NjQwNiAzNDA2LjA3MDMxMiAzMDY1LjQ4MDQ2OSAzMjI3LjA5Mzc1IDMyNDQuMzQ3NjU2IEMgMzA0OC40NTcwMzEgMzQyMy4wOTc2NTYgMjgxMC41NDI5NjkgMzUyMS42Njc5NjkgMjU1Ny42MzY3MTkgMzUyMS42Njc5NjkgWiBNIDI1NTcuNjM2NzE5IDM1MjEuNjY3OTY5ICIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBmaWxsPSIjMjI2ZGI0IiBkPSJNIDEyOTYuODUxNTYyIDE1NzguNDcyNjU2IEMgMTA4NC4wMzUxNTYgMTU3OC40NzI2NTYgOTEwLjk2NDg0NCAxNDA1LjQwMjM0NCA5MTAuOTY0ODQ0IDExOTIuNTgyMDMxIEMgOTEwLjk2NDg0NCA5NzkuNzYxNzE5IDEwODQuMDM1MTU2IDgwNi42OTE0MDYgMTI5Ni44NTE1NjIgODA2LjY5MTQwNiBDIDE1MDkuNjcxODc1IDgwNi42OTE0MDYgMTY4Mi43NDIxODggOTc5Ljc2MTcxOSAxNjgyLjc0MjE4OCAxMTkyLjU4MjAzMSBDIDE2ODIuNzQyMTg4IDE0MDUuNDAyMzQ0IDE1MDkuNjcxODc1IDE1NzguNDcyNjU2IDEyOTYuODUxNTYyIDE1NzguNDcyNjU2IFogTSAxMjk2Ljg1MTU2MiA5OTkuNjM2NzE5IEMgMTE5MC40NDUzMTIgOTk5LjYzNjcxOSAxMTAzLjkxMDE1NiAxMDg2LjE3MTg3NSAxMTAzLjkxMDE1NiAxMTkyLjU4MjAzMSBDIDExMDMuOTEwMTU2IDEyOTguOTkyMTg4IDExOTAuNDQ1MzEyIDEzODUuNTI3MzQ0IDEyOTYuODUxNTYyIDEzODUuNTI3MzQ0IEMgMTQwMy4yNjE3MTkgMTM4NS41MjczNDQgMTQ4OS43OTY4NzUgMTI5OC45OTIxODggMTQ4OS43OTY4NzUgMTE5Mi41ODIwMzEgQyAxNDg5Ljc5Njg3NSAxMDg2LjE3MTg3NSAxNDAzLjI2MTcxOSA5OTkuNjM2NzE5IDEyOTYuODUxNTYyIDk5OS42MzY3MTkgWiBNIDEyOTYuODUxNTYyIDk5OS42MzY3MTkgIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGZpbGw9IiMyMjZkYjQiIGQ9Ik0gMjI2NC4zMDA3ODEgMjk0MS4yNDIxODggQyAyMDUxLjQ4NDM3NSAyOTQxLjI0MjE4OCAxODc4LjQxNDA2MiAyNzY4LjE3MTg3NSAxODc4LjQxNDA2MiAyNTU1LjM1MTU2MiBDIDE4NzguNDE0MDYyIDIzNDIuNTMxMjUgMjA1MS40ODQzNzUgMjE2OS40NjA5MzggMjI2NC4zMDA3ODEgMjE2OS40NjA5MzggQyAyNDc3LjEyMTA5NCAyMTY5LjQ2MDkzOCAyNjUwLjE5MTQwNiAyMzQyLjUzMTI1IDI2NTAuMTkxNDA2IDI1NTUuMzUxNTYyIEMgMjY1MC4xOTE0MDYgMjc2OC4xNzE4NzUgMjQ3Ny4xMjEwOTQgMjk0MS4yNDIxODggMjI2NC4zMDA3ODEgMjk0MS4yNDIxODggWiBNIDIyNjQuMzAwNzgxIDIzNjIuMjkyOTY5IEMgMjE1Ny44OTQ1MzEgMjM2Mi4yOTI5NjkgMjA3MS4zNTU0NjkgMjQ0OC44MjgxMjUgMjA3MS4zNTU0NjkgMjU1NS4yMzgyODEgQyAyMDcxLjM1NTQ2OSAyNjYxLjY0ODQzOCAyMTU3Ljg5NDUzMSAyNzQ4LjE4MzU5NCAyMjY0LjMwMDc4MSAyNzQ4LjE4MzU5NCBDIDIzNzAuNzEwOTM4IDI3NDguMTgzNTk0IDI0NTcuMjQ2MDk0IDI2NjEuNjQ4NDM4IDI0NTcuMjQ2MDk0IDI1NTUuMjM4MjgxIEMgMjQ1Ny4yNDYwOTQgMjQ0OC44MjgxMjUgMjM3MC43MTA5MzggMjM2Mi4yOTI5NjkgMjI2NC4zMDA3ODEgMjM2Mi4yOTI5NjkgWiBNIDIyNjQuMzAwNzgxIDIzNjIuMjkyOTY5ICIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4=',

      zoho_desk: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTAwMCIgem9vbUFuZFBhbj0ibWFnbmlmeSIgdmlld0JveD0iMCAwIDM3NTAgMzc0OS45OTk5NjciIGhlaWdodD0iNTAwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmVyc2lvbj0iMS4wIj48cGF0aCBmaWxsPSIjMDg5OTQ5IiBkPSJNIDYyNy41NzAzMTIgMzYxMi40MTQwNjIgQyA2MDguMzk4NDM4IDM2MTIuNDE0MDYyIDU4OC4wMjczNDQgMzYwNi40MjE4NzUgNTcxLjI1IDM1OTUuNjQwNjI1IEMgNTM3LjY5OTIxOSAzNTc0LjA3MDMxMiA1MjAuOTI1NzgxIDM1MzQuNTMxMjUgNTI2LjkxNzk2OSAzNDk0Ljk4ODI4MSBMIDgxOC4wODk4NDQgMTcwNi4wMzUxNTYgQyA4MzMuNjY3OTY5IDE2MTAuMTc1NzgxIDg4Mi43OTI5NjkgMTUyMy45MDYyNSA5NTUuODg2NzE5IDE0NjEuNTk3NjU2IEMgMTAyOC45ODA0NjkgMTM5OS4yODkwNjIgMTEyMy42NDA2MjUgMTM2NC41NDI5NjkgMTIxOS41IDEzNjQuNTQyOTY5IEwgMjQxOC45NDUzMTIgMTM2NC41NDI5NjkgTCAyNDg2LjA0Njg3NSA5NTMuNTUwNzgxIEwgMjM3My40MTAxNTYgOTUzLjU1MDc4MSBDIDIzMjMuMDg1OTM4IDk1My41NTA3ODEgMjI3Ni4zNTE1NjIgOTMxLjk4MDQ2OSAyMjQ0IDg5My42MzY3MTkgQyAyMjExLjY0ODQzOCA4NTUuMjk2ODc1IDIxOTcuMjY5NTMxIDgwNi4xNjc5NjkgMjIwNS42NTYyNSA3NTcuMDM5MDYyIEwgMjI4Mi4zNDM3NSAyODEuMzQzNzUgQyAyMjk1LjUyMzQzOCAxOTguNjY3OTY5IDIzNjYuMjIyNjU2IDEzOC43NTM5MDYgMjQ1MC4wOTc2NTYgMTM4Ljc1MzkwNiBMIDI4OTcuMDQyOTY5IDEzOC43NTM5MDYgQyAzMDE2Ljg2NzE4OCAxMzguNzUzOTA2IDMxMjkuNTAzOTA2IDE5MS40NzY1NjIgMzIwNy4zOTA2MjUgMjgyLjU0Mjk2OSBDIDMyODUuMjczNDM4IDM3My42MDkzNzUgMzMxOC44MjQyMTkgNDkzLjQyOTY4OCAzMjk5LjY1MjM0NCA2MTIuMDU0Njg4IEwgMzExOS45MTc5NjkgMTcxOS4yMTQ4NDQgQyAzMTExLjUzMTI1IDE3NjcuMTQ0NTMxIDMwODMuOTY4NzUgMTgxMC4yODEyNSAzMDQyLjAzMTI1IDE4MzYuNjQwNjI1IEwgMjAzNy45MDIzNDQgMjQ1Ni4xMjUgQyAxOTc2Ljc5Mjk2OSAyNDkzLjI2OTUzMSAxODk4LjkwNjI1IDI0ODkuNjc1NzgxIDE4NDIuNTg5ODQ0IDI0NDQuMTQ0NTMxIEwgMTM3NS4yNzM0MzggMjA3MS40OTYwOTQgQyAxMzMwLjkzNzUgMjAzNi43NDYwOTQgMTMyMy43NSAxOTcyLjA0Mjk2OSAxMzU5LjY5NTMxMiAxOTI4LjkwNjI1IEMgMTM5NC40NDUzMTIgMTg4NC41NzAzMTIgMTQ1OS4xNDg0MzggMTg3Ny4zODI4MTIgMTUwMi4yODkwNjIgMTkxMy4zMjgxMjUgTCAxOTUxLjYyODkwNiAyMjcxLjU5NzY1NiBMIDI5MjIuMjA3MDMxIDE2NzAuMDg5ODQ0IEwgMzA5OS41NDY4NzUgNTc4LjUwMzkwNiBDIDMxMDkuMTMyODEyIDUxOS43OTI5NjkgMzA5Mi4zNTU0NjkgNDU5Ljg3ODkwNiAzMDU0LjAxNTYyNSA0MTQuMzQ3NjU2IEMgMzAxNS42Njc5NjkgMzY4LjgxNjQwNiAyOTU5LjM1MTU2MiAzNDIuNDUzMTI1IDI4OTkuNDQxNDA2IDM0Mi40NTMxMjUgTCAyNDgxLjI1MzkwNiAzNDIuNDUzMTI1IEwgMjQxNS4zNDc2NTYgNzQ5Ljg1MTU2MiBMIDI1MjYuNzg1MTU2IDc0OS44NTE1NjIgQyAyNTc3LjExMzI4MSA3NDkuODUxNTYyIDI2MjMuODQzNzUgNzcxLjQxNzk2OSAyNjU2LjE5NTMxMiA4MDkuNzYxNzE5IEMgMjY4OC41NTA3ODEgODQ4LjEwNTQ2OSAyNzAyLjkyOTY4OCA4OTcuMjM0Mzc1IDI2OTQuNTM5MDYyIDk0Ni4zNTkzNzUgTCAyNjE2LjY1NjI1IDE0MjQuNDUzMTI1IEMgMjYwMy40NzI2NTYgMTUwNy4xMjg5MDYgMjUzMi43NzczNDQgMTU2Ny4wNDI5NjkgMjQ0OC44OTg0MzggMTU2Ny4wNDI5NjkgTCAxMjE5LjUgMTU2Ny4wNDI5NjkgQyAxMTE4Ljg0NzY1NiAxNTY3LjA0Mjk2OSAxMDM0Ljk3MjY1NiAxNjM4LjkzMzU5NCAxMDE4LjE5NTMxMiAxNzM4LjM4NjcxOSBMIDc2Mi45Njg3NSAzMzA2Ljg2NzE4OCBMIDExMjEuMjQ2MDk0IDMwODUuMTk1MzEyIEMgMTE0Ny42MDU0NjkgMzA2OC40MTc5NjkgMTE3OC43NjE3MTkgMzA2MC4wMzEyNSAxMjExLjExMzI4MSAzMDYwLjAzMTI1IEwgMjUyMy4xOTE0MDYgMzA2MC4wMzEyNSBDIDI2MjMuODQzNzUgMzA2MC4wMzEyNSAyNzA3LjcyMjY1NiAyOTg4LjEzNjcxOSAyNzI0LjQ5NjA5NCAyODg4LjY4MzU5NCBMIDI4MDUuOTc2NTYyIDIzODYuNjI4OTA2IEMgMjgxNS41NjI1IDIzMzEuNTA3ODEyIDI4NjcuMDg1OTM4IDIyOTMuMTY3OTY5IDI5MjIuMjA3MDMxIDIzMDIuNzUzOTA2IEMgMjk3Ny4zMjgxMjUgMjMxMi4zMzk4NDQgMzAxNS42NzE4NzUgMjM2My44NjMyODEgMzAwNi4wODU5MzggMjQxOC45ODA0NjkgTCAyOTI0LjYwMTU2MiAyOTIxLjAzOTA2MiBDIDI5MDkuMDI3MzQ0IDMwMTYuODk0NTMxIDI4NTkuODk4NDM4IDMxMDMuMTY3OTY5IDI3ODYuODA0Njg4IDMxNjUuNDc2NTYyIEMgMjcxMy43MTA5MzggMzIyNy43ODUxNTYgMjYxOS4wNTA3ODEgMzI2Mi41MzEyNSAyNTIzLjE5MTQwNiAzMjYyLjUzMTI1IEwgMTIxOS41IDMyNjIuNTMxMjUgTCA2ODAuMjkyOTY5IDM1OTYuODM1OTM4IEMgNjY0LjcxNDg0NCAzNjA3LjYyMTA5NCA2NDUuNTQyOTY5IDM2MTIuNDE0MDYyIDYyNy41NzAzMTIgMzYxMi40MTQwNjIgWiBNIDYyNy41NzAzMTIgMzYxMi40MTQwNjIgIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==',

      zoho_expense: '/images/zoho-expense-512.png',

      zoho_one: '/images/zohoone-512.png',

      zoho: '/images/zoho-logo-512.png',

      quickbooks: '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="26" fill="#2CA01C"/><text x="32" y="42" font-family="Arial Black, sans-serif" font-size="24" font-weight="900" fill="#FFF" text-anchor="middle" letter-spacing="-1">qb</text></svg>'
    };

    // --- 13 PIECES with their group memberships (in CYCLE ORDER) ---
    var GROUP_NAMES = {
      1: 'Retail & Commerce',
      2: 'AI Operations',
      3: 'Finance & Audit',
      4: 'Sales & Service',
      5: 'The Full Stack'
    };

    var PIECES_DATA = [
      // key, label, groups[]  (groups in ascending order = cycle order), brand color for glow
      { key:'shopify',      label:'Shopify',          groups:[1],          color:'#95BF47' },
      { key:'zoho_crm',     label:'Zoho CRM',         groups:[1, 4],       color:'#E42527' },
      { key:'google',       label:'Google Workspace', groups:[1, 4, 5],    color:'#4285F4' },
      { key:'quickbooks',   label:'QuickBooks',       groups:[1, 3],       color:'#2CA01C' },
      { key:'claude',       label:'Claude AI',        groups:[1, 2, 4, 5], color:'#D97757' },
      { key:'chatgpt',      label:'ChatGPT',          groups:[2, 4, 5],    color:'#10A37F' },
      { key:'gemini',       label:'Gemini',           groups:[2, 5],       color:'#9168C0' },
      { key:'zoho_books',   label:'Zoho Books',       groups:[1, 3],       color:'#089949' },
      { key:'mirror',       label:'Mirror Advisors',  groups:[2, 5],       color:'#ECA934' },
      { key:'zoho_one',     label:'Zoho One',         groups:[3, 4, 5],    color:'#FF6B35' },
      { key:'zoho_desk',    label:'Zoho Desk',        groups:[4],          color:'#226DB4' },
      { key:'zoho_expense', label:'Zoho Expense',     groups:[3],          color:'#F7931E' },
      { key:'zoho',         label:'Zoho',             groups:[5],          color:'#E42527' }
    ];

    // --- PER-GROUP PUZZLE LAYOUTS ---
    // Each group is its own self-contained sub-puzzle with its own grid.
    // grid: {cols, rows} — number of columns/rows in the sub-grid.
    // positions: array of {key, c, r} mapping each group member to its (col, row).
    var GROUP_LAYOUTS = {
      1: { // Retail & Commerce — 6 pieces, 3×2 grid
        cols: 3, rows: 2,
        positions: [
          { key:'shopify',    c:0, r:0 },
          { key:'zoho_crm',   c:1, r:0 },
          { key:'google',     c:2, r:0 },
          { key:'quickbooks', c:0, r:1 },
          { key:'claude',     c:1, r:1 },
          { key:'zoho_books', c:2, r:1 }
        ]
      },
      2: { // AI Operations — 4 pieces, 2×2 grid
        cols: 2, rows: 2,
        positions: [
          { key:'claude',  c:0, r:0 },
          { key:'chatgpt', c:1, r:0 },
          { key:'gemini',  c:0, r:1 },
          { key:'mirror',  c:1, r:1 }
        ]
      },
      3: { // Finance & Audit — 4 pieces, 2×2 grid
        cols: 2, rows: 2,
        positions: [
          { key:'quickbooks',   c:0, r:0 },
          { key:'zoho_books',   c:1, r:0 },
          { key:'zoho_expense', c:0, r:1 },
          { key:'zoho_one',     c:1, r:1 }
        ]
      },
      4: { // Sales & Service — 6 pieces, 3×2 grid
        cols: 3, rows: 2,
        positions: [
          { key:'zoho_crm',  c:0, r:0 },
          { key:'zoho_desk', c:1, r:0 },
          { key:'google',    c:2, r:0 },
          { key:'chatgpt',   c:0, r:1 },
          { key:'claude',    c:1, r:1 },
          { key:'zoho_one',  c:2, r:1 }
        ]
      },
      5: { // The Full Stack — 6 pieces, 3×2 grid
        cols: 3, rows: 2,
        positions: [
          { key:'zoho',   c:0, r:0 },
          { key:'mirror', c:1, r:0 },
          { key:'claude', c:2, r:0 },
          { key:'chatgpt',c:0, r:1 },
          { key:'google', c:1, r:1 },
          { key:'gemini', c:2, r:1 }
        ]
      }
    };

    // --- Per-group sizing & positioning ---
    // Pieces interlock when piece body = cell size. Piece body is 100/144 = 69.44% of the
    // rendered piece (which includes 22-unit tab padding on each side of the 100x100 body).
    var BODY_FRAC = 100 / 144; // = 0.6944
    var GRID_MAX_W = 70;       // max % of stage the grid area can occupy
    var GRID_MAX_H = 70;

    function groupMetrics(groupId){
      var layout = GROUP_LAYOUTS[groupId];
      if(!layout) return null;
      // Square cell that fits both width & height constraints
      var cellSize = Math.min(GRID_MAX_W / layout.cols, GRID_MAX_H / layout.rows);
      var gridW = cellSize * layout.cols;
      var gridH = cellSize * layout.rows;
      return {
        layout: layout,
        cellSize: cellSize,         // % of stage — also = piece BODY size on stage
        pieceSize: cellSize / BODY_FRAC,  // % of stage — actual rendered piece size (body + tabs)
        gridLeft: (100 - gridW) / 2,
        gridTop:  (100 - gridH) / 2
      };
    }

    function assembledPositionForGroup(groupId, key) {
      var m = groupMetrics(groupId);
      if(!m) return null;
      var pos = m.layout.positions.find(function(p){ return p.key === key; });
      if(!pos) return null;
      return {
        x: m.gridLeft + m.cellSize * pos.c + m.cellSize / 2,
        y: m.gridTop  + m.cellSize * pos.r + m.cellSize / 2,
        size: m.pieceSize
      };
    }

    // --- Compute jigsaw edges for a piece within a specific group's grid ---
    function edgeH(c, r) { return ((c*7 + r*13) % 2) === 0 ? 1 : -1; }
    function edgeV(c, r) { return ((c*11 + r*5) % 2) === 0 ? 1 : -1; }
    function getEdgesInGroup(groupId, key) {
      var layout = GROUP_LAYOUTS[groupId];
      var pos = layout.positions.find(function(p){ return p.key === key; });
      if(!pos) return { top:0, right:0, bottom:0, left:0 };
      var COLS = layout.cols, ROWS = layout.rows;
      return {
        top:    pos.r === 0      ? 0 : edgeH(pos.c, pos.r),
        bottom: pos.r === ROWS-1 ? 0 : -edgeH(pos.c, pos.r+1),
        left:   pos.c === 0      ? 0 : edgeV(pos.c, pos.r),
        right:  pos.c === COLS-1 ? 0 : -edgeV(pos.c+1, pos.r)
      };
    }

    function buildPiecePath(edges) {
      var W = 100, H = 100, T = 18;
      function knob(side, sign) {
        var len = (side === 'top' || side === 'bottom') ? W : H;
        var s = len * 0.35, e = len * 0.65;
        var sweep = sign > 0 ? 1 : 0;
        if (side === 'top')    return 'L ' + s + ' 0 A ' + ((e-s)/2) + ' ' + T + ' 0 0 ' + sweep + ' ' + e + ' 0 ';
        if (side === 'right')  return 'L ' + W + ' ' + s + ' A ' + T + ' ' + ((e-s)/2) + ' 0 0 ' + sweep + ' ' + W + ' ' + e + ' ';
        if (side === 'bottom') return 'L ' + e + ' ' + H + ' A ' + ((e-s)/2) + ' ' + T + ' 0 0 ' + sweep + ' ' + s + ' ' + H + ' ';
                               return 'L 0 ' + e + ' A ' + T + ' ' + ((e-s)/2) + ' 0 0 ' + sweep + ' 0 ' + s + ' ';
      }
      var d = 'M 0 0 ';
      d += edges.top    === 0 ? 'L ' + W + ' 0 '         : (knob('top',    edges.top)    + 'L ' + W + ' 0 ');
      d += edges.right  === 0 ? 'L ' + W + ' ' + H + ' ' : (knob('right',  edges.right)  + 'L ' + W + ' ' + H + ' ');
      d += edges.bottom === 0 ? 'L 0 ' + H + ' '         : (knob('bottom', edges.bottom) + 'L 0 ' + H + ' ');
      d += edges.left   === 0 ? 'L 0 0 '                 : (knob('left',   edges.left)   + 'L 0 0 ');
      return d + 'Z';
    }

    // Scatter positions — hand-tuned for an aesthetic "tossed-from-the-box" look.
    // Pieces are spread across the ENTIRE stage including the middle, with deliberate
    // irregularity (no rows/columns), varied spacing, and overlap-tolerant placement.
    // Piece width is ~24%, so center spacing of ~18-22% feels naturally close without colliding.
    var SCATTER_POSITIONS = [
      { x: 14, y: 12 },   // top-left
      { x: 38, y:  8 },   // top, left-of-center
      { x: 64, y: 14 },   // top, right-of-center
      { x: 87, y:  9 },   // top-right
      { x: 11, y: 36 },   // mid-left
      { x: 34, y: 32 },   // middle, slightly left & up
      { x: 58, y: 38 },   // middle, slightly right
      { x: 84, y: 33 },   // mid-right
      { x: 22, y: 62 },   // lower-left of center
      { x: 50, y: 60 },   // dead center-ish
      { x: 76, y: 64 },   // lower-right of center
      { x: 35, y: 87 },   // bottom-left
      { x: 70, y: 89 }    // bottom-right
    ];

    // Piece display size — sized for sub-grid pieces in groups (max cols=3, max rows=2)
    // Use the largest group (cols=3 → cell width = 64/3 ≈ 21.33%) × 1.35 for tab overhang
    var BASE_CELL = 64 / 3;       // ~21.33% width (in group grid)
    var PIECE_W_PCT = BASE_CELL * 1.35;   // ~28.8%
    var PIECE_H_PCT = (64 / 2) * 1.35;    // ~43.2% — but we want square-ish, so we use width as height for compact pieces
    // Actually for visual consistency use the same dimension for w and h:
    PIECE_W_PCT = 24; // % of stage width — fixed compact size
    PIECE_H_PCT = 24; // % of stage height (stage is square 4:4)
    var VB_PAD = 22;

    // Clean any prior pieces (preserve label)
    Array.prototype.forEach.call(stage.querySelectorAll('.puzzle-piece'), function(el){ el.remove(); });

    // --- RENDER PIECES ---
    // Each piece is built with multiple cached paths (one per group it belongs to).
    // When we switch groups, we swap which path is shown.
    var pieceEls = {};  // key -> element
    PIECES_DATA.forEach(function(pdata, idx){
      var btn = document.createElement('button');
      btn.className = 'puzzle-piece';
      btn.dataset.key = pdata.key;
      btn.dataset.groups = pdata.groups.join(',');
      btn.dataset.cycleIdx = '0';  // which group index is currently shown (0 = first in groups[])
      btn.setAttribute('aria-label', pdata.label);
      btn.title = pdata.label;
      if(pdata.color) btn.style.setProperty('--brand', pdata.color);

      // Scatter position
      var sct = SCATTER_POSITIONS[idx % SCATTER_POSITIONS.length];
      // Hand-tuned rotations — varied, not symmetrical, feels naturally tossed
      var SCATTER_ROTATIONS = [-12, 18, -7, 23, -19, 11, -25, 8, 16, -14, 22, -9, 14];
      var rot = SCATTER_ROTATIONS[idx % SCATTER_ROTATIONS.length];
      btn.dataset.sx = sct.x; btn.dataset.sy = sct.y;
      btn.dataset.rot = rot;

      btn.style.width  = PIECE_W_PCT + '%';
      btn.style.height = PIECE_H_PCT + '%';

      // Pre-compute and cache each group's path D
      pdata.groups.forEach(function(g){
        var edges = getEdgesInGroup(g, pdata.key);
        btn.dataset['pathG' + g] = buildPiecePath(edges);
      });
      // Default path = first group's path (so it has a shape while scattered too)
      var initialPathD = btn.dataset['pathG' + pdata.groups[0]];

      // Build logo
      var logoHTML;
      if (pdata.key === 'mirror' && mirrorImgSrc) {
        // Wide logo (~4.4:1 aspect). The piece body is 100×100 and the
        // jigsaw tabs (T=18) extend INWARD on adjacent pieces between
        // y=35 and y=65 — so neighbouring pieces (Zoho on the left,
        // Claude on the right) cover x=0-18 and x=82-100 of this piece
        // at the wordmark's vertical position. Shrink the logo into the
        // safe central zone (x=18 to x=82) so adjacent tabs no longer
        // overlap the "MIRROR" / "ADVISORS" lettering.
        logoHTML = '<image class="pp-logo-img" href="' + mirrorImgSrc.replace(/"/g,'&quot;') + '" x="18" y="34" width="64" height="32" preserveAspectRatio="xMidYMid meet"/>';
      } else {
        var brandSvg = LOGOS[pdata.key];
        if(!brandSvg){
          logoHTML = '<circle class="pp-logo-img" cx="50" cy="50" r="12" fill="#ECA934"/>';
        } else if(brandSvg.indexOf('data:') === 0 || brandSvg.charAt(0) === '/'){
          // Data URL or absolute /-rooted path — render as SVG <image>.
          // Zoho brand logos (zoho, zoho_one) get more room than app-level icons.
          var isBrand = (pdata.key === 'zoho' || pdata.key === 'zoho_one');
          var lx = isBrand ? 12 : 20;
          var lw = isBrand ? 76 : 60;
          logoHTML = '<image class="pp-logo-img" href="' + brandSvg.replace(/"/g,'&quot;') + '" x="' + lx + '" y="' + lx + '" width="' + lw + '" height="' + lw + '" preserveAspectRatio="xMidYMid meet"/>';
        } else {
          var vbMatch = brandSvg.match(/viewBox="([^"]+)"/);
          var vbAttr  = vbMatch ? ' viewBox="' + vbMatch[1] + '"' : '';
          logoHTML = brandSvg.replace(/^<svg[^>]*>/, '<svg' + vbAttr + ' x="20" y="20" width="60" height="60" preserveAspectRatio="xMidYMid meet" class="pp-logo-img">');
        }
      }

      var vbMin = -VB_PAD;
      var vbSize = 100 + 2 * VB_PAD;
      btn.innerHTML =
        '<svg class="pp-svg" viewBox="' + vbMin + ' ' + vbMin + ' ' + vbSize + ' ' + vbSize + '" xmlns="http://www.w3.org/2000/svg">' +
          '<path class="pp-path" d="' + initialPathD + '"/>' +
          logoHTML +
        '</svg>';

      stage.appendChild(btn);
      pieceEls[pdata.key] = btn;
    });

    // --- STATE & HELPERS ---
    var activeGroup = 0;     // 0 = neutral (scattered, no group active)
    var activePieceKey = ''; // which piece was last clicked (for cycle tracking)

    var DEFAULT_PIECE_SIZE = PIECE_W_PCT; // scatter & dimmed size

    function setScatter(el){
      el.style.left = el.dataset.sx + '%';
      el.style.top  = el.dataset.sy + '%';
      el.style.width  = DEFAULT_PIECE_SIZE + '%';
      el.style.height = DEFAULT_PIECE_SIZE + '%';
      el.style.setProperty('--rot', el.dataset.rot + 'deg');
      el.classList.remove('is-snapped', 'is-dimmed');
      var firstG = (el.dataset.groups || '').split(',')[0];
      if(firstG){
        var pathEl = el.querySelector('.pp-path');
        if(pathEl) pathEl.setAttribute('d', el.dataset['pathG' + firstG]);
      }
    }
    function setDimmed(el){
      el.style.left = el.dataset.sx + '%';
      el.style.top  = el.dataset.sy + '%';
      el.style.width  = DEFAULT_PIECE_SIZE + '%';
      el.style.height = DEFAULT_PIECE_SIZE + '%';
      el.style.setProperty('--rot', el.dataset.rot + 'deg');
      el.classList.remove('is-snapped');
      el.classList.add('is-dimmed');
    }
    function setSnapped(el, pos, pathD){
      el.style.left = pos.x + '%';
      el.style.top  = pos.y + '%';
      if(pos.size){
        el.style.width  = pos.size + '%';
        el.style.height = pos.size + '%';
      }
      el.style.setProperty('--rot', '0deg');
      el.classList.remove('is-dimmed');
      el.classList.add('is-snapped');
      var pathEl = el.querySelector('.pp-path');
      if(pathEl && pathD) pathEl.setAttribute('d', pathD);
    }

    function setHeaderText(text){
      if(headerText) headerText.textContent = text;
    }
    function setCycle(current, total){
      if(!cycleEl) return;
      if(total > 1){
        cycleEl.style.display = 'inline-flex';
        if(cycleCurrent) cycleCurrent.textContent = current;
        if(cycleTotal) cycleTotal.textContent = total;
      } else {
        cycleEl.style.display = 'none';
      }
    }
    function showLabel(text){
      // Legacy stub: drives header text (label element is hidden via CSS)
      setHeaderText(text);
    }
    function hideLabel(){
      // Restore the hint, with smart copy after first interaction
      setHeaderText(hasInteracted ? HINT_AFTER_FIRST : HINT_DEFAULT);
      setCycle(0, 0);
    }

    function showGroup(groupId, cycleCurrentNum, cycleTotalNum){
      activeGroup = groupId;
      var layout = GROUP_LAYOUTS[groupId];
      if(!layout) return;

      // Build set of keys in this group
      var inGroup = {};
      layout.positions.forEach(function(p){ inGroup[p.key] = true; });

      // Update each piece
      Object.keys(pieceEls).forEach(function(key){
        var el = pieceEls[key];
        if(inGroup[key]){
          var pos = assembledPositionForGroup(groupId, key);
          var pathD = el.dataset['pathG' + groupId];
          setSnapped(el, pos, pathD);
        } else {
          setDimmed(el);
        }
      });

      setHeaderText(GROUP_NAMES[groupId]);
      setCycle(cycleCurrentNum || 1, cycleTotalNum || 1);
      root.classList.add('is-active');
    }

    function showNeutral(){
      activeGroup = 0;
      activePieceKey = '';
      Object.keys(pieceEls).forEach(function(key){
        var el = pieceEls[key];
        el.dataset.cycleIdx = '0';
        setScatter(el);
      });
      setHeaderText(hasInteracted ? HINT_AFTER_FIRST : HINT_DEFAULT);
      setCycle(0, 0);
      root.classList.remove('is-active');
    }

    // --- INITIAL STATE: all scattered ---
    showNeutral();

    // --- CLICK HANDLERS ---
    stage.addEventListener('click', function(e){
      var p = e.target.closest('.puzzle-piece');

      // Click on empty stage → return to neutral
      if(!p){
        if(activeGroup !== 0) showNeutral();
        return;
      }

      hasInteracted = true;

      var groups = (p.dataset.groups || '').split(',').filter(Boolean).map(Number);
      if(!groups.length) return;

      var key = p.dataset.key;

      // Determine which group to show
      var nextCycleIdx;
      if(activePieceKey === key && activeGroup !== 0){
        // Same piece clicked again — advance cycle
        var currentIdx = parseInt(p.dataset.cycleIdx, 10) || 0;
        nextCycleIdx = currentIdx + 1;
        if(nextCycleIdx >= groups.length){
          // Past the end → return to neutral
          showNeutral();
          return;
        }
      } else {
        // Different piece (or coming from neutral) — start at its first group
        Object.keys(pieceEls).forEach(function(k){
          if(k !== key) pieceEls[k].dataset.cycleIdx = '0';
        });
        nextCycleIdx = 0;
      }

      p.dataset.cycleIdx = nextCycleIdx;
      activePieceKey = key;
      // Pass cycle position to the header (1-indexed for display)
      showGroup(groups[nextCycleIdx], nextCycleIdx + 1, groups.length);
    });

    // Escape returns to neutral
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && activeGroup !== 0){
        showNeutral();
      }
    });

    // --- HOVER: show piece name in header pill when neutral ---
    var hoverResetTimer = null;
    stage.addEventListener('mouseover', function(e){
      var p = e.target.closest('.puzzle-piece');
      if(!p) return;
      if(activeGroup !== 0) return; // only when neutral
      var key = p.dataset.key;
      var pd = PIECES_DATA.filter(function(x){ return x.key === key; })[0];
      if(!pd) return;
      if(hoverResetTimer){ clearTimeout(hoverResetTimer); hoverResetTimer = null; }
      setHeaderText(pd.label);
      setCycle(0, 0);
    });
    stage.addEventListener('mouseout', function(e){
      var p = e.target.closest('.puzzle-piece');
      if(!p) return;
      if(activeGroup !== 0) return;
      // Small delay so quick hover-jumps between pieces don't flicker
      hoverResetTimer = setTimeout(function(){
        if(activeGroup === 0){
          setHeaderText(hasInteracted ? HINT_AFTER_FIRST : HINT_DEFAULT);
          setCycle(0, 0);
        }
      }, 120);
    });

  })();

};
_INIT.services=function(){
var _paths=[
  {t:'ERP Projects',s:'Implementation',c:'var(--bl)',bc:'rgba(107,159,212,.25)',bg:'rgba(107,159,212,.06)',ic:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',d:'Full-lifecycle ERP project delivery with defined milestones, a dedicated team, and a go-live commitment.',tm:'3-18 months',pr:'Project-Based',w:'Scope reveals you need a full ERP replacement, multi-entity deployment, or major data migration.'},
  {t:'Infinity Mirror',s:'Subscription Dev',c:'var(--t)',bc:'rgba(236,169,52,.25)',bg:'rgba(236,169,52,.06)',ic:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',d:'A continuous development partnership. Monthly retainer, rolling priorities, no SOW friction.',tm:'Monthly rolling',pr:'Retainer',w:'Scope shows ongoing development needs and a consistent trusted team is better than one-off projects.'},
  {t:'Bank of Hours',s:'Prepaid Blocks',c:'rgba(247,247,249,.7)',bc:'rgba(255,255,255,.15)',bg:'rgba(255,255,255,.04)',ic:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>',d:'Pre-purchase development hours at a locked rate for the specific items Scope identified.',tm:'Flexible',pr:'Prepaid',w:'Scope identifies a clear list of discrete tasks that can be executed in blocks.'},
  {t:'Support Only',s:'Maintenance SLA',c:'rgba(247,247,249,.7)',bc:'rgba(255,255,255,.15)',bg:'rgba(255,255,255,.04)',ic:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.92 3.33A2 2 0 0 1 3.9 1.17h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.94 5.94l1.2-1.17a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',d:'Dedicated SLA for systems already live. Monitoring, bug fixes, and proactive uptime management.',tm:'Ongoing',pr:'SLA-Based',w:"Scope confirms systems are live and you need a reliable partner on call."},
];
var _routes={'ERP Projects':"go('erp')",'Infinity Mirror':"go('infinity')",'Bank of Hours':"go('bankhours')",'Support Only':"go('support')"};
var _pg=document.getElementById('pathsGrid');
if(_pg){
  _pg.innerHTML=_paths.map(function(p){
    var rt=_routes[p.t]||'';
    return '<div class="path-card" style="--path-color:'+p.c+';--path-border:'+p.bc+';--path-bg:'+p.bg+';cursor:pointer" onclick="'+rt+'">'
      +'<div class="path-card-top"><div class="path-icon" style="color:'+p.c+'">'+p.ic+'</div></div>'
      +'<div class="path-title">'+p.t+'</div><div class="path-subtitle">'+p.s+'</div>'
      +'<p class="path-desc">'+p.d+'</p>'
      +'<div class="path-when"><div class="path-when-label">Scope recommends this when</div><div class="path-when-text">'+p.w+'</div></div>'
      +'<div class="path-meta"><div class="path-meta-item"><span class="path-meta-k">Duration</span><span class="path-meta-v" style="color:'+p.c+'">'+p.tm+'</span></div>'
      +'<div class="path-meta-item"><span class="path-meta-k">Pricing</span><span class="path-meta-v" style="color:'+p.c+'">'+p.pr+'</span></div></div>'
    +'</div>';
  }).join('');
}
var _faqs=[
  {q:"Do I really have to start with Scope?",a:"Yes, for new clients, always. Without a proper blueprint we would be building on assumptions."},
  {q:"How long does Scope take and what does it cost?",a:"Scope runs 2-4 weeks, priced as a fixed fee based on your company size. You know the number before we start."},
  {q:"What if I already know what I need?",a:"Scope will confirm it or refine it. Clients often discover targeted automations solve 80% of the problem at a fraction of the cost."},
  {q:"Can I do Bank of Hours without Scope first?",a:"For returning clients yes. For new clients, Scope is required so we are not flying blind."},
  {q:"What if Scope shows we are not a fit?",a:"We tell you honestly. We would rather lose a project than deliver the wrong solution."},
];
var _fl=document.getElementById('faqList');
if(_fl){
  _fl.innerHTML=_faqs.map(function(f,i){
    return '<div class="fi" id="f'+i+'"><div class="fq" onclick="tf('+i+')"><span class="fqt">'+f.q+'</span><div class="ficon">+</div></div><div class="fa"><div style="padding:0 24px 20px;font-size:14px;color:var(--mid);line-height:1.75">'+f.a+'</div></div></div>';
  }).join('');
}
}
_INIT.capabilities=function(){
  // Capabilities page merged into Services. Redirect to preserve old links.
  setTimeout(function(){ go('services'); }, 0);
};
_INIT.cases=function(){

function _getCatColors(cat){
  var map={
    'AI Integration':   {tc:'rgba(236,169,52,.12)',tt:'#ECA934'},
    'ERP Deployment':   {tc:'rgba(107,159,212,.12)',tt:'#6B9FD4'},
    'Systems Integration':{tc:'rgba(139,159,212,.12)',tt:'#8B9FD4'},
    'AI + Analytics':   {tc:'rgba(236,169,52,.12)',tt:'#ECA934'},
    'Consulting':       {tc:'rgba(107,159,212,.12)',tt:'#6B9FD4'},
  };
  return map[cat]||{tc:'rgba(255,255,255,.1)',tt:'var(--tx)'};
}

function _renderCaseCard(c,idx){
  var cols=_getCatColors(c.cat);
  var tc=c.tc||cols.tc; var tt=c.tt||cols.tt;
  return '<div class="ccard" onclick="go(\'case_'+idx+'\')" style="cursor:pointer">'
    +'<div class="cc-img" style="background:'+(c.gc||'rgba(255,255,255,.04)')+'"><div class="cc-img-glyph" style="color:'+tt+'">'+(c.glyph||'?')+'</div><div class="cc-img-overlay"></div></div>'
    +'<div class="cc-body">'
    +'<span class="cc-tag" style="background:'+tc+';color:'+tt+'">'+c.cat+'</span>'
    +'<div class="cc-title">'+c.title+'</div>'
    +'<div class="cc-desc">'+c.desc+'</div>'
    +'<div class="cc-metrics"><div><div class="cc-m-val">'+c.m1+'</div><div class="cc-m-lbl">'+c.ml1+'</div></div><div><div class="cc-m-val">'+c.m2+'</div><div class="cc-m-lbl">'+c.ml2+'</div></div></div>'
    +'<div class="cc-read">Read case study <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>'
    +'</div></div>';
}

window.renderCases=function(cat){
  var grid=document.getElementById('caseGrid');
  if(!grid)return;
  var visible = window._CASES.filter(function(c){ return !c.hidden; });
  var filtered=(cat&&cat!=='All')?visible.filter(function(c){return c.cat===cat;}):visible;
  if(!filtered.length){
    grid.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--dim)">No case studies in this category yet.</div>';
    return;
  }
  grid.innerHTML=filtered.map(function(c,i){
    var realIdx=window._CASES.indexOf(c);
    return _renderCaseCard(c,realIdx);
  }).join('');
};

window.filter=function(cat){
  document.querySelectorAll('.fb').forEach(function(b){b.classList.toggle('act',b.textContent===cat);});
  window.renderCases(cat);
};

// Renders the "Featured Case Study" section on the home page. Driven entirely
// by window._CASES — picks the case marked `featured:true`, falling back to
// the first non-hidden case if none are explicitly marked.
window._renderFeaturedCase = function(){
  var el = document.getElementById('featuredCase');
  if(!el) return;
  var cases = window._CASES || [];
  var featured = null;
  for(var i=0;i<cases.length;i++){
    if(cases[i] && cases[i].featured && !cases[i].hidden){ featured = cases[i]; break; }
  }
  if(!featured){
    for(var j=0;j<cases.length;j++){
      if(cases[j] && !cases[j].hidden){ featured = cases[j]; break; }
    }
  }
  if(!featured){
    el.innerHTML = '<div style="padding:40px;color:var(--dim);text-align:center;grid-column:1/-1">No case studies yet.</div>';
    return;
  }
  var idx = cases.indexOf(featured);
  var tagColors = [
    {bg:'rgba(236,169,52,.1)', bd:'rgba(236,169,52,.2)', fg:'var(--t)'},
    {bg:'rgba(107,159,212,.1)', bd:'rgba(107,159,212,.2)', fg:'#6B9FD4'},
    {bg:'rgba(139,159,212,.1)', bd:'rgba(139,159,212,.2)', fg:'#8B9FD4'}
  ];
  var tags = [];
  if(featured.cat) tags.push(featured.cat);
  if(Array.isArray(featured.tags)) tags = tags.concat(featured.tags);
  tags = tags.filter(function(t,i,a){ return a.indexOf(t)===i; }).slice(0,3);
  var metrics = [];
  if(featured.m1) metrics.push({val:featured.m1, lbl:featured.ml1||''});
  if(featured.m2) metrics.push({val:featured.m2, lbl:featured.ml2||''});
  // Pull any extra "metrics" blocks the user added in the detail editor
  if(Array.isArray(featured.blocks)){
    featured.blocks.forEach(function(b){
      if(b && b.type==='metrics' && Array.isArray(b.items)){
        b.items.forEach(function(m){
          if(m && m.val && metrics.length<6) metrics.push({val:m.val, lbl:m.lbl||''});
        });
      }
    });
  }
  el.innerHTML = '<div class="feat-glow"></div>'
    + '<div style="position:relative;z-index:1">'
    +   '<div class="feat-label">Featured Case Study</div>'
    +   '<div class="feat-h">'+_esc(featured.title||'')+'</div>'
    +   '<p class="feat-p">'+_esc(featured.desc||'')+'</p>'
    +   '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px">'
    +     tags.map(function(t,i){
            var c = tagColors[i%tagColors.length];
            return '<span style="font-size:11px;padding:4px 10px;border-radius:100px;background:'+c.bg+';border:1px solid '+c.bd+';color:'+c.fg+';font-family:\'Montserrat\',sans-serif;font-weight:700">'+_esc(t)+'</span>';
          }).join('')
    +   '</div>'
    +   '<a href="#" onclick="go(\'case_'+idx+'\')"><button class="bp" style="font-size:13px;padding:11px 22px">View Case Study <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button></a>'
    + '</div>'
    + '<div style="position:relative;z-index:1">'
    +   '<div class="feat-metrics">'
    +     (metrics.length
            ? metrics.map(function(m){ return '<div class="fm"><div class="fm-val">'+_esc(m.val)+'</div><div class="fm-lbl">'+_esc(m.lbl)+'</div></div>'; }).join('')
            : '<div style="grid-column:1/-1;color:var(--dim);text-align:center;padding:24px;font-size:13px">No metrics yet.</div>')
    +   '</div>'
    + '</div>';
};

var cats=['All'];
window._CASES.forEach(function(c){if(cats.indexOf(c.cat)<0)cats.push(c.cat);});
var fb=document.getElementById('filterBar');
if(fb){fb.innerHTML=cats.map(function(c){return'<button class="fb '+(c==='All'?'act':'')+'" onclick="filter(\''+c+'\')">'+c+'</button>';}).join('');}
window.renderCases('All');
if(typeof window._renderFeaturedCase === 'function') window._renderFeaturedCase();

// ── ADMIN FUNCTIONS ────────────────────────────────────────────────────────────
}
_INIT.technology=function(){
// Curated list — only the Zoho apps Mirror Advisors actually deploys.
// Updated to the 16 apps approved by the team, plus two suite-level products
// (Zoho One and Zoho CRM Plus) which open their own detail pages.
var _ZOHO_GROUPS=[
  {cat:"Business Suites",apps:[
    {key:"one",     n:"One",     note:"All-in-one Zoho operating system (40+ apps)"},
    {key:"crmplus", n:"CRM Plus",note:"Unified customer experience platform"},
  ]},
  {cat:"Sales & Marketing",apps:[
    {key:"crm",       n:"CRM",      note:"Sales pipeline + customer lifecycle"},
    {key:"forms",     n:"Forms",    note:"Online forms + workflow builder"},
    {key:"salesiq",   n:"SalesIQ",  note:"Live chat + visitor intelligence"},
    {key:"campaigns", n:"Campaigns",note:"Email marketing + automation"},
    {key:"social",    n:"Social",   note:"Social media management"},
  ]},
  {cat:"Productivity & Collaboration",apps:[
    {key:"workdrive", n:"WorkDrive",note:"File storage + team collaboration"},
    {key:"writer",    n:"Writer",   note:"Document editor"},
    {key:"bookings",  n:"Bookings", note:"Appointment scheduling"},
    {key:"sign",      n:"Sign",     note:"E-signature + document workflow"},
    {key:"contracts", n:"Contracts",note:"Contract lifecycle management"},
  ]},
  {cat:"Finance",apps:[
    {key:"books",     n:"Books",    note:"Accounting + financial operations"},
    {key:"inventory", n:"Inventory",note:"Inventory + order management"},
  ]},
  {cat:"HR & Operations",apps:[
    {key:"desk",      n:"Desk",     note:"Customer support + helpdesk"},
  ]},
  {cat:"BI & Analytics",apps:[
    {key:"analytics", n:"Analytics",note:"BI + reporting"},
  ]},
  {cat:"Developer & Custom",apps:[
    {key:"creator",   n:"Creator",  note:"Low-code application platform"},
    {key:"flow",      n:"Flow",     note:"Workflow automation + iPaaS"},
  ]},
];
// Display name → routing key. Only the apps still in _ZOHO_GROUPS need to
// be listed here; legacy keys are kept for backwards-compat in case any
// other code path (chat tree, blog links, etc.) still references them, but
// they won't surface anywhere as long as they're not in _ZOHO_GROUPS.
var _zohoRoutes={"One":"zoho_one","CRM Plus":"zoho_crmplus","CRM":"zoho_crm","Bigin":"zoho_bigin","Forms":"zoho_forms","SalesIQ":"zoho_salesiq","Campaigns":"zoho_campaigns","Social":"zoho_social","Survey":"zoho_survey","Marketing Automation":"zoho_marketingplus","Sites":"zoho_sites","LandingPage":"zoho_landingpage","Backstage":"zoho_backstage","Webinar":"zoho_webinar","PageSense":"zoho_pagesense","Commerce":"zoho_commerce","Thrive":"zoho_thrive","Mail":"zoho_mail","Cliq":"zoho_cliq","Meeting":"zoho_meeting","WorkDrive":"zoho_workdrive","Writer":"zoho_writer","Sheet":"zoho_sheet","Show":"zoho_show","Notebook":"zoho_notebook","Connect":"zoho_connect","TeamInbox":"zoho_teaminbox","Bookings":"zoho_bookings","Sign":"zoho_sign","Learn":"zoho_learn","Lens":"zoho_lens","Contracts":"zoho_contracts","Vault":"zoho_vault","Books":"zoho_books","Invoice":"zoho_invoice","Expense":"zoho_expense","Inventory":"zoho_inventory","Billing":"zoho_billing","Checkout":"zoho_checkout","People":"zoho_people","Recruit":"zoho_recruit","Sprints":"zoho_sprints","Projects":"zoho_projects","Desk":"zoho_desk","Assist":"zoho_assist","Analytics":"zoho_analytics","DataPrep":"zoho_dataprep","Creator":"zoho_creator","Flow":"zoho_flow","Apptics":"zoho_apptics"};

// Detailed-but-concise one-liners surfaced via the delayed hover overlay
// (see .za-desc-wrap in styles/globals.css). Keep each ≤ ~15 words so it fits
// the small card without scrolling. Use simple, concrete language.
var _ZOHO_DESCS={
  // Sales & Marketing
  crm:"Full sales pipeline: leads, deals, accounts, and post-sale relationships in one workspace.",
  bigin:"Lightweight pipeline-first CRM for small teams. Setup in hours, not weeks.",
  forms:"Online forms that feed your CRM, sheets, and automation workflows.",
  salesiq:"Live chat with visitor tracking, lead scoring, and AI chatbots.",
  campaigns:"Email marketing with segmentation, A/B testing, and journey automation.",
  social:"Schedule and analyze posts across LinkedIn, X, Facebook, and Instagram.",
  survey:"Surveys, NPS programs, and feedback routed into your workflows.",
  marketingplus:"Unified hub for campaigns, social, events, and marketing analytics.",
  sites:"Drag-and-drop website builder with hosting and CRM-connected forms.",
  landingpage:"Focused landing pages with A/B testing and lead capture.",
  backstage:"End-to-end event management: ticketing, agendas, sponsors, and check-in.",
  webinar:"Webinars with registration, live engagement, analytics, and replay.",
  pagesense:"Heatmaps, session replays, and A/B testing for conversion lift.",
  commerce:"Full e-commerce storefront with payments, inventory, and CRM sync.",
  thrive:"Loyalty and affiliate programs with rewards, tiers, and referrals.",
  // Productivity & Collaboration
  mail:"Business email with shared mailboxes, calendar, and meetings built in.",
  cliq:"Team chat with channels, video calls, and Zoho-stack integrations.",
  meeting:"Browser-based video meetings and screen sharing — no install needed.",
  workdrive:"Team file storage with permissions, versioning, and native co-editing.",
  writer:"Online document editor with templates, e-signature, and document automation.",
  sheet:"Online spreadsheets with formulas, pivot tables, and Zoho data sync.",
  show:"Collaborative presentations with templates, animations, and remote control.",
  notebook:"Cross-device note capture: text, audio, sketches, and checklists.",
  connect:"Internal social network with groups, channels, and company announcements.",
  teaminbox:"Shared inbox for support@/sales@ with assignments and SLAs.",
  bookings:"Appointment scheduling with calendar sync, payments, and reminders.",
  sign:"Send and legally sign documents with audit trails and bulk workflows.",
  learn:"Learning management system for training, certifications, and onboarding.",
  lens:"Augmented-reality remote assistance for field service and tech support.",
  contracts:"Contract lifecycle: templates, redlines, approval routing, and storage.",
  vault:"Team password manager with role-based access and audit logs.",
  // Finance
  books:"Cloud accounting: invoicing, expenses, banking, and tax-ready reports.",
  invoice:"Invoicing with payment links, recurring billing, and a client portal.",
  expense:"Expense tracking with receipt scanning, mileage logs, and approvals.",
  inventory:"Inventory and order management with multi-warehouse, barcodes, and shipping.",
  billing:"Subscription billing for SaaS with usage-based pricing and revenue recognition.",
  checkout:"Hosted payment pages for one-time and recurring transactions.",
  // HR & Operations
  people:"HR core: employee records, time-off, performance reviews, and org charts.",
  recruit:"Applicant tracking with job posting, candidate pipelines, and offers.",
  sprints:"Agile management: backlogs, sprints, scrum boards, and burndown.",
  projects:"Project management with tasks, milestones, Gantt charts, and time tracking.",
  desk:"Customer support ticketing with multi-channel routing, SLAs, and knowledge base.",
  assist:"Remote support with screen sharing, file transfer, and unattended access.",
  // BI & Analytics
  analytics:"Self-serve BI: dashboards, data blending, and AI-assisted insights.",
  dataprep:"Visual data cleaning and transformation pipelines before analytics.",
  // Developer & Custom
  creator:"Low-code platform for custom internal apps with Deluge scripting.",
  flow:"Workflow automation across 800+ apps — Zoho's Zapier, native to the suite.",
  apptics:"Mobile and web analytics: crash reporting, event tracking, retention cohorts.",
  // Suites
  one:"The entire Zoho catalogue — 40+ integrated apps on one operating system, one bill, one identity. Best-value way to standardise your whole company on Zoho.",
  crmplus:"Unified customer-experience platform: CRM, Desk, SalesIQ, Campaigns, Social, Survey, Analytics, and more — one license, one shared customer record."
};

document.getElementById('zohoGrid').innerHTML=_ZOHO_GROUPS.map(function(g){
  var apps=g.apps.map(function(a){
    var pg=_zohoRoutes[a.n];
    var click=pg?'onclick="go(\''+pg+'\')"':'';
    var desc=_ZOHO_DESCS[a.key]||a.note||'';
    return '<div class="za" data-app-key="'+a.key+'" style="cursor:pointer" '+click+'>'
      +'<div class="za-text-wrap">'
        +'<div class="za-prefix">Zoho</div>'
        +'<div class="za-name">'+a.n+'</div>'
        +'<div class="za-note">'+a.note+'</div>'
      +'</div>'
      +'<div class="za-logo-wrap"><img class="za-logo" src="'+(window._ZOHO_LOGOS&&window._ZOHO_LOGOS[a.key]||'')+'" alt="Zoho '+a.n+' logo" loading="lazy"></div>'
      +'<div class="za-desc-wrap"><div class="za-desc">'+desc+'</div></div>'
    +'</div>';
  }).join('');
  return '<div class="zoho-cat-block">'
    +'<div class="zoho-cat-label">'+g.cat+'</div>'
    +'<div class="zoho-cat-grid">'+apps+'</div>'
    +'</div>';
}).join('');

const cats2=[
  {icon:'🤖',color:'rgba(0,196,204,.1)',bc:'rgba(0,196,204,.2)',ic:'#00C4CC',title:'AI & Automation',desc:'The intelligence layer. We build Claude-powered apps that automate reasoning, draft content, and manage workflows without human oversight.',tools:['Claude API','Anthropic SDK','RAG / Embeddings','MCP Protocol','n8n','Zoho Flow']},
  {icon:'🔗',color:'rgba(74,158,255,.1)',bc:'rgba(74,158,255,.2)',ic:'#4A9EFF',title:'Integration & APIs',desc:'How we connect your stack. Every tool we use is selected for reliability, documentation quality, and real-world performance in production.',tools:['REST / GraphQL','Webhooks','Zoho Flow','Custom ETL','Postman','Zapier (tactical)']},
  {icon:'📊',color:'rgba(167,139,250,.1)',bc:'rgba(167,139,250,.2)',ic:'#A78BFA',title:'Data & Analytics',desc:'From raw exports to live business intelligence. We build pipelines that turn your operational data into decisions.',tools:['Zoho Analytics','Google Looker','BigQuery','Python / Pandas','SQL','Metabase']},
  {icon:'💻',color:'rgba(245,158,11,.1)',bc:'rgba(245,158,11,.2)',ic:'#F59E0B',title:'Development',desc:'Custom code when the platform hits its limits. We build clean, documented solutions — not hacky workarounds.',tools:['JavaScript / Node','Python','Zoho Deluge','React','Next.js','REST APIs']},
  {icon:'☁️',color:'rgba(0,196,204,.1)',bc:'rgba(0,196,204,.2)',ic:'#00C4CC',title:'Cloud & Infrastructure',desc:'Where it all runs. We deploy on modern, scalable infrastructure with security and observability built in from the start.',tools:['AWS','Cloudflare','Vercel','GitHub Actions','Docker','Supabase']},
  {icon:'🔒',color:'rgba(167,139,250,.1)',bc:'rgba(167,139,250,.2)',ic:'#A78BFA',title:'Security & Compliance',desc:'We build with security-first principles. Access controls, audit trails, data encryption, and compliance frameworks are not afterthoughts.',tools:['Role-based access','Audit logging','SOC2 patterns','GDPR tooling','Encryption at rest','2FA enforcement']},
];
document.getElementById('stackCats').innerHTML=cats2.map(c=>`
<div class="stack-cat">
  <div class="sc-icon" style="background:${c.color};border:1px solid ${c.bc};font-size:22px">${c.icon}</div>
  <div class="sc-title">${c.title}</div>
  <div class="sc-desc">${c.desc}</div>
  <div class="sc-tools">${c.tools.map(t=>`<span class="sc-tool">${t}</span>`).join('')}</div>
</div>`).join('');
};
_INIT.stack=function(){ setTimeout(function(){ go("technology"); }, 0); };
_INIT.contact=function(){
  // Wire the services multi-select dropdown.
  // - Trigger click toggles .open on the wrapper
  // - Document click outside closes
  // - Checkbox change updates the trigger label (count of selected items)
  // - Idempotent via dataset flag so Next.js route re-renders don't double-bind.
  var wrap = document.getElementById('svcChips');
  if (!wrap || wrap.dataset.msBound === '1') return;
  wrap.dataset.msBound = '1';

  var trigger    = document.getElementById('svcTrigger');
  var triggerTxt = document.getElementById('svcTriggerText');
  var panel      = document.getElementById('svcPanel');
  if (!trigger || !triggerTxt || !panel) return;

  var checks = panel.querySelectorAll('input[data-svc]');

  function setOpen(open) {
    wrap.classList.toggle('open', open);
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function updateLabel() {
    var picked = Array.from(checks).filter(function (c) { return c.checked; }).map(function (c) { return c.value; });
    if (picked.length === 0)      triggerTxt.textContent = 'Select services…';
    else if (picked.length === 1) triggerTxt.textContent = picked[0];
    else if (picked.length <= 3)  triggerTxt.textContent = picked.join(', ');
    else                          triggerTxt.textContent = picked.length + ' services selected';
  }

  trigger.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!wrap.classList.contains('open'));
  });
  checks.forEach(function (c) { c.addEventListener('change', updateLabel); });
  // Close when clicking anywhere outside the dropdown.
  document.addEventListener('click', function (e) {
    if (!wrap.contains(e.target)) setOpen(false);
  });
  // Close on Esc when the trigger has focus.
  wrap.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setOpen(false); trigger.focus(); }
  });
  updateLabel();
};
_INIT.erp=function(){};
_INIT.infinity=function(){};
_INIT.bankhours=function(){};
_INIT.support=function(){};

_INIT.zoho_crm=function(){};
_INIT.zoho_books=function(){};
_INIT.zoho_analytics=function(){};
_INIT.zoho_flow=function(){};
_INIT.zoho_desk=function(){};
_INIT.zoho_sign=function(){};
_INIT.zoho_projects=function(){};
_INIT.zoho_inventory=function(){};
_INIT.zoho_people=function(){};
_INIT.zoho_recruit=function(){};
_INIT.zoho_expense=function(){};
_INIT.zoho_creator=function(){};
_INIT.zoho_bigin=function(){};
_INIT.zoho_forms=function(){};
_INIT.zoho_salesiq=function(){};
_INIT.zoho_campaigns=function(){};
_INIT.zoho_social=function(){};
_INIT.zoho_survey=function(){};
_INIT.zoho_marketingplus=function(){};
_INIT.zoho_sites=function(){};
_INIT.zoho_landingpage=function(){};
_INIT.zoho_backstage=function(){};
_INIT.zoho_webinar=function(){};
_INIT.zoho_pagesense=function(){};
_INIT.zoho_commerce=function(){};
_INIT.zoho_thrive=function(){};
_INIT.zoho_mail=function(){};
_INIT.zoho_cliq=function(){};
_INIT.zoho_meeting=function(){};
_INIT.zoho_workdrive=function(){};
_INIT.zoho_writer=function(){};
_INIT.zoho_sheet=function(){};
_INIT.zoho_show=function(){};
_INIT.zoho_notebook=function(){};
_INIT.zoho_connect=function(){};
_INIT.zoho_teaminbox=function(){};
_INIT.zoho_bookings=function(){};
_INIT.zoho_learn=function(){};
_INIT.zoho_lens=function(){};
_INIT.zoho_invoice=function(){};
_INIT.zoho_billing=function(){};
_INIT.zoho_checkout=function(){};
_INIT.zoho_sprints=function(){};
_INIT.zoho_assist=function(){};
_INIT.zoho_dataprep=function(){};
_INIT.zoho_apptics=function(){};

_INIT.zoho_contracts=function(){};
_INIT.zoho_vault=function(){};
_INIT.case_0=function(){};
_INIT.case_1=function(){};
_INIT.case_2=function(){};
_INIT.case_3=function(){};
_INIT.case_4=function(){};
_INIT.case_5=function(){};
_INIT.case_6=function(){};
_INIT.case_7=function(){};
_INIT.case_8=function(){};




// ── NAV PAGES CONFIG ─────────────────────────────────────────────────────────
window._NAV_PAGES = [
  { key:'services',   label:'Services',     enabled:true },
  { key:'cases',      label:'Case Studies', enabled:true },
  { key:'technology', label:'Technology',   enabled:true },
  { key:'about',      label:'About',        enabled:true },
  { key:'contact',    label:'Contact',      enabled:true },
];

window._CHAT_TREE = {
  opening: "Hi! I'm the Mirror Advisors assistant. What would you like to know?",
  fallback: "Looks like you might need a more specific answer. The best next step is a quick call — no commitment, just a conversation.",
  topics: [
    {
      id: "services",
      label: "Our Services",
      answer: "Mirror Advisors offers four engagement models — all starting with Scope. Which one would you like to know about?",
      choices: [
        { label: "What is Scope?", nodeId: "scope" },
        { label: "ERP Projects", nodeId: "erp" },
        { label: "Infinity Mirror", nodeId: "infinity" },
        { label: "Bank of Hours", nodeId: "bankhours" },
        { label: "Support Only", nodeId: "support" },
        { label: "Which is right for me?", nodeId: "recommend" }
      ]
    },
    {
      id: "casestudies",
      label: "Case Studies",
      answer: "We've delivered across multiple categories. Which type of results are you interested in?",
      choices: [
        { label: "AI Integration results", nodeId: "cs_ai" },
        { label: "ERP Deployment results", nodeId: "cs_erp" },
        { label: "Systems Integration results", nodeId: "cs_sys" },
        { label: "Consulting results", nodeId: "cs_consulting" }
      ]
    },
    {
      id: "howitworks",
      label: "How It Works",
      answer: "Every Mirror Advisors engagement follows a clear process. What would you like to know?",
      choices: [
        { label: "How does an engagement start?", nodeId: "hw_start" },
        { label: "What is the Scope process?", nodeId: "hw_scope" },
        { label: "How long does a project take?", nodeId: "hw_timeline" },
        { label: "Do you work with small businesses?", nodeId: "hw_size" },
        { label: "What happens after the project?", nodeId: "hw_after" }
      ]
    },
    {
      id: "technology",
      label: "The Technology",
      answer: "We build on two core platforms — Zoho One and Anthropic Claude AI. What would you like to know?",
      choices: [
        { label: "What is Zoho One?", nodeId: "tech_zoho" },
        { label: "What is Claude AI?", nodeId: "tech_claude" },
        { label: "Which Zoho apps do you deploy?", nodeId: "tech_apps" },
        { label: "Can you integrate existing tools?", nodeId: "tech_integrate" }
      ]
    },
    {
      id: "pricing",
      label: "Pricing & Engagement",
      answer: "Our pricing depends on the engagement model. What would you like to know?",
      choices: [
        { label: "How much does Scope cost?", nodeId: "price_scope" },
        { label: "How is Infinity Mirror priced?", nodeId: "price_infinity" },
        { label: "What is Bank of Hours?", nodeId: "price_boh" },
        { label: "Is there a minimum commitment?", nodeId: "price_min" }
      ]
    }
  ],
  nodes: {
    scope: { answer: "Scope is a fixed-fee discovery engagement. We audit your systems, interview stakeholders, map your business logic, and deliver a comprehensive technical blueprint — before a single line of code is written. Every Mirror Advisors engagement starts here, no exceptions.", choices: [] },
    erp: { answer: "ERP Projects is our full-lifecycle Zoho One deployment service. We handle architecture design, configuration, data migration, UAT, and go-live. Projects typically run 3–18 months depending on complexity.", choices: [] },
    infinity: { answer: "Infinity Mirror is a continuous development retainer. Monthly billing, rolling priorities, no SOW friction. We become your embedded technology team — building, iterating, and scaling at the exact pace your business demands. Cancel anytime with 30 days notice.", choices: [] },
    bankhours: { answer: "Bank of Hours lets you pre-purchase a block of senior development hours at a locked rate. Hours never expire. No project plan needed — brief us on the task, we size it in hours, you approve, we build.", choices: [] },
    support: { answer: "Support Only is a dedicated SLA for systems already live. We provide proactive monitoring, bug fixes, minor enhancements, and guaranteed response times based on issue severity.", choices: [] },
    recommend: { answer: "Let me help narrow it down. Are you starting fresh or do you already have systems in place?", choices: [
      { label: "Starting fresh — no systems yet", nodeId: "rec_fresh" },
      { label: "Have systems, need improvement", nodeId: "rec_existing" },
      { label: "Already live, need ongoing support", nodeId: "rec_live" }
    ]},
    rec_fresh: { answer: "If you're starting fresh, the best path is Scope first — then ERP Projects to build out your full Zoho One stack. Scope will give you a blueprint before any money is spent on development.", choices: [] },
    rec_existing: { answer: "If you have systems in place, start with Scope to audit what you have. Then either Infinity Mirror (if you want continuous improvement) or Bank of Hours (if you have specific tasks to execute).", choices: [] },
    rec_live: { answer: "If your systems are live and you need ongoing peace of mind, Support Only is designed exactly for that — SLA-backed monitoring, bug fixes, and minor enhancements as a monthly retainer.", choices: [] },
    cs_ai: { answer: "AI Integration highlights: A Claude sales agent cut response time 84% for a B2B SaaS company. An AI contract assistant reduced legal review time by 60%. An AI forecasting dashboard cut overstock by 31%.", choices: [] },
    cs_erp: { answer: "ERP Deployment highlights: Zoho One deployed across 7 PE subsidiaries with zero data loss. A manufacturer migrated 1.4 million records from a legacy ERP with zero downtime.", choices: [] },
    cs_sys: { answer: "Systems Integration highlights: A Shopify ↔ Zoho ↔ 3PL real-time sync achieved 99.7% uptime. A HubSpot ↔ Zoho Desk ↔ Slack pipeline improved resolution time by 68%.", choices: [] },
    cs_consulting: { answer: "Consulting highlights: A 90-day tech audit revealed $400k in savings with 14 automation opportunities, all implemented within 12 months. A real estate firm cut reporting time from 3 days to 4 hours.", choices: [] },
    hw_start: { answer: "Every engagement starts with a Strategy Session — a 30-minute call where we ask about your goals, your current stack, and what's not working. From there we scope the work and recommend an engagement model.", choices: [] },
    hw_scope: { answer: "The Scope engagement includes: a systems audit, stakeholder interviews, business logic mapping, and a comprehensive technical blueprint. It's fixed-fee and typically completed within 4–6 weeks.", choices: [] },
    hw_timeline: { answer: "Scope takes 4–6 weeks. ERP Projects run 3–18 months. Infinity Mirror is ongoing (month-to-month). Bank of Hours tasks are sized individually. Support Only is a continuous retainer.", choices: [] },
    hw_size: { answer: "Yes — we work with businesses from 10 to 500+ employees. Our sweet spot is growth-stage companies (20–200 people) that have outgrown spreadsheets but don't need enterprise-scale complexity.", choices: [] },
    hw_after: { answer: "After a project, you can move to Support Only for ongoing maintenance, Infinity Mirror for continuous development, or Bank of Hours for ad-hoc improvements. You're never locked in.", choices: [] },
    tech_zoho: { answer: "Zoho One is a unified business operating system — 40+ integrated apps covering CRM, accounting, analytics, HR, projects, inventory, and more. We deploy, configure, and extend it with custom AI and integrations.", choices: [] },
    tech_claude: { answer: "Claude is Anthropic's AI platform. We build custom Claude agents that connect directly to your Zoho apps — handling lead qualification, contract review, demand forecasting, document processing, and more.", choices: [] },
    tech_apps: { answer: "We deploy all 12 core Zoho apps: CRM, Books, Analytics, Flow, Desk, Sign, Projects, Inventory, People, Recruit, Expense, and Creator. Each is extended with custom AI agents and integrations.", choices: [] },
    tech_integrate: { answer: "Yes — we integrate Zoho with virtually any tool that has an API. Common integrations include Shopify, HubSpot, Amazon, Slack, and custom 3PL systems. We also build custom webhooks and middleware.", choices: [] },
    price_scope: { answer: "Scope is a fixed fee — the exact amount is scoped on a per-engagement basis depending on complexity. Book a Strategy Session and we'll give you a clear number within 24 hours.", choices: [] },
    price_infinity: { answer: "Infinity Mirror is a monthly retainer. The amount depends on the volume of development capacity you need. It's discussed during the Scope engagement and confirmed before any work begins.", choices: [] },
    price_boh: { answer: "Bank of Hours is purchased in blocks at a locked hourly rate. The rate is fixed at the time of purchase and never increases. Hours never expire. Blocks start from a minimum number of hours discussed during Scope.", choices: [] },
    price_min: { answer: "The only commitment is the Scope engagement to start. After that, ERP Projects have a defined SOW, Infinity Mirror is month-to-month (cancel with 30 days notice), and Bank of Hours has no time commitment at all.", choices: [] }
  }
};


// ── ADMIN STATE ──────────────────────────────────────────────────────────────
var _adminAuth     = false;
var _adminMode     = null; // 'cases' | 'chatbot'
var _adminIdx      = -1;
var _adminTab      = 'card';
var _adminDirty    = false;
var _adminBlocks   = [];
var _adminCardMedia  = null;
var _adminDetailMedia = null;
// When the user clicks Remove on the card image, we want the next Save to
// persist that absence — NOT silently fall back to the existing case's image.
// This flag is reset every time a new case is opened in the editor.
var _adminCardMediaCleared = false;
var _dragSrcIdx    = -1;
var _adminCreds    = { user: 'MAAdmin1', pass: 'MA20262027!' };
var _subAdminCreds = []; // [{user:'', pass:'', name:''}]
var _adminRole     = 'admin'; // 'admin' or 'subadmin'

var _CATEGORY_COLORS = {
  'AI Integration':      {tc:'rgba(236,169,52,.12)',  tt:'#ECA934', gc:'rgba(236,169,52,.08)'},
  'ERP Deployment':      {tc:'rgba(107,159,212,.12)', tt:'#6B9FD4', gc:'rgba(107,159,212,.07)'},
  'Systems Integration': {tc:'rgba(139,159,212,.12)', tt:'#8B9FD4', gc:'rgba(139,159,212,.07)'},
  'AI + Analytics':      {tc:'rgba(236,169,52,.12)',  tt:'#ECA934', gc:'rgba(236,169,52,.07)'},
  'Consulting':          {tc:'rgba(107,159,212,.12)', tt:'#6B9FD4', gc:'rgba(107,159,212,.06)'},
};
var _GLYPHS = {'AI Integration':'AI','ERP Deployment':'ERP','Systems Integration':'INT','AI + Analytics':'ML','Consulting':'SC'};
var _ACCENT_COLORS = ['#ECA934','#6B9FD4','#8B9FD4','#4CAF50','#F06292','#4DD0E1','#FFB74D','#AED581','#CE93D8','#FFFFFF'];

function _adminToast(msg){
  var t=document.getElementById('adminToast');
  if(!t)return;
  t.textContent=msg;t.classList.add('show');
  setTimeout(function(){t.classList.remove('show');},2200);
}

// ── OPEN / CLOSE ─────────────────────────────────────────────────────────────

window.adminAddSubAdmin = function(){
  var u    = document.getElementById('subAdminUser').value.trim();
  var p    = document.getElementById('subAdminPass').value;
  var errEl = document.getElementById('subAdminErr');
  if(errEl) errEl.style.display = 'none';
  if(!u || !p){
    if(errEl){ errEl.textContent = 'Both username and password are required.'; errEl.style.display='block'; }
    return;
  }
  if(u === _adminCreds.user || _subAdminCreds.find(function(s){ return s.user===u; })){
    if(errEl){ errEl.textContent = 'That username already exists.'; errEl.style.display='block'; }
    return;
  }
  _subAdminCreds.push({ user:u, pass:p });
  document.getElementById('subAdminUser').value = '';
  document.getElementById('subAdminPass').value = '';
  adminRenderSubAdminList();
  _adminToast('Sub-admin "'+u+'" added \u2713');
};

window.adminRemoveSubAdmin = function(idx){
  if(!confirm('Remove sub-admin "'+_subAdminCreds[idx].user+'"?')) return;
  _subAdminCreds.splice(idx,1);
  adminRenderSubAdminList();
  _adminToast('Sub-admin removed \u2713');
};

function adminRenderSubAdminList(){
  var el = document.getElementById('subAdminList');
  if(!el) return;
  if(!_subAdminCreds.length){
    el.innerHTML = '<div style="font-size:12px;color:var(--dim);padding:10px 0;">No sub-admin accounts yet.</div>';
    return;
  }
  el.innerHTML = _subAdminCreds.map(function(s,i){
    return '<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:9px;margin-bottom:7px;">'
      + '<div style="width:32px;height:32px;border-radius:8px;background:rgba(107,159,212,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;">👤</div>'
      + '<div style="flex:1;"><div style="font-size:13px;color:var(--tx);font-weight:700;">'+_esc(s.user)+'</div>'
      + '<div style="font-size:10px;color:var(--dim);font-family:Montserrat,sans-serif;">Sub-Admin · Limited access</div></div>'
      + '<button onclick="adminRemoveSubAdmin('+i+')" style="background:rgba(255,60,60,.08);border:1px solid rgba(255,60,60,.2);color:rgba(255,80,80,.7);border-radius:7px;padding:4px 10px;cursor:pointer;font-size:10px;font-family:Montserrat,sans-serif;font-weight:700;">Remove</button>'
      + '</div>';
  }).join('');
}

window._adminToast = function(msg){
  var t = document.getElementById('adminToast');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window._adminToastTimer);
  window._adminToastTimer = setTimeout(function(){
    t.classList.remove('show');
  }, 2800);
};

window.openAdmin = function(){
  var overlay = document.getElementById('adminOverlay');
  if(!overlay) return;
  overlay.classList.add('open');

  function _showDashboards(){
    var loginScreen = document.getElementById('adminLoginScreen');
    if(loginScreen) loginScreen.style.display = 'none';
    var logoutBtn = document.getElementById('adminLogoutBtn');
    if(logoutBtn) logoutBtn.style.display = 'inline';
    var homeBtn = document.getElementById('adminHomeBtn');
    if(homeBtn) homeBtn.style.display = 'inline';
    var tSet = document.getElementById('tabSettings');
    if(tSet) tSet.style.display = '';
    var ml = document.getElementById('adminMainLayout');
    if(ml) ml.style.display = 'flex';
    if(typeof adminGoHome === 'function') adminGoHome();
  }

  // Bridge: if a Supabase session exists, treat as authenticated for the
  // legacy admin UI too. Skips the embedded login screen entirely.
  var supa = (typeof getSupabase === 'function') ? getSupabase() : null;
  if(supa){
    supa.auth.getSession().then(function(r){
      var session = r && r.data && r.data.session;
      if(session && session.user){
        _adminAuth = true;
        _adminRole = 'admin';
        _showDashboards();
      } else if(_adminAuth){
        _showDashboards();
      }
    }).catch(function(){
      if(_adminAuth) _showDashboards();
    });
  } else if(_adminAuth){
    _showDashboards();
  }
};
window.closeAdmin = function(){
  // Block close if there are unsaved chatbot changes
  if(_adminMode === 'chatbot' && window.ctSafeToLeave && !window.ctSafeToLeave()) return;
  document.getElementById('adminOverlay').classList.remove('open');
  // Show the site again (full page admin hides everything beneath)
  var app = document.getElementById('app');
  if(app) app.style.visibility = 'visible';
};

// ── LOGIN ─────────────────────────────────────────────────────────────────────

window.adminLogin = function(){
  var u = document.getElementById('adminUser').value;
  var p = document.getElementById('adminPass').value;
  var err = document.getElementById('adminErr');

  // Check main admin
  if(u === _adminCreds.user && p === _adminCreds.pass){
    _adminAuth = true;
    _adminRole = 'admin';
    document.getElementById('adminLoginScreen').style.display = 'none';
    document.getElementById('adminLogoutBtn').style.display   = 'inline';
    document.getElementById('adminHomeBtn').style.display     = 'inline';
    var tSetA = document.getElementById('tabSettings');
    if(tSetA) tSetA.style.display = '';  // show for admin
    var ml = document.getElementById('adminMainLayout');
    if(ml) ml.style.display = 'flex';
    adminGoHome();
    return;
  }

  // Check sub-admins
  var sub = _subAdminCreds.find(function(s){ return s.user === u && s.pass === p; });
  if(sub){
    _adminAuth = true;
    _adminRole = 'subadmin';
    document.getElementById('adminLoginScreen').style.display = 'none';
    document.getElementById('adminLogoutBtn').style.display   = 'inline';
    document.getElementById('adminHomeBtn').style.display     = 'inline';
    var tSetS = document.getElementById('tabSettings');
    if(tSetS) tSetS.style.display = 'none';  // hide for sub-admin
    var ml = document.getElementById('adminMainLayout');
    if(ml) ml.style.display = 'flex';
    adminGoHome();
    return;
  }

  if(err){ err.textContent = 'Incorrect username or password.'; err.style.display = 'block'; }
};

window.adminLogout = function(){
  // Block logout if there are unsaved chatbot changes
  if(_adminMode === 'chatbot' && window.ctSafeToLeave && !window.ctSafeToLeave()) return;
  _adminAuth    = false;
  _adminRole    = 'admin';
  _adminMode    = null;
  _adminIdx     = -1;
  _adminDirty   = false;
  _adminBlocks  = [];
  _aeCardCache  = {};
  _blCollapsed  = {};
  // Hide main layout, show login
  var ml = document.getElementById('adminMainLayout');
  if(ml) ml.style.display = 'none';
  document.getElementById('adminLoginScreen').style.display = 'flex';
  document.getElementById('adminLogoutBtn').style.display   = 'none';
  document.getElementById('adminHomeBtn').style.display     = 'none';
  document.getElementById('adminSwitchBtn').style.display   = 'none';
  document.getElementById('adminModeBadge').style.display   = 'none';
  var u = document.getElementById('adminUser');
  var p = document.getElementById('adminPass');
  if(u) u.value = '';
  if(p) p.value = '';
  var err = document.getElementById('adminErr');
  if(err) err.style.display = 'none';
};

window.adminGoHome = function(){
  // Block if there are unsaved chatbot changes
  if(_adminMode === 'chatbot' && window.ctSafeToLeave && !window.ctSafeToLeave()) return;
  _adminMode = null;

  // Always ensure the main layout is visible (it's the container for everything)
  var ml = document.getElementById('adminMainLayout');
  if(ml) ml.style.display = 'flex';

  // Hide every content panel (except settings — its markup is static HTML, not JS-rendered)
  ['adminDashContent','adminSocialContent',
   'adminNavContent','adminSubContent'].forEach(function(id){
    var el = document.getElementById(id);
    if(el){ el.style.display='none'; el.innerHTML=''; }
  });
  var settingsEl = document.getElementById('adminSettingsContent');
  if(settingsEl) settingsEl.style.display = 'none';

  // Hide tab bar + all tabs
  ['tabDashboard','tabSocial','tabNav','tabSub','tabSettings'].forEach(function(id){
    var el = document.getElementById(id);
    if(el){ el.classList.remove('active'); el.style.display='none'; }
  });
  var tabBar = document.getElementById('adminTabBar');
  if(tabBar) tabBar.style.display = 'none';

  // Hide topbar action buttons
  var sb = document.getElementById('adminSwitchBtn');
  var mb = document.getElementById('adminModeBadge');
  if(sb) sb.style.display = 'none';
  if(mb) mb.style.display = 'none';

  // Reset title
  var pt = document.getElementById('adminPanelTitle');
  if(pt) pt.textContent = 'Admin';

  // Show home dashboard
  var home = document.getElementById('adminHomeContent');
  if(home){ home.style.display='flex'; adminRenderHome(home); }
};

window.adminRenderHome = function(container){
  container.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'max-width:620px;width:100%;margin:0 auto;padding:8px 0;';

  var isAdmin = _adminRole === 'admin';

  wrap.innerHTML =
    '<div style="margin-bottom:24px;">'
    + '<div style="font-family:Montserrat,sans-serif;font-size:22px;font-weight:900;color:var(--tx);margin-bottom:6px;">Welcome back '+(isAdmin?'Admin 👋':''+' 👋')+'</div>'
    + '<div style="font-size:13px;color:var(--dim);">What would you like to manage today?</div>'
    + '</div>'
    + '<div class="admin-home-grid">'
    + _adminHomeCard('cases',       '📋', 'rgba(107,159,212,.15)', 'Case Studies',     'Edit case cards, content blocks and metrics')
    + _adminHomeCard('chatbot',     '💬', 'rgba(236,169,52,.15)',  'Chatbot',          'Modify conversation flow and responses')
    + _adminHomeCard('social',      '📱', 'rgba(139,159,212,.15)', 'Social Media',     'Update social links in the footer')
    + _adminHomeCard('navigation',  '🧭', 'rgba(236,169,52,.15)',  'Navigation',       'Show/hide and reorder header pages')
    + _adminHomeCard('submissions', '📥', 'rgba(107,159,212,.15)', 'Submissions',      'View and manage contact form enquiries')
    + '</div>'
    + (isAdmin
      ? '<div style="margin-top:24px;">'
        + '<div style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--dim);margin-bottom:14px;">Admin Settings</div>'
        + '<div style="display:flex;gap:12px;">'
        + '<div class="admin-home-card" onclick="adminGoSettings()" style="flex:1;">'
        + '<div style="display:flex;align-items:center;gap:12px;">'
        + '<div class="admin-home-card-icon" style="background:rgba(255,255,255,.08);">⚙️</div>'
        + '<div><div class="admin-home-card-title">Credentials</div><div class="admin-home-card-desc">Change username, password, or add a sub-admin</div></div>'
        + '</div></div>'
        + '</div></div>'
      : '');

  container.appendChild(wrap);
};

function _adminHomeCard(mode, icon, bg, title, desc){
  return '<div class="admin-home-card" onclick="adminSelectDash(\'' + mode + '\')">'
    + '<div class="admin-home-card-icon" style="background:' + bg + '">' + icon + '</div>'
    + '<div class="admin-home-card-title">' + title + '</div>'
    + '<div class="admin-home-card-desc">' + desc + '</div>'
    + '</div>';
}

window.adminSelectDash = function(mode){
  // Block dashboard switch if there are unsaved chatbot changes
  if(_adminMode === 'chatbot' && mode !== 'chatbot' && window.ctSafeToLeave && !window.ctSafeToLeave()) return;
  _adminMode = mode;
  var badges = { cases:'Case Studies', chatbot:'Chatbot', social:'Social Media',
                 navigation:'Navigation', submissions:'Submissions' };

  // Ensure container is visible
  var ml = document.getElementById('adminMainLayout');
  if(ml) ml.style.display = 'flex';

  // Hide home panel
  var home = document.getElementById('adminHomeContent');
  if(home) home.style.display = 'none';

  // Update topbar
  var mb = document.getElementById('adminModeBadge');
  var sb = document.getElementById('adminSwitchBtn');
  var hb = document.getElementById('adminHomeBtn');
  if(mb){ mb.textContent = badges[mode] || mode; mb.style.display = 'inline'; }
  if(sb) sb.style.display = 'inline';
  if(hb) hb.style.display = 'inline';

  adminRenderDashboard();
};

window.adminGoSettings = function(){
  // Defense in depth: refuse for sub-admins
  if(_adminRole === 'subadmin'){
    if(window._adminToast) window._adminToast('Settings are not available for sub-admins.');
    return;
  }
  // Block if leaving chatbot dashboard with unsaved changes
  if(_adminMode === 'chatbot' && window.ctSafeToLeave && !window.ctSafeToLeave()) return;
  var ml = document.getElementById('adminMainLayout');
  if(ml) ml.style.display = 'flex';

  var home = document.getElementById('adminHomeContent');
  if(home) home.style.display = 'none';

  var tabBar = document.getElementById('adminTabBar');
  if(tabBar) tabBar.style.display = 'flex';

  // Show only settings tab
  ['tabDashboard','tabSocial','tabNav','tabSub'].forEach(function(id){
    var el = document.getElementById(id);
    if(el){ el.style.display='none'; el.classList.remove('active'); }
  });
  var tSet = document.getElementById('tabSettings');
  if(tSet) tSet.style.display = 'flex';

  // Update topbar
  var sb = document.getElementById('adminSwitchBtn');
  var mb = document.getElementById('adminModeBadge');
  var hb = document.getElementById('adminHomeBtn');
  if(sb) sb.style.display = 'inline';
  if(hb) hb.style.display = 'inline';
  if(mb){ mb.textContent = 'Settings'; mb.style.display = 'inline'; }

  adminSetTab('settings');
};
;

window.adminSwitchMode = function(){
  // Toggle the picker open/closed
  var picker = document.getElementById('adminSwitchPicker');
  if(!picker) return;
  var isOpen = picker.classList.contains('open');
  picker.classList.toggle('open', !isOpen);
  // Highlight current mode
  var modes = ['cases','chatbot','social','navigation','submissions'];
  modes.forEach(function(m){
    var id = 'picker' + m.charAt(0).toUpperCase() + m.slice(1);
    var btn = document.getElementById(id);
    if(btn) btn.classList.toggle('current', m === _adminMode);
  });
  if(!isOpen){
    setTimeout(function(){
      document.addEventListener('click', function _closePicker(e){
        var picker2 = document.getElementById('adminSwitchPicker');
        var sb = document.getElementById('adminSwitchBtn');
        if(picker2 && !picker2.contains(e.target) && e.target !== sb){
          picker2.classList.remove('open');
        }
        document.removeEventListener('click', _closePicker);
      });
    }, 10);
  }
};

window.adminPickDash = function(mode){
  var picker = document.getElementById('adminSwitchPicker');
  if(picker) picker.classList.remove('open');
  adminSelectDash(mode);
};

// ── TAB BAR ───────────────────────────────────────────────────────────────────
window.adminSetTab = function(tab){
  // Defense in depth: sub-admins cannot enter settings
  if(tab === 'settings' && _adminRole === 'subadmin'){
    if(window._adminToast) window._adminToast('Settings are not available for sub-admins.');
    return;
  }
  // Block if leaving chatbot dashboard with unsaved changes (but allow re-clicking 'dashboard' while in chatbot)
  if(_adminMode === 'chatbot' && tab !== 'dashboard' && window.ctSafeToLeave && !window.ctSafeToLeave()) return;
  // Reset ALL tabs and panels first
  ['tabDashboard', 'tabSocial', 'tabNav', 'tabSub', 'tabSettings'].forEach(function(id){
    var el = document.getElementById(id);
    if(el){ el.classList.remove('active'); el.style.display='none'; }
  });
  ['adminDashContent', 'adminSocialContent', 'adminNavContent', 'adminSubContent', 'adminSettingsContent', 'adminHomeContent'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.style.display = 'none';
  });

  // Show the target tab + panel
  if(tab === 'dashboard'){
    var t = document.getElementById('tabDashboard');
    var p = document.getElementById('adminDashContent');
    if(t){ t.style.display='flex'; t.classList.add('active'); }
    if(p)  p.style.display = 'flex';
  } else if(tab === 'social'){
    var t = document.getElementById('tabSocial');
    var p = document.getElementById('adminSocialContent');
    if(t){ t.style.display='flex'; t.classList.add('active'); }
    if(p){ p.style.display='flex'; p.innerHTML=''; adminRenderSocialDash(p); }
  } else if(tab === 'navigation'){
    var t = document.getElementById('tabNav');
    var p = document.getElementById('adminNavContent');
    if(t){ t.style.display='flex'; t.classList.add('active'); }
    if(p){ p.style.display='flex'; p.innerHTML=''; adminRenderNavDash(p); }
  } else if(tab === 'submissions'){
    var t = document.getElementById('tabSub');
    var p = document.getElementById('adminSubContent');
    if(t){ t.style.display='flex'; t.classList.add('active'); }
    if(p){
      p.style.display='flex';
      p.innerHTML='';
      // Each fresh open should pull a fresh Supabase fetch (in case new
      // submissions arrived while the user was on another tab).
      p._supaFetched = false;
      adminRenderSubDash(p);
    }
  } else if(tab === 'settings'){
    var t = document.getElementById('tabSettings');
    var p = document.getElementById('adminSettingsContent');
    if(t){ t.style.display='flex'; t.classList.add('active'); }
    if(p){ p.style.display='flex'; p.style.flexDirection='column'; }
    var cu = document.getElementById('settingsCurrentUser');
    if(cu) cu.textContent = _adminCreds.user;
    // Clear any previous messages
    var errEl = document.getElementById('settingsErr');
    var okEl  = document.getElementById('settingsOk');
    if(errEl) errEl.style.display = 'none';
    if(okEl)  okEl.style.display  = 'none';
    // Clear password fields
    ['settingsCurrentPass','settingsUser','settingsPass','settingsPassConfirm'].forEach(function(id){
      var el = document.getElementById(id); if(el) el.value = '';
    });
    // Render sub-admin list
    adminRenderSubAdminList();
  }
};

// ── SETTINGS ──────────────────────────────────────────────────────────────────

// ── SOCIAL LINKS ADMIN DASHBOARD ─────────────────────────────────────────────
function adminRenderSocialDash(container){
  container.innerHTML = '';
  var main = document.createElement('div');
  main.style.cssText = 'flex:1;overflow-y:auto;padding:28px;max-width:680px';

  var icons = {
    linkedin:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
    facebook:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    instagram: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    x:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    youtube:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0C0F22"/></svg>',
    google:    '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>',
    tiktok:    '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.05a8.16 8.16 0 0 0 4.78 1.52V7.12a4.85 4.85 0 0 1-1.01-.43z"/></svg>',
    // Same outline-style Skool icon used in the footer, sized for the admin row.
    skool:     '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="4"/><circle cx="9" cy="9" r="1.7"/><circle cx="15" cy="9" r="1.7"/><path d="M6 18 V15 a3 3 0 0 1 3-3 a3 3 0 0 1 3 3"/><path d="M18 18 V15 a3 3 0 0 0-3-3 a3 3 0 0 0-3 3"/><path d="M9 18 V13"/><path d="M15 18 V13"/></svg>'
  };
  var order = ['linkedin','facebook','instagram','x','youtube','google','tiktok','skool'];

  var html = '<div class="settings-section-title" style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--dim);margin-bottom:6px">Social Media Links</div>'
    + '<p style="font-size:12px;color:var(--dim);margin-bottom:20px">Update the URL for each platform. Toggle the switch to show or hide it in the footer.</p>'
    + order.map(function(k){
        // Safety guard: if Supabase row was saved before this platform key
        // existed in code, the merge in Layout.js will normally restore the
        // default — but cope with that being missing too rather than throwing
        // on s.label and blanking the entire dashboard.
        var s = (window._SOCIAL_LINKS && window._SOCIAL_LINKS[k]) || null;
        if(!s){
          // Hydrate a sensible default in place so Save persists it.
          s = { label: k.charAt(0).toUpperCase() + k.slice(1), url: '', enabled: true };
          if(!window._SOCIAL_LINKS) window._SOCIAL_LINKS = {};
          window._SOCIAL_LINKS[k] = s;
        }
        var uid = 'soc_' + k;
        var tid = 'soc_tog_' + k;
        return '<div class="soc-link-row">'
          + '<div class="soc-link-label">' + (icons[k] || '') + ' ' + s.label + '</div>'
          + '<input id="' + uid + '" type="url" value="' + (s.url || '') + '" '
          + 'style="background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:7px;padding:7px 11px;color:var(--tx);font-size:12px;font-family:DM Sans,sans-serif;outline:none;transition:border-color .2s;width:100%"'
          + ' onfocus="this.style.borderColor=\'rgba(236,169,52,.4)\'" onblur="this.style.borderColor=\'rgba(255,255,255,.1)\'">'
          + '<label class="soc-toggle"><input type="checkbox" id="' + tid + '"' + (s.enabled?' checked':'') + '><div class="soc-toggle-track"></div></label>'
          + '</div>';
      }).join('')
    + '<button class="admin-save" style="margin-top:8px" onclick="socSaveLinks()">Save Social Links</button>'
    + '<div id="socSaveMsg" style="font-size:12px;color:#4CAF50;margin-top:10px;display:none">&#10003; Links saved and footer updated.</div>';

  main.innerHTML = html;
  container.appendChild(main);
}

window.socSaveLinks = function(){
  var order = ['linkedin','facebook','instagram','x','youtube','google','tiktok','skool'];
  order.forEach(function(k){
    var urlEl = document.getElementById('soc_' + k);
    var togEl = document.getElementById('soc_tog_' + k);
    if(urlEl) window._SOCIAL_LINKS[k].url = urlEl.value.trim() || window._SOCIAL_LINKS[k].url;
    if(togEl) window._SOCIAL_LINKS[k].enabled = togEl.checked;
  });
  _renderSocialIcons();
  // Persist to Supabase so every visitor sees the update.
  _persist('social_links', window._SOCIAL_LINKS);
  var msg = document.getElementById('socSaveMsg');
  if(msg){ msg.style.display='block'; setTimeout(function(){ msg.style.display='none'; }, 2500); }
  _adminToast('Social links updated \u2713');
};


window.adminSaveSettings = function(){
  var currentPass = document.getElementById('settingsCurrentPass');
  var newUser     = document.getElementById('settingsUser');
  var newPass     = document.getElementById('settingsPass');
  var confPass    = document.getElementById('settingsPassConfirm');
  var errEl       = document.getElementById('settingsErr');
  var okEl        = document.getElementById('settingsOk');

  if(errEl) errEl.style.display = 'none';
  if(okEl)  okEl.style.display  = 'none';

  // Require current password
  if(!currentPass || currentPass.value !== _adminCreds.pass){
    if(errEl){ errEl.textContent = 'Incorrect current password.'; errEl.style.display = 'block'; }
    if(currentPass){ currentPass.value = ''; currentPass.focus(); }
    return;
  }

  var newU = newUser  ? newUser.value.trim() : '';
  var newP = newPass  ? newPass.value        : '';
  var confP = confPass ? confPass.value      : '';

  // Validate
  if(newP && newP !== confP){
    if(errEl){ errEl.textContent = 'New passwords do not match.'; errEl.style.display = 'block'; }
    return;
  }
  if(newP && newP.length < 6){
    if(errEl){ errEl.textContent = 'New password must be at least 6 characters.'; errEl.style.display = 'block'; }
    return;
  }
  if(!newU && !newP){
    if(errEl){ errEl.textContent = 'Enter a new username or password to make a change.'; errEl.style.display = 'block'; }
    return;
  }

  // Apply changes
  if(newU) _adminCreds.user = newU;
  if(newP) _adminCreds.pass = newP;

  // Update displayed username
  var cuEl = document.getElementById('settingsCurrentUser');
  if(cuEl) cuEl.textContent = _adminCreds.user;

  // Clear fields
  if(currentPass)  currentPass.value  = '';
  if(newUser)      newUser.value      = '';
  if(newPass)      newPass.value      = '';
  if(confPass)     confPass.value     = '';

  if(okEl) okEl.style.display = 'block';
  _adminToast('Credentials updated \u2713');
};

// ── RENDER DASHBOARD ──────────────────────────────────────────────────────────
function adminRenderDashboard(){
  // Ensure main layout is visible
  var ml0 = document.getElementById('adminMainLayout');
  if(ml0) ml0.style.display = 'flex';

  // Hide home panel
  var homeEl = document.getElementById('adminHomeContent');
  if(homeEl) homeEl.style.display = 'none';

  // Hide everything first
  ['tabDashboard', 'tabSocial', 'tabNav', 'tabSub', 'tabSettings'].forEach(function(id){
    var el = document.getElementById(id);
    if(el){ el.classList.remove('active'); el.style.display='none'; }
  });
  ['adminDashContent', 'adminSocialContent', 'adminNavContent', 'adminSubContent', 'adminSettingsContent', 'adminHomeContent'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.style.display = 'none';
  });

  var tabBar = document.getElementById('adminTabBar');
  if(tabBar) tabBar.style.display = 'flex';

  var mode = _adminMode;

  if(mode === 'social'){
    var t = document.getElementById('tabSocial');
    var p = document.getElementById('adminSocialContent');
    if(t){ t.style.display='flex'; t.classList.add('active'); }
    if(p){ p.style.display='flex'; p.innerHTML=''; adminRenderSocialDash(p); }

  } else if(mode === 'navigation'){
    var t = document.getElementById('tabNav');
    var p = document.getElementById('adminNavContent');
    if(t){ t.style.display='flex'; t.classList.add('active'); }
    if(p){ p.style.display='flex'; p.innerHTML=''; adminRenderNavDash(p); }

  } else if(mode === 'submissions'){
    var t = document.getElementById('tabSub');
    var p = document.getElementById('adminSubContent');
    if(t){ t.style.display='flex'; t.classList.add('active'); }
    if(p){
      p.style.display='flex';
      p.innerHTML='';
      // Fresh open → fresh fetch (see same comment in the tab-router branch).
      p._supaFetched = false;
      adminRenderSubDash(p);
    }

  } else {
    // cases or chatbot
    var tD  = document.getElementById('tabDashboard');
    var tSt = document.getElementById('tabSettings');
    var dc  = document.getElementById('adminDashContent');
    if(tD){ tD.style.display='flex'; tD.classList.add('active'); }
    if(tSt && _adminRole === 'admin') tSt.style.display = 'flex';
    if(dc){ dc.style.display='flex'; dc.style.flexDirection='row'; dc.innerHTML=''; }
    if(mode === 'cases'){
      adminRenderCasesDash(dc);
    } else if(mode === 'chatbot'){
      adminRenderChatbotDash(dc);
    }
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// CASES DASHBOARD (existing logic, ported)
// ══════════════════════════════════════════════════════════════════════════════
function adminRenderCasesDash(container){
  // ── REWRITTEN — clean minimal implementation ───────────────────────────────
  // Pure render. No async fetch. All click handlers wired via addEventListener
  // (not inline onclick) so they can never silently fail to bind. Sidebar
  // items are bound the same way in adminRenderSidebar below.

  console.log('[admin/cases] Rendering Cases dashboard. _CASES count =', (window._CASES||[]).length);

  container.innerHTML = '';
  container.style.display = 'flex';
  container.style.flexDirection = 'row';
  container.style.overflow = 'hidden';

  // ── SIDEBAR ────────────────────────────────────────────────────────────────
  var sidebar = document.createElement('div');
  sidebar.className = 'admin-sidebar';
  sidebar.style.cssText = 'width:220px;flex-shrink:0;border-right:1px solid rgba(255,255,255,.08);display:flex;flex-direction:column;overflow:hidden;min-height:0;background:#060914;';
  sidebar.innerHTML =
    '<div class="admin-sidebar-header">Cases (<span id="adminCaseCount">0</span>)</div>'
    + '<div class="admin-case-list" id="adminCaseList" style="flex:1;overflow-y:auto;min-height:0;padding:8px;"></div>'
    + '<div class="admin-sidebar-footer">'
    + '<button class="admin-add-btn" id="adminNewCaseBtn">+ New Case Study</button>'
    + '</div>';

  // ── EDITOR ─────────────────────────────────────────────────────────────────
  var editor = document.createElement('div');
  editor.className = 'admin-editor';
  editor.style.cssText = 'flex:1;display:flex;flex-direction:column;border-right:1px solid rgba(255,255,255,.08);overflow:hidden;min-width:0;min-height:0;';
  editor.innerHTML =
    '<div class="admin-editor-header">'
    + '<span id="adminEditorTitle">Select a case to edit</span>'
    + '<span id="adminUnsavedBadge" style="display:none;font-size:10px;padding:2px 8px;border-radius:100px;background:rgba(236,169,52,.15);border:1px solid rgba(236,169,52,.3);color:var(--t);font-family:Montserrat,sans-serif;font-weight:700">Unsaved</span>'
    + '</div>'
    + '<div class="admin-editor-body" id="adminEditorBody" style="flex:1;overflow-y:auto;min-height:0;padding:16px 20px;">'
    + '<div class="admin-empty"><div class="admin-empty-icon">&#9998;</div><p>Select a case study<br>or create a new one.</p></div>'
    + '</div>'
    + '<div class="admin-editor-actions" id="adminEditorActions" style="display:none;">'
    + '<button class="admin-save" id="adminSaveBtn">&#10003; Save</button>'
    + '<button class="admin-cancel" id="adminCancelBtn">Cancel</button>'
    + '<button class="admin-hide-btn" id="adminHideBtn" style="display:none;padding:9px 16px;border-radius:8px;border:1px solid rgba(139,159,212,.3);background:rgba(139,159,212,.08);color:#8B9FD4;font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;cursor:pointer;transition:all .2s">&#128065; Hide</button>'
    + '<button class="admin-del-btn" id="adminDeleteBtn">Delete</button>'
    + '</div>';

  // ── PREVIEW ────────────────────────────────────────────────────────────────
  var preview = document.createElement('div');
  preview.className = 'admin-preview';
  preview.style.cssText = 'width:300px;flex-shrink:0;display:flex;flex-direction:column;overflow:hidden;min-height:0;';
  preview.innerHTML =
    '<div class="admin-preview-header">Live Preview</div>'
    + '<div class="admin-preview-frame" id="adminPreviewFrame" style="flex:1;overflow-y:auto;min-height:0;">'
    + '<div id="adminPreviewContent" style="padding:24px;">'
    + '<div class="admin-empty"><div class="admin-empty-icon">&#128065;</div><p>Preview here.</p></div>'
    + '</div></div>';

  container.appendChild(sidebar);
  container.appendChild(editor);
  container.appendChild(preview);

  // ── BIND ACTION BUTTONS (no inline onclick) ────────────────────────────────
  function bind(id, handler){
    var el = document.getElementById(id);
    if(!el){ console.warn('[admin/cases] Missing element for bind:', id); return; }
    el.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      try { handler(); } catch(err){ console.error('[admin/cases]', id, 'handler error:', err); }
    });
  }
  bind('adminNewCaseBtn',  function(){ if(typeof window.adminNewCase     === 'function') window.adminNewCase(); });
  bind('adminSaveBtn',     function(){ if(typeof window.adminSaveCase    === 'function') window.adminSaveCase(); });
  bind('adminCancelBtn',   function(){ if(typeof window.adminCancelEdit  === 'function') window.adminCancelEdit(); });
  bind('adminHideBtn',     function(){ if(typeof window.adminToggleHideCase === 'function') window.adminToggleHideCase(); });
  bind('adminDeleteBtn',   function(){ if(typeof window.adminDeleteCase  === 'function') window.adminDeleteCase(); });

  adminRenderSidebar();
}

// ══════════════════════════════════════════════════════════════════════════════
// CHATBOT EDITOR DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════

// ── CHATBOT EDITOR ────────────────────────────────────────────────────────────
var _ctPreviewTimer = null; // debounce handle
var _ctOpenSections = {};   // track which sections are open by key
var _ctOpenChoices  = {};   // track which choices are open
var _ctDraft        = null; // deep-cloned working copy of _CHAT_TREE while in chatbot dashboard
var _ctDirty        = false; // any unsaved change in the draft

// Routing — pages a choice can navigate to (using existing _HTML page keys)
var _CT_GOTO_PAGES = [
  { key:'home',          label:'Home' },
  { key:'services',      label:'Services' },
  { key:'capabilities',  label:'Capabilities' },
  { key:'cases',         label:'Case Studies' },
  { key:'stack',         label:'Our Stack' },
  { key:'contact',       label:'Contact' },
  { key:'erp',           label:'ERP Projects' },
  { key:'infinity',      label:'Infinity Mirror' },
  { key:'bankhours',     label:'Bank of Hours' },
  { key:'support',       label:'Support Only' },
  { key:'zoho_crm',      label:'Zoho CRM' },
  { key:'zoho_books',    label:'Zoho Books' },
  { key:'zoho_analytics',label:'Zoho Analytics' },
  { key:'zoho_flow',     label:'Zoho Flow' },
  { key:'zoho_desk',     label:'Zoho Desk' },
  { key:'zoho_sign',     label:'Zoho Sign' },
  { key:'zoho_projects', label:'Zoho Projects' },
  { key:'zoho_inventory',label:'Zoho Inventory' },
  { key:'zoho_people',   label:'Zoho People' },
  { key:'zoho_recruit',  label:'Zoho Recruit' },
  { key:'zoho_expense',  label:'Zoho Expense' },
  { key:'zoho_creator',  label:'Zoho Creator' }
];

// Route options shown in the per-choice dropdown
var _CT_ROUTE_OPTIONS = [
  { value:'answer',     label:'Show response + back/CTA buttons' },
  { value:'answer-end', label:'Show response, then end' },
  { value:'goto',       label:'Go to page →' },
  { value:'cta',        label:'Book a call (open contact)' },
  { value:'reset',      label:'Back to topics list' }
];

function _ctRouteLabel(route){
  for(var i=0;i<_CT_ROUTE_OPTIONS.length;i++){
    if(_CT_ROUTE_OPTIONS[i].value === (route||'answer')) return _CT_ROUTE_OPTIONS[i].label;
  }
  return _CT_ROUTE_OPTIONS[0].label;
}
function _ctGotoLabel(key){
  for(var i=0;i<_CT_GOTO_PAGES.length;i++){
    if(_CT_GOTO_PAGES[i].key === key) return _CT_GOTO_PAGES[i].label;
  }
  return key || '(pick a page)';
}

// One-word indicator shown next to each choice in the editor list
function _ctRoutePreviewBadge(c){
  var r = c.route || 'answer';
  if(r === 'cta')   return '→ Contact';
  if(r === 'reset') return '⬅ Topics';
  if(r === 'goto')  return '→ ' + _ctGotoLabel(c.goto);
  if(r === 'answer-end') return 'Answer (end)';
  return 'Answer';
}

function adminRenderChatbotDash(container){
  container.innerHTML = '';
  container.style.display = 'flex';
  container.style.flexDirection = 'row';
  container.style.overflow = 'hidden';

  // Snapshot the live tree into a draft. All edits in this dashboard go to the draft.
  _ctOpenDraft();

  // Editor column: sticky Save/Cancel header + scrolling body
  var editorCol = document.createElement('div');
  editorCol.style.cssText = 'flex:1;display:flex;flex-direction:column;min-width:0;min-height:0;overflow:hidden;';

  var headerBar = document.createElement('div');
  headerBar.id = 'ctHeaderBar';
  headerBar.style.cssText = 'flex-shrink:0;padding:12px 22px;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02);display:flex;align-items:center;gap:10px;';
  headerBar.innerHTML =
    '<span style="font-family:Montserrat,sans-serif;font-size:13px;font-weight:800;color:var(--tx);">Chatbot Editor</span>'
    + '<span id="ctUnsavedBadge" style="display:none;font-size:10px;padding:2px 8px;border-radius:100px;background:rgba(236,169,52,.15);border:1px solid rgba(236,169,52,.3);color:var(--t);font-family:Montserrat,sans-serif;font-weight:700;">Unsaved changes</span>'
    + '<div style="flex:1;"></div>'
    + '<button id="ctCancelBtn" class="admin-cancel" style="display:none;padding:7px 14px;font-size:11px;" onclick="ctCancelChanges()">Cancel</button>'
    + '<button id="ctSaveBtn" class="admin-save" style="opacity:.45;pointer-events:none;padding:7px 16px;font-size:11px;" onclick="ctSaveChanges()">Save</button>';

  var editor = document.createElement('div');
  editor.style.cssText = 'flex:1;overflow-y:auto;min-height:0;display:flex;flex-direction:column;';
  editor.id = 'ctEditorWrap';

  editorCol.appendChild(headerBar);
  editorCol.appendChild(editor);

  var preview = document.createElement('div');
  preview.style.cssText = 'width:300px;flex-shrink:0;display:flex;flex-direction:column;border-left:1px solid rgba(255,255,255,.08);overflow:hidden;min-height:0;';
  preview.innerHTML =
    '<div class="admin-preview-header" style="padding:14px 16px;font-family:Montserrat,sans-serif;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--dim);border-bottom:1px solid rgba(255,255,255,.08);flex-shrink:0;">Chat Routing Preview</div>'
    + '<div id="ctPreviewFrame" style="flex:1;overflow-y:auto;min-height:0;padding:14px;"></div>';

  container.appendChild(editorCol);
  container.appendChild(preview);
  ctRenderEditor();
  ctLivePreview();
  _ctRefreshDirtyUI();
}

// Deep-clone the live chat tree into a working draft.
function _ctOpenDraft(){
  _ctDraft = JSON.parse(JSON.stringify(window._CHAT_TREE));
  _ctDirty = false;
}

// Reflect dirty state in the header bar (badge visibility, Save/Cancel enabled state).
function _ctRefreshDirtyUI(){
  var badge  = document.getElementById('ctUnsavedBadge');
  var saveBt = document.getElementById('ctSaveBtn');
  var cnclBt = document.getElementById('ctCancelBtn');
  if(badge)  badge.style.display = _ctDirty ? 'inline-block' : 'none';
  if(saveBt){
    saveBt.style.opacity = _ctDirty ? '1' : '.45';
    saveBt.style.pointerEvents = _ctDirty ? 'auto' : 'none';
  }
  if(cnclBt){
    cnclBt.style.display = _ctDirty ? 'inline-block' : 'none';
  }
}

// Mark draft as dirty (called by every mutation).
function _ctMarkDirty(){
  _ctDirty = true;
  _ctRefreshDirtyUI();
}

// Commit draft → live tree.
window.ctSaveChanges = function(){
  if(!_ctDirty) return;
  window._CHAT_TREE = JSON.parse(JSON.stringify(_ctDraft));
  _ctDirty = false;
  _ctRefreshDirtyUI();
  // Persist chatbot tree to Supabase.
  _persist('chat_tree', window._CHAT_TREE);
  if(window._adminToast) window._adminToast('Chatbot saved \u2713');
};

// Discard draft → re-clone from live tree, re-render.
window.ctCancelChanges = function(){
  if(!_ctDirty) return;
  if(!confirm('Discard all unsaved chatbot changes?')) return;
  _ctOpenDraft();
  ctRenderEditor();
  ctLivePreview();
  _ctRefreshDirtyUI();
};

// Returns true if it's safe to navigate away (user said OK to discard, or no changes).
window.ctSafeToLeave = function(){
  if(!_ctDirty) return true;
  if(confirm('You have unsaved chatbot changes. Discard them?')){
    _ctOpenDraft();
    _ctDirty = false;
    return true;
  }
  return false;
};

function ctRenderEditor(){
  var wrap = document.getElementById('ctEditorWrap');
  if(!wrap) return;
  // Save scroll position
  var scrollTop = wrap.scrollTop;
  var tree = _ctDraft;
  if(!tree) return;
  var frag = document.createElement('div');
  frag.style.cssText = 'padding:20px 22px;display:flex;flex-direction:column;gap:0;';

  // ── Global Messages ───────────────────────────────────────────────────────
  frag.innerHTML += '<div style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--dim);margin-bottom:10px">Global Messages</div>';

  // Opening
  frag.innerHTML += _ctSectionHTML('__opening', '👋', 'rgba(76,175,80,.15)', 'Opening Message', '',
    '<div class="admin-field" style="margin-bottom:0"><label style="font-size:9px">Shown when chat opens</label>'
    + '<textarea rows="3" id="ctOpeningText" placeholder="Hi! How can I help?">'
    + _esc(tree.opening) + '</textarea></div>');

  // Fallback
  frag.innerHTML += _ctSectionHTML('__fallback', '🔄', 'rgba(255,80,80,.12)', 'Fallback Message', '',
    '<div class="admin-field" style="margin-bottom:0"><label style="font-size:9px">Shown when no answer found</label>'
    + '<textarea rows="3" id="ctFallbackText" placeholder="Let me get you to the right person...">'
    + _esc(tree.fallback) + '</textarea></div>');

  // ── Topics ────────────────────────────────────────────────────────────────
  frag.innerHTML += '<div style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--dim);margin:14px 0 10px">Topics & Responses</div>';

  tree.topics.forEach(function(topic, ti){
    var choiceCount = (topic.choices||[]).length;
    var topicBody = ''
      + '<div class="admin-field"><label style="font-size:9px">Topic Button Label</label>'
      + '<input id="ctTL_'+ti+'" value="'+_esc(topic.label)+'" placeholder="e.g. Our Services"></div>'
      + '<div class="admin-field"><label style="font-size:9px">Bot Answer</label>'
      + '<textarea id="ctTA_'+ti+'" rows="3" placeholder="What the bot says when this topic is selected.">'
      + _esc(topic.answer)+'</textarea></div>'
      + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">'
      +   '<div style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.09em;color:var(--dim)">Choices</div>'
      +   '<div style="font-size:9px;color:rgba(255,255,255,.3);font-family:Montserrat,sans-serif;">Drag ⋮⋮ to reorder</div>'
      + '</div>'
      + '<div id="ctChoices_'+ti+'">'
      + (topic.choices||[]).map(function(c, ci){
          var node = tree.nodes[c.nodeId] || {answer:'', choices:[]};
          var ck   = 'c_'+ti+'_'+ci;
          var route = c.route || 'answer';
          var showAnswerBox = (route === 'answer' || route === 'answer-end');
          var routeOptionsHTML = _CT_ROUTE_OPTIONS.map(function(opt){
            return '<option value="'+opt.value+'"'+(route===opt.value?' selected':'')+'>'+_esc(opt.label)+'</option>';
          }).join('');
          var gotoOptionsHTML = _CT_GOTO_PAGES.map(function(p){
            return '<option value="'+p.key+'"'+(c.goto===p.key?' selected':'')+'>'+_esc(p.label)+'</option>';
          }).join('');
          var body = '<div class="admin-field" style="margin-bottom:8px"><label style="font-size:9px">Button Label</label>'
            + '<input id="ctCL_'+ti+'_'+ci+'" value="'+_esc(c.label)+'" placeholder="e.g. What is Scope?"></div>'
            // Route picker
            + '<div class="admin-field" style="margin-bottom:8px"><label style="font-size:9px">When clicked, do…</label>'
            + '<select id="ctCR_'+ti+'_'+ci+'" onchange="ctChangeChoiceRoute('+ti+','+ci+',this.value)">'
            + routeOptionsHTML
            + '</select></div>'
            // Goto target — only visible when route === 'goto'
            + '<div class="admin-field" id="ctCG_wrap_'+ti+'_'+ci+'" style="margin-bottom:8px;'+(route==='goto'?'':'display:none;')+'">'
            +   '<label style="font-size:9px">Go to which page?</label>'
            +   '<select id="ctCG_'+ti+'_'+ci+'" onchange="ctChangeChoiceGoto('+ti+','+ci+',this.value)">'
            +     '<option value="">(pick a page)</option>'
            +     gotoOptionsHTML
            +   '</select>'
            + '</div>'
            // Answer textarea — only visible when route is 'answer' or 'answer-end'
            + '<div class="admin-field" id="ctNA_wrap_'+ti+'_'+ci+'" style="margin-bottom:0;'+(showAnswerBox?'':'display:none;')+'">'
            +   '<label style="font-size:9px">Answer when clicked</label>'
            +   '<textarea id="ctNA_'+c.nodeId+'" rows="3" placeholder="Bot reply for this choice...">'
            +   _esc(node.answer)+'</textarea>'
            + '</div>';
          return '<div class="ct-choice-item" ondragover="ctChoiceDragOver(event,'+ti+','+ci+')" ondragleave="ctChoiceDragLeave(event,'+ti+','+ci+')" ondrop="ctChoiceDrop(event,'+ti+','+ci+')" id="ctChoiceItem_'+ti+'_'+ci+'">'
            +'<div class="ct-choice-item-header" onclick="ctToggleChoice(\''+ck+'\')">'
            +'<span class="ct-grip" draggable="true" ondragstart="ctChoiceDragStart(event,'+ti+','+ci+')" ondragend="ctChoiceDragEnd(event,'+ti+','+ci+')" title="Drag to reorder" style="cursor:grab;color:rgba(255,255,255,.35);font-size:11px;padding:0 6px;user-select:none;flex-shrink:0;letter-spacing:-1px;" onclick="event.stopPropagation()" onmouseover="this.style.color=\'rgba(255,255,255,.7)\'" onmouseout="this.style.color=\'rgba(255,255,255,.35)\'">⋮⋮</span>'
            +'<span style="font-size:9px;padding:2px 7px;border-radius:100px;background:rgba(255,255,255,.07);color:var(--dim);font-family:Montserrat,sans-serif;font-weight:700;flex-shrink:0">'+(ci+1)+'</span>'
            +'<span class="ct-choice-label-preview" id="ctCLprev_'+ti+'_'+ci+'">'+_esc(c.label)+'</span>'
            +'<span style="font-size:9px;color:var(--dim);font-family:Montserrat,sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.04em;flex-shrink:0;opacity:.65" id="ctCRprev_'+ti+'_'+ci+'">'+_ctRoutePreviewBadge(c)+'</span>'
            +'<button onclick="event.stopPropagation();ctDeleteChoice('+ti+','+ci+')" style="background:none;border:none;color:rgba(255,80,80,.55);cursor:pointer;font-size:14px;padding:2px 6px;line-height:1;transition:color .2s" onmouseover="this.style.color=\'rgba(255,80,80,1)\'" onmouseout="this.style.color=\'rgba(255,80,80,.55)\'" title="Delete choice">✕</button>'
            +'<span style="color:var(--dim);font-size:10px;transition:transform .2s" id="ctCChev_'+ck+'">▾</span>'
            +'</div>'
            +'<div id="ctCBody_'+ck+'" class="ct-choice-item-body" style="display:'+(_ctOpenChoices[ck]?'flex':'none')+';flex-direction:column;gap:8px">'
            +body
            +'</div></div>';
        }).join('')
      +'</div>'
      +'<button class="ct-add-choice-btn" onclick="ctAddChoice('+ti+')">+ Add Choice</button>'
      +'<button onclick="ctDeleteTopic('+ti+')" style="margin-top:8px;width:100%;padding:7px;border-radius:8px;border:1px solid rgba(255,80,80,.15);background:rgba(255,80,80,.05);color:rgba(255,80,80,.6);font-family:Montserrat,sans-serif;font-size:10px;font-weight:700;cursor:pointer;transition:all .2s">Delete Topic</button>';

    frag.innerHTML += '<div id="ctTopicItem_'+ti+'" ondragover="ctTopicDragOver(event,'+ti+')" ondragleave="ctTopicDragLeave(event,'+ti+')" ondrop="ctTopicDrop(event,'+ti+')" style="position:relative;">'
      // Small drag pill — the ONLY draggable element for the topic
      + '<div draggable="true" ondragstart="ctTopicDragStart(event,'+ti+')" ondragend="ctTopicDragEnd(event,'+ti+')" style="display:inline-flex;align-items:center;gap:5px;padding:3px 9px;margin-bottom:4px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:100px;font-family:Montserrat,sans-serif;font-size:9px;font-weight:700;color:rgba(255,255,255,.35);cursor:grab;user-select:none;text-transform:uppercase;letter-spacing:.06em;" title="Drag to reorder this topic">'
      +   '<span style="letter-spacing:-1px;">⋮⋮</span><span>Drag topic</span>'
      + '</div>'
      + _ctSectionHTML('t_'+ti, '💬', 'rgba(236,169,52,.12)',
          _esc(topic.label), choiceCount+' choices', topicBody)
      + '</div>';
  });

  frag.innerHTML += '<button class="ct-add-topic-btn" onclick="ctAddTopic()">+ Add New Topic</button>';

  wrap.innerHTML = '';
  wrap.appendChild(frag);

  // Attach live listeners (no oninput in HTML — avoids re-render on every key)
  ctAttachListeners();

  // Restore open/close states
  Object.keys(_ctOpenSections).forEach(function(k){
    var body = document.getElementById('ctSBody_'+k);
    var chev = document.getElementById('ctSChev_'+k);
    if(body && _ctOpenSections[k]){
      body.style.display = 'block';
      if(chev) chev.style.transform = 'rotate(180deg)';
    }
  });

  wrap.scrollTop = scrollTop;
}

function _ctSectionHTML(key, icon, bg, title, badge, bodyHTML){
  var isOpen = !!_ctOpenSections[key];
  return '<div class="ct-section" style="margin-bottom:10px">'
    +'<div class="ct-section-header" onclick="ctToggleSection(\''+key+'\')" style="display:flex;align-items:center;gap:10px;padding:12px 14px;cursor:pointer;background:rgba(255,255,255,.03);border-bottom:1px solid rgba(255,255,255,.07);user-select:none">'
    +'<div class="ct-section-icon" style="width:28px;height:28px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;background:'+bg+'">'+icon+'</div>'
    +'<div style="flex:1;font-family:Montserrat,sans-serif;font-size:12px;font-weight:800;color:var(--tx)">'+title+'</div>'
    +(badge?'<div style="font-size:9px;padding:2px 7px;border-radius:100px;background:rgba(255,255,255,.07);color:var(--dim);font-family:Montserrat,sans-serif;font-weight:700">'+badge+'</div>':'')
    +'<span id="ctSChev_'+key+'" style="color:var(--dim);font-size:10px;transition:transform .2s;'+(isOpen?'transform:rotate(180deg)':'')+'">▾</span>'
    +'</div>'
    +'<div id="ctSBody_'+key+'" class="ct-section-body" style="padding:14px;display:'+(isOpen?'block':'none')+'">'
    +bodyHTML
    +'</div></div>';
}

// Attach input listeners separately — no DOM rebuild on keypress
function ctAttachListeners(){
  var tree = _ctDraft;
  if(!tree) return;

  // Opening / fallback — direct write to draft, debounced preview
  var ot = document.getElementById('ctOpeningText');
  if(ot) ot.oninput = function(){ tree.opening = this.value; _ctMarkDirty(); ctDebouncePreview(); };

  var ft = document.getElementById('ctFallbackText');
  if(ft) ft.oninput = function(){ tree.fallback = this.value; _ctMarkDirty(); ctDebouncePreview(); };

  // Topic labels and answers
  tree.topics.forEach(function(topic, ti){
    var tlEl = document.getElementById('ctTL_'+ti);
    if(tlEl) tlEl.oninput = function(){
      topic.label = this.value;
      var prev = document.getElementById('ctSChev_'+('t_'+ti));
      // Update section title in-place without re-render
      var titleEl = document.querySelector('#ctSBody_t_'+ti) &&
        document.querySelector('#ctSBody_t_'+ti).parentElement.querySelector('.ct-section-header > div[style*="flex:1"]');
      if(titleEl) titleEl.textContent = this.value;
      _ctMarkDirty();
      ctDebouncePreview();
    };
    var taEl = document.getElementById('ctTA_'+ti);
    if(taEl) taEl.oninput = function(){ topic.answer = this.value; _ctMarkDirty(); ctDebouncePreview(); };

    // Choice labels and node answers
    (topic.choices||[]).forEach(function(c, ci){
      var clEl = document.getElementById('ctCL_'+ti+'_'+ci);
      if(clEl) clEl.oninput = function(){
        c.label = this.value;
        var prevEl = document.getElementById('ctCLprev_'+ti+'_'+ci);
        if(prevEl) prevEl.textContent = this.value; // update preview label in-place
        _ctMarkDirty();
        ctDebouncePreview();
      };
      var naEl = document.getElementById('ctNA_'+c.nodeId);
      if(naEl) naEl.oninput = function(){
        if(!tree.nodes[c.nodeId]) tree.nodes[c.nodeId] = {answer:'',choices:[]};
        tree.nodes[c.nodeId].answer = this.value;
        _ctMarkDirty();
        ctDebouncePreview();
      };
    });
  });
}

// Debounced preview — only update after typing stops for 300ms
function ctDebouncePreview(){
  clearTimeout(_ctPreviewTimer);
  _ctPreviewTimer = setTimeout(ctLivePreview, 300);
}

window.ctToggleSection = function(key){
  var body = document.getElementById('ctSBody_'+key);
  var chev = document.getElementById('ctSChev_'+key);
  if(!body) return;
  var isOpen = body.style.display !== 'none';
  _ctOpenSections[key] = !isOpen;
  body.style.display = isOpen ? 'none' : 'block';
  if(chev) chev.style.transform = isOpen ? '' : 'rotate(180deg)';
};

window.ctToggleChoice = function(key){
  var body = document.getElementById('ctCBody_'+key);
  var chev = document.getElementById('ctCChev_'+key);
  if(!body) return;
  var isOpen = body.style.display !== 'none';
  _ctOpenChoices[key] = !isOpen;
  body.style.display = isOpen ? 'none' : 'flex';
  if(chev) chev.style.transform = isOpen ? '' : 'rotate(180deg)';
};

window.ctAddChoice = function(ti){
  var tree   = _ctDraft;
  if(!tree) return;
  var topic  = tree.topics[ti];
  if(!topic) return;
  var nodeId = 'node_' + Date.now();
  topic.choices.push({ label:'New Choice', nodeId:nodeId });
  tree.nodes[nodeId] = { answer:'', choices:[] };
  _ctMarkDirty();
  ctRenderEditor();
  ctDebouncePreview();
  // Auto-open the new choice
  var ci  = topic.choices.length - 1;
  var key = 'c_'+ti+'_'+ci;
  _ctOpenChoices[key] = true;
  var body = document.getElementById('ctCBody_'+key);
  if(body) body.style.display = 'flex';
};

window.ctDeleteChoice = function(ti, ci){
  if(!confirm('Delete this choice?')) return;
  if(!_ctDraft) return;
  _ctDraft.topics[ti].choices.splice(ci, 1);
  _ctMarkDirty();
  ctRenderEditor();
  ctDebouncePreview();
};

window.ctAddTopic = function(){
  if(!_ctDraft) return;
  var id = 'topic_'+Date.now();
  _ctDraft.topics.push({id:id, label:'New Topic', answer:'Answer here.', choices:[]});
  _ctOpenSections['t_'+(_ctDraft.topics.length-1)] = true;
  _ctMarkDirty();
  ctRenderEditor();
  ctDebouncePreview();
};

window.ctDeleteTopic = function(ti){
  if(!confirm('Delete this topic and all its choices?')) return;
  if(!_ctDraft) return;
  _ctDraft.topics.splice(ti, 1);
  _ctMarkDirty();
  ctRenderEditor();
  ctDebouncePreview();
};

// ── Route handlers ───────────────────────────────────────────────────────────
window.ctChangeChoiceRoute = function(ti, ci, value){
  if(!_ctDraft) return;
  var c = _ctDraft.topics[ti] && _ctDraft.topics[ti].choices[ci];
  if(!c) return;
  c.route = value;
  // Show/hide the goto-page picker
  var gw = document.getElementById('ctCG_wrap_'+ti+'_'+ci);
  if(gw) gw.style.display = (value === 'goto') ? '' : 'none';
  // Show/hide the answer textarea
  var aw = document.getElementById('ctNA_wrap_'+ti+'_'+ci);
  if(aw) aw.style.display = (value === 'answer' || value === 'answer-end') ? '' : 'none';
  // Update the route badge in the choice header
  var rp = document.getElementById('ctCRprev_'+ti+'_'+ci);
  if(rp) rp.textContent = _ctRoutePreviewBadge(c);
  _ctMarkDirty();
  ctDebouncePreview();
};

window.ctChangeChoiceGoto = function(ti, ci, value){
  if(!_ctDraft) return;
  var c = _ctDraft.topics[ti] && _ctDraft.topics[ti].choices[ci];
  if(!c) return;
  c.goto = value;
  var rp = document.getElementById('ctCRprev_'+ti+'_'+ci);
  if(rp) rp.textContent = _ctRoutePreviewBadge(c);
  _ctMarkDirty();
  ctDebouncePreview();
};

// ── Drag-and-drop reorder ────────────────────────────────────────────────────
var _ctChoiceDragSrc = null; // { ti, ci }
var _ctTopicDragSrc  = null; // ti

window.ctChoiceDragStart = function(e, ti, ci){
  _ctChoiceDragSrc = { ti: ti, ci: ci };
  if(e.dataTransfer){ e.dataTransfer.effectAllowed = 'move'; try{ e.dataTransfer.setData('text/plain','choice'); }catch(_){} }
  var el = document.getElementById('ctChoiceItem_'+ti+'_'+ci);
  if(el) el.style.opacity = '.4';
  e.stopPropagation();
};
window.ctChoiceDragOver = function(e, ti, ci){
  if(!_ctChoiceDragSrc || _ctChoiceDragSrc.ti !== ti) return;
  e.preventDefault();
  if(e.dataTransfer) e.dataTransfer.dropEffect = 'move';
  var el = document.getElementById('ctChoiceItem_'+ti+'_'+ci);
  if(el && (_ctChoiceDragSrc.ti !== ti || _ctChoiceDragSrc.ci !== ci)) el.style.outline = '2px dashed rgba(236,169,52,.7)';
  e.stopPropagation();
};
window.ctChoiceDragLeave = function(e, ti, ci){
  var el = document.getElementById('ctChoiceItem_'+ti+'_'+ci);
  if(el) el.style.outline = '';
  e.stopPropagation();
};
window.ctChoiceDrop = function(e, ti, ci){
  e.preventDefault();
  e.stopPropagation();
  if(!_ctChoiceDragSrc || _ctChoiceDragSrc.ti !== ti || !_ctDraft) {
    _ctChoiceDragSrc = null;
    return;
  }
  var src = _ctChoiceDragSrc.ci;
  if(src === ci){ _ctChoiceDragSrc = null; return; }
  var arr = _ctDraft.topics[ti].choices;
  var moved = arr.splice(src, 1)[0];
  arr.splice(ci, 0, moved);
  _ctChoiceDragSrc = null;
  _ctMarkDirty();
  ctRenderEditor();
  ctDebouncePreview();
};
window.ctChoiceDragEnd = function(e, ti, ci){
  var el = document.getElementById('ctChoiceItem_'+ti+'_'+ci);
  if(el){ el.style.opacity = ''; el.style.outline = ''; }
  // clear outlines on all siblings too (in case dragend fires without drop)
  var sibs = document.querySelectorAll('[id^="ctChoiceItem_"]');
  sibs.forEach(function(s){ s.style.outline = ''; s.style.opacity = ''; });
  _ctChoiceDragSrc = null;
};

window.ctTopicDragStart = function(e, ti){
  _ctTopicDragSrc = ti;
  if(e.dataTransfer){ e.dataTransfer.effectAllowed = 'move'; try{ e.dataTransfer.setData('text/plain','topic'); }catch(_){} }
  var el = document.getElementById('ctTopicItem_'+ti);
  if(el) el.style.opacity = '.4';
  e.stopPropagation();
};
window.ctTopicDragOver = function(e, ti){
  if(_ctTopicDragSrc === null) return;
  e.preventDefault();
  if(e.dataTransfer) e.dataTransfer.dropEffect = 'move';
  var el = document.getElementById('ctTopicItem_'+ti);
  if(el && _ctTopicDragSrc !== ti) el.style.outline = '2px dashed rgba(236,169,52,.7)';
  e.stopPropagation();
};
window.ctTopicDragLeave = function(e, ti){
  var el = document.getElementById('ctTopicItem_'+ti);
  if(el) el.style.outline = '';
  e.stopPropagation();
};
window.ctTopicDrop = function(e, ti){
  e.preventDefault();
  e.stopPropagation();
  if(_ctTopicDragSrc === null || !_ctDraft){ _ctTopicDragSrc = null; return; }
  var src = _ctTopicDragSrc;
  if(src === ti){ _ctTopicDragSrc = null; return; }
  var moved = _ctDraft.topics.splice(src, 1)[0];
  _ctDraft.topics.splice(ti, 0, moved);
  _ctTopicDragSrc = null;
  // After topic reorder, the section-open keys (t_0, t_1...) refer to wrong topics.
  // Wipe them so all close — safer than guessing.
  _ctOpenSections = {};
  _ctOpenChoices = {};
  _ctMarkDirty();
  ctRenderEditor();
  ctDebouncePreview();
};
window.ctTopicDragEnd = function(e, ti){
  var sibs = document.querySelectorAll('[id^="ctTopicItem_"]');
  sibs.forEach(function(s){ s.style.outline = ''; s.style.opacity = ''; });
  _ctTopicDragSrc = null;
};

window.ctLivePreview = function(){
  var pf = document.getElementById('ctPreviewFrame');
  if(!pf) return;
  var tree = _ctDraft || window._CHAT_TREE;
  if(!tree){ pf.innerHTML = ''; return; }

  // Render a vertical conversation tree showing the full routing.
  // Bot bubbles are left-aligned with rounded corners. User-side "if user picks"
  // labels show the routing decision points. Choices are pill-shaped buttons
  // that look the way they will in the actual chatbot.
  function bubble(text){
    return '<div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);padding:8px 11px;border-radius:12px 12px 12px 4px;font-size:12px;color:var(--tx);line-height:1.45;max-width:88%;align-self:flex-start;white-space:pre-wrap;word-break:break-word;">'
      + (text ? _esc(text) : '<span style="color:var(--dim);font-style:italic">(empty)</span>')
      + '</div>';
  }
  function pickArrow(label){
    return '<div style="display:flex;align-items:center;gap:6px;margin:2px 0 4px;font-size:9px;color:rgba(236,169,52,.85);font-family:Montserrat,sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.05em;">'
      + '<span style="font-size:11px;line-height:1">↳</span>'
      + '<span>If user picks: ' + _esc(label) + '</span>'
      + '</div>';
  }
  function choicePill(label){
    return '<div style="display:inline-block;padding:5px 11px;background:rgba(236,169,52,.1);border:1px solid rgba(236,169,52,.3);border-radius:100px;font-size:11px;color:var(--t);font-family:Montserrat,sans-serif;font-weight:700;margin:2px 4px 2px 0;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'
      + (label ? _esc(label) : '(no label)')
      + '</div>';
  }
  function sectionLabel(text){
    return '<div style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.09em;color:var(--dim);margin:6px 0 4px;">'
      + _esc(text) + '</div>';
  }

  var html = '<div style="display:flex;flex-direction:column;gap:0;">'
    + '<div style="display:flex;align-items:center;gap:6px;padding:8px 10px;background:rgba(76,175,80,.08);border:1px solid rgba(76,175,80,.18);border-radius:8px;margin-bottom:10px;">'
    +   '<div style="width:6px;height:6px;border-radius:50%;background:#4CAF50;"></div>'
    +   '<span style="font-size:10px;color:var(--mid);font-family:Montserrat,sans-serif;font-weight:700;">Mirror Advisors Chatbot</span>'
    + '</div>'
    // Opening
    + sectionLabel('Opening')
    + bubble(tree.opening)
    // Top-level choices
    + (tree.topics && tree.topics.length
      ? '<div style="display:flex;flex-wrap:wrap;gap:2px;margin-top:6px;">'
        + tree.topics.map(function(t){ return choicePill(t.label); }).join('')
        + '</div>'
      : '<div style="font-size:11px;color:var(--dim);font-style:italic;margin-top:6px;">No topics yet.</div>')
    + (tree.topics || []).map(function(t){
        var topicHTML = pickArrow(t.label || '(unnamed)')
          + '<div style="border-left:2px solid rgba(236,169,52,.22);padding-left:10px;margin-bottom:14px;display:flex;flex-direction:column;gap:6px;">'
          + bubble(t.answer);
        if(t.choices && t.choices.length){
          topicHTML += '<div style="display:flex;flex-wrap:wrap;gap:2px;margin-top:2px;">'
            + t.choices.map(function(c){ return choicePill(c.label); }).join('')
            + '</div>';
          // Nested: each choice's response (with route-aware rendering)
          topicHTML += t.choices.map(function(c){
            var route = c.route || 'answer';
            var nestedColor = 'rgba(107,159,212,.22)';
            var routeNote = '';
            var routeContent = '';
            if(route === 'cta'){
              nestedColor = 'rgba(76,175,80,.4)';
              routeNote = '<div style="display:inline-block;font-size:9px;padding:2px 8px;border-radius:100px;background:rgba(76,175,80,.12);border:1px solid rgba(76,175,80,.3);color:#4CAF50;font-family:Montserrat,sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.05em;">📞 Opens contact form</div>';
            } else if(route === 'goto'){
              nestedColor = 'rgba(139,159,212,.4)';
              routeNote = '<div style="display:inline-block;font-size:9px;padding:2px 8px;border-radius:100px;background:rgba(139,159,212,.12);border:1px solid rgba(139,159,212,.3);color:#8B9FD4;font-family:Montserrat,sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.05em;">🔗 Navigates to: '+_esc(_ctGotoLabel(c.goto))+'</div>';
            } else if(route === 'reset'){
              nestedColor = 'rgba(255,255,255,.2)';
              routeNote = '<div style="display:inline-block;font-size:9px;padding:2px 8px;border-radius:100px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);color:var(--dim);font-family:Montserrat,sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.05em;">⬅ Shows topics again</div>';
            } else {
              // 'answer' or 'answer-end'
              var node = (tree.nodes && tree.nodes[c.nodeId]) || { answer:'' };
              routeContent = bubble(node.answer);
              if(route === 'answer-end'){
                routeContent += '<div style="display:inline-block;font-size:9px;padding:2px 8px;border-radius:100px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:var(--dim);font-family:Montserrat,sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-top:2px;">End — no follow-up buttons</div>';
              } else {
                // Default 'answer': show the auto-appended fallback pills the public chatbot adds
                routeContent += '<div style="display:flex;flex-wrap:wrap;gap:2px;margin-top:4px;opacity:.6;">'
                  + '<div style="display:inline-block;padding:3px 9px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:100px;font-size:10px;color:var(--dim);font-family:Montserrat,sans-serif;font-weight:700;">⬅ Back to topics</div>'
                  + '<div style="display:inline-block;padding:3px 9px;background:rgba(236,169,52,.08);border:1px solid rgba(236,169,52,.2);border-radius:100px;font-size:10px;color:var(--t);font-family:Montserrat,sans-serif;font-weight:700;">📞 Book a Strategy Session</div>'
                  + '</div>';
              }
            }
            return pickArrow(c.label || '(unnamed)')
              + '<div style="border-left:2px solid '+nestedColor+';padding-left:10px;display:flex;flex-direction:column;gap:4px;margin-bottom:6px;">'
              +   (routeNote || routeContent)
              + '</div>';
          }).join('');
        } else {
          topicHTML += '<div style="font-size:10px;color:var(--dim);font-style:italic;margin-top:2px;">No follow-up choices.</div>';
        }
        topicHTML += '</div>';
        return '<div style="margin-top:10px;">' + topicHTML + '</div>';
      }).join('')
    // Fallback footer
    + '<div style="margin-top:14px;padding-top:10px;border-top:1px dashed rgba(255,255,255,.08);">'
    +   sectionLabel('Fallback (shown when no match)')
    +   bubble(tree.fallback)
    + '</div>'
    + '</div>';

  pf.innerHTML = html;
};

function adminRenderSidebar(){
  // REWRITTEN — fully delegated. No per-row listener allocation, no per-row
  // re-binding. One click and one keydown listener on the list container,
  // bound once for the lifetime of the dash. Re-renders only update the
  // innerHTML (cheap; one DOMParser pass) — no allocation per case row.
  var list  = document.getElementById('adminCaseList');
  var count = document.getElementById('adminCaseCount');
  if(!list){ console.warn('[admin/cases] adminRenderSidebar: no #adminCaseList in DOM'); return; }
  if(count) count.textContent = (window._CASES||[]).length;

  // Build markup with NO inline onclick (no event-attribute risk).
  list.innerHTML = (window._CASES||[]).map(function(c,i){
    var cols = _CATEGORY_COLORS[c.cat] || {tc:'rgba(255,255,255,.1)',tt:'#fff'};
    var hiddenStyle = c.hidden ? ' style="opacity:.5;cursor:pointer"' : ' style="cursor:pointer"';
    var hiddenBadge = c.hidden ? '<span style="display:inline-block;margin-left:6px;padding:1px 6px;border-radius:100px;background:rgba(139,159,212,.12);border:1px solid rgba(139,159,212,.3);color:#8B9FD4;font-family:Montserrat,sans-serif;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;vertical-align:middle;">Hidden</span>' : '';
    return '<div class="admin-case-item' + (i===_adminIdx?' active':'') + '"' + hiddenStyle + ' data-case-idx="' + i + '" role="button" tabindex="0">'
      + '<div class="admin-case-item-title">' + _esc(c.title||'(untitled)') + hiddenBadge + '</div>'
      + '<span class="admin-case-item-cat" style="background:' + cols.tc + ';color:' + cols.tt + '">' + _esc(c.cat||'') + '</span>'
      + '</div>';
  }).join('');

  // Bind delegated handlers ONCE per list element. Subsequent re-renders
  // reuse the same listeners — no per-row allocation, no leak.
  if(!list.__casesDelegateBound){
    list.__casesDelegateBound = true;
    list.addEventListener('click', function(e){
      var row = e.target && e.target.closest ? e.target.closest('.admin-case-item[data-case-idx]') : null;
      if(!row) return;
      var idx = parseInt(row.getAttribute('data-case-idx'), 10);
      if(isNaN(idx)) return;
      console.log('[admin/cases] delegated click → idx', idx);
      try { window.adminEditCase && window.adminEditCase(idx); } catch(err){ console.error(err); }
    });
    list.addEventListener('keydown', function(e){
      if(e.key !== 'Enter' && e.key !== ' ') return;
      var row = e.target && e.target.closest ? e.target.closest('.admin-case-item[data-case-idx]') : null;
      if(!row) return;
      var idx = parseInt(row.getAttribute('data-case-idx'), 10);
      if(isNaN(idx)) return;
      e.preventDefault();
      try { window.adminEditCase && window.adminEditCase(idx); } catch(err){ console.error(err); }
    });
  }

  // Expose for the rest of the runtime.
  window.adminRenderSidebar = adminRenderSidebar;
}

// Cheap variant: update only the .active class on existing rows. Used when
// switching cases — avoids re-rendering the whole list.
function adminUpdateSidebarActive(){
  var list = document.getElementById('adminCaseList');
  if(!list) return;
  var rows = list.querySelectorAll('.admin-case-item[data-case-idx]');
  for(var i = 0; i < rows.length; i++){
    var idx = parseInt(rows[i].getAttribute('data-case-idx'), 10);
    rows[i].classList.toggle('active', idx === _adminIdx);
  }
}

// Refresh the Card Image field after upload / removal: swap the preview
// thumbnail and toggle the Remove button visibility. Cheaper than re-rendering
// the whole editor.
function _refreshCardMediaRow(){
  var preview = document.getElementById('cardMediaPreview');
  if(preview){
    preview.innerHTML = _adminCardMedia
      ? adminMediaPreviewHTML(_adminCardMedia, 'card')
      : '<div class="uz-text" style="text-align:center;padding:18px 12px;color:var(--dim);font-size:12px;line-height:1.5"><strong style="color:var(--tx);font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase">Click to upload</strong><br><span style="opacity:.7">or drag &amp; drop</span></div>';
  }
  // Show/hide Remove button. If it doesn't exist (no media), inject it.
  var label = preview ? preview.closest('.admin-field') : null;
  if(!label) return;
  var labelEl = label.querySelector('label');
  if(!labelEl) return;
  var clear = labelEl.querySelector('#ae-card-clear');
  if(_adminCardMedia){
    if(!clear){
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'ae-card-clear';
      btn.textContent = 'Remove';
      btn.style.cssText = 'background:transparent;border:1px solid rgba(255,100,100,.25);color:#FF8080;font-family:Montserrat,sans-serif;font-size:10px;font-weight:700;padding:4px 10px;border-radius:6px;cursor:pointer;letter-spacing:.04em;text-transform:uppercase';
      btn.addEventListener('click', function(e){
        e.preventDefault(); e.stopPropagation();
        _adminCardMedia = null;
        _adminCardMediaCleared = true;
        _refreshCardMediaRow();
        if(typeof window.adminLivePreview === 'function') window.adminLivePreview();
      });
      labelEl.appendChild(btn);
    }
  } else if(clear){
    clear.parentNode.removeChild(clear);
  }
}

function adminGetFormValues(){
  // Read from DOM if available, fall back to cache (when on Detail tab)
  function val(id){
    var el = document.getElementById(id);
    if(el) return el.value.trim();
    return (_aeCardCache[id] || '').trim();
  }
  var existing = _adminIdx>=0 ? window._CASES[_adminIdx] : null;
  // Featured: prefer current checkbox state if present; else fall back to existing
  var featuredEl = document.getElementById('ae-featured');
  var featured = featuredEl ? !!featuredEl.checked : (existing ? !!existing.featured : false);
  return {
    title:       val('ae-title'),
    cat:         val('ae-cat') || (existing ? existing.cat : 'AI Integration'),
    m1:          val('ae-m1'),
    ml1:         val('ae-ml1'),
    m2:          val('ae-m2'),
    ml2:         val('ae-ml2'),
    glyph:       val('ae-glyph') || (existing ? existing.glyph : ''),
    tt:          val('ae-tt') || (existing ? existing.tt : '#ECA934'),
    desc:        val('ae-desc'),
    featured:    featured,
    // If the user explicitly cleared the card image, surface that as a
    // genuine null so adminBuildCaseObj doesn't restore existing.cardMedia.
    _existingCardMedia:   _adminCardMediaCleared
                            ? null
                            : (_adminCardMedia || (existing ? existing.cardMedia : null)),
    _adminCardMediaCleared: _adminCardMediaCleared,
    _existingDetailMedia: existing ? existing.detailMedia : null,
  };
}

function adminBuildCaseObj(vals, opts){
  // opts.skipBlocksClone: when true, share the _adminBlocks reference instead
  // of deep-cloning. Safe for read-only consumers like the live preview
  // (which never mutates the blocks array). adminSaveCase still passes
  // opts undefined so the persisted snapshot is a real copy.
  var cols = _CATEGORY_COLORS[vals.cat]||{tc:'rgba(255,255,255,.1)',tt:'#fff',gc:'rgba(255,255,255,.04)'};
  var tt   = vals.tt || cols.tt;
  return {
    cat:     vals.cat,
    title:   vals.title,
    desc:    vals.desc,
    m1:      vals.m1,  ml1: vals.ml1,
    m2:      vals.m2,  ml2: vals.ml2,
    glyph:   vals.glyph || (_GLYPHS[vals.cat]||'?'),
    tt: tt, tc: cols.tc, gc: cols.gc,
    cardMedia:   _adminCardMedia
                   ? Object.assign({}, _adminCardMedia)
                   : (vals._adminCardMediaCleared
                        ? null
                        : (vals._existingCardMedia || null)),
    detailMedia: vals._existingDetailMedia || null,
    blocks:  (opts && opts.skipBlocksClone) ? _adminBlocks : JSON.parse(JSON.stringify(_adminBlocks)),
    featured: !!vals.featured,
  };
}

function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

window.adminHandleMedia = function(slot, input){
  var file = input.files[0];
  if(!file) return;
  if(file.size > 5*1024*1024){ alert('File too large — max 5MB'); return; }
  var reader = new FileReader();
  reader.onload = function(e){
    var type = file.type.startsWith('video') ? 'video' : (file.name.endsWith('.gif') ? 'gif' : 'image');
    var media = { src: e.target.result, type: type };
    if(slot === 'card'){
      _adminCardMedia = media;
      _adminCardMediaCleared = false; // new upload supersedes any prior Remove
      // Refresh the card-media row (thumbnail + Remove button).
      if(typeof _refreshCardMediaRow === 'function'){
        _refreshCardMediaRow();
      } else {
        var prev = document.getElementById('cardMediaPreview');
        if(prev) prev.innerHTML = adminMediaPreviewHTML(media, 'card');
      }
    }
    adminLivePreview();
  };
  reader.readAsDataURL(file);
};

window.adminPickColor = function(col){
  var inp=document.getElementById('ae-tt'); if(inp) inp.value=col;
  document.querySelectorAll('.admin-color-chip').forEach(function(ch){ ch.classList.toggle('selected',ch.title===col); });
  adminLivePreview();
};
window.adminCatChange = function(){
  var cat=document.getElementById('ae-cat').value;
  var cols=_CATEGORY_COLORS[cat];
  if(cols){ var inp=document.getElementById('ae-tt'); if(inp){inp.value=cols.tt;} document.querySelectorAll('.admin-color-chip').forEach(function(ch){ch.classList.toggle('selected',ch.title===cols.tt);}); var gl=document.getElementById('ae-glyph'); if(gl&&!gl.value) gl.value=_GLYPHS[cat]||'?'; }
  adminLivePreview();
};
// Debounced live preview. oninput fires on every keystroke; without debouncing
// each keystroke kicks off a DOM-query → object-build → innerHTML cycle that
// makes typing visibly laggy on slower devices. We mark "dirty" + show the
// badge IMMEDIATELY (no debounce — that's just a class toggle), then schedule
// the heavy render via requestAnimationFrame + 80ms timer so back-to-back
// keystrokes coalesce into one render.
var _alpTimer = null;
var _alpRAF   = null;
function _alpRenderNow(){
  _alpTimer = null;
  _alpRAF   = null;
  var pf = document.getElementById('adminPreviewContent');
  if(!pf) return;
  // Bail if editor was torn down between the keystroke and the timeout.
  if(!document.getElementById('ae-title') && _adminIdx < 0) return;
  var vals = adminGetFormValues();
  // Cheap object build — skip the blocks deep-clone for preview (blocks
  // don't mutate during card-tab edits, so the reference is safe).
  var c = adminBuildCaseObj(vals, { skipBlocksClone: true });
  var showDetail = (_adminTab === 'detail') || (_aeActiveTab === 'content');
  if(!showDetail){
    pf.style.padding = '32px';
    if(c.title || c.desc){
      pf.innerHTML = '<div style="max-width:340px">'+_renderCardPreview(c)+'</div>';
    } else {
      pf.innerHTML = '<div class="admin-empty"><div class="admin-empty-icon">🃏</div><p>Fill in the title and description to see a preview.</p></div>';
    }
  } else {
    pf.style.padding = '0';
    pf.innerHTML = _renderDetailPreview(c);
    // Post-render: scale the 1180px detail layout to fit the preview pane.
    // We need a frame so the inner content has its real scrollHeight.
    var apply = function(){
      var clip  = pf.querySelector('#_ae-detail-clip');
      var inner = pf.querySelector('#_ae-detail-inner');
      if(!clip || !inner) return;
      var availW = clip.clientWidth || pf.clientWidth || 280;
      var scale  = Math.max(0.12, Math.min(1, availW / 1180));
      inner.style.transform = 'scale(' + scale + ')';
      // Layout height of unscaled inner × scale = visible height.
      // scrollHeight reads the untransformed box.
      var h = inner.scrollHeight * scale;
      clip.style.height = Math.ceil(h) + 'px';
    };
    if(typeof requestAnimationFrame === 'function'){
      requestAnimationFrame(apply);
    } else {
      setTimeout(apply, 0);
    }
  }
}
window.adminLivePreview = function(){
  // Cheap, synchronous work: dirty-flag + badge. No DOM thrash.
  if(!_adminDirty){
    _adminDirty = true;
    var badge = document.getElementById('adminUnsavedBadge');
    if(badge) badge.style.display = 'inline';
  }
  // Coalesce heavy preview render. Cancel any pending fire.
  if(_alpTimer){ clearTimeout(_alpTimer); _alpTimer = null; }
  if(_alpRAF != null && typeof cancelAnimationFrame === 'function'){ cancelAnimationFrame(_alpRAF); _alpRAF = null; }
  _alpTimer = setTimeout(function(){
    _alpTimer = null;
    if(typeof requestAnimationFrame === 'function'){
      _alpRAF = requestAnimationFrame(_alpRenderNow);
    } else {
      _alpRenderNow();
    }
  }, 80);
};
// Synchronous version for callers that need the preview right now
// (e.g. initial editor population, tab switches).
window.adminLivePreviewNow = _alpRenderNow;
function _renderCardPreview(c){
  var cardM=_adminCardMedia||c.cardMedia||null;
  return '<div class="ccard" style="pointer-events:none">'
    +'<div class="cc-img" style="background:'+(c.gc||'rgba(255,255,255,.04)')+'">'
    +(cardM?('<div class="cc-img-media">'+(cardM.type==='video'?'<video autoplay loop muted playsinline src="'+cardM.src+'"></video>':'<img src="'+cardM.src+'" alt="">')+'</div><div class="cc-img-overlay-dark"></div>'):'<div class="cc-img-glyph" style="color:'+(c.tt||'var(--t)')+'">'+(c.glyph||'?')+'</div><div class="cc-img-overlay"></div>')
    +'</div>'
    +'<div class="cc-body">'
    +'<span class="cc-tag" style="background:'+c.tc+';color:'+c.tt+'">'+c.cat+'</span>'
    +'<div class="cc-title">'+(c.title||'Untitled')+'</div>'
    +'<div class="cc-desc">'+(c.desc||'')+'</div>'
    +'<div class="cc-metrics"><div><div class="cc-m-val">'+(c.m1||'—')+'</div><div class="cc-m-lbl">'+(c.ml1||'')+'</div></div><div><div class="cc-m-val">'+(c.m2||'—')+'</div><div class="cc-m-lbl">'+(c.ml2||'')+'</div></div></div>'
    +'<div class="cc-read">Read case study <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>'
    +'</div></div>';
}
function _renderDetailPreview(c){
  // Render the FULL detail page exactly as visitors see it — hero, metrics
  // strip, two-column layout (content blocks + Project Details sidebar +
  // CTA card), accent colours, the works. Footer + nav links are disabled
  // via preview:true so the user can scroll the actual content.
  //
  // Block source: prefer the in-progress _adminBlocks (user's unsaved
  // edits in the Detail Page tab). Fall back to the case's saved blocks
  // if the user hasn't opened the Detail Page tab yet. Then to defaults.
  var blockSource;
  if(_adminBlocks && _adminBlocks.length)        blockSource = _adminBlocks;
  else if(c.blocks && c.blocks.length)           blockSource = c.blocks;
  else                                           blockSource = null; // let _buildCaseDetailHTML compute defaults from c

  // Patch c.blocks just for this render so _buildCaseDetailHTML picks up
  // the in-progress blocks. (We're working on a temporary object built by
  // adminBuildCaseObj — not window._CASES — so this is safe.)
  var renderCase = c;
  if(blockSource){
    renderCase = Object.assign({}, c, { blocks: blockSource });
  }

  if(typeof _buildCaseDetailHTML === 'function'){
    // Wrap in a fixed-width container that the live-preview loop will scale
    // down to fit the narrow preview pane. The inner renders at 1180px
    // (desktop layout) so proportions match production; _alpRenderNow
    // computes the actual scale factor + clip height from clientWidth.
    // Initial inline scale ~0.25 prevents a one-frame flash of unscaled
    // content before RAF runs.
    var inner = _buildCaseDetailHTML(renderCase, { preview: true });
    return '<div id="_ae-detail-clip" style="position:relative;width:100%;overflow:hidden;height:400px">'
         +   '<div id="_ae-detail-inner" style="width:1180px;transform-origin:top left;transform:scale(0.25)">'
         +     inner
         +   '</div>'
         + '</div>';
  }
  // Fallback (shouldn't happen, but keeps the preview alive if the symbol
  // somehow isn't on the page).
  var tt=c.tt||'#ECA934'; var tc=c.tc||'rgba(236,169,52,.12)';
  var blocks=blockSource||_defaultBlocks(c);
  return '<div class="cd-hero" style="background:radial-gradient(ellipse at 60% 30%,'+tc+' 0%,transparent 60%),#080B1A;padding:60px 32px 40px">'
    +'<div style="max-width:900px;margin:0 auto">'
    +'<div class="cd-meta-row"><span class="cd-tag" style="background:'+tc+';color:'+tt+'">'+c.cat+'</span></div>'
    +'<h1 class="cd-h1" style="font-size:clamp(24px,3vw,40px)">'+(c.title||'Untitled')+'</h1>'
    +'<p class="cd-lead" style="font-size:14px">'+(c.desc||'')+'</p>'
    +'</div></div>'
    +_renderBlocks(blocks,tt,tc);
}
// ── SIMPLE CASE EDITOR (rewrite) ─────────────────────────────────────────────
// A clean, self-contained editor. No tabs. No async re-rendering. No fancy
// block editor. Just title/category/description/metrics + media + featured
// toggle. Direct save to Supabase via the existing _persist('cases', ...)
// path. Bypasses _aeRenderTab entirely so the "editor flashes then disappears"
// bug class can't recur.
window.adminEditCase = function(idx){
  console.log('[admin/cases] adminEditCase(' + idx + ') called.');
  var cases = window._CASES || [];
  if(typeof idx !== 'number' || idx < 0 || idx >= cases.length){
    console.warn('[admin/cases] No case at idx', idx, '— total cases:', cases.length);
    return;
  }
  var c = cases[idx];
  if(!c){ console.warn('[admin/cases] Case at idx', idx, 'is null/undefined'); return; }

  _adminIdx = idx;
  _adminCardMedia   = c.cardMedia   || null;
  _adminDetailMedia = c.detailMedia || null;
  _adminCardMediaCleared = false;
  _adminBlocks      = c.blocks ? JSON.parse(JSON.stringify(c.blocks)) : [];
  _aeActiveTab      = 'card';
  _aeCardCache      = {};
  _blCollapsed      = {};

  // Ensure mode is correct so no other dashboard handler stomps on the DOM.
  _adminMode = 'cases';
  // Cheap path: just toggle the .active class. Falls back to full re-render
  // if the sidebar hasn't been built yet (first open).
  if(document.getElementById('adminCaseList') && document.querySelector('#adminCaseList .admin-case-item[data-case-idx]')){
    adminUpdateSidebarActive();
  } else if(typeof adminRenderSidebar === 'function'){
    adminRenderSidebar();
  }

  var eb   = document.getElementById('adminEditorBody');
  var titl = document.getElementById('adminEditorTitle');
  var acts = document.getElementById('adminEditorActions');
  if(!eb){
    console.error('[admin/cases] No #adminEditorBody — Cases dash not rendered? Re-rendering…');
    var dc = document.getElementById('adminDashContent');
    if(dc){ adminRenderCasesDash(dc); eb = document.getElementById('adminEditorBody'); }
    if(!eb){ return; }
    titl = document.getElementById('adminEditorTitle');
    acts = document.getElementById('adminEditorActions');
  }
  if(titl) titl.textContent = 'Edit: ' + String(c.title || '').slice(0, 40);
  if(acts) acts.style.display = 'flex';

  var cats = ['AI Integration','ERP Deployment','Systems Integration','AI + Analytics','Consulting'];

  // ── TAB NAV ───────────────────────────────────────────────────────────────
  // Two tabs: "Card" (the form below) and "Detail Page" (the long-form
  // content blocks shown when a visitor clicks "Read case study"). Both
  // tab bodies are rendered into the DOM at the same time and toggled with
  // display:none — that way text typed into the Card form doesn't get
  // discarded when the user switches to Detail and back.
  var tabBarHTML =
      '<div id="ae-tabs" style="display:flex;gap:2px;margin:-16px -20px 16px;padding:0 20px;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.18)">'
    +   '<button type="button" data-ae-tab="card" class="ae-tab-btn" style="background:transparent;border:none;color:var(--t);font-family:Montserrat,sans-serif;font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:14px 18px 12px;cursor:pointer;border-bottom:2px solid var(--t);margin-bottom:-1px">Card</button>'
    +   '<button type="button" data-ae-tab="detail" class="ae-tab-btn" style="background:transparent;border:none;color:var(--dim);font-family:Montserrat,sans-serif;font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:14px 18px 12px;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px">Detail Page</button>'
    + '</div>';

  eb.innerHTML = tabBarHTML
    + '<div id="ae-tab-card">'

    +   '<div class="admin-field"><label>Case Study Title *</label>'
    +     '<input id="ae-title" value="'+_esc(c.title||'')+'" oninput="adminLivePreview()" placeholder="e.g. Claude sales agent cuts response time 84%"></div>'

    + '<div class="admin-field" style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;background:rgba(236,169,52,0.06);border:1px solid rgba(236,169,52,0.2);">'
    +   '<input id="ae-featured" type="checkbox" '+(c.featured?'checked':'')+' onchange="adminLivePreview()" style="width:18px;height:18px;cursor:pointer;accent-color:#ECA934;flex-shrink:0;">'
    +   '<label for="ae-featured" style="cursor:pointer;font-family:Montserrat,sans-serif;font-size:12px;font-weight:700;color:var(--t);margin:0;">⭐ Featured case study</label>'
    +   '<span style="font-size:11px;color:var(--dim);margin-left:auto;">Only one allowed</span>'
    + '</div>'

    + '<div class="admin-field"><label>Category</label>'
    +   '<select id="ae-cat" onchange="adminLivePreview()">'
    +   cats.map(function(cat){ return '<option'+(c.cat===cat?' selected':'')+'>'+cat+'</option>'; }).join('')
    +   '</select></div>'

    + '<div class="admin-field"><label>Short Description *</label>'
    +   '<textarea id="ae-desc" rows="3" oninput="adminLivePreview()">'+_esc(c.desc||'')+'</textarea></div>'

    // ── CARD MEDIA (image / GIF / short video) ──────────────────────────────
    // Sits above the metrics row. When present, replaces the glyph in the
    // top half of the card.
    // Recommended size below = 2x the rendered card-image area (~377×160 at
    // 1180px max-width / 3-col grid → 754×320 retina → rounded to 800×340).
    + '<div class="admin-field">'
    +   '<label style="display:flex;align-items:center;justify-content:space-between;gap:8px;">'
    +     '<span>Card Image <span style="opacity:.55;font-weight:400">(optional)</span></span>'
    +     (c.cardMedia ? '<button type="button" id="ae-card-clear" style="background:transparent;border:1px solid rgba(255,100,100,.25);color:#FF8080;font-family:Montserrat,sans-serif;font-size:10px;font-weight:700;padding:4px 10px;border-radius:6px;cursor:pointer;letter-spacing:.04em;text-transform:uppercase">Remove</button>' : '')
    +   '</label>'

    // Size-recommendation hint card — pixel size + aspect ratio + format.
    +   '<div style="display:flex;align-items:center;gap:8px;padding:8px 12px;margin-bottom:8px;border-radius:8px;background:rgba(107,159,212,.06);border:1px solid rgba(107,159,212,.18);font-family:DM Sans,sans-serif;font-size:11px;color:var(--mid);line-height:1.45">'
    +     '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B9FD4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>'
    +     '<div>'
    +       '<strong style="color:var(--tx);font-family:Montserrat,sans-serif;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.07em">Best fit</strong>'
    +       '<span style="opacity:.85"> &nbsp;800 × 340 px &nbsp;·&nbsp; aspect ratio ~2.4 : 1 &nbsp;·&nbsp; PNG, JPG, GIF or MP4</span>'
    +     '</div>'
    +   '</div>'

    +   '<div id="ae-card-zone" style="border:1px dashed rgba(255,255,255,.18);border-radius:10px;padding:10px;cursor:pointer;background:rgba(255,255,255,.025);transition:border-color .15s,background .15s;">'
    +     '<input type="file" id="cardMediaInput" accept="image/*,.gif,video/*" style="display:none">'
    +     '<div id="cardMediaPreview">'
    +       (c.cardMedia ? adminMediaPreviewHTML(c.cardMedia,'card') : '<div class="uz-text" style="text-align:center;padding:18px 12px;color:var(--dim);font-size:12px;line-height:1.5"><strong style="color:var(--tx);font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase">Click to upload</strong><br><span style="opacity:.7">or drag & drop</span></div>')
    +     '</div>'
    +   '</div>'
    + '</div>'

    + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">'
    +   '<div class="admin-field" style="margin-bottom:0"><label>Metric 1 Value</label><input id="ae-m1" value="'+_esc(c.m1||'')+'" oninput="adminLivePreview()" placeholder="84%"></div>'
    +   '<div class="admin-field" style="margin-bottom:0"><label>Metric 1 Label</label><input id="ae-ml1" value="'+_esc(c.ml1||'')+'" oninput="adminLivePreview()" placeholder="Faster Response"></div>'
    + '</div>'
    + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">'
    +   '<div class="admin-field" style="margin-bottom:0"><label>Metric 2 Value</label><input id="ae-m2" value="'+_esc(c.m2||'')+'" oninput="adminLivePreview()" placeholder="3x"></div>'
    +   '<div class="admin-field" style="margin-bottom:0"><label>Metric 2 Label</label><input id="ae-ml2" value="'+_esc(c.ml2||'')+'" oninput="adminLivePreview()" placeholder="Pipeline Handled"></div>'
    + '</div>'

    + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">'
    +   '<div class="admin-field" style="margin-bottom:0"><label>Accent Colour</label><input id="ae-tt" value="'+_esc(c.tt||'#ECA934')+'" oninput="adminLivePreview()" style="font-family:monospace;font-size:12px"></div>'
    +   '<div class="admin-field" style="margin-bottom:0"><label>Glyph</label><input id="ae-glyph" value="'+_esc(c.glyph||'')+'" maxlength="4" oninput="adminLivePreview()" placeholder="AI"></div>'
    + '</div>'

    + '</div>' // /#ae-tab-card

    // ── DETAIL PAGE TAB ─────────────────────────────────────────────────────
    // The long-form content blocks rendered on /cases/<id>. Hidden by
    // default; the tab nav above toggles display.
    + '<div id="ae-tab-detail" style="display:none">'
    +   '<div style="font-size:12px;color:var(--dim);margin-bottom:14px;line-height:1.6">'
    +     'Build the case-study page that opens when a visitor clicks <em style="color:var(--mid)">"Read case study"</em>. Drag blocks to reorder, click a block to expand and edit.'
    +   '</div>'
    +   '<div id="blockList" style="margin-bottom:14px"></div>'
    +   '<div style="border-top:1px dashed rgba(255,255,255,.1);padding-top:14px">'
    +     '<div style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--dim);margin-bottom:8px">Add Block</div>'
    +     '<div style="display:flex;flex-wrap:wrap;gap:6px">'
    +       '<button type="button" class="bl-add-btn" onclick="adminAddBlock(\'section\')">📝 Text Section</button>'
    +       '<button type="button" class="bl-add-btn" onclick="adminAddBlock(\'metrics\')">📊 Metrics</button>'
    +       '<button type="button" class="bl-add-btn" onclick="adminAddBlock(\'media\')">🖼 Image / Video</button>'
    +       '<button type="button" class="bl-add-btn" onclick="adminAddBlock(\'callout\')">💡 Callout</button>'
    +       '<button type="button" class="bl-add-btn" onclick="adminAddBlock(\'quote\')">❝ Quote</button>'
    +       '<button type="button" class="bl-add-btn" onclick="adminAddBlock(\'cta\')">🔗 CTA Buttons</button>'
    +       '<button type="button" class="bl-add-btn" onclick="adminAddBlock(\'divider\')">— Divider</button>'
    +     '</div>'
    +   '</div>'
    + '</div>'; // /#ae-tab-detail

  _adminDirty = false;
  var ub = document.getElementById('adminUnsavedBadge');
  if(ub) ub.style.display = 'none';

  // Populate cache so adminGetFormValues can fall back to it if needed.
  _aeCardCache = {
    'ae-title': c.title||'', 'ae-cat': c.cat||'AI Integration',
    'ae-m1': c.m1||'', 'ae-ml1': c.ml1||'',
    'ae-m2': c.m2||'', 'ae-ml2': c.ml2||'',
    'ae-tt': c.tt||'#ECA934', 'ae-glyph': c.glyph||'',
    'ae-desc': c.desc||''
  };

  // ── Wire up Card / Detail tab nav ───────────────────────────────────────────
  // Both tab bodies (#ae-tab-card and #ae-tab-detail) live in the DOM
  // simultaneously. Switching just flips display, preserving form state.
  (function bindTabs(){
    var bar = document.getElementById('ae-tabs');
    if(!bar) return;
    var card   = document.getElementById('ae-tab-card');
    var detail = document.getElementById('ae-tab-detail');
    var btns   = bar.querySelectorAll('.ae-tab-btn');

    function setTab(name){
      _aeActiveTab = (name === 'detail') ? 'content' : 'card';
      if(card)   card.style.display   = (name === 'card')   ? ''     : 'none';
      if(detail) detail.style.display = (name === 'detail') ? 'block': 'none';
      for(var i = 0; i < btns.length; i++){
        var b = btns[i];
        var active = b.getAttribute('data-ae-tab') === name;
        b.style.color = active ? 'var(--t)' : 'var(--dim)';
        b.style.borderBottomColor = active ? 'var(--t)' : 'transparent';
      }
      if(typeof window.adminLivePreviewNow === 'function') window.adminLivePreviewNow();
    }
    for(var i = 0; i < btns.length; i++){
      (function(btn){
        btn.addEventListener('click', function(e){
          e.preventDefault();
          setTab(btn.getAttribute('data-ae-tab'));
        });
      })(btns[i]);
    }
    // Default to Card tab on open.
    setTab('card');
  })();

  // Mount the block list once the detail-tab container exists.
  if(typeof adminRenderBlockList === 'function'){
    try { adminRenderBlockList(); } catch(e){ console.error('[admin/cases] adminRenderBlockList failed:', e); }
  }

  // ── Wire up the card-media upload zone ──────────────────────────────────────
  // Click the zone → opens file picker.
  // Drag-and-drop → reads same file via adminHandleMedia.
  // The "Remove" button (only present when there's existing media) clears it.
  (function bindCardMedia(){
    var zone  = document.getElementById('ae-card-zone');
    var input = document.getElementById('cardMediaInput');
    var clear = document.getElementById('ae-card-clear');
    if(zone && input){
      zone.addEventListener('click', function(e){
        // Avoid double-trigger if the click was on the Remove button (it sits
        // in the label above, but be safe).
        if(e.target && e.target.id === 'ae-card-clear') return;
        input.click();
      });
      input.addEventListener('change', function(){
        if(typeof window.adminHandleMedia === 'function'){
          window.adminHandleMedia('card', input);
          // Re-render the editor row so the Remove button appears.
          _refreshCardMediaRow();
        }
      });
      // Drag-and-drop UX.
      ['dragenter','dragover'].forEach(function(ev){
        zone.addEventListener(ev, function(e){
          e.preventDefault(); e.stopPropagation();
          zone.style.borderColor = 'rgba(236,169,52,.6)';
          zone.style.background  = 'rgba(236,169,52,.06)';
        });
      });
      ['dragleave','drop'].forEach(function(ev){
        zone.addEventListener(ev, function(e){
          e.preventDefault(); e.stopPropagation();
          zone.style.borderColor = 'rgba(255,255,255,.18)';
          zone.style.background  = 'rgba(255,255,255,.025)';
        });
      });
      zone.addEventListener('drop', function(e){
        e.preventDefault(); e.stopPropagation();
        var dt = e.dataTransfer;
        if(!dt || !dt.files || !dt.files.length) return;
        // Stuff the file into the hidden input so adminHandleMedia can read it.
        try { input.files = dt.files; } catch(_){}
        if(typeof window.adminHandleMedia === 'function'){
          // adminHandleMedia reads input.files[0] directly; assigning above
          // works on modern browsers. Fall back to a manual call otherwise.
          if(input.files && input.files.length){
            window.adminHandleMedia('card', input);
          } else {
            // Older browsers reject FileList assignment — call the reader manually.
            var f = dt.files[0];
            if(f.size > 5*1024*1024){ alert('File too large — max 5MB'); return; }
            var reader = new FileReader();
            reader.onload = function(ev){
              var type = f.type.indexOf('video') === 0 ? 'video' : (f.name.match(/\.gif$/i) ? 'gif' : 'image');
              _adminCardMedia = { src: ev.target.result, type: type };
              var prev = document.getElementById('cardMediaPreview');
              if(prev) prev.innerHTML = adminMediaPreviewHTML(_adminCardMedia, 'card');
              if(typeof window.adminLivePreview === 'function') window.adminLivePreview();
            };
            reader.readAsDataURL(f);
          }
          _refreshCardMediaRow();
        }
      });
    }
    if(clear){
      clear.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        _adminCardMedia = null;
        _adminCardMediaCleared = true;
        _refreshCardMediaRow();
        if(typeof window.adminLivePreview === 'function') window.adminLivePreview();
        if(window._adminToast) window._adminToast('Card image removed. Don\'t forget to Save.');
      });
    }
  })();

  // Render preview SYNCHRONOUSLY on editor open so the user never sees a
  // blank preview pane. After that, every keystroke uses the debounced path.
  if(typeof window.adminLivePreviewNow === 'function') {
    window.adminLivePreviewNow();
  } else if(typeof window.adminLivePreview === 'function') {
    window.adminLivePreview();
  }
  console.log('[admin/cases] Editor populated. Body length:', eb.innerHTML.length);
};
window.adminNewCase = function(){
  console.log('[admin/cases] adminNewCase — creating draft.');
  // Insert a draft case into the list and immediately edit it. This way the
  // new case follows the exact same render path as edits → no special-case
  // code, no separate _aeRenderTab dependency.
  var draft = {
    cat: 'AI Integration',
    title: '',
    desc: '',
    m1: '', ml1: '',
    m2: '', ml2: '',
    glyph: '',
    tt: '#ECA934',
    cardMedia: null,
    detailMedia: null,
    blocks: [],
    featured: false,
  };
  window._CASES = window._CASES || [];
  window._CASES.push(draft);
  var newIdx = window._CASES.length - 1;
  // Don't persist the empty draft yet — wait for the user to save.
  window.adminEditCase(newIdx);
};
window.adminSaveCase = function(){
  var vals = adminGetFormValues();
  console.log('[admin/cases] adminSaveCase called. Form values:', vals, 'editing idx:', _adminIdx);

  // Distinguish a true new-case draft (pre-inserted by adminNewCase — has no
  // pre-existing data to fall back to) from an edit of a real saved case.
  var existing = (_adminIdx >= 0) ? window._CASES[_adminIdx] : null;
  var isDraft  = !!existing && !existing.title && !existing.desc && !existing.m1 && !existing.m2;
  var isNewish = (_adminIdx === -1) || isDraft;

  if(isNewish){
    if(!vals.title || !vals.m1 || !vals.ml1 || !vals.m2 || !vals.ml2 || !vals.desc){
      console.warn('[admin/cases] New-case validation failed. Missing:', {
        title:!vals.title, m1:!vals.m1, ml1:!vals.ml1,
        m2:!vals.m2, ml2:!vals.ml2, desc:!vals.desc
      });
      if(window._adminToast) window._adminToast('Please fill in all required fields.');
      return;
    }
  } else if(existing){
    // Real edit — fall back to existing values for blanks so partial edits work.
    if(!vals.title) vals.title = existing.title;
    if(!vals.m1)    vals.m1    = existing.m1;
    if(!vals.ml1)   vals.ml1   = existing.ml1;
    if(!vals.m2)    vals.m2    = existing.m2;
    if(!vals.ml2)   vals.ml2   = existing.ml2;
    if(!vals.desc)  vals.desc  = existing.desc;
    if(!vals.cat)   vals.cat   = existing.cat;
    if(!vals.glyph) vals.glyph = existing.glyph;
    if(!vals.tt)    vals.tt    = existing.tt;
  }
  var newCase = adminBuildCaseObj(vals);
  if(_adminIdx === -1){
    window._CASES.push(newCase);
    _adminIdx = window._CASES.length - 1;
  } else {
    // Preserve flags that aren't part of the form (e.g. hidden)
    var prev = window._CASES[_adminIdx];
    if(prev && prev.hidden) newCase.hidden = true;
    window._CASES[_adminIdx] = newCase;
  }
  // Only one case can be featured at a time — if this one is now featured,
  // unfeature every other case.
  if(newCase.featured){
    for(var fi=0; fi<window._CASES.length; fi++){
      if(fi !== _adminIdx && window._CASES[fi]) window._CASES[fi].featured = false;
    }
  }
  _adminDirty = false;
  var badge = document.getElementById('adminUnsavedBadge');
  if(badge) badge.style.display = 'none';
  var msg = document.getElementById('adminStatusMsg');
  if(msg){ msg.textContent = 'Saved ✓'; setTimeout(function(){ msg.textContent=''; }, 2000); }
  adminRenderSidebar();
  if(typeof window.renderCases === 'function') window.renderCases('All');
  if(typeof _refreshHomeScroll === 'function') _refreshHomeScroll();
  if(typeof window._renderFeaturedCase === 'function') window._renderFeaturedCase();
  // Stamp local-mutation time so any in-flight Supabase fetch ignores its
  // stale result and doesn't overwrite this change.
  window._casesLastMutatedAt = Date.now();
  // Notify any mounted case-detail pages that _CASES has changed so they
  // re-render with the saved data (same event Layout fires after Supabase
  // hydration completes).
  try { window.dispatchEvent(new CustomEvent('cases:hydrated', { detail: { source: 'admin-save' } })); } catch(_){}
  // Persist to Supabase so every visitor sees the update.
  _persist('cases', window._CASES);
  if(window._adminToast) window._adminToast('Case study saved ✓');
};
window.adminCancelEdit = function(){
  // If the currently-edited case is an empty draft (no title), drop it so we
  // don't leave phantom rows in the list when the user clicked + New and
  // then bailed out.
  if(_adminIdx >= 0 && window._CASES && window._CASES[_adminIdx]){
    var cur = window._CASES[_adminIdx];
    if(!cur.title && !cur.desc && !cur.m1 && !cur.m2){
      console.log('[admin/cases] adminCancelEdit dropping empty draft at idx', _adminIdx);
      window._CASES.splice(_adminIdx, 1);
    }
  }
  _adminIdx    = -1;
  _adminDirty  = false;
  _adminBlocks = [];
  _blCollapsed = {};
  _aeActiveTab = 'card';
  var t = document.getElementById('adminEditorTitle');
  if(t) t.textContent = 'Select a case to edit';
  var a = document.getElementById('adminEditorActions');
  if(a) a.style.display = 'none';
  var b = document.getElementById('adminUnsavedBadge');
  if(b) b.style.display = 'none';
  var eb = document.getElementById('adminEditorBody');
  if(eb) eb.innerHTML = '<div class="admin-empty"><div class="admin-empty-icon">&#9998;</div><p>Select a case study from the list or create a new one.</p></div>';
  var pc = document.getElementById('adminPreviewContent');
  if(pc){ pc.innerHTML='<div class="admin-empty"><div class="admin-empty-icon">&#128065;</div><p>Preview will appear here.</p></div>'; pc.style.padding='32px'; }
  adminRenderSidebar();
};
window.adminDeleteCase = function(){
  if(_adminIdx<0||_adminIdx>=window._CASES.length) return;
  if(!confirm('Delete "'+window._CASES[_adminIdx].title+'"?')) return;
  window._CASES.splice(_adminIdx,1); adminCancelEdit(); window.renderCases('All'); _refreshHomeScroll();
  if(typeof window._renderFeaturedCase === 'function') window._renderFeaturedCase();
  // Stamp local-mutation time so any in-flight Supabase fetch ignores its
  // stale result (otherwise the deleted case re-appears).
  window._casesLastMutatedAt = Date.now();
  // Notify mounted case-detail pages that _CASES has changed.
  try { window.dispatchEvent(new CustomEvent('cases:hydrated', { detail: { source: 'admin-delete' } })); } catch(_){}
  // Persist the updated cases array to Supabase.
  _persist('cases', window._CASES);
  _adminToast('Case study deleted.');
};

window.adminToggleHideCase = function(){
  if(_adminIdx<0||_adminIdx>=window._CASES.length) return;
  var c = window._CASES[_adminIdx];
  c.hidden = !c.hidden;
  // Update the public views immediately
  if(window.renderCases) window.renderCases('All');
  if(window._refreshHomeScroll) _refreshHomeScroll();
  // Update the sidebar so the dim/badge appears
  if(window.adminRenderSidebar) adminRenderSidebar();
  // Update the button label
  _adminUpdateHideBtn();
  _adminToast(c.hidden ? 'Case study hidden from public pages.' : 'Case study is now visible.');
};

// Refresh Hide/Unhide button label + visibility based on current selected case
function _adminUpdateHideBtn(){
  var btn = document.getElementById('adminHideBtn');
  if(!btn) return;
  if(_adminIdx<0||_adminIdx>=window._CASES.length){
    btn.style.display = 'none';
    return;
  }
  var c = window._CASES[_adminIdx];
  btn.style.display = 'inline-block';
  if(c.hidden){
    btn.innerHTML = '&#128373; Unhide';
    btn.style.background = 'rgba(76,175,80,.1)';
    btn.style.borderColor = 'rgba(76,175,80,.35)';
    btn.style.color = '#4CAF50';
    btn.title = 'Currently hidden — click to show on public pages';
  } else {
    btn.innerHTML = '&#128065; Hide';
    btn.style.background = 'rgba(139,159,212,.08)';
    btn.style.borderColor = 'rgba(139,159,212,.3)';
    btn.style.color = '#8B9FD4';
    btn.title = 'Currently visible — click to hide from public pages';
  }
}

// ── CASES ADMIN HELPERS ───────────────────────────────────────────────────────
// _esc is defined earlier in this file — do not redeclare.

function adminMediaPreviewHTML(media, slot){
  if(!media||!media.src) return '<div class="uz-text"><strong>Click to upload</strong></div>';
  // For card-slot uploads, show the actual card aspect (~2.4:1) so the user
  // sees exactly how their image will crop on the live site. Other slots
  // keep the compact 80px preview.
  if(slot === 'card'){
    var box = 'width:100%;aspect-ratio:2.4/1;object-fit:cover;display:block;border-radius:6px;background:#0A0F1C';
    if(media.type==='video') return '<video src="'+media.src+'" style="'+box+'" muted autoplay loop playsinline></video>';
    return '<img src="'+media.src+'" alt="" style="'+box+'">';
  }
  if(media.type==='video') return '<video src="'+media.src+'" style="width:100%;max-height:80px;object-fit:cover;display:block;border-radius:6px" muted></video>';
  return '<img src="'+media.src+'" style="width:100%;max-height:80px;object-fit:cover;display:block;border-radius:6px">';
}

var _BLOCK_TYPE_META = {
  section:  { label:'Text Section', color:'rgba(107,159,212,.7)',  icon:'📝' },
  metrics:  { label:'Metrics Row',  color:'rgba(236,169,52,.7)',   icon:'📊' },
  media:    { label:'Image / Video',color:'rgba(139,159,212,.7)',  icon:'🖼' },
  callout:  { label:'Callout Box',  color:'rgba(236,169,52,.5)',   icon:'💡' },
  quote:    { label:'Quote',        color:'rgba(139,159,212,.5)',  icon:'❝' },
  cta:      { label:'CTA Buttons',  color:'rgba(76,175,80,.7)',    icon:'🔗' },
  divider:  { label:'Divider',      color:'rgba(255,255,255,.25)', icon:'—' },
};

// Collapsed state per block index
var _blCollapsed = {};

function adminRenderBlockList(){
  var list = document.getElementById('blockList');
  if(!list) return;
  if(!_adminBlocks.length){
    list.innerHTML = '<div style="text-align:center;padding:24px;color:var(--dim);font-size:12px">No content blocks yet.<br>Add blocks below to build the detail page.</div>';
    return;
  }
  list.innerHTML = _adminBlocks.map(function(b, i){
    var meta    = _BLOCK_TYPE_META[b.type] || { label:b.type, color:'rgba(255,255,255,.3)', icon:'□' };
    var preview = b.heading || b.body || b.primary || b.label || (b.items ? b.items.length+' metrics' : '');
    if(preview && preview.length > 48) preview = preview.substring(0,48)+'…';
    var collapsed = _blCollapsed[i] !== false; // default collapsed
    return '<div class="bl-item'+(collapsed?'':' bl-expanded')+'" id="blItem'+i+'" draggable="true" ondragstart="adminDragStart('+i+')" ondragover="adminDragOver(event,'+i+')" ondragleave="adminDragLeave('+i+')" ondrop="adminDrop(event,'+i+')">'
      // Header
      +'<div class="bl-header" onclick="blToggle('+i+')">'
      +'<span class="bl-drag-handle" onclick="event.stopPropagation()" draggable="false">⠿</span>'
      +'<span class="bl-type-pill" style="background:'+meta.color.replace('.7','.15').replace('.5','.12').replace('.25','.08')+';color:'+meta.color+'">'+meta.icon+' '+meta.label+'</span>'
      +'<span class="bl-preview-text">'+_esc(preview)+'</span>'
      +'<span class="bl-toggle'+(collapsed?'':' open')+'">▾</span>'
      +'</div>'
      // Body (hidden when collapsed)
      + (!collapsed ? '<div class="bl-body">'+_renderBlockEditor(b, i)+'</div>'
          +'<div class="bl-actions">'
          +(i>0?'<button class="bl-btn" onclick="adminMoveBlock('+i+',-1)">↑ Up</button>':'')
          +(i<_adminBlocks.length-1?'<button class="bl-btn" onclick="adminMoveBlock('+i+',1)">↓ Down</button>':'')
          +'<button class="bl-btn bl-btn-del" onclick="adminRemoveBlock('+i+')">✕ Remove</button>'
          +'</div>' : '')
      +'</div>';
  }).join('');
}

window.blToggle = function(i){
  // true = collapsed, false = expanded
  // Default (undefined) = collapsed
  _blCollapsed[i] = (_blCollapsed[i] === false) ? true : false;
  adminRenderBlockList();
};

function _renderBlockEditor(b, i){
  var html = '';
  if(b.type === 'section'){
    html += '<div class="admin-field"><label>Section Label <span style="opacity:.5">(small text above heading)</span></label><input value="'+_esc(b.label||'')+'" oninput="adminBlockVal('+i+',\'label\',this.value)" placeholder="e.g. The Challenge"></div>';
    html += '<div class="admin-field"><label>Heading</label><input value="'+_esc(b.heading||'')+'" oninput="adminBlockVal('+i+',\'heading\',this.value)" placeholder="e.g. What Was Broken"></div>';
    html += '<div class="admin-field"><label>Body Text</label><textarea rows="5" oninput="adminBlockVal('+i+',\'body\',this.value)" placeholder="Explain the problem, solution, or results in detail...">'+_esc(b.body||'')+'</textarea></div>';
  }
  else if(b.type === 'metrics'){
    html += '<div style="font-size:11px;color:var(--dim);margin-bottom:8px">Up to 4 metric items. Each has a value (e.g. <strong style="color:var(--tx)">84%</strong>) and a label.</div>';
    var items = b.items || [{val:'',lbl:''},{val:'',lbl:''}];
    html += items.map(function(m, mi){
      return '<div style="display:flex;gap:8px;margin-bottom:8px;align-items:center">'
        +'<div class="admin-field" style="flex:0 0 100px;margin-bottom:0"><label style="font-size:9px">Value</label><input value="'+_esc(m.val||'')+'" oninput="adminMetricVal('+i+','+mi+',\'val\',this.value)" placeholder="84%"></div>'
        +'<div class="admin-field" style="flex:1;margin-bottom:0"><label style="font-size:9px">Label</label><input value="'+_esc(m.lbl||'')+'" oninput="adminMetricVal('+i+','+mi+',\'lbl\',this.value)" placeholder="Faster Response"></div>'
        +(items.length>1?'<button class="bl-btn bl-btn-del" style="margin-top:16px;flex-shrink:0" onclick="adminRemoveMetric('+i+','+mi+')">✕</button>':'')
        +'</div>';
    }).join('');
    html += (items.length<4?'<button class="bl-add-btn" style="margin-top:4px" onclick="adminAddMetric('+i+')">+ Add Metric</button>':'');
  }
  else if(b.type === 'media'){
    html += '<div class="admin-field"><label>Upload Image or Video</label>'
      +'<div class="upload-zone-sm" onclick="document.getElementById(\'blMediaInput'+i+'\').click()">'
      +'<input type="file" id="blMediaInput'+i+'" accept="image/*,.gif,video/*" style="display:none" onchange="adminBlockMedia('+i+',this)">'
      +'<div id="blMediaPreview'+i+'">'+(b.src ? adminMediaPreviewHTML({src:b.src,type:b.mediaType},'block') : '<div class="uz-text"><strong>Click to upload</strong> — Image, GIF, or Video</div>')+'</div>'
      +'</div></div>';
    html += '<div class="admin-field"><label>Caption <span style="opacity:.5">(optional)</span></label><input value="'+_esc(b.caption||'')+'" oninput="adminBlockVal('+i+',\'caption\',this.value)" placeholder="Image caption..."></div>';
    if(b.src) html += '<button class="bl-btn bl-btn-del" onclick="adminBlockRemoveMedia('+i+')">Remove media</button>';
  }
  else if(b.type === 'callout'){
    html += '<div class="admin-field"><label>Heading</label><input value="'+_esc(b.heading||'')+'" oninput="adminBlockVal('+i+',\'heading\',this.value)" placeholder="Key insight or highlight"></div>';
    html += '<div class="admin-field"><label>Body</label><textarea rows="3" oninput="adminBlockVal('+i+',\'body\',this.value)">'+_esc(b.body||'')+'</textarea></div>';
  }
  else if(b.type === 'quote'){
    html += '<div class="admin-field"><label>Quote Text</label><textarea rows="3" oninput="adminBlockVal('+i+',\'body\',this.value)" placeholder="What did the client say?">'+_esc(b.body||'')+'</textarea></div>';
    html += '<div class="admin-field"><label>Attribution <span style="opacity:.5">(optional)</span></label><input value="'+_esc(b.attribution||'')+'" oninput="adminBlockVal('+i+',\'attribution\',this.value)" placeholder="CEO, Company Name"></div>';
  }
  else if(b.type === 'cta'){
    html += '<div class="admin-field"><label>Primary Button Label</label><input value="'+_esc(b.primary||'')+'" oninput="adminBlockVal('+i+',\'primary\',this.value)" placeholder="Book a Strategy Session"></div>';
    html += '<div class="admin-field"><label>Secondary Button Label <span style="opacity:.5">(optional)</span></label><input value="'+_esc(b.secondary||'')+'" oninput="adminBlockVal('+i+',\'secondary\',this.value)" placeholder="See More Case Studies"></div>';
  }
  return html;
}

window.adminBlockVal = function(i, key, val){
  if(_adminBlocks[i]) _adminBlocks[i][key] = val;
  adminLivePreview();
};
window.adminMetricVal = function(blockIdx, metricIdx, key, val){
  if(_adminBlocks[blockIdx] && _adminBlocks[blockIdx].items && _adminBlocks[blockIdx].items[metricIdx])
    _adminBlocks[blockIdx].items[metricIdx][key] = val;
  adminLivePreview();
};
window.adminAddMetric = function(blockIdx){
  if(!_adminBlocks[blockIdx].items) _adminBlocks[blockIdx].items = [];
  _adminBlocks[blockIdx].items.push({val:'',lbl:''});
  _blCollapsed[blockIdx] = false;
  adminRenderBlockList();
};
window.adminRemoveMetric = function(blockIdx, metricIdx){
  _adminBlocks[blockIdx].items.splice(metricIdx,1);
  adminRenderBlockList();
};
window.adminBlockMedia = function(blockIdx, input){
  var file = input.files[0];
  if(!file) return;
  var reader = new FileReader();
  reader.onload = function(e){
    var type = file.type.startsWith('video') ? 'video' : (file.name.endsWith('.gif') ? 'gif' : 'image');
    _adminBlocks[blockIdx].src       = e.target.result;
    _adminBlocks[blockIdx].mediaType = type;
    var prev = document.getElementById('blMediaPreview'+blockIdx);
    if(prev) prev.innerHTML = adminMediaPreviewHTML({src:e.target.result,type:type},'block');
    adminLivePreview();
  };
  reader.readAsDataURL(file);
};
window.adminBlockRemoveMedia = function(blockIdx){
  _adminBlocks[blockIdx].src = null;
  _adminBlocks[blockIdx].mediaType = null;
  _blCollapsed[blockIdx] = false;
  adminRenderBlockList();
  adminLivePreview();
};

window.adminAddBlock = function(type){
  var defaults = {
    section:  { type:'section',  label:'', heading:'', body:'' },
    metrics:  { type:'metrics',  items:[{val:'',lbl:''},{val:'',lbl:''}] },
    media:    { type:'media',    src:null, mediaType:null, caption:'' },
    callout:  { type:'callout',  heading:'', body:'' },
    quote:    { type:'quote',    body:'', attribution:'' },
    cta:      { type:'cta',      primary:'Book a Strategy Session', secondary:'' },
    divider:  { type:'divider' },
  };
  var newBlock = Object.assign({}, defaults[type] || {type:type});
  _adminBlocks.push(newBlock);
  _blCollapsed[_adminBlocks.length-1] = false; // open new block
  adminRenderBlockList();
  adminLivePreview();
  // Scroll to new block
  setTimeout(function(){
    var list = document.getElementById('blockList');
    if(list) list.scrollTop = list.scrollHeight;
  }, 50);
};

window.adminRemoveBlock = function(i){
  if(!confirm('Remove this block?')) return;
  _adminBlocks.splice(i,1);
  var newCollapsed = {};
  Object.keys(_blCollapsed).forEach(function(k){
    var ki = parseInt(k);
    if(ki < i) newCollapsed[ki] = _blCollapsed[ki];
    else if(ki > i) newCollapsed[ki-1] = _blCollapsed[ki];
  });
  _blCollapsed = newCollapsed;
  adminRenderBlockList();
  adminLivePreview();
};

window.adminMoveBlock = function(i, dir){
  var j = i + dir;
  if(j<0||j>=_adminBlocks.length) return;
  var tmp = _adminBlocks[i]; _adminBlocks[i] = _adminBlocks[j]; _adminBlocks[j] = tmp;
  var tc = _blCollapsed[i]; _blCollapsed[i] = _blCollapsed[j]; _blCollapsed[j] = tc;
  adminRenderBlockList();
  adminLivePreview();
};

// Drag & drop
var _dragSrcIdx = -1;
window.adminDragStart = function(i){ _dragSrcIdx = i; var el=document.getElementById('blItem'+i); if(el) el.classList.add('dragging'); };
window.adminDragOver  = function(e,i){ e.preventDefault(); var el=document.getElementById('blItem'+i); if(el&&i!==_dragSrcIdx) el.classList.add('drag-over'); };
window.adminDragLeave = function(i){ var el=document.getElementById('blItem'+i); if(el) el.classList.remove('drag-over'); };
window.adminDrop      = function(e,i){
  e.preventDefault();
  var el=document.getElementById('blItem'+i); if(el) el.classList.remove('drag-over');
  if(_dragSrcIdx<0||_dragSrcIdx===i) return;
  var moved=_adminBlocks.splice(_dragSrcIdx,1)[0]; _adminBlocks.splice(i,0,moved);
  var movedC=_blCollapsed[_dragSrcIdx];
  var newC={};
  Object.keys(_blCollapsed).forEach(function(k){
    var ki=parseInt(k);
    if(ki===_dragSrcIdx) return;
    var ni=ki<Math.min(_dragSrcIdx,i)?ki:ki>Math.max(_dragSrcIdx,i)?ki:(_dragSrcIdx<i?ki-1:ki+1);
    newC[ni]=_blCollapsed[ki];
  });
  newC[i]=movedC;
  _blCollapsed=newC;
  _dragSrcIdx=-1;
  adminRenderBlockList();
  adminLivePreview();
};

// ── EDITOR with tabs ─────────────────────────────────────────────────────────
var _aeActiveTab = 'card';
var _aeCardCache = {}; // persists card field values across tab switches

function adminRenderEditor(c, isNew){
  var eb   = document.getElementById('adminEditorBody');
  var titl = document.getElementById('adminEditorTitle');
  var acts = document.getElementById('adminEditorActions');
  if(!eb) return;
  _blCollapsed = {};
  titl.textContent = isNew ? 'New Case Study' : 'Edit: '+(c ? c.title.substring(0,32) : '');
  acts.style.display = 'flex';
  _adminBlocks = (c && c.blocks) ? JSON.parse(JSON.stringify(c.blocks)) : _defaultBlocks(c||{});
  // Pre-populate cache from case data so Detail tab preview works immediately
  if(c){
    _aeCardCache = {
      'ae-title': c.title||'', 'ae-cat': c.cat||'AI Integration',
      'ae-m1': c.m1||'', 'ae-ml1': c.ml1||'',
      'ae-m2': c.m2||'', 'ae-ml2': c.ml2||'',
      'ae-tt': c.tt||'#ECA934', 'ae-glyph': c.glyph||'',
      'ae-desc': c.desc||''
    };
  }
  // Refresh the Hide/Unhide button to reflect this case's state (hidden only for existing cases)
  if(isNew){
    var hb = document.getElementById('adminHideBtn');
    if(hb) hb.style.display = 'none';
  } else {
    _adminUpdateHideBtn();
  }
  _aeRenderTab(c, isNew);
}

function _aeRenderTab(c, isNew){
  var eb = document.getElementById('adminEditorBody');
  if(!eb) return;
  var isCard    = _aeActiveTab === 'card';
  var isContent = _aeActiveTab === 'content';

  var colorChips = _ACCENT_COLORS.map(function(col){
    var sel = c && c.tt === col ? ' selected' : '';
    return '<div class="admin-color-chip'+sel+'" style="background:'+col+'" onclick="adminPickColor(\''+col+'\')" title="'+col+'"></div>';
  }).join('');

  var html = '';

  // Tab bar
  html += '<div class="ae-tabs">'
    +'<button class="ae-tab'+(isCard?' active':'')+'" onclick="aeSetTab(\'card\')">🃏 Card Info</button>'
    +'<button class="ae-tab'+(isContent?' active':'')+'" onclick="aeSetTab(\'content\')">📄 Detail Page</button>'
    +'</div>';

  if(isCard){
    html += '<div class="admin-field"><label>Case Study Title *</label>'
      +'<input id="ae-title" value="'+_esc(c?c.title:'')+'" oninput="adminLivePreview()" placeholder="e.g. Claude sales agent cuts response time 84%"></div>'

      +'<div class="admin-field" style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;background:rgba(236,169,52,0.06);border:1px solid rgba(236,169,52,0.2);">'
      +'<input id="ae-featured" type="checkbox" '+(c&&c.featured?'checked':'')+' onchange="adminLivePreview()" style="width:18px;height:18px;cursor:pointer;accent-color:#ECA934;flex-shrink:0;">'
      +'<label for="ae-featured" style="cursor:pointer;font-family:Montserrat,sans-serif;font-size:12px;font-weight:700;color:var(--t);margin:0;">⭐ Featured case study</label>'
      +'<span style="font-size:11px;color:var(--dim);margin-left:auto;">Shown in the &ldquo;Featured&rdquo; section on the home page (only one allowed)</span>'
      +'</div>'

      +'<div class="admin-field"><label>Category</label>'
      +'<select id="ae-cat" onchange="adminCatChange()">'
      +['AI Integration','ERP Deployment','Systems Integration','AI + Analytics','Consulting'].map(function(cat){
        return '<option'+(c&&c.cat===cat?' selected':'')+'>'+cat+'</option>';
      }).join('')
      +'</select></div>'

      +'<div class="admin-field"><label>Short Description *</label>'
      +'<textarea id="ae-desc" rows="3" oninput="adminLivePreview()" placeholder="One or two sentences describing the engagement and outcome.">'+_esc(c?c.desc||'':'')+'</textarea></div>'

      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">'
      +'<div class="admin-field" style="margin-bottom:0"><label>Metric 1 Value</label><input id="ae-m1" value="'+_esc(c?c.m1:'')+'" oninput="adminLivePreview()" placeholder="84%"></div>'
      +'<div class="admin-field" style="margin-bottom:0"><label>Metric 1 Label</label><input id="ae-ml1" value="'+_esc(c?c.ml1||'':'')+'" oninput="adminLivePreview()" placeholder="Faster Response"></div>'
      +'</div>'

      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">'
      +'<div class="admin-field" style="margin-bottom:0"><label>Metric 2 Value</label><input id="ae-m2" value="'+_esc(c?c.m2||'':'')+'" oninput="adminLivePreview()" placeholder="3x"></div>'
      +'<div class="admin-field" style="margin-bottom:0"><label>Metric 2 Label</label><input id="ae-ml2" value="'+_esc(c?c.ml2||'':'')+'" oninput="adminLivePreview()" placeholder="Pipeline Handled"></div>'
      +'</div>'

      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">'
      +'<div class="admin-field" style="margin-bottom:0"><label>Accent Colour</label>'
      +'<input id="ae-tt" value="'+_esc(c?c.tt||'#ECA934':'#ECA934')+'" oninput="adminLivePreview()" style="font-family:monospace;font-size:12px">'
      +'<div class="admin-color-row" style="margin-top:8px">'+colorChips+'</div></div>'
      +'<div class="admin-field" style="margin-bottom:0"><label>Glyph <span style="opacity:.5">(fallback icon)</span></label>'
      +'<input id="ae-glyph" value="'+_esc(c?c.glyph||'':'')+'" maxlength="4" oninput="adminLivePreview()" placeholder="AI"></div>'
      +'</div>'

      +'<div class="admin-field"><label>Card Image / GIF <span style="opacity:.5">(optional)</span></label>'
      +'<div class="upload-zone-sm" onclick="document.getElementById(\'cardMediaInput\').click()">'
      +'<input type="file" id="cardMediaInput" accept="image/*,.gif" style="display:none" onchange="adminHandleMedia(\'card\',this)">'
      +'<div id="cardMediaPreview">'+(c&&c.cardMedia?adminMediaPreviewHTML(c.cardMedia,'card'):'<div class="uz-text"><strong>Click to upload</strong> — PNG, JPG, GIF &bull; Max 5MB</div>')+'</div>'
      +'</div></div>';
  }

  if(isContent){
    html += '<div style="font-size:12px;color:var(--dim);margin-bottom:16px;line-height:1.7">'
      +'Build the detail page by adding content blocks below. Drag to reorder. Click a block to expand and edit it.'
      +'</div>'
      +'<div class="block-list" id="blockList"></div>'
      +'<div style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.09em;color:var(--dim);margin:16px 0 10px">Add Block</div>'
      +'<div class="bl-add-grid">'
      +'<button class="bl-add-btn" onclick="adminAddBlock(\'section\')"><span class="bl-add-icon">📝</span>Text Section</button>'
      +'<button class="bl-add-btn" onclick="adminAddBlock(\'metrics\')"><span class="bl-add-icon">📊</span>Metrics Row</button>'
      +'<button class="bl-add-btn" onclick="adminAddBlock(\'media\')"><span class="bl-add-icon">🖼</span>Image / Video</button>'
      +'<button class="bl-add-btn" onclick="adminAddBlock(\'callout\')"><span class="bl-add-icon">💡</span>Callout Box</button>'
      +'<button class="bl-add-btn" onclick="adminAddBlock(\'quote\')"><span class="bl-add-icon">❝</span>Quote</button>'
      +'<button class="bl-add-btn" onclick="adminAddBlock(\'cta\')"><span class="bl-add-icon">🔗</span>CTA Buttons</button>'
      +'<button class="bl-add-btn" onclick="adminAddBlock(\'divider\')" style="grid-column:span 2"><span class="bl-add-icon">—</span>Divider Line</button>'
      +'</div>';
  }

  eb.innerHTML = html;

  // Restore cached card field values (survive tab switch)
  if(isCard && Object.keys(_aeCardCache).length){
    Object.keys(_aeCardCache).forEach(function(id){
      var el = document.getElementById(id);
      if(el && _aeCardCache[id] !== undefined) el.value = _aeCardCache[id];
    });
  }
  // On card tab — populate cache from case data if cache is empty
  if(isCard && !Object.keys(_aeCardCache).length && c){
    _aeCardCache = {
      'ae-title': c.title||'', 'ae-cat': c.cat||'',
      'ae-m1': c.m1||'', 'ae-ml1': c.ml1||'',
      'ae-m2': c.m2||'', 'ae-ml2': c.ml2||'',
      'ae-tt': c.tt||'#ECA934', 'ae-glyph': c.glyph||'',
      'ae-desc': c.desc||''
    };
  }

  if(isContent) adminRenderBlockList();
  _adminDirty = false;
  var ub = document.getElementById('adminUnsavedBadge');
  if(ub) ub.style.display = 'none';
  adminLivePreview();
}

window.aeSetTab = function(tab){
  // Save current card field values before switching away from card tab
  if(_aeActiveTab === 'card'){
    var fields = ['ae-title','ae-cat','ae-m1','ae-ml1','ae-m2','ae-ml2','ae-tt','ae-glyph','ae-desc'];
    fields.forEach(function(id){
      var el = document.getElementById(id);
      if(el) _aeCardCache[id] = el.value;
    });
  }
  _aeActiveTab = tab;
  var c = _adminIdx >= 0 ? window._CASES[_adminIdx] : null;
  _aeRenderTab(c, _adminIdx < 0);
};



// ── CHAT BUTTON DRAG + SNAP ───────────────────────────────────────────────────
(function(){
  var BTN_SIZE = 52;
  var MARGIN   = 16;
  var btn, panel;

  // Anchor state — what the button snaps to
  var _anchor = { h:'left', hVal:24, v:'bottom', vVal:24 };

  // Drag state
  var _pointerDown = false;
  var _dragging    = false;
  var _startPX, _startPY;  // pointer start
  var _startBX, _startBY;  // btn rect start

  function init(){
    btn   = document.getElementById('chatBtn');
    panel = document.getElementById('chatPanel');
    if(!btn) return;
    applyAnchor();

    btn.addEventListener('pointerdown', onDown);
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup',   onUp);
    document.addEventListener('pointercancel', onUp);
  }

  function onDown(e){
    if(e.button && e.button !== 0) return;
    var rect = btn.getBoundingClientRect();
    _startPX = e.clientX; _startPY = e.clientY;
    _startBX = rect.left; _startBY = rect.top;
    _pointerDown = true;
    _dragging    = false;
    btn.setPointerCapture(e.pointerId);
    e.preventDefault();
  }

  function onMove(e){
    if(!_pointerDown) return;
    var dx = e.clientX - _startPX;
    var dy = e.clientY - _startPY;
    if(!_dragging && Math.abs(dx) < 6 && Math.abs(dy) < 6) return;

    if(!_dragging){
      _dragging = true;
      btn.classList.add('dragging');
      // Switch to free positioning
      btn.style.transition = 'none';
      btn.style.left   = _startBX + 'px';
      btn.style.top    = _startBY + 'px';
      btn.style.right  = 'auto';
      btn.style.bottom = 'auto';
    }

    var W = window.innerWidth, H = window.innerHeight;
    var nx = Math.max(MARGIN, Math.min(W - BTN_SIZE - MARGIN, _startBX + dx));
    var ny = Math.max(MARGIN, Math.min(H - BTN_SIZE - MARGIN, _startBY + dy));
    btn.style.left = nx + 'px';
    btn.style.top  = ny + 'px';
  }

  function onUp(e){
    if(!_pointerDown) return;
    _pointerDown = false;

    if(!_dragging){
      // Pure tap — open/close chat
      window.chatToggle();
      positionPanel();
      return;
    }

    // Snap to nearest CORNER
    _dragging = false;
    btn.classList.remove('dragging');

    var rect = btn.getBoundingClientRect();
    var cx = rect.left + BTN_SIZE/2;
    var cy = rect.top  + BTN_SIZE/2;
    var W  = window.innerWidth;
    var H  = window.innerHeight;

    // Pick closest corner
    _anchor.h    = cx < W/2 ? 'left'   : 'right';
    _anchor.hVal = MARGIN;
    _anchor.v    = cy < H/2 ? 'top'    : 'bottom';
    _anchor.vVal = MARGIN;

    btn.style.transition = '';
    applyAnchor();
    positionPanel();
  }

  function applyAnchor(){
    if(!btn) return;
    btn.style.left   = _anchor.h === 'left'   ? _anchor.hVal + 'px' : 'auto';
    btn.style.right  = _anchor.h === 'right'  ? _anchor.hVal + 'px' : 'auto';
    btn.style.top    = _anchor.v === 'top'    ? _anchor.vVal + 'px' : 'auto';
    btn.style.bottom = _anchor.v === 'bottom' ? _anchor.vVal + 'px' : 'auto';
  }

  function positionPanel(){
    panel = panel || document.getElementById('chatPanel');
    if(!panel) return;
    var W = window.innerWidth, H = window.innerHeight;
    var PW = 340, PH = 520, GAP = 10;
    var rect = btn.getBoundingClientRect();
    var bL = rect.left, bT = rect.top;

    // Horizontal: align left edge of panel with btn, clamp to screen
    var px = Math.max(8, Math.min(W - PW - 8, bL + BTN_SIZE/2 - PW/2));
    // Vertical: prefer above btn, else below
    var py = bT - PH - GAP;
    if(py < 8) py = bT + BTN_SIZE + GAP;
    if(py + PH > H - 8) py = Math.max(8, H - PH - 8);

    panel.style.left   = px + 'px';
    panel.style.top    = py + 'px';
    panel.style.right  = 'auto';
    panel.style.bottom = 'auto';
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 0);
  }
})();

// NOTE: removed stray `go('home');` that was here. In the original static
// site, `go()` was a hash-router shim that set the URL hash to a section. In
// Next.js, `go()` calls router.push() — which was redirecting every page load
// (including /admin/login) back to '/'. Routing is now driven by Next.js
// natively, so no initial-page kick is needed here.

  // Some _INIT functions may need to run for the current page after hydration.
  // Expose for the Layout to invoke per-route.
  window.__site_INIT = (typeof _INIT !== 'undefined') ? _INIT : {};
}
