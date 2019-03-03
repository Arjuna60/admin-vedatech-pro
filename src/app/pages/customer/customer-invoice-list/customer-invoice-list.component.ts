import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CustomerService } from '../customer.service';
import { Invoice } from '../customer.model';
import { CustomerInvoiceListService } from '../customer-invoice-list.service';

declare function init_plugins();
declare function modal_fuction();


@Component({
  selector: 'app-customer-invoice-list',
  templateUrl: './customer-invoice-list.component.html',
  styleUrls: ['./customer-invoice-list.component.css']
})
export class CustomerInvoiceListComponent implements OnInit {

  invoices: Invoice [];
  
  constructor(public customerService: CustomerService,
    public customerInvoiceListService: CustomerInvoiceListService,
     private dialogRef: MatDialogRef<CustomerInvoiceListComponent>) { }

  ngOnInit() {
    init_plugins();
    modal_fuction();
  //  this.getAllInvoiceCustomer(); 
      this.getInvoices();
  }

   
  getAllInvoiceCustomer() {
    this.customerService.getAllInvoiceCustomer()
    .subscribe(resp => {
      // tslint:disable-next-line:semicolon
      // console.log(resp);
       this.invoices = resp;
      });

      // this.getValue.next(this.banktransaction);
  }

  getInvoices() {
    this.invoices = this.customerInvoiceListService.invoices;
  }

  onClose() {
    this.dialogRef.close();
  }


}
