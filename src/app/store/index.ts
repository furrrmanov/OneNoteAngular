import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { usesrNode, userReducer } from './user/reducer/index';
import { UserState } from './../shared/models/user.model';
import { ProfileState } from './../shared/models/profile.model';
import { profileReducer, profileNode } from './profile/reducer';
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
