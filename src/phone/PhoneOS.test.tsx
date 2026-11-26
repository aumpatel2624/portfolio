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
    expect(
      within(sheet).getByRole('heading', { level: 1, name: 'Technical skills' }),
    ).toBeInTheDocument();
    expect(within(sheet).getByText('Node.js')).toBeInTheDocument();
    await user.click(within(sheet).getByRole('button', { name: 'Back to home' }));
    await act(async () => void (await new Promise((r) => setTimeout(r, CLOSE_MS + 20))));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('drills into an AI engineering entry and back to the list', async () => {
    const user = userEvent.setup();
    renderPhone();
    await user.click(screen.getByRole('button', { name: 'Open AI engineering' }));
    await user.click(screen.getByRole('button', { name: /AI content generator/ }));
    expect(screen.getByRole('dialog', { name: 'content generator' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'AI content generator' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'All projects' }));
    expect(screen.getByRole('dialog', { name: 'ai-engineering' })).toBeInTheDocument();
  });

  it('links the agent pipeline to its public repository', async () => {
    const user = userEvent.setup();
    renderPhone();
    await user.click(screen.getByRole('button', { name: 'Open AI engineering' }));
    await user.click(screen.getByRole('button', { name: /Multi-agent development pipeline/ }));
    expect(
      screen.getByRole('link', { name: 'github.com/aumpatel2624/claude-code-agents' }),
    ).toHaveAttribute('href', 'https://github.com/aumpatel2624/claude-code-agents');
  });

  it('links the dock to the classic site', () => {
    renderPhone();
    expect(screen.getByRole('link', { name: 'Classic site' })).toHaveAttribute('href', '/classic');
  });

  it('has no wallpaper switcher, widgets or quote on the home screen', () => {
    renderPhone();
    expect(screen.queryByRole('button', { name: /wallpaper|quote/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/RACE DAY/)).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Open About' })).toHaveLength(1);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('lays the six apps out in the grid and the three dock links, with no page dots', () => {
    renderPhone();
    const grid = screen.getByRole('group', { name: 'Apps' });
    expect(within(grid).getAllByRole('button')).toHaveLength(6);
    const dock = screen.getByRole('navigation', { name: 'Dock' });
    expect(within(dock).getAllByRole('button')).toHaveLength(2);
    expect(within(dock).getAllByRole('link')).toHaveLength(1);
    expect(document.querySelector('[class*="dots"]')).toBeNull();
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
