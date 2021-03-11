import {
  CreateSubEntity,
  DeleteSubEntity,
  UpdateSubEntity,
} from './../../shared/models/sub-entity.model';
import { NoteList } from './../../shared/models/notebook.model';
import { Catalog, ArticleList } from './../../shared/models/catalog.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import {
  BASE_API_URL,
  STORAGE_UPLOAD_PATH,
  STORAGE_DELETE_PATH,
} from '../constants';

@Injectable({
  providedIn: 'root',
})
export class SubEntityService {
  constructor(private http: HttpClient, private store$: Store) {}

  public createSubEntity(options: CreateSubEntity): Observable<any> {
    const path = `/${options.value.entity}/update-${options.value.entity}`;
    const newSubEntity = this.initSubEntity(
      options.value.collectionName,
      options.value.id
    );
    const data = {
      collectionName: `/${options.value.entity}`,
      collectionRoot: `${options.value.entity}/`,
      id: options.value.id,
      itemName: `${options.value.collectionName}List`,
      data: [...options.value.subEntityList, newSubEntity],
    };

    return this.http.post(`${BASE_API_URL}${path}`, data);
  }

  public deleteSubEntity(options: DeleteSubEntity): Observable<any> {
    const path = `/${options.value.entity}/update-${options.value.entity}`;
    const filteredList = options.value.subEntityList.filter(
      (item) => item.id !== options.value.item.id
    );
    const data = {
      collectionName: `/${options.value.entity}`,
      collectionRoot: `${options.value.entity}/`,
      id: options.value.id,
      itemName: `${options.value.collectionName}List`,
      data: filteredList,
    };

    return this.http.post(`${BASE_API_URL}${path}`, data);
  }

  public updateSubEntity(options: UpdateSubEntity): Observable<any> {
    const path = `/${options.value.entity}/update-${options.value.entity}`;
    const data = {
      collectionName: `/${options.value.entity}`,
      collectionRoot: `${options.value.entity}/`,
      id: options.value.id,
      itemName: `${options.value.collectionName}List`,
      data: options.value.noteList,
    };

    return this.http.post(`${BASE_API_URL}${path}`, data);
  }

  public initSubEntity(
    entityName: string,
    id: string
  ): NoteList | ArticleList | {} {
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

  public uploadFileInStorage(file: FormData): Observable<any> {
    return this.http.post(`${BASE_API_URL}${STORAGE_UPLOAD_PATH}`, file);
  }

  public deleteFileInStorage(fileName: string): Observable<any> {
    return this.http.request(
      'delete',
      `${BASE_API_URL}${STORAGE_DELETE_PATH}`,
      {
        body: {
          fileName,
        },
      }
    );
  }
}
