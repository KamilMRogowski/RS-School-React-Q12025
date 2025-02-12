import './HomePage.scss';
import SearchBox from '../../components/SearchBox/SearchBox';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import PokemonList from '../../components/PokemonList/PokemonList';
import { Outlet } from 'react-router';

export default function HomePage() {
  return (
    <ErrorBoundary>
      <main>
        <SearchBox />
        <div className="results">
          <PokemonList />
          <Outlet />
        </div>
      </main>
      <ErrorButton></ErrorButton>
    </ErrorBoundary>
  );
}
