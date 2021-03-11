import { createSelector, createFeatureSelector } from '@ngrx/store';

import { entityNode, EntityState } from './../reducer/index';
import { Notebook, NoteList } from './../../../shared/models/notebook.model';
import { Catalog, ArticleList } from './../../../shared/models/catalog.model';

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
  createSelector(selectUserFeature, (state: EntityState): NoteList[] | ArticleList[] => {
    const filteredList = state[name].find(
      (item: NoteList | ArticleList) => item.id === id && item[`${subName}List`]
    );
    return filteredList && filteredList[`${subName}List`]
      ? filteredList[`${subName}List`]
      : [];
  });

export const selectNoteList = (notebookId: string) =>
  createSelector(selectUserFeature, (state: EntityState): Notebook => {
    return state.notebook.find((item) => item.id === notebookId);
  });

  export const selectArticleList = (articleId: string) =>
  createSelector(selectUserFeature, (state: EntityState): Catalog => {
    return state.catalog.find((item) => item.id === articleId);
  });
