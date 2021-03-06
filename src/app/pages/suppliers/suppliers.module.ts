import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { UploadComponent } from './upload/upload.component';
import { SuppliersComponent } from './suppliers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatAutocompleteModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AccountingRoutingModule } from '../accounting/accounting-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { SuppliersPipe } from './suppliers.pipe';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { SupplierTransactionComponent } from './supplier-transaction/supplier-transaction.component';
import { SuppliersInvoiceComponent } from './suppliers-invoice/suppliers-invoice.component';
import { MaterialModule } from '../material/material.module';
import { SuppliersAllInvoicesComponent } from './suppliers-all-invoices/suppliers-all-invoices.component';

@NgModule({
  declarations: [
  SuppliersComponent,  
  UploadComponent, SuppliersPipe, SupplierFormComponent, SupplierTransactionComponent, SuppliersInvoiceComponent, SuppliersAllInvoicesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SuppliersRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AccountingRoutingModule,
    NgxMaskModule.forRoot()
  ]
})
export class SuppliersModule { }
