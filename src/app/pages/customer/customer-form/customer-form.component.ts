import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../customer.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Customer } from '../customer.model';
import { AccountType } from '../../accounting/accounting.model';
import { AccountingService } from '../../accounting/accounting.service';

declare function init_plugins();
declare function modal_fuction();
declare function init_mask();


@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  maxCar = 25;
  form: FormGroup;
  submitted = false;
  @Input() updateSupp: Subject<Customer>;
  IdData: any;
  customer: Customer;
  selectObj: number;
  update: boolean = true;
  disabled: boolean = false;
  accounting: AccountType[];
  allCustomer: Customer[];
  @Input() accountType: Subject<AccountType[]>;

  constructor(private formBuilder: FormBuilder,
    private accountingService: AccountingService,
    private customerService: CustomerService) {
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
      console.log('Customer ', v);
      
      this.customer = v;
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
    console.log('SUBACCOUNT FOR UPDATE ', this.customer);
     this.form.controls['id'].setValue(this.customer.id);
     this.IdData = (<HTMLInputElement>document.getElementById('dataList'));
    try {
      this.IdData.value = String( this.customer.subAccount.id);
      this.form.get('subAccount.id').setValue(this.customer.subAccount.id);
      console.log('ID DATA ', this.IdData.value);
      } catch (error) {
        console.log(error);
          
    }

   
   
    
    this.form.controls['company'].setValue(this.customer.company);
    this.form.controls['displayName'].setValue(this.customer.displayName);
    this.form.controls['firstName'].setValue(this.customer.firstName);
    this.form.controls['email'].setValue(this.customer.email);
    this.form.controls['phone'].setValue(this.customer.phone);
    this.form.controls['mobile'].setValue(this.customer.mobile);
    this.form.controls['balance'].setValue(this.customer.balance);
    this.form.controls['status'].setValue(this.customer.status);

    this.form.controls['street'].setValue(this.customer.street);
    this.form.controls['number'].setValue(this.customer.number);
    this.form.controls['code'].setValue(this.customer.code);
    this.form.controls['city'].setValue(this.customer.city);
    this.form.controls['state'].setValue(this.customer.state);
    this.form.controls['country'].setValue(this.customer.country);



 
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
  this.customerService.createCustomer(data).subscribe( res => {
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
