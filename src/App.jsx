import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ChatContainer } from './components/chat/ChatContainer';
import { Header } from './components/Header';
import { Settings } from './components/Settings';
import { Auth } from './components/Auth';
import { Profile } from './components/Profile';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [settings, setSettings] = useLocalStorage('chatbot-settings', {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
    customInstructions: '',
    temperature: 0.7,
    darkMode: false,
  });
  
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 ${settings.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <div className="max-w-2xl mx-auto">
        <Header 
          showSettings={showSettings}
          showProfile={showProfile}
          onToggleSettings={() => user && setShowSettings(!showSettings)}
          onToggleProfile={() => user && setShowProfile(!showProfile)}
          user={user}
        />

        {!user ? (
          <Auth />
        ) : showProfile ? (
          <Profile />
        ) : showSettings ? (
          <Settings settings={settings} onSave={setSettings} />
        ) : (
          <ChatContainer settings={settings} userId={user.id} />
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}