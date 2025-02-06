import { useParams } from 'react-router';
import useFetchPokemonFromAPI from '../hooks/fetchPokemonFromAPI';
import Loader from './Loader';

export default function PokemonCard() {
  const { pokemonName } = useParams();
  const { data, loading, error } = useFetchPokemonFromAPI(
    'https://pokeapi.co/api/v2/pokemon/',
    pokemonName as string
  );
  return (
    <div className="pokemmon-card">
      {'name' in data && !error && (
        <div className="pokemon-card_details">
          <div className="loader">{loading && <Loader />}</div>
          <h2>I choose you!</h2>
          <h2>{data.name}</h2>
          <div className="pokemon-card_images">
            <img src={data.sprites.front_default} alt={data.name} />
            <img src={data.sprites.back_default} alt={data.name} />
          </div>
          <div className="pokemon-card_stats">
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
