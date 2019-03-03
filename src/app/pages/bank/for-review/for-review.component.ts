import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { BankService } from '../bank.service';
import { BankTransactionIf } from '../bank.model';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddPolizaComponent } from '../add-poliza/add-poliza.component';
import { FormPolizaService } from '../add-poliza/form-poliza.service';
import { SubAccount } from '../../accounting/accounting.model';

declare function init_plugins();
declare function modal_fuction();


@Component({
  selector: 'app-for-review',
  templateUrl: './for-review.component.html',
  styleUrls: ['./for-review.component.css']
})
export class ForReviewComponent implements OnInit {

  banktransaction: BankTransactionIf[];
   @Input() changingValue: Subject<BankTransactionIf[]> = new Subject();
  // updateBankTrans: Subject<BankTransactionIf> = new Subject();


  constructor(private bankService: BankService,
              public formPolizaService: FormPolizaService,
              public dialog: MatDialog,
              ) {
    
            this.getAllBankTransaction();
   }

  ngOnInit() {
    init_plugins();
    modal_fuction();
    
    this.changingValue.subscribe( resp => {
      this.banktransaction = resp;
    });

  }
    
  
   openDialog(obj: any): void {
     this.formPolizaService.insertObj(obj);
     const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
    // dialogConfig.scrollStrategy.enable();
     dialogConfig.width = '80%';
     dialogConfig.height = '100%';
     this.dialog.open(AddPolizaComponent, dialogConfig);
    
   }


  getAllBankTransaction() {
    this.bankService.getAllBankTransactions()
    .subscribe(resp => {
      // tslint:disable-next-line:semicolon
       this.banktransaction = resp;
      });
  }


//   tellChild(obj: BankTransactionIf) {

//     console.log('Bank Trans ', obj);
//  //   this.changingValue.next(obj);
//     this.updateBankTrans.next(obj);
//   }


}
