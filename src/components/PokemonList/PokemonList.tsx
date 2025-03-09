import './PokemonList.scss';
import { useMatch, useLocation, redirect } from 'react-router';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import PokemonCard from '../PokemonCard/PokemonCard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCurrentPage } from '../../store/slices/currentPageSlice';
import { PokemonList as PokemonListInterface } from '../../utils/interfaces/pokemonApiResponse';

type PokemonListProps = {
  listData?: PokemonListInterface;
};

export default function PokemonList({ listData }: PokemonListProps) {
  const dispatch = useDispatch();
  const match = useMatch('/page/:pageId');
  const pageId = match?.params.pageId as string;
  const location = useLocation();

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
      {!listData ? (
        <Loader />
      ) : (
        <div className="pokemon-list__items" data-testid="pokemon-list-items">
          {listData.results.map((pokemon) => {
            return (
              <div key={pokemon.name}>
                <PokemonCard pokemon={pokemon.name} />
              </div>
            );
          })}
        </div>
      )}
      {listData && listData.results.length > 0 && <Pagination />}
    </div>
  );
}
