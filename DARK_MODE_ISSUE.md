# Issue: Implement Dark Mode with Theme Persistence

**Labels:** `enhancement`, `ui`, `accessibility`, `high-priority`

## Description
Implement a comprehensive dark/light theme toggle with localStorage persistence to enhance user experience and accessibility across the portfolio.

## Current Status
- ✅ ThemeContext created with localStorage persistence
- ✅ ThemeToggle component built with Framer Motion
- ✅ CSS variables for light/dark color palettes defined
- ⏳ Need to add dark mode variants to all components

## Requirements
- [x] Create ThemeProvider context for theme management
- [x] Build ThemeToggle component with smooth animations
- [x] Add dark mode color palette to globals.css
- [x] Persist theme preference in localStorage
- [x] Add theme toggle to navigation header
- [ ] Apply dark mode styles to all components:
  - [ ] Hero section
  - [ ] Skills carousel
  - [ ] Projects section
  - [ ] Timeline/Experience
  - [ ] Testimonials
  - [ ] Contact CTA
  - [ ] Footer
- [ ] Test contrast ratios for WCAG AA compliance
- [ ] Add smooth transition animations between themes
- [ ] Test SSR/hydration with theme persistence

## Technical Implementation
- **Framework:** Next.js 16 with App Router
- **Styling:** Tailwind CSS v4 + CSS variables
- **Animations:** Framer Motion for toggle transitions
- **Storage:** localStorage with SSR-safe hydration
- **System Preference:** Detects `prefers-color-scheme` on first visit

## Files Already Modified
- `src/contexts/ThemeContext.tsx` - Theme provider with localStorage
- `src/components/ThemeToggle.tsx` - Animated toggle component
- `src/app/globals.css` - Dark mode color palette (CSS variables)
- `src/app/layout.tsx` - ThemeProvider wrapper

## Next Steps
1. Add `dark:` variants to all component classes
2. Ensure proper contrast ratios (WCAG AA: 4.5:1 for text)
3. Test theme switching on all pages
4. Add theme transition animations (avoid flash)
5. Test with screen readers for accessibility

## Impact
- ✅ Improved accessibility (WCAG 2.1 Level AA)
- ✅ Reduced eye strain for users in low-light environments
- ✅ Modern portfolio experience matching industry standards
- ✅ Better user preference support (respects system settings)

## Related Files
- Theme context: `src/contexts/ThemeContext.tsx`
- Toggle component: `src/components/ThemeToggle.tsx`
- Global styles: `src/app/globals.css`
- All section components need dark mode variants

---
*Priority: High - Enhances UX and accessibility*
