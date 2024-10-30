const express = require("express");
const session = require("express-session");
const fs = require("fs");
const app = express();

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
    if (req.session.abc)
        next();
    else
        res.redirect("/login");
}

// Authorization middleware
function authorization(req, res, next) {
    if (req.session.abc && req.session.obj.role == "admin")
        next();
    else
        res.redirect("/");
}

// Routes
app.get("/", (req, res) => {
    res.send("Page is starting");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/views" + "/login.html");
});
app.get("/showaddform", authentication, (req, res) => {
    res.render("addPost");
});

app.post("/CheckCred", (req, res) => {
    let { user, pass } = req.body;
    fs.readFile(__dirname + "/user.json", "utf-8", (err, data) => {
        data = JSON.parse(data);
        let result = data.filter((element) => {
            if (element.user == user && element.pass == pass) 
            {
                return true;
            }
        });
        console.log(result);
        if (result.length > 0)
        {
            req.session.abc = true;
            req.session.obj = result[0];

            fs.readFile(__dirname+"/post.json","utf-8",(err,data)=>{
                if(err)
                 {
                    console.log(err);
                 }
                 else
                {
                    data = JSON.parse(data);
                    console.log(req.session.obj.roll);
                    res.render("dashboard", { Roll: req.session.obj.roll, arr: data });
                }
               });
        } 
        else 
        {
            res.render("login", { message: "Credentials not matched" });
        }
    });
});


app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
