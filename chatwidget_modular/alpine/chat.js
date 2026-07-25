(function () {
  window.ZotlyRegisterChatStore = function (chatConfig) {
    if (!Alpine.store('chat')) {
      const initialAgentName = (chatConfig && chatConfig.agentName) ? chatConfig.agentName : 'Sarah';
      const welcomeEnabled = chatConfig && chatConfig.welcome && chatConfig.welcome.enabled === true;
      Alpine.store('chat', {
        state: welcomeEnabled ? 'welcome' : 'active',
        isExpanded: false, panelOpen: false, unreadCount: 0, isMobile: window.innerWidth < 640 || window.innerHeight < 750,
        clientName: (chatConfig && chatConfig.clientName) ? chatConfig.clientName : 'Zotly Support',
        agentName: initialAgentName, agentsOnline: true, token: 'visitor-token-demo', position: 1, menuOpen: false, attachOpen: false, emojiOpen: false, confirmBox: null, confirmResolve: function () { }, reconnecting: false, soundsOn: true, consentDismissed: false, typingName: '', uploading: false, offlineSending: false, offlineName: '', offlineEmail: '', offlineMessage: '', draft: '', hasSentMessage: false,
        flags: { 'widget.modernUi': true, 'chat.typingIndicator': true, 'attachments.enabled': true },
        messages: [
          { key: 'm1', senderType: 'AGENT', senderName: initialAgentName, body: 'Hi! How can I help you today?', created: new Date(Date.now() - 300000).toISOString() },
          { key: 'm2', senderType: 'VISITOR', body: 'I need help with my order', created: new Date(Date.now() - 240000).toISOString(), status: 'read' }
        ],
        startFromWelcome() { this.state = 'active'; this.scrollDown(); },
        async submitPrechat(formElement) {
          const formData = new FormData(formElement);
          const body = new URLSearchParams(formData);
          try {
            const response = await fetch('/api/widget/conversations', { method: 'POST', headers: { 'X-Visitor-Token': this.token || '', 'Content-Type': 'application/x-www-form-urlencoded' }, body: body });
            const html = await response.text();
            const target = document.getElementById('swap-zone-embed');
            if (target) { target.innerHTML = html; }
          } catch (err) { }
        },
        flag(key, defaultValue) { return this.flags[key] !== undefined ? this.flags[key] : (defaultValue !== undefined ? defaultValue : true); },
        resetChatbarLayout() {
          const chatbarStore = Alpine.store('chatbar');
          if (chatbarStore && chatbarStore.layout === 'card') {
            chatbarStore.layout = 'bar';
            chatbarStore.height = 40;
            chatbarStore.width = 255;
            chatbarStore.padding = '0px 16px';
            chatbarStore.gap = 0;
            chatbarStore.borderRadius = { tl: 20, tr: 20, bl: 20, br: 20 };
            
            if (chatbarStore.barOffsetRight !== undefined && chatbarStore.barOffsetRight !== null && chatbarStore.barOffsetRight !== '') {
              chatbarStore.offsetRight = chatbarStore.barOffsetRight;
            } else {
              chatbarStore.offsetRight = 16;
            }
            if (chatbarStore.barOffsetBottom !== undefined && chatbarStore.barOffsetBottom !== null && chatbarStore.barOffsetBottom !== '') {
              chatbarStore.offsetBottom = chatbarStore.barOffsetBottom;
            } else {
              chatbarStore.offsetBottom = 12;
            }
          }
        },
        send() {
          if (this.draft && this.draft.trim()) {
            const text = this.draft.trim();
            const msgObj = { key: 'msg_' + Date.now(), senderType: 'VISITOR', body: text, created: new Date().toISOString(), status: 'sent' };
            this.messages.push(msgObj);
            this.draft = ''; this.emojiOpen = false; this.attachOpen = false; this.scrollDown();
            this.hasSentMessage = true;

            this.resetChatbarLayout();

            const greetStore = Alpine.store('greetWindow');
            if (greetStore) {
              greetStore.dismissed = true;
              greetStore.visible = false;
              if (greetStore.inputBox) {
                greetStore.inputBox.visible = false;
              }
            }

            setTimeout(() => { const idx = this.messages.findIndex(m => m.key === msgObj.key); if (idx !== -1) { this.messages[idx].status = 'delivered'; this.messages = [...this.messages]; } }, 2000);
            setTimeout(() => { const idx = this.messages.findIndex(m => m.key === msgObj.key); if (idx !== -1) { this.messages[idx].status = 'read'; this.messages = [...this.messages]; } }, 4000);

            this.typingName = this.agentName || 'Agent';
            setTimeout(() => {
              this.typingName = '';
              this.messages.push({ key: 'msg_' + Date.now(), senderType: 'AGENT', senderName: this.agentName || 'Sarah', body: "Thanks! I'm checking that right now...", created: new Date().toISOString() });
              this.scrollDown();
              if (!this.panelOpen) { this.unreadCount++; }
            }, 1800);
          }
        },
        askEndChat() {
          const config = Alpine.store('chatWindow');
          this.confirmBox = { message: config.endChatConfirmMessage || 'Are you sure you want to end this chat session?', confirmLabel: config.endChatConfirmLabel || 'End chat', cancelLabel: config.endChatCancelLabel || 'Cancel' };
          this.confirmResolve = () => { this.state = 'closed'; this.confirmBox = null; };
        },
        startNew() { this.state = 'active'; this.messages = [{ key: 'm_new', senderType: 'AGENT', senderName: this.agentName || 'Sarah', body: 'Chat restarted. How can we help you?', created: new Date().toISOString() }]; },
        closePanel() { this.isExpanded = false; this.menuOpen = false; this.attachOpen = false; this.emojiOpen = false; window.dispatchEvent(new CustomEvent('close-contact-widget')); },
        toggleExpand() { this.isExpanded = !this.isExpanded; },
        downloadTranscript() { this.menuOpen = false; alert('Downloading transcript...'); },
        toggleSounds() { this.soundsOn = !this.soundsOn; },
        dismissConsent() { this.consentDismissed = true; },
        submitOffline() { if (this.offlineEmail && this.offlineMessage) { this.offlineSending = true; setTimeout(() => { this.offlineSending = false; this.state = 'offline-sent'; }, 1000); } },
        uploadImage(input) {
          if (input.files && input.files[0]) {
            const url = URL.createObjectURL(input.files[0]);
            const msgObj = { key: 'img_' + Date.now(), senderType: 'VISITOR', localUrl: url, attachment: true, body: '', created: new Date().toISOString(), status: 'sent' };
            this.messages.push(msgObj);
            this.attachOpen = false; this.scrollDown();
            this.resetChatbarLayout();
            setTimeout(() => { const idx = this.messages.findIndex(m => m.key === msgObj.key); if (idx !== -1) { this.messages[idx].status = 'delivered'; this.messages = [...this.messages]; } }, 2000);
            setTimeout(() => { const idx = this.messages.findIndex(m => m.key === msgObj.key); if (idx !== -1) { this.messages[idx].status = 'read'; this.messages = [...this.messages]; } }, 4000);
          }
        },
        captureScreenshot() { this.attachOpen = false; alert('Screenshot captured!'); },
        scrollDown() { setTimeout(() => { const msgs = document.querySelector('.messages'); if (msgs) msgs.scrollTop = msgs.scrollHeight; }, 50); },
        dividerBefore(index) { return index === 0; },
        dayLabel() { return 'Today'; },
        timeLabel(msg) { const d = msg.created ? new Date(msg.created) : new Date(); return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); },
        groupStart(index) { return index === 0 || this.messages[index].senderType !== this.messages[index - 1].senderType; },
        groupEnd(index) { return index === this.messages.length - 1 || this.messages[index].senderType !== this.messages[index + 1].senderType; },
        attachmentUrl(msg) { return msg.localUrl || msg.url || ''; },
        notifyTyping() { }
      });
    } else {
      const chatStore = Alpine.store('chat');
      if (chatConfig) {
        if (chatConfig.clientName) chatStore.clientName = chatConfig.clientName;
        if (chatConfig.agentName) {
          chatStore.agentName = chatConfig.agentName;
          if (chatStore.messages && chatStore.messages[0]) { chatStore.messages[0].senderName = chatConfig.agentName; }
        }
      }
    }
  };
})();
