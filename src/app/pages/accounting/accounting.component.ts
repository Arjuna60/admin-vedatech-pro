import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountingService } from './accounting.service';
import { AccountTypeIf, AccountType, SubAccount } from './accounting.model';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import swal from 'sweetalert';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { startWith, map, tap } from 'rxjs/operators';

declare function init_plugins();
declare function modal_fuction();
declare function init_mask();

// declare function footable_all_min();
// declare function bootstrap_select_min();
// declare function footable_init();

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent implements OnInit {

    name = '';
    loadButton: Boolean = true;
    changingValue: Subject<SubAccount> = new Subject();
    accountType: Subject<AccountType[]> = new Subject();
    label = 'label label-table label-light-info';
    selectedFile: File = null;
    accounting: AccountType[];
    subaccount: SubAccount;
    progress: { percentage: number } = { percentage: 0 };
    currentFileUpload: File = null;


    constructor(private accountingService: AccountingService) {
      console.log('CONSTRUCTOR ACCOUNTING');
      
  //    this.loadAccounting();
     }


  ngOnInit() {
console.log('NG INIT ACCOUNTING');

    init_plugins();
    modal_fuction();                       // carja javascript para cargar el modal: assets/js/functions/modal.js
    init_mask();

    this.accountingService.refreshNeeded$  // refresca la pagina cuando enviamos en el form un dato
    .subscribe(() => {
    this.loadAccounting();
    console.log('REFRESH ACCOUNTING');
    
    });
      this.loadAccounting();
     
  }

 
  /*----------- Http carga Array de objetos del tipo AccountType -------------*/
    loadAccounting() {
      this.accountingService.getAllAccountsType()
      .subscribe(resp => {
        // tslint:disable-next-line:semicolon
      this.accounting = resp;
      if (resp !== null) {
        this.loadButton = false;

        for (let i = 0; i < this.accounting.length; i++ ) {
          if (this.accounting[i].state !== false) {
               for (let j = 0; j < this.accounting[i].subAccount.length; j++) {
                 this.accounting[i].balance = this.accounting[i].balance + this.accounting[i].subAccount[j].balance;
                 console.log('BALANCE ', this.accounting[i].balance);
              } 
          }
        }
      }

      this.accountType.next(this.accounting);    // Se envia al SubAccount Component
      });

      this.calculateBalance();
    }

    calculateBalance() {
    
    }

 
  onSelectSubAcc(subaccount) {
    console.log('SUBACCOUNT SELECT ', subaccount);
    this.accountingService.findByIdSubAccount(subaccount)
    .subscribe( resp => {
      this.subaccount = resp;
      console.log('SUBACCOUNT ID ', this.subaccount);
    });
  }
 

  tellChild(subaccount) {
    console.log('SUBACCOUNT SELECT ', subaccount);
    this.accountingService.findByIdSubAccount(subaccount)
    .subscribe( resp => {
      this.subaccount = resp;
      console.log('SUBACCOUNT ID ', this.subaccount);
      this.changingValue.next(this.subaccount);
    });
  }

  delete(subaccount) {
    console.log('SUBACCOUNT SELECT ', subaccount);
    this.accountingService.deleteSubAccount(subaccount)
    .subscribe( resp => {
      console.log('SUBACCOUNT DELETE BY ID RESP ', resp);
    //  this.changingValue.next(this.subaccount);
    });
  }


}
