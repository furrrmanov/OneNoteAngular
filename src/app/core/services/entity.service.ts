import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_API_URL } from '../constants'

export interface Entity {
  noteList?: [];
  articleList?: [];
  name: string;
  owner: string;
}

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  constructor(private http: HttpClient) {}

  public getEntityList(value: { root: string }) {
    return this.http.post(`${BASE_API_URL}${value.root}`, value)
  }
}
