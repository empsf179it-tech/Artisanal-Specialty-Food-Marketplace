import re

with open('paw-and-harvest/journal.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Featured Article
content = re.sub(
    r'src="assets/images/ingredient-story\.webp"',
    r'src="assets/images/Understanding Pet Food Ingredients.png"',
    content
)

# Fix Grid Articles
def replace_img(match):
    # match.group(0) is the entire card HTML up to the h3
    # We need to extract the h3 text to build the filename
    h3_text = match.group(2).replace('?', '') # Remove ? for filename
    
    # We need to replace the img src in group(1)
    block = match.group(0)
    
    # Find the img tag inside the block
    new_block = re.sub(
        r'<img src="[^"]+"',
        f'<img src="assets/images/{h3_text}.png"',
        block
    )
    return new_block

# Regex to match from <div class="card journal-item" up to </h3>
# We use DOTALL to match across newlines
pattern = re.compile(r'(<div class="card journal-item".*?<h3[^>]*>)(.*?)(</h3>)', re.DOTALL)

content = pattern.sub(replace_img, content)

with open('paw-and-harvest/journal.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
