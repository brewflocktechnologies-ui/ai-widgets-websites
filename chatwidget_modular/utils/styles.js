(function () {
  window.ZotlyStyles = {
    injectBaseStyles() {
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
          @keyframes zotly-wiggle {
            0%, 100% { transform: rotate(0deg); }
            15% { transform: rotate(-8deg); }
            30% { transform: rotate(6deg); }
            45% { transform: rotate(-4deg); }
            60% { transform: rotate(3deg); }
            75% { transform: rotate(-1deg); }
          }
          @keyframes zotly-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
          @keyframes zotly-bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          @keyframes zotly-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          @keyframes zotly-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .anim-zotly-wiggle { animation: zotly-wiggle 2.5s infinite ease-in-out; }
          .anim-zotly-pulse { animation: zotly-pulse 2s infinite ease-in-out; }
          .anim-zotly-bounce { animation: zotly-bounce 2s infinite ease-in-out; }
          .anim-zotly-float { animation: zotly-float 3s infinite ease-in-out; }
          .anim-zotly-spin { animation: zotly-spin 4s infinite linear; }
        `;
        document.head.appendChild(styleRule);
      }
    },

    loadStyleSheet(url) {
      if (!document.querySelector(`link[href*="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
      }
    }
  };
})();
