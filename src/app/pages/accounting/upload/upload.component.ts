import { Component, OnInit } from '@angular/core';
import { AccountType } from '../accounting.model';
import { AccountingService } from '../accounting.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { RouterModule, Router } from '@angular/router';

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
  accounting: AccountType[];
  accountType: Subject<AccountType[]> = new Subject();

  constructor(private accountingService: AccountingService,
              private router: Router  ) { }

  ngOnInit() {
  }

  
  /*----------- Selecciona Archivo AccountType en formato CSV para ser Enviado -------------*/
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.name = this.selectedFile.name;
}


 /*----------- Envia Archivo AccountType en formato CSV al Servidor -------------*/
 onUploadTxtFile() {
  const fd = new FormData();
  fd.append('file', this.selectedFile, this.selectedFile.name);
  this.progress.percentage = 0;
  this.currentFileUpload = this.selectedFile;
  this.accountingService.pushFileToStorage(this.currentFileUpload).subscribe(event => {

    if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
        this.router.navigate(['/accounting']);
      }

  });
  this.selectedFile = undefined;
  this.loadAccounting();
}


 /*----------- Http carga Array de objetos del tipo AccountType -------------*/
 loadAccounting() {
  this.accountingService.getAllAccountsType()
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
