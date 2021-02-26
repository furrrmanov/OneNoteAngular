import { UserState } from '../../../shared/models/user.model';
import { createAction, props } from '@ngrx/store';

export const setUser = createAction('[ Login ] Set User', props<{ userInfo: UserState }>());

export const logOutUser = createAction('[ Hedaer component ] Logout user')
