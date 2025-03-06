/* eslint-disable react-refresh/only-export-components */
import '../styles/index.scss';
import { AppProps } from 'next/app';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary.tsx';
import DarkThemeProvider from '../context/DarkThemeContext.tsx';
import { wrapper } from '../store/store.ts';
import Head from 'next/head';
import HomePage from '../components/Homepage/Homepage.tsx';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Head>
        <title>Pokemon Finder</title>
      </Head>
      <DarkThemeProvider>
        <HomePage>
          <Component {...pageProps} />
        </HomePage>
      </DarkThemeProvider>
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(MyApp);
