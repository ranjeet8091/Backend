const fs=require("fs");
var a=30;
var b=10;
function save()
{
   fs.appendFile('./text.json',`${a+b} ${Date.now()} sum. `,(err)=>{
      if(err)
      console.log(err);
   else
   console.log("For The Sum it Succesfully");

   })
}
function sum(){
   let date=Date.now();
   console.log(date);
   save();
   return a+b;
  
   
   
}
function sub(){
   let date=Date.now();
   console.log(date);
   save();
    return a-b;
    
 }
 function mul(){
   let date=Date.now();
   console.log(date);
   save();
    return a*b;
    
 }
 function div(){
   let date=Date.now();
   console.log(date);
   save();
    return a/b;
    
 }
// module.exports=a;
module.exports={
   
    sum1:sum,
    sub1:sub,
    mul1:mul,
    div1:div
}