import { Component, OnInit } from '@angular/core';
import { BankTransactionIf } from './bank.model';
import { BankService } from './bank.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  name = '';
  selectedFile: File = null;
  banktransaction: BankTransactionIf[];
  progress: { percentage: number } = { percentage: 0 };
  currentFileUpload: File = null;



  constructor(private bankService: BankService) {
    this.getAllBankTransaction();
   }

  ngOnInit() {
  }

  onFileSelected(event) {
    console.log('This file', event);
   // this.selectedFile1 = <File>event.target.files[0];
   this.selectedFile = <File>event.target.files[0];
    this.name = this.selectedFile.name;
   console.log('Selected File ', this.selectedFile);
  }

  cancelFile() {
    this.selectedFile = null;
    this.name = null;
    console.log('Cancel File', this.selectedFile);

  }

  onUploadTxtFile() {
    console.log('LISTO PARA SER ENVIADO');
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    console.log('FILE TO BE SEND ', this.selectedFile.name);
      this.bankService.pushFileToStorage(this.selectedFile).subscribe(
        res => {
          console.log(res);
        }
      );

      this.progress.percentage = 0;
      this.currentFileUpload = this.selectedFile;
      this.bankService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
        }
      });

      this.selectedFile = undefined;
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


}
