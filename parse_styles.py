import re
from collections import Counter

with open('/Users/viola/All/Yandex.Disk.localized/3 Process/8 Vibe Coding/AI Mindset/src/components/LabW26PageV3.tsx', 'r') as f:
    content = f.read()

# Find all className="..." or className={`...`}
class_names = re.findall(r'className=["`\']([^"`\']+)["`\']', content)

# Also handle template literals with variables, e.g. className={`flex ${isActive ? 'bg-red' : ''} text-white`}
# This is a bit simpler just to grab all words as classes to be safe, filtering by tailwind prefixes
all_words = re.findall(r'[a-zA-Z0-9\[\]\-/#%]+', content)

colors = set()
fonts = set()
text_sizes = set()
font_weights = set()
leading = set()
tracking = set()

# tailwind classes commonly used:
# colors: text-X, bg-X, border-X (where X is color name or hex)
# sizes: text-xs, text-sm, text-base, text-lg, text-xl, text-2xl ... text-[...px/rem]
# weight: font-thin, font-extralight, font-light, font-normal, font-medium, font-semibold, font-bold, font-extrabold, font-black
# family: font-sans, font-serif, font-mono, font-[family]

for word in all_words:
    if word.startswith('text-') and word not in ['text-center', 'text-left', 'text-right', 'text-justify', 'text-transparent']:
        if any(size in word for size in ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl', '[']):
            text_sizes.add(word)
        else:
            colors.add(word)
    elif word.startswith('bg-'):
        colors.add(word)
    elif word.startswith('font-'):
        if word in ['font-thin', 'font-extralight', 'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold', 'font-black']:
            font_weights.add(word)
        else:
            fonts.add(word)
    elif word.startswith('leading-'):
        leading.add(word)
    elif word.startswith('tracking-'):
        tracking.add(word)

print("--- Text Sizes ---")
print(sorted(text_sizes))
print("\n--- Font Weights ---")
print(sorted(font_weights))
print("\n--- Font Families/Other ---")
print(sorted(fonts))
print("\n--- Leading / Line Height ---")
print(sorted(leading))
print("\n--- Tracking / Letter Spacing ---")
print(sorted(tracking))
print("\n--- Colors (Bg & Text) ---")
# Filter out common utility words that start with bg- or text- but aren't colors
filtered_colors = [c for c in sorted(colors) if not any(x in c for x in ['bg-opacity', 'text-opacity', 'bg-clip'])]
print(filtered_colors)

