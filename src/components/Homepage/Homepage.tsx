'use client';
import styles from './Homepage.module.scss';
import SearchBox from '../SearchBox/SearchBox';
import ErrorButton from '../ErrorButton/ErrorButton';
import PokemonList from '../PokemonList/PokemonList';
import Flyout from '../Flyout/Flyout';
import { useDarkTheme } from '../../context/DarkThemeContext';
import { useParams } from 'next/navigation';
import Head from 'next/head';

type HomePageProps = {
  children?: React.ReactNode;
};

export default function HomePage({ children }: HomePageProps) {
  const { darkTheme, toggleTheme } = useDarkTheme();
  const params = useParams();
  const { pokemonName } = params;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={darkTheme ? 'dark-mode' : 'light-mode'}>
        <nav className={styles.navigation}>
          <SearchBox />
          <label className={styles.switch}>
            <input type="checkbox" onClick={toggleTheme} />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </nav>
        <div className={styles.results}>
          <PokemonList />
          {pokemonName && <>{children}</>}
        </div>
        <Flyout />
        <ErrorButton></ErrorButton>
      </main>
    </>
  );
}
