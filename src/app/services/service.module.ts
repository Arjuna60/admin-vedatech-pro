import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountingService } from '../pages/accounting/accounting.service';
import { UsuarioService } from '../login/usuario.service';

import {
  SettingsService,
  SidebarService,
  SharedService
 } from './service.index';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    AccountingService,
    UsuarioService
  ],
  declarations: []
})
export class ServiceModule { }
