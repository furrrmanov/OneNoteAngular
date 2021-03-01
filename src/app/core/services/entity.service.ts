import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { selectUserEmail } from './../../store/user/selector/index';
import { BASE_API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  // public owner = JSON.parse(localStorage.getItem('user')).email;
  constructor(private http: HttpClient, private store$: Store) {}

  public getEntityList(value: { root: string }) {
    return this.http.post(`${BASE_API_URL}${value.root}`, value).pipe(
      map((data) => {
        const entityList =  Object.values(data).reduce(
          (acc, item) => [...acc, { ...item[1], id: item[0] }],
          []
        );
        return entityList.filter((item) => item.owner === 'furmanov.vladislav92@gmail.com');
      })
    );
  }
}
