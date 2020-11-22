import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortMy'
})
export class SortPipe implements PipeTransform {

  transform(value: any[]): any {
    if (value.length === 0 || value.length === 1) {
      return value;
    }
    const response = value.sort((first, second) => {
      if (first.name > second.name) {
        return 1;
      }

      if (first.name < second.name) {
        return -1;
      }

      return 0;
    });

    return response;
  }

}
