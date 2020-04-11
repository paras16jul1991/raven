import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  UserLoginComponent } from "./user-login/user-login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

const routes: Routes = [
  { path : 'signup', component : SignUpComponent },
  { path : 'login', component : UserLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
