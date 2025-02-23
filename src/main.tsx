import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import './styles/index.scss';
import App from './App.tsx';
import DarkThemeProvider from './context/DarkThemeContext.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { Provider } from 'react-redux';
import { setupStore } from './store/store.ts';

const store = setupStore();

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <DarkThemeProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </DarkThemeProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
