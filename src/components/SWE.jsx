// ── Real problem data from evydsg/Algorithms-DSA ──
const problems = [
  {
    title: "Concatenation of Array",
    category: "Arrays",
    notes: "Return nums + nums. Multiple approaches: using +, nested loops, or append.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Arrays",
  },
  {
    title: "Remove Duplicates from Sorted Array",
    category: "Arrays",
    notes: "Two pointer approach. Compare adjacent elements, shift unique values forward.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Arrays",
  },
  {
    title: "Remove Element",
    category: "Arrays",
    notes: "Two pointer approach. Skip elements equal to val, shift the rest forward in place.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Arrays",
  },
  {
    title: "Valid Parentheses",
    category: "Stacks",
    notes: "Use a hashmap for bracket pairs. Push open brackets, pop and match on close.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Stacks",
  },
  {
    title: "Min Stack",
    category: "Stacks",
    notes: "Use two stacks — one main, one tracking current minimum at each level.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Stacks",
  },
  {
    title: "Path Sum",
    category: "Backtracking",
    notes: "DFS from root to leaf. Track running sum, backtrack by subtracting on return.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Backtracking",
  },
  {
    title: "Subsets",
    category: "Backtracking",
    notes: "At each index, branch into include or exclude. Collect result at base case.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Backtracking",
  },
  {
    title: "Binary Search",
    category: "Binary Search",
    notes: "Classic two-pointer approach. Narrow search space by half each iteration.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Binary%20Search",
  },
  {
    title: "Search a 2D Matrix",
    category: "Binary Search",
    notes: "Two binary searches — first find the right row, then search within that row.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Binary%20Search",
  },
  {
    title: "First Bad Version",
    category: "Binary Search",
    notes: "Binary search on version range. Shrink high when bad found, raise low otherwise.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Binary%20Search",
  },
  {
    title: "Guess Number Higher or Lower",
    category: "Binary Search",
    notes: "Classic binary search using the guess() API to adjust low and high pointers.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Binary%20Search",
  },
  {
    title: "Koko Eating Bananas",
    category: "Binary Search",
    notes: "Binary search on eating speed. Check if total hours ≤ h, minimize valid speed.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Binary%20Search",
  },
  {
    title: "Max Area of Island",
    category: "Graphs",
    notes: "DFS from each unvisited land cell. Count connected 1s, track global maximum.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Graphs",
  },
  {
    title: "Number of Islands",
    category: "Graphs",
    notes: "DFS to sink each island. Increment counter each time a new unvisited 1 is found.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Graphs",
  },
  {
    title: "Rotting Oranges",
    category: "Graphs",
    notes: "BFS from all rotten oranges simultaneously. Track fresh count, return minutes elapsed.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Graphs",
  },
  {
    title: "Shortest Path in Binary Matrix",
    category: "Graphs",
    notes: "BFS with 8-directional movement. First time reaching bottom-right = shortest path.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Graphs",
  },
  {
    title: "Reverse Linked List",
    category: "Linked Lists",
    notes: "Two pointer iterative approach. Reverse next pointers while traversing forward.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Linked%20Lists",
  },
  {
    title: "Merge Two Sorted Lists",
    category: "Linked Lists",
    notes: "Dummy head pointer. Compare nodes from both lists, attach smaller one each step.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Linked%20Lists",
  },
  {
    title: "Design Browser History",
    category: "Linked Lists",
    notes: "Doubly linked list. Visit creates new node forward, back/forward moves the pointer.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Linked%20Lists",
  },
  {
    title: "Design Linked List",
    category: "Linked Lists",
    notes: "Implemented both singly and doubly. Dummy head/tail nodes simplify edge cases.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Linked%20Lists",
  },
  {
    title: "Number of Students Unable to Eat Lunch",
    category: "Linked Lists",
    notes: "Use a counter approach — if no student wants the top sandwich, stop early.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Linked%20Lists",
  },
  {
    title: "Climbing Stairs",
    category: "Recursion",
    notes: "Fibonacci pattern. Each step = sum of previous two. Optimized to O(1) space.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Recursion",
  },
  {
    title: "Merge K Sorted Lists",
    category: "Sorting",
    notes: "Divide and conquer — pair up lists and merge repeatedly until one list remains.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Sorting",
  },
  {
    title: "Search in a Binary Search Tree",
    category: "Trees",
    notes: "Recursive and iterative. Go left if smaller, right if larger, return on match.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Trees",
  },
  {
    title: "Insert into a Binary Search Tree",
    category: "Trees",
    notes: "Traverse to the correct null position following BST order, then insert new node.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Trees",
  },
  {
    title: "Delete Node in a BST",
    category: "Trees",
    notes: "Three cases: leaf, one child, two children. Use inorder successor for two children.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Trees",
  },
  {
    title: "Binary Tree Inorder Traversal",
    category: "Trees",
    notes: "Left → Root → Right. Implemented both recursively and iteratively using a stack.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Trees",
  },
  {
    title: "Kth Smallest Element in a BST",
    category: "Trees",
    notes: "Inorder traversal visits BST in sorted order. Count nodes until reaching kth.",
    github: "https://github.com/evydsg/Algorithms-DSA/tree/master/Trees",
  },
];

// ── Unique categories for filter buttons ──
const categories = ["All", ...new Set(problems.map(p => p.category))];

function SWE() {
  return (
    <section className="swe" id="swe" data-theme="bluenavy">

      <p className="swe-label">Software Engineering</p>
      <h2 className="swe-title">SWE Journey</h2>
      <p className="swe-subtitle">
        My personal solutions, notes, and learnings from Neetcode's roadmap
        and system design study. 🧠
      </p>

      {/* ── TAB SWITCHER ── */}
      <div className="swe-tabs">
        <button className="swe-tab active">⚡ NeetCode</button>
        <button className="swe-tab">🏗 System Design</button>
      </div>

      {/* ── NEETCODE TAB ── */}
      <div className="tab-content active" id="tab-neetcode">

        {/* Stats row */}
        <div className="swe-stats">
          <div className="stat-box">
            <div className="stat-number">29</div>
            <div className="stat-label">Problems Solved</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">10</div>
            <div className="stat-label">Topics Covered</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">2</div>
            <div className="stat-label">Repos</div>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="swe-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`swe-filter ${cat === "All" ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="swe-grid">
          {problems.map((problem) => (
            <div className="swe-card" key={problem.title} data-category={problem.category}>
              <div className="swe-card-top">
                <span className="swe-category">{problem.category}</span>
              </div>
              <h3 className="swe-problem-title">{problem.title}</h3>
              <p className="swe-notes">{problem.notes}</p>
              <div className="swe-links">
                <a href={problem.github} target="_blank" rel="noreferrer" className="swe-link github">
                  GitHub ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Neetcode banner */}
        <div className="neetcode-banner">
          <div className="neetcode-text">
            <h3>📚 Following Neetcode's Roadmap</h3>
            <p>
              Systematically working through arrays, stacks, backtracking, binary search,
              graphs, linked lists, recursion, sorting, trees, and dynamic programming.
            </p>
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