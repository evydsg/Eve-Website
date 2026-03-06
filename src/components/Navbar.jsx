import {useEffect, useState} from 'react';

function Navbar(){
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const sections = document.querySelectorAll('section[data-theme]');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting){
                        //when a section is 50% visible, grab its theme
                        setTheme(entry.target.dataset.theme);
                    }
                });
            },
            {threshold: 0.5} //triggers when 50% of section is visible
        );

        sections.forEach((section) => observer.observe(section)); //watch all sections

        return () => observer.disconnect(); //Cleanup when navbar unmounts

        }, []);
    return (
        <nav className = {`navbar navbar--${theme}`}>
            <div className = "navbar-logo">
                <h1>EG<span className="red-dot">.</span></h1>
                <span>eve__dsg</span>
            </div>

            <ul className="navbar-links">
                <li><a href="#about">ABOUT</a></li>
                <li><a href="#skills">SKILLS</a></li>
                <li><a href="#work">WORK</a></li>
                <li><a href="#videos">VIDEOS</a></li>
                <li><a href="#photos">PHOTOS</a></li>
                <li><a href="#contact">CONTACT</a></li>
                <li><a href="#reviews">REVIEWS</a></li>
            </ul>
        </nav>
    )
}

export default Navbar