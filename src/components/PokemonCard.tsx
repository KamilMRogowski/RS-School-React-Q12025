import { PokemonApiResponse } from '../utils/interfaces/pokemonApiResponse';

type PokemonListProps = {
  results: PokemonApiResponse;
};

export default function PokemonCard({ results }: PokemonListProps) {
  return (
    <div className="results-container">
      {'name' in results && (
        <div className="pokemon-details">
          <h2>I choose you!</h2>
          <h2>{results.name}</h2>
          <div className="pokemon-images">
            <img src={results.sprites.front_default} alt={results.name} />
            <img src={results.sprites.back_default} alt={results.name} />
          </div>
          <div className="pokemon-stats">
            <h3>Height: {results.height * 10} cm</h3>
            <h3>Weight: {results.weight} hectograms</h3>
            <h3>
              Types:
              {results.types.map((type) => (
                <span key={type.slot}> {type.type.name}</span>
              ))}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
