export interface AccountTypeIf {
   name: string;
   account: string ;
   balance: number;
   subAccount: [{
      nameAccount: string;
      accountNumber: string;
      balance: number;
   }];
   state: boolean;
}

export class AccountType {
   public id: number;
   public name: string;
   public account: string;
   public balance: number;
   public subAccount: SubAccount;
   public state: boolean;

}

export class SubAccount {
   public id: number;
   public nameAccount: string;
   public accountNumber: string;
   public balance: number;
   public accountType: AccountType;
   public status: boolean;

}
