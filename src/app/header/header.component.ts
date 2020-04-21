import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/authService';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';  
import { catchError, take } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAuthenticated :boolean;
  authSubscription : Subscription;
  user$: Observable<firebase.User> = this.service.user$;

  constructor(private service : AuthService, private readonly router: Router,  private readonly snackBar: MatSnackBar) { }

  ngOnInit(): void {
 
    this.isAuthenticated = this.service.getIsAuth();
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

   

  login() {
    this.service
      .loginViaGoogle()
      .pipe(
        take(1),
        catchError((error) => {
          this.snackBar.open(`${error.message} 😢`, 'Close', {
            duration: 4000,
          });
          return '';
        }),
      )
      .subscribe(
        (response) =>
          response &&
          this.snackBar.open(
            `Oh! You're here. I demand that you feed me, Hooman. 😾`,
            'Close',
            {
              duration: 4000,
            },
          ),
      );
  }

  logout() {
    this.service
      .logout()
      .pipe(take(1))
      .subscribe((response) => {
        this.router.navigate([`/feed`]);
        this.snackBar.open('Come back soon with treats! 😿', 'Close', {
          duration: 4000,
        });
      });
  }

}
