const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../chatwidget_components_lit/public/style.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

const tsContent = `import { unsafeCSS } from 'lit';

export const GLOBAL_STYLES = unsafeCSS(${JSON.stringify(cssContent)});
`;

const outPath = path.join(__dirname, '../chatwidget_components_lit/tokens/global-styles.ts');
fs.writeFileSync(outPath, tsContent, 'utf8');
console.log('Successfully generated tokens/global-styles.ts with size:', tsContent.length);
