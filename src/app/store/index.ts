import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { UserState, usesrNode, userReducer } from './user/reducer/index';
import { profileReducer, ProfileState, profileNode } from './profile/reducer';
import { entityReducer, entityNode, EntityState } from './entity/reducer';

export interface State {
  [usesrNode]: UserState;
  [profileNode]: ProfileState;
  [entityNode]: EntityState;
}

export const reducers: ActionReducerMap<State> = {
  [usesrNode]: userReducer,
  [profileNode]: profileReducer,
  [entityNode]: entityReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
