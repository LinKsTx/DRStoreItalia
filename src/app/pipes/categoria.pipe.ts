import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoria'
})
export class CategoriaPipe implements PipeTransform {

  transform(array: any[], filterBy: string): any[] {
    const filter = filterBy ? filterBy.toLocaleLowerCase() : null;
    if(filter){
      return array.filter(ev => ev.categoria.toLocaleLowerCase().includes(filter))
    }
    return array;
  }
}
