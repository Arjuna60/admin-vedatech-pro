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
 // updateValue: Subject<AccountType> = new Subject();
  @Input() updateValue: Subject<BankAccount>;
  bankAccount: BankAccount;
  arr: AccountType;
  arrai: any[];
  update: boolean = true;
  delete: false;
  defaultValue = 0;
  bankAcc = {
    'id': null,
   // 'accountingType': {},
   'subAccount': {
     id: 0,
   },
   'nameBank': '',
   'accountNumber': '',
   'balance': 0.00,
   'balanceToday': 0.00
 };

 isDisabled = false;

  
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

    this.updateValue.subscribe (v => {
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
    this.isDisabled = true;
    console.log('SUBACCOUNT FOR UPDATE ', this.bankAccount);
    this.form.controls['id'].setValue(this.bankAccount.id);
    const IdData = (<HTMLInputElement>document.getElementById('dataList'));
    IdData.value = String( this.bankAccount.subAccount.id);
    console.log('ID DATA ', IdData.value);
    this.form.get('subAccount.id').setValue(this.bankAccount.subAccount.id);
    this.form.controls['nameBank'].setValue(this.bankAccount.nameBank);
    this.form.controls['accountNumber'].setValue(this.bankAccount.accountNumber);
    this.form.controls['balance'].setValue(this.bankAccount.balance);
    this.form.controls['balanceToday'].setValue(this.bankAccount.balanceToday);

 }

  createForm() {

    this.form = this.formBuilder.group({
      id: new FormControl(''),
     subAccount: new FormGroup({
            id: new FormControl('', [Validators.required]),
      }),
      nameBank: new FormControl('', [Validators.required]),
      accountNumber: new FormControl('', [Validators.required]),
      balance: new FormControl('', [Validators.required]),
      balanceToday: new FormControl('')
  });
  }


  change(event) {
      this.form.get('subAccount.id').setValue(event.target.value);
      console.log(this.form);
  }

  onFocus() {
    const IdData = (<HTMLInputElement>document.getElementById('dataList'));
//    let x = document.getElementById('dataList').value;
//    console.log('VALOR DE X ', x);
    console.log('IDDATA ', IdData);
    
    this.form.get('accountType.id').setValue(IdData.value);
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
    this.form.reset();
    this.form.get('subAccount.id').setValue(0);
    this.defaultValue = 0;
    console.log('VALUE OF FORM EN CANCEL ', this.form.get('subAccount.id'));
    this.isDisabled = false;
    
    
  }

  save() {
    console.log('FORM SAVE ', this.form);
    this.form.get('balanceToday').setValue(0);
    const data = JSON.stringify(this.form.value);
    console.log('-----Team in JSON Format-----');
    console.log('data para ser enviada', data);
    this.send(data);
  }

  updateform() {
    console.log('FORM SAVE ', this.form);
    const data = JSON.stringify(this.form.value);
    console.log('-----Team in JSON Format UPDATE-----');
    console.log(data);
    this.updateData(data);
    this.isDisabled = false;
  }

  updateData(data: any) {
    this.bankService.updateBankAccount(data).subscribe( res => {
      console.log(res);
      swal('Mensaje del Servidor...', `La transaccion fue exitosa`, 'success');
         this.cleanForm();
        },
        error => {
         // console.log(error, '/', error.error);
           swal('Mensaje del Servidor:', `Error!!...El numero de la cuenta: ${data.nameAccount} ya existe `, 'error');
        });
  }


  send(data: any) {
    this.bankService.createBankAccount(data).subscribe( res => {
      console.log('Respuesta recivida ', res);
      swal('Mensaje del Servidor...', `La transaccion fue exitosa`, 'success');
         this.cleanForm();
        },
        error => {
         // console.log(error, '/', error.error);
           swal('Mensaje del Servidor:', `Error!!.El numero de la cuenta del Banco o la Subcuenta:ya existe `, 'error');
        });
  }

  cleanForm() {
    console.log('This form despues de borrar items ', this.form);
    this.form.reset();
    this.form.setValue(this.bankAcc);
    this.getAllData();
    this.onFocus();
}

getAllData() {
  this.bankAccountComponent.getAllBankAccounts();
}


}
