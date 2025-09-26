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

const author = {
    author_image: "/author.png",
    name: "Rad Eshghi",
    position: "Software Developer",
    email: "wins_airy0s@icloud.com",
    location: "Toronto, Ontario",
    socials: {
        github: "rad-tech-spec",
        linkedin: "rad-eshghi",
        youtube: "@RadEshghi",
        medium: "@eshghirad97",
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
                    name: "Scrum",
                    icon: Scrum,
                    description: "",
                    link: "https://www.scrum-institute.org/badges/26828522021882",
                    linkLabel: "Scrum Master",
                },
            ],
        },
    },
    timeline: [
        {
            icon: Briefcase,
            title: "Independent Study in Cloud-Native Architecture & AI Tools",
            subtitle: "July. 2025",
            description: "Exploring advanced backend patterns, container orchestration, and experimenting with AI-driven automation. Building small-scale prototypes and sharing insights through blog posts and GitHub projects.",
            currently: true
        },
        {
            icon: Briefcase,
            title: "Software Developer at Actemium Canada",
            subtitle: "Jun. 2024 - Aug. 2025",
            description: "Developed a store-and-forward system that reduced manual intervention by 40% and improved profitability through automated reporting using Python. Setup security using JWT tokens and SSL certifications for secure data handling. Automated system execution using Linux Cron jobs, reducing manual intervention by 40%. Created a reporting system with the Ignition platform using multiple optimized custom SQL queries. Researched new opportunities, promoted the application, and successfully improved company services and profitability.",
        },
        {
            icon: Briefcase,
            title: "DevOps at Employment and Social Development Canada (ESDC) - Intern",
            subtitle: "Jan. 2023 - Dec. 2023",
            description: "Assisted in setting up cloud database infrastructure using Terraform and Ansible for configuration management.Optimized CI/CD pipelines with Jenkins, boosting deployment speed by 30%.Built and deployed automated services with Ansible, YAML, and Bash scripting.Configured API-Curio in an Azure Red Hat OpenShift environment, streamlining API integration. Monitored production systems, identifying and resolving issues proactively to reduce downtime. Attended daily stand-ups, sprint planning, and retrospectives in a Scrum environment to ensure timely project delivery.",
        },
        {
            icon: Academy,
            title: "Seneca Polytechnic",
            subtitle: "Sep. 2019 - Dec. 2023",
            description: "Earned a Honors in Software Development with <b>3.75 GPA</b> while working part-time. Named on presidents honors list in multiple semesters. Volunteered on tutoring other students in similar field.",
        },
    ],
};

export default author;
