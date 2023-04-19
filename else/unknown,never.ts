let userInput: unknown; // we do not know
// let userInput: any; // it can be assigned
let userName: string;
userInput = 54;
userInput = "text"; // no error using unknown
if (typeof userInput == "string") {
  userName = userInput; //error => the type unknown is not assignable to type string.
}
//so the unknown is better than any because its not asignnable.

function generateError(msg: string, code: number): never {
  throw { msg, errorCode: code }; //type that never return anything.
  while (true) {}
}
const result = generateError("an error occured", 500);
console.log(result);
const button = document.querySelector("button")!;
button.addEventListener("click", () => {
  //how does typescript know addEventLister? because of the lib[] option in tsconfig.json
  console.log("clicked");
});
