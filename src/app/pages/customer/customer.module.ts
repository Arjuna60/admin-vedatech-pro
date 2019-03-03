import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { UploadComponent } from './upload/upload.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerPipe } from './customer.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountingRoutingModule } from '../accounting/accounting-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { BrowserModule } from '@angular/platform-browser';
import { CustomerInvoiceComponent } from './customer-invoice/customer-invoice.component';
import { CustomerInvoiceListComponent } from './customer-invoice-list/customer-invoice-list.component';
import { MaterialModule } from '../material/material.module';
import { InvoiceDetailsComponent } from './customer-invoice/invoice-details/invoice-details.component';

@NgModule({
  declarations: [
    CustomerComponent,
    UploadComponent,
    CustomerFormComponent,
    CustomerPipe,
    CustomerInvoiceComponent,
    CustomerInvoiceListComponent,
    InvoiceDetailsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AccountingRoutingModule,
    NgxMaskModule.forRoot()
  ]
})
export class CustomerModule { }
