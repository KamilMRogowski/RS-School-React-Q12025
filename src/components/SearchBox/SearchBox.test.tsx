import { fireEvent, screen } from '@testing-library/react';
import SearchBox from './SearchBox';
import { vi, it, expect, describe, Mock } from 'vitest';
import '@testing-library/jest-dom';
import useGetQueryFromLS from '../../hooks/useGetQueryFromLS';
import renderWithProviders from '../../utils/test-utils';
import { useParams } from 'next/navigation';

vi.mock('../../hooks/useGetQueryFromLS');

describe('SearchBox Component', () => {
  it('clicking Search button redirects to correct subpage and saves to local storage', () => {
    (useParams as Mock).mockReturnValue({
      pageId: '1',
      pokemonName: 'pikachu',
    });
    renderWithProviders(<SearchBox />);

    const input = screen.getByPlaceholderText('Search your favorite pokemon');
    const searchButton = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'pikachu' } });

    expect(searchButton).toHaveAttribute('href', '/page/1/pokemon/pikachu');
  });

  it('retrieves value from localStorage on mount', () => {
    (useGetQueryFromLS as Mock).mockReturnValue('pikachu');
    renderWithProviders(<SearchBox />);

    const input = screen.getByPlaceholderText('Search your favorite pokemon');
    expect(input).toHaveValue('pikachu');
  });
});
