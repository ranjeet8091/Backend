// const http=require("http");
// const fs=require("fs");
// const server=http.createServer((req,res)=>{
//     console.log(req.url);
//     if(req.url=="/home.html"){
//        fs.readFile("./home.html","utf-8",(err,data)=>{
//         if(err)
//         res.write("not");
//     else{
//         res.writeHead(200,{'Content-Type':'text/html'});
//     res.write(data);
//     }
//     res.end();
//        })
//     }
//     if(req.url=="/style.css"){
//         fs.readFile("./style.css","utf-8",(err,data)=>{
//             if(err)
//             res.write("not");
//         else{
//             res.writeHead(200,{'Content-Type':'text/plain'});
//         res.write(data);
//         }
//         res.end();
//            })
//     }
// })

// server.listen(3000,(err)=>{
//     if(err)
//     console.log(err);
// else
// console.log("server  is running at port 3000");
// })









// const http = require("http");
// const fs=require("fs");
// const server = http.createServer((req, res) => {
//     console.log(req.url)
//     console.log(req.method)
//     if(req.url=="/home"){
//         fs.readFile("./home.html","utf-8",(err,data)=>{
//             if(err)
//             res.write("not working");
//         else
//         {
//             res.writeHead(200,{'Content-Type':'text/html'})
//         res.write(data);
//         }

//         res.end();
//         })
//     }
//     if(req.url=="/style.css"){
//         fs.readFile("./style.css","utf-8",(err,data)=>{
//             if(err)
//             res.write("not working");
//         else
//         res.write(data);

//         res.end();
//         }) 
//     }
// //     else{
// // res.write("welcome");
// // res.end();
// //     }
// });

// server.listen(3000, (err) => {
//     if (err)
//         console.log(err);
//     else
//         console.log("server is running at port 3000");
// })







const http=require("http");
const fs=require("fs");
const server=http.createServer((req,res)=>{
    console.log(req.url);
    console.log(req.method);
    if(req.url=="/home"||req.url=="/home.html"){
        fs.readFile("./home.html","utf-8",(err,data)=>{
            if(err){
                res.writeHead(302,{'Content-Type':'text/plain'})
                res.write("not");
            }
            else{
                res.writeHead(200,{'Content-Type':'text/html'})
                res.write(data);
            }
            res.end();
        })
    }
    else if(req.url=="/sunakhi.jpg"){
        fs.readFile("./sunakhi.jpg",(err,data)=>{
            if(err){
                res.write("not");
            }
            else{
                res.write(data);
            }
            res.end();
        })
    }
    else if(req.url=="/style.css"){
        //read style.css
        //res.write(data)
    }
    else if(req.url=="/hlo.js"){
        //javascrpipt read
        //rew.write data
    }
    else if(req.url=="/about"){
        //about.html read
        //rew.write data
    }
    else{
    res.write("welcome");
    res.end();
    }
});
server.listen(3000,(err)=>{
    if(err)
    console.log(err)
else
console.log("server is runnning at 3000");
})