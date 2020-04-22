import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { FireAuthComponent } from './fire-auth.component';
import { FireAuthRoutingModule } from "./fireauth-routing.module";
import { AngularMaterialModule } from '../angular-material.module';
import { ClusterComponent } from './cluster/cluster.component';


@NgModule({
  declarations: [SidemenuComponent, FireAuthComponent, ClusterComponent],
  imports: [
    CommonModule,
    FireAuthRoutingModule,
    AngularMaterialModule,
  ],
  bootstrap : [FireAuthComponent]
})
export class FireAuthModule { }
