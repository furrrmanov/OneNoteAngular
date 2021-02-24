import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { EntityService } from './../../services/entity.service';
import { setEntity } from './../../../store/entity/actions/index';
import { DataMapperService } from '../../services/dataMapper.service';
import { ActivatedRoute } from '@angular/router';
import { Notebook } from './../../../shared/models/notebook.model';

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss'],
})
export class NotebookComponent implements OnInit {
  public entity
  constructor(
    private entityService: EntityService,
    private store$: Store,
    private dataMapper: DataMapperService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.entityService
      .getEntityList({
        root: '/notebook',
      })
      .subscribe((response) => {
        this.store$.dispatch(
          setEntity({
            entity: {
              name: 'notebook',
              data: this.dataMapper.transformDataList(response),
            },
          })
        );
      });

      this.route.data.subscribe(data => {
        console.log(data)
        this.entity = data
      })
  }
}
