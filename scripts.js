// Admin Section

let products = [];

function addProduct() {
  const newProduct = document.getElementById("new-product");
  if (newProduct.value.trim() !== "") {
    products.push(newProduct.value.trim());
    updateProductList();
    newProduct.value = "";
  }
}

function updateProductList() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    const option = document.createElement("option");
    option.value = products[i];
    option.innerText = products[i];
    productList.appendChild(option);
  }
}

let prices = {};

function addPrice() {
  const product = document.getElementById("product-list").value;
  const price = document.getElementById("price-per-unit").value.trim();
  if (price !== "" && !isNaN(price)) {
    prices[product] = parseFloat(price);
    document.getElementById("price-per-unit").value = "";
    updatePriceList();
  }
}

function updatePriceList() {
  const productList = document.getElementById("product-list2");
  productList.innerHTML = "";
  for (let product in prices) {
    const option = document.createElement("option");
    option.value = product;
    option.innerText = product;
    productList.appendChild(option);
  }
}

// Checkout Section

let cart = {};

function newTransaction() {
  cart = {};
  updateCart();
}

function addToCart(quantity = 1) {
  const product = document.getElementById("product-list2").value;
  const qty = document.getElementById("quantity").value || quantity;
  if (product !== "" && qty !== "" && !isNaN(qty) && prices[product]) {
    if (cart[product]) {
      cart[product].quantity += parseInt(qty);
    } else {
      cart[product] = {
        price: prices[product],
        quantity: parseInt(qty),
      };
    }
    updateCart();
    document.getElementById("quantity").value = "";
  }
}

function updateCart() {
  const cartList = document.getElementById("cart");
  cartList.innerHTML = "";
  let total = 0;
  for (let product in cart) {
    const price = cart[product].price;
    const quantity = cart[product].quantity;
    const priceTotal = price * quantity;
    total += priceTotal;
    const tr = document.createElement("tr");
    const nameTd = document.createElement("td");
    nameTd.innerText = product;
    const priceTd = document.createElement("td");
    priceTd.innerText = price.toFixed(2);
    const qtyTd = document.createElement("td");
    qtyTd.innerText = quantity;
    const totalTd = document.createElement("td");
    totalTd.innerText = priceTotal.toFixed(2);
    tr.appendChild(nameTd);
    tr.appendChild(priceTd);
    tr.appendChild(qtyTd);
    tr.appendChild(totalTd);
    cartList.appendChild(tr);
  }
  document.getElementById("total").innerText = total.toFixed(2);
}

function pay() {
  const total = calculateTotal();
  if (total === 0) {
    alert("Please add some items to your cart!");
    return;
  }
  updateReceipt(total);
  resetCheckout();
}

function calculateTax(total) {
  const taxRate = 0.05;
  const tax = total * taxRate;
  return tax.toFixed(2);
}

function updateReceipt(total) {
  const cart = document.getElementById("cart");
  const date = new Date().toLocaleString();
  let output = "";
  let grandTotal = total;

  // Calculate tax
  const taxRate = 0.05;
  const tax = total * taxRate;

  // Calculate subtotal
  const subtotal = total - tax;

  grandTotal += parseFloat(tax);

  // Update tax, subtotal and total in HTML
  document.getElementById("tax").innerText = `$${tax.toFixed(2)}`;
  document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;
  document.getElementById("total").innerText = `$${grandTotal.toFixed(2)}`;

  // Generate output
  cart.innerHTML = "";
  cart.innerHTML += "<tr><th>Product Name</th><th>Price per Unit</th><th>Number of Units</th><th>Price</th></tr>";
  for (let product in cart) {
    const price = cart[product].price;
    const quantity = cart[product].quantity;
    const priceTotal = price * quantity;
    output += `<tr><td>${product}</td><td>$${price.toFixed(2)}</td><td>${quantity}</td><td>$${priceTotal.toFixed(2)}</td></tr>`;
  }
  cart.innerHTML += output;
  document.getElementById("date").innerText = date;
}


