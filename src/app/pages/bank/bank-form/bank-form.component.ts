import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AccountType, SubAccount } from '../../accounting/accounting.model';
import { AccountingService } from '../../accounting/accounting.service';
import { map, filter, flatMap, reduce } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BankService } from '../bank.service';
import { BankAccountComponent } from '../bank-account/bank-account.component';
import { BankAccount } from '../bank.model';

declare function init_plugins();
declare function modal_fuction();
declare function init_mask();


@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.css']
})
export class BankFormComponent implements OnInit {

  form: FormGroup;
  selectObj: number;
 // accounting: AccountType[];
  accounting: AccountType[] = [];
  subAccount: SubAccount[];
  changingValue: Subject<AccountType> = new Subject();
  @Input() changing: Subject<BankAccount>;
  bankAccount: BankAccount;
  arr: AccountType;
  arrai: any[];
  update: boolean = true;
  delete: false;

  
  constructor(private formBuilder: FormBuilder,
              private accountingService: AccountingService,
              private bankService: BankService,
              private bankAccountComponent: BankAccountComponent) {
    this.loadAccountingFilter();
    this.createForm();
   }

  ngOnInit() {
    init_plugins();
    modal_fuction();
    init_mask();

    this.changing.subscribe (v => {
      console.log('value SubAccount Observable value', v);
      this.bankAccount = v;
      console.log('SELECT OBJ ', this.selectObj);
      this.selectObj = v.subAccount.id;
      console.log('NEW VALUE SELECTOBJ ', this.selectObj);
      this.update = false;
      this.updateForm();
   });
  }

  updateForm() {
   
    console.log('SUBACCOUNT FOR UPDATE ', this.bankAccount);
    this.form.controls['id'].setValue(this.bankAccount.id);
    this.selectObj = this.bankAccount.subAccount.id;
   this.form.get('subAccount.id').setValue(this.bankAccount.subAccount.id);
   this.form.get('subAccount.nameAccount').setValue(this.bankAccount.subAccount.nameAccount);
   
    this.form.controls['nameBank'].setValue(this.bankAccount.nameBank);
    this.form.controls['accountNumber'].setValue(this.bankAccount.accountNumber);
    this.form.controls['balance'].setValue(this.bankAccount.balance);

 }

  createForm() {

    this.form = this.formBuilder.group({
      id: new FormControl(''),
     subAccount: new FormGroup({
            id: new FormControl('', [Validators.required]),
      }),
      nameBank: new FormControl('', [Validators.required]),
      accountNumber: new FormControl('', [Validators.required]),
      balance: new FormControl('', [Validators.required])
  });
  }


  change(event) {
      this.form.get('subAccount.id').setValue(event.target.value);
      console.log(this.form);
  }


  loadAccountingFilter() {
    this.accountingService.getAllAccountsType()
    .pipe(
     flatMap((data) => data),
     filter(data => parseInt((data.account).replace('-', ''), 10) < 10005),
     filter(data => data.state) 
     )
    .subscribe(result => {
     this.accounting.push(result);
     this.form.get('subAccount.id').setValue(this.accounting[0].subAccount[0].id);
    });
    
  }
  

   cancel() {

  }

  save() {
    console.log('FORM SAVE ', this.form);
    const data = JSON.stringify(this.form.value);
    console.log('-----Team in JSON Format-----');
    console.log(data);
  //  this.send(data);
  }

  send(data: any) {
    this.bankService.createBankAccount(data).subscribe( res => {
      console.log(res);
      swal('Mensaje del Servidor...', `La transaccion fue exitosa`, 'success');
         this.cleanForm();
        },
        error => {
         // console.log(error, '/', error.error);
           swal('Mensaje del Servidor:', `Error!!...El numero de la cuenta: ${data.nameAccount} ya existe `, 'error');
        });
  }

  cleanForm() {
    console.log('This form despues de borrar items ', this.form);
    this.form.reset();
    this.getAllData();
}

getAllData() {
  this.bankAccountComponent.getAllBankAccounts();
}


}
