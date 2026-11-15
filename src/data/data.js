export const personalData = {
  name: "Femi Ogunsanya",
  title: "Fullstack Developer",
  tagline: "I break things to understand them, then build things that don't break.",
  location: "Lagos, Nigeria",
  email: "femiogunsanya301@gmail.com",
  github: "https://github.com/fexx301",
  linkedin: "https://www.linkedin.com/in/samuel-ogunsanya-286a0b36b",
  twitter: "https://x.com/fexx_off",
  about:
    "I build full-stack tools that solve real problems — not portfolio filler. My XSS scanner chained WAF detection, DOM sink analysis, and canary injection into a single pipeline and found 12 confirmed vulnerabilities on a live bug bounty target. I care as much about the pipeline behind an interface as the interface itself.",
}

// "At a glance" card in About.
export const profile = [
  ["Based", "Lagos, Nigeria (WAT, UTC+1)"],
  ["Working", "AI engineering · full-stack · security"],
  ["Stack", "TypeScript, Python, Rust"],
  ["Open to", "Remote full-time · freelance · collaborations"],
]

// "Now" section. Add items as they change; an empty list hides its column.
export const now = {
  building: [
    {
      text: "OathCast, a transparent calibration court for short-horizon machine forecasts, for Telegraph Hackathon Season II.",
      link: "https://github.com/fexx301/oathcast",
    },
  ],
  studying: [
    { text: "Inference engineering, with a gamified study web app a friend and I built from the Inference Engineering book." },
  ],
  reading: [],
}

export const projects = [
  {
    id: 6,
    title: "Veto",
    featured: true,
    description:
      "Pins the exact program deployment an AI agent's Solana wallet may call. After any upgrade the agent's call fails on-chain until the operator reviews and re-approves the new code. Backed by a mainnet study of the 117 programs Jupiter routes swaps through: 115 are still upgradeable and at least 67 were upgraded in the last 180 days.",
    tags: ["Rust", "Solana", "JavaScript", "Python"],
    image: "/veto.webp",
    imageContain: true,
    link: "https://veto-demo.duckdns.org",
    github: "https://github.com/fexx301/veto",
  },
  {
    id: 3,
    title: "XSS Scan",
    description:
      "A 6-stage XSS scanner that chains WAF detection, JS-rendered crawling, canary injection, DOM sink analysis, and fuzzing into a single command — automatically selecting WAF-specific bypass payloads for the detected firewall. First real-world run against a Cloudflare-protected bug bounty target: 12 confirmed XSS vulnerabilities, 21 DOM sinks, and an exposed source map leaking the app's original source code.",
    tags: ["Python", "httpx", "BeautifulSoup", "katana", "dalfox", "wafw00f"],
    image: "/xss-scan.webp",
    imageContain: true,
    github: "https://github.com/fexx301/xss-scan",
  },
  {
    id: 7,
    title: "Rehearse",
    description:
      "Replays a Stellar smart contract's real workflow against candidate Wasm, on ledger state captured from the network, and reports every call result and storage entry that changes before you upgrade. Runs in CI on pull requests that change the Wasm; the demo catches a broken v2 that changes 7 of 8 results on real holder state.",
    tags: ["Rust", "Soroban", "Python", "CI"],
    image: "/rehearse.webp",
    link: "https://fexx301.github.io/rehearse/demo/report.html",
    github: "https://github.com/fexx301/rehearse",
  },
  {
    id: 8,
    title: "Fūin",
    description:
      "Makes a private AI benchmark score checkable by anyone, without an account and without the test set. Every answer is signed by the model's attested TEE key, results are committed on NEAR, and scoring runs inside a TEE. The browser verifier refuses tampered certificates: edited answers, inflated scores, forged quotes. Built at the NEAR Hackathon 2026.",
    tags: ["Python", "Rust", "NEAR", "TEE"],
    image: "/fuin.webp",
    link: "https://fuin.duckdns.org/",
    github: "https://github.com/fexx301/fuin",
  },
  {
    id: 9,
    title: "Witness",
    description:
      "Investigates PayPal disputes, including purchases an AI agent made for the buyer: checks what was authorized, what was bought and what arrived, works out whose mistake it was, and drafts the evidence, return offer or refund for a person to approve. Sandbox-only by design. Built for the PayPal AI Hackathon 2026.",
    tags: ["TypeScript", "Node.js", "PayPal APIs", "Claude"],
    image: "/witness.webp",
    link: "https://witness-desk.duckdns.org/?dispute=PP-R-ZLP-10194382",
    github: "https://github.com/fexx301/witness",
  },
  {
    id: 10,
    title: "LevelProof",
    description:
      "Describe a 3D puzzle world in plain language and a model compiles it into a level. A deterministic playtester then explores every reachable state to check it can be won, follows your rules and can't strand the player, replays the failing route when it can't, and offers fixes it has already verified.",
    tags: ["TypeScript", "React", "Three.js", "AI"],
    image: "/levelproof.webp",
    link: "https://levelproof.vercel.app",
    github: "https://github.com/fexx301/levelproof",
  },
]

export const skills = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "HTML5", "CSS3", "Python", "Rust"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Next.js", "FastAPI", "Django", "Tailwind CSS"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "SQLite", "Redis"],
  },
  {
    category: "Tools",
    items: ["Git", "VS Code", "Docker"],
  },
  {
    category: "Concepts",
    items: ["Web Security", "AI Engineering", "Data Pipelines", "API Design", "Web Scraping", "Performance Optimization", "CI/CD"],
  },
]

export const experiences = [
  {
    id: 1,
    role: "IT Intern",
    company: "Lagos Internal Revenue Service",
    period: "2024",
    description:
      "Processed and analyzed large datasets using Excel and SQL to identify patterns. Contributed to optimizing data workflows and documentation procedures, and provided technical support and system administration assistance.",
  },
  {
    id: 2,
    role: "B.Sc. Computer Science",
    company: "Babcock University",
    period: "2021 – 2025",
    description:
      "Coursework in AI, Algorithms & Data Structures, Principles of Software Engineering, Compiler Construction, and Internet Technologies & Web Application Development.",
  },
  {
    id: 3,
    role: "Certifications",
    company: "CompTIA & Oracle",
    period: "July 2025",
    description:
      "CompTIA A+ Core 1 & 2 — Configuring Client Operating Systems. Java SE8 OCA and OCP — Oracle 12c Administrator.",
  },
  {
    id: 4,
    role: "AI Engineering",
    company: "Independent · hackathons & open source",
    period: "2026",
    description:
      "Building AI systems end to end, from agent guardrails to verifiable evaluation. Studying inference engineering with a gamified web app a friend and I built from the Inference Engineering book. Shipped 30 public repos this year, many as hackathon entries: Witness (PayPal AI Hackathon), Fūin (NEAR Hackathon), LevelProof (AI Builder Hackathon), Downstream (FalkorDB Graph Hacks), Squad (Strike Hackathon) and OathCast (Telegraph Hackathon Season II).",
  },
]
