import { openaiService } from './openaiService';
import { intelligentAI } from './intelligentAI';

export const processMessage = async (message: string): Promise<string> => {
  try {
    // Check if OpenAI is configured and use it for the most intelligent responses
    if (openaiService.isConfigured()) {
      return await openaiService.generateResponse(message);
    } else {
      // Fallback to local intelligent AI system
      return await intelligentAI.processMessage(message);
    }
  } catch (error) {
    console.error('Error processing message:', error);
    
    // Try fallback to local AI
    try {
      return await intelligentAI.processMessage(message);
    } catch (fallbackError) {
      console.error('Fallback AI also failed:', fallbackError);
      return "I apologize, but I'm experiencing technical difficulties. Please try rephrasing your question or check back in a moment.";
    }
  }
};

// Export services for potential direct access
export { openaiService } from './openaiService';
export { intelligentAI } from './intelligentAI';