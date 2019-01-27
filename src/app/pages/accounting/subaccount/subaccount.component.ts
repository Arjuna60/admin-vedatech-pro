import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccountType, SubAccount } from '../accounting.model';
import { Observable, Subject } from 'rxjs';
import { AccountingService } from '../accounting.service';
import { Router} from '@angular/router';
import { AccountingComponent } from '../accounting.component';

import Swal from 'sweetalert2';

declare function init_plugins();
declare function modal_fuction();
declare function init_mask();


@Component({
  selector: 'app-subaccount',
  templateUrl: './subaccount.component.html',
  styleUrls: ['./subaccount.component.css']
})
export class SubaccountComponent implements OnInit {
  filteredAccOptions: Observable<AccountType[]>;
  accounts: AccountType[];

  // tslint:disable-next-line:no-inferrable-types
  update: boolean = true;
  disabled: boolean = false;
  delete: false;
  filterOptions: Observable<AccountType[]>;
  form: FormGroup;
  @Input() accountType: Subject<AccountType[]>;

  accountTypeIn = {
    id: null,
    name: '',
    account: '',
    balance: null,
    subAccount: SubAccount,
    state: false
  };

  @Input() subAccount: SubAccount;
  @Input() changing: Subject<SubAccount>;
  accounting: AccountType[];
 

  constructor(private formBuilder: FormBuilder,
              private accountingService: AccountingService,
              private accountingComponent: AccountingComponent,
              private router: Router) {
     this.createForm();
     console.log('constructor');
     this.disabled = false;
     
    }

  ngOnInit() {

    init_plugins();
    modal_fuction();
    init_mask();
    this.update = false;
    this.changing.subscribe (v => {
      console.log('value SubAccount Observable value', v);
      this.subAccount = v;
      if (this.subAccount.status !== false ) {
        console.log('STATUS ', this.subAccount.status);
        
          this.disabled = false;
      } else {
        this.disabled = true;
      }
      this.update = true;
      this.updateForm();
   });

   this.accountType.subscribe (v => {
      console.log('value is is Observable accountType value', v);
      this.accounting = v;
      this.update = false;
      this.delete = false;
    });
  
    console.log('DISABLED? ', this.disabled);
    
  }


  loadData() {
    console.log('ACCOUNT TYPE IN SUBACCOUNT ', this.accountTypeIn);
    this.form.controls['accountType'].setValue(this.accountTypeIn);
  }
// numero folio 001381 numero de reporte 182146
  updateForm() {
     console.log('SUBACCOUNT FOR UPDATE ', this.subAccount);
     this.form.controls['id'].setValue(this.subAccount.id);
     const IdData = (<HTMLInputElement>document.getElementById('dataList'));
     IdData.value = String( this.subAccount.accountType.id);
     this.form.get('accountType.id').setValue(this.subAccount.accountType.id);
     this.form.get('accountType.name').setValue(this.subAccount.accountType.name);
     this.form.controls['nameAccount'].setValue(this.subAccount.nameAccount);
     this.form.controls['accountNumber'].setValue(this.subAccount.accountNumber);
     this.form.controls['balance'].setValue(this.subAccount.balance);
     this.form.controls['status'].setValue(this.subAccount.status);

  }


  createForm() {
    this.form = this.formBuilder.group({
              id: new FormControl(''),
     accountType: new FormGroup({
              id: new FormControl('', [Validators.required]),
            name: new FormControl(''),
         account: new FormControl('')}),
     nameAccount: new FormControl('', [Validators.required]),
   accountNumber: new FormControl('', [Validators.required]),
         balance: new FormControl('', [Validators.required]),
          status: new FormControl('', [Validators.required])
  });
  }


    save() {
    console.log('FORM SAVE ', this.form);
    const data = JSON.stringify(this.form.value);
    console.log('-----Team in JSON Format-----');
    console.log(data);
    this.send(data);
  }

  updateform() {
    console.log('FORM SAVE ', this.form);
    const data = JSON.stringify(this.form.value);
    console.log('-----Team in JSON Format UPDATE-----');
    console.log(data);
    this.updateData(data);
  }

  send(data: any) {
    this.accountingService.createSubAccount(data).subscribe( res => {
      console.log(res);
      swal('Mensaje del Servidor...', `La transaccion fue exitosa`, 'success');
         this.cleanForm();
        },
        error => {
         // console.log(error, '/', error.error);
           swal('Mensaje del Servidor:', `Error!!...El numero de la cuenta: ${data.nameAccount} ya existe `, 'error');
        });
  }


  updateData(data: any) {
    this.accountingService.updateSubAccount(data).subscribe( res => {
      console.log(res);
      swal('Mensaje del Servidor...', `La transaccion fue exitosa`, 'success');
         this.cleanForm();
        },
        error => {
         // console.log(error, '/', error.error);
           swal('Mensaje del Servidor:', `Error!!...El numero de la cuenta: ${data.nameAccount} ya existe `, 'error');
        });
  }

cancel() {
  this.form.reset();
  this.update = false;
  this.disabled = false;
 
}


   cleanForm() {
         console.log('This form despues de borrar items ', this.form);
         this.form.reset();
         this.getAllData();
         this.update = false;
         this.disabled = false;
  }


   getAllData() {
    this.accountingComponent.loadAccounting();
  }

  loadAccounting() {
    this.accountingService.getAllAccountsType()
    .subscribe(resp => {
      // tslint:disable-next-line:semicolon
       this.accounting = resp;
       console.log('ACCOUNTING ', this.accounting);
       
      });
  }


  change(event) {
    console.log('VALOR CHANGE', event.target.value);
    console.log('VALOR DE FORM ', this.form);
    console.log('VALOR DEL ACCOUNTING ', this.accounting[event.target.value - 1]);
    this.form.get('accountType.id').setValue(this.accounting[event.target.value - 1].id); 
          
  }

  onFocus() {
    const IdData = (<HTMLInputElement>document.getElementById('dataList'));
//    let x = document.getElementById('dataList').value;
//    console.log('VALOR DE X ', x);
    this.form.get('accountType.id').setValue(IdData.value);
  }

  isDisabled(event) {
 
    console.log('EVENT ', event.target.value);
    console.log('STATUS ', this.form.get('status').value);
    if (this.form.get('status').value !== false) {
      console.log('DISABLED');
      
        this.disabled = true;
    } else {
      console.log('HABILIT3D');
      this.disabled = false;
      this.form.get('status').setValue(true);
     // this.updateform();
    }
    
    
  }


}
