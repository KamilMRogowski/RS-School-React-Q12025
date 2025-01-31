import React from 'react';
import SearchBox from '../components/SearchBox';
import Results from '../components/Results';
import ErrorBoundary from '../components/ErrorBoundary';
import {
  PokemonApiResponse,
  Pokemon,
  PokemonList,
  pokemonListResponse,
} from '../utils/interfaces/pokemonApiResponse';

export default class HomePage extends React.Component<
  object,
  {
    results: PokemonList | Pokemon;
    isLoading: boolean;
    errorMessage: string;
  }
> {
  state = {
    // Set initial state to empty list of pokemon
    results: pokemonListResponse,
    isLoading: false,
    errorMessage: '',
  };

  // Load pokemon list when component mounts
  componentDidMount(): void {
    this.fetchDataFromAPI('').catch((error: unknown) => {
      console.error('API Call failed', error);
    });
  }

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

    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;

    try {
      const response = await fetch(url);

      // If pokemon not found, throw an error
      if (!response.ok) {
        throw new Error('Pokemon not found, please try again!');
      }

      const data = (await response.json()) as PokemonApiResponse;

      // Set results type based on query, if query is empty, set to PokemonList, else set to Pokemon
      this.setState({
        results: query ? (data as Pokemon) : (data as PokemonList),
      });
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
      // Reset results state
      this.setState({
        results: pokemonListResponse,
      });
    } finally {
      // Reset loading state
      this.setState({ isLoading: false });
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
