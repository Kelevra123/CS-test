import { CarEntity } from "./car.entity";

export class OwnerEntity {

  public aFirstName: string = '';
  public aLastName: string = '';
  public aMiddleName: string = '';
  public aCars: CarEntity[] = [];
  public id: number = 0;

  constructor(
    aFirstName: string,
    aLastName: string,
    aMiddleName: string,
    aCars: CarEntity[],
    id?: number
  ) {
    this.aFirstName = aFirstName;
    this.aLastName = aLastName;
    this.aMiddleName = aMiddleName;
    this.aCars = [...aCars];
    this.id = id || new Date().valueOf();
  }

}
