import styles from './PokemonList.module.scss';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import PokemonCard from '../PokemonCard/PokemonCard';
import { useGetPokemonListQuery } from '../../store/api/pokemonApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCurrentPage } from '../../store/slices/currentPageSlice';
import { useParams, useRouter, usePathname } from 'next/navigation';

export const ITEMS_PER_PAGE = 10;

export default function PokemonList() {
  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { pageId } = params;
  const currentPageNumber = Number(pageId) || 1;
  const {
    data: pokemonList,
    error,
    isLoading,
  } = useGetPokemonListQuery({
    offset: (currentPageNumber - 1) * ITEMS_PER_PAGE,
    limit: ITEMS_PER_PAGE,
  });

  const closePokeCard = () => {
    if (pathname.includes('pokemon')) {
      router.push(`/page/${String(pageId)}`);
    }
  };

  useEffect(() => {
    dispatch(clearCurrentPage());
  }, [pageId, dispatch]);

  return (
    <div className={styles.pokemonList} onClick={closePokeCard}>
      <h2>Pokemon examples to get you started:</h2>
      {isLoading ? (
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
