//what is modules--Module is same as the javacript libraries
//we can add the set of function in our application
//For using the module we can import the function using (require) keyword;

const data=require("./export.js");
// console.log(data);
console.log(data.Array()[0]);
const arr=data.Array();
let sum=0;
arr.forEach(item=>{
 sum+=item;
})
console.log(sum);
console.log(data.Number());
console.log(data.obj());
console.log(data.obj().name);