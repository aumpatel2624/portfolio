import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CLOSE_MS } from './phoneState';
import { PhoneOS } from './PhoneOS';

function renderPhone() {
  render(
    <MemoryRouter>
      <PhoneOS />
    </MemoryRouter>,
  );
}

describe('PhoneOS', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation(() => ({
        matches: true,
        addEventListener() {},
        removeEventListener() {},
      })),
    );
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('opens an app from the home screen and goes back home', async () => {
    const user = userEvent.setup();
    renderPhone();
    await user.click(screen.getByRole('button', { name: 'Open Skills' }));
    const sheet = screen.getByRole('dialog', { name: 'skills' });
    expect(within(sheet).getByRole('heading', { level: 1, name: 'Skills' })).toBeInTheDocument();
    expect(within(sheet).getByText('Node.js')).toBeInTheDocument();
    await user.click(within(sheet).getByRole('button', { name: 'Back to home' }));
    await act(async () => void (await new Promise((r) => setTimeout(r, CLOSE_MS + 20))));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('drills into a project and back to the list', async () => {
    const user = userEvent.setup();
    renderPhone();
    await user.click(screen.getByRole('button', { name: 'Open Projects' }));
    await user.click(screen.getByRole('button', { name: /Recruiting platform/ }));
    expect(screen.getByRole('dialog', { name: 'recruiting platform' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Recruiting platform with Gemini parsing/ }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'All projects' }));
    expect(screen.getByRole('dialog', { name: 'projects' })).toBeInTheDocument();
  });

  it('links PhoneDeck to its case study and the dock to the classic site', async () => {
    const user = userEvent.setup();
    renderPhone();
    expect(screen.getByRole('link', { name: 'Classic site' })).toHaveAttribute('href', '/classic');
    await user.click(screen.getByRole('button', { name: 'Open Projects' }));
    await user.click(screen.getByRole('button', { name: /PhoneDeck/ }));
    expect(screen.getByRole('link', { name: /Read the full case study/ })).toHaveAttribute(
      'href',
      '/work/phonedeck',
    );
  });

  it('switches hobbies with the segmented control', async () => {
    const user = userEvent.setup();
    renderPhone();
    await user.click(screen.getByRole('button', { name: 'Open Hobbies' }));
    await user.click(screen.getByRole('button', { name: 'IoT' }));
    expect(screen.getByRole('button', { name: 'IoT' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('link', { name: /View SmartBin/ })).toBeInTheDocument();
  });

  it('has no wallpaper switcher, race widget or quote on the home screen', () => {
    renderPhone();
    expect(screen.queryByRole('button', { name: /wallpaper|quote/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/RACE DAY/)).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Open About' })).toHaveLength(2);
  });

  it('closes the open app with Escape', async () => {
    const user = userEvent.setup();
    renderPhone();
    await user.click(screen.getAllByRole('button', { name: 'Open About' })[0]!);
    expect(screen.getByRole('dialog', { name: 'about.txt' })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    await act(async () => void (await new Promise((r) => setTimeout(r, CLOSE_MS + 20))));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
