const { error } = require("console");
const express=require("express");
const app=express();
//npm i mongodb
const mongoose=require("mongoose")
app.set("view engine","ejs");

let dbinstance;
mongoose.connect("mongodb+srv://ranjeet09:abcd123abcd@ranjeet.asbjljr.mongodb.net/?retryWrites=true&w=majority&appName=Ranjeet").then((database)=>{
    console.log("connected")
   dbinstance=database.db("sectionV");
}).catch(e=>{
    console.log(e);x
})