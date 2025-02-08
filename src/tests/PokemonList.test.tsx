import { it, expect, describe, vi, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { ITEMS_PER_PAGE } from '../components/PokemonList';
import PokemonList from '../components/PokemonList';
import useFetchPokemonFromAPI from '../hooks/fetchPokemonFromAPI';
import { PokemonList as PokemonListType } from '../utils/interfaces/pokemonApiResponse';

vi.mock('../hooks/fetchPokemonFromAPI');

describe('PokemonList', () => {
  it('renders specified number of cards', () => {
    const mockResults: PokemonListType = {
      count: ITEMS_PER_PAGE,
      next: '',
      previous: '',
      results: Array.from({ length: ITEMS_PER_PAGE }, (_, i) => ({
        name: `pokemon-${String(i + 1)}`,
        url: `https://pokeapi.co/api/v2/pokemon/${String(i + 1)}`,
      })),
    };

    (useFetchPokemonFromAPI as Mock).mockReturnValue({
      data: mockResults,
      loading: false,
      error: '',
    });

    render(
      <BrowserRouter>
        <PokemonList />
      </BrowserRouter>
    );

    const pokemonListItems = screen.getByTestId('pokemon-list-items');
    expect(pokemonListItems.children).toHaveLength(ITEMS_PER_PAGE);
  });
  //Check that an appropriate message is displayed if no cards are present.
  it('renders error message if no cards are present', () => {
    const mockResults: PokemonListType = {
      count: ITEMS_PER_PAGE,
      next: '',
      previous: '',
      results: [],
    };

    (useFetchPokemonFromAPI as Mock).mockReturnValue({
      data: mockResults,
      loading: false,
      error: 'Pokemon not found, please try again!',
    });

    render(
      <BrowserRouter>
        <PokemonList />
      </BrowserRouter>
    );

    const pokemonListError = screen.getByTestId('pokemon-list-error');
    expect(pokemonListError.innerHTML).toBe(
      'Pokemon not found, please try again!'
    );
  });
});
