import { createAction, props } from '@ngrx/store';

export const setEntity = createAction(
  '[ Entity ] Set Entity',
  props<{ entity }>()
);

export const loadEntity = createAction(
  '[ Entity ] Load Entity',
  props<{ path: string }>()
);

export const CreateEntityAction = createAction(
  '[ Entity ] Create Entity',
  props<{ data: any }>()
);

export const DeleteEntityAction = createAction(
  '[ Entity ] Delete Entity',
  props<{ data: any }>()
);

export const CreateSubEntityAction = createAction(
  '[ SubEntity ] Create SubEntity',
  props<{ data: any }>()
);

export const DeleteSubEntityAction = createAction(
  '[ SubEntity ] Delete SubEntity',
  props<{ data: any }>()
);

export const UpdateSubEntityAction = createAction(
  '[ SubEntity ] Update Subentity',
  props<{ data: any }>()
)
