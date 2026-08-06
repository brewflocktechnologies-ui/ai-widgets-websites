import { html } from 'lit';
import '../../components/organisms/cw-bubble.js';

/**
 * The bubble supports many independent, combinable visual features
 * (glass, neon, outline ring, tooltips, hover dots, icon types, overlays,
 * badges, gradients). `ConfigurableBubble` is the playground that exposes
 * every control; the curated stories below lock in canonical looks for
 * visual regression and quick reference.
 */

export default {
  title: 'Organisms/Bubble',
  component: 'cw-bubble',
  argTypes: {
    panelOpen: { control: 'boolean' },
    unreadCount: { control: { type: 'number', min: 0, max: 99 } },
    position: { control: 'select', options: ['bottom-right', 'bottom-left', 'top-right', 'top-left'] },
    width: { control: { type: 'number', min: 40, max: 100 } },
    height: { control: { type: 'number', min: 40, max: 100 } },
    backgroundColor: { control: 'color' },
    lucideIcon: { control: 'text' },
    iconWidth: { control: { type: 'number', min: 16, max: 48 } },
    iconHeight: { control: { type: 'number', min: 16, max: 48 } },
    iconColor: { control: 'color' },
    gradientType: { control: 'select', options: ['none', 'linear', 'radial'] },
    gradientAngle: { control: { type: 'number', min: 0, max: 360 } },
    enableGlass: { control: 'boolean' },
    glassBlur: { control: { type: 'number', min: 0, max: 30 } },
    glassOpacity: { control: { type: 'number', min: 0.1, max: 1.0, step: 0.1 } },
    enableNeon: { control: 'boolean' },
    neonColor: { control: 'color' },
    neonIntensity: { control: { type: 'number', min: 0.1, max: 2.0, step: 0.1 } },
    enableOutlineRing: { control: 'boolean' },
    outlineRingColor: { control: 'color' },
    outlineRingWidth: { control: { type: 'number', min: 1, max: 10 } },
    backgroundOverlayType: { control: 'select', options: ['none', 'image', 'lucide'] },
    backgroundImageUrl: { control: 'text' },
  },
};

/** Shared base config for the curated looks. */
const baseConfig = {
  useWebsiteTheme: false,
  position: 'bottom-right',
  offsetRight: 16,
  offsetBottom: 16,
  width: 60,
  height: 60,
  backgroundColor: '#0b5fff',
  lucideIcon: 'MessageCircle',
  iconWidth: 26,
  iconHeight: 26,
  iconColor: '#ffffff',
  boxShadowOffsetY: 6,
  boxShadowBlur: 16,
  boxShadowOpacity: 0.2,
  hideOnOpen: true,
};

export const ConfigurableBubble = {
  args: {
    panelOpen: false,
    unreadCount: 2,
    position: 'bottom-right',
    width: 60,
    height: 60,
    backgroundColor: '#0b5fff',
    lucideIcon: 'MessageCircle',
    iconWidth: 26,
    iconHeight: 26,
    iconColor: '#ffffff',
    gradientType: 'none',
    gradientAngle: 135,
    enableGlass: false,
    glassBlur: 16,
    glassOpacity: 0.4,
    enableNeon: false,
    neonColor: '#10b981',
    neonIntensity: 1.0,
    enableOutlineRing: false,
    outlineRingColor: '#22d3ee',
    outlineRingWidth: 3,
    backgroundOverlayType: 'none',
    backgroundImageUrl: '',
  },
  render: (args: any) => html`
    <div style="position: relative; height: 120px;">
      <cw-bubble
        .panelOpen="${args.panelOpen}"
        .unreadCount="${args.unreadCount}"
        .config="${{
          useWebsiteTheme: false,
          position: args.position,
          offsetRight: 16,
          offsetBottom: 16,
          width: args.width,
          height: args.height,
          backgroundColor: args.backgroundColor,
          lucideIcon: args.lucideIcon,
          iconWidth: args.iconWidth,
          iconHeight: args.iconHeight,
          iconColor: args.iconColor,
          gradientType: args.gradientType === 'none' ? undefined : args.gradientType,
          gradientAngle: args.gradientAngle,
          gradientStops: args.gradientType === 'linear' ? [{ color: '#0b5fff', pos: 0 }, { color: '#22d3ee', pos: 100 }] : undefined,
          glass: args.enableGlass ? { enabled: true, blur: args.glassBlur, bgOpacity: args.glassOpacity } : undefined,
          neon: args.enableNeon ? { enabled: true, color: args.neonColor, intensity: args.neonIntensity } : undefined,
          outlineRing: args.enableOutlineRing ? { enabled: true, color: args.outlineRingColor, width: args.outlineRingWidth, opacity: 0.8 } : undefined,
          backgroundOverlayType: args.backgroundOverlayType === 'none' ? undefined : args.backgroundOverlayType,
          backgroundImageUrl: args.backgroundImageUrl || undefined,
          boxShadowOffsetY: 6,
          boxShadowBlur: 16,
          boxShadowOpacity: 0.2,
        }}"
      ></cw-bubble>
    </div>
  `,
};

export const Default = {
  render: () => html`
    <div style="position: relative; height: 120px;">
      <cw-bubble .config="${{ ...baseConfig }}"></cw-bubble>
    </div>
  `,
};

export const GradientBackground = {
  render: () => html`
    <div style="position: relative; height: 120px;">
      <cw-bubble
        .config="${{
          ...baseConfig,
          backgroundColor: '#0b5fff',
          gradientType: 'linear',
          gradientAngle: 135,
          gradientStops: [
            { color: '#667eea', pos: 0 },
            { color: '#764ba2', pos: 100 },
          ],
        }}"
      ></cw-bubble>
    </div>
  `,
};


export const NeonGlow = {
  render: () => html`
    <cw-bubble
      .config="${{
        ...baseConfig,
        backgroundColor: '#0f172a',
        lucideIcon: 'MessageSquare',
        neon: { enabled: true, color: '#22d3ee', intensity: 0.9 },
      }}"
    ></cw-bubble>
  `,
};

export const OutlineRing = {
  render: () => html`
    <div style="position: relative; height: 120px;">
      <cw-bubble
        .config="${{
          ...baseConfig,
          backgroundColor: '#ffffff',
          iconColor: '#0b5fff',
          border: { width: 2, color: '#e2e8f0', style: 'solid' },
          outlineRing: { enabled: true, width: 3, color: '#0b5fff', opacity: 0.35 },
        }}"
      ></cw-bubble>
    </div>
  `,
};

export const ImageIcon = {
  render: () => html`
    <cw-bubble
      .config="${{
        ...baseConfig,
        backgroundColor: '#ffffff',
        iconType: 'image',
        iconImageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&auto=format&fit=crop&q=80',
        iconFit: 'cover',
        border: { width: 2, color: '#ffffff', style: 'solid' },
        boxShadowOffsetY: 6,
        boxShadowBlur: 16,
        boxShadowOpacity: 0.25,
      }}"
    ></cw-bubble>
  `,
};

export const BackgroundOverlayImage = {
  render: () => html`
    <div style="position: relative; height: 140px;">
      <cw-bubble
        .config="${{
          ...baseConfig,
          backgroundColor: '#0b5fff',
          lucideIcon: 'MessageCircle',
          backgroundOverlayType: 'image',
          backgroundImageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=200&auto=format&fit=crop&q=80',
          backgroundImageSize: 'cover',
          backgroundImageOpacity: 0.3,
          backgroundBlendMode: 'multiply',
        }}"
      ></cw-bubble>
    </div>
  `,
};

export const WithTooltip = {
  render: () => html`
    <div style="position: relative; height: 140px; padding: 24px 60px;">
      <cw-bubble
        .config="${{
          ...baseConfig,
          tooltip: {
            enabled: true,
            text: 'Questions about PayPal?',
            position: 'left',
            backgroundColor: '#ffffff',
            textColor: '#374151',
            fontSize: 14,
            padding: '8px 16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            arrowEnabled: true,
          },
        }}"
      ></cw-bubble>
    </div>
  `,
};

export const HoverDots = {
  render: () => html`
    <div style="position: relative; height: 120px;">
      <cw-bubble
        .config="${{
          ...baseConfig,
          dots: { color: '#ffffff', size: 6, spacing: 6, animation: 'bounce' },
        }}"
      ></cw-bubble>
      <p style="position: absolute; top: 8px; left: 16px; margin: 0; font-size: 12px; color: #71717a; font-family: system-ui, sans-serif;">Hover the bubble to see the dots animation</p>
    </div>
  `,
};

