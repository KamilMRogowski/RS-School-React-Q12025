import './PokemonList.scss';
import { Link, useParams, useNavigate, useLocation } from 'react-router';
import { useDarkTheme } from '../../context/DarkThemeContext';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import { useGetPokemonListQuery } from '../../store/api/pokemonApi';

export const ITEMS_PER_PAGE = 20;

export default function PokemonList() {
  const { darkTheme } = useDarkTheme();
  const { pageId } = useParams();
  const currentPage = Number(pageId) || 1;
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: pokemonList,
    error,
    isLoading,
  } = useGetPokemonListQuery({
    offset: currentPage - 1,
    limit: ITEMS_PER_PAGE,
  });

  const closePokeCard = () => {
    if (location.pathname.includes('pokemon')) {
      void navigate(`/page/${pageId as string}`);
    }
  };

  return (
    <div className={`pokemon-list`} onClick={closePokeCard}>
      <div className="loader">{isLoading && <Loader />}</div>
      <h2>Pokemon examples to get you started:</h2>
      <div className="pokemon-list__items" data-testid="pokemon-list-items">
        {pokemonList &&
          pokemonList.results.map((pokemon) => {
            return (
              <Link
                key={pokemon.name}
                className={`pokemon-list__name ${darkTheme ? 'pokemon-list__name-dark-mode' : ''}`}
                to={`/page/${String(currentPage)}/pokemon/${pokemon.name}`}
              >
                {pokemon.name}
              </Link>
            );
          })}
      </div>
      {pokemonList && pokemonList.results.length > 0 && <Pagination />}
      {error && 'message' in error && (
        <div>
          <h3 data-testid="pokemon-list-error">{error.message}</h3>
        </div>
      )}
    </div>
  );
}
