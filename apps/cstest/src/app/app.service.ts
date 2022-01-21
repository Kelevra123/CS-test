import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CarEntity } from "./components/entityes/car.entity";
import { OwnerEntity } from "./components/entityes/ownerEntity.entity";
import { ICarOwnerService } from "./types";
import { Observable } from "rxjs";



@Injectable()
export class AppService implements ICarOwnerService {
  private _apiBase: string =  'api/owners'

  constructor(
    private _http: HttpClient,
  ) { }

  public createOwner(aLastName: string, aFirstName: string, aMiddleName: string, aCars: CarEntity[]): Observable<OwnerEntity> {
    const owner = new OwnerEntity(aFirstName, aLastName, aMiddleName, aCars);
    return this._http.post(`${this._apiBase}`, owner) as Observable<OwnerEntity>;
  }

  public deleteOwner(aOwnerId: number): Observable<OwnerEntity> {
    return this._http.delete(`${this._apiBase}/${aOwnerId}`) as Observable<OwnerEntity>;
  }

  public editOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    return this._http.put(`${this._apiBase}/${aOwner.id}`, aOwner) as Observable<OwnerEntity>;
  }

  public getOwner(): Observable<OwnerEntity[]> {
    return this._http.get(`${this._apiBase}`) as Observable<OwnerEntity[]>;
  }

  public getOwnerById(aId: number): Observable<OwnerEntity> {
    return this._http.get(`${this._apiBase}/${aId}`) as Observable<OwnerEntity>;
  }

}
