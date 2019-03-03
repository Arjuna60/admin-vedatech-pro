import { SubAccount } from '../accounting/accounting.model';


export class Supplier {

  public id: number;
  public company: string;
  public displayName: boolean;
  public city: string;
  public country: string;
  public firstName: string;
  public lastName: string;
  public supplierRfc: string;
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
  public balanceToday: number;
  public status: boolean;
  public subAccount: SubAccount;
}
