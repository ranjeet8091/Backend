let fs = require("fs");
let http = require("http");
let url = require("url");
let server = http.createServer((req, res) => {
    const urlparsed = url.parse(req.url, true);
    if (urlparsed.pathname == '/') {
        fs.readFile("product.json", "utf-8", (err, data) =>{
            if (err) {
                console.error("error arises");
                res.writeHead(500, { 'content-Type': "text/plain" });
                res.write("error")
                res.end();
                return;

            }
            const products = JSON.parse(data);
            if (urlparsed.query.category) {
                filtered = products.filter((p) => {
                    if (p.category == urlparsed.query.category)
                        return true;
                })
                res.writeHead(200, { 'Content-Type': 'text/json' });
                res.write((JSON.stringify(filtered)));
                res.end();  
            }
            // else {
            //     res.writeHead(200, { 'Content-Type': 'text/json' });
            //     res.write(JSON.stringify(products));
            //     res.end();
            // }
            })
    }

    else{
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



//  / re4q product.json
//read res.write(data);

// / catogeory 