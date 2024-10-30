const express=require("express")
const app=express();
//npm i mongodb
const mongodb=require("mongodb")
const  client=mongodb.MongoClient;
const object=mongodb.ObjectId;
let dbinstance
client.connect("mongodb://127.0.0.0.27017").then((database)=>{
    console.log("conected");
    dbinstance=database.db("ST3")
})
.catch(err=>{
    console.log(err);
})
