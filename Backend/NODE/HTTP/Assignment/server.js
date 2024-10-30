const fs = require("fs");
const url = require("url");
const http = require("http");
const { json } = require("stream/consumers");
const { type } = require("os");
const server = http.createServer((req, res) => {

        let urlparsed = url.parse(req.url, true);
    if (req.url == "/home" || req.url == "home") {
        fs.readFile("login.html", "utf-8", (err, data) => {
            if (err) {
                console.log(err);
            }
            res.writeHead(200, { 'content-Type': 'text/html' })
            //  res.write("start");
            res.write(data);
            res.end();

        })

    }

    else if (urlparsed.pathname == "/check") {
        let username = urlparsed.query.user;
        let password = urlparsed.query.pass;
        let details = fs.readFileSync("./database.json", "utf-8");
        details = JSON.parse(details);
    
        let userExists = false;
    
        details.forEach((element) => {
            if (element.username === username && element.password == password) {
                userExists = true;
            }
        });
    
        if (userExists) {
            res.writeHead(200, { 'content-Type': "text/plain" });
            res.write("User exists");
            res.end();
        } else {
            fs.readFile("Signup.html", (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' }); 
                    res.write("Page is not Found");
                    res.end();
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write("You have to sign in")
                    res.write(data);
                    res.end();
                }
            });
        }
    }

    else if(urlparsed.pathname == "/add") {
        let newdetail = {
            username: "", // Initialize with empty strings
            password: ""
        };
    
        let username = urlparsed.query.user;
        let password = urlparsed.query.pass;
    
        newdetail.username = username;
        newdetail.password = password;
    
        let details = fs.readFileSync("./database.json", "utf-8");
        details = JSON.parse(details);
    
        let userExists =false;
         details.forEach((element) => {
            if( element.username === username && element.password === password)
            {
                userExists=true;
            }
        });
    
        if (userExists) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("User Already exists");
            res.end();
        } else {
            details.push(newdetail);
    
            fs.writeFileSync("./database.json", JSON.stringify(details), "utf-8");
    
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(newdetail));
            res.end();
        }
    }
    else if(urlparsed.pathname==='/showLoginpage'||urlparsed.pathname==='showLoginpage')
    {
        fs.readFile("login.html", "utf-8", (err, data) => {
            if (err) {
                console.log(err);
            }
            res.writeHead(200, { 'content-Type': 'text/html' })
            //  res.write("start");
            res.write(data);
            res.end();

        })
    }
    
    else if(urlparsed.pathname==='/showSignuppage'||urlparsed.pathname==='showSignuppage')
    {
        fs.readFile("Signup.html", "utf-8", (err, data) => {
            if (err) {
                console.log(err);
            }
            res.writeHead(200, { 'content-Type': 'text/html' })
            //  res.write("start");
            res.write(data);
            res.end();

        })
    }
    
    else if(urlparsed.pathname==='/showdeletedpage'||urlparsed.pathname==='showdeletedpage')
    {
        fs.readFile("delete.html", "utf-8", (err, data) => {
            if (err) {
                console.log(err);
            }
            res.writeHead(200, { 'content-Type': 'text/html' })
            //  res.write("start");
            res.write(data);
            res.end();

        })
    }
    else if(urlparsed.pathname==='/delete')
    {
        let username = urlparsed.query.user;
        let password = urlparsed.query.pass;
        let details = fs.readFileSync("./database.json", "utf-8");
        details = JSON.parse(details);
    
        let userExists = false;

        let updated=details.filter((ele)=>{
             if(username!=ele.username && password!=ele.password)
             {
                return true;
             }
        })
        if(details.length===updated.length)
        {
            res.writeHead(200,{'conten-Type':"text/plain"})
            res.write("User's Credential Not Found");
            res.end();
        }
        else
        {
            res.writeHead(200,{'conten-Type':"text/plain"})
            res.write(" User's Credentials are deleted succesfully");
            res.end();
        }
        details=updated;
        fs.writeFileSync("./database.json",JSON.stringify(details));
    }

    else {
        res.write("Url is not valid");
        res.end();
    }

})
server.listen(3000, (err) => {
    if (err)
        console.log(err)
    else
        console.log("server is running on Localhost 3000")
});