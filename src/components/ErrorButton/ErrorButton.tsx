import { useState } from 'react';
import styles from './ErrorButton.module.scss';

export default function ErrorButton() {
  const [error, setError] = useState(false);

  if (error) {
    throw new Error('Error thrown from ErrorButton component');
  }
  return (
    <button
      className={styles['error-button']}
      onClick={() => {
        setError(true);
      }}
      data-testid="error-button"
    >
      ERROR BUTTON
    </button>
  );
}
