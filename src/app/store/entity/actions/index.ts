import { createAction, props } from '@ngrx/store';

export const setEntity = createAction(
  '[ Entity ] Set Entity',
  props<{ entity }>()
);
