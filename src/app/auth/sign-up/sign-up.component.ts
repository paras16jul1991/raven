import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  AuthService } from "../authService";
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit,OnDestroy {

  username : string;
  password : string;
  isLoading : boolean;
  authSubscription : Subscription;

  constructor(public service : AuthService) { }
  
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.authSubscription = this.service.getAuthStatusListener().subscribe(()=>{
      this.isLoading  = false;
    });
  }


  signup(form : NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.service.signup(form.value.username , form.value.password);
  }
}
