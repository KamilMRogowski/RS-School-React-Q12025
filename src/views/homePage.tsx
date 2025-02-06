import { useEffect, useState } from 'react';
import SearchBox from '../components/SearchBox';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorButton from '../components/ErrorButton';
import useGetQueryFromLS from '../hooks/getQueryFromLS';
import PokemonList from '../components/PokemonList';
import { Outlet } from 'react-router';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const queryLS = useGetQueryFromLS();

  useEffect(() => {
    if (queryLS) {
      setSearchQuery(queryLS);
    } else {
      setSearchQuery('');
    }
  }, [queryLS]);

  return (
    <ErrorBoundary>
      <main>
        <SearchBox searchQuery={searchQuery}></SearchBox>
        <div className="results">
          <PokemonList />
          <Outlet />
        </div>
      </main>
      <ErrorButton></ErrorButton>
    </ErrorBoundary>
  );
}
