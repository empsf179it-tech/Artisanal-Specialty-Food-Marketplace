const fs = require('fs');
const path = require('path');

const dir = 'paw-and-harvest';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldSvgRegex = /<svg class="nav-logo-svg" viewBox="0 0 24 24" xmlns="http:\/\/www\.w3\.org\/2000\/svg">\s*<path d="M12 2C6\.48 2 2 6\.48 2 12s4\.48 10 10 10 10-4\.48 10-10S17\.52 2 12 2zm0 18c-4\.41 0-8-3\.59-8-8s3\.59-8 8-8 8 3\.59 8 8-3\.59 8-8 8zm3-13\.5V9h-2V6\.5h2zm-4 0V9H9V6\.5h2zM9 13v-2h6v2H9z"\/>\s*<\/svg>/g;

const newSvg = `<svg class="nav-logo-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 85 C20 85 20 50 20 50 C20 20 50 40 50 40 C50 40 80 20 80 50 C80 50 80 85 50 85 Z" />
              <ellipse cx="25" cy="30" rx="12" ry="16" transform="rotate(-30 25 30)" />
              <ellipse cx="40" cy="15" rx="12" ry="18" transform="rotate(-10 40 15)" />
              <ellipse cx="60" cy="15" rx="12" ry="18" transform="rotate(10 60 15)" />
              <ellipse cx="75" cy="30" rx="12" ry="16" transform="rotate(30 75 30)" />
            </svg>`;

const faviconTag = '\n  <link rel="icon" type="image/svg+xml" href="assets/images/logo.svg">\n</head>';

for (let file of files) {
    let filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace SVG logos
    content = content.replace(oldSvgRegex, newSvg);
    
    // Add favicon if not present
    if (!content.includes('rel="icon"')) {
        content = content.replace('</head>', faviconTag);
    }
    
    fs.writeFileSync(filePath, content);
}

console.log("Updated logos and favicons.");
