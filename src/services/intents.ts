interface Intent {
  tag: string;
  patterns: string[];
  responses: string[];
}

export const intents: Intent[] = [
  {
    tag: "greeting",
    patterns: ["hi", "hello", "hey", "howdy", "greetings", "good morning", "good afternoon", "good evening"],
    responses: [
      "Hello! How can I assist you today?",
      "Hi there! What can I help you with?",
      "Hey! How can I make your day better?",
      "Greetings! How may I be of service?"
    ]
  },
  {
    tag: "goodbye",
    patterns: ["bye", "see you later", "goodbye", "farewell", "take care", "cya"],
    responses: [
      "Goodbye! Feel free to return if you have more questions.",
      "See you later! Have a great day!",
      "Farewell! I'll be here if you need assistance.",
      "Take care! Come back anytime."
    ]
  },
  {
    tag: "thanks",
    patterns: ["thank you", "thanks", "appreciate it", "thank you so much", "thx"],
    responses: [
      "You're welcome!",
      "Happy to help!",
      "Anytime! That's what I'm here for.",
      "My pleasure. Is there anything else you need?"
    ]
  },
  {
    tag: "about_developer",
    patterns: ["who is aluko", "tell me about oluwatobi", "who is tobi", "developer information", "creator"],
    responses: [
      "Aluko Oluwatobi is my developer. He's a skilled software engineer specializing in AI and natural language processing.",
      "I was created by Aluko Oluwatobi, a talented developer with expertise in creating AI-powered solutions.",
      "My developer is Aluko Oluwatobi, who has a passion for building innovative AI applications."
    ]
  },
  {
    tag: "about_ai",
    patterns: ["what is ai", "explain artificial intelligence", "how does ai work", "what's machine learning"],
    responses: [
      "Artificial Intelligence (AI) refers to systems that can perform tasks that typically require human intelligence. These include learning, reasoning, problem-solving, perception, and language understanding.",
      "AI works by processing large amounts of data, identifying patterns, and making decisions based on the information it has learned. It uses various techniques like machine learning, deep learning, and natural language processing.",
      "Machine Learning is a subset of AI that enables systems to learn from data and improve from experience without being explicitly programmed. It's the technology that powers many modern AI applications."
    ]
  },
  {
    tag: "nlp",
    patterns: ["what is nlp", "natural language processing", "how does nlp work", "explain nlp"],
    responses: [
      "Natural Language Processing (NLP) is a field of AI that focuses on the interaction between computers and human language. It enables machines to understand, interpret, and generate human language in a valuable way.",
      "NLP combines computational linguistics, machine learning, and deep learning to help computers process and understand human language. It's what allows me to understand and respond to your messages!",
      "NLP works by breaking down human language into smaller parts, analyzing their relationships, and extracting meaning. This involves various techniques like tokenization, part-of-speech tagging, and sentiment analysis."
    ]
  },
  {
    tag: "capabilities",
    patterns: ["what can you do", "help me with", "your abilities", "what are you capable of", "how can you help"],
    responses: [
      "I can provide information about AI, software development, and other technical topics. I can also help answer questions, provide definitions, and engage in conversation.",
      "I'm designed to assist with information, answer questions, and provide helpful responses based on my training. I'm particularly knowledgeable about technology and development topics.",
      "I can help with explaining concepts, providing information, answering questions, and engaging in conversation. Just ask me what you'd like to know!"
    ]
  },
  {
    tag: "programming",
    patterns: ["programming languages", "best language to learn", "coding tips", "software development", "web development"],
    responses: [
      "There are many programming languages, each with its own strengths. Popular ones include Python, JavaScript, Java, C++, and Ruby. The best one to learn depends on your goals and interests.",
      "For beginners, Python is often recommended due to its readable syntax. JavaScript is essential for web development. For mobile apps, consider learning Swift (iOS) or Kotlin (Android).",
      "When learning to code, practice regularly, work on real projects, collaborate with others, and don't be afraid to make mistakes. Online resources like freeCodeCamp, Codecademy, and documentation are invaluable."
    ]
  },
  {
    tag: "transformers",
    patterns: ["what are transformers", "explain transformer models", "how do transformers work", "bert", "gpt"],
    responses: [
      "Transformers are a type of neural network architecture that has revolutionized NLP. They use attention mechanisms to understand the context of words in relation to all other words in a sentence, rather than processing them one at a time.",
      "Models like BERT (Bidirectional Encoder Representations from Transformers) and GPT (Generative Pre-trained Transformer) are transformer-based models that have achieved state-of-the-art results in various NLP tasks.",
      "Transformer models work by using self-attention mechanisms to weigh the importance of different words in a sentence when processing a specific word. This allows them to capture long-range dependencies and context better than previous approaches."
    ]
  }
];