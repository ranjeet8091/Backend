document.addEventListener("DOMContentLoaded", function() {
     fetch('products.json')
         .then(response => response.json())
         .then(products => {
             const productList = document.getElementById('product-list');
             products.forEach(product => {
                 const productDiv = document.createElement('div');
                 productDiv.innerHTML = `
                     <h3>${product.productName}</h3>
                     <p>Price: $${product.price}</p>
                     <p>Description: ${product.description}</p>
                 `;
                 productList.appendChild(productDiv);
             });
         })
         .catch(error => console.error('Error fetching products:', error));
 });
 