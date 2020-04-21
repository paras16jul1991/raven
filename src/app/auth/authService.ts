import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment }  from "../../environments/environment";
import { Router } from '@angular/router';
import { User } from './user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';
 
const backEndUrl = environment.apiUrl +'/user';

@Injectable({providedIn : 'root'})
export class AuthService{
    private token :string ;
    private isAuthenticated : boolean;
    private expiresIn : number;
    private tokenTimer : any;
    private userId : string;

    private user: BehaviorSubject<Observable<firebase.User>> = new BehaviorSubject<Observable<firebase.User>>(null);

    user$ = this.user
    .asObservable()
    .pipe(switchMap((user: Observable<firebase.User>) => user));


  loginViaGoogle(): Observable<auth.UserCredential> {
    return from(this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()));
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }

    private authStatusListener = new Subject<boolean>();

    constructor(private http : HttpClient ,public router : Router,private afAuth: AngularFireAuth){
        this.user.next(this.afAuth.authState);
    }

    getToken(){
        return this.token;
    }
    getUserId(){
        console.log("userid " + this.userId);
        return this.userId;
    }

    getIsAuth(){
        return this.isAuthenticated;
    }
    getAuthStatusListener(){
        return this.authStatusListener;
    }

    login(userName : string, password : string){
        const user : User =  { email : userName , password : password};
        this.http.post<{token : string, expiresIn : number, userid : string}>( backEndUrl+ "/login", user ).subscribe(result => {
            console.log(result.token);
            this.token = result.token;
            if(this.token){
                
                this.userId = result.userid;
                this.expiresIn = result.expiresIn;
                this.setAuthTimer(this.expiresIn);
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + this.expiresIn * 1000);
                this.saveAuthData(this.token, expirationDate, this.userId);
                this.router.navigate(['/']);
            }
           
        } , err =>{
                this.authStatusListener.next(false);
        });
    }

    signup(userName : string, password : string){
        const user : User =  { email : userName , password : password};
        return this.http.post<{messgae : string , result : string}>( backEndUrl+ "/signup", user ).subscribe(()=>{
            this.router.navigate(['/']);
        }, err => {
            this.authStatusListener.next(false);
        });
    }

    logOut(){
        console.log("logout called");
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.router.navigate(['/']);
        this.clearAuthData();
        this.userId  = null;
        clearTimeout(this.tokenTimer);
    }

    private setAuthTimer(expiresIn : number){
        this.tokenTimer = setTimeout(()=>{
            this.logOut();

        },expiresIn * 1000 );
    }

    autoAuthUser(){
        const authInfo  = this.getAuthData();
        console.log(authInfo);
        if(!authInfo)
        {
            return;
        }
        const now = new Date();
        const expireIn = authInfo.expirationDate.getTime() - now.getTime();
        console.log("expireIn "+ expireIn);
        if(expireIn>0){
            this.token = authInfo.token;
            this.isAuthenticated = true;
            this.userId = authInfo.userId;
            this.setAuthTimer(expireIn/1000);
            this.authStatusListener.next(true);
        }
    }

    getAuthData(){
        const token  = localStorage.getItem('token');
        const expirationDate  = localStorage.getItem('expiration');
        const userId  = localStorage.getItem('userId');
        if(!token  || !expirationDate){
            return ;
        }
        return {token :token , expirationDate  : new Date(expirationDate), userId :  userId}; 

    }
    saveAuthData(token :string , expiresDate : Date, userId : string ){
        localStorage.setItem('token',token);
        localStorage.setItem('expiration',expiresDate.toISOString());
        localStorage.setItem('userId',this.userId);
    }

    clearAuthData(){
        console.log("clearing cache");
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
    }
}