let start = document.querySelector(".settings__start");
let settings = document.querySelector(".settings");
let buttonsDiff = document.querySelectorAll(".settings__difficulty button");
let buttonsSize = document.querySelectorAll(".settings__size button");


// difficulties to choose
let easy = document.querySelector(".settings__easy");
let medium = document.querySelector(".settings__medium");
let nightmare = document.querySelector(".settings__nightmare");

// sizes of the playground
let small = document.querySelector(".settings__small");
let mediumSize = document.querySelector(".settings__medium-size");


// reset selected difficult or size button
let resetSelected = function (buttons) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selected");
    }
}

// hide setup popup and start snake game
start.addEventListener('click', function () {
    settings.classList.add("visually-hidden");
    canvas.classList.remove("visually-hidden");
    gameProcess();
});

// difficult buttons clickhandlers
easy.addEventListener('click', function () {
    resetSelected(buttonsDiff);
    easy.classList.add("selected");
    animationShift = 2;
    animationTime = 120;
});
medium.addEventListener('click', function () {
    resetSelected(buttonsDiff);
    medium.classList.add("selected");
    animationShift = 4;
    animationTime = 100;
});
nightmare.addEventListener('click', function () {
    resetSelected(buttonsDiff);
    nightmare.classList.add("selected");
    animationShift = 7;
    animationTime = 70;
});


// size buttons clickhandlers
small.addEventListener('click', function () {
    resetSelected(buttonsSize);
    small.classList.add("selected");
    width = 500;
    height = 500;
    settings.style = "width: 500px; height: 500px";
});
mediumSize.addEventListener('click', function () {
    resetSelected(buttonsSize);
    mediumSize.classList.add("selected");
    width = 700;
    height = 600;
    settings.style = "width: 700px; height: 600px;";
});
