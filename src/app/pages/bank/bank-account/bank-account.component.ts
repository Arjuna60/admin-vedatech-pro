import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BankAccount } from '../bank.model';
import { BankService } from '../bank.service';
import { Subject } from 'rxjs';

declare function init_plugins();
declare function modal_fuction();

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  form: FormGroup;
  bankAccounts: BankAccount[];
  updateValue: Subject<BankAccount> = new Subject();


  constructor(private bankService: BankService) { 
    init_plugins();
    modal_fuction();                       // carja javascript para cargar el modal: assets/js/functions/modal.js
   this.getAllBankAccounts();
  }

  ngOnInit() {
  }

  getAllBankAccounts() {
    this.bankService.getAllBankAccounts()
    .subscribe(res => {
      console.log('BANK ACCOUNTS ', res);
      this.bankAccounts = res;
    });
  }


  tellChildToUpdate(subaccount) {
    console.log('SUBACCOUNT SELECT ', subaccount);
    this.updateValue.next(subaccount);

    }
  

 

}
