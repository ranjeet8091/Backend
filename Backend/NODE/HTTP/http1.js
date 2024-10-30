//The HTTP module can create an HTTP server that listens to server ports and 
//gives a response back to the client.
//Use the createServer() method to create an HTTP server:
//listen keyword to listen the port;

const fs=require("fs");
const http=require("http");
let get=http.createServer((req,res)=>{
    // fs.readFile('home.html',(err,data)=>{
    //     res.writeHead(200, {'Content-Type': 'text/html'});
    //     res.write(data)
    //     res.end();

    //     // let root="/BACKEND/FS";
    //     // fs.readdir(root,(err,files)=>{
    //     //     res.write(files);
    //     //     res.end();
    //     // })
    // })

    if(req.url=="/home.html")
    {
         fs.readFile('home.html',(err,data)=>{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data)
        res.end();

        // let root="/BACKEND/FS";
        // fs.readdir(root,(err,files)=>{
        //     res.write(files);
        //     res.end();
        // })
    })
    }
})

server.listen(3000,(err)=>{
    if(err)
    {
        console.log(arr);
    }
    else
    {
        console.log("server is running at 3000");
        
        
    }
})
