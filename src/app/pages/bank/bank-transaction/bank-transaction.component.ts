import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { BankTransactionIf } from '../bank.model';

@Component({
  selector: 'app-bank-transaction',
  templateUrl: './bank-transaction.component.html',
  styleUrls: ['./bank-transaction.component.css']
})
export class BankTransactionComponent implements OnInit {

  @Input() bankTransaction: Subject<BankTransactionIf>;
  constructor() { }

  ngOnInit() {

    this.bankTransaction.subscribe( res => {
      console.log(res);
      
    });
  }

}
