import React from 'react';
import SearchBox from '../components/searchBox';
import ErrorBoundary from '../components/errorBoundary';
import PokemonApiResponse from '../interfaces/pokemonApiResponse';

export default class HomePage extends React.Component {
  state = {
    query: '',
    results: [],
  };

  // Update the query state when recieved from the SearchBox component
  onSearch = (query: string) => {
    this.setState({ query });
    this.fetchDataFromAPI(query);
  };

  // Fetch data from the pokeapi.co API and update the results state
  fetchDataFromAPI = (query: string) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then((response) => response.json())
      .then((data: PokemonApiResponse) => {
        console.log(data);
        this.setState({ results: data });
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  };

  render() {
    return (
      <ErrorBoundary>
        <SearchBox onSearch={this.onSearch}></SearchBox>
      </ErrorBoundary>
    );
  }
}
