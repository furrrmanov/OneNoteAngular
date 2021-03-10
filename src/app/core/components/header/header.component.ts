import { FacadeService } from './../../services/facade.service';
import { AuthService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LOGIN_PAGE_PATH } from '../../constants/index';
import { logOutUser } from './../../../store/user/actions/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public showProfilePopup = false;
  public userEmail$: Observable<string> = this.facade.selectUserEmail();
  public userName$: Observable<string> = this.facade.selectUserName();
  public userPhoto$: Observable<string> = this.facade.selectUserPhoto();

  constructor(
    private router: Router,
    private store$: Store,
    private authService: AuthService,
    private facade: FacadeService
  ) {}

  public clickProfile(): void {
    if (this.showProfilePopup) {
      this.showProfilePopup = false;
    } else {
      this.showProfilePopup = true;
    }
  }

  public logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    this.authService.logOut().subscribe();
    this.router.navigate([`/${LOGIN_PAGE_PATH}`]);
    this.store$.dispatch(logOutUser());
    this.showProfilePopup = false;
  }
}
