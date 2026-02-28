# Mobile Testing Guide - Hero Section

## Overview

This guide tests the hero section responsiveness on mobile devices (320px - 768px viewport).

## Test Environment Setup

### Chrome DevTools
1. Open homepage: `http://localhost:3000`
2. Press `F12` to open DevTools
3. Press `Ctrl+Shift+M` (or click device toggle icon)
4. Select device from dropdown

### Test Devices

| Device | Viewport | Pixel Ratio |
|--------|----------|-------------|
| iPhone SE | 375 x 667 | 2x |
| iPhone 12 Pro | 390 x 844 | 3x |
| Pixel 5 | 393 x 851 | 2.75x |
| Samsung Galaxy S8+ | 360 x 740 | 4x |
| iPad Mini | 768 x 1024 | 2x |

## Test Checklist

### Visual Tests

- [ ] **Name displays correctly**: "Hi, I'm Sidra Raza"
  - Font size scales appropriately
  - Text doesn't overflow or wrap awkwardly
  - No horizontal scrolling

- [ ] **Title displays correctly**: "AI Engineer & Agentic Systems Developer"
  - Blue color visible
  - Proper spacing from name
  - Readable on mobile

- [ ] **Description displays correctly**
  - Full text visible
  - Proper line height
  - Good contrast with background

- [ ] **All 4 buttons visible and functional**
  - Download My CV (primary button)
  - LinkedIn (outline button)
  - GitHub (outline button)
  - Contact Me (secondary button)
  - Buttons stack vertically on small screens
  - Adequate touch target size (min 44x44px)

- [ ] **Background gradient visible**
  - Subtle animation present
  - Doesn't interfere with text readability
  - No performance issues

- [ ] **"Book a Strategy Call" button NOT present**
  - Verify removed from design

### Interaction Tests

- [ ] **Button hover effects work** (on desktop/tablet)
  - Scale animation on hover
  - Smooth transition
  - No jank or stuttering

- [ ] **Button tap works** (on mobile)
  - Immediate visual feedback
  - Links navigate correctly
  - External links open in new tab

- [ ] **Scroll animations work**
  - Hero fades/slides in on load
  - Animation smooth (60fps)
  - No layout shift

### Performance Tests

- [ ] **Load time < 2 seconds** on 4G throttling
  - Open DevTools → Network tab
  - Select "Slow 4G" throttling
  - Reload page
  - Check load time

- [ ] **No layout shift (CLS < 0.1)**
  - Open DevTools → Lighthouse
  - Run performance audit
  - Check CLS score

- [ ] **Animations run at 60fps**
  - Open DevTools → Performance tab
  - Record while scrolling
  - Check for frame drops

### Accessibility Tests

- [ ] **Text has sufficient contrast**
  - Use Lighthouse accessibility audit
  - Check contrast ratios
  - Verify WCAG AA compliance

- [ ] **Reduced motion preference respected**
  - DevTools → Rendering → Emulate CSS prefers-reduced-motion
  - Verify animations disabled
  - Content still accessible

## Known Issues & Solutions

### Issue: Buttons overflow on small screens
**Solution**: Buttons wrap to new line using `flex-wrap: wrap` (already implemented)

### Issue: Text too small on mobile
**Solution**: Using responsive font sizes with `text-4xl sm:text-5xl md:text-6xl` (already implemented)

### Issue: Background animation causes motion sickness
**Solution**: Respects `prefers-reduced-motion` media query (already implemented)

## Manual Testing Steps

### Step 1: Desktop View (> 1024px)
1. Open homepage at full window size
2. Verify all elements visible
3. Test all button hover effects
4. Verify scroll animation

### Step 2: Tablet View (768px - 1024px)
1. Resize browser to 768px width
2. Verify buttons still in one row or wrap nicely
3. Test touch interactions
4. Verify animations smooth

### Step 3: Mobile View (< 768px)
1. Use DevTools device emulation
2. Test iPhone SE (375px)
3. Test Pixel 5 (393px)
4. Verify buttons stack vertically
5. Test all tap targets
6. Verify no horizontal scroll

### Step 4: Real Device Testing (if available)
1. Open on actual mobile device
2. Test on cellular network (not WiFi)
3. Test all interactions
4. Verify load time acceptable

## Expected Results

### Desktop (> 1024px)
- All 4 buttons in single row
- Large, prominent text
- Subtle background animation visible
- Smooth hover effects

### Tablet (768px - 1024px)
- Buttons may wrap to 2 rows
- Text scales down appropriately
- Animations smooth
- Touch-friendly

### Mobile (< 768px)
- All 4 buttons stack vertically
- Text readable without zooming
- Full-width buttons for easy tapping
- Fast load time
- No horizontal scrolling

## Sign-off

After all tests pass:

- [ ] Desktop view verified
- [ ] Tablet view verified
- [ ] Mobile view verified
- [ ] Performance acceptable
- [ ] Accessibility compliant
- [ ] Reduced motion works

**Status**: Ready for production ✅

---

**Note**: Hero section uses Tailwind CSS responsive utilities and Framer Motion for animations. All responsive breakpoints are already configured.
