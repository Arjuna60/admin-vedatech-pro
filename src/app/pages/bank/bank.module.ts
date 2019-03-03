import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { BankComponent } from './bank.component';
import { UploadBankComponent } from './upload-bank/upload-bank.component';
import { ForReviewComponent } from './for-review/for-review.component';
import { ExcludedComponent } from './excluded/excluded.component';
import { BankTransactionComponent } from './bank-transaction/bank-transaction.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BankFormComponent } from './bank-form/bank-form.component';
import { CheckComponent } from './check/check.component';
import { AddPolizaComponent } from './add-poliza/add-poliza.component';
import { MaterialModule } from '../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [BankComponent,
     UploadBankComponent,
     ForReviewComponent,
     ExcludedComponent,
     BankTransactionComponent,
     BankAccountComponent,
     BankFormComponent,
     CheckComponent,
     AddPolizaComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BankRoutingModule
  ],
  providers: [
    // {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})
export class BankModule { }
