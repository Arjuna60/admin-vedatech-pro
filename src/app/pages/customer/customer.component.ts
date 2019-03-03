import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Customer } from './customer.model';
import { AccountType, SubAccount } from '../accounting/accounting.model';
import { CustomerService } from './customer.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AddPolizaComponent } from '../bank/add-poliza/add-poliza.component';
import { CustomerInvoiceListComponent } from './customer-invoice-list/customer-invoice-list.component';
import { CustomerInvoiceListService } from './customer-invoice-list.service';
import { Router } from '@angular/router';


declare function init_plugins();
declare function modal_fuction();
declare function init_mask();


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  filterPost = '';
    name = '';
    loadButton: Boolean = true;
    plusButton: Boolean = false;
    updateValue: Subject<Customer> = new Subject();
    accountType: Subject<AccountType[]> = new Subject();
    label = 'label label-table label-light-info';
    selectedFile: File = null;
    accounting: Customer[];
    subaccount: SubAccount;
    progress: { percentage: number } = { percentage: 0 };
    currentFileUpload: File = null;


    constructor(private customerService: CustomerService,
      private router: Router,
      public customerListService: CustomerInvoiceListService,
                public dialog: MatDialog) {
      console.log('CONSTRUCTOR ACCOUNTING');
      
  //    this.loadAccounting();
     }


  ngOnInit() {
console.log('NG INIT ACCOUNTING');

    init_plugins();
    modal_fuction();                       // carja javascript para cargar el modal: assets/js/functions/modal.js
    init_mask();

    this.customerService.refreshNeeded$  // refresca la pagina cuando enviamos en el form un dato
    .subscribe(() => {
    this.loadAccounting();
    console.log('REFRESH ACCOUNTING');
    
    });
      this.loadAccounting();
  }

 
  /*----------- Http carga Array de objetos del tipo AccountType -------------*/
    loadAccounting() {
      this.customerService.getAllCustomers()
      .subscribe(resp => {
        // tslint:disable-next-line:semicolon
      this.accounting = resp;
        
      if (resp !== null) {
        this.loadButton = false;
        
      }

   //   this.accountType.next(this.accounting);    // Se envia al SubAccount Component
      });

      console.log('CUSTOMERS ', this.accounting);
    }

 
    tellChild(supplier) {
    console.log('SUBACCOUNT SELECT ', supplier);
      this.updateValue.next(supplier);
    }

    // openDialog(obj: any): void {
    //   console.log('object ', obj);
    //   // this.formPolizaService.insertObj(obj);
    //   this.customerListService.insertObject(obj);
    //   const dialogConfig = new MatDialogConfig();
    //   dialogConfig.disableClose = true;
    //   dialogConfig.autoFocus = true;
    //  // dialogConfig.scrollStrategy.enable();
    //   dialogConfig.width = '80%';
    //   dialogConfig.height = '100%';
    //   this.dialog.open(CustomerInvoiceListComponent, dialogConfig);
     
    // }
    
    invoiceByCustomer( id: any)  {
      this.router.navigate(['/customer-invoice/', id]);

    }
  }


