import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { BankTransactionIf, BankTransaction, BankAccount } from '../bank.model';
import { Subject, Observable } from 'rxjs';
import { AccountingService } from '../../accounting/accounting.service';
import {AccountingDetails, AccountPolicy, AccountType} from '../../accounting/accounting.model';
import { BankService } from '../bank.service';
import { startWith, map } from 'rxjs/operators';
import {MatDialogRef} from '@angular/material';
import { FormPolizaService } from './form-poliza.service';
import { BankTransactionService } from '../bank-transaction.service';

declare function init_plugins();
declare function modal_fuction();

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-add-poliza',
  templateUrl: './add-poliza.component.html',
  styleUrls: ['./add-poliza.component.css']
})
export class AddPolizaComponent implements OnInit {
 
  bankTransObj = {
    'id': '',
    'fechaOperacion': '',
    'fecha':  '',
    'referencia':  '',
    'descripcion': '',
    'codTransac':   '',
    'sucursal':  '',
    'depositos':  '',
    'retiros':  '',
    'saldo':  '',
    'movimiento':  '',
    'descripcionDetallada':  '',
    'bank': {},
    'AccountPolicy': []
  };
  


  constructor(public formService: FormPolizaService,
              public bankTransService: BankTransactionService,
              private dialogRef: MatDialogRef<AddPolizaComponent>) {
             
                
              }
              
              ngOnInit() {
                init_plugins();
                modal_fuction();
                this.formService.addItem();
      const currentDate = new Date().toISOString().substring(0, 10);
  }
  

  onClose() {
    this.formService.cleanForm();
    this.dialogRef.close();
  }
  

  onSubmit() {
    this.formService.saveData();
    // console.log('FORM SAVE ', this.formService.form);
    // const data = JSON.stringify(this.formService.form.value);
    // console.log('-----Team in JSON Format-----');
    // console.log(data);
    // this.send(data);
  }

  // send(data: any) {
  //   this.bankTransService.createBankTransaction(data).subscribe( res => {
  //     console.log(res);
  //     swal('Mensaje del Servidor...', `La transaccion fue exitosa`, 'success');
  //        this.cleanForm();
  //       },
  //       error => {
  //        // console.log(error, '/', error.error);
  //          swal('Mensaje del Servidor:', `Error!!...error en su evio de datos `, 'error');
  //       });
  // }

  cleanForm() {
    // console.log('This form despues de borrar items ', this.form);
    // this.form.reset();
    // this.getAllData();
    this.formService.cleanForm();
}




}
