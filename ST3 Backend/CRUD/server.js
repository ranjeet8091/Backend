const express=require("express");
const app=express();
//install npm i mongodb
const mongodb=require("mongodb");
const client=mongodb.MongoClient;
const object=mongodb.ObjectId;

app.set("view engine","ejs");

///Connect Database
let dbinstance;
client.connect("mongodb://127.0.0.1:27017").then((database)=>{
    console.log("connnected");
    dbinstance=database.db("St3");
}).catch(err=>{
    console.log(err);
})


///
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/views"+"/login.html");
})

app.post("/CheckCred",(req,res)=>{
    
})

///APLLLYing crud operation
app.get("/signup",(req,res)=>{
res.render("signup",{message:""});
})


app.post("/add-user",(req,res)=>{
    dbinstance.collection("user").find({name:req.body.name,pass:req.body.pass}).toArray().then(data=>{
        if(data.length>0){
            res.render("signup",{message:"already exist"})
        }else{
            dbinstance.collection("user").insertOne(req.body).then(data=>{
                res.redirect("/login");
            })
        }
    })
    })
  

app.listen(3000,(err)=>{
    if(err)
    {
        console.log(err);

    }
    else
    {
        console.log("server is running on 3000")
    }
})
