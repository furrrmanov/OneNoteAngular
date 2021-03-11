import { CreateEntity, DeleteEntity } from './../../shared/models/entity.model';
import { Catalog } from './../../shared/models/catalog.model';
import { Notebook } from './../../shared/models/notebook.model';
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

  public getEntityList(value: { root: string }): Observable<Notebook[] | Catalog[]> {
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

  public createEntity(options: CreateEntity): Observable<any> {
    const path = `/${options.value.entity}/create-${options.value.entity}`;
    const data = {
      value: {
        name: options.value.name,
        owner: options.value.owner,
        entity: options.value.entity,
      },
      root: `/${options.value.entity}`,
    };

    return this.http.post(`${BASE_API_URL}${path}`, data);
  }

  public deleteEntity(options: DeleteEntity): Observable<any> {
    const path = `/${options.entity}/delete-${options.entity}`;
    const data = {
      collectionName: `/${options.entity}`,
      collectionRoot: `/${options.entity}/`,
      id: options.id,
    };

    return this.http.request('delete', `${BASE_API_URL}${path}`, {
      body: { value: data },
    });
  }
}
