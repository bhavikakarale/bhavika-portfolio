export type Project = { title:string; eyebrow:string; summary:string; tags:string[]; href:string; impact:string };
export const portfolio = {
 identity:{name:"Bhavika Karale",role:"Software Engineer",location:"Seattle, WA · Pacific time",email:"bhavika.hireme@gmail.com",github:"https://github.com/bhavikakarale",linkedin:"https://www.linkedin.com/in/bhavika-karale/"},
 intro:"I build systems that make complex work feel simpler — from reliable data platforms and automation to accessible developer tools.",
 bio:"I enjoy the connective tissue of products: the interfaces people use, the systems that keep them dependable, and the thoughtful automation that gives teams time back. I bring experience across full-stack engineering, distributed systems, data infrastructure, and developer experience.",
 availability:"I’m open to meeting engineers, builders, and teams working on useful things.",
 projects:[
  {title:"Speech to Code",eyebrow:"Accessibility · Developer tools",summary:"I built an accessibility-focused developer tool for hands-free JavaScript authoring in VS Code.",tags:["Electron","TypeScript","React","Azure Speech"],href:"https://github.com/bhavikakarale/Speech-to-Code",impact:"I connected real-time speech-to-text, command parsing, and desktop-to-editor communication."},
  {title:"E-commerce Microservices",eyebrow:"Distributed systems",summary:"I designed a service-oriented commerce platform around independent scaling, fault isolation, and event-driven communication.",tags:["Node.js","NATS","NGINX","REST"],href:"#",impact:"I explored service decomposition and message-brokered workflows."},
  {title:"AWS Portfolio Platform",eyebrow:"Cloud infrastructure",summary:"I built a highly available portfolio and resource-generation platform and validated it with load testing.",tags:["AWS","Python","DynamoDB","Locust"],href:"https://github.com/bhavikakarale/portfolio-generator-app",impact:"I designed for 10,000 concurrent users with CI/CD and autoscaling."},
 ] satisfies Project[],
 experience:[
  {period:"2025 — now",company:"Adobe",role:"Software Engineer II",detail:"I build automation platforms, AI-assisted operations, and data systems that reduce repetitive work and help teams move with confidence."},
  {period:"2024",company:"Adobe",role:"Software & Data Engineer Intern",detail:"I built automated ETL pipelines and a scalable JIRA ingestion service to improve operational visibility."},
  {period:"2022 — 2023",company:"Persistent Systems",role:"Software Engineer",detail:"I worked across search performance, React experimentation, observability, and testing infrastructure."},
 ], education:[
  {school:"Syracuse University",degree:"M.S. Data Science",period:"2023 — 2025",gpa:"3.94 / 4.0",subjects:["Big Data Analytics","Applied Machine Learning","Data Warehousing","Cloud Management","Database Management"]},
  {school:"Savitribai Phule Pune University",degree:"B.E. Computer Engineering",period:"2017 — 2022",gpa:"8.0 / 10",subjects:["High-Performance Computing","AI & Robotics","Data Analytics","Data Mining & Warehousing","Software Testing & QA"]},
 ],
 skills:{languages:["TypeScript","JavaScript","Python","Java","SQL"],frameworks:["React","Next.js","Node.js","FastAPI","Spring Boot"],platforms:["AWS","Docker","Playwright","PostgreSQL","DynamoDB"]},
 grounding:["I am a software engineer based in the United States (PST).","I am an SDE II at Adobe and previously worked at Persistent Systems.","My highest education is an M.S. in Data Science from Syracuse University (2023–2025).","My public contact email is bhavika.hireme@gmail.com. My LinkedIn is linkedin.com/in/bhavika-karale and GitHub is github.com/bhavikakarale.","My public work includes Speech to Code, an e-commerce microservices project, and an AWS portfolio platform.","My skills include TypeScript, React, Node.js, Python, Java, FastAPI, Spring Boot, SQL, Playwright, AWS, and LLM/NLP automation."],
};
