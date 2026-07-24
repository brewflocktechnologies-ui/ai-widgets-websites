(function () {
  /* ==========================================================================
     BASE ASSET RESOLVER
     --------------------------------------------------------------------------
     Determines the base directory relative to the widget script position.
     Ensures fetch calls resolve correctly whether called from /website/site-emerald.html
     or root /index.html.
     ========================================================================== */
  function getWidgetBaseUrl() {
    let scriptTag = document.currentScript;
    if (!scriptTag || !scriptTag.src || !scriptTag.src.includes('widget.js')) {
      scriptTag = document.querySelector('script[data-client-id]') || document.querySelector('script[src*="widget.js"]');
    }
    if (scriptTag && scriptTag.src) {
      try {
        const scriptUrl = new URL(scriptTag.src, window.location.href);
        return new URL('./', scriptUrl).href;
      } catch (e) { }
    }
    return './';
  }

  // Ensure CSS is loaded
  if (!document.querySelector('link[href*="public/style.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = getWidgetBaseUrl() + 'public/style.css';
    document.head.appendChild(link);
  }

  // Inject font inheritance style rule so widget inherits parent font-family
  if (!document.getElementById('zotly-font-inherit-style')) {
    const styleRule = document.createElement('style');
    styleRule.id = 'zotly-font-inherit-style';
    styleRule.textContent = `
      #zotly-widget-embed, #zotly-widget-embed *, .panel, .panel * {
        font-family: inherit !important;
      }
      @keyframes statusPulse {
        0% { transform: scale(0.9); opacity: 0.65; }
        50% { transform: scale(1.6); opacity: 0.3; }
        100% { transform: scale(2.4); opacity: 0; }
      }
    `;
    document.head.appendChild(styleRule);
  }

  // Helper to extract primary/secondary colors from parent HTML CSS variables
  function getParentTheme() {
    const rootStyle = getComputedStyle(document.documentElement);
    const bodyStyle = getComputedStyle(document.body);

    let primary = rootStyle.getPropertyValue('--primary-color').trim() || bodyStyle.getPropertyValue('--primary-color').trim();
    let secondary = rootStyle.getPropertyValue('--secondary-color').trim() || bodyStyle.getPropertyValue('--secondary-color').trim();

    let scriptTag = document.currentScript;
    if (!scriptTag || !scriptTag.src || !scriptTag.src.includes('widget.js')) {
      scriptTag = document.querySelector('script[data-client-id]') || document.querySelector('script[src*="widget.js"]');
    }
    const dataAccent = scriptTag ? scriptTag.getAttribute('data-accent') : null;

    if (!primary && dataAccent) primary = dataAccent;
    if (!primary) primary = '#0b5fff';
    if (!secondary) secondary = primary;

    return { primary, secondary };
  }

  // Inject Widget HTML markup into container
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'zotly-widget-embed';
  widgetContainer.setAttribute('x-data', '{ openContactWidget: false }');
  widgetContainer.setAttribute('@toggle-contact-widget.window', 'openContactWidget = !openContactWidget; $store.chat.panelOpen = openContactWidget; if (openContactWidget) { $store.chat.unreadCount = 0; }');
  widgetContainer.setAttribute('@close-contact-widget.window', 'openContactWidget = false; $store.chat.panelOpen = false;');

  widgetContainer.innerHTML = `
    <!-- Pop-up Chat V2 Widget Overlay -->
    <div x-show="openContactWidget"
      x-transition:enter="transition ease-out duration-300 origin-bottom-right"
      x-transition:enter-start="opacity-0 scale-50 translate-y-8"
      x-transition:enter-end="opacity-100 scale-100 translate-y-0"
      x-transition:leave="transition ease-in duration-200 origin-bottom-right"
      x-transition:leave-start="opacity-100 scale-100 translate-y-0"
      x-transition:leave-end="opacity-0 scale-50 translate-y-8"
      class="fixed z-50 flex flex-col transition-all duration-300 pointer-events-auto zotly-widget-panel-wrapper"
      :style="{
        boxSizing: 'border-box',
        width: $store.chat.isExpanded ? ($store.chatWindow.expandedWidth ? $store.chatWindow.expandedWidth + 'px' : '480px') : ($store.chatWindow.widgetWidth ? $store.chatWindow.widgetWidth + 'px' : '350px'),
        height: $store.chatWindow.widgetHeight ? $store.chatWindow.widgetHeight + 'px' : '550px',
        maxWidth: 'calc(100vw - 32px)',
        maxHeight: (function() {
          const defaultBottom = $store.chatbar.enabled ? ($store.chatbar.offsetBottom !== undefined ? $store.chatbar.offsetBottom : 12) : ($store.bubble.offsetBottom !== undefined ? $store.bubble.offsetBottom : 12);
          let offset = defaultBottom;
          if ($store.chatbar.enabled && !$store.chatbar.hideOnOpen) {
            const h = $store.chatbar.height || ($store.chatbar.layout === 'card' ? 220 : 40);
            const gap = $store.chatbar.stackGap !== undefined ? $store.chatbar.stackGap : 12;
            offset = defaultBottom + h + gap;
          } else if (!$store.chatbar.enabled && !$store.bubble.hideOnOpen) {
            const h = $store.bubble.height || 50;
            const gap = $store.bubble.stackGap !== undefined ? $store.bubble.stackGap : 12;
            offset = defaultBottom + h + gap;
          }
          return 'calc(100vh - ' + (offset + 24) + 'px)';
        })(),
        position: 'fixed',
        bottom: (function() {
          const defaultBottom = $store.chatbar.enabled ? ($store.chatbar.offsetBottom !== undefined ? $store.chatbar.offsetBottom : 12) : ($store.bubble.offsetBottom !== undefined ? $store.bubble.offsetBottom : 12);
          if ($store.chatbar.enabled && !$store.chatbar.hideOnOpen) {
            const h = $store.chatbar.height || ($store.chatbar.layout === 'card' ? 220 : 40);
            const gap = $store.chatbar.stackGap !== undefined ? $store.chatbar.stackGap : 12;
            return (defaultBottom + h + gap) + 'px';
          }
          if (!$store.chatbar.enabled && !$store.bubble.hideOnOpen) {
            const h = $store.bubble.height || 50;
            const gap = $store.bubble.stackGap !== undefined ? $store.bubble.stackGap : 12;
            return (defaultBottom + h + gap) + 'px';
          }
          return defaultBottom + 'px';
        })(),
        right: ($store.chatbar.enabled ? ($store.chatbar.offsetRight !== undefined ? $store.chatbar.offsetRight : 16) : ($store.bubble.offsetRight !== undefined ? $store.bubble.offsetRight : 16)) + 'px'
      }" style="display: none;">
      
      <div class="panel flex flex-col relative w-full h-full overflow-hidden"
        :style="{
          boxShadow: $store.chatWindow.widgetShadow ? \`0 8px \${$store.chatWindow.widgetShadowBlur || 30}px \${$store.chatWindow.widgetShadowColor || 'rgba(0,0,0,0.12)'}\` : 'none',
          border: $store.chatWindow.widgetBorderEnabled ? \`\${$store.chatWindow.widgetBorderWidth || 1}px solid \${$store.chatWindow.widgetBorderColor || '#e5e7eb'}\` : 'none',
          borderRadius: \`\${$store.chatWindow.widgetBorderRadius || 24}px\`,
          background: $store.chatWindow.bodyBg || 'var(--cw-bg)',
          '--cw-accent': $store.chatWindow.accentColor || '#0b5fff',
          isolation: 'isolate',
          transform: 'translateZ(0)'
        }">
        <header class="panel-header" x-show="$store.chat.state !== 'welcome'" :style="{
          background: $store.chatWindow.headerBg || 'var(--cw-grad)',
          color: $store.chatWindow.headerTextColor || '#fff',
          padding: $store.chatWindow.headerPadding || '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: $store.chatWindow.headerBorderColor ? \`1px solid \${$store.chatWindow.headerBorderColor}\` : '1px solid rgba(0,0,0,0.08)',
          position: 'relative'
        }">
          <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
            <button type="button" class="icon-btn" :aria-label="$store.chat.isExpanded ? 'Collapse chat' : 'Expand chat'"
                    :style="{ color: $store.chatWindow.headerTextColor || '#fff', opacity: '0.7' }"
                    x-show="$store.chat.flag('widget.modernUi', true)"
                    @click="$store.chat.toggleExpand()">
              <template x-if="$store.chat.isExpanded">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" /></svg>
              </template>
              <template x-if="!$store.chat.isExpanded">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
              </template>
            </button>
            <div style="width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 700; flex-shrink: 0; position: relative;"
                 :style="{ background: $store.chatWindow.headerAvatarBg || ($store.chatWindow.headerTextColor === '#18181b' ? '#e4e4e7' : 'rgba(255,255,255,0.2)'), color: $store.chatWindow.headerAvatarColor || ($store.chatWindow.headerTextColor || '#fff') }">
              <span x-text="($store.chat.clientName || $store.chatWindow.clientName || 'S').charAt(0)"></span>
              <div style="position: absolute; bottom: 0; right: 0; display: flex; align-items: center; justify-content: center;"
                   :style="{ width: ($store.chatWindow.activeDot?.size !== undefined ? $store.chatWindow.activeDot.size : 8) + 'px', height: ($store.chatWindow.activeDot?.size !== undefined ? $store.chatWindow.activeDot.size : 8) + 'px' }">
                <span x-show="!$store.chatWindow.activeDot || $store.chatWindow.activeDot.animate !== false"
                      style="position: absolute; width: 100%; height: 100%; border-radius: 50%; opacity: 0.6; pointer-events: none; animation: statusPulse 1.8s cubic-bezier(0.24, 0, 0.38, 1) infinite;"
                      :style="{ backgroundColor: $store.chatWindow.activeDot?.color || '#22c55e' }"></span>
                <span style="position: absolute; width: 100%; height: 100%; border-radius: 50%;"
                      :style="{ backgroundColor: $store.chatWindow.activeDot?.color || '#22c55e', border: ($store.chatWindow.activeDot?.borderWidth !== undefined ? $store.chatWindow.activeDot.borderWidth : 0) + 'px solid ' + ($store.chatWindow.activeDot?.borderColor || 'transparent') }"></span>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; text-align: left; min-width: 0;">
              <span style="font-weight: 700; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                    :style="{ fontSize: $store.chatWindow.headerTitleFontSize || '14px' }"
                    x-text="$store.chat.clientName || $store.chatWindow.clientName || 'Support'"></span>
              <span style="opacity: 0.8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                    :style="{ fontSize: $store.chatWindow.headerSubtitleFontSize || '11px' }"
                    x-text="$store.chat.state === 'active' ? (($store.chat.agentName || $store.chatWindow.agentName) ? ($store.chat.agentName || $store.chatWindow.agentName) + ' · Online' : 'Online') : 'Online'"></span>
            </div>
          </div>
          <div style="display: flex; gap: 8px; align-items: center; flex-shrink: 0;">
            <button type="button" class="icon-btn" aria-label="End chat session" :style="{ color: $store.chatWindow.headerTextColor || '#fff', opacity: '0.7' }" @click="$store.chat.askEndChat()">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" /></svg>
            </button>
            <button type="button" class="icon-btn" aria-label="Chat options" :style="{ color: $store.chatWindow.headerTextColor || '#fff', opacity: '0.7' }" x-show="$store.chat.flag('widget.modernUi', true)" @click="$store.chat.menuOpen = !$store.chat.menuOpen">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="12" r="1.8" /></svg>
            </button>
            <button type="button" class="icon-btn" aria-label="Minimize chat panel" :style="{ color: $store.chatWindow.headerTextColor || '#fff', opacity: '0.7' }" @click="$store.chat.closePanel(); openContactWidget = false">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
        </header>

        <div class="menu-pop" x-show="$store.chat.menuOpen" x-cloak @click.outside="$store.chat.menuOpen = false">
          <button type="button" class="menu-item" @click="$store.chat.downloadTranscript()">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" /></svg> Download transcript
          </button>
          <button type="button" class="menu-item" @click="$store.chat.toggleSounds()">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5L6 9H3v6h3l5 4V5zM16 9a4 4 0 010 6" /></svg> Sounds
            <span class="mini-switch" :class="{ on: $store.chat.soundsOn }" aria-hidden="true"><i></i></span>
          </button>
        </div>

        <div class="panel-body" id="panel-body" 
             :style="{ 
               background: $store.chat.state === 'welcome' ? ($store.chatWindow.welcome?.bgGradient || 'linear-gradient(135deg, #d97706, #78350f)') : ($store.chatWindow.bodyBg || 'var(--cw-bg)'),
               padding: $store.chat.state === 'welcome' ? '0px' : ''
             }">
             
          <!-- ========================================== -->
          <!-- HIGHLY POLISHED WELCOME SCREEN COMPONENT     -->
          <!-- ========================================== -->
          <div x-show="$store.chat.state === 'welcome'" 
               style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; position: relative; overflow: hidden;"
               :style="{
                 padding: $store.chatWindow.welcome?.padding || '40px 32px',
                 color: $store.chatWindow.welcome?.headerTextColor || '#ffffff',
                 background: $store.chatWindow.welcome?.bgGradient || 'linear-gradient(135deg, #f59e0b, #b45309)'
               }">
            
            <!-- Abstract background blobs for modern look -->
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none; z-index: 0;">
              <div style="position: absolute; top: -10%; left: -20%; width: 80%; height: 50%; background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%); border-radius: 50%; mix-blend-mode: overlay;"></div>
              <div style="position: absolute; bottom: 10%; right: -20%; width: 70%; height: 60%; background: radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 60%); border-radius: 50%;"></div>
            </div>

            <!-- Content Container ensuring it sits above background -->
            <div style="position: relative; z-index: 10; display: flex; flex-direction: column; height: 100%; justify-content: space-between;">
              
              <!-- Clean Close Button -->
              <button type="button" 
                      style="position: absolute; top: -10px; right: -10px; border: none; background: transparent; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s, transform 0.2s;"
                      :style="{ color: $store.chatWindow.welcome?.headerTextColor || '#ffffff' }"
                      @click="$store.chat.closePanel(); openContactWidget = false"
                      @mouseenter="$el.style.background = 'rgba(255, 255, 255, 0.15)'; $el.style.transform = 'scale(1.05)';"
                      @mouseleave="$el.style.background = 'transparent'; $el.style.transform = 'scale(1)';">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div>
                <!-- Stylized Top Icon (mimics violet reference logo) -->
                <div style="display: flex; align-items: center; justify-content: flex-start; margin-bottom: 28px;">
                  <template x-if="$store.chatWindow.welcome?.logoUrl">
                    <img :src="$store.chatWindow.welcome?.logoUrl" style="height: 36px; object-fit: contain;" />
                  </template>
                  <template x-if="!$store.chatWindow.welcome?.logoUrl">
                    <div :style="{ color: $store.chatWindow.welcome?.headerTextColor || '#ffffff' }" style="opacity: 1;">
                      <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                      </svg>
                    </div>
                  </template>
                </div>

                <!-- Sleek Typography -->
                <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; text-align: left;">
                  <h2 style="font-weight: 800; font-size: 28px; line-height: 1.15; letter-spacing: -0.02em;" 
                      :style="{ fontSize: $store.chatWindow.welcome?.titleFontSize || '28px' }"
                      x-text="$store.chatWindow.welcome?.title || 'Hi there! 👋 How can we help you today?'"></h2>
                  <p style="font-size: 16px; line-height: 1.5; font-weight: 400;" 
                     :style="{ 
                       color: $store.chatWindow.welcome?.subtextColor || 'rgba(255,255,255,0.9)',
                       fontSize: $store.chatWindow.welcome?.descriptionFontSize || '16px'
                     }"
                     x-text="$store.chatWindow.welcome?.description || 'Our support heroes are here to assist you.'"></p>
                  
                  <!-- Overlapping Online Avatars without Text (Cleaner) -->
                  <div style="display: flex; align-items: center; gap: 0; margin-top: 24px;">
                    <template x-for="(avatar, index) in ($store.chatWindow.welcome?.avatars || [])" :key="index">
                      <img :src="avatar" 
                           style="width: 38px; height: 38px; border-radius: 50%; border: 2px solid; object-fit: cover; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
                           :style="{ 
                             marginLeft: index === 0 ? '0' : '-12px',
                             borderColor: $store.chatWindow.welcome?.avatarBorderColor || 'rgba(255,255,255,0.2)',
                             zIndex: 10 + index
                           }" />
                    </template>
                  </div>
                </div>
              </div>

              <!-- Pill-shaped Start Button -->
              <div>
                <button type="button" 
                        @click="$store.chat.startFromWelcome()"
                        style="display: flex; align-items: center; gap: 16px; width: 100%; border: none; cursor: pointer; text-align: left; transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);"
                        :style="{
                          background: $store.chatWindow.welcome?.buttonBg || '#ffffff',
                          color: $store.chatWindow.welcome?.buttonTextColor || '#111827',
                          borderRadius: ($store.chatWindow.welcome?.buttonBorderRadius || 24) + 'px',
                          padding: $store.chatWindow.welcome?.buttonPadding || '18px 24px',
                          marginBottom: '20px'
                        }"
                        @mouseenter="$el.style.transform = 'translateY(-4px)'; $el.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';"
                        @mouseleave="$el.style.transform = 'translateY(0)'; $el.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)';">
                  <!-- Simplified Chat Icon inside button -->
                  <div style="display: flex; align-items: center; justify-content: center; flex-shrink: 0;"
                       :style="{ color: $store.chatWindow.welcome?.buttonIconColor || '#d97706' }">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
                    </svg>
                  </div>
                  <div style="display: flex; flex-direction: column; min-width: 0;">
                    <span style="font-weight: 700; font-size: 15px; letter-spacing: -0.01em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" 
                          :style="{ color: $store.chatWindow.welcome?.buttonTextColor || '#111827' }"
                          x-text="$store.chatWindow.welcome?.buttonText || 'Start Conversation'"></span>
                    <span style="font-size: 12px; font-weight: 500; opacity: 0.6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" 
                          :style="{ color: $store.chatWindow.welcome?.buttonTextColor || '#111827' }"
                          x-text="$store.chatWindow.welcome?.buttonSubtext || 'Typically replies in 5 minutes'"></span>
                  </div>
                </button>

                <!-- Clean Footer -->
                <div style="display: flex; justify-content: center; align-items: center; font-size: 11px; font-weight: 500; opacity: 0.8;"
                     :style="{ color: $store.chatWindow.welcome?.subtextColor || 'rgba(255,255,255,0.9)' }">
                  <span>Powered by</span>&nbsp;
                  <a :href="$store.chatWindow.poweredByLink || '#'" target="_blank" style="font-weight: 700; color: inherit; text-decoration: none;" x-text="$store.chatWindow.poweredByText || 'vAInatheya.ai'"></a>
                </div>
              </div>
            </div>
          </div>
          <!-- ========================================== -->

          <div class="center-note" x-show="$store.chat.state === 'boot'">
            <div class="spinner" aria-hidden="true"></div>
            <p>Connecting…</p>
          </div>

          <div class="prechat" x-show="$store.chat.state === 'prechat'">
            <div class="avatar prechat-avatar" aria-hidden="true">
              <span x-text="($store.chat.clientName || $store.chatWindow.clientName || 'S').charAt(0)"></span>
            </div>
            <h2>Hi there 👋</h2>
            <p class="muted">Tell us who you are and we'll connect you with an agent right away.</p>
            <form @submit.prevent="$store.chat.submitPrechat($event.target)">
              <label for="cw-embed-name">Name</label>
              <input id="cw-embed-name" name="name" required maxlength="120" autocomplete="name" placeholder="Your name" />
              <label for="cw-embed-email">Email</label>
              <input id="cw-embed-email" name="email" type="email" required maxlength="160" autocomplete="email" placeholder="you@example.com" />
              <button type="submit" class="primary">Start chat</button>
            </form>
          </div>

          <div class="prechat" x-show="$store.chat.state === 'offline'">
            <div class="avatar prechat-avatar offline-avatar" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 8v4M12 16h.01" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <h2>We're not around right now</h2>
            <p class="muted">Our agents are offline. Leave your details and a message — we'll pick it up the moment someone is back.</p>
            <form @submit.prevent="$store.chat.submitOffline()">
              <label for="cw-embed-off-name">Name</label>
              <input id="cw-embed-off-name" required maxlength="120" autocomplete="name" placeholder="Your name" x-model="$store.chat.offlineName" />
              <label for="cw-embed-off-email">Email</label>
              <input id="cw-embed-off-email" type="email" required maxlength="160" autocomplete="email" placeholder="you@example.com" x-model="$store.chat.offlineEmail" />
              <label for="cw-embed-off-msg">Message</label>
              <textarea id="cw-embed-off-msg" class="offline-msg" rows="3" required maxlength="4000" placeholder="How can we help?" x-model="$store.chat.offlineMessage"></textarea>
              <button type="submit" class="primary" :disabled="$store.chat.offlineSending">
                <span x-text="$store.chat.offlineSending ? 'Sending…' : 'Leave message'"></span>
              </button>
            </form>
          </div>

          <div class="queued" x-show="$store.chat.state === 'offline-sent'">
            <div class="ticket offline-done">
              <div class="done-check" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 12.5l5 5L20 6.5" />
                </svg>
              </div>
              <h2 x-text="$store.chat.offlineEmail ? 'Message received' : 'We\\'re away right now'"></h2>
              <p class="muted" x-show="$store.chat.offlineEmail">
                 Thanks<span x-show="$store.chat.offlineName" x-text="', ' + $store.chat.offlineName"></span>! We've saved your message and will reply to <strong x-text="$store.chat.offlineEmail"></strong> as soon as an agent is back.</p>
            </div>
          </div>

          <div class="queued" x-show="$store.chat.state === 'queued'">
            <div class="ticket">
              <div class="ticket-number" x-text="$store.chat.position"></div>
              <div class="ticket-label">in line</div>
              <p class="muted">An agent will be with you shortly.</p>
            </div>
          </div>

          <div class="chat" x-show="$store.chat.state === 'active' || $store.chat.state === 'closed'">
            <div class="messages" x-ref="messages" :style="{ background: $store.chatWindow.bodyBg || 'var(--cw-bg)' }">
              <template x-for="(m, i) in $store.chat.messages" :key="m.key">
                <div>
                  <div class="day-divider" x-show="$store.chat.dividerBefore(i)" x-text="$store.chat.dayLabel(m)"></div>
                  <div class="bubble-row" :class="{
                         'from-visitor': m.senderType === 'VISITOR',
                         'from-agent': m.senderType === 'AGENT',
                         'from-system': m.senderType === 'SYSTEM',
                         'g-start': $store.chat.groupStart(i),
                         'g-end': $store.chat.groupEnd(i)
                       }">
                    <div class="msg-avatar" aria-hidden="true" x-show="m.senderType === 'AGENT' && $store.chat.groupEnd(i)" :style="{
                      background: $store.chatWindow.agentAvatarBg || 'var(--cw-accent-tint)',
                      color: $store.chatWindow.agentAvatarColor || 'var(--cw-accent-deep)'
                    }">
                      <template x-if="$store.chatWindow.agentAvatarUrl">
                        <img :src="$store.chatWindow.agentAvatarUrl" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" />
                      </template>
                      <template x-if="!$store.chatWindow.agentAvatarUrl">
                        <span x-text="(m.senderName || $store.chat.agentName || $store.chatWindow.agentName || 'A').charAt(0)"></span>
                      </template>
                    </div>
                    <div class="bubble" :class="{ pending: m.pending, 'has-img': m.attachment || m.localUrl }" :style="{
                      background: m.senderType === 'VISITOR' 
                        ? ($store.chatWindow.visitorBubbleBg || 'var(--cw-grad)') 
                        : ($store.chatWindow.agentBubbleBg || 'var(--cw-surface)'),
                      color: m.senderType === 'VISITOR' 
                        ? ($store.chatWindow.visitorBubbleColor || '#fff') 
                        : ($store.chatWindow.agentBubbleColor || 'var(--cw-ink)'),
                      borderColor: m.senderType === 'VISITOR' 
                        ? 'transparent' 
                        : ($store.chatWindow.agentBubbleBorderColor || 'var(--cw-border)'),
                      boxShadow: m.senderType === 'VISITOR' 
                        ? ($store.chatWindow.visitorBubbleBg ? 'none' : '0 2px 8px color-mix(in srgb, var(--cw-accent) 25%, transparent)') 
                        : '0 1px 2px rgba(16, 24, 40, 0.05)',
                      borderStyle: 'solid',
                      borderWidth: m.senderType === 'VISITOR' ? '0px' : '1px',
                      borderRadius: m.senderType === 'VISITOR' 
                        ? ($store.chatWindow.visitorBubbleBorderRadius || '16px')
                        : ($store.chatWindow.agentBubbleBorderRadius || '16px'),
                      padding: m.senderType === 'VISITOR'
                        ? ($store.chatWindow.visitorBubblePadding || '10px 14px')
                        : ($store.chatWindow.agentBubblePadding || '10px 14px'),
                      fontSize: m.senderType === 'VISITOR'
                        ? ($store.chatWindow.visitorBubbleFontSize || '14px')
                        : ($store.chatWindow.agentBubbleFontSize || '14px')
                    }">
                      <template x-if="m.attachment || m.localUrl">
                        <img class="bubble-img" alt="attachment" :src="m.localUrl || $store.chat.attachmentUrl(m)" @load="$store.chat.scrollDown()" @click="!m.pending && window.open($store.chat.attachmentUrl(m), '_blank')" />
                      </template>
                      <span class="bubble-body" x-show="m.body" x-text="m.body"></span>
                      <span class="bubble-time" x-show="$store.chat.groupEnd(i)">
                        <span x-text="$store.chat.timeLabel(m)"></span>
                        <template x-if="m.senderType === 'VISITOR' && ($store.chatWindow.ticksEnabled !== false)">
                          <span style="margin-left: 4px; display: inline-flex; align-items: center; vertical-align: middle;">
                            <template x-if="!m.status || m.status === 'sent'">
                              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                                   :stroke="$store.chatWindow.sentTickColor || 'currentColor'"
                                   :style="{ opacity: $store.chatWindow.sentTickColor ? 1 : 0.7 }">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </template>
                            <template x-if="m.status === 'delivered'">
                              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                                   :stroke="$store.chatWindow.deliveredTickColor || 'currentColor'"
                                   :style="{ opacity: $store.chatWindow.deliveredTickColor ? 1 : 0.7 }">
                                <path d="M17 6L8.5 14.5L5 11M22 6L13.5 14.5L12.5 13.5"></path>
                              </svg>
                            </template>
                            <template x-if="m.status === 'read'">
                              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                                   :stroke="$store.chatWindow.readTickColor || '#34b7f1'">
                                <path d="M17 6L8.5 14.5L5 11M22 6L13.5 14.5L12.5 13.5"></path>
                              </svg>
                            </template>
                          </span>
                        </template>
                      </span>
                    </div>
                  </div>
                </div>
              </template>
              <div class="bubble-row from-agent g-start g-end" x-show="$store.chat.typingName && $store.chat.flag('chat.typingIndicator', true)" x-cloak>
                <div class="bubble typing-bubble">
                  <span class="sr-only" x-text="$store.chat.typingName"></span>
                  <span class="typing-dots" aria-hidden="true"><i></i><i></i><i></i></span>
                </div>
              </div>
            </div>

            <div class="consent" x-cloak x-show="$store.chat.state === 'active' && !$store.chat.consentDismissed && $store.chat.flag('widget.modernUi', true)">
              <p>By chatting here you agree this conversation may be processed and recorded to provide support.</p>
              <button type="button" class="consent-x" aria-label="Dismiss" @click="$store.chat.dismissConsent()">✕</button>
            </div>

            <div class="attach-pop" x-show="$store.chat.attachOpen" x-cloak @click.outside="$store.chat.attachOpen = false">
              <button type="button" class="menu-item" @click="$store.chat.attachOpen = false; document.getElementById('cw-embed-file').click()">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="8.5" cy="10" r="1.5" /><path d="M21 15l-4.5-4.5L9 18" /></svg>
                Send an image
              </button>
              <button type="button" class="menu-item" @click="$store.chat.captureScreenshot()">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2" /><circle cx="12" cy="12" r="3" /></svg>
                Add screenshot
              </button>
            </div>

            <div class="emoji-row" x-show="$store.chat.emojiOpen" x-cloak @click.outside="$store.chat.emojiOpen = false">
              <template x-for="e in ['😀','😂','😊','😍','👍','👎','🙏','🎉','❤️','😢','😮','👌']">
                <button type="button" class="emoji-btn" :aria-label="'Insert ' + e" @click="$store.chat.draft += e" x-text="e"></button>
              </template>
            </div>

            <div class="composer" x-data="{ focused: false }" x-show="$store.chat.state === 'active'" :style="{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: $store.chatWindow.inputPadding || '6px 8px',
              margin: $store.chatWindow.inputMargin || '12px 16px',
              background: $store.chatWindow.inputBg || 'var(--cw-surface)',
              borderRadius: $store.chatWindow.inputBorderRadius || '9999px',
              border: focused 
                ? ('1px solid ' + ($store.chatWindow.inputFocusBorderColor || $store.chatWindow.accentColor || '#0b5fff')) 
                : ('1px solid ' + ($store.chatWindow.inputBorderColor || 'var(--cw-border)')),
              boxShadow: focused 
                ? ($store.chatWindow.inputFocusShadow || '0 0 0 2px rgba(11, 95, 255, 0.1)') 
                : 'none',
              boxSizing: 'border-box',
              transition: 'all 0.2s ease'
            }">
              <style x-text="'.composer textarea::placeholder { color: ' + ($store.chatWindow.inputPlaceholderColor || '#a1a1aa') + ' !important; }'"></style>
              <input type="file" id="cw-embed-file" class="file-input" accept="image/png,image/jpeg,image/gif,image/webp" @change="$store.chat.uploadImage($event.target)" style="display: none;" />
              
              <button type="button" class="attach-btn" aria-label="Attach" title="Attach" x-show="$store.chat.flag('attachments.enabled', true)" :disabled="$store.chat.uploading" @click="$store.chat.attachOpen = !$store.chat.attachOpen; $store.chat.emojiOpen = false" :style="{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', borderRadius: '50%', border: 'none', padding: '0', margin: '0', lineHeight: '0', boxSizing: 'border-box', background: $store.chatWindow.attachButtonBg || '#ffffff', color: $store.chatWindow.attachButtonColor || '#71717a', cursor: 'pointer', flexShrink: '0', boxShadow: 'none'
              }"><svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" style="display: block; margin: auto;"><path d="M8 3.5v9M3.5 8h9" /></svg></button>

              <textarea rows="1" maxlength="4000" placeholder="Write a message…" aria-label="Message" x-model="$store.chat.draft" @input="$store.chat.notifyTyping(); $el.style.height = 'auto'; $el.style.height = Math.min($el.scrollHeight, 120) + 'px'" @keydown.enter.prevent="$store.chat.send()" @focus="focused = true" @blur="focused = false" :style="{
                flex: '1', border: 'none', resize: 'none', padding: '6px 12px', background: 'transparent', color: $store.chatWindow.inputTextColor || 'var(--cw-ink)', outline: 'none', fontSize: $store.chatWindow.textareaFontSize || '14px', fontFamily: 'inherit', height: '32px', minHeight: '24px', maxHeight: '120px', overflowY: 'auto', boxSizing: 'border-box'
              }"></textarea>

              <button type="button" aria-label="Emoji" x-show="$store.chat.flag('widget.modernUi', true)" @click="$store.chat.emojiOpen = !$store.chat.emojiOpen; $store.chat.attachOpen = false" :style="{
                display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', borderRadius: '50%', border: 'none', padding: '0', background: 'transparent', color: $store.chatWindow.emojiButtonColor || '#71717a', cursor: 'pointer', flexShrink: '0', marginRight: '2px'
              }">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 14.5a4.5 4.5 0 007 0" /><circle cx="9" cy="10" r="0.5" fill="currentColor" /><circle cx="15" cy="10" r="0.5" fill="currentColor" /></svg>
              </button>

              <button type="button" aria-label="Send message" :disabled="!$store.chat.draft.trim()" @click="$store.chat.send()" :style="{
                display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', borderRadius: '50%', border: 'none', padding: '0', background: !$store.chat.draft.trim() ? ($store.chatWindow.sendButtonBgInactive || '#e4e4e7') : ($store.chatWindow.sendButtonBgActive || $store.chatWindow.accentColor || '#0b5fff'), color: !$store.chat.draft.trim() ? ($store.chatWindow.sendButtonColorInactive || '#a1a1aa') : ($store.chatWindow.sendButtonColorActive || '#ffffff'), cursor: !$store.chat.draft.trim() ? 'default' : 'pointer', transition: 'all 0.2s ease', flexShrink: '0'
              }">
                <template x-if="$store.chatWindow.sendIconType === 'arrow'">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                </template>
                <template x-if="$store.chatWindow.sendIconType !== 'arrow'">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" style="transform: rotate(45deg); margin-left: 2px; margin-top: -2px;"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                </template>
              </button>
            </div>
            <div class="panel-footer" x-show="$store.chat.state === 'active'" :style="{
              display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: $store.chatWindow.footerPaddingBottom || '16px', background: $store.chatWindow.footerBg || $store.chatWindow.bodyBg || '#ffffff', borderBottomLeftRadius: ($store.chatWindow.widgetBorderRadius || 24) + 'px', borderBottomRightRadius: ($store.chatWindow.widgetBorderRadius || 24) + 'px'
            }">
              <div class="powered" x-show="$store.chat.flag('widget.modernUi', true)" 
                   style="display: flex !important; flex-direction: row !important; flex-wrap: nowrap !important; align-items: center !important; justify-content: center !important; gap: 4px !important; font-family: inherit !important; width: 100% !important; background: transparent !important; text-align: center !important;"
                   :style="{ fontSize: $store.chatWindow.footerFontSize || '11px', color: $store.chatWindow.footerTextColor || 'var(--cw-muted)' }">
                <span>Powered by</span> 
                <template x-if="$store.chatWindow.poweredByLogo">
                  <span x-html="$store.chatWindow.poweredByLogo" style="display: inline-flex; align-items: center; justify-content: center; height: 12px; width: 12px; flex-shrink: 0;"></span>
                </template>
                <a :href="$store.chatWindow.poweredByLink || '#'" target="_blank" style="font-weight: 600; color: inherit; text-decoration: none; display: inline-block;" :style="{ color: $store.chatWindow.poweredByColor || '#a1a1aa' }" x-text="$store.chatWindow.poweredByText || 'vAInatheya.ai'"></a>
              </div>
            </div>

            <div class="closed-note" x-show="$store.chat.state === 'closed'">
              <p>Chat ended</p>
              <button type="button" class="primary" @click="$store.chat.startNew()">Start new chat</button>
            </div>
          </div>
          <div id="swap-zone-embed" hidden></div>
        </div>

        <div class="reconnecting" x-show="$store.chat.reconnecting" x-cloak>Reconnecting…</div>

        <div class="modal-overlay" x-show="$store.chat.confirmBox" x-cloak @click.self="$store.chat.confirmBox = null">
          <div class="modal-card" role="alertdialog" aria-modal="true" :aria-label="$store.chat.confirmBox && $store.chat.confirmBox.message"
               :style="{ background: $store.chatWindow.modalCardBg || '#ffffff', borderRadius: ($store.chatWindow.modalBorderRadius || 24) + 'px' }">
            <p class="modal-message" :style="{ color: $store.chatWindow.modalMessageColor || '#101828' }" x-text="$store.chat.confirmBox && $store.chat.confirmBox.message"></p>
            <div class="modal-actions">
              <button type="button" class="btn-ghost" @click="$store.chat.confirmBox = null" 
                      :style="{ background: $store.chatWindow.endChatCancelBg || 'var(--cw-surface)', color: $store.chatWindow.endChatCancelTextColor || 'var(--cw-muted)', borderColor: $store.chatWindow.endChatCancelBorderColor || 'var(--cw-border)' }"
                      x-text="$store.chat.confirmBox && $store.chat.confirmBox.cancelLabel || 'Cancel'"></button>
              <button type="button" class="btn-confirm" @click="$store.chat.confirmResolve()" 
                      :style="{ background: $store.chatWindow.endChatConfirmBg || 'var(--cw-grad)', color: $store.chatWindow.endChatConfirmTextColor || '#ffffff' }"
                      x-text="($store.chat.confirmBox && $store.chat.confirmBox.confirmLabel) || 'Confirm'"></button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- NEW: FLOATING GREET PREVIEW & INPUT BOX -->
    <div x-show="(!$store.bubble.hideOnOpen || !openContactWidget) && !$store.chatbar.enabled && $store.greetWindow && $store.greetWindow.enabled && !$store.greetWindow.dismissed"
         class="fixed z-30 flex flex-col items-end transition-all duration-300 pointer-events-none"
         style="box-sizing: border-box;"
         x-transition:enter="transition ease-out duration-300 delay-150"
         x-transition:enter-start="opacity-0 translate-y-4"
         x-transition:enter-end="opacity-100 translate-y-0"
         x-transition:leave="transition ease-in duration-200"
         x-transition:leave-start="opacity-100 translate-y-0"
         x-transition:leave-end="opacity-0 translate-y-4"
         :style="{
           bottom: (($store.bubble.offsetBottom !== undefined ? $store.bubble.offsetBottom : 12) + ($store.bubble.height || 60) + ($store.greetWindow.spacing || 16)) + 'px',
           right: ($store.bubble.offsetRight !== undefined ? $store.bubble.offsetRight : 16) + 'px',
           width: ($store.greetWindow.width || 320) + 'px',
           gap: '12px'
         }">

      <!-- Greet Card -->
      <div class="relative flex flex-col w-full cursor-pointer pointer-events-auto"
           @click="$dispatch('toggle-contact-widget')"
           :style="{
             backgroundColor: $store.greetWindow.backgroundColor || '#ffffff',
             borderRadius: ($store.greetWindow.borderRadius || 16) + 'px',
             padding: $store.greetWindow.padding || '24px 20px',
             boxShadow: $store.greetWindow.boxShadow || '0 12px 28px -6px rgba(0,0,0,0.15), 0 8px 14px -4px rgba(0,0,0,0.1)'
           }">
        
        <button type="button" @click.stop="$store.greetWindow.dismissed = true"
                style="position: absolute; top: 12px; right: 12px; border: none; background: transparent; width: 24px; height: 24px; cursor: pointer; color: #94a3b8; display: flex; align-items: center; justify-content: center; transition: color 0.2s;"
                onmouseover="this.style.color='#475569'" onmouseout="this.style.color='#94a3b8'">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div style="width: 100%; display: flex; justify-content: center; margin-bottom: 16px;" x-show="$store.greetWindow.imageUrl">
          <img :src="$store.greetWindow.imageUrl" :style="{ height: ($store.greetWindow.imageHeight || 70) + 'px', objectFit: 'contain' }" />
        </div>

        <h3 :style="{ color: $store.greetWindow.titleColor || '#1e293b', fontSize: $store.greetWindow.titleFontSize || '15px', fontWeight: '700', lineHeight: '1.4', margin: '0 0 8px 0', letterSpacing: '-0.01em' }" x-text="$store.greetWindow.title"></h3>
        <p :style="{ color: $store.greetWindow.descriptionColor || '#475569', fontSize: $store.greetWindow.descriptionFontSize || '14px', lineHeight: '1.5', margin: 0 }" x-text="$store.greetWindow.description"></p>
      </div>

      <!-- Quick Input Box -->
      <div x-show="$store.greetWindow.inputBox && $store.greetWindow.inputBox.enabled"
           class="flex items-center w-full relative pointer-events-auto"
           :style="{
             backgroundColor: $store.greetWindow.inputBox?.backgroundColor || '#ffffff',
             borderRadius: ($store.greetWindow.inputBox?.borderRadius || 24) + 'px',
             boxShadow: $store.greetWindow.inputBox?.boxShadow || '0 6px 16px rgba(0,0,0,0.12)',
             padding: '4px 4px 4px 16px',
             display: 'flex'
           }">
        <input type="text"
               x-model="$store.chat.draft"
               @keydown.enter="$dispatch('toggle-contact-widget'); setTimeout(() => { if($store.chat.draft) $store.chat.send(); }, 200);"
               :placeholder="$store.greetWindow.inputBox?.placeholder || 'Write your message...'"
               style="flex: 1; background: transparent; border: none; outline: none; width: 100%;"
               :style="{ color: $store.greetWindow.inputBox?.textColor || '#1e293b', fontSize: '14px' }" />
               
<button type="button"
        @click="$dispatch('toggle-contact-widget'); setTimeout(() => { if($store.chat.draft) $store.chat.send(); }, 200);"
        style="display: flex; align-items: center; justify-content: center; flex-shrink: 0; width: 38px; height: 38px; border-radius: 50%; border: none; cursor: pointer; transition: transform 0.2s;"
        onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"
        :style="{
          backgroundColor: $store.greetWindow.inputBox?.buttonColor || '#9333EA',
          color: $store.greetWindow.inputBox?.buttonIconColor || '#ffffff'
        }">
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display: block; margin: auto;">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
</button>
      </div>
    </div>
    <!-- END GREET PREVIEW -->

    <!-- Floating Bubble Widget Trigger -->
    <div x-show="(!$store.bubble.hideOnOpen || !openContactWidget) && !$store.chatbar.enabled" x-data='window.previewBubbleController(Alpine.store("bubble"))'
      @click="$dispatch('toggle-contact-widget')"
      x-transition:enter="transition ease-out duration-300 delay-100"
      x-transition:enter-start="opacity-0 scale-50"
      x-transition:enter-end="opacity-100 scale-100"
      x-transition:leave="transition ease-in duration-200"
      x-transition:leave-start="opacity-100 scale-100"
      x-transition:leave-end="opacity-0 scale-50"
      class="fixed z-40 flex items-center justify-center cursor-pointer select-none"
      :style="{
        boxSizing: 'border-box',
        width: (settings.width || 50) + 'px',
        height: (settings.height || 50) + 'px',
        bottom: (settings.offsetBottom !== undefined ? settings.offsetBottom : 12) + 'px',
        right: (settings.offsetRight !== undefined ? settings.offsetRight : 16) + 'px',
        borderRadius: getBorderRadius(),
        background: getCompositeBackground(),
        backgroundBlendMode: settings.backgroundBlendMode || 'normal',
        boxShadow: [getBoxShadow(), getInnerShadow()].filter(Boolean).join(', '),
        transform: (hovered && !openContactWidget) ? 'scale(' + (settings.hoverScale !== undefined ? settings.hoverScale : 1.05) + ')' : 'scale(1.0)',
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, background 0.3s ease',
        transformStyle: 'preserve-3d',
        ...getBorderStyle(),
        ...(settings.glass && settings.glass.enabled ? getGlassStyle() : {}),
        ...(settings.neon && settings.neon.enabled ? getNeonStyle() : {}),
        ...getEntryAnimStyle()
      }" @mouseenter="hovered = true" @mouseleave="hovered = false">

      <style x-text="cssKeyframes()"></style>

      <template x-if="settings.backgroundOverlayType === 'image' && settings.backgroundImageUrl">
        <div class="absolute inset-0 pointer-events-none" :style="{
            backgroundImage: \`url(\${settings.backgroundImageUrl})\`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: settings.backgroundImageSize || 'contain', opacity: settings.backgroundImageOpacity || 0.25, mixBlendMode: settings.backgroundBlendMode || 'normal', borderRadius: 'inherit'
          }"></div>
      </template>

      <template x-if="settings.backgroundOverlayType === 'lucide' && settings.backgroundLucideIcon">
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none" :style="{
            color: settings.backgroundLucideColor || '#FFFFFF', opacity: settings.backgroundLucideOpacity || 0.2, mixBlendMode: settings.backgroundBlendMode || 'normal'
          }">
          <template x-if="settings.backgroundLucideIcon === 'Star'">
            <svg viewBox="0 0 24 24" :width="settings.backgroundLucideSize || 24" :height="settings.backgroundLucideSize || 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </template>
          <template x-if="settings.backgroundLucideIcon === 'Heart'">
            <svg viewBox="0 0 24 24" :width="settings.backgroundLucideSize || 24" :height="settings.backgroundLucideSize || 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </template>
        </div>
      </template>

      <template x-if="!(settings.dots && settings.dots.animation && settings.dots.animation !== 'none' && hovered && !openContactWidget)">
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none text-white">
          <template x-if="openContactWidget">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </template>
          <template x-if="!openContactWidget">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </template>
        </div>
      </template>

      <template x-if="settings.dots && settings.dots.animation && settings.dots.animation !== 'none' && hovered && !openContactWidget">
        <div class="absolute flex z-10" :style="{ gap: \`\${settings.dots.spacing || 6}px\` }">
          <template x-for="i in [0, 1, 2]">
            <span class="rounded-full" :style="{ width: \`\${settings.dots.size || 6}px\`, height: \`\${settings.dots.size || 6}px\`, backgroundColor: settings.dots.color || '#FFFFFF', animation: settings.dots.animation === 'bounce' ? \`dotBounce 1.2s cubic-bezier(.2,.8,.2,1) \${i * 0.12}s infinite\` : settings.dots.animation === 'pulse' ? \`dotPulse 1.4s cubic-bezier(.2,.8,.2,1) \${i * 0.1}s infinite\` : 'none' }"></span>
          </template>
        </div>
      </template>

      <template x-if="settings.outlineRing && settings.outlineRing.enabled">
        <div aria-hidden class="pointer-events-none absolute inset-0" :style="{ borderRadius: 'inherit', boxShadow: \`0 0 0 \${settings.outlineRing.width || 3}px \${hexToRgba(settings.outlineRing.color || '#22d3ee', settings.outlineRing.opacity || 0.4)}\` }">
        </div>
      </template>

      <template x-if="$store.chat.unreadCount > 0">
        <div :style="getBadgeStyle()" x-text="$store.chat.unreadCount"></div>
      </template>

<template x-if="settings.tooltip && settings.tooltip.enabled && !openContactWidget">
  <div :style="getTooltipStyle()">
    <span x-text="settings.tooltip.text || 'Chat with us'"></span>
    <template x-if="settings.tooltip.arrowEnabled !== false">
      <div :style="getTooltipArrowStyle()"></div>
    </template>
  </div>
</template>
    </div>

    <!-- Chat Bar Widget Trigger -->
    <div x-show="(!$store.chatbar.hideOnOpen || !openContactWidget) && $store.chatbar.enabled" x-data='window.chatbarPreviewController(Alpine.store("chatbar"))'
      @click="$dispatch('toggle-contact-widget')"
      x-transition:enter="transition ease-out duration-300 delay-100"
      x-transition:enter-start="opacity-0 scale-95 translate-y-2"
      x-transition:enter-end="opacity-100 scale-100 translate-y-0"
      x-transition:leave="transition ease-in duration-200"
      x-transition:leave-start="opacity-100 scale-100 translate-y-0"
      x-transition:leave-end="opacity-0 scale-95 translate-y-2"
      class="fixed z-40 flex cursor-pointer select-none transition-all duration-200"
      @mouseenter="hovered = true" @mouseleave="hovered = false"
      :style="{
        boxSizing: 'border-box', width: (settings.width || (settings.layout === 'card' ? 240 : 255)) + 'px', height: (settings.height || (settings.layout === 'card' ? 220 : 40)) + 'px', bottom: (settings.offsetBottom !== undefined ? settings.offsetBottom : 12) + 'px', right: (settings.offsetRight !== undefined ? settings.offsetRight : 16) + 'px', background: getBackgroundStyle(), color: settings.textColor || '#ffffff', borderRadius: getBorderRadius(), boxShadow: settings.shadow ? '0 4px 16px rgba(0,0,0,0.15)' : 'none', padding: settings.padding !== undefined ? settings.padding : (settings.layout === 'card' ? '24px 16px' : '0 16px'), transform: hovered ? 'scale(1.02)' : 'scale(1.0)', flexDirection: settings.layout === 'card' ? 'column' : 'row', alignItems: 'center', justifyContent: settings.layout === 'card' ? 'space-between' : 'space-between', gap: settings.gap !== undefined ? (settings.gap + 'px') : (settings.layout === 'card' ? '14px' : '0')
      }">
      
      <!-- CARD LAYOUT (Vertical) -->
      <template x-if="settings.layout === 'card'">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; width: 100%; height: 100%; box-sizing: border-box; padding: 0;"
             :style="{ gap: (settings.gap !== undefined ? settings.gap : 14) + 'px' }">
          <div style="display: flex; align-items: center; justify-content: center; position: relative;">
            <template x-if="settings.iconType === 'lucide'">
              <div :style="{ color: settings.iconColor || '#ffffff', opacity: hovered ? 1 : 0.85, display: 'flex' }">
                <template x-if="settings.lucideIcon === 'Sparkles'">
                  <svg viewBox="0 0 24 24" :width="settings.iconWidth || 28" :height="settings.iconHeight || 28" fill="currentColor" stroke="none"><path d="M12 4.5c0 3.5 3 6.5 6.5 6.5-3.5 0-6.5 3-6.5 6.5 0-3.5-3-6.5-6.5-6.5 3.5 0 6.5-3 6.5-6.5z"/><path d="M18.5 4c0 1.2.8 2 2 2-1.2 0-2 .8-2 2 0-1.2-.8-2-2-2 1.2 0 2-.8 2-2z"/></svg>
                </template>
                <template x-if="settings.lucideIcon === 'MessageCircle' || !settings.lucideIcon">
                  <svg viewBox="0 0 24 24" :width="settings.iconWidth || 24" :height="settings.iconHeight || 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </template>
              </div>
            </template>
            <template x-if="settings.iconType === 'image' && settings.iconImageUrl">
              <img :src="settings.iconImageUrl" alt="icon" class="rounded"
                :style="{ objectFit: settings.iconFit || 'contain', opacity: settings.iconOpacity !== undefined ? settings.iconOpacity : 1, width: (settings.iconWidth || 24) + 'px', height: (settings.iconHeight || 24) + 'px', mixBlendMode: settings.iconBlend || 'normal' }" />
            </template>
            <template x-if="settings.iconType === 'customSvg' && settings.customSvg">
              <div class="custom-svg-icon"
                   :style="{ color: settings.iconColor || '#ffffff', opacity: hovered ? 1 : 0.85, display: 'inline-flex', width: (settings.iconWidth || 28) + 'px', height: (settings.iconHeight || 28) + 'px' }"
                   x-html="settings.customSvg"></div>
            </template>
          </div>

          <span style="font-weight: 700; line-height: 1.35; white-space: pre-line; text-align: center;"
            :style="{ fontSize: (settings.textSize || 16) + 'px', letterSpacing: (settings.letterSpacing || 0) + 'px' }"
            x-text="settings.text || 'Questions about PayPal?'"></span>

          <div style="background-color: #ffffff; color: #003087; font-weight: 700; border-radius: 9999px; display: flex; align-items: center; justify-content: center; padding: 10px 24px; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); width: 85%;"
               :style="{ backgroundColor: settings.buttonBg || '#ffffff', color: settings.buttonTextColor || settings.bgColor || '#003087' }">
            <span x-text="settings.buttonText || 'Chat Now'"></span>
          </div>

          <template x-if="$store.chat.unreadCount > 0">
            <span style="position: absolute; top: -6px; right: -6px; background-color: #dc2626; color: #ffffff; font-weight: 700; border-radius: 9999px; display: flex; align-items: center; justify-content: center; min-width: 20px; height: 20px; font-size: 11px; border: 2px solid #ffffff; z-index: 50; box-shadow: 0 2px 5px rgba(0,0,0,0.15);"
                  x-text="$store.chat.unreadCount"></span>
          </template>
        </div>
      </template>

      <!-- BAR LAYOUT (Horizontal) -->
      <template x-if="settings.layout !== 'card'">
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; height: 100%;">
          <span style="font-weight: 600;"
            :style="{ fontSize: (settings.textSize || 14) + 'px', letterSpacing: (settings.letterSpacing || 0) + 'px' }"
            x-text="settings.text || 'Chat with us'"></span>
          
          <div style="display: flex; align-items: center; justify-content: center; position: relative;">
            <template x-if="settings.iconType === 'lucide'">
              <div :style="{ color: settings.iconColor || '#ffffff', opacity: hovered ? 1 : 0.8, display: 'flex' }">
                <template x-if="settings.lucideIcon === 'MessageCircle' || !settings.lucideIcon">
                  <svg viewBox="0 0 24 24" :width="settings.iconWidth || 20" :height="settings.iconHeight || 20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </template>
                <template x-if="settings.lucideIcon === 'MessageSquare'">
                  <svg viewBox="0 0 24 24" :width="settings.iconWidth || 20" :height="settings.iconHeight || 20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </template>
                <template x-if="settings.lucideIcon === 'Send'">
                  <svg viewBox="0 0 24 24" :width="settings.iconWidth || 20" :height="settings.iconHeight || 20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </template>
                <template x-if="settings.lucideIcon === 'HelpCircle'">
                  <svg viewBox="0 0 24 24" :width="settings.iconWidth || 20" :height="settings.iconHeight || 20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                </template>
              </div>
            </template>
            
            <template x-if="settings.iconType === 'image' && settings.iconImageUrl">
              <img :src="settings.iconImageUrl" alt="icon" class="rounded"
                :style="{ objectFit: settings.iconFit || 'contain', opacity: settings.iconOpacity !== undefined ? settings.iconOpacity : 1, width: (settings.iconWidth || 20) + 'px', height: (settings.iconHeight || 20) + 'px', mixBlendMode: settings.iconBlend || 'normal' }" />
            </template>

            <template x-if="settings.iconType === 'customSvg' && settings.customSvg">
              <div class="custom-svg-icon"
                   :style="{ color: settings.iconColor || '#ffffff', opacity: settings.iconOpacity !== undefined ? settings.iconOpacity : 1, display: 'inline-flex', width: (settings.iconWidth || 20) + 'px', height: (settings.iconHeight || 20) + 'px' }"
                   x-html="settings.customSvg"></div>
            </template>

            <template x-if="$store.chat.unreadCount > 0">
              <span style="position: absolute; top: -10px; right: -10px; background-color: #dc2626; color: #ffffff; font-weight: 700; border-radius: 9999px; display: flex; align-items: center; justify-content: center; min-width: 18px; height: 18px; font-size: 10px; border: 1.5px solid #ffffff; z-index: 50; box-shadow: 0 1px 3px rgba(0,0,0,0.15);"
                    x-text="$store.chat.unreadCount"></span>
            </template>
          </div>
        </div>
      </template>
  `;

  document.body.appendChild(widgetContainer);

  // Setup Alpine Controller Logic
  window.previewBubbleController = function (initialSettings) {
    return {
      settings: initialSettings,
      hovered: false,
      hexToRgba(hex, alpha) {
        if (!hex) return '';
        if (hex.startsWith('#')) {
          const v = hex.replace('#', '');
          const bigint = parseInt(v.length === 3 ? v.split('').map(c => c + c).join('') : v, 16);
          if (!isNaN(bigint)) {
            return `rgba(${(bigint >> 16) & 255},${(bigint >> 8) & 255},${bigint & 255},${alpha !== undefined ? alpha : 1})`;
          }
        }
        return hex;
      },
      cssKeyframes() {
        if (!this.settings) return '';
        const amp = (this.settings.idleAnim && this.settings.idleAnim.amplitude) ? this.settings.idleAnim.amplitude : 6;
        return `
          @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes popIn { 0% { transform: scale(.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
          @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          @keyframes idleFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-${amp}px); } }
          @keyframes dotBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
          @keyframes dotPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.25); } }
          .custom-svg-icon svg { width: 100%; height: 100%; display: block; }
        `;
      },
      getBorderRadius() {
        if (!this.settings || !this.settings.borderRadius) return '50%';
        if (typeof this.settings.borderRadius === 'number') {
          return `${this.settings.borderRadius}px`;
        }
        if (typeof this.settings.borderRadius === 'object') {
          const { tl = 50, tr = 50, br = 50, bl = 50 } = this.settings.borderRadius;
          return `${tl}px ${tr}px ${br}px ${bl}px`;
        }
        return '50%';
      },
      getGradient() {
        if (!this.settings || !this.settings.gradientType || this.settings.gradientType === 'none') return '';
        const stopsArray = this.settings.gradientStops || [];
        if (stopsArray.length === 0) return this.settings.backgroundColor || '#0b5fff';
        const stops = stopsArray.map(s => `${s.color} ${s.pos}%`).join(', ');
        if (this.settings.gradientType === 'radial') {
          return `radial-gradient(circle, ${stops})`;
        }
        return `linear-gradient(${this.settings.gradientAngle || 135}deg, ${stops})`;
      },
      getBoxShadow() {
        if (!this.settings) return '';
        const { boxShadowOffsetX = 0, boxShadowOffsetY = 8, boxShadowBlur = 20, boxShadowSpread = 0, boxShadowOpacity = 0.25 } = this.settings;
        return `${boxShadowOffsetX}px ${boxShadowOffsetY}px ${boxShadowBlur}px ${boxShadowSpread}px rgba(0,0,0,${boxShadowOpacity})`;
      },
      getInnerShadow() {
        if (!this.settings || !this.settings.innerShadow || !this.settings.innerShadow.enabled) return '';
        return `inset 0 6px ${this.settings.innerShadow.blur || 12}px rgba(0,0,0,${this.settings.innerShadow.opacity || 0.25})`;
      },
      getCompositeBackground() {
        if (!this.settings) return '#0b5fff';
        if (this.settings.useWebsiteTheme) return this.settings.backgroundColor || '#0b5fff';
        return (this.settings.gradientType && this.settings.gradientType !== 'none')
          ? this.getGradient()
          : (this.settings.backgroundColor || '#0b5fff');
      },
      getBorderStyle() {
        if (!this.settings) return {};
        const b = this.settings.border;
        if (!b) return {};
        return { borderWidth: `${b.width || 0}px`, borderStyle: b.style || 'solid', borderColor: b.color || 'transparent' };
      },
      getEntryAnimStyle() {
        const panelOpen = window.Alpine ? Alpine.store('chat').panelOpen : false;
        if (!this.settings || !this.settings.idleAnim || !this.settings.idleAnim.enabled || this.settings.idleAnim.type === 'none' || this.hovered || panelOpen) return {};
        return { animation: `idleFloat ${this.settings.idleAnim.duration || 3200}ms ease-in-out infinite` };
      },
      getBadgeStyle() {
        if (!this.settings || !this.settings.badge) {
          return { position: 'absolute', top: '-6px', right: '-6px', backgroundColor: '#dc2626', color: '#ffffff', fontSize: '11px', lineHeight: '1', minWidth: '20px', height: '20px', border: '2px solid #ffffff', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', boxShadow: '0 1px 3px rgba(0,0,0,0.15)', zIndex: 50 };
        }
        const b = this.settings.badge;
        const pos = b.position || 'top-right';
        const offsetX = b.offsetX !== undefined ? b.offsetX : -6;
        const offsetY = b.offsetY !== undefined ? b.offsetY : -6;
        const size = b.size || 20;
        
        const style = { position: 'absolute', backgroundColor: b.backgroundColor || '#dc2626', color: b.textColor || '#ffffff', fontSize: (b.fontSize || 11) + 'px', lineHeight: '1', minWidth: size + 'px', height: size + 'px', border: `${b.borderWidth !== undefined ? b.borderWidth : 2}px solid ${b.borderColor || '#ffffff'}`, borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', boxShadow: '0 1px 3px rgba(0,0,0,0.15)', zIndex: 50 };
        
        if (pos === 'top-left') { style.top = offsetY + 'px'; style.left = offsetX + 'px'; } else if (pos === 'bottom-right') { style.bottom = offsetY + 'px'; style.right = offsetX + 'px'; } else if (pos === 'bottom-left') { style.bottom = offsetY + 'px'; style.left = offsetX + 'px'; } else { style.top = offsetY + 'px'; style.right = offsetX + 'px'; }
        return style;
      },
      getNeonStyle() {
        if (!this.settings || !this.settings.neon || !this.settings.neon.enabled) return {};
        const color = this.settings.neon.color || '#22d3ee';
        const intensity = this.settings.neon.intensity || 0.8;
        return { boxShadow: `0 0 ${20 * intensity}px ${color}, inset 0 0 ${10 * intensity}px ${color}` };
      },
      getGlassStyle() {
        if (!this.settings || !this.settings.glass || !this.settings.glass.enabled) return {};
        return { backdropFilter: `blur(${this.settings.glass.blur || 10}px)`, WebkitBackdropFilter: `blur(${this.settings.glass.blur || 10}px)`, backgroundColor: `rgba(255, 255, 255, ${this.settings.glass.bgOpacity || 0.3})` };
      },
      getTooltipStyle() {
        if (!this.settings || !this.settings.tooltip) return {};
        const t = this.settings.tooltip;
        const pos = t.position || 'left';
        let borderRadius = '20px';
        if (t.borderRadius) {
          if (typeof t.borderRadius === 'object') {
            const tl = t.borderRadius.tl !== undefined ? t.borderRadius.tl : 20;
            const tr = t.borderRadius.tr !== undefined ? t.borderRadius.tr : 20;
            const br = t.borderRadius.br !== undefined ? t.borderRadius.br : 20;
            const bl = t.borderRadius.bl !== undefined ? t.borderRadius.bl : 20;
            borderRadius = `${tl}px ${tr}px ${br}px ${bl}px`;
          } else if (typeof t.borderRadius === 'number') { borderRadius = t.borderRadius + 'px'; } else { borderRadius = t.borderRadius; }
        }

        const style = { position: 'absolute', backgroundColor: t.backgroundColor || '#ffffff', color: t.textColor || '#374151', fontSize: (t.fontSize || 14) + 'px', padding: t.padding || '8px 16px', borderRadius: borderRadius, boxShadow: t.boxShadow || '0 4px 12px rgba(0,0,0,0.1)', border: `${t.borderWidth || 0}px solid ${t.borderColor || 'transparent'}`, whiteSpace: 'nowrap', pointerEvents: 'auto', zIndex: 100 };
        if (pos === 'left') { style.right = 'calc(100% + 12px)'; style.top = '50%'; style.transform = 'translateY(-50%)'; } else if (pos === 'right') { style.left = 'calc(100% + 12px)'; style.top = '50%'; style.transform = 'translateY(-50%)'; } else if (pos === 'top') { style.bottom = 'calc(100% + 12px)'; style.left = '50%'; style.transform = 'translateX(-50%)'; } else if (pos === 'bottom') { style.top = 'calc(100% + 12px)'; style.left = '50%'; style.transform = 'translateX(-50%)'; }
        return style;
      },
      getTooltipArrowStyle() {
        if (!this.settings || !this.settings.tooltip) return {};
        const t = this.settings.tooltip;
        const pos = t.position || 'left';
        const size = 8;
        const style = { position: 'absolute', width: size + 'px', height: size + 'px', backgroundColor: t.backgroundColor || '#ffffff', boxSizing: 'border-box', pointerEvents: 'none' };
        const borderW = t.borderWidth || 0;
        const borderC = t.borderColor || 'transparent';
        if (pos === 'left') { style.right = `-${size / 2}px`; style.top = '50%'; style.transform = 'translateY(-50%) rotate(45deg)'; if (borderW > 0) { style.borderTop = `${borderW}px solid ${borderC}`; style.borderRight = `${borderW}px solid ${borderC}`; } } else if (pos === 'right') { style.left = `-${size / 2}px`; style.top = '50%'; style.transform = 'translateY(-50%) rotate(45deg)'; if (borderW > 0) { style.borderBottom = `${borderW}px solid ${borderC}`; style.borderLeft = `${borderW}px solid ${borderC}`; } } else if (pos === 'top') { style.bottom = `-${size / 2}px`; style.left = '50%'; style.transform = 'translateX(-50%) rotate(45deg)'; if (borderW > 0) { style.borderBottom = `${borderW}px solid ${borderC}`; style.borderRight = `${borderW}px solid ${borderC}`; } } else if (pos === 'bottom') { style.top = `-${size / 2}px`; style.left = '50%'; style.transform = 'translateX(-50%) rotate(45deg)'; if (borderW > 0) { style.borderTop = `${borderW}px solid ${borderC}`; style.borderLeft = `${borderW}px solid ${borderC}`; } }
        return style;
      }
    };
  };

  window.chatbarPreviewController = function (initialSettings) {
    return {
      settings: initialSettings,
      hovered: false,
      getBackgroundStyle() {
        if (!this.settings) return '#007bff';
        if (this.settings.useWebsiteTheme) {
          const chatConfig = Alpine.store('chatWindow');
          return chatConfig.accentColor || '#0b5fff';
        }
        if (!this.settings.gradientEnabled) return this.settings.bgColor || '#007bff';
        const stopsArray = this.settings.gradientStops || [];
        if (stopsArray.length === 0) return this.settings.bgColor || '#007bff';
        const stops = stopsArray.map(s => `${s.color} ${s.pos}%`).join(', ');
        switch (this.settings.gradientType) {
          case 'linear': return `linear-gradient(${this.settings.gradientAngle || 90}deg, ${stops})`;
          case 'radial': return `radial-gradient(circle, ${stops})`;
          case 'conic': return `conic-gradient(from ${this.settings.gradientAngle || 90}deg, ${stops})`;
          default: return this.settings.bgColor || '#007bff';
        }
      },
      getBorderRadius() {
        if (!this.settings || !this.settings.borderRadius) return '20px';
        if (typeof this.settings.borderRadius === 'number') { return `${this.settings.borderRadius}px`; }
        if (typeof this.settings.borderRadius === 'object') {
          const { tl = 20, tr = 20, br = 20, bl = 20 } = this.settings.borderRadius;
          return `${tl}px ${tr}px ${br}px ${bl}px`;
        }
        return '20px';
      }
    };
  };

  function getClientId() {
    if (window.ZOTLY_CLIENT_ID) { return window.ZOTLY_CLIENT_ID; }
    let scriptTag = document.currentScript;
    if (!scriptTag || !scriptTag.src || !scriptTag.src.includes('widget.js')) {
      scriptTag = document.querySelector('script[data-client-id]') || document.querySelector('script[src*="widget.js"]');
    }
    if (scriptTag) {
      const dataId = scriptTag.getAttribute('data-client-id');
      if (dataId) return dataId;
      try {
        const url = new URL(scriptTag.src, window.location.href);
        const paramId = url.searchParams.get('client_id') || url.searchParams.get('clientId');
        if (paramId) return paramId;
      } catch (e) { }
    }
    return 'default';
  }

  async function fetchClientConfig(clientId) {
    const baseUrl = getWidgetBaseUrl();
    const clientConfigUrl = `${baseUrl}public/clients/${clientId}.json`;
    try {
      const res = await fetch(clientConfigUrl);
      if (res.ok) {
        const data = await res.json();
        return { bubbleConfig: data.bubble || {}, chatConfig: data.chatWindow || data.chat || {}, chatbarConfig: data.chatbar || {}, greetWindowConfig: data.greetWindow || {} };
      }
    } catch (e) { }
    
    const defaultBubbleUrl = `${baseUrl}public/bubble.json`;
    const defaultChatUrl = `${baseUrl}public/chatWindow.json`;
    const defaultChatbarUrl = `${baseUrl}public/chatbar.json`;
    try {
      const [bubbleRes, chatRes, chatbarRes] = await Promise.allSettled([
        fetch(defaultBubbleUrl).then(r => r.ok ? r.json() : {}),
        fetch(defaultChatUrl).then(r => r.ok ? r.json() : {}),
        fetch(defaultChatbarUrl).then(r => r.ok ? r.json() : {})
      ]);
      return { 
        bubbleConfig: bubbleRes.status === 'fulfilled' ? bubbleRes.value : {}, 
        chatConfig: chatRes.status === 'fulfilled' ? chatRes.value : {}, 
        chatbarConfig: chatbarRes.status === 'fulfilled' ? chatbarRes.value : {},
        greetWindowConfig: {}
      };
    } catch (e) {
      return { bubbleConfig: {}, chatConfig: {}, chatbarConfig: {}, greetWindowConfig: {} };
    }
  }

  const initStores = async () => {
    const theme = getParentTheme();
    const clientId = getClientId();

    if (!Alpine.store('bubble')) {
      Alpine.store('bubble', {
        useWebsiteTheme: true, width: 50, height: 50, borderRadius: { tl: 50, tr: 50, bl: 50, br: 50 }, backgroundColor: theme.primary || '#0b5fff', gradientType: 'none', gradientStops: [{ color: theme.primary || '#0b5fff', pos: 0 }, { color: theme.secondary || '#22D3EE', pos: 100 }], backgroundOverlayType: 'image', backgroundImageUrl: '', backgroundImageSize: 'contain', backgroundImageOpacity: 0.25, backgroundBlendMode: 'normal', border: { width: 0, color: theme.primary || '#0b5fff', style: 'solid' }, outlineRing: { enabled: true, width: 3, color: theme.secondary || '#22D3EE', opacity: 0.4 }, boxShadowBlur: 20, boxShadowSpread: 0, boxShadowOffsetX: 0, boxShadowOffsetY: 8, boxShadowOpacity: 0.25, dots: { color: '#F8FAFC', size: 6, spacing: 6, animation: 'bounce' }, hideOnOpen: true, tooltip: { enabled: false, text: 'Chat with us', position: 'left', backgroundColor: '#ffffff', textColor: '#374151', fontSize: 14, borderRadius: { tl: 20, tr: 20, br: 4, bl: 20 }, padding: '8px 16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', arrowEnabled: true, borderColor: 'transparent', borderWidth: 0 }
      });
    }

    if (!Alpine.store('greetWindow')) {
      Alpine.store('greetWindow', {
        enabled: false, dismissed: false, width: 320, spacing: 16, backgroundColor: "#ffffff", borderRadius: 16, padding: "24px 20px", boxShadow: "0 12px 28px -6px rgba(0,0,0,0.15), 0 8px 14px -4px rgba(0,0,0,0.1)", imageUrl: "", imageHeight: 70, title: "Hi there! 👋", titleColor: "#1e293b", titleFontSize: "15px", description: "How can we help you?", descriptionColor: "#475569", descriptionFontSize: "14px",
        inputBox: { enabled: true, placeholder: "Write your message...", backgroundColor: "#ffffff", textColor: "#1e293b", borderRadius: 24, boxShadow: "0 6px 16px rgba(0,0,0,0.12)", buttonColor: theme.primary || "#9333EA", buttonIconColor: "#ffffff" }
      });
    }

    if (!Alpine.store('chatWindow')) {
      Alpine.store('chatWindow', {
        clientName: 'Zotly Support', agentName: 'Sarah', accentColor: theme.primary || '#0b5fff', useWebsiteTheme: true, widgetWidth: 350, widgetHeight: 550, expandedWidth: 480, expandedHeight: 550, widgetBorderRadius: 24, widgetShadow: true, widgetShadowBlur: 30, widgetShadowColor: 'rgba(0,0,0,0.12)', widgetBorderEnabled: true, widgetBorderWidth: 1, widgetBorderColor: '#e5e7eb', modernUi: true, typingIndicator: true, attachmentsEnabled: true,
        welcome: { enabled: false }
      });
      Alpine.store('chatcontactv2', Alpine.store('chatWindow'));
    }

    if (!Alpine.store('chatbar')) {
      Alpine.store('chatbar', {
        enabled: false, useWebsiteTheme: true, text: "Chat with us", bgColor: theme.primary || "#0b5fff", textColor: "#ffffff", textSize: 14, letterSpacing: 0, gradientEnabled: false, gradientStops: [{ color: theme.primary || "#0b5fff", pos: 0 }, { color: theme.secondary || "#22D3EE", pos: 100 }], gradientType: "linear", gradientAngle: 90, iconType: "lucide", iconColor: "#ffffff", lucideIcon: "MessageCircle", iconImageUrl: "", iconFit: "contain", iconOpacity: 1, iconBlend: "normal", iconWidth: 20, iconHeight: 20, width: 255, height: 40, shadow: true, borderRadius: { tl: 20, tr: 20, bl: 20, br: 20 }, hideOnOpen: true
      });
    }

    const { bubbleConfig, chatConfig, chatbarConfig, greetWindowConfig } = await fetchClientConfig(clientId);

    if (bubbleConfig && Object.keys(bubbleConfig).length > 0) {
      if (bubbleConfig.useWebsiteTheme === true) {
        bubbleConfig.backgroundColor = theme.primary;
        bubbleConfig.gradientType = 'none';
        if (bubbleConfig.outlineRing) { bubbleConfig.outlineRing.color = theme.secondary; }
      }
      Object.assign(Alpine.store('bubble'), bubbleConfig);
    }

    if (greetWindowConfig && Object.keys(greetWindowConfig).length > 0) {
      if (greetWindowConfig.inputBox) {
        greetWindowConfig.inputBox = { ...Alpine.store('greetWindow').inputBox, ...greetWindowConfig.inputBox };
      }
      Object.assign(Alpine.store('greetWindow'), greetWindowConfig);
    }

    if (chatbarConfig && Object.keys(chatbarConfig).length > 0) {
      Object.assign(Alpine.store('chatbar'), chatbarConfig);
    }

    if (chatConfig && Object.keys(chatConfig).length > 0) {
      const applyTheme = () => {
        const isDark = document.documentElement.classList.contains('dark');
        const activeConfig = JSON.parse(JSON.stringify(chatConfig));

        if (activeConfig.useWebsiteTheme === true) {
          activeConfig.accentColor = theme.primary;
          activeConfig.visitorBubbleBg = theme.primary;
          activeConfig.visitorBubbleColor = '#ffffff';
          activeConfig.headerBg = theme.primary;
          activeConfig.headerTextColor = '#ffffff';
          activeConfig.headerAvatarBg = 'rgba(255,255,255,0.2)';
          activeConfig.headerAvatarColor = '#ffffff';
          activeConfig.agentAvatarBg = theme.primary;
          activeConfig.agentAvatarColor = '#ffffff';
          activeConfig.inputFocusBorderColor = theme.primary;
          activeConfig.inputFocusShadow = `0 0 0 2px ${theme.primary}26`;
          activeConfig.sendButtonBgActive = theme.primary;
          activeConfig.poweredByColor = theme.primary;
          activeConfig.endChatConfirmBg = theme.primary;
          activeConfig.endChatConfirmTextColor = '#ffffff';

          if (isDark) {
            activeConfig.bodyBg = 'var(--cw-bg)';
            activeConfig.inputBg = 'var(--cw-surface)';
            activeConfig.agentBubbleBg = 'var(--cw-surface)';
            activeConfig.agentBubbleColor = 'var(--cw-ink)';
            activeConfig.agentBubbleBorderColor = 'var(--cw-border)';
            activeConfig.footerBg = 'var(--cw-bg)';
            activeConfig.footerTextColor = 'var(--cw-muted)';
            activeConfig.inputTextColor = 'var(--cw-ink)';
            activeConfig.inputBorderColor = 'var(--cw-border)';
            activeConfig.attachButtonBg = 'var(--cw-surface)';
            activeConfig.attachButtonColor = 'var(--cw-muted)';
            activeConfig.emojiButtonColor = 'var(--cw-muted)';
            activeConfig.modalCardBg = 'var(--cw-surface)';
            activeConfig.modalMessageColor = 'var(--cw-ink)';
            activeConfig.endChatCancelBg = 'var(--cw-surface)';
            activeConfig.endChatCancelTextColor = 'var(--cw-muted)';
            activeConfig.endChatCancelBorderColor = 'var(--cw-border)';
          }
        }

        if (isDark && chatConfig.dark && Object.keys(chatConfig.dark).length > 0) {
          Object.assign(activeConfig, chatConfig.dark);
        }

        Object.assign(Alpine.store('chatWindow'), activeConfig);
        if (Alpine.store('chatcontactv2')) {
          Object.assign(Alpine.store('chatcontactv2'), activeConfig);
        }
      };

      applyTheme();
      if (chatConfig.welcome) {
        Alpine.store('chatWindow').welcome = Object.assign({}, Alpine.store('chatWindow').welcome, chatConfig.welcome);
      }

      const observer = new MutationObserver(() => { applyTheme(); });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }

    if (!Alpine.store('chat')) {
      const initialAgentName = (chatConfig && chatConfig.agentName) ? chatConfig.agentName : 'Sarah';
      const welcomeEnabled = chatConfig && chatConfig.welcome && chatConfig.welcome.enabled === true;
      Alpine.store('chat', {
        state: welcomeEnabled ? 'welcome' : 'active',
        isExpanded: false, panelOpen: false, unreadCount: 0, isMobile: window.innerWidth < 640 || window.innerHeight < 750,
        clientName: (chatConfig && chatConfig.clientName) ? chatConfig.clientName : 'Zotly Support',
        agentName: initialAgentName, agentsOnline: true, token: 'visitor-token-demo', position: 1, menuOpen: false, attachOpen: false, emojiOpen: false, confirmBox: null, confirmResolve: function () { }, reconnecting: false, soundsOn: true, consentDismissed: false, typingName: '', uploading: false, offlineSending: false, offlineName: '', offlineEmail: '', offlineMessage: '', draft: '',
        flags: { 'widget.modernUi': true, 'chat.typingIndicator': true, 'attachments.enabled': true },
        messages: [
          { key: 'm1', senderType: 'AGENT', senderName: initialAgentName, body: 'Hi! How can I help you today?', created: new Date(Date.now() - 300000).toISOString() },
          { key: 'm2', senderType: 'VISITOR', body: 'I need help with my order', created: new Date(Date.now() - 240000).toISOString(), status: 'read' }
        ],
        startFromWelcome() { this.state = 'active'; this.scrollDown(); },
        async submitPrechat(formElement) {
          const formData = new FormData(formElement);
          const body = new URLSearchParams(formData);
          try {
            const response = await fetch('/api/widget/conversations', { method: 'POST', headers: { 'X-Visitor-Token': this.token || '', 'Content-Type': 'application/x-www-form-urlencoded' }, body: body });
            const html = await response.text();
            const target = document.getElementById('swap-zone-embed');
            if (target) { target.innerHTML = html; }
          } catch (err) { }
        },
        flag(key, defaultValue) { return this.flags[key] !== undefined ? this.flags[key] : (defaultValue !== undefined ? defaultValue : true); },
        send() {
          if (this.draft && this.draft.trim()) {
            const text = this.draft.trim();
            const msgObj = { key: 'msg_' + Date.now(), senderType: 'VISITOR', body: text, created: new Date().toISOString(), status: 'sent' };
            this.messages.push(msgObj);
            this.draft = ''; this.emojiOpen = false; this.attachOpen = false; this.scrollDown();
            
            setTimeout(() => { const idx = this.messages.findIndex(m => m.key === msgObj.key); if (idx !== -1) { this.messages[idx].status = 'delivered'; this.messages = [...this.messages]; } }, 2000);
            setTimeout(() => { const idx = this.messages.findIndex(m => m.key === msgObj.key); if (idx !== -1) { this.messages[idx].status = 'read'; this.messages = [...this.messages]; } }, 4000);

            this.typingName = this.agentName || 'Agent';
            setTimeout(() => {
              this.typingName = '';
              this.messages.push({ key: 'msg_' + Date.now(), senderType: 'AGENT', senderName: this.agentName || 'Sarah', body: "Thanks! I'm checking that right now...", created: new Date().toISOString() });
              this.scrollDown();
              if (!this.panelOpen) { this.unreadCount++; }
            }, 1800);
          }
        },
        askEndChat() {
          const config = Alpine.store('chatWindow');
          this.confirmBox = { message: config.endChatConfirmMessage || 'Are you sure you want to end this chat session?', confirmLabel: config.endChatConfirmLabel || 'End chat', cancelLabel: config.endChatCancelLabel || 'Cancel' };
          this.confirmResolve = () => { this.state = 'closed'; this.confirmBox = null; };
        },
        startNew() { this.state = 'active'; this.messages = [{ key: 'm_new', senderType: 'AGENT', senderName: this.agentName || 'Sarah', body: 'Chat restarted. How can we help you?', created: new Date().toISOString() }]; },
        closePanel() { this.isExpanded = false; this.menuOpen = false; this.attachOpen = false; this.emojiOpen = false; window.dispatchEvent(new CustomEvent('close-contact-widget')); },
        toggleExpand() { this.isExpanded = !this.isExpanded; },
        downloadTranscript() { this.menuOpen = false; alert('Downloading transcript...'); },
        toggleSounds() { this.soundsOn = !this.soundsOn; },
        dismissConsent() { this.consentDismissed = true; },
        submitOffline() { if (this.offlineEmail && this.offlineMessage) { this.offlineSending = true; setTimeout(() => { this.offlineSending = false; this.state = 'offline-sent'; }, 1000); } },
        uploadImage(input) {
          if (input.files && input.files[0]) {
            const url = URL.createObjectURL(input.files[0]);
            const msgObj = { key: 'img_' + Date.now(), senderType: 'VISITOR', localUrl: url, attachment: true, body: '', created: new Date().toISOString(), status: 'sent' };
            this.messages.push(msgObj);
            this.attachOpen = false; this.scrollDown();
            setTimeout(() => { const idx = this.messages.findIndex(m => m.key === msgObj.key); if (idx !== -1) { this.messages[idx].status = 'delivered'; this.messages = [...this.messages]; } }, 2000);
            setTimeout(() => { const idx = this.messages.findIndex(m => m.key === msgObj.key); if (idx !== -1) { this.messages[idx].status = 'read'; this.messages = [...this.messages]; } }, 4000);
          }
        },
        captureScreenshot() { this.attachOpen = false; alert('Screenshot captured!'); },
        scrollDown() { setTimeout(() => { const msgs = document.querySelector('.messages'); if (msgs) msgs.scrollTop = msgs.scrollHeight; }, 50); },
        dividerBefore(index) { return index === 0; },
        dayLabel() { return 'Today'; },
        timeLabel(msg) { const d = msg.created ? new Date(msg.created) : new Date(); return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); },
        groupStart(index) { return index === 0 || this.messages[index].senderType !== this.messages[index - 1].senderType; },
        groupEnd(index) { return index === this.messages.length - 1 || this.messages[index].senderType !== this.messages[index + 1].senderType; },
        attachmentUrl(msg) { return msg.localUrl || msg.url || ''; },
        notifyTyping() { }
      });
    } else {
      const chatStore = Alpine.store('chat');
      if (chatConfig) {
        if (chatConfig.clientName) chatStore.clientName = chatConfig.clientName;
        if (chatConfig.agentName) {
          chatStore.agentName = chatConfig.agentName;
          if (chatStore.messages && chatStore.messages[0]) { chatStore.messages[0].senderName = chatConfig.agentName; }
        }
      }
    }

    window.addEventListener('resize', () => {
      const isMob = window.innerWidth < 640 || window.innerHeight < 750;
      const chatStore = window.Alpine ? Alpine.store('chat') : null;
      if (chatStore && chatStore.isMobile !== isMob) { chatStore.isMobile = isMob; }
    });
  };

  if (window.Alpine) {
    initStores();
  } else {
    document.addEventListener('alpine:init', initStores);
    const alpineScript = document.createElement('script');
    alpineScript.defer = true;
    alpineScript.src = 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js';
    document.head.appendChild(alpineScript);
  }
})();