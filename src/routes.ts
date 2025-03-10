import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('./app/routes/rootPage.tsx'),
  route('page/:pageId', './app/routes/homepage.tsx', [
    route(
      'pokemon/:pokemonName',
      './components/PokemonCardDetails/PokemonCardDetails.tsx'
    ),
  ]),
  route('*?', './components/NotFound404/NotFound404.tsx'),
] satisfies RouteConfig;
