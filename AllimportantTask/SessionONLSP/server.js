const express=require("express");
const app=express();
const mongodb=require("mongodb");
const client=mongodb.MongoClient;
const multer=require("multer")
const upload=multer({dest:__dirname+"/upload"});
const session=require("express-session");
const { resolveInclude } = require("ejs");
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(express.static(__dirname+"/upload"))

app.set("view engine","ejs")
app.use(session({
    secret:"abc",
    resave:false,
    saveUninitialized:true
}))
let dbIntance
client.connect("mongodb+srv://ranjeet09:Ranjeet123@ranjeet.asbjljr.mongodb.net/?retryWrites=true&w=majority&appName=Ranjeet")
.then(database=>{
    dbIntance=database.db("End-session")
    console.log("connected");

    app.listen(3000,(err)=>{
       if(err)
        console.log(err);
      else
      console.log("server is running on port 3000")
    })

})
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/login.html");
})

app.get("/signup",(req,res)=>{
   res.sendFile(__dirname+"/signup.html");
})

app.post("/checkCred",(req,res)=>{
       let {userid , password}=req.body;

       dbIntance.collection("user").find({userid:userid,password:password}).toArray().then(data=>{
           if(data.length>0)
            {
                req.session.logged=true;
                let cat=data[0].cat;
                let pf=data[0].pf;
                console.log(cat)
                res.render("dashboard",{Roll:cat,pf:pf});
                console.log("Login succesfuly")
            }
            else
            {
                res.send("Wrong Credential")
            }
       })
})

app.post("/add",upload.single("pf"), (req, res) => {
    let { userid, password, cat } = req.body;
    let pf=req.file?req.file.filename:null;
    dbIntance.collection("user").find({ userid: userid, password: password }).toArray().then(data => {
        if (data.length > 0) {
            console.log("User already exists");
            res.send("User already exists");
        } else {
            dbIntance.collection("user").insertOne({ userid: userid, password: password, cat: cat,pf:pf }).then(data => {
                console.log("added successfully");
                res.send("added successfully");
            }).catch(err => {
                console.log("Error adding user:", err);
                res.send("Error occurred while adding user");
            });
        }
    }).catch(err => {
        console.log("Error finding user:", err);
        res.send("Error occurred while finding user");
    });
});




