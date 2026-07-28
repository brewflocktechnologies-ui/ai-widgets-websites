(function () {
  window.ZotlyBubbleHTML = `
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
        right: ((settings.offsetRight !== undefined ? settings.offsetRight : 16) + 'px'),
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
            <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
              
              <!-- Image Icon -->
              <template x-if="(settings.iconType === 'image' || (!settings.iconType && (settings.iconImageUrl || settings.backgroundImageUrl))) && (settings.iconImageUrl || settings.backgroundImageUrl)">
                <img :src="settings.iconImageUrl || settings.backgroundImageUrl" alt="bubble icon"
                  :style="{
                    width: (settings.iconWidth || 26) + 'px',
                    height: (settings.iconHeight || 26) + 'px',
                    objectFit: settings.iconFit || 'contain',
                    opacity: settings.iconOpacity !== undefined ? settings.iconOpacity : (settings.backgroundLucideOpacity !== undefined ? settings.backgroundLucideOpacity : 1),
                    mixBlendMode: settings.iconBlend || 'normal',
                    borderRadius: '50%'
                  }" />
              </template>

              <!-- Custom SVG Icon -->
              <template x-if="(settings.iconType === 'customSvg' || (!settings.iconType && settings.customSvg)) && settings.customSvg">
                <div class="custom-svg-icon"
                  :style="{
                    color: settings.backgroundLucideColor || settings.iconColor || '#ffffff',
                    opacity: settings.backgroundLucideOpacity !== undefined ? settings.backgroundLucideOpacity : 1,
                    width: (settings.iconWidth || 26) + 'px',
                    height: (settings.iconHeight || 26) + 'px',
                    display: 'inline-flex'
                  }"
                  x-html="settings.customSvg"></div>
              </template>

              <!-- Lucide/SVG Icons -->
              <template x-if="(!settings.iconType || settings.iconType === 'lucide') && !settings.iconImageUrl && !settings.backgroundImageUrl && !settings.customSvg">
                <div :style="{ color: settings.backgroundLucideColor || settings.iconColor || '#ffffff', opacity: settings.backgroundLucideOpacity !== undefined ? settings.backgroundLucideOpacity : 1, display: 'flex' }">
                  <!-- Star -->
                  <template x-if="settings.lucideIcon === 'Star' || settings.backgroundLucideIcon === 'Star'">
                    <svg viewBox="0 0 24 24" :width="settings.iconWidth || 26" :height="settings.iconHeight || 26" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </template>
                  <!-- Heart -->
                  <template x-if="settings.lucideIcon === 'Heart' || settings.backgroundLucideIcon === 'Heart'">
                    <svg viewBox="0 0 24 24" :width="settings.iconWidth || 26" :height="settings.iconHeight || 26" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  </template>
                  <!-- Default Message Bubble -->
                  <template x-if="!settings.lucideIcon && settings.backgroundLucideIcon !== 'Star' && settings.backgroundLucideIcon !== 'Heart'">
                    <svg viewBox="0 0 24 24" :width="settings.iconWidth || 26" :height="settings.iconHeight || 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </template>
                </div>
              </template>

            </div>
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

      <template x-if="settings.tooltip && settings.tooltip.enabled && !openContactWidget && !$store.chat.hasSentMessage">
        <div :style="getTooltipStyle()">
          <span x-text="settings.tooltip.text || 'Chat with us'"></span>
          <template x-if="settings.tooltip.arrowEnabled !== false">
            <div :style="getTooltipArrowStyle()"></div>
          </template>
        </div>
      </template>
    </div>
  `;
})();
