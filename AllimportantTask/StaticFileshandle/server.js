const http=require("http");
const fs=require("fs");

const server=http.createServer((req,res)=>{
    

    if(req.url=="/index.html")
        {
           fs.readFile("index.html","utf-8",(err,data)=>{
            if(err)
                {
                    console.log(err);
                }
            else{
                //res.writeHead(200,{"content-type":"text-plain/html"});
                res.write(data);
                res.end();
            }
            
           })
        }

       else if(req.url=="/style.css")
            {
               fs.readFile("style.css","utf-8",(err,data)=>{
                if(err)
                    {
                        console.log(err);
                    }
                else{
                   // res.writeHead(200,{"content-type":"text-plain/html"});
                    res.write(data);
                    res.end();
                }
                
               })
            }

           else if(req.url=="/img.jpg")
                {
                   fs.readFile("img.jpg",(err,data)=>{
                    if(err)
                        {
                            console.log(err);
                        }
                    else{
                      //  res.writeHead(200,{"content-type":"text-plain/html"});
                        res.write(data);
                        res.end();
                    }
                    
                   })
                }

                else{
                    res.write("Endpoint is not available");
                    res.end();
                }

})

server.listen(3000,(err)=>{
    if(err)
        {
            console.log("Unable  to start the server")
        }
        else{
            console.log("server is started on port number 3000");
        }
})