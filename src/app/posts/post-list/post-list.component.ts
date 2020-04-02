import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from "../post.model";
import { PostsService } from '../posts.service';
import {  Subscription } from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit , OnDestroy {

   isLoading = false;
   posts : Post[] = [];
   private postsSub : Subscription;
   
  constructor(public service : PostsService) {
   
   }
 
  onDelete(id : string){
    this.service.deletePost(id);
  }

  ngOnInit(): void {
    this.isLoading= true;
    this.service.getPosts();
    this.service.getPostupdateListener().subscribe((x : Post[])=> {
      this.posts = x;
      this.isLoading= false;
     }
    );
   
  }

  ngOnDestroy(): void {
  //  this.postsSub.unsubscribe();
  }

}
