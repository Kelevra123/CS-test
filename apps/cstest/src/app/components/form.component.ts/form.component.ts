import {
  ApplicationRef,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OwnerEntity } from "../entityes/ownerEntity.entity";
import { CarEntity } from "../entityes/car.entity";
import { AppService } from "../../app.service";



@Component({
  selector: '.form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public owner: OwnerEntity | null = null;
  public cars: CarEntity[] = [];
  public valid: boolean = true;
  public isNew: boolean = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _appService: AppService,
    private _aR: ApplicationRef
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params: any) => {
      if (params.id && +params.id !== 0) {
        this._appService.getOwnerById(+params.id).subscribe(data => {
          this.owner = data;
          this.cars = data.aCars;
          this.isNew = false;
          this.form.patchValue({
            aLastName: this.owner.aLastName,
            aFirstName: this.owner.aFirstName,
            aMiddleName: this.owner.aMiddleName
          })
        });
      }
      else {
        this.owner = new OwnerEntity('', '', '', []);
        this.isNew = true;
      }
    });
    this.form = new FormGroup({
      aLastName: new FormControl(this.owner?.aLastName, Validators.required),
      aFirstName: new FormControl(this.owner?.aFirstName, Validators.required),
      aMiddleName: new FormControl(this.owner?.aMiddleName, Validators.required)
    });
  }

  public onSubmit(): void {
    if (this.isNew) {
      const { aFirstName, aLastName, aMiddleName } = this.form.value;
      this._appService.createOwner(aLastName, aFirstName, aMiddleName, this.cars).subscribe();
      this._router.navigate(['']);
    } else {
      if (this.owner) {
        const { aFirstName, aLastName, aMiddleName } = this.form.value;
        const editOwner = new OwnerEntity(aFirstName, aLastName, aMiddleName, this.cars, this.owner.id);
        this._appService.editOwner(editOwner).subscribe();
        this._router.navigate(['']);
      }
    }
  }

  public back(): void {
      this._router.navigate(['']);
  }

  public addCar(): void {
    if(this.owner) {
      this.valid = false;
      this.cars.push({...new CarEntity('', '', '', 0, 0, false)});
      this.owner.aCars = [...this.cars];
    }
  }

  public carAddFormSubmit(event: CarEntity): void {
    if (this.owner) {
      const uniqueId = this.cars.findIndex(car => car.id === 0);
      if (uniqueId === -1) {
        this.cars = [...this.owner?.aCars, event];
      } else {
        this.cars = [...this.cars.slice(0, uniqueId), event, ...this.cars.splice(uniqueId + 1, this.cars.length - 1)];
      }
    }
  }

  public validationCheck(event: boolean): void {
    this.valid = event;
  }

  public onDeleteCar(event: number): void {
    if (this.owner) {
      const index: number = this.cars.findIndex(car => car.id === event);
      if (index === -1) return;

      this.cars = this.owner.aCars;
      this.cars = [...this.cars.slice(0, index), ...this.cars.splice(index + 1, this.cars.length - 1)];
      this.owner.aCars = [...this.cars];
      this.valid = true;
      this._aR.tick();
    }
  }
}
