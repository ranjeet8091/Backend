const express = require("express");
const app = express();
const fs = require("fs");
const session = require("express-session");
const multer = require("multer");

const upload = multer({dest: __dirname+"/public"});

app.use(express.urlencoded({ extended: false }));
app.set("view engine","ejs");

app.use(session({
    secret: "abcd",
    saveUninitialized: true,
    resave: false
}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/upload.html");
});

app.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    let obj = {
        name: req.body.productname,
        price: req.body.price,
        id: Date.now(),
        image: req.file.filename,
    };

    const products = JSON.parse(fs.readFileSync(__dirname + "/product.json", "utf-8"));

    products.push(obj);

    fs.writeFile(__dirname + "/product.json", JSON.stringify(products), (err) => {
        if (err) {
            console.log("Error adding product:", err);
            res.send("Error adding product");
        } else {
            console.log("Product added successfully");
            res.send("added succesfuly")
            res.redirect('/getProducts');
        }
    });
});

app.get("/getProduct",(req,res)=>{
    fs.readFile(__dirname+"/public/product.json","utf-8",(err,data)=>{
        data=JSON.parse(data);
        res.render("dashboard",{arr:data});
    })
})

app.listen(3000);