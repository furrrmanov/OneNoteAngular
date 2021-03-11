import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  BASE_API_URL,
  PROFILE_LIST_URL,
  CREATE_PROFILE_URL,
} from '../constants';

export interface Profile {
  owner: string;
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  public checkUserProfile(): Observable<Profile> {
    return this.http
      .post<Profile>(`${BASE_API_URL}${PROFILE_LIST_URL}`, {
        root: `${PROFILE_LIST_URL}`,
      })
      .pipe(
        map((data) => {
          return Object.values(data).reduce(
            (acc, item) => [...acc, { ...item[1], id: item[0] }],
            []
          );
        })
      );
  }

  public createUserProfile(email: string): Observable<any> {
    return this.http.post(`${BASE_API_URL}${CREATE_PROFILE_URL}`, {
      root: `${PROFILE_LIST_URL}`,
      value: {
        owner: email,
      },
    });
  }
}
