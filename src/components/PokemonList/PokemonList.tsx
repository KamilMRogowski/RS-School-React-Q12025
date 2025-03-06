import styles from './PokemonList.module.scss';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import PokemonCard from '../PokemonCard/PokemonCard';
import { useGetPokemonListQuery } from '../../store/api/pokemonApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCurrentPage } from '../../store/slices/currentPageSlice';
import { useRouter } from 'next/router';
import { PokemonList as PokemonListInterface } from '../../utils/interfaces/pokemonApiResponse';

type PokemonListProps = {
  pageId: string;
  pokemonList?: PokemonListInterface;
};

export default function PokemonList({
  pageId,
  pokemonList: pokemonListFetch,
}: PokemonListProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, error, isLoading, isFetching } = useGetPokemonListQuery(
    pageId,
    {
      skip: !!pokemonListFetch,
    }
  );

  const pokemonList = pokemonListFetch || data;

  const closePokeCard = () => {
    if (router.pathname.includes('pokemon')) {
      void router.push(`/page/${pageId}`);
    }
  };

  useEffect(() => {
    dispatch(clearCurrentPage());
  }, [pageId, dispatch]);

  return (
    <div className={styles.pokemonList} onClick={closePokeCard}>
      <h2>Pokemon examples to get you started:</h2>
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <div className={styles.listItems} data-testid="pokemon-list-items">
          {pokemonList &&
            pokemonList.results.map((pokemon) => {
              return (
                <div key={pokemon.name}>
                  <PokemonCard pokemon={pokemon.name} />
                </div>
              );
            })}
        </div>
      )}
      {pokemonList && pokemonList.results.length > 0 && <Pagination />}
      {error && (
        <div>
          <h3 data-testid="pokemon-list-error">Failed to load Pokemon List</h3>
        </div>
      )}
    </div>
  );
}
