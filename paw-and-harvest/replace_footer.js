const fs = require('fs');
const path = require('path');

const new_text = `        <div class="footer-col newsletter-col">
          <h4 class="newsletter-heading">PET FOOD NOTES<span class="desktop-only-text">, INGREDIENT STORIES & WELLNESS IDEAS</span></h4>
          <form class="newsletter-form" onsubmit="event.preventDefault(); alert('Subscribed to the journal!');">
            <input type="email" class="newsletter-input" placeholder="Your email address" required>
            <button type="submit" class="btn btn-primary newsletter-btn">SUBSCRIBE <span class="arrow">&rarr;</span></button>
          </form>
        </div>`;

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html') && f !== 'index.html'); // Skip index as it's already done

const regex = /<div class="footer-col">\s*<h4>PET FOOD NOTES, INGREDIENT STORIES & WELLNESS IDEAS<\/h4>\s*<form[^>]*>[\s\S]*?<\/form>\s*<\/div>/;

for (const file of files) {
  const filepath = path.join(__dirname, file);
  let content = fs.readFileSync(filepath, 'utf-8');
  if (regex.test(content)) {
    console.log(`Updating ${file}...`);
    content = content.replace(regex, new_text);
    fs.writeFileSync(filepath, content, 'utf-8');
  } else {
    console.log(`No match in ${file}`);
  }
}
console.log('Done.');
