const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

const thumbs = document.querySelectorAll(".thumb");

const mainImage = document.getElementById("mainImage");

const thumb1 = document.getElementById("thumb1");
const thumb2 = document.getElementById("thumb2");
const thumb3 = document.getElementById("thumb3");
const thumb4 = document.getElementById("thumb4");

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

    try {

        const response = await fetch("data/products.json");

        if (!response.ok) {

            throw new Error("Failed to load products.json");

        }

        const products = await response.json();

        currentProduct = products.find(
            p => p.id == productId
        );

        if (!currentProduct) {

            document.body.innerHTML = `

                <div class="error-page">

                    <h1>404</h1>

                    <h2>Product Not Found</h2>

                    <a href="index.html">

                        Go Back Home

                    </a>

                </div>

            `;

            return;

        }

        // =====================================
        // KEEP ALL YOUR EXISTING CODE HERE
        // =====================================

        const wishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];

        const wishBtn = document.getElementById("wishlistBtn");

        if (wishlist.some(item => item.id === currentProduct.id)) {

            wishBtn.innerHTML =
                `<i class="fa-solid fa-heart"></i> Wishlisted`;

        }

        // Continue with the rest of your existing code...
        // mainImage, thumbnails, price, rating, reviews,
        // related products, etc.

    } catch (error) {

        console.error(error);

        document.body.innerHTML = `

            <div class="error-page">

                <h1>⚠️</h1>

                <h2>Something went wrong</h2>

                <p>

                    Unable to load the product.

                </p>

                <a href="index.html">

                    Go Back Home

                </a>

            </div>

        `;

    }

}

// Call the function
loadProduct();

// Thumbnail click event (OUTSIDE loadProduct)

thumbs.forEach(thumb => {

    thumb.addEventListener("click", () => {

        // Fade out
        mainImage.classList.add("fade");

        setTimeout(() => {

            // Change image
            mainImage.src = thumb.src;

            // Fade in
            mainImage.classList.remove("fade");

        }, 150);

        // Remove active class from all thumbnails
        thumbs.forEach(img => {

            img.classList.remove("active");

        });

        // Highlight selected thumbnail
        thumb.classList.add("active");

    });

});
/*==========================================
            ADD TO CART
==========================================*/

document.getElementById("addCartBtn").addEventListener("click", () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === currentProduct.id);
    if (currentProduct.stock === 0 || currentProduct.stock === "Out of Stock") {

        showToast("Product is Out of Stock ❌");

        return;

    }

    if (existing) {

        existing.quantity += quantity;
        showToast("Quantity Updated 🛒");

    } else {

        cart.push({

            id: currentProduct.id,

            name: currentProduct.name,

            image: currentProduct.image,

            price: currentProduct.price,

            category: currentProduct.category,

            stock: currentProduct.stock,

            quantity: quantity

        });
    }

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    updateCartCount();

    showToast("Added to Cart 🛒");

});
/*==========================================
            WISHLIST
==========================================*/

const wishBtn = document.getElementById("wishlistBtn");

wishBtn.onclick = () => {

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(
        item => item.id === currentProduct.id
    );

    if (exists) {

        wishlist = wishlist.filter(
            item => item.id !== currentProduct.id
        );

        wishBtn.innerHTML =
            `<i class="fa-solid fa-heart"></i> Wishlist`;

        showToast("Removed from Wishlist ❤️");

    } else {

        wishlist.push({

            id: currentProduct.id,

            name: currentProduct.name,

            image: currentProduct.image,

            price: currentProduct.price,

            category: currentProduct.category

        });

        wishBtn.innerHTML =
            `<i class="fa-solid fa-heart"></i> Wishlisted`;

        showToast("Added to Wishlist ❤️");

    }

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );
    updateCartCount();
    updateWishlistCount();

};
/*==========================================
            BUY NOW
==========================================*/

document.getElementById("buyNowBtn").addEventListener("click", () => {

    let cart = [];

    cart.push({

        id: currentProduct.id,

        name: currentProduct.name,

        image: currentProduct.image,

        price: currentProduct.price,

        category: currentProduct.category,

        stock: currentProduct.stock,

        quantity: quantity

    });

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    window.location.href = "cart.html";

});
/*==========================================
            CART COUNT
==========================================*/

function updateCartCount() {

    const badge = document.querySelector(".cart-count");

    if (!badge) return;

    let cart =

        JSON.parse(localStorage.getItem("cart"))

    ||

    [];

    let total = 0;

    cart.forEach(item => {

        total += item.quantity;

    });

    badge.textContent = total;

    badge.style.display =
        total === 0 ? "none" : "flex";

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
            TOAST
==========================================*/

function showToast(message) {

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

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
/*==========================================
            DELIVERY CHECK
==========================================*/

document.getElementById("checkDelivery").onclick = () => {

    const pin = document.getElementById("pincode").value;

    const result = document.getElementById("deliveryResult");

    if (/^[0-9]{6}$/.test(pin)) {

        result.innerHTML = "✅ Delivery Available in 2-3 Days";

        result.style.color = "green";

    } else {

        result.innerHTML = "❌ Enter a Valid Pincode";

        result.style.color = "red";

    }

};

/*==========================================
            REVIEWS
==========================================*/

function loadReviews() {

    const container = document.getElementById("reviewContainer");

    container.innerHTML = `

        <div class="review-card">

            ⭐⭐⭐⭐⭐

            <h4>Rahul</h4>

            <p>Excellent product. Worth buying.</p>

        </div>

        <div class="review-card">

            ⭐⭐⭐⭐☆

            <h4>Priya</h4>

            <p>Very good quality and fast delivery.</p>

        </div>

        <div class="review-card">

            ⭐⭐⭐⭐⭐

            <h4>Arjun</h4>

            <p>Highly recommended.</p>

        </div>

    `;

}

/*==========================================
        RELATED PRODUCTS
==========================================*/

function loadRelatedProducts(products) {

    const grid = document.getElementById("relatedGrid");

    grid.innerHTML = "";

    products
        .filter(item => item.id !== currentProduct.id)
        .filter(item =>
            item.category === currentProduct.category &&
            item.id !== currentProduct.id
        )
        .slice(0, 4)
        .forEach(product => {

            grid.innerHTML += `

            <div class="product-card" onclick="window.location='product.html?id=${product.id}'">

                <img src="${product.image}" onerror="this.src='images/no-image.png'">

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <div class="price">

                        ₹${product.price.toLocaleString()}

                    </div>

                </div>

            </div>

            `;

        });

}
document.querySelectorAll(".color")

.forEach(btn => {

    btn.onclick = () => {

        document.querySelectorAll(".color")

        .forEach(c => c.classList.remove("active"));

        btn.classList.add("active");

    };

});
document.querySelectorAll(".size")

.forEach(btn => {

    btn.onclick = () => {

        document.querySelectorAll(".size")

        .forEach(s => s.classList.remove("active"));

        btn.classList.add("active");

    };

});
updateCartCount();
updateWishlistCount();