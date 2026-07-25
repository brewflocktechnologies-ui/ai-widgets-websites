(function () {
  window.ZotlyChatWindowHTML = `
    <!-- Pop-up Chat V2 Widget Overlay -->
    <div x-show="openContactWidget"
      x-transition:enter="transition ease-out duration-300 origin-bottom-right"
      x-transition:enter-start="opacity-0 scale-50 translate-y-8"
      x-transition:enter-end="opacity-100 scale-100 translate-y-0"
      x-transition:leave="transition ease-in duration-200"
      x-transition:leave-start="opacity-100 scale-100 translate-y-0"
      x-transition:leave-end="opacity-0 scale-50 translate-y-8"
      class="fixed z-50 flex flex-col transition-all duration-300 pointer-events-auto zotly-widget-panel-wrapper origin-bottom-right"
      :style="{
        boxSizing: 'border-box',
        width: $store.chat.isExpanded ? ($store.chatWindow.expandedWidth ? $store.chatWindow.expandedWidth + 'px' : '480px') : ($store.chatWindow.widgetWidth ? $store.chatWindow.widgetWidth + 'px' : '350px'),
        height: $store.chatWindow.widgetHeight ? $store.chatWindow.widgetHeight + 'px' : '550px',
        maxWidth: 'calc(100vw - 32px)',
        maxHeight: (function() {
          const defaultBottom = ($store.chatWindow.offsetBottom !== undefined && $store.chatWindow.offsetBottom !== null && $store.chatWindow.offsetBottom !== '')
            ? $store.chatWindow.offsetBottom
            : ($store.chatbar.enabled ? ($store.chatbar.offsetBottom !== undefined ? $store.chatbar.offsetBottom : 12) : ($store.bubble.offsetBottom !== undefined ? $store.bubble.offsetBottom : 12));
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
          const defaultBottom = ($store.chatWindow.offsetBottom !== undefined && $store.chatWindow.offsetBottom !== null && $store.chatWindow.offsetBottom !== '')
            ? $store.chatWindow.offsetBottom
            : ($store.chatbar.enabled ? ($store.chatbar.offsetBottom !== undefined ? $store.chatbar.offsetBottom : 12) : ($store.bubble.offsetBottom !== undefined ? $store.bubble.offsetBottom : 12));
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
        right: (($store.chatWindow.offsetRight !== undefined && $store.chatWindow.offsetRight !== null && $store.chatWindow.offsetRight !== '') 
          ? $store.chatWindow.offsetRight 
          : ($store.chatbar.enabled 
            ? ($store.chatbar.offsetRight !== undefined ? $store.chatbar.offsetRight : 16) 
            : ($store.bubble.offsetRight !== undefined ? $store.bubble.offsetRight : 16))) + 'px'
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
               background: $store.chat.state === 'welcome' ? ($store.chatWindow.welcome?.bgGradient || ('linear-gradient(135deg, ' + (window.ZotlyUtils.getParentTheme().primary || '#0b5fff') + ', ' + (window.ZotlyUtils.getParentTheme().secondary || '#0b5fff') + ')')) : ($store.chatWindow.bodyBg || 'var(--cw-bg)'),
               padding: $store.chat.state === 'welcome' ? '0px' : ''
             }">
             
          <!-- ========================================== -->
          <!-- HIGHLY POLISHED WELCOME SCREEN COMPONENT     -->
          <!-- ========================================== -->
          <div x-show="$store.chat.state === 'welcome'" 
               style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; position: relative; overflow: hidden;"
               :style="{
                 padding: $store.chatWindow.welcome?.padding || '24px 20px 12px 20px',
                 color: $store.chatWindow.welcome?.headerTextColor || '#ffffff',
                 background: $store.chatWindow.welcome?.bgGradient || ('linear-gradient(135deg, ' + (window.ZotlyUtils.getParentTheme().primary || '#0b5fff') + ', ' + (window.ZotlyUtils.getParentTheme().secondary || '#0b5fff') + ')')
               }">
            
          <!-- Abstract background blobs for modern look -->
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none; z-index: 0;">
              <!-- Top sweeping highlight -->
              <div style="position: absolute; top: -50%; right: -20%; width: 140%; height: 120%; background: linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 80%); border-radius: 50%; transform: rotate(-15deg);"></div>
              
              <!-- Secondary inner highlight for the glossy layered look -->
              <div style="position: absolute; top: -20%; right: -30%; width: 120%; height: 100%; background: linear-gradient(200deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%); border-radius: 40% 60% 50% 50%; transform: rotate(10deg);"></div>
              
              <!-- Bottom left shadow sweep for depth -->
              <div style="position: absolute; bottom: -40%; left: -20%; width: 130%; height: 100%; background: linear-gradient(35deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 70%); border-radius: 50%; transform: rotate(-10deg);"></div>
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
              <!-- Glassy Card Layout Mode -->
              <template x-if="$store.chatWindow.welcome?.cardLayout === 'glassy'">
                <div style="display: flex; flex-direction: column; height: 100%; justify-content: space-between; width: 100%;">
                  <div style="display: flex; flex-direction: column; height: 100%; margin-bottom: 12px;"
                       :style="{ justifyContent: ($store.chatWindow.welcome?.cardAlign === 'center' || $store.chatWindow.welcome?.cardPosition === 'center') ? 'center' : 'space-between' }">
                    <!-- Stylized Top Icon (mimics violet reference logo) -->
                    <div style="display: flex; align-items: center; margin-bottom: 20px; flex-shrink: 0;"
                         :style="{ justifyContent: $store.chatWindow.welcome?.logoAlign || ($store.chatWindow.welcome?.textAlign === 'center' || $store.chatWindow.welcome?.cardAlign === 'center' ? 'center' : 'flex-start') }">
                      <template x-if="$store.chatWindow.welcome?.logoUrl">
                        <img :src="$store.chatWindow.welcome?.logoUrl" style="height: 36px; object-fit: contain;" />
                      </template>
                      <template x-if="!$store.chatWindow.welcome?.logoUrl">
                        <div :style="{ color: $store.chatWindow.welcome?.headerTextColor || '#ffffff' }" style="opacity: 1;">
                          <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                          </svg>
                        </div>
                      </template>
                    </div>

                    <!-- Glassy Container wrapping text, avatars, and button -->
                    <div :style="{
                           background: $store.chatWindow.welcome?.cardBg || 'rgba(255, 255, 255, 0.12)',
                           border: $store.chatWindow.welcome?.cardBorder || '1px solid rgba(255, 255, 255, 0.22)',
                           borderRadius: ($store.chatWindow.welcome?.cardBorderRadius || 24) + 'px',
                           padding: $store.chatWindow.welcome?.cardPadding || '32px 24px',
                           backdropFilter: 'blur(' + ($store.chatWindow.welcome?.cardBlur || 16) + 'px)',
                           webkitBackdropFilter: 'blur(' + ($store.chatWindow.welcome?.cardBlur || 16) + 'px)',
                           boxShadow: $store.chatWindow.welcome?.cardShadow || '0 12px 40px 0 rgba(0, 0, 0, 0.15)',
                           display: 'flex',
                           flexDirection: 'column',
                           gap: '24px',
                           flex: $store.chatWindow.welcome?.cardFlex || '1',
                           width: $store.chatWindow.welcome?.cardWidth || '100%',
                           minHeight: $store.chatWindow.welcome?.cardMinHeight || 'auto',
                           justifyContent: 'space-between'
                         }">
                      <!-- Sleek Typography -->
                      <div style="display: flex; flex-direction: column; gap: 10px;"
                           :style="{ textAlign: $store.chatWindow.welcome?.textAlign || ($store.chatWindow.welcome?.cardAlign === 'center' ? 'center' : 'left'), alignItems: ($store.chatWindow.welcome?.textAlign === 'center' || $store.chatWindow.welcome?.cardAlign === 'center') ? 'center' : 'flex-start' }">
                        <h2 style="font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; margin: 0;" 
                            :style="{ fontSize: $store.chatWindow.welcome?.titleFontSize || '28px', color: $store.chatWindow.welcome?.headerTextColor || '#ffffff' }"
                            x-text="$store.chatWindow.welcome?.title || 'Hi there! 👋 How can we help you today?'"></h2>
                        <p style="font-size: 16px; line-height: 1.5; font-weight: 400; margin: 0;" 
                           :style="{ 
                             color: $store.chatWindow.welcome?.subtextColor || 'rgba(255,255,255,0.9)',
                             fontSize: $store.chatWindow.welcome?.descriptionFontSize || '16px'
                           }"
                           x-text="$store.chatWindow.welcome?.description || 'Our support heroes are here to assist you.'"></p>
                        
                        <!-- Overlapping Online Avatars -->
                        <div style="display: flex; align-items: center; gap: 0; margin-top: 16px;"
                             :style="{ justifyContent: $store.chatWindow.welcome?.avatarAlign || ($store.chatWindow.welcome?.textAlign === 'center' || $store.chatWindow.welcome?.cardAlign === 'center' ? 'center' : 'flex-start'), width: '100%' }">
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

                      <!-- Button inside Glassy Card -->
                      <button type="button" 
                              @click="$store.chat.startFromWelcome()"
                              style="display: flex; align-items: center; gap: 16px; width: 100%; border: none; cursor: pointer; text-align: left; transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); margin: 0;"
                              :style="{
                                background: $store.chatWindow.welcome?.buttonBg || '#ffffff',
                                color: $store.chatWindow.welcome?.buttonTextColor || '#111827',
                                borderRadius: ($store.chatWindow.welcome?.buttonBorderRadius || 24) + 'px',
                                padding: $store.chatWindow.welcome?.buttonPadding || '18px 24px'
                              }"
                              @mouseenter="$el.style.transform = 'translateY(-4px)'; $el.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';"
                              @mouseleave="$el.style.transform = 'translateY(0)'; $el.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)';"
                      >
                        <div style="display: flex; align-items: center; justify-content: center; flex-shrink: 0;"
                             :style="{ color: $store.chatWindow.welcome?.buttonIconColor || $store.chatWindow.accentColor || '#0b5fff' }">
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
                    </div>
                  </div>

                  <!-- Footer outside glassy card -->
                  <div style="display: flex; justify-content: center; align-items: center; font-size: 11px; font-weight: 500; opacity: 0.8; margin-top: auto; padding-top: 10px; flex-shrink: 0;"
                       :style="{ color: $store.chatWindow.welcome?.subtextColor || 'rgba(255,255,255,0.9)', paddingBottom: $store.chatWindow.welcome?.footerPaddingBottom || '0px' }">
                    <span>Powered by</span>&nbsp;
                    <a :href="$store.chatWindow.poweredByLink || '#'" target="_blank" style="font-weight: 700; color: inherit; text-decoration: none;" x-text="$store.chatWindow.poweredByText || 'vAInatheya.ai'"></a>
                  </div>
                </div>
              </template>

              <!-- Normal Layout Mode -->
              <template x-if="$store.chatWindow.welcome?.cardLayout !== 'glassy'">
                <div style="display: flex; flex-direction: column; height: 100%; justify-content: space-between; width: 100%;">
                  <div>
                    <!-- Stylized Top Icon (mimics violet reference logo) -->
                    <div style="display: flex; align-items: center; justify-content: flex-start; margin-bottom: 28px;">
                      <template x-if="$store.chatWindow.welcome?.logoUrl">
                        <img :src="$store.chatWindow.welcome?.logoUrl" style="height: 36px; object-fit: contain;" />
                      </template>
                      <template x-if="!$store.chatWindow.welcome?.logoUrl">
                        <div :style="{ color: $store.chatWindow.welcome?.headerTextColor || '#ffffff' }" style="opacity: 1;">
                          <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
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
                            @mouseleave="$el.style.transform = 'translateY(0)'; $el.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)';"
                    >
                      <div style="display: flex; align-items: center; justify-content: center; flex-shrink: 0;"
                           :style="{ color: $store.chatWindow.welcome?.buttonIconColor || $store.chatWindow.accentColor || '#0b5fff' }">
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
                       :style="{ color: $store.chatWindow.welcome?.subtextColor || 'rgba(255,255,255,0.9)', paddingBottom: $store.chatWindow.welcome?.footerPaddingBottom || '0px' }">
                    <span>Powered by</span>&nbsp;
                    <a :href="$store.chatWindow.poweredByLink || '#'" target="_blank" style="font-weight: 700; color: inherit; text-decoration: none;" x-text="$store.chatWindow.poweredByText || 'vAInatheya.ai'"></a>
                  </div>
                </div>
              </template>

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
  `;
})();
