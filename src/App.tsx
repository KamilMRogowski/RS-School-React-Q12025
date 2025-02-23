import { Route, Routes, Navigate } from 'react-router';
import HomePage from './views/Homepage/Homepage';
import NotFound404 from './components/NotFound404/NotFound404';
import PokemonCardDetails from './components/PokemonCardDetails/PokemonCardDetails';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/page/1" replace />} />
      <Route path="/page/:pageId" element={<HomePage />}>
        <Route
          path="pokemon/:pokemonName"
          key={location.pathname}
          element={<PokemonCardDetails />}
        />
      </Route>
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}
