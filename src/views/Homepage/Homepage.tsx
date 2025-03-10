import './HomePage.scss';
import SearchBox from '../../components/SearchBox/SearchBox';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import PokemonList from '../../components/PokemonList/PokemonList';
import Flyout from '../../components/Flyout/Flyout';
import { Outlet } from 'react-router';
import { useDarkTheme } from '../../context/DarkThemeContext';
import { PokemonList as PokemonListInterface } from '../../utils/interfaces/pokemonApiResponse';

type HomePageProps = {
  listData: PokemonListInterface;
};

export default function HomePage({ listData }: HomePageProps) {
  const { darkTheme, toggleTheme } = useDarkTheme();

  return (
    <main className={darkTheme ? 'dark-mode' : 'light-mode'}>
      <nav>
        <SearchBox />
        <label className="switch">
          <input type="checkbox" onClick={toggleTheme} />
          <span className="slider round"></span>
        </label>
      </nav>
      <div className="results">
        <PokemonList listData={listData} />
        <Outlet />
      </div>
      <Flyout />
      <ErrorButton></ErrorButton>
    </main>
  );
}
