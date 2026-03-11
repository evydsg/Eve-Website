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
- [ ] Add CSS for the Videos section (`Videos.css`)
- [ ] Plug in real TikTok embed iframes
- [ ] Pinterest section
- [ ] Contact section
