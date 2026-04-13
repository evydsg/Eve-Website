import { useState } from 'react'

function Skills() {
  const [selected, setSelected] = useState(null)

  const skills = [
    {
      icon: "⚡",
      title: "AI Systems & Automation Engineering",
      default: "I design intelligent systems that turn data into real decisions, not just dashboards.",
      description: "I architect data pipelines, automation scripts, and AI workflows using Python, REST APIs, and structured monitoring.",
      tools: "Python · SQL · REST APIs · Microsoft Power Automate · OpenAI API · Pinecone",
      impact: "Built automation systems at Tesla that eliminated $200K+/week in material loss and saved 42 hours/week of manual work.",
      edge: "I think in systems, not scripts. Every solution must reduce friction or save money."
    },
    {
      icon: "📱",
      title: "Mobile Development (Android)",
      default: "I build intuitive Android apps with clean architecture and real users in mind.",
      description: "I lead Android development end-to-end, from architecture to deployment, using Kotlin, Firebase, and REST APIs.",
      tools: "Kotlin · Android Studio · Firebase · REST APIs · Figma · OOP",
      impact: "Led 3 Android engineers to ship a mental wellness app across 20+ screens, boosting engagement by 25%.",
      edge: "I design for real humans — not just screens."
    },
    {
      icon: "🌐",
      title: "Full-Stack Web Development",
      default: "I build and ship full-stack web products from idea to production.",
      description: "I develop responsive, scalable web apps using React, Next.js, and backend service, deployed and production-ready.",
      tools: "React.js · Next.js · JavaScript · HTML · CSS · Firebase · Vercel · Render · Cloudflare · Docker",
      impact: "Built a full-stack inventory app at Headstarter and a portfolio manager at Bloomberg integrating 3+ APIs.",
      edge: "I don't just build features, I ship products people actually use."
    },
    {
      icon: "🎨",
      title: "Product Thinking & End-to-End Ownership",
      default: "I build products, not features,  with users, scalability, and business value in mind.",
      description: "I gather requirements directly from users, prototype in Figma, ship fast, collect feedback, and iterate.",
      tools: "Figma · Agile/Scrum · REST APIs · React.js · Firebase",
      impact: "Collaborated with UX designers at Stay Positive to deliver consistent Figma screens across Android, iOS, and web.",
      edge: "I approach engineering like a founder. I own outcomes, not tickets."
    },
    {
      icon: "🚀",
      title: "Startup Leadership & Execution",
      default: "I lead projects from idea to production, across engineering, design, and branding.",
      description: "I define roadmaps, recruit collaborators, align vision, and ship across Android, web, and AI platforms.",
      tools: "Android · React.js · Firebase · Figma · Agile/Scrum",
      impact: "Founded and lead Stay Positive, building a mental wellness platform across Android, iOS, and web.",
      edge: "I switch between CEO-level thinking and hands-on engineering instantly."
    },
    {
      icon: "💡",
      title: "Problem Solving Under Ambiguity",
      default: "I thrive in unclear, high-pressure environments like Tesla's factory floor.",
      description: "I break complex problems down systematically, test assumptions fast, and ship practical solutions under pressure.",
      tools: "Python · SQL · REST APIs · Data Analysis",
      impact: "At Tesla, identified and solved operational problems no one had visibility into — saving hundreds of thousands weekly.",
      edge: "Calm logic under chaos. I don't wait for perfect clarity, I build clarity."
    },
  ]

  return (
    <section className="skills" id="skills">
      <div className="skills-header">
        <p className="skills-label">WHAT I DO</p>
        <h2 className="skills-title">Skills & <br />Expertise</h2>
        <p className="skills-subtitle">Click any skill to learn more</p>
      </div>

      <div className="skills-list">
        {skills.map((skill, index) => (
          <div
            className="skill-row"
            key={index}
            onClick={() => setSelected(skill)}
          >
            <div className="skill-row-left">
              <span className="skill-row-icon">{skill.icon}</span>
              <div className="skill-row-info">
                <p className="skill-row-title">{skill.title}</p>
                <p className="skill-row-default">{skill.default}</p>
              </div>
            </div>
            <div className="skill-row-tools">
              {skill.tools.split(' · ').slice(0, 3).map((tool, i) => (
                <span className="skill-tool-badge" key={i}>{tool}</span>
              ))}
            </div>
            <span className="skill-row-arrow">→</span>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            <span className="modal-icon">{selected.icon}</span>
            <h3 className="modal-title">{selected.title}</h3>
            {selected.description && <p className="modal-text">{selected.description}</p>}
            {selected.tools && (
              <div className="modal-tools-row">
                {selected.tools.split(' · ').map((tool, i) => (
                  <span className="modal-tool-chip" key={i}>{tool}</span>
                ))}
              </div>
            )}
            {selected.impact && <p className="modal-impact"><strong>Impact:</strong> {selected.impact}</p>}
            {selected.edge && <p className="modal-edge"><strong>What makes me different:</strong> {selected.edge}</p>}
          </div>
        </div>
      )}
    </section>
  )
}

export default Skills