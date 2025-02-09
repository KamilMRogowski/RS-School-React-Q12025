import { useState } from 'react';

export default function ErrorButton() {
  const [error, setError] = useState(false);

  if (error) {
    throw new Error('Error thrown from ErrorButton component');
  }
  return (
    <button
      className="error-button"
      onClick={() => {
        setError(true);
      }}
    >
      ERROR BUTTON
    </button>
  );
}
