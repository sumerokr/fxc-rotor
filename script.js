// (function (global) {
"use strict";

var current = 0,
    timeout;

init();

function init() {
    addNavigation();
    addPagination();
    prepare();
    slidePlay();
    // bindHandlers();
}

function prepare() {
    var rotor = document.querySelector(".fxc-rotor");
    rotor.querySelector(".fxc-rotor-slide").classList.add("is-active");
    rotor.querySelector(".fxc-rotor-pagination-item").classList.add("is-active");
}

function addNavigation() {
    var rotor = document.querySelector(".fxc-rotor");
    var navigation = document.createElement("div");
    var navigationList = document.createElement("ul");
    var navigationItemTemplate = document.createElement("li");
    var navigationButtonTemplate = document.createElement("button");
    var navigationItemPrev;
    var navigationItemNext;
    var navigationButtonPrev;
    var navigationButtonNext;

    navigationItemTemplate.classList.add("fxc-rotor-navigation-item");
    navigationButtonTemplate.classList.add("fxc-rotor-navigation-button");
    navigationButtonTemplate.setAttribute("type", "button");

    navigationItemPrev = navigationItemTemplate.cloneNode(false);
    navigationItemNext = navigationItemTemplate.cloneNode(false);
    navigationButtonPrev = navigationButtonTemplate.cloneNode(false);
    navigationButtonNext = navigationButtonTemplate.cloneNode(false);

    navigation.className = "fxc-rotor-navigation";
    navigationList.className = "fxc-rotor-navigation-list";

    navigationItemPrev.classList.add("fxc-rotor-navigation-item-prev");
    navigationItemNext.classList.add("fxc-rotor-navigation-item-next");
    navigationButtonPrev.classList.add("fxc-rotor-navigation-button-prev");
    navigationButtonNext.classList.add("fxc-rotor-navigation-button-next");
    navigationButtonPrev.innerHTML = "Prev";
    navigationButtonNext.innerHTML = "Next";

    navigationButtonPrev.onclick = slidePrev;
    navigationButtonNext.onclick = slideNext;

    navigationItemPrev.appendChild(navigationButtonPrev);
    navigationItemNext.appendChild(navigationButtonNext);
    navigationList.appendChild(navigationItemPrev);
    navigationList.appendChild(navigationItemNext);

    navigation.appendChild(navigationList);
    rotor.appendChild(navigation);
}

function addPagination() {
    var rotor = document.querySelector(".fxc-rotor");
    var slidesLength = rotor.querySelectorAll(".fxc-rotor-slide").length;
    var pagination = document.createElement("div");
    var paginationList = document.createElement("ul");
    var paginationItemTemplate = document.createElement("li");
    var paginationButtonTemplate = document.createElement("button");
    var paginationItem;
    var paginationButton;

    pagination.classList.add("fxc-rotor-pagination");
    paginationList.classList.add("fxc-rotor-pagination-list");
    paginationItemTemplate.classList.add("fxc-rotor-pagination-item");
    paginationButtonTemplate.classList.add("fxc-rotor-pagination-button");
    paginationButtonTemplate.setAttribute("type", "button");

    for (var i = 0; i < slidesLength; i++) {
        paginationItem = paginationItemTemplate.cloneNode(false);
        paginationButton = paginationButtonTemplate.cloneNode(false);
        paginationButton.onclick = (function(i) {
            return function(e) {
                showSlide(i);
            }
        })(i);
        paginationButton.innerHTML = i + 1;
        paginationItem.appendChild(paginationButton);
        paginationList.appendChild(paginationItem);
    }

    pagination.appendChild(paginationList);
    rotor.appendChild(pagination);
}

function showSlide(n) {
    var rotor = document.querySelector(".fxc-rotor");
    var count = rotor.querySelectorAll(".fxc-rotor-slide").length;

    if (n < 0) {
        n = count - 1;
    } else if (n > count - 1) {
        n = 0;
    }

    rotor.querySelector(".fxc-rotor-slide.is-active").classList.remove("is-active");
    rotor.querySelector(".fxc-rotor-pagination-item.is-active").classList.remove("is-active");

    rotor.querySelectorAll(".fxc-rotor-slide")[n].classList.add("is-active");
    rotor.querySelectorAll(".fxc-rotor-pagination-item")[n].classList.add("is-active");
    current = n;
}

function slidePlay() {
    var rotor = document.querySelector(".fxc-rotor");
    var delay = rotor.querySelectorAll(".fxc-rotor-slide")[current].dataset.delay;

    timeout = setTimeout(function(){
        slideNext();
        slidePlay();
    }, delay ? delay : 2000);
}

function slideStop() {
    clearTimeout(timeout);
}

function slidePrev() {
    slideGoTo(current - 1);
}

function slideNext() {
    showSlide(current + 1);
}

function slideGoTo(n) {
    showSlide(n);
    slideStop();
}
// })(this);
