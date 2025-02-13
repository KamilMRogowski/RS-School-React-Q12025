import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import PokemonCard from './PokemonCard';
import DarkThemeProvider from '../../context/DarkThemeContext';
import { expect, it, describe, vi, Mock } from 'vitest';
import '@testing-library/jest-dom';
import { useGetPokemonDetailsQuery } from '../../store/api/pokemonApi';

vi.mock('../../store/api/pokemonApi');

const mockPokemonData = {
  name: 'pikachu',
  height: 4,
  weight: 60,
  sprites: {
    front_default: 'front-image-url',
    back_default: 'back-image-url',
  },
  types: [
    {
      slot: 1,
      type: { name: 'electric', url: 'type-url' },
    },
  ],
};

describe('PokemonCard Component', () => {
  it('displays a loading indicator while fetching data', () => {
    (useGetPokemonDetailsQuery as Mock).mockReturnValue({
      data: {},
      isLoading: true,
      error: {},
    });

    render(
      <DarkThemeProvider>
        <MemoryRouter>
          <PokemonCard />
        </MemoryRouter>
      </DarkThemeProvider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders detailed Pokemon data correctly', () => {
    (useGetPokemonDetailsQuery as Mock).mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      error: {},
    });

    render(
      <DarkThemeProvider>
        <MemoryRouter>
          <PokemonCard />
        </MemoryRouter>
      </DarkThemeProvider>
    );

    expect(screen.getByText('I choose you!')).toBeInTheDocument();
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('Height: 40 cm')).toBeInTheDocument();
    expect(screen.getByText('Weight: 60 hectograms')).toBeInTheDocument();
    expect(screen.getByText('electric')).toBeInTheDocument();
  });

  it('hides component when close button is clicked', () => {
    (useGetPokemonDetailsQuery as Mock).mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      error: {},
    });

    render(
      <DarkThemeProvider>
        <MemoryRouter initialEntries={['/page/3']}>
          <Routes>
            <Route path="/page/:pageId" element={<PokemonCard />} />
          </Routes>
        </MemoryRouter>
      </DarkThemeProvider>
    );

    const closeButton = screen.getByText('X');
    expect(closeButton.closest('a')).toHaveAttribute('href', '/page/3');
  });
});
