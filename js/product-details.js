const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

let quantity = 1;

document.getElementById("plusBtn").onclick = () => {

    quantity++;

    document.getElementById("quantity").value = quantity;

};

document.getElementById("minusBtn").onclick = () => {

    if (quantity > 1) {

        quantity--;

        document.getElementById("quantity").value = quantity;

    }

};

async function loadProduct() {

    const response = await fetch("data/products.json");

    const products = await response.json();

    const product = products.find(p => p.id === productId);

    if (!product) {

        document.body.innerHTML = "<h1>Product Not Found</h1>";

        return;

    }

    document.getElementById("mainImage").src = product.image;

    document.getElementById("category").textContent = product.category;

    document.getElementById("productName").textContent = product.name;

    document.getElementById("rating").textContent = "⭐ " + product.rating;

    document.getElementById("price").textContent = "₹" + product.price.toLocaleString();

    document.getElementById("description").textContent = product.description;

}

loadProduct();