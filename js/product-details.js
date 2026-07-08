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
let currentProduct;

async function loadProduct() {

    const response = await fetch("data/products.json");

    const products = await response.json();

    currentProduct = products.find(
        p => p.id == productId
    );

    if (!currentProduct) {

        document.body.innerHTML = "Product Not Found";

        return;

    }

    mainImage.src = currentProduct.image;

    thumb1.src = currentProduct.image;

    thumb2.src = currentProduct.image;

    thumb3.src = currentProduct.image;

    thumb4.src = currentProduct.image;

    category.innerHTML = currentProduct.category;

    productName.innerHTML = currentProduct.name;

    rating.innerHTML = currentProduct.rating;

    price.innerHTML = currentProduct.price.toLocaleString();

    stock.innerHTML = currentProduct.stock;

    description.innerHTML = currentProduct.description;

}

// Call the function
loadProduct();

// Thumbnail click event (OUTSIDE loadProduct)
document.querySelectorAll(".thumb").forEach(image => {

    image.onclick = () => {

        document.getElementById("mainImage").src = image.src;

        document.querySelectorAll(".thumb")
            .forEach(img => img.classList.remove("active"));

        image.classList.add("active");

    };

});