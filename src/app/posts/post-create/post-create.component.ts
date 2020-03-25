import { Component, EventEmitter,  OnInit, Output } from '@angular/core';
import { PostsService } from '../posts.service';

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

  onAddPost(): void{
     this.service.addPost(this.enteredTitle, this.enteredContent);
  }

}
