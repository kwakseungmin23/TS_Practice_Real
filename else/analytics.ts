// const button1 = document.querySelector("button")!;
// button1.addEventListener("click", () => {
//   console.log("clicked");
// });
// let name1 = "Michael";
// function callName(name1: any) {
//   console.log(`${name1}`);
// }
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// let, const , var differences
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// const userName = "marx";
// userName = "chris" -> error. can't make reassign.
// const value can't be changed.
// var have only global scope and function scope.
// for example,
// var result; -> higher scope (global scope)
// function add(a: number, b: number) {
// result = a + b; -> function scope
// return result }
// then what about with 'if'
// if(age>20) {var isOld = true;} -> the variables isOld can be recognized.
// with var keyword javascript doesn't know any other scopes than functions & global.
// but when we using let keyword, if(age>20){let isOld = true} -> isOld isn't defined.
//ㅡㅡㅡㅡㅡarrow functionㅡㅡㅡㅡㅡ/
//ㅡㅡㅡㅡfunction's default arguments should come at lastㅡㅡㅡㅡ//
// const add = (a: number, b: number = 1) => {
//   return a + b;
// };
// const printOutput: (a: number | string) => void = (output) => {
//   console.log(output);
// };
// printOutput(add(5));
// const button = document.querySelector("button");
// if (button) {
//   button.addEventListener("click", (event) => {
//     console.log(event);
//   });
// }
//ㅡㅡㅡㅡSpread operatorㅡㅡㅡ>useful for pulling out elements of an array
const hobbies = ["sports", "cook"];
const activeHobbies = ["hiking"];
activeHobbies.push(...hobbies);
const person = {
  firstName: "chris",
  age: 26,
};
const copiedPersonShallow = person; // shallow copy
const copiedPerson = { ...person }; // perfect copy when using ...spread op.
//ㅡㅡㅡrest parametersㅡㅡㅡuseful for accepting unlimited amount of argumentsㅡㅡㅡㅡ
const add = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};
const addedNumbers = add(4, 2, 15, 1);
//ㅡㅡㅡㅡㅡdestructuring means pull elements out of the arrayㅡㅡㅡㅡㅡㅡ>
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
//ㅡㅡㅡdestructuring objectㅡㅡㅡ>values for these keys can be pulled out of the object
const { firstName: userName, age } = person;
//ㅡㅡㅡoverwrote key name firstName=>userNameㅡㅡㅡ
