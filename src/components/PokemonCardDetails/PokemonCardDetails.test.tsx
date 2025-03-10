import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import PokemonCardDetails from './PokemonCardDetails';
import { expect, it, describe } from 'vitest';
import '@testing-library/jest-dom';
import renderWithProviders from '../../utils/test-utils';

describe('PokemonCardDetails Component', () => {
  it('displays a loading indicator while fetching data', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <PokemonCardDetails />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders detailed Pokemon data correctly', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <Routes>
          <Route path="pokemon/:pokemonName" element={<PokemonCardDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('I choose you!')).toBeInTheDocument();
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('Height: 40 cm')).toBeInTheDocument();
      expect(screen.getByText('Weight: 60 hectograms')).toBeInTheDocument();
      expect(screen.getByText('electric')).toBeInTheDocument();
    });
  });

  it('hides component when close button is clicked', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/page/3/pokemon/pikachu']}>
        <Routes>
          <Route path="page/:pageId">
            <Route
              path="pokemon/:pokemonName"
              element={<PokemonCardDetails />}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const closeButton = screen.getByRole('link', { name: 'X' });
      expect(closeButton).toHaveAttribute('href', '/page/3');
    });
  });
});
