import nlp from 'compromise';
// @ts-ignore
import natural from 'natural';

interface ConversationContext {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    topics: string[];
    sentiment: number;
  }>;
  userProfile: {
    expertise: Record<string, number>;
    interests: string[];
    communicationStyle: 'formal' | 'casual' | 'technical';
    preferredDepth: 'brief' | 'detailed' | 'comprehensive';
  };
  sessionTopics: string[];
  contextualMemory: Map<string, any>;
}

interface MessageAnalysis {
  intent: string;
  entities: string[];
  topics: string[];
  sentiment: number;
  complexity: 'basic' | 'intermediate' | 'advanced';
  questionType: string;
  keywords: string[];
  confidence: number;
  requiresContext: boolean;
  isFollowUp: boolean;
}

class IntelligentAI {
  private context: ConversationContext;
  private stemmer = natural.PorterStemmer;
  private tokenizer = new natural.WordTokenizer();
  private analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
  private knowledgeGraph: Map<string, Set<string>> = new Map();
  
  constructor() {
    this.context = {
      messages: [],
      userProfile: {
        expertise: {},
        interests: [],
        communicationStyle: 'casual',
        preferredDepth: 'detailed'
      },
      sessionTopics: [],
      contextualMemory: new Map()
    };
    this.initializeKnowledgeGraph();
  }

  private initializeKnowledgeGraph() {
    // Build a knowledge graph of related concepts
    const relationships = {
      'artificial intelligence': ['machine learning', 'deep learning', 'neural networks', 'natural language processing', 'computer vision'],
      'machine learning': ['supervised learning', 'unsupervised learning', 'reinforcement learning', 'algorithms', 'data science'],
      'programming': ['javascript', 'python', 'react', 'nodejs', 'algorithms', 'data structures'],
      'web development': ['html', 'css', 'javascript', 'react', 'nodejs', 'api', 'database'],
      'data science': ['statistics', 'machine learning', 'python', 'visualization', 'analytics'],
      'javascript': ['react', 'nodejs', 'typescript', 'web development', 'frontend'],
      'python': ['machine learning', 'data science', 'django', 'flask', 'automation'],
      'react': ['javascript', 'frontend', 'components', 'hooks', 'jsx'],
      'neural networks': ['deep learning', 'artificial intelligence', 'backpropagation', 'layers'],
      'algorithms': ['data structures', 'complexity', 'sorting', 'searching', 'optimization']
    };

    Object.entries(relationships).forEach(([concept, related]) => {
      this.knowledgeGraph.set(concept, new Set(related));
    });
  }

  async processMessage(message: string): Promise<string> {
    try {
      // Analyze the incoming message
      const analysis = this.analyzeMessage(message);
      
      // Update conversation context
      this.updateContext(message, analysis);
      
      // Generate intelligent response
      const response = await this.generateIntelligentResponse(message, analysis);
      
      // Learn from this interaction
      this.learnFromInteraction(message, response, analysis);
      
      // Store the conversation
      this.context.messages.push(
        { role: 'user', content: message, timestamp: new Date(), topics: analysis.topics, sentiment: analysis.sentiment },
        { role: 'assistant', content: response, timestamp: new Date(), topics: analysis.topics, sentiment: 0.5 }
      );

      return response;
    } catch (error) {
      console.error('AI Processing Error:', error);
      return this.generateErrorResponse();
    }
  }

  private analyzeMessage(message: string): MessageAnalysis {
    const doc = nlp(message);
    const lowerMessage = message.toLowerCase();
    
    // Extract linguistic features
    const entities = this.extractEntities(doc);
    const topics = this.extractTopics(message, doc);
    const keywords = this.extractKeywords(doc);
    
    // Analyze sentiment
    const tokens = this.tokenizer.tokenize(lowerMessage) || [];
    const stemmedTokens = tokens.map(token => this.stemmer.stem(token));
    const sentiment = this.calculateSentiment(stemmedTokens);
    
    // Determine intent and complexity
    const intent = this.classifyIntent(message, topics, keywords);
    const complexity = this.assessComplexity(message, keywords);
    const questionType = this.identifyQuestionType(message);
    
    // Check if this is a follow-up or requires context
    const isFollowUp = this.isFollowUpQuestion(message);
    const requiresContext = this.requiresContextualUnderstanding(message, topics);
    
    return {
      intent,
      entities,
      topics,
      sentiment,
      complexity,
      questionType,
      keywords,
      confidence: this.calculateConfidence(message, intent, topics),
      requiresContext,
      isFollowUp
    };
  }

  private extractEntities(doc: any): string[] {
    return [
      ...doc.people().out('array'),
      ...doc.places().out('array'),
      ...doc.organizations().out('array'),
      ...doc.topics().out('array')
    ].filter(entity => entity.length > 1);
  }

  private extractTopics(message: string, doc: any): string[] {
    const explicitTopics = doc.topics().out('array');
    const technicalTerms = this.identifyTechnicalTerms(message);
    const conceptualTopics = this.identifyConceptualTopics(message);
    
    return [...new Set([...explicitTopics, ...technicalTerms, ...conceptualTopics])];
  }

  private identifyTechnicalTerms(message: string): string[] {
    const techTerms = [
      'artificial intelligence', 'ai', 'machine learning', 'ml', 'deep learning',
      'neural networks', 'nlp', 'natural language processing', 'computer vision',
      'javascript', 'python', 'react', 'nodejs', 'typescript', 'html', 'css',
      'algorithm', 'data structure', 'database', 'api', 'frontend', 'backend',
      'web development', 'software engineering', 'programming', 'coding',
      'data science', 'statistics', 'analytics', 'visualization', 'big data'
    ];
    
    const lowerMessage = message.toLowerCase();
    return techTerms.filter(term => lowerMessage.includes(term));
  }

  private identifyConceptualTopics(message: string): string[] {
    const concepts = [];
    const lowerMessage = message.toLowerCase();
    
    // Programming concepts
    if (/\b(function|variable|loop|condition|class|object)\b/.test(lowerMessage)) {
      concepts.push('programming concepts');
    }
    
    // Learning and education
    if (/\b(learn|teach|understand|explain|tutorial|guide)\b/.test(lowerMessage)) {
      concepts.push('learning');
    }
    
    // Problem solving
    if (/\b(problem|solve|solution|fix|debug|error)\b/.test(lowerMessage)) {
      concepts.push('problem solving');
    }
    
    return concepts;
  }

  private extractKeywords(doc: any): string[] {
    const nouns = doc.nouns().out('array');
    const verbs = doc.verbs().out('array');
    const adjectives = doc.adjectives().out('array');
    
    return [...new Set([...nouns, ...verbs, ...adjectives])]
      .filter(word => word.length > 2)
      .slice(0, 10);
  }

  private calculateSentiment(tokens: string[]): number {
    if (tokens.length === 0) return 0;
    return this.analyzer.getSentiment(tokens);
  }

  private classifyIntent(message: string, topics: string[], keywords: string[]): string {
    const lowerMessage = message.toLowerCase();
    
    // Greeting patterns
    if (/^(hi|hello|hey|greetings|good (morning|afternoon|evening))/.test(lowerMessage)) {
      return 'greeting';
    }
    
    // Information seeking
    if (/^(what|how|why|when|where|who|can you|could you|would you)/.test(lowerMessage)) {
      return 'information_seeking';
    }
    
    // Explanation request
    if (/(explain|describe|tell me about|what is|how does)/.test(lowerMessage)) {
      return 'explanation_request';
    }
    
    // Help request
    if (/(help|assist|support|guide|show me)/.test(lowerMessage)) {
      return 'help_request';
    }
    
    // Comparison request
    if (/(compare|difference|better|versus|vs|which is)/.test(lowerMessage)) {
      return 'comparison_request';
    }
    
    // Learning request
    if (/(learn|teach|understand|study)/.test(lowerMessage)) {
      return 'learning_request';
    }
    
    // Problem solving
    if (/(problem|issue|error|bug|fix|solve)/.test(lowerMessage)) {
      return 'problem_solving';
    }
    
    // Developer info
    if (/(who (made|created|developed)|developer|creator)/.test(lowerMessage)) {
      return 'developer_info';
    }
    
    // Capabilities
    if (/(what can you|your (abilities|capabilities))/.test(lowerMessage)) {
      return 'capabilities';
    }
    
    return 'general_conversation';
  }

  private assessComplexity(message: string, keywords: string[]): 'basic' | 'intermediate' | 'advanced' {
    const advancedTerms = ['algorithm', 'architecture', 'optimization', 'scalability', 'complexity', 'paradigm', 'abstraction'];
    const intermediateTerms = ['framework', 'library', 'api', 'database', 'backend', 'frontend', 'deployment'];
    
    const advancedCount = keywords.filter(keyword => 
      advancedTerms.some(term => keyword.toLowerCase().includes(term))
    ).length;
    
    const intermediateCount = keywords.filter(keyword => 
      intermediateTerms.some(term => keyword.toLowerCase().includes(term))
    ).length;
    
    if (advancedCount > 0 || message.length > 150) return 'advanced';
    if (intermediateCount > 0 || message.length > 75) return 'intermediate';
    return 'basic';
  }

  private identifyQuestionType(message: string): string {
    const lowerMessage = message.toLowerCase().trim();
    
    if (lowerMessage.startsWith('what')) return 'definition';
    if (lowerMessage.startsWith('how')) return 'process';
    if (lowerMessage.startsWith('why')) return 'reasoning';
    if (lowerMessage.startsWith('when')) return 'temporal';
    if (lowerMessage.startsWith('where')) return 'location';
    if (lowerMessage.startsWith('who')) return 'person';
    if (lowerMessage.includes(' or ')) return 'choice';
    if (/^(is|are|do|does|can|will|would|could|should)/.test(lowerMessage)) return 'yes_no';
    
    return 'open_ended';
  }

  private isFollowUpQuestion(message: string): boolean {
    const followUpIndicators = [
      'also', 'additionally', 'furthermore', 'moreover', 'what about',
      'how about', 'and', 'but', 'however', 'on the other hand'
    ];
    
    const lowerMessage = message.toLowerCase();
    return followUpIndicators.some(indicator => lowerMessage.includes(indicator)) ||
           this.context.messages.length > 0;
  }

  private requiresContextualUnderstanding(message: string, topics: string[]): boolean {
    const contextualIndicators = ['this', 'that', 'it', 'they', 'them', 'these', 'those'];
    const lowerMessage = message.toLowerCase();
    
    return contextualIndicators.some(indicator => lowerMessage.includes(indicator)) ||
           topics.some(topic => this.context.sessionTopics.includes(topic));
  }

  private calculateConfidence(message: string, intent: string, topics: string[]): number {
    let confidence = 0.5;
    
    // Higher confidence for clear intents
    if (['greeting', 'explanation_request', 'help_request'].includes(intent)) {
      confidence += 0.3;
    }
    
    // Higher confidence for recognized topics
    if (topics.length > 0) {
      confidence += 0.2;
    }
    
    // Higher confidence for questions
    if (message.includes('?')) {
      confidence += 0.1;
    }
    
    return Math.min(confidence, 1.0);
  }

  private updateContext(message: string, analysis: MessageAnalysis) {
    // Update session topics
    analysis.topics.forEach(topic => {
      if (!this.context.sessionTopics.includes(topic)) {
        this.context.sessionTopics.push(topic);
      }
    });
    
    // Update user expertise
    analysis.topics.forEach(topic => {
      const currentLevel = this.context.userProfile.expertise[topic] || 0;
      this.context.userProfile.expertise[topic] = Math.min(1, currentLevel + 0.05);
    });
    
    // Update communication style based on message complexity
    if (analysis.complexity === 'advanced') {
      this.context.userProfile.communicationStyle = 'technical';
    } else if (analysis.complexity === 'basic') {
      this.context.userProfile.communicationStyle = 'casual';
    }
  }

  private async generateIntelligentResponse(message: string, analysis: MessageAnalysis): Promise<string> {
    // Handle specific intents
    switch (analysis.intent) {
      case 'greeting':
        return this.generateGreeting();
      
      case 'developer_info':
        return this.generateDeveloperInfo();
      
      case 'capabilities':
        return this.generateCapabilitiesResponse();
      
      case 'explanation_request':
        return this.generateExplanation(message, analysis);
      
      case 'help_request':
        return this.generateHelpResponse(message, analysis);
      
      case 'comparison_request':
        return this.generateComparison(message, analysis);
      
      case 'learning_request':
        return this.generateLearningResponse(message, analysis);
      
      case 'problem_solving':
        return this.generateProblemSolvingResponse(message, analysis);
      
      case 'information_seeking':
        return this.generateInformationResponse(message, analysis);
      
      default:
        return this.generateContextualResponse(message, analysis);
    }
  }

  private generateGreeting(): string {
    const greetings = [
      "Hello! I'm Tobi AI, your intelligent assistant. I'm here to help you explore technology, solve problems, and learn new concepts. What would you like to discuss today?",
      "Hi there! I'm Tobi, an AI assistant created by Aluko Oluwatobi. I specialize in technology, programming, and AI concepts. How can I assist you?",
      "Greetings! I'm an advanced AI assistant ready to help with technical questions, explanations, or engaging conversations. What's on your mind?",
      "Welcome! I'm Tobi AI, designed to provide intelligent, contextual assistance. Whether you're learning, problem-solving, or just curious, I'm here to help!"
    ];
    
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  private generateDeveloperInfo(): string {
    return "I was created by **Aluko Oluwatobi**, a talented software engineer with deep expertise in artificial intelligence, machine learning, and natural language processing. He designed me to be an intelligent conversational assistant that can:\n\n" +
           "• Understand context and maintain meaningful conversations\n" +
           "• Adapt responses to your expertise level\n" +
           "• Provide technical explanations and problem-solving assistance\n" +
           "• Learn from our interactions to improve future responses\n\n" +
           "Oluwatobi is passionate about creating AI solutions that genuinely help people learn, solve problems, and explore new ideas. Would you like to know more about my capabilities or discuss any technical topics?";
  }

  private generateCapabilitiesResponse(): string {
    const userLevel = this.inferUserExpertiseLevel();
    
    return "I'm an advanced AI assistant with sophisticated capabilities:\n\n" +
           "🧠 **Intelligent Understanding**: I analyze context, sentiment, and intent to provide relevant responses\n" +
           "💬 **Contextual Conversations**: I remember our discussion and build upon previous topics\n" +
           "🎯 **Adaptive Responses**: I adjust my explanations to match your expertise level\n" +
           "🔍 **Deep Knowledge**: Extensive understanding of AI, programming, web development, and computer science\n" +
           "🚀 **Problem Solving**: I can help debug code, explain concepts, and guide learning\n" +
           "📚 **Learning Support**: I provide examples, analogies, and step-by-step explanations\n\n" +
           `Based on our conversation, I've detected your expertise level as **${userLevel}**, so I'll tailor my responses accordingly. ` +
           "What would you like to explore together?";
  }

  private generateExplanation(message: string, analysis: MessageAnalysis): string {
    const topic = analysis.topics[0] || analysis.keywords[0];
    
    if (!topic) {
      return "I'd be happy to explain that concept! Could you specify which particular aspect you'd like me to focus on? " +
             "I can provide explanations ranging from basic overviews to detailed technical discussions.";
    }
    
    // Get related concepts for comprehensive explanation
    const relatedConcepts = this.knowledgeGraph.get(topic.toLowerCase()) || new Set();
    
    const explanation = this.getTopicExplanation(topic);
    let response = explanation;
    
    // Add related concepts if available
    if (relatedConcepts.size > 0) {
      const related = Array.from(relatedConcepts).slice(0, 3);
      response += `\n\n**Related concepts you might find interesting:**\n${related.map(concept => `• ${concept}`).join('\n')}`;
    }
    
    // Add follow-up question
    response += "\n\nWould you like me to dive deeper into any specific aspect or explore how this relates to other concepts?";
    
    return response;
  }

  private getTopicExplanation(topic: string): string {
    const explanations: Record<string, string> = {
      'artificial intelligence': "**Artificial Intelligence (AI)** is the simulation of human intelligence in machines that are programmed to think and learn like humans. AI systems can perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation.\n\nAI works through various approaches:\n• **Machine Learning**: Systems that improve through experience\n• **Deep Learning**: Neural networks with multiple layers\n• **Natural Language Processing**: Understanding and generating human language\n• **Computer Vision**: Interpreting and analyzing visual information",
      
      'machine learning': "**Machine Learning (ML)** is a subset of AI that enables computers to learn and improve from experience without being explicitly programmed. Instead of following pre-programmed instructions, ML algorithms build mathematical models based on training data to make predictions or decisions.\n\n**Types of Machine Learning:**\n• **Supervised Learning**: Learning from labeled examples\n• **Unsupervised Learning**: Finding patterns in unlabeled data\n• **Reinforcement Learning**: Learning through trial and error with rewards",
      
      'javascript': "**JavaScript** is a versatile, high-level programming language that's essential for modern web development. Originally created for web browsers, it now runs everywhere - from servers to mobile apps to desktop applications.\n\n**Key Features:**\n• **Dynamic and Flexible**: Variables can hold any type of data\n• **Event-Driven**: Responds to user interactions\n• **Asynchronous**: Can handle multiple operations simultaneously\n• **Ecosystem**: Vast library of frameworks and tools (React, Node.js, etc.)",
      
      'react': "**React** is a powerful JavaScript library for building user interfaces, particularly web applications. Created by Facebook, it revolutionized frontend development with its component-based architecture.\n\n**Core Concepts:**\n• **Components**: Reusable pieces of UI\n• **JSX**: JavaScript syntax extension for writing HTML-like code\n• **Virtual DOM**: Efficient rendering system\n• **Hooks**: Modern way to manage state and side effects",
      
      'programming': "**Programming** is the process of creating instructions for computers to execute. It involves problem-solving, logical thinking, and translating human ideas into code that machines can understand.\n\n**Fundamental Concepts:**\n• **Variables**: Store and manipulate data\n• **Functions**: Reusable blocks of code\n• **Control Flow**: Decisions and loops\n• **Data Structures**: Organize and store information efficiently"
    };
    
    return explanations[topic.toLowerCase()] || 
           `**${topic}** is an important concept in technology. While I don't have a specific detailed explanation for this exact term, I can help you understand it better if you provide more context about what aspect interests you most.`;
  }

  private generateHelpResponse(message: string, analysis: MessageAnalysis): string {
    if (analysis.topics.length > 0) {
      const topic = analysis.topics[0];
      return `I'd be happy to help you with **${topic}**! To provide the most useful assistance, could you tell me:\n\n` +
             "• What specific aspect are you working on?\n" +
             "• What's your current experience level with this topic?\n" +
             "• Are you facing a particular challenge or error?\n\n" +
             "The more context you provide, the better I can tailor my help to your needs!";
    }
    
    return "I'm here to help! I can assist with:\n\n" +
           "🔧 **Technical Problems**: Debugging code, explaining errors, optimization\n" +
           "📚 **Learning**: Explaining concepts, providing examples, study guidance\n" +
           "💡 **Project Ideas**: Suggestions, best practices, architecture advice\n" +
           "🚀 **Career Guidance**: Technology choices, skill development paths\n\n" +
           "What specific area would you like help with?";
  }

  private generateComparison(message: string, analysis: MessageAnalysis): string {
    // Extract comparison subjects from the message
    const comparisonTerms = this.extractComparisonSubjects(message);
    
    if (comparisonTerms.length >= 2) {
      return this.generateSpecificComparison(comparisonTerms[0], comparisonTerms[1]);
    }
    
    return "I'd be happy to help you compare different options! To provide a meaningful comparison, could you specify:\n\n" +
           "• What exactly you'd like to compare\n" +
           "• What criteria are important to you (performance, ease of use, cost, etc.)\n" +
           "• Your specific use case or context\n\n" +
           "For example, I can compare programming languages, frameworks, tools, or concepts.";
  }

  private extractComparisonSubjects(message: string): string[] {
    const lowerMessage = message.toLowerCase();
    const subjects = [];
    
    // Look for "X vs Y" or "X versus Y" patterns
    const vsMatch = lowerMessage.match(/(\w+)\s+(?:vs|versus)\s+(\w+)/);
    if (vsMatch) {
      subjects.push(vsMatch[1], vsMatch[2]);
    }
    
    // Look for "X or Y" patterns
    const orMatch = lowerMessage.match(/(\w+)\s+or\s+(\w+)/);
    if (orMatch) {
      subjects.push(orMatch[1], orMatch[2]);
    }
    
    return subjects;
  }

  private generateSpecificComparison(item1: string, item2: string): string {
    const comparisons: Record<string, Record<string, string>> = {
      'react_vue': {
        'React': "• **Learning Curve**: Moderate, requires understanding of JSX and concepts\n• **Performance**: Excellent with Virtual DOM\n• **Ecosystem**: Massive, with extensive third-party libraries\n• **Flexibility**: Very flexible, multiple ways to solve problems",
        'Vue': "• **Learning Curve**: Gentle, easier for beginners\n• **Performance**: Excellent, similar to React\n• **Ecosystem**: Growing rapidly, good official libraries\n• **Flexibility**: Balanced between flexibility and convention"
      },
      'python_javascript': {
        'Python': "• **Syntax**: Clean and readable, great for beginners\n• **Use Cases**: AI/ML, data science, backend development\n• **Performance**: Slower execution, but excellent for rapid development\n• **Libraries**: Extensive scientific and ML libraries",
        'JavaScript': "• **Syntax**: More complex, but very flexible\n• **Use Cases**: Web development, full-stack applications\n• **Performance**: Fast execution, especially with modern engines\n• **Ecosystem**: Largest package ecosystem (npm)"
      }
    };
    
    const key = `${item1}_${item2}`;
    const reverseKey = `${item2}_${item1}`;
    
    if (comparisons[key]) {
      return `Here's a comparison between **${item1}** and **${item2}**:\n\n` +
             `**${item1}:**\n${comparisons[key][item1]}\n\n` +
             `**${item2}:**\n${comparisons[key][item2]}\n\n` +
             "The best choice depends on your specific needs, project requirements, and personal preferences. Would you like me to elaborate on any particular aspect?";
    }
    
    return `That's an interesting comparison between **${item1}** and **${item2}**! While I don't have a pre-built comparison for these specific items, I can help you evaluate them based on:\n\n` +
           "• **Purpose and Use Cases**\n• **Learning Curve and Complexity**\n• **Performance Characteristics**\n• **Community and Ecosystem**\n• **Long-term Viability**\n\n" +
           "Could you tell me more about your specific context or what criteria are most important to you?";
  }

  private generateLearningResponse(message: string, analysis: MessageAnalysis): string {
    const topic = analysis.topics[0] || 'programming';
    const userLevel = this.inferUserExpertiseLevel();
    
    return `Great choice wanting to learn about **${topic}**! Based on your current level (${userLevel}), here's a personalized learning approach:\n\n` +
           this.generateLearningPath(topic, userLevel) +
           "\n\n**Learning Tips:**\n" +
           "• Start with hands-on projects\n" +
           "• Practice regularly, even if just 15-30 minutes daily\n" +
           "• Join communities and ask questions\n" +
           "• Build real projects to apply what you learn\n\n" +
           "Would you like me to suggest specific resources, projects, or explain any particular concept to get you started?";
  }

  private generateLearningPath(topic: string, level: string): string {
    const paths: Record<string, Record<string, string>> = {
      'programming': {
        'beginner': "**Beginner Path:**\n1. Choose a beginner-friendly language (Python or JavaScript)\n2. Learn basic concepts: variables, functions, loops\n3. Practice with simple projects\n4. Understand problem-solving approaches",
        'intermediate': "**Intermediate Path:**\n1. Master data structures and algorithms\n2. Learn object-oriented programming\n3. Understand databases and APIs\n4. Build full-stack projects",
        'advanced': "**Advanced Path:**\n1. Study system design and architecture\n2. Learn advanced algorithms and optimization\n3. Contribute to open-source projects\n4. Explore specialized domains (AI, security, etc.)"
      },
      'ai': {
        'beginner': "**AI Learning Path:**\n1. Understand basic concepts and terminology\n2. Learn Python programming\n3. Study statistics and linear algebra basics\n4. Try beginner ML tutorials",
        'intermediate': "**Intermediate AI Path:**\n1. Deep dive into machine learning algorithms\n2. Learn popular frameworks (TensorFlow, PyTorch)\n3. Work on real datasets\n4. Understand neural networks",
        'advanced': "**Advanced AI Path:**\n1. Study cutting-edge research papers\n2. Implement algorithms from scratch\n3. Work on novel applications\n4. Contribute to AI research"
      }
    };
    
    return paths[topic]?.[level] || `**Learning ${topic}:**\nI'll help you create a personalized learning path based on your goals and current knowledge.`;
  }

  private generateProblemSolvingResponse(message: string, analysis: MessageAnalysis): string {
    return "I'm here to help you solve that problem! To provide the most effective assistance, let me understand:\n\n" +
           "🔍 **The Problem:**\n• What exactly is happening?\n• What were you trying to achieve?\n• Any error messages or unexpected behavior?\n\n" +
           "🛠️ **Context:**\n• What technology/language are you using?\n• What have you already tried?\n• When did this issue start occurring?\n\n" +
           "💡 **My Approach:**\nI'll help you debug systematically, explain what's happening, and guide you to a solution while ensuring you understand the underlying concepts.\n\n" +
           "Share the details, and let's solve this together!";
  }

  private generateInformationResponse(message: string, analysis: MessageAnalysis): string {
    if (analysis.topics.length > 0) {
      const topic = analysis.topics[0];
      const explanation = this.getTopicExplanation(topic);
      return explanation + "\n\nIs there a specific aspect of this topic you'd like me to explore further?";
    }
    
    return "I'd be happy to provide information! I have extensive knowledge about:\n\n" +
           "🤖 **AI & Machine Learning**: Concepts, algorithms, applications\n" +
           "💻 **Programming**: Languages, frameworks, best practices\n" +
           "🌐 **Web Development**: Frontend, backend, full-stack\n" +
           "📊 **Data Science**: Analysis, visualization, statistics\n" +
           "🏗️ **Software Engineering**: Architecture, design patterns, methodologies\n\n" +
           "What specific information are you looking for?";
  }

  private generateContextualResponse(message: string, analysis: MessageAnalysis): string {
    // Check if this relates to previous conversation
    const recentTopics = this.context.sessionTopics.slice(-3);
    const relatedTopic = analysis.topics.find(topic => recentTopics.includes(topic));
    
    if (relatedTopic) {
      return `I see you're continuing our discussion about **${relatedTopic}**. That's great! ` +
             `Building on what we've talked about, I can help you explore this further. ` +
             `What specific aspect would you like to dive into?`;
    }
    
    // Generate response based on detected patterns
    if (analysis.keywords.length > 0) {
      const mainKeyword = analysis.keywords[0];
      return `I notice you mentioned **${mainKeyword}** - that's a fascinating topic! ` +
             `I'd love to help you explore this. Could you tell me more about what specifically interests you? ` +
             `I can provide explanations, examples, practical applications, or dive into technical details.`;
    }
    
    return "I want to give you the most helpful response possible. Could you provide a bit more context about what you're looking for? " +
           "I'm particularly strong in technology, programming, AI, and problem-solving. " +
           "Feel free to ask me anything - from basic concepts to advanced technical discussions!";
  }

  private learnFromInteraction(message: string, response: string, analysis: MessageAnalysis) {
    // Update user interests based on topics discussed
    analysis.topics.forEach(topic => {
      if (!this.context.userProfile.interests.includes(topic)) {
        this.context.userProfile.interests.push(topic);
      }
    });
    
    // Store successful interaction patterns
    this.context.contextualMemory.set(`interaction_${Date.now()}`, {
      userMessage: message,
      aiResponse: response,
      topics: analysis.topics,
      intent: analysis.intent,
      success: true // Could be determined by user feedback
    });
    
    // Keep memory manageable
    if (this.context.contextualMemory.size > 100) {
      const oldestKey = this.context.contextualMemory.keys().next().value;
      this.context.contextualMemory.delete(oldestKey);
    }
  }

  private inferUserExpertiseLevel(): string {
    const expertiseValues = Object.values(this.context.userProfile.expertise);
    if (expertiseValues.length === 0) return 'beginner';
    
    const avgExpertise = expertiseValues.reduce((sum, val) => sum + val, 0) / expertiseValues.length;
    
    if (avgExpertise > 0.7) return 'advanced';
    if (avgExpertise > 0.4) return 'intermediate';
    return 'beginner';
  }

  private generateErrorResponse(): string {
    return "I apologize, but I encountered an issue processing your message. This is unusual for me! " +
           "Could you try rephrasing your question? I'm designed to handle complex conversations and technical topics, " +
           "so I should be able to help once I understand what you're looking for.";
  }
}

export const intelligentAI = new IntelligentAI();