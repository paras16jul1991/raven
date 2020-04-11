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
                
                this.tokenTimer = setTimeout(()=>{
                    this.logOut();

                },this.expiresIn * 1000 );

                this.isAuthenticated = true;
                this.authStatusListener.next(true);
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
    
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.router.navigate(['/']);
        clearTimeout(this.tokenTimer);
    }
}