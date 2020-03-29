import { Post } from "./post.model";
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn : 'root'})
export class PostsService{

        constructor(private http : HttpClient ){
            
        }


        private posts : Post[] = [];
        private postSUpdated = new Subject<Post[]>();

        getPosts(){
            this.http.get<{message : string , posts : Post[]}>("http://localhost:3000/api/posts").subscribe((x)=> {
              //  console.log(x.posts);
                this.posts = x.posts;
                this.postSUpdated.next([...this.posts]);
            });
            
        }

        addPost(title : string , content : string){
            const post : Post = {title :title, content : content};
            this.http.post<{message : string }>("http://localhost:3000/api/posts",post).subscribe((x)=>{
                console.log(x.message);
                this.posts.push(post);
                this.postSUpdated.next(this.posts);
            });
            

        }

        getPostupdateListener(){
            return this.postSUpdated.asObservable();
        }
}