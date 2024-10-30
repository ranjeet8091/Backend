
function sum1()
{
    let arr=[1,2,3,4,5,6,7,8,9];
    let sum=0;
    arr.forEach(item=>{
        sum+=item;
    })
    return sum;
}
module.exports={
    sum1
}