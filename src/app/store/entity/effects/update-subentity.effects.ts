import { SubEntityService } from './../../../core/services/sub-entity.service';
import { EntityService } from './../../../core/services/entity.service';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadEntity, UpdateSubEntityAction } from '../actions/index';

@Injectable()
export class UpdateSubEnityEffects {
  updateSubEntity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpdateSubEntityAction),
      mergeMap((action) => {
        return this.subEntityService.updateSubEntity(action.data).pipe(
          map((res) => {
            return loadEntity({ path: action.data.value.entity });
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private subEntityService: SubEntityService
  ) {}
}
