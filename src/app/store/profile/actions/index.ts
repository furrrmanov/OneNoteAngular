import { createAction, props } from '@ngrx/store';

import { ProfileState } from './../../../shared/models/profile.model';

export const setProfile = createAction(
  '[ Login ] Set UserProfile',
  props<{ userProfile: ProfileState }>()
);
