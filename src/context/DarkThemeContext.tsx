import { createContext, useContext, useState, ReactNode } from 'react';

interface DarkThemeContextType {
  darkTheme: boolean;
  toggleTheme: () => void;
}

const DarkThemeContext = createContext<DarkThemeContextType | undefined>(
  undefined
);

export default function DarkThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  return (
    <DarkThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </DarkThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDarkTheme() {
  const context = useContext(DarkThemeContext);
  if (!context)
    throw new Error('useDarkTheme must be used within a DarkThemeProvider');
  return context;
}
