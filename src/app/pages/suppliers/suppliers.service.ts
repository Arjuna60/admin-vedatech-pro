import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpEvent, HttpHeaders, HttpRequest, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/urls';
import { Supplier } from './supplier.model';
import { Invoice } from '../customer/customer.model';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }


 // http: any;
 private httpHeaders = new HttpHeaders();
 private urlEndUpdate = URL_SERVICIOS + '/api/account/findById';
 private urlDeleteEnd = URL_SERVICIOS + '/api/account/deleteById';


  constructor(private http: HttpClient) { }
 
   // Otra opcion para mandar file
   pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    this.httpHeaders = new HttpHeaders({'Accept': 'application/json'});
    formdata.append('file', file);
    console.log('FORM DATA ', formdata);
    
    const req = new HttpRequest('POST', 'http://localhost:8080/api/upload/supplier-file', formdata,  {
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


  sendXmlSupplierInvoice(fileXml: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/xml'});
    formdata.append('file', fileXml);
    console.log('FORM DATA ', formdata);
    const req = new HttpRequest('POST', 'http://localhost:8080/api/supplier/send-xml-file', fileXml,  {
      headers: this.httpHeaders,
      reportProgress: true,
      // responseType: 'text'
    });
    return this.http.request(req).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );

    // this.httpHeaders = new HttpHeaders({'Content-Type': 'application/xml'});
    // // url += '?token=' + this.token;
    // return this.http.post<any>(URL_SERVICIOS +
    //    '/api/supplier/send-xml-file', fileXml, {headers: this.httpHeaders});
  }

  createSupplier(object: Supplier): Observable<Supplier> {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
      // url += '?token=' + this.token;
      return this.http.post<Supplier>(URL_SERVICIOS +
         '/api/supplier/addSupplier/', object, {headers: this.httpHeaders})
         .pipe(
          tap(() =>  {
            this._refreshNeeded$.next();
          })
         );
    }

    
    updateSupplier(object: Supplier): Observable<Supplier> {
      this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        // url += '?token=' + this.token;
        return this.http.post<Supplier>(URL_SERVICIOS +
           '/api/supplier/update', object, {headers: this.httpHeaders})
           .pipe(
            tap(() =>  {
              this._refreshNeeded$.next();
            })
           )
           ;
      }
  


  getAllSuppliers(): Observable<Supplier[]> {
    console.log('GET ALL ACCOUNTS TYPE');
    
     this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
      // url += '?token=' + this.token;
      return this.http.get<Supplier[]>(URL_SERVICIOS + '/api/supplier/getAllSuppliers', {headers: this.httpHeaders});
      
    }

    sendXmlCustomerInvoice(fileXml: File): Observable<any> {
      const url = URL_SERVICIOS + '/api/customer/sendXmlFile/';
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/xml'});
      // url += '?token=' + this.token;
      return this.http.post<any>(URL_SERVICIOS +
         '/api/customer/send-xml-file', fileXml, {headers: this.httpHeaders});
    }

  

    
    getAllInvoiceBySupplier(id: any): Observable<Invoice[]> {
      console.log('GET ALL ACCOUNTS TYPE');
      
       this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        // url += '?token=' + this.token;
        return this.http.post<Invoice[]>(URL_SERVICIOS + '/api/supplier/getAllInvoiceBySupplier/' + id, {headers: this.httpHeaders});
        
      }

}
