let fs=require("fs")
let url=require("url")
let http=require("http")
const server=http.createServer((req,res)=>{
    urlparshed=url.parse(req.url,true);
    if(req.url=="/")
    {
        fs.readFile("Todo.html","utf-8",(err,data)=>{
            res.writeHead(200,{"content-type":"text/html"})
            res.write(data);
            res.end();
        })
    }
    else if(urlparshed.pathname=="/addtask")
    {
         let jsonfile=fs.readFileSync("todo.json",'utf-8');
              jsonfile=JSON.parse(jsonfile);

        let obj={
        
        };
        
        let title=urlparshed.query.title;
        let id=urlparshed.query.id;
        let status=urlparshed.query.status;
        obj.title=title;
        obj.id=id;
        obj.status=status;
        jsonfile.push(obj);
        fs.writeFileSync("todo.json",JSON.stringify(jsonfile),"utf-8");

        res.writeHead(200,{"content-type":"text/html"})
            res.write("Details Added Succesfuly");
            res.end();
    }
    
    else if(urlparshed.pathname=="/tasks")
    {
        let jsonfile=fs.readFileSync("todo.json","utf-8");
        jsonfile=JSON.parse(jsonfile);
        
        let filtered=jsonfile.filter((e)=>{
            if(urlparshed.query.status==e.status)
            return true;
        })
        res.writeHead(200,{"content-type":"text/plain"})
            res.write(JSON.stringify(filtered));
            res.end();

    }
    else
    {
        res.writeHead(200,{"content-type":"text/plain"})
            res.write("url is not Handled");
            res.end();
    }
    

})

server.listen(3000,(err)=>{
    if(err)
    console.log("error");
else
console.log("server is running in 3000");
})