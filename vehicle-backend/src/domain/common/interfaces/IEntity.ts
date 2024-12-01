export interface IEntity {
  get id(): string;
  equals(entity: IEntity): boolean;
  hashCode(): number;
  toString(): string;
}
