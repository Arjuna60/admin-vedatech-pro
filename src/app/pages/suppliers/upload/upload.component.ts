import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { RouterModule, Router } from '@angular/router';
import swal from 'sweetalert';
import { AccountType } from '../../accounting/accounting.model';
import { AccountingService } from '../../accounting/accounting.service';
import { SuppliersService } from '../suppliers.service';
import { Supplier } from '../supplier.model';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  
  selectedFile: File = null;
  name = '';
  progress: { percentage: number } = { percentage: 0 };
  currentFileUpload: File = null;
  accounting: Supplier[];
  accountType: Subject<Supplier[]> = new Subject();

  constructor(private supplierService: SuppliersService,
              private router: Router  ) { }

  ngOnInit() {
  }

  
  /*----------- Selecciona Archivo AccountType en formato CSV para ser Enviado -------------*/
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    try {
      this.name = this.selectedFile.name;
      console.log(this.selectedFile.name.split('.'));
      if( this.name.split('.')[1] !== 'csv') {
        console.log('ERROR!');
        this.cancelFile();
      swal('Error!', 'Cancelar y seleccionar un archivo con formato CSV', 'warning');
        
      } else {
        console.log('go ahead');
        
      }
    } catch (error) {
      console.log(error);
      this.cancelFile();
      swal('Error!', 'Cancelar y seleccionar un archivo nuevo!', 'warning');
    }

   
    
}


 /*----------- Envia Archivo AccountType en formato CSV al Servidor -------------*/
 onUploadTxtFile() {
  const fd = new FormData();
  try {
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFile;
    this.supplierService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
  
      if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          this.router.navigate(['/suppliers']);
        }
  
    });
    this.selectedFile = undefined;
    this.loadAccounting();
    
  } catch (error) {
    swal('Error!', 'Seleccionar un archivo en Format CSV para ser enviado!', 'warning');
    
  }
 
}


 /*----------- Http carga Array de objetos del tipo AccountType -------------*/
 loadAccounting() {
  this.supplierService.getAllSuppliers()
  .subscribe(resp => {
    // tslint:disable-next-line:semicolon
  this.accounting = resp;
  this.accountType.next(this.accounting);    // Se envia al SubAccount Component
  });
 
}


 /*----------- Cancela enviar Archivo -------------*/
 cancelFile() {
  this.selectedFile = null;
  this.name = null;
  console.log('Cancel File', this.selectedFile);
}

}
