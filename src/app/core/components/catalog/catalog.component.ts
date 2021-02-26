import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { EntityService } from './../../services/entity.service';
import { setEntity } from './../../../store/entity/actions/index';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  public entity: any;
  constructor(private store$: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.entity = data;
      this.store$.dispatch(
        setEntity({
          entity: {
            name: 'catalog',
            data: data,
          },
        })
      );
    });
  }
}
