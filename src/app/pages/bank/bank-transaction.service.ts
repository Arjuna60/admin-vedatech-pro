import { Injectable } from '@angular/core';
import { BankTransaction } from './bank.model';
import { Subject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/urls';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BankTransactionService {

  private _refreshNeeded$ = new Subject<void>();
  private httpHeaders = new HttpHeaders();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  
  constructor(private http: HttpClient) { }
  

  createBankTransaction(bankTransaction: BankTransaction, id: any): Observable<BankTransaction> {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
      // url += '?token=' + this.token;
      return this.http.post<BankTransaction>(URL_SERVICIOS +
         '/api/transaction/addTransaction/' + id, bankTransaction, {headers: this.httpHeaders})
         .pipe(
          tap(() =>  {
            this._refreshNeeded$.next();
          })
         )
         ;
    }

}
