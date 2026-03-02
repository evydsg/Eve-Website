function About(){
    return(
        <section className="about" id="about">
            <div className="about-container">

                <div className="about-left">
                    <img src ="/eve.jpeg" alt="Eve Guenda" className="about-photo"/>
                </div>

                <div className="about-right">
                    <p className="about-label">ABOUT ME</p>
                    <h2 className="about-title">The person
                    <br/>behind it all.</h2>
                    <div className = "about-divider"></div>
                    <p className="about-bio">
                    Everything I do is mainly rooted in God and guided by faith. I’m Evelise, though most people call me Eve, a software engineer, builder, and curious mind originally from Mozambique, now living in the United States. My life has been a series of leaps into the unknown: new countries, new careers, new challenges. I didn’t grow up around technology, but I fell in love with it because I realized code is more than logic. It is a tool to solve real human problems. I am driven by purpose more than titles. I care about impact, about creating things that actually help people, and about becoming someone younger me would have prayed to become.
My journey hasn not been linear. I have faced closed doors, sudden changes, and setbacks that felt like endings, but they always turned into redirections. I build software, but I’m also building a company, a community, and a life aligned with meaning. I love learning, creating, praying, gaming, and documenting the process of becoming. What motivates me is simple: growth, service, and hope. I want to create things that make people feel less alone, more capable, and a little more optimistic about their future. Through every step, success or uncertainty, I choose to keep moving forward and to Stay Positive.
                    </p>
                    <div classname="about-tags">
                        <span className="tag">Creative</span>
                        <span className="tag">Builder</span>
                        <span className="tag">Thinker</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About