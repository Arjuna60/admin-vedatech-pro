import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountingComponent } from './accounting.component';
import { PagesComponent } from '../pages.component';
import { AccountingService } from './accounting.service';
import { SubaccountComponent } from './subaccount/subaccount.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {path: '', component: PagesComponent,
    children: [
    {path: 'accounting', component: AccountingComponent, data: {titulo: 'Cuentas Contables',  runGuardsAndResolvers: 'always'}},
    {path: 'upload', component: UploadComponent, data: {titulo: 'Archivo de Cuentas Contables',  runGuardsAndResolvers: 'always'}}

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: []
})
export class AccountingRoutingModule { }
