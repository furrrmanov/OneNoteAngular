import { createReducer, on } from '@ngrx/store';

import { setEntity } from '../actions';
import { Notebook } from '../../../shared/models/notebook.model'
import { Catalog } from '../../../shared/models/catalog.model'

export const entityNode = 'entity';

export interface EntityState {
  notebook: Notebook[];
  catalog: Catalog[];
}

export const initialState: EntityState = {
  notebook: [],
  catalog: [],
};

export const entityReducer = createReducer(
  initialState,
  on(setEntity, (state, { entity }) => ({
    ...state,
    [entity.name]: entity.data,
  }))
);
