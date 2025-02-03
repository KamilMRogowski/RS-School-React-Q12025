import React from 'react';
import { PokemonList as PokemonListInterface } from '../utils/interfaces/pokemonApiResponse';

type PokemonListProps = {
  results: PokemonListInterface;
};

export default class PokemonList extends React.Component<PokemonListProps> {
  render() {
    return (
      <div className="pokemon-list">
        <h2>Pokemon examples to get you started:</h2>
        {this.props.results.results.map((pokemon) => {
          return (
            <div key={pokemon.name} className="pokemon-list__name">
              <p>{pokemon.name}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
