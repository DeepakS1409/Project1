/*==================================
        DEEPKART PROFILE
==================================*/


const user = JSON.parse(
    localStorage.getItem("deepkartUser")
);



if (!user) {

    alert("Please login first");

    window.location.href = "login.html";

} else {


    document.getElementById("profileName").innerHTML =
        user.name;


    document.getElementById("profileEmail").innerHTML =
        user.email;



    document.getElementById("name").innerHTML =
        user.name;


    document.getElementById("email").innerHTML =
        user.email;


    document.getElementById("phone").innerHTML =
        user.phone;



}





function goOrders() {

    window.location.href = "orders.html";

}




function logout() {


    localStorage.removeItem("deepkartLoggedIn");


    alert("Logged out successfully");


    window.location.href = "login.html";


}