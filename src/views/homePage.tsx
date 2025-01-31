import React from 'react';
import SearchBox from '../components/SearchBox';
import Results from '../components/Results';
import ErrorBoundary from '../components/ErrorBoundary';
import PokemonApiResponse from '../utils/interfaces/pokemonApiResponse';

export default class HomePage extends React.Component<
  object,
  { results: PokemonApiResponse[]; isLoading: boolean; errorMessage: string }
> {
  state = {
    results: [],
    isLoading: false,
    errorMessage: '',
  };

  // Update the query state when recieved from the SearchBox component
  onSearch = (query: string) => {
    // Use .catch to handle errors from the API call
    this.fetchDataFromAPI(query).catch((error: unknown) => {
      console.error('API Call failed', error);
    });
  };

  // Fetch data from the pokeapi.co API and update the results state
  fetchDataFromAPI = async (query: string) => {
    // Set state to loading and reset error message
    this.setState({ isLoading: true, errorMessage: '' });

    const pokemonLimit = 10;
    const url = `https://pokeapi.co/api/v2/pokemon/${query}?limit=${String(pokemonLimit)}`;

    try {
      const response = await fetch(url);

      // If pokemon not found, throw an error
      if (!response.ok) {
        throw new Error('Pokemon not found, please try again!');
      }

      const data = (await response.json()) as PokemonApiResponse[];
      this.setState({ results: data, isLoading: false });
    } catch (error: unknown) {
      console.error(error);
      // Checks if error is an instance of Error, if not, sets a generic error message
      if (error instanceof Error) {
        this.setState({
          errorMessage: error.message,
        });
      } else {
        this.setState({
          errorMessage: 'An unknown error occurred',
        });
      }
      // Reset results and loading state
      this.setState({
        results: [],
        isLoading: false,
      });
    }
  };

  render() {
    return (
      <ErrorBoundary>
        <SearchBox onSearch={this.onSearch}></SearchBox>
        <Results
          results={this.state.results}
          isLoading={this.state.isLoading}
          errorMessage={this.state.errorMessage}
        ></Results>
      </ErrorBoundary>
    );
  }
}
