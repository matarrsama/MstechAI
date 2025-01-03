import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChat } from '../../hooks/useChat';

export function ChatContainer({ settings, userId }) {
  const { messages, isLoading, sendMessage } = useChat(settings, userId);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={`${
      settings.darkMode ? 'bg-gray-800' : 'bg-white'
    } rounded-xl shadow-lg p-6 transition-colors duration-200`}>
      <div className={`h-[400px] overflow-y-auto mb-6 pr-4 ${
        settings.darkMode ? 'dark-scroll' : ''
      }`}>
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isUser={message.isUser}
            darkMode={settings.darkMode}
          />
        ))}
        {isLoading && (
          <div className="flex items-center justify-center space-x-2 my-4 animate-pulse">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={sendMessage} darkMode={settings.darkMode} />
    </div>
  );
}