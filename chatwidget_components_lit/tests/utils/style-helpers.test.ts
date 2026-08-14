import { describe, it, expect } from 'vitest';
import {
  hexToRgba,
  getBorderRadius,
  getGradient,
  getBoxShadow,
  getCompositeBackground,
  getChatbarBackground,
  formatTime,
} from '../../utils/style-helpers.js';

describe('utils/style-helpers.ts', () => {
  it('should convert hex colors to rgba properly', () => {
    expect(hexToRgba('#ffffff', 0.5)).toBe('rgba(255,255,255,0.5)');
    expect(hexToRgba('#000', 1)).toBe('rgba(0,0,0,1)');
  });

  it('should compute border radius correctly for numbers and objects', () => {
    expect(getBorderRadius(16)).toBe('16px');
    expect(getBorderRadius({ tl: 10, tr: 12, br: 14, bl: 16 })).toBe('10px 12px 14px 16px');
    expect(getBorderRadius(undefined, '50%')).toBe('50%');
  });

  it('should generate gradient string correctly', () => {
    const stops = [
      { color: '#ff0000', pos: 0 },
      { color: '#00ff00', pos: 100 },
    ];
    expect(getGradient('linear', stops, 90)).toBe('linear-gradient(90deg, #ff0000 0%, #00ff00 100%)');
    expect(getGradient('radial', stops)).toBe('radial-gradient(circle, #ff0000 0%, #00ff00 100%)');
  });

  it('should calculate box shadow string correctly', () => {
    const shadow = getBoxShadow({ boxShadowOffsetY: 4, boxShadowBlur: 10, boxShadowOpacity: 0.2 });
    expect(shadow).toBe('0px 4px 10px 0px rgba(0,0,0,0.2)');
  });

  it('should compute composite background correctly', () => {
    expect(getCompositeBackground({ useWebsiteTheme: true, backgroundColor: '#9333ea' })).toBe('#9333ea');
  });

  it('should compute chatbar background correctly', () => {
    expect(getChatbarBackground({ useWebsiteTheme: true, accentColor: '#2563eb' })).toBe('#2563eb');
  });

  it('should format ISO time strings correctly', () => {
    const time = formatTime('2026-08-14T12:00:00Z');
    expect(typeof time).toBe('string');
  });
});
