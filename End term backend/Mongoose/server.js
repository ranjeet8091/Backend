const express=require("express");
const app=express();
const mongoose=require("mongoose");

app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect("mongodb+srv://ranjeet09:ranjeet1234@ranjeet.asbjljr.mongodb.net/?retryWrites=true&w=majority&appName=Ranjeet")
.then(()=>{
   
   console.log("Connected");

   app.listen(3000,(err)=>{
    if(err)
        {
            console.log(err);
        }
        else
        console.log("Server is running on port number 3000");
   })

}).catch(err=>{
    console.log(err);
})

const userschema=new mongoose.Schema({
    user:String,
    password:String
});

User=mongoose.model("User",userschema);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/login.html");
})

app.get("/signup",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post("/add",(req,res)=>{
    const user=req.body.user;
    const password=req.body.password;

    const  newUser=new User({
        user:user,
        password:password
    });

    newUser.save().then(data=>{
        console.log(data);
        res.send("User added succesfuly");
        console.log("Added succesfuly");
    })
    .catch(err=>{
        console.log(err);
        res.send("problem in adding");
       
    })
})

app.post("/checkCred",(req,res)=>{
    const user=req.body.user;
    const password=req.body.password;
    User.findOne({user:user,password:password}).then(result=>{
        if(result)
            {
                console.log("login succes fully");
                res.send("Login succesfully");
            }
            else
            {
                console.log("wrong credential");
                res.send("wrong credential");
            }
    })
})  




