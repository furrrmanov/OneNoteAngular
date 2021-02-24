import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProfileState, profileNode } from './../reducer/index';

const selectUserFeature = createFeatureSelector<ProfileState>(profileNode);

export const selectUserEmail = createSelector(
  selectUserFeature,
  (state: ProfileState): string => state.owner
);
