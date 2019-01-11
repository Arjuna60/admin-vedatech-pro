import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';
import { BankTransactionIf } from '../bank.model';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-bank',
  templateUrl: './upload-bank.component.html',
  styleUrls: ['./upload-bank.component.css']
})
export class UploadBankComponent implements OnInit {

  selectedFile: File = null;
  name = '';
  progress: { percentage: number } = { percentage: 0 };
  currentFileUpload: File = null;
  movements: BankTransactionIf[];
 // accountType: Subject<AccountType[]> = new Subject();


  constructor(public bankService: BankService,
              private router: Router) { }

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
  this.bankService.pushFileToStorage(this.currentFileUpload).subscribe(event => {

    if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
        this.router.navigate(['/bank']);
      }

  });
  this.selectedFile = undefined;
  this.loadAccounting();
}


 /*----------- Http carga Array de objetos del tipo AccountType -------------*/
 loadAccounting() {
  this.bankService.getAllBankTransactions()
  .subscribe(resp => {
    // tslint:disable-next-line:semicolon
  this.movements = resp;
  });
 
}


 /*----------- Cancela enviar Archivo -------------*/
 cancelFile() {
  this.selectedFile = null;
  this.name = null;
  console.log('Cancel File', this.selectedFile);
}


}
