/*==================================================
                DEEPKART
                CHECKOUT.JS
==================================================*/

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let couponDiscount = 0;

document.addEventListener("DOMContentLoaded", () => {

    loadCheckout();

});
/*==========================================
        CHECKOUT PRODUCT CARD
==========================================*/

function createCheckoutCard(product) {

    return `

    <div class="checkout-item">

        <img src="${product.image}">

        <div>

            <h3>${product.name}</h3>

            <p>

                Qty : ${product.quantity}

            </p>

            <strong>

                ₹${(product.price * product.quantity).toLocaleString()}

            </strong>

        </div>

    </div>

    `;

}
/*==========================================
        ORDER SUMMARY
==========================================*/

function updateSummary() {

    let totalItems = 0;

    let totalPrice = 0;

    cart.forEach(product => {

        totalItems += product.quantity;

        totalPrice += product.price * product.quantity;

    });

    const gst = totalPrice * 0.18;

    const discount = totalPrice * 0.05 + couponDiscount;

    const grandTotal = totalPrice + gst - discount;

    document.getElementById("itemCount").innerHTML = totalItems;

    document.getElementById("totalPrice").innerHTML =
        "₹" + totalPrice.toLocaleString();

    document.getElementById("gst").innerHTML =
        "₹" + gst.toFixed(0);

    document.getElementById("discount").innerHTML =
        "-₹" + discount.toFixed(0);

    document.getElementById("grandTotal").innerHTML =
        "₹" + grandTotal.toFixed(0);

}
/*==========================================
        APPLY COUPON
==========================================*/

document.getElementById("applyCoupon").addEventListener("click", () => {

    const code = document
        .getElementById("couponCode")
        .value
        .trim()
        .toUpperCase();

    if (code === "DEEP10") {

        couponDiscount = 500;

        showToast("Coupon Applied Successfully 🎉");

    } else {

        couponDiscount = 0;

        showToast("Invalid Coupon ❌");

    }

    updateSummary();

});
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
            PLACE ORDER
==========================================*/

document.getElementById("placeOrder").addEventListener("click", placeOrder);

function placeOrder() {

    if (!validateForm()) {

        return;

    }

    const paymentMethod = document.querySelector(
        'input[name="payment"]:checked'
    ).value;

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    const order = {

        orderId: generateOrderId(),

        orderDate: new Date().toLocaleString(),

        customer: {

            name: document.getElementById("fullName").value.trim(),

            email: document.getElementById("email").value.trim(),

            phone: document.getElementById("phone").value.trim(),

            address: document.getElementById("address").value.trim(),

            city: document.getElementById("city").value.trim(),

            state: document.getElementById("state").value.trim(),

            pincode: document.getElementById("pincode").value.trim()

        },

        payment: paymentMethod,

        items: cart,

        total: document.getElementById("grandTotal").innerText

    };

    orders.push(order);

    localStorage.setItem(

        "orders",

        JSON.stringify(orders)

    );

    localStorage.removeItem("cart");

    localStorage.setItem(

        "latestOrder",

        JSON.stringify(order)

    );

    window.location.href = "success.html";

}
/*==========================================
        FORM VALIDATION
==========================================*/

function validateForm() {

    const requiredFields = [

        "fullName",

        "email",

        "phone",

        "address",

        "city",

        "state",

        "pincode"

    ];

    for (let field of requiredFields) {

        const input = document.getElementById(field);

        if (input.value.trim() === "") {

            showToast("Please fill all fields.");

            input.focus();

            return false;

        }

    }

    if (!/^\d{10}$/.test(document.getElementById("phone").value.trim())) {

        showToast("Enter a valid 10-digit phone number.");

        return false;

    }

    if (!/^\d{6}$/.test(document.getElementById("pincode").value.trim())) {

        showToast("Enter a valid 6-digit pincode.");

        return false;

    }

    return true;

}
/*==========================================
        ORDER ID
==========================================*/

function generateOrderId() {

    return "DK" +

        Date.now()

    .toString()

    .slice(-8);

}