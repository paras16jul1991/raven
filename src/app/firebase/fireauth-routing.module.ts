import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SidemenuComponent } from "./sidemenu/sidemenu.component";
import { FireAuthComponent } from "./fire-auth.component";
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from "@angular/fire/auth-guard";
import { ClusterComponent } from "./cluster/cluster.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["/fire"]);

const routes: Routes = [
  {
    path: "",
    component: FireAuthComponent,
    children: [
      { path: "cluster", component: ClusterComponent },
      {
        path: "home",
        component: SidemenuComponent,
        canActivate: [AngularFireAuthGuard],
        outlet: "sub",
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FireAuthRoutingModule {}
