import { Post } from "./post.model";
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({providedIn : 'root'})
export class PostsService{

        private posts : Post[] = [];
        private postSUpdated = new Subject<Post[]>();

        getPosts(){
            return this.posts;
        }

        addPost(title : string , content : string){
            const post : Post = {title :title, content : content};
            this.posts.push(post);
            this.postSUpdated.next(this.posts);

        }

        getPostupdateListener(){
            return this.postSUpdated.asObservable();
        }
}