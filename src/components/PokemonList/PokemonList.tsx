import './PokemonList.scss';
import { useMatch, useLocation, redirect } from 'react-router';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import PokemonCard from '../PokemonCard/PokemonCard';
import { useGetPokemonListQuery } from '../../store/api/pokemonApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCurrentPage } from '../../store/slices/currentPageSlice';

export default function PokemonList() {
  const dispatch = useDispatch();
  const match = useMatch('/page/:pageId');
  const pageId = match?.params.pageId as string;
  const currentPageNumber = Number(pageId) || 1;
  const location = useLocation();
  const {
    data: pokemonList,
    error,
    isLoading,
  } = useGetPokemonListQuery(currentPageNumber);

  const closePokeCard = () => {
    if (location.pathname.includes('pokemon')) {
      redirect(`/page/${pageId}`);
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
      {error && (
        <div>
          <h3 data-testid="pokemon-list-error">Failed to load Pokemon List</h3>
        </div>
      )}
    </div>
  );
}
