import { setupServer } from 'msw/node';
import { handlers } from './handlers';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';

export const server = setupServer(...handlers);

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation');
  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-spread, @typescript-eslint/no-misused-promises
    ...actual,
    useParams: vi.fn(),
    useRouter: vi.fn(),
    usePathname: vi.fn(),
  };
});

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
