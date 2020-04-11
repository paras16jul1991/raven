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
        private postSUpdated = new Subject<{posts : Post[],maxposts : number}>();

        getPosts(postperpage : number , currentpage : number){
            console.log(postperpage   +"  "+ currentpage );
            const querystr = `?pagesize=${postperpage}&page=${currentpage}`;

            this.http.get<{message : string , posts : any , maxposts : number}>
            ( backEndUrl +querystr )
            .pipe( map((postdata) => {
               // console.log(postdata.maxposts);
                return {
                  posts :  postdata.posts.map((post) => {
                         return {
                                   id : post._id,
                                   title : post.title,
                                   content : post.content,
                                   imagepath : post.imagepath,
                                   creator : post.creator
                               } 
                       }),
                  maxposts : postdata.maxposts
                }
               }))
            .subscribe((x)=> {
              //  console.log(x.posts);
                this.posts = x.posts;
                this.postSUpdated.next({
                    posts : [...this.posts],
                    maxposts : x.maxposts
                        }
                    );
            });
            
        }

        addPost(id : string , title : string , content : string, image : File){
            const postData = new FormData();
            postData.append("title",title);
            postData.append("content",content);
            postData.append("image",image, title);
            
            this.http.post<{message : string, post : Post }>( backEndUrl ,postData).subscribe((x)=>{
                console.log(x.message);
                this.router.navigate(["/"]);
            });
            
            

        }

        getPost(id : string){
            return this.http.get<{_id : string , title : string, content : string, imagepath : string }>
            ( backEndUrl+ '/'+id);
        }


        deletePost(id : string ){
            return this.http.delete(backEndUrl + "/" + id);
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
                this.router.navigate(["/"]);
            });
        }

        getPostupdateListener(){
            return this.postSUpdated.asObservable();
        }
}