import { useState, useEffect } from 'react';
import { generateResponse } from '../services/gemini';
import { saveMessage, fetchMessages } from '../services/messages';

export function useChat(settings, userId) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load chat history
  useEffect(() => {
    if (userId) {
      fetchMessages(userId)
        .then(chatHistory => {
          setMessages(chatHistory.map(msg => ({
            text: msg.content,
            isUser: msg.is_user
          })));
        })
        .catch(console.error);
    }
  }, [userId]);

  const sendMessage = async (message) => {
    if (!settings.apiKey) {
      setMessages(prev => [...prev, { 
        text: 'Please configure your API key in settings first.', 
        isUser: false 
      }]);
      return;
    }

    // Save user message
    await saveMessage({
      userId,
      content: message,
      isUser: true
    });

    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await generateResponse(message, settings);
      
      // Save AI response
      await saveMessage({
        userId,
        content: response,
        isUser: false
      });

      setMessages(prev => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: 'Sorry, Please confirm your API key.', 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage };
}