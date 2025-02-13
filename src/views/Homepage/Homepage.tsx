import './HomePage.scss';
import SearchBox from '../../components/SearchBox/SearchBox';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import PokemonList from '../../components/PokemonList/PokemonList';
import { Outlet } from 'react-router';
import { useDarkTheme } from '../../context/DarkThemeContext';

export default function HomePage() {
  const { darkTheme, toggleTheme } = useDarkTheme();

  return (
    <ErrorBoundary>
      <main className={darkTheme ? 'dark-mode' : 'light-mode'}>
        <nav>
          <SearchBox />
          <label className="switch">
            <input type="checkbox" onClick={toggleTheme} />
            <span className="slider round"></span>
          </label>
        </nav>
        <div className="results">
          <PokemonList />
          <Outlet />
        </div>
      </main>
      <ErrorButton></ErrorButton>
    </ErrorBoundary>
  );
}
