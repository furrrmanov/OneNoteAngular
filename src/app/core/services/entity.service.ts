import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BASE_API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  constructor(private http: HttpClient, private store$: Store) {}

  public getEntityList(value: { root: string }) {
    const owner = JSON.parse(localStorage.getItem('user')).email;
    return this.http.post(`${BASE_API_URL}${value.root}`, value).pipe(
      map((data) => {
        const entityList = Object.values(data).reduce(
          (acc, item) => [...acc, { ...item[1], id: item[0] }],
          []
        );
        return entityList.filter((item) => item.owner === owner);
      })
    );
  }

  public createEntity({ value }) {
    const path = `/${value.entity}/create-${value.entity}`;
    const data = {
      value: {
        name: value.name,
        owner: value.owner,
        entity: value.entity,
      },
      root: `/${value.entity}`,
    };

    return this.http.post(`${BASE_API_URL}${path}`, data);
  }

  public deleteEntity(value: any) {
    const path = `/${value.entity}/delete-${value.entity}`;
    const data = {
      collectionName: `/${value.entity}`,
      collectionRoot: `/${value.entity}/`,
      id: value.id,
    };

    return this.http.request('delete', `${BASE_API_URL}${path}`, {
      body: { value: data },
    });
  }
}
