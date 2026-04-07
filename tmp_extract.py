import re

with open('/Users/viola/All/Yandex.Disk.localized/3 Process/8 Vibe Coding/AI Mindset/src/components/LabW26PageV3.tsx', 'r') as f:
    content = f.read()

all_words = re.findall(r'[a-zA-Z0-9\[\]\-/#%]+', content)

colors = set()
fonts = set()
text_sizes = set()
font_weights = set()
leading = set()
tracking = set()

for word in all_words:
    if word.startswith('text-') and word not in ['text-center', 'text-left', 'text-right', 'text-justify', 'text-transparent', 'text-clip', 'text-ellipsis', 'text-wrap']:
        if any(size in word for size in ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl', '[']):
            text_sizes.add(word)
        else:
            colors.add(word)
    elif word.startswith('bg-') and not word.startswith('bg-opacity-'):
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

with open('styles_output.txt', 'w') as f:
    f.write("--- Text Sizes ---\n" + "\n".join(sorted(text_sizes)) + "\n\n")
    f.write("--- Font Weights ---\n" + "\n".join(sorted(font_weights)) + "\n\n")
    f.write("--- Font Families/Other ---\n" + "\n".join(sorted(fonts)) + "\n\n")
    f.write("--- Leading / Line Height ---\n" + "\n".join(sorted(leading)) + "\n\n")
    f.write("--- Tracking / Letter Spacing ---\n" + "\n".join(sorted(tracking)) + "\n\n")
    f.write("--- Colors (Bg & Text) ---\n" + "\n".join(sorted(colors)) + "\n\n")
