const {error}=require("console");
const express = require("express");
const app = express();
const session = require("express-session");
const cookie=require("cookie-parser");
const multer=require("multer");
const upload=multer({dest:__dirname +"/public"})
const { v4: uuidv4 } = require('uuid');
////////////////////////////////////////MONGO requires//////////////////////////////////////////////////////
const mongodb=require("mongodb");
const { database } = require("firebase-admin");
const client=mongodb.MongoClient;
const object=mongodb.ObjectId;

/////////////////////////////////connection database with server////////////////////////////////////////////////////////////////////////////////
let dbinstance
client.connect("mongodb+srv://ranjeet09:abcd123abcd@ranjeet.asbjljr.mongodb.net/?retryWrites=true&w=majority&appName=Ranjeet").then((database)=>{
    console.log("connected");
    dbinstance=database.db("ranjeet09");
}).catch((err)=>{
    console.log(err);
})
//////////////////////////////////////////////////////connection end//////////////////////////////////////////////////////////////


//////////////////////////////////Static files//////////////////////////////////////////////////////////////////////
app.use(express.static(__dirname+"/public"));
app.use(express.static('EjsSessionProject'));
//////////////////////////////////Static files//////////////////////////////////////////////////////////////////////


// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware setup
app.use(session({
    secret: 'abc',
    saveUninitialized: true,
    resave: false
}));
app.use(express.urlencoded({ extended: false }));

// Authentication middleware
function authentication(req, res, next) {
    if (req.session.loged)
        next();
    else
        res.redirect("/login");
}

// Authorization middleware
function authorization(req, res, next) {
    if (req.session.loged && req.session.obj.role == "Admin")
        next();
    else
       {
        res.redirect("/");
        
       }
}

////////////////////////////////////////////// GET Routes Start /////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login",{message:""});
});

app.get("/showaddform", (req, res) => {
    res.render("addPost");
});
 app.get("/addAuthor",(req,res)=>{
    res.render("addAuthor",{message:""});
 })

 let usertype
///////////////////////////////////////////////Post Routes Start /////////////////////////////////////
app.post("/CheckCred", (req, res) => {
    console.log(req.body);

    dbinstance.collection("user").findOne({ user: req.body.user, pass: req.body.pass })
        .then(user => {
            usertype=user.userType;
            console.log(usertype);
            if (user) {
                console.log("User entered dashboard");
                dbinstance.collection("post").find({}).toArray()
                    .then(posts => {
                        res.render("dashboard", { Roll: user.userType, arr: posts });
                    })
                    .catch(err => {
                        console.error("Error fetching posts:", err);
                        res.status(500).send("Internal Server Error");
                    });
            } else {
                console.log("Invalid Credentials");
                res.render("login", { message: "Invalid Credentials" });
            }
        })
        .catch(err => {
            console.error("Error finding user:", err);
            res.status(500).send("Internal Server Error");
        });
});


app.post("/add-Author",(req,res)=>{
    dbinstance.collection("user").find({user:req.body.user,pass:req.body.pass,userType:"author"}).toArray().then((data)=>{
        if(data.length>0)
        {
            console.log("user exist")
            res.render("addAuthor",{message:"User is allready exist"});
        }
        else{
            dbinstance.collection("user").insertOne(req.body).then(data=>{
                console.log("added succesfuly")
                res.render("login",{message:"User added succesfully"});
            })
        }   
    })
})
///////Add post///////////////////

app.post("/add-post",upload.single("image"),(req,res)=>{
    dbinstance.collection("post").insertOne({title:req.body.title,article:req.body.article,image:req.file.filename}).then((data)=>{
         console.log("added succesfuly");
         
         dbinstance.collection("post").find({}).toArray().then((data)=>{
            res.render("dashboard",{Roll:usertype,arr:data});
        
        })
    })})

    ///Add post route End


    ///delete post from the post.json////
    // Add this route to handle post deletion///////
app.post("/deletePost", (req, res) => {
    // const postId = req.body.postId;
    dbinstance.collection("post").deleteOne({ _id:new object(req.body.postId) }).then((result) => {
        if (result.deletedCount > 0) {
            console.log("Deleted Successfully");
        } else {
            console.log("Deletion not Successful");
        }
        
        // Now, after deletion, you can perform the find operation
        return dbinstance.collection("post").find({}).toArray();
    })
    .then((data) => {
        // After fetching data, render the dashboard
        res.render("dashboard", { Roll: usertype, arr: data });
    })
    .catch((err) => {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    });
});

//////////////////////////////////////WORK OF AUTHOR SIDE////////////////////////////////////////////



////////Post Routes Start//////////////////

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
