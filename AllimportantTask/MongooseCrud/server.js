const mongoose=require("mongoose");
const express=require("express");
const multer = require("multer");
const app=express();
const upload=multer({dest:__dirname+"/upload"});

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(__dirname+"/upload"))

app.set("view engine","ejs");
mongoose.connect("mongodb+srv://ranjeet09:Ranjeet123@ranjeet.asbjljr.mongodb.net/?retryWrites=true&w=majority&appName=Ranjeet")
.then(database=>{
    console.log("Connected");

    app.listen(3000,(err)=>{
        if(err)
            console.log(err);
        else
        console.log("server is running on 3000")
    })
})

    const blogschema=new mongoose.Schema({
        blogn:String,
        blogs:String,
        blogimg:String
    })

const Blog=mongoose.model("Blog",blogschema);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/addBlog.html");
})

app.post("/saveBlog",upload.single("blogimg"),(req,res)=>{
    const {blogn,blogs}=req.body;
    const blogimg = req.file ? req.file.filename : null;

    const newschema= new Blog({
        blogn:blogn,
        blogs:blogs,
        blogimg:blogimg
    })

  newschema.save()
  .then(() => {
    console.log('Data added successfully');

  Blog.find({}).exec().then(data=>{
    res.render("dashboard",{arr:data});
  })
 
  })
  .catch(err => {
    console.error('Error saving blog:', err);
    res.send('Error saving blog');
  });
  
})

app.get("/show",(req,res)=>{
    Blog.find({}).exec().then(data=>{
        res.render("dashboard",{arr:data});
        console.log("See on web");
        console.log(data);
    })
    .catch(err=>{
        console.log(err);
        res.send(err);
    })
})

app.get("/delete",(req,res)=>{
      let id=req.query.id;
      if(!id)
        {
            console.log("id requires");
            res.send("id is required")
        }
     else
     {
        Blog.deleteOne({_id:id}).then(data=>{
            console.log("delete Succesfully");
            // res.send("deleteed succesfully");
      })

      Blog.find({}).exec().then(data=>{
        res.render("dashboard",{arr:data});
        console.log("See on web");
    })
     }
})
app.get("/update",(req,res)=>{
    let id=req.query.id;
    let blogn=req.query.blogn;
    if(!id)
      {
          console.log("id requires");
          res.send("id is required")
      }
   else
   {
      Blog.updateOne({_id:id},{$set:{blogn:blogn}}).then(data=>{
          console.log("updated succesfully");
        //   res.send("updated succesfuly");

          Blog.find({}).exec().then(data=>{
            res.render("dashboard",{arr:data});
            console.log("See on web");
        })
    })
   }
})



