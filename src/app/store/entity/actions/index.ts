import { createAction, props } from '@ngrx/store';

export const setEntity = createAction(
  '[ Entity ] Set Entity',
  props<{ entity }>()
);

export const loadEntity = createAction(
  '[ Entity ] Load Entity',
  props<{ path: string }>()
);
