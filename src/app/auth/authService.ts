import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment }  from "../../environments/environment";
import { Router } from '@angular/router';
import { User } from './user.model';
 
const backEndUrl = environment.apiUrl +'/user';

@Injectable({providedIn : 'root'})
export class AuthService{
    private token :string ;
    private isAuthenticated : boolean;
    private expiresIn : number;
    private tokenTimer : any;

    private authStatusListener = new Subject<boolean>();

    constructor(private http : HttpClient ,public router : Router){
            
    }

    getToken(){
        return this.token;
    }

    getIsAuth(){
        return this.isAuthenticated;
    }
    getAuthStatusListener(){
        return this.authStatusListener;
    }

    login(userName : string, password : string){
        const user : User =  { email : userName , password : password};
        this.http.post<{token : string, expiresIn : number}>( backEndUrl+ "/login", user ).subscribe(result => {
            console.log(result.token);
            this.token = result.token;
            if(this.token){
                
                this.expiresIn = result.expiresIn;
                this.setAuthTimer(this.expiresIn);
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + this.expiresIn * 1000);
                this.saveAuthData(this.token, expirationDate);
                this.router.navigate(['/']);
            }
           
        });
    }

    signup(userName : string, password : string){
        const user : User =  { email : userName , password : password};
        this.http.post<{messgae : string , result : string}>( backEndUrl+ "/signup", user ).subscribe(result => {
            console.log(result);
        });
    }

    logOut(){
        console.log("logout called");
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.router.navigate(['/']);
        this.clearAuthData();
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
            this.setAuthTimer(expireIn/1000);
            this.authStatusListener.next(true);
        }
    }

    getAuthData(){
        const token  = localStorage.getItem('token');
        const expirationDate  = localStorage.getItem('expiration');
        if(!token  || !expirationDate){
            return ;
        }
        return {token :token , expirationDate  : new Date(expirationDate) }; 

    }
    saveAuthData(token :string , expiresDate : Date ){
        localStorage.setItem('token',token);
        localStorage.setItem('expiration',expiresDate.toISOString());
    }

    clearAuthData(){
        console.log("clearing cache");
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
    }
}