///In This Section we creating our own module 
//and using in other file by using require keyword

var a=10;
var b=30;
function fun(){
   var obj={
    name:"Ranjeet Tiwari",
    Roll:2211985039,
    Section_V:"1v"
   }
   return obj;
   
}
function fun1(){
    var obj={
     name:"Ranjeet Tiwari",
     Roll:2211985039,
     Section_V:"1v"
    }
    return obj.Roll;
    
 }
// module.exports=a;
module.exports={
    a,
    b,
    sum:fun,
    sum1:fun1
}