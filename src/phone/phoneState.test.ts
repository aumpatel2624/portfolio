import { initialPhoneState, phoneReducer } from './phoneState';

const origin = { x: 10, y: 20 };

describe('phone state', () => {
  it('opens an app from a given origin', () => {
    const s = phoneReducer(initialPhoneState, { type: 'open', app: 'skills', origin });
    expect(s).toMatchObject({ app: 'skills', closing: false, project: null, origin });
  });

  it('close starts the animation and closed unmounts the app', () => {
    let s = phoneReducer(initialPhoneState, { type: 'open', app: 'about', origin });
    s = phoneReducer(s, { type: 'close' });
    expect(s).toMatchObject({ app: 'about', closing: true });
    s = phoneReducer(s, { type: 'closed' });
    expect(s).toMatchObject({ app: null, closing: false });
  });

  it('ignores close when nothing is open or it is already closing', () => {
    expect(phoneReducer(initialPhoneState, { type: 'close' })).toBe(initialPhoneState);
    const closing = phoneReducer(
      phoneReducer(initialPhoneState, { type: 'open', app: 'about', origin }),
      { type: 'close' },
    );
    expect(phoneReducer(closing, { type: 'close' })).toBe(closing);
  });

  it('ignores a stale closed after the app was reopened', () => {
    let s = phoneReducer(initialPhoneState, { type: 'open', app: 'about', origin });
    s = phoneReducer(s, { type: 'close' });
    s = phoneReducer(s, { type: 'open', app: 'resume', origin });
    expect(phoneReducer(s, { type: 'closed' })).toMatchObject({ app: 'resume', closing: false });
  });

  it('resets the open project when an app is opened, but remembers the hobby tab', () => {
    let s = phoneReducer(initialPhoneState, { type: 'open', app: 'projects', origin });
    s = phoneReducer(s, { type: 'project', project: 'recruit' });
    s = phoneReducer(s, { type: 'hobby', hobby: 'books' });
    expect(s).toMatchObject({ project: 'recruit', hobby: 'books' });
    s = phoneReducer(s, { type: 'open', app: 'projects', origin });
    expect(s).toMatchObject({ project: null, hobby: 'books' });
  });

  it('goes back from a project to the list', () => {
    let s = phoneReducer(initialPhoneState, { type: 'open', app: 'projects', origin });
    s = phoneReducer(s, { type: 'project', project: 'hrms' });
    s = phoneReducer(s, { type: 'project', project: null });
    expect(s.project).toBeNull();
  });
});
