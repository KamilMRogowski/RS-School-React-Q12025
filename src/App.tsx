import { Route, Routes, Navigate } from 'react-router';
import HomePage from './views/HomePage';
import NotFound404 from './components/NotFound404';
import PokemonCard from './components/PokemonCard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/page/1" replace />} />
      <Route path="/page/:pageId" element={<HomePage />}>
        <Route path="pokemon/:pokemonName" element={<PokemonCard />} />
      </Route>
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}
