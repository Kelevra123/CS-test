import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CarEntity } from "../entityes/car.entity";
import { MyValidators } from "../../my.validators";



@Component({
  selector: '.car-cell',
  templateUrl: './car-cell.component.html',
  styleUrls: ['./car-cell.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarCellComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  @Input() car: CarEntity = new CarEntity('', '', '', 0, 0, false);
  @Input() editable: boolean = false;
  @Output() onFormSubmit: EventEmitter<CarEntity> = new EventEmitter<CarEntity>();
  @Output() validEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deleteCar: EventEmitter<number> = new EventEmitter<number>()
  public id: number = new Date().valueOf();

  ngOnInit(): void {
    this.form = new FormGroup({
      aNumber: new FormControl(this.car?.aNumber, [
        Validators.required,
        Validators.pattern(/^[ABCEHIKMOPTX]{2}(?!0{4})\d{4}[ABCEHIKMOPTX]{2}$/),
        MyValidators.uniqueCarNumber
        ]),
      aBrand: new FormControl(this.car?.aBrand, Validators.required),
      aModel: new FormControl(this.car?.aModel, Validators.required),
      aYear: new FormControl(this.car?.aYear, Validators.required, [MyValidators.yearValidator])
    });
  }

  public onChange(): void {
    if (this.form.valid) {
      this.validEmit.emit(this.form.valid);
      this.onFormSubmit.emit(
        new CarEntity(
          this.form.value.aNumber,
          this.form.value.aBrand,
          this.form.value.aModel,
          this.form.value.aYear,
          this.id,
          true
        )
      );
    } else this.validEmit.emit(this.form.valid);
  }

  public onDeleteCar(): void {
    if (this.car) {
      this.deleteCar.emit(this.car.id || 0);
    }
  }
}
