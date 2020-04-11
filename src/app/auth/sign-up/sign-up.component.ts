import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  AuthService } from "../authService";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  username : string;
  password : string;
  isLoading : boolean;

  constructor(public service : AuthService) { }

  ngOnInit(): void {
    this.isLoading  = false;
  }


  signup(form : NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.service.signup(form.value.username , form.value.password);
  }
}
