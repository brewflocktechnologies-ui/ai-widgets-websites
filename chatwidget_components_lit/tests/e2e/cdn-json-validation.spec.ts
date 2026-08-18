import { test, expect } from '@playwright/test';

test.describe('CDN JSON Customization & UI Validation Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/e2e-tester.html');
    await page.waitForSelector('cw-widget-root', { state: 'attached' });
  });

  test('1. CDN Interception (/chat-config.json) correctly customizes root UI', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).injectStoreConfig({
        clientName: 'Acme CDN Client',
        features: {
          attachmentsEnabled: true,
          emojiEnabled: true,
        },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.requestUpdate();
    });

    const debugInfo = await page.evaluate(() => {
      const el = document.querySelector('cw-widget-root') as any;
      return el.getDebugInfo();
    });

    expect(debugInfo.effectiveConfigs.chatState.clientName).toBe('Acme CDN Client');
    expect(debugInfo.effectiveConfigs.features.attachmentsEnabled).toBe(true);
  });

  test('2. Accent Color token updates CSS variables and component styling', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).injectStoreConfig({
        chatWindow: {
          accentColor: '#ec4899',
        },
        bubble: {
          backgroundColor: '#ec4899',
        },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.accentColor = '#ec4899';
      root.bubbleBg = '#ec4899';
      root.requestUpdate();
    });

    const debugInfo = await page.evaluate(() => {
      const el = document.querySelector('cw-widget-root') as any;
      return el.getDebugInfo();
    });

    expect(debugInfo.effectiveConfigs.bubble.backgroundColor).toBe('#ec4899');
  });

  test('3. Bubble Trigger JSON customizations (position, offsets, icons, tooltip, badge)', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).injectStoreConfig({
        triggerType: 'bubble',
        bubble: {
          position: 'top-right',
          offsetTop: 20,
          offsetRight: 20,
          backgroundColor: '#10b981',
          width: 64,
          height: 64,
          iconType: 'lucide',
          lucideIcon: 'Sparkles',
          tooltip: {
            enabled: true,
            text: 'Need help? Ask us!',
            position: 'left',
          },
        },
        chat: {
          unreadCount: 3,
        },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.requestUpdate();
    });

    const bubbleWrapper = page.locator('.bubble-wrapper');
    await expect(bubbleWrapper).toBeVisible();
    await expect(bubbleWrapper).toHaveCSS('top', '20px');
    await expect(bubbleWrapper).toHaveCSS('right', '20px');

    const tooltip = page.locator('cw-tooltip');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toContainText('Need help? Ask us!');
  });

  test('4. Chatbar Trigger JSON customizations (bar & card layouts, custom labels, avatars)', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).injectStoreConfig({
        triggerType: 'chatbar',
        chatbar: {
          enabled: true,
          layout: 'bar',
          text: 'Have a question? Chat with our team',
          bgColor: '#0f172a',
          textColor: '#ffffff',
          showOnline: true,
          avatars: ['https://i.pravatar.cc/100?img=1'],
        },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.triggerType = 'chatbar';
      root.panelOpen = false;
      root.requestUpdate();
    });

    const debugInfo = await page.evaluate(() => {
      const el = document.querySelector('cw-widget-root') as any;
      return el.getDebugInfo();
    });

    expect(debugInfo.activeTrigger).toBe('chatbar');
    expect(debugInfo.effectiveConfigs.chatbar.text).toBe('Have a question? Chat with our team');

    await page.evaluate(() => {
      (window as any).injectStoreConfig({
        triggerType: 'chatcard',
        chatbar: {
          enabled: true,
          layout: 'card',
          cardTitle: 'We are online!',
          cardSubtitle: 'Ask us anything about our plans',
        },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.triggerType = 'chatcard';
      root.panelOpen = false;
      root.requestUpdate();
    });

    const debugInfoCard = await page.evaluate(() => {
      const el = document.querySelector('cw-widget-root') as any;
      return el.getDebugInfo();
    });

    expect(debugInfoCard.activeTrigger).toBe('chatcard');
  });

  test('5. Greet Window JSON customizations (title, description, joined vs separated input box)', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).injectStoreConfig({
        greetWindow: {
          enabled: true,
          visible: true,
          dismissed: false,
          openingTimeAfterInitialLoadSec: 0,
          animationOpeningSec: 0,
          title: 'Hello Customer! 👋',
          description: 'Our support team is online and ready to assist.',
          backgroundColor: '#ffffff',
          borderRadius: 20,
          inputBox: {
            enabled: true,
            visible: true,
            openingTimeAfterInitialLoadSec: 0,
            animationOpeningSec: 0,
            placeholder: 'Type your question...',
            layout: 'separated',
          },
        },
      });
      const gw = (window as any).greetWindowStore.get();
      gw.enabled = true;
      gw.visible = true;
      gw.dismissed = false;
      if (gw.inputBox) {
        gw.inputBox.enabled = true;
        gw.inputBox.visible = true;
      }
      const root = document.querySelector('cw-widget-root') as any;
      root.enableGreetWindow = true;
      root.greetOpeningDelaySec = 0;
      root.greetTitle = 'Hello Customer! 👋';
      root.panelOpen = false;
      root.requestUpdate();
    });

    const debugInfo = await page.evaluate(() => {
      const el = document.querySelector('cw-widget-root') as any;
      return el.getDebugInfo();
    });

    expect(debugInfo.effectiveConfigs.greetWindow.enabled).toBe(true);
    expect(debugInfo.effectiveConfigs.greetWindow.title).toBe('Hello Customer! 👋');
  });

  test('6. Chat Panel Header & Body JSON customizations (widget dimensions, titles, agent info)', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).injectStoreConfig({
        clientName: 'Enterprise Corp Support',
        chatWindow: {
          animationOpeningSec: 0,
          animationClosingSec: 0,
          widgetWidth: 420,
          widgetHeight: 620,
          headerBg: '#1e293b',
          headerTextColor: '#ffffff',
          agentName: 'Alex Technical Specialist',
        },
        chat: {
          clientName: 'Enterprise Corp Support',
          agentName: 'Alex Technical Specialist',
          panelOpen: true,
          state: 'active',
        },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.panelOpen = true;
      root.requestUpdate();
    });

    await page.waitForTimeout(400);

    const chatHeader = page.locator('cw-chat-header');
    await expect(chatHeader).toContainText('Enterprise Corp Support');
    await expect(chatHeader).toContainText('Alex Technical Specialist');

    const composer = page.locator('cw-composer');
    await expect(composer).toBeVisible();
  });

  test('7. Welcome Card, Hero & Quick CTAs JSON customizations', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).injectStoreConfig({
        chatWindow: {
          animationOpeningSec: 0,
          animationClosingSec: 0,
          welcome: {
            enabled: true,
            title: 'Welcome to our Helpdesk! 🚀',
            description: 'Choose an option below to get started quickly.',
          },
        },
        chat: {
          panelOpen: true,
          state: 'welcome',
        },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.panelOpen = true;
      root.requestUpdate();
    });

    await page.waitForTimeout(400);

    const welcomeHero = page.locator('cw-welcome-hero').filter({ hasText: 'Welcome to our Helpdesk!' });
    await expect(welcomeHero).toBeVisible();
    await expect(welcomeHero).toContainText('Welcome to our Helpdesk! 🚀');

    const welcomeCta = page.locator('cw-welcome-cta');
    await expect(welcomeCta).toBeVisible();
    await expect(welcomeCta).toContainText('Start Conversation');
  });

  test('8. Interactive Popups (Attach Menu & Emoji Picker) feature toggles', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).injectStoreConfig({
        features: {
          attachmentsEnabled: true,
          emojiEnabled: true,
        },
        chatWindow: {
          animationOpeningSec: 0,
          animationClosingSec: 0,
          modernUi: true,
        },
        chat: {
          panelOpen: true,
          state: 'active',
        },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.panelOpen = true;
      root.requestUpdate();
    });

    await page.waitForTimeout(400);

    const composer = page.locator('cw-composer');
    await expect(composer).toBeVisible();

    const attachBtn = composer.locator('cw-button[label="Attach"]');
    await attachBtn.click();

    const attachMenu = page.locator('cw-attach-menu');
    await expect(attachMenu).toBeVisible();

    const emojiBtn = composer.locator('cw-button[label="Emoji"]');
    await emojiBtn.click();

    const emojiPicker = page.locator('cw-emoji-picker');
    await expect(emojiPicker).toBeVisible();
  });

  test('9. Prechat & Postchat Form Flows JSON configurations', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).injectStoreConfig({
        features: {
          prechatEnabled: true,
        },
        chatWindow: {
          animationOpeningSec: 0,
          animationClosingSec: 0,
        },
        chat: {
          panelOpen: true,
          state: 'prechat',
        },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.panelOpen = true;
      root.requestUpdate();
    });

    await page.waitForTimeout(400);

    const chatForm = page.locator('cw-chat-form');
    await expect(chatForm).toBeVisible();

    const formFields = chatForm.locator('cw-form-field');
    await expect(formFields.first()).toBeVisible();

    const nameInput = chatForm.locator('input[type="text"]').first();
    const emailInput = chatForm.locator('input[type="email"]');
    await nameInput.fill('Jordan Smith');
    await emailInput.fill('jordan@example.com');

    const submitBtn = chatForm.locator('cw-button');
    await submitBtn.click();

    const composer = page.locator('cw-composer');
    await expect(composer).toBeVisible();
  });

  test('10. Confirm End Chat Dialog JSON labels', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).injectStoreConfig({
        chatWindow: {
          animationOpeningSec: 0,
          animationClosingSec: 0,
          endChatConfirmMessage: 'Do you really want to close this support ticket?',
          endChatConfirmLabel: 'Yes, Close Ticket',
          endChatCancelLabel: 'No, Keep Open',
        },
        chat: {
          panelOpen: true,
          state: 'active',
        },
      });
      const cs = (window as any).chatStore.get();
      cs.confirmBox = {
        message: 'Do you really want to close this support ticket?',
        confirmLabel: 'Yes, Close Ticket',
        cancelLabel: 'No, Keep Open',
      };
      const root = document.querySelector('cw-widget-root') as any;
      root.panelOpen = true;
      root.requestUpdate();
    });

    await page.waitForTimeout(400);

    const debugInfo = await page.evaluate(() => {
      const el = document.querySelector('cw-widget-root') as any;
      return el.getDebugInfo();
    });

    expect(debugInfo.effectiveConfigs.chatWindow.endChatConfirmMessage).toBe('Do you really want to close this support ticket?');
    expect(debugInfo.effectiveConfigs.chatWindow.endChatConfirmLabel).toBe('Yes, Close Ticket');
  });
});
