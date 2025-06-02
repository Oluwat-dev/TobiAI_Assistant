import React from 'react';
import { Message } from '../types/Message';
import { formatMessageTime } from '../utils/dateUtils';
import { CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isAi = message.sender === 'ai';
  
  return (
    <div
      className={`flex ${isAi ? 'justify-start' : 'justify-end'} animate-fadeIn`}
    >
      <div
        className={`max-w-[80%] md:max-w-[70%] ${
          isAi
            ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-t-lg rounded-br-lg rounded-bl-sm border border-gray-200 dark:border-gray-600'
            : 'bg-blue-500 text-white rounded-t-lg rounded-bl-lg rounded-br-sm'
        } px-4 py-3 shadow-sm`}
      >
        <div className="whitespace-pre-wrap">{message.text}</div>
        <div className="flex items-center justify-end mt-1 space-x-1">
          <span className="text-xs opacity-70">
            {formatMessageTime(message.timestamp)}
          </span>
          {!isAi && message.read && (
            <CheckCheck className="h-3 w-3 text-blue-100" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;