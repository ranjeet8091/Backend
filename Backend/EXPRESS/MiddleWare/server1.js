const express=require("express");
const route=express.Router();

route.get("/",(req,res)=>{
    res.send(" order apge");
})

route.get("/add",(req,res)=>{
    res.send("Add order");
})

route.get("/sub",(req,res)=>{
    res.send("Sub order");
})
module.exports=route;