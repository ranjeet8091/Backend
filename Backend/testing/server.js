const express = require("express");
const fs = require("fs");
const app = express();

app.get("/", (req, res) => {
    // Read the JSON file
    fs.readFile("product.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).send("Internal Server Error");
            return;
        }

        // Parse JSON data
        const products = JSON.parse(data);

        // Prepare HTML content with embedded CSS
        let htmlContent = `
            <html>
            <head>
                <title>Product List</title>
                <style>
                    .product {
                        border: 1px solid #ccc;
                        padding: 10px;
                        margin-bottom: 10px;
                    }
                    .product h3 {
                        color: blue;
                    }
                    .product p {
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>`;

        // Iterate over products and add to HTML content
        products.forEach(product => {
            htmlContent += `<div class="product">
                                <h3>${product.productName}</h3>
                                <p>Price: $${product.price}</p>
                                <p>Description: ${product.description}</p>
                            </div>`;
        });

        htmlContent += "</body></html>";

        // Send HTML response
        res.send(htmlContent);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
