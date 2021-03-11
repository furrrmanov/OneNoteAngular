import { CreateSubEntity, DeleteSubEntity, UpdateSubEntity } from './../../../shared/models/sub-entity.model';
import { CreateEntity, DeleteEntity  } from './../../../shared/models/entity.model';
import { createAction, props } from '@ngrx/store';

export const setEntity = createAction(
  '[ Entity ] Set Entity',
  props<{ entity: any  }>()
);

export const loadEntity = createAction(
  '[ Entity ] Load Entity',
  props<{ path: string }>()
);

export const CreateEntityAction = createAction(
  '[ Entity ] Create Entity',
  props<{ data: CreateEntity }>()
);

export const DeleteEntityAction = createAction(
  '[ Entity ] Delete Entity',
  props<{ data: DeleteEntity }>()
);

export const CreateSubEntityAction = createAction(
  '[ SubEntity ] Create SubEntity',
  props<{ data: CreateSubEntity }>()
);

export const DeleteSubEntityAction = createAction(
  '[ SubEntity ] Delete SubEntity',
  props<{ data: DeleteSubEntity }>()
);

export const UpdateSubEntityAction = createAction(
  '[ SubEntity ] Update Subentity',
  props<{ data: UpdateSubEntity }>()
)
