(function () {
  // Main bootstrap process
  async function bootstrap() {
    // Determine baseUrl using native inline script tag
    let scriptTag = document.currentScript;
    if (!scriptTag || !scriptTag.src || !scriptTag.src.includes('widget.js')) {
      scriptTag = document.querySelector('script[data-client-id]') || document.querySelector('script[src*="widget.js"]');
    }
    let baseUrl = './';
    if (scriptTag && scriptTag.src) {
      try {
        const scriptUrl = new URL(scriptTag.src, window.location.href);
        baseUrl = new URL('./', scriptUrl).href;
      } catch (e) { }
    }

    // Helper to load a script dynamically
    function loadScript(url) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
        document.head.appendChild(script);
      });
    }

    try {
      // Load utils first
      await loadScript(baseUrl + 'utils.js');
      
      // Load config & templates & alpine logic
      await Promise.all([
        loadScript(baseUrl + 'config.js'),
        loadScript(baseUrl + 'alpine/chat.js'),
        loadScript(baseUrl + 'alpine/bubble.js'),
        loadScript(baseUrl + 'alpine/chatbar.js'),
        loadScript(baseUrl + 'alpine/store.js'),
        loadScript(baseUrl + 'previews/bubble.js'),
        loadScript(baseUrl + 'previews/chatbar.js'),
        loadScript(baseUrl + 'previews/welcome.js'),
        loadScript(baseUrl + 'previews/offline.js')
      ]);

      // Inject Widget HTML markup into container
      const widgetContainer = document.createElement('div');
      widgetContainer.id = 'zotly-widget-embed';
      widgetContainer.setAttribute('x-data', '{ openContactWidget: false }');
      widgetContainer.setAttribute('@toggle-contact-widget.window', 'openContactWidget = !openContactWidget; $store.chat.panelOpen = openContactWidget; if (openContactWidget) { $store.chat.unreadCount = 0; }');
      widgetContainer.setAttribute('@close-contact-widget.window', 'openContactWidget = false; $store.chat.panelOpen = false;');

      // Combine HTML templates exactly
      widgetContainer.innerHTML = window.ZotlyChatWindowHTML + window.ZotlyWelcomeHTML + window.ZotlyBubbleHTML + window.ZotlyChatbarHTML;

      document.body.appendChild(widgetContainer);

      if (window.Alpine) {
        window.ZotlyInitStores();
      } else {
        document.addEventListener('alpine:init', window.ZotlyInitStores);
        const alpineScript = document.createElement('script');
        alpineScript.defer = true;
        alpineScript.src = 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js';
        document.head.appendChild(alpineScript);
      }
    } catch (err) {
      console.error("Zotly Widget Bootstrap Error: ", err);
    }
  }

  bootstrap();
})();
