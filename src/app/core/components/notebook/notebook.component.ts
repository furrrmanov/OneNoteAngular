import { selectNotebook } from './../../../store/entity/selector/index';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { loadEntity } from './../../../store/entity/actions/index';
import { ROUT_FOR_HOME_PAGE } from '../../constants/index'

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss'],
})
export class NotebookComponent implements OnInit {
  public entity$: any = this.store$.pipe(select(selectNotebook));
  constructor(private store$: Store) {}

  public ngOnInit(): void {
    this.store$.dispatch(loadEntity({ path: ROUT_FOR_HOME_PAGE }));
  }
}
