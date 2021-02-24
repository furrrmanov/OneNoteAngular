import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_API_URL } from '../constants'

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
    return this.http.post<Profile>(`${BASE_API_URL}/userProfiles`, {
      root: '/userProfiles',
    });
  }

  public createUserProfile(email: string) {
    return this.http.post(
      `${BASE_API_URL}/userProfiles/create-profile`,
      {
        root: '/userProfiles',
        value: {
          owner: email,
        },
      }
    );
  }
}
