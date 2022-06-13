import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busquedaBlog'
})
export class BusquedaBlogPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.lenth < 4) return value;
    const resultPosts = [];
    for (const post of value) {
      if (post.titulo.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
