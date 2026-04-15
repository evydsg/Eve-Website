function Staypositive() {
  const screens = [
    { src: '/sp-welcome.png',      label: 'Welcome' },
    { src: '/sp-meditation.png',   label: 'Guided Meditation' },
    { src: '/sp-affirmations.png', label: 'Daily Affirmations' },
    { src: '/sp-prayer.png',       label: 'Prayer & Devotion' },
  ]
  
    const features = [
      {
        icon: '🧘',
        title: 'Guided Meditation',
        desc: 'Breathe deeper, stress less. Hundreds of guided sessions for any moment of your day.',
      },
      {
        icon: '✨',
        title: 'Daily Affirmations',
        desc: 'Start each day with words that uplift. Personalized affirmations to shift your mindset.',
      },
      {
        icon: '🙏',
        title: 'Prayer & Devotion',
        desc: 'A sacred space to speak to God, offer gratitude, and deepen your spiritual connection daily.',
      },
      {
        icon: '📖',
        title: 'Bible Verses',
        desc: 'Daily rotating scripture to keep you grounded, inspired, and connected to something greater.',
      },
      {
        icon: '📤',
        title: 'Share Affirmations',
        desc: 'Share daily Bible verses and affirmations with friends across Instagram, TikTok, and more.',
      },
      {
        icon: '📱',
        title: 'Android + Web',
        desc: 'Available on Android and the web — your daily encouragement is always within reach.',
      },
    ]
  
    const roles = [
      {
        strong: 'Founded and lead',
        rest: ' the entire Stay Positive platform, vision, product, engineering, and branding.',
      },
      {
        strong: 'Led 3 Android engineers',
        rest: ' through code reviews and agile sprints across 20+ screens.',
      },
      {
        strong: 'Integrated REST APIs',
        rest: ' for daily meditation videos from YouTube and rotating Bible versions.',
      },
      {
        strong: 'Boosted engagement by 25%',
        rest: ' through personalized content delivery and improved UX.',
      },
      {
        strong: 'Migrated to Render + Cloudflare',
        rest: 'cutting load time from 5 minutes to under 1 minute.',
      },
      {
        strong: 'Designed Figma screens',
        rest: ' across Android, iOS, and web with consistent UI/UX.',
      },
    ]
  
    const techStack = [
      'Kotlin',
      'Android Studio',
      'Firebase',
      'REST APIs',
      'YouTube API',
      'Figma',
      'Render',
      'Cloudflare',
      'Agile / Scrum',
      'OOP',
    ]
  
    return (
      <>
        <section id="staypositive">
          {/* BANNER */}
          <div className="sp-banner">
            <div className="sp-left">
              <div className="sp-label">
                <span className="sp-dot"></span>
                Live &amp; Active
              </div>
  
              <h2 className="sp-title">
                Stay
                <br />
                <span className="sp-title-italic">Positive.</span>
              </h2>
  
              <p className="sp-tagline">
                Mental wellness &amp; encouragement app
              </p>
  
              <p className="sp-desc">
                A mental wellness platform built to help people find daily
                encouragement, peace, and hope — rooted in faith and designed for
                real life.
              </p>
  
              <div className="sp-why">
                <p className="sp-why-label">Why I Built This</p>
                <p className="sp-why-text">
                  "I built Stay Positive because I needed it myself. I wanted a
                  space where people could find daily encouragement without the
                  noise of social media — something rooted in faith, built with
                  love."
                </p>
              </div>
  
              <div className="sp-buttons">
                <a
                  href="https://play.google.com/store/apps/details?id=com.app.staypositive&pli=1"
                  target="_blank"
                  rel="noreferrer"
                  className="sp-btn sp-btn-primary"
                >
                  Download on Android
                </a>
  
                <a
                  href="https://staypositiveapp.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="sp-btn sp-btn-secondary"
                >
                  Visit Website
                </a>
              </div>
            </div>
  
            {/* PHONES */}
            <div className="sp-right">
              <div className="phone-wrap side-left">
                <div className="phone-mockup small">
                  <div className="phone-notch"></div>
                  <img
                    src="/sp-meditation.png"
                    alt="Guided Meditation"
                    className="phone-img"
                  />
                </div>
              </div>
  
              <div className="phone-wrap main">
                <div className="phone-mockup large">
                  <div className="phone-notch"></div>
                  <img
                    src="/sp-welcome.png"
                    alt="Welcome to Stay Positive"
                    className="phone-img"
                  />
                </div>
              </div>
  
              <div className="phone-wrap side-right">
                <div className="phone-mockup small">
                  <div className="phone-notch"></div>
                  <img
                    src="/sp-affirmations.png"
                    alt="Daily Affirmations"
                    className="phone-img"
                  />
                </div>
              </div>
            </div>
          </div>
  
          {/* SCREENS SCROLL */}
          <div className="sp-screens">
            <p className="sp-section-label">App Screens</p>
            <h3 className="sp-section-title">See What's Inside</h3>
            <div className="screens-scroll">
              {screens.map((screen, index) => (
                <div className="screen-item" key={index}>
                  <div className="screen-img-wrap">
                    <img src={screen.src} alt={screen.label} />
                  </div>
                  <p className="screen-label">{screen.label}</p>
                </div>
              ))}
            </div>
          </div>
  
          {/* FEATURES */}
          <div className="sp-features">
            <p className="sp-section-label">What's Inside</p>
            <h3 className="sp-section-title">App Features</h3>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div className="feature-card" key={index}>
                  <span className="feature-icon">{feature.icon}</span>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-desc">{feature.desc}</p>
                </div>
              ))}
            </div>
  
            {/* MY ROLE */}
            <div className="sp-role">
              <h3 className="sp-role-title">My Role &amp; Contributions</h3>
              <div className="role-grid">
                {roles.map((role, index) => (
                  <div className="role-item" key={index}>
                    <div className="role-bullet"></div>
                    <p className="role-text">
                      <strong>{role.strong}</strong>
                      {role.rest}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          {/* TECH STACK */}
          <div className="sp-tech">
            <p className="tech-label">Built With</p>
            <div className="tech-chips">
              {techStack.map((tech, index) => (
                <span className="tech-chip" key={index}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }
  
  export default Staypositive