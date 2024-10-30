let body=document.getElementById("ra");

let arr=[
    {
        product:"Himalaya Facewash",
        Pricr:75
    },
    {
        product:"Chikankari",
        Pricr:750
    },
    {
        product:"simple white ",
        Pricr:250
    },
    {
        product:"cutWork",
        Pricr:210
    },
   
]
console.log(arr);
let arr2=arr.filter((obj)=>{
    if(obj.Pricr>200)
    {
        return(obj);    
    }
})
console.log(arr2);
