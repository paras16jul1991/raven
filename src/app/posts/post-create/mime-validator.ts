import { AbstractControl } from "@angular/forms";
import { Observable, Observer } from "rxjs";
export const mimetype = (control : AbstractControl) : Promise<{[key : string] : any}> | Observable<{[key : string] : any}> =>{
    const file = control.value as File;
    const fileReader =  new FileReader();
    
    const frobs = Observable.create( ( observer : Observer <{[key : string] : any }>  )=>{

        fileReader.addEventListener("loadend",()=>{
        });
        //Not impletemented yet
        fileReader.readAsArrayBuffer(file);
    });

    return frobs;
};