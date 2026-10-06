import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { DesktopRoute } from './App';

vi.mock('./desktop/Desktop', () => ({ Desktop: () => <div>desktop</div> }));

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
      <Routes>
        <Route path="/" element={<DesktopRoute />} />
        <Route path="/classic" element={<div>classic</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('desktop route', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('redirects narrow screens to the classic site by default', () => {
    mockNarrow(true);
    renderHome();
    expect(screen.getByText('classic')).toBeInTheDocument();
  });

  it('shows the desktop on wide screens', () => {
    mockNarrow(false);
    renderHome();
    expect(screen.getByText('desktop')).toBeInTheDocument();
  });

  it('shows the desktop on narrow screens when VITE_FORCE_DESKTOP=true', () => {
    vi.stubEnv('VITE_FORCE_DESKTOP', 'true');
    mockNarrow(true);
    renderHome();
    expect(screen.getByText('desktop')).toBeInTheDocument();
  });
});
