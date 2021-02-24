import { createReducer, on } from "@ngrx/store";

import { setEntity } from "../actions";

export const entityNode = "entity";

export interface EntityState {
  notebook: Array<[]>;
  catalog: Array<[]>;
}

export const initialState: EntityState = {
  notebook: [],
  catalog: [],
};

export const entityReducer = createReducer(
  initialState,
  on(setEntity, (state, { entity }) => {
    return {
      ...state,
      [entity.name]: entity.date
    }
  })
);
