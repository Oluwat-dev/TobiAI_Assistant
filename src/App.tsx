import React from 'react';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[600px] bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
}

export default App;