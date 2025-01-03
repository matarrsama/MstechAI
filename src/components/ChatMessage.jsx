export function ChatMessage({ message, isUser, darkMode }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-[slideIn_0.3s_ease-out]`}>
      <div className={`max-w-[80%] rounded-2xl px-6 py-4 shadow-sm ${
        isUser 
          ? 'bg-blue-500 text-white' 
          : darkMode 
            ? 'bg-gray-700 text-white' 
            : 'bg-gray-100 text-gray-800'
      }`}>
        <p className="whitespace-pre-wrap leading-relaxed">{message}</p>
      </div>
    </div>
  );
}