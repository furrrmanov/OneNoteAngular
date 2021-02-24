import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Catalog } from '../../shared/models/catalog.model';
import { Notebook } from '../../shared/models/notebook.model'
import { selectCatalog, selectNotebook } from '../../store/entity/selector';
import { FacadeService } from './../../core/services/facade.service';
import {
  ROUT_FOR_HOME_PAGE,
  ROUT_FOR_CATALOG_PAGE,
} from '../../core/constants';

@Injectable({ providedIn: 'root' })
export class EntityResolver implements Resolve<any> {
  constructor(private store$: Store, private facade: FacadeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const notebook: Observable<Notebook[]> = this.store$.pipe(
      select(selectNotebook)
    );
    const catalog: Observable<Catalog[]> = this.store$.pipe(
      select(selectCatalog)
    );

    if (route.routeConfig.path === ROUT_FOR_CATALOG_PAGE) {
      return { catalog };
    }
    if (route.routeConfig.path === ROUT_FOR_HOME_PAGE) {
      notebook.subscribe(data => console.log(data))
      return { notebook };
    }
  }
}
