(function () {
  window.ZotlyWelcomeHTML = `
    <!-- NEW: FLOATING GREET PREVIEW & INPUT BOX -->
    <div x-show="((!$store.chatbar.enabled && (!$store.bubble.hideOnOpen || !openContactWidget)) || ($store.chatbar.enabled && (!$store.chatbar.hideOnOpen || !openContactWidget))) && !$store.chat.hasSentMessage && $store.greetWindow && $store.greetWindow.enabled && !$store.greetWindow.dismissed && $store.greetWindow.visible"
         class="fixed z-30 flex flex-col items-end transition-all duration-300 pointer-events-none"
         style="box-sizing: border-box;"
         x-transition:enter="transition ease-out duration-300 delay-150"
         x-transition:enter-start="opacity-0 translate-y-4"
         x-transition:enter-end="opacity-100 translate-y-0"
         x-transition:leave="transition ease-in duration-200"
         x-transition:leave-start="opacity-100 translate-y-0"
         x-transition:leave-end="opacity-0 translate-y-4"
         :style="{
           bottom: (function() {
             const baseBottom = $store.chatbar.enabled ? ($store.chatbar.offsetBottom !== undefined ? $store.chatbar.offsetBottom : 12) : ($store.bubble.offsetBottom !== undefined ? $store.bubble.offsetBottom : 12);
             const triggerHeight = $store.chatbar.enabled ? ($store.chatbar.height || ($store.chatbar.layout === 'card' ? 220 : 40)) : ($store.bubble.height || 60);
             const spacing = $store.greetWindow.spacing !== undefined ? $store.greetWindow.spacing : 16;
             return (baseBottom + triggerHeight + spacing) + 'px';
           })(),
           right: (() => {
            const rawRight = ($store.chatbar.enabled ? ($store.chatbar.offsetRight !== undefined ? parseInt($store.chatbar.offsetRight) : 16) : ($store.bubble.offsetRight !== undefined ? parseInt($store.bubble.offsetRight) : 16));
            const widthVal = $store.greetWindow.width || 320;
            const isMobileSim = document.querySelector('.preview-area.mode-mobile') !== null;
            if (isMobileSim) {
              const maxRight = 375 - widthVal - 12;
              return Math.max(12, Math.min(rawRight, maxRight)) + 'px';
            }
            return 'min(' + rawRight + 'px, calc(100% - ' + widthVal + 'px - 12px))';
          })(),
           width: ($store.greetWindow.width || 320) + 'px',
            maxWidth: 'calc(100% - 24px)',
           gap: '12px',
           transitionDuration: (!$store.greetWindow.visible || $store.greetWindow.dismissed)
             ? (($store.greetWindow.animationClosingSec !== undefined ? $store.greetWindow.animationClosingSec : 0.3) + 's')
             : (($store.greetWindow.animationOpeningSec !== undefined ? $store.greetWindow.animationOpeningSec : 0.3) + 's')
         }">

      <!-- Close Button Wrapper (Sitting above Greet Card) -->
      <div style="width: 100%; display: flex; justify-content: flex-end; padding-right: 2px; pointer-events: auto;">
        <button type="button" @click.stop="$store.greetWindow.dismissed = true"
                 style="border: none; background: #475569; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.15); transition: transform 0.2s, background-color 0.2s;"
                 onmouseover="this.style.background='#1e293b'; this.style.transform='scale(1.05)'" 
                 onmouseout="this.style.background='#475569'; this.style.transform='scale(1)'">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <!-- Greet Card -->
      <div class="relative flex flex-col w-full cursor-pointer pointer-events-auto"
           @click="$dispatch('toggle-contact-widget')"
           :style="{
             backgroundColor: $store.greetWindow.backgroundColor || '#ffffff',
             borderRadius: ($store.greetWindow.borderRadius || 16) + 'px',
             padding: $store.greetWindow.padding || '24px 20px',
             boxShadow: ($store.greetWindow.boxShadow !== undefined && $store.greetWindow.boxShadow !== null) ? ($store.greetWindow.boxShadow || 'none') : '0 12px 28px -6px rgba(0,0,0,0.15), 0 8px 14px -4px rgba(0,0,0,0.1)'
           }">

        <div :style="'width: 100%; display: flex; align-items: center; margin-bottom: 16px; justify-content: ' + ($store.greetWindow.iconAlign === 'left' ? 'flex-start' : ($store.greetWindow.iconAlign === 'right' ? 'flex-end' : 'center'))"
              x-show="$store.greetWindow.imageUrl || ($store.greetWindow.iconType === 'lucide' && $store.greetWindow.lucideIcon)">
          <!-- Animated Image -->
          <template x-if="$store.greetWindow.imageUrl">
            <img :src="$store.greetWindow.imageUrl" 
                 :class="$store.greetWindow.iconAnimation && $store.greetWindow.iconAnimation !== 'none' ? 'anim-zotly-' + $store.greetWindow.iconAnimation : ''"
                 :style="'display: block; margin: ' + ($store.greetWindow.iconAlign === 'center' ? '0 auto' : '0') + '; height: ' + ($store.greetWindow.imageHeight || 70) + 'px; width: ' + ($store.greetWindow.imageWidth ? ($store.greetWindow.imageWidth + 'px') : 'auto') + '; object-fit: contain; padding: ' + ($store.greetWindow.imagePadding || '0px') + ';'" />
          </template>
          <!-- Animated Lucide Icon -->
          <template x-if="!$store.greetWindow.imageUrl && $store.greetWindow.iconType === 'lucide' && $store.greetWindow.lucideIcon">
            <div :class="$store.greetWindow.iconAnimation && $store.greetWindow.iconAnimation !== 'none' ? 'anim-zotly-' + $store.greetWindow.iconAnimation : ''"
                 :style="{
                   width: ($store.greetWindow.iconSize || 48) + 'px',
                   height: ($store.greetWindow.iconSize || 48) + 'px',
                   color: $store.greetWindow.iconColor || $store.chatWindow.accentColor || '#9333EA'
                 }">
              <template x-if="$store.greetWindow.lucideIcon === 'Smile'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
              </template>
              <template x-if="$store.greetWindow.lucideIcon === 'Sparkles'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"></path><path d="M5 3l.8 1.6L7.4 5l-1.6.8L5 7.4l-.8-1.6L2.6 5l1.6-.8L5 3z"></path><path d="M19 17l.8 1.6 1.6.6-1.6.8-.8 1.6-.8-1.6-1.6-.8 1.6-.6.8-1.6z"></path></svg>
              </template>
              <template x-if="$store.greetWindow.lucideIcon === 'MessageCircle'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
              </template>
              <template x-if="$store.greetWindow.lucideIcon === 'MessageSquare'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </template>
              <template x-if="$store.greetWindow.lucideIcon === 'HelpCircle'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </template>
              <template x-if="$store.greetWindow.lucideIcon === 'Star'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </template>
              <template x-if="$store.greetWindow.lucideIcon === 'Heart'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </template>
              <template x-if="$store.greetWindow.lucideIcon === 'Gift'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
              </template>
              <template x-if="$store.greetWindow.lucideIcon === 'Bell'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              </template>
              <template x-if="$store.greetWindow.lucideIcon === 'Info'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </template>
            </div>
          </template>
        </div>

        <h3 :style="{ color: $store.greetWindow.titleColor || '#1e293b', fontSize: $store.greetWindow.titleFontSize || '15px', fontWeight: '700', lineHeight: '1.4', margin: '0 0 8px 0', letterSpacing: '-0.01em' }" x-text="$store.greetWindow.title"></h3>
        <p :style="{ color: $store.greetWindow.descriptionColor || '#475569', fontSize: $store.greetWindow.descriptionFontSize || '14px', lineHeight: '1.5', margin: 0 }" x-text="$store.greetWindow.description"></p>
      </div>

      <!-- Quick Input Box -->
      <template x-if="$store.greetWindow.inputBox && $store.greetWindow.inputBox.enabled && $store.greetWindow.inputBox.layout === 'separated'">
        <div x-show="$store.greetWindow.inputBox.visible"
             x-transition:enter="transition ease-out duration-300"
             x-transition:enter-start="opacity-0 translate-y-2"
             x-transition:enter-end="opacity-100 translate-y-0"
             class="flex items-center w-full relative pointer-events-auto"
             style="display: flex; gap: 8px; width: 100%; align-items: center; background: transparent;"
             :style="{
               display: $store.greetWindow.inputBox.visible ? 'flex' : 'none',
               transitionDuration: ($store.greetWindow.inputBox.animationOpeningSec !== undefined ? $store.greetWindow.inputBox.animationOpeningSec + 's' : '0.3s')
             }">
          <!-- Input Container -->
          <div :style="{
                 flex: 1,
                 backgroundColor: $store.greetWindow.inputBox.backgroundColor || '#ffffff',
                 borderRadius: ($store.greetWindow.inputBox.borderRadius || 24) + 'px',
                 boxShadow: ($store.greetWindow.inputBox.boxShadow !== undefined && $store.greetWindow.inputBox.boxShadow !== null) ? ($store.greetWindow.inputBox.boxShadow || 'none') : '0 6px 16px rgba(0,0,0,0.12)',
                 padding: '10px 16px',
                 display: 'flex',
                 alignItems: 'center'
               }">
            <input type="text"
                   x-model="$store.chat.draft"
                   @keydown.enter="$dispatch('toggle-contact-widget'); $store.chat.state = 'active'; setTimeout(() => { if($store.chat.draft) $store.chat.send(); }, 200);"
                   :placeholder="$store.greetWindow.inputBox.placeholder || 'Write your message...'"
                   style="flex: 1; background: transparent; border: none; outline: none; width: 100%;"
                   :style="{ color: $store.greetWindow.inputBox.textColor || '#1e293b', fontSize: '14px' }" />
          </div>
          <!-- Send Button Container -->
          <button type="button"
                  @click="$dispatch('toggle-contact-widget'); $store.chat.state = 'active'; setTimeout(() => { if($store.chat.draft) $store.chat.send(); }, 200);"
                  style="display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: none; cursor: pointer; transition: transform 0.2s;"
                  onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"
                  :style="{
                    backgroundColor: $store.greetWindow.inputBox.buttonBgColor || $store.greetWindow.inputBox.buttonColor || '#ffffff',
                    color: $store.greetWindow.inputBox.buttonIconColor || $store.chatWindow.accentColor || '#9333EA',
                    borderRadius: '50%',
                    width: ($store.greetWindow.inputBox.buttonSize || 42) + 'px',
                    height: ($store.greetWindow.inputBox.buttonSize || 42) + 'px',
                    boxShadow: ($store.greetWindow.inputBox.buttonBoxShadow !== undefined && $store.greetWindow.inputBox.buttonBoxShadow !== null) ? ($store.greetWindow.inputBox.buttonBoxShadow || 'none') : '0 6px 16px rgba(0,0,0,0.12)'
                  }">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="margin-left: 2px; margin-top: 1px;"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
          </button>
        </div>
      </template>

      <template x-if="$store.greetWindow.inputBox && $store.greetWindow.inputBox.enabled && $store.greetWindow.inputBox.layout !== 'separated'">
        <!-- Joined Quick Input Box (default) -->
        <div x-show="$store.greetWindow.inputBox.visible"
             x-transition:enter="transition ease-out duration-300"
             x-transition:enter-start="opacity-0 translate-y-2"
             x-transition:enter-end="opacity-100 translate-y-0"
             class="flex items-center w-full relative pointer-events-auto"
             :style="{
               backgroundColor: $store.greetWindow.inputBox?.backgroundColor || '#ffffff',
               borderRadius: ($store.greetWindow.inputBox?.borderRadius || 24) + 'px',
               boxShadow: ($store.greetWindow.inputBox?.boxShadow !== undefined && $store.greetWindow.inputBox?.boxShadow !== null) ? ($store.greetWindow.inputBox.boxShadow || 'none') : '0 6px 16px rgba(0,0,0,0.12)',
               padding: '4px 4px 4px 16px',
               display: $store.greetWindow.inputBox.visible ? 'flex' : 'none',
               transitionDuration: ($store.greetWindow.inputBox.animationOpeningSec !== undefined ? $store.greetWindow.inputBox.animationOpeningSec + 's' : '0.3s')
             }">
          <input type="text"
                 x-model="$store.chat.draft"
                 @keydown.enter="$dispatch('toggle-contact-widget'); $store.chat.state = 'active'; setTimeout(() => { if($store.chat.draft) $store.chat.send(); }, 200);"
                 :placeholder="$store.greetWindow.inputBox?.placeholder || 'Write your message...'"
                 style="flex: 1; background: transparent; border: none; outline: none; width: 100%;"
                 :style="{ color: $store.greetWindow.inputBox?.textColor || '#1e293b', fontSize: '14px' }" />
                 
          <button type="button"
                  @click="$dispatch('toggle-contact-widget'); $store.chat.state = 'active'; setTimeout(() => { if($store.chat.draft) $store.chat.send(); }, 200);"
                  style="display: flex; align-items: center; justify-content: center; flex-shrink: 0; width: 38px; height: 38px; border-radius: 50%; border: none; cursor: pointer; transition: transform 0.2s;"
                  onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"
                  :style="{
                    backgroundColor: $store.greetWindow.inputBox?.buttonColor || '#9333EA',
                    color: $store.greetWindow.inputBox?.buttonIconColor || '#ffffff'
                  }">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="margin-left: 2px; margin-top: 1px;"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
          </button>
        </div>
      </template>
    </div>
  `;
})();
(function () {
  window.ZotlyWelcomeHTML = `
    <!-- NEW: FLOATING GREET PREVIEW & INPUT BOX -->
    <div x-show="((!$store.chatbar.enabled && (!$store.bubble.hideOnOpen || !openContactWidget)) || ($store.chatbar.enabled && (!$store.chatbar.hideOnOpen || !openContactWidget))) && !$store.chat.hasSentMessage && $store.greetWindow && $store.greetWindow.enabled && !$store.greetWindow.dismissed && $store.greetWindow.visible"
         class="fixed z-30 flex flex-col items-end transition-all duration-300 pointer-events-none"
         style="box-sizing: border-box;"
         x-transition:enter="transition ease-out duration-300 delay-150"
         x-transition:enter-start="opacity-0 translate-y-4"
         x-transition:enter-end="opacity-100 translate-y-0"
         x-transition:leave="transition ease-in duration-200"
         x-transition:leave-start="opacity-100 translate-y-0"
         x-transition:leave-end="opacity-0 translate-y-4"
         :style="{
           bottom: (function() {
             const baseBottom = $store.chatbar.enabled ? ($store.chatbar.offsetBottom !== undefined ? $store.chatbar.offsetBottom : 12) : ($store.bubble.offsetBottom !== undefined ? $store.bubble.offsetBottom : 12);
             const triggerHeight = $store.chatbar.enabled ? ($store.chatbar.height || ($store.chatbar.layout === 'card' ? 220 : 40)) : ($store.bubble.height || 60);
             const spacing = $store.greetWindow.spacing !== undefined ? $store.greetWindow.spacing : 16;
             return (baseBottom + triggerHeight + spacing) + 'px';
           })(),
           right: (() => {
            const rawRight = ($store.chatbar.enabled ? ($store.chatbar.offsetRight !== undefined ? parseInt($store.chatbar.offsetRight) : 16) : ($store.bubble.offsetRight !== undefined ? parseInt($store.bubble.offsetRight) : 16));
            const widthVal = $store.greetWindow.width || 320;
            const isMobileSim = document.querySelector('.preview-area.mode-mobile') !== null;
            if (isMobileSim) {
              const maxRight = 375 - widthVal - 12;
              return Math.max(12, Math.min(rawRight, maxRight)) + 'px';
            }
            return 'min(' + rawRight + 'px, calc(100% - ' + widthVal + 'px - 12px))';
          })(),
           width: ($store.greetWindow.width || 320) + 'px',
            maxWidth: 'calc(100% - 24px)',
           gap: '12px',
           transitionDuration: (!$store.greetWindow.visible || $store.greetWindow.dismissed)
             ? (($store.greetWindow.animationClosingSec !== undefined ? $store.greetWindow.animationClosingSec : 0.3) + 's')
             : (($store.greetWindow.animationOpeningSec !== undefined ? $store.greetWindow.animationOpeningSec : 0.3) + 's')
         }">

      <!-- Close Button Wrapper (Sitting above Greet Card) -->
      <div style="width: 100%; display: flex; justify-content: flex-end; padding-right: 2px; pointer-events: auto;">
        <button type="button" @click.stop="$store.greetWindow.dismissed = true"
                 style="border: none; background: #475569; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.15); transition: transform 0.2s, background-color 0.2s;"
                 onmouseover="this.style.background='#1e293b'; this.style.transform='scale(1.05)'" 
                 onmouseout="this.style.background='#475569'; this.style.transform='scale(1)'">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <!-- Greet Card -->
      <div class="relative flex flex-col w-full cursor-pointer pointer-events-auto"
           @click="$dispatch('toggle-contact-widget')"
           :style="{
             backgroundColor: $store.greetWindow.backgroundColor || '#ffffff',
             borderRadius: ($store.greetWindow.borderRadius || 16) + 'px',
             padding: $store.greetWindow.padding || '24px 20px',
             boxShadow: ($store.greetWindow.boxShadow !== undefined && $store.greetWindow.boxShadow !== null) ? ($store.greetWindow.boxShadow || 'none') : '0 12px 28px -6px rgba(0,0,0,0.15), 0 8px 14px -4px rgba(0,0,0,0.1)'
           }">

        <div :style="'width: 100%; display: flex; align-items: center; margin-bottom: 16px; justify-content: ' + ($store.greetWindow.iconAlign === 'left' ? 'flex-start' : ($store.greetWindow.iconAlign === 'right' ? 'flex-end' : 'center'))"
              x-show="$store.greetWindow.imageUrl || ($store.greetWindow.iconType === 'lucide' && $store.greetWindow.lucideIcon)">
          <!-- Animated Image -->
          <template x-if="$store.greetWindow.imageUrl">
            <img :src="$store.greetWindow.imageUrl" 
                 :class="$store.greetWindow.iconAnimation && $store.greetWindow.iconAnimation !== 'none' ? 'anim-zotly-' + $store.greetWindow.iconAnimation : ''"
                 :style="'display: block; margin: ' + ($store.greetWindow.iconAlign === 'center' ? '0 auto' : '0') + '; height: ' + ($store.greetWindow.imageHeight || 70) + 'px; width: ' + ($store.greetWindow.imageWidth ? ($store.greetWindow.imageWidth + 'px') : 'auto') + '; object-fit: contain; padding: ' + ($store.greetWindow.imagePadding || '0px') + ';'" />
          </template>
          <!-- Animated Lucide Icon -->
          <template x-if="!$store.greetWindow.imageUrl && $store.greetWindow.iconType === 'lucide' && $store.greetWindow.lucideIcon">
            <div :class="$store.greetWindow.iconAnimation && $store.greetWindow.iconAnimation !== 'none' ? 'anim-zotly-' + $store.greetWindow.iconAnimation : ''"
                 :style="{
                   width: ($store.greetWindow.iconSize || 48) + 'px',
                   height: ($store.greetWindow.iconSize || 48) + 'px',
                   color: $store.greetWindow.iconColor || $store.chatWindow.accentColor || '#9333EA'
                 }">
              <template x-if="$store.greetWindow.lucideIcon === 'Smile'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
              </template>
              <template x-if="$store.greetWindow.lucideIcon === 'Sparkles'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"></path><path d="M5 3l.8 1.6L7.4 5l-1.6.8L5 7.4l-.8-1.6L2.6 5l1.6-.8L5 3z"></path><path d="M19 17l.8 1.6 1.6.6-1.6.8-.8 1.6-.8-1.6-1.6-.8 1.6-.6.8-1.6z"></path></svg>
              </template>
              <template x-if="$store.greetWindow.lucideIcon === 'MessageCircle'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
              </template>
              <template x-if="$store.greetWindow.lucideIcon === 'MessageSquare'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </template>
              <template x-if="$store.greetWindow.lucideIcon === 'HelpCircle'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </template>
              <template x-if="$store.greetWindow.lucideIcon === 'Star'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </template>
              <template x-if="$store.greetWindow.lucideIcon === 'Heart'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </template>
              <template x-if="$store.greetWindow.lucideIcon === 'Gift'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
              </template>
              <template x-if="$store.greetWindow.lucideIcon === 'Bell'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              </template>
              <template x-if="$store.greetWindow.lucideIcon === 'Info'">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </template>
            </div>
          </template>
        </div>

        <h3 :style="{ color: $store.greetWindow.titleColor || '#1e293b', fontSize: $store.greetWindow.titleFontSize || '15px', fontWeight: '700', lineHeight: '1.4', margin: '0 0 8px 0', letterSpacing: '-0.01em' }" x-text="$store.greetWindow.title"></h3>
        <p :style="{ color: $store.greetWindow.descriptionColor || '#475569', fontSize: $store.greetWindow.descriptionFontSize || '14px', lineHeight: '1.5', margin: 0 }" x-text="$store.greetWindow.description"></p>
      </div>

      <!-- Quick Input Box -->
      <template x-if="$store.greetWindow.inputBox && $store.greetWindow.inputBox.enabled && $store.greetWindow.inputBox.layout === 'separated'">
        <div x-show="$store.greetWindow.inputBox.visible"
             x-transition:enter="transition ease-out duration-300"
             x-transition:enter-start="opacity-0 translate-y-2"
             x-transition:enter-end="opacity-100 translate-y-0"
             class="flex items-center w-full relative pointer-events-auto"
             style="display: flex; gap: 8px; width: 100%; align-items: center; background: transparent;"
             :style="{
               display: $store.greetWindow.inputBox.visible ? 'flex' : 'none',
               transitionDuration: ($store.greetWindow.inputBox.animationOpeningSec !== undefined ? $store.greetWindow.inputBox.animationOpeningSec + 's' : '0.3s')
             }">
          <!-- Input Container -->
          <div :style="{
                 flex: 1,
                 backgroundColor: $store.greetWindow.inputBox.backgroundColor || '#ffffff',
                 borderRadius: ($store.greetWindow.inputBox.borderRadius || 24) + 'px',
                 boxShadow: ($store.greetWindow.inputBox.boxShadow !== undefined && $store.greetWindow.inputBox.boxShadow !== null) ? ($store.greetWindow.inputBox.boxShadow || 'none') : '0 6px 16px rgba(0,0,0,0.12)',
                 padding: '10px 16px',
                 display: 'flex',
                 alignItems: 'center'
               }">
            <input type="text"
                   x-model="$store.chat.draft"
                   @keydown.enter="$dispatch('toggle-contact-widget'); $store.chat.state = 'active'; setTimeout(() => { if($store.chat.draft) $store.chat.send(); }, 200);"
                   :placeholder="$store.greetWindow.inputBox.placeholder || 'Write your message...'"
                   style="flex: 1; background: transparent; border: none; outline: none; width: 100%;"
                   :style="{ color: $store.greetWindow.inputBox.textColor || '#1e293b', fontSize: '14px' }" />
          </div>
          <!-- Send Button Container -->
          <button type="button"
                  @click="$dispatch('toggle-contact-widget'); $store.chat.state = 'active'; setTimeout(() => { if($store.chat.draft) $store.chat.send(); }, 200);"
                  style="display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: none; cursor: pointer; transition: transform 0.2s;"
                  onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"
                  :style="{
                    backgroundColor: $store.greetWindow.inputBox.buttonBgColor || $store.greetWindow.inputBox.buttonColor || '#ffffff',
                    color: $store.greetWindow.inputBox.buttonIconColor || $store.chatWindow.accentColor || '#9333EA',
                    borderRadius: '50%',
                    width: ($store.greetWindow.inputBox.buttonSize || 42) + 'px',
                    height: ($store.greetWindow.inputBox.buttonSize || 42) + 'px',
                    boxShadow: ($store.greetWindow.inputBox.buttonBoxShadow !== undefined && $store.greetWindow.inputBox.buttonBoxShadow !== null) ? ($store.greetWindow.inputBox.buttonBoxShadow || 'none') : '0 6px 16px rgba(0,0,0,0.12)'
                  }">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="margin-left: 2px; margin-top: 1px;"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
          </button>
        </div>
      </template>

      <template x-if="$store.greetWindow.inputBox && $store.greetWindow.inputBox.enabled && $store.greetWindow.inputBox.layout !== 'separated'">
        <!-- Joined Quick Input Box (default) -->
        <div x-show="$store.greetWindow.inputBox.visible"
             x-transition:enter="transition ease-out duration-300"
             x-transition:enter-start="opacity-0 translate-y-2"
             x-transition:enter-end="opacity-100 translate-y-0"
             class="flex items-center w-full relative pointer-events-auto"
             :style="{
               backgroundColor: $store.greetWindow.inputBox?.backgroundColor || '#ffffff',
               borderRadius: ($store.greetWindow.inputBox?.borderRadius || 24) + 'px',
               boxShadow: ($store.greetWindow.inputBox?.boxShadow !== undefined && $store.greetWindow.inputBox?.boxShadow !== null) ? ($store.greetWindow.inputBox.boxShadow || 'none') : '0 6px 16px rgba(0,0,0,0.12)',
               padding: '4px 4px 4px 16px',
               display: $store.greetWindow.inputBox.visible ? 'flex' : 'none',
               transitionDuration: ($store.greetWindow.inputBox.animationOpeningSec !== undefined ? $store.greetWindow.inputBox.animationOpeningSec + 's' : '0.3s')
             }">
          <input type="text"
                 x-model="$store.chat.draft"
                 @keydown.enter="$dispatch('toggle-contact-widget'); $store.chat.state = 'active'; setTimeout(() => { if($store.chat.draft) $store.chat.send(); }, 200);"
                 :placeholder="$store.greetWindow.inputBox?.placeholder || 'Write your message...'"
                 style="flex: 1; background: transparent; border: none; outline: none; width: 100%;"
                 :style="{ color: $store.greetWindow.inputBox?.textColor || '#1e293b', fontSize: '14px' }" />
                 
          <button type="button"
                  @click="$dispatch('toggle-contact-widget'); $store.chat.state = 'active'; setTimeout(() => { if($store.chat.draft) $store.chat.send(); }, 200);"
                  style="display: flex; align-items: center; justify-content: center; flex-shrink: 0; width: 38px; height: 38px; border-radius: 50%; border: none; cursor: pointer; transition: transform 0.2s;"
                  onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"
                  :style="{
                    backgroundColor: $store.greetWindow.inputBox?.buttonColor || '#9333EA',
                    color: $store.greetWindow.inputBox?.buttonIconColor || '#ffffff'
                  }">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="margin-left: 2px; margin-top: 1px;"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
          </button>
        </div>
      </template>
    </div>
  `;
})();
