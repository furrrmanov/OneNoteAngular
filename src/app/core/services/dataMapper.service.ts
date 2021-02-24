import { ProfileState } from './../../store/profile/reducer/index';
import { Injectable } from '@angular/core';
import { UserState } from 'src/app/store/user/reducer';

@Injectable({
  providedIn: 'root',
})
export class DataMapperService {
  constructor() {}

  public transformDataList = (data) => {
    return data.reduce(
      (acc, item) => [...acc, { ...item[1], id: item[0] }],
      []
    );
  };
}
