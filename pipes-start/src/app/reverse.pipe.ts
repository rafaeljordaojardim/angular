import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseStatus'
})
export class ReversePipe implements PipeTransform {

  transform(value: any): any {
      return value.split('').reverse().join('');
  }

}
