import { Catalog } from './../../../shared/models/catalog.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { loadEntity } from './../../../store/entity/actions/index';
import { selectCatalog } from 'src/app/store/entity/selector';
import { CATALOG_PAGE_PATH } from '../../constants/index';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  public entity$ = this.store$.pipe(select(selectCatalog));
  public entityName: string =  CATALOG_PAGE_PATH
  public subEntityName: string = 'article'
  constructor(private store$: Store) {}

  public ngOnInit(): void {
    this.store$.dispatch(loadEntity({ path: CATALOG_PAGE_PATH }));
  }
}
