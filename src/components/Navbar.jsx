import { useEffect, useState } from 'react';

function Navbar() {
    const [theme, setTheme] = useState('dark');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // ── THEME OBSERVER ──
        const sections = document.querySelectorAll('section[data-theme]')

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTheme(entry.target.dataset.theme)
                    }
                })
            },
            { threshold: 0.1}
        )

        sections.forEach((section) => observer.observe(section))

        // ── CURSOR COLOR ON NAVBAR ──
        const cursor = document.getElementById('cursor')
        const navbar = document.querySelector('.navbar')

        const handleEnter = () => {
            if (cursor) cursor.style.background = 'white'
        }
        const handleLeave = () => {
            if (cursor) cursor.style.background = '#C8102E'
        }

        if (navbar) {
            navbar.addEventListener('mouseenter', handleEnter)
            navbar.addEventListener('mouseleave', handleLeave)
        }

        // ── CLEANUP ──
        return () => {
            observer.disconnect()
            if (navbar) {
                navbar.removeEventListener('mouseenter', handleEnter)
                navbar.removeEventListener('mouseleave', handleLeave)
            }
        }

    }, []);

    // Close menu when a link is clicked
    const handleLinkClick = () => setMenuOpen(false)

    return (
      <>
        <nav className={`navbar navbar--${theme}`}>
    
          {/* LOGO */}
          <a href="/" className="navbar-logo">
            <h1>EG<span className="red-dot">.</span></h1>
            <span>staypositive</span>
          </a>
    
          {/* DESKTOP LINKS */}
          <ul className="navbar-links">
            <li><a href="/#about">ABOUT</a></li>
            <li><a href="/#skills">SKILLS</a></li>
            <li><a href="https://github.com/evydsg">WORK</a></li>
            <li><a href="https://www.linkedin.com/in/evelisekguenda/">LINKEDIN</a></li>
            <li><a href="/#staypositive">STAYPOSITIVE</a></li>
            <li><a href="/#videos">TIKTOK</a></li>
            <li><a href="/#pinterest">PINTEREST</a></li>
            <li><a href="/#contact">CONTACT</a></li>
            <li><a href="/swe">SWE</a></li>
            <li><a href="/f1">F1</a></li>
          </ul>
    
          {/* HAMBURGER BUTTON */}
          <button
            className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
    
        </nav>
    
        {/* MOBILE MENU — outside <nav> so it's not trapped by backdrop-filter */}
        {menuOpen && (
          <div className="mobile-menu">
            <ul className="mobile-menu-links">
              <li><a href="/#about" onClick={handleLinkClick}>ABOUT</a></li>
              <li><a href="/#skills" onClick={handleLinkClick}>SKILLS</a></li>
              <li><a href="https://github.com/evydsg" onClick={handleLinkClick}>WORK</a></li>
              <li><a href="https://www.linkedin.com/in/evelisekguenda/" onClick={handleLinkClick}>LINKEDIN</a></li>
              <li><a href="/#staypositive" onClick={handleLinkClick}>STAYPOSITIVE</a></li>
              <li><a href="/#videos" onClick={handleLinkClick}>TIKTOK</a></li>
              <li><a href="/#pinterest" onClick={handleLinkClick}>PINTEREST</a></li>
              <li><a href="/#contact" onClick={handleLinkClick}>CONTACT</a></li>
              <li><a href="/swe" onClick={handleLinkClick}>SWE</a></li>
              <li><a href="/f1" onClick={handleLinkClick}>F1</a></li>
            </ul>
          </div>
        )}
      </>
    )
}

export default Navbar;