import { createSelector, createFeatureSelector } from '@ngrx/store';
import { profileNode } from './../reducer/index';
import { ProfileState } from './../../../shared/models/profile.model';

const selectUserFeature = createFeatureSelector<ProfileState>(profileNode);

export const selectUserEmail = createSelector(
  selectUserFeature,
  (state: ProfileState): string => state.owner
);
