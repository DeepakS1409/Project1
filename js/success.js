const order = JSON.parse(localStorage.getItem("latestOrder"));

if (order) {

    document.getElementById("orderDetails").innerHTML = `

        <h3>Order ID</h3>

        <p>${order.orderId}</p>

        <h3>Order Date</h3>

        <p>${order.orderDate}</p>

        <h3>Payment</h3>

        <p>${order.payment}</p>

        <h3>Total Amount</h3>

        <p>${order.total}</p>

    `;

}