const express = require("express");
const app = express();
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: __dirname + "/public" });
const cookie = require("cookie-parser");
const session = require("express-session");

// let user=false;

app.use(cookie());
app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: "abc@abc",
}))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname));

function check(req, res, next) {
    if (!req.session.logedin)
        res.redirect("/login");
    else
        next();
}

function auth(req, res, next) {
    if (req.session.role == "admin") {
        next();
    } else {
        res.redirect("/dashboard");
    }
}

app.get("/login", (req, res) => {
    if (req.session.logedin)
        res.redirect("/dashboard");
    else
        res.sendFile(__dirname + "/login.html");

})

app.get("/dashboard", check, (req, res) => {
    // if(req.session.logedin)
    res.sendFile(__dirname + "/dashboard.html");
    //    else
    //    res.redirect("/login");


})

app.get("/products", (req, res) => {
    res.sendFile(__dirname + "/Product.json");
})

app.get("/home", check, (req, res) => {

    // if(req.session.logedin)
    res.send("home page");
    //    else
    //    res.redirect("/login");

})

app.get("/admin", auth, (req, res) => {
    res.sendFile(__dirname + "/AddProduct.html");
    // res.send("admin page");

})


app.post("/login", (req, res) => {
    console.log(req.body);
    let { pass, email } = req.body;
    fs.readFile(__dirname + "/user.json", "utf-8", (err, data) => {
        if (err) {
            //next();
            res.status(500).send("Internal server error");
        }
        else {
            data = JSON.parse(data);
            // let flag=false;
            // let obj;
            // data.forEach(element => {
            //     if(element.pass==pass&&element.email==email){
            //         flag=true;
            //         obj=element;
            //     }
            // });
            let result = data.filter((element) => {
                if (element.pass == pass && element.email == email) {
                    return true;
                }
            })
            if (result.length > 0) {
                //  user=true;
                req.session.logedin = true;
                req.session.username = email;
                req.session.role = result[0].role;
                res.redirect("/dashboard");
            }
            else {
                res.send("not matched");
            }
        }
    })
})


/////////////////////////////////////////////
const productsFilePath = __dirname + "/product.json";

app.post("/add-product", upload.single('image'), (req, res) => {
    const { name, price, description } = req.body;
    const imageName = req.file.filename;
    const newProduct = {
        name: name,
        price: price,
        description: description,
        image: imageName
    };
    fs.readFile(productsFilePath, "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading product.json:", err);
            return res.status(500).send("Internal server error");
        }
        let products = JSON.parse(data);
        products.push(newProduct);
        fs.writeFile(productsFilePath, JSON.stringify(products), (err) => {
            if (err) {
                console.error("Error writing product.json:", err);
                return res.status(500).send("Internal server error");
            }
            res.send("Product added successfully!");
        });
    });
});
//////////////////////////////////////////


app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
    ''
})

//npm i express-session
//npm i cookie-parser



app.listen(4000);