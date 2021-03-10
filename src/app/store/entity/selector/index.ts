import { createSelector, createFeatureSelector } from '@ngrx/store';

import { entityNode, EntityState } from './../reducer/index';
import { Notebook, NoteList } from './../../../shared/models/notebook.model';
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

export const selectSubEntity = (name: string, subName: string, id: string) =>
  createSelector(selectUserFeature, (state: EntityState): any => {
    const filteredList = state[name].find(
      (item) => item.id === id && item[`${subName}List`]
    );
    return filteredList && filteredList[`${subName}List`]
      ? filteredList[`${subName}List`]
      : [];
  });

export const selectNoteList = (notebookId: string) =>
  createSelector(selectUserFeature, (state: EntityState): any => {
    return state.notebook.find((item) => item.id === notebookId);
  });

  export const selectArticleList = (articleId: string) =>
  createSelector(selectUserFeature, (state: EntityState): any => {
    return state.catalog.find((item) => item.id === articleId);
  });
