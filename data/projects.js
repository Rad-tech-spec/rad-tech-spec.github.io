/**
 * Project entries.
 *
 * video — optional walkthrough. Use ONE of:
 *   { youtube: "VIDEO_ID" }        preferred; embeds via youtube-nocookie
 *   { src: "/videos/name.mp4" }    a file under public/
 * Both accept an optional `poster: "/videos/name.jpg"` thumbnail.
 *
 * Leave `video` empty and the card shows a "walkthrough coming soon" panel, so
 * the layout stays correct until you've finished editing them.
 *
 * NOTE on self-hosting video: GitHub Pages caps repos at ~1GB with a 100MB
 * per-file limit, and video is the fastest way to hit both. YouTube (unlisted
 * if you don't want it public) keeps the repo small and streams better.
 */
const projectsData = [
  {
    title: "This Site",
    description: `The site you're reading. A statically generated Nuxt 3 portfolio on GitHub Pages, with an AI agent that answers questions about my background — grounded only in the site's own content, and served by a Cloudflare Worker so the API key never reaches the browser.`,
    imgSrc: "",
    href: "https://rad-tech-spec.github.io",
    github: "https://github.com/Rad-tech-spec/rad-tech-spec.github.io",
    techs: ["Nuxt 3", "Tailwind CSS", "Cloudflare Workers", "Claude API"],
    visibility: "public",
    current: true,
    video: {},
  },
  {
    title: "Ario",
    description: `A Teams 365 multi-agent chatbot helped employees save time by automating vendor queries and order lookups.`,
    imgSrc: "",
    href: "#",
    github: "",
    techs: ["Python", "Typescript", "Azure", "Teams"],
    visibility: "private",
    current: true,
    video: {},
  },
  {
    title: "My Doctors App",
    description: `An app to manage doctor's appointments, prescriptions, and medical history.`,
    imgSrc: "",
    href: "#",
    github: "https://github.com/Rad-tech-spec/MyDoctor",
    techs: ["Typescript", "Angular", "HTML", "CSS"],
    visibility: "public",
    video: {},
  },
  {
    title: "TagFlow",
    description: `This system reduced manual tagging by automating JSON-to-tag transformation.`,
    imgSrc: "",
    href: "",
    github: "https://github.com/Rad-tech-spec/Tag-Management-System",
    techs: ["Python", "Shell", "SQL"],
    visibility: "public",
    video: {},
  },
  {
    title: "Fragments-Microservice",
    description: `A cloud-based microservice on AWS for securely storing, retrieving, and managing diverse text and image fragments from IoT devices, mobile apps, and factory systems.`,
    imgSrc: "",
    href: "#",
    github: "https://github.com/Rad-tech-spec/Fragments-Microservice",
    techs: ["AWS (EC2, S3, RDS, Cognito)", "Javascript", "Docker"],
    visibility: "public",
    video: {},
  },
  {
    title: "Library Management System",
    description: `A desktop application to manage books, members, and loans in a library setting.`,
    imgSrc: "",
    href: "",
    github: "https://github.com/Rad-tech-spec/Librarian-System",
    techs: ["Java (Spring Boot, JavaFX)", "PostgreSQL (JDBC)", "Heroku"],
    visibility: "public",
    video: {},
  },
  {
    title: "Simulated Assembly Line",
    description: `A C++ program that simulates an assembly line process using object-oriented programming principles. It models various stations, tasks, and workflows involved in a manufacturing assembly line.`,
    imgSrc: "",
    href: "",
    github: "https://github.com/Rad-tech-spec/Simulated-Assembly-Line",
    techs: ["C++", "OOP"],
    visibility: "public",
    video: {},
  },
];

export default projectsData;
