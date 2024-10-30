///In This Section we creating our own module 
//and using in other file by using require keyword

var a=10;
var b=30;
function obj(){
   var obj={
    name:"Ranjeet Tiwari",
    Roll:2211985039,
    Section_V:"1v"
   }
   return obj;
   
}
function Array()
{
    let arr=[1,2,3,4,5,6,7,78,8];
    return arr;
}
function Number()
{
    let a=10;
    return a;
}


// module.exports=a;
module.exports={
   obj,
   Array,
   Number
}