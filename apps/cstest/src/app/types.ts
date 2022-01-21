import { Observable } from "rxjs";
import { OwnerEntity } from "./components/entityes/ownerEntity.entity";
import { CarEntity } from "./components/entityes/car.entity";



export interface ICarOwnerService {
  getOwner(): Observable<OwnerEntity[]>;
  getOwnerById(aId: number): Observable<OwnerEntity>;
  createOwner(
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: CarEntity[]
  ): Observable<OwnerEntity>;
  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity>;
  deleteOwner(aOwnerId: number): Observable<OwnerEntity>;

}
