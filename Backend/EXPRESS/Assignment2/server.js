const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path=require("path");
//Now We can use express instead of bodyParser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(__dirname));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
  });
  app.get("/showSignuppage",(req,res)=>{
    res.sendFile(__dirname+"/Signup.html");
    
  })

app.post('/Adduser', (req, res) => {
  const { user,pass } = req.body;
  const newDetail = { user,pass };
  let details = fs.readFileSync(__dirname+"/User.json", "utf-8");
  details = JSON.parse(details);

  let userExists =false;
   details.forEach((element) => {
      if( element.user === user && element.pass === pass)
      {
          userExists=true;
      }
  });


  if (userExists) {
    // alert("User already Exist");
    res.sendFile(__dirname + '/login.html');
  } else {
    
    details.push(newDetail);

    fs.writeFileSync(__dirname+"/User.json", JSON.stringify(details), "utf-8");

    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.write(JSON.stringify(newDetail)); 
    res.sendFile(__dirname + '/login.html');
    res.end();
  }
});

app.get("/allProduct",(req,res)=>{
    res.sendFile(__dirname+"/product.json");
})

app.post('/CheckCred', (req, res) => {
  const { user, pass } = req.body;
  const newDetail = { user, pass };
  let details = fs.readFileSync(__dirname + "/User.json", "utf-8");
  details = JSON.parse(details);

  let userExists = false;
  details.forEach((element) => {
      if (element.user === user && element.pass === pass) {
          userExists = true;
      }
  });

  if (userExists) {
    res.sendFile(__dirname+"/product.html");
    //   fs.readFile("product.json", "utf8", (err, data) => {
    //       if (err) {
    //           res.status(500).send("Internal Server Error");
    //           return;
    //       }
    //       const products = JSON.parse(data);
    //       let htmlContent = `
    //           <html>
    //               <head>
    //                   <title>Product List</title>
    //                   <style>
    //                       /* Container for products */
    //                       .product-container {
    //                           display: flex; /* Use flexbox */
    //                           flex-wrap: wrap; /* Allow wrapping to create columns */
    //                           justify-content: center; /* Center items horizontally */
    //                       }

    //                       /* Individual product box */
    //                       .product {
    //                           border: 1px solid #ccc;
    //                           padding: 10px;
    //                           margin: 10px;
    //                           border-radius: 7px; /* Rounded corners */
    //                           background-color: lightgreen; /* Light green background */
    //                           width: 300px; /* Width of each product box */
    //                           height: 300px; /* Height of each product box */
    //                           display: flex; /* Use flexbox */
    //                           flex-direction: column; /* Align content in a column */
    //                           justify-content: center; /* Center content vertically */
    //                           align-items: center; /* Center content horizontally */
    //                           cursor: pointer; /* Change cursor to pointer */
    //                       }

    //                       /* Product name */
    //                       .product h3 {
    //                           color: blue;
    //                           margin-bottom: 10px; /* Add space below product name */
    //                       }

    //                       /* Other product details */
    //                       .product p {
    //                           font-weight: bold;
    //                       }
    //                       h1 {
    //                           border-bottom: 2px solid black; /* Add a border at the bottom */
    //                           text-align: center; /* Align text to the center */
    //                           color: #3366ff; /* Change text color */
    //                           font-size: 36px; /* Increase font size */
    //                           padding-bottom: 10px; /* Add some padding below the border */
    //                       }
    //                   </style>
    //               </head>
    //               <body>
    //                   <h1>Details of Product</h1>
    //                   <div class="product-container">`;

    //       // Iterate over products and add to HTML content
    //       products.forEach((product, index) => {
    //           // Add a unique id to each product for identifying it later
    //           htmlContent += `<div class="product" id="product${index}">
    //                               <img src="${product.img}">
    //                               <h3>${product.productName}</h3>
    //                               <p>Price: $${product.price}</p>
    //                               <p>Description: ${product.description}</p>
    //                           </div>`;
    //       });

    //       htmlContent += `</div>
    //                       <script>
    //                            
    //                       </script>
    //                   </body>
    //               </html>`;

    //       // Send HTML response
    //       res.send(htmlContent);
    //   });
  } else {
      // User does not exist, redirect to signup page
      res.sendFile(__dirname + '/Signup.html');
  }
});





app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
