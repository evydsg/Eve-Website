//SWE Section
function SWE(){
    return (
        <section className ="swe" data-theme="bluenavy">

            <p className="swe-label">Software Engineering</p>

            <h2 className ="swe-title">SWE Journey</h2>

            <p className="swe-subtitle">
                My personal solutions, notes, and learnings from Neetcode's roadmap, and system design study. 🧠
            </p>

            <div className="swe-tabs">
                <button className="swe-tab active">⚡ NeetCode</button>
                <button className="swe-tab">🏗 System Design</button>
            </div>

            <div className="tab-content active" id="tab-neetcode"></div>

            <div className="swe-stats">
                <div className="stat-box">
                    <div className="stat-number"></div>
                    <div className="stat-label">Problems Solved</div>
                </div>

                <div className="stat-box">
                    <div className="stat-number"></div>
                </div>
            </div>

            <div className="swe-filters">
                <button className="swe-filter-acive">All</button>
                <button className="swe-filter"></button>
                <button className="swe-filter"></button>
                <button className="swe-filter"></button>
                <button className="swe-filter"></button>
                <button className="swe-filter"></button>
                <button className="swe-filter"></button>
                <button className="swe-filter"></button>
                <button className="swe-filter"></button>
            </div>

            <div className="swe-grid">
                <div className="swe-card" data-category="">
                    <div className = "swe-card-top">
                        <span className="swe-category"></span>
                    </div>

                    <h3 className="swe-problem-title"></h3>
                    <p className="swe-notes"></p>
                    <div className="swe-links">
                    <a href="#" className="swe-link github">GitHub ↗</a>
                    </div>
                </div>

                <div className="neetcode-banner">
                    <div className="neetcode-text">
                    <h3>📚 Following Neetcode's Roadmap</h3>
                    <p>Systematically working through arrays, hashing, sliding window, two pointers, binary search, linked lists, trees, graphs, and dynamic programming.</p>
                    </div>
                    <a href="https://neetcode.io" target="_blank" rel="noreferrer" className="neetcode-btn">
                        NEETCODE ROADMAP ↗
                    </a>
                </div>
            </div>

            <div className="tab-content" id="tab-systemdesign">
                <div className="stat-box">
                    <div className="stat-number"></div>
                        <div className="stat-label">Concepts Studied
                    </div>

                    <div className="stat-box">
                        <div className="stat-number"></div>
                        <div className="stat-label">Systems Designed</div>
                    </div>


                    <div className="stat-box">
                        <div className="stat-number"></div>
                        <div className="stat-label">Mock Interviews</div>
                    </div>
                </div>

                <div className="sd-grid">
                    <div className="sd-card">
                        <div className="sd-card-header">
                            <span className="sd-icon"></span>
                            ⚖️
                            <h3 className="sd-card-title"></h3>
                        </div>

                        <span className="sd-tag">Core Concept</span>
                        <p className="sd-notes">Distributes incoming traffic across multiple servers to prevent overload on a single machine.</p>
                        <ul className="sd-keypoints">
                        <li>Round Robin — requests distributed evenly in order</li>
                        <li>Least Connections — route to server with fewest active connections</li>
                        <li>Consistent Hashing — used in distributed caches like Redis</li>
                        <li>My note: Think of it as a traffic cop for your servers 🚦</li>
                        </ul>
                    </div>

                    <div className="sd-card">
                        <div className="sd-card-header">
                            <span className="sd-icon"></span>
                            ⚖️
                            <h3 className="sd-card-title"></h3>
                        </div>

                        <span className="sd-tag">Core Concept</span>
                        <p className="sd-notes">Distributes incoming traffic across multiple servers to prevent overload on a single machine.</p>
                        <ul className="sd-keypoints">
                        <li>Round Robin — requests distributed evenly in order</li>
                        <li>Least Connections — route to server with fewest active connections</li>
                        <li>Consistent Hashing — used in distributed caches like Redis</li>
                        <li>My note: Think of it as a traffic cop for your servers 🚦</li>
                        </ul>
                    </div>

                    <div className="sd-card">
                        <div className="sd-card-header">
                            <span className="sd-icon"></span>
                            ⚖️
                            <h3 className="sd-card-title"></h3>
                        </div>

                        <span className="sd-tag">Core Concept</span>
                        <p className="sd-notes">Distributes incoming traffic across multiple servers to prevent overload on a single machine.</p>
                        <ul className="sd-keypoints">
                        <li>Round Robin — requests distributed evenly in order</li>
                        <li>Least Connections — route to server with fewest active connections</li>
                        <li>Consistent Hashing — used in distributed caches like Redis</li>
                        <li>My note: Think of it as a traffic cop for your servers 🚦</li>
                        </ul>
                    </div>

                    <div className="sd-card">
                        <div className="sd-card-header">
                            <span className="sd-icon"></span>
                            ⚖️
                            <h3 className="sd-card-title"></h3>
                        </div>

                        <span className="sd-tag">Core Concept</span>
                        <p className="sd-notes">Distributes incoming traffic across multiple servers to prevent overload on a single machine.</p>
                        <ul className="sd-keypoints">
                        <li>Round Robin — requests distributed evenly in order</li>
                        <li>Least Connections — route to server with fewest active connections</li>
                        <li>Consistent Hashing — used in distributed caches like Redis</li>
                        <li>My note: Think of it as a traffic cop for your servers 🚦</li>
                        </ul>
                    </div>

                    <div className="sd-card">
                        <div className="sd-card-header">
                            <span className="sd-icon"></span>
                            ⚖️
                            <h3 className="sd-card-title"></h3>
                        </div>

                        <span className="sd-tag">Core Concept</span>
                        <p className="sd-notes">Distributes incoming traffic across multiple servers to prevent overload on a single machine.</p>
                        <ul className="sd-keypoints">
                        <li>Round Robin — requests distributed evenly in order</li>
                        <li>Least Connections — route to server with fewest active connections</li>
                        <li>Consistent Hashing — used in distributed caches like Redis</li>
                        <li>My note: Think of it as a traffic cop for your servers 🚦</li>
                        </ul>
                    </div>
                    
                </div>

            </div>
        </section>
    )
}
export default SWE;