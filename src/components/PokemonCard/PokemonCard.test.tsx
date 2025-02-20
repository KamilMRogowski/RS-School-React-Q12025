import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import PokemonCard from './PokemonCard';
import { expect, it, describe } from 'vitest';
import '@testing-library/jest-dom';
import renderWithProviders from '../../utils/test-utils';

describe('PokemonCard Component', () => {
  it('displays a loading indicator while fetching pokemon image', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/page/1']}>
        <PokemonCard pokemon="pikachu" />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders pokemon name and sprite correctly', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/page/1']}>
        <PokemonCard pokemon="pikachu" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByAltText('pikachu')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
      );
    });
  });

  it('redirects to correct pokemon on click', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/page/1/pokemon/pikachu']}>
        <Routes>
          <Route
            path="page/:pageId"
            element={<PokemonCard pokemon="pikachu" />}
          >
            <Route path="pokemon/:pokemonName" />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const pokemonCard = await screen.findByRole('link');
    expect(pokemonCard).toHaveAttribute('href', '/page/1/pokemon/pikachu');
  });
});
