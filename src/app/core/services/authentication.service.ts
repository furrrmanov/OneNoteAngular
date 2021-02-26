import { UserState } from '../../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_API_URL } from '../constants';

export interface Auth {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(value: Auth): Observable<UserState> {
    return this.http.put<UserState>(`${BASE_API_URL}/auth/sign-in`, value);
  }

  public logOut(): Observable<void> {
    return this.http.delete<void>(`${BASE_API_URL}/auth/sign-out`);
  }
}
