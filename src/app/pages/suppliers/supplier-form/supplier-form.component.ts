import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Supplier } from '../supplier.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { AccountType } from '../../accounting/accounting.model';
import { AccountingService } from '../../accounting/accounting.service';
import { SuppliersService } from '../suppliers.service';

declare function init_plugins();
declare function modal_fuction();
declare function init_mask();

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {

  maxCar = 25;
  form: FormGroup;
  submitted = false;
  @Input() updateSupp: Subject<Supplier>;
  IdData: any;
  supplier: Supplier;
  selectObj: number;
  update: boolean = true;
  disabled: boolean = false;
  accounting: AccountType[];
  @Input() accountType: Subject<AccountType[]>;

  constructor(private formBuilder: FormBuilder,
    private accountingService: AccountingService,
    private supplierService: SuppliersService) {
      this.loadAccounting();
      this.createForm();
      
    }
    
    
    ngOnInit() {
      
      console.log('AL CARGAR FORM ES ', this.createForm());
    init_plugins();
    modal_fuction();
    init_mask();

    this.updateSupp.subscribe (v => {
      console.log('value SubAccount Observable value', v);
      console.log('SUPPLIER ', v);
      
      this.supplier = v;
      try {
       this.selectObj = v.subAccount.id;
      } catch (error) {
        console.log('NO VALUE ID');
          
      }
      console.log('NEW VALUE SELECTOBJ ', this.selectObj);
      this.update = false;
      this.updateForm();
   });

  
  }

  updateForm() {
    console.log('SUBACCOUNT FOR UPDATE ', this.supplier);
     this.form.controls['id'].setValue(this.supplier.id);
     this.IdData = (<HTMLInputElement>document.getElementById('dataList'));
    try {
      this.IdData.value = String( this.supplier.subAccount.id);
      this.form.get('subAccount.id').setValue(this.supplier.subAccount.id);
      console.log('ID DATA ', this.IdData.value);
      } catch (error) {
        console.log(error);
          
    }

   
   
    
    this.form.controls['company'].setValue(this.supplier.company);
    this.form.controls['displayName'].setValue(this.supplier.displayName);
    this.form.controls['firstName'].setValue(this.supplier.firstName);
    this.form.controls['email'].setValue(this.supplier.email);
    this.form.controls['phone'].setValue(this.supplier.phone);
    this.form.controls['mobile'].setValue(this.supplier.mobile);
    this.form.controls['balance'].setValue(this.supplier.balance);
    this.form.controls['status'].setValue(this.supplier.status);

    this.form.controls['street'].setValue(this.supplier.street);
    this.form.controls['number'].setValue(this.supplier.number);
    this.form.controls['code'].setValue(this.supplier.code);
    this.form.controls['city'].setValue(this.supplier.city);
    this.form.controls['state'].setValue(this.supplier.state);
    this.form.controls['country'].setValue(this.supplier.country);



 
 }

 createForm() {

  this.form = this.formBuilder.group({
    subAccount: new FormGroup({
      id: new FormControl('1', [Validators.required]),
    }),
                 id: new FormControl(''),
              title: new FormControl(''),
            company: new FormControl('', [Validators.required, Validators.maxLength(60)]),
        displayName: new FormControl('', [Validators.required, Validators.maxLength(this.maxCar)]),
          firstName: new FormControl(''),
           lastName: new FormControl(''),
             mobile: new FormControl(''),
              phone: new FormControl(''),
              email: new FormControl('', [Validators.email]),
            website: new FormControl(''),
             street: new FormControl(''),
             number: new FormControl(''),
               code: new FormControl(''),
               city: new FormControl(''),
              state: new FormControl(''),
            country: new FormControl(''),
       shippingCity: new FormControl(''),
       shippingCode: new FormControl(''),
    shippingCountry: new FormControl(''),
      shippingState: new FormControl(''),
     shippingStreet: new FormControl(''),
            balance: new FormControl('0.00', [Validators.required, Validators.pattern(/^[.\d]+$/)]),
             status: new FormControl('true', [Validators.required])
});
}

change(event) {
  this.form.get('subAccount.id').setValue(event.target.value);
  console.log(this.form);
}

get f() { return this.form.controls; }

loadAccounting() {
  this.accountingService.getAllAccountsType()
  .subscribe(resp => {
    // tslint:disable-next-line:semicolon
     this.accounting = resp;
     console.log('ACCOUNTING ', this.accounting);
     
    });
}

onSubmit() {
  this.submitted = true;
  console.log('FORM SAVE ', this.form);
  if (this.form.invalid) {
    return;
}
  const data = JSON.stringify(this.form.value);
  console.log('-----Team in JSON Format-----');
  console.log(data);
  this.send(data);
}


// updateform() {
//   console.log('FORM SAVE ', this.form);
//   const data = JSON.stringify(this.form.value);
//   console.log('-----Team in JSON Format-----');
//   console.log(data);
//   this.send(data);
// }

cancel() {
  this.form.reset();
 // this.form.pristine = true;
  this.submitted = false;
  this.IdData = 1;
  this.form.get('subAccount.id').setValue('1');
  this.form.controls['balance'].setValue('0.00');
  this.form.controls['status'].setValue(true);

  
}

// cleanForm() {
//   console.log('This form despues de borrar items ', this.form);
//   this.form.reset();

// }



send(data: any) {
  this.supplierService.createSupplier(data).subscribe( res => {
    console.log(res);
    swal('Mensaje del Servidor...', `La transaccion fue exitosa`, 'success');
       this.cancel();
      },
      error => {
       // console.log(error, '/', error.error);
         swal('Mensaje del Servidor:', `Error!!...El numero de la cuenta: ${data.nameBank} ya existe `, 'error');
      });
      this.IdData = 1;
}



}
