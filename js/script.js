let loading = document.querySelector(".wavy");
let header = document.querySelector("header");
let mobileMainImg = document.querySelector("#mobile-main-image");
let tabletMainImg = document.querySelector("#tablet-main-image");
let desktopMainImg = document.querySelector("#desktop-main-image");
let magnifier = document.querySelector("#magnifier");
let contentWrapper = document.querySelector(".content-wrapper")
let menu = document.querySelector("#menu");
let searchInput = header.querySelector("input");
let clearSearch = header.querySelector(".clear-search");
let mThemeIcon = header.querySelector("#mobile-theme");
let desktopThemeIcon = document.querySelector("#desktop-theme");
let body = document.querySelector("body");
let menuItems = menu.querySelectorAll("li");
let searchIcon = menu.querySelector("#desktop-search");
let searchPopUp = document.querySelector("#search-pop-up");
let searchBG = document.querySelector("#pop-up-bg");
let signUpLogin = document.querySelectorAll('.form-box a');
let registerContainer = document.querySelector('#register-signup');
let registerPopup = document.querySelector('#register-popup');
let registerClose = document.querySelector('#registerClose');
let registerBtn = document.querySelector('.register-btn');
let loginBtn = registerContainer.querySelector('#register-signup .login-box input[type="submit"]');
let signupBtn = registerContainer.querySelector('#register-signup .sign-up-box input[type="submit"]');
let profileIcon = header.querySelector("#profileIcon span");
let profilePhoto = header.querySelector("#profileIcon img");
let loggedInProfileMenu = document.querySelector('.loggedInProfileMenu');
let profileMenu = document.querySelector('.profileIconMenu');
let menuSignup = profileMenu.querySelector('#profile-signup');
let menuLogin = profileMenu.querySelector('#profile-login');
const pageParts = document.querySelectorAll(".section");
const wrapper = document.querySelector('.t-wrapper');
const indicators = [...document.querySelectorAll('.t-indicators button')];
let currentTestimonial = 0;
let addVisible = function(item) {
    item.classList.add("visible");
};
let removeVisible = function(item) {
    item.classList.remove("visible");
};
/* register */

let toggleForm = function() {
    registerContainer.classList.toggle('signUpForm');
    registerPopup.classList.toggle('signUpForm');
};
registerBtn.addEventListener("click", function() {
    addVisible(registerPopup);
});
const hideRegisterPopup = function() {
    removeVisible(registerPopup);
    profileMenu.classList.remove("visible");
    loggedInProfileMenu.classList.remove("visible");
};
const hideRegisterPopupV2 = function() {
    hideRegisterPopup();
    addVisible(profilePhoto);
    profileIcon.classList.add("hide");
};
for (const item of signUpLogin) {
    item.addEventListener('click', toggleForm);
}
loginBtn.addEventListener('click', hideRegisterPopupV2);
signupBtn.addEventListener('click', hideRegisterPopupV2);
registerClose.addEventListener("click", hideRegisterPopup);
/* end registor */
/*search*/
clearSearch.addEventListener("click", function() {
    searchInput.value = "";
});
searchIcon.addEventListener("click", function(e) {
    e.preventDefault();
    searchIcon.classList.remove("show");
    searchPopUp.classList.add("show");
    searchBG.classList.add("show");
});
searchBG.addEventListener("click", function(e) {
    let input = e.target.classList.contains("searching");
    if (!input) {
        searchIcon.classList.add("show");
        searchPopUp.classList.remove("show");
        searchBG.classList.remove("show");
    }
});
/* end search*/
/* load page*/
let showPage = function() {
    loading.classList.add("hide");
    if (window.innerWidth < 1008) {
        addVisible(menu);
        setTimeout(function() {
            addVisible(contentWrapper);
        }, 300);
        if (window.innerWidth < 641) {
            setTimeout(function() {
                addVisible(mobileMainImg);
            }, 600);
        } else {
            setTimeout(function() {
                addVisible(tabletMainImg);
            }, 600);
        }
        setTimeout(function() {
            addVisible(header);
        }, 900);
    } else {
        setTimeout(function() {
            addVisible(contentWrapper);
            addVisible(desktopMainImg);
            addVisible(magnifier);
        }, 200);
        setTimeout(function() {
            addVisible(menu);
        }, 400);
        setTimeout(function() {
            addVisible(header);
        }, 600);
    }
};
window.addEventListener("load", showPage, false);
/* end load page*/
/*profile*/
profileIcon.addEventListener('click', function() {
    profileMenu.classList.toggle("visible");
});
profilePhoto.addEventListener('click', function() {
    loggedInProfileMenu.classList.toggle("visible");
});
window.addEventListener("click", function(e) {
    if (!e.target.classList.contains("fa-user-circle") && e.target.id !== "profileImage") {
        loggedInProfileMenu.classList.remove("visible");
        profileMenu.classList.remove("visible");
    }
});
menuSignup.addEventListener('click', function() {
    addVisible(registerPopup);
    registerContainer.classList.add('signUpForm');
    registerPopup.classList.add('signUpForm');
});
menuLogin.addEventListener('click', function() {
    addVisible(registerPopup);
    registerContainer.classList.remove('signUpForm');
    registerPopup.classList.remove('signUpForm');
});
/* end profile*/
/* menu*/
for (const menuItem of menuItems) {
    if (menuItem.querySelector("a").id !== "desktop-search") {
        menuItem.addEventListener("click", function() {
            if (menuItem.id !== "desktop-theme") {
                for (const item of menuItems) {
                    if (item.id !== "desktop-theme") {
                        item.classList.remove("focus");
                        // console.log(item);
                    }
                }
            }
            menuItem.classList.add("focus");
        })
    }


}
/*end menu*/
/* theme*/
mThemeIcon.addEventListener("click", function() {
    if (body.classList.contains("dark")) {
        body.classList.remove("dark");

    } else {
        body.classList.add("dark");
    }
});

desktopThemeIcon.addEventListener("click", function(e) {
    e.preventDefault();
    if (body.classList.contains("dark")) {
        body.classList.remove("dark");

    } else {
        body.classList.add("dark");
    }
});
/* end theme*/
/* magnifier move*/
window.addEventListener("mousemove", function(e) {
    let x = e.clientX / 200;
    let y = e.clientY / 200;
    magnifier.style.backgroundPositionX = x + "px";
    magnifier.style.backgroundPositionY = y + "px";
});
/* end magnifier move*/

const observer = new IntersectionObserver(entreis => {
    for (const item of menuItems) {
        if (!item.querySelector("a svg").classList.contains("fa-moon")) {
            item.classList.remove("focus");
        }
    }
    const visibleSecton = entreis.filter(entry => entry.isIntersecting)[0];
    menu.querySelector(`.${visibleSecton.target.id}`).classList.add("focus");

}, { threshold: 0.5 })

pageParts.forEach(section => observer.observe(section));


// testimonial
indicators.forEach((item, i) => {
    item.addEventListener('click', () => {
        indicators[currentTestimonial].classList.remove('t-active');
        wrapper.style.marginLeft = `-${100 * i}%`;
        item.classList.add('t-active');
        currentTestimonial = i;
    })
})


// endtestimonial