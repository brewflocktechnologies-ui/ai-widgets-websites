import { html } from 'lit';
import '../../components/organisms/cw-bubble.js';

export default {
  title: 'Organisms/Bubble',
  component: 'cw-bubble',
  argTypes: {
    panelOpen: { control: 'boolean' },
    unreadCount: { control: 'number' },
  },
};

export const DefaultSolid = {
  args: {
    panelOpen: false,
    unreadCount: 2,
    config: {
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
    },
  },
  render: (args: any) => html`
    <div style="position: relative; height: 100px;">
      <cw-bubble
        .config="${args.config}"
        .panelOpen="${args.panelOpen}"
        .unreadCount="${args.unreadCount}"
      ></cw-bubble>
    </div>
  `,
};

export const GradientBackground = {
  args: {
    panelOpen: false,
    unreadCount: 3,
    config: {
      useWebsiteTheme: false,
      position: 'bottom-right',
      offsetRight: 16,
      offsetBottom: 16,
      width: 60,
      height: 60,
      gradientType: 'linear',
      gradientAngle: 135,
      gradientStops: [
        { color: '#0b5fff', pos: 0 },
        { color: '#22d3ee', pos: 100 },
      ],
      lucideIcon: 'Sparkles',
      iconWidth: 26,
      iconHeight: 26,
      iconColor: '#ffffff',
      boxShadowOffsetY: 8,
      boxShadowBlur: 20,
      boxShadowOpacity: 0.25,
    },
  },
  render: (args: any) => html`
    <div style="position: relative; height: 100px;">
      <cw-bubble
        .config="${args.config}"
        .panelOpen="${args.panelOpen}"
        .unreadCount="${args.unreadCount}"
      ></cw-bubble>
    </div>
  `,
};

export const Glassmorphism = {
  args: {
    panelOpen: false,
    unreadCount: 0,
    config: {
      useWebsiteTheme: false,
      position: 'bottom-right',
      offsetRight: 16,
      offsetBottom: 16,
      width: 60,
      height: 60,
      backgroundColor: '#0b5fff',
      glass: {
        enabled: true,
        blur: 16,
        bgOpacity: 0.4,
      },
      border: {
        width: 1,
        color: 'rgba(255, 255, 255, 0.4)',
        style: 'solid',
      },
      lucideIcon: 'MessageSquare',
      iconWidth: 26,
      iconHeight: 26,
      iconColor: '#ffffff',
    },
  },
  render: (args: any) => html`
    <div style="position: relative; height: 100px;">
      <cw-bubble
        .config="${args.config}"
        .panelOpen="${args.panelOpen}"
        .unreadCount="${args.unreadCount}"
      ></cw-bubble>
    </div>
  `,
};

export const NeonGlow = {
  args: {
    panelOpen: false,
    unreadCount: 1,
    config: {
      useWebsiteTheme: false,
      position: 'bottom-right',
      offsetRight: 16,
      offsetBottom: 16,
      width: 60,
      height: 60,
      backgroundColor: '#059669',
      neon: {
        enabled: true,
        color: '#10b981',
        intensity: 1.0,
      },
      lucideIcon: 'Bot',
      iconWidth: 26,
      iconHeight: 26,
      iconColor: '#ffffff',
    },
  },
  render: (args: any) => html`
    <div style="position: relative; height: 100px;">
      <cw-bubble
        .config="${args.config}"
        .panelOpen="${args.panelOpen}"
        .unreadCount="${args.unreadCount}"
      ></cw-bubble>
    </div>
  `,
};

export const OverlayImagePattern = {
  args: {
    panelOpen: false,
    unreadCount: 0,
    config: {
      useWebsiteTheme: false,
      position: 'bottom-right',
      offsetRight: 16,
      offsetBottom: 16,
      width: 60,
      height: 60,
      backgroundColor: '#5f259f',
      backgroundOverlayType: 'image',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
      backgroundImageOpacity: 0.35,
      lucideIcon: 'MessageCircle',
      iconWidth: 26,
      iconHeight: 26,
      iconColor: '#ffffff',
    },
  },
  render: (args: any) => html`
    <div style="position: relative; height: 100px;">
      <cw-bubble
        .config="${args.config}"
        .panelOpen="${args.panelOpen}"
        .unreadCount="${args.unreadCount}"
      ></cw-bubble>
    </div>
  `,
};

export const OutlineRingHighlight = {
  args: {
    panelOpen: false,
    unreadCount: 5,
    config: {
      useWebsiteTheme: false,
      position: 'bottom-right',
      offsetRight: 16,
      offsetBottom: 16,
      width: 60,
      height: 60,
      backgroundColor: '#0b5fff',
      outlineRing: {
        enabled: true,
        width: 4,
        color: '#22d3ee',
        opacity: 0.8,
      },
      lucideIcon: 'Headphones',
      iconWidth: 26,
      iconHeight: 26,
      iconColor: '#ffffff',
    },
  },
  render: (args: any) => html`
    <div style="position: relative; height: 100px;">
      <cw-bubble
        .config="${args.config}"
        .panelOpen="${args.panelOpen}"
        .unreadCount="${args.unreadCount}"
      ></cw-bubble>
    </div>
  `,
};
