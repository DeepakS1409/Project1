/*=========================================
        DEEPKART SIGNUP SYSTEM
=========================================*/


const signupForm = document.querySelector("#signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(e) {

        e.preventDefault();


        const name =
            document.getElementById("name").value.trim();


        const email =
            document.getElementById("email").value.trim();


        const phone =
            document.getElementById("phone").value.trim();


        const password =
            document.getElementById("password").value;


        const confirmPassword =
            document.getElementById("confirmPassword").value;


        const message =
            document.getElementById("message");



        if (name.length < 3) {

            message.innerHTML =
                "Name must contain minimum 3 characters ❌";

            message.style.color = "red";

            return;

        }



        if (phone.length !== 10 || isNaN(phone)) {

            message.innerHTML =
                "Enter valid phone number ❌";

            message.style.color = "red";

            return;

        }
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            message.innerHTML =
                "Enter a valid email address ❌";

            message.style.color = "red";

            return;
        }



        if (password.length < 6) {

            message.innerHTML =
                "Password must be minimum 6 characters ❌";

            message.style.color = "red";

            return;

        }



        if (password !== confirmPassword) {

            message.innerHTML =
                "Password does not match ❌";

            message.style.color = "red";

            return;

        }



        const user = {

            name,
            email,
            phone,
            password

        };



        const existingUser = JSON.parse(localStorage.getItem("deepkartUser"));

        if (existingUser && existingUser.email === email) {
            message.innerHTML = "Email is already registered ❌";
            message.style.color = "red";
            return;
        }

        localStorage.setItem(
            "deepkartUser",
            JSON.stringify(user)
        );



        message.innerHTML =
            "Account created successfully ✅";


        message.style.color = "green";

        signupForm.reset();

        setTimeout(() => {

            window.location.href = "login.html";

        }, 1500);



    });

}
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");


if (passwordInput && togglePassword) {

    togglePassword.onclick = function() {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            togglePassword.innerHTML = "🙈";

        } else {

            passwordInput.type = "password";
            togglePassword.innerHTML = "👁";

        }

    };

}