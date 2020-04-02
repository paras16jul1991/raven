import { Component, EventEmitter,  OnInit, Output } from '@angular/core';
import { PostsService } from '../posts.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from "../post.model";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  isLoading= false;
  enteredTitle= ''; 
  enteredContent= '';
  private mode = 'create';
  private postId : string;
  post : Post;

  constructor(public service : PostsService , public route : ActivatedRoute) {
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((map) => {
        if (map.has('postId')){
            this.mode = 'edit';
            this.postId = map.get('postId');
            this.isLoading= true;
            this.service.getPost(this.postId).subscribe( x => {
              this.post = { id : x._id, title : x.title, content : x.content };
              this.isLoading= false;
            });
        }else{
          this.mode  = 'create';
          this.postId = null;
        }
      });
  }

  onAddPost(form : NgForm): void{
    if(this.mode == 'edit')
    { this.isLoading= true;
      this.service.updatePost(this.postId, form.value.enteredTitle, form.value.enteredContent);
    } 
    else{
      this.isLoading= true;
      this.service.addPost(null, form.value.enteredTitle, form.value.enteredContent);
    }
      form.reset();
    }

}
