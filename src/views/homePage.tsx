import { useEffect, useState } from 'react';
import SearchBox from '../components/SearchBox';
import Results from '../components/Results';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorButton from '../components/ErrorButton';
import useFetchPokemonFromAPI from '../hooks/fetchPokemonFromAPI';
import useGetQueryFromLS from '../hooks/getQueryFromLS';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const queryLS = useGetQueryFromLS();
  const { data, loading, error } = useFetchPokemonFromAPI(
    'https://pokeapi.co/api/v2/pokemon/',
    searchQuery
  );

  useEffect(() => {
    if (queryLS) {
      setSearchQuery(queryLS);
    } else {
      setSearchQuery('');
    }
  }, [queryLS]);

  const onSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <ErrorBoundary>
      <SearchBox onSearch={onSearch} searchQuery={searchQuery}></SearchBox>
      <Results results={data} loading={loading} errorMessage={error}></Results>
      <ErrorButton></ErrorButton>
    </ErrorBoundary>
  );
}
