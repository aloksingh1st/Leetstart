import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const [ theme, setTheme ] = useState('light');

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-full transition-colors duration-200 
                 dark:bg-gray-700 bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white 
                 dark:focus:ring-offset-gray-800 focus:ring-gray-400"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-700" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
