const { connect } = require("http2");
const mongodb=require("mongodb");
const client=mongodb.MongoClient;
const object=mongodb.ObjectId;
let dbinstance;
const express=require("express");
const app=express();
client.connect("mongodb+srv://vk803690:vivek@cluster0.b2qzfqg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(database=>{
    dbinstance=database.db("sectionV");
    console.log("connected");
    app.listen(3000,(err)=>{
        if(err)
            {
                console.log(err);
            }
            else
            {
                console.log("server is running on port no 3000");
            }
    })

})