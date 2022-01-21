import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { FormComponent } from "./components/form.component.ts/form.component";
import { MainComponent } from "./components/main.component.ts/main.component";



export enum RoutePathKey {
  MAIN = '',
  FORM = 'form'
};

export const routes: Routes = [
  { path: RoutePathKey.MAIN, component: MainComponent},
  { path:`${RoutePathKey.FORM}/:id`, component:  FormComponent},
];
