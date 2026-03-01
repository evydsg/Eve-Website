function Navbar(){
    return (
        <nav className = "navbar">
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