/*=========================================
            DEEPKART AUTH SYSTEM
=========================================*/

/*=============================
        SIGNUP
=============================*/

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const name = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        let message = document.getElementById("message");

        // Create message element if it doesn't exist
        if (!message) {
            message = document.createElement("p");
            message.id = "message";
            signupForm.appendChild(message);
        }

        // Name Validation
        if (name.length < 3) {
            message.innerHTML = "Name must contain at least 3 characters ❌";
            message.style.color = "red";
            return;
        }

        // Phone Validation
        if (phone.length !== 10 || isNaN(phone)) {
            message.innerHTML = "Enter a valid phone number ❌";
            message.style.color = "red";
            return;
        }

        // Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            message.innerHTML = "Enter a valid email address ❌";
            message.style.color = "red";
            return;
        }

        // Password Validation
        if (password.length < 6) {
            message.innerHTML = "Password must be at least 6 characters ❌";
            message.style.color = "red";
            return;
        }

        // Confirm Password
        if (password !== confirmPassword) {
            message.innerHTML = "Passwords do not match ❌";
            message.style.color = "red";
            return;
        }

        // Check Existing User
        const existingUser = JSON.parse(localStorage.getItem("deepkartUser"));

        if (existingUser && existingUser.email === email) {
            message.innerHTML = "Email already registered ❌";
            message.style.color = "red";
            return;
        }

        const user = {
            name,
            email,
            phone,
            password
        };

        localStorage.setItem("deepkartUser", JSON.stringify(user));

        message.innerHTML = "Account created successfully ✅";
        message.style.color = "green";

        signupForm.reset();

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

    });

}

/*=============================
      PASSWORD TOGGLE
=============================*/

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

if (passwordInput && togglePassword) {

    togglePassword.addEventListener("click", function() {

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        } else {
            passwordInput.type = "password";
            togglePassword.innerHTML = '<i class="fa-solid fa-eye"></i>';
        }

    });

}

const confirmPasswordInput = document.getElementById("confirmPassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

if (confirmPasswordInput && toggleConfirmPassword) {

    toggleConfirmPassword.addEventListener("click", function() {

        if (confirmPasswordInput.type === "password") {
            confirmPasswordInput.type = "text";
            toggleConfirmPassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        } else {
            confirmPasswordInput.type = "password";
            toggleConfirmPassword.innerHTML = '<i class="fa-solid fa-eye"></i>';
        }

    });

}

/*=============================
            LOGIN
=============================*/

const signinForm = document.getElementById("signinForm");

if (signinForm) {

    signinForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const email = document.getElementById("signinEmail").value.trim();
        const password = document.getElementById("signinPassword").value;

        const message = document.getElementById("signinMessage");

        const user = JSON.parse(localStorage.getItem("deepkartUser"));

        if (!user) {

            message.innerHTML = "No account found. Please create an account.";
            message.style.color = "red";
            return;

        }

        if (email !== user.email || password !== user.password) {

            message.innerHTML = "Invalid Email or Password ❌";
            message.style.color = "red";
            return;

        }

        // Login Success

        localStorage.setItem("deepkartLoggedIn", "true");

        message.innerHTML = "Login Successful ✅";
        message.style.color = "green";

        setTimeout(() => {

            window.location.href = "index.html";

        }, 1000);

    });

}

/*=============================
    LOGIN PASSWORD TOGGLE
=============================*/

const signinPassword = document.getElementById("signinPassword");
const toggleSigninPassword = document.getElementById("toggleSigninPassword");

if (signinPassword && toggleSigninPassword) {

    toggleSigninPassword.addEventListener("click", function() {

        if (signinPassword.type === "password") {

            signinPassword.type = "text";
            toggleSigninPassword.innerHTML = "🙈";

        } else {

            signinPassword.type = "password";
            toggleSigninPassword.innerHTML = "👁";

        }

    });

}