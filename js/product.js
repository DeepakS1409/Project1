/*=================================================
            DEEPKART PRODUCTS.JS
            PART 1
=================================================*/

let products = [];
let filteredProducts = [];

/*===============================================
            LOAD PRODUCTS
================================================*/

document.addEventListener("DOMContentLoaded", () => {

    loadProducts();
    initializeFilters();

});

/*===============================================
            FETCH JSON
================================================*/

async function loadProducts() {

    try {

        const response = await fetch("data/products.json");

        products = await response.json();

        filteredProducts = [...products];

        displayProducts(filteredProducts);
        updateCartCount();

        updateWishlistCount();

    } catch (error) {

        console.error(error);

        document.getElementById("productGrid").innerHTML =

            `<h2 style="text-align:center;color:red;">
            Unable to load products.
        </h2>`;

    }


}

/*===============================================
            DISPLAY PRODUCTS
================================================*/

function displayProducts(productArray) {

    const productGrid = document.getElementById("productGrid");

    productGrid.innerHTML = "";

    productArray.forEach(product => {

        productGrid.innerHTML += createCard(product);

    });

}

/*===============================================
            PRODUCT CARD
================================================*/

function createCard(product) {

    return `

    <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'">

        <img src="${product.image}" alt="${product.name}">

        <div class="product-info">

            <span class="category">

                ${product.category}

            </span>

            <h3>

                ${product.name}

            </h3>

            <div class="rating">

                ⭐ ${product.rating}

            </div>

            <div class="price-box">

                <span class="price">

                    ₹${product.price.toLocaleString()}

                </span>

                <span class="discount">

                    ${product.discount}% OFF

                </span>

            </div>

            <p class="stock">

                Stock :
                ${product.stock}

            </p>

            <div class="product-buttons">

                <button class="cart-btn"
                    onclick="addToCart(${product.id})">

                    <i class="fa-solid fa-cart-shopping"></i>

                    Add to Cart

                </button>

                <button class="wish-btn"
                    onclick="addToWishlist(${product.id})">

                    <i class="fa-solid fa-heart"></i>

                </button>

            </div>

        </div>

    </div>

    `;

}

/*===============================================
            CART
================================================*/

/*==========================================
        ADD TO CART
==========================================*/

function addToCart(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    showToast(product.name + " added to cart 🛒");

}
/*===============================================
            WISHLIST
================================================*/

/*==========================================
        ADD TO WISHLIST
==========================================*/

function addToWishlist(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(item => item.id === id);

    if (exists) {

        showToast("Already in Wishlist ❤️");

        return;

    }

    wishlist.push(product);

    localStorage.setItem(

        "wishlist",

        JSON.stringify(wishlist)

    );

    updateWishlistCount();

    showToast(product.name + " added to wishlist ❤️");

}
/*==========================================
        CART COUNT
==========================================*/

function updateCartCount() {

    const badge = document.querySelector(".cart-count");

    if (!badge) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {

        total += item.quantity;

    });

    badge.innerHTML = total;

}
/*==========================================
        WISHLIST COUNT
==========================================*/

function updateWishlistCount() {

    const badge = document.querySelector(".wishlist-count");

    if (!badge) return;

    let wishlist =

        JSON.parse(localStorage.getItem("wishlist"))

    ||
    [];

    badge.innerHTML = wishlist.length;

}
/*==========================================
        FILTERS
==========================================*/

function initializeFilters() {

    const search = document.getElementById("searchProduct");

    const category = document.getElementById("categoryFilter");

    const sort = document.getElementById("sortProducts");

    const reset = document.getElementById("resetFilters");

    if (search) {

        search.addEventListener("input", filterProducts);

    }

    if (category) {

        category.addEventListener("change", filterProducts);

    }

    if (sort) {

        sort.addEventListener("change", filterProducts);

    }

    if (reset) {

        reset.addEventListener("click", resetAllFilters);

    }

}

/*==========================================
        FILTER PRODUCTS
==========================================*/

function filterProducts() {

    const keyword = document
        .getElementById("searchProduct")
        .value
        .toLowerCase();

    const category = document
        .getElementById("categoryFilter")
        .value;

    const sort = document
        .getElementById("sortProducts")
        .value;

    filteredProducts = products.filter(product => {

        const matchName =

            product.name
            .toLowerCase()
            .includes(keyword);

        const matchCategory =

            category === "all"

        ||

        product.category === category;

        return matchName && matchCategory;

    });

    switch (sort) {

        case "low":

            filteredProducts.sort((a, b) =>

                a.price - b.price

            );

            break;

        case "high":

            filteredProducts.sort((a, b) =>

                b.price - a.price

            );

            break;

        case "rating":

            filteredProducts.sort((a, b) =>

                b.rating - a.rating

            );

            break;

    }

    displayProducts(filteredProducts);

}
/*==========================================
        RESET
==========================================*/

function resetAllFilters() {

    document.getElementById("searchProduct").value = "";

    document.getElementById("categoryFilter").value = "all";

    document.getElementById("sortProducts").value = "default";

    filteredProducts = [...products];

    displayProducts(filteredProducts);

}

/*==========================================
        EMPTY RESULT
==========================================*/

function displayProducts(productArray) {

    const grid = document.getElementById("productGrid");

    grid.innerHTML = "";

    if (productArray.length === 0) {

        grid.innerHTML = `

        <div class="no-product">

            <i class="fa-solid fa-box-open"></i>

            <h2>No Products Found</h2>

            <p>Try another search.</p>

        </div>

        `;

        return;

    }

    productArray.forEach(product => {

        grid.innerHTML += createCard(product);

    });

}
/*==========================================
        TOAST
==========================================*/

function showToast(message) {

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2500);

}