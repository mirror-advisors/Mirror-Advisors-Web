// Auto-generated. The admin overlay + chat widget static HTML.
// Rendered via dangerouslySetInnerHTML in Layout; the runtime wires up handlers.

export const ADMIN_CHAT_HTML = `<!-- Admin Panel (always in DOM) -->





<div class="admin-overlay" id="adminOverlay">
  <div class="admin-backdrop" onclick="closeAdmin()"></div>
  <div class="admin-shell">

    <!-- TOP BAR -->
    <div class="admin-topbar">
      <div class="admin-topbar-left">
        <div class="admin-logo-dot"></div>
        <span class="admin-title" id="adminPanelTitle">Admin</span>
        <span class="admin-badge" id="adminModeBadge" style="display:none">Case Studies</span>
      </div>
      <div class="admin-topbar-right">
        <button id="adminSwitchBtn" style="display:none;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:var(--mid);border-radius:7px;padding:5px 12px;cursor:pointer;font-size:11px;font-family:Montserrat,sans-serif;font-weight:700;transition:all .2s" onclick="adminSwitchMode()">Switch Dashboard</button>
        <button id="adminHomeBtn" style="display:none" class="admin-close-btn" onclick="adminGoHome()">⌂ Home</button>
        <button id="adminLogoutBtn" style="display:none" class="admin-logout-btn" onclick="adminLogout()">Sign Out</button>
        <span id="adminStatusMsg" style="font-size:12px;color:var(--dim)"></span>
        <button class="admin-close-btn" onclick="closeAdmin()">&#10005; Close</button>
      </div>
    </div>

    <!-- SWITCH DASHBOARD PICKER -->
    <div id="adminSwitchPicker">
      <button class="admin-picker-option" id="pickerCases"   onclick="adminPickDash('cases')">
        <div class="admin-picker-icon" style="background:rgba(107,159,212,.12)">📋</div>
        Case Studies
      </button>
      <button class="admin-picker-option" id="pickerChatbot" onclick="adminPickDash('chatbot')">
        <div class="admin-picker-icon" style="background:rgba(236,169,52,.12)">💬</div>
        Chatbot
      </button>
      <div class="admin-picker-divider"></div>
      <button class="admin-picker-option" id="pickerSocial"  onclick="adminPickDash('social')">
        <div class="admin-picker-icon" style="background:rgba(139,159,212,.12)">📱</div>
        Social Media
      </button>
      <button class="admin-picker-option" id="pickerNavigation" onclick="adminPickDash('navigation')">
        <div class="admin-picker-icon" style="background:rgba(236,169,52,.12)">🧭</div>
        Navigation
      </button>
      <button class="admin-picker-option" id="pickerSubmissions" onclick="adminPickDash('submissions')">
        <div class="admin-picker-icon" style="background:rgba(107,159,212,.12)">📥</div>
        Submissions
      </button>
    </div>

    <!-- LOGIN SCREEN -->
    <div class="admin-login-screen" id="adminLoginScreen">
      <div class="admin-login-box" style="max-width:380px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">
          <div style="width:42px;height:42px;border-radius:11px;background:rgba(236,169,52,.15);display:flex;align-items:center;justify-content:center;font-size:22px">🔐</div>
          <div>
            <h2 style="margin:0;font-size:20px">Admin Login</h2>
            <p style="margin:2px 0 0;font-size:12px;color:var(--dim)">Mirror Advisors Dashboard</p>
          </div>
        </div>
        <div class="admin-field"><label>Username</label>
          <input type="text" id="adminUser" autocomplete="username" onkeydown="if(event.key==='Enter')document.getElementById('adminPass').focus()">
        </div>
        <div class="admin-field"><label>Password</label>
          <input type="password" id="adminPass" autocomplete="current-password" onkeydown="if(event.key==='Enter')adminLogin()">
        </div>
        <div class="admin-err" id="adminErr" style="display:none;font-size:12px;color:rgba(255,80,80,.9);margin-bottom:10px">Incorrect username or password.</div>
        <button class="admin-save" onclick="adminLogin()" style="width:100%;justify-content:center;padding:12px">Sign In →</button>
      </div>
    </div>

<!-- MAIN LAYOUT -->
    <div class="admin-layout" id="adminMainLayout" style="display:none;flex-direction:column;flex:1;overflow:hidden;min-height:0">

      <!-- TAB BAR -->
      <div class="admin-tab-bar" id="adminTabBar">
        <button class="admin-tab active" id="tabDashboard" onclick="adminSetTab('dashboard')">Dashboard</button>
        <button class="admin-tab" id="tabSocial" onclick="adminSetTab('social')">&#127760; Social</button>
        <button class="admin-tab" id="tabNav" onclick="adminSetTab('navigation')">🧭 Navigation</button>
        <button class="admin-tab" id="tabSub" onclick="adminSetTab('submissions')">📥 Submissions</button>
        <button class="admin-tab" id="tabSettings" onclick="adminSetTab('settings')">&#9881; Settings</button>
      </div>

      <!-- HOME DASHBOARD -->
      <div id="adminHomeContent" style="display:none;flex:1;overflow-y:auto;padding:24px;flex-direction:column">
        <!-- injected by adminRenderHome -->
      </div>

      <!-- DASHBOARD CONTENT -->
      <div id="adminDashContent" style="display:none;flex:1;overflow:hidden;flex-direction:row;min-height:0">
        <!-- injected by JS based on mode -->
      </div>

      <!-- SOCIAL TAB CONTENT -->
      <div id="adminSocialContent" style="display:none;flex:1;overflow:hidden;min-height:0">
        <!-- injected by adminRenderSocialDash -->
      </div>

      <!-- NAV TAB CONTENT -->
      <div id="adminNavContent" style="display:none;flex:1;overflow:hidden;flex-direction:column;min-height:0">
        <!-- injected by adminRenderNavDash -->
      </div>

      <!-- SUBMISSIONS TAB CONTENT -->
      <div id="adminSubContent" style="display:none;flex:1;overflow:hidden;flex-direction:column;min-height:0">
        <!-- injected by adminRenderSubDash -->
      </div>

      <!-- SETTINGS TAB -->
      <div id="adminSettingsContent" style="display:none;flex:1;flex-direction:column;overflow-y:auto;padding:32px 28px;">
        <div style="max-width:520px;width:100%">

          <!-- Current credentials -->
          <div class="settings-section" style="margin-bottom:20px">
            <div class="settings-section-title">Current Credentials</div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.07)">
              <span style="font-size:11px;color:var(--dim);font-family:Montserrat,sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.07em">Username</span>
              <span id="settingsCurrentUser" style="font-size:13px;color:var(--tx);font-weight:700"></span>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0">
              <span style="font-size:11px;color:var(--dim);font-family:Montserrat,sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.07em">Password</span>
              <span style="font-size:13px;color:var(--dim)">••••••••</span>
            </div>
          </div>

          <!-- Change credentials -->
          <div class="settings-section" style="margin-bottom:20px">
            <div class="settings-section-title">Change Admin Credentials</div>
            <div class="admin-field">
              <label>Current Password <span style="color:rgba(255,80,80,.7)">*</span></label>
              <input type="password" id="settingsCurrentPass" placeholder="Enter current password to confirm">
            </div>
            <div style="height:1px;background:rgba(255,255,255,.07);margin:14px 0"></div>
            <div class="admin-field-row">
              <div class="admin-field">
                <label>New Username <span style="font-weight:400;color:var(--dim)">(optional)</span></label>
                <input type="text" id="settingsUser" placeholder="Leave blank to keep current" autocomplete="off">
              </div>
            </div>
            <div class="admin-field-row">
              <div class="admin-field">
                <label>New Password <span style="font-weight:400;color:var(--dim)">(optional)</span></label>
                <input type="password" id="settingsPass" placeholder="Leave blank to keep current" autocomplete="new-password">
              </div>
              <div class="admin-field">
                <label>Confirm New Password</label>
                <input type="password" id="settingsPassConfirm" placeholder="Confirm">
              </div>
            </div>
            <div id="settingsErr" style="font-size:12px;color:rgba(255,80,80,.9);margin-bottom:10px;padding:9px 12px;background:rgba(255,80,80,.08);border-radius:8px;border:1px solid rgba(255,80,80,.2);display:none"></div>
            <div id="settingsOk" style="font-size:12px;color:#4CAF50;margin-bottom:10px;padding:9px 12px;background:rgba(76,175,80,.08);border-radius:8px;border:1px solid rgba(76,175,80,.2);display:none">✓ Credentials updated successfully.</div>
            <button class="admin-save" onclick="adminSaveSettings()">Save Changes</button>
          </div>

          <!-- Sub-admins -->
          <div class="settings-section">
            <div class="settings-section-title">Sub-Admin Accounts</div>
            <p style="font-size:12px;color:var(--dim);margin-bottom:16px;line-height:1.6">Sub-admins can access all dashboards except Credentials &amp; Settings.</p>
            <div id="subAdminList" style="margin-bottom:16px"></div>
            <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.09);border-radius:10px;padding:16px;">
              <div style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:800;color:var(--dim);margin-bottom:12px;text-transform:uppercase;letter-spacing:.08em">Add Sub-Admin</div>
              <div class="admin-field-row">
                <div class="admin-field"><label>Username</label><input type="text" id="subAdminUser" placeholder="sub-admin username" autocomplete="off"></div>
                <div class="admin-field"><label>Password</label><input type="password" id="subAdminPass" placeholder="password"></div>
              </div>
              <div id="subAdminErr" style="font-size:12px;color:rgba(255,80,80,.9);margin-bottom:8px;display:none"></div>
              <button class="admin-save" style="font-size:11px;padding:8px 16px" onclick="adminAddSubAdmin()">+ Add Sub-Admin</button>
            </div>
          </div>

        </div>
      </div>
</div>

      <!-- SOCIAL TAB -->
      

    </div>
  </div>
</div>
</div>

<button id="adminTrigger" onclick="openAdmin()" title="" aria-hidden="true"></button>

<div id="adminToast" class="admin-toast"></div>
`;
