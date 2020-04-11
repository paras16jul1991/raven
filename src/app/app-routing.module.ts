import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import {  UserLoginComponent } from "./auth/user-login/user-login.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { AuthGaurd } from './auth/auth-gaurd';

const routes: Routes = [
  { path : '', component : PostListComponent  },
  { path : 'create', component : PostCreateComponent , canActivate : [AuthGaurd]},
  { path : 'edit/:postId', component : PostCreateComponent , canActivate : [AuthGaurd] },
  { path : 'signup', component : SignUpComponent },
  { path : 'login', component : UserLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [AuthGaurd]
})
export class AppRoutingModule { }
