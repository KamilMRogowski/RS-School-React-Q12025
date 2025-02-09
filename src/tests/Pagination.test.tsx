import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import userEvent from '@testing-library/user-event';
import Pagination from '../components/Pagination';
import { expect, it, describe } from 'vitest';
import '@testing-library/jest-dom';

describe('Pagination Component', () => {
  it('displays the current page correctly', () => {
    render(
      <MemoryRouter initialEntries={['/page/3']}>
        <Routes>
          <Route path="/page/:pageId" element={<Pagination />} />
        </Routes>
      </MemoryRouter>
    );

    const currentPage = screen.getByTestId('current-page');
    expect(currentPage.innerHTML).toBe('3');
  });

  it("disables 'Previous Page' button on page 1", () => {
    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <Pagination />
      </MemoryRouter>
    );

    const prevButton = screen.getByText('Previous Page');
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    expect(prevButton).toHaveClass('disabled');
  });

  it("updates the URL when 'Next Page' is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/page/2']}>
        <Routes>
          <Route path="/page/:pageId" element={<Pagination />} />
        </Routes>
      </MemoryRouter>
    );

    const nextPageButton = screen.getByText('Next Page');
    expect(nextPageButton).toHaveAttribute('href', '/page/3');

    await user.click(nextPageButton);

    const currentPage = screen.getByTestId('current-page');
    expect(currentPage.innerHTML).toBe('3');
  });

  it("updates the URL when 'Previous Page' is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/page/3']}>
        <Routes>
          <Route path="/page/:pageId" element={<Pagination />} />
        </Routes>
      </MemoryRouter>
    );

    const prevPageButton = screen.getByText('Previous Page');
    expect(prevPageButton).toHaveAttribute('href', '/page/2');

    await user.click(prevPageButton);

    const currentPage = screen.getByTestId('current-page');
    expect(currentPage.innerHTML).toBe('2');
  });
});
