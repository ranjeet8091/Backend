const express=require("express");
const app=express();

const fs=require("fs");
const path=require("path");
const multer=require("multer");

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname+"/form.html"));
})

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        if(file.mimetype==="image/jpeg")
         {
                fs.mkdirSync("upload/JPG",{recursive:true});
                callback(null,"uplaod/JPG");
        }
        else
        {
                fs.mkdirSync("upload/OTHER",{recursive:true})
                callback(null,"upload/OTHER");
        }
                
       
    }
    ,filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
    
})

const upload=multer({storage:storage,limits:{fileSize:2000000}});

app.post("/upload",upload.single("image"),(req,res)=>{
    if(req.file)
    {
        console.log("File added succesfully")
       res.send("file Added succesfully");
     }
     else
     {
        console.log("err")
        res.send("error in uplaoding file")
     }
})

app.listen(3000,(err)=>{
    console.log("server is running on port number 3000");
})