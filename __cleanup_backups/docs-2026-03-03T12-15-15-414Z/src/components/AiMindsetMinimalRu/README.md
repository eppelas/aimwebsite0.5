# AI Mindset Minimal RU Page

This folder contains a fully isolated, reusable React component for the "AI Mindset Minimal RU" landing page. It is designed to be easily copied and dropped into any other React + Tailwind CSS project.

## Requirements

To use this component in another project, ensure you have the following installed:

1. **React** (v18+)
2. **Tailwind CSS** (v3 or v4)
3. **Framer Motion** (`npm install motion` or `npm install framer-motion`)

## How to Use

1. Copy the entire `AiMindsetMinimalRu` folder into your project's `components` directory (or any other preferred location).
2. Import the component where you want to use it:

```tsx
import AiMindsetMinimalRuPage from './components/AiMindsetMinimalRu/AiMindsetMinimalRuPage';

export default function App() {
  return (
    <AiMindsetMinimalRuPage />
  );
}
```

## Features

- **Fully Self-Contained Styles:** Custom CSS (like grid lines and scrollbar hiding) is injected directly via a `<style>` block within the component.
- **Responsive Design:** Built mobile-first with Tailwind CSS, adapting perfectly to desktop screens.
- **Interactive Animations:** Uses Framer Motion for scroll-linked animations and a "Crazy Mode" toggle that adds playful physics to elements.
- **No External Assets:** All visual elements are built using CSS and standard HTML, meaning no missing images or broken links when transferring.

## Customization

- **Colors & Fonts:** The component uses Tailwind's arbitrary values (e.g., `bg-[#F2F2F2]`) and a custom font class (`font-minimal`). You can easily find and replace these values to match your brand.
- **Content:** All text is hardcoded in Russian as requested. You can modify the arrays in the JSX to update the content, speakers, or pricing.
