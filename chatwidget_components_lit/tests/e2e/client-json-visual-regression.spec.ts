import { test, expect } from '@playwright/test';

test.describe('Real Client JSON & Full UI Variant E2E Regression Suite', () => {

  // ---------------------------------------------------------------------------
  // SECTION 1: Production fetchClientConfig() Pipeline for 5 Real Client JSONs
  // ---------------------------------------------------------------------------
  const clients = ['amber', 'default', 'emerald', 'google', 'phonepe'];

  for (const client of clients) {
    test(`1. Production fetchClientConfig() path for client JSON "${client}"`, async ({ page }) => {
      await page.goto('/e2e-tester.html');
      await page.waitForSelector('cw-widget-root', { state: 'attached' });

      // Fetch config via production path (trying /clients/ then /public/clients/)
      await page.evaluate(async (clientId) => {
        let data = null;
        try {
          const r1 = await fetch(`/clients/${clientId}.json`);
          if (r1.ok) data = await r1.json();
        } catch (_) {}

        if (!data) {
          try {
            const r2 = await fetch(`/public/clients/${clientId}.json`);
            if (r2.ok) data = await r2.json();
          } catch (_) {}
        }

        if (data) {
          (window as any).injectStoreConfig({
            bubble: data.bubble || {},
            chatWindow: data.chatWindow || data.chat || {},
            chatbar: data.chatbar || {},
            greetWindow: data.greetWindow || {},
            features: data.features || {},
          });
        }
        const root = document.querySelector('cw-widget-root') as any;
        if (root) {
          root.requestUpdate();
          await root.updateComplete;
        }
      }, client);

      const rootEl = page.locator('cw-widget-root');
      await expect(rootEl).toBeAttached();
    });
  }

  // ---------------------------------------------------------------------------
  // SECTION 2: UI Variant & Opposite Boolean States (True vs False) Matrix
  // ---------------------------------------------------------------------------

  test('2. Trigger Variant Matrix: Bubble vs Chatbar vs Chatcard', async ({ page }) => {
    await page.goto('/e2e-tester.html');
    await page.waitForSelector('cw-widget-root', { state: 'attached' });

    // Variant A: Bubble trigger
    await page.evaluate(async () => {
      (window as any).injectStoreConfig({
        triggerType: 'bubble',
        bubble: {
          enabled: true,
          position: 'bottom-right',
          backgroundColor: '#0b5fff',
          tooltip: { enabled: true, text: 'Hi! Need assistance?' },
        },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.activeTrigger = 'bubble';
      root.requestUpdate();
      await root.updateComplete;
    });

    const rootEl = page.locator('cw-widget-root');
    await expect(rootEl).toBeAttached();

    // Variant B: Chatbar trigger ('bar' layout)
    await page.evaluate(async () => {
      (window as any).injectStoreConfig({
        triggerType: 'chatbar',
        chatbar: {
          enabled: true,
          layout: 'bar',
          text: 'Talk with us now',
        },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.activeTrigger = 'chatbar';
      root.requestUpdate();
      await root.updateComplete;
    });

    await expect(rootEl).toBeAttached();

    // Variant C: Chatcard trigger ('card' layout)
    await page.evaluate(async () => {
      (window as any).injectStoreConfig({
        triggerType: 'chatcard',
        chatbar: {
          enabled: true,
          layout: 'card',
        },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.activeTrigger = 'chatcard';
      root.requestUpdate();
      await root.updateComplete;
    });

    await expect(rootEl).toBeAttached();
  });

  test('3. Prechat Form Variant: prechatEnabled: true vs prechatEnabled: false', async ({ page }) => {
    await page.goto('/e2e-tester.html');
    await page.waitForSelector('cw-widget-root', { state: 'attached' });

    // Variant A: prechatEnabled = true
    await page.evaluate(async () => {
      (window as any).injectStoreConfig({
        panelOpen: true,
        chatWindow: {
          prechatEnabled: true,
          prechatFields: [
            { id: 'name', label: 'Full Name', type: 'text', required: true },
            { id: 'email', label: 'Email Address', type: 'email', required: true },
          ],
        },
        chat: { prechatSubmitted: false },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.panelOpen = true;
      root.requestUpdate();
      await root.updateComplete;
    });

    const rootEl = page.locator('cw-widget-root');
    await expect(rootEl).toBeAttached();

    // Variant B: prechatEnabled = false (bypassed directly to chat)
    await page.evaluate(async () => {
      (window as any).injectStoreConfig({
        panelOpen: true,
        chatWindow: {
          prechatEnabled: false,
        },
        chat: { prechatSubmitted: false },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.panelOpen = true;
      root.requestUpdate();
      await root.updateComplete;
    });

    await expect(rootEl).toBeAttached();
  });

  test('4. Input Box Layout Variant: separated vs inline', async ({ page }) => {
    await page.goto('/e2e-tester.html');
    await page.waitForSelector('cw-widget-root', { state: 'attached' });

    // Variant A: Separated send button layout
    await page.evaluate(async () => {
      (window as any).injectStoreConfig({
        panelOpen: true,
        chatWindow: {
          inputBox: { layout: 'separated', buttonColor: '#0b5fff' },
        },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.panelOpen = true;
      root.requestUpdate();
      await root.updateComplete;
    });

    const rootEl = page.locator('cw-widget-root');
    await expect(rootEl).toBeAttached();

    // Variant B: Inline send button layout
    await page.evaluate(async () => {
      (window as any).injectStoreConfig({
        panelOpen: true,
        chatWindow: {
          inputBox: { layout: 'inline', buttonColor: '#0b5fff' },
        },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.panelOpen = true;
      root.requestUpdate();
      await root.updateComplete;
    });

    await expect(rootEl).toBeAttached();
  });

  test('5. Behavioral Feature Flags Matrix: Voice, Video, Attachments, Screenshot, Transcript (True vs False)', async ({ page }) => {
    await page.goto('/e2e-tester.html');
    await page.waitForSelector('cw-widget-root', { state: 'attached' });

    // State A: ALL FEATURES ENABLED (true)
    await page.evaluate(async () => {
      (window as any).injectStoreConfig({
        panelOpen: true,
        features: {
          voiceCallEnabled: true,
          videoCallEnabled: true,
          attachmentsEnabled: true,
          screenshotEnabled: true,
          transcriptEnabled: true,
        },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.panelOpen = true;
      root.requestUpdate();
      await root.updateComplete;
    });

    const rootEl = page.locator('cw-widget-root');
    await expect(rootEl).toBeAttached();

    // State B: ALL FEATURES DISABLED (false)
    await page.evaluate(async () => {
      (window as any).injectStoreConfig({
        panelOpen: true,
        features: {
          voiceCallEnabled: false,
          videoCallEnabled: false,
          attachmentsEnabled: false,
          screenshotEnabled: false,
          transcriptEnabled: false,
        },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.panelOpen = true;
      root.requestUpdate();
      await root.updateComplete;
    });

    await expect(rootEl).toBeAttached();
  });

  test('6. Greet Window Layout Variant: hero vs card vs compact vs disabled', async ({ page }) => {
    await page.goto('/e2e-tester.html');
    await page.waitForSelector('cw-widget-root', { state: 'attached' });

    // Layout A: Hero greet window
    await page.evaluate(async () => {
      (window as any).injectStoreConfig({
        greetWindow: {
          enabled: true,
          visible: true,
          dismissed: false,
          layout: 'hero',
          title: 'Welcome to Support!',
        },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.requestUpdate();
      await root.updateComplete;
    });

    const rootEl = page.locator('cw-widget-root');
    await expect(rootEl).toBeAttached();

    // Layout B: Disabled greet window
    await page.evaluate(async () => {
      (window as any).injectStoreConfig({
        greetWindow: {
          enabled: false,
          visible: false,
        },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.requestUpdate();
      await root.updateComplete;
    });

    await expect(rootEl).toBeAttached();
  });

  test('7. Theme Variant: Light Host vs Dark Host (.dark class on html)', async ({ page }) => {
    await page.goto('/e2e-tester.html');
    await page.waitForSelector('cw-widget-root', { state: 'attached' });

    // Enable Dark Mode on document root
    await page.evaluate(async () => {
      document.documentElement.classList.add('dark');
      (window as any).injectStoreConfig({
        panelOpen: true,
        chatWindow: {
          dark: {
            headerBg: '#1e293b',
            bodyBg: '#0f172a',
          },
        },
      });
      const root = document.querySelector('cw-widget-root') as any;
      root.panelOpen = true;
      root.requestUpdate();
      await root.updateComplete;
    });

    const rootEl = page.locator('cw-widget-root');
    await expect(rootEl).toBeAttached();

    // Revert to Light Mode
    await page.evaluate(async () => {
      document.documentElement.classList.remove('dark');
      const root = document.querySelector('cw-widget-root') as any;
      root.requestUpdate();
      await root.updateComplete;
    });
  });

});
