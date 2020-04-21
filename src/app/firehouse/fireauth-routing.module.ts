import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  HeaderComponent } from "./header/header.component";
import { FireAuthComponent } from './fire-auth.component';

const routes: Routes = [
  { path : '', component : FireAuthComponent },
  { path : 'home', component : HeaderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FireAuthRoutingModule { }
