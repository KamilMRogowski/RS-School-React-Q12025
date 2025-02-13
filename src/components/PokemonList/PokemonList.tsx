import './PokemonList.scss';
import { useParams, useNavigate, useLocation } from 'react-router';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import PokemonCard from '../PokemonCard/PokemonCard';
import { useGetPokemonListQuery } from '../../store/api/pokemonApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCurrentPage } from '../../store/slices/currentPageSlice';

export const ITEMS_PER_PAGE = 10;
export default function PokemonList() {
  const dispatch = useDispatch();
  const { pageId } = useParams();
  const currentPageNumber = Number(pageId) || 1;
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: pokemonList,
    error,
    isLoading,
  } = useGetPokemonListQuery({
    offset: (currentPageNumber - 1) * ITEMS_PER_PAGE,
    limit: ITEMS_PER_PAGE,
  });

  const closePokeCard = () => {
    if (location.pathname.includes('pokemon')) {
      void navigate(`/page/${pageId as string}`);
    }
  };

  useEffect(() => {
    dispatch(clearCurrentPage());
  }, [pageId, dispatch]);

  return (
    <div className={`pokemon-list`} onClick={closePokeCard}>
      <h2>Pokemon examples to get you started:</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="pokemon-list__items" data-testid="pokemon-list-items">
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
      {error && 'message' in error && (
        <div>
          <h3 data-testid="pokemon-list-error">{error.message}</h3>
        </div>
      )}
    </div>
  );
}
