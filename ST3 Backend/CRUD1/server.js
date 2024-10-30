const express = require("express");
const app = express();
const mongodb = require("mongodb");
const client = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId; // Renamed to avoid conflict with the variable name 'object'

const cookie=require("cookie-parser");
const session=require("express-session")
const multer=require("multer");
const upload=multer({dest: __dirname+"/upload"})

app.set('view engine','ejs')
app.use(express.static(__dirname+"/upload"))

let dbInstance;

client.connect("mongodb+srv://ranjeet09:ranjeet8091@ranjeet.asbjljr.mongodb.net/?retryWrites=true&w=majority&appName=Ranjeet")
  .then(database => {
    console.log("Connected");
    dbInstance = database.db("check");

    // Start Express server after successful database connection
    app.listen(3000, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Server running on port 3000");
      }
    });
  })
  .catch(err => {
    console.log(err);
  });

// Define your routes and middleware here... gt5 42qw  

app.use(session({
    secret:'abc',
    resave:false,
    uninitialized:true
    
}));

app.use(express.urlencoded({extended:false}));

function authentication(req,res,next){
    if(req.session.logged)
    next();
    else{
        res.send("You are not Login");
    }   
}

function authorization(req,res,next){
    if(req.session.logged)
    {
        next();
    }
    else
    {
        res.send("Your are not athorise for this")
    }
}

///get routes
app.get("/",authorization,(req,res)=>{
    res.render("form");
})

app.get("/login",(req, res) => {
  req.session.logged = true;
  res.send("Login successful");
});


app.post("/Create-data",authorization,upload.single("img"),(req,res)=>{
    dbInstance.collection("detail").insertOne({name:req.body.name,fathern:req.body.fathern,img:req.file.filename}).then((data)=>{
        console.log("added succesfully");
        res.send("Added succesfully");
    }).catch(err=>{
        console.log(err);
    })

})

app.get("/read-data",authentication,(req,res)=>{
    dbInstance.collection("detail").find({}).toArray().then((data)=>{
        res.render("display",{arr:data});
    })
})
app.post("/deletepost", (req, res) => {
  dbInstance.collection("detail").deleteOne({_id: new ObjectId(req.body.postId)})
  .then(result => {
      if (result.deletedCount > 0) {
          res.send("Delete successful");
          console.log("Deleted");
      } else {
          res.send("Not deleted");
          console.log("Not deleted");
      }
  })
  .catch(err => {
      console.log(err);
      res.status(500).send("An error occurred while deleting the post");
  });
});

app.post("/update",authentication,(req,res)=>{
  dbInstance.collection("detail").updateOne({_id:new ObjectId(req.body.postId)},{$set:{name:"Ranjeet Don", fathern:"Hridyanand"}}).then(data=>{
     if(data.modifiedCount>0)
     {
      res.send("update succesfuly");
     }
     else
     {
      res.send("Not update");
     }
  })
})







