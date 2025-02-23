import { describe, expect, it, vi } from 'vitest';
import renderWithProviders from '../../utils/test-utils';
import { screen } from '@testing-library/react';
import Flyout from './Flyout';
import '@testing-library/jest-dom';
import { SelectedItemsState } from '../../store/slices/selectedItemsSlice';
import userEvent from '@testing-library/user-event';
import { pokemonResponse } from '../../utils/interfaces/pokemonApiResponse';

const initialState: SelectedItemsState = {
  SelectedItems: [pokemonResponse],
};

describe('Flyout Component', () => {
  it('does not render component when selectedItems is empty', () => {
    renderWithProviders(<Flyout />);
    const downloadButton = screen.queryByText('Download');
    expect(downloadButton).not.toBeInTheDocument();
  });

  it('renders component when selectedItems has at least 1 element', () => {
    window.URL.createObjectURL = vi.fn();
    renderWithProviders(<Flyout />, {
      preloadedState: { selectedItems: initialState },
    });
    const downloadButton = screen.queryByText('Download');
    expect(downloadButton).toBeInTheDocument();
  });

  it('removes selected item when unselect all button is clicked and hide component', async () => {
    window.URL.createObjectURL = vi.fn();
    renderWithProviders(<Flyout />, {
      preloadedState: { selectedItems: initialState },
    });
    const unselectAllButton = screen.getByText('Unselect All');
    await userEvent.click(unselectAllButton);
    const downloadButton = screen.queryByText('Download');
    expect(downloadButton).not.toBeInTheDocument();
  });

  it('downloads pokemon when download button is clicked', async () => {
    window.URL.createObjectURL = vi.fn();
    renderWithProviders(<Flyout />, {
      preloadedState: { selectedItems: initialState },
    });
    const downloadButton = screen.getByText('Download');
    await userEvent.click(downloadButton);
    expect(downloadButton).toHaveAttribute('download', '1_pokemon.csv');
  });
});
