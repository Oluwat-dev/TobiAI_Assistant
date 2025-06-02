import { intents } from './intents';

// Helper function to calculate similarity between two strings
const calculateSimilarity = (str1: string, str2: string): number => {
  const set1 = new Set(str1.toLowerCase().split(' '));
  const set2 = new Set(str2.toLowerCase().split(' '));
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return intersection.size / union.size;
};

// Check if a message is a standalone greeting
const isStandaloneGreeting = (message: string): boolean => {
  const greetings = ['hello', 'hi', 'hey', 'yo'];
  const words = message.toLowerCase().trim().split(/\s+/);
  return words.length <= 2 && greetings.some(greeting => words.includes(greeting));
};

// Simple NLP processing function
export const processMessage = async (message: string): Promise<string> => {
  // Convert to lowercase for easier matching
  const lowerMessage = message.toLowerCase();
  
  // Check for developer information queries
  if (lowerMessage.includes('who made you') || 
      lowerMessage.includes('who created you') || 
      lowerMessage.includes('who developed you') ||
      lowerMessage.includes('who is your developer')) {
    return "I was developed by Aluko Oluwatobi, a talented software engineer specializing in AI and natural language processing.";
  }

  if (lowerMessage.includes('aluko') || lowerMessage.includes('oluwatobi') || lowerMessage.includes('tobi')) {
    return "Aluko Oluwatobi is my developer. He's a skilled software engineer with expertise in AI, machine learning, and natural language processing. Would you like to know more about his work?";
  }

  // Only respond with a greeting if it's a standalone greeting
  if (isStandaloneGreeting(lowerMessage)) {
    return "Hello! How can I assist you today?";
  }

  // Check for gratitude
  if (lowerMessage.includes('thank you') || 
      lowerMessage.includes('thanks') ||
      lowerMessage.includes('thx')) {
    return "You're welcome! Is there anything else I can help you with?";
  }

  // Find the best matching intent using similarity scoring
  let bestMatch = { intent: null, score: 0 };
  
  for (const intent of intents) {
    for (const pattern of intent.patterns) {
      const similarity = calculateSimilarity(lowerMessage, pattern);
      if (similarity > bestMatch.score) {
        bestMatch = { intent, score: similarity };
      }
    }
  }

  // If we found a reasonable match (similarity > 0.2), use it
  if (bestMatch.score > 0.2 && bestMatch.intent) {
    const randomIndex = Math.floor(Math.random() * bestMatch.intent.responses.length);
    return bestMatch.intent.responses[randomIndex];
  }

  // If the message is a question
  if (lowerMessage.includes('?') || 
      lowerMessage.startsWith('what') || 
      lowerMessage.startsWith('how') || 
      lowerMessage.startsWith('why') ||
      lowerMessage.startsWith('can you')) {
    return "I understand you're asking a question. Could you please provide more context about what you'd like to know? I'm knowledgeable about AI, software development, and various technical topics.";
  }

  // Default response with more context
  return "I want to help, but I'm not quite sure what you're asking. I'm best at discussing topics like:\n\n" +
         "• AI and Machine Learning\n" +
         "• Software Development\n" +
         "• Programming Languages\n" +
         "• Technical Concepts\n\n" +
         "Could you rephrase your question or specify what you'd like to know about these topics?";
};