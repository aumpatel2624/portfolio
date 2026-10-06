import type { HobbyKey } from '../data/hobbies';
import type { PhoneAppId } from '../data/phone';
import type { ProjectKey } from '../data/projects';

/** Where an app grows from (and shrinks back to), in px relative to the phone surface. */
export interface Origin {
  x: number;
  y: number;
}

export interface PhoneState {
  app: PhoneAppId | null;
  /** True during the close animation, while `app` is still mounted. */
  closing: boolean;
  /** Open project in the Projects app, or `null` for the list. */
  project: ProjectKey | null;
  hobby: HobbyKey;
  origin: Origin;
}

export type PhoneAction =
  | { type: 'open'; app: PhoneAppId; origin: Origin }
  | { type: 'close' }
  | { type: 'closed' }
  | { type: 'project'; project: ProjectKey | null }
  | { type: 'hobby'; hobby: HobbyKey };

/** Close animation length; the sheet unmounts after it. */
export const CLOSE_MS = 260;

export const initialPhoneState: PhoneState = {
  app: null,
  closing: false,
  project: null,
  hobby: 'f1',
  origin: { x: 195, y: 420 },
};

export function phoneReducer(state: PhoneState, action: PhoneAction): PhoneState {
  switch (action.type) {
    case 'open':
      // Opening resets the project drill-down; the hobby tab is remembered.
      return { ...state, app: action.app, closing: false, project: null, origin: action.origin };
    case 'close':
      return state.app && !state.closing ? { ...state, closing: true } : state;
    case 'closed':
      return state.closing ? { ...state, app: null, closing: false } : state;
    case 'project':
      return { ...state, project: action.project };
    case 'hobby':
      return { ...state, hobby: action.hobby };
  }
}
