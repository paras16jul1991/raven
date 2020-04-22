import { Component, OnInit } from '@angular/core';
import { SideMenuService } from "../sidemenu-service";

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  links : { name : string , link :  string}[];

  constructor(public service : SideMenuService) { }

  ngOnInit(): void {

    this.links =  this.service.getMenus(); 
  }

}
