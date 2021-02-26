import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BASE_API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  constructor(private http: HttpClient) {}

  public getEntityList(value: { root: string }) {
    return this.http.post(`${BASE_API_URL}${value.root}`, value).pipe(
      map((data) => {
        return Object.values(data).reduce(
          (acc, item) => [...acc, { ...item[1], id: item[0] }],
          []
        );
      })
    );
  }
}
