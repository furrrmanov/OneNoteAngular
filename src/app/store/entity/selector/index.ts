import { createSelector, createFeatureSelector } from '@ngrx/store';

import { entityNode, EntityState } from './../reducer/index';
import { Notebook } from './../../../shared/models/notebook.model';
import { Catalog } from './../../../shared/models/catalog.model';

const selectUserFeature = createFeatureSelector<EntityState>(entityNode);

export const selectCatalog = createSelector(
  selectUserFeature,
  (state: EntityState): Catalog[] => state.catalog
);

export const selectNotebook = createSelector(
  selectUserFeature,
  (state: EntityState): Notebook[] => state.notebook
);
