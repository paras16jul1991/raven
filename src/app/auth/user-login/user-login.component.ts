import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from "../authService";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  username : string;
  password : string;
  isLoading : boolean;

  constructor(public service : AuthService) { }

  ngOnInit(): void {
    this.isLoading  = false;
  }


  login(form:NgForm){
    console.log(form.value);
    this.isLoading = true;
    this.service.login(form.value.username , form.value.password);
  }

}
