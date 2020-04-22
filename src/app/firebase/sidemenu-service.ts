import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";

const backEndUrl = environment.apiUrl + "/fire/menus";

@Injectable({ providedIn: "root" })
export class SideMenuService {
  menus: { name: string; link: string }[] = [];

  constructor(public http: HttpClient) {}

  public getMenus() {
    this.http
      .get<{ message: string; result: { name: string; link: string }[] }>(
        backEndUrl
      )
      .subscribe((res) => {
        console.log(res.result);
        res.result.map((x) =>
          this.menus.push({ name: x.name, link: x.link })
        );
      });
    return this.menus;
  }
}
