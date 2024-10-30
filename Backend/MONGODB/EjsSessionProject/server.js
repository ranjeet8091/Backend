const fs = require("fs");
const express = require("express");
const session = require("express-session"); 
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Page is starting");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/views" + "/login.html");
});

app.get("/showaddform",(req,res)=>{
    res.sendFile(__dirname+"/views"+"/addPost.ejs");
})

app.post("/CheckCred", (req, res) => {
    let { user, pass } = req.body;
    fs.readFile(__dirname + "/user.json", "utf-8", (err, data) => {
        data = JSON.parse(data);
        let result = data.filter((element) => {
            if (element.user == user && element.pass == pass) {
                return true;
            }
        });
        if (result.length > 0) {
            req.session.log = true;
            req.session.obj = result[0];
            res.render("dashboard", { Roll: req.session.obj.roll});
        } else {
            res.render("login", { message: "credentials not matched" });
        }
    });
    
});

app.listen(3000);
