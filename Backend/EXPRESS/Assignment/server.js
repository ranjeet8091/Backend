let express=require("express");
let  app=express();
let fs=require("fs");
app.use(express.static(__dirname))
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/home.html");
})
app.get("/home.html",(req,res)=>{
    res.sendFile(__dirname+"/home.html")
})
app.get("/about.html",(req,res)=>{
    res.sendFile(__dirname+"/about.html");

})
app.get("/contact.html",(req,res)=>{
    res.sendFile(__dirname+"/contact.html")
})
app.get("*",(req,res)=>{
    res.send("page is not found")
})



app.listen(3000,(err)=>{
    if(err)
    console.log("err");
else
console.log("running on port number 3000")

})