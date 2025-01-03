import { useState } from 'react';

export function Settings({ settings, onSave }) {
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            API Key
          </label>
          <input
            type="password"
            value={formData.apiKey}
            onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your Gemini API key"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Instructions
          </label>
          <textarea
            value={formData.customInstructions}
            onChange={(e) => setFormData(prev => ({ ...prev, customInstructions: e.target.value }))}
            className="w-full p-2 border rounded-lg h-24"
            placeholder="Add any custom instructions for the AI..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temperature
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={formData.temperature}
            onChange={(e) => setFormData(prev => ({ ...prev, temperature: e.target.value }))}
            className="w-full"
          />
          <div className="text-sm text-gray-500 mt-1">
            {formData.temperature} (Lower = more focused, Higher = more creative)
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.darkMode}
              onChange={(e) => setFormData(prev => ({ ...prev, darkMode: e.target.checked }))}
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">Dark Mode</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}