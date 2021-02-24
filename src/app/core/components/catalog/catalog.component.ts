import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { EntityService } from './../../services/entity.service';
import { setEntity } from './../../../store/entity/actions/index';
import { DataMapperService } from '../../services/dataMapper.service';
import { Route } from '@angular/compiler/src/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  constructor(
    private entityService: EntityService,
    private store$: Store,
    private dataMapper: DataMapperService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.entityService
      .getEntityList({
        root: '/catalog',
      })
      .subscribe((response) => {
        this.store$.dispatch(
          setEntity({
            entity: {
              name: 'catalog',
              data: this.dataMapper.transformDataList(response),
            },
          })
        );
      });

  }
}
