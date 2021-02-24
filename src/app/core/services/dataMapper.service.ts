import { Injectable } from '@angular/core';

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
