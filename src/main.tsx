import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import './styles/index.scss';
import App from './App.tsx';
import DarkThemeProvider from './context/DarkThemeContext.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <DarkThemeProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </DarkThemeProvider>
    </Provider>
  </StrictMode>
);
