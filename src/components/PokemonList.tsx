import useFetchPokemonFromAPI from '../hooks/fetchPokemonFromAPI';
import Loader from './Loader';

export default function PokemonList() {
  const { data, loading, error } = useFetchPokemonFromAPI(
    'https://pokeapi.co/api/v2/pokemon/',
    ''
  );
  if ('results' in data) {
    return (
      <div className="pokemon-list">
        <div className="loader">{loading && <Loader />}</div>
        <h2>Pokemon examples to get you started:</h2>
        {data.results.map((pokemon) => {
          return (
            <div key={pokemon.name} className="pokemon-list__name">
              <p>{pokemon.name}</p>
            </div>
          );
        })}
        {error && (
          <div>
            <h3>{error}</h3>
          </div>
        )}
      </div>
    );
  }
}
