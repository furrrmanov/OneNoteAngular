import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
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

  constructor(
    private store$: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  openMenu() {
    this.openDriver = true;
  }

  closeMenu() {
    this.openDriver = false
  }
}
