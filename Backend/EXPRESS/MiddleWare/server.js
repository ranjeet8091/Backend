const express=require("express");
const app=express();
const multer=require("multer");

//HomeWork Sate management Session/  Cookies Diffrence
//Authentication 
//Autherization
const upload=multer({dest:__dirname+"/public"});


///USER DEFINED MIDDLE WARE
app.use((req,res,next)=>{
    console.log("hello");
    next();
})
// app.use((req,res,next)=>{
//     console.log(req.url);
//     next();
// })
const order=require(__dirname +"/server1.js")
app.use("/order",order);
function fun(req,res,next)
{
    console.log(req.url);
    next();
}

app.get("/Home",fun,(req,res)=>{
  res.send("Home page");
})

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/upload.html")
})
app.post("/upload",upload.single("pic"),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    res.send("file received");

})

/// Dynamic Routing
app.get("/name/:name/rollno/:id",(req,res)=>{
    console.log(req.params);
    res.end();
});



app.get("/order/abc",(req,res)=>{
    res.send("i m running in server file")
})

app.listen(3000);