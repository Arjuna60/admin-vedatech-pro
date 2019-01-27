import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from '../pages.component';
import { UploadComponent } from './upload/upload.component';
import { CustomerComponent } from './customer.component';

const routes: Routes = [
  {path: '', component: PagesComponent,
    children: [
    {path: 'customers', component: CustomerComponent, data: {titulo: 'Cuentas Clientes',  runGuardsAndResolvers: 'always'}},
    // tslint:disable-next-line:max-line-length
    {path: 'upload-customers', component: UploadComponent, data: {titulo: 'Archivo de Cuentas de Clientes',  runGuardsAndResolvers: 'always'}}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
