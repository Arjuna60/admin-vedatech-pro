import { Component, OnInit} from '@angular/core';
import { AccountType, SubAccount } from '../accounting/accounting.model';
import swal from 'sweetalert';
import {  Subject } from 'rxjs';
import { Supplier } from './supplier.model';
import { SuppliersService } from './suppliers.service';
import { Router } from '@angular/router';



declare function init_plugins();
declare function modal_fuction();
declare function init_mask();

// declare function footable_all_min();
// declare function bootstrap_select_min();
// declare function footable_init();

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

    filterPost = '';
    name = '';
    loadButton: Boolean = true;
    plusButton: Boolean = false;
    updateValue: Subject<Supplier> = new Subject();
    accountType: Subject<AccountType[]> = new Subject();
    label = 'label label-table label-light-info';
    selectedFile: File = null;
    accounting: Supplier[];
    subaccount: SubAccount;
    progress: { percentage: number } = { percentage: 0 };
    currentFileUpload: File = null;


    constructor(private supplierService: SuppliersService,
                private router: Router) {
      console.log('CONSTRUCTOR ACCOUNTING');
      
  //    this.loadAccounting();
     }


  ngOnInit() {
console.log('NG INIT ACCOUNTING');

    init_plugins();
    modal_fuction();                       // carja javascript para cargar el modal: assets/js/functions/modal.js
    init_mask();

    this.supplierService.refreshNeeded$  // refresca la pagina cuando enviamos en el form un dato
    .subscribe(() => {
    this.loadAccounting();
    console.log('REFRESH ACCOUNTING');
    
    });
      this.loadAccounting();
  }

 
  /*----------- Http carga Array de objetos del tipo AccountType -------------*/
    loadAccounting() {
      this.supplierService.getAllSuppliers()
      .subscribe(resp => {
        // tslint:disable-next-line:semicolon
      this.accounting = resp;
        
      if (resp !== null) {
        this.loadButton = false;
        
      }

   //   this.accountType.next(this.accounting);    // Se envia al SubAccount Component
      });

      console.log('SUPPLIERS ', this.accounting);
    }

 
 /*  onSelectSubAcc(subaccount) {
    console.log('SUBACCOUNT SELECT ', subaccount);
    this.accountingService.findByIdSubAccount(subaccount)
    .subscribe( resp => {
      this.subaccount = resp;
      console.log('SUBACCOUNT ID ', this.subaccount);
    });
  } */
 

   tellChild(supplier) {
    console.log('SUBACCOUNT SELECT ', supplier);
      this.updateValue.next(supplier);
    }


    invoiceBySupplier( id: any) {
      this.router.navigate(['/supplier-invoice/', id]);
    }


  }



  
 /*  delete(subaccount) {
    console.log('SUBACCOUNT SELECT ', subaccount);
    this.accountingService.deleteSubAccount(subaccount)
    .subscribe( resp => {
      console.log('SUBACCOUNT DELETE BY ID RESP ', resp);
    //  this.changingValue.next(this.subaccount);
    });
  } */

 

