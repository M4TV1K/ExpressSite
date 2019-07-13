
let firstPoint, secondPoint, thirdPoint, error;
let firstPos, secondPos, thirdPos;
let patternNumbers;
let navButtonHolder, hideButtons;

window.onload = () => {
    $('#mainButton').click(() => {
        window.scrollTo(0,0);
        hideNavButtons();
    });
    $('#priceButton').click(() => {
        window.location.href = '#firstScrollPoint';
        hideNavButtons();
    });
    $('#prosButton').click(() => {
        window.location.href = '#secondScrollPoint';
        hideNavButtons();
    });
    $('#patternButton').click(() => {
        window.location.href = '#thirdScrollPoint';
        hideNavButtons();
    });
    $('.orderButtons').click(() => {
        window.location.href = '#thirdScrollPoint';
        hideNavButtons();
    });

    $('#submitOrder').click(() => {
        if ($('#makeOrderForm')[0].checkValidity()) {
            if (checkNumber($('#phoneNumber')[0].value)
                && checkPattern($('#patternNumbers')[0].value)) {
                return true;
            }
            else {
                alert('Помилка вводу. Перевірте правильність вводу данних. ' +
                    'Шаблони можуть мати цифри тільки від 1 до 6 з пробілами між ними');
                return false;
            }
        }
    });

    firstPoint = $('#firstScrollPoint')[0];
    secondPoint = $('#secondScrollPoint')[0];
    thirdPoint = $('#thirdScrollPoint')[0];
    error = $('#topHeader')[0];
    patternNumbers = $('#patternNumbers')[0];

    let patternsArray = document.querySelectorAll('.patternImages');
    patternsArray.forEach((elm, index) => {
        elm.addEventListener('click', () => {
            patternNumbers.value += patternsArray[index].alt.charAt(0) + ' ';
        })
    });

    navButtonHolder = document.querySelector('nav');
    hideButtons = window.innerWidth <= 890;
    controlNavButtons();

    $('#extendButton').click(() => {
        if (navButtonHolder.style.display === 'flex') {
            navButtonHolder.style.display = 'none';
            hideButtons = false;
        }
        else {
            navButtonHolder.style.display = 'flex';
            hideButtons = true;
        }
    });

    startTimer($('#hours')[0], $('#minutes')[0], $('#seconds')[0]);
    resizeWindow();
    scrollWindow();
};
window.onscroll = scrollWindow;
window.onresize = resizeWindow;

function resizeWindow() {
    controlNavButtons();
    firstPos = firstPoint.offsetTop - error.offsetTop;
    secondPos = secondPoint.offsetTop - error.offsetTop;
    thirdPos = thirdPoint.offsetTop - error.offsetTop;
}

function scrollWindow() {
    let scrollY = window.scrollY;
    if (scrollY < firstPos) makeButtonBold($('#mainButton')[0]);
    else if (scrollY >= firstPos && scrollY < secondPos) makeButtonBold($('#priceButton')[0]);
    else if (scrollY >= secondPos && scrollY < thirdPos) makeButtonBold($('#prosButton')[0]);
    else makeButtonBold($('#patternButton')[0]);
}

function controlNavButtons() {
    if (window.innerWidth > 890) {
        navButtonHolder.style.display = 'flex';
        hideButtons = false;
    }
    else if (!hideButtons) {
        navButtonHolder.style.display = 'none';
        hideButtons = true;
    }
}

function hideNavButtons() {
    if (window.innerWidth <= 890) {
        navButtonHolder.style.display = 'none';
        hideButtons = false;
    }
}

function makeButtonBold(btnToMakeBold) {
    $('.navButtons').css('fontWeight', 'normal');
    btnToMakeBold.style.fontWeight = 'bold';
}

function checkNumber(input) {
    if (input.charAt(0) !== '+') {
        if (isNaN(input.charAt(0))) {
            return false;
        }
    }
    if (input.length < 9 || input.length > 13) return false;
    for (let i = 1; i < input.length; ++i) {
        if (isNaN(input.charAt(i))) return false;
    }
    return true;
}

function checkPattern(input) {
    let numbers = input.split(' ');
    for (let i = 0; i < numbers.length; ++i) {
        if (isNaN(numbers[i])) return false;
        if (parseInt(numbers[i]) < 0 || parseInt(numbers[i]) > 6) return false;
    }
    return true;
}