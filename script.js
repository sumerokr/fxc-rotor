// var getByClass = className => document.querySelectorAll(className);

// func показать n слайд
// init нарисовать пупочки

// init нарисовать стрелки
// init автоплей, отключаемый по навигации

addPagination();
addNavigation();

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
        paginationButton.innerHTML = i + 1;
        paginationItem.appendChild(paginationButton);
        paginationList.appendChild(paginationItem);
    }

    pagination.appendChild(paginationList);
    rotor.appendChild(pagination);
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

    navigationItemPrev.appendChild(navigationButtonPrev);
    navigationItemNext.appendChild(navigationButtonNext);
    navigationList.appendChild(navigationItemPrev);
    navigationList.appendChild(navigationItemNext);

    navigation.appendChild(navigationList);
    rotor.appendChild(navigation);
}
