# Eve Portfolio — Progress Log

---

## March 9, 2025

### ✅ TikTok / Videos Section — JSX

**What was built:**
- Completed the `Videos.jsx` component with full section structure
- Added `tiktok-outer-label`, `tiktok-header`, `tiktok-body`, `tiktok-grid`, and CTA link
- 3 portrait video card placeholders (`aspect-ratio: 9/16`) ready for real TikTok embeds
- CTA button links to `https://www.tiktok.com/@eve.guenda`

**Bugs caught & fixed during review:**
1. Grid structure broken — cards 2 & 3 were outside `tiktok-grid`
2. CTA `<a>` tag was outside `tiktok-body` instead of inside it
3. Typo — `tiktok-tile` → `tiktok-title`
4. Extra stray `</div>` tags from inconsistent indentation

**Key reminder:** consistent indentation makes structural bugs immediately visible — every opening tag's closing tag should be at the same indent level.

---

### 🔜 Up Next
- [x] Add CSS for the Videos section
- [ ] Plug in real TikTok embed iframes
- [ ] Pinterest section
- [ ] Contact section

---

## March 11, 2026

### ✅ Videos Section — CSS

**What was added:**
- Wrote CSS for the full Videos/TikTok section: `.tiktok-body`, `.tiktok-grid`, `.tiktok-video-card`, `.tiktok-video-placeholder`, `.tiktok-cta`
- Video cards use `aspect-ratio: 9/16` for portrait TikTok ratio
- CTA button styled with red background, uppercase tracking, and hover state

### ✅ Navbar — Bug Fix

**What was fixed:**
- Navbar theme classes (`navbar--dark`, `navbar--light`, `navbar--red`, etc.) were not visually changing because child elements had hardcoded colors
- Fixed by changing `color` on `.navbar-links a`, `.navbar-logo h1`, and `.navbar-logo span` to `color: inherit` so they follow the parent theme class
- Also fixed two CSS typos: `.titktok-card` → `.tiktok-card` and `.titkok-header` → `.tiktok-header`

**Key reminder:** hardcoded colors on child elements override parent theme classes — always use `inherit` when you want children to follow their parent's color.

---

### 🔜 Up Next
- [ ] Plug in real TikTok embed iframes
- [ ] Pinterest section
- [ ] Contact section

---

## March 13, 2026

### ✅ Videos Section — CSS Finalized
- Completed and finalized the CSS file for the Videos/TikTok section
- All styles confirmed working with the JSX component

### ✅ About Section — Photo Updated
- Replaced the about-me photo with a new image

### 🔜 Up Next
- [ ] Plug in TikTok embed iframe (1 video ready, awaiting full URL)
- [ ] Pinterest section
- [ ] Contact section

