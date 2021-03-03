import { EntityService } from './../../../core/services/entity.service';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CreateEntityAction, loadEntity } from '../actions/index';


@Injectable()
export class CreateEntityEffects {
  createEntity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CreateEntityAction),
      mergeMap((action) => {
        return this.entityService.createEntity(action.data).pipe(
          map((res) => {
            return loadEntity({ path: action.data.root.slice(1) });
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private entityService: EntityService
  ) {}
}
