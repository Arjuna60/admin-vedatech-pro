import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountingService } from '../pages/accounting/accounting.service';

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
    AccountingService
  ],
  declarations: []
})
export class ServiceModule { }
