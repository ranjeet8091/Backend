const http=require("http");
const fs=require("fs");
let inc=0;
http.createServer((req,res)=>{
    if(req.url=="/signup"&&req.method=="POST"){
        let resdata="";
        req.on("data",(chunck)=>{
            resdata=resdata +chunck;
        })
        req.on("end",()=>{
            console.log(resdata);
            resdata=JSON.parse(resdata);
            let data=fs.readFileSync(__dirname+"/user.json","utf-8");
            data=JSON.parse(data);
            data.push(resdata);
            fs.writeFileSync(__dirname +"/user.json",JSON.stringify(data));
            res.write("added succ");
            res.end();
        }) 
    }
    if(req.url=="/signup"&&req.method=="GET"){
        res.write(`invalid request ${++inc}`);
        res.end();
    }
}).listen(3000);