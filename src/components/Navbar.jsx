import {useEffect, useState} from 'react';

function Navbar(){
    const [theme, setTheme] = useState('dark');

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
          { threshold: 0.5 }
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
    return (
        <nav className = {`navbar navbar--${theme}`}>
            <a href="/" className="navbar-logo">
            <h1>EG<span className="red-dot">.</span></h1>
            <span>eve__dsg</span>
            </a>

            <ul className="navbar-links">
            <li><a href="/#about">ABOUT</a></li>
            <li><a href="/#skills">SKILLS</a></li>
            <li><a href="https://github.com/evydsg">WORK</a></li>
            <li><a href="https://www.linkedin.com/in/evelisekguenda/">LINKEDIN</a></li>
            <li><a href="/#staypositive">STAYPOSITIVE</a></li>
            <li><a href="/#videos">TIKTOK</a></li>
            <li><a href="/#pinteres">PINTEREST</a></li>
            <li><a href="/#contact">CONTACT</a></li>
            <li><a href="/swe">SWE</a></li>
            <li><a href="/f1">F1</a></li>
            </ul>
        </nav>
    )
}
export default Navbar