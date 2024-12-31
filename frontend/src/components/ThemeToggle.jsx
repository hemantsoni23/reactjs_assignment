import React, { useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    const body = document.body;
    body.classList.toggle("dark");
    body.classList.toggle("light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:shadow-lg focus:outline-none"
    >
      {theme === 'light' ?'☀️ Light' :'🌙 Dark' }
    </button>
  );
};

export default ThemeToggle;