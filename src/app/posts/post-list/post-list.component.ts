import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from "../post.model";
import { PostsService } from '../posts.service';
import {  Subscription } from "rxjs";
import { PageEvent } from '@angular/material/paginator/paginator';

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
   
  constructor(public service : PostsService) {
  
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
    this.service.getPosts(this.postperpage,this.currentpage);
    this.service.getPostupdateListener().subscribe((x : {posts : Post[], maxposts : number})=> {
      this.posts = x.posts;
      console.log("post count "+x.maxposts)
      this.totalposts = x.maxposts;
      this.isLoading= false;
     }
    );
   
  }

  ngOnDestroy(): void {
  //  this.postsSub.unsubscribe();
  }

  onPageChange(pagedata : PageEvent){
    this.isLoading= true;
    console.log(pagedata);
    this.service.getPosts(pagedata.pageSize,pagedata.pageIndex+1);
  }
}
