import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './authService';

@Injectable()
export class AuthIntercepter implements HttpInterceptor
{
        constructor(private service : AuthService){

        }

    intercept(req : HttpRequest<any>,next: HttpHandler)
     {
        const authToken = this.service.getToken();
        const authRequest = req.clone({
            headers : req.headers.set('authorization',"Bearer "+ authToken)
        });
        return  next.handle(authRequest);
    }
}