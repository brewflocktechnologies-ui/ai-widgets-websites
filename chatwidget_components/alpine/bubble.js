(function () {
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
        const { boxShadowOffsetX = 0, boxShadowOffsetY = 8, boxShadowSpread = 0, boxShadowBlur = 20, boxShadowOpacity = 0.25 } = this.settings;
        return `${boxShadowOffsetX}px ${boxShadowOffsetY}px ${boxShadowSpread}px ${boxShadowBlur}px rgba(0,0,0,${boxShadowOpacity})`;
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

        const style = {
          position: 'absolute',
          backgroundColor: b.backgroundColor || '#dc2626',
          color: b.textColor || '#ffffff',
          fontSize: (b.fontSize || 11) + 'px',
          lineHeight: '1',
          minWidth: size + 'px',
          height: size + 'px',
          border: `${b.borderWidth !== undefined ? b.borderWidth : 2}px solid ${b.borderColor || '#ffffff'}`,
          borderRadius: b.borderRadius !== undefined ? b.borderRadius : '9999px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: b.fontWeight || '700',
          boxShadow: b.boxShadow || '0 1px 3px rgba(0,0,0,0.15)',
          padding: b.padding || '0px',
          zIndex: 50,
          animation: b.animation || 'none'
        };

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
        } else {
          if (pos === 'left') borderRadius = '20px 20px 4px 20px';
          else if (pos === 'right') borderRadius = '20px 20px 20px 4px';
          else if (pos === 'top') borderRadius = '20px 20px 20px 20px';
          else if (pos === 'bottom') borderRadius = '20px 20px 20px 20px';
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
})();
