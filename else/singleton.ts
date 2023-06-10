class AccountingDepartment1 {
  private static instance: AccountingDepartment;
  private constructor() {}

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment();
    return this.instance;
  }
}
const accounting1 = AccountingDepartment1.getInstance();
const accounting3 = AccountingDepartment1.getInstance();
console.log(accounting === accounting2);
