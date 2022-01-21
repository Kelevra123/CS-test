import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemCarService } from "./components/InMemCarService.service";
import { AppService } from "./app.service";
import { RouterModule } from "@angular/router";
import { FormComponent } from './components/form.component.ts/form.component';
import { routes } from "./routes";
import { MainComponent } from './components/main.component.ts/main.component';
import { Interceptor } from "./interceptors/api.interceptor";
import { CommonModule } from "@angular/common";
import { CellComponent } from './components/cell.component.ts/cell.component';
import { ReactiveFormsModule } from "@angular/forms";
import { CarCellComponent } from './components/car-cell.component.ts/car-cell.component';



@NgModule({
  declarations: [AppComponent, FormComponent, MainComponent, CellComponent, CarCellComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemCarService),
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    AppService, {
    provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
