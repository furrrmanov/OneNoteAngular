import { createReducer, on, Action } from '@ngrx/store';

import { setProfile } from '../actions';

export const profileNode = 'profile';
const storage: ProfileState = JSON.parse(localStorage.getItem('profile'));

export interface ProfileState {
  owner: string;
  id?: string;
}

export const initialState: ProfileState = {
  owner: storage !== null && storage.owner ? storage.owner : '',
};

export const profileReducer = createReducer(
  initialState,
  on(setProfile, (state, { userProfile }) => (state = userProfile))
);
