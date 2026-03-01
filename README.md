# ✦ Personal Portfolio — Evelise Guenda

> My personal corner of the internet. A single place to learn everything about who I am — my work, skills, photos, videos, and how to reach me.

🔗 **Live Site:** (coming soon)

---

## About

This is the source code for my personal portfolio website. It was designed to be a complete personal hub — not just a resume, but a full reflection of who I am, what I create, and what I care about.

Built with a bold editorial aesthetic using a red, black, white, and navy color palette.

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Introduction and first impression |
| **About Me** | My story, background, and personality |
| **Skills** | Areas of expertise |
| **Projects** | Selected work and case studies |
| **TikTok** | Embedded videos from my TikTok |
| **Photos** | Personal photo gallery |
| **Pinterest** | Curated boards and inspiration |
| **Contact** | How to reach me and social links |

---

## Tech Stack
- **React** — Component-based UI
- **Vite** — Fast development build tool
- **CSS3** — Styling and layout
- **JavaScript** — Interactivity

No frameworks. No dependencies. Just clean, fast code.

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/portfolio.git

# Open in your browser
open index.html
```

No build step required — open `index.html` directly in any browser.

---

## Design

The UI/UX was designed in **Figma** and then translated into code.

Design principles:
- Editorial + minimal aesthetic
- High contrast color palette (red, navy, black, white)
- Scroll-triggered reveal animations
- Custom cursor interaction
- Fully responsive for mobile and desktop

### Colors
    --red: #C8102E;
    --navy: #0B1D3A;
    --black: #0A0A0A;
    --white: #F5F3EE;
    --offwhite: #EDE9E2;
    --gray: #888;

      background: var(--black);
      color: var(--white);
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      overflow-x: hidden;
      cursor: none;
---

## Customization

To make this your own, update the following in `index.html`:

- **Name** — Search for `Your Name` and replace throughout
- **Bio** — Update the text in the `#about` section
- **Email** — Replace `you@email.com`
- **Social links** — Update all `href="#"` links in the contact section
- **TikTok handle** — Replace `@YourHandle`
- **Photos** — Replace placeholder divs with `<img>` tags
- **Projects** — Update project titles, descriptions, and links

---

## License

This project is open source and available under the [MIT License](LICENSE).

Feel free to use it as inspiration — but please don't copy it directly and claim it as your own. ✌️

---

## Contact

Have a question or want to connect?

📧 evelise@staypositiveapp
🎵 [TikTok](https://tiktok.com/eve__dsg)  
📌 [Pinterest](https://pinterest.com/eve__dsg)  
📸 [Instagram](https://instagram.com/eve__guenda)

---

<p align="center">Made with ♥ and a lot of tea.</p>

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
