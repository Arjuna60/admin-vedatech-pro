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

@NgModule({
  declarations: [
    CustomerComponent,
    UploadComponent,
    CustomerFormComponent,
    CustomerPipe
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AccountingRoutingModule,
    NgxMaskModule.forRoot()
  ]
})
export class CustomerModule { }
