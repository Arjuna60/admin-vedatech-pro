import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountingRoutingModule } from './accounting-routing.module';
import { AccountingComponent } from './accounting.component';
import { SubaccountComponent } from './subaccount/subaccount.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxMaskModule} from 'ngx-mask';

// Angular Material Modules
import {MatFormFieldModule, MatInputModule, MatAutocompleteModule
} from '@angular/material';
import { Options } from 'selenium-webdriver/safari';
import { UploadComponent } from './upload/upload.component';


@NgModule({
  declarations: [AccountingComponent, SubaccountComponent, UploadComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AccountingRoutingModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
  //  BrowserModule,
  //  ReactiveFormsModule,
  //  AccountingRoutingModule
  ]
})
export class AccountingModule { }
