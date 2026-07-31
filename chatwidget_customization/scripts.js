/* ==========================================================================
   WIDGET customization MAIN JS LOGIC
   Handles visual forms, raw JSON editor, Alpine store syncing & presets
   ========================================================================== */

// Helper to access and set nested object properties by dot-notation path
function getValueByPath(obj, path) {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((acc, part) => {
    return acc && acc[part] !== undefined ? acc[part] : undefined;
  }, obj);
}

function setValueByPath(obj, path, value) {
  if (!obj || !path) return;
  
  // Special conversion for welcome avatars comma-separated list
  if (path === 'chatWindow.welcome.avatars' && typeof value === 'string') {
    value = value.split(',').map(url => url.trim()).filter(url => url !== '');
  }

  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (current[part] === undefined || typeof current[part] !== 'object') {
      current[part] = {};
    }
    current = current[part];
  }
  
  const lastPart = parts[parts.length - 1];
  current[lastPart] = value;
}

// Parse CSS padding/margin shorthand strings to numeric top, right, bottom, left components
function parsePaddingString(str) {
  if (!str || typeof str !== 'string') {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }
  // Remove px/em/% units and get numeric components
  const parts = str.trim().split(/\s+/).map(p => {
    const val = parseFloat(p);
    return isNaN(val) ? 0 : val;
  });
  if (parts.length === 1) {
    return { top: parts[0], right: parts[0], bottom: parts[0], left: parts[0] };
  }
  if (parts.length === 2) {
    return { top: parts[0], right: parts[1], bottom: parts[0], left: parts[1] };
  }
  if (parts.length === 3) {
    return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[1] };
  }
  if (parts.length >= 4) {
    return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[3] };
  }
  return { top: 0, right: 0, bottom: 0, left: 0 };
}

function formatPaddingString(top, right, bottom, left) {
  return `${top || 0}px ${right || 0}px ${bottom || 0}px ${left || 0}px`;
}

// Parse rgba(r,g,b,a) or hex colors with opacity to hex color and float opacity
function parseCardBg(bgStr) {
  if (!bgStr || typeof bgStr !== 'string') {
    return { color: '#ffffff', opacity: 0.12 };
  }
  const clean = bgStr.trim().toLowerCase();
  if (clean === 'transparent') {
    return { color: '#ffffff', opacity: 0 };
  }
  const rgbaMatch = clean.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1]).toString(16).padStart(2, '0');
    const g = parseInt(rgbaMatch[2]).toString(16).padStart(2, '0');
    const b = parseInt(rgbaMatch[3]).toString(16).padStart(2, '0');
    const opacity = parseFloat(rgbaMatch[4]);
    return { color: `#${r}${g}${b}`, opacity };
  }
  const rgbMatch = clean.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]).toString(16).padStart(2, '0');
    const g = parseInt(rgbMatch[2]).toString(16).padStart(2, '0');
    const b = parseInt(rgbMatch[3]).toString(16).padStart(2, '0');
    return { color: `#${r}${g}${b}`, opacity: 1 };
  }
  if (clean.startsWith('#')) {
    if (clean.length === 9) {
      const opacity = parseInt(clean.substring(7, 9), 16) / 255;
      return { color: clean.substring(0, 7), opacity: parseFloat(opacity.toFixed(2)) };
    }
    return { color: clean, opacity: 1 };
  }
  return { color: '#ffffff', opacity: 0.12 };
}

function formatCardBg(hexColor, opacity) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Parse any shadow string (like "0 12px 28px -6px rgba(0, 0, 0, 0.15), 0 8px 14px -4px rgba(...)") to extract color and opacity.
// Returns { color: '#000000', opacity: 0.15 }
function parseShadowColor(shadowStr) {
  if (!shadowStr || typeof shadowStr !== 'string') {
    return { color: '#000000', opacity: 0.15 };
  }
  const clean = shadowStr.toLowerCase();
  
  // Look for rgba(...) first
  const rgbaMatch = clean.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1]).toString(16).padStart(2, '0');
    const g = parseInt(rgbaMatch[2]).toString(16).padStart(2, '0');
    const b = parseInt(rgbaMatch[3]).toString(16).padStart(2, '0');
    const opacity = parseFloat(rgbaMatch[4]);
    return { color: `#${r}${g}${b}`, opacity };
  }
  
  // Look for rgb(...)
  const rgbMatch = clean.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]).toString(16).padStart(2, '0');
    const g = parseInt(rgbMatch[2]).toString(16).padStart(2, '0');
    const b = parseInt(rgbMatch[3]).toString(16).padStart(2, '0');
    return { color: `#${r}${g}${b}`, opacity: 1.0 };
  }
  
  // Look for hex color
  const hexMatch = clean.match(/#[0-9a-fA-F]+/);
  if (hexMatch) {
    return { color: hexMatch[0], opacity: 1.0 };
  }
  
  return { color: '#000000', opacity: 0.15 };
}

function updateShadowColor(shadowStr, newHexColor, newOpacity) {
  const r = parseInt(newHexColor.slice(1, 3), 16);
  const g = parseInt(newHexColor.slice(3, 5), 16);
  const b = parseInt(newHexColor.slice(5, 7), 16);
  const newRgba = `rgba(${r}, ${g}, ${b}, ${newOpacity})`;
  
  if (!shadowStr || typeof shadowStr !== 'string') {
    return `0 8px 16px ${newRgba}`;
  }
  // Match rgba(...), rgb(...), hex values, or transparent
  const colorRegex = /rgba\([^\)]+\)|rgb\([^\)]+\)|#[0-9a-fA-F]{3,8}|transparent/g;
  if (colorRegex.test(shadowStr)) {
    return shadowStr.replace(colorRegex, newRgba);
  }
  // If no color was found, append it at the end
  return `${shadowStr.trim()} ${newRgba}`;
}

// Helper to extract hex or rgb/rgba color tokens from a gradient string
function extractColors(str) {
  const hexPattern = /#[0-9a-fA-F]{3,8}/g;
  const rgbPattern = /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+)?\)/g;
  let matches = [];
  
  let match;
  hexPattern.lastIndex = 0;
  rgbPattern.lastIndex = 0;

  while ((match = hexPattern.exec(str)) !== null) {
    matches.push({ index: match.index, val: match[0] });
  }
  while ((match = rgbPattern.exec(str)) !== null) {
    const hexVal = parseCardBg(match[0]).color;
    matches.push({ index: match.index, val: hexVal });
  }
  matches.sort((a, b) => a.index - b.index);
  return matches.map(m => m.val);
}

// Helper to parse background values (gradient or solid color)
function parseBgGradient(bgStr) {
  const result = {
    type: 'solid',
    angle: 135,
    color1: '#059669',
    color2: '#0d9488'
  };
  if (!bgStr || typeof bgStr !== 'string') return result;
  
  const clean = bgStr.trim();
  if (clean.includes('linear-gradient')) {
    result.type = 'linear';
    const angleMatch = clean.match(/(\d+)deg/);
    if (angleMatch) {
      result.angle = parseInt(angleMatch[1]);
    }
    const colors = extractColors(clean);
    if (colors.length >= 2) {
      result.color1 = colors[0];
      result.color2 = colors[1];
    } else if (colors.length === 1) {
      result.color1 = colors[0];
      result.color2 = colors[0];
    }
  } else if (clean.includes('radial-gradient')) {
    result.type = 'radial';
    const colors = extractColors(clean);
    if (colors.length >= 2) {
      result.color1 = colors[0];
      result.color2 = colors[1];
    } else if (colors.length === 1) {
      result.color1 = colors[0];
      result.color2 = colors[0];
    }
  } else {
    result.type = 'solid';
    const parsed = parseCardBg(clean);
    result.color1 = parsed.color;
    result.color2 = parsed.color;
  }
  return result;
}

// Helper to format background values into gradient or solid color string
function formatBgGradient(type, angle, color1, color2) {
  if (type === 'solid') {
    return color1;
  } else if (type === 'linear') {
    return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  } else if (type === 'radial') {
    return `radial-gradient(circle, ${color1}, ${color2})`;
  }
  return color1;
}

// Setup welcome screen background gradient panel listeners
function setupWelcomeBgPickerListeners() {
  const typeSelect = document.getElementById('welcome-bg-type');
  const angleInput = document.getElementById('welcome-bg-angle');
  
  const solidPick = document.getElementById('welcome-bg-solid-pick');
  const solidText = document.getElementById('welcome-bg-solid-text');
  
  const startPick = document.getElementById('welcome-bg-grad-start-pick');
  const startText = document.getElementById('welcome-bg-grad-start-text');
  const endPick = document.getElementById('welcome-bg-grad-end-pick');
  const endText = document.getElementById('welcome-bg-grad-end-text');
  
  const hiddenInput = document.getElementById('welcome-bg-gradient-hidden');

  if (!typeSelect || !hiddenInput) return;

  const updateWelcomeBg = () => {
    const type = typeSelect.value;
    const angle = parseInt(angleInput.value || 135);
    const color1 = type === 'solid' ? solidText.value : startText.value;
    const color2 = type === 'solid' ? solidText.value : endText.value;

    const formatted = formatBgGradient(type, angle, color1, color2);
    hiddenInput.value = formatted;
    
    // Dispatch events to trigger the visual-form change handler
    hiddenInput.dispatchEvent(new Event('input'));
    hiddenInput.dispatchEvent(new Event('change'));
  };

  // Toggle visibility helper
  const updateVisibility = () => {
    const type = typeSelect.value;
    const angleGroup = document.getElementById('welcome-bg-angle-group');
    const solidGroup = document.getElementById('welcome-bg-solid-group');
    const gradGroup = document.getElementById('welcome-bg-gradient-colors');

    if (type === 'solid') {
      if (angleGroup) angleGroup.style.display = 'none';
      if (solidGroup) solidGroup.style.display = 'block';
      if (gradGroup) gradGroup.style.display = 'none';
    } else if (type === 'linear') {
      if (angleGroup) angleGroup.style.display = 'block';
      if (solidGroup) solidGroup.style.display = 'none';
      if (gradGroup) gradGroup.style.display = 'flex';
    } else {
      // Radial
      if (angleGroup) angleGroup.style.display = 'none';
      if (solidGroup) solidGroup.style.display = 'none';
      if (gradGroup) gradGroup.style.display = 'flex';
    }
  };

  // Attach change listeners
  typeSelect.addEventListener('change', () => {
    updateVisibility();
    updateWelcomeBg();
  });
  
  angleInput.addEventListener('input', updateWelcomeBg);

  // Sync picks with texts
  const syncAndChange = (pick, text) => {
    pick.addEventListener('input', () => {
      text.value = pick.value;
      updateWelcomeBg();
    });
    text.addEventListener('input', () => {
      const hex = text.value;
      if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
        pick.value = hex;
      }
      updateWelcomeBg();
    });
  };

  if (solidPick && solidText) syncAndChange(solidPick, solidText);
  if (startPick && startText) syncAndChange(startPick, startText);
  if (endPick && endText) syncAndChange(endPick, endText);

  // Initialize visibility
  updateVisibility();
}

// Parse border shorthand [width]px [style] [color] into width, style, hexColor, and opacity
function parseCardBorder(borderStr) {
  if (!borderStr || typeof borderStr !== 'string') {
    return { width: 1, style: 'solid', color: '#ffffff', opacity: 0.22 };
  }
  const clean = borderStr.trim();
  const widthMatch = clean.match(/^(\d+)px/);
  const width = widthMatch ? parseInt(widthMatch[1]) : 1;
  
  const styles = ['solid', 'dashed', 'dotted', 'none', 'double'];
  let style = 'solid';
  for (const s of styles) {
    if (clean.includes(s)) {
      style = s;
      break;
    }
  }

  let color = '#ffffff';
  let opacity = 0.22;
  const rgbaMatch = clean.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1]).toString(16).padStart(2, '0');
    const g = parseInt(rgbaMatch[2]).toString(16).padStart(2, '0');
    const b = parseInt(rgbaMatch[3]).toString(16).padStart(2, '0');
    color = `#${r}${g}${b}`;
    opacity = parseFloat(rgbaMatch[4]);
  } else {
    const hexMatch = clean.match(/#[0-9a-fA-F]+/);
    if (hexMatch) {
      color = hexMatch[0];
      opacity = 1;
    }
  }

  return { width, style, color, opacity };
}

function formatCardBorder(width, style, hexColor, opacity) {
  if (style === 'none') return 'none';
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return `${width || 1}px ${style || 'solid'} rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Global customization State
window.cutomizationConfig = {};
const presetColors = {
  emerald: { primary: '#059669', secondary: '#0d9488', dark: false },
  amber: { primary: '#d97706', secondary: '#b45309', dark: false },
  google: { primary: '#1a73e8', secondary: '#34a853', dark: false },
  phonepe: { primary: '#5f259f', secondary: '#a855f7', dark: false },
  default: { primary: '#0b5fff', secondary: '#22d3ee', dark: false }
};

// Main Initialization
document.addEventListener('DOMContentLoaded', async () => {
  // 0. Dynamically generate preset cards from configuration array
  const presets = [
    { id: 'default', name: 'Default Setup', color: '#0b5fff' },
    { id: 'emerald', name: 'EcoSphere (Emerald)', color: '#059669' },
    { id: 'amber', name: 'Vortex (Amber)', color: '#d97706' },
    { id: 'google', name: 'Search (Google)', color: '#1a73e8' },
    { id: 'phonepe', name: 'Pay (PhonePe)', color: '#5f259f' }
  ];

  const presetGrid = document.querySelector('.preset-grid');
  if (presetGrid) {
    presetGrid.innerHTML = '';
    presets.forEach(p => {
      const card = document.createElement('div');
      card.className = 'preset-card';
      card.dataset.preset = p.id;
      card.innerHTML = `
        <span class="preset-dot" style="background-color: ${p.color};"></span>
        <span class="preset-name">${p.name}</span>
      `;
      card.addEventListener('click', () => {
        selectPreset(p.id);
      });
      presetGrid.appendChild(card);
    });
  }

  // 1. Setup collapsible accordions dynamically
  document.querySelectorAll('.accordion-section').forEach((section, idx) => {
    const header = section.querySelector('.accordion-header');
    const content = section.querySelector('.accordion-content');
    if (!header || !content) return;

    header.style.cursor = 'pointer';

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'accordion-collapse-wrapper';

    const innerWrapper = document.createElement('div');
    innerWrapper.style.minHeight = '0';

    // Insert wrapper and move content inside
    header.parentNode.insertBefore(wrapper, content);
    wrapper.appendChild(innerWrapper);
    innerWrapper.appendChild(content);

    // Add chevron
    const chevron = document.createElement('span');
    chevron.className = 'accordion-chevron-wrapper';
    chevron.innerHTML = `
      <svg class="accordion-chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.25s ease;">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    `;
    header.appendChild(chevron);

    // Expand first section by default
    if (idx === 0) {
      section.classList.add('active');
    }

    header.addEventListener('click', (e) => {
      // Prevent toggle if clicking on forms or other interactive nodes inside header
      if (e.target.closest('input, select, button, label')) return;

      const isActive = section.classList.contains('active');
      if (isActive) {
        section.classList.remove('active');
      } else {
        section.classList.add('active');
      }
    });
  });

  // Setup Sub-Section Accordion toggles for Greet Form Cards
  document.querySelectorAll('.form-section-card').forEach(card => {
    const header = card.querySelector('.form-section-header');
    if (!header) return;

    header.addEventListener('click', (e) => {
      if (e.target.closest('input, select, button, label, .color-picker-wrapper')) return;
      card.classList.toggle('active');
    });
  });

  // 2. Setup Sidebar Toggle FAB
  const layout = document.querySelector('.customization-layout');
  const toggleBtn = document.getElementById('sidebar-toggle-btn');
  if (toggleBtn && layout) {
    const toggleText = toggleBtn.querySelector('.sidebar-toggle-text');
    toggleBtn.addEventListener('click', () => {
      const collapsed = layout.classList.toggle('sidebar-collapsed');
      if (collapsed) {
        toggleText.textContent = 'Show Editor';
        toggleBtn.classList.add('collapsed');
      } else {
        toggleText.textContent = 'Hide Editor';
        toggleBtn.classList.remove('collapsed');
      }
    });
  }

  // Viewport Toggles (Desktop vs Mobile)
  const previewArea = document.querySelector('.preview-panel');
  const desktopBtn = document.getElementById('viewport-desktop-btn');
  const mobileBtn = document.getElementById('viewport-mobile-btn');

  if (desktopBtn && mobileBtn && previewArea) {
    desktopBtn.addEventListener('click', () => {
      previewArea.classList.remove('mode-mobile');
      desktopBtn.classList.add('active');
      mobileBtn.classList.remove('active');
      // Set desktop zoom to 100%
      if (typeof window.updatePreviewZoom === 'function') {
        window.updatePreviewZoom(1.0);
      }
      // Re-trigger store update to correctly calculate styles
      updateAlpineStores(window.cutomizationConfig);
    });

    mobileBtn.addEventListener('click', () => {
      previewArea.classList.add('mode-mobile');
      mobileBtn.classList.add('active');
      desktopBtn.classList.remove('active');
      // Set mobile zoom multiplier to 1.0 (auto-fit)
      if (typeof window.updatePreviewZoom === 'function') {
        window.updatePreviewZoom(1.0);
      }
      // Re-trigger store update to correctly calculate styles
      updateAlpineStores(window.cutomizationConfig);
    });
  }

  // Deploy to Test Site Dropdown click listener
  const dropdownTrigger = document.getElementById('btn-live-preview-trigger');
  const dropdownWrapper = document.querySelector('.live-preview-dropdown');
  if (dropdownTrigger && dropdownWrapper) {
    dropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownWrapper.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      dropdownWrapper.classList.remove('active');
    });

    document.querySelectorAll('.live-preview-dropdown .dropdown-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        // Save the currently active editor config to localStorage
        localStorage.setItem('zotly_temp_preview_config', JSON.stringify(window.cutomizationConfig));
        dropdownWrapper.classList.remove('active');
        window.open(item.href, '_blank');
      });
    });
  }

  // 3. Setup Welcome background gradient picker event listeners
  setupWelcomeBgPickerListeners();

  // Setup tab switches
  const tabFormBtn = document.getElementById('tab-form-btn');
  const tabJsonBtn = document.getElementById('tab-json-btn');
  const visualEditorSection = document.getElementById('visual-editor-section');
  const jsonEditorSection = document.getElementById('json-editor-section');

  tabFormBtn.addEventListener('click', () => {
    tabFormBtn.classList.add('active');
    tabJsonBtn.classList.remove('active');
    visualEditorSection.style.display = 'block';
    jsonEditorSection.style.display = 'none';
  });

  tabJsonBtn.addEventListener('click', () => {
    tabJsonBtn.classList.add('active');
    tabFormBtn.classList.remove('active');
    jsonEditorSection.style.display = 'block';
    visualEditorSection.style.display = 'none';
  });

  // Parse preset from URL query parameter (default to 'emerald')
  const urlParams = new URLSearchParams(window.location.search);
  const targetPreset = urlParams.get('preset') || urlParams.get('client') || 'emerald';
  await selectPreset(targetPreset);

  // Boot the chat widget preview
  await bootstrapWidgetPreview();

  // Watch for visual form input changes
  setupFormEventListeners();

  // Watch for raw JSON changes
  setupJsonEditorEventListeners();

  // Setup auxiliary buttons
  document.getElementById('btn-retrigger-greet').addEventListener('click', retriggerGreetCard);
  document.getElementById('btn-format-json').addEventListener('click', formatRawJson);
  document.getElementById('btn-reset-chat').addEventListener('click', restartChatSession);

  // Host Page Theme controls
  setupHostPageThemeControls();

  // Variable to cache the original host website mockup HTML
  let originalHostWebsiteHTML = '';

  // --- TOP TAB NAVIGATION ---
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      tab.classList.add('active');
      const targetTab = document.getElementById(tab.dataset.tab);
      if (targetTab) targetTab.classList.add('active');

      const widgetEmbed = document.getElementById('zotly-widget-embed');
      const previewContent = document.getElementById('preview-scrollable-content');

      // Store original host page content if not already cached
      if (previewContent && !originalHostWebsiteHTML && !previewContent.querySelector('.phone-preview-card-container')) {
        originalHostWebsiteHTML = previewContent.innerHTML;
      }

      if (tab.dataset.tab === 'tab-forms') {
        // Hide chat widget overlay on Forms tab
        if (widgetEmbed) {
          widgetEmbed.style.display = 'none';
        }
        // Render Form preview inside preview area ONLY on forms tab
        if (window.FormsPreview && previewContent) {
          window.FormsPreview.renderPreChatPreview('preview-scrollable-content');
        }
      } else {
        // Show chat widget overlay on all other tabs
        if (widgetEmbed) {
          widgetEmbed.style.display = 'block';
        }
        // Restore normal host website content on all other tabs
        if (previewContent && originalHostWebsiteHTML) {
          previewContent.innerHTML = originalHostWebsiteHTML;
        }
      }
    });
  });

  // --- SAVE CONFIG BUTTON ---
  document.getElementById('btn-save-config')?.addEventListener('click', () => {
    const data = JSON.stringify(window.cutomizationConfig, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${window.cutomizationConfig.clientId || 'widget'}-config.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // --- RESET BUTTON IN HEADER ---
  document.getElementById('btn-reset-chat-header')?.addEventListener('click', restartChatSession);

  // --- RETRIGGER BUTTONS ---
  document.getElementById('btn-retrigger-greet-toolbar')?.addEventListener('click', retriggerGreetCard);

  // --- COPY SNIPPET BUTTON ---
  document.getElementById('btn-copy-snippet')?.addEventListener('click', () => {
    const ta = document.getElementById('code-snippet-text');
    if (ta) {
      ta.select();
      document.execCommand('copy');
      const btn = document.getElementById('btn-copy-snippet');
      const oldText = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = oldText; }, 2000);
    }
  });

  // --- COPY SHARE LINK BUTTON ---
  document.getElementById('btn-copy-share')?.addEventListener('click', () => {
    const inp = document.getElementById('share-link-input');
    if (inp) {
      inp.select();
      document.execCommand('copy');
      const btn = document.getElementById('btn-copy-share');
      const oldText = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = oldText; }, 2000);
    }
  });

  // --- PREVIEW ZOOM & AUTO-RESPONSIVE FIT CONTROLS ---
  let userZoomLevel = 1.0;
  const zoomOutBtn = document.getElementById('btn-zoom-out');
  const zoomInBtn = document.getElementById('btn-zoom-in');
  const zoomText = document.getElementById('zoom-level-text');
  const previewWrapper = document.getElementById('preview-viewport-wrapper');
  const previewContainer = document.querySelector('.preview-viewport-container');

  function calculateAndApplyPreviewScale() {
    if (!previewContainer || !previewWrapper || !previewArea) return;

    const isMobile = previewArea.classList.contains('mode-mobile');

    if (isMobile) {
      // Container available space minus safety padding
      const paddingX = 32;
      const paddingY = 32;

      const containerW = previewContainer.clientWidth - paddingX;
      const containerH = previewContainer.clientHeight - paddingY;

      if (containerW > 0 && containerH > 0) {
        const targetW = 391; // 375px phone + 16px frame border
        const targetH = 736; // 720px phone + 16px frame border

        const scaleX = containerW / targetW;
        const scaleY = containerH / targetH;

        // Auto-fit scale factor for 100% visible mobile phone frame
        const autoFitScale = Math.min(scaleX, scaleY);
        const finalScale = autoFitScale * userZoomLevel;

        previewWrapper.style.zoom = finalScale;
      }
    } else {
      // Desktop View: Container fills 100% preview panel, widget renders crisp at 1:1 scale
      previewWrapper.style.zoom = userZoomLevel;
    }

    if (zoomText) {
      zoomText.textContent = `${Math.round(userZoomLevel * 100)}%`;
    }
  }

  function updateZoom(newZoomMultiplier) {
    if (newZoomMultiplier !== undefined) {
      userZoomLevel = Math.min(2.0, Math.max(0.3, newZoomMultiplier));
    }
    calculateAndApplyPreviewScale();
  }

  window.updatePreviewZoom = updateZoom;

  zoomOutBtn?.addEventListener('click', () => {
    updateZoom(userZoomLevel - 0.1);
  });

  zoomInBtn?.addEventListener('click', () => {
    updateZoom(userZoomLevel + 0.1);
  });

  zoomText?.addEventListener('click', () => {
    updateZoom(1.0); // Reset to 100% auto-fit
  });

  // Watch for preview container size changes (screen resize / sidebar toggle)
  if (previewContainer) {
    const resizeObserver = new ResizeObserver(() => {
      calculateAndApplyPreviewScale();
    });
    resizeObserver.observe(previewContainer);
  }

  window.addEventListener('resize', () => {
    calculateAndApplyPreviewScale();
  });

  // Initial auto-scale calculation
  setTimeout(calculateAndApplyPreviewScale, 100);

  // --- APPLY JSON BUTTON ---
  document.getElementById('btn-apply-json')?.addEventListener('click', () => {
    const ta = document.getElementById('raw-json-textarea');
    if (!ta) return;
    try {
      window.cutomizationConfig = JSON.parse(ta.value);
      syncConfigToVisualForm(window.cutomizationConfig);
      updateAlpineStores(window.cutomizationConfig);
      const js = document.getElementById('json-status');
      if (js) {
        js.className = 'json-status valid';
        js.innerHTML = '✓ JSON changes applied successfully.';
      }
    } catch(e) {
      alert('Invalid JSON: ' + e.message);
    }
  });
});

// Bootstrap modular widget manually
async function bootstrapWidgetPreview() {
  // Override getWidgetBaseUrl to point to modular widget directory
  if (window.ZotlyUtils) {
    window.ZotlyUtils.getWidgetBaseUrl = function() {
      return '../chatwidget_components/';
    };
  }

  // Override ZotlyConfig.fetchClientConfig to return the customization's active config
  window.ZotlyConfig.fetchClientConfig = async function() {
    return {
      bubbleConfig: window.cutomizationConfig.bubble || {},
      chatConfig: window.cutomizationConfig.chatWindow || window.cutomizationConfig.chat || {},
      chatbarConfig: window.cutomizationConfig.chatbar || {},
      greetWindowConfig: window.cutomizationConfig.greetWindow || {}
    };
  };

  // Inject widget embed markup
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'zotly-widget-embed';
  widgetContainer.setAttribute('x-data', '{ openContactWidget: false }');
  widgetContainer.setAttribute('@toggle-contact-widget.window', 'openContactWidget = !openContactWidget; $store.chat.panelOpen = openContactWidget; if (openContactWidget) { $store.chat.unreadCount = 0; }');
  widgetContainer.setAttribute('@close-contact-widget.window', 'openContactWidget = false; $store.chat.panelOpen = false;');

  widgetContainer.innerHTML = window.ZotlyChatWindowHTML + window.ZotlyWelcomeHTML + window.ZotlyBubbleHTML + window.ZotlyChatbarHTML;

  const viewportWrapper = document.getElementById('preview-viewport-wrapper');
  if (viewportWrapper) {
    viewportWrapper.appendChild(widgetContainer);
  } else {
    document.body.appendChild(widgetContainer);
  }

  // Ensure widget container is hidden if starting on Forms tab, otherwise shown
  const isFormsActive = document.querySelector('.nav-tab[data-tab="tab-forms"]')?.classList.contains('active');
  widgetContainer.style.display = isFormsActive ? 'none' : 'block';

  // Initialize Alpine Stores
  if (window.Alpine) {
    await window.ZotlyInitStores();
    updateAlpineStores(window.cutomizationConfig);
    window.Alpine.initTree(widgetContainer);
  } else {
    document.addEventListener('alpine:init', async () => {
      await window.ZotlyInitStores();
      updateAlpineStores(window.cutomizationConfig);
      window.Alpine.initTree(widgetContainer);
    });
  }
}

// Preset Loader
async function selectPreset(presetName) {
  // Update Preset Cards UI
  document.querySelectorAll('.preset-card').forEach(card => {
    card.classList.remove('active');
    if (card.dataset.preset === presetName) {
      card.classList.add('active');
    }
  });

  // Apply Mock Host theme variables based on presets
  const colors = presetColors[presetName] || presetColors['default'];
  document.documentElement.style.setProperty('--primary-color', colors.primary);
  document.documentElement.style.setProperty('--secondary-color', colors.secondary);
  
  // Set host input indicators
  const hostPrimaryInput = document.getElementById('host-primary-color');
  const hostSecondaryInput = document.getElementById('host-secondary-color');
  if (hostPrimaryInput) hostPrimaryInput.value = colors.primary;
  if (hostSecondaryInput) hostSecondaryInput.value = colors.secondary;

  // Fetch JSON config
  try {
    const res = await fetch(`../chatwidget_components/public/clients/${presetName}.json`);
    if (res.ok) {
      window.cutomizationConfig = await res.json();
    } else {
      throw new Error("Failed to load preset json file");
    }
  } catch (err) {
    console.warn("Could not load preset file, using default structure: ", err);
    window.cutomizationConfig = {
      clientId: presetName,
      clientName: "Support Team",
      greetWindow: { enabled: true, title: "Need help?", description: "Chat with us!", useWebsiteTheme: true },
      bubble: { useWebsiteTheme: true, width: 55, height: 55 },
      chatWindow: { useWebsiteTheme: true, clientName: "Support", agentName: "Agent" },
      chatbar: { enabled: false }
    };
  }

  // Update raw JSON textarea
  const jsonTextarea = document.getElementById('raw-json-textarea');
  if (jsonTextarea) {
    jsonTextarea.value = JSON.stringify(window.cutomizationConfig, null, 2);
  }

  // Reset welcome card display tracker for preset load
  window.lastWelcomeEnabled = undefined;

  // Populate Visual Form Controls
  syncConfigToVisualForm(window.cutomizationConfig);

  // Sync to Alpine Stores
  if (window.Alpine) {
    updateAlpineStores(window.cutomizationConfig);
  }

}

// Populate visual controls from active config object
function syncConfigToVisualForm(config) {
  document.querySelectorAll('[data-path]').forEach(input => {
    const path = input.dataset.path;
    let val = getValueByPath(config, path);

    if (val === undefined) {
      // Set empty/default
      if (input.type === 'checkbox') {
        input.checked = false;
      } else {
        input.value = '';
      }
      return;
    }

    // Special presentation for welcome avatars list
    if (path === 'chatWindow.welcome.avatars' && Array.isArray(val)) {
      input.value = val.join(', ');
      return;
    }

    if (input.type === 'checkbox') {
      input.checked = !!val;
    } else if (input.type === 'color') {
      // Sync both color input and text input inside wrapper
      input.value = val;
      const textInput = input.parentElement.querySelector('.color-picker-text');
      if (textInput) textInput.value = val;
    } else if (input.type === 'number') {
      if (val !== undefined && val !== null) {
        const num = parseFloat(val);
        input.value = isNaN(num) ? '' : num;
      } else {
        input.value = '';
      }
    } else {
      input.value = val;
      
      // Update range labels if present
      if (input.type === 'range') {
        const valSpan = input.parentElement.querySelector('.range-val');
        if (valSpan) valSpan.textContent = val + (input.dataset.unit || '');
      }
    }
  });

  // Sync padding-grids
  document.querySelectorAll('.padding-grid[data-padding-path]').forEach(grid => {
    const path = grid.dataset.paddingPath;
    const val = getValueByPath(config, path);
    const parsed = parsePaddingString(val);
    const topInput = grid.querySelector('[data-pad="top"]');
    const rightInput = grid.querySelector('[data-pad="right"]');
    const bottomInput = grid.querySelector('[data-pad="bottom"]');
    const leftInput = grid.querySelector('[data-pad="left"]');
    if (topInput) topInput.value = parsed.top;
    if (rightInput) rightInput.value = parsed.right;
    if (bottomInput) bottomInput.value = parsed.bottom;
    if (leftInput) leftInput.value = parsed.left;
  });

  // Sync welcome card background picker & opacity
  const welcomeBgVal = getValueByPath(config, 'chatWindow.welcome.cardBg');
  const welcomeBgParsed = parseCardBg(welcomeBgVal);
  const bgPick = document.getElementById('welcome-card-bg-color-pick');
  const bgText = document.getElementById('welcome-card-bg-color-text');
  const bgOpacity = document.getElementById('welcome-card-bg-opacity');
  const bgOpacityLabel = document.getElementById('welcome-card-bg-opacity-label');
  if (bgPick) bgPick.value = welcomeBgParsed.color;
  if (bgText) bgText.value = welcomeBgParsed.color;
  if (bgOpacity) {
    bgOpacity.value = welcomeBgParsed.opacity;
    if (bgOpacityLabel) bgOpacityLabel.textContent = Math.round(welcomeBgParsed.opacity * 100) + '%';
  }

  // Sync welcome card border details
  const welcomeBorderVal = getValueByPath(config, 'chatWindow.welcome.cardBorder');
  const welcomeBorderParsed = parseCardBorder(welcomeBorderVal);
  const borderW = document.getElementById('welcome-card-border-width');
  const borderS = document.getElementById('welcome-card-border-style');
  const borderPick = document.getElementById('welcome-card-border-color-pick');
  const borderText = document.getElementById('welcome-card-border-color-text');
  const borderOpacity = document.getElementById('welcome-card-border-opacity');
  const borderOpacityLabel = document.getElementById('welcome-card-border-opacity-label');
  if (borderW) borderW.value = welcomeBorderParsed.width;
  if (borderS) borderS.value = welcomeBorderParsed.style;
  if (borderPick) borderPick.value = welcomeBorderParsed.color;
  if (borderText) borderText.value = welcomeBorderParsed.color;
  if (borderOpacity) {
    borderOpacity.value = welcomeBorderParsed.opacity;
    if (borderOpacityLabel) borderOpacityLabel.textContent = Math.round(welcomeBorderParsed.opacity * 100) + '%';
  }

  // Sync welcome background gradient & solid picker
  const welcomeGradVal = getValueByPath(config, 'chatWindow.welcome.bgGradient');
  if (welcomeGradVal) {
    const welcomeBgParsed = parseBgGradient(welcomeGradVal);
    const typeSelect = document.getElementById('welcome-bg-type');
    const angleInput = document.getElementById('welcome-bg-angle');
    
    const solidPick = document.getElementById('welcome-bg-solid-pick');
    const solidText = document.getElementById('welcome-bg-solid-text');
    
    const startPick = document.getElementById('welcome-bg-grad-start-pick');
    const startText = document.getElementById('welcome-bg-grad-start-text');
    const endPick = document.getElementById('welcome-bg-grad-end-pick');
    const endText = document.getElementById('welcome-bg-grad-end-text');
    
    const hiddenInput = document.getElementById('welcome-bg-gradient-hidden');

    if (hiddenInput) hiddenInput.value = welcomeGradVal;
    if (typeSelect) {
      typeSelect.value = welcomeBgParsed.type;
      
      // Update custom component visibility
      const angleGroup = document.getElementById('welcome-bg-angle-group');
      const solidGroup = document.getElementById('welcome-bg-solid-group');
      const gradGroup = document.getElementById('welcome-bg-gradient-colors');

      if (welcomeBgParsed.type === 'solid') {
        if (angleGroup) angleGroup.style.display = 'none';
        if (solidGroup) solidGroup.style.display = 'block';
        if (gradGroup) gradGroup.style.display = 'none';
        
        if (solidPick) solidPick.value = welcomeBgParsed.color1;
        if (solidText) solidText.value = welcomeBgParsed.color1;
      } else {
        if (angleGroup) angleGroup.style.display = welcomeBgParsed.type === 'linear' ? 'block' : 'none';
        if (solidGroup) solidGroup.style.display = 'none';
        if (gradGroup) gradGroup.style.display = 'flex';
        
        if (angleInput) angleInput.value = welcomeBgParsed.angle;
        if (startPick) startPick.value = welcomeBgParsed.color1;
        if (startText) startText.value = welcomeBgParsed.color1;
        if (endPick) endPick.value = welcomeBgParsed.color2;
        if (endText) endText.value = welcomeBgParsed.color2;
      }
    }
  }

  // Sync bubble gradient stops
  const bubbleGradStops = getValueByPath(config, 'bubble.gradientStops');
  if (bubbleGradStops && Array.isArray(bubbleGradStops)) {
    const bubbleStartPick = document.getElementById('bubble-grad-start-pick');
    const bubbleStartText = document.getElementById('bubble-grad-start-text');
    const bubbleEndPick = document.getElementById('bubble-grad-end-pick');
    const bubbleEndText = document.getElementById('bubble-grad-end-text');
    
    if (bubbleGradStops[0]) {
      const c = bubbleGradStops[0].color;
      if (bubbleStartPick) bubbleStartPick.value = c;
      if (bubbleStartText) bubbleStartText.value = c;
    }
    if (bubbleGradStops[1]) {
      const c = bubbleGradStops[1].color;
      if (bubbleEndPick) bubbleEndPick.value = c;
      if (bubbleEndText) bubbleEndText.value = c;
    }
  }

  // Sync chatbar gradient stops
  const chatbarGradStops = getValueByPath(config, 'chatbar.gradientStops');
  if (chatbarGradStops && Array.isArray(chatbarGradStops)) {
    const chatbarStartPick = document.getElementById('chatbar-grad-start-pick');
    const chatbarStartText = document.getElementById('chatbar-grad-start-text');
    const chatbarEndPick = document.getElementById('chatbar-grad-end-pick');
    const chatbarEndText = document.getElementById('chatbar-grad-end-text');
    
    if (chatbarGradStops[0]) {
      const c = chatbarGradStops[0].color;
      if (chatbarStartPick) chatbarStartPick.value = c;
      if (chatbarStartText) chatbarStartText.value = c;
    }
    if (chatbarGradStops[1]) {
      const c = chatbarGradStops[1].color;
      if (chatbarEndPick) chatbarEndPick.value = c;
      if (chatbarEndText) chatbarEndText.value = c;
    }
  }

  // Sync all shadow-editor-wrapper fields
  document.querySelectorAll('.shadow-editor-wrapper[data-shadow-path]').forEach(wrapper => {
    const path = wrapper.dataset.shadowPath;
    const val = getValueByPath(config, path);
    const parsed = parseShadowColor(val);
    const pickInput = wrapper.querySelector('.shadow-color-pick');
    const textInput = wrapper.querySelector('.shadow-color-text');
    const opacityInput = wrapper.querySelector('.shadow-opacity');
    const opacityLabel = wrapper.querySelector('.shadow-opacity-label');
    
    if (pickInput) pickInput.value = parsed.color;
    if (textInput) textInput.value = parsed.color;
    if (opacityInput) {
      opacityInput.value = parsed.opacity;
      if (opacityLabel) opacityLabel.textContent = Math.round(parsed.opacity * 100) + '%';
    }
  });

  // Sync Launcher Style Segmented Buttons
  const chatbarVal = !!getValueByPath(config, 'chatbar.enabled');
  const chatbarBtn = document.getElementById('launcher-chatbar-btn');
  const bubbleBtn = document.getElementById('launcher-bubble-btn');
  if (chatbarBtn && bubbleBtn) {
    if (chatbarVal) {
      chatbarBtn.classList.add('active');
      bubbleBtn.classList.remove('active');
    } else {
      bubbleBtn.classList.add('active');
      chatbarBtn.classList.remove('active');
    }
  }

  updateColorPickerStates();
  updateDisabledAccordionStates();
}

// Smoothly scroll to the top Theme Synchronization toggle card and flash pulse highlight
function scrollToThemeSyncToggle(target) {
  let topBanner = null;
  if (typeof target === 'string') {
    topBanner = document.querySelector(target);
  } else if (target && target.querySelector) {
    topBanner = target;
  } else {
    topBanner = document.querySelector('.top-theme-banner-card');
  }
  if (topBanner) {
    topBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    topBanner.classList.remove('highlight-pulse');
    void topBanner.offsetWidth; // Force reflow
    topBanner.classList.add('highlight-pulse');
    setTimeout(() => {
      topBanner.classList.remove('highlight-pulse');
    }, 2000);
  }
}

// Disable color inputs and show warning hint text if theme sync is enabled
function updateColorPickerStates() {
  const previewPanel = document.querySelector('.preview-panel');
  const isDark = document.documentElement.classList.contains('dark') || (previewPanel && previewPanel.classList.contains('dark-mode'));

  // Disable/dim a single color control pair and (optionally) its hint
  function applyControlState(pick, text, hint, disabled, bannerSelector) {
    if (!pick && !text) return;
    if (pick) pick.disabled = disabled;
    if (text) text.disabled = disabled;
    const wrapper = (pick && pick.parentElement) || (text && text.parentElement);
    if (wrapper) {
      wrapper.style.opacity = disabled ? '0.4' : '1';
      wrapper.style.pointerEvents = disabled ? 'none' : '';
    }
    if (hint) {
      hint.style.display = disabled ? 'inline-flex' : 'none';
      if (disabled) {
        hint.style.cursor = 'pointer';
        hint.title = 'Click to go to Theme Synchronization toggle';
        hint.onclick = (e) => {
          e.stopPropagation();
          scrollToThemeSyncToggle(bannerSelector || '.top-theme-banner-card');
        };
      } else {
        hint.style.cursor = '';
        hint.title = '';
        hint.onclick = null;
      }
    }
  }

  function findByPath(path) {
    return {
      pick: document.querySelector('input[type="color"][data-path="' + path + '"]'),
      text: document.querySelector('input.color-picker-text[data-path="' + path + '"]')
    };
  }

  function disablePlainControl(el, disabled) {
    if (el) el.disabled = disabled;
  }

  // ---------- Bubble theme sync ----------
  const bubbleUseTheme = document.getElementById('bubble-use-theme');
  if (bubbleUseTheme) {
    const on = bubbleUseTheme.checked;
    const banner = '#bubble-theme-banner';
    applyControlState(document.getElementById('bubble-bg-color-pick'), document.getElementById('bubble-bg-color'), document.getElementById('bubble-bg-color-hint'), on, banner);
    applyControlState(document.getElementById('bubble-grad-start-pick'), document.getElementById('bubble-grad-start-text'), null, on, banner);
    applyControlState(document.getElementById('bubble-grad-end-pick'), document.getElementById('bubble-grad-end-text'), null, on, banner);
    const ringPair = findByPath('bubble.outlineRing.color');
    applyControlState(ringPair.pick, ringPair.text, null, on, banner);
    disablePlainControl(document.querySelector('select[data-path="bubble.gradientType"]'), on);
    disablePlainControl(document.querySelector('input[data-path="bubble.gradientAngle"]'), on);
  }

  // ---------- Chatbar theme sync ----------
  const chatbarUseTheme = document.getElementById('chatbar-use-theme');
  if (chatbarUseTheme) {
    const on = chatbarUseTheme.checked;
    const banner = '#chatbar-theme-banner';
    applyControlState(document.getElementById('chatbar-bg-color-pick'), document.getElementById('chatbar-bg-color'), document.getElementById('chatbar-bg-color-hint'), on, banner);
    applyControlState(document.getElementById('chatbar-grad-start-pick'), document.getElementById('chatbar-grad-start-text'), null, on, banner);
    applyControlState(document.getElementById('chatbar-grad-end-pick'), document.getElementById('chatbar-grad-end-text'), null, on, banner);
    disablePlainControl(document.querySelector('input[data-path="chatbar.gradientEnabled"]'), on);
    disablePlainControl(document.querySelector('select[data-path="chatbar.gradientType"]'), on);
    disablePlainControl(document.querySelector('input[data-path="chatbar.gradientAngle"]'), on);
  }

  // ---------- Greet window theme sync (Icon Color, Submit Button, Button Icon) ----------
  const greetUseTheme = document.getElementById('greet-use-theme');
  if (greetUseTheme) {
    const on = greetUseTheme.checked;
    const banner = '#greet-theme-banner';
    const greetTargets = [
      { pick: document.getElementById('greet-icon-color-pick'), text: document.getElementById('greet-icon-color'), hint: document.getElementById('greet-icon-color-hint') },
      { pick: document.getElementById('greet-ib-btn-pick'), text: document.getElementById('greet-ib-btn'), hint: document.getElementById('greet-ib-btn-hint') },
      { pick: document.getElementById('greet-ib-btnicon-pick'), text: document.getElementById('greet-ib-btnicon'), hint: document.getElementById('greet-ib-btnicon-hint') }
    ];
    greetTargets.forEach(t => {
      if (!t.pick && !t.text) return;
      if (t.pick) t.pick.disabled = on;
      if (t.text) t.text.disabled = on;
      const wrapper = (t.pick && t.pick.parentElement) || (t.text && t.text.parentElement);
      if (wrapper) {
        wrapper.style.opacity = on ? '0.5' : '1';
        wrapper.style.cursor = on ? 'pointer' : 'default';
        wrapper.title = on ? 'Click to go to Theme Synchronization toggle' : '';
        wrapper.onclick = on ? (e) => { e.stopPropagation(); scrollToThemeSyncToggle(banner); } : null;
      }
      if (t.hint) {
        t.hint.style.display = on ? 'inline-flex' : 'none';
        if (on) {
          t.hint.style.cursor = 'pointer';
          t.hint.title = 'Click to go to Theme Synchronization toggle';
          t.hint.onclick = (e) => { e.stopPropagation(); scrollToThemeSyncToggle(banner); };
        } else {
          t.hint.style.cursor = '';
          t.hint.title = '';
          t.hint.onclick = null;
        }
      }
    });
  }

  // ---------- Chat Window theme sync ----------
  const chatUseTheme = document.getElementById('config-use-theme');
  if (chatUseTheme) {
    const on = chatUseTheme.checked;
    const banner = '#config-theme-banner';
    applyControlState(document.getElementById('config-accent-color-pick'), document.getElementById('config-accent-color'), document.getElementById('config-accent-color-hint'), on, banner);

    // Overridden regardless of preview theme (light-mode values are forced)
    const alwaysOverriddenPaths = [
      'chatWindow.visitorBubbleBg', 'chatWindow.visitorBubbleColor',
      'chatWindow.headerBg', 'chatWindow.headerTextColor',
      'chatWindow.headerAvatarBg', 'chatWindow.headerAvatarColor',
      'chatWindow.agentAvatarBg', 'chatWindow.agentAvatarColor',
      'chatWindow.inputFocusBorderColor', 'chatWindow.sendButtonBgActive',
      'chatWindow.poweredByColor', 'chatWindow.endChatConfirmBg',
      'chatWindow.endChatConfirmTextColor'
    ];
    alwaysOverriddenPaths.forEach(path => {
      const pair = findByPath(path);
      applyControlState(pair.pick, pair.text, null, on, banner);
    });

    // Overridden only while the preview host is in dark mode
    const darkOnlyOverriddenPaths = [
      'chatWindow.bodyBg', 'chatWindow.inputBg',
      'chatWindow.agentBubbleBg', 'chatWindow.agentBubbleColor', 'chatWindow.agentBubbleBorderColor',
      'chatWindow.footerBg', 'chatWindow.footerTextColor',
      'chatWindow.inputTextColor', 'chatWindow.inputBorderColor',
      'chatWindow.attachButtonBg', 'chatWindow.attachButtonColor',
      'chatWindow.emojiButtonColor', 'chatWindow.modalCardBg', 'chatWindow.modalMessageColor',
      'chatWindow.endChatCancelBg', 'chatWindow.endChatCancelTextColor', 'chatWindow.endChatCancelBorderColor'
    ];
    const darkOn = on && isDark;
    darkOnlyOverriddenPaths.forEach(path => {
      const pair = findByPath(path);
      applyControlState(pair.pick, pair.text, null, darkOn, banner);
    });
  }

  // ---------- Welcome Dashboard theme sync (bg gradient editor + button icon color) ----------
  const welcomeUseTheme = document.getElementById('welcome-use-theme');
  if (welcomeUseTheme) {
    const on = welcomeUseTheme.checked;
    const banner = '#welcome-theme-banner';

    // The whole background editor (type/angle/colors) feeds welcome.bgGradient which is forced by theme sync
    const bgEditorIds = [
      'welcome-bg-type', 'welcome-bg-angle',
      'welcome-bg-solid-pick', 'welcome-bg-solid-text',
      'welcome-bg-grad-start-pick', 'welcome-bg-grad-start-text',
      'welcome-bg-grad-end-pick', 'welcome-bg-grad-end-text'
    ];
    const hiddenBg = document.getElementById('welcome-bg-gradient-hidden');
    const editorCard = hiddenBg ? hiddenBg.closest('.gradient-editor-card') : null;
    if (editorCard) {
      editorCard.style.opacity = on ? '0.45' : '1';
      editorCard.style.pointerEvents = on ? 'none' : '';
    }
    bgEditorIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.disabled = on;
    });

    const iconPair = findByPath('chatWindow.welcome.buttonIconColor');
    applyControlState(iconPair.pick, iconPair.text, null, on, banner);
  }
}

// Form Event Listeners (Sync form input edits back to config and Alpine)
function setupFormEventListeners() {
  document.querySelectorAll('[data-path]').forEach(input => {
    const handleInput = () => {
      const path = input.dataset.path;
      let val;

      if (input.type === 'checkbox') {
        val = input.checked;
      } else if (input.type === 'number') {
        if (input.value === '') {
          val = undefined;
        } else {
          const num = parseFloat(input.value);
          val = input.dataset.unit ? (num + input.dataset.unit) : num;
        }
      } else if (input.type === 'range') {
        val = parseFloat(input.value);
        // Update slider value labels
        const valSpan = input.parentElement.querySelector('.range-val');
        if (valSpan) valSpan.textContent = val + (input.dataset.unit || '');
      } else {
        val = input.value;
        // Coerce boolean-looking string values from selects to real booleans
        if (val === 'true') val = true;
        else if (val === 'false') val = false;
      }

      // Sync color inputs
      if (input.type === 'color') {
        const textInput = input.parentElement.querySelector('.color-picker-text');
        if (textInput) textInput.value = val;
      }
      if (input.classList.contains('color-picker-text')) {
        const colorInput = input.parentElement.querySelector('input[type="color"]');
        if (colorInput) colorInput.value = val;
      }

      // Update state
      setValueByPath(window.cutomizationConfig, path, val);

      // Update JSON textarea
      const jsonTextarea = document.getElementById('raw-json-textarea');
      if (jsonTextarea) {
        jsonTextarea.value = JSON.stringify(window.cutomizationConfig, null, 2);
      }

      // Update Alpine Stores
      updateAlpineStores(window.cutomizationConfig);
      updateColorPickerStates();
      updateDisabledAccordionStates();
    };

    input.addEventListener('input', handleInput);
    input.addEventListener('change', handleInput);
  });

  // Listen to padding-grids changes
  document.querySelectorAll('.padding-grid[data-padding-path]').forEach(grid => {
    const path = grid.dataset.paddingPath;
    const inputs = grid.querySelectorAll('input');
    const handlePadInput = () => {
      const top = parseFloat(grid.querySelector('[data-pad="top"]')?.value || 0);
      const right = parseFloat(grid.querySelector('[data-pad="right"]')?.value || 0);
      const bottom = parseFloat(grid.querySelector('[data-pad="bottom"]')?.value || 0);
      const left = parseFloat(grid.querySelector('[data-pad="left"]')?.value || 0);
      const formatted = formatPaddingString(top, right, bottom, left);
      
      setValueByPath(window.cutomizationConfig, path, formatted);
      
      // Update JSON textarea
      const jsonTextarea = document.getElementById('raw-json-textarea');
      if (jsonTextarea) {
        jsonTextarea.value = JSON.stringify(window.cutomizationConfig, null, 2);
      }
      
      // Update Alpine Stores
      updateAlpineStores(window.cutomizationConfig);
    };
    inputs.forEach(input => {
      input.addEventListener('input', handlePadInput);
      input.addEventListener('change', handlePadInput);
    });
  });

  // Listen to welcome card background editor changes
  const welcomeCardBgPick = document.getElementById('welcome-card-bg-color-pick');
  const welcomeCardBgText = document.getElementById('welcome-card-bg-color-text');
  const welcomeCardBgOpacity = document.getElementById('welcome-card-bg-opacity');
  const welcomeCardBgOpacityLabel = document.getElementById('welcome-card-bg-opacity-label');

  const handleWelcomeBgChange = () => {
    if (!welcomeCardBgPick || !welcomeCardBgText || !welcomeCardBgOpacity) return;
    const hex = welcomeCardBgText.value;
    // Keep hex color in picker in sync
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      welcomeCardBgPick.value = hex;
    }
    const opacity = parseFloat(welcomeCardBgOpacity.value);
    if (welcomeCardBgOpacityLabel) {
      welcomeCardBgOpacityLabel.textContent = Math.round(opacity * 100) + '%';
    }
    const rgba = formatCardBg(welcomeCardBgPick.value, opacity);
    setValueByPath(window.cutomizationConfig, 'chatWindow.welcome.cardBg', rgba);
    
    // Update JSON textarea
    const jsonTextarea = document.getElementById('raw-json-textarea');
    if (jsonTextarea) {
      jsonTextarea.value = JSON.stringify(window.cutomizationConfig, null, 2);
    }
    updateAlpineStores(window.cutomizationConfig);
  };

  if (welcomeCardBgPick) {
    welcomeCardBgPick.addEventListener('input', () => {
      welcomeCardBgText.value = welcomeCardBgPick.value;
      handleWelcomeBgChange();
    });
  }
  if (welcomeCardBgText) {
    welcomeCardBgText.addEventListener('input', handleWelcomeBgChange);
  }
  if (welcomeCardBgOpacity) {
    welcomeCardBgOpacity.addEventListener('input', handleWelcomeBgChange);
  }

  // Listen to welcome card border editor changes
  const welcomeBorderWidth = document.getElementById('welcome-card-border-width');
  const welcomeBorderStyle = document.getElementById('welcome-card-border-style');
  const welcomeBorderPick = document.getElementById('welcome-card-border-color-pick');
  const welcomeBorderText = document.getElementById('welcome-card-border-color-text');
  const welcomeBorderOpacity = document.getElementById('welcome-card-border-opacity');
  const welcomeBorderOpacityLabel = document.getElementById('welcome-card-border-opacity-label');

  const handleWelcomeBorderChange = () => {
    if (!welcomeBorderWidth || !welcomeBorderStyle || !welcomeBorderPick || !welcomeBorderText || !welcomeBorderOpacity) return;
    const hex = welcomeBorderText.value;
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      welcomeBorderPick.value = hex;
    }
    const opacity = parseFloat(welcomeBorderOpacity.value);
    if (welcomeBorderOpacityLabel) {
      welcomeBorderOpacityLabel.textContent = Math.round(opacity * 100) + '%';
    }
    const borderVal = formatCardBorder(
      parseInt(welcomeBorderWidth.value || 0),
      welcomeBorderStyle.value,
      welcomeBorderPick.value,
      opacity
    );
    setValueByPath(window.cutomizationConfig, 'chatWindow.welcome.cardBorder', borderVal);

    // Update JSON textarea
    const jsonTextarea = document.getElementById('raw-json-textarea');
    if (jsonTextarea) {
      jsonTextarea.value = JSON.stringify(window.cutomizationConfig, null, 2);
    }
    updateAlpineStores(window.cutomizationConfig);
  };

  if (welcomeBorderWidth) welcomeBorderWidth.addEventListener('input', handleWelcomeBorderChange);
  if (welcomeBorderStyle) welcomeBorderStyle.addEventListener('change', handleWelcomeBorderChange);
  if (welcomeBorderPick) {
    welcomeBorderPick.addEventListener('input', () => {
      welcomeBorderText.value = welcomeBorderPick.value;
      handleWelcomeBorderChange();
    });
  }
  if (welcomeBorderText) welcomeBorderText.addEventListener('input', handleWelcomeBorderChange);
  if (welcomeBorderOpacity) welcomeBorderOpacity.addEventListener('input', handleWelcomeBorderChange);

  // Listen to all shadow-editor-wrapper changes
  document.querySelectorAll('.shadow-editor-wrapper[data-shadow-path]').forEach(wrapper => {
    const path = wrapper.dataset.shadowPath;
    const pickInput = wrapper.querySelector('.shadow-color-pick');
    const textInput = wrapper.querySelector('.shadow-color-text');
    const opacityInput = wrapper.querySelector('.shadow-opacity');
    const opacityLabel = wrapper.querySelector('.shadow-opacity-label');
    
    const handleShadowChange = () => {
      if (!pickInput || !textInput || !opacityInput) return;
      const hex = textInput.value;
      if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
        pickInput.value = hex;
      }
      const opacity = parseFloat(opacityInput.value);
      if (opacityLabel) {
        opacityLabel.textContent = Math.round(opacity * 100) + '%';
      }
      
      const currentVal = getValueByPath(window.cutomizationConfig, path) || '';
      const updated = updateShadowColor(currentVal, pickInput.value, opacity);
      setValueByPath(window.cutomizationConfig, path, updated);
      
      // Update JSON textarea
      const jsonTextarea = document.getElementById('raw-json-textarea');
      if (jsonTextarea) {
        jsonTextarea.value = JSON.stringify(window.cutomizationConfig, null, 2);
      }
      updateAlpineStores(window.cutomizationConfig);
    };

    if (pickInput) {
      pickInput.addEventListener('input', () => {
        textInput.value = pickInput.value;
        handleShadowChange();
      });
    }
    if (textInput) {
      textInput.addEventListener('input', handleShadowChange);
    }
    if (opacityInput) {
      opacityInput.addEventListener('input', handleShadowChange);
    }
  });

  // Listen to Launcher Style Segmented Buttons
  const chatbarBtn = document.getElementById('launcher-chatbar-btn');
  const bubbleBtn = document.getElementById('launcher-bubble-btn');
  const hiddenCheckbox = document.getElementById('master-chatbar-enabled');

  if (chatbarBtn && bubbleBtn && hiddenCheckbox) {
    chatbarBtn.addEventListener('click', () => {
      if (hiddenCheckbox.checked !== true) {
        hiddenCheckbox.checked = true;
        // Dispatch change event to trigger form listener and update state
        hiddenCheckbox.dispatchEvent(new Event('change'));
        
        chatbarBtn.classList.add('active');
        bubbleBtn.classList.remove('active');
      }
    });

    bubbleBtn.addEventListener('click', () => {
      if (hiddenCheckbox.checked !== false) {
        hiddenCheckbox.checked = false;
        hiddenCheckbox.dispatchEvent(new Event('change'));

        bubbleBtn.classList.add('active');
        chatbarBtn.classList.remove('active');
      }
    });
  }
}

// JSON Textarea Editor Listeners (Validate and sync raw edits)
function setupJsonEditorEventListeners() {
  const jsonTextarea = document.getElementById('raw-json-textarea');
  const jsonStatus = document.getElementById('json-status');
  
  if (!jsonTextarea || !jsonStatus) return;

  jsonTextarea.addEventListener('input', () => {
    try {
      const parsed = JSON.parse(jsonTextarea.value);
      
      // Mark as valid
      jsonTextarea.classList.remove('invalid');
      jsonStatus.className = 'json-status valid';
      jsonStatus.innerHTML = '✓ Valid JSON config. Live updates active.';
      
      window.cutomizationConfig = parsed;

      // Update Visual Form Inputs without interrupting active focus if possible
      syncConfigToVisualForm(window.cutomizationConfig);

      // Update Alpine Stores
      updateAlpineStores(window.cutomizationConfig);
    } catch (err) {
      // Mark as invalid
      jsonTextarea.classList.add('invalid');
      jsonStatus.className = 'json-status invalid';
      jsonStatus.innerHTML = '✗ Invalid JSON format: ' + err.message;
    }
  });
}

// Dynamic updates of the active Alpine stores
function updateAlpineStores(config) {
  if (!window.Alpine) return;
  const theme = window.ZotlyUtils.getParentTheme();

  // 1. Update Bubble Trigger Store
  if (Alpine.store('bubble') && config.bubble) {
    let bubbleConfig = JSON.parse(JSON.stringify(config.bubble));
    if (bubbleConfig.useWebsiteTheme === true) {
      bubbleConfig.backgroundColor = theme.primary;
      bubbleConfig.gradientType = 'none';
      if (bubbleConfig.outlineRing) { bubbleConfig.outlineRing.color = theme.secondary; }
    }
    Object.assign(Alpine.store('bubble'), bubbleConfig);
  }

  // 2. Update Greet Window Store
  if (Alpine.store('greetWindow') && config.greetWindow) {
    let greetWindowConfig = JSON.parse(JSON.stringify(config.greetWindow));
    if (greetWindowConfig.inputBox) {
      greetWindowConfig.inputBox = { ...Alpine.store('greetWindow').inputBox, ...greetWindowConfig.inputBox };
      // Always force input box to be visible in customization mode
      greetWindowConfig.inputBox.visible = true;
    }
    
    // Always force greet card to be visible and active in customization mode
    greetWindowConfig.visible = true;
    greetWindowConfig.dismissed = false;
    
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

  // 3. Update Chatbar Store
  if (Alpine.store('chatbar') && config.chatbar) {
    let chatbarConfig = JSON.parse(JSON.stringify(config.chatbar));
    
    // Copy the correct offset fields to offsetRight and offsetBottom dynamically
    if (chatbarConfig.layout === 'card') {
      if (chatbarConfig.cardOffsetRight !== undefined && chatbarConfig.cardOffsetRight !== null && chatbarConfig.cardOffsetRight !== '') {
        chatbarConfig.offsetRight = chatbarConfig.cardOffsetRight;
      }
      if (chatbarConfig.cardOffsetBottom !== undefined && chatbarConfig.cardOffsetBottom !== null && chatbarConfig.cardOffsetBottom !== '') {
        chatbarConfig.offsetBottom = chatbarConfig.cardOffsetBottom;
      }
    } else {
      if (chatbarConfig.barOffsetRight !== undefined && chatbarConfig.barOffsetRight !== null && chatbarConfig.barOffsetRight !== '') {
        chatbarConfig.offsetRight = chatbarConfig.barOffsetRight;
      }
      if (chatbarConfig.barOffsetBottom !== undefined && chatbarConfig.barOffsetBottom !== null && chatbarConfig.barOffsetBottom !== '') {
        chatbarConfig.offsetBottom = chatbarConfig.barOffsetBottom;
      }
    }

    Object.assign(Alpine.store('chatbar'), chatbarConfig);
  }

  // 4. Update Chat Window & Welcome Store
  if (Alpine.store('chatWindow') && config.chatWindow) {
    let chatConfig = JSON.parse(JSON.stringify(config.chatWindow));
    const isDark = document.documentElement.classList.contains('dark') || document.querySelector('.preview-panel').classList.contains('dark-mode');

    if (chatConfig.useWebsiteTheme === true) {
      chatConfig.accentColor = theme.primary;
      chatConfig.visitorBubbleBg = theme.primary;
      chatConfig.visitorBubbleColor = '#ffffff';
      chatConfig.headerBg = theme.primary;
      chatConfig.headerTextColor = '#ffffff';
      chatConfig.headerAvatarBg = 'rgba(255,255,255,0.2)';
      chatConfig.headerAvatarColor = '#ffffff';
      chatConfig.agentAvatarBg = theme.primary;
      chatConfig.agentAvatarColor = '#ffffff';
      chatConfig.inputFocusBorderColor = theme.primary;
      chatConfig.inputFocusShadow = `0 0 0 2px ${theme.primary}26`;
      chatConfig.sendButtonBgActive = theme.primary;
      chatConfig.poweredByColor = theme.primary;
      chatConfig.endChatConfirmBg = theme.primary;
      chatConfig.endChatConfirmTextColor = '#ffffff';

      if (isDark) {
        chatConfig.bodyBg = 'var(--cw-bg)';
        chatConfig.inputBg = 'var(--cw-surface)';
        chatConfig.agentBubbleBg = 'var(--cw-surface)';
        chatConfig.agentBubbleColor = 'var(--cw-ink)';
        chatConfig.agentBubbleBorderColor = 'var(--cw-border)';
        chatConfig.footerBg = 'var(--cw-bg)';
        chatConfig.footerTextColor = 'var(--cw-muted)';
        chatConfig.inputTextColor = 'var(--cw-ink)';
        chatConfig.inputBorderColor = 'var(--cw-border)';
        chatConfig.attachButtonBg = 'var(--cw-surface)';
        chatConfig.attachButtonColor = 'var(--cw-muted)';
        chatConfig.emojiButtonColor = 'var(--cw-muted)';
        chatConfig.modalCardBg = 'var(--cw-surface)';
        chatConfig.modalMessageColor = 'var(--cw-ink)';
        chatConfig.endChatCancelBg = 'var(--cw-surface)';
        chatConfig.endChatCancelTextColor = 'var(--cw-muted)';
        chatConfig.endChatCancelBorderColor = 'var(--cw-border)';
      }
    }

    const welcomeObj = chatConfig.welcome || Alpine.store('chatWindow').welcome;
    if (welcomeObj) {
      const welcomeUseTheme = welcomeObj.useWebsiteTheme !== undefined ? welcomeObj.useWebsiteTheme : chatConfig.useWebsiteTheme;
      if (welcomeUseTheme === true) {
        const secondaryColor = (theme.secondary && theme.secondary !== theme.primary) ? theme.secondary : theme.primary;
        welcomeObj.bgGradient = `linear-gradient(135deg, ${theme.primary}, ${secondaryColor})`;
        welcomeObj.buttonIconColor = theme.primary;
        chatConfig.welcome = welcomeObj;
      }
    }

    if (isDark && chatConfig.dark && Object.keys(chatConfig.dark).length > 0) {
      Object.assign(chatConfig, chatConfig.dark);
    }

    Object.assign(Alpine.store('chatWindow'), chatConfig);
    if (Alpine.store('chatcontactv2')) {
      Object.assign(Alpine.store('chatcontactv2'), chatConfig);
    }

    // Sync Chat general info
    const chatStore = Alpine.store('chat');
    if (chatStore) {
      if (chatConfig.clientName) chatStore.clientName = chatConfig.clientName;
      if (chatConfig.agentName) {
        chatStore.agentName = chatConfig.agentName;
        if (chatStore.messages && chatStore.messages[0]) { chatStore.messages[0].senderName = chatConfig.agentName; }
      }
      
      // Dynamically switch active view to welcome or active based on checkbox toggle if user hasn't sent messages
      if (!chatStore.hasSentMessage && chatConfig.welcome) {
        const targetState = (chatConfig.welcome.enabled === true) ? 'welcome' : 'active';
        if (window.lastWelcomeEnabled === undefined) {
          window.lastWelcomeEnabled = chatConfig.welcome.enabled;
          chatStore.state = targetState;
        } else if (window.lastWelcomeEnabled !== chatConfig.welcome.enabled) {
          window.lastWelcomeEnabled = chatConfig.welcome.enabled;
          chatStore.state = targetState;
        }
      }
    }
  }
}

// Retrigger entrance transition for greeting card
function retriggerGreetCard() {
  if (!window.Alpine) return;
  const greetStore = Alpine.store('greetWindow');
  if (greetStore) {
    greetStore.visible = false;
    greetStore.dismissed = false;
    if (greetStore.inputBox) {
      greetStore.inputBox.visible = false;
    }
    
    // Briefly wait and turn visible
    setTimeout(() => {
      greetStore.visible = true;
      if (greetStore.inputBox && greetStore.inputBox.enabled) {
        setTimeout(() => {
          greetStore.inputBox.visible = true;
        }, 1000);
      }
    }, 200);
  }
}

// Reset/restart conversation session simulation
function restartChatSession() {
  if (!window.Alpine) return;
  const chatStore = Alpine.store('chat');
  if (chatStore) {
    chatStore.state = window.cutomizationConfig.chatWindow?.welcome?.enabled ? 'welcome' : 'active';
    chatStore.hasSentMessage = false;
    chatStore.panelOpen = false;
    chatStore.messages = [
      { key: 'm1', senderType: 'AGENT', senderName: window.cutomizationConfig.chatWindow?.agentName || 'Sarah', body: 'Hi! How can I help you today?', created: new Date(Date.now() - 300000).toISOString() },
      { key: 'm2', senderType: 'VISITOR', body: 'I need help with my order', created: new Date(Date.now() - 240000).toISOString(), status: 'read' }
    ];
    window.dispatchEvent(new CustomEvent('close-contact-widget'));
    retriggerGreetCard();
  }
}

// Format the code in JSON Textarea editor
function formatRawJson() {
  const jsonTextarea = document.getElementById('raw-json-textarea');
  if (!jsonTextarea) return;
  try {
    const formatted = JSON.stringify(JSON.parse(jsonTextarea.value), null, 2);
    jsonTextarea.value = formatted;
  } catch (e) {
    alert("Cannot format. Please fix the JSON syntax first.");
  }
}

// Setup inputs for `--primary-color` and `--secondary-color` on Host website mockup
function setupHostPageThemeControls() {
  const hostPrimaryInput = document.getElementById('host-primary-color');
  const hostSecondaryInput = document.getElementById('host-secondary-color');
  const previewArea = document.querySelector('.preview-panel');
  const hostDarkModeToggle = document.getElementById('host-dark-mode');

  const updateHostColors = () => {
    if (hostPrimaryInput) document.documentElement.style.setProperty('--primary-color', hostPrimaryInput.value);
    if (hostSecondaryInput) document.documentElement.style.setProperty('--secondary-color', hostSecondaryInput.value);
    
    // Re-evaluate theme and update Alpine stores
    updateAlpineStores(window.cutomizationConfig);
    updateColorPickerStates();
  };

  if (hostPrimaryInput) {
    hostPrimaryInput.addEventListener('input', updateHostColors);
    hostPrimaryInput.addEventListener('change', updateHostColors);
  }
  if (hostSecondaryInput) {
    hostSecondaryInput.addEventListener('input', updateHostColors);
    hostSecondaryInput.addEventListener('change', updateHostColors);
  }

  // Dark Mode Toggle inside Mock Page
  if (hostDarkModeToggle) {
    hostDarkModeToggle.addEventListener('change', () => {
      if (hostDarkModeToggle.checked) {
        previewArea.classList.add('dark-mode');
      } else {
        previewArea.classList.remove('dark-mode');
      }
      // Notify widget stores about background mode change
      updateAlpineStores(window.cutomizationConfig);
      updateColorPickerStates();
    });
  }
}

// Custom handler for visual color-picker stops updating bubble/chatbar configuration arrays
window.setGradientStop = function(section, index, color) {
  if (!window.cutomizationConfig[section]) {
    window.cutomizationConfig[section] = {};
  }
  if (!window.cutomizationConfig[section].gradientStops) {
    window.cutomizationConfig[section].gradientStops = [
      { color: '#0b5fff', pos: 0 },
      { color: '#22D3EE', pos: 100 }
    ];
  }
  if (window.cutomizationConfig[section].gradientStops[index]) {
    window.cutomizationConfig[section].gradientStops[index].color = color;
  }
  
  // Keep the UI color inputs and text boxes in sync
  const suffix = index === 0 ? 'start' : 'end';
  const pickEl = document.getElementById(`${section}-grad-${suffix}-pick`);
  const textEl = document.getElementById(`${section}-grad-${suffix}-text`);
  if (pickEl) pickEl.value = color;
  if (textEl) textEl.value = color;

  // Sync to JSON editor
  const jsonTextarea = document.getElementById('raw-json-textarea');
  if (jsonTextarea) {
    jsonTextarea.value = JSON.stringify(window.cutomizationConfig, null, 2);
  }
  
  // Update Alpine
  updateAlpineStores(window.cutomizationConfig);
};

// Toggle media field groups (Lucide vs Custom Image vs SVG) dynamically
function updateGreetMediaFieldsVisibility() {
  const mediaSelect = document.getElementById('greet-media-type-select') || document.querySelector('[data-path="greetWindow.iconType"]');
  if (!mediaSelect) return;
  const currentType = mediaSelect.value || 'lucide';

  const lucideGroup = document.querySelector('.media-group-lucide');
  const imageGroup = document.querySelector('.media-group-image');
  const svgGroup = document.querySelector('.media-group-customSvg');

  if (lucideGroup) lucideGroup.style.display = (currentType === 'lucide') ? 'flex' : 'none';
  if (imageGroup) imageGroup.style.display = (currentType === 'image') ? 'flex' : 'none';
  if (svgGroup) svgGroup.style.display = (currentType === 'customSvg') ? 'flex' : 'none';
}

// Enable/Disable Accordion sections dynamically based on toggles
function updateDisabledAccordionStates() {
  const config = window.cutomizationConfig;
  if (!config) return;

  // Update Greet Card header media visibility (Icon vs Custom Image vs SVG)
  updateGreetMediaFieldsVisibility();

  // 1. Greet Card Popup (Section 2) -> Enabled if greetWindow.enabled is true
  const greetEnabled = !!getValueByPath(config, 'greetWindow.enabled');
  const greetSection = document.getElementById('accordion-greet-card');
  if (greetSection) {
    if (greetEnabled) {
      greetSection.classList.remove('disabled');
    } else {
      greetSection.classList.add('disabled');
      greetSection.classList.remove('active'); // Close if active
    }
  }

  // 2. Greet Card Quick Input Box (sub-section inside Section 2) -> Enabled if greetWindow.inputBox.enabled is true
  const greetInputEnabled = !!getValueByPath(config, 'greetWindow.inputBox.enabled');
  const greetInputSub = document.getElementById('sub-section-greet-input');
  if (greetInputSub) {
    if (greetInputEnabled) {
      greetInputSub.classList.remove('disabled');
    } else {
      greetInputSub.classList.add('disabled');
    }
  }

  // 3. Chatbar Trigger (Section 4) vs Bubble Trigger (Section 3)
  // - If chatbar.enabled is true: Chatbar trigger is enabled, Bubble trigger is disabled.
  // - If chatbar.enabled is false: Bubble trigger is enabled, Chatbar trigger is disabled.
  const chatbarEnabled = !!getValueByPath(config, 'chatbar.enabled');
  const chatbarSection = document.getElementById('accordion-chatbar-trigger');
  const bubbleSection = document.getElementById('accordion-bubble-trigger');

  if (chatbarSection) {
    if (chatbarEnabled) {
      chatbarSection.classList.remove('disabled');
    } else {
      chatbarSection.classList.add('disabled');
      chatbarSection.classList.remove('active');
    }
  }

  if (bubbleSection) {
    if (!chatbarEnabled) {
      bubbleSection.classList.remove('disabled');
    } else {
      bubbleSection.classList.add('disabled');
      bubbleSection.classList.remove('active');
    }
  }

  // 4. Welcome Dashboard (Section 6) -> Enabled if chatWindow.welcome.enabled is true
  const welcomeEnabled = !!getValueByPath(config, 'chatWindow.welcome.enabled');
  const welcomeSection = document.getElementById('accordion-welcome-dashboard');
  if (welcomeSection) {
    if (welcomeEnabled) {
      welcomeSection.classList.remove('disabled');
    } else {
      welcomeSection.classList.add('disabled');
      welcomeSection.classList.remove('active');
    }
  }

  // 5. Dynamic Launcher Offsets toggling
  const bubbleOffsets = document.getElementById('layout-bubble-offsets');
  const chatbarOffsets = document.getElementById('layout-chatbar-offsets');
  if (bubbleOffsets && chatbarOffsets) {
    if (chatbarEnabled) {
      chatbarOffsets.style.display = 'block';
      bubbleOffsets.style.display = 'none';
    } else {
      bubbleOffsets.style.display = 'block';
      chatbarOffsets.style.display = 'none';
    }
  }
}

/* ==========================================================================
   FORMS COMPONENT & PREVIEW INTERACTIVITY
   ========================================================================== */

// Helper to toggle form section accordion cards
function toggleFormSectionCard(cardId) {
  const card = document.getElementById(cardId);
  if (card) {
    card.classList.toggle('active');
  }
}

// Global initialization for imported forms component
async function loadAndInitFormsComponent() {
  const formsContainer = document.getElementById('tab-forms');
  if (!formsContainer) return;

  // Try to dynamically fetch forms.html if data-include is present
  const includeFile = formsContainer.getAttribute('data-include');
  if (includeFile) {
    try {
      const response = await fetch(includeFile);
      if (response.ok) {
        formsContainer.innerHTML = await response.text();
      }
    } catch (err) {
      console.log('Using pre-rendered/embedded forms template fallback:', err);
    }
  }

  const isFormsTabActive = () => {
    return document.querySelector('.nav-tab[data-tab="tab-forms"]')?.classList.contains('active');
  };

  // Bind character counters & live preview
  const headingInput = document.getElementById('ticket-form-heading-input');
  const headingCounter = document.getElementById('heading-char-count');
  const subheadingInput = document.getElementById('ticket-form-subheading-input');
  const subheadingCounter = document.getElementById('subheading-char-count');

  const triggerTicketPreview = () => {
    if (isFormsTabActive() && window.FormsPreview) {
      window.FormsPreview.renderTicketPreview('preview-scrollable-content', headingInput?.value, subheadingInput?.value);
    }
  };

  if (headingInput && headingCounter) {
    const updateHeadingCount = () => {
      headingCounter.textContent = `${headingInput.value.length}/65`;
      triggerTicketPreview();
    };
    headingInput.addEventListener('input', updateHeadingCount);
    headingInput.addEventListener('focus', triggerTicketPreview);
    updateHeadingCount();
  }

  if (subheadingInput && subheadingCounter) {
    const updateSubheadingCount = () => {
      subheadingCounter.textContent = `${subheadingInput.value.length}/65`;
      triggerTicketPreview();
    };
    subheadingInput.addEventListener('input', updateSubheadingCount);
    subheadingInput.addEventListener('focus', triggerTicketPreview);
    updateSubheadingCount();
  }

  // Post chat form toggle select visibility & preview trigger
  const postchatToggle = document.getElementById('postchat-form-toggle');
  const postchatSelectContainer = document.getElementById('postchat-select-container');
  if (postchatToggle && postchatSelectContainer) {
    postchatToggle.addEventListener('change', () => {
      postchatSelectContainer.style.display = postchatToggle.checked ? 'block' : 'none';
      if (isFormsTabActive() && postchatToggle.checked && window.FormsPreview) {
        window.FormsPreview.renderPostChatPreview('preview-scrollable-content');
      }
    });
  }

  // Pre chat form toggle select visibility & preview trigger
  const prechatToggle = document.getElementById('prechat-form-toggle');
  const prechatSelectContainer = document.getElementById('prechat-select-container');
  if (prechatToggle && prechatSelectContainer) {
    prechatToggle.addEventListener('change', () => {
      prechatSelectContainer.style.opacity = prechatToggle.checked ? '1' : '0.5';
      prechatSelectContainer.style.pointerEvents = prechatToggle.checked ? 'auto' : 'none';
      if (isFormsTabActive() && prechatToggle.checked && window.FormsPreview) {
        window.FormsPreview.renderPreChatPreview('preview-scrollable-content');
      }
    });
  }

  // Initial render if forms tab is active on page load
  if (isFormsTabActive() && window.FormsPreview) {
    const widgetEmbed = document.getElementById('zotly-widget-embed');
    if (widgetEmbed) widgetEmbed.style.display = 'none';
    window.FormsPreview.renderPreChatPreview('preview-scrollable-content');
  }

  // Form builder modal logic
  const modal = document.getElementById('modal-form-builder');
  const btnOpen = document.getElementById('btn-open-form-builder');
  const btnClose = document.getElementById('btn-close-form-builder');
  const btnCancel = document.getElementById('btn-cancel-form-builder');
  const btnSave = document.getElementById('btn-save-custom-form');

  if (modal) {
    const closeModal = () => { modal.style.display = 'none'; };
    if (btnOpen) btnOpen.addEventListener('click', () => { modal.style.display = 'flex'; });
    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (btnCancel) btnCancel.addEventListener('click', closeModal);
    if (btnSave) {
      btnSave.addEventListener('click', () => {
        const formName = document.getElementById('new-form-name')?.value || 'Custom Form';
        const prechatSelect = document.getElementById('prechat-form-select');
        if (prechatSelect) {
          const opt = document.createElement('option');
          opt.value = `custom-${Date.now()}`;
          opt.textContent = formName;
          opt.selected = true;
          prechatSelect.appendChild(opt);
        }
        closeModal();
        alert(`Form "${formName}" created and assigned to Pre-chat selection!`);
      });
    }
  }
}

// Run loader on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  loadAndInitFormsComponent();
});

