const express=require("express");
const app=express();
const multer=require("multer");
const path=require("path");

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/form.html"));
})

const storage=multer.diskStorage(
    {
        destination:(req,file,callback)=>{
            let ext=path.extname(file.originalname);
            if(ext===".jpg" || ext===".jepg" || ext===".png")
                {
                    if(ext===".jpg")
                        callback(null,path.join(__dirname+"/public/jpg"))
                    else
                    callback(null,path.join(__dirname+"/public/others"))
                }

            
        },
        filename:(req,file,callback)=>{
            callback(null,file.originalname);
        }
    }
)

const upload=multer({
    storage:storage,
    limits:{fileSize:2000000}
})

app.post("/save",upload.single("file"),(req,res,err)=>{
        if(err.code==="LIMIT_FILE_SIZE")
           {
            res.send("file is more than 2 mb");
           }
        else
        {
            console.log("file uploaded succesfuly");
            res.send("file uploaded succesfuly")
        }

        
})




app.listen(3000,(err)=>{
    if(err)
        {
            console.log(err);
        }
        else{
            console.log("Server is running on port number 3000")
        }
})