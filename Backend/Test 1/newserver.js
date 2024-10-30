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

function authentication(req,res,next){
    if(req.session.abc)
    next();
    else
    res.redirect("/login");
}

app.get("/upload",authentication,(req,res)=>{
    res.sendFile(__dirname + "/public/proUpload.html");
});

app.post("/proUpload",authentication, upload.single("image"), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    let obj = {
        name: req.body.productname,
        price: req.body.price,
        id: Date.now(),
        image: req.file.filename,
    };

    const products = JSON.parse(fs.readFileSync(__dirname + "/public/product.json", "utf-8"));

    products.push(obj);

    fs.writeFile(__dirname + "/public/product.json", JSON.stringify(products), (err) => {
        if (err) {
            console.log("Error adding product:", err);
            res.send("Error adding product");
        } else {
            console.log("Product added successfully");
            res.redirect('/getProducts');
        }
    });
});

app.get("/getProducts",authentication,(req,res)=>{
    fs.readFile(__dirname+"/public/product.json","utf-8",(err,data)=>{
        data=JSON.parse(data);
        res.render("dashboard",{arr:data});
    })
})

app.get("/login",(req,res)=>{
    if(req.session.abcd)
    res.redirect('/getProducts');
else
    res.render("login");
})

app.post("/login",(req,res)=>{
    let {username,pass}=req.body;
    fs.readFile(__dirname+"/user.json","utf-8",(err,data)=>{
        data=JSON.parse(data);
        let result=data.filter((element)=>{
            if(element.username==username&&element.pass==pass){
                return true;
            }
        })
        if(result.length>0){
            req.session.abc=true;
            req.session.obj=result[0];
            res.redirect('/getProducts');
        }
        else{
        res.render("login",{message:"credentials not matched"})
        }
    })
})

app.listen(3000);