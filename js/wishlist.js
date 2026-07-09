/*==================================================
                DEEPKART
              WISHLIST PAGE
==================================================*/

let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

document.addEventListener("DOMContentLoaded", () => {

    loadWishlist();

    updateCartBadge();

    updateWishlistCount();

});

/*==========================================
        LOAD WISHLIST
==========================================*/

function loadWishlist() {

    const container =
        document.getElementById("wishlistItems");

    const count =
        document.getElementById("wishlistCount");

    container.innerHTML = "";

    count.textContent =
        wishlist.length + (wishlist.length === 1 ? " Item" : " Items");

    if (wishlist.length === 0) {

        container.innerHTML = `

        <div class="empty-wishlist">

            <i class="fa-solid fa-heart-crack"></i>

            <h2>Your Wishlist is Empty</h2>

            <p>

                Save your favourite products here and shop later.

            </p>

            <a href="index.html"

            class="continue-btn">

                Continue Shopping

            </a>

        </div>

        `;

        return;

    }

    wishlist.forEach(product => {

        container.innerHTML += createWishlistCard(product);

    });

}
/*==========================================
        CREATE WISHLIST CARD
==========================================*/

function createWishlistCard(product) {

    const rating = product.rating || 4.5;

    const brand = product.brand || "DeepKart";

    const stock = product.stock || "In Stock";

    const discount = product.discount || 0;

    const oldPrice = Math.round(product.price / (1 - discount / 100));

    return `

    <div class="product-card">

        <img src="${product.image}" onerror="this.src='images/no-image.png'"

        <div class="product-info">

            <div class="product-brand">

                ${brand}

            </div>

            <div class="product-name">

                ${product.name}

            </div>

            <div class="product-rating">

                <i class="fa-solid fa-star"></i>

                <span class="rating-value">

                    ${rating}

                </span>

            </div>

            <div class="product-price">

                <span class="current-price">

                    ${formatPrice(product.price)}

                </span>

                ${discount > 0 ? `

                <span class="old-price">

                    ${formatPrice(oldPrice)}

                </span>

                <span class="discount">

                    ${discount}% OFF

                </span>

                ` : ""}

            </div>

            <span class="stock in">

                ${stock}

            </span>

            <div class="product-actions">

                <button
                    class="cart-btn"
                    onclick="moveToCart(${product.id})">

                    <i class="fa-solid fa-cart-shopping"></i>

                    Move To Cart

                </button>

                <button
                    class="remove-btn"
                    onclick="removeWishlist(${product.id})">

                    <i class="fa-solid fa-trash"></i>

                    Remove

                </button>

            </div>

        </div>

    </div>

    `;
}/*==========================================
        UPDATE CART BADGE
==========================================*/

function updateCartBadge() {

    const badge = document.querySelector(".cart-count");

    if (!badge) return;

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {

        total += item.quantity || 1;

    });

    badge.textContent = total;

}/*==========================================
        REMOVE FROM WISHLIST
==========================================*/

function removeWishlist(id) {

    wishlist = wishlist.filter(product => product.id !== id);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    loadWishlist();

    updateWishlistCount();

    showToast("Removed from Wishlist ❤️");

}

/*==========================================
            MOVE TO CART
==========================================*/

function moveToCart(id) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const product =
        wishlist.find(item => item.id === id);

    if (!product) return;

    const existing =
        cart.find(item => item.id === id);

    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    removeWishlist(id);

    updateCartBadge();

    showToast("Moved to Cart 🛒");

}

/*==========================================
        UPDATE WISHLIST BADGE
==========================================*/

function updateWishlistCount() {

    const badge =
        document.querySelector(".wishlist-count");

    if (!badge) return;

    badge.textContent = wishlist.length;

}

/*==========================================
        UPDATE CART BADGE
==========================================*/

function updateCartBadge() {

    const badge =
        document.querySelector(".cart-count");

    if (!badge) return;

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {

        total += item.quantity || 1;

    });

    badge.textContent = total;

}

/*==========================================
            TOAST MESSAGE
==========================================*/

function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) return;

    toast.innerHTML = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}/*==========================================
            SEARCH WISHLIST
==========================================*/

const searchInput =
    document.getElementById("wishlistSearch");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const keyword =
            this.value.toLowerCase();

        const cards =
            document.querySelectorAll(".product-card");

        cards.forEach(card => {

            const name =
                card.querySelector(".product-name")
                .textContent
                .toLowerCase();

            const brand =
                card.querySelector(".product-brand")
                .textContent
                .toLowerCase();

            if (
                name.includes(keyword) ||
                brand.includes(keyword)
            ) {

                card.style.display = "flex";

            } else {

                card.style.display = "none";

            }

        });

    });

}

/*==========================================
        FORMAT ALL PRICES
==========================================*/

function formatPrice(price) {

    return "₹" + Number(price).toLocaleString("en-IN");

}