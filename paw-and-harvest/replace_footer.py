import glob

old_text = '''        <div class="footer-col">
          <h4>PET FOOD NOTES, INGREDIENT STORIES & WELLNESS IDEAS</h4>
          <form style="display: flex; flex-direction: column; gap: var(--space-sm);" onsubmit="event.preventDefault(); alert('Subscribed to the journal!');">
            <input type="email" placeholder="Your email address" required style="width: 100%; padding: var(--space-md) var(--space-sm); border: 1px solid var(--c-border); font-family: var(--font-body); background: var(--c-white); box-sizing: border-box;">
            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; box-sizing: border-box;">SUBSCRIBE <span class="arrow">&rarr;</span></button>
          </form>
        </div>'''

new_text = '''        <div class="footer-col newsletter-col">
          <h4 class="newsletter-heading">PET FOOD NOTES<span class="desktop-only-text">, INGREDIENT STORIES & WELLNESS IDEAS</span></h4>
          <form class="newsletter-form" onsubmit="event.preventDefault(); alert('Subscribed to the journal!');">
            <input type="email" class="newsletter-input" placeholder="Your email address" required>
            <button type="submit" class="btn btn-primary newsletter-btn">SUBSCRIBE <span class="arrow">&rarr;</span></button>
          </form>
        </div>'''

for filepath in glob.glob('*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_text in content:
        print(f'Updating {filepath}...')
        content = content.replace(old_text, new_text)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
