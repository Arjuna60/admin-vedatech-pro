import { SubAccount } from '../accounting/accounting.model';


export class Customer {

  public id: number;
  public company: string;
  public displayName: boolean;
  public customerRfc;
  public city: string;
  public country: string;
  public firstName: string;
  public lastName: string;
  public mobile: string;
  public number: number;
  public phone: string;
  public email: string;
  public code: string;
  public shippingCity: string;
  public shippingCode: string;
  public shippingCountry: string;
  public shippingState: string;
  public shippingStreet: string;
  public state: string;
  public street: string;
  public title: string;
  public website: string;
  public balance: number;
  public status: boolean;
  public subAccount: SubAccount;
}

export class Invoice {

public id: number;  
public fecha: Date;
public fechaPago: Date;
public condicionesDePago: string;
public  subTotal: number;
public  total: number;
public  pago: number;
public folio: string;
public customer: Customer;
public invoiceItems: InvoiceItems;


} 

export class InvoiceItems {
    public cantidad: number;
    public descripcion: string;
    public valorUnitario: number;
    public importe: number;
}
