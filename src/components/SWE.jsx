import { useState } from 'react';

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

// ── Real System Design data from evydsg/System-Design-Beginners ──
const systemDesign = [
  {
    icon: "🌐",
    title: "HTTP",
    tag: "APIs",
    notes: "Request/response protocol built on TCP. Covers GET, POST, PUT, DELETE, status codes, and HTTPS via SSL/TLS.",
    keypoints: [
      "GET retrieves, POST creates, PUT updates, DELETE removes",
      "Status codes: 2xx success, 4xx client error, 5xx server error",
      "HTTPS = HTTP + TLS for encrypted communication",
      "Headers carry metadata like content type and cookies",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/APIs",
  },
  {
    icon: "🔌",
    title: "API Design",
    tag: "APIs",
    notes: "Design principles for building clean, scalable APIs. Covers CRUD, endpoints, versioning, and pagination.",
    keypoints: [
      "CRUD maps to GET, POST, PUT/PATCH, DELETE",
      "Version APIs (v1, v2) to manage breaking changes",
      "Use pagination (limit + offset) for large datasets",
      "Backward compatibility — new params should be optional",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/APIs",
  },
  {
    icon: "⚡",
    title: "WebSocket",
    tag: "APIs",
    notes: "Protocol for real-time bidirectional communication. Solves HTTP polling limitations for chat, gaming, and live streaming.",
    keypoints: [
      "Persistent connection — no repeated polling needed",
      "Handshake via HTTP Upgrade request → 101 Switching Protocols",
      "WS uses port 80, WSS uses port 443",
      "Used by Twitch live chat for real-time messaging",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/APIs",
  },
  {
    icon: "🔄",
    title: "API Paradigms",
    tag: "APIs",
    notes: "REST, GraphQL, and gRPC — three approaches to building APIs, each with different tradeoffs.",
    keypoints: [
      "REST — stateless, HTTP-based, JSON responses",
      "GraphQL — query exactly what you need, no over/under-fetching",
      "gRPC — binary protocol buffers, built on HTTP/2, great for microservices",
      "REST for web apps, GraphQL for flexible clients, gRPC for speed",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/APIs",
  },
  {
    icon: "📋",
    title: "Design Requirements",
    tag: "Background",
    notes: "Core metrics every system must consider: availability, reliability, fault tolerance, throughput, and latency.",
    keypoints: [
      "Availability = uptime / total time. Target: 99.999%",
      "Fault tolerance via horizontal scaling and backup servers",
      "Throughput = requests/second. Scale horizontally or vertically",
      "Latency reduced by CDNs and geographically closer servers",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/Background",
  },
  {
    icon: "💻",
    title: "Computer Architecture",
    tag: "Background",
    notes: "How Disk, RAM, Cache, and CPU interact. Understanding storage speed and size tradeoffs.",
    keypoints: [
      "Disk — persistent, large (GB/TB), slowest",
      "RAM — temporary, medium (GB), faster than disk",
      "Cache — fastest, smallest (MB), stores frequently used data",
      "CPU reads/writes from RAM and executes instructions",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/Background",
  },
  {
    icon: "🏗️",
    title: "Application Architecture",
    tag: "Background",
    notes: "How servers, clients, scaling, and monitoring fit together in a real production system.",
    keypoints: [
      "Vertical scaling — upgrade one server's resources",
      "Horizontal scaling — add more servers, more complex",
      "Load balancer distributes traffic evenly across servers",
      "Logging + metrics + alerts for monitoring system health",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/Background",
  },
  {
    icon: "📨",
    title: "Message Queues",
    tag: "Big Data",
    notes: "Buffer between producers and consumers for async processing. Handles traffic spikes without overloading servers.",
    keypoints: [
      "Pull model — server pulls when ready. Push model — queue pushes immediately",
      "ACK required — if not received, message is resent",
      "Pub/Sub — publishers and subscribers decoupled via topics",
      "New subscribers can be added without changing publishers",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/Big%20Data",
  },
  {
    icon: "🗺️",
    title: "MapReduce",
    tag: "Big Data",
    notes: "Distributed processing model for large datasets. Map → Shuffle → Reduce across multiple worker nodes.",
    keypoints: [
      "Batch processing — scheduled jobs on large datasets",
      "Stream processing — real-time as data arrives",
      "Map phase creates key-value pairs from input data",
      "Reduce phase aggregates grouped results into final output",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/Big%20Data",
  },
  {
    icon: "💾",
    title: "Caching",
    tag: "Caching Basics",
    notes: "Store copies of data closer to the CPU or user to reduce latency. Write strategies and eviction policies.",
    keypoints: [
      "Write-through — write to cache and disk simultaneously",
      "Write-back — write to cache first, disk later (faster but risky)",
      "LRU eviction — remove least recently used data",
      "Cache hit ratio measures caching efficiency",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/Caching%20Basics",
  },
  {
    icon: "🌍",
    title: "CDN",
    tag: "Caching Basics",
    notes: "Network of globally distributed edge servers that cache and serve content closer to users.",
    keypoints: [
      "Push CDN — content preloaded to all servers upfront",
      "Pull CDN — content fetched on first request, cached after",
      "Reduces latency, improves reliability via redundancy",
      "Cache-Control: public allows CDN caching",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/Caching%20Basics",
  },
  {
    icon: "🌐",
    title: "Networking Basics",
    tag: "Networking",
    notes: "How machines communicate using IP addresses, packets, ports, and network layers.",
    keypoints: [
      "IPv4 (32-bit) vs IPv6 (128-bit) address spaces",
      "Data travels in packets: IP header + TCP header + payload",
      "Ports 0-65535 identify applications on a device",
      "Public IP (router) vs private IP (local device)",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/Networking",
  },
  {
    icon: "🔗",
    title: "TCP & UDP",
    tag: "Networking",
    notes: "Two transport protocols with different tradeoffs: TCP for reliability, UDP for speed.",
    keypoints: [
      "TCP — reliable, ordered, connection-oriented (3-way handshake)",
      "UDP — fast, connectionless, no delivery guarantee",
      "TCP for email/messaging, UDP for streaming/gaming/DNS",
      "TCP requires ACK for every packet — slower but safe",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/Networking",
  },
  {
    icon: "🔍",
    title: "DNS",
    tag: "Networking",
    notes: "The internet's phone book — translates domain names to IP addresses.",
    keypoints: [
      "A record maps domain to IPv4 address",
      "ICANN manages domain assignments globally",
      "URL anatomy: protocol + subdomain + domain + TLD + path",
      "HTTP uses port 80, HTTPS uses port 443",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/Networking",
  },
  {
    icon: "🔀",
    title: "Proxies & Load Balancers",
    tag: "Proxies",
    notes: "Forward proxies hide clients, reverse proxies hide servers. Load balancers distribute traffic efficiently.",
    keypoints: [
      "Forward proxy — masks client identity, used for anonymous browsing",
      "Reverse proxy — hides server, used for CDNs and API gateways",
      "Round Robin, Weighted, Least Connections, Hashing strategies",
      "Layer 4 routes by IP/port, Layer 7 routes by URL/headers",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/Proxies",
  },
  {
    icon: "💍",
    title: "Consistent Hashing",
    tag: "Proxies",
    notes: "Ring-based hashing that minimizes reassignments when servers are added or removed.",
    keypoints: [
      "Regular hashing: Hash(IP) % servers — breaks when servers change",
      "Ring structure maps both requests and servers to positions",
      "On failure, only that server's requests reassign to next clockwise",
      "Reduces cache misses compared to regular hashing",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/Proxies",
  },
  {
    icon: "🗄️",
    title: "SQL",
    tag: "Storage",
    notes: "Relational databases using tables, primary keys, foreign keys, and ACID transactions.",
    keypoints: [
      "B+ Trees enable efficient queries — data in sorted leaf nodes",
      "ACID: Atomicity, Consistency, Isolation, Durability",
      "Foreign keys enforce relationships between tables",
      "Joins combine records across tables on common columns",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/Storage",
  },
  {
    icon: "📦",
    title: "NoSQL",
    tag: "Storage",
    notes: "Non-relational databases optimized for scale and flexibility. Four types: Key-Value, Document, Wide-Column, Graph.",
    keypoints: [
      "Key-Value — Redis, fast in-memory lookups",
      "Document — MongoDB, flexible JSON-like schemas",
      "Wide-Column — Cassandra, optimized for high write throughput",
      "Graph — Neo4j, models complex relationships like social networks",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/Storage",
  },
  {
    icon: "🔁",
    title: "Replication & Sharding",
    tag: "Storage",
    notes: "Replication copies data for availability. Sharding splits data across machines for scale.",
    keypoints: [
      "Leader-follower: leader writes, followers replicate",
      "Synchronous — strong consistency but higher latency",
      "Asynchronous — faster writes but risk of data loss",
      "Sharding splits data by range or hash across multiple nodes",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/Storage",
  },
  {
    icon: "⚖️",
    title: "CAP Theorem",
    tag: "Storage",
    notes: "Distributed systems can only guarantee two of three: Consistency, Availability, Partition Tolerance.",
    keypoints: [
      "Partition Tolerance is unavoidable — always required",
      "CP — consistent but may reject requests during partition",
      "AP — always responds but may return stale data",
      "PACELC extends CAP: also consider latency vs consistency",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/Storage",
  },
  {
    icon: "☁️",
    title: "Design Google Drive",
    tag: "Mock Interview",
    notes: "Cloud storage system design covering object storage, chunking, deduplication, and replication.",
    keypoints: [
      "Files split into chunks — parallel uploads, resume on failure",
      "Object storage (S3) for files, metadata DB for file info",
      "Content-based hashing enables deduplication across users",
      "Folders are logical pointers — not physical structures",
    ],
    github: "https://github.com/evydsg/System-Design-Beginners/tree/main/Questions",
  },
];

// ── Unique tags for System Design filter ──
const sdTags = ["All", ...new Set(systemDesign.map(s => s.tag))];

// ── Unique categories for filter buttons ──
const categories = ["All", ...new Set(problems.map(p => p.category))];

function SWE() {
  const [activeTab, setActiveTab] = useState('neetcode'); // tracks which tab is active
  const [activeFilter, setActiveFilter] = useState('All'); // tracks which category filter is active
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
      <button
        className={`swe-tab ${activeTab === 'neetcode' ? 'active' : ''}`}
        onClick={() => setActiveTab('neetcode')}
      >
        ⚡ NeetCode
      </button>
      <button
        className={`swe-tab ${activeTab === 'systemdesign' ? 'active' : ''}`}
        onClick={() => setActiveTab('systemdesign')}
      >
        🏗 System Design
      </button>
      </div>

      {/* ── NEETCODE TAB ── */}
      <div className={`tab-content ${activeTab === 'neetcode' ? 'active' : ''}`}>

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
            className={`swe-filter ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

        {/* Cards grid */}
        <div className="swe-grid">
        {problems
          .filter(problem => activeFilter === 'All' || problem.category === activeFilter)
          .map((problem) => (
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

            {/* ── SYSTEM DESIGN TAB ── */}
            {/* ── SYSTEM DESIGN TAB ── */}
              <div className={`tab-content ${activeTab === 'systemdesign' ? 'active' : ''}`}>

              {/* Stats row */}
              <div className="swe-stats">
                <div className="stat-box">
                  <div className="stat-number">21</div>
                  <div className="stat-label">Concepts Studied</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">7</div>
                  <div className="stat-label">Topics Covered</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">1</div>
                  <div className="stat-label">Mock Interview</div>
                </div>
              </div>

              {/* System Design cards */}
              <div className="sd-grid">
                {systemDesign.map((item) => (
                  <div className="sd-card" key={item.title}>
                    <div className="sd-card-header">
                      <span className="sd-icon">{item.icon}</span>
                      <h3 className="sd-card-title">{item.title}</h3>
                    </div>
                    <span className="sd-tag">{item.tag}</span>
                    <p className="sd-notes">{item.notes}</p>
                    <ul className="sd-keypoints">
                      {item.keypoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                    <div className="swe-links" style={{ marginTop: '16px' }}>
                      <a href={item.github} target="_blank" rel="noreferrer" className="swe-link github">
                        GitHub ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Neetcode System Design banner */}
            <div className="neetcode-banner">
              <div className="neetcode-text">
                <h3>🏗️ Following Neetcode's System Design Roadmap</h3>
                <p>
                  Systematically working through networking, caching, storage, APIs,
                  proxies, big data, and real-world system design interviews.
                </p>
              </div>
              <a href="https://neetcode.io/" target="_blank" rel="noreferrer" className="neetcode-btn">
                SYSTEM DESIGN ROADMAP ↗
              </a>
            </div>

              </div>
        </section>
    )
}
export default SWE;