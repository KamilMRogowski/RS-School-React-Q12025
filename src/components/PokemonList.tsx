import { PokemonList as PokemonListInterface } from '../utils/interfaces/pokemonApiResponse';

type PokemonListProps = {
  results: PokemonListInterface;
};

export default function PokemonList({ results }: PokemonListProps) {
  return (
    <div className="pokemon-list">
      <h2>Pokemon examples to get you started:</h2>
      {results.results.map((pokemon) => {
        return (
          <div key={pokemon.name} className="pokemon-list__name">
            <p>{pokemon.name}</p>
          </div>
        );
      })}
    </div>
  );
}
