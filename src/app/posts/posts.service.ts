import { Post } from "./post.model";
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment }  from "../../environments/environment";
import { Router } from '@angular/router';
 
const backEndUrl = environment.apiUrl +'/posts';

@Injectable({providedIn : 'root'})
export class PostsService{

        constructor(private http : HttpClient ,public router : Router){
            
        }


        private posts : Post[] = [];
        private postSUpdated = new Subject<Post[]>();

        getPosts(postperpage : number , currentpage : number){
            console.log(postperpage   +"  "+ currentpage );
            const querystr = `?pagesize=${postperpage}&page=${currentpage}`;

            this.http.get<{message : string , posts : any }>
            ( backEndUrl +querystr )
            .pipe( map((postdata) => {
                 return postdata.posts.map(post =>{
                        return {
                            id : post._id,
                            title : post.title,
                            content : post.content,
                            imagepath : post.imagepath
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

        addPost(id : string , title : string , content : string, image : File){
            const postData = new FormData();
            postData.append("title",title);
            postData.append("content",content);
            postData.append("image",image, title);
            
            this.http.post<{message : string, post : Post }>( backEndUrl ,postData).subscribe((x)=>{
                console.log(x.message);
                const post : Post = { 
                    id : x.post.id,
                    title : title,
                    content : content,
                    imagepath : x.post.imagepath
                };
                post.id = x.post.id;
                this.posts.push(post);
                this.postSUpdated.next(this.posts);
                this.router.navigate(["/"]);
            });
            
            

        }

        getPost(id : string){
            return this.http.get<{_id : string , title : string, content : string, imagepath : string }>
            ( backEndUrl+ '/'+id);
        }


        deletePost(id : string ){
            this.http.delete(backEndUrl + "/" + id).subscribe(()=>{
                console.log("Post deleted  "+id);
                const  updatedPost = this.posts.filter(x => x.id != id);
                this.posts = updatedPost;
                this.postSUpdated.next([...this.posts]);
                this.router.navigate(["/"]);
            });
        }

        updatePost(id: string , title : string , content : string, image : File | string ){
            let postData;
            if( typeof(image) == 'object'){
                postData = new FormData();
                postData.append('id',id);
                postData.append('title',title);
                postData.append('content',content);
                postData.append('image',image);
            }else{
                postData = {
                    id : id,
                    title : title,
                    content : content,
                    imagepath : image
                };
            }
            this.http.put(backEndUrl+'/'+ id, postData).subscribe(x => {
                console.log("Post updated  "+ id);
                
                
                const updatedPost = [...this.posts];
                const  updatedPostIndex = this.posts.findIndex( p => p.id == id);
                
                const post = { id : id , title : title, content : content, imagepath : '' };

                updatedPost[updatedPostIndex] = post;  
                this.posts = updatedPost;
                this.postSUpdated.next([...this.posts]);
                this.router.navigate(["/"]);
            });
        }

        getPostupdateListener(){
            return this.postSUpdated.asObservable();
        }
}