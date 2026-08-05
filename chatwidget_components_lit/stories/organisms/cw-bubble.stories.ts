import { html } from 'lit';
import '../../components/organisms/cw-bubble.js';

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
