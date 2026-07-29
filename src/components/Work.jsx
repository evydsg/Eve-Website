function Work() {
    const projects = [
      {
        image: '/work-portfolio.png',
        tag: 'Web App',
        year: '2026',
        title: "Eve's Portfolio",
        desc: 'My personal portfolio — built with React and Vite. Showcases my work, skills, Stay Positive, TikTok, Pinterest and more.',
        stack: ['React', 'Vite', 'JavaScript', 'CSS3', 'Vercel'],
        github: 'https://github.com/evydsg/Eve-Website',
        live: 'https://evelisekguenda.com'
      },
      {
        image: '/work-jasmine.png',
        tag: 'Web App',
        year: '2026',
        title: "Jasmine's Website",
        desc: 'A personal website designed and built for Jasmine — clean, modern, and fully responsive with a custom design tailored to her personality.',
        stack: ['React', 'JavaScript', 'CSS3', 'Vercel'],
        github: 'https://github.com/evydsg',
        live: 'https://jasminejonesphotography.com'
      },
    ]
  
    return (
      <section className="work" id="work" data-theme="dark">
  
        <p className="work-section-label">Selected Work</p>
        <h2 className="work-section-title">My Projects</h2>
        <p className="work-section-subtitle">
          A selection of things I've built from apps to websites.
          Each one a lesson, a challenge, and a win.
        </p>
  
        <div className="work-cards-grid">
          {projects.map((project, index) => (
            <div className="work-card" key={index}>
  
              <div className="work-card-preview">
                <img
                  src={project.image}
                  alt={project.title}
                  className="work-card-img"
                />
                <div className="work-card-overlay">
                  <span className="work-overlay-text">View Project</span>
                </div>
              </div>
  
              <div className="work-card-content">
                <div className="work-card-top">
                  <span className="work-card-tag">{project.tag}</span>
                  <span className="work-card-year">{project.year}</span>
                </div>
  
                <h3 className="work-card-title">{project.title}</h3>
  
                <p className="work-card-desc">
                  {project.desc}
                </p>
  
                <div className="work-card-stack">
                  {project.stack.map((tech, i) => (
                    <span className="work-stack-chip" key={i}>
                      {tech}
                    </span>
                  ))}
                </div>
  
                <div className="work-card-footer">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="work-card-btn github"
                  >
                    GitHub →
                  </a>
  
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="work-card-btn live"
                  >
                    Live Site ↗
                  </a>
                </div>
              </div>
  
            </div>
          ))}
        </div>
  
        <div className="work-github-cta">
          <div className="work-github-text">
            <h3>See everything I've built</h3>
            <p>More projects, experiments, and code on my GitHub profile</p>
          </div>
  
          <a
            href="https://github.com/evydsg"
            target="_blank"
            rel="noreferrer"
            className="work-github-btn"
          >
            VIEW GITHUB →
          </a>
        </div>
  
      </section>
    )
  }
  
  export default Work