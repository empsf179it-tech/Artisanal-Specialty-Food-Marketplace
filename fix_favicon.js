const fs = require('fs');
const path = require('path');

const dir = 'paw-and-harvest';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const faviconTag = '<link rel="icon" type="image/svg+xml" href="assets/images/logo.svg">';

for (let file of files) {
    let filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace any existing favicon link
    if (content.includes('rel="icon"')) {
        content = content.replace(/<link[^>]*rel="icon"[^>]*>/i, faviconTag);
    } else {
        content = content.replace('</head>', `  ${faviconTag}\n</head>`);
    }
    
    fs.writeFileSync(filePath, content);
}

console.log("Fixed favicons.");
