export class CarEntity {
  public aNumber: string = '';
  public aBrand: string = '';
  public aModel: string = '';
  public aYear: number = 0;
  public id: number = 0;
  public status: boolean = false;

  constructor(
    aNumber: string,
    aBrand: string,
    aModel: string,
    aYear: number,
    id: number,
    status?: boolean
  ) {
    this.aNumber = aNumber;
    this.aBrand = aBrand;
    this.aModel = aModel;
    this.aYear = aYear;
    this.id = id;
    this.status = status || false;
  }

}
