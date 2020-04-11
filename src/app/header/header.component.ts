import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/authService';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAuthenticated :boolean;
  authSubscription : Subscription;

  constructor(private service : AuthService, router : Router) { }

  ngOnInit(): void {
    this.authSubscription=  this.service.getAuthStatusListener().subscribe( isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  onLogout(){
    this.service.logOut();
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

}
