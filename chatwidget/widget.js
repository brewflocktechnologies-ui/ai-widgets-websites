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
    `;
    document.head.appendChild(styleRule);
  }

  // Helper to extract primary/secondary colors from parent HTML CSS variables
  function getParentTheme() {
    const rootStyle = getComputedStyle(document.documentElement);
    const bodyStyle = getComputedStyle(document.body);

    let primary = rootStyle.getPropertyValue('--primary-color').trim() ||
      bodyStyle.getPropertyValue('--primary-color').trim();

    let secondary = rootStyle.getPropertyValue('--secondary-color').trim() ||
      bodyStyle.getPropertyValue('--secondary-color').trim();

    // Fallback: check script attribute if defined
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
  widgetContainer.setAttribute('@toggle-contact-widget.window', 'openContactWidget = !openContactWidget');
  widgetContainer.setAttribute('@close-contact-widget.window', 'openContactWidget = false');

  widgetContainer.innerHTML = `
    <!-- Pop-up Chat V2 Widget Overlay -->
    <div x-show="openContactWidget"
      x-transition:enter="transition ease-out duration-300 origin-bottom-right"
      x-transition:enter-start="opacity-0 scale-50 translate-y-8"
      x-transition:enter-end="opacity-100 scale-100 translate-y-0"
      x-transition:leave="transition ease-in duration-200 origin-bottom-right"
      x-transition:leave-start="opacity-100 scale-100 translate-y-0"
      x-transition:leave-end="opacity-0 scale-50 translate-y-8"
      class="fixed bottom-3 right-4 z-50 flex flex-col transition-all duration-300 pointer-events-auto zotly-widget-panel-wrapper"
      :style="{
        width: $store.chat.isExpanded ? ($store.chatcontactv2.expandedWidth ? $store.chatcontactv2.expandedWidth + 'px' : '480px') : ($store.chatcontactv2.widgetWidth ? $store.chatcontactv2.widgetWidth + 'px' : '350px'),
        height: $store.chatcontactv2.widgetHeight ? $store.chatcontactv2.widgetHeight + 'px' : '550px',
        maxWidth: 'calc(100vw - 32px)',
        maxHeight: 'calc(100vh - 32px)',
        position: 'fixed',
        bottom: '12px',
        right: '16px'
      }" style="display: none;">
      
      <div class="panel flex flex-col relative w-full h-full overflow-hidden"
        :style="{
          boxShadow: $store.chatcontactv2.widgetShadow ? \`0 0 \${$store.chatcontactv2.widgetShadowBlur || 20}px \${$store.chatcontactv2.widgetShadowColor || 'rgba(0,0,0,0.15)'}\` : 'none',
          border: $store.chatcontactv2.widgetBorderEnabled ? \`\${$store.chatcontactv2.widgetBorderWidth || 1}px solid \${$store.chatcontactv2.widgetBorderColor || '#e5e7eb'}\` : 'none',
          borderRadius: \`\${$store.chatcontactv2.widgetBorderRadius || 16}px\`,
          background: $store.chatcontactv2.bodyBg || 'var(--cw-bg)',
          '--cw-accent': $store.chatcontactv2.accentColor || '#0b5fff',
          isolation: 'isolate',
          transform: 'translateZ(0)'
        }">
        <header class="panel-header" :style="{
          background: $store.chatcontactv2.headerBg || 'var(--cw-grad)',
          color: $store.chatcontactv2.headerTextColor || '#fff',
          padding: $store.chatcontactv2.headerPadding || '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: $store.chatcontactv2.headerBorderColor ? \`1px solid \${$store.chatcontactv2.headerBorderColor}\` : '1px solid rgba(0,0,0,0.08)',
          position: 'relative'
        }">
          <!-- Left side: Expand button, Brand Avatar & Text -->
          <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
            <!-- Expand / Collapse Button -->
            <button type="button" class="icon-btn" :aria-label="$store.chat.isExpanded ? 'Collapse chat' : 'Expand chat'"
                    :style="{ color: $store.chatcontactv2.headerTextColor || '#fff', opacity: '0.7' }"
                    x-show="$store.chat.flag('widget.modernUi', true)"
                    @click="$store.chat.toggleExpand()">
              <!-- Collapse Icon (diagonal arrows pointing inwards) when expanded -->
              <template x-if="$store.chat.isExpanded">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
                     stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" />
                </svg>
              </template>
              <!-- Expand Icon (diagonal arrows pointing outwards) when collapsed -->
              <template x-if="!$store.chat.isExpanded">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
                     stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </template>
            </button>

            <!-- Brand Avatar -->
            <div style="width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 700; flex-shrink: 0; position: relative;"
                 :style="{
                   background: $store.chatcontactv2.headerAvatarBg || ($store.chatcontactv2.headerTextColor === '#18181b' ? '#e4e4e7' : 'rgba(255,255,255,0.2)'),
                   color: $store.chatcontactv2.headerAvatarColor || ($store.chatcontactv2.headerTextColor || '#fff')
                 }">
              <span x-text="($store.chat.clientName || $store.chatcontactv2.clientName || 'S').charAt(0)"></span>
              <span style="position: absolute; bottom: 0; right: 0; width: 8px; height: 8px; border-radius: 50%; background: #22c55e; border: 1.5px solid #ffffff;"></span>
            </div>

            <!-- Brand Title & Subtitle -->
            <div style="display: flex; flex-direction: column; text-align: left; min-width: 0;">
              <span style="font-weight: 700; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                    :style="{ fontSize: $store.chatcontactv2.headerTitleFontSize || '14px' }"
                    x-text="$store.chat.clientName || $store.chatcontactv2.clientName || 'Support'"></span>
              <span style="opacity: 0.8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                    :style="{ fontSize: $store.chatcontactv2.headerSubtitleFontSize || '11px' }"
                    x-text="$store.chat.state === 'active' ? (($store.chat.agentName || $store.chatcontactv2.agentName) ? ($store.chat.agentName || $store.chatcontactv2.agentName) + ' · Online' : 'Online') : 'Online'"></span>
            </div>
          </div>

          <!-- Right side: Actions -->
          <div style="display: flex; gap: 8px; align-items: center; flex-shrink: 0;">
            <!-- End Chat Session (Power Icon Button) -->
            <button type="button" class="icon-btn" aria-label="End chat session"
                    :style="{ color: $store.chatcontactv2.headerTextColor || '#fff', opacity: '0.7' }"
                    @click="$store.chat.askEndChat()">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
                   stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" />
              </svg>
            </button>
            <button type="button" class="icon-btn" aria-label="Chat options"
                    :style="{ color: $store.chatcontactv2.headerTextColor || '#fff', opacity: '0.7' }"
                    x-show="$store.chat.flag('widget.modernUi', true)"
                    @click="$store.chat.menuOpen = !$store.chat.menuOpen">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <circle cx="5" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="12" r="1.8" />
              </svg>
            </button>
            <button type="button" class="icon-btn" aria-label="Minimize chat panel"
                    :style="{ color: $store.chatcontactv2.headerTextColor || '#fff', opacity: '0.7' }"
                    @click="$store.chat.closePanel(); openContactWidget = false">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        <!-- Options menu -->
        <div class="menu-pop" x-show="$store.chat.menuOpen" x-cloak
             @click.outside="$store.chat.menuOpen = false">
          <button type="button" class="menu-item" @click="$store.chat.downloadTranscript()">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
            </svg>
            Download transcript
          </button>
          <button type="button" class="menu-item" @click="$store.chat.toggleSounds()">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M11 5L6 9H3v6h3l5 4V5zM16 9a4 4 0 010 6" />
            </svg>
            Sounds
            <span class="mini-switch" :class="{ on: $store.chat.soundsOn }" aria-hidden="true"><i></i></span>
          </button>
        </div>

        <div class="panel-body" id="panel-body" :style="{ background: $store.chatcontactv2.bodyBg || 'var(--cw-bg)' }">
          <div class="center-note" x-show="$store.chat.state === 'boot'">
            <div class="spinner" aria-hidden="true"></div>
            <p>Connecting…</p>
          </div>

          <div class="prechat" x-show="$store.chat.state === 'prechat'">
            <div class="avatar prechat-avatar" aria-hidden="true">
              <span x-text="($store.chat.clientName || $store.chatcontactv2.clientName || 'S').charAt(0)"></span>
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
            <div class="messages" x-ref="messages" :style="{ background: $store.chatcontactv2.bodyBg || 'var(--cw-bg)' }">
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
                      background: $store.chatcontactv2.agentAvatarBg || 'var(--cw-accent-tint)',
                      color: $store.chatcontactv2.agentAvatarColor || 'var(--cw-accent-deep)'
                    }">
                      <template x-if="$store.chatcontactv2.agentAvatarUrl">
                        <img :src="$store.chatcontactv2.agentAvatarUrl" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" />
                      </template>
                      <template x-if="!$store.chatcontactv2.agentAvatarUrl">
                        <span x-text="(m.senderName || $store.chat.agentName || $store.chatcontactv2.agentName || 'A').charAt(0)"></span>
                      </template>
                    </div>
                    <div class="bubble" :class="{ pending: m.pending, 'has-img': m.attachment || m.localUrl }" :style="{
                      background: m.senderType === 'VISITOR' 
                        ? ($store.chatcontactv2.visitorBubbleBg || 'var(--cw-grad)') 
                        : ($store.chatcontactv2.agentBubbleBg || 'var(--cw-surface)'),
                      color: m.senderType === 'VISITOR' 
                        ? ($store.chatcontactv2.visitorBubbleColor || '#fff') 
                        : ($store.chatcontactv2.agentBubbleColor || 'var(--cw-ink)'),
                      borderColor: m.senderType === 'VISITOR' 
                        ? 'transparent' 
                        : ($store.chatcontactv2.agentBubbleBorderColor || 'var(--cw-border)'),
                      boxShadow: m.senderType === 'VISITOR' 
                        ? ($store.chatcontactv2.visitorBubbleBg ? 'none' : '0 2px 8px color-mix(in srgb, var(--cw-accent) 25%, transparent)') 
                        : '0 1px 2px rgba(16, 24, 40, 0.05)',
                      borderStyle: 'solid',
                      borderWidth: m.senderType === 'VISITOR' ? '0px' : '1px',
                      borderRadius: m.senderType === 'VISITOR' 
                        ? ($store.chatcontactv2.visitorBubbleBorderRadius || '16px')
                        : ($store.chatcontactv2.agentBubbleBorderRadius || '16px'),
                      padding: m.senderType === 'VISITOR'
                        ? ($store.chatcontactv2.visitorBubblePadding || '10px 14px')
                        : ($store.chatcontactv2.agentBubblePadding || '10px 14px'),
                      fontSize: m.senderType === 'VISITOR'
                        ? ($store.chatcontactv2.visitorBubbleFontSize || '14px')
                        : ($store.chatcontactv2.agentBubbleFontSize || '14px')
                    }">
                      <template x-if="m.attachment || m.localUrl">
                        <img class="bubble-img" alt="attachment" :src="m.localUrl || $store.chat.attachmentUrl(m)" @load="$store.chat.scrollDown()" @click="!m.pending && window.open($store.chat.attachmentUrl(m), '_blank')" />
                      </template>
                      <span class="bubble-body" x-show="m.body" x-text="m.body"></span>
                      <span class="bubble-time" x-show="$store.chat.groupEnd(i)">
                        <span x-text="$store.chat.timeLabel(m)"></span>
                        <template x-if="m.senderType === 'VISITOR' && i === $store.chat.messages.length - 1">
                          <span style="margin-left: 4px; font-weight: 500;" :style="{ color: $store.chatcontactv2.visitorBubbleBg || 'var(--cw-accent)' }">· Read</span>
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
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <circle cx="8.5" cy="10" r="1.5" />
                  <path d="M21 15l-4.5-4.5L9 18" />
                </svg>
                Send an image
              </button>
              <button type="button" class="menu-item" @click="$store.chat.captureScreenshot()">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
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
              padding: $store.chatcontactv2.inputPadding || '6px 8px',
              margin: $store.chatcontactv2.inputMargin || '12px 16px',
              background: $store.chatcontactv2.inputBg || 'var(--cw-surface)',
              borderRadius: $store.chatcontactv2.inputBorderRadius || '9999px',
              border: focused 
                ? ('1px solid ' + ($store.chatcontactv2.inputFocusBorderColor || $store.chatcontactv2.accentColor || '#0b5fff')) 
                : ('1px solid ' + ($store.chatcontactv2.inputBorderColor || 'var(--cw-border)')),
              boxShadow: focused 
                ? ($store.chatcontactv2.inputFocusShadow || '0 0 0 2px rgba(11, 95, 255, 0.1)') 
                : 'none',
              boxSizing: 'border-box',
              transition: 'all 0.2s ease'
            }">
              <style x-text="'.composer textarea::placeholder { color: ' + ($store.chatcontactv2.inputPlaceholderColor || '#a1a1aa') + ' !important; }'"></style>
              <input type="file" id="cw-embed-file" class="file-input" accept="image/png,image/jpeg,image/gif,image/webp" @change="$store.chat.uploadImage($event.target)" style="display: none;" />
              
              <!-- Plus Attachment Button -->
              <button type="button" class="attach-btn" aria-label="Attach" title="Attach" x-show="$store.chat.flag('attachments.enabled', true)" :disabled="$store.chat.uploading" @click="$store.chat.attachOpen = !$store.chat.attachOpen; $store.chat.emojiOpen = false" :style="{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: 'none',
                padding: '0',
                margin: '0',
                lineHeight: '0',
                boxSizing: 'border-box',
                background: $store.chatcontactv2.attachButtonBg || '#ffffff',
                color: $store.chatcontactv2.attachButtonColor || '#71717a',
                cursor: 'pointer',
                flexShrink: '0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }"><svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" style="display: block; margin: auto;"><path d="M8 3.5v9M3.5 8h9" /></svg></button>

              <!-- Textarea input field -->
              <textarea rows="1" maxlength="4000" placeholder="Write a message…" aria-label="Message" x-model="$store.chat.draft" @input="$store.chat.notifyTyping(); $el.style.height = 'auto'; $el.style.height = Math.min($el.scrollHeight, 120) + 'px'" @keydown.enter.prevent="$store.chat.send()" @focus="focused = true" @blur="focused = false" :style="{
                flex: '1',
                border: 'none',
                resize: 'none',
                padding: '6px 12px',
                background: 'transparent',
                color: $store.chatcontactv2.inputTextColor || 'var(--cw-ink)',
                outline: 'none',
                fontSize: $store.chatcontactv2.textareaFontSize || '14px',
                fontFamily: 'inherit',
                height: '32px',
                minHeight: '24px',
                maxHeight: '120px',
                overflowY: 'auto',
                boxSizing: 'border-box'
              }"></textarea>

              <!-- Emoji Toggle Button -->
              <button type="button" aria-label="Emoji" x-show="$store.chat.flag('widget.modernUi', true)" @click="$store.chat.emojiOpen = !$store.chat.emojiOpen; $store.chat.attachOpen = false" :style="{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: 'none',
                padding: '0',
                background: 'transparent',
                color: $store.chatcontactv2.emojiButtonColor || '#71717a',
                cursor: 'pointer',
                flexShrink: '0',
                marginRight: '2px'
              }">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8.5 14.5a4.5 4.5 0 007 0" />
                  <circle cx="9" cy="10" r="0.5" fill="currentColor" />
                  <circle cx="15" cy="10" r="0.5" fill="currentColor" />
                </svg>
              </button>

              <!-- Send Button -->
              <button type="button" aria-label="Send message" :disabled="!$store.chat.draft.trim()" @click="$store.chat.send()" :style="{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: 'none',
                padding: '0',
                background: !$store.chat.draft.trim() 
                  ? ($store.chatcontactv2.sendButtonBgInactive || '#e4e4e7') 
                  : ($store.chatcontactv2.sendButtonBgActive || $store.chatcontactv2.accentColor || '#0b5fff'),
                color: !$store.chat.draft.trim() 
                  ? ($store.chatcontactv2.sendButtonColorInactive || '#a1a1aa') 
                  : ($store.chatcontactv2.sendButtonColorActive || '#ffffff'),
                cursor: !$store.chat.draft.trim() ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
                flexShrink: '0'
              }">
                <template x-if="$store.chatcontactv2.sendIconType === 'arrow'">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                </template>
                <template x-if="$store.chatcontactv2.sendIconType !== 'arrow'">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" style="transform: rotate(45deg); margin-left: 2px; margin-top: -2px;">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </template>
              </button>
            </div>
            <div class="panel-footer" x-show="$store.chat.state === 'active'" :style="{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: $store.chatcontactv2.footerPaddingBottom || '16px',
              background: $store.chatcontactv2.footerBg || $store.chatcontactv2.bodyBg || '#ffffff',
              borderBottomLeftRadius: ($store.chatcontactv2.widgetBorderRadius || 16) + 'px',
              borderBottomRightRadius: ($store.chatcontactv2.widgetBorderRadius || 16) + 'px'
            }">
              <div class="powered" x-show="$store.chat.flag('widget.modernUi', true)" 
                   style="display: flex !important; flex-direction: row !important; flex-wrap: nowrap !important; align-items: center !important; justify-content: center !important; gap: 4px !important; font-family: inherit !important; width: 100% !important; background: transparent !important; text-align: center !important;"
                   :style="{
                     fontSize: $store.chatcontactv2.footerFontSize || '10px',
                     color: $store.chatcontactv2.footerTextColor || 'var(--cw-muted)'
                   }">
                <span>Powered by</span> 
                <template x-if="$store.chatcontactv2.poweredByLogo">
                  <span x-html="$store.chatcontactv2.poweredByLogo" style="display: inline-flex; align-items: center; justify-content: center; height: 12px; width: 12px; flex-shrink: 0;"></span>
                </template>
                <a :href="$store.chatcontactv2.poweredByLink || '#'" target="_blank" style="font-weight: 700; color: inherit; text-decoration: none; display: inline-block;" :style="{ color: $store.chatcontactv2.poweredByColor || '#a1a1aa' }" x-text="$store.chatcontactv2.poweredByText || 'vAInatheya.ai'"></a>
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
               :style="{
                 background: $store.chatcontactv2.modalCardBg || '#ffffff',
                 borderRadius: ($store.chatcontactv2.modalBorderRadius || 16) + 'px'
               }">
            <p class="modal-message" :style="{ color: $store.chatcontactv2.modalMessageColor || '#101828' }" x-text="$store.chat.confirmBox && $store.chat.confirmBox.message"></p>
            <div class="modal-actions">
              <button type="button" class="btn-ghost" @click="$store.chat.confirmBox = null" 
                      :style="{
                        background: $store.chatcontactv2.endChatCancelBg || 'var(--cw-surface)',
                        color: $store.chatcontactv2.endChatCancelTextColor || 'var(--cw-muted)',
                        borderColor: $store.chatcontactv2.endChatCancelBorderColor || 'var(--cw-border)'
                      }"
                      x-text="$store.chat.confirmBox && $store.chat.confirmBox.cancelLabel || 'Cancel'"></button>
              <button type="button" class="btn-confirm" @click="$store.chat.confirmResolve()" 
                      :style="{
                        background: $store.chatcontactv2.endChatConfirmBg || 'var(--cw-grad)',
                        color: $store.chatcontactv2.endChatConfirmTextColor || '#ffffff'
                      }"
                      x-text="($store.chat.confirmBox && $store.chat.confirmBox.confirmLabel) || 'Confirm'"></button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Bubble Widget Trigger -->
    <div x-show="!openContactWidget" x-data='window.previewBubbleController(Alpine.store("bubble"))'
      @click="$dispatch('toggle-contact-widget')"
      x-transition:enter="transition ease-out duration-300 delay-100"
      x-transition:enter-start="opacity-0 scale-50"
      x-transition:enter-end="opacity-100 scale-100"
      x-transition:leave="transition ease-in duration-200"
      x-transition:leave-start="opacity-100 scale-100"
      x-transition:leave-end="opacity-0 scale-50"
      class="fixed bottom-3 right-4 z-40 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg select-none"
      :style="{
        width: settings.width + 'px',
        height: settings.height + 'px',
        borderRadius: \`\${settings.borderRadius.tl}px \${settings.borderRadius.tr}px \${settings.borderRadius.br}px \${settings.borderRadius.bl}px\`,
        background: getCompositeBackground(),
        backgroundBlendMode: settings.backgroundBlendMode,
        boxShadow: [getBoxShadow(), getInnerShadow()].filter(Boolean).join(', '),
        transformStyle: 'preserve-3d',
        ...getBorderStyle(),
        ...(settings.glass && settings.glass.enabled ? getGlassStyle() : {}),
        ...(settings.neon && settings.neon.enabled ? getNeonStyle() : {}),
        ...getEntryAnimStyle()
      }" @mouseenter="hovered = true" @mouseleave="hovered = false">

      <style x-text="cssKeyframes()"></style>

      <!-- SHOW IMAGE: Only when useWebsiteTheme is false -->
      <template x-if="!settings.useWebsiteTheme && settings.backgroundOverlayType === 'image' && settings.backgroundImageUrl">
        <div class="absolute inset-0 pointer-events-none" :style="{
            backgroundImage: \`url(\${settings.backgroundImageUrl})\`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: settings.backgroundImageSize,
            opacity: settings.backgroundImageOpacity,
            mixBlendMode: settings.backgroundBlendMode,
            borderRadius: 'inherit'
          }"></div>
      </template>

      <!-- SHOW CHAT ICON: Hides when hovering (if dots are enabled) -->
      <template x-if="settings.useWebsiteTheme && !(settings.dots && hovered)">
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none text-white">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
      </template>

      <!-- SHOW DOTS ON HOVER -->
      <template x-if="settings.dots && hovered">
        <div class="absolute flex z-10" :style="{ gap: \`\${settings.dots.spacing}px\` }">
          <template x-for="i in [0, 1, 2]">
            <span class="rounded-full" :style="{ width: \`\${settings.dots.size}px\`, height: \`\${settings.dots.size}px\`, backgroundColor: settings.dots.color, animation: settings.dots.animation === 'bounce' ? \`dotBounce 1.2s cubic-bezier(.2,.8,.2,1) \${i * 0.12}s infinite\` : settings.dots.animation === 'pulse' ? \`dotPulse 1.4s cubic-bezier(.2,.8,.2,1) \${i * 0.1}s infinite\` : 'none' }"></span>
          </template>
        </div>
      </template>

      <template x-if="settings.outlineRing && settings.outlineRing.enabled">
        <div aria-hidden class="pointer-events-none absolute inset-0" :style="{ borderRadius: 'inherit', boxShadow: \`0 0 0 \${settings.outlineRing.width}px \${hexToRgba(settings.outlineRing.color, settings.outlineRing.opacity)}\` }">
        </div>
      </template>
    </div>
  `;

  document.body.appendChild(widgetContainer);

  // Setup Alpine Controller Logic
  window.previewBubbleController = function (initialSettings) {
    return {
      settings: initialSettings,
      hovered: false,
      // 1. Updated hexToRgba to safely handle non-hex variables just in case
      hexToRgba(hex, alpha) {
        if (!hex) return '';
        if (hex.startsWith('#')) {
          const v = hex.replace('#', '');
          const bigint = parseInt(v.length === 3 ? v.split('').map(c => c + c).join('') : v, 16);
          if (!isNaN(bigint)) {
            return `rgba(${(bigint >> 16) & 255},${(bigint >> 8) & 255},${bigint & 255},${alpha})`;
          }
        }
        return hex; // Fallback if a named color or var() is pulled from CSS
      },
      cssKeyframes() {
        if (!this.settings) return '';
        return `
          @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes popIn { 0% { transform: scale(.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
          @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          @keyframes idleFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-${this.settings.idleAnim ? this.settings.idleAnim.amplitude : 6}px); } }
          @keyframes dotBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
          @keyframes dotPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.25); } }
        `;
      },
      getGradient() {
        if (!this.settings || this.settings.gradientType === 'none') return '';

        const stopsArray = this.settings.gradientStops || [];
        // Fix: If no stops are defined in the JSON, fallback to the solid background color
        if (stopsArray.length === 0) return this.settings.backgroundColor || '#0b5fff';

        const stops = stopsArray.map(s => `${s.color} ${s.pos}%`).join(', ');
        return `linear-gradient(${this.settings.gradientAngle || 135}deg, ${stops})`;
      },
      getBoxShadow() {
        if (!this.settings) return '';
        const { boxShadowOffsetX, boxShadowOffsetY, boxShadowBlur, boxShadowSpread, boxShadowOpacity } = this.settings;
        return `${boxShadowOffsetX || 0}px ${boxShadowOffsetY || 8}px ${boxShadowBlur || 20}px ${boxShadowSpread || 0}px rgba(0,0,0,${boxShadowOpacity || 0.25})`;
      },
      getInnerShadow() {
        if (!this.settings || !this.settings.innerShadow || !this.settings.innerShadow.enabled) return '';
        return `inset 0 6px ${this.settings.innerShadow.blur}px rgba(0,0,0,${this.settings.innerShadow.opacity})`;
      },
      getCompositeBackground() {
        if (!this.settings) return '#0b5fff';
        return (this.settings.gradientType && this.settings.gradientType !== 'none')
          ? this.getGradient()
          : (this.settings.backgroundColor || '#0b5fff');
      },
      getBorderStyle() {
        if (!this.settings) return {};
        return {
          borderWidth: `${this.settings.border ? this.settings.border.width : 0}px`,
          borderStyle: this.settings.border ? this.settings.border.style : 'solid',
          borderColor: this.settings.border ? this.settings.border.color : 'transparent'
        };
      },
      getEntryAnimStyle() { return {}; },
      getNeonStyle() { return {}; },
      getGlassStyle() { return {}; }
    };
  };

  /* ==========================================================================
     CLIENT IDENTIFICATION SERVICE
     --------------------------------------------------------------------------
     Retrieves client ID from:
     1. Global window variable (window.ZOTLY_CLIENT_ID)
     2. Script tag attribute data-client-id (e.g., <script data-client-id="emerald">)
     3. Script URL parameter (e.g. widget.js?client_id=emerald)
     4. Default fallback ('default')
     ========================================================================== */
  function getClientId() {
    if (window.ZOTLY_CLIENT_ID) {
      return window.ZOTLY_CLIENT_ID;
    }
    let scriptTag = document.currentScript;
    if (!scriptTag || !scriptTag.src || !scriptTag.src.includes('widget.js')) {
      scriptTag = document.querySelector('script[data-client-id]') ||
        document.querySelector('script[src*="widget.js"]');
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

  /* ==========================================================================
     CLIENT CONFIG SERVICE (DATA ACCESS LAYER)
     --------------------------------------------------------------------------
     Fetches client configuration (bubble settings and chat settings) dynamically.

     HOW TO REPLACE WITH MONGODB / BACKEND DATABASE / REST API:
     --------------------------------------------------------------------------
     To query MongoDB or your custom backend API instead of static JSON files:
     
     async function fetchClientConfig(clientId) {
       try {
         // Query MongoDB backend endpoint with client ID
         const response = await fetch(`/api/widget/config?clientId=${encodeURIComponent(clientId)}`);
         const data = await response.json();
         return {
           bubbleConfig: data.bubble || {},
           chatConfig: data.chatcontactv2 || data.chat || {}
         };
       } catch (error) {
         console.error('[Zotly Widget] Failed to fetch MongoDB client config:', error);
         return { bubbleConfig: {}, chatConfig: {} };
       }
     }
     ========================================================================== */
  async function fetchClientConfig(clientId) {
    const baseUrl = getWidgetBaseUrl();
    console.log(`[Zotly Widget] Initializing config for Client ID: "${clientId}"`);
    console.log(`[Zotly Widget] Resolved Base Asset URL: "${baseUrl}"`);

    // Strategy 1: Try single combined client JSON file (e.g. public/clients/emerald.json)
    const clientConfigUrl = `${baseUrl}public/clients/${clientId}.json`;
    console.log(`[Zotly Widget] Fetching client config from: "${clientConfigUrl}"`);
    try {
      const res = await fetch(clientConfigUrl);
      if (res.ok) {
        const data = await res.json();
        console.log(`[Zotly Widget] Successfully loaded configuration for client "${clientId}"`);
        return {
          bubbleConfig: data.bubble || {},
          chatConfig: data.chatcontactv2 || data.chat || {}
        };
      } else {
        console.warn(`[Zotly Widget] Client config file not found or failed to load (Status ${res.status}). Falling back to default settings.`);
      }
    } catch (e) {
      console.warn(`[Zotly Widget] Network error trying to fetch client config:`, e);
    }

    // Strategy 2: Fallback to root public default JSON files (bubble.json & chatcontactv2.json)
    const defaultBubbleUrl = `${baseUrl}public/bubble.json`;
    const defaultChatUrl = `${baseUrl}public/chatcontactv2.json`;
    console.log(`[Zotly Widget] Fetching default configurations from: "${defaultBubbleUrl}" & "${defaultChatUrl}"`);
    try {
      const [bubbleRes, chatRes] = await Promise.allSettled([
        fetch(defaultBubbleUrl).then(r => r.ok ? r.json() : {}),
        fetch(defaultChatUrl).then(r => r.ok ? r.json() : {})
      ]);

      const bubbleConfig = bubbleRes.status === 'fulfilled' ? bubbleRes.value : {};
      const chatConfig = chatRes.status === 'fulfilled' ? chatRes.value : {};

      console.log(`[Zotly Widget] Fallback default configurations loaded.`);
      return { bubbleConfig, chatConfig };
    } catch (e) {
      console.error(`[Zotly Widget] Critical error loading default configurations:`, e);
      return { bubbleConfig: {}, chatConfig: {} };
    }
  }

  const initStores = async () => {
    const theme = getParentTheme();
    const clientId = getClientId();

    if (!Alpine.store('bubble')) {
      Alpine.store('bubble', {
        useWebsiteTheme: true,
        width: 50, height: 50, borderRadius: { tl: 50, tr: 50, bl: 50, br: 50 },
        backgroundColor: theme.primary || '#0b5fff',
        gradientType: 'none',
        // Add a default fallback stop just in case
        gradientStops: [{ color: theme.primary || '#0b5fff', pos: 0 }, { color: theme.secondary || '#22D3EE', pos: 100 }],
        backgroundOverlayType: 'image', backgroundImageUrl: 'https://static.vecteezy.com/system/resources/previews/047/656/219/non_2x/abstract-logo-design-for-any-corporate-brand-business-company-vector.jpg',
        backgroundImageSize: 'contain', backgroundImageOpacity: 0.25, backgroundBlendMode: 'normal',
        border: { width: 0, color: theme.primary || '#0b5fff', style: 'solid' },
        outlineRing: { enabled: true, width: 3, color: theme.secondary || '#22D3EE', opacity: 0.4 },
        boxShadowBlur: 20, boxShadowSpread: 0, boxShadowOffsetX: 0, boxShadowOffsetY: 8, boxShadowOpacity: 0.25,
        dots: { color: '#F8FAFC', size: 6, spacing: 6, animation: 'bounce' }
      });
    }

    if (!Alpine.store('chatcontactv2')) {
      Alpine.store('chatcontactv2', {
        clientName: 'Zotly Support', agentName: 'Sarah',
        accentColor: theme.primary || '#0b5fff',
        useWebsiteTheme: true,
        widgetWidth: 350, widgetHeight: 550, expandedWidth: 480, expandedHeight: 550,
        widgetBorderRadius: 16, widgetShadow: true, widgetShadowBlur: 20, widgetShadowColor: 'rgba(0,0,0,0.15)',
        widgetBorderEnabled: true, widgetBorderWidth: 1, widgetBorderColor: '#e5e7eb',
        modernUi: true, typingIndicator: true, attachmentsEnabled: true
      });
    }

    // Fetch and apply client-specific configuration
    const { bubbleConfig, chatConfig } = await fetchClientConfig(clientId);

    if (bubbleConfig && Object.keys(bubbleConfig).length > 0) {
      if (bubbleConfig.useWebsiteTheme === true) {
        bubbleConfig.backgroundColor = theme.primary;
        bubbleConfig.gradientType = 'none';
        if (bubbleConfig.outlineRing) {
          bubbleConfig.outlineRing.color = theme.secondary;
        }
      }
      Object.assign(Alpine.store('bubble'), bubbleConfig);
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
          activeConfig.inputFocusShadow = `0 0 0 2px ${theme.primary}26`; // 15% opacity tint
          activeConfig.sendButtonBgActive = theme.primary;
          activeConfig.poweredByColor = theme.primary;
          activeConfig.endChatConfirmBg = theme.primary;
          activeConfig.endChatConfirmTextColor = '#ffffff';

          if (isDark) {
            // Under browser dark mode, point styles directly to native dark CSS custom variables
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

        // Apply dark overrides from JSON if configured and browser is in dark mode
        if (isDark && chatConfig.dark && Object.keys(chatConfig.dark).length > 0) {
          Object.assign(activeConfig, chatConfig.dark);
        }

        Object.assign(Alpine.store('chatcontactv2'), activeConfig);
      };

      // Initial apply
      applyTheme();

      // Listen for browser class changes to dynamically toggle light/dark styles
      const observer = new MutationObserver(() => {
        applyTheme();
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }

    if (!Alpine.store('chat')) {
      const initialAgentName = (chatConfig && chatConfig.agentName) ? chatConfig.agentName : 'Sarah';
      Alpine.store('chat', {
        state: 'active',
        isExpanded: false,
        clientName: (chatConfig && chatConfig.clientName) ? chatConfig.clientName : 'Zotly Support',
        agentName: initialAgentName,
        agentsOnline: true,
        token: 'visitor-token-demo', position: 1, menuOpen: false, attachOpen: false, emojiOpen: false, confirmBox: null,
        confirmResolve: function () { }, reconnecting: false, soundsOn: true, consentDismissed: false, typingName: '',
        uploading: false, offlineSending: false, offlineName: '', offlineEmail: '', offlineMessage: '', draft: '',
        flags: { 'widget.modernUi': true, 'chat.typingIndicator': true, 'attachments.enabled': true },
        messages: [
          { key: 'm1', senderType: 'AGENT', senderName: initialAgentName, body: 'Hi! How can I help you today?', created: new Date(Date.now() - 300000).toISOString() },
          { key: 'm2', senderType: 'VISITOR', body: 'I need help with my order', created: new Date(Date.now() - 240000).toISOString() }
        ],
        async submitPrechat(formElement) {
          const formData = new FormData(formElement);
          const body = new URLSearchParams(formData);
          try {
            const response = await fetch('/api/widget/conversations', {
              method: 'POST',
              headers: {
                'X-Visitor-Token': this.token || '',
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: body
            });
            const html = await response.text();
            const target = document.getElementById('swap-zone-embed');
            if (target) {
              target.innerHTML = html;
            }
          } catch (err) {
            console.error('Prechat submission error:', err);
          }
        },
        flag(key, defaultValue) { return this.flags[key] !== undefined ? this.flags[key] : (defaultValue !== undefined ? defaultValue : true); },
        send() {
          if (this.draft && this.draft.trim()) {
            const text = this.draft.trim();
            this.messages.push({ key: 'msg_' + Date.now(), senderType: 'VISITOR', body: text, created: new Date().toISOString() });
            this.draft = ''; this.emojiOpen = false; this.attachOpen = false; this.scrollDown();
            this.typingName = this.agentName || 'Agent';
            setTimeout(() => {
              this.typingName = '';
              this.messages.push({ key: 'msg_' + Date.now(), senderType: 'AGENT', senderName: this.agentName || 'Sarah', body: "Thanks! I'm checking that right now...", created: new Date().toISOString() });
              this.scrollDown();
            }, 1800);
          }
        },
        askEndChat() {
          const config = Alpine.store('chatcontactv2');
          this.confirmBox = {
            message: config.endChatConfirmMessage || 'Are you sure you want to end this chat session?',
            confirmLabel: config.endChatConfirmLabel || 'End chat',
            cancelLabel: config.endChatCancelLabel || 'Cancel'
          };
          this.confirmResolve = () => { this.state = 'closed'; this.confirmBox = null; };
        },
        startNew() {
          this.state = 'active';
          this.messages = [{ key: 'm_new', senderType: 'AGENT', senderName: this.agentName || 'Sarah', body: 'Chat restarted. How can we help you?', created: new Date().toISOString() }];
        },
        closePanel() {
          this.isExpanded = false; this.menuOpen = false; this.attachOpen = false; this.emojiOpen = false;
          window.dispatchEvent(new CustomEvent('close-contact-widget'));
        },
        toggleExpand() { this.isExpanded = !this.isExpanded; },
        downloadTranscript() { this.menuOpen = false; alert('Downloading transcript...'); },
        toggleSounds() { this.soundsOn = !this.soundsOn; },
        dismissConsent() { this.consentDismissed = true; },
        submitOffline() {
          if (this.offlineEmail && this.offlineMessage) {
            this.offlineSending = true;
            setTimeout(() => { this.offlineSending = false; this.state = 'offline-sent'; }, 1000);
          }
        },
        uploadImage(input) {
          if (input.files && input.files[0]) {
            const url = URL.createObjectURL(input.files[0]);
            this.messages.push({ key: 'img_' + Date.now(), senderType: 'VISITOR', localUrl: url, attachment: true, body: '', created: new Date().toISOString() });
            this.attachOpen = false; this.scrollDown();
          }
        },
        captureScreenshot() { this.attachOpen = false; alert('Screenshot captured!'); },
        scrollDown() {
          setTimeout(() => {
            const msgs = document.querySelector('.messages');
            if (msgs) msgs.scrollTop = msgs.scrollHeight;
          }, 50);
        },
        dividerBefore(index) { return index === 0; },
        dayLabel() { return 'Today'; },
        timeLabel(msg) {
          const d = msg.created ? new Date(msg.created) : new Date();
          return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        },
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
          if (chatStore.messages && chatStore.messages[0]) {
            chatStore.messages[0].senderName = chatConfig.agentName;
          }
        }
      }
    }
  };

  // Load Alpine.js if not present
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
