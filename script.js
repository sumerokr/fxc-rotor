(function(global) {
    "use strict";

    var rotor = document.querySelector(".fxc-rotor");
    var slideList = rotor.querySelectorAll(".fxc-rotor-list");
    var slideItems = rotor.querySelectorAll(".fxc-rotor-slide");
    var navigationList;
    var navigationItems;
    var navigationButtons;
    var paginationList;
    var paginationItems;
    var paginationButtons;

    var current = 0;
    var timeout;

    init();

    function init() {
        addNavigation();
        addPagination();
        bindHandlers();
        slidePlay();
    }

    function bindHandlers() {
        rotor.querySelector(".fxc-rotor-navigation-button-prev").addEventListener("click", slidePrev);
        rotor.querySelector(".fxc-rotor-navigation-button-next").addEventListener("click", slideNext);
        paginationButtons.forEach(function(el, i) {
            el.addEventListener("click", function() {
                slideGoTo(i);
            });
        });
    }

    function addNavigation() {
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

        navigationItemPrev.appendChild(navigationButtonPrev);
        navigationItemNext.appendChild(navigationButtonNext);
        navigationList.appendChild(navigationItemPrev);
        navigationList.appendChild(navigationItemNext);

        navigation.appendChild(navigationList);
        rotor.appendChild(navigation);
        navigationList = rotor.querySelector(".fxc-rotor-navigation-list");
        navigationItems = navigationList.querySelectorAll(".fxc-rotor-navigation-item");
        navigationButtons = navigationList.querySelectorAll(".fxc-rotor-navigation-button");
    }

    function addPagination() {
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
            paginationButton.innerHTML = i + 1;
            paginationItem.appendChild(paginationButton);
            paginationList.appendChild(paginationItem);
        }

        pagination.appendChild(paginationList);
        rotor.appendChild(pagination);
        paginationList = rotor.querySelector(".fxc-rotor-pagination-list");
        paginationItems = paginationList.querySelectorAll(".fxc-rotor-pagination-item");
        paginationItems[0].classList.add("is-active");
        paginationButtons = paginationList.querySelectorAll(".fxc-rotor-pagination-button");
    }

    function showSlide(n) {
        var lastIndex;

        if (n === current) return;

        lastIndex = slideItems.length - 1;

        if (n < 0) n = lastIndex;
        if (n > lastIndex) n = 0;

        rotor.querySelector(".fxc-rotor-slide.is-active").classList.remove("is-active");
        rotor.querySelector(".fxc-rotor-pagination-item.is-active").classList.remove("is-active");

        slideItems[n].classList.add("is-active");
        paginationItems[n].classList.add("is-active");
        current = n;
        if (n !== lastIndex) {
            slideItems[n + 1].classList.add("is-loaded");
        }
    }

    function slidePlay() {
        var delay = slideItems[current].dataset.delay;

        timeout = setTimeout(function() {
            showSlide(current + 1);
            slidePlay();
        }, delay ? delay : 100000);
    }

    function slideStop() {
        clearTimeout(timeout);
    }

    function slidePrev() {
        slideGoTo(current - 1);
    }

    function slideNext() {
        slideGoTo(current + 1);
    }

    function slideGoTo(n) {
        showSlide(n);
        slideStop();
    }

    rotor.rotor = {
        prev: slidePrev,
        next: slideNext
    };
})(this);
