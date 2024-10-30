const express=require("express")
const app=express();

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.get("/style.css",(req,res)=>{
    res.sendFile(__dirname+"/style.css");
})

app.get("/Day1.png",(req,res)=>{
    res.sendFile(__dirname+"/Day1.png")
})


app.listen(3000,(err)=>{
    if(err)
    {
        console.log(err);

    }
    else
    {
        console.log("server is runing on port 3000");
    }
})