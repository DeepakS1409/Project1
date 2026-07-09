/*==================================================
                DEEPKART
                ORDERS PAGE
==================================================*/

let orders = JSON.parse(localStorage.getItem("orders")) || [];

let filteredOrders = [...orders];

/*==========================================
            PAGE LOAD
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    loadOrders();

    updateStatistics();

    initializeSearch();

    initializeFilters();

});

/*==========================================
            LOAD ORDERS
==========================================*/

function loadOrders() {

    const container = document.getElementById("ordersList");

    container.innerHTML = "";

    if (filteredOrders.length === 0) {

        container.innerHTML = `

        <div class="empty-orders">

            <i class="fa-solid fa-box-open"></i>

            <h2>No Orders Yet</h2>

            <p>

                Looks like you haven't placed any orders.

            </p>

            <a href="index.html">

                Continue Shopping

            </a>

        </div>

        `;

        return;

    }

    filteredOrders.forEach(order => {

        container.innerHTML += createOrderCard(order);

    });

}

/*==========================================
            CREATE CARD
==========================================*/

function createOrderCard(order) {

    const firstProduct = order.items[0];

    const status = order.status || "Delivered";

    return `

<div class="order-card">

    <div class="order-header">

        <div>

            <div class="order-id">

                Order #${order.orderId}

            </div>

            <div class="order-date">

                ${order.orderDate}

            </div>

        </div>

        <div class="order-status status-${status.toLowerCase()}">

            ${status}

        </div>

    </div>

    <div class="order-body">

        <div class="order-product">

            <img src="${firstProduct.image}">

            <div class="product-details">

                <h3>

                    ${firstProduct.name}

                </h3>

                <p>

                    Quantity : ${firstProduct.quantity}

                </p>

                <div class="product-price">

                    ₹${firstProduct.price.toLocaleString()}

                </div>

            </div>

        </div>

        <div class="order-summary">

            <div class="summary-row">

                <span>Payment</span>

                <span>${order.payment}</span>

            </div>

            <div class="summary-row">

                <span>Total</span>

                <span>${order.total}</span>

            </div>

            <div class="summary-row">

                <span>Items</span>

                <span>${order.items.length}</span>

            </div>

        </div>

    </div>

    <div class="order-actions">

        <button
            class="track-btn"
            onclick="trackOrder('${order.orderId}')">

            <i class="fa-solid fa-truck-fast"></i>

            Track Order

        </button>

        <button
            class="details-btn"
            onclick="viewDetails('${order.orderId}')">

            <i class="fa-solid fa-eye"></i>

            View Details

        </button>

        <button
            class="buyagain-btn"
            onclick="buyAgain('${order.orderId}')">

            <i class="fa-solid fa-cart-shopping"></i>

            Buy Again

        </button>

    </div>

</div>

`;

}

/*==========================================
            STATISTICS
==========================================*/

function updateStatistics() {

    document.getElementById("totalOrders").textContent = orders.length;

    document.getElementById("deliveredOrders").textContent =
        orders.filter(o => (o.status || "Delivered") === "Delivered").length;

    document.getElementById("processingOrders").textContent =
        orders.filter(o => o.status === "Processing").length;

    document.getElementById("cancelledOrders").textContent =
        orders.filter(o => o.status === "Cancelled").length;

}
/*==========================================
            SEARCH ORDERS
==========================================*/

function initializeSearch() {

    const searchInput = document.getElementById("searchOrder");

    if (!searchInput) return;

    searchInput.addEventListener("input", function() {

        const value = this.value.trim().toLowerCase();

        filteredOrders = orders.filter(order =>
            order.orderId.toLowerCase().includes(value)
        );

        loadOrders();

    });

}

/*==========================================
            FILTER BUTTONS
==========================================*/

function initializeFilters() {

    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            const filter = button.textContent.trim();

            if (filter === "All") {

                filteredOrders = [...orders];

            } else {

                filteredOrders = orders.filter(order =>
                    (order.status || "Delivered") === filter
                );

            }

            loadOrders();

        });

    });

}

/*==========================================
            BUY AGAIN
==========================================*/

function buyAgain(orderId) {

    const order = orders.find(item => item.orderId === orderId);

    if (!order) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    order.items.forEach(product => {

        const existing = cart.find(item => item.id === product.id);

        if (existing) {

            existing.quantity += product.quantity;

        } else {

            cart.push({
                ...product
            });

        }

    });

    localStorage.setItem("cart", JSON.stringify(cart));

    showToast("Products added to Cart 🛒");

}

/*==========================================
            TRACK ORDER
==========================================*/

function trackOrder(orderId) {

    alert(
        "Order " +
        orderId +
        "\n\nCurrent Status : Delivered ✅"
    );

}

/*==========================================
            VIEW DETAILS
==========================================*/

function viewDetails(orderId) {

    const order = orders.find(item => item.orderId === orderId);

    if (!order) return;

    let message = "";

    message += "Order ID : " + order.orderId + "\n\n";

    message += "Date : " + order.orderDate + "\n\n";

    message += "Payment : " + order.payment + "\n\n";

    message += "Total : " + order.total + "\n\n";

    message += "Products\n\n";

    order.items.forEach(product => {

        message +=
            product.name +
            " x " +
            product.quantity +
            "\n";

    });

    alert(message);

}

/*==========================================
            TOAST
==========================================*/

function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

/*==========================================
        UPDATE CART BADGE
==========================================*/

updateCartBadge();

function updateCartBadge() {

    const badge = document.querySelector(".cart-count");

    if (!badge) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {

        total += item.quantity;

    });

    badge.textContent = total;

}

/*==========================================
        UPDATE WISHLIST BADGE
==========================================*/

updateWishlistBadge();

function updateWishlistBadge() {

    const badge = document.querySelector(".wishlist-count");

    if (!badge) return;

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    badge.textContent = wishlist.length;

}