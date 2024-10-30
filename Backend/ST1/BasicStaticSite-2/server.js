const fs = require("fs");
const url = require("url");
const http = require("http");
const server=http.createServer((req,res)=>{
    urlparshed=url.parse(req.url,true);
    if(urlparshed.pathname=="/details")
    {
        let id=urlparshed.query.id;
        if(id==undefined)
        {
           res.writeHead(200,{"content-type":"text/plain"});
           res.write("Invalid Request");
           res.end();
        }
        else if(id.trim() === '')
        {
            res.writeHead(200,{"content-type":"text/plain"});
            res.write("Specify the value");
            res.end();
        }
        else{
            res.writeHead(200,{"content-type":"text/plain"});
            res.write(`Request received with value ${id}`);
            res.end();
            
        }
    }
    else
    {
        fs.readFile("404.html","utf-8",(err,data)=>{
            if(err)
            console.log(err);
        else{
            res.writeHead(200,{"content-type":"text/html"});
            res.write(data);
            res.end();
        }
        })
    }
})
server.listen(3000,(err)=>{
    if(err)
    console.log(err)
else
console.log("server is running on 3000")
})