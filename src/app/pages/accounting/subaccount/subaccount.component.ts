import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { AccountType, SubAccount } from '../accounting.model';
import { Observable, Subject } from 'rxjs';
import { AccountingService } from '../accounting.service';
import swal from 'sweetalert';
import { Router, RouterModule } from '@angular/router';
import { AccountingComponent } from '../accounting.component';
import { startWith, map } from 'rxjs/operators';

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

  selectObj: number;

  @Input() subAccount: SubAccount;
  @Input() changing: Subject<SubAccount>;
  accounting: AccountType[];
 

  constructor(private formBuilder: FormBuilder,
              private accountingService: AccountingService,
              private accountingComponent: AccountingComponent,
              private router: Router) {
     this.createForm();
     this.selectObj = undefined;
 
    }

  ngOnInit() {

    init_plugins();
    modal_fuction();
    init_mask();
    
 //   this.loadData();
    this.changing.subscribe (v => {
      console.log('value SubAccount Observable value', v);
      this.subAccount = v;
      // this.accountTypeIn = this.subAccount.accountType;
      console.log('SELECT OBJ ', this.selectObj);
      this.selectObj = v.accountType.id;
      console.log('NEW VALUE SELECTOBJ ', this.selectObj);
      
      // this.form.controls['accountType'].setValue(v.accountType);
      this.update = false;
      this.updateForm();
   });

   this.accountType.subscribe (v => {
    console.log('value is is Observable accountType value', v);
    this.accounting = v;
    this.update = true;
    this.delete = false;
 //   this.loadData();
    // this.update = false;
 });

  
  }


  loadData() {
    console.log('ACCOUNT TYPE IN SUBACCOUNT ', this.accountTypeIn);
    this.form.controls['accountType'].setValue(this.accountTypeIn);
  //  this.form.controls['accountType'].setValue(this.subAccount.accountType);
 //   this.form.controls['nameAccount'].setValue(this.subAccount.nameAccount);
    // this.form.controls['accountNumber'].setValue(this.subAccount.accountNumber);
    // this.form.controls['balance'].setValue(this.subAccount.balance);
    // this.form.controls['status'].setValue(this.subAccount.status);
  }

  updateForm() {
     console.log('SUBACCOUNT FOR UPDATE ', this.subAccount);
     this.form.controls['id'].setValue(this.subAccount.id);
 //    this.selectObj = this.subAccount.accountType.id;
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
   //   accountType: new FormControl(''),
     accountType: new FormGroup({
            id: new FormControl('', [Validators.required]),
            name: new FormControl(''),
            account: new FormControl('')
      
      }),
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
  this.selectObj = 0;
}


   cleanForm() {
         console.log('This form despues de borrar items ', this.form);
         this.form.reset();
         this.getAllData();
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

  filterAcc() {
    this.filteredAccOptions = this.form.get('accountType').valueChanges
    .pipe(
    startWith<string | AccountType>(''),
    map(value =>  typeof value === 'string' ? value : value.name),
    map(name => name ? this._filterAcc(name) : this.accounting.slice())
    );

  }

  private _filterAcc(name: String): AccountType[] {
    console.log('NAME ', name);
    
    const filterAccValue = name.toLowerCase();
    return this.accounting.filter(option => option.name.toLowerCase().indexOf(filterAccValue) === 0);
  }


  displayAccFn(acc?: AccountType): String | undefined {
    return acc ? acc.name : undefined;
  }

  change(event) {
    console.log('VALOR CHANGE', event.target.value);
    console.log('VALOR DEL ACCOUNTING ', this.accounting[event.target.value - 1]);
    if (this.accounting[event.target.value - 1] !== undefined ) {
      this.form.get('accountType.name').setValue(this.accounting[event.target.value - 1].name)
      this.form.get('accountType.id').setValue(this.accounting[event.target.value - 1].id);
    } else {
      console.log('SELECCIONE UNA CUENTA VALIDA');
      this.form.get('accountType.id').setValue('');
      this.form.get('accountType.name').setValue('');

      }
          
  }


}
