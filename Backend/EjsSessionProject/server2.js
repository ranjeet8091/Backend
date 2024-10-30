const express = require("express");
const session = require("express-session");
const cookie=require("cookie-parser");
const fs = require("fs");
const multer=require("multer");
const upload=multer({dest:__dirname +"/public"})
const app = express();
const { v4: uuidv4 } = require('uuid');
app.use(express.static(__dirname+"/public"));

app.use(express.static('EjsSessionProject'));
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
    if (req.session.loged && req.session.obj.role == "admin")
        next();
    else
       {
        res.redirect("/");
        
       }
}

// Routes
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/showaddform", (req, res) => {
    res.render("addPost");
});

///Post Routes Start /////////////////////////////////////
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
            req.session.loged = true;
            req.session.obj = result[0];

            fs.readFile(__dirname+"/post.json","utf-8",(err,data)=>{
                if(err)
                 {
                    console.log(err)
                 }
                 else
                {
                    data = JSON.parse(data);
                    console.log(req.session.obj.roll);
                    res.render("dashboard", { Roll: req.session.obj.roll, arr: data ,Code:req.session.obj.code});
                }
               });
        } 
        else 
        {
            res.render("login", { message: "Credentials not matched" });
        }
    });
});
/////Add Post Start //////////
const productsFilePath = __dirname + "/post.json";

    app.post("/add-post", upload.single('image'), (req, res) => {
        const { title, article, code} = req.body;
        const imageName = req.file.filename;
        const postId = uuidv4();
        const newProduct = {
            title: title,
            article: article,
            image: imageName,
            id:postId,
            code:code
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
                else{
                    fs.readFile(__dirname+"/post.json","utf-8",(err,data)=>{
                        if(err)
                         {
                            console.log(err)
                         }
                         else
                        {
                            data = JSON.parse(data);
                            console.log(req.session.obj.roll);
                            res.render("dashboard", { Roll: req.session.obj.roll, arr: data, Code: req.session.obj.code });
                        }
                       });
                }
            });
        });
        
    });


    ///Add post route End


    ///delete post from the post.json////
    // Add this route to handle post deletion///////
app.post("/deletePost", (req, res) => {
    const postId = req.body.postId;

    // Read the existing posts from post.json
    fs.readFile(productsFilePath, "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading post.json:", err);
            return res.status(500).send("Internal server error");
        }

        let posts = JSON.parse(data);

        // Find the index of the post to delete
        const index = posts.findIndex(post => post.id === postId);

        if (index !== -1)
         {
            // Remove the post from the array
            posts.splice(index, 1);

            // Write the updated posts back to post.json
            fs.writeFile(productsFilePath, JSON.stringify(posts), (err) => {
                if (err) {
                    console.error("Error writing post.json:", err);
                    return res.status(500).send("Internal server error");
                }
                fs.readFile(__dirname+"/post.json","utf-8",(err,data)=>{
                    if(err)
                     {
                        console.log(err)
                     }
                     else
                    {
                        data = JSON.parse(data);
                        console.log(req.session.obj.roll);
                        res.render("dashboard", { Roll: req.session.obj.roll, arr: data });
                    }
                   });
            });
        } 
        else 
        {
            // Post not found
            res.status(404).send("Post not found");
        }
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
