import { createSelector, createFeatureSelector } from '@ngrx/store';
import { usesrNode } from './../reducer/index';
import { UserState } from './../../../shared/models/user.model';

const selectUserFeature = createFeatureSelector<UserState>(usesrNode);

export const selectUserEmail = createSelector(
  selectUserFeature,
  (state: UserState): string => state.email
);

export const selectUserName = createSelector(
  selectUserFeature,
  (state: UserState): string => state.name
);

export const selectUserPhoto = createSelector(
  selectUserFeature,
  (state: UserState): string => state.photoUrl
);

export const selectUserAuth = createSelector(
  selectUserFeature,
  (state: UserState): boolean => state.isLogged
);
