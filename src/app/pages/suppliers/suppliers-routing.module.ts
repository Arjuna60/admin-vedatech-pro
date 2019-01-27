import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from '../pages.component';
import { SuppliersComponent } from './suppliers.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {path: '', component: PagesComponent,
  children: [
  {path: 'suppliers', component: SuppliersComponent, data: {titulo: 'Proveedores',  runGuardsAndResolvers: 'always'}},
  {path: 'upload-suppliers', component: UploadComponent, data: {titulo: 'Archivo de Cuentas Proveedores',  runGuardsAndResolvers: 'always'}}

]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
