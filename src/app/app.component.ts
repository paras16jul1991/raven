import { Component, OnInit } from '@angular/core';
import {  Post } from "./posts/post.model";
import { AuthService } from './auth/authService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  
  constructor(private service : AuthService){

  }
  ngOnInit(): void {
    this.service.autoAuthUser();
  }
  
  title = 'raven';
  storedPosts : Post [] = [];

  onPostAdded(post){
    this.storedPosts.push(post);
  }
}
