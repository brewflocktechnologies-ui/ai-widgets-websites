/* ==========================================================================
   WIDGET BUILDER MAIN JS LOGIC
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

// Global Builder State
window.builderConfig = {};
const presetColors = {
  emerald: { primary: '#059669', secondary: '#0d9488', dark: false },
  amber: { primary: '#d97706', secondary: '#b45309', dark: false },
  google: { primary: '#1a73e8', secondary: '#34a853', dark: false },
  phonepe: { primary: '#5f259f', secondary: '#a855f7', dark: false },
  default: { primary: '#0b5fff', secondary: '#22d3ee', dark: false }
};

// Main Initialization
document.addEventListener('DOMContentLoaded', async () => {


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

  // Load default preset (Emerald)
  await selectPreset('emerald');

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
});

// Bootstrap modular widget manually
async function bootstrapWidgetPreview() {
  // Override getWidgetBaseUrl to point to modular widget directory
  if (window.ZotlyUtils) {
    window.ZotlyUtils.getWidgetBaseUrl = function() {
      return '../chatwidget_modular/';
    };
  }

  // Override ZotlyConfig.fetchClientConfig to return the builder's active config
  window.ZotlyConfig.fetchClientConfig = async function() {
    return {
      bubbleConfig: window.builderConfig.bubble || {},
      chatConfig: window.builderConfig.chatWindow || window.builderConfig.chat || {},
      chatbarConfig: window.builderConfig.chatbar || {},
      greetWindowConfig: window.builderConfig.greetWindow || {}
    };
  };

  // Inject widget embed markup
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'zotly-widget-embed';
  widgetContainer.setAttribute('x-data', '{ openContactWidget: false }');
  widgetContainer.setAttribute('@toggle-contact-widget.window', 'openContactWidget = !openContactWidget; $store.chat.panelOpen = openContactWidget; if (openContactWidget) { $store.chat.unreadCount = 0; }');
  widgetContainer.setAttribute('@close-contact-widget.window', 'openContactWidget = false; $store.chat.panelOpen = false;');

  widgetContainer.innerHTML = window.ZotlyChatWindowHTML + window.ZotlyWelcomeHTML + window.ZotlyBubbleHTML + window.ZotlyChatbarHTML;
  
  document.body.appendChild(widgetContainer);

  // Initialize Alpine Stores
  if (window.Alpine) {
    await window.ZotlyInitStores();
    updateAlpineStores(window.builderConfig);
    window.Alpine.initTree(widgetContainer);
  } else {
    document.addEventListener('alpine:init', async () => {
      await window.ZotlyInitStores();
      updateAlpineStores(window.builderConfig);
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
    const res = await fetch(`../chatwidget_modular/public/clients/${presetName}.json`);
    if (res.ok) {
      window.builderConfig = await res.json();
    } else {
      throw new Error("Failed to load preset json file");
    }
  } catch (err) {
    console.warn("Could not load preset file, using default structure: ", err);
    window.builderConfig = {
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
    jsonTextarea.value = JSON.stringify(window.builderConfig, null, 2);
  }

  // Populate Visual Form Controls
  syncConfigToVisualForm(window.builderConfig);

  // Sync to Alpine Stores
  if (window.Alpine) {
    updateAlpineStores(window.builderConfig);
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

  updateColorPickerStates();
}

// Disable color inputs and show warning hint text if theme sync is enabled
function updateColorPickerStates() {
  const pairs = [
    {
      checkbox: document.getElementById('config-use-theme'),
      colorPick: document.getElementById('config-accent-color-pick'),
      colorText: document.getElementById('config-accent-color'),
      hint: document.getElementById('config-accent-color-hint')
    },
    {
      checkbox: document.getElementById('bubble-use-theme'),
      colorPick: document.getElementById('bubble-bg-color-pick'),
      colorText: document.getElementById('bubble-bg-color'),
      hint: document.getElementById('bubble-bg-color-hint')
    },
    {
      checkbox: document.getElementById('chatbar-use-theme'),
      colorPick: document.getElementById('chatbar-bg-color-pick'),
      colorText: document.getElementById('chatbar-bg-color'),
      hint: document.getElementById('chatbar-bg-color-hint')
    },
    {
      checkbox: document.getElementById('greet-use-theme'),
      colorPick: document.getElementById('greet-bg-color-pick'),
      colorText: document.getElementById('greet-bg-color'),
      hint: document.getElementById('greet-bg-color-hint')
    }
  ];

  pairs.forEach(p => {
    if (!p.checkbox || !p.colorPick || !p.colorText) return;
    const isChecked = p.checkbox.checked;
    p.colorPick.disabled = isChecked;
    p.colorText.disabled = isChecked;
    
    // Dim the color picker wrapper container to show disabled state
    const wrapper = p.colorPick.parentElement;
    if (wrapper) {
      if (isChecked) {
        wrapper.style.opacity = '0.4';
        wrapper.style.pointerEvents = 'none';
      } else {
        wrapper.style.opacity = '1';
        wrapper.style.pointerEvents = 'auto';
      }
    }
    
    if (p.hint) {
      p.hint.style.display = isChecked ? 'block' : 'none';
    }
  });
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
        val = input.value === '' ? undefined : parseFloat(input.value);
      } else if (input.type === 'range') {
        val = parseFloat(input.value);
        // Update slider value labels
        const valSpan = input.parentElement.querySelector('.range-val');
        if (valSpan) valSpan.textContent = val + (input.dataset.unit || '');
      } else {
        val = input.value;
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
      setValueByPath(window.builderConfig, path, val);

      // Update JSON textarea
      const jsonTextarea = document.getElementById('raw-json-textarea');
      if (jsonTextarea) {
        jsonTextarea.value = JSON.stringify(window.builderConfig, null, 2);
      }

      // Update Alpine Stores
      updateAlpineStores(window.builderConfig);
      updateColorPickerStates();
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
      
      setValueByPath(window.builderConfig, path, formatted);
      
      // Update JSON textarea
      const jsonTextarea = document.getElementById('raw-json-textarea');
      if (jsonTextarea) {
        jsonTextarea.value = JSON.stringify(window.builderConfig, null, 2);
      }
      
      // Update Alpine Stores
      updateAlpineStores(window.builderConfig);
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
    setValueByPath(window.builderConfig, 'chatWindow.welcome.cardBg', rgba);
    
    // Update JSON textarea
    const jsonTextarea = document.getElementById('raw-json-textarea');
    if (jsonTextarea) {
      jsonTextarea.value = JSON.stringify(window.builderConfig, null, 2);
    }
    updateAlpineStores(window.builderConfig);
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
    setValueByPath(window.builderConfig, 'chatWindow.welcome.cardBorder', borderVal);

    // Update JSON textarea
    const jsonTextarea = document.getElementById('raw-json-textarea');
    if (jsonTextarea) {
      jsonTextarea.value = JSON.stringify(window.builderConfig, null, 2);
    }
    updateAlpineStores(window.builderConfig);
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
      
      window.builderConfig = parsed;

      // Update Visual Form Inputs without interrupting active focus if possible
      syncConfigToVisualForm(window.builderConfig);

      // Update Alpine Stores
      updateAlpineStores(window.builderConfig);
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
      // Always force input box to be visible in builder mode
      greetWindowConfig.inputBox.visible = true;
    }
    
    // Always force greet card to be visible and active in builder mode
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
    Object.assign(Alpine.store('chatbar'), chatbarConfig);
  }

  // 4. Update Chat Window & Welcome Store
  if (Alpine.store('chatWindow') && config.chatWindow) {
    let chatConfig = JSON.parse(JSON.stringify(config.chatWindow));
    const isDark = document.documentElement.classList.contains('dark') || document.querySelector('.preview-area').classList.contains('dark-mode');

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
        chatStore.state = (chatConfig.welcome.enabled === true) ? 'welcome' : 'active';
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
    chatStore.state = window.builderConfig.chatWindow?.welcome?.enabled ? 'welcome' : 'active';
    chatStore.hasSentMessage = false;
    chatStore.panelOpen = false;
    chatStore.messages = [
      { key: 'm1', senderType: 'AGENT', senderName: window.builderConfig.chatWindow?.agentName || 'Sarah', body: 'Hi! How can I help you today?', created: new Date(Date.now() - 300000).toISOString() },
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
  const previewArea = document.querySelector('.preview-area');
  const hostDarkModeToggle = document.getElementById('host-dark-mode');

  const updateHostColors = () => {
    if (hostPrimaryInput) document.documentElement.style.setProperty('--primary-color', hostPrimaryInput.value);
    if (hostSecondaryInput) document.documentElement.style.setProperty('--secondary-color', hostSecondaryInput.value);
    
    // Re-evaluate theme and update Alpine stores
    updateAlpineStores(window.builderConfig);
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
      updateAlpineStores(window.builderConfig);
    });
  }
}

// Custom handler for visual color-picker stops updating bubble/chatbar configuration arrays
window.setGradientStop = function(section, index, color) {
  if (!window.builderConfig[section]) {
    window.builderConfig[section] = {};
  }
  if (!window.builderConfig[section].gradientStops) {
    window.builderConfig[section].gradientStops = [
      { color: '#0b5fff', pos: 0 },
      { color: '#22D3EE', pos: 100 }
    ];
  }
  if (window.builderConfig[section].gradientStops[index]) {
    window.builderConfig[section].gradientStops[index].color = color;
  }
  
  // Sync to JSON editor
  const jsonTextarea = document.getElementById('raw-json-textarea');
  if (jsonTextarea) {
    jsonTextarea.value = JSON.stringify(window.builderConfig, null, 2);
  }
  
  // Update Alpine
  updateAlpineStores(window.builderConfig);
};
