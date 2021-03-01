import { createReducer, on } from '@ngrx/store';

import { setProfile } from '../actions';
import { ProfileState } from '../../../shared/models//profile.model';

export const profileNode = 'profile';
const storage: ProfileState = JSON.parse(localStorage.getItem('profile'));

export const initialState: ProfileState = {
  owner: storage !== null && storage.owner ? storage.owner : '',
  id: storage !== null && storage.id ? storage.id : ''
};

export const profileReducer = createReducer(
  initialState,
  on(setProfile, (state, { userProfile }) => (state = userProfile))
);
