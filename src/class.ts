class Department {
  private employees: string[] = []; // => private keyword !! class strict able. every property needs to pass through class.
  constructor(private id: string, public name: string) {
    // => inside constructor argument, declare properties with type.
    // this.name = n;
  }
  describe(this: Department) {
    console.log(`Department: ${this.id}: ${this.name}`);
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
    this.id = "c3";
  }
  printEmployeeInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
const account = new Department("1d", "Account");

account.addEmployee("Chris");
account.addEmployee("Charles");

account.describe();
account.printEmployeeInfo();

class ITDepartment extends Department {
  // inheriting
  constructor(id: string, public admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
}
const IT = new ITDepartment("D1", ["Marx"]);
IT.addEmployee("Charles");

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, "IT");
  }
  addReport(text: string) {
    this.reports.push(text);
  }
}
const accounting = new AccountingDepartment("d2", ["Mike"]);

accounting.addReport("Something wrong.");
