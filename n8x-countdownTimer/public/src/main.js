const select = (x) => {
    return document.querySelector(x);
};
let timerCont = select("#timerCont");
let hour = timerCont.querySelector("#hour");
let min = timerCont.querySelector("#minute");
let sec = timerCont.querySelector("#second");
let ms = timerCont.querySelector("#milisecond");
let startButton = select("#startButton");
let pauseBtn = select("#pauseBtn");
let resetBtn = select("#resetButton");
function stopWatchOn() {
    ms.innerText++;
    ms.innerText = ms.innerText.length == 1 ? "00" + ms.innerText : ms.innerText;
    ms.innerText = ms.innerText.length == 2 ? "0" + ms.innerText : ms.innerText;
    sec.innerText = sec.innerText.length == 1 ? "0" + sec.innerText : sec.innerText;
    min.innerText = min.innerText.length == 1 ? "0" + min.innerText : min.innerText;
    hour.innerText = hour.innerText.length == 1 ? "0" + hour.innerText : hour.innerText;
    if (ms.innerText == 100) {
        ms.innerText = 0;
        sec.innerText++;
        if (sec.innerText == 60) {
            sec.innerText = 0;
            min.innerText++;
            if (min.innerText == 60) {
                min.innerText = 0;
                hour.innerText++;
                if (hour.innerText == 12) {
                    hour.innerText = 1;
                }
            }
        }
    }
}
startButton.onclick = () => {
    let stopWatchInterval = setInterval(stopWatchOn, 10);
    pauseBtn.onclick = () => {
        clearInterval(stopWatchInterval);
        startButton.removeAttribute("disabled");
    };
    startButton.setAttribute("disabled", "disabled");
};
resetBtn.onclick = () => {
    ms.innerText = '00';
    sec.innerText = '00';
    min.innerText = '00';
    hour.innerText = '00';
};