import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type React from 'react';
import type { PropsWithChildren, JSX } from 'react';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';
import type { AppStore, RootState } from '../store/store';
import DarkThemeProvider from '../context/DarkThemeContext';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export default function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return (
      <Provider store={store}>
        <DarkThemeProvider>{children}</DarkThemeProvider>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
