import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import DarkThemeProvider from './context/DarkThemeContext';
import './styles/index.scss';

const store = setupStore();

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pokemon Finder</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <DarkThemeProvider>
          <Outlet />
        </DarkThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
