/*==========================================
            LOAD ORDERS
==========================================*/

let orders =

    JSON.parse(localStorage.getItem("orders"))

||

[];

displayOrders(orders);

function displayOrders(orderList) {

    const container = document.getElementById("ordersList");

    container.innerHTML = "";

    if (orderList.length === 0) {

        container.innerHTML = `

<h2>No Orders Yet</h2>

<a href="index.html">

Continue Shopping

</a>

`;

        return;

    }

    orderList.forEach(order => {

        container.innerHTML += createOrderCard(order);

    });

}

function createOrderCard(order) {

    let productsHTML = "";

    order.items.forEach(product => {

        productsHTML += `

<div class="product-row">

<img src="${product.image}">

<div>

<h3>${product.name}</h3>

<p>

Qty : ${product.quantity}

</p>

</div>

</div>

`;

    });

    return `

<div class="order-card">

<div class="order-top">

<div>

<h3>

Order ID :
${order.orderId}

</h3>

<p>

${order.orderDate}

</p>

</div>

<div>

<h3>

${order.total}

</h3>

<p class="status">

Confirmed

</p>

</div>

</div>

<div class="order-items">

${productsHTML}

</div>

<button

class="cancel-btn"

onclick="cancelOrder('${order.orderId}')">

Cancel Order

</button>

</div>

`;

}
/*==========================================
            CANCEL ORDER
==========================================*/

function cancelOrder(id) {

    if (!confirm("Cancel this order?")) return;

    orders =

        orders.filter(order => order.orderId !== id);

    localStorage.setItem(

        "orders",

        JSON.stringify(orders)

    );

    displayOrders(orders);

}
/*==========================================
            SEARCH
==========================================*/

document.getElementById("searchOrder")

.addEventListener("input", function() {

    const keyword = this.value.toLowerCase();

    const filtered =

        orders.filter(order =>

            order.orderId

            .toLowerCase()

            .includes(keyword)

        );

    displayOrders(filtered);

});