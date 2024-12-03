export interface IDeleteEntity {
  delete(id: string): Promise<void>;
}
