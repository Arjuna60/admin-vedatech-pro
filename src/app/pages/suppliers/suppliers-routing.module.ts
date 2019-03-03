import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from '../pages.component';
import { SuppliersComponent } from './suppliers.component';
import { UploadComponent } from './upload/upload.component';
import { SupplierTransactionComponent } from './supplier-transaction/supplier-transaction.component';
import { SuppliersInvoiceComponent } from './suppliers-invoice/suppliers-invoice.component';
import { SuppliersAllInvoicesComponent } from './suppliers-all-invoices/suppliers-all-invoices.component';

const routes: Routes = [
  {path: '', component: PagesComponent,
  children: [
  {path: 'suppliers', component: SuppliersComponent, data: {titulo: 'Proveedores',  runGuardsAndResolvers: 'always'}},
  // tslint:disable-next-line:max-line-length
  {path: 'upload-suppliers', component: UploadComponent, data: {titulo: 'Archivo de Cuentas Proveedores',  runGuardsAndResolvers: 'always'}},
  // tslint:disable-next-line:max-line-length
  {path: 'supplier-transactions', component: SupplierTransactionComponent, data: {titulo: 'Movimiento de Proveedores',  runGuardsAndResolvers: 'always'}},
  // tslint:disable-next-line:max-line-length
  {path: 'supplier-invoice/:id', component: SuppliersInvoiceComponent, data: {titulo: 'Movimiento de Proveedores',  runGuardsAndResolvers: 'always'}},
  // tslint:disable-next-line:max-line-length
  {path: 'supplier-all-invoice', component: SuppliersAllInvoicesComponent, data: {titulo: 'Todos los Movimiento de Proveedores',  runGuardsAndResolvers: 'always'}}

]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
