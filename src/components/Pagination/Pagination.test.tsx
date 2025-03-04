import { screen } from '@testing-library/react';
import Pagination from './Pagination';
import { expect, it, describe, Mock } from 'vitest';
import '@testing-library/jest-dom';
import renderWithProviders from '../../utils/test-utils';
import { useParams } from 'next/navigation';

describe('Pagination Component', () => {
  it('displays the current page correctly', () => {
    (useParams as Mock).mockReturnValue({
      pageId: '3',
      pokemonName: 'pikachu',
    });
    renderWithProviders(<Pagination />);

    const currentPage = screen.getByTestId('current-page');
    expect(currentPage.innerHTML).toBe('3');
  });

  it("disables 'Previous Page' button on page 1", () => {
    (useParams as Mock).mockReturnValue({
      pageId: '1',
      pokemonName: 'pikachu',
    });
    renderWithProviders(<Pagination />);

    const prevButton = screen.getByText('Previous Page');
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    expect(prevButton).toHaveClass(/disabled/);
  });

  it("updates the URL when 'Next Page' is clicked", () => {
    (useParams as Mock).mockReturnValue({
      pageId: '2',
      pokemonName: 'pikachu',
    });

    renderWithProviders(<Pagination />);

    const nextPageButton = screen.getByText('Next Page');
    expect(nextPageButton).toHaveAttribute('href', '/page/3');
  });

  it("updates the URL when 'Previous Page' is clicked", () => {
    (useParams as Mock).mockReturnValue({
      pageId: '3',
      pokemonName: 'pikachu',
    });

    renderWithProviders(<Pagination />);

    const prevPageButton = screen.getByText('Previous Page');
    expect(prevPageButton).toHaveAttribute('href', '/page/2');
  });
});
