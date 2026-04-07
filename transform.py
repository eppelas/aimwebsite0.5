import re
import os

with open('/Users/viola/All/Yandex.Disk.localized/3 Process/8 Vibe Coding/AI Mindset/src/components/LabW26PageV3.tsx', 'r') as f:
    text = f.read()

# Duplicate and rename component
text = text.replace('LabW26PageV3', 'LabW26PageV4')

# Typography mapping
text = re.sub(r'text-\[([5-9]|1[0-1])px\]', 'text-[10px]', text)
text = re.sub(r'text-\[1[2-3]px\]', 'text-xs', text)
text = re.sub(r'text-\[1[4-5]px\]', 'text-sm', text)
text = re.sub(r'text-\[16px\]', 'text-base', text)
text = re.sub(r'text-\[1[7-9]px\]', 'text-lg', text)
text = re.sub(r'text-\[2[0-3]px\]', 'text-xl', text)
text = re.sub(r'text-\[2[4-7]px\]', 'text-2xl', text)
text = re.sub(r'text-\[2[8-9]px\]|text-\[3[0-5]px\]', 'text-3xl', text)
text = re.sub(r'text-\[3[6-9]px\]|text-\[4[0-7]px\]', 'text-4xl', text)
text = re.sub(r'text-\[4[8-9]px\]|text-\[5[0-5]px\]', 'text-5xl', text)
text = re.sub(r'text-\[5[6-9]px\]|text-\[6[0-9]px\]', 'text-6xl', text)
text = re.sub(r'text-\[7[0-9]px\]', 'text-7xl', text)

# Background Custom Colors (merging light grays to #f9f9f7)
off_whites = ['#f4f4ef', '#f5f7f2', '#f6f7f5', '#f8f8f5', '#f8f8f8', '#faf8f3', '#fbfcfb', '#fffdfa', '#eff1eb', '#eff3ea', '#f3f3f5', '#f3f4f4', '#f5f6f5', '#ececef']
for color in off_whites:
    text = text.replace(f'bg-[{color}]', 'bg-[#f9f9f7]')

def sub_opacities(match):
    val = int(match.group(3))
    if val <= 10: rounded = 10
    elif val <= 20: rounded = 20
    elif val <= 40: rounded = 40
    elif val <= 60: rounded = 60
    elif val <= 85: rounded = 80
    else: rounded = 90
    return f"{match.group(1)}-{match.group(2)}/{rounded}"

# Opacities text-black/XX bg-white/XX
text = re.sub(r'\b(bg|text)-(white|black)/([1-9][0-9]?)\b', sub_opacities, text)

# Text Colors
text = text.replace('text-[#161620]', 'text-[#181616]')
text = text.replace('text-[#1a1a1a]', 'text-[#181616]')
text = text.replace('bg-[#111411]', 'bg-[#181616]')
text = text.replace('bg-[#161620]', 'bg-[#181616]')

# Snap Spacings to even tailwind values for 8px grid
def round_even_tailwind(match):
    prefix = match.group(1)
    val = int(match.group(2))
    if val % 2 != 0:
        val += 1
    return f"{prefix}-{val}"

text = re.sub(r'\b([pm]-?[xytrbl]?|gap)-([3579]|1[135])\b', round_even_tailwind, text)

with open('/Users/viola/All/Yandex.Disk.localized/3 Process/8 Vibe Coding/AI Mindset/src/components/LabW26PageV4.tsx', 'w') as f:
    f.write(text)

print("Created LabW26PageV4.tsx with standardize transformations.")
