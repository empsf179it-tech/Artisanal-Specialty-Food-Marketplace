const fs = require('fs');

let content = fs.readFileSync('paw-and-harvest/journal.html', 'utf8');

// Fix Featured Article
content = content.replace(
    /src="assets\/images\/ingredient-story\.webp"/g,
    'src="assets/images/Understanding Pet Food Ingredients.png"'
);

// Fix Grid Articles
// Match <div class="card journal-item" up to </h3>
content = content.replace(
    /(<div class="card journal-item"[\s\S]*?<h3[^>]*>)([\s\S]*?)(<\/h3>)/g,
    (match, p1, p2, p3) => {
        let h3Text = p2.replace(/\?/g, ''); // Remove question mark
        // replace the img src inside p1
        let newP1 = p1.replace(
            /<img src="[^"]+"/g,
            `<img src="assets/images/${h3Text}.png"`
        );
        return newP1 + p2 + p3;
    }
);

fs.writeFileSync('paw-and-harvest/journal.html', content);
console.log("Done");
