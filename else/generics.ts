// const app: Array<string | number> = ["d", 1];
// Generics
// const promise: Promise<number> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(10);
//   }, 2000);
// });
// promise.then((data) => {
//   data.toString();
// });
// generic function + generic constraints with 'extends' keyword
// function merge<T extends object, U>(obj1: T, obj2: U) {
//   return Object.assign(obj1, obj2);
// }
// const mergedObj = merge({ name: "Max", hobbies: ["workout"] }, { age: 30 });
// const mergedObj = merge<{name:string,hobbies:string[]}, {age:number}>({name:'Max', hobbies:['workout']}, {age: 30});

// console.log(mergedObj.age);

// ㅡㅡㅡ generic function2
// interface Lengthy {
//   length: number;
// }

// function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
//   let descriptionText = "No value";
//   if (element.length === 1) {
//     descriptionText = "theres one element.";
//   } else if (element.length > 1) {
//     descriptionText = "theres " + element.length + "elements.";
//   }
//   return [element, descriptionText];
// }

// ㅡㅡㅡkeyof constraints
// function extractAndConvert<T extends object, U extends keyof T>(
//   obj: T,
//   key: U
// ) {
//   return "Converted = " + obj[key];
// }
// extractAndConvert({ name: "goobling" }, "name");
// extractAndConvert({ name: "james" }, "name");
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡthe generic class, very flexible.
// class DataStorage<T extends string | number | boolean> {
//   private data: T[] = [];

//   addItem(item: T) {
//     this.data.push(item);
//   }

//   removeItem(item: T) {
//     if (this.data.indexOf(item) === -1) {
//       return;
//     }
//     this.data.splice(this.data.indexOf(item), 1); // -1
//   }

//   getItems() {
//     return [...this.data];
//   }
// }

// const textStorage = new DataStorage<string>();
// textStorage.addItem("1");
// textStorage.addItem("Manu");
// textStorage.removeItem("Max");
// console.log(textStorage.getItems());

// const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const maxObj = {name: 'Max'};
// objStorage.addItem(maxObj);
// objStorage.addItem({name: 'Manu'});
// // ...
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡthe generic utility => partial<type>
// interface CourseGoal {
//   title: string;
//   desc: string;
//   completeUntil: Date;
// }
// function createCourseGoal(title: string, desc: string, date: Date) {
//   let courseGoal: Partial<CourseGoal> = {};
//   courseGoal.title = title;
//   courseGoal.desc = desc;
//   courseGoal.completeUntil = date;
//   return courseGoal as CourseGoal;
// }
// CourseGoal 인터페이스 자체를 타입으로 partial <type> 으로 선언해서 해당 변수의 프로퍼티들을 옵셔널하게 변경합니다.
// 그래서 courseGoal 객체를 빈 객체로 선언하고 후에 프로퍼티를 추가할 수 있게됩니다.
// 일시적으로 인터페이스 타입의 프로퍼티를 옵셔널하게 적용하고 싶을 때 사용합니다.

// const names2: Readonly<string[]> = ["marx", "charles"];
// names2.push("collington");
// names2.pop();
