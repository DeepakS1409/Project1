/*===========================================
        DEEPKART
        APP.JS
===========================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeApp();

});

/*===========================================
        INITIALIZE
===========================================*/

function initializeApp() {

    profileDropdown();

    darkMode();

    searchBar();

    navbarScroll();

    productButtons();

    updateBadges();

    heroSlider();

    liveSearch();

    wishlist();

}

/*===========================================
        PROFILE DROPDOWN
===========================================*/

function profileDropdown() {

    const profileBtn = document.getElementById("profileBtn");

    const dropdown = document.querySelector(".dropdown");

    if (!profileBtn || !dropdown) return;

    profileBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        dropdown.classList.toggle("active");

    });

    document.addEventListener("click", (e) => {

        if (!dropdown.contains(e.target) &&
            e.target !== profileBtn) {

            dropdown.classList.remove("active");

        }

    });

}

/*===========================================
        DARK MODE
===========================================*/

function darkMode() {

    const themeBtn = document.getElementById("themeToggle");

    if (!themeBtn) return;

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    }

    themeBtn.onclick = () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");

            themeBtn.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        } else {

            localStorage.setItem("theme", "light");

            themeBtn.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

        }

    }

}

/*===========================================
        SEARCH BAR
===========================================*/

function searchBar() {

    const searchInput = document.querySelector(".search-box input");

    if (!searchInput) return;

    searchInput.addEventListener("keyup", (e) => {

        let value = e.target.value.toLowerCase();

        console.log("Searching :", value);

    });

}

/*===========================================
        STICKY NAVBAR EFFECT
===========================================*/

function navbarScroll() {

    window.addEventListener("scroll", () => {

        const header = document.querySelector("header");

        if (window.scrollY > 80) {

            header.style.padding = "12px 7%";

        } else {

            header.style.padding = "18px 7%";

        }

    });

}

/*===========================================
        PRODUCT BUTTONS
===========================================*/

function productButtons() {

    const buttons = document.querySelectorAll(".product-card button");

    buttons.forEach((btn) => {

        btn.addEventListener("click", () => {

            btn.innerHTML = "✔ Added";

            btn.style.background = "#16a34a";

            btn.disabled = true;

            let cart = parseInt(localStorage.getItem("cart")) || 0;

            cart++;

            localStorage.setItem("cart", cart);

            updateBadges();

        });

    });

}

/*===========================================
        BADGES
===========================================*/

function updateBadges() {

    const cart = document.querySelector(".cart-count");

    if (cart) {

        cart.innerHTML =
            localStorage.getItem("cart") || 0;

    }

}

/*===========================================
        SCROLL TO TOP
===========================================*/

const scrollBtn = document.createElement("button");

scrollBtn.innerHTML =
    '<i class="fa-solid fa-arrow-up"></i>';

scrollBtn.className = "scrollTop";

document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        scrollBtn.classList.add("show");

    } else {

        scrollBtn.classList.remove("show");

    }

});

scrollBtn.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

/*===========================================
        PRELOADER
===========================================*/

window.onload = () => {

    const loader = document.querySelector(".loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 600);

    }

}

/*===========================================
        CONSOLE
===========================================*/

console.log("%cDeepKart Loaded Successfully",
    "color:white;background:#2563eb;padding:10px;font-size:16px;border-radius:5px;");
/*===========================================
        HERO AUTO SLIDER
===========================================*/

let heroImages = [
    "images/banner1.jpg",
    "images/banner2.jpg",
    "images/banner3.jpg",
    "images/banner4.jpg"
];

let currentHero = 0;

function heroSlider() {

    const hero = document.querySelector(".hero-image img");

    if (!hero) return;

    setInterval(() => {

        currentHero++;

        if (currentHero >= heroImages.length) {

            currentHero = 0;

        }

        hero.style.opacity = "0";

        setTimeout(() => {

            hero.src = heroImages[currentHero];

            hero.style.opacity = "1";

        }, 400);

    }, 4000);

}

heroSlider();

/*===========================================
        LIVE PRODUCT SEARCH
===========================================*/

function liveSearch() {

    const searchInput = document.querySelector(".search-box input");

    const cards = document.querySelectorAll(".product-card");

    if (!searchInput) return;

    searchInput.addEventListener("keyup", () => {

        const value = searchInput.value.toLowerCase();

        cards.forEach(card => {

            const title = card.querySelector("h3").innerText.toLowerCase();

            if (title.includes(value)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

liveSearch();

/*===========================================
        WISHLIST
===========================================*/

function wishlist() {

    const cards = document.querySelectorAll(".product-card");

    let wish = parseInt(localStorage.getItem("wishlist")) || 0;

    cards.forEach(card => {

        let heart = document.createElement("button");

        heart.innerHTML = '<i class="fa-solid fa-heart"></i>';

        heart.className = "wishlist-btn";

        card.appendChild(heart);

        heart.addEventListener("click", () => {

            if (!heart.classList.contains("added")) {

                heart.classList.add("added");

                wish++;

                localStorage.setItem("wishlist", wish);

                showToast("Added to Wishlist ❤️");

            }

        });

    });

}

wishlist();

/*===========================================
        TOAST NOTIFICATION
===========================================*/

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

        }, 400);

    }, 2500);

}