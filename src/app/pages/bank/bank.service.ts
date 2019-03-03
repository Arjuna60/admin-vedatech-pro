import { Injectable } from '@angular/core';
import { HttpHeaders, HttpEvent, HttpRequest, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/urls';
import { map, tap } from 'rxjs/operators';
import { BankTransactionIf, BankAccount } from './bank.model';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  
  private httpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }


  createBankAccount(bankAccount: BankAccount): Observable<BankAccount> {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
      // url += '?token=' + this.token;
      return this.http.post<BankAccount>(URL_SERVICIOS +
         '/api/bank/addBankAccount/', bankAccount, {headers: this.httpHeaders})
         .pipe(
          tap(() =>  {
            this._refreshNeeded$.next();
          })
         )
         ;
    }


    updateBankAccount(bankAccount: BankAccount): Observable<BankAccount> {
      this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        // url += '?token=' + this.token;
        return this.http.put<BankAccount>(URL_SERVICIOS +
           '/api/bank/update', bankAccount, {headers: this.httpHeaders})
           .pipe(
            tap(() =>  {
              this._refreshNeeded$.next();
            })
           )
           ;
      }


  getAllBankTransactions(): Observable<BankTransactionIf[]> {
     this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
      // url += '?token=' + this.token;
      return this.http.get<BankTransactionIf[]>(URL_SERVICIOS + '/api/dto/getAllBankTransaction/', {headers: this.httpHeaders})
      .pipe(
        map(response => response as BankTransactionIf[]));
    }


     // Otra opcion para mandar file
     pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
      const formdata: FormData = new FormData();
      this.httpHeaders = new HttpHeaders({'Accept': 'application/json'});
      formdata.append('file', file);
      console.log('FORM DATA ', formdata);
      const req = new HttpRequest('POST', 'http://localhost:8080/api/upload/bank-transaction-file', formdata,  {
        headers: this.httpHeaders,
        reportProgress: true,
        responseType: 'text'
      });
      return this.http.request(req);
    }


     // Otra opcion para mandar file
     uploadJsonFile(file: File): Observable<HttpEvent<{}>> {
      const formdata: FormData = new FormData();
      this.httpHeaders = new HttpHeaders({'Accept': 'application/json'});
      formdata.append('file', file);
      console.log('FORM DATA ', formdata);
      const req = new HttpRequest('POST', 'http://localhost:8080/api/upload/bank-transaction-file', formdata,  {
        headers: this.httpHeaders,
        reportProgress: true,
        responseType: 'text'
      });
      return this.http.request(req);
    }

    getAllBankAccounts(): Observable<BankAccount[]> {
      console.log('GET ALL ACCOUNTS TYPE');
      
       this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        // url += '?token=' + this.token;
        return this.http.get<BankAccount[]>(URL_SERVICIOS + '/api/bank/getAllBankAccounts/', {headers: this.httpHeaders});
        
      }
  

      getBankAccount(bank: string): Observable<BankAccount> {
        console.log('GET ALL ACCOUNTS TYPE');
        
         this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
          // url += '?token=' + this.token;
          return this.http.post<BankAccount>(URL_SERVICIOS + '/api/bank/getBankAccount', bank, {headers: this.httpHeaders});
          
        }

}
