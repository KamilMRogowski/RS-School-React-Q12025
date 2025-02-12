import './PokemonList.scss';
import { Link, useParams, useNavigate, useLocation } from 'react-router';
import useFetchPokemonFromAPI from '../../hooks/fetchPokemonFromAPI';
import { useDarkTheme } from '../../context/DarkThemeContext';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';

export const ITEMS_PER_PAGE = 20;

export default function PokemonList() {
  const { darkTheme } = useDarkTheme();
  const { pageId } = useParams();
  const currentPage = Number(pageId) || 1;
  const navigate = useNavigate();
  const location = useLocation();
  const { data, loading, error } = useFetchPokemonFromAPI(
    'https://pokeapi.co/api/v2/pokemon/',
    `?offset=${String((currentPage - 1) * ITEMS_PER_PAGE)}&limit=${String(ITEMS_PER_PAGE)}`
  );

  const closePokeCard = () => {
    if (location.pathname.includes('pokemon')) {
      void navigate(`/page/${pageId as string}`);
    }
  };

  if ('results' in data) {
    return (
      <div className={`pokemon-list`} onClick={closePokeCard}>
        <div className="loader">{loading && <Loader />}</div>
        <h2>Pokemon examples to get you started:</h2>
        <div className="pokemon-list__items" data-testid="pokemon-list-items">
          {data.results.map((pokemon) => {
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
        {data.results.length > 0 && <Pagination />}
        {error && (
          <div>
            <h3 data-testid="pokemon-list-error">{error}</h3>
          </div>
        )}
      </div>
    );
  }
}
