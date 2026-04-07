# Mobile Design & Optimization Guide (AI Mindset)

This guide documents the critical visual and interaction rules for the mobile experience of the AI Mindset landing pages, specifically to prevent future "black bar" regressions on desktop and "white rectangle" failures on mobile.

## 1. Case Cards (Mobile)

### **The "Shadow Shell" Rule**
*   **Aesthetic**: The overall Case Card MUST be white (`bg-white`) with black text to match the premium brutalist style.
*   **Media Container**: The internal media panel (wrapping the graphics) MUST have a solid black background (`bg-[#111411]`). This ensures that the technical SVGs and GIFs remain visible with high contrast.
*   **Diagnostic Implementation**: Use the `!isMdViewport` gate to apply these mobile-only rules.

```tsx
// Correct Implementation in renderCaseCard
<div className={cn(
  "mb-4 w-full overflow-hidden",
  !isMdViewport ? "min-h-[118px] bg-[#111411]" : "bg-transparent"
)}>
  {renderCaseMediaPanel(...)}
</div>
```

## 2. Smart Floating CTA (Mobile)

### **The "Natural Sticky Catch"**
*   **Animation**: The "/хочу на лабу" button should FEEL like a part of the site's physical scroll.
*   **Behavior**: 
    1.  It starts at the top of the section immediately following the Hero.
    2.  As the user scrolls, it naturally rises from the bottom of the screen.
    3.  It "catches" at `sticky bottom-12` and remains fixed for the rest of the page.
    4.  It naturally scrolls away with the footer.
*   **Rule**: NEVER use scripted "fade-in" logic triggered by scroll offsets. Use native CSS `sticky` within a specific container.

## 3. Viewport Isolation Guardrails

*   **Threshold**: Use the project's native `isMdViewport` (threshold: 768px) for all responsive logic.
*   **Testing**: ALWAYS verify changes on a physical mobile device (e.g., `http://LAN_IP:3001/`) after a hard refresh. Browser "responsive modes" often misinterpret hover states and HMR updates.
*   **Regression Check**: Any modification to `renderCaseCard` or `Header` MUST be checked on desktop to ensure no leakage of mobile backgrounds or fixed heights.

---
*Created: 2026-04-07*
*Owner: AI Mindset Development Team*
