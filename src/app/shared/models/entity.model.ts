export interface CreateEntity {
  value: {
    name: string;
    owner: string;
    entity: string;
  };
}

export interface DeleteEntity {
  entity: string;
  id: string;
}
