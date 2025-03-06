import { it, expect, describe } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { ITEMS_PER_PAGE } from '../../store/api/pokemonApi';
import PokemonList from './PokemonList';
import '@testing-library/jest-dom';
import renderWithProviders from '../../utils/test-utils';
import { server } from '../../utils/mocks/testsSetup';
import { http, HttpResponse } from 'msw';

describe('PokemonList Component', () => {
  it('shows loading spinner while fetching data', () => {
    renderWithProviders(<PokemonList pageId="1" />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('renders specified number of cards', async () => {
    renderWithProviders(<PokemonList pageId="1" />);

    await waitFor(() => {
      const pokemonListItems = screen.getByTestId('pokemon-list-items');
      expect(pokemonListItems.children).toHaveLength(ITEMS_PER_PAGE);
    });
  });

  it('renders error message if API call fails', async () => {
    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon', () => {
        return new HttpResponse(null, {
          status: 500,
        });
      })
    );

    renderWithProviders(<PokemonList pageId="1" />);

    await waitFor(() => {
      const pokemonListError = screen.queryByTestId('pokemon-list-error');
      expect(pokemonListError).toBeInTheDocument();
    });
  });
});
