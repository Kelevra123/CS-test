import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";;
import { Injectable } from "@angular/core";
import { OwnerEntity } from "./components/entityes/ownerEntity.entity";


@Injectable()
export class MyValidators {

  static uniqueCarNumber(control: AbstractControl): ValidationErrors | null {
    const owners: OwnerEntity[] = JSON.parse(localStorage.getItem('owners') || '')
    let res: ValidationErrors | null = null;

    for (let i = 0; i < owners.length; i++) {
      const CarNumber = owners[i].aCars.find(car => car.aNumber === control.value);

      if (CarNumber) {
        return  res = {uniq: {'uniq': true}};
      }
      else {
        res = null;
      }
    }
    return res;
  }

  static yearValidator(control: AbstractControl): Promise<any> | Observable<any> {
    return new Promise(resolve => {
      if (control.value.length === 4 && +control.value > 1989 && +control.value < 2023) {
        resolve(null);
      } else {
        resolve({year: true});
      }
    });
  }
  
}
