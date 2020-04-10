import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import {  UserLoginComponent } from "./auth/user-login/user-login.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";

const routes: Routes = [
  { path : '', component : PostListComponent  },
  { path : 'create', component : PostCreateComponent },
  { path : 'edit/:postId', component : PostCreateComponent },
  { path : 'signup', component : SignUpComponent },
  { path : 'login', component : UserLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
