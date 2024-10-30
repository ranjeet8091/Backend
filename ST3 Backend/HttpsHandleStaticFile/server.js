const http=require("http");
const fs=require("fs");
const server=http.createServer((req,res)=>{
     if(req.url=="/index.html")
     {
        fs.readFile(__dirname+"/index.html","utf-8",(err,data)=>{
            if(err)
            {
                console.log(err);
            }
            else
          {
            //res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            
          }
          res.end();
        })
     }
     if(req.url=="/style.css")
     {
        fs.readFile(__dirname+"/style.css",'utf-8',(err,data)=>{
        if(err)
        {
            console.log(err);
        }
        res.write(data);
        res.end();
        })
     }
     if(req.url=="/Day1.png")
     {
        fs.readFile(__dirname+"/Day1.png",(err,data)=>{
            if(err)
            {
                console.log(err);
            }
            // res.writeHead({'Content-Type':'image'})
            res.write(data);
            res.end();
        })
       
     }

})
server.listen(3000,(err)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Server is running on port number 3000");
    }
})