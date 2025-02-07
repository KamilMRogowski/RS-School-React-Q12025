import { Link, useParams, useNavigate, useLocation } from 'react-router';
import useFetchPokemonFromAPI from '../hooks/fetchPokemonFromAPI';
import Loader from './Loader';
import Pagination from './Pagination';

const ITEMS_PER_PAGE = 20;

export default function PokemonList() {
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
      <div className="pokemon-list" onClick={closePokeCard}>
        <div className="loader">{loading && <Loader />}</div>
        <h2>Pokemon examples to get you started:</h2>
        <div className="pokemon-list__items">
          {data.results.map((pokemon) => {
            return (
              <Link
                key={pokemon.name}
                className="pokemon-list__name"
                to={`/page/${String(currentPage)}/pokemon/${pokemon.name}`}
              >
                {pokemon.name}
              </Link>
            );
          })}
        </div>
        <Pagination />
        {error && (
          <div>
            <h3>{error}</h3>
          </div>
        )}
      </div>
    );
  }
}
