//The HTTP module can create an HTTP server that listens to server ports and 
//gives a response back to the client.
//Use the createServer() method to create an HTTP server:
//listen keyword to listen the port;


const http=require("http");
const server=http.createServer((req,res)=>{
    console.log(req.url);
    console.log(req.method);
    res.write("Ranjeet ")
    res.write("Welcome");
    res.end();

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
