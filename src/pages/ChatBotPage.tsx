import React, { useState } from 'react';
import { Send, Bot, User, Info } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const ChatBotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your mental health support chatbot. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "I understand you're going through something. While I'm here to listen and provide general support, remember that I'm not a substitute for professional help. Would you like to explore some coping strategies or learn about professional resources?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-700 p-4 border-b border-gray-600">
            <div className="flex items-center">
              <Bot className="text-purple-400 w-8 h-8 mr-3" />
              <div>
                <h1 className="text-xl font-semibold text-white">Mental Health Support Bot</h1>
                <p className="text-sm text-gray-400">Here to listen and support</p>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-900/20 p-4 border-b border-blue-800">
            <div className="flex items-start">
              <Info className="text-blue-400 w-5 h-5 mr-2 mt-0.5" />
              <p className="text-blue-300 text-sm">
                This is a supportive chat experience. While I'm here to listen and offer general guidance, 
                I'm not a substitute for professional mental health care. If you're in crisis, please contact 
                emergency services or call the mental health crisis hotline at 988.
              </p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className="flex items-start max-w-[80%]">
                  {message.sender === 'bot' && (
                    <Bot className="w-8 h-8 text-purple-400 mr-2 mt-1" />
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-200'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-75 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  {message.sender === 'user' && (
                    <User className="w-8 h-8 text-purple-400 ml-2 mt-1" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-600">
            <div className="flex gap-4">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                rows={2}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className={`px-4 rounded-lg flex items-center justify-center ${
                  inputText.trim()
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage;
