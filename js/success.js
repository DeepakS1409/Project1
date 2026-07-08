const order = JSON.parse(localStorage.getItem("latestOrder"));

const details = document.getElementById("orderDetails");

if (order) {

    details.innerHTML = `

        <h3>Customer</h3>
        <p>${order.customer.name}</p>

        <h3>Order ID</h3>
        <p>${order.orderId}</p>

        <h3>Order Date</h3>
        <p>${order.orderDate}</p>

        <h3>Payment Method</h3>
        <p>${order.payment}</p>

        <h3>Total Amount</h3>
        <p>${order.total}</p>

        <h3>Delivery Address</h3>

        <p>
        ${order.customer.address}<br>
        ${order.customer.city},
        ${order.customer.state} - ${order.customer.pincode}
        </p>

    `;

} else {

    details.innerHTML = `

        <p>No recent order found.</p>

    `;

}