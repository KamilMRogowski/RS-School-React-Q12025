import { it, expect, describe, Mock } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { ITEMS_PER_PAGE } from './PokemonList';
import PokemonList from './PokemonList';
import '@testing-library/jest-dom';
import renderWithProviders from '../../utils/test-utils';
import { server } from '../../utils/mocks/testsSetup';
import { http, HttpResponse } from 'msw';
import { useParams } from 'next/navigation';

describe('PokemonList Component', () => {
  it('shows loading spinner while fetching data', () => {
    (useParams as Mock).mockReturnValue({
      pageId: '1',
      pokemonName: 'pikachu',
    });
    renderWithProviders(<PokemonList />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('renders specified number of cards', async () => {
    (useParams as Mock).mockReturnValue({
      pageId: '1',
      pokemonName: 'pikachu',
    });
    renderWithProviders(<PokemonList />);

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

    (useParams as Mock).mockReturnValue({
      pageId: '1',
      pokemonName: 'pikachu',
    });
    renderWithProviders(<PokemonList />);

    await waitFor(() => {
      const pokemonListError = screen.queryByTestId('pokemon-list-error');
      expect(pokemonListError).toBeInTheDocument();
    });
  });
});
