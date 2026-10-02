const fs = require('fs');
const path = require('path');

const old_text = '<h4 class="newsletter-heading">PET FOOD NOTES<span class="desktop-only-text">, INGREDIENT STORIES & WELLNESS IDEAS</span></h4>';
const new_text = '<h4 class="newsletter-heading">PET FOOD NOTES</h4>';

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

for (const file of files) {
  const filepath = path.join(__dirname, file);
  let content = fs.readFileSync(filepath, 'utf-8');
  if (content.includes(old_text)) {
    console.log(`Updating ${file}...`);
    content = content.replace(old_text, new_text);
    fs.writeFileSync(filepath, content, 'utf-8');
  }
}
console.log('Done.');
