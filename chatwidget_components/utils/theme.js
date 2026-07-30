(function () {
  window.ZotlyTheme = {
    getParentTheme() {
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
    },

    observeDarkMode(callback) {
      const observer = new MutationObserver(callback);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      return observer;
    }
  };
})();
