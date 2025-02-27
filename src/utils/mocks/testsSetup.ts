import { setupServer } from 'msw/node';
import { handlers } from './handlers';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes';
import mockRouter from 'next-router-mock';

export const server = setupServer(...handlers);

vi.mock('next/router', () => import('next-router-mock'));

mockRouter.useParser(
  createDynamicRouteParser([
    'page/[pageId]',
    'page/[pageId]/pokemon/[pokemonName]',
  ])
);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
