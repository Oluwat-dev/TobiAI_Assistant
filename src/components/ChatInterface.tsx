import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Send, Key, CheckCircle, XCircle } from 'lucide-react';
import MessageList from './MessageList';
import { Message } from '../types/Message';
import { processMessage } from '../services/nlpService';
import { openaiService } from '../services/openaiService';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Tobi AI, your intelligent assistant developed by Aluko Oluwatobi. I can provide incredibly smart responses powered by GPT when configured with an API key. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
      read: true,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isGptConfigured, setIsGptConfigured] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Check if GPT is configured
    setIsGptConfigured(openaiService.isConfigured());
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      read: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(async () => {
      const response = await processMessage(inputText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
        read: true,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      // In a real app, you'd securely store this
      localStorage.setItem('openai_api_key', apiKey);
      // Reload to reinitialize with new API key
      window.location.reload();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Tobi AI Assistant</h1>
            {isGptConfigured ? (
              <CheckCircle className="h-5 w-5 text-green-500" title="GPT API Configured" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" title="GPT API Not Configured" />
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Developed by Aluko Oluwatobi {isGptConfigured ? '• GPT-Powered' : '• Local AI Mode'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {!isGptConfigured && (
            <button
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Configure GPT API"
            >
              <Key className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-gray-400 dark:text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {showApiKeyInput && !isGptConfigured && (
        <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-blue-50 dark:bg-blue-900/20">
          <div className="flex items-center space-x-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your OpenAI API key..."
              className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
            />
            <button
              onClick={handleApiKeySubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
            >
              Configure
            </button>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">OpenAI Platform</a>
          </p>
        </div>
      )}

      <MessageList messages={messages} isTyping={isTyping} />

      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isGptConfigured ? "Ask me anything - I'm powered by GPT!" : "Type your message here..."}
            className="flex-1 p-3 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <button
            onClick={handleSendMessage}
            disabled={inputText.trim() === ''}
            className={`p-3 rounded-full ${
              inputText.trim() === ''
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } transition-colors`}
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        {!isGptConfigured && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            💡 Configure OpenAI API key for GPT-powered intelligent responses
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;