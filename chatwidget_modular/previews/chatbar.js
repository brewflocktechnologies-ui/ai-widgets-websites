(function () {
  window.ZotlyChatbarHTML = `
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
        boxSizing: 'border-box', width: (settings.width || (settings.layout === 'card' ? 240 : 255)) + 'px', height: (settings.height || (settings.layout === 'card' ? 220 : 40)) + 'px', bottom: (settings.offsetBottom !== undefined ? settings.offsetBottom : 12) + 'px', right: ((settings.offsetRight !== undefined ? settings.offsetRight : 16) + 'px'), background: getBackgroundStyle(), color: settings.textColor || '#ffffff', borderRadius: getBorderRadius(), boxShadow: settings.shadow ? '0 4px 16px rgba(0,0,0,0.15)' : 'none', padding: settings.padding !== undefined ? settings.padding : (settings.layout === 'card' ? '24px 16px' : '0 16px'), transform: hovered ? 'scale(1.02)' : 'scale(1.0)', flexDirection: settings.layout === 'card' ? 'column' : 'row', alignItems: 'center', justifyContent: settings.layout === 'card' ? 'space-between' : 'space-between', gap: settings.gap !== undefined ? (settings.gap + 'px') : (settings.layout === 'card' ? '14px' : '0')
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
                  <svg viewBox="0 0 24 24" :width="settings.iconWidth || 24" :height="settings.iconHeight || 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
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
            x-text="settings.cardText || settings.text || 'Questions about PayPal?'"></span>

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
          <span style="font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; min-width: 0; text-align: left;"
            :style="{ 
              fontSize: getFontSize(), 
              letterSpacing: (settings ? (settings.letterSpacing || 0) : 0) + 'px',
              lineHeight: '1.2',
              color: settings ? (settings.textColor || '#ffffff') : '#ffffff'
            }"
            x-text="getChatbarText()"></span>
          
          <div style="display: flex; align-items: center; justify-content: center; position: relative; flex-shrink: 0; margin-left: 8px;">
            <template x-if="settings.iconType === 'lucide'">
              <div :style="{ color: settings.iconColor || '#ffffff', opacity: hovered ? 1 : 0.8, display: 'flex' }">
                <template x-if="settings.lucideIcon === 'MessageCircle' || !settings.lucideIcon">
                  <svg viewBox="0 0 24 24" :width="getIconWidth('lucide')" :height="getIconHeight('lucide')" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
                </template>
                <template x-if="settings.lucideIcon === 'MessageSquare'">
                  <svg viewBox="0 0 24 24" :width="getIconWidth('lucide')" :height="getIconHeight('lucide')" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </template>
                <template x-if="settings.lucideIcon === 'Send'">
                  <svg viewBox="0 0 24 24" :width="getIconWidth('lucide')" :height="getIconHeight('lucide')" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </template>
                <template x-if="settings.lucideIcon === 'HelpCircle'">
                  <svg viewBox="0 0 24 24" :width="getIconWidth('lucide')" :height="getIconHeight('lucide')" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                </template>
              </div>
            </template>
            
            <template x-if="settings.iconType === 'image' && settings.iconImageUrl">
              <img :src="settings.iconImageUrl" alt="icon" class="rounded"
                :style="{ objectFit: settings.iconFit || 'contain', opacity: settings.iconOpacity !== undefined ? settings.iconOpacity : 1, width: getIconWidth('image') + 'px', height: getIconHeight('image') + 'px', mixBlendMode: settings.iconBlend || 'normal' }" />
            </template>

            <template x-if="settings.iconType === 'customSvg' && settings.customSvg">
              <div class="custom-svg-icon"
                   :style="{ color: settings.iconColor || '#ffffff', opacity: settings.iconOpacity !== undefined ? settings.iconOpacity : 1, display: 'inline-flex', width: getIconWidth('customSvg') + 'px', height: getIconHeight('customSvg') + 'px' }"
                   x-html="settings.customSvg"></div>
            </template>

            <template x-if="$store.chat.unreadCount > 0">
              <span style="position: absolute; top: -10px; right: -10px; background-color: #dc2626; color: #ffffff; font-weight: 700; border-radius: 9999px; display: flex; align-items: center; justify-content: center; min-width: 18px; height: 18px; font-size: 10px; border: 1.5px solid #ffffff; z-index: 50; box-shadow: 0 1px 3px rgba(0,0,0,0.15);"
                    x-text="$store.chat.unreadCount"></span>
            </template>
          </div>
        </div>
      </template>
    </div>
  `;
})();
