import { intelligentAI } from './intelligentAI';

export const processMessage = async (message: string): Promise<string> => {
  try {
    // Use the intelligent AI system for processing
    return await intelligentAI.processMessage(message);
  } catch (error) {
    console.error('Error processing message:', error);
    return "I apologize, but I encountered an issue processing your message. This is unusual for my advanced AI system! " +
           "Could you try rephrasing your question? I'm designed to handle complex conversations and technical topics, " +
           "so I should be able to help once I understand what you're looking for.";
  }
};

// Export the intelligent AI instance for potential direct access
export { intelligentAI } from './intelligentAI';