const { error } = require("console");
const express = require("express");
const app = express();
//npm i mongodb
const mongodb = require("mongodb"); //multiple classes
const client = mongodb.MongoClient;
const object = mongodb.ObjectId;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
let dbinstance;
client.connect("mongodb+srv://ranjeet09:abcd123abcd@ranjeet.asbjljr.mongodb.net/?retryWrites=true&w=majority&appName=Ranjeet").then((database) => {
    console.log("connected")
    dbinstance = database.db("ranjeet09");
}).catch(e => {
    console.log(e);
})

app.get("/home/:name", (req, res) => {
    var name = req.params.name;
    dbinstance.collection("user").insertOne({ name: name }).then(data => {
        console.log(data);
        res.send("succ add");
    })
})

app.get("/show/:id", (req, res) => {
    console.log(req.params.id);
    dbinstance.collection("user").findOne({ _id: new object(req.params.id) }).then(data => {
        console.log(data);
        res.send(data);
    })
})

app.get("/", (req, res) => {
    // dbinstance.collection("user").find({}).toArray().then(data=>{
    //     console.log(data);
    res.render("login", { message: "" });
    // })
})

app.get("/signup", (req, res) => {
    res.render("signup", { message: "" });
})

app.post("/signup", (req, res) => {
    dbinstance.collection("user").find({ name: req.body.name, pass: req.body.pass }).toArray().then(data => {
        if (data.length > 0) {
            res.render("signup", { message: "already exist" })
        } else {
            dbinstance.collection("user").insertOne(req.body).then(data => {
                res.redirect("/login");
            })
        }
    })
})
app.post("/CheckCred", (req, res) => {
    dbinstance.collection("user").find({ name: req.body.name, pass: req.body.pass }).toArray().then(data => {
        if (data.length > 0) {
            console.log("login succesfully");
            res.render("dashboard");
        }
        else {
            console.log(error);
            res.render("login", { message: "User not exist" });
        }
    })
})

app.listen(3000, (err) => {
    if (err)
        console.log(err);
    else
        console.log("server running");
});
