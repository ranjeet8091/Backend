let fs = require("fs");
let http = require("http");
const { json } = require("stream/consumers");
let url = require("url");
let server = http.createServer((req, res) => {
    const urlparsed = url.parse(req.url, true);
    if (urlparsed.pathname == '/products') {
        fs.readFile("product.json", "utf-8", (err, data) => {
            if (err) {
                console.error("error arises");
                res.writeHead(500, { 'content-Type': "text/plain" });
                res.write("error")
                res.end();

            }
            else{
            const products = JSON.parse(data);
            if (urlparsed.query.category) {
                filtered = products.filter((p) => {
                    if (p.category == urlparsed.query.category)
                        return true;
                })
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write(JSON.stringify(JSON.stringify(filtered)));
                res.end();
            }
        }
            // else {
            //     res.writeHead(200, { 'Content-Type': 'text/plain' });
            //     res.write("Category is not match");
            //     res.end();
            // }
        })
    }

    else if (urlparsed.pathname == "/filterproduct") {
             fs.readFile("product.json","utf-8",(err,data)=>{
                if(err)
                {
                    console.log("error in the filter section")
                    res.writeHead(500,{"content-Type":"text/plain"})
                    res.write("Error occuured");
                    res.end();
                    return;
                }
                const product=JSON.parse(data);
                if(urlparsed.query.category)
                {
                    const filtered=product.filter((p)=>{
                        if(p.category==urlparsed.query.category && p.price>=urlparsed.query.price)
                        {
                            return true;
                        }
                    })
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write(JSON.stringify(JSON.stringify(filtered)));
                res.end();

                }
                // else{

                // }

             })
    }

    else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write("url is not found");
        res.end();
    }
})
server.listen(3001, (err) => {
    if (err) {
        console.log("unable to start server");
    }
    else {
        console.log("Server started... if actually it started or give");
    }
})