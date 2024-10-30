  const express=require("express");
  const app=express();
  const fs=require("fs");
  const multer=require("multer");
  const upload=multer({dest:__dirname+"/upload"})
  app.use(express.urlencoded({extended:false}));
  app.set("view engine","ejs");

 app.use(express.static(__dirname+"/upload"));
  app.get("/showadd",(req,res)=>{
    res.render("addproduct")
  })

  // add product////////////////////////
  app.post("/add",upload.single("img"),(req,res)=>{
    let {name,price}=req.body;
    let img=req.file.filename;
    let product={
        name:name,
        price:price,
        img:img
    };
    let allproduct=fs.readFileSync(__dirname+"/product.json","utf-8");
    allproduct=JSON.parse(allproduct);
    allproduct.push(product);
    fs.writeFile(__dirname+"/product.json",JSON.stringify(allproduct),(err,data)=>{
        if(err)
            console.log("err in write file ")
        else
        {
            console.log("succesfully");
            res.send("added succesfully");
        }

    });

  })
  //////////////////
    ////read data////
    app.get("/show",(req,res)=>{
      let allproduct=fs.readFileSync(__dirname+"/product.json","utf-8");
      allproduct=JSON.parse(allproduct);
      res.render("showpage",{arr:allproduct});
     })

     /// delete
     app.get("/delete",(req,res)=>{
        let name=req.query.name;

        let allproduct=fs.readFileSync(__dirname+"/product.json","utf-8");
        allproduct=JSON.parse(allproduct);
       let found=allproduct.filter(item=>{
        return item.name==name;
       })
       let upadtedDetail;
       if(found.length>0)
        {
           upadtedDetail=allproduct.filter(item=>{
            return item.name!=name;
          })

          fs.writeFile(__dirname+"/product.json",JSON.stringify(upadtedDetail),(err,data)=>
            {
              if(err)
                {
                  console.log("err in write");
                }
                else
                {
                  console.log("deted succesfully");
                  res.send("deleted succesfully");
                }
  
          })
        }
        else
        {
          res.send("user not found")
          console.log("User is not found with this name");
        }
        

       
        
     })

     app.get("/update",(req,res)=>{
      let name=req.query.name;
      let price=req.query.price;
      let allproduct=fs.readFileSync(__dirname+"/product.json","utf-8");
      allproduct=JSON.parse(allproduct);
      
      let Index=allproduct.findIndex(item=>{
        return item.name==name;
      })
      if(Index!=-1)
        {
          allproduct[Index].price=price;

          fs.writeFile(__dirname+"/product.json",JSON.stringify(allproduct),(err)=>{
             if(err)
              console.log(err);
            else
            {
              res.send("Updated succesfuly")
              console.log("updated succesfully");
            }
          })
        }
        else{
          res.send("user is not found");
          console.log("User is not found");
        }
    
     })

     

  app.listen(4000,(err)=>{
    if(err)
        consolelog("err");
    else
     console.log("server is runing on 4000");
  })