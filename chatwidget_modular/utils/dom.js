(function () {
  window.ZotlyDOM = {
    async fetchTemplate(url) {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to load template from ${url}`);
      }
      return await res.text();
    },

    injectWidgetContainer() {
      let container = document.getElementById('zotly-widget-embed');
      if (!container) {
        container = document.createElement('div');
        container.id = 'zotly-widget-embed';
        container.setAttribute('x-data', '{ openContactWidget: false }');
        container.setAttribute('@toggle-contact-widget.window', 'openContactWidget = !openContactWidget; $store.chat.panelOpen = openContactWidget; if (openContactWidget) { $store.chat.unreadCount = 0; }');
        container.setAttribute('@close-contact-widget.window', 'openContactWidget = false; $store.chat.panelOpen = false;');
        document.body.appendChild(container);
      }
      return container;
    }
  };
})();
