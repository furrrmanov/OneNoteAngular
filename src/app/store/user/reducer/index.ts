import { createReducer, on, Action } from '@ngrx/store';
import { logOutUser } from './../actions/index';

import { setUser } from '../actions';

export const usesrNode = 'user';
const storage: UserState = JSON.parse(localStorage.getItem('user'));

export interface UserState {
  isLogged: boolean;
  email: string;
  name: string;
  photoUrl: string;
}

export const initialState: UserState = {
  isLogged: storage !== null && storage.isLogged ? storage.isLogged : false,
  email: storage !== null && storage.email ? storage.email : '',
  name: storage !== null && storage.name ? storage.name : '',
  photoUrl: storage !== null && storage.photoUrl ? storage.photoUrl : '',
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { userInfo }) => (state = userInfo)),
  on(
    logOutUser,
    (state) =>
      (state = {
        isLogged: false,
        email: '',
        name: '',
        photoUrl: '',
      })
  )
);
