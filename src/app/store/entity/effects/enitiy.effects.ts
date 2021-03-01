import { EntityService } from './../../../core/services/entity.service';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadEntity, setEntity } from './../actions/index';
import { Store } from '@ngrx/store';

@Injectable()
export class EntityEffects {
  loadNotebook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadEntity),

      mergeMap((action) => {
        return this.entityService
          .getEntityList({
            root: `/${action.path}`,
          })
          .pipe(
            map((response) => {
              return setEntity({
                entity: {
                  name: action.path,
                  data: response,
                },
              });
            })
          );
      })
    );
  });
  constructor(
    private actions$: Actions,
    private entityService: EntityService,
    private store$: Store
  ) {}
}
