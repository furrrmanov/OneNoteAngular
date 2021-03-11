import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { loadEntity } from './../../../store/entity/actions/index';
import { HOME_PAGE_PATH } from '../../constants/index';
import { selectNotebook } from './../../../store/entity/selector/index';

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss'],
})
export class NotebookComponent implements OnInit {
  public entity$ = this.store$.pipe(select(selectNotebook));
  public entityName: string = HOME_PAGE_PATH;
  public subEntityName: string = 'note';
  constructor(private store$: Store) {}

  public ngOnInit(): void {
    this.store$.dispatch(loadEntity({ path: HOME_PAGE_PATH }));
  }
}
