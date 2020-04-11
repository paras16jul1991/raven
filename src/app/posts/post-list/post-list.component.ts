import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from "../post.model";
import { PostsService } from '../posts.service';
import {  Subscription } from "rxjs";
import { PageEvent } from '@angular/material/paginator/paginator';
import { AuthService } from 'src/app/auth/authService';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit , OnDestroy {

   isLoading = false;
   posts : Post[] = [];
   private postsSub : Subscription;
   public searchText : any = '';
   public totalposts= 10;
   public postperpage=2;
   public currentpage = 1;
   public pagesizeoptions=[2,5,10];
   isAuthenticated: boolean;
   authSub: Subscription;
   userId : string;
   
  constructor(public service : PostsService, public authService :AuthService) {
  
   }
 
  onDelete(id : string){
    this.isLoading= true;
    this.service.deletePost(id).subscribe(x=>{
      this.service.getPosts(this.postperpage, this.currentpage);
    });
  }

  ngOnInit(): void {
   // this.searchText = "test";
    this.isLoading= true;
    this.userId = this.authService.getUserId();
    this.service.getPosts(this.postperpage,this.currentpage);
    this.service.getPostupdateListener().subscribe((x : {posts : Post[], maxposts : number})=> {
      this.posts = x.posts;
      console.log("post count "+x.maxposts)
      this.totalposts = x.maxposts;
      this.isLoading= false;
      this.isAuthenticated = this.authService.getIsAuth();
      this.authSub  = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
     }
    );
   
  }

  ngOnDestroy(): void {
  //  this.postsSub.unsubscribe();
  this.authSub.unsubscribe();
  }

  onPageChange(pagedata : PageEvent){
    this.isLoading= true;
    console.log(pagedata);
    this.service.getPosts(pagedata.pageSize,pagedata.pageIndex+1);
  }
}
