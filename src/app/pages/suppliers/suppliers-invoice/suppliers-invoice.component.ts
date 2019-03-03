import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Invoice } from '../../customer/customer.model';
import { ActivatedRoute } from '@angular/router';
import { SuppliersService } from '../suppliers.service';

@Component({
  selector: 'app-suppliers-invoice',
  templateUrl: './suppliers-invoice.component.html',
  styleUrls: ['./suppliers-invoice.component.css']
})
export class SuppliersInvoiceComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['folio', 'fecha', 'fechaPago', 'Total', 'Pago', 'Acciones'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  invoices: Invoice[];
  
  
  constructor(private activatedRoute: ActivatedRoute,
              private supplierService: SuppliersService) {

    this.activatedRoute.params.subscribe( params => {
      
      console.log('Result ', params);
      this.supplierService.getAllInvoiceBySupplier(params['id']).subscribe( result => {

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
