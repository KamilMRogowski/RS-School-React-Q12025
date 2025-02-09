import { useEffect, useState } from 'react';
import {
  Pokemon,
  PokemonList,
  pokemonListResponse,
} from '../utils/interfaces/pokemonApiResponse';

export default function useFetchPokemonFromAPI(url: string, query: string) {
  const [data, setData] = useState<Pokemon | PokemonList>(pokemonListResponse);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${url}${query}`);
        if (!response.ok) {
          throw new Error('Pokemon not found, please try again!');
        }
        const data = (await response.json()) as Pokemon | PokemonList;
        if (query) {
          setData(data as Pokemon);
        } else {
          setData(data as PokemonList);
        }
        if (query && !query.includes('offset')) {
          localStorage.setItem('lastSearch', query);
        }
      } catch (error: unknown) {
        console.error(error);
        setError(
          error instanceof Error ? error.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, [url, query]);
  return { data, loading, error };
}
