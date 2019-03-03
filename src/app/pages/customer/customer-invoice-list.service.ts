import { Injectable } from '@angular/core';
import { CustomerService } from './customer.service';
import { Invoice } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerInvoiceListService {

  invoices: Invoice[];

  constructor(public customerService: CustomerService) {

  }

  insertObject(obj: any) {
   console.log('VALOR EN EL CUSTOMER INVOICE LIST SERVICE ', obj);
    this.customerService.getAllInvoiceByCustomer(obj.id).subscribe(
      result => {
        this.invoices =  result;
      });
  }
}
