import React from 'react';
import { PokemonApiResponse } from '../utils/interfaces/pokemonApiResponse';

type PokemonListProps = {
  results: PokemonApiResponse;
};

export default class PokemonCard extends React.Component<PokemonListProps> {
  render() {
    return (
      <div className="results-container">
        {'name' in this.props.results && (
          <div className="pokemon-details">
            <h2>I choose you!</h2>
            <h2>{this.props.results.name}</h2>
            <div className="pokemon-images">
              <img
                src={this.props.results.sprites.front_default}
                alt={this.props.results.name}
              />
              <img
                src={this.props.results.sprites.back_default}
                alt={this.props.results.name}
              />
            </div>
            <div className="pokemon-stats">
              <h3>Height: {this.props.results.height * 10} cm</h3>
              <h3>Weight: {this.props.results.weight} hectograms</h3>
            </div>
          </div>
        )}
      </div>
    );
  }
}
