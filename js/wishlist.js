let wishlist =

    JSON.parse(localStorage.getItem("wishlist")) || [];

document.addEventListener("DOMContentLoaded", () => {

    loadWishlist();

});

function loadWishlist() {

    const container =

        document.getElementById("wishlistItems");

    container.innerHTML = "";

    if (wishlist.length === 0) {

        container.innerHTML = `

        <div class="empty-cart">

        <i class="fa-solid fa-heart-crack"></i>

        <h2>

        Wishlist Empty

        </h2>

        </div>

        `;

        return;

    }

    wishlist.forEach(product => {

        container.innerHTML += `

        <div class="product-card">

            <img src="${product.image}">

            <div class="product-info">

                <h3>

                    ${product.name}

                </h3>

                <div class="cart-price">

                    ₹${product.price}

                </div>

                <button

                onclick="moveToCart(${product.id})"

                class="cart-btn">

                Add To Cart

                </button>

                <button

                onclick="removeWishlist(${product.id})"

                class="remove-btn">

                Remove

                </button>

            </div>

        </div>

        `;

    });

}

function removeWishlist(id) {

    wishlist =

        wishlist.filter(item => item.id !== id);

    localStorage.setItem(

        "wishlist",

        JSON.stringify(wishlist)

    );

    loadWishlist();

}

function moveToCart(id) {

    let cart =

        JSON.parse(localStorage.getItem("cart")) || [];

    const product =

        wishlist.find(item => item.id === id);

    if (!product) return;

    const exists =

        cart.find(item => item.id === id);

    if (exists) {

        exists.quantity++;

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

}