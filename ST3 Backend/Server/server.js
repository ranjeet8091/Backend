const express=require("express");
const app=express();

app.get("/",(req,res)=>{
    res.sendFile( __dirname+"/home.html");
})
app.listen(3000);

app.get("/style.css",(req,res)=>{
    res.sendFile(__dirname+"/style.css");
})

app.use((req,res)=>{
    res.send("page is not found");
})