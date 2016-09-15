var getId = id => document.getElementBy(className);
var getQuery = (query, multiple) => multiple === true ? document.querySelectorAll(query) : document.querySelector(query);

var current,
    rotorAutoplay;

slidePlay();

/* Назначаем обработчики пупочкам */
var rotorDots = getQuery(".fxc-rotor-dot-link", true); // находим каждую крапинку
rotorDots.forEach(function(btn, i) {
    btn.onclick = function(e) {
        showSlide(btn);
    }
});

function showSlide(btn) {
    var activeBtn = getQuery(".fxc-rotor-dot-link.active"),
        rotor = getQuery(".fxc-rotor"),
        item2show = getQuery(getDataset(btn, "for"));

    removeClass(activeBtn, "active");
    addClass(btn, "active");
    rotator.insertBefore(item2show, rotator.firstChild);
}

function slidePrev() {
    slideGoTo(current - 1);
    slideStop();
}

function slideNext() {
    slideGoTo(current + 1);
    slideStop();
}

function slidePlay() {
    var i = 1;
    rotorAutoplay = setInterval(function() {
        var btn = rotorDots[i++];
        showSlide(btn);
        i = rotorDots[i] ? i : 0;
    }, 1000); // TODO: перенести в параметры
}

function slideStop() {
    clearInterval(rotorAutoplay);
}

function slideGoTo(n) {
    showSlide(n);
    slideStop();
}


var rotor = function(){
    return {

    };
}
