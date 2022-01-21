import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { Observable, of } from "rxjs";
import { OwnerEntity } from "./entityes/ownerEntity.entity";
import { delay, find } from "rxjs/operators";
import { Injectable } from "@angular/core";



@Injectable()
export class InMemCarService implements InMemoryDbService {
  createDb(reqInfo?: RequestInfo): Observable<{}> {
    const rawData: OwnerEntity[] = JSON.parse(localStorage.getItem('owners') || '[]') as OwnerEntity[];
    let owners: OwnerEntity[] = rawData;
    const db = {owners};
    return of(db).pipe(delay(10));
  }
}
