import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from "../../app.service";
import { Observable } from "rxjs";
import { OwnerEntity } from "../entityes/ownerEntity.entity";
import { Router } from "@angular/router";
import { RoutePathKey } from "../../routes";



@Component({
  selector: '.main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  public $owners: Observable<OwnerEntity[]> = new Observable<OwnerEntity[]>();

  constructor(
    private _appService: AppService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.$owners = this._appService.getOwner();
  }

  public toForm(): void {
    this._router.navigate([RoutePathKey.FORM, '0']);
  }
}
