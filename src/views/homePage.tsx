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
import fetchPokemonFromAPI from '../services/fetchPokemonFromAPI';

export default class HomePage extends React.Component<
  object,
  {
    results: PokemonApiResponse;
    isLoading: boolean;
    errorMessage: string;
    searchQuery: string;
  }
> {
  state = {
    results: pokemonListResponse,
    isLoading: false,
    errorMessage: '',
    searchQuery: '',
  };

  componentDidMount(): void {
    const lastSearch: string | null = localStorage.getItem('lastSearch');
    const parsedLastSearch = JSON.parse(lastSearch as string) as Pokemon;
    if (lastSearch) {
      this.setState({
        results: parsedLastSearch,
        searchQuery: parsedLastSearch.name,
      });
    }
    if (!this.checkLocalStorage('lastSearch')) {
      this.fetchDataFromAPI('').catch((error: unknown) => {
        console.error('API Call failed', error);
      });
    }
  }

  onSearch = (query: string) => {
    this.setState({ searchQuery: query });
    this.fetchDataFromAPI(query).catch((error: unknown) => {
      console.error('API Call failed', error);
    });
  };

  checkLocalStorage = (query: string): boolean => {
    const cachedData: string | null = localStorage.getItem(query);
    if (cachedData) {
      this.setState({ results: JSON.parse(cachedData) as Pokemon });
      localStorage.setItem('lastSearch', cachedData);
      return true;
    }
    return false;
  };

  fetchDataFromAPI = async (query: string) => {
    this.setState({ isLoading: true, errorMessage: '' });

    if (query && this.checkLocalStorage(query)) {
      this.setState({ isLoading: false });
      return;
    }

    const data = await fetchPokemonFromAPI(query);

    if (typeof data === 'string') {
      this.setState({ errorMessage: data });
      console.log(this.state.errorMessage);
    } else {
      this.setState({
        results: query ? (data as Pokemon) : (data as PokemonList),
      });
      localStorage.setItem(query, JSON.stringify(data));
      localStorage.setItem('lastSearch', JSON.stringify(data));
    }

    this.setState({ isLoading: false });
  };

  render() {
    return (
      <ErrorBoundary>
        <SearchBox
          onSearch={this.onSearch}
          searchQuery={this.state.searchQuery}
        ></SearchBox>
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
