import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { BankComponent } from './bank/bank.component';
import { AccountingComponent } from './accounting/accounting.component';

const routes: Routes = [
  {path: '', component: HomeComponent,
   children: [
     {path: 'bank', component: BankComponent, data: {title: 'Bank'}},
     {path: 'accounting', component: AccountingComponent, data: {title: 'Accounting'}}

   ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
