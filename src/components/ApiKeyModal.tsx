import { useState } from 'react';
import { X, Settings } from 'lucide-react';
import { useStore } from '../store';

export function ApiKeyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { apiKey, setApiKey } = useStore();
  const [inputValue, setInputValue] = useState(apiKey || '');

  const handleSave = () => {
    setApiKey(inputValue);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 p-3 bg-slate-800 hover:bg-slate-700 rounded-lg shadow-lg transition-colors text-white"
        title="Settings"
      >
        <Settings className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                OpenAI API Key
              </label>
              <input
                type="password"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="sk-..."
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <p className="mt-2 text-xs text-gray-400">
                Your API key is stored locally and never sent anywhere except OpenAI.
                Get your key from{' '}
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  platform.openai.com
                </a>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
