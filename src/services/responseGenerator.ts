import { AnalysisResult } from './advancedNLP';
import { KnowledgeEntry, searchKnowledge, getKnowledgeByKeywords } from './knowledgeBase';
import { contextManager } from './contextManager';

export class ResponseGenerator {
  generateResponse(message: string, analysis: AnalysisResult): string {
    const userLevel = contextManager.inferUserLevel(message);
    const previousTopics = contextManager.getPreviousTopics();
    const recentHistory = contextManager.getRecentHistory(2);

    // Handle different intents
    switch (analysis.intent) {
      case 'greeting':
        return this.generateGreeting(analysis.sentiment);
      
      case 'farewell':
        return this.generateFarewell();
      
      case 'gratitude':
        return this.generateGratitudeResponse();
      
      case 'developer_info':
        return this.generateDeveloperInfo();
      
      case 'capabilities':
        return this.generateCapabilitiesResponse(userLevel);
      
      case 'technical_question':
        return this.generateTechnicalResponse(message, analysis, userLevel);
      
      case 'question':
        return this.generateQuestionResponse(message, analysis, userLevel);
      
      default:
        return this.generateContextualResponse(message, analysis, userLevel, previousTopics);
    }
  }

  private generateGreeting(sentiment: string): string {
    const greetings = [
      "Hello! I'm Tobi AI, your intelligent assistant. How can I help you today?",
      "Hi there! I'm here to assist you with any questions about technology, programming, or AI. What would you like to explore?",
      "Greetings! I'm Tobi, an AI assistant created by Aluko Oluwatobi. What can I help you discover today?",
      "Welcome! I'm ready to help you with technical questions, explanations, or just have an engaging conversation. What's on your mind?"
    ];
    
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  private generateFarewell(): string {
    const farewells = [
      "Goodbye! Feel free to return anytime you have questions. I'm always here to help!",
      "Take care! I enjoyed our conversation. Come back whenever you need assistance.",
      "See you later! Remember, I'm here 24/7 for any technical questions or discussions.",
      "Farewell! It was great helping you today. Don't hesitate to reach out again!"
    ];
    
    return farewells[Math.floor(Math.random() * farewells.length)];
  }

  private generateGratitudeResponse(): string {
    const responses = [
      "You're very welcome! I'm glad I could help. Is there anything else you'd like to explore?",
      "My pleasure! That's exactly what I'm here for. Feel free to ask me anything else.",
      "Happy to help! I love sharing knowledge and helping people learn. What else can I assist with?",
      "You're welcome! I enjoy our conversations. Is there another topic you'd like to discuss?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private generateDeveloperInfo(): string {
    return "I was created by Aluko Oluwatobi, a talented software engineer with expertise in AI, machine learning, and natural language processing. He designed me to be an intelligent conversational assistant that can help with technical topics, answer questions, and engage in meaningful discussions. Oluwatobi is passionate about creating AI solutions that genuinely help people learn and solve problems. Would you like to know more about my capabilities or discuss any technical topics?";
  }

  private generateCapabilitiesResponse(userLevel: string): string {
    const baseCapabilities = "I'm an advanced AI assistant with several key capabilities:\n\n";
    
    const capabilities = {
      beginner: [
        "🤖 **AI & Technology Explanations**: I can explain complex concepts in simple terms",
        "💻 **Programming Help**: Guidance on learning to code and best practices",
        "🔍 **Research Assistance**: Help finding and understanding information",
        "💬 **Interactive Learning**: Engaging conversations to help you learn"
      ],
      intermediate: [
        "🧠 **Advanced AI Discussions**: Deep dives into machine learning, NLP, and AI architectures",
        "⚡ **Technical Problem Solving**: Help with coding challenges and system design",
        "📊 **Data Science Guidance**: Statistics, data analysis, and visualization techniques",
        "🏗️ **Software Architecture**: Best practices for building scalable applications"
      ],
      advanced: [
        "🔬 **Research-Level Discussions**: Latest developments in AI, algorithms, and computer science",
        "🏭 **Enterprise Solutions**: Scalability, performance optimization, and system architecture",
        "🤖 **AI Model Development**: Training strategies, model selection, and deployment",
        "📈 **Technical Leadership**: Code reviews, team practices, and technology decisions"
      ]
    };

    const levelCaps = capabilities[userLevel as keyof typeof capabilities] || capabilities.beginner;
    
    return baseCapabilities + levelCaps.join('\n') + 
           "\n\nI adapt my responses to your level of expertise and maintain context throughout our conversation. What would you like to explore?";
  }

  private generateTechnicalResponse(message: string, analysis: AnalysisResult, userLevel: string): string {
    // Search knowledge base
    const knowledgeResults = searchKnowledge(message);
    const keywordResults = getKnowledgeByKeywords(analysis.keywords);
    
    const relevantKnowledge = [...new Set([...knowledgeResults, ...keywordResults])]
      .filter(entry => entry.difficulty === userLevel || 
                      (userLevel === 'advanced' && entry.difficulty === 'intermediate') ||
                      (userLevel === 'intermediate' && entry.difficulty === 'beginner'))
      .slice(0, 2);

    if (relevantKnowledge.length > 0) {
      const knowledge = relevantKnowledge[0];
      let response = this.adaptResponseToLevel(knowledge.content, userLevel);
      
      // Add follow-up suggestions
      if (relevantKnowledge.length > 1) {
        response += `\n\nRelated topics you might find interesting:\n• ${relevantKnowledge[1].topic.replace(/_/g, ' ')}`;
      }
      
      response += "\n\nWould you like me to elaborate on any specific aspect or explore related concepts?";
      return response;
    }

    return this.generateFallbackTechnicalResponse(analysis, userLevel);
  }

  private generateQuestionResponse(message: string, analysis: AnalysisResult, userLevel: string): string {
    const questionType = analysis.questionType;
    
    // Try to find relevant knowledge first
    const knowledgeResults = searchKnowledge(message);
    if (knowledgeResults.length > 0) {
      const knowledge = knowledgeResults[0];
      let response = this.adaptResponseToLevel(knowledge.content, userLevel);
      
      // Add question-type specific formatting
      switch (questionType) {
        case 'how':
          response = "Here's how it works:\n\n" + response;
          break;
        case 'what':
          response = "Let me explain:\n\n" + response;
          break;
        case 'why':
          response = "The reason is:\n\n" + response;
          break;
      }
      
      return response + "\n\nDoes this answer your question, or would you like me to explain any part in more detail?";
    }

    // Generate question-type specific responses
    switch (questionType) {
      case 'what':
        return "I'd be happy to explain that concept! However, I need a bit more context to give you the most accurate and helpful answer. Could you specify which aspect you're most interested in?";
      
      case 'how':
        return "Great question! I can walk you through the process step by step. To give you the most relevant explanation, could you tell me a bit more about your current level of experience with this topic?";
      
      case 'why':
        return "That's an excellent question that gets to the heart of the matter! The reasoning involves several factors. Could you help me understand what specific aspect you're most curious about?";
      
      default:
        return this.generateContextualResponse(message, analysis, userLevel, []);
    }
  }

  private generateContextualResponse(message: string, analysis: AnalysisResult, userLevel: string, previousTopics: string[]): string {
    // Check if this relates to previous conversation
    const relatedTopics = previousTopics.filter(topic => 
      analysis.keywords.some(keyword => topic.toLowerCase().includes(keyword.toLowerCase()))
    );

    if (relatedTopics.length > 0) {
      return `I see you're continuing our discussion about ${relatedTopics[0]}. That's great! ` +
             `To give you the most helpful response, could you be more specific about what aspect you'd like to explore? ` +
             `I can provide detailed explanations, examples, or practical applications depending on what interests you most.`;
    }

    // Generate response based on detected keywords and sentiment
    if (analysis.keywords.length > 0) {
      const mainKeyword = analysis.keywords[0];
      return `I notice you mentioned "${mainKeyword}" - that's a fascinating topic! ` +
             `I'd love to help you explore this further. Could you tell me more about what specifically you'd like to know? ` +
             `I can explain concepts, provide examples, discuss applications, or dive into technical details depending on your interests.`;
    }

    // Fallback response
    return "I want to give you the most helpful and accurate response possible. Could you provide a bit more detail about what you're looking for? " +
           "I'm particularly knowledgeable about:\n\n" +
           "• AI and Machine Learning\n" +
           "• Software Development\n" +
           "• Programming Languages\n" +
           "• Data Science\n" +
           "• Web Development\n" +
           "• Computer Science Concepts\n\n" +
           "What would you like to explore?";
  }

  private adaptResponseToLevel(content: string, userLevel: string): string {
    switch (userLevel) {
      case 'beginner':
        return content + "\n\n💡 **In simple terms**: This is like having a smart tool that learns from examples to make decisions or predictions, similar to how you learn to recognize patterns.";
      
      case 'intermediate':
        return content + "\n\n🔧 **Technical note**: Consider exploring the practical implementations and frameworks available for this concept.";
      
      case 'advanced':
        return content + "\n\n⚡ **Advanced insight**: You might want to consider the algorithmic complexity, scalability implications, and latest research developments in this area.";
      
      default:
        return content;
    }
  }

  private generateFallbackTechnicalResponse(analysis: AnalysisResult, userLevel: string): string {
    return `That's an interesting technical question! While I don't have specific information about that exact topic in my knowledge base, ` +
           `I'd be happy to help you explore it further. Based on the keywords you mentioned (${analysis.keywords.slice(0, 3).join(', ')}), ` +
           `this seems related to ${this.categorizeKeywords(analysis.keywords)}. ` +
           `Could you provide more context so I can give you a more targeted and helpful response?`;
  }

  private categorizeKeywords(keywords: string[]): string {
    const categories = {
      ai: ['ai', 'artificial', 'intelligence', 'machine', 'learning', 'neural', 'deep'],
      programming: ['code', 'programming', 'development', 'software', 'algorithm'],
      web: ['web', 'html', 'css', 'javascript', 'react', 'frontend', 'backend'],
      data: ['data', 'database', 'sql', 'analytics', 'statistics']
    };

    for (const [category, terms] of Object.entries(categories)) {
      if (keywords.some(keyword => terms.some(term => keyword.toLowerCase().includes(term)))) {
        return category === 'ai' ? 'artificial intelligence and machine learning' :
               category === 'programming' ? 'software development and programming' :
               category === 'web' ? 'web development' :
               'data science and analytics';
      }
    }

    return 'technology and computer science';
  }
}

export const responseGenerator = new ResponseGenerator();