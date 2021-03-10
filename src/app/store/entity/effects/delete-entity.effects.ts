import { EntityService } from './../../../core/services/entity.service';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DeleteEntityAction, loadEntity } from '../actions/index';

@Injectable()
export class DeleteEntityEffects {
  createEntity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeleteEntityAction),
      mergeMap((action) => {
        return this.entityService.deleteEntity(action.data).pipe(
          map((res) => {
            return loadEntity({ path: action.data.entity });
          })
        );
        return [];
      })
    );
  });

  constructor(
    private actions$: Actions,
    private entityService: EntityService
  ) {}
}
