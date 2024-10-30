const http=require("http")
const fs=require("fs")

 let get=http.createServer((req,res)=>{
    fs.readFile('TODO.html',(err,data)=>{
        // res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data)
        res.end();

        // let root="/BACKEND/FS";
        // fs.readdir(root,(err,files)=>{
        //     res.write(files);
        //     res.end();
        // })
    })
})
get.listen(3000,(err)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Running on local Host at 3000")
    }
})
