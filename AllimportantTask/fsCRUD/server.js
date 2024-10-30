const { json } = require("body-parser");
const exp = require("constants");
const express=require("express")
const app=express();
const fs=require("fs");
const path=require("path");

app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.get("/addshow",(req,res)=>{
    res.sendFile(__dirname+"/showadd.html");
})

app.post("/add",(req,res)=>{
    let {pname,price,id}=req.body;
    let allproduct=fs.readFileSync(__dirname+"/product.json");
    allproduct=JSON.parse(allproduct);

    let newp={
        pname:pname,
        price:price,
        id:id
    }
    allproduct.push(newp);
    fs.writeFile(path.join(__dirname+"product.json"),JSON.stringify(allproduct),(err,data)=>{
        if(err)
            {
                console.log(err);
            }
            else
            {
                console.log("data added succesfuly");
                res.send("data added succesfully");
            }
    })

})

app.get("/show",(req,res)=>{
    fs.readFile(path.join(__dirname+"product.json"),"utf-8",(err,data)=>{
        if(err)
            console.log(err);
        else{
            res.send(data);
        }
    })

})

app.get("/delete",(req,res)=>{
      let id=req.query.id;
      let allproduct=fs.readFileSync(__dirname+"/product.json");
      allproduct=JSON.parse(allproduct);

      let found=allproduct.filter(item=>{
         return item.id==id;
      })
      
      if(found.length>0)
        {
         let upadtedfile=allproduct.filter(item=>{
            return item.id!=id;
         })

         fs.writeFile(__dirname+"/product.json",(err,data)=>{
            if(err)
                console.log(err);
            else
            {
                console.log("data deleted succesfully");
            }
         })
        }
        else{
            console.log("user not found")
            res.send("user not found");
        }

      
})




app.listen(3000,(err)=>{
    if(err)
        console.log(err);
    else
    console.log("Server is runninng on port number 3000");
})
