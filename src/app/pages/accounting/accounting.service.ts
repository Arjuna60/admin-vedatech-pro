import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AccountTypeIf, AccountType, SubAccount } from './accounting.model';
import { ACCOUNTING_SERVICE } from 'src/app/config/urls';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest} from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/urls';

@Injectable({
  providedIn: 'root'
})
export class AccountingService {
  
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }


 // http: any;
 private httpHeaders = new HttpHeaders();
 private urlEndUpdate = URL_SERVICIOS + '/api/account/findById';
 private urlDeleteEnd = URL_SERVICIOS + '/api/account/deleteById';


  constructor(private http: HttpClient) { }


  createSubAccount(subAccount: SubAccount): Observable<SubAccount> {
  this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    // url += '?token=' + this.token;
    return this.http.post<SubAccount>(URL_SERVICIOS +
       '/api/account/addSubAccount/', subAccount, {headers: this.httpHeaders});
  }


  updateSubAccount(subAccount: SubAccount): Observable<SubAccount> {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
      // url += '?token=' + this.token;
      return this.http.put<SubAccount>(URL_SERVICIOS +
         '/api/account/addSubAccount/', subAccount, {headers: this.httpHeaders});
    }


    deleteSubAccount(subaccount: SubAccount): Observable<SubAccount> {
      this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        // url += '?token=' + this.token;
        return this.http.delete<SubAccount>(`${this.urlDeleteEnd}/${subaccount.id}`, {headers: this.httpHeaders});
      }
  

  findByIdSubAccount( subaccount: SubAccount): Observable<SubAccount> {
  this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    // url += '?token=' + this.token;
    return this.http.get<SubAccount>(`${this.urlEndUpdate}/${subaccount.id}`, { headers: this.httpHeaders});
  }
  

  getAllAccountsType(): Observable<AccountType[]> {
    console.log('GET ALL ACCOUNTS TYPE');
    
     this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
      // url += '?token=' + this.token;
      return this.http.get<AccountType[]>(URL_SERVICIOS + '/api/account/getAllAccountsType/', {headers: this.httpHeaders});
      
    }

   
    // .pipe( map(response => response as AccountType[]))
     
    // Otra opcion para mandar file
     pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
      const formdata: FormData = new FormData();
      this.httpHeaders = new HttpHeaders({'Accept': 'application/json'});
      formdata.append('file', file);
      console.log('FORM DATA ', formdata);
      
      const req = new HttpRequest('POST', 'http://localhost:8080/api/upload/accounting-type-file', formdata,  {
        headers: this.httpHeaders,
        reportProgress: true,
        responseType: 'text'
      });
      return this.http.request(req).pipe(
        tap(() =>  {
          this._refreshNeeded$.next();
        })
      );
    }
}
