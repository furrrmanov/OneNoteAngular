export interface Notebook {
  name: string;
  owner: string;
  id?: string;
  noteList?: NoteList[];
}

export interface NoteList {
  date: Date;
  id: string;
  name: string;
  ownerId: string;
  text: string;
}
