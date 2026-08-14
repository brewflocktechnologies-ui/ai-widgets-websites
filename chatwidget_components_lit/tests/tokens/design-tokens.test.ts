import { describe, it, expect } from 'vitest';
import {
  CW_ACCENT,
  CW_BG,
  LIGHT_TOKENS,
  DARK_TOKENS,
} from '../../tokens/design-tokens.js';

describe('tokens/design-tokens.ts', () => {
  it('should export CSS variable name constants', () => {
    expect(CW_ACCENT).toBe('--cw-accent');
    expect(CW_BG).toBe('--cw-bg');
  });

  it('should export valid LIGHT_TOKENS map', () => {
    expect(LIGHT_TOKENS[CW_ACCENT]).toBe('#0b5fff');
    expect(LIGHT_TOKENS[CW_BG]).toBe('#f6f7fa');
  });

  it('should export valid DARK_TOKENS map', () => {
    expect(DARK_TOKENS[CW_ACCENT]).toBe('#0b5fff');
    expect(DARK_TOKENS[CW_BG]).toBe('#0f172a');
  });
});
