import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserAuth } from 'src/app/store/user/selector';

@Component({
  selector: 'app-mainMenu',
  templateUrl: './mainMenu.component.html',
  styleUrls: ['./mainMenu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  openDriver = false;
  public userIsAuth$: Observable<boolean> = this.store$.pipe(
    select(selectUserAuth)
  );

  constructor(private store$: Store) {}

  ngOnInit() {}

  openMenu() {
    this.openDriver = true;
  }

  closeMenu() {
    this.openDriver = false;
  }
}
