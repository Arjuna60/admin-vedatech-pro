import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';
import { BankTransactionIf } from '../bank.model';
import { Subject } from 'rxjs';

declare function init_plugins();
declare function modal_fuction();


@Component({
  selector: 'app-for-review',
  templateUrl: './for-review.component.html',
  styleUrls: ['./for-review.component.css']
})
export class ForReviewComponent implements OnInit {

  banktransaction: BankTransactionIf[];
  changingValue: Subject<BankTransactionIf> = new Subject();


  constructor(private bankService: BankService) {
    this.getAllBankTransaction();
   }

  ngOnInit() {
    init_plugins();
    modal_fuction();
  }


  getAllBankTransaction() {
    this.bankService.getAllBankTransactions()
    .subscribe(resp => {
      // tslint:disable-next-line:semicolon
      console.log(resp);
       this.banktransaction = resp;
      });
      console.log('Bank Transaction', this.banktransaction);
  }


  tellChild(obj: BankTransactionIf) {

    console.log('Bank Trans ', obj);
    this.changingValue.next(obj);
  }


}
