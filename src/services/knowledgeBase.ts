export interface KnowledgeEntry {
  topic: string;
  keywords: string[];
  content: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const knowledgeBase: KnowledgeEntry[] = [
  // AI & Machine Learning
  {
    topic: "artificial_intelligence",
    keywords: ["ai", "artificial intelligence", "machine intelligence", "cognitive computing"],
    content: "Artificial Intelligence (AI) is a branch of computer science that aims to create intelligent machines capable of performing tasks that typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception, language understanding, and decision-making. AI systems can be categorized into narrow AI (designed for specific tasks) and general AI (hypothetical systems with human-level intelligence across all domains).",
    category: "ai",
    difficulty: "beginner"
  },
  {
    topic: "machine_learning",
    keywords: ["machine learning", "ml", "supervised learning", "unsupervised learning", "reinforcement learning"],
    content: "Machine Learning is a subset of AI that enables computers to learn and improve from experience without being explicitly programmed. It uses algorithms to analyze data, identify patterns, and make predictions or decisions. The main types include: Supervised Learning (learning from labeled data), Unsupervised Learning (finding patterns in unlabeled data), and Reinforcement Learning (learning through interaction and feedback).",
    category: "ai",
    difficulty: "intermediate"
  },
  {
    topic: "deep_learning",
    keywords: ["deep learning", "neural networks", "deep neural networks", "artificial neural networks"],
    content: "Deep Learning is a subset of machine learning that uses artificial neural networks with multiple layers (hence 'deep') to model and understand complex patterns in data. It's inspired by the structure and function of the human brain. Deep learning has revolutionized fields like computer vision, natural language processing, and speech recognition, powering technologies like image recognition, language translation, and autonomous vehicles.",
    category: "ai",
    difficulty: "advanced"
  },
  {
    topic: "natural_language_processing",
    keywords: ["nlp", "natural language processing", "text analysis", "language understanding", "computational linguistics"],
    content: "Natural Language Processing (NLP) is a field of AI that focuses on the interaction between computers and human language. It combines computational linguistics, machine learning, and deep learning to help computers process, understand, and generate human language. NLP applications include chatbots, language translation, sentiment analysis, text summarization, and voice assistants.",
    category: "ai",
    difficulty: "intermediate"
  },
  {
    topic: "computer_vision",
    keywords: ["computer vision", "image recognition", "object detection", "image processing", "visual perception"],
    content: "Computer Vision is a field of AI that enables computers to interpret and understand visual information from the world. It involves developing algorithms and techniques to extract meaningful information from digital images and videos. Applications include facial recognition, medical image analysis, autonomous vehicles, augmented reality, and quality control in manufacturing.",
    category: "ai",
    difficulty: "intermediate"
  },

  // Programming Languages
  {
    topic: "python",
    keywords: ["python", "python programming", "django", "flask", "pandas", "numpy"],
    content: "Python is a high-level, interpreted programming language known for its simplicity and readability. It's widely used in web development, data science, artificial intelligence, automation, and scientific computing. Python's extensive library ecosystem includes frameworks like Django and Flask for web development, and libraries like NumPy, Pandas, and Scikit-learn for data science and machine learning.",
    category: "programming",
    difficulty: "beginner"
  },
  {
    topic: "javascript",
    keywords: ["javascript", "js", "node.js", "react", "vue", "angular", "typescript"],
    content: "JavaScript is a versatile, high-level programming language primarily used for web development. It enables interactive web pages and is essential for front-end development. With Node.js, JavaScript can also be used for server-side development. Popular frameworks and libraries include React, Vue.js, Angular for front-end, and Express.js for back-end development. TypeScript extends JavaScript by adding static type definitions.",
    category: "programming",
    difficulty: "beginner"
  },
  {
    topic: "java",
    keywords: ["java", "spring", "spring boot", "jvm", "object oriented"],
    content: "Java is a class-based, object-oriented programming language designed to have as few implementation dependencies as possible. It's known for its 'write once, run anywhere' philosophy, meaning compiled Java code can run on all platforms that support Java. It's widely used in enterprise applications, Android development, and large-scale systems. The Spring framework is popular for building enterprise Java applications.",
    category: "programming",
    difficulty: "intermediate"
  },

  // Web Development
  {
    topic: "react",
    keywords: ["react", "reactjs", "jsx", "hooks", "components", "virtual dom"],
    content: "React is a JavaScript library for building user interfaces, particularly web applications. Developed by Facebook, it uses a component-based architecture and introduces concepts like JSX (JavaScript XML), virtual DOM for efficient rendering, and hooks for state management. React's declarative approach makes it easier to build interactive UIs by describing what the UI should look like for any given state.",
    category: "web_development",
    difficulty: "intermediate"
  },
  {
    topic: "html_css",
    keywords: ["html", "css", "html5", "css3", "responsive design", "flexbox", "grid"],
    content: "HTML (HyperText Markup Language) is the standard markup language for creating web pages, providing the structure and content. CSS (Cascading Style Sheets) is used for styling and layout. Modern CSS includes powerful features like Flexbox and Grid for responsive layouts, animations, and advanced styling capabilities. Together, they form the foundation of web development.",
    category: "web_development",
    difficulty: "beginner"
  },

  // Data Science
  {
    topic: "data_science",
    keywords: ["data science", "data analysis", "statistics", "data mining", "big data"],
    content: "Data Science is an interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data. It combines statistics, mathematics, programming, and domain expertise to analyze and interpret complex data. Data scientists use tools like Python, R, SQL, and various machine learning algorithms to solve real-world problems.",
    category: "data_science",
    difficulty: "intermediate"
  },
  {
    topic: "sql",
    keywords: ["sql", "database", "mysql", "postgresql", "queries", "relational database"],
    content: "SQL (Structured Query Language) is a programming language designed for managing and manipulating relational databases. It allows you to create, read, update, and delete data in databases. SQL is essential for data analysis, backend development, and database administration. Popular database systems include MySQL, PostgreSQL, SQLite, and Microsoft SQL Server.",
    category: "data_science",
    difficulty: "beginner"
  },

  // Software Development
  {
    topic: "git",
    keywords: ["git", "version control", "github", "gitlab", "repository", "commit"],
    content: "Git is a distributed version control system that tracks changes in source code during software development. It allows multiple developers to work on the same project simultaneously, maintains a complete history of changes, and enables branching and merging. GitHub and GitLab are popular platforms that host Git repositories and provide additional collaboration features.",
    category: "software_development",
    difficulty: "beginner"
  },
  {
    topic: "apis",
    keywords: ["api", "rest", "restful", "graphql", "microservices", "web services"],
    content: "APIs (Application Programming Interfaces) are sets of protocols and tools for building software applications. They define how different software components should interact. REST (Representational State Transfer) is a popular architectural style for designing networked applications. GraphQL is a query language and runtime for APIs that provides a more efficient alternative to REST in many cases.",
    category: "software_development",
    difficulty: "intermediate"
  },

  // Cloud Computing
  {
    topic: "cloud_computing",
    keywords: ["cloud", "aws", "azure", "google cloud", "saas", "paas", "iaas"],
    content: "Cloud Computing is the delivery of computing services including servers, storage, databases, networking, software, analytics, and intelligence over the Internet. Major cloud providers include Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform. Cloud services are typically categorized as Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS).",
    category: "cloud",
    difficulty: "intermediate"
  },

  // Cybersecurity
  {
    topic: "cybersecurity",
    keywords: ["cybersecurity", "security", "encryption", "authentication", "firewall", "malware"],
    content: "Cybersecurity involves protecting digital systems, networks, and data from digital attacks, unauthorized access, and damage. It includes practices like encryption, authentication, access control, network security, and incident response. Common threats include malware, phishing, ransomware, and data breaches. Security measures include firewalls, antivirus software, secure coding practices, and regular security audits.",
    category: "security",
    difficulty: "intermediate"
  }
];

export const getKnowledgeByKeywords = (keywords: string[]): KnowledgeEntry[] => {
  return knowledgeBase.filter(entry => 
    keywords.some(keyword => 
      entry.keywords.some(entryKeyword => 
        entryKeyword.toLowerCase().includes(keyword.toLowerCase()) ||
        keyword.toLowerCase().includes(entryKeyword.toLowerCase())
      )
    )
  );
};

export const getKnowledgeByCategory = (category: string): KnowledgeEntry[] => {
  return knowledgeBase.filter(entry => entry.category === category);
};

export const searchKnowledge = (query: string): KnowledgeEntry[] => {
  const queryLower = query.toLowerCase();
  return knowledgeBase.filter(entry => 
    entry.topic.toLowerCase().includes(queryLower) ||
    entry.content.toLowerCase().includes(queryLower) ||
    entry.keywords.some(keyword => keyword.toLowerCase().includes(queryLower))
  );
};