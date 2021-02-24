import { createSelector, createFeatureSelector } from '@ngrx/store';
import { entityNode, EntityState, Catalog, Notebook } from './../reducer/index';

const selectUserFeature = createFeatureSelector<EntityState>(entityNode);

export const selectCatalog = createSelector(
  selectUserFeature,
  (state: EntityState): Catalog[] => state.catalog
);

export const selectNotebook = createSelector(
  selectUserFeature,
  (state: EntityState): Notebook[] => state.notebook
);
