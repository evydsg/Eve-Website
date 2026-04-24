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

## Session — March 24, 2026

### Contact Section (In Progress)

Started building the Contact section based on Figma mockup.

**Mockup breakdown:**
- Red eyebrow label: `GET IN TOUCH`
- Large italic bold heading: `Let's Connect.`
- Gray subtext paragraph
- Red `mailto:` email link
- Solid red `SEND AN EMAIL` CTA button
- Four outlined social buttons: TikTok, Instagram, Pinterest, GitHub
- Footer: `Shalom, Shalom` + copyright line

**Step 1 completed:**
- Created `Contact.jsx` skeleton in `src/components/`
- JSX structure in place with all elements and class names
- Used `data-theme="dark"` for navbar theming
- Added `mailto:` links for email + CTA button
- GitHub social button points to `https://github.com/evydsg`
- Imported and added `<Contact />` to `App.jsx`

**Up next:**
- Step 2: Write `Contact.css` to style the section

## March 25, 2026

### Contact Section — CSS + Bug Fixes

**Step 2 completed:**
- Created `Contact.css` and imported it into `Contact.jsx`
- Styled all elements: eyebrow label, heading, subtext, email link, CTA button, social buttons, footer
- Social buttons use outlined style (border only, no fill) with hover fill effect — consistent with About section tags
- `SEND AN EMAIL` button is solid red rectangle with generous padding

**Bugs caught & fixed:**
- `className="social=btn"` → `className="social-btn"` on TikTok button (= instead of -)
- `href="malito:..."` → `href="mailto:..."` on both email links
- TikTok social button now links to `https://www.tiktok.com/@eve.guenda`

**Key reminder:** a single wrong character in a className (= instead of -) means no styles apply at all — the element falls back to browser defaults, which is why TikTok appeared as a plain purple link.

### 🔜 Up Next
- [ ] Contact section — final review + commit
- [ ] SWE / LeetCode section (React implementation)
- [ ] Photos section
- [ ] Apply `object-fit: cover` to Pinterest board cover images

## March 30, 2026

### SWE Section — JSX Skeleton (Step 1, In Progress)

**What was built:**
- Created `SWE.jsx` in `src/components/`
- Added `data-theme="bluenavy"` for navbar theming
- Skeleton structure in place: eyebrow label, heading, subtitle
- Tab switcher with two buttons: `⚡ NeetCode` and `🏗 System Design`
- Stats row with stat boxes (numbers left empty for now)
- Filter buttons row (labels to be filled in next step)
- Single placeholder LeetCode card with `data-category`, problem title, notes, and GitHub link
- Neetcode banner with roadmap link to `https://neetcode.io`
- System Design tab div stubbed out (empty for now)

**Note:** Stats numbers, filter labels, and card content are intentionally left blank — to be filled in with real data in a later step.

**Up next:**
- [ ] Continue filling up
- [ ] Fill in real stat numbers, filter labels, and LeetCode cards
- [ ] Step 2: Write `SWE.css`
- [ ] Step 3: Tab switching logic with `useState`
- [ ] Step 4: Filter logic

## March 31, 2026

### SWE Section — Data Collection (In Progress)

Before filling in the SWE section cards, spent time auditing both GitHub repositories to gather accurate problem data. Uploaded all files from `evydsg/Algorithms-DSA` and `evydsg/System-Design-Beginners`.

**Complete inventory from Algorithms-DSA:**

**Arrays (3 problems):**
- Concatenation of Array (Easy)
- Remove Duplicates from Sorted Array (Easy)
- Remove Element (Easy)

**Stacks (2 problems):**
- Valid Parentheses (Easy)
- Min Stack (Medium)

**Backtracking (2 problems):**
- Path Sum (Medium)
- Subsets (Medium)

**Binary Search (5 problems):**
- Binary Search (Easy)
- Search a 2D Matrix (Medium)
- First Bad Version (Easy)
- Guess Number Higher or Lower (Easy)
- Koko Eating Bananas (Medium)

**Graphs (4 problems):**
- Max Area of Island (Medium)
- Number of Islands (Medium)
- Rotting Oranges (Medium)
- Shortest Path in Binary Matrix (Medium)

**Linked Lists (5 problems):**
- Reverse Linked List (Easy)
- Merge Two Sorted Lists (Easy)
- Design Browser History (Medium)
- Design Linked List (Medium)
- Number of Students Unable to Eat Lunch (Easy)

**Recursion (2 problems):**
- Reverse Linked List - recursive approach
- Climbing Stairs (Easy)

**Sorting (5 implementations + 1 problem):**
- Insertion Sort
- Bucket Sort
- Merge Sort
- Quick Sort
- Merge K Sorted Lists (Hard)

**Trees (5 problems):**
- Search in a Binary Search Tree (Easy)
- Insert into a Binary Search Tree (Medium)
- Delete Node in a BST (Medium)
- Binary Tree Inorder Traversal (Easy)
- Kth Smallest Element in a BST (Medium)
- Construct Binary Tree from Preorder and Inorder Traversal (Medium) *(notes only)*

**Dynamic Programming:** Notes only (Fibonacci, memoization, tabulation)
**Heap / Priority Queue:** Notes only (Min/Max Heap, Push/Pop operations)

**Accurate stats for SWE section:**
- Total problems solved: **29**
- Easy: **12**
- Medium: **16**
- Hard: **1**

**Up next:**
- [ ] Fill in SWE.jsx cards with real problem data
- [ ] Step 2: Write SWE.css
- [ ] Step 3: Tab switching logic with `useState`
- [ ] Step 4: Filter logic

## April 6, 2026

### SWE Section — Routing + Real Data (Step 1 Complete)

**What was done:**
- Filled in all 29 real problems from `evydsg/Algorithms-DSA` into `SWE.jsx`
- Problems stored as an array of objects with title, category, notes, and GitHub link
- Removed difficulty labels — cards are categorized by DSA topic only
- Filter buttons auto-generated from the problems array using `new Set()`
- Accurate stats updated: 29 problems solved, 10 topics covered, 2 repos

**React Router setup:**
- Installed `react-router-dom`
- Refactored `App.jsx` to use `BrowserRouter`, `Routes`, and `Route`
- SWE section now lives at its own route `/swe` instead of being embedded in the main page
- Created `Home` and `SwePage` layout components
- Updated navbar SWE link from `href="#swe"` to `href="/swe"`

**Bugs fixed:**
- `App.jsx` had `function App()` defined twice — caused white screen
- `Home` was referenced but never defined
- `BrowserRouter`, `Routes`, `Route` were not imported

**Up next:**
- [ ] Step 2: Write `SWE.css`
- [ ] Step 3: Tab switching logic with `useState`
- [ ] Step 4: Filter logic
- [ ] Fill in real System Design card data

## April 7, 2026

### SWE Section — System Design Tab + Final Polish

**System Design tab completed:**
- Added real data array with 21 concepts from `evydsg/System-Design-Beginners`
- Covered 7 topic categories: APIs, Background, Big Data, Caching Basics, Networking, Proxies, Storage
- Each card has icon, title, tag, notes, 4 key points, and GitHub link
- Added Design Google Drive as Mock Interview card
- Updated stats: 21 concepts studied, 7 topics covered, 1 mock interview

**NeetCode banners added to both tabs:**
- NeetCode tab — links to `https://neetcode.io`
- System Design tab — links to `https://neetcode.io/roadmap`

**Navbar fixes:**
- Updated all navbar links from `#section` to `/#section` so they work from the `/swe` route
- Added spacing between SWE heading and navbar with increased `padding-top`

**React Router setup confirmed working:**
- `/` loads the main portfolio page
- `/swe` loads the SWE page with its own Navbar + SWE section
- SWE link in navbar correctly navigates to `/swe`

### 🔜 Up Next
- [ ] F1 section (convert HTML prototype to React)
- [ ] Photos section
- [ ] Pinterest `object-fit: cover` fix

### -> soon
- [ ]Media queries
- [ ]Pinterest


## ✅ Completed

### Navbar
- Fixed position with dynamic theme switching via IntersectionObserver
- Reads `data-theme` attribute from each section
- Includes "EG." logo, red dot accent, and "eve__dsg" handle
- Added `/f1` route link

### Hero
- Navy card with bold name typography and red accents

### About
- Cream background, photo frame, bio, red divider, outlined tag buttons

### Skills
- Navy background, 3×2 grid with modal popups
- Modals: AI Systems & Automation Engineering, Product Thinking, Startup Leadership, Problem Solving, Mobile Development, Strategic Vision

### Videos / TikTok
- TikTok embed section
- Handle: `@eve.guenda`
- Embed format: `https://www.tiktok.com/embed/[videoID]` (no `v2` in path)

### Pinterest
- Vertically stacked featured boards layout (3 boards shown via `boards.slice(0, 3)`)
- Boards: Bible Study, Books, Gym, Nails, OTD
- Pinterest username: `eveguenda`
- Images imported from `src/assets/pinterest/`

### Contact
- Completed with CSS styling
- Social links include TikTok (`https://www.tiktok.com/@eve.guenda`)
- Fixed bugs: `className="social=btn"` typo, `href="malito:..."` typos

### SWE Page (`/swe`)
- Separate route via `react-router-dom`
- 29 DSA problems across: Arrays, Stacks, Backtracking, Binary Search, Graphs, Linked Lists, Recursion, Sorting, Trees
- Filter buttons auto-generated with `new Set()`
- System Design tab stubbed out (pending data)

### F1 Learning Page (`/f1`)
- Converted HTML prototype to React (`F1learning.jsx` + `F1Learning.css`)
- 7 cards: How an F1 Car Works, DRS, Pit Stops, Safety Car & VSC, Tire Strategy, Key F1 Rules, What Every Flag Means
- Filter pills by category: All, The Car, Race Rules, Strategy, Flags
- Flag grid fixed to 2 columns to prevent overflow
- Added top padding to clear fixed navbar (`120px`)
- Added F1 official website banner at the bottom linking to `formula1.com`

### Routing (`App.jsx`)
- `BrowserRouter` with `Routes` and `Route`
- Routes: `/` (Home), `/swe` (SwePage), `/f1` (F1Page)
- Fixed duplicate `function App()` bug
- Fixed case mismatch: `F1learning` import vs `<F1Learning/>` usage

---

## 🔜 Soon

- [ ] Media queries
- [ ] Pinterest `object-fit: cover` fix
- [ ] Projects section
- [ ] LinkedIn integration
- [ ] When user clicks on a nav link, scroll directly to that section

---

## 📌 Key Reminders

- Always run `npm` commands from inside `my-portfolio/` — not the root
- TikTok embeds: no `v2` in the path or it loads a profile instead of the video
- Image imports in React need unquoted variable references
- Defining a function twice (e.g. `function App()`) causes white screen bugs
- One `export default` per file only
- All routes must live inside a single `function App()`

## April 13, 2026
- Removed work (projects) section to have it linked directly to github
- Removed instagram 
- Started brainstorming Stay Positive Section

## Soon
- Allow users to click in the logo to go homepage
- [ ] Media queries
- [ ] Pinterest `object-fit: cover` fix
- [ ] Projects section
- [ ] LinkedIn integration
- [ ] When user clicks on a nav link, scroll directly to that section


## Session Update — April 14, 2026

### ✅ Completed Today

**Stay Positive Section**
- Built full Stay Positive section as a dedicated component (`Staypositive.jsx`)
- Added hero banner with navy gradient background, pulsing green "Live & Active" badge, and Playfair Display title
- Added "Why I Built This" quote card with red accent border
- Built 3-phone mockup display in the hero (main + two side phones)
- Added scrollable app screens gallery with 4 real screenshots
- Added 6 feature cards (Guided Meditation, Daily Affirmations, Prayer & Devotion, Bible Verses, Share Affirmations, Android + Web)
- Added My Role & Contributions section pulled from resume
- Added tech stack chips (Kotlin, Firebase, REST APIs, Figma, Render, Cloudflare, etc.)
- Fixed JSX parse errors (& → &amp;, JSX fragments, missing parent element)
- Wrapped return in React Fragment <> to resolve parent element error

---

### 🔜 To Do Next

- [ ] Add real screenshots to `public/` folder and rename:
  - `sp-welcome.png`
  - `sp-meditation.png`
  - `sp-affirmations.png`
  - `sp-prayer.png`
- [ ] Add real link for Stay Positive official website
- [ ] Add real Google Play Store link for Android download

## Session Update — April 15, 2026

### ✅ Completed Today

**Stay Positive Section**
- Built full `Staypositive.jsx` component with hero banner, phone mockups, and navy gradient background
- Added pulsing green "Live & Active" badge and Playfair Display italic title
- Added "Why I Built This" personal quote card with red accent border
- Built 3-phone mockup display (main + two offset side phones)
- Added horizontally scrollable app screens gallery with 4 real screenshots
- Added 6 feature cards matching actual app screens
- Added My Role & Contributions section with real resume data
- Added tech stack chips (Kotlin, Firebase, REST APIs, Figma, Render, Cloudflare, etc.)
- Fixed multiple JSX errors: & → &amp;, JSX fragments, missing parent element
- Wrapped return in React Fragment to resolve parent element error
- Added real screenshots to public/ folder and renamed correctly
- Added real Stay Positive website and Google Play Store links

**Bug Fixes**
- Fixed Vercel 404 error on direct URL visits (e.g. /swe) by adding vercel.json with SPA rewrite rule

---

### 🔜 To Do Next

**Stay Positive**
- [ ] Add gratitude section to acknowledge the Stay Positive team

**Navbar & Branding**
- [ ] Make the EG. logo clickable — scrolls back to the top / main page
- [ ] Fix cursor color visibility when navbar is over the red hero section

**UI & Interactions**
- [ ] Add a dynamic mascot/icon that walks around the page and points at the current section
- [ ] Add music icon button so users can visit my music profile
- [ ] Change Pinterest board cover images
- [ ] Add a loading/splash screen before the site appears

**Polish & Responsiveness**
- [ ] Add media queries for mobile responsiveness across all sections

## Session Update — April 20, 2026

### ✅ Completed Today

**Stay Positive — Gratitude Section**
- Added gratitude section at the bottom of Staypositive.jsx
- Includes heartfelt thank you message to the Stay Positive team
- Styled with pulsing 🙏 icon, italic Playfair Display title, red divider, and founder signature
- Reused existing spPulse animation for the icon

**Navbar — Logo**
- Wrapped EG. logo in an <a href="/"> tag to make it clickable
- Added hover effect — logo turns red on hover with smooth transition
- eve__dsg handle fades slightly on hover

**Vercel — 404 Fix**
- Added vercel.json with SPA rewrite rule to fix direct URL 404 errors (e.g. /swe, /f1)

---

### 🔜 To Do Next

**Navbar**
- [ ] Fix cursor color visibility when hovering over red navbar — cursor disappears because both are red. Attempted useEffect fix but no change, needs further investigation

**UI & Interactions**
- [ ] Add music icon button so users can visit music profile
- [ ] Add loading/splash screen before site appears
- [ ] Add dynamic mascot/icon that walks around and points at current section

**Polish & Responsiveness**
- [ ] Media queries for mobile responsiveness across all sections
- [ ] Change Pinterest board cover images

## Session Update — April 21, 2026

### ✅ Completed Today

**Music Icon Button**
- Added floating Apple Music button fixed to bottom right corner of the page
- Links to https://music.apple.com/profile/eveguenda
- Frosted glass effect with backdrop-filter blur
- Turns Apple Music red (#FC3C44) on hover with scale animation
- Always visible on top of all sections with z-index: 999

**Loading / Splash Screen**
- Built Loader.jsx component with fullscreen red background
- Shows EG. initials in bold white with a pulsing animation
- Shows "staypositive" tagline below initials with letter spacing
- White loading bar fills up over 2 seconds
- Smoothly fades out after 2 seconds over a 1 second transition
- Fully removed from DOM after 3 seconds using return null
- Added to Home function in App.jsx above all other components

---

### 🔜 To Do Next

**Navbar**
- [ ] Fix cursor color visibility when hovering over red navbar
      — cursor disappears because both are red, needs investigation

**UI & Interactions**
- [ ] Dynamic mascot/icon that walks around and points at current section

**Polish & Responsiveness**
- [ ] Media queries for mobile responsiveness across all sections
- [ ] Change Pinterest board cover images


**AI**
- [ ] AI Chat that gives bible verses based on how someone feels like

## Session Update — April 22, 2026

### ✅ Completed Today

**Music Button**
- Kept original 🎵 emoji button — clean and simple
- Links to https://music.apple.com/profile/eveguenda
- Fixed position bottom right corner with frosted glass effect
- Turns Apple Music red (#FC3C44) on hover with scale animation

**Stay Positive Mascot**
- Built Mascot.jsx component using the official Stay Positive SVG logo
- Logo bounces and sways gently with a smooth animation
- Green glow shadow pulses underneath
- Follows scroll position — moves from top to bottom as user scrolls
- Speech bubble "Stay Positive! 🌿" appears on hover
- Added to Home function in App.jsx
- SVG file saved to public/ folder as sp-logo.svg

**EG. Logo**
- Made logo clickable with <a href="/"> wrapper
- Turns red on hover with smooth color transition
- eve__dsg handle fades slightly on hover

---

### 🔜 To Do Next

**Navbar**
- [ ] Fix cursor color visibility when hovering over red navbar
      — cursor disappears because both are red, needs investigation

**Polish & Responsiveness**
- [ ] Media queries for mobile responsiveness across all sections
- [ ] Change Pinterest board cover images

**AI**
- [ ] AI Chat that gives bible verses based on how someone feels like


## Session Update — April 23, 2026

### ✅ Completed Today

**Emmanuel AI Chat**
- Built Emmanuel.jsx — a floating AI chat bubble fixed to the bottom right
- Named the AI "Emmanuel" (God with us 🕊️)
- Chat opens/closes with a 🙏 floating button
- Includes mood chips (Anxious, Sad, Grateful, Lost, Hopeful, Tired)
- Each response includes: Bible verse, encouragement, prayer
- Every message ends with "In the meantime, Stay Positive 🌿"
- Added typing indicator animation while waiting for response
- Added close button (✕) on the chat header
- Connected to Claude API for real personalized responses

**Stay Positive Mascot**
- Replaced red character with official Stay Positive SVG logo
- Logo bounces and sways with gentle animation
- Green glow shadow pulses underneath
- Follows scroll position from top to bottom of page
- Speech bubble "Stay Positive! 🌿" appears on hover
- SVG saved to public/ as sp-logo.svg

---

### 🐛 Bug To Fix Next Session

**Emmanuel — CORS Error**
- API calls to Anthropic from the browser are blocked by CORS policy
- Error: "No Access-Control-Allow-Origin header is present"
- Root cause: Anthropic API cannot be called directly from React frontend
- API key would also be exposed in the browser — security risk
- Fix: Create a Vercel Serverless Function (API Route) to proxy the
  request safely and keep the API key hidden on the server

---

### 🔜 To Do Next

**Polish & Responsiveness**
- [ ] Media queries for mobile responsiveness across all sections
- [ ] Hamburger menu for navbar
- [ ] Fix cursor color on red navbar
- [ ] Change Pinterest board cover images

**Website Tweeks**
- [ ] Change Colors in the background
- [ ] Change Welcome Screenshoot for Stay Positive
- [ ] Change Prayer, Daily Affirmations Screenshot for Stay Positive
- [ ] Add Podcast Page
- [ ] Increase Padding for TikTok Section
- [ ] Increase padding for Connect Section
- [ ] Fix Contact button from Navbar (does not go to Contact section)

## Session Update — April 24, 2026

### ✅ Completed Today

**Emmanuel AI Chat — FULLY WORKING! 🙏**
- Fixed CORS error by creating a Vercel serverless function at api/emmanuel.js
- API call now goes React → Vercel Function → Anthropic API (secure & no CORS!)
- Stored ANTHROPIC_API_KEY safely in Vercel environment variables
- Fixed vercel.json syntax error (double curly braces)
- Fixed model name to claude-sonnet-4-5
- Added Anthropic API credits to enable the service
- Debugged using console.log steps and Vercel Function logs
- Emmanuel now gives real personalized responses including:
  - 📖 Bible verse relevant to how the user feels
  - 💚 Warm encouragement message
  - 🙏 A heartfelt prayer
  - 🌿 "In the meantime, Stay Positive" sign off
- Tested and confirmed working on live site evelisekguenda.com

---

### 🐛 Bugs Fixed This Session
- CORS policy blocking direct browser → Anthropic API calls
- vercel.json double curly brace syntax error
- Wrong model name causing 5XX server errors
- Missing Anthropic API credits causing invalid_request_error
- Empty parsed response due to server crash

---

### 🔜 To Do Next

**Polish & Responsiveness**
- [ ] Media queries for mobile responsiveness across all sections
- [ ] Hamburger menu for navbar
- [ ] Fix cursor color on red navbar
- [ ] Change Pinterest board cover images

**Website Tweeks**
- [ ] Change Colors in the background
- [ ] Change Welcome Screenshoot for Stay Positive
- [ ] Change Prayer, Daily Affirmations Screenshot for Stay Positive
- [ ] Add Podcast Page
- [ ] Increase Padding for TikTok Section
- [ ] Increase padding for Connect Section
- [ ] Fix Contact button from Navbar (does not go to Contact section)

