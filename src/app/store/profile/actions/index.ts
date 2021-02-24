import { ProfileState } from '../reducer';
import { createAction, props } from '@ngrx/store';

export const setProfile = createAction(
  '[ Login ] Set UserProfile',
  props<{ userProfile: ProfileState }>()
);
