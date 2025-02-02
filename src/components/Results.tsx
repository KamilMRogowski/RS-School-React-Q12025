import React from 'react';
import { PokemonApiResponse } from '../utils/interfaces/pokemonApiResponse';

type ResultsProps = {
  results: PokemonApiResponse;
  isLoading: boolean;
  errorMessage: string;
};

export default class Results extends React.Component<ResultsProps> {
  render() {
    return (
      <div className="results-container">
        <div className="loader">
          {this.props.isLoading && (
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </div>
        {!this.props.isLoading && (
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
            {'results' in this.props.results && !this.props.errorMessage && (
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
            )}
          </div>
        )}
        {this.props.errorMessage && (
          <div>
            <h3>{this.props.errorMessage}</h3>
          </div>
        )}
      </div>
    );
  }
}
