import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { AuthIntercepter } from './auth/auth-intercepter';
import { ErrorIntercepter } from './error-intercepter';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { PostsModule } from './posts/posts.module';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    ProfileCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    PostsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [{ provide : HTTP_INTERCEPTORS, useClass : AuthIntercepter, multi: true },
    { provide : HTTP_INTERCEPTORS, useClass : ErrorIntercepter, multi: true }],
  bootstrap: [AppComponent],
  entryComponents : [ErrorComponent]
})
export class AppModule { }
