import { Component, EventEmitter,  OnInit, Output } from '@angular/core';
import { PostsService } from '../posts.service';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from "../post.model";
import { tick } from '@angular/core/testing';

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
  form : FormGroup;
  imagePreview : string;

  constructor(public service : PostsService , public route : ActivatedRoute) {
   }

  ngOnInit(): void {
    this.form = new FormGroup({
      'title' : new FormControl(null,{ validators : [ Validators.required, Validators.minLength(3)] }),
      'content' : new FormControl(null,{ validators : [ Validators.required, Validators.minLength(3)] }),
      'image' : new FormControl(null,{ validators : [ Validators.required ] })
      });

    this.route.paramMap.subscribe((map) => {
        if (map.has('postId')){
            this.mode = 'edit';
            this.postId = map.get('postId');
            this.isLoading= true;
            this.service.getPost(this.postId).subscribe( x => {
              this.post = { id : x._id, title : x.title, content : x.content , imagepath : x.imagepath , creator : null};
              this.isLoading= false;

              this.form.setValue({
                title : this.post.title,
                content : this.post.content,
                image : this.post.imagepath
              });

            });
        }else{
          this.mode  = 'create';
          this.postId = null;
        }
      });
  }

  onAddPost(): void{
    if(this.mode == 'edit')
    { this.isLoading= true;
      this.service.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
    } 
    else{
      this.isLoading= true;
      this.service.addPost(null, this.form.value.title, this.form.value.content, this.form.value.image);
    }
      this.form.reset();
    }


    onImagePicked(event : Event){
      
      const  file = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({ image : file });
      this.form.get('image').updateValueAndValidity();
      console.log(file);
      const reader = new FileReader();
      reader.onload = () => {
         this.imagePreview = reader.result as string ;
          console.log("image : "+this.imagePreview);
        };
      reader.readAsDataURL(file);
    }
}
