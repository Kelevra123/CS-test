import { Component, Input, ViewEncapsulation } from '@angular/core';
import { OwnerEntity } from "../entityes/ownerEntity.entity";
import { AppService } from "../../app.service";
import { Router } from "@angular/router";
import { RoutePathKey } from "../../routes";



@Component({
  selector: '.cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CellComponent {
  @Input() public owner: OwnerEntity | null = null;

  constructor(
    private _appService: AppService,
    private _router: Router
  ) { }

  public onDeleteOwner(id: number): void {
    const deleteAsk = window.confirm('Вы действительно хотите удалить информацию о пользователе?');
    if (!deleteAsk) return;

    this._appService.deleteOwner(id).subscribe();
    window.location.reload();
  }

  public redirect(): void {
    this._router.navigate([RoutePathKey.FORM, this.owner?.id]);
  }
}
