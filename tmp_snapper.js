const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/LabW26PageV4.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Grid tracking and text sizes
content = content.replace(/text-\[6px\]|text-\[8px\]|text-\[9px\]/g, 'text-[10px]');
content = content.replace(/text-\[13px\]|md:text-\[13px\]/g, 'text-sm md:text-sm');
content = content.replace(/tracking-\[0\.2em\]|tracking-\[0\.14em\]/g, 'tracking-widest');

// 2. Rem margins to pixel equivalents in Tailwind spacing scale
// 0.15rem -> ~2.4px (use 2px, so mb-0.5)
// 0.25rem -> 4px (use mb-1)
// 0.45rem -> ~7.2px (use 8px, so mb-2)
// 0.75rem -> 12px (use mb-3)
content = content.replace(/mb-\[0\.15rem\]/g, 'mb-0.5');
content = content.replace(/mb-\[0\.25rem\]/g, 'mb-1');
content = content.replace(/mb-\[0\.45rem\]/g, 'mb-2');
content = content.replace(/mb-\[0\.75rem\]/g, 'mb-3');

// 3. Grid structures. Add a wrapper logic or just fix raw pixel layouts
// Since we want to propose a 12-column grid, we will add standard structural containers
// where we see max width settings. But that's highly manual. For the automated rewrite:
// Let's at least standardize the colors to remove arbitrary opacities where possible 
// without breaking the Vibe.
content = content.replace(/black\/74/g, 'black/75');
content = content.replace(/black\/46/g, 'black/50');
content = content.replace(/white\/35/g, 'white/40');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully completed preliminary snapping replacements in LabW26PageV4.tsx');
