import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';

// temporal
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios
import { ServiceModule } from './services/service.module';



// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { AccountingModule } from './pages/accounting/accounting.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BankModule } from './pages/bank/bank.module';
import { SuppliersModule } from './pages/suppliers/suppliers.module';
import { CustomerModule } from './pages/customer/customer.module';
import { AddPolizaComponent } from './pages/bank/add-poliza/add-poliza.component';
import { ErrorService } from './error.service';
import { AuthRequestOptions } from './auth-request';
import { CustomerInvoiceComponent } from './pages/customer/customer-invoice/customer-invoice.component';
import { CustomerInvoiceListComponent } from './pages/customer/customer-invoice-list/customer-invoice-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    APP_ROUTES,
    AccountingModule,
    BankModule,
    SuppliersModule,
    CustomerModule,
    PagesModule,
    ServiceModule
  ],
  entryComponents: [
    AddPolizaComponent,
    CustomerInvoiceListComponent
  ],
  providers: [ 
    ErrorService,
    {
      provide: ErrorHandler,
      useClass: ErrorService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthRequestOptions,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
