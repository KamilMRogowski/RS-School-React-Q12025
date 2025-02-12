import { useState } from 'react';
import { useDarkTheme } from '../../context/DarkThemeContext';
import './ErrorButton.scss';

export default function ErrorButton() {
  const { darkTheme } = useDarkTheme();
  const [error, setError] = useState(false);

  if (error) {
    throw new Error('Error thrown from ErrorButton component');
  }
  return (
    <button
      className={`error-button ${darkTheme ? 'error-button--dark-mode' : ''}`}
      onClick={() => {
        setError(true);
      }}
    >
      ERROR BUTTON
    </button>
  );
}
