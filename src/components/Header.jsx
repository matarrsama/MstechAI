export function Header({ showSettings, showProfile, onToggleSettings, onToggleProfile, user }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
        MsTech ChatBot
      </h1>
      {user && (
        <div className="flex space-x-4">
          <button
            onClick={onToggleProfile}
            className="px-6 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
          >
            {showProfile ? 'Close Profile' : 'Profile'}
          </button>
          <button
            onClick={onToggleSettings}
            className="px-6 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
          >
            {showSettings ? 'Close Settings' : 'Settings'}
          </button>
        </div>
      )}
    </div>
  );
}