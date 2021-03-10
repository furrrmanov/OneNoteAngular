import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { BASE_API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class SubEntityService {
  constructor(private http: HttpClient, private store$: Store) {}

  public createSubEntity({ value }) {
    const path = `/${value.entity}/update-${value.entity}`;
    const newSubEntity = this.initSubEntity(value.collectionName, value.id);
    const data = {
      collectionName: `/${value.entity}`,
      collectionRoot: `${value.entity}/`,
      id: value.id,
      itemName: `${value.collectionName}List`,
      data: [...value.subEntityList, newSubEntity],
    };

    return this.http.post(`${BASE_API_URL}${path}`, data);
  }

  public deleteSubEntity({ value }) {
    const path = `/${value.entity}/update-${value.entity}`;
    const filteredList = value.subEntityList.filter(
      (item) => item.id !== value.item.id
    );
    const data = {
      collectionName: `/${value.entity}`,
      collectionRoot: `${value.entity}/`,
      id: value.id,
      itemName: `${value.collectionName}List`,
      data: filteredList,
    };

    return this.http.post(`${BASE_API_URL}${path}`, data);
  }

  public updateSubEntity({ value }) {
    const path = `/${value.entity}/update-${value.entity}`;
    const data = {
      collectionName: `/${value.entity}`,
      collectionRoot: `${value.entity}/`,
      id: value.id,
      itemName: `${value.collectionName}List`,
      data: value.noteList,
    };

    return this.http.post(`${BASE_API_URL}${path}`, data);
  }

  public initSubEntity(entityName: string, id: string) {
    switch (entityName) {
      case 'note':
        return {
          ownerId: id,
          id: uuidv4(),
          date: moment().valueOf(),
          name: 'Untitled note',
          text: '',
        };
      case 'article':
        return {
          ownerId: id,
          id: uuidv4(),
          date: moment().valueOf(),
          name: 'Untitled article',
          imgList: [],
          description: '',
          characteristicList: [{ characteristic: '', value: '' }],
        };
      default:
        return {};
    }
  }
}
