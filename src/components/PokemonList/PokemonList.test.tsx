import { it, expect, describe } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ITEMS_PER_PAGE } from '../../store/api/pokemonApi';
import PokemonList from './PokemonList';
import '@testing-library/jest-dom';
import renderWithProviders from '../../utils/test-utils';
import { pokemonListResponse } from '../../utils/interfaces/pokemonApiResponse';

describe('PokemonList Component', () => {
  it('shows loading spinner while fetching data', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/page/1']}>
        <PokemonList />
      </MemoryRouter>
    );
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('renders specified number of cards', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/page/1']}>
        <PokemonList listData={pokemonListResponse} />
      </MemoryRouter>
    );

    await waitFor(() => {
      const pokemonListItems = screen.getByTestId('pokemon-list-items');
      expect(pokemonListItems.children).toHaveLength(ITEMS_PER_PAGE);
    });
  });
});
