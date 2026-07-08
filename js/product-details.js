const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

const thumbs = document.querySelectorAll(".thumb");

const mainImage = document.getElementById("mainImage");

const thumb1 = document.getElementById("thumb1");
const thumb2 = document.getElementById("thumb2");
const thumb3 = document.getElementById("thumb3");
const thumb4 = document.getElementById("thumb4");
const thumbs = document.querySelectorAll(".thumb");

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
    const wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    const wishBtn = document.getElementById("wishlistBtn");

    if (wishlist.some(item => item.id === currentProduct.id)) {

        wishBtn.innerHTML =
            `<i class="fa-solid fa-heart"></i> Wishlisted`;

    }

    const images = currentProduct.images || [currentProduct.image];

    mainImage.src = images[0];
    thumbs.forEach(img => img.classList.remove("active"));

    if (thumbs.length > 0) {
        thumbs[0].classList.add("active");
    }

    thumb1.src = images[0] || "";

    thumb2.src = images[1] || images[0];

    thumb3.src = images[2] || images[0];

    thumb4.src = images[3] || images[0];

    category.textContent = currentProduct.category;

    productName.innerHTML = currentProduct.name;

    rating.innerHTML =

        `⭐ ${currentProduct.rating} / 5`;

    price.innerHTML = currentProduct.price.toLocaleString();

    const old = Math.round(currentProduct.price * 1.20);

    oldPrice.innerHTML = old.toLocaleString();

    discount.innerHTML = 20;

    saving.innerHTML =

        (old - currentProduct.price).toLocaleString();

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

        wishlist.push(currentProduct);

        wishBtn.innerHTML =
            `<i class="fa-solid fa-heart"></i> Wishlisted`;

        showToast("Added to Wishlist ❤️");

    }

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    updateWishlistCount();

};
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