import { useState } from 'react'

function Skills() {
  const [selected, setSelected] = useState(null)

  const skills = [
    {
      icon: "⚡",
      title: "Automation Engineering",
      default: "I design intelligent systems that turn data into real decision, not just dashboards.",
      description: "How I do it: I architect data pipelines, automation scripts, APIs, and structured monitoring.",
      tools: "Python · SQL ",
      impact: "Built an automation system that reduced scrap by $200K+ weekly by eliminating false system assumptions.",
      edge: "I think in systems, not scripts. Every solution must reduce friction or save money."
    },
    {
      icon: "🎨",
      title: "Product Thinking & End-to-End Ownership",
      default: "I build products, not features, with users, scalability, and business value in mind.",
      description: "How I do it: I gather requirements directly from users, prototype fast, ship, collect feedback, and iterate.",
      edge: "I approach engineering like a founder. I own outcomes, not tickets."
    },
    {
      icon: "🚀",
      title: "Startup Leadership & Execution",
      default: "I lead projects from idea to production — across engineering, design, and branding.",
      description: "How I do it: I define roadmaps, recruit collaborators, align vision, and ship across Android, web, and AI platforms.",
      edge: "I can switch between CEO-level thinking and hands-on engineering instantly."
    },
    {
      icon: "💡",
      title: "Problem Solving Under Ambiguity",
      default: "I thrive in unclear, high-pressure environments.",
      description: "How I do it: I break problems down systematically, test assumptions, and prioritize practical impact.",
      edge: "Calm logic under chaos."
    },
    {
      icon: "📱",
      title: "Mobile Development",
      default: "I build intuitive mobile experiences with clean architecture.",
      tools: "Kotlin · Android Studio · Firebase · REST APIs",
      edge: "I design for real humans, not just screens."
    },
    {
      icon: "🌍",
      title: "Strategic Vision & Discipline",
      default: "Everything I build is rooted in long-term vision and purpose.",
      description: "How I do it: Clear goals → structured plans → measurable execution.",
      edge: "Faith-driven consistency. I don't quit, I refine."
    },
  ]

  return (
    <section className="skills" id="skills" data-theme="dark">
      <p className="skills-label">WHAT I DO</p>
      <h2 className="skills-title">Skills & <br /> Expertise</h2>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div className="skill-card" key={index} onClick={() => setSelected(skill)}>
            <span className="skill-icon">{skill.icon}</span>
            <p className="skill-title">{skill.title}</p>
            <p className="skill-default">{skill.default}</p>
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
            {selected.tools && <p className="modal-tools"><strong>Tools:</strong> {selected.tools}</p>}
            {selected.impact && <p className="modal-impact"><strong>Impact:</strong> {selected.impact}</p>}
            {selected.edge && <p className="modal-edge"><strong>What makes me different:</strong> {selected.edge}</p>}
          </div>
        </div>
      )}

    </section>
  )
}

export default Skills