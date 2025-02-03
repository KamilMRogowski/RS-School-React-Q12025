import React from 'react';
import { PokemonApiResponse } from '../utils/interfaces/pokemonApiResponse';
import PokemonCard from './PokemonCard';
import Loader from './Loader';
import PokemonList from './PokemonList';

type ResultsProps = {
  results: PokemonApiResponse;
  isLoading: boolean;
  errorMessage: string;
};

export default class Results extends React.Component<ResultsProps> {
  render() {
    return (
      <div className="results-container">
        <div className="loader">{this.props.isLoading && <Loader />}</div>
        {!this.props.errorMessage && !this.props.isLoading && (
          <PokemonCard results={this.props.results} />
        )}
        {!this.props.errorMessage && 'results' in this.props.results && (
          <PokemonList results={this.props.results} />
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
