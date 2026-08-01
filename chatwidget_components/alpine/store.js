(function () {
  window.ZotlyInitStores = async function () {
    const theme = window.ZotlyUtils.getParentTheme();
    const clientId = window.ZotlyConfig.getClientId();

    if (!Alpine.store('bubble')) {
      Alpine.store('bubble', {
        useWebsiteTheme: true, position: 'bottom-right', offsetLeft: 16, offsetRight: 16, offsetBottom: 12, width: 50, height: 50, borderRadius: { tl: 50, tr: 50, bl: 50, br: 50 }, backgroundColor: theme.primary || '#0b5fff', gradientType: 'none', gradientStops: [{ color: theme.primary || '#0b5fff', pos: 0 }, { color: theme.secondary || '#22D3EE', pos: 100 }], backgroundOverlayType: 'image', backgroundImageUrl: '', backgroundImageSize: 'contain', backgroundImageOpacity: 0.25, backgroundBlendMode: 'normal', border: { width: 0, color: theme.primary || '#0b5fff', style: 'solid' }, outlineRing: { enabled: true, width: 3, color: theme.secondary || '#22D3EE', opacity: 0.4 }, boxShadowBlur: 20, boxShadowSpread: 0, boxShadowOffsetX: 0, boxShadowOffsetY: 8, boxShadowOpacity: 0.25, dots: { color: '#F8FAFC', size: 6, spacing: 6, animation: 'bounce' }, hideOnOpen: true, tooltip: { enabled: false, text: 'Chat with us', position: '', backgroundColor: '#ffffff', textColor: '#374151', fontSize: 14, borderRadius: { tl: 20, tr: 20, br: 4, bl: 20 }, padding: '8px 16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', arrowEnabled: true, borderColor: 'transparent', borderWidth: 0 },
        badge: {
          position: 'top-right',
          offsetX: -6,
          offsetY: -6,
          size: 20,
          backgroundColor: '#dc2626',
          textColor: '#ffffff',
          fontSize: 11,
          borderWidth: 2,
          borderColor: '#ffffff',
          borderRadius: '9999px',
          fontWeight: '700',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          padding: '0px',
          animation: 'pulse 1.5s infinite'
        }
      });
    }

    if (!Alpine.store('greetWindow')) {
      Alpine.store('greetWindow', {
        enabled: false, dismissed: false, useWebsiteTheme: false, width: 320, spacing: 16, backgroundColor: "#ffffff", borderRadius: 16, padding: "24px 20px", boxShadow: "0 12px 28px -6px rgba(0,0,0,0.15), 0 8px 14px -4px rgba(0,0,0,0.1)", imageUrl: "", imageHeight: 70, imageWidth: "", iconType: "", lucideIcon: "", iconSize: 48, iconColor: theme.primary || "#9333EA", iconAnimation: "none", iconAnimationDuration: "2.5s", title: "Hi there! 👋", titleColor: "#1e293b", titleFontSize: "15px", description: "How can we help you?", descriptionColor: "#475569", descriptionFontSize: "14px", iconAlign: "center", imagePadding: "0px",
        openingTimeAfterInitialLoadSec: 2, animationOpeningSec: 0.5, animationClosingSec: 0.3, visible: false,
        position: 'bottom-right',
        inputBox: { enabled: true, layout: "joined", placeholder: "Write your message...", backgroundColor: "#ffffff", textColor: "#1e293b", borderRadius: 24, boxShadow: "0 6px 16px rgba(0,0,0,0.12)", buttonColor: theme.primary || "#9333EA", buttonIconColor: "#ffffff", buttonBgColor: "", buttonBoxShadow: "", buttonSize: 42, openingTimeAfterInitialLoadSec: 4, animationOpeningSec: 0.5, visible: false }
      });
    }

    if (!Alpine.store('chatWindow')) {
      Alpine.store('chatWindow', {
        clientName: 'Zotly Support', agentName: 'Sarah', accentColor: theme.primary || '#0b5fff', useWebsiteTheme: true, widgetWidth: 350, widgetHeight: 550, expandedWidth: 480, expandedHeight: 550, widgetBorderRadius: 24, widgetShadow: true, widgetShadowBlur: 30, widgetShadowColor: 'rgba(0,0,0,0.12)', widgetBorderEnabled: true, widgetBorderWidth: 1, widgetBorderColor: '#e5e7eb', modernUi: true, typingIndicator: true, attachmentsEnabled: true, offsetRight: null, offsetBottom: null,
        welcome: { enabled: false, useWebsiteTheme: true, cardLayout: "glassy", cardAlign: "center", textAlign: "center", logoAlign: "center", avatarAlign: "center", cardBg: "rgba(255, 255, 255, 0.12)", cardBorder: "1px solid rgba(255, 255, 255, 0.22)", cardBorderRadius: 24, cardPadding: "32px 24px", padding: "24px 20px 12px 20px", cardBlur: 16, cardShadow: "0 12px 40px 0 rgba(0, 0, 0, 0.15)" }
      });
      Alpine.store('chatcontactv2', Alpine.store('chatWindow'));
    }

    if (!Alpine.store('features')) {
      Alpine.store('features', {
        voiceCallMaster: false,
        voiceCallAgents: false,
        voiceCallVisitors: false,
        videoCallMaster: false,
        videoCallAgents: false,
        videoCallVisitors: false,
        disableVisitorCamera: false,
        closeChatVisitor: false
      });
    }

    if (!Alpine.store('chat')) {
      window.ZotlyRegisterChatStore({});
    }

    if (!Alpine.store('chatbar')) {
      Alpine.store('chatbar', {
        enabled: false, useWebsiteTheme: true, position: 'bottom-right', offsetLeft: 16, offsetRight: 16, offsetBottom: 12, cardOffsetRight: null, cardOffsetBottom: null, barOffsetRight: null, barOffsetBottom: null, text: "Chat with us", cardText: "", barText: "Chat with us", bgColor: theme.primary || "#0b5fff", textColor: "#ffffff", textSize: 14, letterSpacing: 0, gradientEnabled: false, gradientStops: [{ color: theme.primary || "#0b5fff", pos: 0 }, { color: theme.secondary || "#22D3EE", pos: 100 }], gradientType: "linear", gradientAngle: 90, iconType: "lucide", iconColor: "#ffffff", lucideIcon: "MessageCircle", iconImageUrl: "", iconFit: "contain", iconOpacity: 1, iconBlend: "normal", iconWidth: 20, iconHeight: 20, width: 255, height: 40, shadow: true, borderRadius: { tl: 20, tr: 20, bl: 20, br: 20 }, hideOnOpen: true
      });
    }

    const { bubbleConfig, chatConfig, chatbarConfig, greetWindowConfig } = await window.ZotlyConfig.fetchClientConfig(clientId);

    if (bubbleConfig && Object.keys(bubbleConfig).length > 0) {
      if (bubbleConfig.useWebsiteTheme === true) {
        bubbleConfig.backgroundColor = theme.primary;
        bubbleConfig.gradientType = 'none';
        if (bubbleConfig.outlineRing) { bubbleConfig.outlineRing.color = theme.secondary; }
      }
      Object.assign(Alpine.store('bubble'), bubbleConfig);
      if (bubbleConfig.position) {
        Alpine.store('greetWindow').position = bubbleConfig.position;
      }
    }

    if (greetWindowConfig && Object.keys(greetWindowConfig).length > 0) {
      if (greetWindowConfig.inputBox) {
        greetWindowConfig.inputBox = { ...Alpine.store('greetWindow').inputBox, ...greetWindowConfig.inputBox };
      }
      if (greetWindowConfig.useWebsiteTheme === true) {
        greetWindowConfig.iconColor = theme.primary;
        if (greetWindowConfig.inputBox) {
          if (greetWindowConfig.inputBox.layout === 'separated') {
            greetWindowConfig.inputBox.buttonIconColor = theme.primary;
          } else {
            greetWindowConfig.inputBox.buttonColor = theme.primary;
          }
        }
      }
      Object.assign(Alpine.store('greetWindow'), greetWindowConfig);
    }

    if (chatbarConfig && Object.keys(chatbarConfig).length > 0) {
      Object.assign(Alpine.store('chatbar'), chatbarConfig);
      const store = Alpine.store('chatbar');
      if (store.layout === 'card') {
        if (store.cardOffsetRight !== undefined && store.cardOffsetRight !== null && store.cardOffsetRight !== '') {
          store.offsetRight = store.cardOffsetRight;
        }
        if (store.cardOffsetBottom !== undefined && store.cardOffsetBottom !== null && store.cardOffsetBottom !== '') {
          store.offsetBottom = store.cardOffsetBottom;
        }
      } else {
        if (store.barOffsetRight !== undefined && store.barOffsetRight !== null && store.barOffsetRight !== '') {
          store.offsetRight = store.barOffsetRight;
        }
        if (store.barOffsetBottom !== undefined && store.barOffsetBottom !== null && store.barOffsetBottom !== '') {
          store.offsetBottom = store.barOffsetBottom;
        }
      }
    }

    if (chatConfig && Object.keys(chatConfig).length > 0) {
      if (chatConfig.welcome) {
        Alpine.store('chatWindow').welcome = Object.assign({}, Alpine.store('chatWindow').welcome, chatConfig.welcome);
      }

      const applyTheme = () => {
        const isDark = document.documentElement.classList.contains('dark');
        const activeConfig = JSON.parse(JSON.stringify(chatConfig));

        if (activeConfig.useWebsiteTheme === true) {
          activeConfig.accentColor = theme.primary;
          activeConfig.visitorBubbleBg = theme.primary;
          activeConfig.visitorBubbleColor = '#ffffff';
          activeConfig.headerBg = theme.primary;
          activeConfig.headerTextColor = '#ffffff';
          activeConfig.headerAvatarBg = 'rgba(255,255,255,0.2)';
          activeConfig.headerAvatarColor = '#ffffff';
          activeConfig.agentAvatarBg = theme.primary;
          activeConfig.agentAvatarColor = '#ffffff';
          activeConfig.inputFocusBorderColor = theme.primary;
          activeConfig.inputFocusShadow = `0 0 0 2px ${theme.primary}26`;
          activeConfig.sendButtonBgActive = theme.primary;
          activeConfig.poweredByColor = theme.primary;
          activeConfig.endChatConfirmBg = theme.primary;
          activeConfig.endChatConfirmTextColor = '#ffffff';

          if (isDark) {
            activeConfig.bodyBg = 'var(--cw-bg)';
            activeConfig.inputBg = 'var(--cw-surface)';
            activeConfig.agentBubbleBg = 'var(--cw-surface)';
            activeConfig.agentBubbleColor = 'var(--cw-ink)';
            activeConfig.agentBubbleBorderColor = 'var(--cw-border)';
            activeConfig.footerBg = 'var(--cw-bg)';
            activeConfig.footerTextColor = 'var(--cw-muted)';
            activeConfig.inputTextColor = 'var(--cw-ink)';
            activeConfig.inputBorderColor = 'var(--cw-border)';
            activeConfig.attachButtonBg = 'var(--cw-surface)';
            activeConfig.attachButtonColor = 'var(--cw-muted)';
            activeConfig.emojiButtonColor = 'var(--cw-muted)';
            activeConfig.modalCardBg = 'var(--cw-surface)';
            activeConfig.modalMessageColor = 'var(--cw-ink)';
            activeConfig.endChatCancelBg = 'var(--cw-surface)';
            activeConfig.endChatCancelTextColor = 'var(--cw-muted)';
            activeConfig.endChatCancelBorderColor = 'var(--cw-border)';
          }
        }

        const welcomeObj = activeConfig.welcome || Alpine.store('chatWindow').welcome;
        if (welcomeObj) {
          const welcomeUseTheme = welcomeObj.useWebsiteTheme !== undefined ? welcomeObj.useWebsiteTheme : activeConfig.useWebsiteTheme;
          if (welcomeUseTheme === true) {
            const secondaryColor = (theme.secondary && theme.secondary !== theme.primary) ? theme.secondary : theme.primary;
            welcomeObj.bgGradient = `linear-gradient(135deg, ${theme.primary}, ${secondaryColor})`;
            welcomeObj.buttonIconColor = theme.primary;
            activeConfig.welcome = welcomeObj;
          }
        }

        if (isDark && chatConfig.dark && Object.keys(chatConfig.dark).length > 0) {
          Object.assign(activeConfig, chatConfig.dark);
        }

        Object.assign(Alpine.store('chatWindow'), activeConfig);
        if (Alpine.store('chatcontactv2')) {
          Object.assign(Alpine.store('chatcontactv2'), activeConfig);
        }
      };

      applyTheme();

      const observer = new MutationObserver(() => { applyTheme(); });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }

    window.ZotlyRegisterChatStore(chatConfig);

    // Set up greet window and input box visibility timers
    const greetStore = Alpine.store('greetWindow');
    if (greetStore && greetStore.enabled) {
      const greetDelaySec = greetStore.openingTimeAfterInitialLoadSec !== undefined ? parseFloat(greetStore.openingTimeAfterInitialLoadSec) : 2;
      setTimeout(() => {
        const chatStore = Alpine.store('chat');
        if (!greetStore.dismissed && (!chatStore || !chatStore.hasSentMessage)) {
          greetStore.visible = true;
        }
      }, greetDelaySec * 1000);

      if (greetStore.inputBox && greetStore.inputBox.enabled) {
        const inputDelaySec = greetStore.inputBox.openingTimeAfterInitialLoadSec !== undefined ? parseFloat(greetStore.inputBox.openingTimeAfterInitialLoadSec) : 4;
        setTimeout(() => {
          const chatStore = Alpine.store('chat');
          if (!greetStore.dismissed && (!chatStore || !chatStore.hasSentMessage)) {
            greetStore.inputBox.visible = true;
          }
        }, inputDelaySec * 1000);
      }
    }
  };
})();
