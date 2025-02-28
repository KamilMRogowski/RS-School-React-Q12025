'use client';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import DarkModeProvider from '../../context/DarkThemeContext';

const store = setupStore();

export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <DarkModeProvider>{children}</DarkModeProvider>
    </Provider>
  );
}
