import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(arr: any[], col: string = 'name', order: string = 'desc'): any[] {
    return arr.sort(compareFn);

    function compareFn(a: { [x: string]: any; },
                       b: { [x: string]: any; }) {
      var multiplier = (order === 'desc') ? -1 : 1;
      var x = a[col];
      var y = b[col];
      if (typeof x === 'string') {
        x = x.toUpperCase();
        y = y.toUpperCase();
      }
      if (x === y) return 0;
      if (x < y)
        return -1 * multiplier;
      else
        return 1 * multiplier;
    }
  }

}
