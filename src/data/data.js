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
    "I build full-stack tools that solve real problems — not portfolio filler. My XSS scanner chained WAF detection, DOM sink analysis, and canary injection into a single pipeline and found 12 confirmed vulnerabilities on a live bug bounty target. My job-search tool filters noisy API feeds down to the 20% of listings that actually matter. I work mainly in React and Python/FastAPI, and I care as much about the pipeline behind an interface as the interface itself.",
}

export const projects = [
  {
    id: 3,
    title: "XSS Scan",
    description:
      "A 6-stage XSS scanner that chains WAF detection, JS-rendered crawling, canary injection, DOM sink analysis, and fuzzing into a single command — automatically selecting WAF-specific bypass payloads for the detected firewall. First real-world run against a Cloudflare-protected bug bounty target: 12 confirmed XSS vulnerabilities, 21 DOM sinks, and an exposed source map leaking the app's original source code.",
    tags: ["Python", "httpx", "BeautifulSoup", "katana", "dalfox", "wafw00f"],
    image: "/xss-hunter.png",
    imageContain: true,
    link: "#",
    github: "https://github.com/fexx301/xss-Hunter",
  },
  {
    id: 5,
    title: "Hacklist",
    description:
      "A scraping pipeline that crawls Devpost, MLH, Devfolio, HackerEarth and two other platforms daily. FastAPI deduplicates and serves the data; a Next.js frontend filters by source, status, and prize pool.",
    tags: ["Next.js", "FastAPI", "Python", "Web Scraping"],
    image: "/hacklist.png",
    link: "#",
    github: "#",
  },
  {
    id: 1,
    title: "Sift",
    description:
      "A personal job radar that aggregates listings from several public APIs and filters ~80% of fetched roles as location-restricted, irrelevant, or duplicate — surfacing only remote-friendly positions open to applicants outside the US/UK/EU. Dedupes into SQLite and serves auto-refreshing feeds on a FastAPI dashboard.",
    tags: ["FastAPI", "Python", "SQLite", "REST APIs"],
    image: "/sift.png",
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Phosphor Pipeline",
    description:
      "A local web UI that orchestrates multi-agent AI pipelines, chaining the Claude, Codex, and Cline CLIs into structured workflows — plan-execute-review chains, parallel fan-outs, deliberative councils, and verify-fix loops. Runs entirely on subscription plans (no API keys) with per-step model selection, read-only and git-tracked write modes, live SSE streaming, and token telemetry.",
    tags: ["Python", "Flask", "SSE", "Git", "Multi-Agent AI"],
    image: "/phosphor.png",
    link: "#",
    github: "https://github.com/fexx301/phosphor-pipeline",
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
    items: ["Git", "VS Code", "Docker", "Kubernetes", "Firebase"],
  },
  {
    category: "Concepts",
    items: ["Web Security", "Data Pipelines", "API Design", "Web Scraping", "Performance Optimization", "CI/CD"],
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
]
