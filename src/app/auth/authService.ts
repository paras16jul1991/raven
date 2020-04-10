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


    constructor(private http : HttpClient ,public router : Router){
            
    }


    login(userName : string, password : string){
        const user : User =  { email : userName , password : password};
        this.http.post<{messgae : string , result : string}>( backEndUrl+ "/login", user ).subscribe(result => {
            console.log(result);
        });
    }

    signup(userName : string, password : string){
        const user : User =  { email : userName , password : password};
        this.http.post<{messgae : string , result : string}>( backEndUrl+ "/signup", user ).subscribe(result => {
            console.log(result);
        });
    }
}