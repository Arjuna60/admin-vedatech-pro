import { SubAccount, AccountPolicy } from '../accounting/accounting.model';
import { Optional } from '@angular/core';


export interface BankTransactionIf {
  id: number;
  cuenta: string;
  fechaOperacion: string;
  fecha: string;
  referencia: string;
  descripcion: string;
  codTransac: string;
  sucursal: string;
  depositos: number;
  retiros: number;
  saldo: number;
  movimiento: string;
  descripcionDetallada: string;
  bank: {};
  poliza: [];

}

export class BankTransaction {

  public id: number;
  public fechaOperacion: string;
  public fecha: string;
  public referencia: string;
  public descripcion: string;
  public codTransac: string;
  public sucursal: string;
  public depositos: number;
  public retiros: number;
  public saldo: number;
  public movimiento: string;
  public descripcionDetallada: string;
  public bank: BankAccount;
  public AccountPolicy: AccountPolicy[];

}

export interface BankAccount {
  id: number;
  nameBank: string;
  accountNumber: number;
  address: string;
  email: string;
  phone: string;
  observation: string;
  balance: number;
  balanceToday: number;
  subAccount: SubAccount ;
}

