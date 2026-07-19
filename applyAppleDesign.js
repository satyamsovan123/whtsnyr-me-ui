const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'styles.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const appleStyles = `
/* --- Apple-Like Design System --- */
.glass-panel {
  border-radius: 24px !important;
  padding: 1.5rem !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05) !important;
  border: 1px solid rgba(150, 150, 150, 0.1) !important;
}

.glass-panel h3, .glass-panel h4, .glass-panel h5, .glass-panel h6 {
  margin-bottom: 1.25rem !important;
}

.list-group-item, .restaurant-card, .tip-card, .apple-inner-card {
  border-radius: 16px !important;
  padding: 1rem !important;
  margin-bottom: 0.75rem !important;
  background-color: rgba(0, 0, 0, 0.02) !important;
  border: none !important;
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.25s ease !important;
}

[data-theme="dark"] .list-group-item, 
[data-theme="dark"] .restaurant-card, 
[data-theme="dark"] .tip-card, 
[data-theme="dark"] .apple-inner-card {
  background-color: rgba(255, 255, 255, 0.05) !important;
}

.list-group-item:hover, .restaurant-card:hover, .tip-card:hover, .apple-inner-card:hover {
  transform: scale(1.02) !important;
  background-color: rgba(0, 0, 0, 0.04) !important;
}

[data-theme="dark"] .list-group-item:hover, 
[data-theme="dark"] .restaurant-card:hover, 
[data-theme="dark"] .tip-card:hover, 
[data-theme="dark"] .apple-inner-card:hover {
  background-color: rgba(255, 255, 255, 0.08) !important;
}

/* Typography Consistency */
body {
  letter-spacing: -0.01em;
}

h1, h2, h3, h4, h5, h6, .display-5 {
  font-weight: 700 !important;
  letter-spacing: -0.03em !important;
}

.text-secondary {
  color: #86868b !important;
}
[data-theme="dark"] .text-secondary {
  color: #a1a1a6 !important;
}

/* Buttons */
.btn {
  border-radius: 999px !important;
  font-weight: 600 !important;
  letter-spacing: -0.01em !important;
}

/* Form Controls */
.form-control {
  border-radius: 16px !important;
  padding: 0.8rem 1.25rem !important;
  border: 1px solid rgba(150, 150, 150, 0.2) !important;
  box-shadow: none !important;
}
`;

if (!cssContent.includes('Apple-Like Design System')) {
  fs.appendFileSync(cssPath, '\n' + appleStyles);
  console.log('Appended Apple design styles to styles.css');
} else {
  console.log('Styles already appended.');
}
