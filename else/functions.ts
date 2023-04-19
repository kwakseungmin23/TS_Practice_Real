// function add(n1: number, n2: number) : string {
//     return n1 + n2;
// }

function add(n1: number, n2: number) : number {
    return n1 + n2;
}
// undefined is a type in typescript, undefined is a value in javascript. undefined is not a void.
function printResult(num: number) : void{ // do not have return value.
    console.log('result: ' + num);
}
// void. function that not return the value 
printResult(add(5, 22));
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) { 
    const result = n1 + n2;
    cb(result);
} // parameters are enforced, strictful regarding the number and type of params
//of callback functions and doesn't care about return type.
// function printResult2(num: number) : undefined{
//     console.log('result: ' + num);
//     return;
// }
let combineValues: (a: number, b: number) => number; // SO
// let combineValues; //combineValues is any ! it sholud hold function 
combineValues = add;
// combineValues = printResult; // Success can't assign  
// combineValues = printResult;//specify function needs!!! => function types require.
addAndHandle(10, 20, (result) => {
    console.log(result)
});
 
