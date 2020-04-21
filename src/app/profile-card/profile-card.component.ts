import { Component, OnInit } from "@angular/core";
import { EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-profile-card",
  templateUrl: "./profile-card.component.html",
  styleUrls: ["./profile-card.component.css"],
})
export class ProfileCardComponent implements OnInit {
  @Input() user: firebase.User;
  @Output() logoutClick: EventEmitter<null> = new EventEmitter<null>();

  logout() {
   this.logoutClick.emit();
  }

  constructor() {}

  ngOnInit(): void {
    console.log(this.user);

  }
}
