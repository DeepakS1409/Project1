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
    brand.innerHTML = currentProduct.brand || "DeepKart";

    specCategory.innerHTML = currentProduct.category;

    specStock.innerHTML = currentProduct.stock;

    specRating.innerHTML = currentProduct.rating;

    loadReviews();

    loadRelatedProducts(products);

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
/*==========================================
            ADD TO CART
==========================================*/

document.getElementById("addCartBtn").addEventListener("click", () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === currentProduct.id);

    if (existing) {

        existing.quantity += quantity;

    } else {

        cart.push({

            ...currentProduct,

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

document.getElementById("wishlistBtn").addEventListener("click", () => {

    let wishlist =

        JSON.parse(localStorage.getItem("wishlist"))

    ||

    [];

    const exists =

        wishlist.find(item => item.id === currentProduct.id);

    if (exists) {

        showToast("Already in Wishlist ❤️");

        return;

    }

    wishlist.push(currentProduct);

    localStorage.setItem(

        "wishlist",

        JSON.stringify(wishlist)

    );

    updateWishlistCount();

    showToast("Added to Wishlist ❤️");

});
/*==========================================
            BUY NOW
==========================================*/

document.getElementById("buyNowBtn").addEventListener("click", () => {

    let cart = [];

    cart.push({

        ...currentProduct,

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
/*==========================================
            DELIVERY CHECK
==========================================*/

document.getElementById("checkDelivery").onclick = () => {

    const pin = document.getElementById("pincode").value;

    const result = document.getElementById("deliveryResult");

    if (pin.length === 6) {

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
        .slice(0, 4)
        .forEach(product => {

            grid.innerHTML += `

            <div class="product-card"
                 onclick="window.location='product.html?id=${product.id}'">

                <img src="${product.image}">

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