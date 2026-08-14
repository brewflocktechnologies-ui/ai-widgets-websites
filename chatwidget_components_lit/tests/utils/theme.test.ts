import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getParentTheme, getWidgetBaseUrl, isHostDark, observeDarkMode } from '../../utils/theme.js';

describe('utils/theme.ts', () => {
  beforeEach(() => {
    document.documentElement.className = '';
    document.body.innerHTML = '';
  });

  it('should return default primary and secondary colors when none set on document', () => {
    const theme = getParentTheme();
    expect(theme.primary).toBe('#0b5fff');
    expect(theme.secondary).toBe('#0b5fff');
  });

  it('should read data-accent attribute from script tag if available', () => {
    const script = document.createElement('script');
    script.setAttribute('data-client-id', 'test');
    script.setAttribute('data-accent', '#10b981');
    document.body.appendChild(script);

    const theme = getParentTheme();
    expect(theme.primary).toBe('#10b981');
  });

  it('should detect dark mode on <html> tag', () => {
    expect(isHostDark()).toBe(false);
    document.documentElement.classList.add('dark');
    expect(isHostDark()).toBe(true);
  });

  it('should notify callback when dark mode toggles', async () => {
    const spy = vi.fn();
    const unsubscribe = observeDarkMode(spy);

    document.documentElement.classList.add('dark');

    // Wait for MutationObserver callback execution
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(spy).toHaveBeenCalledWith(true);
    unsubscribe();
  });
});
