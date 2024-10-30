let fs=require("fs");
let url=require("url");
let http=require("http");
const server=http.createServer((req,res)=>{
    urlparshed=url.parse(req.url,true);
    if(urlparshed.pathname=="/")
    {
        let detail=fs.readFileSync("todo.json","utf-8");
        res.writeHead(200,{"content-type":"text/json"});
        res.write(detail);
        res.end();
    }

    else if(urlparshed.pathname=="/delete")
    {
        let detail=fs.readFileSync("todo.json","utf-8");
        detail=JSON.parse(detail);
        let filtered=detail.filter((e)=>{
            if(urlparshed.query.id!=e.id)
            return true;
        })
        fs.writeFileSync("todo.json",JSON.stringify(filtered),"utf-8")
        res.writeHead(200,{"content-type":"text/json"});
        res.write(JSON.stringify(filtered));
        res.end();
    }
})

server.listen(3001,(err)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Server is running on part number 3001")
    }
})


//