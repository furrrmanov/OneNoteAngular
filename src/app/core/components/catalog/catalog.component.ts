import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { loadEntity } from './../../../store/entity/actions/index';
import { selectCatalog } from 'src/app/store/entity/selector';
import { CATALOG_PAGE_PATH } from '../../constants/index';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  public entity$: any = this.store$.pipe(select(selectCatalog));
  public entityName: string =  CATALOG_PAGE_PATH
  public subEntityName = 'article'
  constructor(private store$: Store) {}

  public ngOnInit(): void {
    this.store$.dispatch(loadEntity({ path: CATALOG_PAGE_PATH }));
  }
}
