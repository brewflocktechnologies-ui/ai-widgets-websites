(function () {
  function getClientId() {
    if (window.ZOTLY_CLIENT_ID) { return window.ZOTLY_CLIENT_ID; }
    let scriptTag = document.currentScript;
    if (!scriptTag || !scriptTag.src || !scriptTag.src.includes('widget.js')) {
      scriptTag = document.querySelector('script[data-client-id]') || document.querySelector('script[src*="widget.js"]');
    }
    if (scriptTag) {
      const dataId = scriptTag.getAttribute('data-client-id');
      if (dataId) return dataId;
      try {
        const url = new URL(scriptTag.src, window.location.href);
        const paramId = url.searchParams.get('client_id') || url.searchParams.get('clientId');
        if (paramId) return paramId;
      } catch (e) { }
    }
    return 'default';
  }

  async function fetchClientConfig(clientId) {
    const baseUrl = window.ZotlyUtils ? window.ZotlyUtils.getWidgetBaseUrl() : './';
    const clientConfigUrl = `${baseUrl}public/clients/${clientId}.json`;
    try {
      const res = await fetch(clientConfigUrl);
      if (res.ok) {
        const data = await res.json();
        return { bubbleConfig: data.bubble || {}, chatConfig: data.chatWindow || data.chat || {}, chatbarConfig: data.chatbar || {}, greetWindowConfig: data.greetWindow || {} };
      }
    } catch (e) { }

    const defaultBubbleUrl = `${baseUrl}public/bubble.json`;
    const defaultChatUrl = `${baseUrl}public/chatWindow.json`;
    const defaultChatbarUrl = `${baseUrl}public/chatbar.json`;
    try {
      const [bubbleRes, chatRes, chatbarRes] = await Promise.allSettled([
        fetch(defaultBubbleUrl).then(r => r.ok ? r.json() : {}),
        fetch(defaultChatUrl).then(r => r.ok ? r.json() : {}),
        fetch(defaultChatbarUrl).then(r => r.ok ? r.json() : {})
      ]);
      return {
        bubbleConfig: bubbleRes.status === 'fulfilled' ? bubbleRes.value : {},
        chatConfig: chatRes.status === 'fulfilled' ? chatRes.value : {},
        chatbarConfig: chatbarRes.status === 'fulfilled' ? chatbarRes.value : {},
        greetWindowConfig: {}
      };
    } catch (e) {
      return { bubbleConfig: {}, chatConfig: {}, chatbarConfig: {}, greetWindowConfig: {} };
    }
  }

  window.ZotlyConfig = {
    getClientId,
    fetchClientConfig
  };
})();
