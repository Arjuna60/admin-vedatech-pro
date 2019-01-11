import { SubAccount } from '../accounting/accounting.model';
export interface BankTransactionIf {

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
  subAccount: SubAccount ;
}
