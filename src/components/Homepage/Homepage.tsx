import styles from './Homepage.module.scss';
import SearchBox from '../SearchBox/SearchBox';
import ErrorButton from '../ErrorButton/ErrorButton';
import Flyout from '../Flyout/Flyout';
import { useDarkTheme } from '../../context/DarkThemeContext';

type HomePageProps = {
  children?: React.ReactNode;
};

export default function HomePage({ children }: HomePageProps) {
  const { darkTheme, toggleTheme } = useDarkTheme();

  return (
    <main className={darkTheme ? 'dark-mode' : 'light-mode'}>
      <nav className={styles.navigation}>
        <SearchBox />
        <label className={styles.switch}>
          <input type="checkbox" onClick={toggleTheme} />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
      </nav>
      <div className={styles.results}>{children}</div>
      <Flyout />
      <ErrorButton></ErrorButton>
    </main>
  );
}
