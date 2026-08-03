export const orientationQuestions = [
  {
    id: 1,
    question: "When starting a technical project, what type of work excites you most?",
    options: [
      { id: "a", text: "Designing visual layouts and creating interactive websites that run in a browser.", track: "web" },
      { id: "b", text: "Building mobile smartphone apps that people install on their Android or iOS devices.", track: "mobile" },
      { id: "c", text: "Investigating network security, finding system vulnerabilities, and defending data.", track: "cyber" },
      { id: "d", text: "Analyzing numbers, finding hidden patterns in datasets, and building AI models.", track: "data-ai" },
      { id: "e", text: "Automating server deployments, managing Linux clouds, and keeping networks 100% online.", track: "devops" }
    ]
  },
  {
    id: 2,
    question: "How do you prefer to approach problem-solving?",
    options: [
      { id: "a", text: "Building visual prototypes quickly and refining the interface based on user feedback.", track: "web" },
      { id: "b", text: "Designing touch-friendly screens and testing app performance on different phone models.", track: "mobile" },
      { id: "c", text: "Methodically analyzing logs, dissecting protocols, and patching security weaknesses.", track: "cyber" },
      { id: "d", text: "Applying statistical formulas, evaluating data correlation, and tuning prediction metrics.", track: "data-ai" },
      { id: "e", text: "Writing shell scripts to automate repetitive manual work across multiple cloud servers.", track: "devops" }
    ]
  },
  {
    id: 3,
    question: "What kind of project output would make you feel proudest?",
    options: [
      { id: "a", text: "A clean, fast web application used by thousands of users across Cameroon.", track: "web" },
      { id: "b", text: "A top-rated mobile app available on the Google Play Store.", track: "mobile" },
      { id: "c", text: "A security audit report confirming an organization is 100% safe from cyber attacks.", track: "cyber" },
      { id: "d", text: "An AI prediction model that helps local businesses or healthcare providers make smart decisions.", track: "data-ai" },
      { id: "e", text: "An automated cloud system that deploys code updates without a single second of downtime.", track: "devops" }
    ]
  },
  {
    id: 4,
    question: "Which description best matches your core personality and mindset?",
    options: [
      { id: "a", text: "Inventor — I love turning creative ideas into visual web products.", track: "web" },
      { id: "b", text: "Creator — I love creating touch-based utility apps for smartphones.", track: "mobile" },
      { id: "c", text: "Defender — I love auditing systems, finding security flaws, and stopping threats.", track: "cyber" },
      { id: "d", text: "Analyst — I love exploring data, statistics, and teaching computers to learn.", track: "data-ai" },
      { id: "e", text: "Infrastructure Architect — I love building cloud pipes, Docker containers, and server networks.", track: "devops" }
    ]
  },
  {
    id: 5,
    question: "Which working environment & toolset would you enjoy spending your days in?",
    options: [
      { id: "a", text: "Browsers, CSS layouts, HTML elements, and JavaScript frameworks.", track: "web" },
      { id: "b", text: "Mobile SDKs, Flutter widgets, and smartphone emulators.", track: "mobile" },
      { id: "c", text: "Command line terminals, network packet sniffers (Wireshark), and security suites.", track: "cyber" },
      { id: "d", text: "Python notebooks, statistical charts, datasets, and machine learning models.", track: "data-ai" },
      { id: "e", text: "Linux bash consoles, Docker containers, GitHub actions, and AWS cloud dashboards.", track: "devops" }
    ]
  }
];

export const foundationAreas = [
  { id: "problem-solving", title: "Problem-Solving & Algorithmic Thinking", description: "Breaking down complex problems into logical steps, flowcharts, pseudo-code, and algorithm design." },
  { id: "command-line", title: "Command Line Basics", description: "Navigating directory structures, inspecting files, managing system permissions, and executing bash shell commands." },
  { id: "git", title: "Git & Version Control", description: "Cloning repositories, making atomic commits, branch workflows, pull requests, and resolving merge conflicts." },
  { id: "databases", title: "Databases 101", description: "Relational database architecture, SQL SELECT/INSERT/UPDATE/DELETE queries, joins, indexes, and schema design." },
  { id: "internet", title: "Internet Fundamentals", description: "DNS domain resolution, HTTP/HTTPS request-response cycles, IP addressing, TCP/IP handshake, and TLS security." },
  { id: "english-vocab", title: "English Technical Vocabulary", description: "Core technical English terminology used globally in engineering documentation and code reviews." }
];

export const assessmentQuestions = [
  { id: 1, areaId: "command-line", question: "Which command lists files in the current directory on a Unix-based operating system?", options: [{ id: "a", text: "ls", correct: true }, { id: "b", text: "dir", correct: false }, { id: "c", text: "list", correct: false }] },
  { id: 2, areaId: "git", question: "What is the primary purpose of a 'commit' in Git?", options: [{ id: "a", text: "Uploads code directly to a live web server", correct: false }, { id: "b", text: "Saves a permanent snapshot of your project state in local history", correct: true }, { id: "c", text: "Deletes unneeded files from disk", correct: false }] },
  { id: 3, areaId: "databases", question: "Which SQL clause is used to filter query results based on specified conditions?", options: [{ id: "a", text: "ORDER BY", correct: false }, { id: "b", text: "WHERE", correct: true }, { id: "c", text: "GROUP BY", correct: false }] },
  { id: 4, areaId: "internet", question: "What is the primary role of a DNS server on the internet?", options: [{ id: "a", text: "It encrypts website passwords", correct: false }, { id: "b", text: "It translates human-readable domain names (e.g. google.com) into IP addresses", correct: true }, { id: "c", text: "It compresses video streaming files", correct: false }] },
  { id: 5, areaId: "problem-solving", question: "What does algorithm execution complexity (Big O notation) measure?", options: [{ id: "a", text: "The size of the source code file in kilobytes", correct: false }, { id: "b", text: "How algorithm execution time or memory consumption scales as input size grows", correct: true }, { id: "c", text: "The difficulty level of the programming syntax", correct: false }] },
  { id: 6, areaId: "english-vocab", question: "What does the engineering term 'deploy' mean?", options: [{ id: "a", text: "To delete broken local code", correct: false }, { id: "b", text: "To publish and run an application on a live server accessible to end-users", correct: true }, { id: "c", text: "To format code indentations", correct: false }] }
];

export const resources = {
  "problem-solving": [{ title: "Khan Academy: Computer Science Algorithms", url: "https://www.khanacademy.org/computing/computer-science/algorithms" }],
  "command-line": [{ title: "Ubuntu Command Line Tutorial for Beginners", url: "https://ubuntu.com/tutorials/command-line-for-beginners" }],
  "git": [{ title: "Official Git Documentation & Reference", url: "https://git-scm.com/doc" }],
  "databases": [{ title: "SQLBolt - Interactive SQL Lessons", url: "https://sqlbolt.com" }],
  "internet": [{ title: "MDN Web Docs: How the Web Works", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works" }],
  "english-vocab": [{ title: "TechTerms Technical Dictionary", url: "https://techterms.com" }]
};

export const blueprints = [
  {
    id: "web",
    title: "Web Development Track",
    icon: "Web",
    fit: "Ideal for students who want to build modern websites, web portals, SaaS products, and full-stack web applications.",
    hardware: { level: "Low", note: "Runs smoothly on almost any dual-core laptop with 4GB RAM." },
    foundation: ["HTML5 Semantic Structure & Accessibility", "CSS3 Flexbox, Grid & Responsive Design", "JavaScript ES6+ Syntax, DOM & Async Programming"],
    platformTools: [
      { name: "React.js & Vite", durability: "Trending", reviewed: "Jul 2026" },
      { name: "Node.js / Express or Python Django", durability: "Durable", reviewed: "Jul 2026" },
      { name: "Vercel / Netlify Deployment", durability: "Trending", reviewed: "Jul 2026" }
    ],
    supportingSkills: ["RESTful & GraphQL API Integration", "Git Version Control & GitHub Pull Requests", "Basic UI/UX Principles & Figma Layouts"],
    proofOfWork: "Build and deploy 2 live production web applications: a client management portal and a dynamic dashboard fetching real-time data from REST APIs.",
    alumniStory: { name: "Sandrine K., Ngaoundéré", role: "Frontend Engineer at TechCam", story: "I started learning HTML and CSS on a borrowed laptop in Ngaoundéré. After mastering JavaScript fundamentals and React, I built a portfolio project for a pharmacy. Today I build full-stack web applications for clients across Central Africa." },
    lessons: [
      {
        type: "theory",
        title: "Chapter 1: The Three-Tier Web Architecture",
        content: "Modern software applications on the web follow a three-tier architectural model:\n\n1. Presentation Tier (Frontend):\nExecuted entirely inside the client's web browser using HTML (structure), CSS (styling & layout), and JavaScript (interactivity & logic).\n\n2. Application Tier (Backend):\nExecutes on a remote web server (Node.js, Python, PHP, Java). Processes business logic, authenticates users, enforces security rules, and responds to HTTP requests.\n\n3. Database Tier:\nSafely stores structured persistent data (PostgreSQL, MySQL, Supabase). Communicates exclusively with the backend server via SQL or ORMs.\n\nWhen a user types a web address into a browser, an HTTP GET request travels across TCP/IP networks to the server, which responds with an HTML payload."
      },
      {
        type: "practical",
        title: "Exercise 1.1: HTML5 & CSS3 Live Component Sandbox",
        content: "Modify the HTML/CSS code below to build a custom responsive profile card.",
        code: `<div style="background: #FFFFFF; border: 1px solid #E3DAC9; padding: 20px; border-radius: 8px; font-family: sans-serif;">\n  <h3 style="color: #362C28; margin-top: 0;">Student Engineer Profile</h3>\n  <p style="color: #6B5F57; font-size: 14px;">Specialization: Full-Stack Web Development</p>\n  <button style="background: #362C28; color: #FAF7F2; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Contact Engineer</button>\n</div>`
      },
      {
        type: "theory",
        title: "Chapter 2: Asynchronous JavaScript & RESTful APIs",
        content: "Single-Page Applications (SPAs) do not reload the entire web page when user data updates. Instead, JavaScript handles background network requests using the Fetch API and Async/Await.\n\nHTTP Standard Methods:\n- GET: Fetch data from the server.\n- POST: Send new data to be created.\n- PUT / PATCH: Modify existing records.\n- DELETE: Remove records from the server.\n\nAPI responses are encoded in JSON (JavaScript Object Notation), a lightweight text format containing key-value pairs and arrays."
      },
      {
        type: "practical",
        title: "Exercise 2.1: Live Fetch API Request Execution",
        content: "Click 'Run Code' in the sandbox below to execute an asynchronous HTTP request fetching user records from a REST API.",
        code: `// Fetching data from a public REST API endpoint\nasync function loadUserData() {\n  try {\n    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');\n    const user = await response.json();\n    console.log("Name:", user.name);\n    console.log("Email:", user.email);\n    console.log("City:", user.address.city);\n  } catch (err) {\n    console.error("Fetch failed:", err);\n  }\n}\nloadUserData();`
      }
    ]
  },
  {
    id: "mobile",
    title: "Mobile App Development Track",
    icon: "Mobile",
    fit: "Ideal for students eager to create native Android and iOS smartphone applications for everyday consumers.",
    hardware: { level: "High", note: "Requires 8GB+ RAM. Android Studio emulator runs best on Intel i5/AMD Ryzen 5 or Apple Silicon." },
    foundation: ["Object-Oriented Programming (Kotlin / Dart / Swift)", "Mobile Lifecycle & Memory Management", "JSON API Consumption & Offline Storage"],
    platformTools: [
      { name: "Flutter (Dart)", durability: "Trending", reviewed: "Jul 2026" },
      { name: "Android Studio (Kotlin)", durability: "Durable", reviewed: "Jul 2026" },
      { name: "React Native (JS/TS)", durability: "Trending", reviewed: "Jul 2026" }
    ],
    supportingSkills: ["Offline State Storage (SQLite / Room)", "Push Notification Integration", "App Store & Play Store Deployment Pipeline"],
    proofOfWork: "Publish an APK or complete Flutter project implementing offline caching, REST API synchronization, and smooth UI navigation.",
    alumniStory: { name: "Armelle T., Douala", role: "Mobile Software Engineer", story: "I started learning Flutter using video tutorials during university holidays. I built a mobile app to track transport schedules in Douala. That project showcased my ability to manage state and layout, leading to my first remote mobile developer contract." },
    lessons: [
      {
        type: "theory",
        title: "Chapter 1: The Mobile Operating System & App Lifecycles",
        content: "Mobile development differs fundamentally from web development due to hardware constraints, touch gestures, screen size fragmentation, and battery management.\n\nAndroid & iOS Application Lifecycle States:\n1. Created / Initialized: Memory is allocated for the app process.\n2. Foreground / Active: The screen is active and receiving user touch events.\n3. Background / Paused: The user switched apps or received a phone call; background tasks are limited by the OS.\n4. Destroyed: The OS reclaims memory when system RAM is low."
      },
      {
        type: "practical",
        title: "Exercise 1.1: Mobile Screen Layout Builder",
        content: "Use the HTML/CSS sandbox below to experiment with a mobile screen mockup container (280px width) containing navigation cards.",
        code: `<div style="width: 280px; height: 380px; border: 2px solid #362C28; border-radius: 20px; padding: 15px; background: #FAF8F5; margin: 0 auto; box-sizing: border-box;">\n  <div style="font-weight: bold; font-size: 16px; margin-bottom: 10px; color: #362C28;">📱 Mobile App Shell</div>\n  <div style="background: white; border: 1px solid #E3DAC9; padding: 10px; border-radius: 8px; font-size: 12px; margin-bottom: 8px;">Active Screen: DashboardView</div>\n  <div style="background: white; border: 1px solid #E3DAC9; padding: 10px; border-radius: 8px; font-size: 12px;">Network: Connected (4G)</div>\n</div>`
      }
    ]
  },
  {
    id: "cyber",
    title: "Cybersecurity Track",
    icon: "Security",
    fit: "Ideal for students passionate about network defense, ethical hacking, vulnerability auditing, and system security.",
    hardware: { level: "Medium", note: "Standard laptop with 8GB RAM to run virtual machines (Kali Linux) using VirtualBox or VMware." },
    foundation: ["Networking Fundamentals (TCP/IP, OSI Model, Subnetting)", "Linux Operating System Administration", "Security Principles (Confidentiality, Integrity, Availability - CIA Triad)"],
    platformTools: [
      { name: "Nmap & Wireshark Network Audit", durability: "Durable", reviewed: "Jul 2026" },
      { name: "Kali Linux Security Suite", durability: "Durable", reviewed: "Jul 2026" },
      { name: "Burp Suite & Metasploit Framework", durability: "Trending", reviewed: "Jul 2026" }
    ],
    supportingSkills: ["Bash Scripting & Python Security Tooling", "Vulnerability Assessment & Penetration Testing", "Compliance & Incident Response Protocols"],
    proofOfWork: "Complete 10 hands-on security labs on TryHackMe/HackTheBox and publish a documented pentest writeup for a permissioned target.",
    alumniStory: { name: "Kevin N., Yaoundé", role: "Information Security Analyst", story: "I set up a small virtual machine lab on my dual-core laptop in Yaoundé. By practicing network scanning with Nmap and analyzing packet captures in Wireshark, I gained practical skills that earned me a SOC Analyst role." },
    lessons: [
      {
        type: "theory",
        title: "Chapter 1: Network Architecture & The CIA Triad",
        content: "Cybersecurity safeguards digital infrastructure against unauthorized access, data corruption, and service disruption.\n\nThe CIA Triad:\n1. Confidentiality: Protecting sensitive data from unauthorized disclosure (Encryption via AES-256, RSA).\n2. Integrity: Guaranteeing data remains authentic and untampered (Cryptographic Hashing via SHA-256).\n3. Availability: Ensuring services remain accessible to legitimate users (Defending against DoS/DDoS attacks)."
      }
    ]
  },
  {
    id: "data-ai",
    title: "Data Science & AI Track",
    icon: "Data",
    fit: "Ideal for students who enjoy statistics, pattern discovery, machine learning models, and data-driven decision making.",
    hardware: { level: "High", note: "Standard laptop is sufficient using free cloud GPUs via Google Colab / Kaggle Notebooks." },
    foundation: ["Applied Statistics & Probability", "Python Programming (Data Structures & Functions)", "Linear Algebra & Matrix Operations"],
    platformTools: [
      { name: "Pandas & NumPy Data Analytics", durability: "Durable", reviewed: "Jul 2026" },
      { name: "Scikit-Learn Machine Learning", durability: "Durable", reviewed: "Jul 2026" },
      { name: "PyTorch & TensorFlow Deep Learning", durability: "Trending", reviewed: "Jul 2026" }
    ],
    supportingSkills: ["Data Visualization (Matplotlib, Seaborn)", "SQL Data Extraction", "Model Evaluation Metrics (Precision, Recall, F1 Score)"],
    proofOfWork: "Complete an end-to-end data science project: clean a real-world dataset, perform exploratory data analysis, train a predictive model, and document findings in a Jupyter Notebook.",
    alumniStory: { name: "Grace F., Buea", role: "Junior Data Analyst", story: "I used free cloud notebooks to learn Python and Pandas. I analyzed publicly available healthcare data to map medical resource distribution across Cameroon. That single project landed me an analyst job at a global NGO." },
    lessons: [
      {
        type: "theory",
        title: "Chapter 1: The Lifecycle of a Data Science Project",
        content: "Data Science extracts actionable insights from raw data through systematic stages:\n\n1. Data Acquisition: Ingesting raw data from relational databases, APIs, web scraping, or CSV datasets.\n2. Data Wrangling & Cleaning: Handling missing null values, normalizing data distributions, and removing duplicates.\n3. Exploratory Data Analysis (EDA): Calculating statistical metrics (mean, median, variance, correlation matrices)."
      }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Cloud Track",
    icon: "Cloud",
    fit: "Ideal for engineers who build automated pipelines, manage cloud infrastructure, and maintain high-availability production systems.",
    hardware: { level: "Low-Medium", note: "Runs on any laptop. Cloud servers are hosted remotely on AWS/GCP free tier instances." },
    foundation: ["Linux Server Administration & Shell Scripting", "Networking, Firewalls & Nginx Reverse Proxies", "CI/CD Pipeline Automation Concepts"],
    platformTools: [
      { name: "Docker & Containerization", durability: "Durable", reviewed: "Jul 2026" },
      { name: "AWS Cloud Infrastructure", durability: "Trending", reviewed: "Jul 2026" },
      { name: "GitHub Actions Automation", durability: "Trending", reviewed: "Jul 2026" }
    ],
    supportingSkills: ["Infrastructure as Code (Terraform)", "System Monitoring (Prometheus/Grafana)", "IAM Cloud Security Policies"],
    proofOfWork: "Automate a deployment pipeline using Docker and GitHub Actions that deploys a microservice to a cloud server upon code push.",
    alumniStory: { name: "Patrick M., Douala", role: "Cloud Systems Engineer", story: "DevOps seemed intimidating until I started practicing Docker containers on a free Linux virtual machine. Learning how to containerize apps and set up deployment scripts opened doors for remote DevOps contracts." },
    lessons: [
      {
        type: "theory",
        title: "Chapter 1: The Core Philosophy of DevOps & Automation",
        content: "DevOps integrates Software Development (Dev) with IT Operations (Ops) to shorten software development lifecycles while delivering features continuously."
      }
    ]
  }
];

export const scholarships = [
  {
    id: 1,
    name: "Mastercard Foundation Scholars Program",
    field: "General",
    type: "Full University & Tech Scholarship",
    region: "All Regions",
    status: "Open",
    url: "https://mastercardfdn.org/all/scholars/",
    description: "Fully funded higher education and technical leadership scholarships for young Africans in technology and science fields."
  },
  {
    id: 2,
    name: "MTN Cameroon Foundation ICT Bursary",
    field: "General",
    type: "Tuition Grant & Digital Training",
    region: "All Regions",
    status: "Rolling",
    url: "https://www.mtn.cm/foundation/",
    description: "Supports Cameroonian university students pursuing technology, engineering, and digital innovation degrees."
  },
  {
    id: 3,
    name: "Orange Digital Center Cameroon Training",
    field: "Mobile App Development",
    type: "Free Coding Bootcamp & Certification",
    region: "Centre / Littoral",
    status: "Open",
    url: "https://www.orangedigitalcenters.com/country/cm/home",
    description: "Free practical training bootcamps in mobile app development, web engineering, and AI located in Douala and Yaoundé."
  },
  {
    id: 4,
    name: "Google Africa Developer Scholarship (GADS)",
    field: "Web Development",
    type: "Online Learning & Certification Voucher",
    region: "All Regions",
    status: "Open",
    url: "https://buildyourfuture.withgoogle.com/scholarships",
    description: "Free access to Pluralsight and Associate Android / Google Cloud Associate certification exams for African developers."
  },
  {
    id: 5,
    name: "AWS Educate & Cloud Student Credits",
    field: "DevOps & Cloud",
    type: "Cloud Credits & Free Self-Paced Labs",
    region: "All Regions",
    status: "Rolling",
    url: "https://aws.amazon.com/education/awseducate/",
    description: "Free cloud credit vouchers, hands-on AWS console labs, and learning pathways for IT students."
  },
  {
    id: 6,
    name: "Coursera Financial Aid Program",
    field: "Data / AI",
    type: "100% Fee Waiver for Professional Certificates",
    region: "All Regions",
    status: "Rolling",
    url: "https://www.coursera.org",
    description: "Full tuition fee waivers for Google Data Analytics, IBM AI Developer, and Meta Frontend Certificates upon application."
  }
];

export const mentors = [
  { id: 1, name: "ActivSpaces Cameroon (Douala & Buea)", type: "Incubator / Tech Hub", focus: "General / Startups / Web Development", region: "Littoral / Southwest", url: "https://www.activspaces.com" },
  { id: 2, name: "Google Developer Group (GDG) Yaoundé", type: "Developer Community", focus: "Mobile App Development, Web, Cloud", region: "Centre", url: "https://gdg.community.dev/gdg-yaounde/" },
  { id: 3, name: "Silicon Mountain Community", type: "Tech Ecosystem Network", focus: "Software Engineering, Mobile, Startups", region: "Southwest / Northwest", url: "https://siliconmountain.cm" },
  { id: 4, name: "Women Techmakers Cameroon", type: "Diversity Tech Network", focus: "All Tracks & Tech Leadership", region: "All Regions", url: "https://developers.google.com/womentechmakers" },
  { id: 5, name: "Njaka Tech Community", type: "Cyber & AI Community", focus: "Cybersecurity & Data Science", region: "Centre", url: "https://njakatech.com" }
];

export const teamRoles = [
  { id: "tech", name: "Technical / Lead Developer", icon: "Code", why: "Transforms architectural designs into working code. Responsible for codebase quality and stability.", commonGap: "Technical founders often build before validating user demand.", whereToFind: "University CS departments, local hackathons, GitHub profiles." },
  { id: "business", name: "Business / Growth Lead", icon: "Briefcase", why: "Finds users, validates customer problems, and secures business partnerships or monetization.", commonGap: "Frequently missing in engineering teams, leading to products built without users.", whereToFind: "Business administration faculties (ESSEC, Yaoundé II), startup incubators." },
  { id: "design", name: "UI/UX Designer", icon: "Palette", why: "Ensures the application is intuitive, accessible, and enjoyable for real human users.", commonGap: "Often neglected until poor user retention makes usability flaws obvious.", whereToFind: "Figma communities, Behance Cameroon, digital design bootcamps." },
  { id: "finance", name: "Finance & Admin Lead", icon: "Dollar", why: "Manages project budget, legal compliance, and operational record keeping.", commonGap: "Postponed until tax or financial management issues arise.", whereToFind: "Accounting students, local OHADA compliance workshops." }
];
