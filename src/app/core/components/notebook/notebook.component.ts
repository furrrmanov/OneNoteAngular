import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { EntityService } from './../../services/entity.service';
import { setEntity } from './../../../store/entity/actions/index';
import { ActivatedRoute } from '@angular/router';
import { Notebook } from './../../../shared/models/notebook.model';

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss'],
})
export class NotebookComponent implements OnInit {
  public entity: any;
  constructor(
    private entityService: EntityService,
    private store$: Store,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.entity = data;
      this.store$.dispatch(
        setEntity({
          entity: {
            name: 'notebook',
            data: data,
          },
        })
      );
    });
  }
}
