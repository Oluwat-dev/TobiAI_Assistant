import OpenAI from 'openai';

interface ConversationMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

class OpenAIService {
  private openai: OpenAI | null = null;
  private conversationHistory: ConversationMessage[] = [];
  private maxHistoryLength = 10;

  constructor() {
    this.initializeOpenAI();
  }

  private initializeOpenAI() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (apiKey) {
      this.openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
      });
      
      // Set system message to define the AI's personality
      this.conversationHistory = [{
        role: 'system',
        content: `You are Tobi AI, an intelligent assistant created by Aluko Oluwatobi. You are knowledgeable about:
        - Artificial Intelligence and Machine Learning
        - Programming languages (JavaScript, Python, Java, etc.)
        - Web development (React, Node.js, HTML, CSS)
        - Software engineering best practices
        - Data science and analytics
        - Computer science concepts
        
        Your personality:
        - Helpful and knowledgeable
        - Adapt explanations to the user's expertise level
        - Provide practical examples and code when relevant
        - Ask clarifying questions when needed
        - Be encouraging and supportive for learning
        - Maintain context throughout the conversation
        
        Always provide accurate, helpful, and well-structured responses.`
      }];
    }
  }

  async generateResponse(userMessage: string): Promise<string> {
    if (!this.openai) {
      return this.getFallbackResponse(userMessage);
    }

    try {
      // Add user message to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      // Keep conversation history manageable
      if (this.conversationHistory.length > this.maxHistoryLength) {
        // Keep system message and recent messages
        const systemMessage = this.conversationHistory[0];
        const recentMessages = this.conversationHistory.slice(-9);
        this.conversationHistory = [systemMessage, ...recentMessages];
      }

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // You can change to 'gpt-4' if you have access
        messages: this.conversationHistory,
        max_tokens: 1000,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      });

      const response = completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response.';

      // Add AI response to conversation history
      this.conversationHistory.push({
        role: 'assistant',
        content: response
      });

      return response;

    } catch (error) {
      console.error('OpenAI API Error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          return "I need an OpenAI API key to provide intelligent responses. Please add your VITE_OPENAI_API_KEY to the environment variables.";
        } else if (error.message.includes('quota')) {
          return "I've reached my API usage limit. Please check your OpenAI account or try again later.";
        } else if (error.message.includes('rate limit')) {
          return "I'm receiving too many requests. Please wait a moment and try again.";
        }
      }

      return this.getFallbackResponse(userMessage);
    }
  }

  private getFallbackResponse(userMessage: string): string {
    // Fallback to local intelligent responses when API is not available
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm Tobi AI, your intelligent assistant. I'd love to help you with any questions about technology, programming, or AI. To unlock my full potential with GPT-powered responses, please add your OpenAI API key to the environment variables.";
    }
    
    if (lowerMessage.includes('api key')) {
      return "To enable GPT-powered responses, you need to:\n\n1. Get an API key from OpenAI (https://platform.openai.com/api-keys)\n2. Add it as VITE_OPENAI_API_KEY in your environment variables\n3. Restart the development server\n\nOnce configured, I'll provide incredibly intelligent responses powered by GPT!";
    }

    return "I'm currently running in local mode. For the most intelligent responses powered by GPT, please configure your OpenAI API key. In the meantime, I can still help with basic questions about technology and programming!";
  }

  isConfigured(): boolean {
    return this.openai !== null;
  }

  clearHistory(): void {
    // Keep only the system message
    this.conversationHistory = this.conversationHistory.slice(0, 1);
  }
}

export const openaiService = new OpenAIService();