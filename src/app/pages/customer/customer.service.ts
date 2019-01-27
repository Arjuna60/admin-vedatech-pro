import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpEvent, HttpRequest, HttpHeaders, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Customer } from './customer.model';
import { URL_SERVICIOS } from 'src/app/config/urls';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private _refreshNeeded$ = new Subject<void>();
  httpHeaders: HttpHeaders;

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor(private http: HttpClient) { }


  // Otra opcion para mandar file
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    this.httpHeaders = new HttpHeaders({'Accept': 'application/json'});
    formdata.append('file', file);
    console.log('FORM DATA ', formdata);
    
    const req = new HttpRequest('POST', 'http://localhost:8080/api/upload/customer-file', formdata,  {
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


  getAllCustomers(): Observable<Customer[]> {
    console.log('GET ALL ACCOUNTS TYPE');
    
     this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
      // url += '?token=' + this.token;
      return this.http.get<Customer[]>(URL_SERVICIOS + '/api/customer/getAllCustomers', {headers: this.httpHeaders});
      
    }

    createCustomer(object: Customer): Observable<Customer> {
      this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        // url += '?token=' + this.token;
        return this.http.post<Customer>(URL_SERVICIOS +
           '/api/customer/addCustomer', object, {headers: this.httpHeaders})
           .pipe(
            tap(() =>  {
              this._refreshNeeded$.next();
            })
           )
           ;
      }
  


}
