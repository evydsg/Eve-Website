import { useState } from "react";

// ── Card data ──────────────────────────────────────────────
const CARDS = [
  {
    id: 1,
    cat: "car",
    bar: "bar-red",
    icon: "🏎️",
    categoryLabel: "The Car",
    categoryColor: "",
    title: "How an F1 Car Works",
    desc: "An F1 car is the most sophisticated racing machine ever built. Every millimeter is designed for speed.",
    points: [
      <>Weighs just <strong>798kg</strong> including the driver</>,
      "Hybrid power unit — combustion engine + electric motor",
      <>Produces <strong>1,000+ horsepower</strong></>,
      <>0–100 km/h in under <strong>2.6 seconds</strong></>,
      "Aerodynamics generate enough downforce to drive upside down on a ceiling",
    ],
  },
  {
    id: 2,
    cat: "car",
    bar: "bar-red",
    icon: "💨",
    categoryLabel: "The Car",
    categoryColor: "",
    title: "What is DRS?",
    desc: "Drag Reduction System — a movable flap on the rear wing that opens to reduce drag and increase straight-line speed.",
    drs: true,
    points: [
      "Only usable in designated DRS zones on track",
      <>Only activated when within <strong>1 second</strong> of the car ahead</>,
      "Automatically closes when braking",
      "Designed to help overtaking — the trailing car gets a speed boost",
    ],
  },
  {
    id: 3,
    cat: "strategy",
    bar: "bar-orange",
    icon: "🔧",
    categoryLabel: "Strategy",
    categoryColor: "orange",
    title: "Pit Stops Explained",
    desc: "A pit stop is when a car pulls off the track into the pits to change tires or make repairs — all in seconds.",
    points: [
      <>Fastest ever: <strong>1.80 seconds</strong> (Red Bull, 2023)</>,
      <>Over <strong>20 mechanics</strong> work simultaneously</>,
      "3 mechanics per wheel — one to remove, one to fit, one to stabilize",
      "Strategy decides WHEN to pit — too early or late can cost the race",
      "Undercut: pit before rival to gain track position on fresher tires",
    ],
  },
  {
    id: 4,
    cat: "race",
    bar: "bar-yellow",
    icon: "🚗",
    categoryLabel: "Race Rules",
    categoryColor: "yellow",
    title: "Safety Car & VSC",
    desc: "When there's danger on track, the Safety Car comes out to slow the entire field down while it's cleared.",
    points: [
      <><strong>Safety Car (SC)</strong> — all cars must follow behind it at reduced speed</>,
      <><strong>Virtual Safety Car (VSC)</strong> — no physical car, drivers must hit a target delta time</>,
      "No overtaking is allowed under Safety Car",
      'Teams use SC periods strategically to pit for "free" without losing position',
      "Race restarts when SC pulls into the pits — chaos usually follows! 😅",
    ],
  },
  {
    id: 5,
    cat: "strategy",
    bar: "bar-orange",
    icon: "🛞",
    categoryLabel: "Strategy",
    categoryColor: "orange",
    title: "Tire Strategy & Compounds",
    desc: "Tire choice is one of the biggest strategic decisions in F1. The compound affects speed, grip, and how long tires last.",
    tires: true,
    points: [
      <>Every driver must use at least <strong>2 different compounds</strong> per race</>,
      "Wet tires (green) and Intermediates (blue) for rainy conditions",
      "Tire degradation forces teams to decide pit stop timing",
    ],
  },
  {
    id: 6,
    cat: "race",
    bar: "bar-blue",
    icon: "📋",
    categoryLabel: "Race Rules",
    categoryColor: "blue",
    title: "Key F1 Rules",
    desc: "F1 has a complex rulebook — here are the ones that matter most to understand what's happening on track.",
    points: [
      <><strong>Points system:</strong> 25–18–15–12–10–8–6–4–2–1 for top 10 finishers</>,
      <><strong>Fastest lap:</strong> 1 bonus point if you're in the top 10</>,
      <><strong>Track limits:</strong> all 4 wheels must stay within white lines</>,
      <><strong>Blue flags:</strong> lapped cars must let leaders through</>,
      <><strong>Parc Fermé:</strong> cars cannot be modified significantly after qualifying</>,
      <><strong>Budget cap:</strong> teams limited to $135M per season to level the playing field</>,
    ],
  },
  {
    id: 7,
    cat: "flags",
    bar: "bar-white",
    icon: "🚩",
    categoryLabel: "Flags",
    categoryColor: "white",
    title: "What Every Flag Means",
    desc: "Marshals wave flags to communicate with drivers at high speed. Knowing them helps you follow the race!",
    flags: true,
  },
];

const FLAGS = [
  { emoji: "🏁", name: "Chequered",        meaning: "Race or session ended" },
  { emoji: "🟡", name: "Yellow",            meaning: "Danger ahead, no overtaking" },
  { emoji: "🔴", name: "Red",               meaning: "Session stopped immediately" },
  { emoji: "🔵", name: "Blue",              meaning: "Let the leader past" },
  { emoji: "🟢", name: "Green",             meaning: "All clear, track is safe" },
  { emoji: "⬛⬜", name: "Black & White",   meaning: "Warning for unsporting behavior" },
  { emoji: "🏳️", name: "White",            meaning: "Slow vehicle on track" },
  { emoji: "🟠", name: "Orange (Meatball)", meaning: "Car has mechanical issue, must pit" },
];

const TIRES = [
  { cls: "soft",   emoji: "🔴", name: "Soft",   desc: "Fastest grip, wears out quickest" },
  { cls: "medium", emoji: "🟡", name: "Medium", desc: "Balanced speed & durability" },
  { cls: "hard",   emoji: "⚪", name: "Hard",   desc: "Slowest but lasts longest" },
];

const FILTERS = [
  { key: "all",      label: "All Topics" },
  { key: "car",      label: "🏎️ The Car" },
  { key: "race",     label: "🏁 Race Rules" },
  { key: "strategy", label: "🧠 Strategy" },
  { key: "flags",    label: "🚩 Flags" },
];

// ── Sub-components ─────────────────────────────────────────
function DrsVisual() {
  return (
    <div className="drs-visual">
      <div className="drs-label">DRS OPEN = FASTER</div>
      <div className="drs-sub">Adds ~12–15 km/h on straights</div>
    </div>
  );
}

function TireGrid() {
  return (
    <div className="tire-grid">
      {TIRES.map((t) => (
        <div key={t.cls} className={`tire-item ${t.cls}`}>
          <span className="tire-emoji">{t.emoji}</span>
          <div className={`tire-name ${t.cls}`}>{t.name}</div>
          <div className="tire-desc">{t.desc}</div>
        </div>
      ))}
    </div>
  );
}

function FlagGrid() {
  return (
    <div className="flag-grid">
      {FLAGS.map((f) => (
        <div key={f.name} className="flag-item">
          <span className="flag-emoji">{f.emoji}</span>
          <div className="flag-name">{f.name}</div>
          <div className="flag-meaning">{f.meaning}</div>
        </div>
      ))}
    </div>
  );
}

function LearnCard({ card }) {
  return (
    <div className="learn-card">
      <div className={`card-bar ${card.bar}`} />
      <div className="card-body">
        <div className="card-top">
          <span className="card-icon">{card.icon}</span>
          <span className={`card-category ${card.categoryColor}`}>
            {card.categoryLabel}
          </span>
        </div>
        <h3 className="card-title">{card.title}</h3>
        <p className="card-desc">{card.desc}</p>

        {/* DRS visual */}
        {card.drs && <DrsVisual />}

        {/* Tire grid */}
        {card.tires && <TireGrid />}

        {/* Flag grid */}
        {card.flags && <FlagGrid />}

        {/* Bullet points */}
        {card.points && (
          <ul className={`card-points ${card.tires ? "card-points--spaced" : ""}`}>
            {card.points.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────
export default function F1learning() {
  const [activeFilter, setActiveFilter] = useState("all");

  const visible = CARDS.filter(
    (c) => activeFilter === "all" || c.cat === activeFilter
  );

  return (
    <section className="f1-learning" data-theme="dark">

      {/* Header */}
      <div className="learn-hero">
        <p className="learn-label">F1 Academy</p>
        <h1 className="learn-title">
          New to <span>F1?</span>
          <br />
          Start Here.
        </h1>
        <p className="learn-subtitle">
          Everything you need to understand Formula 1 — from how the cars work
          to what every flag means. No experience needed. 🏁
        </p>

        <div className="beginner-badge">
          🟢 Beginner Friendly — No prior F1 knowledge needed
        </div>

        {/* Filter pills */}
        <div className="learn-filters">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`learn-filter ${activeFilter === f.key ? "active" : ""}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="learn-content">
        <div className="learn-grid">
          {visible.map((card) => (
            <LearnCard key={card.id} card={card} />
          ))}
        </div>
      </div>

      {/* F1 Official Banner */}
      <div className="f1-banner">
        <div className="f1-banner-left">
          <span className="f1-banner-label">Want to go deeper?</span>
          <h2 className="f1-banner-title">Visit the Official F1 Website</h2>
          <p className="f1-banner-sub">Live timing, race results, driver standings & more.</p>
        </div>
        <a
          href="https://www.formula1.com"
          target="_blank"
          rel="noopener noreferrer"
          className="f1-banner-btn"
        >
          GO TO F1.COM →
        </a>
      </div>

    </section>
  );
}