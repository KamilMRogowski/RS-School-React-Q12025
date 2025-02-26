import '../styles/index.scss';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import DarkThemeProvider from '../context/DarkThemeContext';
import { setupStore } from '../store/store.ts';
import Head from 'next/head';

const store = setupStore();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Head>
        <title>Pokemon Finder</title>
      </Head>
      <Provider store={store}>
        <DarkThemeProvider>
          <Component {...pageProps} />
        </DarkThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default MyApp;
