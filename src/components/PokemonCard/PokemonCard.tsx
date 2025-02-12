import './PokemonCard.scss';
import { Link, useParams } from 'react-router';
import useFetchPokemonFromAPI from '../../hooks/fetchPokemonFromAPI';
import Loader from '../Loader/Loader';

export default function PokemonCard() {
  const { pageId, pokemonName } = useParams();
  const { data, loading, error } = useFetchPokemonFromAPI(
    'https://pokeapi.co/api/v2/pokemon/',
    pokemonName as string
  );

  return (
    <div className="pokemon-card" data-testid="loader">
      {loading && <Loader />}
      {'name' in data && !error && !loading && (
        <div className="pokemon-card__details">
          <Link
            className="pokemon-card__close-button"
            to={`/page/${pageId as string}`}
          >
            X
          </Link>
          <h2>I choose you!</h2>
          <h2 className="pokemon-card__name">{data.name}</h2>
          <div className="pokemon-card__images">
            <img src={data.sprites.front_default} alt={data.name} />
            <img src={data.sprites.back_default} alt={data.name} />
          </div>
          <div className="pokemon-card__stats">
            <h3>Height: {data.height * 10} cm</h3>
            <h3>Weight: {data.weight} hectograms</h3>
            <h3>
              Types:
              {data.types.map((type) => (
                <span key={type.slot}> {type.type.name}</span>
              ))}
            </h3>
          </div>
        </div>
      )}
      {error && (
        <div>
          <h3>{error}</h3>
        </div>
      )}
    </div>
  );
}
