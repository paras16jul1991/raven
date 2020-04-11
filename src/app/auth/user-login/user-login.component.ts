import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from "../authService";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit,OnDestroy {

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


  login(form:NgForm){
    console.log(form.value);
    this.isLoading = true;
    this.service.login(form.value.username , form.value.password);
  }

}
