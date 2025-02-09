import SearchBox from '../components/SearchBox';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorButton from '../components/ErrorButton';
import PokemonList from '../components/PokemonList';
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
