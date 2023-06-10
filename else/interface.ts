// interface Person {
//   name: string;
//   age: number;
//   height: number;
//   greet(phrase: string): void;
// }

// let user1: Person; // we can use interface as a type

// user1 = {
//   name: "Chris",
//   age: 30,
//   greet(phrase: string) {
//     console.log(`${phrase} ${this.name}`);
//   },
//   height: 160,
// };
// user1.greet("Hi, I am");

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡinterface
// interface Greetable {
//   greet(phrase: string): void;
// }
// interface Call {
//   call(): void;
//   phoneNumber: string | number;
// }
// class Person implements Greetable, Call {
//   name: string;

//   phoneNumber: number;

//   constructor(n: string, p: number) {
//     this.name = n;
//     this.phoneNumber = p;
//   }

//   greet(phrase: string) {
//     console.log(phrase + " " + this.name);
//   }
//   call() {
//     console.log(`${this.phoneNumber} calling.`);
//   }
// }

// let user2: Greetable & Call = new Person("Chris", 25915224);
// user2.greet("Hi there - I am");
// user2.call();
// console.log(user2);
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡconcept of type guards
// type Admin = {
//   name: string;
//   privileges: string[];
// };

// type Employee = {
//   name: string;
//   startDate: Date;
// };

// // interface ElevatedEmployee extends Employee, Admin {}

// type ElevatedEmployee = Admin & Employee;

// const e1: ElevatedEmployee = {
//   name: "Max",
//   privileges: ["create-server"],
//   startDate: new Date(),
// };

// type Combinable = string | number;
// type Numeric = number | boolean;

// type Universal = Combinable & Numeric;
// // function add(a: number, b: number): number;
// // function add(a: string, b: string): string;
// // function add(a: string, b: number): string;
// // function add(a: number, b: string): string;
// function add(a: Combinable, b: Combinable) {
//   if (typeof a === "string" || typeof b === "string") {
//     return a.toString() + b.toString();
//   }
//   return a + b;
// }
// const result = add("max", "charles");
// const result2 = add(1, 2);
// const result3 = add("1", 2);

// const fetchedUserData = {
//   id: "abc12345",
//   name: "minsu kim",
//   job: { title: "cto", desc: "it tech company" },
//   undefined,
// };
// const jobTitle = fetchedUserData?.job?.title;
// console.log(jobTitle);
// ㅡㅡㅡㅡㅡㅡ ?.optional chaining, ?? nullish coalescing
// const a = undefined;
// const b = a ?? "default";
// console.log(b);

// type UnknownEmployee = Employee | Admin;

// function printEmployeeInformation(emp: UnknownEmployee) {
//   console.log("Name: " + emp.name);
//   if ("privileges" in emp) {
//     console.log("Privileges: " + emp.privileges);
//   }
//   if ("startDate" in emp) {
//     console.log("Start Date: " + emp.startDate);
//   }
// }

// printEmployeeInformation({ name: "Manu", startDate: new Date() });
// printEmployeeInformation(e1);

// class Car {
//   drive() {
//     console.log("Driving...");
//   }
// }

// class Truck {
//   drive() {
//     console.log("Driving a truck...");
//   }

//   loadCargo(amount: number) {
//     console.log("Loading cargo ..." + amount);
//   }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();

// function useVehicle(vehicle: Vehicle) {
//   vehicle.drive();
//   if (vehicle instanceof Truck) {
//     // 여기 if 문 안에, 인자의 타입을 확인해서 로직을 수행하는 타입 가드의 개념이 구현되어 있습니다.
//     vehicle.loadCargo(1000);
//   }
// }

// useVehicle(v1);
// useVehicle(v2);
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡdiscriminated union
// interface Bird {
//   type: "bird";
//   flyingSpeed: number;
// }

// interface Horse {
//   type: "horse";
//   runningSpeed: number;
// }

// type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//   let speed;
//   switch (animal.type) {
//     case "bird":
//       speed = animal.flyingSpeed;
//       break;
//     case "horse":
//       speed = animal.runningSpeed;
//   }
//   console.log("Moving at speed: " + speed);
// }

// moveAnimal({ type: "bird", flyingSpeed: 10 });
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡindex properties
// interface ErrorContainer {
//   // { email: 'Not a valid email', username: 'Must start with a character!' }
//   [prop: string | number]: string;
// }

// const errorBag: ErrorContainer = {
//   email: "Not a valid email!",
//   username: "Must start with a capital character!",
// };
