import { Post } from "./post.model";
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment }  from "../../environments/environment";
 
const backEndUrl = environment.apiUrl +'/posts';

@Injectable({providedIn : 'root'})
export class PostsService{

        constructor(private http : HttpClient ){
            
        }


        private posts : Post[] = [];
        private postSUpdated = new Subject<Post[]>();

        getPosts(){
            this.http.get<{message : string , posts : any }>
            ( backEndUrl )
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
            this.http.post<{message : string, postid : string }>( backEndUrl ,post).subscribe((x)=>{
                console.log(x.message);
                post.id = x.postid;
                this.posts.push(post);
                this.postSUpdated.next(this.posts);
            });
            

        }

        getPost(id : string){
            return this.http.get<{_id : string , title : string, content : string }>
            ( backEndUrl+ '/'+id);
        }


        deletePost(id : string ){
            this.http.delete(backEndUrl + "/" + id).subscribe(()=>{
                console.log("Post deleted  "+id);
                const  updatedPost = this.posts.filter(x => x.id != id);
                this.posts = updatedPost;
                this.postSUpdated.next([...this.posts]);
            });
        }

        updatePost(id: string , title : string , content : string){
            const post = { id : id , title : title, content : content };
            this.http.put(backEndUrl+'/'+ id, post).subscribe(x => {
                console.log("Post updated  "+ id);
                const updatedPost = [...this.posts];
                const  updatedPostIndex = this.posts.findIndex( p => p.id == id);
                updatedPost[updatedPostIndex] = post;  
                this.posts = updatedPost;
                this.postSUpdated.next([...this.posts]);
            });
        }

        getPostupdateListener(){
            return this.postSUpdated.asObservable();
        }
}