import {
  selectUserEmail,
  selectUserName,
  selectUserPhoto,
  selectUserAuth,
} from './../../store/user/selector/index';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  private _userEmail$: Observable<string> = this.store.pipe(
    select(selectUserEmail)
  );
  public _userName$: Observable<string> = this.store.pipe(
    select(selectUserName)
  );

  public _userPhoto$: Observable<string> = this.store.pipe(
    select(selectUserPhoto)
  );

  public _userIsAuth$: Observable<boolean> = this.store.pipe(
    select(selectUserAuth)
  );

  constructor(private store: Store) {}

  public selectUserAuth(): Observable<boolean> {
    return this._userIsAuth$;
  }

  public selectUserEmail(): Observable<string> {
    return this._userEmail$;
  }

  public selectUserName(): Observable<string> {
    return this._userName$;
  }

  public selectUserPhoto(): Observable<string> {
    return this._userPhoto$;
  }
}
