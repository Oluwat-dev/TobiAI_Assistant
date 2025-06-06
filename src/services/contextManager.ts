interface ConversationContext {
  previousTopics: string[];
  userPreferences: {
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    interests: string[];
  };
  conversationHistory: Array<{
    userMessage: string;
    aiResponse: string;
    timestamp: Date;
    topics: string[];
  }>;
}

class ContextManager {
  private context: ConversationContext = {
    previousTopics: [],
    userPreferences: {
      difficulty: 'beginner',
      interests: []
    },
    conversationHistory: []
  };

  addToHistory(userMessage: string, aiResponse: string, topics: string[]) {
    this.context.conversationHistory.push({
      userMessage,
      aiResponse,
      timestamp: new Date(),
      topics
    });

    // Keep only last 10 conversations to manage memory
    if (this.context.conversationHistory.length > 10) {
      this.context.conversationHistory = this.context.conversationHistory.slice(-10);
    }

    // Update previous topics
    topics.forEach(topic => {
      if (!this.context.previousTopics.includes(topic)) {
        this.context.previousTopics.push(topic);
      }
    });

    // Keep only last 20 topics
    if (this.context.previousTopics.length > 20) {
      this.context.previousTopics = this.context.previousTopics.slice(-20);
    }
  }

  getPreviousTopics(): string[] {
    return this.context.previousTopics;
  }

  getRecentHistory(count: number = 3): Array<{userMessage: string, aiResponse: string, topics: string[]}> {
    return this.context.conversationHistory.slice(-count);
  }

  updateUserPreferences(difficulty?: 'beginner' | 'intermediate' | 'advanced', interests?: string[]) {
    if (difficulty) {
      this.context.userPreferences.difficulty = difficulty;
    }
    if (interests) {
      this.context.userPreferences.interests = [...new Set([...this.context.userPreferences.interests, ...interests])];
    }
  }

  getUserPreferences() {
    return this.context.userPreferences;
  }

  inferUserLevel(message: string): 'beginner' | 'intermediate' | 'advanced' {
    const advancedTerms = ['algorithm', 'complexity', 'optimization', 'architecture', 'scalability', 'performance'];
    const intermediateTerms = ['framework', 'library', 'api', 'database', 'backend', 'frontend'];
    
    const messageWords = message.toLowerCase().split(' ');
    
    if (advancedTerms.some(term => messageWords.includes(term))) {
      return 'advanced';
    } else if (intermediateTerms.some(term => messageWords.includes(term))) {
      return 'intermediate';
    }
    
    return 'beginner';
  }

  getContext(): ConversationContext {
    return this.context;
  }
}

export const contextManager = new ContextManager();