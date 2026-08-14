// Backend Expertise
import CPP from "assets/devicon/cplusplus.svg?component";
import PythonIcon from "assets/devicon/python.svg?component";
import SQLIcon from "assets/devicon/azuresqldatabase.svg?component";
import AWS from "assets/devicon/aws.svg?component";
import Docker from "assets/devicon/docker.svg?component";
import Kubernetes from "assets/devicon/kubernetes.svg?component";
import Linux from "assets/devicon/linux.svg?component";
import Git from "assets/devicon/git.svg?component";
import MongoDB from "assets/devicon/mongodb.svg?component";
import Postman from "assets/devicon/postman.svg?component";
import Jenkins from "assets/devicon/jenkins.svg?component";
import Terraform from "assets/devicon/terraform.svg?component";
import Bitbucket from "assets/devicon/bitbucket.svg?component";
import Confluence from "assets/devicon/confluence.svg?component";
import Bash from "assets/devicon/bash.svg?component";
import PostgreSQL from "assets/devicon/postgresql.svg?component";
import GitLab from "assets/devicon/gitlab.svg?component";
import Ansible from "assets/devicon/ansible.svg?component";
import Azure from "assets/devicon/azure.svg?component";
import Academy from "assets/icons/academy.svg?component";
import Node from "assets/devicon/node.svg?component";
import Briefcase from "assets/icons/briefcase.svg?component";
import OpenAI from "assets/devicon/openai.svg?component";
import Teams from "assets/devicon/teams.svg?component";
import MySQL from "assets/devicon/mysql.svg?component";
import Github from "assets/devicon/github.svg?component";   
import TypeScript from "assets/devicon/ts.svg?component";
import Scrum from "assets/devicon/scrum.svg?component";
import Golang from "assets/devicon/golang.svg?component";
import RestApi from "assets/devicon/restapi.svg?component";
import Certificate from "assets/icons/certificate.svg?component";

const author = {
    author_image: "/author.png",
    name: "Rad Eshghi",
    // Matches the headline on the resume and LinkedIn.
    position: "Backend & DevOps Engineer",
    // Email intentionally NOT stored here. Anything in this file ends up in the
    // JS bundle as plain text, which is exactly what harvesters scrape. It
    // lives base64-encoded in data/contact.js and is decoded only on click.
    location: "Toronto, Ontario",
    socials: {
        github: "rad-tech-spec",
        linkedin: "rad-eshghi",
        youtube: "@RadEshghi",
        medium: "@codewithrad",
    },
    expertises: {
        "Programming Languages": [
            {
                name: "C++",
                icon: CPP,
                description: "",
            },
            {
                name: "Python",
                icon: PythonIcon,
                description: "",
            },
            {
                name: "Golang",
                icon: Golang,
                description: "",
            },
            {
                name: "TypeScript",
                icon: TypeScript,
                description: "",
            },
            {
                name: "Bash",
                icon: Bash,
                description: "",
            },
            {
                name: "SQL",
                icon: SQLIcon,
                description: "",
            }
        ],
        "AI & LLM": {
            currentlyExploring: true,
            items: [
                {
                    name: "Azure",
                    icon: Azure,
                    description: "",
                },
                {
                    name: "Teams",
                    icon: Teams,
                    description: "",
                },
                {
                    name: "OpenAI",
                    icon: OpenAI,
                    description: "",
                },
            ]
        },
        "Backend & Databases": [
            {
                name: "REST APIs",
                icon: RestApi,
                description: "",
            },
            {
                name: "Node.js",
                icon: Node,
                description: "",
            },
            {
                name: "MongoDB",
                icon: MongoDB,
                description: "",
            },
            {
                name: "PostgreSQL",
                icon: PostgreSQL,
                description: "",
            },
            {
                name: "MySQL",
                icon: MySQL,
                description: "",
            },             
        ],
        "Cloud & DevOps": [
            {
                name: "Linux",
                icon: Linux,
                description: "",
            },
            {
                name: "AWS",
                icon: AWS,
                description: "",
            },
            {
                name: "Docker",
                icon: Docker,
                description: "",
            },
            {
                name: "Kubernetes",
                icon: Kubernetes,
                description: "",
            },
            {
                name: "Terraform",
                icon: Terraform,
                description: "",
            },
            {
                name: "Ansible",
                icon: Ansible,
                description: "",
            },
            {
                name: "Jenkins",
                icon: Jenkins,
                description: "",
            },
        ],
        "Version Control & Collaboration": [
            {
                name: "Git",
                icon: Git,
                description: "",
            },            {
                name: "GitHub",
                icon: Github,
                description: "",
            },
            {
                name: "GitLab",
                icon: GitLab,
                description: "",
            },
            {
                name: "Bitbucket",
                icon: Bitbucket,
                description: "",
            },
            {
                name: "Confluence",
                icon: Confluence,
                description: "",
            },
        ],
        "Certifications": {
            items: [
                {
                    // Active clearance — a hard filter for a lot of Toronto
                    // government and enterprise work, and previously nowhere
                    // on the site despite being on the resume and LinkedIn.
                    name: "Gov. of Canada Reliability Status",
                    icon: Certificate,
                    description: "",
                },
                {
                    name: "Scrum Master (CSM)",
                    icon: Scrum,
                    description: "",
                    link: "https://www.scrum-institute.org/badges/26828522021882",
                    linkLabel: "Scrum Master (CSM)",
                },
                {
                    name: "GDG DevFest 2025",
                    icon: Certificate,
                    description: "",
                },
            ],
        },
    },
    /*
     * Titles, dates, employers, and figures are taken from the resume and
     * LinkedIn profile — keep the three in sync when any of them changes.
     *
     * `bullets` mirrors the resume's bullet structure. Wrap text in *asterisks*
     * to emphasise it (same convention as the intro tagline and terminal).
     */
    timeline: [
        {
            icon: Briefcase,
            title: "Projects / Independent Development",
            org: "Self Employed · Freelance",
            subtitle: "Aug. 2025 – Present · Toronto, ON",
            current: true,
            bullets: [
                "Building an AI Teams chatbot with a *RAG pipeline*, using FastAPI, Azure OpenAI, and Teams Toolkit.",
                "Working on a personal health-tech project.",
                "Sharpening my AI, DevOps, and cloud skills — RAG, embeddings, Docker, CI/CD.",
                "Staying active in Toronto's tech scene through DevOps and engineering meetups.",
            ],
        },
        {
            icon: Briefcase,
            title: "Software Developer",
            org: "Actemium Summa Engineering",
            subtitle: "Jan. 2024 – Aug. 2025 · Mississauga, ON",
            bullets: [
                "Built a Python integration connecting cloud-based municipal sensors (water pressure and overflow) to the Historian monitoring system — the company had never worked with cloud data or REST APIs before.",
                "Transformed sensor JSON into the Historian's required schema by mapping every tag and column from documentation, then pushed data in over REST APIs.",
                "Designed the integration as a decoupled, *fault-tolerant pipeline*: buffered readings in a queue when the downstream was unavailable and replayed them in order on recovery, so no data was lost.",
                "Automated collection with scheduled cron jobs, reducing manual intervention by *95%*.",
                "Implemented JWT tokens and SSL certificates for secure handling of sensitive data, and built optimized custom SQL reporting on the Ignition platform.",
            ],
        },
        {
            icon: Briefcase,
            title: "DevOps Engineer — Intern",
            org: "Employment & Social Development Canada",
            subtitle: "Jan. 2023 – Dec. 2023 · Toronto, ON",
            bullets: [
                "Owned an automation project solo: an Ansible playbook triggered by a Jenkins pipeline that collects environment specs and auto-publishes them into a Confluence page, replacing a manual audit that went stale immediately.",
                "Authenticated into each environment using bearer tokens secured with Ansible Vault, pushing inventory through Confluence's REST API.",
                "Assisted in cloud database infrastructure setup using Terraform and Ansible, enhancing configuration management.",
                "Improved CI/CD pipelines through caching, parallelization, and cleanup, increasing deployment speed by *30%*.",
                "Configured API-Curio in an Azure Red Hat OpenShift (ARO) environment and resolved production issues via log analysis, reducing downtime incidents by *10%*.",
            ],
        },
        {
            icon: Academy,
            title: "Honours Bachelor of Technology, Software Development",
            org: "Seneca College",
            subtitle: "Sep. 2019 – Dec. 2023 · North York, ON",
            bullets: [
                "Graduated with a *GPA of 3.7*, completed while working part-time.",
                "Named to the *President's Honour List* in multiple semesters.",
                "Volunteered tutoring other students in the program.",
            ],
        },
        {
            icon: Academy,
            title: "Bachelor of Civil Engineering",
            org: "Ryerson University",
            subtitle: "2018 – 2019",
            bullets: [
                "Started in civil engineering before moving into software development.",
            ],
        },
    ],
};

export default author;
