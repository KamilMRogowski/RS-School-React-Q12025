import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import './styles/index.scss';
import App from './App.tsx';
import DarkThemeProvider from './context/DarkThemeContext.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <HashRouter>
      <DarkThemeProvider>
        <App />
      </DarkThemeProvider>
    </HashRouter>
  </StrictMode>
);
