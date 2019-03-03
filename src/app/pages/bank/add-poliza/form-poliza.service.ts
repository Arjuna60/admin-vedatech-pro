import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountType, AccountingDetails, SubAccount, AccountPolicy } from '../../accounting/accounting.model';
import { startWith, map } from 'rxjs/operators';
import { AccountingService } from '../../accounting/accounting.service';
import { BankTransaction, BankTransactionIf, BankAccount } from '../bank.model';
import { BankService } from '../bank.service';
import { BankTransactionService } from '../bank-transaction.service';

@Injectable({
  providedIn: 'root'
})
export class FormPolizaService {

  filteredAccOptions: Observable<SubAccount[]>;
  accounts: SubAccount[];
  // idDto se utiliza para enviar al servidor y borrar el bankTransactionDto pojo cuando se agrega la poliza
  idDto: number; 
  bankAccount: BankAccount;
  dateOperation: any = '01/01/19';
  itemIndex: number = -1;
  index: number = -1;
    // bankAccounts: BankAccount[];



  constructor(public formBuilder: FormBuilder,
              private accountService: AccountingService,
              public bankTransactionService: BankTransactionService,
              public bankService: BankService) {
                
               }


  form = this.formBuilder.group({
        bank: new FormGroup({
        id: new FormControl('1', [Validators.required]),
    }),
        poliza: this.formBuilder.array([]),
        id: new FormControl(''),
        cuenta: new FormControl(''),
        fechaOperacion: new FormControl(''),
        fecha: new FormControl(''),
        referencia: new FormControl(''),
        descripcion: new FormControl(''),
        codTransac: new FormControl(''),
        sucursal: new FormControl(''),
        deposito: new FormControl(''),
        retiro: new FormControl(''),
        movimiento: new FormControl(''),
        descripcionDetallada: new FormControl(''),
        
});


insertObj( obj: BankTransactionIf ) {
  this.getAllSubAccounts();
  this.idDto = obj.id;
  this.dateOperation = new Date(obj.fechaOperacion).toISOString().substring(0, 10);
  this.form.get('fechaOperacion').setValue(this.dateOperation);
  // this.form.get('fecha').setValue(this.dateOperation);
  // this.form.get('cuenta').setValue(obj.cuenta);
  this.form.get('deposito').setValue(obj.depositos.toFixed(2));
  this.form.get('retiro').setValue(obj.retiros.toFixed(2));
 //  this.form.get('retiros').setValue(obj.retiros);
  this.form.get('descripcionDetallada').setValue(obj.descripcionDetallada);
  this.getBankAcc(obj); 
 }


  addItem() {
      this.itemIndex = this.itemIndex + 1;
      this.addItemArr.push(this.formBuilder.group(new AccountingDetails()));
      this.addItemArr.controls[this.itemIndex].get('fechaOperacion').setValue(this.dateOperation);

  }


   get addItemArr(): FormArray {
      this.index = this.index + 1;
       return this.form.get('poliza') as FormArray;
  }


   filterAcc() {
      this.filteredAccOptions = this.addItemArr.controls[this.itemIndex].get('subAccount').valueChanges
        .pipe(
          startWith<string | SubAccount>(''),
          map(value =>  typeof value === 'string' ? value : value.nameAccount),
          map(name => name ? this._filterAcc(name) : this.accounts.slice())
        );
      }


    _filterAcc(name: string): SubAccount[] {
          const filterAccValue = name.toLowerCase();
          // this.searchAccountByName(filterAccValue);
          // console.log('ACCOUNTS IN FILTER ', this.accounts);
          // console.log('FILTER ACC', this.accounts.filter(option => option.name.toLowerCase().indexOf(filterAccValue) === 0));
          return this.accounts.filter(option => option.nameAccount.toLowerCase().indexOf(filterAccValue) === 0);
        }
        
        
    displayAccFn(acc?: SubAccount): string | undefined {
            return acc ? acc.nameAccount : undefined;
        }


    cleanForm() {
      const leng = this.addItemArr.length;
      for ( let i = 0; i < leng; i++) {
        this.addItemArr.removeAt(0);
        //  console.log('Valor de ADD ItemArr DENTRO DE FOR ', this.addItemArr);
        
      }
        // this.form.reset();
        this.itemIndex = -1;

      }

  
      
      getBankAcc(bankAcc: BankTransactionIf) {
        this.bankService.getBankAccount(bankAcc.cuenta)
        .subscribe( res => {
          this.bankAccount = res;
          this.form.get('bank.id').setValue(this.bankAccount.id);
          this.addItemArr.controls[0].get('subAccount').setValue(this.bankAccount.subAccount);
         // this.addItemArr.controls[0].get('fechaOperacion').setValue(bankAcc.fechaOperacion);
          this.addItemArr.controls[0].get('debit').setValue(0);
          this.addItemArr.controls[0].get('credit').setValue(bankAcc.retiros.toFixed(2));
         console.log('ARRAY ', this.addItemArr.controls[0]);
         
        
      });
    }

    getAllSubAccounts() {
      this.accountService.getAllSubAccount()
      .subscribe( res => {
        this.accounts = res;
        
      });
    }

    saveData() {
      console.log('FORM SAVE ', this.form);
      const data = JSON.stringify(this.form.value);
      console.log('-----Team in JSON Format-----');
      console.log(data);
      // this.send(data, this.idDto);
      this.sendObject(data, this.idDto);
    }

    sendObject(data: any, id) {
      this.bankTransactionService.createBankTransaction(data, id).subscribe( res => {
        console.log(res);
        swal('Mensaje del Servidor...', `La transaccion fue exitosa`, 'success');
           this.cleanForm();
          },
          error => {
           // console.log(error, '/', error.error);
             swal('Mensaje del Servidor:', `Error!!...error en su evio de datos `, 'error');
          });
    }
}
