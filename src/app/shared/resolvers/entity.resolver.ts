import { EntityService } from './../../core/services/entity.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Catalog } from '../../shared/models/catalog.model';
import { Notebook } from '../../shared/models/notebook.model';

import {
  HOME_PAGE_PATH,
  CATALOG_PAGE_PATH,
} from '../../core/constants';

@Injectable({ providedIn: 'root' })
export class EntityResolver implements Resolve<any> {
  constructor(private entityService: EntityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const notebook: Observable<Notebook[]> = this.entityService.getEntityList({
      root: '/notebook',
    });
    const catalog: Observable<Catalog[]> = this.entityService.getEntityList({
      root: '/catalog',
    });

    if (route.routeConfig.path === CATALOG_PAGE_PATH) {
      return catalog;
    }
    if (route.routeConfig.path === HOME_PAGE_PATH) {
      return notebook;
    }
  }
}
