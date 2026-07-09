/*==================================================
                DEEPKART
                CART.JS
==================================================*/

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {

    loadCart();

});

/*==========================================
            LOAD CART
==========================================*/

function loadCart() {

    const cartContainer = document.getElementById("cartItems");

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        showEmptyCart();

        updateSummary();

        return;

    }

    cart.forEach(product => {

        cartContainer.innerHTML += createCartCard(product);

    });

    updateSummary();
    updateCartBadge();
}

/*==========================================
        CREATE PRODUCT CARD
==========================================*/

function createCartCard(product) {

    return `

    <div class="cart-item">

        <img src="${product.image}" alt="${product.name}" loading="lazy">

        <div class="cart-info">

            <h3>${product.name}</h3>

            <p>${product.category}</p>

            <div class="cart-price">

                ₹${product.price.toLocaleString()}

            </div>

            <div class="quantity">

                <button onclick="decreaseQuantity(${product.id})">

                    -

                </button>

                <span>

                    ${product.quantity}

                </span>

                <button onclick="increaseQuantity(${product.id})">

                    +

                </button>

            </div>

        </div>

        <div>

            <button class="remove-btn"

            onclick="removeProduct(${product.id})">

                <i class="fa-solid fa-trash"></i>

                Remove

            </button>

        </div>

    </div>

    `;

}
/*==========================================
        EMPTY CART
==========================================*/

function showEmptyCart() {

    document.getElementById("cartItems").innerHTML = `

    <div class="empty-cart">

        <i class="fa-solid fa-cart-shopping"></i>

        <h2>Your Cart is Empty</h2>

        <p>

            Looks like you haven't added any products yet.

        </p>

        <br>

        <a href="index.html"

        class="continue-btn">

            Continue Shopping

        </a>

    </div>

    `;

}
/*==========================================
        INCREASE QUANTITY
==========================================*/

function increaseQuantity(id) {

    const product = cart.find(item => item.id === id);

    if (!product) return;

    product.quantity++;

    saveCart();

}

/*==========================================
        DECREASE QUANTITY
==========================================*/

function decreaseQuantity(id) {

    const product = cart.find(item => item.id === id);

    if (!product) return;

    if (product.quantity > 1) {

        product.quantity--;

    } else {

        if (confirm("Remove this product from your cart?")) {
            removeProduct(id);
        }

        return;

    }

    saveCart();

}
/*==========================================
        REMOVE PRODUCT
==========================================*/

function removeProduct(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();

}

/*==========================================
        SAVE CART
==========================================*/

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    loadCart();
    updateCartBadge();

}
/*==========================================
        UPDATE SUMMARY
==========================================*/

function updateSummary() {

    let totalItems = 0;

    let totalPrice = 0;

    cart.forEach(product => {

        totalItems += product.quantity;

        totalPrice +=

            product.price * product.quantity;

    });

    const gst = totalPrice * 0.18;

    const discount = totalPrice * 0.05;

    const grandTotal = Math.round(totalPrice + gst - discount);

    document.getElementById("summaryItems").innerHTML = totalItems;

    document.getElementById("itemCount").textContent =
        totalItems + (totalItems === 1 ? " Item" : " Items");

    document.getElementById("totalPrice").innerHTML =

        "₹" + totalPrice.toLocaleString();

    document.getElementById("gst").innerHTML =

        "₹" + Math.round(gst).toLocaleString();

    document.getElementById("discount").innerHTML =

        "-₹" + discount.toFixed(0);

    document.getElementById("grandTotal").innerHTML =

        "₹" + grandTotal.toFixed(0);

}
/*==========================================
        UPDATE BADGE
==========================================*/

function updateCartBadge() {

    const badge = document.querySelector(".cart-count");

    if (!badge) return;

    let total = 0;

    cart.forEach(item => {

        total += item.quantity;

    });

    badge.innerHTML = total;

}
/*==========================================
            CHECKOUT
==========================================*/

const checkoutBtn = document.getElementById("checkoutBtn");

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        window.location.href = "checkout.html";
    });
}

function clearCart() {

    if (confirm("Clear your entire cart?")) {

        cart = [];

        saveCart();

    }

}