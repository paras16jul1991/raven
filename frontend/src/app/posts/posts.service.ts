import { Post } from "./post.model";
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({providedIn : 'root'})
export class PostsService{

        constructor(private http : HttpClient ){
            
        }


        private posts : Post[] = [];
        private postSUpdated = new Subject<Post[]>();

        getPosts(){
            this.http.get<{message : string , posts : any }>
            ("http://localhost:3000/api/posts")
            .pipe( map((postdata) => {
                 return postdata.posts.map(post =>{
                        return {
                            id : post._id,
                            title : post.title,
                            content : post.content
                        }
                    }
                ); 
                }))
            .subscribe((x)=> {
              //  console.log(x.posts);
                this.posts = x;
                this.postSUpdated.next([...this.posts]);
            });
            
        }

        addPost(id : string , title : string , content : string){
            const post : Post = {id : id , title :title, content : content};
            this.http.post<{message : string, postid : string }>("http://localhost:3000/api/posts",post).subscribe((x)=>{
                console.log(x.message);
                post.id = x.postid;
                this.posts.push(post);
                this.postSUpdated.next(this.posts);
            });
            

        }


        deletePost(id : string ){
            this.http.delete("http://localhost:3000/api/posts/"+ id).subscribe(()=>{
                console.log("Post deleted  "+id);
                const  updatedPost = this.posts.filter(x => x.id != id);
                this.posts = updatedPost;
                this.postSUpdated.next([...this.posts]);
            });
        }

        onEdit(post : Post){
            this.http.put("http://localhost:3000/api/posts/",post);
        }

        getPostupdateListener(){
            return this.postSUpdated.asObservable();
        }
}