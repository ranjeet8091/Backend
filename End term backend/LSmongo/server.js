const mongo = require("mongodb");
const client = mongo.MongoClient;
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let dbinstance;
client.connect("mongodb+srv://ranjeet09:Ranjeet@ranjeet.asbjljr.mongodb.net/?retryWrites=true&w=majority&appName=Ranjeet")
    .then(database => {
        dbinstance = database.db("user");
        console.log("connected");
        app.listen(3000, (err) => {
            if (err)
                console.log(err);
            else
                console.log("server is running on port Number 3000");
        });
    });

app.get("/", (req, res) => {
        res.sendFile(__dirname + "/login.html");
});

app.get("/signup", (req, res) => {
        res.sendFile(__dirname + "/signup.html");
});

app.post("/add", (req, res) => {
   // let { username, password } = req.body;
    dbinstance.collection("member").insertOne({ username: req.body.username, password: req.body.password }).then(data => {
        console.log(data);
        res.send("Data added successfully");
    }).catch(err => {
        console.error(err);
        res.status(500).send("Error adding data");
    });
});

app.post("/checkCred", (req, res) => {
   // let { username, password } = req.body;
    dbinstance.collection("member").find({ username: req.body.username, password: req.body.password }).toArray().then(user => {
        if (user.length>0) {
            res.send("you're at dashboard");
        } else {
            res.send("wrong credentials");
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send("Error checking credentials");
    });
});
