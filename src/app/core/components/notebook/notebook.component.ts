import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { loadEntity } from './../../../store/entity/actions/index';
import { ROUT_FOR_HOME_PAGE } from '../../constants/index';
import { selectNotebook } from './../../../store/entity/selector/index';

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss'],
})
export class NotebookComponent implements OnInit {
  public entity$: any = this.store$.pipe(select(selectNotebook));
  public entityName: string = ROUT_FOR_HOME_PAGE;
  public subEntityName = 'note';
  constructor(private store$: Store) {}

  public ngOnInit(): void {
    this.store$.dispatch(loadEntity({ path: ROUT_FOR_HOME_PAGE }));
  }
}
