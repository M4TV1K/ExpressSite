

let hoursHolder, minutesHolder, secondsHolder;

let h, m, s;
let stop = false;

function startTimer(hours, minutes, seconds) {
    hoursHolder = hours;
    minutesHolder = minutes;
    secondsHolder = seconds;
    h = parseInt(hours.innerText);
    m = parseInt(minutes.innerText);
    s = parseInt(seconds.innerHTML);
    console.log(h + ' ' + m + ' ' + s);
    setTimeout(countDown, 1000);
}

function countDown() {
    if (s > 0) {
        --s;
        secondsHolder.innerHTML = s;
        stop = false;
    }
    else {
        if (m > 0) {
            --m;
            s = 59;
            minutesHolder.innerHTML = m;
            secondsHolder.innerHTML = s;
            stop = false;
        }
        else {
            if (h > 0) {
                --h;
                m = 59;
                s = 59;
                hoursHolder.innerHTML = h;
                minutesHolder.innerHTML = m;
                secondsHolder.innerHTML = s;
                stop = false;
            }
            else {
                hoursHolder.innerHTML = h;
                minutesHolder.innerHTML = m;
                secondsHolder.innerHTML = s;
                stop = true;
            }
        }
    }
    if (!stop) setTimeout(countDown, 1000);
}