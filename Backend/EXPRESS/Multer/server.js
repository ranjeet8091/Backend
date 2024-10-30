const express=require("express")
const app=express();
const fs=require("fs");
app.get("/",(req,res)=>{
     res.sendFile(__dirname+"/dashboard.html")
})
app.listen(3000,()=>{
    console.log("server is running on 3000")
})

app.post("/upload",(req,res)=>{
    const {name,price,description,upload}=req.body;
})