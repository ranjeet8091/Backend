const mongodb=require("mongodb");
const ObjectId=mongodb.ObjectId
const express=require("express");
const app=express();
const multer=require("multer");
const upload=multer({dest:__dirname+"/upload"})
const client=mongodb.MongoClient;

app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(express.static(__dirname+"/upload"))
app.set("view engine","ejs");

let dbInstace;
client.connect("mongodb+srv://ranjeet09:Ranjeet123@ranjeet.asbjljr.mongodb.net/?retryWrites=true&w=majority&appName=Ranjeet")
.then(database=>{
     dbInstace=database.db("Ecommerce");
     console.log("connnected");

     app.listen(3000,(err,data)=>{
        if(err)
            console.log(err);
        else
        console.log("server is runniing on port number 3000");
     })

})

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/save",upload.single("file"),(req,res)=>{
       let {pname,price}=req.body;
       let file=req.file.filename;

       dbInstace.collection("product").insertOne({pname:pname,price:price,file:file}).then(data=>{
        console.log("data  added succesfuly");
        res.render("dashboard",{arr:data});
       })
       
})

app.get("/show",(req,res)=>{
    dbInstace.collection("product").find({}).toArray().then(data=>{
        // res.send(data);
        res.render("dashboard",{arr:data});
        console.log(data);
    })
})

app.get("/delete",(req,res)=>{
    let id=req.query.id;
    if(!id)
        {
            res.send("id required")
        }
        else
        {
           let oobjectID=new ObjectId(id)
            dbInstace.collection("product").deleteOne({_id:oobjectID}).then(data=>{   
                console.log("deleted succesfully");

                dbInstace.collection("product").find({}).toArray().then(data=>{
                    // res.send(data);
                    res.render("dashboard",{arr:data});
                })
            })
        }
})

app.get("/update",(req,res)=>{
    id=req.query.id;
    if(!id)
        {
            console.log("id is required");
            res.send("id is required");
            
        }
        else{
          
            dbInstace.collection("product").updateOne({_id: new ObjectId(id)},{$set:{pname:"Ranjeet"}}).then(data=>{
                console.log("updated succesfully");
               
                dbInstace.collection("product").find({}).toArray().then(data=>{
                    // res.send(data);
                    res.render("dashboard",{arr:data});
                })
            })
        }
})
