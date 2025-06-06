interface Intent {
  tag: string;
  patterns: string[];
  responses: string[];
  context?: string[];
  followUp?: string[];
}

export const intents: Intent[] = [
  {
    tag: "greeting",
    patterns: [
      "hi", "hello", "hey", "howdy", "greetings", "good morning", 
      "good afternoon", "good evening", "what's up", "yo"
    ],
    responses: [
      "Hello! I'm Tobi AI, your intelligent assistant. How can I help you today?",
      "Hi there! I'm here to assist you with any questions about technology, programming, or AI. What would you like to explore?",
      "Greetings! I'm Tobi, ready to help you with technical questions or engaging discussions. What's on your mind?",
      "Welcome! I'm an advanced AI assistant created by Aluko Oluwatobi. How can I assist you today?"
    ],
    followUp: [
      "Feel free to ask me about AI, programming, web development, or any technical topic!",
      "I can help explain complex concepts, solve problems, or just have an interesting conversation."
    ]
  },
  {
    tag: "goodbye",
    patterns: [
      "bye", "see you later", "goodbye", "farewell", "take care", 
      "cya", "catch you later", "until next time", "talk to you later"
    ],
    responses: [
      "Goodbye! Feel free to return anytime you have questions. I'm always here to help!",
      "Take care! I enjoyed our conversation. Come back whenever you need assistance.",
      "See you later! Remember, I'm here 24/7 for any technical questions or discussions.",
      "Farewell! It was great helping you today. Don't hesitate to reach out again!"
    ]
  },
  {
    tag: "thanks",
    patterns: [
      "thank you", "thanks", "appreciate it", "thank you so much", 
      "thx", "much appreciated", "grateful", "thanks a lot"
    ],
    responses: [
      "You're very welcome! I'm glad I could help. Is there anything else you'd like to explore?",
      "My pleasure! That's exactly what I'm here for. Feel free to ask me anything else.",
      "Happy to help! I love sharing knowledge and helping people learn. What else can I assist with?",
      "You're welcome! I enjoy our conversations. Is there another topic you'd like to discuss?"
    ]
  },
  {
    tag: "about_developer",
    patterns: [
      "who is aluko", "tell me about oluwatobi", "who is tobi", 
      "developer information", "creator", "who made you", 
      "who created you", "who developed you", "your developer"
    ],
    responses: [
      "I was created by Aluko Oluwatobi, a talented software engineer with expertise in AI, machine learning, and natural language processing. He designed me to be an intelligent conversational assistant.",
      "Aluko Oluwatobi is my developer - a skilled software engineer passionate about creating AI solutions that genuinely help people learn and solve problems.",
      "My creator is Aluko Oluwatobi, who specializes in AI and NLP technologies. He built me to assist with technical topics and engage in meaningful conversations."
    ]
  },
  {
    tag: "about_ai",
    patterns: [
      "what is ai", "explain artificial intelligence", "how does ai work", 
      "artificial intelligence definition", "ai meaning", "what's machine learning",
      "define ai", "ai explanation"
    ],
    responses: [
      "Artificial Intelligence (AI) is the simulation of human intelligence in machines programmed to think and learn. It encompasses machine learning, natural language processing, computer vision, and robotics.",
      "AI refers to systems that can perform tasks requiring human-like intelligence - learning, reasoning, problem-solving, and understanding language. It's powered by algorithms that process data to make decisions.",
      "AI works by using algorithms to analyze vast amounts of data, identify patterns, and make predictions or decisions. Modern AI uses techniques like neural networks and deep learning to achieve human-like performance."
    ],
    followUp: [
      "Would you like to know about specific AI applications like machine learning or natural language processing?",
      "I can explain different types of AI, from narrow AI to artificial general intelligence."
    ]
  },
  {
    tag: "nlp",
    patterns: [
      "what is nlp", "natural language processing", "how does nlp work", 
      "explain nlp", "nlp definition", "text processing", "language understanding"
    ],
    responses: [
      "Natural Language Processing (NLP) enables computers to understand, interpret, and generate human language. It combines linguistics, machine learning, and AI to process text and speech.",
      "NLP is the technology that allows machines to comprehend human language. It involves tokenization, parsing, semantic analysis, and machine learning to extract meaning from text.",
      "NLP works by breaking down language into components, analyzing grammar and context, and using statistical models to understand meaning. It's what powers chatbots, translation, and voice assistants!"
    ],
    followUp: [
      "I use NLP techniques to understand and respond to your messages!",
      "Would you like to know about specific NLP applications like sentiment analysis or machine translation?"
    ]
  },
  {
    tag: "capabilities",
    patterns: [
      "what can you do", "help me with", "your abilities", "what are you capable of", 
      "how can you help", "your skills", "what do you know", "your functions"
    ],
    responses: [
      "I'm an advanced AI assistant with expertise in technology, programming, AI concepts, and problem-solving. I can explain complex topics, help with coding questions, and engage in technical discussions.",
      "I can assist with AI and machine learning concepts, programming languages, web development, data science, software engineering practices, and much more. I adapt my responses to your expertise level.",
      "My capabilities include technical explanations, code help, research assistance, concept clarification, and engaging conversations about technology. I maintain context and learn from our interactions."
    ],
    followUp: [
      "I specialize in AI, programming, web development, and computer science topics.",
      "Feel free to test my knowledge with any technical question!"
    ]
  },
  {
    tag: "programming",
    patterns: [
      "programming languages", "best language to learn", "coding tips", 
      "software development", "web development", "how to code", 
      "programming advice", "coding best practices"
    ],
    responses: [
      "Programming languages each have unique strengths! Python is great for beginners and AI, JavaScript for web development, Java for enterprise applications, and C++ for system programming. What's your goal?",
      "For beginners, I recommend starting with Python due to its readable syntax. For web development, learn HTML, CSS, and JavaScript. The best language depends on your specific interests and career goals.",
      "Key programming tips: practice regularly, work on real projects, read others' code, use version control (Git), write clean code, and don't be afraid to make mistakes - they're learning opportunities!"
    ],
    followUp: [
      "What type of programming interests you most - web development, mobile apps, AI, or something else?",
      "I can provide specific guidance based on your programming goals and current experience level."
    ]
  },
  {
    tag: "transformers",
    patterns: [
      "what are transformers", "explain transformer models", "how do transformers work", 
      "bert", "gpt", "attention mechanism", "transformer architecture"
    ],
    responses: [
      "Transformers are revolutionary neural network architectures that use self-attention mechanisms to process sequences. They've transformed NLP by enabling models like BERT, GPT, and ChatGPT to understand context better.",
      "Transformer models work by using attention mechanisms to weigh the importance of different words in a sentence when processing each word. This allows them to capture long-range dependencies and context more effectively.",
      "The transformer architecture introduced the concept of 'attention is all you need' - using attention mechanisms instead of recurrent layers. This enables parallel processing and better handling of long sequences."
    ],
    followUp: [
      "Would you like to know about specific transformer models like BERT for understanding or GPT for generation?",
      "I can explain the technical details of attention mechanisms and how they work."
    ]
  },
  {
    tag: "machine_learning",
    patterns: [
      "machine learning", "ml", "supervised learning", "unsupervised learning", 
      "reinforcement learning", "neural networks", "deep learning", "algorithms"
    ],
    responses: [
      "Machine Learning enables computers to learn from data without explicit programming. It includes supervised learning (with labeled data), unsupervised learning (finding patterns), and reinforcement learning (learning through rewards).",
      "ML algorithms analyze data to identify patterns and make predictions. Popular techniques include linear regression, decision trees, neural networks, and ensemble methods. The choice depends on your data and problem type.",
      "Deep Learning, a subset of ML, uses neural networks with multiple layers to learn complex patterns. It's particularly powerful for image recognition, natural language processing, and speech recognition."
    ],
    followUp: [
      "What type of machine learning problem are you interested in - classification, regression, clustering, or something else?",
      "I can explain specific algorithms or help you understand which approach might work best for your use case."
    ]
  }
];

export const getIntentByTag = (tag: string): Intent | undefined => {
  return intents.find(intent => intent.tag === tag);
};

export const findMatchingIntent = (message: string): Intent | null => {
  const lowerMessage = message.toLowerCase();
  
  for (const intent of intents) {
    for (const pattern of intent.patterns) {
      if (lowerMessage.includes(pattern.toLowerCase())) {
        return intent;
      }
    }
  }
  
  return null;
};