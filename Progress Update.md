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
- [x] Plug in TikTok embed iframe
- [x] Pinterest section
- [ ] Contact section

---

## March 14, 2026

### ✅ TikTok Section — Real Video Embed
- Plugged in real TikTok video using iframe embed
- Fixed embed URL format: `embed/v2/` → `embed/` (v2 loads profile view instead of specific video)
- Added `.tiktok-video-card iframe` CSS rule so iframe fills the card properly

### ✅ TikTok Section — CSS Bug Fixes
- Added missing `.tiktok-body` CSS (flex column + centered) — this was why the CTA was glued to card 1
- Fixed `.tiktok-video-placeholder` showing white — added `background-color: #000`
- Fixed card height by adding `width: 100%` and `min-height` so `aspect-ratio: 9/16` calculates correctly
- Moved `.tiktok-grid` outside the media query — it only existed on mobile before, so desktop had no grid
- Fixed mobile media query still using `repeat(3, 1fr)` → changed to `1fr` to stack on small screens

### ✅ Pinterest Section — Built from scratch
- Created `Pinterest.jsx` with 5 boards: Bible Study, Books, Gym, Nails, OTD
- Each board card is a clickable `<a>` tag linking directly to the board
- Boards stored in an array at the top of the component — easy to add more later
- Created `Pinterest.css` with square `aspect-ratio: 1/1` cards, outlined CTA button, responsive grid

### ✅ Pinterest Section — Styling Fixes
- Removed card background (red-on-red box) — section background handles the color now
- Fixed "PINTEREST" label being cut off — adjusted padding
- Added `background-color: #C8102E` to `.pinterest` section so no black body bleeds through
- Increased `padding-top` to `160px` so navbar sits cleanly on the red background
- Used `margin-top: -80px` to close the gap between TikTok and Pinterest sections

### ✅ Navbar — Background Colors Added
- Added `background-color` to all navbar theme classes (`--dark`, `--light`, `--bluenavy`, `--red`)
- This prevents the black body from bleeding through as a line between sections
- Smooth color transitions already working via existing `transition: background-color 0.3s ease`

### ✅ Pinterest — Custom White Cursor
- Added `.pinterest * { cursor: ... }` with white fill to override the global red cursor
- Scoped to `.pinterest *` so it only applies inside that section

### ✅ Git — Divergent Branch Resolved
- Vercel pushed analytics files to remote while local had new commits
- Resolved with `git config pull.rebase false` → `git pull` → merge commit → `git push`

**Key reminder:** always `git pull` before `git push` at the start of every coding session to avoid divergent branch conflicts.

### 🔜 Up Next
- [ ] Contact section
- [ ] SWE / LeetCode section (React implementation)
- [ ] Photos section

## March 16, 2026

### ✅ Pinterest Section — Layout Redesign

**What was changed:**
- Redesigned board layout from 5-column emoji grid to vertical stacked cards
- Each card now has a large cover image area on top and the board name below — more editorial, matches design mockup
- Reduced featured boards from 5 to 3 using `boards.slice(0, 3)` — CTA still links to all boards
- Swapped `grid-template-columns: repeat(5, 1fr)` for `flex-direction: column` to stack cards vertically
- Replaced `aspect-ratio` on cover with fixed `height: 220px` — aspect-ratio caused a huge cover area at full width, pushing emoji to center of a massive block
- Removed emoji from `.pinterest-board-cover` entirely — cover is now a clean placeholder rectangle ready for real board images

**Key reminder:** `aspect-ratio` is relative to the element's width — on a full-width card it creates a much taller block than expected. Use a fixed `height` when you want consistent sizing regardless of width.

### 🔜 Up Next
- [ ] Add real Pinterest board cover images to `src/assets/pinterest/` and wire them into the cards
- [ ] Contact section
- [ ] SWE / LeetCode section (React implementation)
- [ ] Photos section

## March 18, 2026

### ✅ Pinterest Section — Cover Images Added

**What was done:**
- Saved real Pinterest board cover images locally to `src/assets/pinterest/`
- Imported all three images into `Pinterest.jsx` using relative import paths
- Added `cover` property to each board object in the boards array
- Wired cover images into the JSX using `<img src={board.cover} alt={board.name} />` inside `.pinterest-board-cover`

**Bug fixed:**
- Import paths were inconsistent across the three imports — one used `./src/assets/`, others used `./assets/`
- All fixed to `../assets/pinterest/` since `Pinterest.jsx` lives in `src/components/` and needs `../` to go up one level to reach `src/`

**Key reminder:** import paths are relative to the file doing the importing, not the project root. `../` means "go up one folder."

### 🔜 Up Next
- [ ] Style cover images with `object-fit: cover` so they fill the card cleanly
- [ ] Contact section
- [ ] SWE / LeetCode section (React implementation)
- [ ] Photos section