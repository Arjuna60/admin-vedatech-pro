import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { BankComponent } from './bank/bank.component';
import { AccountingComponent } from './accounting/accounting.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, BankComponent, AccountingComponent],
  exports: [],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
