import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerFilter'
})
export class CustomerPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3 ) { return value; }

    const result = [];
    for (const acc of value ) {
      if (acc.company.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
        result.push(acc);
      }
    }
    return result;
  }

}
