import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FireAuthComponent } from './fire-auth.component';
import { FireAuthRoutingModule } from "./fireauth-routing.module";


@NgModule({
  declarations: [HeaderComponent, FireAuthComponent],
  imports: [
    CommonModule,
    FireAuthRoutingModule
  ],
  bootstrap : [FireAuthComponent]
})
export class FireAuthModule { }
