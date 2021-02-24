export interface Catalog {
  name: string;
  owner: string;
  id?: string;
  articleList?: ArticleList[];
}

export interface ArticleList {
  date: Date;
  id: string;
  name: string;
  ownerId: string;
  description: string;
  text: string;
  characteristicList: CharacteristicList[];
  imgList: ImgList[];
}

export interface ImgList {
  imgName: string;
  imgUrl: string;
}

export interface CharacteristicList {
  characteristic: string;
  value: string;
}
