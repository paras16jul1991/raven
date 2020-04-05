import { Pipe, PipeTransform } from '@angular/core';
import { Post } from "./post.model";

@Pipe({
    name: 'postfilter'
  })

  export class FilterPipe implements PipeTransform {
    transform(items: Post[], searchText: string): Post[] {
      if(!items) return [];
      if(!searchText) return items;
  searchText = searchText.toLowerCase();
  return items.filter( it => {
       // console.log(it);
        return it.title.toLowerCase().includes(searchText);
      });
     }
  }