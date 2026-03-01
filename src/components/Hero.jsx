function Hero(){
    return (
        <section className="hero">
            <div className = "hero-container">
                <div className = "hero-left">
                    <p className="hero-eyebrow">WELCOME TO MY WORLD</p>
                    <h1 className="hero-title">I'm<br/>
                    <span className="red">Eve</span><br/>
                    Guenda
                    </h1>
                
                <p className="hero-bio">
                Everything I do is mainly rooted in God and guided by faith. 
                I'm a software engineer, creator, and video game player who loves 
                turning ideas into real things people can use. When I'm not coding, 
                I'm building Stay Positive and sharing encouragement, creativity, 
                and a little positivity with the world.
                </p>
                </div>

                <div className = "hero-right">
                    <img src = "/eve.jpeg" alt ="Eve Guenda" className="hero-photo"/>
                </div>
            </div>
        </section>
    )
}
export default Hero