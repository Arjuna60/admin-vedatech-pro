import { Pipe, PipeTransform } from '@angular/core';
import { Supplier } from './supplier.model';

@Pipe({
  name: 'suppliersFilter'
})
export class SuppliersPipe implements PipeTransform {

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
