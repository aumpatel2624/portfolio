import { Suspense } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HomeRoute } from './App';

vi.mock('./desktop/Desktop', () => ({ Desktop: () => <div>desktop</div> }));
vi.mock('./phone/PhoneOS', () => ({ PhoneOS: () => <div>phone os</div> }));

function mockNarrow(narrow: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation(() => ({
      matches: narrow,
      addEventListener: () => {},
      removeEventListener: () => {},
    })),
  );
}

function renderHome() {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
        </Routes>
      </Suspense>
    </MemoryRouter>,
  );
}

describe('home route', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('shows the phone OS on narrow screens by default', async () => {
    mockNarrow(true);
    renderHome();
    expect(await screen.findByText('phone os')).toBeInTheDocument();
    expect(screen.queryByText('desktop')).not.toBeInTheDocument();
  });

  it('shows the desktop on wide screens', () => {
    mockNarrow(false);
    renderHome();
    expect(screen.getByText('desktop')).toBeInTheDocument();
    expect(screen.queryByText('phone os')).not.toBeInTheDocument();
  });

  it('shows the desktop on narrow screens when VITE_FORCE_DESKTOP=true', () => {
    vi.stubEnv('VITE_FORCE_DESKTOP', 'true');
    mockNarrow(true);
    renderHome();
    expect(screen.getByText('desktop')).toBeInTheDocument();
    expect(screen.queryByText('phone os')).not.toBeInTheDocument();
  });
});
