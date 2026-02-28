# CV PDF Instructions

**Required File**: `SidraRazaCV.pdf`

## Location

Place your CV PDF file in this directory: `D:\AI-Porfolio\sidra-raza-portfolio\public\`

## File Requirements

1. **Filename**: Exactly `SidraRazaCV.pdf` (case-sensitive)
2. **Format**: PDF (Portable Document Format)
3. **Size**: Recommended < 500KB for fast loading
4. **Pages**: 1-2 pages maximum
5. **Orientation**: Portrait (A4 or Letter size)

## Current Status

⚠️ **CV PDF not yet added**

The hero section "Download My CV" button navigates to `/SidraRazaCV.pdf`. Once you add your CV PDF to the public folder, the button will work automatically.

## How to Add Your CV

### Option 1: Copy Existing PDF
1. Locate your CV PDF file
2. Copy it to: `D:\AI-Porfolio\sidra-raza-portfolio\public\`
3. Rename it to: `SidraRazaCV.pdf`

### Option 2: Export from Word/Google Docs
1. Open your CV in Word or Google Docs
2. Export/Download as PDF
3. Save to: `D:\AI-Porfolio\sidra-raza-portfolio\public\`
4. Name it: `SidraRazaCV.pdf`

### Option 3: Create New PDF
1. Use a CV builder (Canva, Resume.com, etc.)
2. Export as PDF
3. Save to public folder with correct name

## Testing

After adding your CV:

### Test 1: Direct Access
1. Start dev server: `npm run dev`
2. Visit: `http://localhost:3000/SidraRazaCV.pdf`
3. Verify: PDF loads and displays correctly

### Test 2: Hero Button
1. Visit homepage: `http://localhost:3000`
2. Click "Download My CV" button
3. Verify: PDF opens/downloads

### Test 3: Mobile
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device (iPhone 12 Pro, Pixel 5, etc.)
4. Click "Download My CV" button
5. Verify: PDF downloads on mobile

## Troubleshooting

### PDF shows 404
- **Cause**: File not in correct location or wrong name
- **Solution**: Verify file is in `public/` folder and named exactly `SidraRazaCV.pdf`

### PDF doesn't download
- **Cause**: Browser settings or PDF viewer extension
- **Solution**: Right-click button → "Save link as..." or check browser download settings

### File size too large
- **Cause**: High-resolution images or embedded fonts
- **Solution**: Compress PDF using online tools (SmallPDF, ILovePDF, etc.)

## CV Content Recommendations

For AI Engineer & Agentic Systems Developer role:

### Must Include
- Contact information (email, LinkedIn, GitHub, website)
- Professional summary (2-3 sentences)
- Technical skills (AI/ML, programming languages, frameworks)
- Work experience (reverse chronological)
- Projects (especially AI/automation projects)
- Education
- Certifications (AI/ML related)

### Optional
- Publications
- Speaking engagements
- Open source contributions
- Links to portfolio projects

## Next Steps

After adding your CV:
1. ✅ Test direct access (Test 1)
2. ✅ Test hero button (Test 2)
3. ✅ Test mobile (Test 3)
4. ✅ Update hero section if LinkedIn/GitHub URLs need changes

---

**Questions?** Check the hero section configuration in: `src/components/hero/hero-section.tsx`
