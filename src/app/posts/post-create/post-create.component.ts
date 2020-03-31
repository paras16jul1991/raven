import { Component, EventEmitter,  OnInit, Output } from '@angular/core';
import { PostsService } from '../posts.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredTitle= ''; 
  enteredContent= '';
  constructor(public service : PostsService) {
   }

  ngOnInit(): void {
  }

  onAddPost(form : NgForm): void{
     this.service.addPost(null, form.value.enteredTitle, form.value.enteredContent);
    form.reset();
    }

}
