const fs = require("fs");
const url = require("url");
const http = require("http");
const server=http.createServer((req,res)=>{
       if(req.url=="/")
       {
         fs.readFile("TODO.html","utf-8",(err,data)=>{
            if(err)
            {
                console.log("The error is erises in / end point error section")
                res.writeHead(200,{"content-type":"text/plain"});
                res.write("error");
                res.end();
            }
            else
            {
                res.writeHead(200,{"content-type":"text/html"});
                res.write(data);
                res.end();
            }

         })
       }
      else if(req.url=="/whatsapp.png")
       {
          fs.readFile("whatsapp.png",(err,data)=>{
            if(err)
            {
                console.log("error");
                return;
                
            }
          //  res.writeHead(200, { "Content-Type": "image/png" });
            res.write(data);
            res.end();
          })
       }
       else if(req.url=="/style.css")
       {
          fs.readFile("style.css",(err,data)=>{
            if(err)
            {
                console.log("error")
                
            }
            res.writeHead(200, { "Content-Type": "text/css" });
            res.write(data);
            res.end();
          })
       }

})

server.listen(3001,(err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Server started..")
    }
})