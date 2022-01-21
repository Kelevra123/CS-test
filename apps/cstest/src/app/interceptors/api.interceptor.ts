import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { OwnerEntity } from "../components/entityes/ownerEntity.entity";

@Injectable()
export class Interceptor implements HttpInterceptor{

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let rawData: OwnerEntity[] = JSON.parse(localStorage.getItem('owners') || '[]');

    if (req.url.includes('api/owners') && req.method === 'POST') {
      const owner: OwnerEntity = req.body;
      rawData.push(owner);
      const newData: string = JSON.stringify(rawData);
      localStorage.setItem('owners', newData);
    }

    if (req.url.includes('api/owners') && req.method === 'PUT') {
      const editOwner: OwnerEntity = req.body;
      const prevOwner: number = rawData.findIndex(owner => owner.id === editOwner.id);
      if (prevOwner !== -1) {
        rawData = [...rawData.slice(0, prevOwner), editOwner, ...rawData.splice(prevOwner + 1, rawData.length - 1)];
        const newData: string = JSON.stringify(rawData);
        localStorage.setItem('owners', newData);
      }
    }

    if (req.url.includes('api/owners') && req.method === 'DELETE') {
      const deleteOwnerId: number = +req.url.replace('api/owners/', '');
      const deleted: number = rawData.findIndex(owner => owner.id === deleteOwnerId);
      if (deleted !== -1) {
        rawData = [...rawData.slice(0, deleted), ...rawData.splice(deleted + 1, rawData.length - 1)];
        const newData: string = JSON.stringify(rawData);
        localStorage.setItem('owners', newData);
      }
    }

    return next.handle(req);
  }

}
