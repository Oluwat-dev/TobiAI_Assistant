import { advancedNLP } from './advancedNLP';
import { responseGenerator } from './responseGenerator';
import { contextManager } from './contextManager';

export const processMessage = async (message: string): Promise<string> => {
  try {
    // Analyze the message using advanced NLP
    const analysis = advancedNLP.analyzeMessage(message);
    
    // Generate intelligent response
    const response = responseGenerator.generateResponse(message, analysis);
    
    // Update conversation context
    contextManager.addToHistory(message, response, analysis.topics);
    
    // Update user preferences based on the message
    const inferredLevel = contextManager.inferUserLevel(message);
    contextManager.updateUserPreferences(inferredLevel, analysis.keywords);
    
    return response;
  } catch (error) {
    console.error('Error processing message:', error);
    return "I apologize, but I encountered an issue processing your message. Could you please try rephrasing your question? I'm here to help with any technical topics, AI discussions, or general questions you might have.";
  }
};

// Export additional utilities for potential future use
export { advancedNLP } from './advancedNLP';
export { responseGenerator } from './responseGenerator';
export { contextManager } from './contextManager';