const figlet=require("figlet");
figlet("hello",(err,data)=>
{
    if(err)
    {
        console.log("error");
        return;
    }
    console.log(data);

})