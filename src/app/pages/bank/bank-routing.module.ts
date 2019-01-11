import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from '../pages.component';
import { BankComponent } from './bank.component';
import { UploadBankComponent } from './upload-bank/upload-bank.component';
import { Title } from '@angular/platform-browser';
import { BankAccountComponent } from './bank-account/bank-account.component';

const routes: Routes = [
  {path: '', component: PagesComponent,
   children: [
     {path: 'bank', component: BankComponent, data: {titulo: 'Bancos'}},
     {path: 'upload-bank', component: UploadBankComponent, data: {titulo: 'Carga de Archivo de Banco'}},
     {path: 'bank-account', component: BankAccountComponent, data: {titulo: 'Agregar Cuenta de Banco'}},

   ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
