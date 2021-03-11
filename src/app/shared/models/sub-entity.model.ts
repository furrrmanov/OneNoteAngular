import { NoteList, Notebook } from './notebook.model';
import { ArticleList, Catalog } from './catalog.model';
export interface CreateSubEntity {
  value: {
    entity: string;
    id: string;
    collectionName: string;
    subEntityList: ArticleList[] | NoteList[];
  };
}

export interface DeleteSubEntity {
  value: {
    item: ArticleList | NoteList;
    entity: string;
    id: string;
    collectionName: string;
    subEntityList: ArticleList[] | NoteList[];
  };
}

export interface UpdateSubEntity {
  value: {
    noteList: ArticleList[] | NoteList[];
    id: string;
    collectionName: string;
    entity: string;
  };
}
