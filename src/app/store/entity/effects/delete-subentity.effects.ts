import { SubEntityService } from './../../../core/services/sub-entity.service';
import { EntityService } from './../../../core/services/entity.service';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadEntity, DeleteSubEntityAction } from '../actions/index';

@Injectable()
export class DeleteSubEnityEffects {
  deleteSubEntity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeleteSubEntityAction),
      mergeMap((action) => {
        return this.subEntityService.deleteSubEntity(action.data).pipe(
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
