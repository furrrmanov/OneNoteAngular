import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { loadEntity } from './../../../store/entity/actions/index';
import { selectCatalog } from 'src/app/store/entity/selector';
import { ROUT_FOR_CATALOG_PAGE } from '../../constants/index';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  public entity$: any = this.store$.pipe(select(selectCatalog));
  constructor(private store$: Store) {}

  public ngOnInit(): void {
    this.store$.dispatch(loadEntity({ path: ROUT_FOR_CATALOG_PAGE }));
  }
}
