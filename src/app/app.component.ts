import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectUserAuth } from './store/user/selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public userIsAuth$: Observable<boolean> = this.store$.pipe(
    select(selectUserAuth)
  );

  constructor(private store$: Store) {}

  ngOnInit() {}
}
