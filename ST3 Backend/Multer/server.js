const multer=require("multer");
const upload=multer({dest:__dirname+"/upload"});
const express=require("express");
const app=express();
const ejs=require("ejs")
const fs=require("fs")

app.use(express.urlencoded({
    extended:false
}))

app.get("/login",(req,res)=>{
    res.render(__dirname+ "/views" +"/Login.ejs");
})

app.get("/signup",(req,res)=>{
    res.render(__dirname+"/views"+"/Signup.ejs")
})

app.post("/add",upload.single("img"),(req,res)=>{
    let {user,email}=req.body;
    //let img=req.file.filename;
    let  detail={
        user:user,
        email:email,
    };
    if(req.file && req.file.filename)
         {
            detail.img=req.file.filename;
         }
     else
         {
            detail.img="";
         }

    let data=fs.readFileSync(__dirname+"/data.json","utf-8");
    data=JSON.parse(data);
    data.push(detail);
    fs.writeFile(__dirname+"/data.json",JSON.stringify(data),(err,data)=>{
        if(err)
        console.log(err);
      else
      {
        console.log("Added succesfully");
        res.send("Added succesfully")
      }

    })
})

app.post("/checkCred",(req,res)=>{
     let {user,email}=req.body;
     //let img=req.file.filename;
     let data=fs.readFileSync(__dirname+"/data.json","utf-8")
     data=JSON.parse(data);
     let usercheck=0;
      data.forEach(element => {
        if(element.user==user && element.email==email)
        {
            usercheck=1;
        }
        else
        {
            console.log("Invalid Credential");
            res.send("Invalid request");
        }
        
      });
      if(usercheck==1)
      {
        res.render("Home",{arr:data});
      }
})



app.listen(3000,(err)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Server is running 3000");
    }
})