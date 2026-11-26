export type Project = { title:string; eyebrow:string; summary:string; tags:string[]; href:string; impact:string };
export const portfolio = {
 identity:{name:"Bhavika Karale",role:"Software Engineer",location:"United States · PST",email:"bhavika.hireme@gmail.com",github:"https://github.com/bhavikakarale",linkedin:"https://www.linkedin.com/in/bhavika-karale/"},
 intro:"I build systems that make complex work feel simpler — from reliable data platforms and automation to accessible developer tools.",
 bio:"Bhavika is a software engineer who enjoys the connective tissue of products: the interfaces people use, the systems that keep them dependable, and the thoughtful automation that gives teams time back. She currently builds internal tools and AI-assisted workflows at Adobe, and brings experience across full-stack engineering, distributed systems, data infrastructure, and developer experience.",
 availability:"Open to meeting engineers, builders, and teams working on useful things.",
 projects:[
  {title:"Speech to Code",eyebrow:"Accessibility · Developer tools",summary:"An accessibility-focused developer tool for hands-free JavaScript authoring in VS Code, designed for programmers with repetitive strain injuries.",tags:["Electron","TypeScript","React","Azure Speech"],href:"https://github.com/bhavikakarale/Speech-to-Code",impact:"Real-time speech-to-text, command parsing, and desktop-to-editor communication."},
  {title:"E-commerce Microservices",eyebrow:"Distributed systems",summary:"A service-oriented commerce platform designed around independent scaling, fault isolation, and event-driven communication.",tags:["Node.js","NATS","NGINX","REST"],href:"#",impact:"Service decomposition and message-brokered workflows."},
  {title:"AWS Portfolio Platform",eyebrow:"Cloud infrastructure",summary:"A highly available portfolio and resource-generation platform architected for scale and validated with load testing.",tags:["AWS","Python","DynamoDB","Locust"],href:"https://github.com/bhavikakarale/portfolio-generator-app",impact:"Designed for 10,000 concurrent users with CI/CD and autoscaling."},
 ] satisfies Project[],
 experience:[
  {period:"2025 — now",company:"Adobe",role:"Software Engineer II",detail:"Building automation platforms, AI-assisted operations, and data systems that reduce repetitive work and help teams move with confidence."},
  {period:"2024",company:"Adobe",role:"Software & Data Engineer Intern",detail:"Built automated ETL pipelines and a scalable JIRA ingestion service to improve operational visibility."},
  {period:"2022 — 2023",company:"Persistent Systems",role:"Software Engineer",detail:"Worked across search performance, React experimentation, observability, and testing infrastructure."},
 ], education:["M.S. Data Science · Syracuse University · 2023–2025","B.E. Computer Engineering · Savitribai Phule Pune University · 2017–2022"],
 graph:{nodes:["B.E. Computer Engineering","Persistent Systems","M.S. Data Science · Syracuse","Adobe Software & Data Engineer Intern","Adobe Software Engineer II"],edges:[[0,1],[1,2],[2,3],[3,4]] as [number,number][]},
 grounding:["Bhavika is a software engineer based in the United States (PST).","She is an SDE II at Adobe and previously worked at Persistent Systems.","Her highest education is an M.S. in Data Science from Syracuse University (2023–2025).","Her public contact email is bhavika.hireme@gmail.com. Her LinkedIn is linkedin.com/in/bhavika-karale and GitHub is github.com/bhavikakarale.","Her public work includes Speech to Code, an e-commerce microservices project, and an AWS portfolio platform.","Her skills include TypeScript, React, Node.js, Python, Java, FastAPI, Spring Boot, SQL, Playwright, AWS, and LLM/NLP automation."],
};
