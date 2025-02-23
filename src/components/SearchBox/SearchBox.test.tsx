import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import SearchBox from './SearchBox';
import { vi, it, expect, describe, Mock } from 'vitest';
import '@testing-library/jest-dom';
import useGetQueryFromLS from '../../hooks/useGetQueryFromLS';
import DarkThemeProvider from '../../context/DarkThemeContext';

vi.mock('../../hooks/useGetQueryFromLS');

describe('SearchBox Component', () => {
  it('clicking Search button redirects to correct subpage and saves to local storage', () => {
    render(
      <DarkThemeProvider>
        <MemoryRouter>
          <SearchBox />
        </MemoryRouter>
      </DarkThemeProvider>
    );

    const input = screen.getByPlaceholderText('Search your favorite pokemon');
    const searchButton = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'pikachu' } });

    expect(searchButton).toHaveAttribute('href', '/pokemon/pikachu');
  });

  it('retrieves value from localStorage on mount', () => {
    (useGetQueryFromLS as Mock).mockReturnValue('pikachu');

    render(
      <DarkThemeProvider>
        <MemoryRouter>
          <SearchBox />
        </MemoryRouter>
      </DarkThemeProvider>
    );

    const input = screen.getByPlaceholderText('Search your favorite pokemon');
    expect(input).toHaveValue('pikachu');
  });
});
