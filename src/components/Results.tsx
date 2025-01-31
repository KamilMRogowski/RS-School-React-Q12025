import React from 'react';
import { PokemonApiResponse } from '../utils/interfaces/pokemonApiResponse';

type ResultsProps = {
  results: PokemonApiResponse;
  isLoading: boolean;
  errorMessage: string;
};

export default class Results extends React.Component<ResultsProps> {
  render() {
    //Show loading message
    if (this.props.isLoading) {
      return <p>Loading...</p>;
    }
    //Show error message
    if (this.props.errorMessage) {
      return <p>{this.props.errorMessage}</p>;
    }
    // Show Pokemon name and sprite after search
    if ('name' in this.props.results) {
      const pokemon = this.props.results;
      return (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      );
    }
    // Show list of pokemon if query is empty
    if ('results' in this.props.results) {
      return this.props.results.results.map((pokemon) => {
        return <p key={pokemon.name}>{pokemon.name}</p>;
      });
    }
  }
}
