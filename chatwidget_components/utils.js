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

  // Helper to extract primary/secondary colors from parent HTML CSS variables
  function getParentTheme() {
    const rootStyle = getComputedStyle(document.documentElement);
    const bodyStyle = document.body ? getComputedStyle(document.body) : null;

    let primary = rootStyle.getPropertyValue('--primary-color').trim() || (bodyStyle ? bodyStyle.getPropertyValue('--primary-color').trim() : '');
    let secondary = rootStyle.getPropertyValue('--secondary-color').trim() || (bodyStyle ? bodyStyle.getPropertyValue('--secondary-color').trim() : '');

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

  window.ZotlyUtils = {
    getWidgetBaseUrl,
    getParentTheme
  };
})();
