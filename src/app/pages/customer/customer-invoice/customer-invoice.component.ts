import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Invoice } from '../customer.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-customer-invoice',
  templateUrl: './customer-invoice.component.html',
  styleUrls: ['./customer-invoice.component.css']
})
export class CustomerInvoiceComponent implements OnInit {
  
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['folio', 'fecha', 'fechaPago', 'Total', 'Pago', 'Acciones'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  invoices: Invoice[];
  
  
  constructor(private activatedRoute: ActivatedRoute,
              private customerService: CustomerService) {

    this.activatedRoute.params.subscribe( params => {
      
      console.log('Result ', params);
      this.customerService.getAllInvoiceByCustomer(params['id']).subscribe( result => {

        this.invoices = result ;
        console.log('INVOICES ', this.invoices);
        this.listData = new MatTableDataSource(this.invoices);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        
      });
      
    });
   }

  ngOnInit() {

  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

}
