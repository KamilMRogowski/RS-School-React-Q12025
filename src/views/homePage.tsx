import React from 'react';
import SearchBox from '../components/SearchBox';
import Results from '../components/Results';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorButton from '../components/ErrorButton';
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

  // Load last pokemon search from LS or pokemon list when component mounts
  componentDidMount(): void {
    const lastSearch: string | null = localStorage.getItem('lastSearch');
    if (lastSearch) {
      this.setState({ results: JSON.parse(lastSearch) as Pokemon });
    }
    // If there is no last search, fetch the pokemon list
    if (!this.checkLocalStorage('lastSearch')) {
      this.fetchDataFromAPI('').catch((error: unknown) => {
        console.error('API Call failed', error);
      });
    }
  }

  // Update the query state when recieved from the SearchBox component
  onSearch = (query: string) => {
    // Use .catch to handle errors from the API call
    this.fetchDataFromAPI(query).catch((error: unknown) => {
      console.error('API Call failed', error);
    });
  };

  // Check if data is cached in local storage and update results state
  checkLocalStorage = (query: string): boolean => {
    const cachedData: string | null = localStorage.getItem(query);
    if (cachedData) {
      console.log('Data fetched from cache');
      this.setState({ results: JSON.parse(cachedData) as Pokemon });
      localStorage.setItem('lastSearch', cachedData);
      return true;
    }
    return false;
  };

  // Fetch data from the pokeapi.co API and update the results state
  fetchDataFromAPI = async (query: string) => {
    // Set state to loading and reset error message
    this.setState({ isLoading: true, errorMessage: '' });

    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;

    // If query is not empty and data is cached, set loading state to false and return
    if (query && this.checkLocalStorage(query)) {
      this.setState({ isLoading: false });
      return;
    }

    try {
      const response = await fetch(url);

      // If pokemon not found, throw an error in catch
      if (!response.ok) {
        throw new Error('Pokemon not found, please try again!');
      }

      const data = (await response.json()) as PokemonApiResponse;

      // Set results type based on query, if query is empty, set to PokemonList, else set to Pokemon
      this.setState({
        results: query ? (data as Pokemon) : (data as PokemonList),
      });
      // Cache data in local storage, also as a last item in the list
      localStorage.setItem(query, JSON.stringify(data));
      localStorage.setItem('lastSearch', JSON.stringify(data));
      console.log('Saved to local storage', query);
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
        <ErrorButton></ErrorButton>
      </ErrorBoundary>
    );
  }
}
