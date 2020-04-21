import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorIntercepter implements HttpInterceptor
{ 

    constructor(private dialog : MatDialog){

    }

    intercept(req : HttpRequest<any>,next: HttpHandler)
     { 
        return  next.handle(req).pipe(
            catchError((error : HttpErrorResponse)=>{
                console.log(error);
                let errormessage = 'Unknow error occured';
                if(error.error.message){
                    errormessage =  error.error.message;
                }
                this.dialog.open(ErrorComponent, { data  : { message : errormessage }});
                return throwError(error);
            })
        );
    }
}