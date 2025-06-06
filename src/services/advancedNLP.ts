import nlp from 'compromise';
// @ts-ignore
import natural from 'natural';

export interface AnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  entities: string[];
  topics: string[];
  intent: string;
  confidence: number;
  keywords: string[];
  questionType?: 'what' | 'how' | 'why' | 'when' | 'where' | 'who' | 'yes_no' | 'choice' | 'other';
}

class AdvancedNLP {
  private stemmer = natural.PorterStemmer;
  private tokenizer = new natural.WordTokenizer();
  private analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

  analyzeMessage(message: string): AnalysisResult {
    const doc = nlp(message);
    
    // Extract entities
    const entities = [
      ...doc.people().out('array'),
      ...doc.places().out('array'),
      ...doc.organizations().out('array'),
      ...doc.topics().out('array')
    ];

    // Extract topics and keywords
    const topics = doc.topics().out('array');
    const nouns = doc.nouns().out('array');
    const verbs = doc.verbs().out('array');
    const adjectives = doc.adjectives().out('array');
    
    const keywords = [...new Set([...nouns, ...verbs, ...adjectives])]
      .filter(word => word.length > 2)
      .slice(0, 10);

    // Determine question type
    const questionType = this.getQuestionType(message);

    // Analyze sentiment
    const tokens = this.tokenizer.tokenize(message.toLowerCase()) || [];
    const stemmedTokens = tokens.map(token => this.stemmer.stem(token));
    const sentiment = this.getSentiment(stemmedTokens);

    // Determine intent
    const intent = this.determineIntent(message, doc);

    return {
      sentiment,
      entities,
      topics,
      intent,
      confidence: this.calculateConfidence(message, intent),
      keywords,
      questionType
    };
  }

  private getQuestionType(message: string): AnalysisResult['questionType'] {
    const lowerMessage = message.toLowerCase().trim();
    
    if (lowerMessage.startsWith('what')) return 'what';
    if (lowerMessage.startsWith('how')) return 'how';
    if (lowerMessage.startsWith('why')) return 'why';
    if (lowerMessage.startsWith('when')) return 'when';
    if (lowerMessage.startsWith('where')) return 'where';
    if (lowerMessage.startsWith('who')) return 'who';
    if (lowerMessage.startsWith('is') || lowerMessage.startsWith('are') || 
        lowerMessage.startsWith('do') || lowerMessage.startsWith('does') ||
        lowerMessage.startsWith('can') || lowerMessage.startsWith('will')) return 'yes_no';
    if (lowerMessage.includes(' or ')) return 'choice';
    if (message.includes('?')) return 'other';
    
    return undefined;
  }

  private getSentiment(tokens: string[]): 'positive' | 'negative' | 'neutral' {
    if (tokens.length === 0) return 'neutral';
    
    const score = this.analyzer.getSentiment(tokens);
    
    if (score > 0.1) return 'positive';
    if (score < -0.1) return 'negative';
    return 'neutral';
  }

  private determineIntent(message: string, doc: any): string {
    const lowerMessage = message.toLowerCase();
    
    // Greeting patterns
    if (/^(hi|hello|hey|greetings|good (morning|afternoon|evening))/.test(lowerMessage)) {
      return 'greeting';
    }
    
    // Farewell patterns
    if (/^(bye|goodbye|see you|farewell|take care)/.test(lowerMessage)) {
      return 'farewell';
    }
    
    // Gratitude patterns
    if (/(thank|thanks|appreciate|grateful)/.test(lowerMessage)) {
      return 'gratitude';
    }
    
    // Developer inquiry
    if (/(who (made|created|developed|built)|developer|creator|author)/.test(lowerMessage)) {
      return 'developer_info';
    }
    
    // Capability inquiry
    if (/(what can you|your (abilities|capabilities)|help me with)/.test(lowerMessage)) {
      return 'capabilities';
    }
    
    // Technical topics
    const techKeywords = ['ai', 'artificial intelligence', 'machine learning', 'programming', 'code', 'development', 'algorithm', 'data', 'software'];
    if (techKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'technical_question';
    }
    
    // Question patterns
    if (message.includes('?') || /^(what|how|why|when|where|who|can|is|are|do|does)/.test(lowerMessage)) {
      return 'question';
    }
    
    return 'general';
  }

  private calculateConfidence(message: string, intent: string): number {
    const messageLength = message.split(' ').length;
    let confidence = 0.5;
    
    // Adjust confidence based on message length and clarity
    if (messageLength >= 3 && messageLength <= 20) confidence += 0.2;
    if (intent !== 'general') confidence += 0.2;
    if (message.includes('?')) confidence += 0.1;
    
    return Math.min(confidence, 1.0);
  }

  extractKeyPhrases(message: string): string[] {
    const doc = nlp(message);
    const phrases = doc.match('#Noun+ #Preposition? #Noun+').out('array');
    const compounds = doc.match('#Adjective+ #Noun+').out('array');
    
    return [...new Set([...phrases, ...compounds])].slice(0, 5);
  }

  isQuestion(message: string): boolean {
    return message.includes('?') || 
           /^(what|how|why|when|where|who|can|is|are|do|does|will|would|could|should)/i.test(message.trim());
  }
}

export const advancedNLP = new AdvancedNLP();