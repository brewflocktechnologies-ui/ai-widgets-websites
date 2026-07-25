(function () {
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
      },
      getChatbarText() {
        if (!this.settings) return 'Chat with us';
        const txt = this.settings.text || 'Chat with us';
        return typeof txt === 'string' ? txt.replace(/\n/g, ' ') : 'Chat with us';
      },
      getFontSize() {
        if (!this.settings) return '14px';
        const size = this.settings.textSize || 14;
        const height = this.settings.height || 40;
        return Math.min(size, Math.max(12, Math.floor(height * 0.35))) + 'px';
      },
      getIconWidth(type) {
        if (!this.settings) return 20;
        const width = this.settings.iconWidth || 20;
        const height = this.settings.height || 40;
        return Math.min(width, Math.max(16, Math.floor(height * (type === 'customSvg' ? 0.55 : 0.5))));
      },
      getIconHeight(type) {
        if (!this.settings) return 20;
        const height = this.settings.iconHeight || 20;
        const barHeight = this.settings.height || 40;
        return Math.min(height, Math.max(16, Math.floor(barHeight * (type === 'customSvg' ? 0.55 : 0.5))));
      }
    };
  };
})();
