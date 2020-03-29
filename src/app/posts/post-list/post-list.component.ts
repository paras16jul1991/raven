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

   posts : Post[] = [];
   private postsSub : Subscription;
   
  constructor(public service : PostsService) {
   
   }
  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

  ngOnInit(): void {
    this.service.getPosts();
    this.service.getPostupdateListener().subscribe((x : Post[])=> this.posts = x );
  }
}
